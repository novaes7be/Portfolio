import { useRef, useState } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/motion';
import { useI18n } from '../lib/i18n';
import { LINKS } from '../content/content';
import { Magnetic } from './Magnetic';

export function Contact() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [msg, setMsg] = useState('');
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 75%' } });
      tl.from('.contact__title .line > span', { yPercent: 115, stagger: 0.1, duration: 1.3, ease: 'expo.out' })
        .from('.contact__text, .contact__mail, .contact__row > *', { opacity: 0, y: 24, stagger: 0.06 }, '<0.4');
    });
  }, { scope: ref, dependencies: [lang], revertOnUpdate: true });
  const copy = async () => {
    try { await navigator.clipboard.writeText(LINKS.email); setMsg(t.contact.copied); }
    catch { setMsg(`${t.contact.copyFail}: ${LINKS.email}`); }
  };
  return (
    <section className="section container" id="contact" ref={ref} aria-labelledby="contact-title">
      <div className="contact card">
        <p className="section-label mono"><b>06</b> {t.contact.label}</p>
        <h2 className="contact__title" id="contact-title">{t.contact.title.map(l => <span className="line" key={l}><span>{l} </span></span>)}</h2>
        <p className="contact__text">{t.contact.text}</p>
        <a className="contact__mail link-u" href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
        <div className="contact__row">
          <Magnetic><a className="btn btn--primary" href={`mailto:${LINKS.email}`}>E-mail <span className="arrow" aria-hidden="true">↗</span></a></Magnetic>
          <Magnetic><button className="btn" type="button" onClick={copy}>{t.contact.copy}</button></Magnetic>
          <Magnetic><a className="btn" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub <span className="arrow" aria-hidden="true">↗</span></a></Magnetic>
          <Magnetic><a className="btn" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span className="arrow" aria-hidden="true">↗</span></a></Magnetic>
          <Magnetic><a className="btn" href={t.meta.cv} download>{t.contact.cv} <span className="arrow arrow--down" aria-hidden="true">↓</span></a></Magnetic>
        </div>
        <p className="toast" role="status">{msg}</p>
      </div>
    </section>
  );
}
