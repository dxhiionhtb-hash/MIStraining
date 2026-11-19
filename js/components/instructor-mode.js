/**
 * INSTRUCTOR TOOLKIT & AUDIENCE ENGAGEMENT SYSTEM
 * Provee herramientas para que el instructor guíe a grupos medianos:
 * - Puntero Láser Táctico
 * - Foco Escénico (Audience Spotlight)
 * - Votación Rápida de la Sala en Vivo (Interactive Group Poll)
 * - Modo Proyector / Pantalla Completa
 * - Control de Presentación por Teclado (Clicker remoto)
 */

import { Icons } from './svg-icons.js';
import { sound } from '../audio.js';
import { trainingState } from '../state.js';

export class InstructorMode {
  constructor() {
    this.laserActive = false;
    this.spotlightActive = false;
    this.cinemaActive = false;
    this.pollOpen = false;

    this.pollVotes = {
      safe: 0,
      danger: 0,
      revealed: false
    };

    this.init();
  }

  init() {
    this.createDomElements();
    this.attachMouseTracking();
    this.attachDockEvents();
    this.attachKeyboardControls();
  }

  createDomElements() {
    // 1. Puntero Láser
    const laserEl = document.createElement('div');
    laserEl.id = 'tacticalLaserPointer';
    laserEl.className = 'tactical-laser-pointer';
    document.body.appendChild(laserEl);
    this.laserEl = laserEl;

    // 2. Máscara de Foco Escénico
    const spotlightEl = document.createElement('div');
    spotlightEl.id = 'tacticalSpotlightOverlay';
    spotlightEl.className = 'tactical-spotlight-overlay';
    document.body.appendChild(spotlightEl);
    this.spotlightEl = spotlightEl;

    // 3. Modal de Votación de la Sala
    const pollWrap = document.createElement('div');
    pollWrap.id = 'audiencePollWrapper';
    pollWrap.innerHTML = `
      <div class="audience-poll-backdrop" id="pollBackdrop"></div>
      <div class="audience-poll-modal" id="pollModal" role="dialog" aria-modal="true" aria-labelledby="pollTitle">
        <div class="poll-header">
          <div class="poll-title-box">
            <span style="color: var(--accent-cyan);">${Icons.helpCircle}</span>
            <h2 class="poll-title" id="pollTitle">Votación en Vivo de la Sala</h2>
          </div>
          <button type="button" class="btn-icon-control" id="btnClosePoll" style="width: 28px; height: 28px;" title="Cerrar Votación">✕</button>
        </div>

        <p class="poll-question-text" id="pollQuestionText">
          <strong>Pregunta para el grupo:</strong> ¿Consideran que el caso actual corresponde a una comunicación institucional legítima o a un vector de ataque?
        </p>

        <div class="poll-vote-grid">
          <button type="button" class="poll-vote-btn option-safe" id="btnVoteSafe">
            <span>🛡️ Seguro / Legítimo</span>
            <span class="poll-vote-count" id="voteCountSafe">0</span>
            <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">Clic para sumar voto</span>
          </button>

          <button type="button" class="poll-vote-btn option-phish" id="btnVoteDanger">
            <span>⚠️ Amenaza / Trampa</span>
            <span class="poll-vote-count" id="voteCountDanger">0</span>
            <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">Clic para sumar voto</span>
          </button>
        </div>

        <div class="poll-results-bar-wrap">
          <div class="poll-results-meta">
            <span>Distribución de la Sala</span>
            <span id="pollPctLabel">50% Seguro / 50% Amenaza</span>
          </div>
          <div class="poll-track">
            <div class="poll-fill-safe" id="pollFillSafe" style="width: 50%;"></div>
            <div class="poll-fill-danger" id="pollFillDanger" style="width: 50%;"></div>
          </div>
        </div>

        <div class="poll-verdict-banner" id="pollVerdictBanner">
          <div style="font-weight: 800; font-family: var(--font-mono); color: var(--accent-green); margin-bottom: 4px;">
            VEREDICTO OFICIAL REVELADO
          </div>
          <div id="pollVerdictText">
            El dominio contiene typosquatting y el adjunto oculta una doble extensión ejecutable. ¡Es una amenaza crítica de ingeniería social!
          </div>
        </div>

        <div class="poll-actions-row">
          <button type="button" class="thm-btn-submit" id="btnRevealVerdict" style="height: 38px; padding: 0 16px;">
            <span>🎯 Revelar Veredicto</span>
          </button>

          <button type="button" class="btn-learn btn-learn-secondary" id="btnResetPoll" style="height: 38px; padding: 0 14px; font-size: 0.75rem;">
            <span>🔄 Reiniciar Votos</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(pollWrap);
    this.pollModal = pollWrap.querySelector('#pollModal');
    this.pollBackdrop = pollWrap.querySelector('#pollBackdrop');

    // 4. Barra Flotante de Herramientas del Instructor (Presenter Dock)
    const dockEl = document.createElement('nav');
    dockEl.id = 'instructorDock';
    dockEl.className = 'instructor-dock';
    dockEl.setAttribute('aria-label', 'Barra del Instructor');
    dockEl.innerHTML = `
      <div class="instructor-dock-label" title="Herramientas para impartir la capacitación grupal">
        <span class="instructor-dock-pulse"></span>
        <span>MODO INSTRUCTOR</span>
      </div>

      <div class="instructor-divider"></div>

      <button type="button" class="instructor-btn-tool" id="btnToolLaser" title="Activar Puntero Láser (Tecla L)">
        <span>🔴</span>
        <span>Láser</span>
      </button>

      <button type="button" class="instructor-btn-tool" id="btnToolSpotlight" title="Foco de Atención / Spotlight (Tecla S)">
        <span>🔦</span>
        <span>Foco</span>
      </button>

      <button type="button" class="instructor-btn-tool" id="btnToolPoll" title="Lanzar Votación para el Grupo (Tecla V)">
        <span>👥</span>
        <span>Votación Sala</span>
      </button>

      <button type="button" class="instructor-btn-tool" id="btnToolCinema" title="Modo Proyector / Pantalla Expandida (Tecla F)">
        <span>🔍</span>
        <span>Proyector</span>
      </button>

      <a href="shorts.html" class="instructor-btn-tool" style="text-decoration:none; color: #ffc83d; border-color: rgba(255, 200, 61, 0.4);" title="Abrir CyberShorts Studio (Cápsulas Flat 2D)">
        <span>📱</span>
        <span>Shorts 9:16</span>
      </a>

      <div class="instructor-divider"></div>

      <button type="button" class="instructor-btn-tool" id="btnPrevSceneStep" title="Retroceder Escena (Tecla ←)">
        <span>◀</span>
      </button>

      <button type="button" class="instructor-btn-tool" id="btnNextSceneStep" title="Avanzar Escena (Tecla Espacio o →)">
        <span>Avanzar</span>
        <span>▶</span>
      </button>
    `;
    document.body.appendChild(dockEl);
    this.dockEl = dockEl;
  }

  attachMouseTracking() {
    window.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Actualizar posición del Láser
      if (this.laserActive && this.laserEl) {
        this.laserEl.style.left = `${x}px`;
        this.laserEl.style.top = `${y}px`;
      }

      // Actualizar variables CSS para el Foco Escénico
      if (this.spotlightActive) {
        document.documentElement.style.setProperty('--mouse-x', `${x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  }

  attachDockEvents() {
    // Botón Láser
    const laserBtn = this.dockEl.querySelector('#btnToolLaser');
    if (laserBtn) {
      laserBtn.addEventListener('click', () => this.toggleLaser());
    }

    // Botón Foco
    const spotBtn = this.dockEl.querySelector('#btnToolSpotlight');
    if (spotBtn) {
      spotBtn.addEventListener('click', () => this.toggleSpotlight());
    }

    // Botón Votación
    const pollBtn = this.dockEl.querySelector('#btnToolPoll');
    if (pollBtn) {
      pollBtn.addEventListener('click', () => this.togglePoll());
    }

    // Botón Proyector
    const cinemaBtn = this.dockEl.querySelector('#btnToolCinema');
    if (cinemaBtn) {
      cinemaBtn.addEventListener('click', () => this.toggleCinema());
    }

    // Botones de Avance de Escena
    const prevBtn = this.dockEl.querySelector('#btnPrevSceneStep');
    const nextBtn = this.dockEl.querySelector('#btnNextSceneStep');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        sound.playClick();
        this.stepActiveMotion(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sound.playClick();
        this.stepActiveMotion(1);
      });
    }

