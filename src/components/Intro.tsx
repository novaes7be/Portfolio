import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReduced } from '../lib/motion';
import { lockScroll } from '../lib/scroll';
import { useI18n } from '../lib/i18n';
import { Signature } from './Signature';

const KEY = 'intro-seen';
const seen = () => { try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; } };

/** Abertura: assinatura sendo escrita, nome e cortina subindo. Uma vez por sessão. */
export function Intro({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();
  const [show] = useState(() => !seen() && !prefersReduced());

  useLayoutEffect(() => {
    if (!show) { onDone(); return; }
    lockScroll(true);
    try { sessionStorage.setItem(KEY, '1'); } catch { /* sem storage */ }
  }, [show, onDone]);

  useGSAP(() => {
    if (!show) return;
    tl.current = gsap.timeline()
      .from('.intro__meta span', { yPercent: 110, stagger: 0.08, duration: 0.9, ease: 'expo.out' }, 0.5)
      .addLabel('exit', 2.7)
      .to('.intro__center', { y: -40, opacity: 0, duration: 0.6, ease: 'power2.in' }, 'exit')
      .to(ref.current, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 'exit+=0.25')
      .call(() => { lockScroll(false); onDone(); }, [], 'exit+=0.55')
      .set(ref.current, { display: 'none' });
  }, { scope: ref });

  if (!show) return null;
  const skip = () => tl.current?.seek('exit');
  return (
    <div className="intro" ref={ref} aria-hidden="true">
      <div className="intro__center">
        <Signature id="sig-intro" state="drawing" />
        <p className="intro__meta mono"><span>Bernardo Novaes</span><span>Portfolio — 2026</span></p>
      </div>
      <button className="intro__skip mono" type="button" onClick={skip} tabIndex={-1}>{t.intro.skip}</button>
    </div>
  );
}
