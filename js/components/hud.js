/**
 * LEARNING HUD COMPONENT - BARRA SUPERIOR DE CAPACITACIÓN & AWARENESS
 */

import { Icons } from './svg-icons.js';
import { trainingState } from '../state.js';
import { sound } from '../audio.js';

export class TopHUD {
  constructor(containerEl) {
    this.container = containerEl;
    this.render();
    this.attachEvents();
    trainingState.subscribe(state => this.update(state));
  }

  render() {
    this.container.innerHTML = `
      <div class="brand-wrapper">
        <div class="brand-avatar" aria-hidden="true">
          ${Icons.shieldCheck}
        </div>
        <div class="brand-titles">
          <span class="brand-title">CyberShield Training</span>
          <span class="brand-subtitle">Concientización en Seguridad de la Información</span>
        </div>
      </div>

      <nav class="modules-nav" aria-label="Módulos del Curso">
        <button type="button" class="module-tab-btn active" data-mod="overview">
          <span class="module-badge-icon" aria-hidden="true" style="display:inline-flex;align-items:center;">${Icons.map}</span>
          <span>Ruta de Aprendizaje</span>
        </button>

        <button type="button" class="module-tab-btn" data-mod="m1">
          <span class="module-badge-num">01</span>
          <span>Phishing</span>
          <span class="module-check-dot" aria-hidden="true"></span>
        </button>

        <button type="button" class="module-tab-btn" data-mod="m2">
          <span class="module-badge-num">02</span>
          <span>Seguridad en IA</span>
          <span class="module-check-dot" aria-hidden="true"></span>
        </button>

        <button type="button" class="module-tab-btn" data-mod="m3">
          <span class="module-badge-num">03</span>
          <span>Medios USB</span>
          <span class="module-check-dot" aria-hidden="true"></span>
        </button>

        <button type="button" class="module-tab-btn" data-mod="m4">
          <span class="module-badge-num">04</span>
          <span>Ransomware</span>
          <span class="module-check-dot" aria-hidden="true"></span>
        </button>

        <button type="button" class="module-tab-btn" data-mod="assessment">
          <span class="module-badge-num">05</span>
          <span>Assess your Power</span>
          <span class="module-check-dot" aria-hidden="true"></span>
        </button>
      </nav>

      <div class="student-telemetry">
        <div class="points-pill" title="Puntos de Conciencia acumulados">
          <span aria-hidden="true">${Icons.award}</span>
          <span><strong id="hudPointsVal">120</strong> PTS</span>
        </div>

        <div class="course-progress" aria-label="Progreso general del curso">
          <div class="progress-header">
            <span>PROGRESO</span>
            <span><strong id="hudProgressText">0</strong>%</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" id="hudProgressFill" style="width: 0%;"></div>
          </div>
        </div>

        <button type="button" class="btn-icon-control active" id="btnAudioToggle" title="Activar / Silenciar Sonido" aria-label="Control de Audio">
          <span id="audioIconBox">${Icons.volumeOn}</span>
        </button>
      </div>
    `;
  }

  attachEvents() {
    const tabs = this.container.querySelectorAll('.module-tab-btn');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const mod = btn.dataset.mod;
        trainingState.setModule(mod);
      });
    });

    const audioBtn = this.container.querySelector('#btnAudioToggle');
    audioBtn.addEventListener('click', () => {
      const enabled = trainingState.toggleAudio();
      sound.setEnabled(enabled);
      if (enabled) {
        sound.playClick();
        audioBtn.classList.add('active');
        this.container.querySelector('#audioIconBox').innerHTML = Icons.volumeOn;
      } else {
        audioBtn.classList.remove('active');
        this.container.querySelector('#audioIconBox').innerHTML = Icons.volumeOff;
      }
    });
  }

  update(state) {
    const pointsEl = this.container.querySelector('#hudPointsVal');
    const progText = this.container.querySelector('#hudProgressText');
    const progFill = this.container.querySelector('#hudProgressFill');

    if (pointsEl) pointsEl.textContent = state.awarenessPoints;
    if (progText) progText.textContent = state.courseProgress;
    if (progFill) progFill.style.width = `${state.courseProgress}%`;

    const tabs = this.container.querySelectorAll('.module-tab-btn');
    tabs.forEach(btn => {
      const mod = btn.dataset.mod;
      if (mod === state.activeModule) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }

      if (state.modulesStatus[mod]?.completed) {
        btn.classList.add('completed');
      } else {
        btn.classList.remove('completed');
      }
    });
  }
}
