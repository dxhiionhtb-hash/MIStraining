/**
 * GSAP EMBEDDED VECTOR MOTIONS ENGINE - STRIPE / LINEAR / VERCEL AESTHETIC
 * Diagramas vectoriales vivos embebidos en bucle fluido sin botones de video
 * Con soporte para IntersectionObserver, aislamiento total de IDs y física precisa.
 */

export class GsapMotionEngine {
  constructor() {
    this.observers = [];
    this.contexts = [];
  }

  /**
   * Inicializa un diagrama vectorial animado en un contenedor DOM
   * @param {HTMLElement} container - Elemento contenedor
   * @param {string} motionSlug - Slug identificador único ('phishing-prisma', 'ia-sanitizer', 'usb-cuarentena', 'ransomware-corte')
   */
  mount(container, motionSlug) {
    if (!container || !window.gsap) return null;

    let svgHtml = '';
    let animFn = null;

    switch (motionSlug) {
      case 'phishing-prisma':
        svgHtml = this.getPhishingPrismaSvg();
        animFn = this.animatePhishingPrisma;
        break;
      case 'ia-sanitizer':
        svgHtml = this.getIaSanitizerSvg();
        animFn = this.animateIaSanitizer;
        break;
      case 'usb-cuarentena':
        svgHtml = this.getUsbCuarentenaSvg();
        animFn = this.animateUsbCuarentena;
        break;
      case 'ransomware-corte':
        svgHtml = this.getRansomwareCorteSvg();
        animFn = this.animateRansomwareCorte;
        break;
      default:
        console.warn(`[GsapMotionEngine] Slug no reconocido: ${motionSlug}`);
        return null;
    }

    container.innerHTML = svgHtml;

    // Encapsulación con gsap.context()
    let tl = null;
    const ctx = gsap.context(() => {
      tl = animFn.call(this, container);
    }, container);

    this.contexts.push(ctx);

    // Autoplay Inteligente con IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!tl) return;
        if (entry.isIntersecting) {
          tl.play();
          container.closest('.gsap-motion-card')?.classList.add('is-active');
        } else {
          tl.pause();
          container.closest('.gsap-motion-card')?.classList.remove('is-active');
        }
      });
    }, { threshold: 0.15 });

    observer.observe(container);
    this.observers.push(observer);

    return { ctx, tl, observer };
  }

  /* ==========================================================================
     1. TEMA 1: PHISHING & ANÁLISIS FORENSE (Slug: phishing-prisma)
     ========================================================================== */
  getPhishingPrismaSvg() {
    const slug = 'phishing-prisma';
    return `
      <div class="gsap-svg-stage" id="${slug}-stage">
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Diagrama vivo de refracción forense de phishing">
          <defs>
            <!-- Gradientes Lineales Aislados -->
            <linearGradient id="${slug}-grad-beam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.1"/>
              <stop offset="60%" stop-color="#38bdf8" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#ffffff" stop-opacity="1"/>
            </linearGradient>

            <linearGradient id="${slug}-grad-fake" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#ff7882" stop-opacity="1"/>
            </linearGradient>

            <linearGradient id="${slug}-grad-safe" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#22c55e" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#86efac" stop-opacity="1"/>
            </linearGradient>

            <linearGradient id="${slug}-grad-prism" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(56, 189, 248, 0.22)"/>
              <stop offset="100%" stop-color="rgba(34, 197, 94, 0.08)"/>
            </linearGradient>

            <filter id="${slug}-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>

          <!-- Cuadrícula y Fondo Estilo Linear -->
          <g opacity="0.15">
            <line x1="40" y1="120" x2="760" y2="120" stroke="#2a3b50" stroke-dasharray="4 8"/>
            <line x1="40" y1="250" x2="760" y2="250" stroke="#2a3b50" stroke-dasharray="4 8"/>
            <line x1="40" y1="380" x2="760" y2="380" stroke="#2a3b50" stroke-dasharray="4 8"/>
            <line x1="220" y1="40" x2="220" y2="460" stroke="#2a3b50" stroke-dasharray="4 8"/>
            <line x1="400" y1="40" x2="400" y2="460" stroke="#2a3b50" stroke-dasharray="4 8"/>
            <line x1="580" y1="40" x2="580" y2="460" stroke="#2a3b50" stroke-dasharray="4 8"/>
          </g>

          <!-- NODO 1: EMISOR DE CORREO INCOMING (Izquierda, x: 70 a 200, y: 195 a 305) -->
          <g id="${slug}-emisor-group">
            <rect x="70" y="200" width="130" height="100" rx="6" fill="#151e2e" stroke="#2a3b50" stroke-width="1.5" class="gsap-hover-glow"/>
            <circle cx="135" cy="235" r="14" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" stroke-width="1.5"/>
            <path d="M 127 235 L 135 241 L 143 235 M 127 232 L 143 232" stroke="#38bdf8" stroke-width="1.5" fill="none"/>
            <text x="135" y="272" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">CORREO ENTRADA</text>
            <text x="135" y="287" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#94a3b8" text-anchor="middle">Factura #9082</text>
          </g>

          <!-- RUTA DEL HAZ ENTRADA HACIA EL PRISMA -->
          <line x1="200" y1="250" x2="330" y2="250" stroke="#243042" stroke-width="2"/>
          <line id="${slug}-beam-incoming" x1="200" y1="250" x2="330" y2="250" stroke="url(#${slug}-grad-beam)" stroke-width="3.5" stroke-linecap="round"/>

          <!-- PAQUETE DE DATOS VIAJERO (PULSO) -->
          <circle id="${slug}-packet-main" cx="200" cy="250" r="5" fill="#38bdf8" filter="url(#${slug}-glow)"/>

          <!-- NODO 2: PRISMA DE INSPECCIÓN FORENSE (Centro, x: 330 a 470, y: 140 a 360) -->
          <g id="${slug}-prism-group" data-animate-transform>
            <!-- Anillo Óptico de Campo -->
            <circle cx="400" cy="250" r="85" fill="none" stroke="#2a3b50" stroke-width="1.5" stroke-dasharray="6 6"/>
            <circle id="${slug}-ring-orbit" cx="400" cy="250" r="70" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.6" stroke-dasharray="14 10" data-animate-rotate/>
            
            <!-- Prisma Triangular de Cuarzo -->
            <polygon id="${slug}-prism-poly" points="400,160 460,320 340,320" fill="url(#${slug}-grad-prism)" stroke="#38bdf8" stroke-width="2" class="gsap-hover-glow" data-animate-scale/>
            <line x1="400" y1="160" x2="400" y2="320" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>

            <!-- Haz de Escaneo Vertical Interno -->
            <line id="${slug}-scanner-line" x1="360" y1="250" x2="440" y2="250" stroke="#22c55e" stroke-width="2.5" opacity="0.8"/>

            <text x="400" y="348" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">PRISMA FORENSE</text>
            <text x="400" y="362" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#38bdf8" text-anchor="middle">Inspección Cabecera</text>
          </g>

          <!-- RUTAS DE REFRACCIÓN HACIA ARRIBA (MALICIOSO) Y ABAJO (VALIDADO) -->
          <path d="M 440 220 L 590 150" stroke="#243042" stroke-width="2"/>
          <path id="${slug}-path-fake" d="M 440 220 L 590 150" stroke="url(#${slug}-grad-fake)" stroke-width="3" stroke-linecap="round"/>

          <path d="M 440 280 L 590 350" stroke="#243042" stroke-width="2"/>
          <path id="${slug}-path-safe" d="M 440 280 L 590 350" stroke="url(#${slug}-grad-safe)" stroke-width="3" stroke-linecap="round"/>

          <!-- NODO 3: AMENAZA IDENTIFICADA / BLOQUEO (Arriba Derecha, x: 590 a 730, y: 100 a 200) -->
          <g id="${slug}-node-fake">
            <rect x="590" y="100" width="140" height="95" rx="6" fill="#151e2e" stroke="#ef4444" stroke-width="1.5" class="gsap-hover-glow"/>
            <circle id="${slug}-fake-alert-dot" cx="620" cy="130" r="10" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" stroke-width="1.5"/>
            <text x="620" y="133" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#ef4444" text-anchor="middle">!</text>
            <text x="640" y="133" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#ef4444">TYPOSQUATTING</text>
            
            <rect x="605" y="152" width="110" height="22" rx="3" fill="rgba(239, 68, 68, 0.12)" stroke="#ef4444" stroke-width="1"/>
            <text id="${slug}-fake-tag" x="660" y="166" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="#ef4444" text-anchor="middle">.pdf.exe BLOQUEADO</text>

            <!-- Chispas de Contención Perimetral -->
            <g id="${slug}-sparks-group" opacity="0">
              <circle cx="590" cy="150" r="16" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3 3"/>
              <line x1="580" y1="140" x2="570" y2="130" stroke="#ef4444" stroke-width="2"/>
              <line x1="600" y1="140" x2="610" y2="130" stroke="#ef4444" stroke-width="2"/>
              <line x1="590" y1="165" x2="590" y2="178" stroke="#ef4444" stroke-width="2"/>
            </g>
          </g>

          <!-- NODO 4: COMUNICACIÓN VERIFICADA (Abajo Derecha, x: 590 a 730, y: 300 a 400) -->
          <g id="${slug}-node-safe">
            <rect x="590" y="300" width="140" height="95" rx="6" fill="#151e2e" stroke="#22c55e" stroke-width="1.5" class="gsap-hover-glow"/>
            <circle id="${slug}-safe-check-dot" cx="620" cy="330" r="10" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" stroke-width="1.5"/>
            <path d="M 616 330 L 619 333 L 625 327" stroke="#22c55e" stroke-width="2" fill="none"/>
            <text x="640" y="333" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#22c55e">VERIFICADO</text>
            
            <rect x="605" y="352" width="110" height="22" rx="3" fill="rgba(34, 197, 94, 0.12)" stroke="#22c55e" stroke-width="1"/>
            <text id="${slug}-safe-tag" x="660" y="366" font-family="'JetBrains Mono', monospace" font-size="8" font-weight="700" fill="#22c55e" text-anchor="middle">DKIM & SPF VÁLIDO</text>
          </g>
        </svg>
      </div>
    `;
  }

  animatePhishingPrisma(container) {
    const slug = 'phishing-prisma';
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

    // Referencias
    const packet = container.querySelector(`#${slug}-packet-main`);
    const beamIn = container.querySelector(`#${slug}-beam-incoming`);
    const ringOrbit = container.querySelector(`#${slug}-ring-orbit`);
    const prismPoly = container.querySelector(`#${slug}-prism-poly`);
    const scannerLine = container.querySelector(`#${slug}-scanner-line`);
    const pathFake = container.querySelector(`#${slug}-path-fake`);
    const pathSafe = container.querySelector(`#${slug}-path-safe`);
    const sparks = container.querySelector(`#${slug}-sparks-group`);
    const fakeAlertDot = container.querySelector(`#${slug}-fake-alert-dot`);
    const safeCheckDot = container.querySelector(`#${slug}-safe-check-dot`);

    // Estado inicial
    gsap.set([pathFake, pathSafe], { strokeDasharray: 200, strokeDashoffset: 200 });
    gsap.set(scannerLine, { y: -30, opacity: 0 });

    // Animación continua de rotación orbital
    gsap.to(ringOrbit, { rotation: 360, duration: 12, repeat: -1, ease: 'linear' });

    // Secuencia Narrativa en Bucle de 3.2s
    tl
      // 1. Inyección del paquete desde el emisor hacia el prisma
      .fromTo(packet, 
        { cx: 200, cy: 250, opacity: 0, scale: 0.5 },
        { cx: 370, cy: 250, opacity: 1, scale: 1, duration: 0.85, ease: 'power3.inOut' }
      )
      // 2. Activación del Prisma
      .to(prismPoly, { scale: 1.08, duration: 0.3, ease: 'back.out(1.4)' }, '-=0.15')
      .to(scannerLine, { opacity: 1, y: 30, duration: 0.5, ease: 'power2.inOut', yoyo: true, repeat: 1 }, '-=0.2')

      // 3. Refracción del rayo malicioso hacia arriba (Typosquatting)
      .to(pathFake, { strokeDashoffset: 0, duration: 0.6, ease: 'expo.out' }, '-=0.2')
      .to(fakeAlertDot, { scale: 1.35, duration: 0.25, yoyo: true, repeat: 2, ease: 'power3.inOut' }, '-=0.3')
      .to(sparks, { opacity: 1, duration: 0.35, ease: 'power2.out' }, '-=0.2')
      .to(sparks, { opacity: 0, duration: 0.3 }, '+=0.2')

      // 4. Refracción del rayo verificado hacia abajo (Firma legítima)
      .to(pathSafe, { strokeDashoffset: 0, duration: 0.6, ease: 'expo.out' }, '-=0.7')
      .to(safeCheckDot, { scale: 1.3, duration: 0.25, yoyo: true, repeat: 1, ease: 'power3.inOut' }, '-=0.4')

      // 5. Normalización y disipación suave para el siguiente ciclo
      .to(prismPoly, { scale: 1, duration: 0.4, ease: 'power2.out' })
      .to(packet, { opacity: 0, duration: 0.25 }, '-=0.3')
      .to([pathFake, pathSafe], { opacity: 0.2, duration: 0.4 }, '-=0.2')
      .set([pathFake, pathSafe], { strokeDashoffset: 200, opacity: 1 });

    return tl;
  }

  /* ==========================================================================
     2. TEMA 2: SEGURIDAD EN IA & SANITIZADOR (Slug: ia-sanitizer)
     ========================================================================== */
  getIaSanitizerSvg() {
    const slug = 'ia-sanitizer';
    return `
      <div class="gsap-svg-stage" id="${slug}-stage">
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Diagrama vivo de sanitización y bóveda de IA">
          <defs>
            <linearGradient id="${slug}-grad-raw" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#ef4444" stop-opacity="0.9"/>
            </linearGradient>

            <linearGradient id="${slug}-grad-clean" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#22c55e" stop-opacity="1"/>
            </linearGradient>

            <filter id="${slug}-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>

          <!-- NODO 1: PROMPT CRUDO CORPORATIVO (Izquierda, x: 70 a 200, y: 195 a 305) -->
          <g id="${slug}-raw-box">
            <rect x="70" y="200" width="135" height="100" rx="6" fill="#151e2e" stroke="#ef4444" stroke-width="1.5" class="gsap-hover-glow"/>
            <text x="137" y="228" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#ef4444" text-anchor="middle">PROMPT CRUDO</text>
            <rect x="85" y="240" width="105" height="18" rx="2" fill="rgba(239, 68, 68, 0.15)"/>
            <text x="137" y="252" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#f59e0b" text-anchor="middle">API_KEY / FINANZAS</text>
            <rect x="85" y="265" width="105" height="18" rx="2" fill="rgba(239, 68, 68, 0.15)"/>
            <text x="137" y="277" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#ef4444" text-anchor="middle">PROMPT INJECTION</text>
          </g>

          <!-- BUS DE DATOS ENTRANTE -->
          <line x1="205" y1="250" x2="330" y2="250" stroke="#243042" stroke-width="2"/>
          <line id="${slug}-wire-in" x1="205" y1="250" x2="330" y2="250" stroke="url(#${slug}-grad-raw)" stroke-width="3.5" stroke-linecap="round"/>

          <!-- NODO 2: REACTOR HEXAGONAL DE SANITIZACIÓN (Centro, x: 330 a 470, y: 150 a 350) -->
          <g id="${slug}-reactor-group">
            <polygon id="${slug}-hex-outer" points="400,165 465,205 465,295 400,335 335,295 335,205" fill="rgba(56, 189, 248, 0.08)" stroke="#38bdf8" stroke-width="2" data-animate-scale/>
            <polygon id="${slug}-hex-inner" points="400,185 445,215 445,285 400,315 355,285 355,215" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="8 6" data-animate-rotate/>
            <circle cx="400" cy="250" r="18" fill="#151e2e" stroke="#22c55e" stroke-width="2"/>
            <path d="M 394 250 L 398 254 L 406 246" stroke="#22c55e" stroke-width="2" fill="none"/>
            <text x="400" y="360" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">BÓVEDA SANITIZADORA</text>
            <text x="400" y="374" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#22c55e" text-anchor="middle">Enmascaramiento Cripto</text>
          </g>

          <!-- BUS DE DATOS SALIENTE PURIFICADO -->
          <line x1="470" y1="250" x2="595" y2="250" stroke="#243042" stroke-width="2"/>
          <line id="${slug}-wire-out" x1="470" y1="250" x2="595" y2="250" stroke="url(#${slug}-grad-clean)" stroke-width="3.5" stroke-linecap="round"/>

          <!-- NODO 3: INFERENCIA DE IA PROTEGIDA (Derecha, x: 595 a 730, y: 195 a 305) -->
          <g id="${slug}-clean-box">
            <rect x="595" y="200" width="135" height="100" rx="6" fill="#151e2e" stroke="#22c55e" stroke-width="1.5" class="gsap-hover-glow"/>
            <text x="662" y="228" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#22c55e" text-anchor="middle">INFERENCIA SEGURA</text>
            <rect x="610" y="240" width="105" height="18" rx="2" fill="rgba(34, 197, 94, 0.15)"/>
            <text x="662" y="252" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#22c55e" text-anchor="middle">[TOKEN_RESERVADO]</text>
            <rect x="610" y="265" width="105" height="18" rx="2" fill="rgba(56, 189, 248, 0.15)"/>
            <text x="662" y="277" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#38bdf8" text-anchor="middle">0% RETENCIÓN</text>
          </g>
        </svg>
      </div>
    `;
  }

  animateIaSanitizer(container) {
    const slug = 'ia-sanitizer';
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });

    const wireIn = container.querySelector(`#${slug}-wire-in`);
    const wireOut = container.querySelector(`#${slug}-wire-out`);
    const hexOuter = container.querySelector(`#${slug}-hex-outer`);
    const hexInner = container.querySelector(`#${slug}-hex-inner`);
    const cleanBox = container.querySelector(`#${slug}-clean-box`);

    gsap.set([wireIn, wireOut], { strokeDasharray: 140, strokeDashoffset: 140 });
    gsap.to(hexInner, { rotation: 360, duration: 10, repeat: -1, ease: 'linear' });

    tl
      .to(wireIn, { strokeDashoffset: 0, duration: 0.8, ease: 'power3.inOut' })
      .to(hexOuter, { scale: 1.1, duration: 0.35, ease: 'back.out(1.4)' }, '-=0.1')
      .to(wireOut, { strokeDashoffset: 0, duration: 0.8, ease: 'power3.out' }, '-=0.1')
      .fromTo(cleanBox, { scale: 0.98 }, { scale: 1.02, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' }, '-=0.3')
      .to(hexOuter, { scale: 1, duration: 0.4, ease: 'power2.inOut' })
      .to([wireIn, wireOut], { opacity: 0.2, duration: 0.35 })
      .set([wireIn, wireOut], { strokeDashoffset: 140, opacity: 1 });

    return tl;
  }

  /* ==========================================================================
     3. TEMA 3: MEDIOS USB & AISLAMIENTO (Slug: usb-cuarentena)
     ========================================================================== */
  getUsbCuarentenaSvg() {
    const slug = 'usb-cuarentena';
    return `
      <div class="gsap-svg-stage" id="${slug}-stage">
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Diagrama vivo de cuarentena USB">
          <defs>
            <linearGradient id="${slug}-grad-wire" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#ef4444" stop-opacity="1"/>
            </linearGradient>
            <filter id="${slug}-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>

          <!-- USB DISPOSITIVO SEÑUELO (Izquierda, x: 80 a 220, y: 200 a 300) -->
          <g id="${slug}-usb-body">
            <rect x="80" y="220" width="35" height="60" rx="3" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
            <rect x="88" y="232" width="18" height="12" fill="#f59e0b"/>
            <rect x="88" y="256" width="18" height="12" fill="#f59e0b"/>
            <rect x="115" y="205" width="105" height="90" rx="6" fill="#151e2e" stroke="#f59e0b" stroke-width="2" class="gsap-hover-glow"/>
            <text x="167" y="245" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#f59e0b" text-anchor="middle">DISPOSITIVO USB</text>
            <text x="167" y="265" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#ef4444" text-anchor="middle">Ataque BadUSB (HID)</text>
          </g>

          <!-- CANAL DE TRANSMISIÓN DE RÁFAGA -->
          <line x1="220" y1="250" x2="350" y2="250" stroke="#243042" stroke-width="2"/>
          <line id="${slug}-wire-keystrokes" x1="220" y1="250" x2="350" y2="250" stroke="url(#${slug}-grad-wire)" stroke-width="3" stroke-linecap="round"/>

          <!-- MÓDULO INTERRUPTOR Y CÚPULA DE CUARENTENA (Centro, x: 350 a 490) -->
          <g id="${slug}-quarantine-node">
            <circle cx="420" cy="250" r="70" fill="none" stroke="#2a3b50" stroke-width="1.5" stroke-dasharray="4 6"/>
            <!-- Cúpula que cae -->
            <path id="${slug}-dome" d="M 370 290 L 370 220 A 50 50 0 0 1 470 220 L 470 290 Z" fill="rgba(34, 197, 94, 0.12)" stroke="#22c55e" stroke-width="2.5" data-animate-transform/>
            <rect x="360" y="290" width="120" height="12" rx="3" fill="#1e293b" stroke="#22c55e" stroke-width="1.5"/>
            <text x="420" y="325" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#22c55e" text-anchor="middle">CÁPSULA SEGURIDAD</text>
            <text x="420" y="339" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#94a3b8" text-anchor="middle">Aislamiento Físico</text>
          </g>

          <!-- TERMINAL CORPORATIVA PROTEGIDA (Derecha, x: 570 a 710) -->
          <g id="${slug}-endpoint">
            <rect x="570" y="205" width="140" height="90" rx="6" fill="#151e2e" stroke="#22c55e" stroke-width="1.5" class="gsap-hover-glow"/>
            <circle cx="640" cy="235" r="12" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" stroke-width="1.5"/>
            <path d="M 636 235 L 639 238 L 645 232" stroke="#22c55e" stroke-width="2" fill="none"/>
            <text x="640" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">EQUIPO CORPORATIVO</text>
            <text x="640" y="280" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#22c55e" text-anchor="middle">Integridad Preservada</text>
          </g>
        </svg>
      </div>
    `;
  }

  animateUsbCuarentena(container) {
    const slug = 'usb-cuarentena';
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

    const wire = container.querySelector(`#${slug}-wire-keystrokes`);
    const dome = container.querySelector(`#${slug}-dome`);

    gsap.set(wire, { strokeDasharray: 130, strokeDashoffset: 130 });
    gsap.set(dome, { y: -80, opacity: 0 });

    tl
      .to(wire, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' })
      .to(dome, { y: 0, opacity: 1, duration: 0.55, ease: 'back.out(1.3)' }, '-=0.15')
      .to(wire, { stroke: '#22c55e', duration: 0.3 })
      .to(dome, { opacity: 0.6, duration: 0.4, yoyo: true, repeat: 1 })
      .to(dome, { y: -80, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.4')
      .set(wire, { strokeDashoffset: 130, stroke: 'url(#usb-cuarentena-grad-wire)' });

    return tl;
  }

  /* ==========================================================================
     4. TEMA 4: RANSOMWARE & CORTE EN 60S (Slug: ransomware-corte)
     ========================================================================== */
  getRansomwareCorteSvg() {
    const slug = 'ransomware-corte';
    return `
      <div class="gsap-svg-stage" id="${slug}-stage">
        <svg viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Diagrama vivo de contención de ransomware">
          <defs>
            <linearGradient id="${slug}-grad-corrupt" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#ef4444" stop-opacity="1"/>
              <stop offset="100%" stop-color="#b91c1c" stop-opacity="0.8"/>
            </linearGradient>

            <linearGradient id="${slug}-grad-restore" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#22c55e" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#38bdf8" stop-opacity="1"/>
            </linearGradient>
          </defs>

          <!-- NODO INFECTADO (Izquierda, x: 70 a 200) -->
          <g id="${slug}-node-infected">
            <rect x="70" y="200" width="130" height="100" rx="6" fill="#151e2e" stroke="#ef4444" stroke-width="1.5" class="gsap-hover-glow"/>
            <circle cx="135" cy="235" r="12" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" stroke-width="1.5"/>
            <text x="135" y="239" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#ef4444" text-anchor="middle">!</text>
            <text x="135" y="268" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#ef4444" text-anchor="middle">EQUIPO INFECTADO</text>
            <text x="135" y="283" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#94a3b8" text-anchor="middle">Propagación Lateral</text>
          </g>

          <!-- CABLE DE ENLACE DE RED CON FRACTURA CENTRAL -->
          <line x1="200" y1="250" x2="385" y2="250" stroke="#243042" stroke-width="3"/>
          <line id="${slug}-wire-corrupt" x1="200" y1="250" x2="385" y2="250" stroke="url(#${slug}-grad-corrupt)" stroke-width="4" stroke-linecap="round"/>

          <line x1="415" y1="250" x2="600" y2="250" stroke="#243042" stroke-width="3"/>
          <line id="${slug}-wire-clean" x1="415" y1="250" x2="600" y2="250" stroke="url(#${slug}-grad-restore)" stroke-width="4" stroke-linecap="round"/>

          <!-- CUCHILLA GUILLOTINA DE DESCONEXIÓN FÍSICA (Centro, x: 400) -->
          <g id="${slug}-blade-group" data-animate-transform>
            <polygon points="388,140 412,140 400,240" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5"/>
            <circle cx="400" cy="245" r="8" fill="#ef4444" opacity="0.6"/>
            <text x="400" y="125" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="800" fill="#38bdf8" text-anchor="middle">REGLA 60 SEGUNDOS</text>
          </g>

          <!-- NODO SERVIDOR CENTRAL Y RESPALDO (Derecha, x: 600 a 730) -->
          <g id="${slug}-node-server">
            <rect x="600" y="200" width="130" height="100" rx="6" fill="#151e2e" stroke="#22c55e" stroke-width="1.5" class="gsap-hover-glow"/>
            <circle id="${slug}-shield-circle" cx="665" cy="235" r="14" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" stroke-width="2"/>
            <path d="M 660 235 L 664 239 L 671 231" stroke="#22c55e" stroke-width="2" fill="none"/>
            <text x="665" y="268" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">SERVIDOR CORPORATIVO</text>
            <text x="665" y="283" font-family="'JetBrains Mono', monospace" font-size="7.5" fill="#22c55e" text-anchor="middle">Respaldo Inmutable</text>
          </g>
        </svg>
      </div>
    `;
  }

  animateRansomwareCorte(container) {
    const slug = 'ransomware-corte';
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

    const wireCorrupt = container.querySelector(`#${slug}-wire-corrupt`);
    const wireClean = container.querySelector(`#${slug}-wire-clean`);
    const blade = container.querySelector(`#${slug}-blade-group`);
    const shield = container.querySelector(`#${slug}-shield-circle`);

    gsap.set(wireCorrupt, { strokeDasharray: 185, strokeDashoffset: 185 });
    gsap.set(wireClean, { strokeDasharray: 185, strokeDashoffset: 185 });
    gsap.set(blade, { y: -50, opacity: 0 });

    tl
      // Avance de la infección lateral hacia el cable
      .to(wireCorrupt, { strokeDashoffset: 0, duration: 1, ease: 'power2.in' })
      // Golpe tajante de la guillotina de desconexión física
      .to(blade, { y: 15, opacity: 1, duration: 0.35, ease: 'expo.out' }, '-=0.1')
      // Onda expansiva de protección en el servidor central
      .to(wireClean, { strokeDashoffset: 0, duration: 0.7, ease: 'power3.out' }, '-=0.1')
      .to(shield, { scale: 1.35, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' }, '-=0.4')
      // Disipación suave
      .to(blade, { y: -50, opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.5')
      .to([wireCorrupt, wireClean], { opacity: 0.2, duration: 0.3 })
      .set([wireCorrupt, wireClean], { strokeDashoffset: 185, opacity: 1 });

    return tl;
  }

  destroy() {
    this.observers.forEach(obs => obs.disconnect());
    this.contexts.forEach(ctx => ctx.revert());
    this.observers = [];
    this.contexts = [];
  }
}

export const gsapMotionEngine = new GsapMotionEngine();
