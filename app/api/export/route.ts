import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { readFile, writeFile, readdir, copyFile } from 'fs/promises';
import { slateSchema } from '../../../lib/validators';
import { renderPsd } from '../../../lib/psd';
import { composite } from '../../../lib/image';
import { ffprobe } from '../../../lib/ffmpeg';
import mime from 'mime';
import sharp from 'sharp';
import { spawn } from 'child_process';

export const runtime = 'nodejs';

function ffmpeg(args: string[]) {
  const bin = process.env.FFMPEG_PATH || 'ffmpeg';
  return new Promise<void>((resolve, reject) => {
    const p = spawn(bin, args);
    p.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error('ffmpeg failed'));
    });
  });
}

export async function POST(req: NextRequest) {
  const { jobId, fields, options } = await req.json();
  slateSchema.parse(fields);
  const overlayEnabled = options?.overlayEnabled ?? fields.submittingFor !== 'FINAL';

  const workDir = path.join(process.cwd(), 'work', jobId);
  const slatePath = path.join(workDir, 'slate.png');
  const overlayPath = path.join(workDir, 'overlay.png');
  const template = path.join(process.cwd(), 'assets', 'template.psd');

  await renderPsd(
    template,
    {
      SHOW: fields.show,
      SUBMITTING_FOR: fields.submittingFor,
      VERSION_NAME: fields.versionName,
      DATE: fields.date,
      VENDOR: fields.vendor,
      SHOT_ASSET_NAME: fields.shotAssetName,
      FRAMES: fields.frames,
    },
    slatePath,
    { hideGroups: ['OVERLAY'] }
  );

  if (overlayEnabled) {
    await renderPsd(
      template,
      {
        OV_VENDOR: fields.vendor,
        OV_SHOW: fields.show,
        OV_DATE: fields.date,
        OV_IMAGE: fields.shotAssetName,
        OV_VERSION: fields.versionName,
        OV_FRAMES: fields.frames,
      },
      overlayPath,
      { hideGroups: ['SLATE'] }
    );
  }

  const files = await readdir(workDir);
  const inputFile = files.find((f) => f.startsWith('input'));
  if (!inputFile) return NextResponse.json({ error: 'Input not found' }, { status: 400 });
  const inputPath = path.join(workDir, inputFile);

  // gather dimensions
  let width = 0;
  let height = 0;
  let fps = 24;
  if (/\.(png|jpe?g|tiff)$/i.test(inputFile)) {
    const info = await sharp(inputPath).metadata();
    width = info.width || 0;
    height = info.height || 0;
  } else {
    const probe = await ffprobe(inputPath);
    width = probe.width;
    height = probe.height;
    fps = probe.fps || 24;
  }

  // resize slate/overlay to match input size
  await sharp(slatePath).resize(width, height).toFile(slatePath);
  if (overlayEnabled) {
    await sharp(overlayPath).resize(width, height).toFile(overlayPath);
  }

  if (/\.(png|jpe?g|tiff)$/i.test(inputFile)) {
    const outExt = path.extname(inputFile);
    const outPath = path.join(workDir, `image_with_overlay${outExt}`);
    if (overlayEnabled) await composite(inputPath, overlayPath, outPath);
    else await copyFile(inputPath, outPath);
    const slateOut = path.join(workDir, `slate${outExt}`);
    await sharp(slatePath).toFile(slateOut);
    const buffer = await readFile(outPath);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mime.getType(outExt) || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="image_with_overlay${outExt}"`,
      },
    });
  }

  // video pipeline
  const slateVideo = path.join(workDir, 'slate_1f.mp4');
  await ffmpeg(['-loop', '1', '-t', '1', '-i', slatePath, '-r', String(fps), '-pix_fmt', 'yuv420p', slateVideo]);

  const concatTxt = path.join(workDir, 'concat.txt');
  await writeFile(concatTxt, `file '${slateVideo}'\nfile '${inputPath}'\n`);
  const concatOut = path.join(workDir, 'concat_out.mp4');
  await ffmpeg(['-f', 'concat', '-safe', '0', '-i', concatTxt, '-c', 'copy', concatOut]);

  let finalPath = concatOut;
  if (overlayEnabled) {
    finalPath = path.join(workDir, 'output.mp4');
    await ffmpeg([
      '-i',
      concatOut,
      '-i',
      overlayPath,
      '-filter_complex',
      'overlay=(W-w)/2:(H-h)/2:format=auto',
      '-c:a',
      'copy',
      finalPath,
    ]);
  }

  const videoBuffer = await readFile(finalPath);
  return new NextResponse(videoBuffer, {
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Disposition': 'attachment; filename="output.mp4"',
    },
  });
}
