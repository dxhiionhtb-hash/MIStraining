/**
 * MÓDULO 4: RANSOMWARE & RESPUESTA ANTE INCIDENTES
 * Basado directamente en Ransomware.pptx (Consecuencias, Qué es, Protocolo de Contención Sin Culpa)
 */

import { Icons } from '../components/svg-icons.js';
import { trainingState } from '../state.js';
import { sound } from '../audio.js';
import { MotionExplainerPlayer } from '../components/motion-director.js';

export class StationM4 {
  constructor(containerEl) {
    this.container = containerEl;
    this.activeTab = 'learn';
    this.currentStep = 0;
    this.contained = false;
    this.threatPct = 35;
    this.threatTimer = null;

    this.actions = [
      {
        id: 'restore',
        correctOrder: 3,
        code: 'PASO D',
        title: 'Restaurar desde Respaldos Aislados',
        desc: 'Recuperar la información desde copias de seguridad desconectadas de la red infectada.',
        wrongFeedback: 'Si intentas restaurar respaldos mientras el equipo sigue infectado o en red, el ransomware cifrará también las copias de rescate.'
      },
      {
        id: 'isolate_net',
        correctOrder: 0,
        code: 'PASO A',
        title: 'Desconectar Cable de Red y Wi-Fi',
        desc: 'Cortar inmediatamente la comunicación física e inalámbrica para frenar la propagación lateral hacia servidores.',
        wrongFeedback: '¡Prioridad crítica número uno! Aislar el equipo de la red impide que el ataque contagie a tus compañeros.'
      },
      {
        id: 'notify_ti',
        correctOrder: 2,
        code: 'PASO C',
        title: 'Notificar de Inmediato a TI (Cultura Sin Culpa)',
        desc: 'Reportar a la mesa de ayuda con honestidad y sin miedo a represalias para activar el comité de crisis.',
        wrongFeedback: 'Antes de llamar por teléfono, apaga el equipo para que el cifrado no siga destruyendo archivos segundo a segundo.'
      },
      {
        id: 'power_off',
        correctOrder: 1,
        code: 'PASO B',
        title: 'Apagar el Equipo / Desconectar Energía',
        desc: 'Interrumpir el suministro eléctrico para congelar la memoria volátil y detener la escritura maliciosa en disco.',
        wrongFeedback: 'Si apagas el equipo antes de desconectar el cable de red, la amenaza puede seguir propagándose a los servidores corporativos.'
      }
    ];

    this.render();
    this.attachEvents();
  }

