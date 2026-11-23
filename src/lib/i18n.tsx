import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { CONTENT, type Content, type Lang } from '../content/content';

type Ctx = { lang: Lang; t: Content; setLang: (l: Lang) => void };
const I18n = createContext<Ctx | null>(null);

const initial = (): Lang => {
  try { const s = localStorage.getItem('lang'); if (s === 'pt' || s === 'en') return s; } catch { /* sem storage */ }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initial);
  useEffect(() => {
    document.documentElement.lang = CONTENT[lang].meta.lang;
    try { localStorage.setItem('lang', lang); } catch { /* sem storage */ }
  }, [lang]);
  return <I18n.Provider value={{ lang, t: CONTENT[lang], setLang }}>{children}</I18n.Provider>;
}

export function useI18n() {
  const c = useContext(I18n);
  if (!c) throw new Error('useI18n fora do I18nProvider');
  return c;
}
