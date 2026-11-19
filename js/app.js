/**
 * TRYHACKME ROOM ORCHESTRATOR - CYBERSHIELD CONCIENTIZACIÓN CORPORATIVA
 * Réplica de la experiencia de sala de TryHackMe (Security Engineer Intro)
 */

import { Icons } from './components/svg-icons.js';
import { trainingState } from './state.js';
import { sound } from './audio.js';
import { InstructorMode } from './components/instructor-mode.js';
import { gsapMotionEngine } from './components/gsap-motion-engine.js';
import { StationM1 } from './stations/station-m1.js';
import { StationM2 } from './stations/station-m2.js';
import { StationM3 } from './stations/station-m3.js';
import { StationM4 } from './stations/station-m4.js';
import { StationDiagnosis } from './stations/diagnosis.js';

class TryHackMeRoomOrchestrator {
  constructor() {
    this.timerSeconds = 7120; // 01:58:40
    this.timerInterval = null;
    this.init();
  }

  init() {
    this.renderNavbar();
    this.renderHeroBanner();
    this.renderSidebar();
    this.instructor = new InstructorMode();
    this.mountStations();
    this.renderQuestions();
    this.attachAccordionEvents();
    this.attachKeyboardShortcuts();
    this.startMachineTimer();

    // Suscripción reactiva al estado
    trainingState.subscribe(state => this.updateUI(state));
  }

