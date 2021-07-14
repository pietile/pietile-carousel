/* eslint-disable */
const fs = require('fs');
const path = require('path');
const vite = require('vite');

const EXAMPLE_PATH = path.resolve(__dirname, 'static');
const TEMPLATE_PATH = path.resolve(__dirname, 'static/index.html');

async function generateStatic() {
  // Example bundle
  await vite.build({
    root: './example',
    build: {
      outDir: EXAMPLE_PATH,
    },
    configFile: false,
    emptyOutDir: true,
  });

  // SSR entry-point
  await vite.build({
    build: {
      ssr: './example/ssr.tsx',
      outDir: EXAMPLE_PATH,
      emptyOutDir: false,
      minify: false,
    },
    configFile: false,
  });

  // Load template
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

  // Get render function from compiled SSR entry-point
  const { render } = require('./static/ssr.js');

  // Render <App />
  const appHtml = await render();

  // Inject rendered html into template
  const html = template.replace('<!--app-html-->', appHtml);

  // Write template to bundle
  fs.writeFileSync(TEMPLATE_PATH, html);
}

void generateStatic();
