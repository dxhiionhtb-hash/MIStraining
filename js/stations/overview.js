/**
 * OVERVIEW / MATRIZ TÁCTICA DE APRENDIZAJE & REFLEJOS
 * Motivo Central: El Factor Humano como Nodo Defensivo Perimetral
 * Diseñado según frontend-design, animate y sin muros de texto
 */

import { Icons } from '../components/svg-icons.js';
import { trainingState } from '../state.js';
import { sound } from '../audio.js';

export class OverviewModule {
  constructor(containerEl) {
    this.container = containerEl;
    this.render();
    this.attachEvents();
    trainingState.subscribe(() => this.updateView());
  }

  render() {
    this.container.innerHTML = `
      <div class="overview-grid">
        <!-- Panel Principal: Matriz Táctica y Misiones -->
        <section class="tactical-matrix-card">
          <div class="tactical-scan-overlay"></div>

          <div class="matrix-header">
            <div>
              <h2>Matriz Táctica de Amenazas y Reflejos</h2>
              <p>El factor humano es el nodo perimetral de contención. Entrena tus 4 reflejos defensivos.</p>
            </div>
            <span class="matrix-sys-tag">DEFENSA PERIMETRAL EN LÍNEA</span>
          </div>

          <!-- Grafo Interactivo SVG Central -->
          <div class="tactical-graph-container">
            <svg class="tactical-svg-canvas" viewBox="0 0 940 330" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Rejilla Táctica de Fondo -->
              <defs>
                <pattern id="tacticalGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
                </pattern>
                <linearGradient id="cyanBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00f5d4" stop-opacity="0.8"/>
                  <stop offset="100%" stop-color="#00f5d4" stop-opacity="0.1"/>
                </linearGradient>
              </defs>
              <rect width="940" height="330" fill="url(#tacticalGrid)"/>

              <!-- Anillos Radiales del Nodo Central -->
              <circle cx="470" cy="165" r="140" stroke="rgba(0, 245, 212, 0.05)" stroke-width="1"/>
              <circle cx="470" cy="165" r="95" stroke="rgba(0, 245, 212, 0.12)" stroke-width="1" stroke-dasharray="4 6"/>
              <circle cx="470" cy="165" r="50" stroke="rgba(0, 245, 212, 0.25)" stroke-width="1.5"/>

              <!-- Líneas Vectoriales Animadas (Data Wires) -->
              <!-- Vector 1: Phishing -> Centro -->
              <path id="wire_m1" d="M 190 75 Q 330 85 470 165" stroke="#ff4655" stroke-width="2" class="svg-flow-wire-danger" opacity="0.85"/>
              
              <!-- Vector 2: AI Safety -> Centro -->
              <path id="wire_m2" d="M 750 75 Q 610 85 470 165" stroke="#00f5d4" stroke-width="2" class="svg-flow-wire" opacity="0.85"/>
              
              <!-- Vector 3: USB -> Centro -->
              <path id="wire_m3" d="M 190 255 Q 330 245 470 165" stroke="#ff4655" stroke-width="2" class="svg-flow-wire-danger" opacity="0.85"/>
              
              <!-- Vector 4: Ransomware -> Centro -->
              <path id="wire_m4" d="M 750 255 Q 610 245 470 165" stroke="#00f5d4" stroke-width="2" class="svg-flow-wire" opacity="0.85"/>

              <!-- Nodo Central: FACTOR HUMANO -->
              <g id="node_center" class="svg-interactive-node" transform="translate(470, 165)">
                <circle r="36" fill="#121620" stroke="#00f5d4" stroke-width="2" class="svg-node-beacon"/>
                <circle r="44" fill="none" stroke="rgba(0, 245, 212, 0.2)" stroke-width="1"/>
                <g transform="translate(-10, -10)" stroke="#00f5d4" fill="none">
                  ${Icons.shieldCheck}
                </g>
                <text y="58" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="0.08em">NODO HUMANO</text>
                <text y="72" font-family="'JetBrains Mono', monospace" font-size="9" fill="#00f5d4" text-anchor="middle">DEFENSA PERIMETRAL</text>
              </g>

              <!-- Nodo 01: PHISHING (Top-Left) -->
              <g id="node_m1" class="svg-interactive-node" data-mod="m1" transform="translate(190, 75)">
                <rect x="-85" y="-30" width="170" height="60" rx="3" fill="#121620" stroke="#ff4655" stroke-width="1.2"/>
                <circle cx="-62" cy="0" r="14" fill="rgba(255, 70, 85, 0.15)"/>
                <text x="-62" y="4" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#ff4655" text-anchor="middle">01</text>
                <text x="-38" y="-6" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#ffffff">PHISHING</text>
                <text x="-38" y="10" font-family="'JetBrains Mono', monospace" font-size="9" fill="#94a3b8">Reflejo: Inspección</text>
              </g>

              <!-- Nodo 02: SEGURIDAD EN IA (Top-Right) -->
              <g id="node_m2" class="svg-interactive-node" data-mod="m2" transform="translate(750, 75)">
                <rect x="-85" y="-30" width="170" height="60" rx="3" fill="#121620" stroke="#00f5d4" stroke-width="1.2"/>
                <circle cx="-62" cy="0" r="14" fill="rgba(0, 245, 212, 0.15)"/>
                <text x="-62" y="4" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#00f5d4" text-anchor="middle">02</text>
                <text x="-38" y="-6" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#ffffff">IA & DATOS</text>
                <text x="-38" y="10" font-family="'JetBrains Mono', monospace" font-size="9" fill="#94a3b8">Reflejo: Anonimizar</text>
              </g>

              <!-- Nodo 03: MEDIOS USB (Bottom-Left) -->
              <g id="node_m3" class="svg-interactive-node" data-mod="m3" transform="translate(190, 255)">
                <rect x="-85" y="-30" width="170" height="60" rx="3" fill="#121620" stroke="#ff4655" stroke-width="1.2"/>
                <circle cx="-62" cy="0" r="14" fill="rgba(255, 70, 85, 0.15)"/>
                <text x="-62" y="4" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#ff4655" text-anchor="middle">03</text>
                <text x="-38" y="-6" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#ffffff">MEDIOS USB</text>
                <text x="-38" y="10" font-family="'JetBrains Mono', monospace" font-size="9" fill="#94a3b8">Reflejo: Cero Inserción</text>
              </g>

              <!-- Nodo 04: RANSOMWARE (Bottom-Right) -->
              <g id="node_m4" class="svg-interactive-node" data-mod="m4" transform="translate(750, 255)">
                <rect x="-85" y="-30" width="170" height="60" rx="3" fill="#121620" stroke="#00f5d4" stroke-width="1.2"/>
                <circle cx="-62" cy="0" r="14" fill="rgba(0, 245, 212, 0.15)"/>
                <text x="-62" y="4" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#00f5d4" text-anchor="middle">04</text>
                <text x="-38" y="-6" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#ffffff">RANSOMWARE</text>
                <text x="-38" y="10" font-family="'JetBrains Mono', monospace" font-size="9" fill="#94a3b8">Reflejo: Desconectar</text>
              </g>
            </svg>
          </div>

          <!-- Cuadrícula de 4 Tarjetas de Misión Táctica + Evaluación -->
          <div class="mission-cards-grid">
            <!-- Misión 01 -->
            <article class="mission-card-item" data-mod="m1">
              <div class="mission-card-top">
                <span class="mission-code">MISIÓN // 01</span>
                <span class="mission-status-pill" id="statusTag_m1">Pendiente</span>
              </div>
              <div class="mission-card-mid">
                <h3>Phishing & Manipulación Social</h3>
                <div class="mission-card-rule">
                  <span class="rule-icon">⚡</span>
                  <span>Verifica remitente y enlaces trampa antes del clic.</span>
                </div>
              </div>
              <div class="mission-card-bottom">
                <span class="mission-reflex-tag">Reflejo: Detección</span>
                <span class="mission-card-action">Desplegar ➔</span>
              </div>
            </article>

            <!-- Misión 02 -->
            <article class="mission-card-item" data-mod="m2">
              <div class="mission-card-top">
                <span class="mission-code">MISIÓN // 02</span>
                <span class="mission-status-pill" id="statusTag_m2">Pendiente</span>
              </div>
              <div class="mission-card-mid">
                <h3>Seguridad en IA & Datos</h3>
                <div class="mission-card-rule">
                  <span class="rule-icon">⚡</span>
                  <span>Cero secretos o clientes en modelos públicos.</span>
                </div>
              </div>
              <div class="mission-card-bottom">
                <span class="mission-reflex-tag">Reflejo: Sanitización</span>
                <span class="mission-card-action">Desplegar ➔</span>
              </div>
            </article>

            <!-- Misión 03 -->
            <article class="mission-card-item" data-mod="m3">
              <div class="mission-card-top">
                <span class="mission-code">MISIÓN // 03</span>
                <span class="mission-status-pill" id="statusTag_m3">Pendiente</span>
              </div>
              <div class="mission-card-mid">
                <h3>Medios Extraíbles & Físico</h3>
                <div class="mission-card-rule">
                  <span class="rule-icon">⚡</span>
                  <span>Cero memorias ajenas; bloquea tu pantalla.</span>
                </div>
              </div>
              <div class="mission-card-bottom">
                <span class="mission-reflex-tag">Reflejo: Tríada CIA</span>
                <span class="mission-card-action">Desplegar ➔</span>
              </div>
            </article>

            <!-- Misión 04 -->
            <article class="mission-card-item" data-mod="m4">
              <div class="mission-card-top">
                <span class="mission-code">MISIÓN // 04</span>
                <span class="mission-status-pill" id="statusTag_m4">Pendiente</span>
              </div>
              <div class="mission-card-mid">
                <h3>Ransomware & Respuesta</h3>
                <div class="mission-card-rule">
                  <span class="rule-icon">⚡</span>
                  <span>Desconecta la red de inmediato y notifica sin culpa.</span>
                </div>
              </div>
              <div class="mission-card-bottom">
                <span class="mission-reflex-tag">Reflejo: Aislamiento</span>
                <span class="mission-card-action">Desplegar ➔</span>
              </div>
            </article>
          </div>

          <!-- Misión 05: Evaluación y Certificado -->
          <article class="mission-card-item" data-mod="assessment" style="grid-column: 1 / -1; min-height: auto; border-color: rgba(0, 245, 212, 0.25);">
            <div class="mission-card-top">
              <span class="mission-code" style="color: #ffffff;">CERTIFICACIÓN // FINAL</span>
              <span class="mission-status-pill" id="statusTag_assessment">Evaluación</span>
            </div>
            <div class="mission-card-mid" style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="margin-top: 4px;">Assess your Power: Evaluación Situacional</h3>
                <div class="mission-card-rule">
                  <span class="rule-icon">🛡️</span>
                  <span>Valida tu criterio operativo ante 4 dilemas corporativos y descarga tu Certificado.</span>
                </div>
              </div>
              <span class="mission-card-action" style="font-size: var(--text-sm);">Iniciar Examen ➔</span>
            </div>
          </article>
        </section>

        <!-- Panel Lateral: Telemetría y Perfil de Agente -->
        <aside class="overview-sidebar">
          <div class="tactical-agent-card">
            <div class="agent-profile-row">
              <div class="agent-avatar-box">
                ${Icons.award}
              </div>
              <div class="agent-meta">
                <h4 id="overviewStudentName">Operador Corporativo</h4>
                <span>PROTOCOLO TÁCTICO 2026</span>
              </div>
            </div>

            <div class="tactical-telemetry-box">
              <div class="telemetry-item">
                <span class="t-label">Puntos Reflejo</span>
                <span class="t-val" id="overviewScoreBadge">120</span>
              </div>
              <div class="telemetry-item">
                <span class="t-label">Índice DRI</span>
                <span class="t-val" id="overviewDriVal">85%</span>
              </div>
            </div>

            <div class="badges-container">
              <span class="badges-header-label">Insignias Tácticas</span>
              <div class="tactical-badges-grid">
                <div class="t-badge-item" id="badge_phishing">
                  ${Icons.shield}
                  <span>Phishing Hunter</span>
                </div>
                <div class="t-badge-item" id="badge_ai">
                  ${Icons.cpu}
                  <span>AI Guardian</span>
                </div>
                <div class="t-badge-item" id="badge_usb">
                  ${Icons.usb}
                  <span>USB Defender</span>
                </div>
                <div class="t-badge-item" id="badge_ransom">
                  ${Icons.lock}
                  <span>Incident First</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    `;
  }

