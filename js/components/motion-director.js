/**
 * MOTION GRAPHICS EXPLAINER STUDIO - DIRECTOR DE ANIMACIÓN TÁCTICO & FÍSICO
 * Reglas de Dirección de Animación:
 * 1. Acción visual física en cada bloque.
 * 2. Máximo 4 palabras por título de escena.
 * 3. Analogías físicas para ideas abstractas.
 * 4. Continuidad y magnitudes reales entre escenas.
 * 5. Sincronización con voz, subtítulos y estado final nítido.
 */

import { sound } from '../audio.js';

export const MotionStories = {
  m1: {
    moduleCode: 'M1 // PHISHING',
    scenes: [
      {
        id: 0,
        title: 'EL ANZUELO METÁLICO',
        subtitle: 'Un sobre idéntico al de tu proveedor aterriza en tu bandeja; oculta un gancho de acero hacia tus claves.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Aura de Fondo -->
            <circle cx="0" cy="0" r="95" fill="radial-gradient(circle, rgba(239, 68, 68, 0.12) 0%, transparent 70%)"/>

            <!-- Sobre Institucional con Fisura de Brecha -->
            <g class="anim-float">
              <rect x="-95" y="-55" width="190" height="110" rx="4" fill="#151e2e" stroke="#2a3b50" stroke-width="1.5"/>
              <path d="M -95 -55 L 0 8 L 95 -55" stroke="#2a3b50" stroke-width="1.5" fill="none"/>
              <!-- Línea de fractura roja luminosa -->
              <path d="M -20 -15 L 5 12 L -8 32 L 18 48" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.85"/>
              <circle cx="0" cy="8" r="14" fill="#ef4444" opacity="0.2"/>
            </g>

            <!-- Anzuelo Metálico en Caída y Balanceo Pendular Físico -->
            <g class="anim-hook-swing" transform="translate(0, 10)">
              <g class="anim-hook-drop">
                <line x1="0" y1="-45" x2="0" y2="25" stroke="#ef4444" stroke-width="2" stroke-dasharray="3 3"/>
                <path d="M 0 25 Q 0 65 30 65 Q 52 65 52 42 Q 52 24 34 24" stroke="#ef4444" stroke-width="3.5" fill="none" stroke-linecap="round"/>
                <polygon points="36,20 30,28 38,26" fill="#ef4444"/>
                <circle cx="34" cy="24" r="3" fill="#ffffff"/>
              </g>
            </g>

            <!-- Llavero de Credenciales Atraído por Magnetismo -->
            <g class="anim-jitter" transform="translate(135, 30)">
              <circle cx="0" cy="0" r="18" fill="#121620" stroke="#38bdf8" stroke-width="2"/>
              <rect x="-7" y="-3" width="14" height="12" rx="2" fill="#38bdf8"/>
              <circle cx="0" cy="3" r="2.5" fill="#121620"/>
              <text x="0" y="30" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="#94a3b8" text-anchor="middle">CREDENCIALES</text>
            </g>
            <!-- Líneas de Tensión Magnética -->
            <path d="M 52 52 Q 95 40 118 32" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.7"/>
          </g>
        `
      },
      {
        id: 1,
        title: 'EL PRISMA REVELADOR',
        subtitle: 'Al interponer la inspección de cabecera, el prisma de cuarzo refracta y descompone el dominio falso.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Haz Incidente del Correo -->
            <line x1="-190" y1="0" x2="-35" y2="0" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="5 3"/>
            <text x="-115" y="-12" font-family="'JetBrains Mono', monospace" font-size="9" fill="#94a3b8" text-anchor="middle">Flujo de Correo</text>

            <!-- Prisma Triangular 3D Giratorio -->
            <g class="anim-crystal">
              <polygon points="0,-65 60,40 -60,40" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" stroke-width="2"/>
              <line x1="0" y1="-65" x2="0" y2="40" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
            </g>

            <!-- Haz Rojo Malicioso Desviado y Cortado con Chispas -->
            <path class="anim-laser-deceit" d="M 25 -10 L 160 -45" stroke="#ef4444" stroke-width="3" fill="none"/>
            <text x="170" y="-42" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="800" fill="#ef4444">@proveedor-facc.com (FALSO)</text>

            <!-- Chispas del Corte -->
            <g transform="translate(130, -38)">
              <circle cx="0" cy="0" r="3" fill="#ef4444" class="anim-shockwave"/>
              <line x1="-8" y1="-8" x2="8" y2="8" stroke="#ef4444" stroke-width="1.5"/>
              <line x1="-8" y1="8" x2="8" y2="-8" stroke="#ef4444" stroke-width="1.5"/>
            </g>

            <!-- Haz Verde Esmeralda Verificado -->
            <path d="M 25 10 L 160 38" stroke="#22c55e" stroke-width="2.5" fill="none"/>
            <text x="170" y="42" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#22c55e">✓ INSPECCIÓN VALIDADA</text>
          </g>
        `
      },
      {
        id: 2,
        title: 'PUERTA BLINDADA CERRADA',
        subtitle: 'Un solo reporte activa los pistones hidráulicos; el ataque se pulveriza contra la compuerta perimetral.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Bóveda Perimetral Central -->
            <rect x="-115" y="-60" width="230" height="120" rx="4" fill="#151e2e" stroke="#22c55e" stroke-width="2"/>

            <!-- Pistón Hidráulico Izquierdo con Recoil -->
            <g class="anim-piston-left">
              <rect x="-140" y="-35" width="25" height="20" fill="#22c55e" rx="2"/>
              <rect x="-140" y="15" width="25" height="20" fill="#22c55e" rx="2"/>
              <line x1="-140" y1="-25" x2="-115" y2="-25" stroke="#ffffff" stroke-width="4"/>
            </g>

            <!-- Pistón Hidráulico Derecho con Recoil -->
            <g class="anim-piston-right">
              <rect x="115" y="-35" width="25" height="20" fill="#22c55e" rx="2"/>
              <rect x="115" y="15" width="25" height="20" fill="#22c55e" rx="2"/>
              <line x1="115" y1="-25" x2="140" y2="-25" stroke="#ffffff" stroke-width="4"/>
            </g>

            <!-- Chorros de Vapor a Presión -->
            <g transform="translate(-115, -45)" class="anim-steam">
              <circle cx="-6" cy="-4" r="5" fill="rgba(255,255,255,0.4)"/>
              <circle cx="-12" cy="-12" r="7" fill="rgba(255,255,255,0.2)"/>
            </g>
            <g transform="translate(115, -45)" class="anim-steam">
              <circle cx="6" cy="-4" r="5" fill="rgba(255,255,255,0.4)"/>
              <circle cx="12" cy="-12" r="7" fill="rgba(255,255,255,0.2)"/>
            </g>

            <!-- Escudo Verde Esmeralda Central y Onda de Impacto -->
            <circle cx="0" cy="0" r="32" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" stroke-width="2"/>
            <circle cx="0" cy="0" r="42" fill="none" stroke="#22c55e" class="anim-shockwave"/>
            <path d="M -12 0 L -2 10 L 14 -8" stroke="#22c55e" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <text x="0" y="50" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" fill="#22c55e" text-anchor="middle">DEFENSA PERIMETRAL SELLADA</text>
          </g>
        `
      }
    ]
  },

  m2: {
    moduleCode: 'M2 // IA & DATOS',
    scenes: [
      {
        id: 0,
        title: 'PALABRAS QUE ESCAPAN',
        subtitle: 'Al pegar secretos en un modelo abierto, los datos vibran y se desprenden hacia la red pública.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Documento Confidencial -->
            <rect x="-145" y="-55" width="105" height="110" rx="3" fill="#151e2e" stroke="#2a3b50" stroke-width="1.5"/>
            <line x1="-125" y1="-30" x2="-60" y2="-30" stroke="#ef4444" stroke-width="2"/>
            <line x1="-125" y1="-15" x2="-80" y2="-15" stroke="#94a3b8" stroke-width="2"/>
            <line x1="-125" y1="0" x2="-65" y2="0" stroke="#94a3b8" stroke-width="2"/>
            <text x="-95" y="35" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#ef4444" text-anchor="middle">PII / CLAVES</text>

            <!-- Partículas de Fuga en Cascada Vibratoria -->
            <circle class="anim-float" cx="-25" cy="-20" r="5" fill="#ef4444"/>
            <circle class="anim-float" cx="10" cy="-5" r="4" fill="#ef4444" style="animation-delay: 0.3s;"/>
            <circle class="anim-float" cx="45" cy="-25" r="5" fill="#ef4444" style="animation-delay: 0.6s;"/>

            <!-- Núcleo de IA Público que Respira y Absorbe Datos -->
            <g transform="translate(110, 0)" class="anim-neural-pulse">
              <circle cx="20" cy="0" r="40" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" stroke-width="2"/>
              <circle cx="20" cy="0" r="26" fill="#151e2e" stroke="#ef4444" stroke-width="1.5"/>
              <text x="20" y="-3" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="800" fill="#ef4444" text-anchor="middle">MODELO</text>
              <text x="20" y="9" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="800" fill="#ef4444" text-anchor="middle">PÚBLICO</text>
              <text x="20" y="55" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#94a3b8" text-anchor="middle">Reentrenamiento Abierto</text>
            </g>
          </g>
        `
      },
      {
        id: 1,
        title: 'EL DESVÍO DE INSTRUCCIONES',
        subtitle: 'Una inyección espiral intenta perforar las normas del modelo; la barrera de seguridad la intercepta.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Broca Espiral 3D de Inyección Maliciosa (Prompt Injection) -->
            <g transform="translate(-100, 0)" class="anim-drill">
              <polygon points="-40,-15 15,0 -40,15 -25,0" fill="#f59e0b" stroke="#ef4444" stroke-width="1.5"/>
              <circle cx="-12" cy="0" r="14" fill="none" stroke="#f59e0b" stroke-dasharray="4 2"/>
            </g>
            <text x="-100" y="38" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="800" fill="#f59e0b" text-anchor="middle">PROMPT INJECTION</text>

            <!-- Tamiz de Seguridad Cuántico Interceptando -->
            <line x1="0" y1="-65" x2="0" y2="65" stroke="#38bdf8" stroke-width="4"/>
            <line x1="0" y1="-65" x2="0" y2="65" stroke="#38bdf8" stroke-width="12" opacity="0.15"/>
            <circle cx="0" cy="0" r="18" fill="none" stroke="#38bdf8" class="anim-shockwave"/>

            <!-- Datos Anonimizados Emergiendo Seguros -->
            <g transform="translate(95, 0)">
              <rect x="-55" y="-25" width="110" height="22" rx="3" fill="#151e2e" stroke="#22c55e" stroke-width="1.5"/>
              <text x="0" y="-10" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" fill="#22c55e" text-anchor="middle">[TOKEN_RESERVADO]</text>
              <rect x="-55" y="8" width="110" height="22" rx="3" fill="#151e2e" stroke="#22c55e" stroke-width="1.5"/>
              <text x="0" y="23" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" fill="#22c55e" text-anchor="middle">[DATO_ANONIMIZADO]</text>
            </g>
          </g>
        `
      },
      {
        id: 2,
        title: 'LA BÓVEDA SANITIZADA',
        subtitle: 'El escudo hexagonal de panal aísla la consulta y destruye todo registro temporal al terminar.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Bóveda Hexagonal en Panal de Abejas -->
            <g class="anim-hex-shield">
              <polygon points="0,-65 60,-30 60,35 0,70 -60,35 -60,-30" fill="rgba(34, 197, 94, 0.08)" stroke="#22c55e" stroke-width="2"/>
              <polygon points="0,-48 42,-22 42,26 0,52 -42,26 -42,-22" fill="none" stroke="#22c55e" stroke-width="1" stroke-dasharray="4 4"/>
            </g>

            <!-- Sello Central de Cero Retención -->
            <circle cx="0" cy="0" r="22" fill="#151e2e" stroke="#22c55e" stroke-width="2"/>
            <path d="M -7 -7 L 7 7 M 7 -7 L -7 7" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
            <text x="0" y="32" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="800" fill="#22c55e" text-anchor="middle">CERO RETENCIÓN</text>
            <text x="0" y="-30" font-family="'JetBrains Mono', monospace" font-size="8" fill="#94a3b8" text-anchor="middle">BÓVEDA CORPORATIVA</text>
          </g>
        `
      }
    ]
  },

  m3: {
    moduleCode: 'M3 // MEDIOS USB',
    scenes: [
      {
        id: 0,
        title: 'EL CEBO ABANDONADO',
        subtitle: 'Una memoria con acabado metálico descansa en el suelo; su apariencia inofensiva oculta un detonador.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Sombra y Halo de Curiosidad en el Suelo -->
            <ellipse cx="0" cy="35" rx="80" ry="14" fill="rgba(0,0,0,0.6)"/>
            <circle cx="0" cy="0" r="60" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4 4" class="anim-shockwave"/>

            <!-- Cuerpo de la Memoria USB con Pines Dorados -->
            <g class="anim-float">
              <!-- Conector Metálico -->
              <rect x="-60" y="-14" width="30" height="28" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5" rx="2"/>
              <rect x="-52" y="-7" width="10" height="6" fill="#f59e0b"/>
              <rect x="-52" y="3" width="10" height="6" fill="#f59e0b"/>
              <!-- Carcasa Principal -->
              <rect x="-30" y="-20" width="85" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
              <line x1="-20" y1="0" x2="35" y2="0" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
              <!-- LED Intermitente de Actividad Oculta -->
              <circle cx="42" cy="0" r="3.5" fill="#ef4444" class="anim-laser-deceit"/>
            </g>
            <text x="12" y="48" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="700" fill="#f59e0b" text-anchor="middle">CEBO DESCONOCIDO</text>
          </g>
        `
      },
      {
        id: 1,
        title: 'EL CABALLO OCULTO',
        subtitle: 'Al enchufarlo, el microcontrolador emula un teclado y dispara comandos destructivos a 1000 WPM.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- USB Conectado Inyectando Pulsaciones -->
            <g transform="translate(-110, 0)">
              <rect x="-35" y="-18" width="70" height="36" rx="3" fill="#151e2e" stroke="#ef4444" stroke-width="2"/>
              <text x="0" y="4" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="800" fill="#ef4444" text-anchor="middle">BadUSB</text>
            </g>

            <!-- Arcos Eléctricos Tesla y Ráfaga de Pulsaciones a Gran Velocidad -->
            <g class="anim-tesla-arc">
              <path d="M -70 -8 L -20 -18 L 30 5 L 80 -12" stroke="#38bdf8" stroke-width="2" fill="none"/>
              <path d="M -70 8 L -15 15 L 25 -5 L 80 10" stroke="#ef4444" stroke-width="2" fill="none"/>
            </g>

            <!-- Ráfaga de Pulsaciones de Teclado (HID Keystrokes) -->
            <line x1="-65" y1="0" x2="75" y2="0" stroke="#ef4444" stroke-width="3" class="anim-matrix-keys"/>
            <text x="5" y="-26" font-family="'JetBrains Mono', monospace" font-size="8" fill="#ef4444">1000 WPM TECLADO FALSO</text>

            <!-- Laptop Objetivo en Riesgo -->
            <g transform="translate(115, 0)">
              <rect x="-35" y="-25" width="70" height="42" rx="3" fill="#0f172a" stroke="#ef4444" stroke-width="2"/>
              <rect x="-42" y="17" width="84" height="6" rx="2" fill="#334155"/>
              <circle cx="0" cy="-4" r="10" fill="none" stroke="#ef4444" class="anim-shockwave"/>
            </g>
          </g>
        `
      },
      {
        id: 2,
        title: 'EL CONTENEDOR HERMÉTICO',
        subtitle: 'Una cápsula de aislamiento desciende con estruendo, sellando el dispositivo en cuarentena sin tocar la red.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Base de Cuarentena Blindada -->
            <rect x="-80" y="32" width="160" height="14" rx="3" fill="#1e293b" stroke="#22c55e" stroke-width="1.5"/>

            <!-- Cúpula Criogénica que Cae con Peso Físico -->
            <g class="anim-cryo-drop">
              <path d="M -60 32 L -60 -25 A 60 60 0 0 1 60 -25 L 60 32 Z" fill="rgba(34, 197, 94, 0.12)" stroke="#22c55e" stroke-width="2.5"/>
              <line x1="-60" y1="8" x2="60" y2="8" stroke="#22c55e" stroke-width="1" stroke-dasharray="4 2"/>
            </g>

            <!-- USB Sellado en el Centro -->
            <rect x="-25" y="0" width="50" height="24" rx="2" fill="#0f172a" stroke="#22c55e" stroke-width="1.5"/>
            <text x="0" y="15" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="700" fill="#22c55e" text-anchor="middle">AISLADO</text>

            <text x="0" y="-42" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" fill="#22c55e" text-anchor="middle">CUARENTENA SEGURIDAD TI</text>
          </g>
        `
      }
    ]
  },

  m4: {
    moduleCode: 'M4 // RANSOMWARE',
    scenes: [
      {
        id: 0,
        title: 'EL CERROJO EN CADENA',
        subtitle: 'Zarcillos de corrupción roja trepan de servidor en servidor; el tiempo corre hacia el bloqueo total.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Servidor Central Infectado -->
            <g transform="translate(-110, 0)">
              <rect x="-35" y="-30" width="70" height="60" rx="3" fill="#151e2e" stroke="#ef4444" stroke-width="2"/>
              <line x1="-25" y1="-10" x2="25" y2="-10" stroke="#ef4444" stroke-width="2"/>
              <circle cx="-15" cy="10" r="3" fill="#ef4444" class="anim-laser-deceit"/>
              <text x="0" y="-38" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="#ef4444" text-anchor="middle">EQUIPO INFECTADO</text>
            </g>

            <!-- Zarcillos de Infección Trepando por los Cables -->
            <path class="anim-root-infection" d="M -75 0 C -30 -35 20 -35 65 0" stroke="#ef4444" stroke-width="3.5" fill="none"/>
            <path class="anim-root-infection" d="M -75 0 C -30 35 20 35 65 0" stroke="#ef4444" stroke-width="2" fill="none"/>

            <!-- Servidor Corporativo Amenazado -->
            <g transform="translate(110, 0)">
              <rect x="-35" y="-30" width="70" height="60" rx="3" fill="#151e2e" stroke="#2a3b50" stroke-width="2"/>
              <circle cx="0" cy="0" r="14" fill="none" stroke="#f59e0b" class="anim-shockwave"/>
              <text x="0" y="-38" font-family="'JetBrains Mono', monospace" font-size="8" fill="#94a3b8" text-anchor="middle">SERVIDOR CENTRAL</text>
            </g>
          </g>
        `
      },
      {
        id: 1,
        title: 'CORTE FÍSICO INMEDIATO',
        subtitle: 'La regla de oro de los 60 segundos: una cuchilla de desconexión física corta el cable y frena el contagio.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Cable de Red Ethernet Cortado -->
            <line x1="-150" y1="0" x2="-15" y2="0" stroke="#ef4444" stroke-width="4"/>
            <line x1="15" y1="0" x2="150" y2="0" stroke="#22c55e" stroke-width="4"/>

            <!-- Cuchilla Guillotina de Desconexión Rápida -->
            <g class="anim-blade-chop">
              <polygon points="-12,-60 12,-60 0,15" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5"/>
              <circle cx="0" cy="15" r="8" fill="#ef4444" class="anim-shockwave"/>
            </g>

            <!-- Chispas del Corte Inmediato -->
            <g transform="translate(0, 12)">
              <line x1="-10" y1="-10" x2="10" y2="10" stroke="#38bdf8" stroke-width="2"/>
              <line x1="10" y1="-10" x2="-10" y2="10" stroke="#38bdf8" stroke-width="2"/>
            </g>

            <text x="0" y="44" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" fill="#38bdf8" text-anchor="middle">DESCONEXIÓN EN 60 SEGUNDOS</text>
          </g>
        `
      },
      {
        id: 2,
        title: 'LA RESTAURACIÓN LIMPIA',
        subtitle: 'Una onda esmeralda barre la red en 360 grados; los respaldos aislados restauran la normalidad.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Onda de Choque Purificadora 360 Grados -->
            <circle cx="0" cy="0" r="30" fill="none" stroke="#22c55e" stroke-width="3" class="anim-cleansing-wave"/>
            <circle cx="0" cy="0" r="60" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4 4" class="anim-cleansing-wave" style="animation-delay: 0.6s;"/>

            <!-- Bóveda de Respaldo Desconectado Restaurando -->
            <g transform="translate(0, 0)">
              <rect x="-45" y="-40" width="90" height="80" rx="4" fill="#151e2e" stroke="#22c55e" stroke-width="2"/>
              <path d="M -14 -4 L -2 8 L 18 -10" stroke="#22c55e" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <text x="0" y="55" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" fill="#22c55e" text-anchor="middle">RESPALDO RESTAURADO</text>
            </g>
          </g>
        `
      }
    ]
  },

  m5: {
    moduleCode: 'M5 // CERTIFICACIÓN',
    scenes: [
      {
        id: 0,
        title: 'EVALUAR TUS DEFENSAS',
        subtitle: 'Cinco pruebas operativas miden tu reflejo ante trampas de ingeniería social y malware.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Radar Perimetral con 4 Cuadrantes -->
            <circle cx="0" cy="0" r="85" fill="none" stroke="#2a3b50" stroke-width="1.5" stroke-dasharray="4 4"/>
            <circle cx="0" cy="0" r="55" fill="none" stroke="#2a3b50" stroke-width="1"/>
            <circle cx="0" cy="0" r="25" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" stroke-width="2"/>
            <line x1="-90" y1="0" x2="90" y2="0" stroke="#2a3b50" stroke-width="1"/>
            <line x1="0" y1="-90" x2="0" y2="90" stroke="#2a3b50" stroke-width="1"/>
            <!-- Marcadores de los Vectores Superados -->
            <circle cx="-40" cy="-40" r="8" fill="#22c55e" class="anim-shockwave"/>
            <circle cx="40" cy="-40" r="8" fill="#22c55e"/>
            <circle cx="-40" cy="40" r="8" fill="#22c55e"/>
            <circle cx="40" cy="40" r="8" fill="#22c55e"/>
            <text x="0" y="4" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#22c55e" text-anchor="middle">TEST</text>
            <text x="0" y="75" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#94a3b8" text-anchor="middle">5 ESCENARIOS TÁCTICOS</text>
          </g>
        `
      },
      {
        id: 1,
        title: 'EL UMBRAL CRÍTICO',
        subtitle: 'Superar el 80% calibra tu blindaje corporativo y sella tu perfil contra brechas.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Arco Medidor de Calibración -->
            <path d="M -80 40 A 90 90 0 1 1 80 40" fill="none" stroke="#2a3b50" stroke-width="14" stroke-linecap="round"/>
            <path d="M -80 40 A 90 90 0 0 1 55 -55" fill="none" stroke="#22c55e" stroke-width="14" stroke-linecap="round"/>
            
            <!-- Aguja con Inercia Física Acelerando -->
            <g class="anim-needle-rev">
              <circle cx="0" cy="15" r="12" fill="#121620" stroke="#22c55e" stroke-width="2"/>
              <line x1="0" y1="15" x2="48" y2="-45" stroke="#22c55e" stroke-width="3.5" stroke-linecap="round"/>
            </g>

            <text x="0" y="-12" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="800" fill="#22c55e" text-anchor="middle">80%+</text>
            <text x="0" y="55" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="800" fill="#f8fafc" text-anchor="middle">UMBRAL ACREDITADO</text>
          </g>
        `
      },
      {
        id: 2,
        title: 'CREDENCIAL OFICIAL DESBLOQUEADA',
        subtitle: 'Tu certificado de concientización corporativa queda validado con folio institucional único.',
        svgContent: `
          <g transform="translate(360, 110)">
            <!-- Diploma Acreditado con Marco Holográfico -->
            <rect x="-110" y="-60" width="220" height="120" rx="6" fill="#151e2e" stroke="#22c55e" stroke-width="2"/>
            <rect x="-100" y="-50" width="200" height="100" rx="3" fill="none" stroke="#2a3b50" stroke-width="1" stroke-dasharray="3 3"/>
            <!-- Sello con Cinta Dorada/Verde -->
            <circle cx="70" cy="20" r="18" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" stroke-width="2"/>
            <polygon points="70,10 73,17 80,17 75,22 77,29 70,25 63,29 65,22 60,17 67,17" fill="#22c55e"/>
            <!-- Título del Certificado -->
            <text x="-85" y="-22" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#f8fafc">CYBERSHIELD CHAMPION</text>
            <text x="-85" y="-5" font-family="'JetBrains Mono', monospace" font-size="8" fill="#94a3b8">FOLIO: CS-2026-CHAMPION</text>
            <line x1="-85" y1="10" x2="35" y2="10" stroke="#22c55e" stroke-width="1.5"/>
            <text x="-85" y="32" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="700" fill="#22c55e">✓ VERIFICADO Y SELLADO</text>
          </g>
        `
      }
    ]
  }
};

