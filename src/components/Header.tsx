import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReduced } from '../lib/motion';
import { lockScroll, scrollToHash } from '../lib/scroll';
import { useI18n } from '../lib/i18n';
import { Signature } from './Signature';
import { Magnetic } from './Magnetic';
import { LangSwitch } from './LangSwitch';
import { TexturePicker } from './TexturePicker';
import { Icon } from './Icon';
import { LINKS } from '../content/content';

const IDS = ['about', 'projects', 'skills', 'journey', 'contact'] as const;

export function Header({ ready }: { ready: boolean }) {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<string>('');
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const labels: Record<(typeof IDS)[number], string> = { about: t.nav.about, projects: t.nav.projects, skills: t.nav.skills, journey: t.nav.journey, contact: t.nav.contact };

  // seção ativa
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    IDS.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    const onScroll = () => { setSolid(window.scrollY > 24); if (window.scrollY < window.innerHeight * 0.5) setActive(''); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  // indicador deslizante
  useGSAP(() => {
    const a = navRef.current?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    const ind = indRef.current;
    if (!ind) return;
    if (!a) { gsap.to(ind, { opacity: 0, duration: 0.3 }); return; }
    gsap.to(ind, { x: a.offsetLeft, width: a.offsetWidth, opacity: 1, duration: prefersReduced() ? 0 : 0.6, ease: 'expo.out' });
  }, { dependencies: [active, lang] });

  // menu mobile
  useGSAP(() => {
    const m = menuRef.current; if (!m) return;
    if (open) {
      gsap.set(m, { visibility: 'visible' });
      gsap.fromTo(m, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: prefersReduced() ? 0 : 0.7, ease: 'expo.inOut' });
      gsap.from(m.querySelectorAll('li a'), { yPercent: 110, stagger: 0.06, duration: prefersReduced() ? 0 : 0.8, delay: 0.25, ease: 'expo.out' });
      m.querySelector<HTMLElement>('.mobile-menu__close')?.focus();
    } else if (m.style.visibility === 'visible') {
      gsap.to(m, { clipPath: 'inset(0 0 100% 0)', duration: prefersReduced() ? 0 : 0.6, ease: 'expo.inOut', onComplete: () => { gsap.set(m, { visibility: 'hidden' }); } });
    }
  }, { dependencies: [open] });

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && menuRef.current) { // mantém o foco dentro do menu
        const f = [...menuRef.current.querySelectorAll<HTMLElement>('a,button')];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); lockScroll(false); menuBtn.current?.focus(); };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const hash = e.currentTarget.hash;
    if (open) { setOpen(false); setTimeout(() => scrollToHash(hash), 450); } else scrollToHash(hash);
  };

  return (
    <>
      <header className={`header${solid ? ' is-solid' : ''}`}>
        <div className="container">
          <a className="header__logo" href="#top" onClick={go} aria-label={t.nav.home}>
            <Signature id="sig-logo" state={ready ? 'drawing' : 'idle'} />
          </a>
          <nav className="nav" aria-label="Principal">
            <span className="nav__indicator" ref={indRef} />
            <ul ref={navRef}>
              {IDS.map(id => <li key={id}><a href={`#${id}`} onClick={go} aria-current={active === id ? 'true' : undefined}>{labels[id]}</a></li>)}
            </ul>
          </nav>
          <div className="header__tools">
            <LangSwitch />
            <TexturePicker />
            <a className="gh-btn" href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label={t.nav.github}><Icon name="github" /></a>
            <Magnetic><a className="btn btn--primary header__cta" href={t.meta.cv} download>CV <span className="arrow arrow--down" aria-hidden="true">↓</span></a></Magnetic>
            <button ref={menuBtn} className="menu-btn" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
              <span className="mono">{t.nav.menu}</span><i aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-menu" id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label={t.nav.menu}>
        <div className="mobile-menu__top">
          <Signature id="sig-menu" />
          <button className="menu-btn mobile-menu__close" type="button" onClick={() => setOpen(false)}><span className="mono">{t.nav.close}</span></button>
        </div>
        <nav aria-label="Menu">
          <ol>
            {IDS.map((id, i) => <li key={id}><a href={`#${id}`} onClick={go}><small className="mono">0{i + 1}</small>{labels[id]}</a></li>)}
          </ol>
        </nav>
        <div className="mobile-menu__foot mono">
          <a href="https://github.com/novaes7be" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://br.linkedin.com/in/bernardo-nobrega-novaes/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <LangSwitch />
        </div>
      </div>
    </>
  );
}
