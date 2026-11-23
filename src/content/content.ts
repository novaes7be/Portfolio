// Todo o texto do site, em PT e EN. Nada aqui é métrica inventada.
import type { IconName } from '../lib/icons';

export type Lang = 'pt' | 'en';

export const LINKS = {
  email: 'novaes.zxz@gmail.com',
  github: 'https://github.com/novaes7be',
  linkedin: 'https://br.linkedin.com/in/bernardo-nobrega-novaes/',
  instagram: 'https://instagram.com/novaes.zxz'
};

export type Project = {
  id: string; name: string; kind: string; summary: string; role: string;
  stack: string[]; how: string[]; repo: string; repoLabel: string; demo?: string;
  media: 'jardiff' | 'shorter' | 'totp';
};

/** Logos que não existem no Simple Icons: coloque o SVG oficial em public/logos e informe o caminho aqui. */
export const LOCAL_LOGOS: Record<'fiap' | 'bradesco', string> = { fiap: '', bradesco: '' };
export type Org = { name: string; issuer: string; logo: IconName | keyof typeof LOCAL_LOGOS };

export type Video = { title: string; text: string; youtube?: string; mp4?: string; poster?: string };

/* Vídeos: preencha youtube (id) ou mp4 (caminho em /public) para ativar o player. */
const VIDEO_SRC: Pick<Video, 'youtube' | 'mp4' | 'poster'>[] = [{}, {}, {}];

