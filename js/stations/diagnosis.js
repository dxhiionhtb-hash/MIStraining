/**
 * MÓDULO 5: ASSESS YOUR POWER (EVALUACIÓN SITUACIONAL & CERTIFICADO)
 * Basado en las 4 presentaciones de referencia y en la regla de cultura Sin Culpa
 */

import { Icons } from '../components/svg-icons.js';
import { trainingState } from '../state.js';
import { sound } from '../audio.js';
import { MotionExplainerPlayer } from '../components/motion-director.js';

export class StationDiagnosis {
  constructor(containerEl) {
    this.container = containerEl;
    this.quizAnswers = {};
    this.submitted = false;

    this.questions = [
      {
        id: 'q1',
        topic: 'Phishing & Manipulación Social',
        question: '1. Recibes un correo urgente diciendo que tu cuenta comercial será suspendida en 30 minutos. ¿Cuál es la mayor señal de alerta?',
        options: [
          { text: 'El logo de la empresa se ve con colores ligeramente claros.', correct: false },
          { text: 'El remitente proviene de @banc0-seguro-login.com y el adjunto es Estado_Cuenta.pdf.exe.', correct: true },
          { text: 'El mensaje llegó a las 8:00 AM en lugar de la tarde.', correct: false }
        ]
      },
      {
        id: 'q2',
        topic: 'Seguridad en Inteligencia Artificial',
        question: '2. Deseas utilizar un asistente de Inteligencia Artificial para resumir un informe confidencial de finanzas. ¿Cómo debes proceder?',
        options: [
          { text: 'Pegar el documento completo en una herramienta de IA pública en línea.', correct: false },
          { text: 'Anonimizar nombres, montos y claves de acceso, y emplear la Bóveda Corporativa autorizada.', correct: true },
          { text: 'Cambiar solo el título del archivo y cargarlo sin anonimizar.', correct: false }
        ]
      },
      {
        id: 'q3',
        topic: 'Medios Extraíbles (USB)',
        question: '3. Encuentras una memoria USB abandonada en una mesa de la cafetería o recepción. ¿Qué conducta preserva la seguridad?',
        options: [
          { text: 'Conectarla a tu computadora para ver de quién son las fotos o archivos y devolverla.', correct: false },
          { text: 'Entregarla a la mesa de ayuda o seguridad de TI sin conectarla jamás a tu equipo.', correct: true },
          { text: 'Conectarla pero asegurándote de no abrir ningún archivo ejecutable.', correct: false }
        ]
      },
      {
        id: 'q4',
        topic: 'Ransomware & Primeros Auxilios',
        question: '4. Sospechas que abriste un archivo malicioso y una ventana advierte que los archivos se están bloqueando. ¿Cuál es el primer reflejo?',
        options: [
          { text: 'Desconectar inmediatamente el cable de red y apagar el Wi-Fi antes de cualquier otra acción.', correct: true },
          { text: 'Reiniciar la máquina repetidamente para ver si se elimina la ventana de rescate.', correct: false },
          { text: 'Intentar restaurar respaldos locales mientras el equipo sigue conectado a la red.', correct: false }
        ]
      },
      {
        id: 'q5',
        topic: 'Cultura Sin Culpa & Notificación',
        question: '5. Si cometiste una equivocación e ingresaste tus credenciales en un formulario engañoso, ¿cuál es la directriz oficial?',
        options: [
          { text: 'Ocultar el incidente por temor a sanciones disciplinarias de la empresa.', correct: false },
          { text: 'Notificar de inmediato al equipo de Seguridad/TI bajo la política de Cero Culpa para revocar accesos a tiempo.', correct: true },
          { text: 'Esperar a ver si los atacantes intentan ingresar a tu cuenta durante el fin de semana.', correct: false }
        ]
      }
    ];

    this.render();
    this.attachEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="diag-container">
        <!-- Reproductor de Motion Graphics Táctico -->
        <div style="margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div>
              <h2 style="font-size: var(--text-base); font-weight: 800; color: #ffffff;">Animación Táctica: Evaluación Situacional</h2>
              <p style="color: var(--text-secondary); font-size: var(--text-xs); margin-top: 2px;">
                Visualización del umbral de excelencia corporativa y la emisión del folio institucional.
              </p>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--accent-green); background: rgba(34, 197, 94, 0.14); border: 1px solid var(--accent-green); padding: 3px 8px; border-radius: var(--radius-sm);">ANIMACIÓN EXPLICATIVA</span>
          </div>
          <div id="m5MotionStudio"></div>
        </div>