  /* ==========================================================================
     1. TryHackMe Global Navbar
     ========================================================================== */
  renderNavbar() {
    const nav = document.getElementById('thmNavbar');
    if (!nav) return;

    nav.innerHTML = `
      <div class="thm-nav-left">
        <div class="thm-brand" title="TryHackMe // CyberShield">
          <span class="thm-flame-icon">${Icons.flame}</span>
          <span class="thm-brand-name">TryHack<span>Me</span></span>
        </div>

        <nav class="thm-nav-links" aria-label="Navegación principal">
          <button type="button" class="thm-nav-link active">Aprender</button>
          <button type="button" class="thm-nav-link">Salas</button>
          <button type="button" class="thm-nav-link">Práctica</button>
          <button type="button" class="thm-nav-link">Rutas</button>
          <a href="shorts.html" class="thm-nav-link" style="text-decoration: none; color: #ffc83d; font-weight: 700;" title="Cápsulas de concientización vertical (9:16) en formato Flat 2D">📱 CyberShorts</a>
          <a href="preview-motions.html" class="thm-nav-link" style="text-decoration: none; color: var(--accent-cyan);" title="Studio de diagramas vectoriales vivos en bucle">Studio GSAP</a>
        </nav>
      </div>

      <div class="thm-nav-right">
        <button type="button" class="instructor-btn-tool" id="btnNavToggleInstructor" style="height: 32px; font-size: 0.72rem; padding: 0 10px; background: rgba(34, 197, 94, 0.15); border-color: rgba(34, 197, 94, 0.35); color: var(--accent-green);">
          <span>🎙️</span>
          <span>Modo Instructor</span>
        </button>

        <div class="thm-streak-badge" title="Racha activa de aprendizaje">
          <span>🔥</span>
          <span><strong id="navStreakVal">3</strong> Días</span>
        </div>

        <div class="thm-points-badge" title="Puntos de Conciencia acumulados">
          <span>⭐</span>
          <span><strong id="navPointsVal">120</strong> PTS</span>
        </div>

        <button type="button" class="thm-btn-icon" id="btnAudioToggle" title="Activar / Desactivar Sonido">
          <span id="audioIconBox">${Icons.volumeOn}</span>
        </button>

        <div class="thm-user-avatar">
          <div class="thm-avatar-circle">CC</div>
          <span class="thm-avatar-name">Colaborador</span>
        </div>
      </div>
    `;

    const audioBtn = nav.querySelector('#btnAudioToggle');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isEnabled = trainingState.toggleAudio();
        sound.setEnabled(isEnabled);
        const iconBox = nav.querySelector('#audioIconBox');
        if (iconBox) {
          iconBox.innerHTML = isEnabled ? Icons.volumeOn : Icons.volumeOff;
        }
      });
    }

    const instructorNavBtn = nav.querySelector('#btnNavToggleInstructor');
    if (instructorNavBtn) {
      instructorNavBtn.addEventListener('click', () => {
        sound.playClick();
        const dock = document.getElementById('instructorDock');
        if (dock) {
          dock.classList.toggle('minimized');
          const isMin = dock.classList.contains('minimized');
          instructorNavBtn.style.opacity = isMin ? '0.6' : '1';
        }
      });
    }
  }

  /* ==========================================================================
     2. TryHackMe Room Hero Banner
     ========================================================================== */
  renderHeroBanner() {
    const hero = document.getElementById('thmRoomHero');
    if (!hero) return;

    hero.innerHTML = `
      <div class="thm-room-header-row">
        <div>
          <h1 class="thm-room-title">CyberShield: Concientización Corporativa</h1>
          <div class="thm-room-meta-tags">
            <span class="thm-tag thm-tag-walkthrough">Walkthrough</span>
            <span class="thm-tag thm-tag-difficulty">● Inicial</span>
            <span class="thm-tag thm-tag-info">⏱️ 45 min</span>
            <span class="thm-tag thm-tag-info">📋 5 Tareas</span>
            <span class="thm-tag thm-tag-info">⭐ 4.9 (1.4k)</span>
          </div>
        </div>
      </div>

      <p class="thm-room-desc">
        Capacitación práctica en ciberdefensa corporativa. Supera los 4 vectores críticos (Phishing, Fuga de Datos en IA, Dispositivos USB y Aislamiento de Ransomware), responde las preguntas de validación técnica y obtén tu acreditación oficial.
      </p>

      <div class="thm-room-progress-box">
        <div class="thm-progress-meta">
          <span>Progreso de la Sala:</span>
          <span>
            <strong id="heroProgressCount">0</strong>/5 Tareas Completadas 
            (<strong id="heroProgressPercent">0</strong>%)
          </span>
        </div>
        <div class="thm-progress-track">
          <div class="thm-progress-bar-fill" id="heroProgressBarFill" style="width: 0%;"></div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     3. TryHackMe Right Sidebar
     ========================================================================== */
  renderSidebar() {
    const sidebar = document.getElementById('thmSidebarColumn');
    if (!sidebar) return;

    sidebar.innerHTML = `
      <!-- Máquina Objetivo / Lab Virtual -->
      <div class="thm-sidebar-card">
        <div class="thm-sidebar-title-row">
          <span class="thm-sidebar-title">MÁQUINA CORPORATIVA</span>
          <div class="thm-status-indicator">
            <span class="thm-pulse-dot"></span>
            <span>EN LÍNEA</span>
          </div>
        </div>

        <div class="thm-machine-node-info">
          <div class="thm-node-label">NODO OBJETIVO</div>
          <div class="thm-node-name">nodo-defensa-humana</div>
        </div>

        <div class="thm-ip-box">
          <span class="thm-ip-address" id="sidebarIpText">10.10.42.15</span>
          <button type="button" class="thm-btn-copy-ip" id="btnCopyIp">
            ${Icons.copy}
            <span id="copyIpLabel">Copiar</span>
          </button>
        </div>

        <div class="thm-machine-timer">
          <span>Tiempo restante:</span>
          <span class="time" id="machineTimerVal">01:58:40</span>
        </div>

        <div class="thm-sidebar-actions">
          <button type="button" class="thm-btn-sidebar" id="btnResetSimulation">
            🔄 Reiniciar Laboratorio
          </button>
        </div>
      </div>

      <!-- Insignias de la Sala -->
      <div class="thm-sidebar-card">
        <div class="thm-sidebar-title-row">
          <span class="thm-sidebar-title">INSIGNIAS DE LA SALA</span>
          <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-green);" id="sidebarBadgesCount">0/5</span>
        </div>

        <div class="thm-badges-list">
          <div class="thm-badge-row" id="badge_phishing">
            <div class="thm-badge-icon-box">🎣</div>
            <div class="thm-badge-details">
              <span class="thm-badge-name">Cazador de Phishing</span>
              <span class="thm-badge-status" id="badgeStatus_phishing">Bloqueada</span>
            </div>
          </div>

          <div class="thm-badge-row" id="badge_ai">
            <div class="thm-badge-icon-box">🤖</div>
            <div class="thm-badge-details">
              <span class="thm-badge-name">Guardián de IA</span>
              <span class="thm-badge-status" id="badgeStatus_ai">Bloqueada</span>
            </div>
          </div>

          <div class="thm-badge-row" id="badge_usb">
            <div class="thm-badge-icon-box">💾</div>
            <div class="thm-badge-details">
              <span class="thm-badge-name">Defensor Físico USB</span>
              <span class="thm-badge-status" id="badgeStatus_usb">Bloqueada</span>
            </div>
          </div>

          <div class="thm-badge-row" id="badge_ransomware">
            <div class="thm-badge-icon-box">⚡</div>
            <div class="thm-badge-details">
              <span class="thm-badge-name">Centinela Anti-Ransomware</span>
              <span class="thm-badge-status" id="badgeStatus_ransomware">Bloqueada</span>
            </div>
          </div>

          <div class="thm-badge-row" id="badge_champion">
            <div class="thm-badge-icon-box">🏆</div>
            <div class="thm-badge-details">
              <span class="thm-badge-name">Campeón Acreditado</span>
              <span class="thm-badge-status" id="badgeStatus_champion">Bloqueada</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumen del Colaborador -->
      <div class="thm-sidebar-card">
        <div class="thm-sidebar-title-row">
          <span class="thm-sidebar-title">ESTADO DEL ESTUDIANTE</span>
          <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan);">NIVEL 5</span>
        </div>

        <div style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.6;">
          <p><strong>Rango:</strong> Defensor Perimetral (Top 5%)</p>
          <p style="margin-top: 4px;"><strong>Puntos acumulados:</strong> <span id="sidebarPointsVal" style="color: var(--accent-green); font-weight: 700;">120 PTS</span></p>
          <p style="margin-top: 4px;"><strong>Racha activa:</strong> <span style="color: var(--accent-warning); font-weight: 700;">🔥 3 Días consecutivos</span></p>
        </div>
      </div>
    `;

    // Evento Copiar IP
    const copyBtn = sidebar.querySelector('#btnCopyIp');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('10.10.42.15').then(() => {
          sound.playClick();
          const label = sidebar.querySelector('#copyIpLabel');
          if (label) label.textContent = '¡Copiado!';
          setTimeout(() => { if (label) label.textContent = 'Copiar'; }, 2000);
        });
      });
    }

    // Reiniciar Simulación
    const resetBtn = sidebar.querySelector('#btnResetSimulation');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        sound.playClick();
        if (confirm('¿Deseas reiniciar la simulación de la sala?')) {
          trainingState.resetCourse();
          window.location.reload();
        }
      });
    }
  }

  /* ==========================================================================
     4. Montaje de Estaciones Educativas Interactivas
     ========================================================================== */
  mountStations() {
    const el1 = document.getElementById('mount_station_m1');
    const el2 = document.getElementById('mount_station_m2');
    const el3 = document.getElementById('mount_station_m3');
    const el4 = document.getElementById('mount_station_m4');
    const el5 = document.getElementById('mount_station_m5');

    if (el1) new StationM1(el1);
    if (el2) new StationM2(el2);
    if (el3) new StationM3(el3);
    if (el4) new StationM4(el4);
    if (el5) new StationDiagnosis(el5);

    // Montar Diagramas Vectoriales Vivos GSAP
    const g1 = document.getElementById('mount_gsap_task1');
    const g2 = document.getElementById('mount_gsap_task2');
    const g3 = document.getElementById('mount_gsap_task3');
    const g4 = document.getElementById('mount_gsap_task4');

    if (g1) gsapMotionEngine.mount(g1, 'phishing-prisma');
    if (g2) gsapMotionEngine.mount(g2, 'ia-sanitizer');
    if (g3) gsapMotionEngine.mount(g3, 'usb-cuarentena');
    if (g4) gsapMotionEngine.mount(g4, 'ransomware-corte');
  }

  /* ==========================================================================
     5. Renderizado del Bloque de Preguntas Estilo TryHackMe
     ========================================================================== */
  renderQuestions() {
    const tasks = trainingState.state.tasks;

    Object.values(tasks).forEach(task => {
      const container = document.getElementById(`questions_${task.id}`);
      if (!container) return;

      const questionsList = Object.values(task.questions);

      container.innerHTML = `
        <div class="thm-questions-header">
          <span style="color: var(--accent-green);">${Icons.helpCircle}</span>
          <h3>Responde las preguntas a continuación</h3>
        </div>

        <div class="thm-questions-body">
          ${questionsList.map(q => `
            <div class="thm-question-item" id="qBox_${task.id}_${q.id}">
              <div class="thm-question-text">${q.text}</div>
              <div class="thm-input-group">
                <input 
                  type="text" 
                  class="thm-answer-input ${q.solved ? 'solved' : ''}" 
                  id="thmInput_${task.id}_${q.id}" 
                  placeholder="${q.placeholder}"
                  value="${q.solved ? q.userAnswer : ''}"
                  ${q.solved ? 'disabled' : ''}
                />
                <button 
                  type="button" 
                  class="thm-btn-submit" 
                  id="thmBtnSubmit_${task.id}_${q.id}"
                  ${q.solved ? 'disabled' : ''}
                >
                  ${q.solved ? '✓ Correcto' : 'Enviar'}
                </button>
              </div>

              <div class="thm-hint-toggle" data-hint-target="hintBox_${task.id}_${q.id}">
                💡 ¿Necesitas una pista?
              </div>
              <div class="thm-hint-box" id="hintBox_${task.id}_${q.id}">
                ${q.hint}
              </div>

              <div class="thm-question-feedback" id="feedback_${task.id}_${q.id}"></div>
            </div>
          `).join('')}
        </div>
      `;

      // Eventos para cada pregunta
      questionsList.forEach(q => {
        const inputEl = container.querySelector(`#thmInput_${task.id}_${q.id}`);
        const submitBtn = container.querySelector(`#thmBtnSubmit_${task.id}_${q.id}`);
        const feedbackEl = container.querySelector(`#feedback_${task.id}_${q.id}`);

        const handleSubmit = () => {
          if (!inputEl) return;
          const val = inputEl.value.trim();
          if (!val) {
            inputEl.classList.add('shake');
            setTimeout(() => inputEl.classList.remove('shake'), 400);
            return;
          }

          const res = trainingState.submitQuestion(task.id, q.id, val);
          if (res.success) {
            sound.playSuccess();
            inputEl.classList.add('solved');
            inputEl.disabled = true;
            submitBtn.disabled = true;
            submitBtn.textContent = '✓ Correcto';

            feedbackEl.className = 'thm-question-feedback success';
            feedbackEl.textContent = '✓ ¡Respuesta correcta! Has sumado +50 Puntos de Conciencia.';
          } else {
            sound.playWarning();
            inputEl.classList.add('shake');
            setTimeout(() => inputEl.classList.remove('shake'), 400);

            feedbackEl.className = 'thm-question-feedback error';
            feedbackEl.textContent = res.reason || 'Respuesta incorrecta. Revisa la lección o abre la pista.';
          }
        };

        if (submitBtn) {
          submitBtn.addEventListener('click', handleSubmit);
        }

        if (inputEl) {
          inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          });
        }
      });

      // Eventos de Pistas
      container.querySelectorAll('.thm-hint-toggle').forEach(t => {
        t.addEventListener('click', () => {
          sound.playClick();
          const targetId = t.dataset.hintTarget;
          const targetBox = container.querySelector(`#${targetId}`);
          if (targetBox) {
            targetBox.classList.toggle('open');
          }
        });
      });
    });
  }

  /* ==========================================================================
     6. Control del Acordeón de Tareas
     ========================================================================== */
  attachAccordionEvents() {
    const headers = document.querySelectorAll('[data-task-toggle]');
    headers.forEach(h => {
      h.addEventListener('click', () => {
        sound.playClick();
        const taskId = h.dataset.taskToggle;
        trainingState.toggleTask(taskId);
      });
    });
  }

  /* ==========================================================================
     7. Atajos de Teclado
     ========================================================================== */
  attachKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key >= '1' && e.key <= '5') {
        const taskId = `task${e.key}`;
        trainingState.setTaskOpen(taskId, true);
        const card = document.getElementById(`thmTaskCard_${taskId}`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  /* ==========================================================================
     8. Temporizador de la Máquina Virtual
     ========================================================================== */
  startMachineTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        const hours = String(Math.floor(this.timerSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((this.timerSeconds % 3600) / 60)).padStart(2, '0');
        const secs = String(this.timerSeconds % 60).padStart(2, '0');
        const el = document.getElementById('machineTimerVal');
        if (el) el.textContent = `${hours}:${minutes}:${secs}`;
      }
    }, 1000);
  }

  /* ==========================================================================
     9. Actualización Reactiva de UI (Sincronización con el Estado)
     ========================================================================== */
  updateUI(state) {
    // 1. Barra de progreso general de la Sala
    const completedCount = trainingState.getCompletedTasksCount();
    const totalCount = trainingState.getTotalTasksCount();
    const pct = trainingState.getProgressPercentage();

    const heroCount = document.getElementById('heroProgressCount');
    const heroPct = document.getElementById('heroProgressPercent');
    const heroFill = document.getElementById('heroProgressBarFill');

    if (heroCount) heroCount.textContent = completedCount;
    if (heroPct) heroPct.textContent = pct;
    if (heroFill) heroFill.style.width = `${pct}%`;

    // 2. Telemetría de Navbar y Sidebar
    const navPts = document.getElementById('navPointsVal');
    const sidePts = document.getElementById('sidebarPointsVal');
    if (navPts) navPts.textContent = state.awarenessPoints;
    if (sidePts) sidePts.textContent = `${state.awarenessPoints} PTS`;

    const navStreak = document.getElementById('navStreakVal');
    if (navStreak) navStreak.textContent = state.streak;

    // 3. Estado de Acordeones
    Object.entries(state.openTasks).forEach(([tId, isOpen]) => {
      const card = document.getElementById(`thmTaskCard_${tId}`);
      if (card) {
        card.classList.toggle('open', isOpen);
      }
    });

    // 4. Estado de Completitud de cada Tarea
    Object.values(state.tasks).forEach(task => {
      const card = document.getElementById(`thmTaskCard_${task.id}`);
      const pill = document.getElementById(`thmTaskStatus_${task.id}`);
      if (card) {
        card.classList.toggle('completed', task.completed);
      }
      if (pill) {
        if (task.completed) {
          pill.innerHTML = `✓ Completada`;
          pill.style.color = 'var(--accent-green)';
          pill.style.background = 'rgba(34, 197, 94, 0.14)';
          pill.style.borderColor = 'rgba(34, 197, 94, 0.3)';
        } else {
          pill.innerHTML = `○ Pendiente`;
          pill.style.color = 'var(--text-muted)';
          pill.style.background = 'transparent';
          pill.style.borderColor = 'var(--border-subtle)';
        }
      }
    });

    // 5. Insignias
    const badgeElements = {
      phishing_hunter: { row: document.getElementById('badge_phishing'), status: document.getElementById('badgeStatus_phishing') },
      ai_guardian: { row: document.getElementById('badge_ai'), status: document.getElementById('badgeStatus_ai') },
      usb_defender: { row: document.getElementById('badge_usb'), status: document.getElementById('badgeStatus_usb') },
      ransomware_responder: { row: document.getElementById('badge_ransomware'), status: document.getElementById('badgeStatus_ransomware') },
      certified_champion: { row: document.getElementById('badge_champion'), status: document.getElementById('badgeStatus_champion') }
    };

    let unlockedCount = 0;
    Object.entries(state.badgesEarned).forEach(([bKey, isEarned]) => {
      if (isEarned) unlockedCount++;
      const item = badgeElements[bKey];
      if (item && item.row && item.status) {
        item.row.classList.toggle('unlocked', isEarned);
        item.status.textContent = isEarned ? '✓ Desbloqueada' : 'Bloqueada';
      }
    });

    const sideBadgesCount = document.getElementById('sidebarBadgesCount');
    if (sideBadgesCount) {
      sideBadgesCount.textContent = `${unlockedCount}/5`;
    }
  }
}

// Inicialización automática
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new TryHackMeRoomOrchestrator());
} else {
  new TryHackMeRoomOrchestrator();
}
