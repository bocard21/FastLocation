import sharp from 'sharp';

export async function composite(base: string, overlay: string, out: string) {
  await sharp(base).composite([{ input: overlay }]).toFile(out);
}
