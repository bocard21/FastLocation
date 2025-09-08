import { readPsd, writePsd } from 'ag-psd';
import { readFile, writeFile } from 'fs/promises';

export async function renderPsd(
  templatePath: string,
  layerText: Record<string, string>,
  outPath: string
) {
  const buffer = await readFile(templatePath);
  const psd = readPsd(buffer);

  function traverse(layer: any) {
    if (!layer) return;
    if (layer.name && layerText[layer.name] && layer.text) {
      layer.text.text = layerText[layer.name];
    }
    if (Array.isArray(layer.children)) {
      layer.children.forEach(traverse);
    }
  }

  psd.children?.forEach(traverse);
  const pngBuffer = writePsd(psd, { format: 'png' });
  await writeFile(outPath, pngBuffer);
}
