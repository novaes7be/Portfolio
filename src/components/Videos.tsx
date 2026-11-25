import { useState } from 'react';
import { useI18n } from '../lib/i18n';
import type { Video } from '../content/content';
import { SectionHead } from './SectionHead';
import { ProjectMedia, LoopVideo } from './ProjectMedia';

function VideoCard({ v, soon, play, feature }: { v: Video; soon: string; play: string; feature: boolean }) {
  const { t } = useI18n();
  const [playing, setPlaying] = useState(false);
  const has = Boolean(v.youtube || v.mp4);
  const icon = <span className="video__play" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>;
  let player;
  if (playing && v.youtube) player = <div className="video__player"><iframe src={`https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1`} title={v.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" /></div>;
  else if (v.mp4) player = <div className="video__player"><LoopVideo src={v.mp4} poster={v.poster ?? ''} label={v.title} className="" /></div>;
  else if (has) player = <button className="video__player" type="button" onClick={() => setPlaying(true)} aria-label={`${play}: ${v.title}`}>{v.poster && <img src={v.poster} alt="" loading="lazy" />}{icon}</button>;
  else if (v.media) player = <div className="video__player video__preview"><ProjectMedia media={v.media} illustrative={t.projects.illustrative} note={t.projects.totpNote} expires={t.projects.expires} replay /></div>;
  else player = <div className="video__player" aria-disabled="true">{icon}<span className="video__soon mono">{soon}</span></div>;
  return (
    <article className={`video card${feature ? ' video--feature' : ''}`}>
      {player}
      <div className="video__body"><h3>{v.title}</h3><p>{v.text}</p></div>
    </article>
  );
}

export function Videos() {
  const { t } = useI18n();
  return (
    <section className="section container" id="videos" aria-labelledby="videos-title" style={{ paddingTop: 0 }}>
      <SectionHead index="03" label={t.videos.label} title={t.videos.title} id="videos-title" />
      <div className="videos">{t.videos.items.map((v, i) => <VideoCard key={v.title} v={v} soon={t.videos.soon} play={t.videos.play} feature={i === 0 && t.videos.items.length % 3 === 1} />)}</div>
    </section>
  );
}
