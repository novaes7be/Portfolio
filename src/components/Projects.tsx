import { useRef, useState } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/motion';
import { useI18n } from '../lib/i18n';
import type { Project } from '../content/content';
import { SectionHead } from './SectionHead';
import { Magnetic } from './Magnetic';
import { ProjectMedia } from './ProjectMedia';

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <article className="project card" id={`p-${p.id}`} aria-labelledby={`p-${p.id}-name`}>
      <div className="project__info">
        <div className="project__top mono"><span className="project__index">0{i + 1}</span><span>{p.kind}</span></div>
        <h3 className="project__name" id={`p-${p.id}-name`}>{p.name}</h3>
        <p className="project__summary">{p.summary}</p>
        <p className="project__role"><b>{t.projects.role}.</b> {p.role}</p>
        <ul className="project__stack" aria-label="Stack">{p.stack.map(s => <li className="chip" key={s}>{s}</li>)}</ul>
        <div className={`details${open ? ' is-open' : ''}`} id={`p-${p.id}-how`} aria-hidden={!open}>
          <div><ol aria-label={t.projects.how}>{p.how.map(h => <li key={h}>{h}</li>)}</ol></div>
        </div>
        <div className="project__actions">
          {p.repo && <Magnetic><a className="btn btn--primary" href={p.repo} target="_blank" rel="noopener noreferrer">{p.repoLabel} <span className="arrow" aria-hidden="true">↗</span></a></Magnetic>}
          {p.demo && <Magnetic><a className="btn" href={p.demo} target="_blank" rel="noopener noreferrer">Demo <span className="arrow" aria-hidden="true">↗</span></a></Magnetic>}
          <button className="details-btn mono" type="button" aria-expanded={open} aria-controls={`p-${p.id}-how`} onClick={() => setOpen(o => !o)}>
            <i aria-hidden="true" />{open ? t.projects.less : t.projects.more}
          </button>
        </div>
      </div>
      <div className="project__media"><div className="project__media-inner"><ProjectMedia media={p.media} illustrative={t.projects.illustrative} note={t.projects.totpNote} expires={t.projects.expires} /></div></div>
    </article>
  );
}

export function Projects() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>('.project').forEach(card => {
        gsap.from(card, { opacity: 0, y: 80, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 88%' } });
        gsap.fromTo(card.querySelector('.project__media-inner'), { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });
  }, { scope: ref, dependencies: [lang], revertOnUpdate: true });
  return (
    <section className="section container" id="projects" ref={ref} aria-labelledby="projects-title">
      <SectionHead index="02" label={t.projects.label} title={t.projects.title} intro={t.projects.intro} id="projects-title" />
      <div className="projects">{t.projects.items.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}</div>
    </section>
  );
}
