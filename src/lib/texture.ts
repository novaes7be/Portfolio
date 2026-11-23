/** Texturas estáticas do fundo. A escolha do visitante fica salva no navegador. */
export const TEXTURES = [
  { id: 'padrao', pt: 'Padrão', en: 'Default' },
  { id: 'granulado', pt: 'Granulado', en: 'Grain' },
  { id: 'pontos', pt: 'Pontos', en: 'Dots' },
  { id: 'linhas', pt: 'Linhas', en: 'Lines' },
  { id: 'quadriculado', pt: 'Quadriculado', en: 'Graph' }
] as const;

export type TextureId = (typeof TEXTURES)[number]['id'];
const KEY = 'texture';

export function readTexture(): TextureId {
  try {
    const v = localStorage.getItem(KEY);
    if (TEXTURES.some(t => t.id === v)) return v as TextureId;
  } catch { /* sem storage */ }
  return 'padrao';
}

export function applyTexture(id: TextureId) {
  document.documentElement.dataset.texture = id;
  try { localStorage.setItem(KEY, id); } catch { /* sem storage */ }
}
