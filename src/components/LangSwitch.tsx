import { useI18n } from '../lib/i18n';
import type { Lang } from '../content/content';

const OPTIONS: { id: Lang; label: string; name: string; tag: string }[] = [
  { id: 'pt', label: 'PT', name: 'Português', tag: 'pt-BR' },
  { id: 'en', label: 'EN', name: 'English', tag: 'en' }
];

/** Seletor de idioma: as duas opções sempre visíveis, a ativa destacada. */
export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.nav.lang} data-active={lang}>
      <span className="lang-switch__thumb" aria-hidden="true" />
      {OPTIONS.map(o => (
        <button key={o.id} type="button" lang={o.tag} aria-pressed={lang === o.id} aria-label={o.name} onClick={() => setLang(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
