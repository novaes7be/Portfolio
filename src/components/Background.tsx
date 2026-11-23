/** Fundo padrão do site: grade de colunas + textura escolhida (via data-texture no <html>). Sem animação. */
export function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__tex" />
      <div className="bg__grid">{Array.from({ length: 12 }, (_, i) => <span key={i} />)}</div>
      <div className="bg__vignette" />
    </div>
  );
}
