import { useCallback, useEffect, useState } from 'react';
import { initScroll } from './lib/scroll';
import { ScrollTrigger } from './lib/motion';
import { useI18n } from './lib/i18n';
import { Intro } from './components/Intro';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Videos } from './components/Videos';
import { Skills } from './components/Skills';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Background } from './components/Background';

export function App() {
  const { t } = useI18n();
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);
  useEffect(() => { initScroll(); }, []);
  useEffect(() => { document.fonts?.ready.then(() => ScrollTrigger.refresh()); }, []);
  return (
    <>
      <a className="skip-link" href="#main">{t.nav.skip}</a>
      <Background />
      <Intro onDone={done} />
      <Header ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <About />
        <Projects />
        <Videos />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