        <!-- Bloque de Preguntas Situacionales -->
        <section class="training-card" id="quizSection">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h2 style="font-size: var(--text-base); font-weight: 800; color: #ffffff;">Cuestionario Situacional de Concientización</h2>
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-cyan);">5 ESCENARIOS CRÍTICOS</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${this.questions.map((q, qIdx) => `
              <div style="padding: 16px; background: var(--bg-surface-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">
                <div style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--accent-cyan); margin-bottom: 4px; font-weight: 700;">${q.topic.toUpperCase()}</div>
                <h3 style="font-size: var(--text-sm); font-weight: 700; color: #ffffff; margin-bottom: 12px; line-height: 1.4;">${q.question}</h3>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${q.options.map((opt, oIdx) => `
                    <button type="button" class="quiz-option-btn" data-qid="${q.id}" data-oidx="${oIdx}" style="padding: 10px 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--text-secondary); text-align: left; cursor: pointer; transition: all 140ms; font-size: var(--text-sm);">
                      <strong style="color: var(--accent-green); font-family: var(--font-mono);">${String.fromCharCode(65 + oIdx)}.</strong> ${opt.text}
                    </button>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
            <button type="button" class="thm-btn-submit" id="btnSubmitQuiz" style="height: auto; padding: 12px 24px;">
              <span>Calificar Evaluación Situacional ➔</span>
            </button>
          </div>
          <div id="quizFeedbackArea" style="margin-top: 14px;"></div>
        </section>

        <!-- Certificado de Finalización Oficial -->
        <section class="training-card" id="certificateSection" style="display: none; border-color: var(--accent-green); background: radial-gradient(circle at 50% 20%, rgba(34, 197, 94, 0.12) 0%, rgba(21, 30, 46, 0.98) 100%); margin-top: 24px;">
          <div style="text-align: center; padding: 28px 20px; border: 2px dashed rgba(34, 197, 94, 0.4); border-radius: var(--radius-lg);">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 50%; background: rgba(34, 197, 94, 0.15); border: 2px solid var(--accent-green); color: var(--accent-green); margin-bottom: 14px;">
              ${Icons.award}
            </div>
            
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-green); letter-spacing: 0.15em; font-weight: 800; text-transform: uppercase;">
              CERTIFICADO OFICIAL DE ACREDITACIÓN CORPORATIVA
            </div>
            <h2 style="font-size: 1.8rem; font-weight: 800; color: #ffffff; margin: 10px 0;">Seguridad de la Información & Concientización</h2>
            <p style="font-size: var(--text-sm); color: var(--text-secondary); max-width: 600px; margin: 0 auto;">
              Se otorga el presente reconocimiento oficial a:
            </p>
            <h3 style="font-size: 1.6rem; color: var(--accent-green); font-weight: 800; margin: 14px 0;" id="certStudentName">Colaborador Corporativo</h3>
            <p style="font-size: var(--text-xs); color: var(--text-muted); max-width: 680px; margin: 0 auto; line-height: 1.6;">
              Por haber demostrado criterio operativo y reflejos tácticos en detección de Phishing, resguardo ético en Inteligencia Artificial, prevención en Medios Físicos USB y contención temprana de Ransomware bajo la cultura de Cero Culpa.
            </p>

            <!-- Folio Oficial Destacado -->
            <div style="margin: 20px auto; display: inline-flex; align-items: center; gap: 12px; padding: 10px 18px; background: rgba(0,0,0,0.4); border: 1px solid var(--accent-green); border-radius: var(--radius-sm);">
              <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">FOLIO DE VERIFICACIÓN:</span>
              <strong style="font-family: var(--font-mono); font-size: 1rem; color: var(--accent-green); letter-spacing: 0.05em;" id="certVerificationCode">CS-2026-CHAMPION</strong>
              <button type="button" id="btnCopyCertCode" style="background: transparent; border: 1px solid var(--border-subtle); border-radius: 3px; color: var(--text-secondary); padding: 3px 8px; font-size: 0.7rem; cursor: pointer;">
                Copiar
              </button>
            </div>

            <div style="display: flex; justify-content: center; gap: 24px; margin-top: 18px; flex-wrap: wrap;">
              <div style="text-align: center;">
                <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">FECHA DE EMISIÓN</span>
                <div style="font-weight: 700; color: #ffffff;" id="certDateText">12/11/2026</div>
              </div>
              <div style="text-align: center;">
                <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">CALIFICACIÓN</span>
                <div style="font-weight: 800; color: var(--accent-green);" id="certScoreText">100% EXCELENCIA</div>
              </div>
              <div style="text-align: center;">
                <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">ESTADO</span>
                <div style="font-weight: 800; color: var(--accent-green);">ACREDITADO</div>
              </div>
            </div>

            <div style="margin-top: 24px; display: flex; justify-content: center; gap: 14px;">
              <button type="button" class="btn-learn btn-learn-secondary" onclick="window.print()">
                <span>🖨️ Imprimir / Guardar en PDF</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    `;

    // Montar Motion Studio M5
    const motionMount = this.container.querySelector('#m5MotionStudio');
    if (motionMount) {
      new MotionExplainerPlayer(motionMount, 'm5');
    }
  }

  attachEvents() {
    const optBtns = this.container.querySelectorAll('.quiz-option-btn');
    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const qid = btn.dataset.qid;
        const oidx = parseInt(btn.dataset.oidx, 10);

        this.quizAnswers[qid] = oidx;

        this.container.querySelectorAll(`.quiz-option-btn[data-qid="${qid}"]`).forEach(b => {
          b.style.borderColor = 'var(--border-subtle)';
          b.style.background = 'rgba(255,255,255,0.03)';
          b.style.color = 'var(--text-secondary)';
        });

        btn.style.borderColor = 'var(--accent-green)';
        btn.style.background = 'rgba(34, 197, 94, 0.15)';
        btn.style.color = '#ffffff';
      });
    });

    const submitBtn = this.container.querySelector('#btnSubmitQuiz');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.evaluateQuiz());
    }

    const copyBtn = this.container.querySelector('#btnCopyCertCode');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('CS-2026-CHAMPION').then(() => {
          copyBtn.textContent = '¡Copiado!';
          sound.playSuccess();
          setTimeout(() => { copyBtn.textContent = 'Copiar'; }, 2000);
        });
      });
    }
  }

  evaluateQuiz() {
    const answeredCount = Object.keys(this.quizAnswers).length;
    const feedbackArea = this.container.querySelector('#quizFeedbackArea');

    if (answeredCount < 5) {
      feedbackArea.innerHTML = `
        <div style="padding: 10px 14px; background: rgba(239, 68, 68, 0.15); border: 1px solid var(--accent-red); border-radius: var(--radius-sm); color: var(--accent-red); font-size: 0.85rem;">
          Por favor responde las 5 situaciones antes de calificar la evaluación.
        </div>
      `;
      sound.playWarning();
      return;
    }

    let correctCount = 0;
    this.questions.forEach(q => {
      const selected = this.quizAnswers[q.id];
      if (selected !== undefined && q.options[selected].correct) {
        correctCount++;
      }
    });

    const pct = Math.round((correctCount / 5) * 100);

    if (pct >= 80) {
      sound.playContainmentSuccess();
      feedbackArea.innerHTML = `
        <div style="padding: 12px 16px; background: rgba(34, 197, 94, 0.15); border: 1px solid var(--accent-green); border-radius: var(--radius-sm); color: var(--accent-green); font-size: 0.85rem; font-weight: 700;">
          ✓ ¡Evaluación Aprobada con ${pct}%! Desplázate hacia abajo para ver tu Certificado Oficial y tu Folio de Verificación.
        </div>
      `;

      const certSection = this.container.querySelector('#certificateSection');
      const certScoreText = this.container.querySelector('#certScoreText');
      const certDateText = this.container.querySelector('#certDateText');

      if (certSection) {
        certSection.style.display = 'block';
        if (certScoreText) certScoreText.textContent = `${correctCount} DE 5 (${pct}%)`;
        if (certDateText) certDateText.textContent = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        certSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Auto rellenar o preparar respuesta de la Tarea 5
      const task5Input = document.querySelector('#thmInput_task5_q1');
      if (task5Input && !task5Input.value) {
        task5Input.value = 'CS-2026-CHAMPION';
      }
    } else {
      sound.playWarning();
      feedbackArea.innerHTML = `
        <div style="padding: 12px 16px; background: rgba(239, 68, 68, 0.15); border: 1px solid var(--accent-red); border-radius: var(--radius-sm); color: var(--accent-red); font-size: 0.85rem;">
          Obtuviste ${correctCount} de 5 (${pct}%). Se requiere un mínimo del 80% para certificar tu perfil. Revisa tus respuestas e inténtalo nuevamente.
        </div>
      `;
    }
  }
}
