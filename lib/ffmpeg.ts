import { spawn } from 'child_process';

const ffmpegPath = process.env.FFMPEG_PATH || 'ffmpeg';
const ffprobePath = process.env.FFPROBE_PATH || 'ffprobe';

export interface ProbeResult {
  width: number;
  height: number;
  fps?: number;
  duration?: number;
  codec?: string;
}

export function ffprobe(file: string): Promise<ProbeResult> {
  return new Promise((resolve, reject) => {
    const args = [
      '-v',
      'error',
      '-select_streams',
      'v:0',
      '-show_entries',
      'stream=width,height,codec_name,r_frame_rate',
      '-show_entries',
      'format=duration',
      '-of',
      'json',
      file,
    ];
    const child = spawn(ffprobePath, args);
    let data = '';
    child.stdout.on('data', (chunk) => (data += chunk));
    child.on('close', (code) => {
      if (code !== 0) return reject(new Error('ffprobe failed'));
      try {
        const json = JSON.parse(data);
        const stream = json.streams[0];
        const [num, den] = (stream.r_frame_rate || '0/0').split('/');
        resolve({
          width: stream.width,
          height: stream.height,
          codec: stream.codec_name,
          fps: den !== '0' ? Number(num) / Number(den) : undefined,
          duration: json.format?.duration ? Number(json.format.duration) : undefined,
        });
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Placeholder for ffmpeg concat + overlay pipeline
export function exampleCommands() {
  return `
# Create 1-frame slate video
ffmpeg -loop 1 -t 1 -i slate.png -r 24 -pix_fmt yuv420p slate_1f.mp4
# Concat slate + input
ffmpeg -f concat -safe 0 -i concat.txt -c copy concat_out.mp4
# Apply overlay
ffmpeg -i concat_out.mp4 -i overlay.png -filter_complex "overlay=(W-w)/2:(H-h)/2:format=auto" -c:a copy output.mp4
`; // illustrative only
}