const pt = {
  meta: { lang: 'pt-BR', cv: 'cv/curriculo-bernardo-novaes-pt.pdf' },
  nav: { about: 'Sobre', projects: 'Projetos', skills: 'Stack', journey: 'Trajetória', contact: 'Contato', menu: 'Menu', close: 'Fechar', lang: 'Idioma', texture: 'Textura do fundo', github: 'GitHub (abre em nova aba)', skip: 'Pular para o conteúdo', home: 'Bernardo Novaes, início' },
  intro: { skip: 'Pular' },
  hero: {
    status: 'Aberto a estágio em tecnologia',
    eyebrow: 'Desenvolvedor back-end · Java & Spring Boot',
    lines: ['Olá, sou o Bernardo.', 'Bem-vindo ao meu', 'portfólio.'],
    text: 'Sou estudante de Desenvolvimento de Software Multiplataforma na FATEC Osasco, atualmente no 2º semestre. Construo APIs REST com Java e Spring Boot, automações e ferramentas do zero, e gosto de entender o que acontece por baixo da biblioteca.',
    ctaProjects: 'Ver projetos', ctaContact: 'Falar comigo',
    meta: [['Base', 'São Paulo, BR'], ['Foco', 'APIs REST em Java'], ['Inglês', 'C1 · ILAC Toronto', 'Duolingo English Test: 129']] as [string, string, string?][]
  },
  about: {
    label: 'Sobre',
    statement: 'Prefiro entender o algoritmo antes de usar a biblioteca. Implementei TOTP na mão, publiquei uma GitHub Action e sigo construindo APIs em camadas com Spring Boot e JPA.',
    paragraphs: [
      'Meu foco é back-end: arquitetura em camadas (controller, service, repository), persistência com JPA e código organizado em módulos. Pratico estruturas de dados em Java e tenho experiência inicial com Flutter, o que me ajuda a enxergar a aplicação de ponta a ponta.',
      'Fiz imersão em inglês na ILAC, em Toronto, e cheguei ao nível C1. Agora procuro um estágio para aprender em time e contribuir com projetos reais.'
    ],
    principlesTitle: 'Como trabalho',
    principles: [
      ['Entender antes de usar', 'Implemento o algoritmo uma vez na mão para saber o que a ferramenta faz por mim.'],
      ['Automatizar o repetitivo', 'Se uma checagem se repete no CI, ela vira ferramenta. Assim nasceu o JARDIFF.'],
      ['Escolher a peça certa', 'Redis para um redirecionamento que precisa ser instantâneo, e não mais complexidade do que o problema pede.']
    ] as [string, string][]
  },
  projects: {
    label: 'Projetos', title: 'Trabalho selecionado',
    intro: 'Projetos pequenos e completos, cada um para responder a uma pergunta técnica.',
    role: 'Meu papel', how: 'Como funciona', more: 'Ver detalhes', less: 'Ocultar detalhes', illustrative: 'exemplo ilustrativo',
    totpNote: 'código real, gerado agora no seu navegador (RFC 6238, chave de demonstração)', expires: 'expira em',
    items: [
      { id: 'jardiff', name: 'JARDIFF', kind: 'GitHub Action · publicada no Marketplace', media: 'jardiff',
        summary: 'Action que automatiza a comparação de arquivos JAR dentro de pipelines de CI.',
        role: 'Projeto inteiro: lógica de comparação, empacotamento e publicação no Marketplace.',
        stack: ['Java', 'GitHub Actions', 'CI/CD'],
        how: ['Recebe dois JARs no workflow.', 'Compara o conteúdo e aponta o que entrou, saiu ou mudou.', 'Roda como etapa do pipeline, sem passo manual.'],
        repo: 'https://github.com/novaes7be/JARDIFF', repoLabel: 'Código no GitHub' },
      { id: 'shorter', name: 'URL Shorter', kind: 'API REST', media: 'shorter',
        summary: 'Encurtador de URLs com Redis para guardar os links e redirecionar rápido.',
        role: 'API REST, modelagem dos dados no Redis e regra de redirecionamento.',
        stack: ['Java', 'Redis', 'REST'],
        how: ['Um POST cria o código curto e guarda o destino no Redis.', 'Um GET no código responde com redirecionamento para o destino.', 'Chave-valor em memória mantém a leitura rápida.'],
        repo: 'https://github.com/novaes7be/URL--Shorter', repoLabel: 'Código no GitHub' },
      { id: 'totp', name: 'TOTP from scratch', kind: 'Segurança · em evolução', media: 'totp',
        summary: 'Gerador de códigos de uso único (2FA) feito sem biblioteca, evoluindo para um CRUD protegido.',
        role: 'Implementação do algoritmo completo, da chave ao código de 6 dígitos.',
        stack: ['Java', 'HMAC', 'Base32 · RFC 4648', 'Spring'],
        how: ['Decodifica a chave secreta em Base32.', 'Calcula o HMAC do contador de tempo (janelas de 30 s).', 'Aplica o truncamento dinâmico e gera 6 dígitos.'],
        repo: 'https://github.com/novaes7be?tab=repositories', repoLabel: 'Ver no GitHub' }
    ] as Project[]
  },
  videos: {
    label: 'Demos', title: 'Projetos em movimento', soon: 'Vídeo em breve', play: 'Reproduzir vídeo',
    items: [
      { title: 'JARDIFF', text: 'A Action comparando dois JARs num pipeline.' },
      { title: 'URL Shorter', text: 'Criando um link curto e seguindo o redirecionamento.' },
      { title: 'TOTP from scratch', text: 'Gerando e validando códigos de uso único.' }
    ] as Video[]
  },
  skills: {
    label: 'Stack', title: 'Ferramentas que uso',
    intro: 'Sem barra de porcentagem: só o que uso no dia a dia e o que ainda estou começando.',
    daily: 'no dia a dia', initial: 'experiência inicial',
    groups: [
      { name: 'Back-end', items: [['java', 'Java', 1], ['spring', 'Spring Boot', 1], ['hibernate', 'JPA', 1], ['rest', 'APIs REST', 1]] },
      { name: 'Dados', items: [['redis', 'Redis', 1], ['hibernate', 'Persistência com JPA', 1]] },
      { name: 'Infra e ferramentas', items: [['docker', 'Docker', 1], ['git', 'Git', 1], ['gha', 'GitHub Actions', 1], ['postman', 'Postman', 1]] },
      { name: 'Front-end e mobile', items: [['flutter', 'Flutter', 0], ['cpp', 'C++', 0]] }
    ] as { name: string; items: [IconName | 'rest', string, 0 | 1][] }[],
    deepTitle: 'Onde fui mais fundo',
    deep: ['Autenticação em duas etapas (2FA)', 'Codificação de dados (Base32, RFC 4648)', 'Manipulação de bits']
  },
  journey: {
    label: 'Trajetória', title: 'Formação e experiência',
    timeline: [
      { when: 'jun — ago/2024', what: 'ILAC · Toronto, Canadá', detail: 'Programa de imersão em inglês. Concluí no nível C1 (High-Advanced, nível 14). Duolingo English Test: 129.', tag: 'Intercâmbio' },
      { when: 'mai/2025 — hoje', what: 'Desenvolvedor back-end · projetos acadêmicos', detail: 'APIs CRUD em camadas, persistência com JPA, código limpo e prática de estruturas de dados em Java.', tag: 'Experiência' },
      { when: '2026 — 2028', what: 'FATEC Osasco', detail: 'Tecnólogo em Desenvolvimento de Software Multiplataforma. Cursando o 2º semestre.', tag: 'Formação' }
    ],
    certsTitle: 'Certificações',
    certs: [
      { name: 'Java Foundations', issuer: 'Oracle', logo: 'oracle' },
      { name: 'C++ Essentials 1', issuer: 'Cisco Networking Academy', logo: 'cisco' },
      { name: 'AI Fluency: Framework & Foundations', issuer: 'Claude Academy · Anthropic', logo: 'claude' },
      { name: 'Projetos de Sistemas de TI', issuer: 'Fundação Bradesco', logo: 'bradesco' },
      { name: 'Introdução à Gestão de Projetos', issuer: 'Fundação Bradesco', logo: 'bradesco' }
    ] as Org[],
    eventsTitle: 'Eventos',
    events: [
      { name: 'FIAP Connect Summit', issuer: 'FIAP', logo: 'fiap' },
      { name: 'AWS Summit', issuer: 'Amazon Web Services', logo: 'aws' },
      { name: 'Google Cloud Summit', issuer: 'Google Cloud', logo: 'googlecloud' }
    ] as Org[]
  },
  contact: {
    label: 'Contato', title: ['Vamos', 'conversar?'],
    text: 'Estou aberto a estágio em tecnologia. O caminho mais rápido é o e-mail.',
    copy: 'Copiar e-mail', copied: 'E-mail copiado', copyFail: 'Não deu para copiar', cv: 'Baixar CV (PDF)'
  },
  footer: { built: 'Feito com React, TypeScript e GSAP', top: 'Voltar ao topo', local: 'Hora local' }
};

