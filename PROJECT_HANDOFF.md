# CyberShield Awareness Platform & Viral Shorts Pipeline — Handoff del Proyecto

- **Ruta original:** `C:\apps\MIS\ciber`
- **Repositorio GitHub:** `https://github.com/dxhiionhtb-hash/MIStraining`
- **Fecha de exportación:** 19 de noviembre de 2026
- **Historial completo de chat exportado:** [CHAT_LOG_EXPORT.md](CHAT_LOG_EXPORT.md) (53 mensajes de la sesión `f7df23c0-2e0d-481d-99c6-54bb9a3e1a07`)

---

## 1. Arquitectura General

Proyecto monolítico escalable compuesto por dos módulos integrados sobre una sola base de código:

1. **Plataforma Interactiva de Security Awareness (`index.html`, `js/`, `css/`, `dist/`):**
   - SPA modular con ES Modules nativos y bundler de archivo único (`scripts/build.mjs` → `dist/standalone.html`).
   - 4 módulos interactivos basados en las presentaciones oficiales en `references_docs/` (`Phishing.pptx`, `AI_Safety_and_data_protection.pptx`, `USB.pptx`, `Ransomware.pptx`) más evaluación final y generación de certificado.
   - Modo instructor paso a paso, diagramas vectoriales animados con GSAP (`preview-motions.html`) y síntesis de efectos de sonido con Web Audio API (`js/audio.js`).
   - Estándares visuales aplicados mediante skills `.agents/` (`ui-ux-pro-max`, `frontend-design`).

2. **Pipeline de Cápsulas Verticales 9:16 — `viral-claude-shorts` Flat 2D (`shorts.html`, `core/`, `styles/flat2d/`, `videos/`, `scripts/`):**
   - Estudio interactivo para producir cápsulas de **25 segundos** (5 actos de ~5s) en formato 1080×1920 con física dinámica, continuidad de personajes/escenarios y auto-ducking de música y SFX.
   - Voz natural en español latino ejecutada en local mediante `scripts/voicebox-server.mjs` y `core/voice.ts`.
   - Proyectos de video actuales en `videos/`: `phishing-alert`, `ai-safety-alert`, `badusb-alert`, `ransomware-alert`, `aviones`, `blue-sky`, `detail-demo`.
   - Especificación de producción documentada en [CLAUDE.md](CLAUDE.md).

---

## 2. Estructura del Repositorio

```text
C:\apps\MIS\ciber\
├── GEMINI.md                    Reglas de salida estricta de Antigravity
├── CLAUDE.md                    Reglas de producción de viral-claude-shorts (25s, Voicebox)
├── ARCHITECTURE.md              Arquitectura SPA, estado reactivo y motor Web Audio
├── README.md                    Documentación funcional de módulos de awareness
├── PROJECT_HANDOFF.md           Este documento de traspaso
├── CHAT_LOG_EXPORT.md           Exportación completa del historial de chat (53 mensajes)
├── index.html                   Plataforma interactiva de Security Awareness
├── shorts.html                  Estudio interactivo CyberShorts Studio (Flat 2D)
├── preview-motions.html         Vista previa de animaciones vectoriales GSAP
├── package.json                 Scripts: start, build, preview, typecheck, shorts:preview, shorts:check
├── tsconfig.json                Configuración TypeScript
├── .agents/                     Skills de diseño instaladas (ui-ux-pro-max, frontend-design)
├── assets/                      Recursos visuales de la plataforma
├── css/ & js/                   Estilos y lógica modular SPA
├── dist/                        Build autocontenido (standalone.html)
├── core/                        Motor TypeScript de shorts (voice, scenes, storyboard, render, mix, music, preview, typecheck)
├── prompts/                     Prompts de generación de guiones y escenas
├── scripts/                     build.mjs, voicebox-server.mjs, generate-all-audio.mjs
├── styles/flat2d/               Motor visual Flat 2D (instalar dependencias con npm install dentro de styles/flat2d)
├── videos/                      7 proyectos de shorts con guiones, escenas y audio
└── references_docs/             4 presentaciones PPTX corporativas originales
```

---

## 3. Reglas y Chat Log

- **Reglas de Antigravity del proyecto:** [GEMINI.md](GEMINI.md) (se cargan automáticamente al abrir este repositorio en cualquier PC).
- **Chat log exportado en Markdown:** [CHAT_LOG_EXPORT.md](CHAT_LOG_EXPORT.md).
- **Respaldo JSONL original (fuera del repo):**
  - `C:\Users\Administrator\.gemini\antigravity\brain\f7df23c0-2e0d-481d-99c6-54bb9a3e1a07\.system_generated\logs\transcript.jsonl`
  - `C:\Users\Administrator\.gemini\antigravity\brain\7a876b73-c1d0-44b9-9f0e-2d55c83e41cc\.system_generated\logs\transcript.jsonl`

---

## 4. Puesta en Marcha en la Nueva PC

```powershell
# 1. Clonar el repositorio
git clone https://github.com/dxhiionhtb-hash/MIStraining.git
cd MIStraining

# 2. Instalar dependencias (raíz y motor Flat 2D)
npm install
npm --prefix styles/flat2d install

# 3. Ejecutar plataforma de awareness (http://localhost:3000)
npm start

# 4. Ejecutar estudio de reels / shorts con Voicebox local
node scripts/voicebox-server.mjs
# En otra terminal:
npx serve -l 8085 .
# Abrir http://localhost:8085/shorts.html
```

### Comandos útiles del pipeline de shorts
```powershell
node core/voice.ts videos/<topic>
node core/scenes.ts videos/<topic>
node core/storyboard.ts videos/<topic>
npm run typecheck
npm run build
```
