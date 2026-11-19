// =====================================================================
//  Flat 2D Cyber Awareness: Phishing Alert (25s Cinematic)
// =====================================================================
defineVisuals({
  routine: {
    bg: '#1c2944',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#1c2944"/>
      
      <!-- Office Window with Sunset Skyline -->
      <g id="officeWindow" transform="translate(140 680)">
        <rect x="0" y="0" width="800" height="420" rx="20" fill="#0b172a"/>
        <rect x="15" y="15" width="770" height="390" rx="14" fill="${F2.sky}"/>
        <!-- Sunset gradient sun & buildings -->
        <circle cx="560" cy="220" r="110" fill="${F2.orange}"/>
        <circle cx="560" cy="220" r="90" fill="${F2.yellow}"/>
        <!-- Skyscrapers -->
        <rect x="80" y="160" width="110" height="245" fill="#1e3a66"/>
        <rect x="210" y="100" width="140" height="305" fill="#152b4d"/>
        <rect x="370" y="180" width="100" height="225" fill="#1b345c"/>
        <rect x="490" y="120" width="130" height="285" fill="#152b4d"/>
        <rect x="640" y="210" width="120" height="195" fill="#1e3a66"/>
        <!-- Window frame bars -->
        <line x1="400" y1="15" x2="400" y2="405" stroke="#0b172a" stroke-width="14"/>
        <line x1="15" y1="210" x2="785" y2="210" stroke="#0b172a" stroke-width="14"/>
      </g>

      <!-- Office Desk & Lamp -->
      <g id="deskSetup" transform="translate(100 1100)">
        <!-- Wood Desk -->
        <rect x="0" y="120" width="880" height="40" rx="10" fill="#8b5a2b"/>
        <rect x="40" y="160" width="30" height="320" fill="#654321"/>
        <rect x="810" y="160" width="30" height="320" fill="#654321"/>

        <!-- Plant on left -->
        <rect x="60" y="50" width="50" height="70" rx="6" fill="#e2e8f0"/>
        <circle cx="70" cy="20" r="24" fill="${F2.green}"/>
        <circle cx="95" cy="10" r="28" fill="${F2.greenD}"/>
        <circle cx="105" cy="35" r="22" fill="${F2.green}"/>

        <!-- Steaming Coffee Cup on right -->
        <g id="coffeeCup" transform="translate(730 65)">
          <rect x="0" y="0" width="45" height="55" rx="8" fill="${F2.white}"/>
          <path d="M45 10 C60 10, 60 35, 45 35" stroke="${F2.white}" stroke-width="7" fill="none"/>
          <path id="steam1" d="M15 -10 Q25 -25 15 -40" stroke="#cbd5e1" stroke-width="4" fill="none" opacity="0.6"/>
          <path id="steam2" d="M30 -8 Q20 -25 30 -42" stroke="#cbd5e1" stroke-width="4" fill="none" opacity="0.6"/>
        </g>

        <!-- Laptop & Carlos Character -->
        <g id="carlosChar" transform="translate(340 -40)">
          <!-- Chair back -->
          <rect x="-80" y="0" width="160" height="190" rx="24" fill="#334155"/>
          <!-- Carlos Body & Teal Shirt -->
          <rect x="-60" y="60" width="120" height="120" rx="28" fill="${F2.blue}"/>
          <!-- Head & Hair -->
          <circle cx="0" cy="0" r="46" fill="#f8c8a0"/>
          <path d="M-46 -10 Q0 -65 46 -10 Q25 -40 0 -38 Q-25 -40 -46 -10 Z" fill="#2d1c16"/>
          <!-- Happy profile eye & smile -->
          <circle cx="18" cy="-6" r="5" fill="#14213d"/>
          <path d="M12 12 Q20 22 28 12" stroke="#14213d" stroke-width="4" fill="none" stroke-linecap="round"/>
          <!-- Arm typing -->
          <g id="typingArm">
            <path d="M30 90 L85 130 L115 115" stroke="${F2.blue}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="118" cy="115" r="10" fill="#f8c8a0"/>
          </g>
          <!-- Laptop -->
          <rect x="70" y="80" width="14" height="60" rx="4" fill="#64748b" transform="rotate(-18 70 80)"/>
          <rect x="60" y="130" width="120" height="12" rx="4" fill="#94a3b8"/>
        </g>
      </g>

      <!-- Ambient Floating Dust/Light Particles -->
      <g id="particles">
        <circle cx="320" cy="850" r="5" fill="#ffc83d" opacity="0.6"/>
        <circle cx="780" cy="920" r="4" fill="#ffc83d" opacity="0.5"/>
        <circle cx="520" cy="780" r="6" fill="#ffffff" opacity="0.4"/>
        <circle cx="240" cy="1020" r="5" fill="#5fb6f5" opacity="0.6"/>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#officeWindow'), s.t0 + 0.1, 0.6);
      f2Pop(tl, $('#deskSetup'), s.t0 + 0.3, 0.6);
      tl.to($('#typingArm'), { rotation: 8, transformOrigin: '30px 90px', duration: 0.18, repeat: 14, yoyo: true, ease: 'sine.inOut' }, s.t0 + 0.5);
      tl.to($('#steam1'), { y: -12, opacity: 0.2, duration: 1.2, repeat: 3, yoyo: true }, s.t0 + 0.5);
      tl.to($('#particles circle'), { y: -20, duration: 2.2, repeat: 1, yoyo: true, stagger: 0.3 }, s.t0 + 0.2);
    },
  },

  urgency: {
    bg: '#0c1527',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#0c1527"/>
      
      <!-- Background Hacker Shadow in silhouette -->
      <g id="hackerShadow" transform="translate(540 680)">
        <path d="M-120 180 C-120 60, -80 0, 0 0 C80 0, 120 60, 120 180 Z" fill="#080e1a"/>
        <!-- Hood curve -->
        <path d="M-80 90 Q0 -30 80 90 Q40 40 0 40 Q-40 40 -80 90 Z" fill="#050a14"/>
        <!-- Glowing Triangular Eyes -->
        <polygon points="-30,65 -15,75 -35,80" fill="${F2.yellow}"/>
        <polygon points="30,65 15,75 35,80" fill="${F2.yellow}"/>
      </g>

      <!-- Giant Compromised Monitor with Urgent Email Alert -->
      <g id="alertMonitor" transform="translate(540 1080)">
        <!-- Stand & Base -->
        <rect x="-40" y="240" width="80" height="140" fill="#1e293b"/>
        <rect x="-160" y="380" width="320" height="28" rx="14" fill="#0f172a"/>
        <!-- Bezel -->
        <rect x="-440" y="-260" width="880" height="520" rx="36" fill="#111c30" stroke="#1e2d4a" stroke-width="8"/>
        <!-- Red Glowing Screen Area -->
        <rect x="-410" y="-230" width="820" height="460" rx="22" fill="#2d121c"/>
        <rect x="-410" y="-230" width="820" height="460" rx="22" fill="${F2.red}" opacity="0.18" id="screenRedFlash"/>

        <!-- Pulsing Urgent Email Card -->
        <g id="urgentEmailBox" transform="translate(0 -20)">
          <rect x="-340" y="-140" width="680" height="280" rx="24" fill="${F2.white}"/>
          <!-- Red Header Bar -->
          <path d="M-340 -140 L340 -140 L340 -50 L-340 -50 Z" fill="${F2.red}"/>
          <text x="-290" y="-85" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="34" fill="#ffffff">⚠ ALERTA DE NÓMINA // URGENTE</text>
          
          <!-- Email body lines -->
          <rect x="-290" y="-20" width="460" height="18" rx="9" fill="#64748b"/>
          <rect x="-290" y="15" width="580" height="16" rx="8" fill="#94a3b8"/>
          <rect x="-290" y="45" width="520" height="16" rx="8" fill="#94a3b8"/>
          
          <!-- Phishing action button with countdown -->
          <rect x="-290" y="80" width="320" height="46" rx="12" fill="${F2.red}"/>
          <text x="-130" y="112" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="24" fill="#fff" text-anchor="middle">ACTUALIZAR AHORA (15 MIN)</text>
        </g>
      </g>

      <!-- Alarm Pulse Rings -->
      <g id="alarmRings" transform="translate(540 1060)">
        <circle r="440" stroke="${F2.red}" stroke-width="6" fill="none" opacity="0.6"/>
        <circle r="490" stroke="${F2.orange}" stroke-width="4" stroke-dasharray="24 16" fill="none" opacity="0.4"/>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#hackerShadow'), s.t0 + 0.1, 0.6);
      f2Pop(tl, $('#alertMonitor'), s.t0 + 0.3, 0.6);
      tl.to($('#screenRedFlash'), { opacity: 0.5, duration: 0.3, repeat: 7, yoyo: true, ease: 'power1.inOut' }, s.t0 + 0.4);
      tl.fromTo($('#alarmRings circle'), { scale: 0.8, transformOrigin: '540px 1060px', opacity: 0 }, { scale: 1.15, opacity: 0.8, duration: 0.8, repeat: 4, yoyo: true }, K('alert') - 0.4);
    },
  },

  forensic: {
    bg: '#0f1a30',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#0f1a30"/>
      <circle cx="540" cy="980" r="360" fill="#172442" opacity="0.6"/>

      <!-- Browser Address Bar Zoom -->
      <g id="forensicBrowser" transform="translate(540 820)">
        <rect x="-440" y="-80" width="880" height="160" rx="30" fill="${F2.white}"/>
        <!-- Padlock fake -->
        <rect x="-390" y="-28" width="46" height="42" rx="8" fill="${F2.red}"/>
        <path d="M-377 -28 L-377 -44 C -377 -56, -357 -56, -357 -44 L-357 -28" stroke="${F2.red}" stroke-width="7" fill="none"/>
        <!-- URL spoof domain with red warning background -->
        <rect x="-310" y="-45" width="580" height="90" rx="16" fill="#ffe2e5"/>
        <text x="-280" y="10" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="34" fill="${F2.red}">rrhh-pagos-online<tspan fill="#b91c1c" font-size="36">.net</tspan></text>
        <!-- Warning mark -->
        <circle cx="360" cy="0" r="34" fill="${F2.red}"/>
        <text x="360" y="12" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="38" fill="#fff" text-anchor="middle">!</text>
      </g>

      <!-- Phishing Hook descending over Credentials Lock -->
      <g id="baitTrap" transform="translate(540 1200)">
        <!-- Fishing Line from above -->
        <line x1="0" y1="-280" x2="0" y2="20" stroke="${F2.red}" stroke-width="12" stroke-dasharray="16 12"/>
        <!-- Sharp Barbed Hook -->
        <path d="M0 20 C0 140, -110 140, -110 50 C-110 10, -85 10, -85 50 C-85 105, -24 105, -24 20 Z" fill="${F2.red}"/>
        <polygon points="-110,50 -130,70 -105,75" fill="${F2.red}"/>

        <!-- Target Credential Vault Dial below -->
        <g id="credentialTarget" transform="translate(-55 160)">
          <rect x="-140" y="-70" width="280" height="140" rx="24" fill="${F2.blueD}"/>
          <circle cx="0" cy="0" r="45" fill="${F2.yellow}"/>
          <rect x="-10" y="-10" width="20" height="20" rx="4" fill="${F2.night}"/>
          <text x="0" y="55" font-family="'Nunito', Arial, sans-serif" font-weight="800" font-size="22" fill="#fff" text-anchor="middle">CONTRASEÑA</text>
        </g>
      </g>

      <!-- Magnifying Glass Inspector -->
      <g id="forensicLoupe" transform="translate(680 780)">
        <line x1="80" y1="80" x2="190" y2="190" stroke="${F2.yellow}" stroke-width="26" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="120" fill="#fff" opacity="0.2"/>
        <circle cx="0" cy="0" r="110" fill="none" stroke="${F2.yellow}" stroke-width="22"/>
        <text x="0" y="15" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="42" fill="${F2.yellow}" text-anchor="middle">SPOOF</text>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#forensicBrowser'), s.t0 + 0.1, 0.5);
      f2Pop(tl, $('#forensicLoupe'), s.t0 + 0.4, 0.5);
      tl.fromTo($('#baitTrap'), { y: -240, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'bounce.out' }, K('hook') - 0.4);
      tl.to($('#baitTrap'), { y: 25, duration: 1.0, repeat: 2, yoyo: true, ease: 'sine.inOut' }, K('hook') + 0.3);
    },
  },

  action: {
    bg: '#111e38',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#111e38"/>
      
      <!-- Split Console: Carlos Left, Sofia SOC Right -->
      <g id="tacticalResponse" transform="translate(540 960)">
        <!-- Carlos Side (Left) -->
        <g transform="translate(-240 0)">
          <rect x="-200" y="-220" width="400" height="440" rx="28" fill="#1e2c4a"/>
          <!-- Carlos Avatar -->
          <circle cx="0" cy="-70" r="55" fill="#f8c8a0"/>
          <path d="M-55 -80 Q0 -135 55 -80 Q30 -110 0 -108 Q-30 -110 -55 -80 Z" fill="#2d1c16"/>
          <rect x="-65" y="0" width="130" height="140" rx="28" fill="${F2.blue}"/>
          <!-- Stop Hand gesture -->
          <g id="stopHand" transform="translate(70 20)">
            <circle cx="0" cy="0" r="32" fill="#f8c8a0"/>
            <rect x="-24" y="-20" width="48" height="40" rx="10" fill="#f8c8a0"/>
          </g>
          <!-- Red Report Button clicked -->
          <g id="reportBtn" transform="translate(0 150)">
            <rect x="-140" y="-30" width="280" height="60" rx="16" fill="${F2.red}"/>
            <text x="0" y="10" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="24" fill="#fff" text-anchor="middle">✓ REPORTAR PHISHING</text>
          </g>
        </g>

        <!-- Sofia SOC Analyst Side (Right) -->
        <g transform="translate(240 0)">
          <rect x="-200" y="-220" width="400" height="440" rx="28" fill="#162540" stroke="${F2.blue}" stroke-width="6"/>
          <!-- Sofia Avatar with Headset -->
          <circle cx="0" cy="-70" r="55" fill="#f2c29b"/>
          <path d="M-55 -70 Q0 -130 55 -70 Q40 -90 0 -90 Q-40 -90 -55 -70 Z" fill="#4a2e18"/>
          <!-- Headset mic -->
          <path d="M-60 -70 C-75 -30, -50 0, -20 -10" stroke="#94a3b8" stroke-width="6" fill="none"/>
          <circle cx="-15" cy="-10" r="8" fill="${F2.yellow}"/>
          <rect x="-65" y="0" width="130" height="140" rx="28" fill="${F2.night}"/>
          <!-- Shield active badge -->
          <circle cx="0" cy="150" r="36" fill="${F2.green}"/>
          <path d="M-15 150 L-3 162 L18 138" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>
        </g>

        <!-- Big Energy Shield Barrier cutting the hook -->
        <g id="energyBarrier" transform="translate(0 -20)">
          <line x1="0" y1="-280" x2="0" y2="280" stroke="${F2.sky}" stroke-width="18" stroke-linecap="round"/>
          <circle cx="0" cy="0" r="60" fill="${F2.sky}"/>
          <path d="M-20 -20 L20 20 M20 -20 L-20 20" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#tacticalResponse'), s.t0 + 0.1, 0.6);
      f2Pop(tl, $('#reportBtn'), s.t0 + 0.4, 0.4);
      tl.fromTo($('#energyBarrier'), { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }, K('shield') - 0.3);
      tl.to($('#reportBtn'), { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1 }, K('shield'));
    },
  },

  golden_rule: {
    bg: F2.night,
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="${F2.night}"/>
      <circle cx="540" cy="980" r="340" fill="#152748" opacity="0.6"/>

      <!-- Giant Cyber Shield of Honor -->
      <g id="shieldGold" transform="translate(540 960)">
        <!-- Outer glow -->
        <path d="M0 -240 L210 -150 C210 70, 0 270, 0 270 C0 270, -210 70, -210 -150 Z" fill="#0c172a" opacity="0.6" transform="translate(0 20)"/>
        <!-- Main Shield Body -->
        <path d="M0 -240 L210 -150 C210 70, 0 270, 0 270 C0 270, -210 70, -210 -150 Z" fill="${F2.blue}"/>
        <!-- Inner Core Layer -->
        <path d="M0 -200 L170 -125 C170 50, 0 225, 0 225 C0 225, -170 50, -170 -125 Z" fill="${F2.blueD}"/>
        <!-- Green Checkmark -->
        <path id="goldCheck" d="M-70 10 L-10 75 L95 -45" fill="none" stroke="${F2.green}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Golden Stars / Sparkles -->
      <g id="goldenStars">
        <circle cx="240" cy="740" r="22" fill="${F2.yellow}"/>
        <circle cx="840" cy="760" r="26" fill="${F2.yellow}"/>
        <circle cx="220" cy="1180" r="18" fill="${F2.green}"/>
        <circle cx="860" cy="1160" r="20" fill="${F2.sky}"/>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#shieldGold'), s.t0 + 0.1, 0.6);
      tl.fromTo($('#goldCheck'), { strokeDasharray: 260, strokeDashoffset: 260 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, s.t0 + 0.5);
      tl.fromTo($('#goldenStars circle'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.45, stagger: 0.1, ease: 'back.out(2)' }, s.t0 + 0.7);
    },
  },
});
