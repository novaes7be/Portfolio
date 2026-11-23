import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReduced } from './motion';

let lenis: Lenis | null = null;

/** Rolagem suave (Lenis) sincronizada com o ScrollTrigger. Desligada com movimento reduzido. */
export function initScroll() {
  if (prefersReduced() || lenis) return;
  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

export const lockScroll = (on: boolean) => {
  if (lenis) { if (on) lenis.stop(); else lenis.start(); }
  document.documentElement.classList.toggle('no-scroll', on);
};

/** Rola até uma âncora (#id) ou ao topo, descontando o cabeçalho fixo. */
export function scrollToHash(hash: string) {
  const el = hash === '#top' ? 0 : document.querySelector<HTMLElement>(hash);
  if (el === null) return;
  if (lenis) lenis.scrollTo(el, { offset: el === 0 ? 0 : -80 });
  else if (el === 0) window.scrollTo({ top: 0 });
  else el.scrollIntoView();
  if (el !== 0) { el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); }
}
