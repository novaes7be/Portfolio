import { useRef } from 'react';
import { gsap, useGSAP, MOTION_OK } from '../lib/motion';
import { useI18n } from '../lib/i18n';
import { SectionHead } from './SectionHead';
import { Icon } from './Icon';
import { LOCAL_LOGOS, type Org } from '../content/content';
import type { IconName } from '../lib/icons';

const PLATE: Record<keyof typeof LOCAL_LOGOS, string> = { fiap: 'FIAP', bradesco: 'FB' };

/** Cores de marca (Simple Icons). AWS usa o laranja da marca: o azul-marinho oficial some no fundo escuro. */
const BRAND: Record<string, string> = {
  oracle: '#F80000', cisco: '#1BA0D7', claude: '#D97757', aws: '#FF9900', googlecloud: '#4285F4', fiap: '#ED145B', bradesco: '#E0203F'
};

function OrgLogo({ logo, issuer }: { logo: Org['logo']; issuer: string }) {
  if (logo in LOCAL_LOGOS) {
    const src = LOCAL_LOGOS[logo as keyof typeof LOCAL_LOGOS];
    return <span className="org__logo" title={issuer} style={{ ['--brand' as string]: BRAND[logo] }}>{src ? <img src={src} alt="" loading="lazy" /> : <b>{PLATE[logo as keyof typeof LOCAL_LOGOS]}</b>}</span>;
  }
  return <span className="org__logo" title={issuer} style={{ ['--brand' as string]: BRAND[logo] }}><Icon name={logo as IconName} /></span>;
}

function OrgList({ title, items }: { title: string; items: Org[] }) {
  return (
    <div className="side-list card">
      <h3 className="mono">{title}</h3>
      <ul>{items.map(o => <li className="org" key={o.name}><OrgLogo logo={o.logo} issuer={o.issuer} /><span><b>{o.name}</b><small>{o.issuer}</small></span></li>)}</ul>
    </div>
  );
}

export function Journey() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.to('.timeline__fill', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.tl-item').forEach(el => gsap.from(el, { opacity: 0, x: -24, duration: 1, scrollTrigger: { trigger: el, start: 'top 85%' } }));
      gsap.from('.side-list', { opacity: 0, y: 32, stagger: 0.12, scrollTrigger: { trigger: '.side-lists', start: 'top 85%' } });
    });
  }, { scope: ref, dependencies: [lang], revertOnUpdate: true });
  return (
    <section className="section container" id="journey" ref={ref} aria-labelledby="journey-title">
      <SectionHead index="05" label={t.journey.label} title={t.journey.title} id="journey-title" />
      <div className="journey">
        <div className="timeline">
          <span className="timeline__rail" aria-hidden="true" /><span className="timeline__fill" aria-hidden="true" />
          <ol>
          {t.journey.timeline.map(i => (
            <li className="tl-item" key={i.what}>
              <p className="tl-item__when mono">{i.when} <span>· {i.tag}</span></p>
              <h3>{i.what}</h3>
              <p>{i.detail}</p>
            </li>
          ))}
          </ol>
        </div>
        <div className="side-lists">
          <OrgList title={t.journey.certsTitle} items={t.journey.certs} />
          <OrgList title={t.journey.eventsTitle} items={t.journey.events} />
        </div>
      </div>
    </section>
  );
}
