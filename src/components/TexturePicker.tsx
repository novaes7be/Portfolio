import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../lib/i18n';
import { TEXTURES, applyTexture, readTexture, type TextureId } from '../lib/texture';

/** Botão que abre a escolha de textura do fundo, com uma amostra de cada uma. */
export function TexturePicker() {
  const { lang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TextureId>(readTexture);
  const ref = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => { applyTexture(value); }, [value]);
  useEffect(() => {
    if (!open) return;
    ref.current?.querySelector<HTMLInputElement>('input:checked')?.focus();
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div className="tex-picker" ref={ref}>
      <button ref={btn} className="tex-picker__btn" type="button" aria-expanded={open} aria-controls="tex-panel" aria-label={t.nav.texture} onClick={() => setOpen(o => !o)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
        </svg>
      </button>
      <div className={`tex-panel${open ? ' is-open' : ''}`} id="tex-panel" role="dialog" aria-label={t.nav.texture} hidden={!open}>
        <fieldset>
          <legend className="mono">{t.nav.texture}</legend>
          <div className="tex-panel__grid">
            {TEXTURES.map(x => (
              <label className="tex-option" key={x.id}>
                <input type="radio" name="texture" value={x.id} checked={value === x.id} onChange={() => setValue(x.id)} />
                <span className={`tex-option__swatch tex--${x.id}`} aria-hidden="true" />
                <span className="tex-option__name">{x[lang]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
