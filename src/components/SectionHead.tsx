import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/motion';

type Props = { index: string; label: string; title: string; intro?: string; id: string };

/** Cabeçalho de seção: rótulo em mono, título grande revelado por linhas. */
export function SectionHead({ index, label, title, intro, id }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 82%' } });
      tl.from('.section-label', { opacity: 0, x: -16, duration: 0.6 })
        .from('.line > span', { yPercent: 110, stagger: 0.08, duration: 1.1, ease: 'expo.out' }, '<0.1')
        .from('.section-intro', { opacity: 0, y: 16, duration: 0.8 }, '<0.3');
    });
  }, { scope: ref, dependencies: [title], revertOnUpdate: true });
  const words = title.split(' ');
  const half = Math.ceil(words.length / 2);
  const lines = words.length > 2 ? [words.slice(0, half).join(' '), words.slice(half).join(' ')] : [title];
  return (
    <div className="section-head" ref={ref}>
      <p className="section-label mono"><b>{index}</b> {label}</p>
      <h2 className="section-title" id={id}>
        {lines.map(l => <span className="line" key={l}><span>{l} </span></span>)}
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}
