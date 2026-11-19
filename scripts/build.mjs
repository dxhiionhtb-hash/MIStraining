import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

// 1. Concatenar CSS
const cssFiles = [
  'css/variables.css',
  'css/main.css',
  'css/thm-room.css',
  'css/instructor.css',
  'css/gsap-motions.css',
  'css/stations/overview.css',
  'css/stations/station-m1.css',
  'css/stations/station-m2.css',
  'css/stations/station-m3.css',
  'css/stations/station-m4.css',
  'css/stations/diagnosis.css',
  'css/responsive.css'
];

let bundledCss = '';
for (const file of cssFiles) {
  const filePath = path.join(ROOT, file);
  if (fs.existsSync(filePath)) {
    bundledCss += `\n/* --- ${file} --- */\n` + fs.readFileSync(filePath, 'utf-8');
  }
}

// 2. Concatenar JS
const jsFiles = [
  'js/components/svg-icons.js',
  'js/components/motion-director.js',
  'js/components/instructor-mode.js',
  'js/components/gsap-motion-engine.js',
  'js/audio.js',
  'js/state.js',
  'js/components/hud.js',
  'js/stations/overview.js',
  'js/stations/station-m1.js',
  'js/stations/station-m2.js',
  'js/stations/station-m3.js',
  'js/stations/station-m4.js',
  'js/stations/diagnosis.js',
  'js/app.js'
];

let bundledJs = '';
for (const file of jsFiles) {
  const filePath = path.join(ROOT, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/^import\s+.*?;/gm, '');
    content = content.replace(/^export\s+const\s+/gm, 'const ');
    content = content.replace(/^export\s+class\s+/gm, 'class ');
    content = content.replace(/^export\s+default\s+/gm, '');
    bundledJs += `\n// --- ${file} ---\n` + content;
  }
}

// 3. Leer template HTML
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf-8');

html = html.replace(/<!-- Hojas de Estilo.*?<link rel="stylesheet" href="css\/responsive.css">/s, `<style>\n${bundledCss}\n</style>`);
html = html.replace(/<script type="module" src="js\/app.js"><\/script>/, `<script>\n(() => {\n${bundledJs}\n})();\n</script>`);

fs.writeFileSync(path.join(ROOT, 'dist', 'standalone.html'), html, 'utf-8');
console.log('✓ Build finalizado con éxito: dist/standalone.html generado.');
