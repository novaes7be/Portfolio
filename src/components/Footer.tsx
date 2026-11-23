import { useEffect, useState } from 'react';
import { useI18n } from '../lib/i18n';
import { LINKS } from '../content/content';
import { scrollToHash } from '../lib/scroll';
import { Signature } from './Signature';

export function Footer() {
  const { t, lang } = useI18n();
  const [time, setTime] = useState('');
  useEffect(() => {
    const f = () => setTime(new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' }).format(new Date()));
    f(); const id = setInterval(f, 30000); return () => clearInterval(id);
  }, [lang]);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Signature id="sig-footer" />
          <ul className="footer__links mono">
            <li><a className="link-u" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a className="link-u" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a className="link-u" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a className="link-u" href={`mailto:${LINKS.email}`}>E-mail</a></li>
          </ul>
        </div>
        <div className="footer__bottom mono">
          <span>© 2026 Bernardo Novaes</span>
          <span>São Paulo · {t.footer.local} {time}</span>
          <span>{t.footer.built}</span>
          <a className="link-u" href="#top" onClick={e => { e.preventDefault(); scrollToHash('#top'); }}>{t.footer.top} ↑</a>
        </div>
      </div>
    </footer>
  );
}
