import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/motion';
import { useI18n } from '../lib/i18n';
import { SectionHead } from './SectionHead';
import { Icon } from './Icon';

export function Skills() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.from('.skill-group', { opacity: 0, y: 48, stagger: 0.1, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.skills', start: 'top 85%' } });
    });
  }, { scope: ref, dependencies: [lang], revertOnUpdate: true });
  return (
    <section className="section container" id="skills" ref={ref} aria-labelledby="skills-title">
      <SectionHead index="04" label={t.skills.label} title={t.skills.title} intro={t.skills.intro} id="skills-title" />
      <div className="skills">
        {t.skills.groups.map((g, gi) => (
          <div className="skill-group card" key={g.name}>
            <h3 className="mono"><span>{g.name}</span><span>0{gi + 1}</span></h3>
            <ul>
              {g.items.map(([icon, name, daily]) => (
                <li className="skill" key={name}>
                  <span className="skill__icon"><Icon name={icon} /></span>
                  <span className="skill__name">{name}</span>
                  <span className={`skill__level mono${daily ? ' is-daily' : ''}`}>{daily ? t.skills.daily : t.skills.initial}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="deep">
        <h3 className="mono">{t.skills.deepTitle}</h3>
        {t.skills.deep.map(d => <span className="chip" key={d}>{d}</span>)}
      </div>
    </section>
  );
}
