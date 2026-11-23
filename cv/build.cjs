// Gera os PDFs a partir de cv.html. Uso: node cv/build.cjs
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  const src = 'file://' + path.join(__dirname, 'cv.html');
  for (const [lang, out] of [['pt', 'curriculo-bernardo-novaes-pt.pdf'], ['en', 'resume-bernardo-novaes-en.pdf']]) {
    await p.goto(src + '?lang=' + lang);
    await p.pdf({ path: path.join(__dirname, '..', 'public', 'cv', out), format: 'A4', printBackground: true });
    console.log('ok', out);
  }
  await b.close();
})();
