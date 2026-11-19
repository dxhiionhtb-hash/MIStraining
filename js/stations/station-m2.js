/**
 * MÓDULO 2: SEGURIDAD EN IA & PROTECCIÓN DE DATOS
 * Basado directamente en AI Safety and data protection.pptx
 */

import { Icons } from '../components/svg-icons.js';
import { trainingState } from '../state.js';
import { sound } from '../audio.js';
import { MotionExplainerPlayer } from '../components/motion-director.js';

export class StationM2 {
  constructor(containerEl) {
    this.container = containerEl;
    this.activeTab = 'learn';
    this.environment = 'public';

    this.tokens = [
      {
        id: 'client',
        category: 'client',
        categoryName: 'Datos de Clientes / PII',
        exposedText: 'Banco Continental',
        maskedText: 'Entidad Financiera Regional [Anonimizado]',
        isMasked: false
      },
      {
        id: 'contact',
        category: 'contact',
        categoryName: 'Datos Personales y Contacto',
        exposedText: 'Dra. Valeria Méndez (DNI: 43.892.110)',
        maskedText: 'Titular Delegado de Operaciones [Anonimizado]',
        isMasked: false
      },
      {
        id: 'finance',
        category: 'finance',
        categoryName: 'Estrategia de Precios & Finanzas',
        exposedText: '$420,000 USD con margen del 38%',
        maskedText: 'Presupuesto Rango Alfa con Estructura de Margen Tipo B',
        isMasked: false
      },
      {
        id: 'cred',
        category: 'cred',
        categoryName: 'Credenciales & Claves de Acceso',
        exposedText: 'TempAuth_2026! (Clave de Acceso #9912)',
        maskedText: '[Credencial Omitida / Gestión Interna]',
        isMasked: false
      }
    ];

    this.render();
    this.attachEvents();
    this.updateRiskHUD();
  }

