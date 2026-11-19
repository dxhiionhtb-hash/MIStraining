/**
 * GESTOR DE ESTADO REACTIVO - TRYHACKME ROOM & CORPORATE AWARENESS (2026)
 * Controla el progreso de tareas, preguntas interactivas, máquina virtual, puntos e insignias
 */

export function normalizeText(str) {
  if (!str) return '';
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

export function checkAnswerMatch(userInput, acceptedList) {
  if (!userInput || !acceptedList || !acceptedList.length) return false;
  const normalizedUser = normalizeText(userInput);
  if (!normalizedUser) return false;

  return acceptedList.some(item => {
    const normalizedItem = normalizeText(item);
    return normalizedUser === normalizedItem || 
           normalizedUser.includes(normalizedItem) || 
           normalizedItem.includes(normalizedUser);
  });
}

class TrainingStateManager {
  constructor() {
    this.initialState = {
      userName: 'Colaborador Corporativo',
      awarenessPoints: 120,
      streak: 3,
      audioEnabled: true,
      activeMachine: {
        name: 'nodo-defensa-humana',
        ip: '10.10.42.15',
        status: 'online', // 'online' | 'stopped'
        expiresSeconds: 7120 // ~1h 58m
      },
      openTasks: {
        task1: true,
        task2: false,
        task3: false,
        task4: false,
        task5: false
      },
      tasks: {
        task1: {
          id: 'task1',
          code: 'm1',
          num: 1,
          title: 'Phishing & Manipulación Social',
          completed: false,
          badgeKey: 'phishing_hunter',
          questions: {
            q1: {
              id: 'q1',
              text: '¿Cuál es el indicio de engaño (Typosquatting) en el remitente del primer correo sospechoso?',
              placeholder: 'Ej: nombre del dominio alterado...',
              accepted: ['proveedor-facc-turacion.com', 'facc-turacion', 'facc', 'typosquatting', 'dominio alterado', 'dominio falso', 'doble c'],
              hint: 'Observa con atención la ortografía del dominio después del símbolo @: incluye una letra adicional disimulada (facc-turacion).',
              solved: false,
              userAnswer: ''
            },
            q2: {
              id: 'q2',
              text: '¿Qué doble extensión oculta el archivo ejecutable adjunto que simula ser un estado de cuenta en PDF?',
              placeholder: 'Ej: .pdf.xxx...',
              accepted: ['.pdf.exe', 'pdf.exe', '.exe', 'exe', 'ejecutable'],
              hint: 'El archivo parece un documento PDF común, pero al final termina en .exe (Factura_Fiscal_Retenida.pdf.exe).',
              solved: false,
              userAnswer: ''
            }
          }
        },
        task2: {
          id: 'task2',
          code: 'm2',
          num: 2,
          title: 'Seguridad en IA & Protección de Datos',
          completed: false,
          badgeKey: 'ai_guardian',
          questions: {
            q1: {
              id: 'q1',
              text: '¿Qué tipo de información corporativa privada jamás debe pegarse en herramientas de IA pública abierta?',
              placeholder: 'Ej: contraseñas, datos...',
              accepted: ['datos confidenciales', 'informacion confidencial', 'claves de acceso', 'credenciales', 'datos personales', 'contraseñas', 'pii'],
              hint: 'Cualquier clave de acceso, contraseña interna, dato de cliente o información confidencial de la organización.',
              solved: false,
              userAnswer: ''
            },
            q2: {
              id: 'q2',
              text: '¿Cómo se denomina la técnica en la que un texto engañoso anula las normas de seguridad del asistente inteligente?',
              placeholder: 'Ej: inyección de...',
              accepted: ['inyeccion de instrucciones', 'prompt injection', 'inyeccion de prompts', 'inyeccion', 'prompt-injection'],
              hint: 'En ciberseguridad se conoce en inglés como Prompt Injection (inyección de instrucciones en español).',
              solved: false,
              userAnswer: ''
            }
          }
        },
        task3: {
          id: 'task3',
          code: 'm3',
          num: 3,
          title: 'Medios Extraíbles (USB) & Amenazas Físicas',
          completed: false,
          badgeKey: 'usb_defender',
          questions: {
            q1: {
              id: 'q1',
              text: 'Si encuentras una memoria USB abandonada en el estacionamiento o recepción de la empresa, ¿cuál es la acción correcta?',
              placeholder: 'Ej: entregar a...',
              accepted: ['entregar a seguridad', 'reportar a seguridad', 'no conectar', 'entregar a ti', 'seguridad', 'reportar a ti', 'entregar a sistemas'],
              hint: 'Bajo ninguna circunstancia debes conectarla a ningún equipo corporativo; entrégala de inmediato al equipo de Seguridad de TI.',
              solved: false,
              userAnswer: ''
            },
            q2: {
              id: 'q2',
              text: '¿Qué tipo de periférico emula un dispositivo malicioso tipo BadUSB al ser enchufado para inyectar comandos?',
              placeholder: 'Ej: teclado...',
              accepted: ['teclado', 'dispositivo hid', 'hid', 'keyboard'],
              hint: 'Emula un periférico de escritura rápida por hardware: un teclado (dispositivo HID).',
              solved: false,
              userAnswer: ''
            }
          }
        },
        task4: {
          id: 'task4',
          code: 'm4',
          num: 4,
          title: 'Ransomware & Protocolo de Contención',
          completed: false,
          badgeKey: 'ransomware_responder',
          questions: {
            q1: {
              id: 'q1',
              text: '¿Cuál es el primer paso físico e inmediato que debes ejecutar en los primeros 60 segundos si sospechas de un ransomware?',
              placeholder: 'Ej: desconectar el...',
              accepted: ['desconectar el cable de red', 'desconectar red', 'desconectar cable', 'aislar el equipo', 'desconectar', 'desconectar ethernet'],
              hint: 'Desconectar de inmediato el cable Ethernet físico y apagar el Wi-Fi para cortar la propagación hacia otros servidores.',
              solved: false,
              userAnswer: ''
            },
            q2: {
              id: 'q2',
              text: '¿Por qué las políticas corporativas prohíben estrictamente pagar el rescate a los cibercriminales?',
              placeholder: 'Ej: no garantiza la...',
              accepted: ['no garantiza la recuperacion', 'financia el delito', 'no hay garantia', 'no garantiza nada', 'financia cibercriminales', 'ilegal', 'financia el crimen'],
              hint: 'Pagar no garantiza recibir la clave para descifrar los archivos y además financia operaciones ilegales.',
              solved: false,
              userAnswer: ''
            }
          }
        },
        task5: {
          id: 'task5',
          code: 'assessment',
          num: 5,
          title: 'Assess your Power & Certificación Oficial',
          completed: false,
          badgeKey: 'certified_champion',
          questions: {
            q1: {
              id: 'q1',
              text: 'Introduce el código de verificación oficial emitido al aprobar con éxito la evaluación final de la sala:',
              placeholder: 'Ej: CS-2026-CHAMPION...',
              accepted: ['cs-2026-champion', 'cs-champion', 'champion'],
              hint: 'Completa los 5 escenarios en el cuestionario interactivo de la lección con un puntaje mínimo del 80% para desbloquear el diploma y copiar tu folio oficial.',
              solved: false,
              userAnswer: ''
            }
          }
        }
      },
      badgesEarned: {
        phishing_hunter: false,
        ai_guardian: false,
        usb_defender: false,
        ransomware_responder: false,
        certified_champion: false
      }
    };

    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.state);
  }

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }

  toggleTask(taskId) {
    if (this.state.openTasks[taskId] !== undefined) {
      this.state.openTasks[taskId] = !this.state.openTasks[taskId];
      this.notify();
    }
  }

  setTaskOpen(taskId, isOpen = true) {
    if (this.state.openTasks[taskId] !== undefined) {
      this.state.openTasks[taskId] = isOpen;
      this.notify();
    }
  }

  submitQuestion(taskId, questionId, userAnswer) {
    const task = this.state.tasks[taskId];
    if (!task) return { success: false, reason: 'Tarea no encontrada' };

    const q = task.questions[questionId];
    if (!q) return { success: false, reason: 'Pregunta no encontrada' };

    if (q.solved) return { success: true, alreadySolved: true };

    const isCorrect = checkAnswerMatch(userAnswer, q.accepted);
    if (isCorrect) {
      q.solved = true;
      q.userAnswer = userAnswer;
      this.state.awarenessPoints += 50;

      // Verificar si la tarea completó todas sus preguntas
      const allQuestionsSolved = Object.values(task.questions).every(ques => ques.solved);
      if (allQuestionsSolved) {
        this.completeTask(taskId);
      } else {
        this.notify();
      }

      return { success: true, pointsAwarded: 50 };
    } else {
      return { success: false, reason: 'Respuesta incorrecta. Revisa el contenido de la lección o consulta la pista.' };
    }
  }

  completeTask(taskId) {
    const task = this.state.tasks[taskId];
    if (!task) return;

    if (!task.completed) {
      task.completed = true;
      if (task.badgeKey && this.state.badgesEarned[task.badgeKey] !== undefined) {
        this.state.badgesEarned[task.badgeKey] = true;
      }
      this.state.awarenessPoints += 50; // Bonus por completar la tarea entera

      // Auto-expandir la siguiente tarea si está cerrada
      const taskKeys = Object.keys(this.state.tasks);
      const currentIndex = taskKeys.indexOf(taskId);
      if (currentIndex >= 0 && currentIndex < taskKeys.length - 1) {
        const nextTaskId = taskKeys[currentIndex + 1];
        this.state.openTasks[nextTaskId] = true;
      }
    }

    this.notify();
  }

  getCompletedTasksCount() {
    return Object.values(this.state.tasks).filter(t => t.completed).length;
  }

  getTotalTasksCount() {
    return Object.keys(this.state.tasks).length;
  }

  getProgressPercentage() {
    const total = this.getTotalTasksCount();
    if (total === 0) return 0;
    return Math.round((this.getCompletedTasksCount() / total) * 100);
  }

  addPoints(points) {
    this.state.awarenessPoints += points;
    this.notify();
  }

  toggleAudio() {
    this.state.audioEnabled = !this.state.audioEnabled;
    this.notify();
    return this.state.audioEnabled;
  }

  setModule(moduleId) {
    this.state.activeModule = moduleId;
    if (moduleId === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const taskMap = { m1: 'task1', m2: 'task2', m3: 'task3', m4: 'task4', assessment: 'task5' };
      const taskId = taskMap[moduleId] || moduleId;
      this.setTaskOpen(taskId, true);
      const el = document.getElementById(`thmTaskCard_${taskId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.notify();
  }

  completeModule(moduleId, badgeKey = null) {
    const taskMap = { m1: 'task1', m2: 'task2', m3: 'task3', m4: 'task4', assessment: 'task5' };
    const taskId = taskMap[moduleId] || moduleId;
    this.completeTask(taskId);
  }

  resetCourse() {
    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.notify();
  }
}

export const trainingState = new TrainingStateManager();
