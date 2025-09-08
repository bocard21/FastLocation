import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import mime from 'mime';
import sharp from 'sharp';
import { ffprobe } from '../../../lib/ffmpeg';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

  const jobId = uuidv4();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = path.extname(file.name) || '.' + mime.getExtension(file.type || '');
  const workDir = path.join(process.cwd(), 'work', jobId);
  await mkdir(workDir, { recursive: true });
  const inputPath = path.join(workDir, `input${ext}`);
  await writeFile(inputPath, buffer);

  let meta: any = {};
  let mediaType: 'video' | 'image' = 'image';
  if (file.type.startsWith('video')) {
    mediaType = 'video';
    meta = await ffprobe(inputPath);
  } else {
    const info = await sharp(buffer).metadata();
    meta = { width: info.width, height: info.height };
  }

  return NextResponse.json({ jobId, mediaType, ext, ...meta });
}
