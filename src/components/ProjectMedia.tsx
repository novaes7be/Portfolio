import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Project } from '../content/content';
import { prefersReduced } from '../lib/motion';
import { Totp } from './Totp';

type Props = { media: Project['media']; illustrative: string; note: string; expires: string; replay?: boolean };

const STEP = 420, HOLD = 2600;

/** Revela as linhas uma a uma, em loop, só enquanto o terminal está na tela. */
function useReplay(total: number, on: boolean) {
  const ref = useRef<HTMLPreElement>(null);
  const [shown, setShown] = useState(on ? 0 : total);
  useEffect(() => {
    if (!on || prefersReduced() || !ref.current) { setShown(total); return; }
    let timer = 0, n = 0;
    const next = () => {
      n = n >= total ? 0 : n + 1;
      setShown(n);
      timer = window.setTimeout(next, n >= total ? HOLD : STEP);
    };
    const io = new IntersectionObserver(([e]) => {
      clearTimeout(timer);
      if (e.isIntersecting) timer = window.setTimeout(next, STEP);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, [total, on]);
  return { ref, shown };
}

function Term({ lines, replay }: { lines: ReactNode[]; replay: boolean }) {
  const { ref, shown } = useReplay(lines.length, replay);
  return (
    <pre className="term" aria-hidden="true" ref={ref}>
      {lines.map((l, i) => <span className="ln" key={i} data-on={i < shown}>{l}{'\n'}</span>)}
    </pre>
  );
}

export const Bar = ({ title }: { title: string }) => <div className="window-bar" aria-hidden="true"><i /><i /><i /><span>{title}</span></div>;

/** Vídeo mudo em loop: só toca enquanto está na tela; com movimento reduzido, fica a capa. */
function LoopVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || prefersReduced()) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video className="media-video" ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-hidden="true" />;
}

export function ProjectMedia({ media, illustrative, note, expires, replay = false }: Props) {
  if (media === 'studiy') return <><Bar title="studiy · tour" /><LoopVideo src="demos/studiy.mp4" poster="demos/studiy-poster.jpg" /></>;
  if (media === 'totp') return <><Bar title="totp · live" /><Totp note={note} expires={expires} /></>;
  if (media === 'jardiff') return (
    <><Bar title=".github/workflows/ci.yml" />
      <Term replay={replay} lines={[
        <span className="c"># {illustrative}</span>,
        <><span className="a">- uses:</span> <span className="t">novaes7be/JARDIFF@v1</span></>,
        <>{'  '}<span className="a">with:</span></>,
        '    old: build/app-1.0.jar',
        '    new: build/app-1.1.jar',
        '',
        <span className="t">Comparing JARs…</span>,
        <span className="g">+ com/app/service/AuthService.class</span>,
        <span className="r">- com/app/legacy/OldUtil.class</span>,
        <span className="a">~ com/app/api/UserController.class</span>
      ]} /></>
  );
  return (
    <><Bar title="terminal" />
      <Term replay={replay} lines={[
        <span className="c"># {illustrative}</span>,
        <span className="t">$ curl -X POST /api/urls -d '{'{'}"url":"https://example.com/a/long/link"{'}'}'</span>,
        <span className="g">201 Created</span>,
        '{ "short": "/aZ3k9" }',
        '',
        <span className="t">$ curl -I /aZ3k9</span>,
        <span className="a">302 Found</span>,
        'Location: https://example.com/a/long/link'
      ]} /></>
  );
}
