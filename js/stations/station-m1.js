/**
 * MÓDULO 1: PHISHING & MANIPULACIÓN SOCIAL
 * Basado directamente en la presentación Phishing.pptx (Caso de Jenny, 5 Red Flags, Práctica interactiva)
 */

import { Icons } from '../components/svg-icons.js';
import { trainingState } from '../state.js';
import { sound } from '../audio.js';
import { MotionExplainerPlayer } from '../components/motion-director.js';

export class StationM1 {
  constructor(containerEl) {
    this.container = containerEl;
    this.activeTab = 'learn'; // 'learn' | 'practice' | 'summary'

    this.emails = [
      {
        id: 0,
        sender: 'contabilidad@proveedor-facc-turacion.com',
        senderDisplay: 'Servicios Logísticos Globales <contabilidad@proveedor-facc-turacion.com>',
        subject: '[URGENTE] Factura vencida y retención de pagos pendientes #FV-9082',
        snippet: 'Estimado colaborador, le informamos que debido a discrepancias tributarias su factura...',
        date: 'Hoy, 08:14 AM',
        isPhishing: true,
        anomalies: [
          {
            id: 'sender',
            title: 'Bandera Roja 01: Remitente Alterado (Typosquatting)',
            detail: 'El dominio utiliza una letra doble disimulada ("facc-turacion"). Simula ser el proveedor oficial pero es un dominio falso registrado por atacantes.'
          },
          {
            id: 'urgency',
            title: 'Bandera Roja 02: Urgencia Fabricada y Miedo',
            detail: 'Amenaza con consecuencias graves ("60 minutos") para provocar prisa y evitar que te detengas a verificar con el departamento de contabilidad.'
          },
          {
            id: 'attachment',
            title: 'Bandera Roja 04: Adjunto con Doble Extensión',
            detail: 'El archivo parece un documento PDF, pero termina en ".exe" (Factura_Fiscal_Retenida.pdf.exe). Es un programa malicioso ejecutable.'
          }
        ],
        bodyHtml: `
          <p>Estimado colaborador,</p>
          <p>Por medio de la presente le notificamos que su factura comercial <strong>#FV-9082</strong> presenta una retención preventiva tributaria. Tiene un <span class="xray-target" data-anomaly="urgency">plazo improrrogable de 60 minutos</span> para validar el folio o de lo contrario se congelará su cuenta comercial.</p>
          <p>Descargue de inmediato el archivo adjunto para cotejar los registros bancarios:</p>
          <div style="padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-subtle); border-radius: 8px; margin: 12px 0; display: inline-flex; align-items: center; gap: 10px;">
            <span style="color: var(--alert-coral);">${Icons.alertOctagon}</span>
            <span class="xray-target" data-anomaly="attachment" style="font-family: var(--font-mono); font-size: 0.85rem;">Factura_Fiscal_Retenida.pdf.exe (2.4 MB)</span>
          </div>
          <p>Atentamente,<br>Departamento de Facturación y Cobranzas</p>
        `
      },
      {
        id: 1,
        sender: 'bienestar.talento@empresa.com',
        senderDisplay: 'Bienestar y Talento Corporativo <bienestar.talento@empresa.com>',
        subject: 'Actualización Anual: Portal de Beneficios de Salud y Póliza Colectiva',
        snippet: 'Compartimos el calendario regular de renovación médica y el enlace directo al portal interno...',
        date: 'Ayer, 04:30 PM',
        isPhishing: false,
        anomalies: [
          {
            id: 'sender',
            title: 'Verificación Positiva: Remitente Institucional Auténtico',
            detail: 'Dominio interno auténtico (@empresa.com) y firma digital corporativa verificada. Mensaje oficial de Recursos Humanos.'
          },
          {
            id: 'link',
            title: 'Verificación Positiva: Enlace Seguro a la Intranet',
            detail: 'El hipervínculo apunta estrictamente al servidor institucional cifrado (https://intranet.empresa.com/...).'
          }
        ],
        bodyHtml: `
          <p>Estimado equipo,</p>
          <p>Les compartimos el cronograma oficial de actualización de cobertura médica complementaria para este ciclo.</p>
          <p>Pueden consultar el directorio de clínicas y descargar el instructivo en nuestra intranet:</p>
          <p><span class="xray-target" data-anomaly="link" style="color: var(--accent-mint); font-family: var(--font-mono); text-decoration: underline;">https://intranet.empresa.com/bienestar/seguro-2026</span></p>
          <p>La plataforma estará disponible durante las próximas dos semanas. Ante cualquier consulta, pueden comunicarse a la extensión 4402.</p>
          <p>Saludos cordiales,<br>Comité de Talento y Bienestar</p>
        `
      },
      {
        id: 2,
        sender: 'soporte@seguridad-acceso-ti.net',
        senderDisplay: 'Mesa de Ayuda de Sistemas <soporte@seguridad-acceso-ti.net>',
        subject: 'Alerta TI: Su acceso remoto corporativo expirará en 15 minutos',
        snippet: 'Hemos detectado inconsistencias en su certificado de red remota. Para evitar la suspensión...',
        date: 'Hoy, 09:42 AM',
        isPhishing: true,
        anomalies: [
          {
            id: 'sender',
            title: 'Bandera Roja 01: Dominio Externo Falso',
            detail: 'El equipo de sistemas jamás escribe desde dominios públicos ".net". Este dominio fue registrado por atacantes para clonar la identidad técnica.'
          },
          {
            id: 'link',
            title: 'Bandera Roja 03: Enlace Sospechoso a Portal Señuelo',
            detail: 'El enlace no está cifrado y apunta a un servidor externo desconocido diseñado para robar contraseñas corporativas.'
          }
        ],
        bodyHtml: `
          <p>Aviso automatizado de Sistemas:</p>
          <p>Hemos identificado una sincronización anómala en sus accesos. Por protocolo, su cuenta será suspendida en 15 minutos si no valida su clave en el portal:</p>
          <p><span class="xray-target" data-anomaly="link" style="color: var(--text-cyan); font-family: var(--font-mono); font-size: 0.85rem; text-decoration: underline;">http://login-seguridad-portal.cloud-check.com/verify</span></p>
          <p>Nota: No contacte por teléfono a la mesa de ayuda hasta completar el formulario.</p>
        `
      }
    ];

    this.currentEmailIndex = 0;
    this.xrayActive = false;
    this.resolvedEmails = [false, false, false];

    this.render();
    this.attachEvents();
  }