export type Content = typeof pt;

const en: Content = {
  meta: { lang: 'en', cv: 'cv/resume-bernardo-novaes-en.pdf' },
  nav: { about: 'About', projects: 'Work', skills: 'Stack', journey: 'Journey', contact: 'Contact', menu: 'Menu', close: 'Close', lang: 'Language', texture: 'Background texture', github: 'GitHub (opens in a new tab)', skip: 'Skip to content', home: 'Bernardo Novaes, home' },
  intro: { skip: 'Skip' },
  hero: {
    status: 'Open to tech internships',
    eyebrow: 'Back-end developer · Java & Spring Boot',
    lines: ["Hi, I'm Bernardo.", 'Welcome to my', 'portfolio.'],
    text: "I'm a Multiplatform Software Development student at FATEC Osasco, currently in my 2nd semester. I build REST APIs with Java and Spring Boot, automations and tools from scratch, and I like knowing what happens beneath the library.",
    ctaProjects: 'See work', ctaContact: 'Get in touch',
    meta: [['Based', 'São Paulo, BR'], ['Focus', 'REST APIs in Java'], ['English', 'C1 · ILAC Toronto', 'Duolingo English Test: 129']]
  },
  about: {
    label: 'About',
    statement: 'I would rather understand the algorithm before using the library. I implemented TOTP by hand, published a GitHub Action and keep building layered APIs with Spring Boot and JPA.',
    paragraphs: [
      'My focus is back-end: layered architecture (controller, service, repository), JPA persistence and modular code. I practice data structures in Java and have initial experience with Flutter, which helps me see the application end to end.',
      'I did an English immersion program at ILAC in Toronto and reached C1. Now I am looking for an internship to learn in a team and contribute to real projects.'
    ],
    principlesTitle: 'How I work',
    principles: [
      ['Understand before using', 'I implement the algorithm once by hand to know what the tool does for me.'],
      ['Automate the repetitive', 'If a check repeats in CI, it becomes a tool. That is how JARDIFF was born.'],
      ['Pick the right piece', 'Redis for a redirect that must be instant, and no more complexity than the problem needs.']
    ]
  },
  projects: {
    label: 'Work', title: 'Selected work',
    intro: 'Small, complete projects, each one answering a technical question.',
    role: 'My role', how: 'How it works', more: 'Show details', less: 'Hide details', illustrative: 'illustrative example',
    totpNote: 'real code, generated now in your browser (RFC 6238, demo key)', expires: 'expires in',
    items: [
      { ...pt.projects.items[0], kind: 'GitHub Action · published on the Marketplace',
        summary: 'Action that automates JAR file comparison inside CI pipelines.',
        role: 'The whole project: comparison logic, packaging and Marketplace publishing.',
        how: ['Takes two JARs in the workflow.', 'Compares their contents and flags what was added, removed or changed.', 'Runs as a pipeline step, no manual work.'], repoLabel: 'Code on GitHub' },
      { ...pt.projects.items[1], kind: 'REST API',
        summary: 'URL shortener using Redis to store links and redirect fast.',
        role: 'REST API, Redis data model and redirect logic.',
        how: ['A POST creates the short code and stores the target in Redis.', 'A GET on the code responds with a redirect to the target.', 'In-memory key-value keeps reads fast.'], repoLabel: 'Code on GitHub' },
      { ...pt.projects.items[2], kind: 'Security · in progress',
        summary: 'One-time password (2FA) generator built without libraries, evolving into a protected CRUD.',
        role: 'The full algorithm, from secret key to 6-digit code.',
        how: ['Decodes the Base32 secret key.', 'Computes the HMAC of the time counter (30 s windows).', 'Applies dynamic truncation to produce 6 digits.'], repoLabel: 'View on GitHub' }
    ]
  },
  videos: {
    label: 'Demos', title: 'Projects in motion', soon: 'Video coming soon', play: 'Play video',
    items: [
      { title: 'JARDIFF', text: 'The Action comparing two JARs in a pipeline.' },
      { title: 'URL Shorter', text: 'Creating a short link and following the redirect.' },
      { title: 'TOTP from scratch', text: 'Generating and validating one-time codes.' }
    ]
  },
  skills: {
    label: 'Stack', title: 'Tools I use',
    intro: 'No percentage bars: just what I use daily and what I am still starting with.',
    daily: 'daily use', initial: 'getting started',
    groups: [
      { name: 'Back-end', items: [['java', 'Java', 1], ['spring', 'Spring Boot', 1], ['hibernate', 'JPA', 1], ['rest', 'REST APIs', 1]] },
      { name: 'Data', items: [['redis', 'Redis', 1], ['hibernate', 'JPA persistence', 1]] },
      { name: 'Infra & tooling', items: [['docker', 'Docker', 1], ['git', 'Git', 1], ['gha', 'GitHub Actions', 1], ['postman', 'Postman', 1]] },
      { name: 'Front-end & mobile', items: [['flutter', 'Flutter', 0], ['cpp', 'C++', 0]] }
    ],
    deepTitle: 'Where I went deeper',
    deep: ['Two-factor authentication (2FA)', 'Data encoding (Base32, RFC 4648)', 'Bit manipulation']
  },
  journey: {
    label: 'Journey', title: 'Education & experience',
    timeline: [
      { when: 'Jun — Aug 2024', what: 'ILAC · Toronto, Canada', detail: 'English immersion program. Completed at C1 level (High-Advanced, level 14). Duolingo English Test: 129.', tag: 'Exchange' },
      { when: 'May 2025 — now', what: 'Back-end developer · academic projects', detail: 'Layered CRUD APIs, JPA persistence, clean code and data structures practice in Java.', tag: 'Experience' },
      { when: '2026 — 2028', what: 'FATEC Osasco', detail: "Associate's degree in Multiplatform Software Development. Currently in the 2nd semester.", tag: 'Education' }
    ],
    certsTitle: 'Certifications',
    certs: [
      { name: 'Java Foundations', issuer: 'Oracle', logo: 'oracle' },
      { name: 'C++ Essentials 1', issuer: 'Cisco Networking Academy', logo: 'cisco' },
      { name: 'AI Fluency: Framework & Foundations', issuer: 'Claude Academy · Anthropic', logo: 'claude' },
      { name: 'IT Systems Projects', issuer: 'Fundação Bradesco', logo: 'bradesco' },
      { name: 'Introduction to Project Management', issuer: 'Fundação Bradesco', logo: 'bradesco' }
    ],
    eventsTitle: 'Events',
    events: pt.journey.events
  },
  contact: {
    label: 'Contact', title: ["Let's", 'talk?'],
    text: 'I am open to tech internships. Email is the fastest way.',
    copy: 'Copy email', copied: 'Email copied', copyFail: "Couldn't copy", cv: 'Download CV (PDF)'
  },
  footer: { built: 'Built with React, TypeScript and GSAP', top: 'Back to top', local: 'Local time' }
};

pt.videos.items = pt.videos.items.map((v, i) => ({ ...v, ...VIDEO_SRC[i] }));
en.videos.items = en.videos.items.map((v, i) => ({ ...v, ...VIDEO_SRC[i] }));

export const CONTENT: Record<Lang, Content> = { pt, en };