  attachEvents() {
    // Clic en tarjetas de misión
    const items = this.container.querySelectorAll('.mission-card-item');
    items.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const mod = btn.dataset.mod;
        trainingState.setModule(mod);
      });
      btn.addEventListener('mouseenter', () => {
        sound.playClick();
      });
    });

    // Clic directo en los nodos del SVG
    const svgNodes = this.container.querySelectorAll('.svg-interactive-node[data-mod]');
    svgNodes.forEach(node => {
      node.addEventListener('click', () => {
        sound.playClick();
        const mod = node.dataset.mod;
        trainingState.setModule(mod);
      });
      node.addEventListener('mouseenter', () => {
        sound.playClick();
      });
    });
  }

  updateView() {
    const state = trainingState.state;

    // Actualizar estado de las misiones
    ['m1', 'm2', 'm3', 'm4', 'assessment'].forEach(key => {
      const tag = this.container.querySelector(`#statusTag_${key}`);
      const btn = this.container.querySelector(`.mission-card-item[data-mod="${key}"]`);
      if (state.modulesStatus[key]?.completed) {
        if (tag) tag.textContent = 'Completado ✓';
        if (btn) btn.classList.add('completed');
      }
    });

    // Puntos
    const scoreBadge = this.container.querySelector('#overviewScoreBadge');
    if (scoreBadge) scoreBadge.textContent = state.awarenessPoints;

    // Insignias
    if (state.badgesEarned.phishing_hunter) this.container.querySelector('#badge_phishing')?.classList.add('unlocked');
    if (state.badgesEarned.ai_guardian) this.container.querySelector('#badge_ai')?.classList.add('unlocked');
    if (state.badgesEarned.usb_defender) this.container.querySelector('#badge_usb')?.classList.add('unlocked');
    if (state.badgesEarned.ransomware_responder) this.container.querySelector('#badge_ransom')?.classList.add('unlocked');
  }
}