  render() {
    this.container.innerHTML = `
      <header class="lesson-banner">
        <div class="lesson-title-box">
          <h1>
            <span>Módulo 1: Phishing & Manipulación Social</span>
            <span class="lesson-code-badge">LECCIÓN INTERACTIVA</span>
          </h1>
          <p class="lesson-desc">
            Aprende a reconocer las trampas que usan los atacantes para engañar a los colaboradores. Conoce el flujo de ataque de Jenny, las 5 Banderas Rojas y practica en el simulador interactivo de correo.
          </p>
        </div>
        <button type="button" class="btn-learn btn-learn-secondary" id="btnBackToMap1">
          ${Icons.map}
          <span>Volver a la Ruta</span>
        </button>
      </header>

      <!-- Subnavegación de la Lección -->
      <nav class="lesson-subnav">
        <button type="button" class="subnav-btn active" data-tab="learn">
          <span>📖 1. Fundamentos & Flujo de Ataque</span>
        </button>
        <button type="button" class="subnav-btn" data-tab="practice">
          <span>🎯 2. Simulador Práctico de Correo</span>
        </button>
        <button type="button" class="subnav-btn" data-tab="summary">
          <span>📋 3. Las 5 Banderas Rojas (Resumen)</span>
        </button>
      </nav>

      <!-- TAB 1: APRENDER / FUNDAMENTOS -->
      <div class="tab-content" id="tabContent_learn">
        <div class="training-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div>
              <h2 style="font-size: var(--text-lg); font-weight: 800; color: #ffffff;">Animación Táctica: Cadena de Ataque Phishing</h2>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 2px;">
                Visualización física del vector de engaño y el momento exacto del reflejo defensivo.
              </p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan); background: var(--accent-cyan-dim); border: 1px solid var(--border-cyan); padding: 3px 8px; clip-path: var(--chamfer-sm);">ANIMACIÓN EXPLICATIVA</span>
          </div>

          <!-- Reproductor de Motion Graphics Táctico -->
          <div id="m1MotionStudio"></div>

          <div class="flip-grid" style="grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-red); font-family: var(--font-mono); font-weight: 800;">01</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Inspecciona el Dominio</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">No mires solo el nombre visible; verifica si dice @proveedor-facc.com en lugar de @proveedor.com.</p>
            </div>

            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-warning); font-family: var(--font-mono); font-weight: 800;">02</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Desconfía de la Urgencia</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Plazos de 15 a 60 minutos buscan nublar tu juicio para que actúes sin consultar a tu equipo.</p>
            </div>

            <div class="learning-card-interactive" style="clip-path: var(--chamfer-sm); padding: 14px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-weight: 800;">03</span>
                <h3 style="font-size: var(--text-xs); font-weight: 800;">Pasa el Cursor sin Clic</h3>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 4px;">Pasa el puntero sobre cualquier link para previsualizar la URL real antes de interactuar.</p>
            </div>
          </div>

          <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
            <button type="button" class="btn-learn btn-learn-primary" id="btnGoToPractice1">
              <span>Iniciar Simulador de Correo ➔</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 2: PRÁCTICA EN EL SIMULADOR -->
      <div class="tab-content" id="tabContent_practice" style="display: none;">
        <div class="m1-layout">
          <!-- Bandeja lateral -->
          <aside class="m1-inbox-sidebar glass-card">
            <div class="m1-sidebar-header">
              <span>BANDEJA DE ENTRADA</span>
              <span id="m1SidebarStatus">3 CASOS</span>
            </div>
            <ul class="m1-message-list" id="m1EmailList"></ul>
          </aside>

          <!-- Visor de correo -->
          <main class="m1-viewer-panel">
            <div class="m1-toolbar">
              <span style="font-size: var(--text-xs); color: var(--text-muted); font-family: var(--font-mono);">
                CASO #<span id="m1CaseId">01</span> DE 03
              </span>
              <button type="button" class="btn-xray-toggle" id="btnToggleXray">
                ${Icons.xray}
                <span id="xrayBtnLabel">ACTIVAR ESCÁNER DE BANDERAS ROJAS</span>
              </button>
            </div>

            <article class="m1-email-card" id="m1CardArea">
              <div class="m1-email-headers">
                <div class="m1-header-row">
                  <span class="m1-header-label">DE:</span>
                  <span class="m1-header-value xray-target" data-anomaly="sender" id="m1EmailSender"></span>
                </div>
                <div class="m1-header-row">
                  <span class="m1-header-label">ASUNTO:</span>
                  <span class="m1-header-value" id="m1EmailSubject" style="font-weight: 700;"></span>
                </div>
                <div class="m1-header-row">
                  <span class="m1-header-label">FECHA:</span>
                  <span class="m1-header-value" id="m1EmailDate" style="color: var(--text-muted); font-size: var(--text-xs);"></span>
                </div>
              </div>

              <div class="m1-email-body" id="m1EmailBody"></div>

              <!-- Ficha explicativa desplegada -->
              <div class="m1-forensic-card" id="m1ForensicCard">
                <div class="m1-forensic-header">
                  <span id="forensicTitle">BANDERA ROJA IDENTIFICADA</span>
                  <span style="color: var(--accent-cyan);">${Icons.shieldCheck}</span>
                </div>
                <div class="m1-forensic-body" id="forensicText"></div>
              </div>
            </article>

            <footer class="m1-actions-bar">
              <button type="button" class="btn-tactical btn-tactical-danger" id="btnQuarantine">
                ${Icons.shieldAlert}
                <span>Reportar como Phishing</span>
              </button>
              <button type="button" class="btn-tactical btn-tactical-primary" id="btnApprove">
                ${Icons.shieldCheck}
                <span>Aprobar como Legítimo</span>
              </button>
            </footer>

            <div id="m1FeedbackArea"></div>
          </main>
        </div>
      </div>

      <!-- TAB 3: RESUMEN (LAS 5 BANDERAS ROJAS) -->
      <div class="tab-content" id="tabContent_summary" style="display: none;">
        <div class="training-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div>
              <h2 style="font-size: var(--text-lg); font-weight: 800; color: #ffffff;">Las 5 Banderas Rojas del Phishing (Tactical Summary)</h2>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 2px;">
                5 puntos de comprobación rápida antes de interactuar con cualquier correo corporativo.
              </p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-cyan); background: var(--accent-cyan-dim); border: 1px solid var(--border-cyan); padding: 3px 8px; clip-path: var(--chamfer-sm);">CHECKLIST TÁCTICO</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 10px;">
            <div style="padding: 12px 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: center; gap: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 800; color: var(--accent-cyan); width: 28px; height: 28px; background: var(--accent-cyan-dim); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm);">01</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.8rem; display: block;">Dominio Real</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">Inspecciona @proveedor-facc.com vs @proveedor.com.</span>
              </div>
            </div>

            <div style="padding: 12px 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: center; gap: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 800; color: var(--accent-cyan); width: 28px; height: 28px; background: var(--accent-cyan-dim); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm);">02</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.8rem; display: block;">Saludo Genérico</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">"Estimado usuario" denota campaña masiva automatizada.</span>
              </div>
            </div>

            <div style="padding: 12px 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: center; gap: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 800; color: var(--accent-warning); width: 28px; height: 28px; background: rgba(255,183,3,0.15); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm);">03</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.8rem; display: block;">Hover de Enlaces</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">Pasa el cursor sin clic para revelar la URL real de destino.</span>
              </div>
            </div>

            <div style="padding: 12px 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: center; gap: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 800; color: var(--accent-red); width: 28px; height: 28px; background: var(--accent-red-dim); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm);">04</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.8rem; display: block;">Doble Extensión</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">Archivos como .pdf.exe o .zip son ejecutables maliciosos.</span>
              </div>
            </div>

            <div style="padding: 12px 14px; background: var(--bg-deep); border: 1px solid var(--border-subtle); clip-path: var(--chamfer-sm); display: flex; align-items: center; gap: 12px; grid-column: 1 / -1;">
              <span style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 800; color: var(--accent-cyan); width: 28px; height: 28px; background: var(--accent-cyan-dim); display: flex; align-items: center; justify-content: center; clip-path: var(--chamfer-sm);">05</span>
              <div>
                <strong style="color: #ffffff; font-size: 0.8rem; display: block;">Falsa Urgencia & Logotipos Copiados</strong>
                <span style="font-size: 0.72rem; color: var(--text-secondary);">Cualquiera copia un logo; los límites de tiempo buscan que no verifiques por canal oficial.</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 20px; display: flex; justify-content: space-between;">
            <button type="button" class="btn-learn btn-learn-secondary" id="btnBackToPractice1">
              <span>⬅ Volver al Simulador</span>
            </button>
            <button type="button" class="btn-learn btn-learn-primary" id="btnCompleteModule1">
              <span>Completar Módulo y Desbloquear Insignia 🏅</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.renderEmailList();
    this.loadEmail(0);
    this.motionPlayer = new MotionExplainerPlayer(this.container.querySelector('#m1MotionStudio'), 'm1');
  }

  renderEmailList() {
    const listEl = this.container.querySelector('#m1EmailList');
    listEl.innerHTML = this.emails.map((email, idx) => `
      <li>
        <button type="button" class="m1-message-item ${idx === this.currentEmailIndex ? 'active' : ''} ${this.resolvedEmails[idx] ? 'resolved' : ''}" data-index="${idx}">
          <div class="m1-item-top">
            <span class="m1-sender-badge">${email.sender.split('@')[1]}</span>
            <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">${email.date}</span>
          </div>
          <div class="m1-item-subject">${email.subject}</div>
          <div class="m1-item-snippet">${email.snippet}</div>
        </button>
      </li>
    `).join('');
  }

  loadEmail(index) {
    this.currentEmailIndex = index;
    const email = this.emails[index];

    this.container.querySelector('#m1CaseId').textContent = `0${index + 1}`;
    this.container.querySelector('#m1EmailSender').textContent = email.senderDisplay;
    this.container.querySelector('#m1EmailSubject').textContent = email.subject;
    this.container.querySelector('#m1EmailDate').textContent = email.date;
    this.container.querySelector('#m1EmailBody').innerHTML = email.bodyHtml;

    this.container.querySelector('#m1ForensicCard').classList.remove('active');
    this.container.querySelector('#m1FeedbackArea').innerHTML = '';

    this.renderEmailList();
    this.attachXrayTargetListeners();
  }

  attachEvents() {
    // Volver al mapa
    this.container.querySelector('#btnBackToMap1').addEventListener('click', () => {
      sound.playClick();
      trainingState.setModule('overview');
    });

    // Pestañas internas
    const subtabs = this.container.querySelectorAll('.subnav-btn');
    subtabs.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const tab = btn.dataset.tab;
        this.switchSubTab(tab);
      });
    });

    this.container.querySelector('#btnGoToPractice1').addEventListener('click', () => {
      sound.playClick();
      this.switchSubTab('practice');
    });

    this.container.querySelector('#btnBackToPractice1').addEventListener('click', () => {
      sound.playClick();
      this.switchSubTab('practice');
    });

    this.container.querySelector('#btnCompleteModule1').addEventListener('click', () => {
      sound.playContainmentSuccess();
      trainingState.addPoints(50);
      trainingState.completeModule('m1', 'phishing_hunter');
      alert('¡Felicitaciones! Has completado el Módulo 1 y desbloqueado la insignia Phishing Hunter 🎣');
      trainingState.setModule('m2');
    });

    // Simulador de correos
    this.container.querySelector('#m1EmailList').addEventListener('click', (e) => {
      const btn = e.target.closest('.m1-message-item');
      if (btn) {
        sound.playClick();
        const idx = parseInt(btn.dataset.index, 10);
        this.loadEmail(idx);
      }
    });

    // Toggle Rayos X
    const xrayBtn = this.container.querySelector('#btnToggleXray');
    xrayBtn.addEventListener('click', () => {
      this.xrayActive = !this.xrayActive;
      const cardArea = this.container.querySelector('#m1CardArea');
      const label = this.container.querySelector('#xrayBtnLabel');

      if (this.xrayActive) {
        sound.playScan();
        xrayBtn.classList.add('active');
        cardArea.classList.add('xray-active');
        label.textContent = 'ESCÁNER DE BANDERAS ROJAS ACTIVO';
      } else {
        sound.playClick();
        xrayBtn.classList.remove('active');
        cardArea.classList.remove('xray-active');
        label.textContent = 'ACTIVAR ESCÁNER DE BANDERAS ROJAS';
        this.container.querySelector('#m1ForensicCard').classList.remove('active');
      }
    });

    this.container.querySelector('#btnQuarantine').addEventListener('click', () => {
      this.handleDecision(true);
    });

    this.container.querySelector('#btnApprove').addEventListener('click', () => {
      this.handleDecision(false);
    });
  }

  switchSubTab(tab) {
    this.activeTab = tab;
    this.container.querySelectorAll('.subnav-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });

    this.container.querySelector('#tabContent_learn').style.display = tab === 'learn' ? 'block' : 'none';
    this.container.querySelector('#tabContent_practice').style.display = tab === 'practice' ? 'block' : 'none';
    this.container.querySelector('#tabContent_summary').style.display = tab === 'summary' ? 'block' : 'none';
  }

  attachXrayTargetListeners() {
    const targets = this.container.querySelectorAll('.xray-target');
    const currentEmail = this.emails[this.currentEmailIndex];

    targets.forEach(el => {
      el.addEventListener('click', () => {
        if (!this.xrayActive) return;
        sound.playClick();

        const anomalyKey = el.dataset.anomaly;
        const anomaly = currentEmail.anomalies.find(a => a.id === anomalyKey);

        if (anomaly) {
          el.classList.add('inspected');
          const forensicCard = this.container.querySelector('#m1ForensicCard');
          const forensicTitle = this.container.querySelector('#forensicTitle');
          const forensicText = this.container.querySelector('#forensicText');

          forensicTitle.textContent = anomaly.title;
          forensicText.textContent = anomaly.detail;
          forensicCard.classList.add('active');
        }
      });
    });
  }

  handleDecision(userReported) {
    const email = this.emails[this.currentEmailIndex];
    const isCorrect = (userReported && email.isPhishing) || (!userReported && !email.isPhishing);
    const feedbackArea = this.container.querySelector('#m1FeedbackArea');

    if (isCorrect) {
      sound.playSuccess();
      trainingState.addPoints(25);
      trainingState.incrementStreak();
      this.resolvedEmails[this.currentEmailIndex] = true;

      feedbackArea.innerHTML = `
        <div class="tactical-feedback success">
          <div class="tactical-feedback-icon">${Icons.shieldCheck}</div>
          <div>
            <strong>¡Excelente Decisión de Concientización! (+25 pts)</strong>
            ${email.isPhishing 
              ? 'Identificaste el engaño antes de hacer clic. Tu reporte inmediato permite al equipo de seguridad bloquear la amenaza para el resto de la empresa.'
              : 'Verificaste correctamente un comunicado oficial institucional sin detener tu flujo de trabajo.'}
          </div>
        </div>
      `;
    } else {
      sound.playWarning();
      trainingState.resetStreak();

      feedbackArea.innerHTML = `
        <div class="tactical-feedback danger">
          <div class="tactical-feedback-icon">${Icons.alertOctagon}</div>
          <div>
            <strong>Oportunidad de Aprendizaje (Cultura Sin Culpa)</strong>
            ${email.isPhishing
              ? 'El mensaje contenía banderas rojas sutiles. Recuerda verificar el dominio exacto y la extensión del archivo antes de actuar. Activa el escáner para examinarlas.'
              : 'El mensaje era una comunicación legítima con certificados y remitente verificado de Recursos Humanos.'}
          </div>
        </div>
      `;
    }

    this.renderEmailList();

    if (this.resolvedEmails.filter(Boolean).length === 3) {
      setTimeout(() => {
        this.switchSubTab('summary');
      }, 1500);
    }
  }
}