export class MotionExplainerPlayer {
  constructor(containerEl, moduleKey) {
    this.container = containerEl;
    this.story = MotionStories[moduleKey];
    this.currentSceneIdx = 0;
    this.isPlaying = true;
    this.timer = null;

    this.render();
    this.attachEvents();
    this.startAutoPlay();
  }

  render() {
    const scene = this.story.scenes[this.currentSceneIdx];

    this.container.innerHTML = `
      <div class="motion-player-card">
        <div class="tactical-scan-overlay"></div>

        <!-- Barra Superior de Escena -->
        <div class="motion-player-topbar">
          <div class="motion-scene-title">
            <span class="scene-badge">ESCENA 0${scene.id + 1}</span>
            <span id="motionSceneTitle">${scene.title}</span>
          </div>
          <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-green); font-weight: 700;">${this.story.moduleCode}</span>
        </div>

        <!-- Escenario Visual Vectorial Procedimental -->
        <div class="motion-stage-canvas" id="motionStageCanvas">
          <svg viewBox="0 0 720 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            ${scene.svgContent}
          </svg>
        </div>

        <!-- Barra de Voz / Subtítulos Sincronizados -->
        <div class="motion-subtitle-bar">
          <div class="motion-voice-wave" aria-hidden="true">
            <span></span><span></span><span></span><span></span>
          </div>
          <div class="motion-subtitle-text" id="motionSubtitle">
            "${scene.subtitle}"
          </div>
        </div>

        <!-- Controles de la Línea de Tiempo -->
        <div class="motion-controls-row">
          <div class="motion-stepper-dots">
            ${this.story.scenes.map((s, idx) => `
              <button type="button" class="motion-step-dot ${idx === this.currentSceneIdx ? 'active' : ''}" data-idx="${idx}">
                <span>0${idx + 1}</span>
                <span>${s.title}</span>
              </button>
            `).join('')}
          </div>

          <div class="motion-player-actions">
            <button type="button" class="btn-motion-ctrl" id="btnPrevScene">◀ Anterior</button>
            <button type="button" class="btn-motion-ctrl" id="btnPlayPause">${this.isPlaying ? '⏸ Pausa' : '▶ Play'}</button>
            <button type="button" class="btn-motion-ctrl" id="btnNextScene">Siguiente ▶</button>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    this.container.querySelectorAll('.motion-step-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const idx = parseInt(btn.dataset.idx, 10);
        this.goToScene(idx);
      });
    });

    const btnPlayPause = this.container.querySelector('#btnPlayPause');
    if (btnPlayPause) {
      btnPlayPause.addEventListener('click', () => {
        sound.playClick();
        this.isPlaying = !this.isPlaying;
        btnPlayPause.textContent = this.isPlaying ? '⏸ Pausa' : '▶ Play';
        if (this.isPlaying) this.startAutoPlay();
        else clearInterval(this.timer);
      });
    }

    const btnPrev = this.container.querySelector('#btnPrevScene');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        sound.playClick();
        const prev = (this.currentSceneIdx - 1 + this.story.scenes.length) % this.story.scenes.length;
        this.goToScene(prev);
      });
    }

    const btnNext = this.container.querySelector('#btnNextScene');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        sound.playClick();
        const next = (this.currentSceneIdx + 1) % this.story.scenes.length;
        this.goToScene(next);
      });
    }
  }

  goToScene(idx) {
    this.currentSceneIdx = idx;
    const scene = this.story.scenes[idx];

    const titleEl = this.container.querySelector('#motionSceneTitle');
    const badgeEl = this.container.querySelector('.scene-badge');
    const canvasEl = this.container.querySelector('#motionStageCanvas');
    const subEl = this.container.querySelector('#motionSubtitle');

    if (titleEl) titleEl.textContent = scene.title;
    if (badgeEl) badgeEl.textContent = `ESCENA 0${scene.id + 1}`;
    if (subEl) subEl.textContent = `"${scene.subtitle}"`;
    if (canvasEl) {
      canvasEl.innerHTML = `
        <svg viewBox="0 0 720 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          ${scene.svgContent}
        </svg>
      `;
    }

    this.container.querySelectorAll('.motion-step-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  startAutoPlay() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (!this.isPlaying) return;
      const next = (this.currentSceneIdx + 1) % this.story.scenes.length;
      this.goToScene(next);
    }, 4500);
  }

  destroy() {
    clearInterval(this.timer);
  }
}
