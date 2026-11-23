import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, finePointer, prefersReduced } from '../lib/motion';

/** Puxa o filho na direção do cursor (só desktop, sem movimento reduzido). */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el || !finePointer() || prefersReduced()) return;
    const target = el.firstElementChild as HTMLElement;
    const x = gsap.quickTo(target, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const y = gsap.quickTo(target, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * strength);
      y((e.clientY - r.top - r.height / 2) * strength);
    };
    const leave = () => { x(0); y(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, { scope: ref });
  return <span ref={ref} className="magnetic">{children}</span>;
}
