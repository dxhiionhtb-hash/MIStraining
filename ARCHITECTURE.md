# Arquitectura del Sistema - SOC-2026 (SPA)

Este documento detalla los principios de diseño de software, flujo de datos reactivo y las decisiones de ingeniería detrás del Centro de Operaciones de Ciber-Resiliencia.

---

## 1. Patrón Arquitectónico General

La aplicación sigue el patrón **Modular Single-Page Application (SPA)** sin dependencias de frameworks pesados, garantizando:
- **Cero tiempo de compilación necesario** para ejecutar en desarrollo (`index.html` corre directamente con ES Modules).
- **Tiempo de carga inicial < 1.5s** con 60 FPS garantizados en animaciones CSS aceleradas por GPU (`transform`, `opacity`).
- **Compatibilidad directa con Google AI Studio y LMS** gracias al bundler `scripts/build.mjs` que genera `dist/standalone.html`.

```
                    ┌───────────────────────────┐
                    │      stateManager         │
                    │ (Estado Global Reactivo)  │
                    └─────────────┬─────────────┘
                                  │
          ┌───────────────┬───────┴───────┬───────────────┐
          ▼               ▼               ▼               ▼
    ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
    │  TopHUD   │   │Station M1 │   │Station M2 │   │Station M3 │ ...
    └───────────┘   └───────────┘   └───────────┘   └───────────┘
```

---

## 2. Gestión de Estado Reactivo (`js/state.js`)

El estado global se gestiona mediante un patrón *Observable / Pub-Sub* ultraliviano:

### Propiedades Principales
- `shieldScore`: Entero de 0 a 100. Representa el nivel global de resiliencia de la empresa. Se incrementa con aciertos operacionales.
- `streak`: Entero >= 0. Contador de decisiones correctas consecutivas. Se reinicia ante un error de juicio, promoviendo la concentración continua.
- `completedMissions`: Mapa booleano `{ m1, m2, m3, m4 }`. Controla el desbloqueo de insignias y el reporte de diagnóstico final.
- `audioEnabled`: Booleano para el silenciamiento global de efectos sonoros.
- `telemetryLog`: Historial en memoria de las últimas 20 acciones ejecutadas con marca temporal.

---

## 3. Motor de Audio Sintético (`js/audio.js`)

Para cumplir con el requerimiento de cero dependencias externas y cero errores por CORS:
- Se implementó un sintetizador basado exclusivamente en la **Web Audio API** estándar de los navegadores.
- Los efectos acústicos se generan combinando nodos `OscillatorNode` (senoidales, triangulares y ondas de sierra) y `GainNode` con curvas exponenciales de decaimiento (`exponentialRampToValueAtTime`).
- Efectos disponibles:
  - `playClick()`: Transitorio mecánico ultracorto (30ms).
  - `playScan()`: Chirrido con modulación de frecuencia ascendente para el escáner de Rayos X.
  - `playSanitize()`: Bitono armónico para la anonimización de tokens sensibles.
  - `playWarning()`: Acorde descendente en sierra para desvíos tácticos.
  - `playAlarm()`: Pulsación de emergencia para la crisis de ransomware.
  - `playSuccess()`: Tríada mayor ascendente (C5 - E5 - G5).
  - `playContainmentSuccess()`: Acorde triunfal de contención (A4 - C#5 - E5 - A5).

---

## 4. Filosofía Pedagógica y No-Blame Culture

1. **Cero Metacomentarios:** La interfaz no se refiere a sí misma como un curso, lección o tutorial. El usuario asume el rol de operador activo del Centro de Operaciones.
2. **Cultura de Cero Culpa:** Cuando el usuario comete un error (ej. intentar restaurar copias antes de apagar el equipo en un ataque de ransomware), el sistema no le aplica sanciones ni resetea todo el módulo; despliega un micro-briefing táctico de 2 a 3 líneas explicando el impacto operacional de la acción para consolidar el hábito.
3. **Cero Flashcards / Cero Cuestionarios Pasivos:** Todo aprendizaje ocurre mediante interacción física directa con elementos del sistema: clics en remitentes, anonimización manual de tokens, inspección de objetos en la escena vectorial y ejecución cronológica estricta de protocolos de crisis.
