# Portfólio — Bernardo Novaes

React + TypeScript + Vite, animações com GSAP (ScrollTrigger, SplitText) e rolagem suave com Lenis.

## Rodar

```bash
npm install
npm run dev
```

Build de produção (Vercel detecta Vite sozinha; saída em `dist/`):

```bash
npm run build
```

## Onde editar

- Textos PT/EN: `src/content/content.ts`.
- Vídeos: `VIDEO_SRC` em `src/content/content.ts` (id do YouTube ou `.mp4` em `public/`).
- Cores, fontes e espaçamentos: tokens no topo de `src/styles/global.css`.
- Currículo: `cv/cv.html`; depois rode `npm run cv` para gerar os PDFs em `public/cv/`.

## Créditos

- Assinatura: contornos da fonte Herr Von Muellerhoff (SIL OFL 1.1).
- Ícones: Simple Icons (CC0).
