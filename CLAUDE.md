# viral-claude-shorts // CyberShield Awareness Pipeline (25s Flat 2D)

Este repositorio convierte narraciones de concientización y ciberseguridad en cápsulas animadas 9:16 (shorts) de 25 segundos, sincronizadas con voz en español latino sintetizada localmente mediante Voicebox, con física dinámica, narrativa visual de 5 actos y cero meta-comentarios técnicos.

## 1. Reglas Sagradas de Producción

1. **Voz Local Voicebox en Español Latino:**
   - Toda narración se sintetiza en local contra `http://127.0.0.1:17493` usando la voz latina instalada (`Microsoft Server Speech Text to Speech Voice (es-MX, Hilda)` o perfiles `Carlos (Español Latino)` / `Sofía (Español Latino)`).
   - Comando canónico: `node core/voice.ts videos/<topic>`.
   - Genera `videos/<topic>/audio.wav` (~23–26s, 48 kHz mono PCM) sin dependencia de internet ni servicios en la nube.

2. **Estructura Rítmica de 25 Segundos (5 Escenas de ~5s):**
   - **Acto 1 (0.0s – 5.0s) [Gancho/Rutina]:** Contexto cotidiano del usuario (oficina, pasillo, escritorio) con animación ambiental viva.
   - **Acto 2 (5.0s – 10.0s) [Incidente/Alarma]:** Entrada del vector de amenaza (notificación engañosa, USB hallado, ransomware emergiendo) con impacto sonoro y visual (overshoot, alerta cromática).
   - **Acto 3 (10.0s – 15.0s) [Análisis Forense / Analogía Física]:** Desmontaje visual del engaño (zoom a dominio falso, radiografía de microcontrolador, reloj de rescate, vector de datos).
   - **Acto 4 (15.0s – 20.0s) [Defensa Operativa]:** Acción correctiva inmediata (reporte de phishing, bolsa antiestática, restauración desde snapshot, validación de prompt).
   - **Acto 5 (20.0s – 25.0s) [Regla de Oro / Resiliencia]:** Síntesis memorable, escudo protector activo, mensaje táctico final claro.

3. **Animación Dinámica y Rigurosa (Motion Graphics de Alto Impacto):**
   - **Física Real:** Aplicar squash & stretch en impactos, anticipación (retroceso previo al movimiento), overshoot (`back.out(1.8)` o `elastic.out`) y desaceleración natural.
   - **Prohibido el aburrimiento:** Nada de movimientos lineales simples o desplazamientos planos de izquierda a derecha. Cada bloque de texto debe activar una transformación física (despliegue mecánico, rayo de escaneo, zoom de lupa, rotación con perspectiva simulada).
   - **Máximo 4 palabras en pantalla por escena:** Títulos concisos con pill de realce (`highlight`), legibles en 2 segundos.
   - **Continuidad de Personajes y Entornos:** Carlos, Sofía y la silueta del atacante mantienen consistencia anatómica, paleta y accesorios entre escenas consecutivas.
   - **Zona Segura Estricta (TikTok / Shorts / Reels):** Todo elemento clave dentro de `x: 80–1000`, `y: 160–1600` en canvas `1080x1920`.

4. **Diseño de Sonido y Auto-Ducking:**
   - La voz de la narración manda al 100% de volumen.
   - Música de fondo sintetizada dinámicamente con atenuación (ducking) automática al 15-20% mientras suena la voz.
   - Efectos de sonido táctiles (clic firme, chispazo de glitch, sellado hermético, escudo de energía) al 35-45%, jamás cubriendo las palabras clave.

5. **Regla de Contenido (Cero Meta-Comentarios):**
   - El texto visible en pantalla (copy) debe ser 100% orientado al usuario final y a la cultura de seguridad.
   - Prohibido terminantemente mencionar frameworks, DOM, HTML, CSS, JavaScript, Python, React o librerías de desarrollo en la interfaz.

## 2. Flujo de Trabajo Rápido

```bash
# 1. Asegurar servidor local de Voicebox
node scripts/voicebox-server.mjs &

# 2. Generar audio latino para el tema
node core/voice.ts videos/<topic>

# 3. Validar escenas, storyboard y tipos
node core/scenes.ts videos/<topic>
node core/storyboard.ts videos/<topic>
npm run typecheck

# 4. Verificar en estudio interactivo
# Navegar a http://localhost:8085/shorts.html
```
