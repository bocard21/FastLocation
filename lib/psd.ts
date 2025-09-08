import { readPsd, writePngBuffer } from 'ag-psd';
import { readFile, writeFile } from 'fs/promises';

interface RenderOptions {
  hideGroups?: string[];
}

export async function renderPsd(
  templatePath: string,
  layerText: Record<string, string>,
  outPath: string,
  options: RenderOptions = {}
) {
  const buffer = await readFile(templatePath);
  const psd = readPsd(buffer);

  function traverse(layer: any) {
    if (!layer) return;

    if (options.hideGroups && layer.children && layer.name) {
      if (options.hideGroups.includes(layer.name)) {
        layer.visible = false;
      }
    }

    if (layer.name && layerText[layer.name] && layer.text) {
      layer.text.text = layerText[layer.name];
    }

    if (Array.isArray(layer.children)) {
      layer.children.forEach(traverse);
    }
  }

  psd.children?.forEach(traverse);
  const pngBuffer = writePngBuffer(psd);
  await writeFile(outPath, pngBuffer);
}
