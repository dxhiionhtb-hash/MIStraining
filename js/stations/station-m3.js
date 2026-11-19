/**
 * MÓDULO 3: MEDIOS EXTRAÍBLES (USB) & AMENAZAS FÍSICAS
 * Basado directamente en USB.pptx (Malware, USB attacks, 3 Pilares de Seguridad)
 */

import { Icons } from '../components/svg-icons.js';
import { trainingState } from '../state.js';
import { sound } from '../audio.js';
import { MotionExplainerPlayer } from '../components/motion-director.js';

export class StationM3 {
  constructor(containerEl) {
    this.container = containerEl;
    this.activeTab = 'learn';

    this.hotspots = [
      {
        id: 'laptop',
        name: 'Laptop con Sesión Abierta',
        pillar: 'privacy',
        pillarName: 'Privacidad (Confidencialidad)',
        dilemma: 'Te encuentras en una cafetería o espacio compartido y debes levantarte al mostrador por un momento.',
        options: [
          { text: 'Dejar el equipo abierto vigilándolo desde lejos con la mirada.', correct: false, reason: 'Mirar de lejos no impide que alguien conecte un dispositivo o fotografíe tu pantalla en segundos.' },
          { text: 'Bloquear inmediatamente la sesión (Win+L / Cmd+Ctrl+Q) o cerrar la tapa.', correct: true, reason: 'Excelente reflejo. Bloquear la sesión protege el pilar de Privacidad: solo personas autorizadas acceden a la información.' },
          { text: 'Bajar el brillo de la pantalla al mínimo.', correct: false, reason: 'El equipo continúa desbloqueado y vulnerable a cualquier interacción física.' }
        ]
      },
      {
        id: 'usb',
        name: 'Memoria USB Desconocida en la Mesa',
        pillar: 'accuracy',
        pillarName: 'Exactitud (Integridad)',
        dilemma: 'Encuentras una memoria USB sin etiquetar sobre una mesa en la oficina compartida o estacionamiento.',
        options: [
          { text: 'Conectarla a la computadora para abrir los archivos y ver de quién es.', correct: false, reason: 'Peligro crítico: muchas memorias señuelo inyectan troyanos o ransomware en el instante en que se conectan.' },
          { text: 'Entregarla a Seguridad / TI sin conectarla jamás a tu equipo.', correct: true, reason: 'Acción ejemplar. TI dispone de equipos aislados (sandbox) para analizarla sin poner en riesgo la red.' },
          { text: 'Formatearla rápido para poder usarla tú.', correct: false, reason: 'El formateo requiere conectarla, lo cual ejecuta el payload malicioso a nivel de firmware.' }
        ]
      },
      {
        id: 'wifi',
        name: 'Red Wi-Fi Pública Abierta',
        pillar: 'continuity',
        pillarName: 'Continuidad (Disponibilidad)',
        dilemma: 'Una ventana emergente ofrece conectarse a la red "Free_Coffee_Fast_Guest" sin contraseña.',
        options: [
          { text: 'Conectarse para no gastar los datos del teléfono móvil.', correct: false, reason: 'En redes abiertas, terceros pueden interceptar tu tráfico de navegación y suplantar credenciales corporativas.' },
          { text: 'Utilizar el punto de acceso móvil propio o activar siempre la VPN corporativa.', correct: true, reason: 'La VPN cifra tu conexión de extremo a extremo, resguardando la Continuidad del negocio sin fugas de datos.' },
          { text: 'Conectarse solo unos segundos para revisar el correo rápido.', correct: false, reason: 'La captura de paquetes de red se efectúa en milisegundos desde el primer contacto.' }
        ]
      },
      {
        id: 'cable',
        name: 'Cable de Carga Colgando en un Tótem Público',
        pillar: 'privacy',
        pillarName: 'Privacidad (Confidencialidad)',
        dilemma: 'Tu batería está al 8% y encuentras un cable USB listo en una estación pública de carga.',
        options: [
          { text: 'Conectarlo porque los cables solo transmiten electricidad.', correct: false, reason: 'Ataque Juice Jacking: cables modificados contienen chips que transfieren datos o instalan malware mientras cargan.' },
          { text: 'Usar tu propio cargador de pared conectado a una toma de corriente convencional.', correct: true, reason: 'Las tomas eléctricas convencionales solo transportan energía, impidiendo cualquier transferencia indebida de datos.' },
          { text: 'Conectarlo pero elegir "Solo Carga" si el teléfono lo pregunta.', correct: false, reason: 'Muchos microcontroladores maliciosos vulneran esa restricción mediante exploits de hardware.' }
        ]
      }
    ];

    this.activeHotspotId = 'laptop';
    this.resolvedHotspots = new Set();

    this.render();
    this.attachEvents();
    this.loadHotspot('laptop');
  }