  render() {
    this.container.innerHTML = `
      <header class="lesson-banner">
        <div class="lesson-title-box">
          <h1>
            <span>Módulo 4: Ransomware & Respuesta ante Incidentes</span>
            <span class="lesson-code-badge">LECCIÓN INTERACTIVA</span>
          </h1>
          <p class="lesson-desc">
            El secuestro digital de datos es una de las mayores amenazas corporativas. Conoce cómo opera, sus consecuencias y domina el protocolo de primeros auxilios digitales con cultura de cero culpa.
          </p>
        </div>
        <button type="button" class="btn-learn btn-learn-secondary" id="btnBackToMap4">
          ${Icons.map}
          <span>Volver a la Ruta</span>
        </button>
      </header>

      <!-- Subnavegación de la Lección -->
      <nav class="lesson-subnav">
        <button type="button" class="subnav-btn active" data-tab="learn">
          <span>📖 1. ¿Qué es Ransomware & Consecuencias?</span>
        </button>
        <button type="button" class="subnav-btn" data-tab="practice">
          <span>🎯 2. Simulador: Secuencia de Contención</span>
        </button>
        <button type="button" class="subnav-btn" data-tab="summary">
          <span>📋 3. Protocolo Sin Culpa (Resumen)</span>
        </button>
      </nav>

      <!-- TAB 1: FUNDAMENTOS RANSOMWARE -->
      <div class="tab-content" id="tabContent_m4_learn">
        <div class="training-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div>
              <h2 style="font-size: var(--text-lg); font-weight: 800; color: #ffffff;">Animación Táctica: Cronograma de Contención</h2>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 2px;">
                Visualización física del avance del hielo criptográfico y el reflejo muscular de desconexión.
              </p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan); background: var(--accent-cyan-dim); border: 1px solid var(--border-cyan); padding: 3px 8px; clip-path: var(--chamfer-sm);">ANIMACIÓN EXPLICATIVA</span>
          </div>

          <!-- Reproductor de Motion Graphics Táctico -->
          <div id="m4MotionStudio"></div>

          <div class="flip-grid" style="grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-red); font-family: var(--font-mono); font-weight: 800;">01</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Aislamiento Físico</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Desconecta el cable Ethernet y apaga el Wi-Fi inmediatamente para cortar la propagación.</p>
            </div>

            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-warning); font-family: var(--font-mono); font-weight: 800;">02</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">No Apagar Bruscamente</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Mantén el equipo encendido si es posible; la memoria RAM contiene claves forenses de descifrado.</p>
            </div>

            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-weight: 800;">03</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Cero Represalias</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Avisar en los primeros 5 minutos salva la empresa. Ocultar el error por miedo es la verdadera catástrofe.</p>
            </div>
          </div>

          <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
            <button type="button" class="btn-learn btn-learn-primary" id="btnGoToPractice4">
              <span>Iniciar Simulador de Contención ➔</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 2: SIMULADOR DE CONTENCIÓN -->
      <div class="tab-content" id="tabContent_m4_practice" style="display: none;">
        <div class="m4-container">
          <!-- Alerta visual de incidente -->
          <section class="m4-crisis-header">
            <div class="m4-crisis-title-row">
              <span class="m4-alert-tag">${Icons.alertOctagon} SIMULACIÓN DE CONTENCIÓN ANTE INCIDENTE</span>
              <span class="m4-threat-status" id="m4ThreatStatus">PROCESO MALICIOSO EN EJECUCIÓN</span>
            </div>

            <div class="m4-telemetry-bar">
              <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: var(--text-xs);">
                <span>ESTADO DEL EQUIPO AFECTADO</span>
                <span id="m4ThreatPctText" style="color: var(--alert-coral); font-weight: 700;">35%</span>
              </div>
              <div class="m4-bar-track">
                <div class="m4-bar-fill" id="m4BarFill" style="width: 35%;"></div>
              </div>
              <div class="m4-ticker-log" id="m4TickerLog">
                &gt; Simulando alerta de archivo bloqueado: Documentos/Presupuestos.xlsx
              </div>
            </div>
          </section>

          <!-- Línea de tiempo -->
          <nav class="m4-timeline-bar" aria-label="Progreso de Contención">
            <div class="timeline-step-chip active" id="stepChip_0">
              <span class="step-num-badge">1</span>
              <span>1. Aislar de Red</span>
            </div>
            <div class="timeline-step-chip" id="stepChip_1">
              <span class="step-num-badge">2</span>
              <span>2. Apagar Equipo</span>
            </div>
            <div class="timeline-step-chip" id="stepChip_2">
              <span class="step-num-badge">3</span>
              <span>3. Reportar a TI</span>
            </div>
            <div class="timeline-step-chip" id="stepChip_3">
              <span class="step-num-badge">4</span>
              <span>4. Restaurar Datos</span>
            </div>
          </nav>

          <!-- Tarjetas tácticas desordenadas -->
          <div style="font-size: var(--text-xs); color: var(--text-cyan); font-family: var(--font-mono); margin-bottom: 4px;">
            SELECCIONA LA ACCIÓN CORRECTA PARA CADA PASO DE LA SECUENCIA:
          </div>
          <div class="m4-actions-grid" id="m4ActionsGrid">
            ${this.actions.map(act => `
              <button type="button" class="action-tactical-card" data-act-id="${act.id}">
                <div class="action-card-header">
                  <span class="action-card-code">${act.code}</span>
                  <span style="color: var(--text-cyan);">${Icons.shield}</span>
                </div>
                <div>
                  <h3 class="action-card-title">${act.title}</h3>
                  <p class="action-card-desc">${act.desc}</p>
                </div>
              </button>
            `).join('')}
          </div>

          <div id="m4FeedbackBox"></div>
        </div>
      </div>

      <!-- TAB 3: RESUMEN PROTOCOLO SIN CULPA -->
      <div class="tab-content" id="tabContent_m4_summary" style="display: none;">
        <div class="training-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
              <h2 style="font-size: var(--text-lg); font-weight: 800; color: #ffffff;">Protocolo de Cero Culpa (No-Blame Culture)</h2>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 2px;">
                El silencio y la vergüenza son los mejores aliados del atacante. El reporte veloz es reconocido.
              </p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan); background: var(--accent-cyan-dim); border: 1px solid var(--border-cyan); padding: 3px 8px; clip-path: var(--chamfer-sm);">RESPUESTA RÁPIDA</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
            <div style="padding: 14px 16px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; color: var(--accent-cyan); width: 28px; height: 28px; background: var(--accent-cyan-dim); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm); flex-shrink: 0;">01</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.82rem; display: block;">Reporte sin Represalias</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">Avisar en los primeros 5 minutos frena la propagación hacia bases de datos centrales.</span>
              </div>
            </div>

            <div style="padding: 14px 16px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; color: var(--accent-red); width: 28px; height: 28px; background: var(--accent-red-dim); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm); flex-shrink: 0;">02</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.82rem; display: block;">Corta la Red, Mantén la RAM</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">Desconectar el cable físico es prioritario; no apagues para preservar evidencia en memoria.</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 20px; display: flex; justify-content: space-between;">
            <button type="button" class="btn-learn btn-learn-secondary" id="btnBackToPractice4">
              <span>⬅ Volver al Simulador</span>
            </button>
            <button type="button" class="btn-learn btn-learn-primary" id="btnCompleteModule4">
              <span>Completar Misión 04 y Desbloquear Examen ➔</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.motionPlayer = new MotionExplainerPlayer(this.container.querySelector('#m4MotionStudio'), 'm4');
  }

  attachEvents() {
    this.container.querySelector('#btnBackToMap4').addEventListener('click', () => {
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

    this.container.querySelector('#btnGoToPractice4').addEventListener('click', () => {
      sound.playClick();
      this.switchSubTab('practice');
    });

    this.container.querySelector('#btnBackToPractice4').addEventListener('click', () => {
      sound.playClick();
      this.switchSubTab('practice');
    });

    this.container.querySelector('#btnCompleteModule4').addEventListener('click', () => {
      sound.playContainmentSuccess();
      trainingState.addPoints(50);
      trainingState.completeModule('m4', 'ransomware_responder');
      alert('¡Excelente reflejo de contención! Has completado el Módulo 4 y desbloqueado la insignia Incident First 🛡️');
      trainingState.setModule('assessment');
    });

    const cards = this.container.querySelectorAll('.action-tactical-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (this.contained) return;
        const actId = card.dataset.actId;
        const act = this.actions.find(a => a.id === actId);
        if (!act) return;

        this.handleActionClick(act, card);
      });
    });
  }

  switchSubTab(tab) {
    this.activeTab = tab;
    this.container.querySelectorAll('.subnav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });

    this.container.querySelector('#tabContent_m4_learn').style.display = tab === 'learn' ? 'block' : 'none';
    this.container.querySelector('#tabContent_m4_practice').style.display = tab === 'practice' ? 'block' : 'none';
    this.container.querySelector('#tabContent_m4_summary').style.display = tab === 'summary' ? 'block' : 'none';
  }

  handleActionClick(action, cardEl) {
    const feedbackBox = this.container.querySelector('#m4FeedbackBox');

    if (action.correctOrder === this.currentStep) {
      sound.playSuccess();
      cardEl.classList.add('executed');
      cardEl.setAttribute('disabled', 'true');

      const currentChip = this.container.querySelector(`#stepChip_${this.currentStep}`);
      if (currentChip) {
        currentChip.classList.remove('active');
        currentChip.classList.add('completed');
      }

      this.currentStep++;

      if (this.currentStep < 4) {
        const nextChip = this.container.querySelector(`#stepChip_${this.currentStep}`);
        if (nextChip) nextChip.classList.add('active');

        trainingState.addPoints(15);
        trainingState.incrementStreak();

        feedbackBox.innerHTML = `
          <div class="tactical-feedback success">
            <div class="tactical-feedback-icon">${Icons.shieldCheck}</div>
            <div>
              <strong>¡Paso Correcto: ${action.title}! (+15 pts)</strong>
              Acción aplicada con exactitud. Procede con el siguiente paso de primeros auxilios.
            </div>
          </div>
        `;
      } else {
        this.contained = true;
        sound.playContainmentSuccess();

        trainingState.addPoints(40);
        trainingState.incrementStreak();

        const fillEl = this.container.querySelector('#m4BarFill');
        const textEl = this.container.querySelector('#m4ThreatPctText');
        const statusEl = this.container.querySelector('#m4ThreatStatus');
        const tickerEl = this.container.querySelector('#m4TickerLog');

        if (fillEl) fillEl.classList.add('neutralized');
        if (textEl) {
          textEl.textContent = 'AMENAZA AISLADA';
          textEl.style.color = 'var(--accent-mint)';
        }
        if (statusEl) {
          statusEl.textContent = 'INCIDENTE CONTENIDO CON ÉXITO';
          statusEl.style.color = 'var(--accent-mint)';
        }
        if (tickerEl) tickerEl.textContent = '> Red protegida. Respaldos aislados intactos listos para restauración.';

        feedbackBox.innerHTML = `
          <div class="tactical-feedback success" style="border-width: 2px;">
            <div class="tactical-feedback-icon">${Icons.award}</div>
            <div>
              <strong>¡Incidente Neutralizado Exitosamente! (+40 pts)</strong>
              Salvaste la red de la organización. Al desconectar la red antes de apagar y avisar con prontitud a TI, evitaste el desastre.
            </div>
          </div>
        `;

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
            <strong>Secuencia Fuera de Orden:</strong>
            ${action.wrongFeedback}
          </div>
        </div>
      `;
    }
  }
}
