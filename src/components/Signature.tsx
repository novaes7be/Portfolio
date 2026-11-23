import { SIG } from '../lib/signature';

type Props = { id: string; state?: 'idle' | 'drawing' | 'drawn'; className?: string };

/** Assinatura BNN. A máscara percorre cada letra para simular a caneta escrevendo. */
export function Signature({ id, state = 'drawn', className = '' }: Props) {
  return (
    <svg className={`sig is-${state} ${className}`} viewBox={`0 0 ${SIG.W} ${SIG.H}`} aria-hidden="true" focusable="false">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse">
          {SIG.parts.map((d, i) => <path key={i} className="ink" style={{ ['--i' as string]: i }} d={d} pathLength={1} />)}
        </mask>
      </defs>
      <path d={SIG.d} fill="currentColor" mask={`url(#${id})`} />
      <path className="flourish" d={SIG.fl} pathLength={1} />
    </svg>
  );
}
