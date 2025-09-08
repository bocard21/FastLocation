import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { slateSchema } from '../../../lib/validators';
import { renderPsd } from '../../../lib/psd';
import { composite } from '../../../lib/image';
import { exampleCommands } from '../../../lib/ffmpeg';
import { readdir } from 'fs/promises';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { jobId, fields, options } = await req.json();
  slateSchema.parse(fields);
  const overlayEnabled = options?.overlayEnabled ?? fields.submittingFor !== 'FINAL';

  const workDir = path.join(process.cwd(), 'work', jobId);
  const slatePath = path.join(workDir, 'slate.png');
  const overlayPath = path.join(workDir, 'overlay.png');

  await renderPsd(path.join(process.cwd(), 'assets', 'template.psd'), {
    SHOW: fields.show,
    SUBMITTING_FOR: fields.submittingFor,
    VERSION_NAME: fields.versionName,
    DATE: fields.date,
    VENDOR: fields.vendor,
    SHOT_ASSET_NAME: fields.shotAssetName,
    FRAMES: fields.frames,
  }, slatePath);

  if (overlayEnabled) {
    await renderPsd(path.join(process.cwd(), 'assets', 'template.psd'), {}, overlayPath);
  }

  const files = await readdir(workDir);
  const inputFile = files.find((f) => f.startsWith('input'));
  if (!inputFile) return NextResponse.json({ error: 'Input not found' }, { status: 400 });
  const inputPath = path.join(workDir, inputFile);

  if (/\.(png|jpe?g|tiff)$/i.test(inputFile)) {
    const out = path.join(workDir, `image_with_overlay${path.extname(inputFile)}`);
    if (overlayEnabled) await composite(inputPath, overlayPath, out);
    return NextResponse.json({ slate: slatePath, output: out });
  }

  // Video processing is complex; placeholder returns example ffmpeg pipeline.
  return NextResponse.json({ slate: slatePath, note: 'Video export not implemented', ffmpeg: exampleCommands() });
}
