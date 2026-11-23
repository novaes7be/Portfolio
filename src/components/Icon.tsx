import { ICONS, type IconName } from '../lib/icons';

export function Icon({ name }: { name: IconName | 'rest' }) {
  if (name === 'rest') return <b aria-hidden="true">{'{}'}</b>;
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d={ICONS[name]} /></svg>;
}
