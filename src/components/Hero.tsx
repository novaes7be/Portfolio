import { useEffect, useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/motion';
import { scrollToHash } from '../lib/scroll';
import { useI18n } from '../lib/i18n';
import { Magnetic } from './Magnetic';

const STACK = ['Java', 'Spring Boot', 'JPA', 'REST APIs', 'Redis', 'Docker', 'GitHub Actions', 'Postman', 'Git'];

export function Hero({ ready }: { ready: boolean }) {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      tl.current = gsap.timeline({ paused: true })
        .from('.hero__status, .hero__eyebrow', { opacity: 0, y: 12, stagger: 0.1, duration: 0.8 })
        .from('.hero__title .line > span', { yPercent: 115, rotate: 3, stagger: 0.1, duration: 1.3, ease: 'expo.out' }, '<0.1')
        .from('.hero__text, .hero__actions > *', { opacity: 0, y: 24, stagger: 0.08, duration: 1 }, '<0.5')
        .from('.hero__meta div', { opacity: 0, y: 16, stagger: 0.08, duration: 0.8 }, '<0.2')
;
      // título se afasta levemente ao rolar
      gsap.to('.hero__title', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
      return () => { tl.current = undefined; };
    });
  }, { scope: ref, dependencies: [lang], revertOnUpdate: true });

  useEffect(() => { if (ready) tl.current?.play(); }, [ready, lang]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); scrollToHash(e.currentTarget.hash); };

  return (
    <>
      <section className="hero container" id="top" ref={ref} aria-labelledby="hero-title">
        <p className="hero__status mono">{t.hero.status}</p>
        <p className="hero__eyebrow mono">{t.hero.eyebrow}</p>
        <h1 className="hero__title" id="hero-title">
                    {t.hero.lines.map((l, i) => <span className={`line${i === 2 ? ' line--accent' : ''}`} key={l}><span>{l} </span></span>)}
        </h1>
        <div className="hero__bottom">
          <div>
            <p className="hero__text">{t.hero.text}</p>
            <div className="hero__actions">
              <Magnetic><a className="btn btn--primary" href="#projects" onClick={go}>{t.hero.ctaProjects} <span className="arrow arrow--down" aria-hidden="true">↓</span></a></Magnetic>
              <Magnetic><a className="btn" href="#contact" onClick={go}>{t.hero.ctaContact} <span className="arrow" aria-hidden="true">↗</span></a></Magnetic>
            </div>
          </div>
          <div className="hero__right">
            <dl className="hero__meta">
              {t.hero.meta.map(([k, v, sub]) => <div key={k}><dt className="mono">{k}</dt><dd>{v}{sub && <small className="hero__meta-sub">{sub}</small>}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>
      <div className="ticker" aria-label="Stack">
        <ul>
          {[...STACK, ...STACK].map((s, i) => <li key={i} aria-hidden={i >= STACK.length || undefined}>{s}</li>)}
        </ul>
      </div>
    </>
  );
}