  render() {
    this.container.innerHTML = `
      <header class="lesson-banner">
        <div class="lesson-title-box">
          <h1>
            <span>Módulo 3: Medios Extraíbles (USB) & Seguridad Física</span>
            <span class="lesson-code-badge">LECCIÓN INTERACTIVA</span>
          </h1>
          <p class="lesson-desc">
            Los ataques no siempre viajan por internet. Las memorias USB señuelo, cables alterados y pantallas desatendidas son vectores habituales para introducir malware en las empresas.
          </p>
        </div>
        <button type="button" class="btn-learn btn-learn-secondary" id="btnBackToMap3">
          ${Icons.map}
          <span>Volver a la Ruta</span>
        </button>
      </header>

      <!-- Subnavegación de la Lección -->
      <nav class="lesson-subnav">
        <button type="button" class="subnav-btn active" data-tab="learn">
          <span>📖 1. ¿Qué es Malware y Ataques por USB?</span>
        </button>
        <button type="button" class="subnav-btn" data-tab="practice">
          <span>🎯 2. Práctica: Espacio Híbrido & Tríada</span>
        </button>
        <button type="button" class="subnav-btn" data-tab="summary">
          <span>📋 3. Los 3 Pilares de Seguridad (Resumen)</span>
        </button>
      </nav>

      <!-- TAB 1: FUNDAMENTOS USB Y MALWARE -->
      <div class="tab-content" id="tabContent_m3_learn">
        <div class="training-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div>
              <h2 style="font-size: var(--text-lg); font-weight: 800; color: #ffffff;">Animación Táctica: Vectores Físicos y Tríada CIA</h2>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 2px;">
                Visualización física del cebo USB en el suelo y el reflejo muscular de bloqueo de pantalla.
              </p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan); background: var(--accent-cyan-dim); border: 1px solid var(--border-cyan); padding: 3px 8px; clip-path: var(--chamfer-sm);">ANIMACIÓN EXPLICATIVA</span>
          </div>

          <!-- Reproductor de Motion Graphics Táctico -->
          <div id="m3MotionStudio"></div>

          <div class="flip-grid" style="grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-red); font-family: var(--font-mono); font-weight: 800;">01</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Baiting en USB</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Nunca conectes una memoria encontrada en el suelo o estacionamiento para "ver de quién es".</p>
            </div>

            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-warning); font-family: var(--font-mono); font-weight: 800;">02</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Juice Jacking</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Usa tu propio adaptador a corriente de pared; evita estaciones de carga USB públicas en aeropuertos.</p>
            </div>

            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-weight: 800;">03</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Hábito de Bloqueo</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Bloquea tu pantalla (Win + L / Cmd + Ctrl + Q) cada vez que te levantes de tu puesto.</p>
            </div>
          </div>

          <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
            <button type="button" class="btn-learn btn-learn-primary" id="btnGoToPractice3">
              <span>Iniciar Simulador de Espacio Híbrido ➔</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 2: PRÁCTICA DEL ESPACIO HÍBRIDO -->
      <div class="tab-content" id="tabContent_m3_practice" style="display: none;">
        <div class="m3-layout">
          <div class="m3-scene-container">
            <div class="m3-canvas-wrapper" id="m3Canvas">
              <!-- SVG Interactivo de la mesa de trabajo -->
              <svg class="m3-svg-stage" viewBox="0 0 800 480" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="800" height="480" fill="#00251e"/>
                <path d="M0 240 L800 240 L800 480 L0 480 Z" fill="#001a14"/>
                <path d="M50 250 L750 250 L780 470 L20 470 Z" fill="#00382d" stroke="rgba(16, 185, 129, 0.25)" stroke-width="2"/>

                <!-- Laptop Abierta -->
                <g id="svg_laptop">
                  <rect x="290" y="150" width="220" height="140" rx="8" fill="#0c1a17" stroke="#00e5ff" stroke-width="2"/>
                  <rect x="300" y="160" width="200" height="120" rx="4" fill="#00140f"/>
                  <rect x="310" y="170" width="80" height="8" rx="2" fill="#10b981" opacity="0.7"/>
                  <rect x="310" y="185" width="120" height="4" rx="1" fill="#94a3b8" opacity="0.4"/>
                  <!-- Pop-up Wi-Fi sospechoso en pantalla -->
                  <rect x="340" y="190" width="150" height="80" rx="4" fill="#00382d" stroke="#f59e0b" stroke-width="1.5"/>
                  <circle cx="355" cy="205" r="5" fill="#f59e0b"/>
                  <rect x="366" y="202" width="100" height="6" rx="2" fill="#f8fafc"/>
                  <rect x="350" y="220" width="130" height="4" rx="1" fill="#cbd5e1"/>
                  <rect x="385" y="246" width="60" height="16" rx="3" fill="#f59e0b"/>
                  <text x="415" y="258" font-family="sans-serif" font-size="8" fill="#00251e" font-weight="bold" text-anchor="middle">CONECTAR</text>
                  <!-- Teclado y Base -->
                  <path d="M260 290 L540 290 L570 360 L230 360 Z" fill="#004437" stroke="rgba(16, 185, 129, 0.3)" stroke-width="2"/>
                  <rect x="300" y="300" width="200" height="40" rx="3" fill="#001912"/>
                </g>

                <!-- Memoria USB Abandonada -->
                <g id="svg_usb">
                  <rect x="520" y="320" width="45" height="18" rx="3" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
                  <rect x="565" y="323" width="16" height="12" fill="#cbd5e1"/>
                </g>

                <!-- Cable Desconocido -->
                <g id="svg_cable">
                  <path d="M120 440 Q 160 380 180 320 Q 190 280 170 300" stroke="#f43f5e" stroke-width="4" stroke-linecap="round" fill="none"/>
                  <rect x="160" y="295" width="22" height="12" rx="2" fill="#cbd5e1" stroke="#f43f5e" stroke-width="1"/>
                </g>
              </svg>

              <!-- Hotspots pulsantes -->
              <button type="button" class="scene-hotspot" data-hotspot="laptop" style="left: 50%; top: 48%;" title="Laptop Desatendida">
                <span class="hotspot-beacon">1</span>
              </button>
              <button type="button" class="scene-hotspot" data-hotspot="wifi" style="left: 52%; top: 44%;" title="Wi-Fi Pública">
                <span class="hotspot-beacon">2</span>
              </button>
              <button type="button" class="scene-hotspot" data-hotspot="usb" style="left: 68%; top: 68%;" title="USB en la Mesa">
                <span class="hotspot-beacon">3</span>
              </button>
              <button type="button" class="scene-hotspot" data-hotspot="cable" style="left: 22%; top: 66%;" title="Cable Desconocido">
                <span class="hotspot-beacon">4</span>
              </button>
            </div>
          </div>

          <!-- Panel Lateral: Dilemas & Pilares -->
          <aside class="m3-sidebar-panel">
            <div class="m3-pillars-card">
              <div class="m3-pillars-title">LOS 3 PILARES DE SEGURIDAD (TRÍADA COTIDIANA)</div>
              <div class="m3-pillars-grid">
                <div class="m3-pillar-badge" id="pillar_privacy">
                  <span style="color: var(--accent-mint);">${Icons.lock}</span>
                  <span class="pillar-name">PRIVACIDAD</span>
                  <span class="pillar-desc">Solo ojos autorizados</span>
                </div>
                <div class="m3-pillar-badge" id="pillar_accuracy">
                  <span style="color: var(--accent-cyan);">${Icons.shieldCheck}</span>
                  <span class="pillar-name">EXACTITUD</span>
                  <span class="pillar-desc">Datos íntegros</span>
                </div>
                <div class="m3-pillar-badge" id="pillar_continuity">
                  <span style="color: var(--alert-amber);">${Icons.zap}</span>
                  <span class="pillar-name">CONTINUIDAD</span>
                  <span class="pillar-desc">Operación sin pausa</span>
                </div>
              </div>
            </div>

            <div class="m3-dilemma-box">
              <div class="m3-dilemma-header">
                <span id="dilemmaPillarTag">PILAR ASOCIADO</span>
                <span id="dilemmaStatus">PENDIENTE</span>
              </div>

              <h3 class="m3-dilemma-title" id="dilemmaTitle">Cargando dilema...</h3>
              <p class="m3-dilemma-text" id="dilemmaDesc"></p>

              <div class="m3-choices-list" id="dilemmaChoices"></div>
              <div id="m3FeedbackBox"></div>
            </div>
          </aside>
        </div>
      </div>

      <!-- TAB 3: RESUMEN DE LOS 3 PILARES -->
      <div class="tab-content" id="tabContent_m3_summary" style="display: none;">
        <div class="training-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
              <h2 style="font-size: var(--text-lg); font-weight: 800; color: #ffffff;">La Tríada CIA en la Operación Diaria</h2>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 2px;">
                Los 3 principios fundamentales que resguardas con tus hábitos físicos diarios.
              </p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan); background: var(--accent-cyan-dim); border: 1px solid var(--border-cyan); padding: 3px 8px; clip-path: var(--chamfer-sm);">TRÍADA CIA</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <div style="padding: 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-cyan);">${Icons.lock}</span>
                <strong style="color: #ffffff; font-size: 0.85rem;">Confidencialidad</strong>
              </div>
              <p style="font-size: 0.72rem; color: var(--text-secondary); line-height: 1.4;">Solo personas autorizadas ven la información. Bloquea tu pantalla y evita miradas sobre el hombro.</p>
            </div>

            <div style="padding: 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-cyan);">${Icons.shieldCheck}</span>
                <strong style="color: #ffffff; font-size: 0.85rem;">Integridad</strong>
              </div>
              <p style="font-size: 0.72rem; color: var(--text-secondary); line-height: 1.4;">Los archivos y registros no son alterados ni borrados por malware introducido desde memorias ajenas.</p>
            </div>

            <div style="padding: 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-warning);">${Icons.zap}</span>
                <strong style="color: #ffffff; font-size: 0.85rem;">Disponibilidad</strong>
              </div>
              <p style="font-size: 0.72rem; color: var(--text-secondary); line-height: 1.4;">Tus equipos y redes operan sin bloqueos ni fallos operativos provocados por hardware no autorizado.</p>
            </div>
          </div>

          <div style="margin-top: 20px; display: flex; justify-content: space-between;">
            <button type="button" class="btn-learn btn-learn-secondary" id="btnBackToPractice3">
              <span>⬅ Volver al Simulador</span>
            </button>
            <button type="button" class="btn-learn btn-learn-primary" id="btnCompleteModule3">
              <span>Completar Misión 03 ➔</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.motionPlayer = new MotionExplainerPlayer(this.container.querySelector('#m3MotionStudio'), 'm3');
  }

  loadHotspot(hotspotId) {
    this.activeHotspotId = hotspotId;
    const item = this.hotspots.find(h => h.id === hotspotId);
    if (!item) return;

    this.container.querySelector('#dilemmaTitle').textContent = item.name;
    this.container.querySelector('#dilemmaDesc').textContent = item.dilemma;
    this.container.querySelector('#dilemmaPillarTag').textContent = `PILAR: ${item.pillarName.toUpperCase()}`;
    this.container.querySelector('#m3FeedbackBox').innerHTML = '';

    const isResolved = this.resolvedHotspots.has(hotspotId);
    this.container.querySelector('#dilemmaStatus').textContent = isResolved ? 'ASEGURADO ✓' : 'PENDIENTE';

    const choicesList = this.container.querySelector('#dilemmaChoices');
    choicesList.innerHTML = item.options.map((opt, idx) => `
      <button type="button" class="m3-choice-btn ${isResolved && opt.correct ? 'selected-correct' : ''}" data-idx="${idx}">
        <span style="font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 700;">${String.fromCharCode(65 + idx)}.</span>
        <span>${opt.text}</span>
      </button>
    `).join('');

    this.attachChoiceEvents(item);
  }

  attachEvents() {
    this.container.querySelector('#btnBackToMap3').addEventListener('click', () => {
      sound.playClick();
      trainingState.setModule('overview');
    });

    const subtabs = this.container.querySelectorAll('.subnav-btn');
    subtabs.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const tab = btn.dataset.tab;
        this.switchSubTab(tab);
      });
    });

    this.container.querySelector('#btnGoToPractice3').addEventListener('click', () => {
      sound.playClick();
      this.switchSubTab('practice');
    });

    this.container.querySelector('#btnBackToPractice3').addEventListener('click', () => {
      sound.playClick();
      this.switchSubTab('practice');
    });

    this.container.querySelector('#btnCompleteModule3').addEventListener('click', () => {
      sound.playContainmentSuccess();
      trainingState.addPoints(50);
      trainingState.completeModule('m3', 'usb_defender');
      alert('¡Excelente reflejo físico! Has completado el Módulo 3 y desbloqueado la insignia USB Defender 💾');
      trainingState.setModule('m4');
    });

    const hotspots = this.container.querySelectorAll('.scene-hotspot');
    hotspots.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const id = btn.dataset.hotspot;
        this.loadHotspot(id);
      });
    });
  }

  switchSubTab(tab) {
    this.activeTab = tab;
    this.container.querySelectorAll('.subnav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });

    this.container.querySelector('#tabContent_m3_learn').style.display = tab === 'learn' ? 'block' : 'none';
    this.container.querySelector('#tabContent_m3_practice').style.display = tab === 'practice' ? 'block' : 'none';
    this.container.querySelector('#tabContent_m3_summary').style.display = tab === 'summary' ? 'block' : 'none';
  }

  attachChoiceEvents(hotspot) {
    const btns = this.container.querySelectorAll('.m3-choice-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        const choice = hotspot.options[idx];
        const feedbackBox = this.container.querySelector('#m3FeedbackBox');

        if (choice.correct) {
          sound.playSuccess();
          this.resolvedHotspots.add(hotspot.id);
          btn.classList.add('selected-correct');

          trainingState.addPoints(20);
          trainingState.incrementStreak();

          const hotspotBtn = this.container.querySelector(`.scene-hotspot[data-hotspot="${hotspot.id}"]`);
          if (hotspotBtn) hotspotBtn.classList.add('resolved');

          const pillarEl = this.container.querySelector(`#pillar_${hotspot.pillar}`);
          if (pillarEl) pillarEl.classList.add('active');

          this.container.querySelector('#dilemmaStatus').textContent = 'ASEGURADO ✓';

          feedbackBox.innerHTML = `
            <div class="tactical-feedback success">
              <div class="tactical-feedback-icon">${Icons.shieldCheck}</div>
              <div>
                <strong>¡Decisión Correcta! (+20 pts)</strong>
                ${choice.reason}
              </div>
            </div>
          `;

          if (this.resolvedHotspots.size === 4) {
            setTimeout(() => {
              this.switchSubTab('summary');
            }, 1800);
          }
        } else {
          sound.playWarning();
          trainingState.resetStreak();

          feedbackBox.innerHTML = `
            <div class="tactical-feedback warning">
              <div class="tactical-feedback-icon">${Icons.alertOctagon}</div>
              <div>
                <strong>Riesgo Inadvertido.</strong>
                ${choice.reason} Intenta con una alternativa de mayor aislamiento preventivo.
              </div>
            </div>
          `;
        }
      });
    });
  }
}