    // Eventos del Modal de Votación
    const btnVoteSafe = document.getElementById('btnVoteSafe');
    const btnVoteDanger = document.getElementById('btnVoteDanger');
    const btnReveal = document.getElementById('btnRevealVerdict');
    const btnReset = document.getElementById('btnResetPoll');
    const btnClose = document.getElementById('btnClosePoll');

    if (btnVoteSafe) {
      btnVoteSafe.addEventListener('click', () => {
        sound.playClick();
        this.pollVotes.safe++;
        this.updatePollUI();
      });
    }

    if (btnVoteDanger) {
      btnVoteDanger.addEventListener('click', () => {
        sound.playClick();
        this.pollVotes.danger++;
        this.updatePollUI();
      });
    }

    if (btnReveal) {
      btnReveal.addEventListener('click', () => {
        sound.playContainmentSuccess();
        this.pollVotes.revealed = true;
        const banner = document.getElementById('pollVerdictBanner');
        if (banner) banner.style.display = 'block';
        btnReveal.disabled = true;
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        sound.playClick();
        this.pollVotes = { safe: 0, danger: 0, revealed: false };
        const banner = document.getElementById('pollVerdictBanner');
        if (banner) banner.style.display = 'none';
        if (btnReveal) btnReveal.disabled = false;
        this.updatePollUI();
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', () => this.togglePoll(false));
    }

    if (this.pollBackdrop) {
      this.pollBackdrop.addEventListener('click', () => this.togglePoll(false));
    }
  }

  attachKeyboardControls() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key.toLowerCase() === 'l') {
        this.toggleLaser();
      } else if (e.key.toLowerCase() === 's') {
        this.toggleSpotlight();
      } else if (e.key.toLowerCase() === 'v') {
        this.togglePoll();
      } else if (e.key.toLowerCase() === 'f') {
        this.toggleCinema();
      } else if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        this.stepActiveMotion(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.stepActiveMotion(-1);
      } else if (e.key === 'Escape') {
        if (this.pollOpen) this.togglePoll(false);
        if (this.spotlightActive) this.toggleSpotlight(false);
        if (this.laserActive) this.toggleLaser(false);
      }
    });
  }

  toggleLaser(forceState = null) {
    sound.playClick();
    this.laserActive = forceState !== null ? forceState : !this.laserActive;
    if (this.laserEl) {
      this.laserEl.style.display = this.laserActive ? 'block' : 'none';
    }
    const btn = this.dockEl.querySelector('#btnToolLaser');
    if (btn) btn.classList.toggle('active-laser', this.laserActive);
  }

  toggleSpotlight(forceState = null) {
    sound.playClick();
    this.spotlightActive = forceState !== null ? forceState : !this.spotlightActive;
    if (this.spotlightEl) {
      this.spotlightEl.classList.toggle('active', this.spotlightActive);
    }
    const btn = this.dockEl.querySelector('#btnToolSpotlight');
    if (btn) btn.classList.toggle('active-spotlight', this.spotlightActive);
  }

  toggleCinema(forceState = null) {
    sound.playClick();
    this.cinemaActive = forceState !== null ? forceState : !this.cinemaActive;
    document.body.classList.toggle('cinema-stage-active', this.cinemaActive);
    const btn = this.dockEl.querySelector('#btnToolCinema');
    if (btn) btn.classList.toggle('active', this.cinemaActive);

    // Ajustar scroll suave al escenario activo
    const openCard = document.querySelector('.thm-task-card.open');
    if (openCard) {
      openCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  togglePoll(forceState = null) {
    sound.playClick();
    this.pollOpen = forceState !== null ? forceState : !this.pollOpen;
    if (this.pollModal && this.pollBackdrop) {
      this.pollModal.classList.toggle('open', this.pollOpen);
      this.pollBackdrop.classList.toggle('open', this.pollOpen);
    }
    const btn = this.dockEl.querySelector('#btnToolPoll');
    if (btn) btn.classList.toggle('active', this.pollOpen);
  }

  updatePollUI() {
    const safeEl = document.getElementById('voteCountSafe');
    const dangerEl = document.getElementById('voteCountDanger');
    const fillSafe = document.getElementById('pollFillSafe');
    const fillDanger = document.getElementById('pollFillDanger');
    const pctLabel = document.getElementById('pollPctLabel');

    if (safeEl) safeEl.textContent = this.pollVotes.safe;
    if (dangerEl) dangerEl.textContent = this.pollVotes.danger;

    const total = this.pollVotes.safe + this.pollVotes.danger;
    let safePct = 50;
    let dangerPct = 50;

    if (total > 0) {
      safePct = Math.round((this.pollVotes.safe / total) * 100);
      dangerPct = 100 - safePct;
    }

    if (fillSafe) fillSafe.style.width = `${safePct}%`;
    if (fillDanger) fillDanger.style.width = `${dangerPct}%`;
    if (pctLabel) pctLabel.textContent = `${safePct}% Seguro (${this.pollVotes.safe}) / ${dangerPct}% Amenaza (${this.pollVotes.danger})`;
  }

  stepActiveMotion(direction = 1) {
    // Buscar el reproductor de animación que esté visible en la tarea actualmente abierta
    const openTask = document.querySelector('.thm-task-card.open');
    if (!openTask) return;

    const btnNext = openTask.querySelector('#btnNextScene');
    const btnPrev = openTask.querySelector('#btnPrevScene');

    if (direction > 0 && btnNext) {
      btnNext.click();
    } else if (direction < 0 && btnPrev) {
      btnPrev.click();
    }
  }
}