  render() {
    this.container.innerHTML = `
      <header class="lesson-banner">
        <div class="lesson-title-box">
          <h1>
            <span>Módulo 2: Seguridad en IA & Protección de Datos</span>
            <span class="lesson-code-badge">LECCIÓN INTERACTIVA</span>
          </h1>
          <p class="lesson-desc">
            La Inteligencia Artificial aumenta nuestra productividad, pero introduce riesgos críticos de filtración de datos, sesgos y alucinaciones. Aprende a utilizarla con criterio y anonimización estricta.
          </p>
        </div>
        <button type="button" class="btn-learn btn-learn-secondary" id="btnBackToMap2">
          ${Icons.map}
          <span>Volver a la Ruta</span>
        </button>
      </header>

      <!-- Subnavegación de la Lección -->
      <nav class="lesson-subnav">
        <button type="button" class="subnav-btn active" data-tab="learn">
          <span>📖 1. Riesgos de la IA (Alucinaciones y Datos)</span>
        </button>
        <button type="button" class="subnav-btn" data-tab="practice">
          <span>🎯 2. Práctica: Anonimización de Prompts</span>
        </button>
        <button type="button" class="subnav-btn" data-tab="summary">
          <span>📋 3. Buenas Prácticas Corporativas (Resumen)</span>
        </button>
      </nav>

      <!-- TAB 1: FUNDAMENTOS DE SEGURIDAD EN IA -->
      <div class="tab-content" id="tabContent_m2_learn">
        <div class="training-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div>
              <h2 style="font-size: var(--text-lg); font-weight: 800; color: #ffffff;">Animación Táctica: Flujo de Datos y Bóveda Segura</h2>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 2px;">
                Visualización física de la fuga de partículas de información y el proceso de tamizado en bóveda.
              </p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan); background: var(--accent-cyan-dim); border: 1px solid var(--border-cyan); padding: 3px 8px; clip-path: var(--chamfer-sm);">ANIMACIÓN EXPLICATIVA</span>
          </div>

          <!-- Reproductor de Motion Graphics Táctico -->
          <div id="m2MotionStudio"></div>

          <div class="flip-grid" style="grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-warning); font-family: var(--font-mono); font-weight: 800;">01</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Alucinaciones</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">La IA genera datos con seguridad que pueden ser ficticios; valida siempre hechos y cifras.</p>
            </div>

            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-weight: 800;">02</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Sesgo Algorítmico</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Aplica criterio ético humano en decisiones sensibles o de evaluación de personas.</p>
            </div>

            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-red); font-family: var(--font-mono); font-weight: 800;">03</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Fuga de Información</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Nunca pegues códigos fuente privados, contraseñas ni contratos confidenciales.</p>
            </div>
          </div>

          <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
            <button type="button" class="btn-learn btn-learn-primary" id="btnGoToPractice2">
              <span>Iniciar Práctica de Anonimización ➔</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 2: PRÁCTICA DE ANONIMIZACIÓN -->
      <div class="tab-content" id="tabContent_m2_practice" style="display: none;">
        <div class="m2-layout">
          <!-- Panel Izquierdo: Configuración de Entorno -->
          <aside class="m2-config-panel glass-card">
            <div>
              <div class="m2-section-title">
                ${Icons.cpu}
                <span>1. SELECCIONA EL ENTORNO DE IA</span>
              </div>
              <div class="m2-env-selector">
                <button type="button" class="m2-env-card danger active" data-env="public" id="envPublicBtn">
                  <div class="m2-env-icon">${Icons.cloud}</div>
                  <div class="m2-env-info">
                    <h4>IA Pública Gratuita</h4>
                    <p>Riesgo alto: tus prompts pueden usarse para reentrenamiento global abierto.</p>
                  </div>
                </button>

                <button type="button" class="m2-env-card" data-env="vault" id="envVaultBtn">
                  <div class="m2-env-icon">${Icons.lock}</div>
                  <div class="m2-env-info">
                    <h4>Bóveda Corporativa Segura</h4>
                    <p>Instancia empresarial aislada con cifrado y cláusula de no retención.</p>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <div class="m2-section-title">
                ${Icons.shieldCheck}
                <span>2. ESTADO DE CATEGORÍAS SENSIBLES</span>
              </div>
              <div class="m2-categories-list" id="m2CatList"></div>
            </div>
          </aside>

          <!-- Panel Derecho: Prompt & Inspector de Tokens -->
          <main class="m2-stage-panel">
            <div class="m2-risk-hud">
              <div class="m2-risk-header">
                <span>RIESGO ESTIMADO DE FUGA DE INFORMACIÓN</span>
                <span class="m2-risk-pct" id="m2RiskValue">100% RIESGO CRÍTICO</span>
              </div>
              <div class="m2-risk-track">
                <div class="m2-risk-fill" id="m2RiskFill" style="width: 100%;"></div>
              </div>
            </div>

            <div class="m2-prompt-box">
              <div class="m2-prompt-tip">
                ${Icons.xray}
                <span>TOCA CADA ETIQUETA ROJA PARA ANONIMIZAR EL DATO CONFIDENCIAL:</span>
              </div>

              <p style="margin-bottom: 12px; color: var(--text-muted); font-size: var(--text-xs); font-family: var(--font-mono);">
                // BORRADOR DE CONSULTA AL ASISTENTE DE IA:
              </p>

              <p>
                "Actúa como consultor senior de estrategia. Elabora una propuesta ejecutiva para el cliente 
                <span class="token-pill exposed" data-token="client" id="token_client">
                  ${Icons.alertOctagon}
                  <span class="token-text">${this.tokens[0].exposedText}</span>
                </span>,
                representado por el contacto 
                <span class="token-pill exposed" data-token="contact" id="token_contact">
                  ${Icons.alertOctagon}
                  <span class="token-text">${this.tokens[1].exposedText}</span>
                </span>.
              </p>
              <p style="margin-top: 10px;">
                El presupuesto comercial asignado es de 
                <span class="token-pill exposed" data-token="finance" id="token_finance">
                  ${Icons.alertOctagon}
                  <span class="token-text">${this.tokens[2].exposedText}</span>
                </span>. 
                Para sincronizar el acceso al portal, utilizar la clave de acceso temporal 
                <span class="token-pill exposed" data-token="cred" id="token_cred">
                  ${Icons.alertOctagon}
                  <span class="token-text">${this.tokens[3].exposedText}</span>
                </span>."
              </p>
            </div>

            <footer style="display: flex; justify-content: flex-end; gap: var(--space-3);">
              <button type="button" class="btn-tactical btn-tactical-primary" id="btnSubmitPrompt" disabled>
                ${Icons.shieldCheck}
                <span>Enviar Consulta Segura (0% Riesgo)</span>
              </button>
            </footer>

            <div id="m2FeedbackBox"></div>

            <div class="m2-terminal-out" id="m2TerminalOut">
              <div style="color: var(--text-cyan); margin-bottom: 6px;">[RESPUESTA DE IA EN BÓVEDA SEGURA]:</div>
              <div>✓ Consulta procesada con éxito sin exponer secretos corporativos ni datos personales.</div>
              <div>✓ La propuesta ejecutiva fue redactada con variables genéricas sin riesgo legal ni comercial.</div>
            </div>
          </main>
        </div>
      </div>

      <!-- TAB 3: RESUMEN DE SEGURIDAD EN IA -->
      <div class="tab-content" id="tabContent_m2_summary" style="display: none;">
        <div class="training-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
              <h2 style="font-size: var(--text-lg); font-weight: 800; color: #ffffff;">Protocolo Táctico para IA Corporativa</h2>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 2px;">
                4 reglas inmediatas para acelerar productividad sin comprometer propiedad intelectual.
              </p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan); background: var(--accent-cyan-dim); border: 1px solid var(--border-cyan); padding: 3px 8px; clip-path: var(--chamfer-sm);">POLÍTICA DE USO</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            <div style="padding: 12px 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; color: var(--accent-cyan); width: 26px; height: 26px; background: var(--accent-cyan-dim); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm); flex-shrink: 0;">01</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.8rem; display: block;">Humano en el Bucle (Human-in-the-Loop)</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">Tú respondes legal y técnicamente por el output final del modelo.</span>
              </div>
            </div>

            <div style="padding: 12px 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; color: var(--accent-red); width: 26px; height: 26px; background: var(--accent-red-dim); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm); flex-shrink: 0;">02</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.8rem; display: block;">Cero Secretos ni Contraseñas</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">Contraseñas, claves de acceso y datos confidenciales jamás deben colocarse en consultas.</span>
              </div>
            </div>

            <div style="padding: 12px 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; color: var(--accent-cyan); width: 26px; height: 26px; background: var(--accent-cyan-dim); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm); flex-shrink: 0;">03</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.8rem; display: block;">Anonimización Previa Obligatoria</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">Usa alias para clientes y montos ("Cliente X", "$[Presupuesto]").</span>
              </div>
            </div>

            <div style="padding: 12px 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: flex-start; gap: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; color: var(--accent-cyan); width: 26px; height: 26px; background: var(--accent-cyan-dim); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm); flex-shrink: 0;">04</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.8rem; display: block;">Solo Instancias Licenciadas</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">Trabaja en la Bóveda con cláusula de no retención de entrenamiento.</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 20px; display: flex; justify-content: space-between;">
            <button type="button" class="btn-learn btn-learn-secondary" id="btnBackToPractice2">
              <span>⬅ Volver al Simulador</span>
            </button>
            <button type="button" class="btn-learn btn-learn-primary" id="btnCompleteModule2">
              <span>Completar Misión 02 ➔</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.renderCategoriesList();
    this.motionPlayer = new MotionExplainerPlayer(this.container.querySelector('#m2MotionStudio'), 'm2');
  }

  renderCategoriesList() {
    const catListEl = this.container.querySelector('#m2CatList');
    catListEl.innerHTML = this.tokens.map(t => `
      <div class="m2-category-item ${t.isMasked ? 'cleared' : ''}">
        <span>${t.categoryName}</span>
        <span class="m2-category-status">${t.isMasked ? 'PROTEGIDO ✓' : 'EXPUESTO ⚠️'}</span>
      </div>
    `).join('');
  }

  attachEvents() {
    this.container.querySelector('#btnBackToMap2').addEventListener('click', () => {
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

    this.container.querySelector('#btnGoToPractice2').addEventListener('click', () => {
      sound.playClick();
      this.switchSubTab('practice');
    });

    this.container.querySelector('#btnBackToPractice2').addEventListener('click', () => {
      sound.playClick();
      this.switchSubTab('practice');
    });

    this.container.querySelector('#btnCompleteModule2').addEventListener('click', () => {
      sound.playContainmentSuccess();
      trainingState.addPoints(50);
      trainingState.completeModule('m2', 'ai_guardian');
      alert('¡Excelente trabajo! Has completado el Módulo 2 y desbloqueado la insignia AI Guardian 🤖');
      trainingState.setModule('m3');
    });

    // Selector de Entornos
    const btnPublic = this.container.querySelector('#envPublicBtn');
    const btnVault = this.container.querySelector('#envVaultBtn');

    btnPublic.addEventListener('click', () => {
      sound.playClick();
      this.environment = 'public';
      btnPublic.classList.add('active');
      btnVault.classList.remove('active');
      this.updateRiskHUD();
    });

    btnVault.addEventListener('click', () => {
      sound.playClick();
      this.environment = 'vault';
      btnVault.classList.add('active');
      btnPublic.classList.remove('active');
      this.updateRiskHUD();
    });

    // Clic en Tokens
    this.tokens.forEach(tok => {
      const el = this.container.querySelector(`#token_${tok.id}`);
      if (el) {
        el.addEventListener('click', () => {
          sound.playSanitize();
          tok.isMasked = !tok.isMasked;

          if (tok.isMasked) {
            el.classList.remove('exposed');
            el.classList.add('sanitized');
            el.innerHTML = `${Icons.shieldCheck} <span class="token-text">${tok.maskedText}</span>`;
          } else {
            el.classList.remove('sanitized');
            el.classList.add('exposed');
            el.innerHTML = `${Icons.alertOctagon} <span class="token-text">${tok.exposedText}</span>`;
          }

          this.renderCategoriesList();
          this.updateRiskHUD();
        });
      }
    });

    this.container.querySelector('#btnSubmitPrompt').addEventListener('click', () => {
      this.handleSubmit();
    });
  }

  switchSubTab(tab) {
    this.activeTab = tab;
    this.container.querySelectorAll('.subnav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });

    this.container.querySelector('#tabContent_m2_learn').style.display = tab === 'learn' ? 'block' : 'none';
    this.container.querySelector('#tabContent_m2_practice').style.display = tab === 'practice' ? 'block' : 'none';
    this.container.querySelector('#tabContent_m2_summary').style.display = tab === 'summary' ? 'block' : 'none';
  }

  updateRiskHUD() {
    let unmaskedCount = this.tokens.filter(t => !t.isMasked).length;
    let baseRisk = this.environment === 'public' ? 40 : 0;
    let tokenRisk = unmaskedCount * 15;
    let totalRisk = baseRisk + tokenRisk;

    const riskValEl = this.container.querySelector('#m2RiskValue');
    const riskFillEl = this.container.querySelector('#m2RiskFill');
    const submitBtn = this.container.querySelector('#btnSubmitPrompt');

    riskValEl.textContent = totalRisk === 0 ? '0% SEGURO PARA ENVIAR' : `${totalRisk}% RIESGO DE FILTRACIÓN`;
    riskFillEl.style.width = `${totalRisk}%`;

    if (totalRisk === 0) {
      riskValEl.classList.add('zero');
      riskFillEl.classList.add('zero');
      submitBtn.removeAttribute('disabled');
    } else {
      riskValEl.classList.remove('zero');
      riskFillEl.classList.remove('zero');
      submitBtn.setAttribute('disabled', 'true');
    }
  }

  handleSubmit() {
    sound.playSuccess();
    trainingState.addPoints(30);
    trainingState.incrementStreak();

    this.container.querySelector('#m2TerminalOut').classList.add('active');
    this.container.querySelector('#m2FeedbackBox').innerHTML = `
      <div class="tactical-feedback success">
        <div class="tactical-feedback-icon">${Icons.shieldCheck}</div>
        <div>
          <strong>¡Consulta Segura Enviada con Éxito! (+30 pts)</strong>
          Garantizaste la confidencialidad de la organización. Ningún dato sensible de clientes ni credenciales viajó a modelos abiertos.
        </div>
      </div>
    `;

    setTimeout(() => {
      this.switchSubTab('summary');
    }, 1800);
  }
}
