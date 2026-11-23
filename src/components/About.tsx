import { useRef } from 'react';
import { gsap, useGSAP, SplitText, MOTION_OK } from '../lib/motion';
import { useI18n } from '../lib/i18n';

export function About() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      // frase principal acende palavra por palavra conforme a rolagem
      const split = SplitText.create('.about__statement', { type: 'words', wordsClass: 'word' });
      gsap.fromTo(split.words, { opacity: 0.16 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: '.about__statement', start: 'top 80%', end: 'bottom 45%', scrub: true } });
      gsap.from('.about__body p, .principle', { opacity: 0, y: 32, stagger: 0.1, scrollTrigger: { trigger: '.about__body', start: 'top 85%' } });
      return () => split.revert();
    });
  }, { scope: ref, dependencies: [lang], revertOnUpdate: true });

  return (
    <section className="section container" id="about" ref={ref} aria-labelledby="about-title">
      <p className="section-label mono" style={{ marginBottom: 'var(--sp-6)' }}><b>01</b> {t.about.label}</p>
      <div className="about__grid">
        <p className="about__statement" id="about-title">{t.about.statement}</p>
        <div className="about__body">{t.about.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
      </div>
      <div className="principles">
        <h3 className="mono">{t.about.principlesTitle}</h3>
        {t.about.principles.map(([h, p], i) => (
          <div className="principle" key={h}>
            <span className="mono">0{i + 1}</span>
            <div className="principle__body"><h4>{h}</h4><p>{p}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
