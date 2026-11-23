import { useEffect, useState } from 'react';

const KEY = 'JBSWY3DPEHPK3PXP'; // chave pública de demonstração

function base32(s: string) {
  const a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  for (const c of s) bits += a.indexOf(c).toString(2).padStart(5, '0');
  const out = new Uint8Array((bits.length / 8) | 0);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  return out;
}

/** TOTP real (RFC 6238) calculado no navegador com Web Crypto. */
export function Totp({ note, expires }: { note: string; expires: string }) {
  const [code, setCode] = useState('--- ---');
  const [left, setLeft] = useState(30);
  useEffect(() => {
    let key: CryptoKey | null = null, alive = true;
    const tick = async () => {
      const now = Math.floor(Date.now() / 1000);
      setLeft(30 - (now % 30));
      if (!crypto.subtle) return;
      key ??= await crypto.subtle.importKey('raw', base32(KEY), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
      const msg = new ArrayBuffer(8);
      new DataView(msg).setUint32(4, Math.floor(now / 30));
      const h = new Uint8Array(await crypto.subtle.sign('HMAC', key, msg));
      const o = h[19] & 15;
      const n = (((h[o] & 127) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3]) % 1e6;
      if (alive) setCode(String(n).padStart(6, '0').replace(/(\d{3})/, '$1 '));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => { alive = false; clearInterval(id); };
  }, []);
  return (
    <div className="term">
      <span className="c">{'// ' + note}</span>
      <div className="otp" aria-live="off">{code}</div>
      <span className="t">{expires} {left}s</span>
      <div className="otp-bar"><i style={{ transform: `scaleX(${left / 30})` }} /></div>
    </div>
  );
}
