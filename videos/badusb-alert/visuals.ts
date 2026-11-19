// =====================================================================
//  Flat 2D Cyber Awareness: BadUSB Alert (25s Cinematic)
// =====================================================================
defineVisuals({
  find: {
    bg: '#14213d',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#14213d"/>

      <!-- Hallway Corridor Background -->
      <g id="hallwayBg" transform="translate(140 680)">
        <!-- Walls & Perspective Lines -->
        <rect x="0" y="0" width="800" height="480" rx="20" fill="#1b2a4c"/>
        <polygon points="0,480 200,320 600,320 800,480" fill="#101c34"/>
        <!-- Polished floor reflection tiles -->
        <polygon points="0,480 800,480 660,350 140,350" fill="#0d172c" opacity="0.8"/>
        <!-- Doorway & plants in background -->
        <rect x="340" y="80" width="120" height="240" rx="8" fill="#0a1222"/>
        <rect x="220" y="240" width="40" height="80" rx="6" fill="#64748b"/>
        <circle cx="240" cy="220" r="30" fill="${F2.green}"/>
      </g>

      <!-- Carlos Walking & Looking Down -->
      <g id="carlosWalking" transform="translate(360 920)">
        <!-- Head -->
        <circle cx="0" cy="-60" r="44" fill="#f8c8a0"/>
        <path d="M-44 -70 Q0 -120 44 -70 Q25 -95 0 -92 Q-25 -95 -44 -70 Z" fill="#2d1c16"/>
        <circle cx="15" cy="-62" r="5" fill="#14213d"/>
        <!-- Curious expression -->
        <path d="M10 -45 Q18 -40 25 -48" stroke="#14213d" stroke-width="4" fill="none"/>
        <!-- Body -->
        <rect x="-50" y="0" width="100" height="130" rx="24" fill="${F2.blue}"/>
        <!-- Legs in motion -->
        <rect x="-40" y="120" width="28" height="110" rx="14" fill="#0f172a"/>
        <rect x="12" y="120" width="28" height="90" rx="14" fill="#0f172a"/>
      </g>

      <!-- Glossy USB Flash Drive on the Floor -->
      <g id="floorUsb" transform="translate(680 1140)">
        <!-- Shadow on floor -->
        <ellipse cx="0" cy="40" rx="140" ry="24" fill="#000" opacity="0.4"/>
        <!-- Drive body -->
        <rect x="-50" y="-80" width="100" height="140" rx="20" fill="${F2.sky}"/>
        <!-- Metal connector -->
        <rect x="-30" y="-130" width="60" height="55" rx="6" fill="#d2dcf0"/>
        <rect x="-20" y="-120" width="14" height="20" rx="3" fill="#64748b"/>
        <rect x="6" y="-120" width="14" height="20" rx="3" fill="#64748b"/>
        <!-- Shimmer spark -->
        <circle id="usbGlint" cx="30" cy="-60" r="14" fill="${F2.yellow}"/>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#hallwayBg'), s.t0 + 0.1, 0.6);
      f2Pop(tl, $('#floorUsb'), s.t0 + 0.3, 0.6);
      tl.fromTo($('#carlosWalking'), { x: 260, opacity: 0 }, { x: 360, opacity: 1, duration: 0.8, ease: 'power2.out' }, s.t0 + 0.2);
      tl.to($('#usbGlint'), { scale: 1.6, opacity: 0.3, duration: 0.4, repeat: 5, yoyo: true }, K('usb') - 0.2);
    },
  },

  temptation: {
    bg: '#181e35',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#181e35"/>
      <circle cx="540" cy="980" r="360" fill="#202a48" opacity="0.7"/>

      <!-- Giant Close Up: The USB Bait in Hands -->
      <g id="usbCloseUp" transform="translate(540 980)">
        <!-- Metallic Body -->
        <rect x="-140" y="-140" width="280" height="380" rx="40" fill="${F2.blueD}"/>
        <rect x="-115" y="-115" width="230" height="330" rx="30" fill="${F2.blue}"/>
        <!-- Metal Port -->
        <rect x="-85" y="-270" width="170" height="140" rx="14" fill="#e2e8f0"/>
        <rect x="-55" y="-240" width="36" height="50" rx="8" fill="#64748b"/>
        <rect x="20" y="-240" width="36" height="50" rx="8" fill="#64748b"/>

        <!-- Tempting Handwritten Paper Label Tape -->
        <g id="tapeLabel" transform="translate(0 30)">
          <!-- Masking Tape Texture -->
          <rect x="-125" y="-60" width="250" height="120" rx="10" fill="#fff9db"/>
          <path d="M-125 -60 L-135 0 L-125 60 Z" fill="#e9e2bd"/>
          <path d="M125 -60 L135 0 L125 60 Z" fill="#e9e2bd"/>
          <!-- Handwritten text simulated in red -->
          <text x="0" y="-15" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="28" fill="${F2.red}" text-anchor="middle">BONOS 2026</text>
          <text x="0" y="24" font-family="'Nunito', Arial, sans-serif" font-weight="800" font-size="22" fill="#1e293b" text-anchor="middle">CONFIDENCIAL</text>
        </g>

        <!-- Question mark / doubt bubble -->
        <g id="doubtBubble" transform="translate(180 -180)">
          <circle r="60" fill="${F2.yellow}"/>
          <text x="0" y="22" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="70" fill="${F2.night}" text-anchor="middle">?</text>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#usbCloseUp'), s.t0 + 0.1, 0.6);
      f2Pop(tl, $('#doubtBubble'), s.t0 + 0.5, 0.45);
      tl.to($('#usbCloseUp'), { scale: 1.05, transformOrigin: '540px 980px', duration: 0.6, repeat: 3, yoyo: true, ease: 'sine.inOut' }, K('label') - 0.3);
    },
  },

  danger: {
    bg: '#1c1022',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#1c1022"/>
      <circle cx="540" cy="980" r="380" fill="#2d1436" opacity="0.7"/>

      <!-- X-Ray Translucent USB Drive -->
      <g id="xrayUsb" transform="translate(540 1020)">
        <!-- Outer Ghost Shell -->
        <rect x="-140" y="-120" width="280" height="380" rx="36" fill="#3b1b42" opacity="0.6" stroke="${F2.red}" stroke-width="6"/>
        <rect x="-80" y="-230" width="160" height="120" rx="10" fill="#d2dcf0" opacity="0.8"/>
        
        <!-- Malicious Microcontroller Chip -->
        <g id="microcontroller" transform="translate(0 40)">
          <rect x="-90" y="-90" width="180" height="180" rx="20" fill="${F2.red}"/>
          <!-- Pins -->
          ${[-60, -20, 20, 60].map(y => `<rect x="-115" y="${y - 8}" width="25" height="16" fill="${F2.yellow}"/><rect x="90" y="${y - 8}" width="25" height="16" fill="${F2.yellow}"/>`).join('')}
          <!-- Skull / Warning on chip -->
          <circle cx="0" cy="-15" r="35" fill="${F2.yellow}"/>
          <circle cx="-12" cy="-18" r="7" fill="${F2.night}"/>
          <circle cx="12" cy="-18" r="7" fill="${F2.night}"/>
          <rect x="-10" y="5" width="20" height="10" rx="2" fill="${F2.night}"/>
          <text x="0" y="55" font-family="'JetBrains Mono', monospace" font-weight="900" font-size="22" fill="#fff" text-anchor="middle">HID INJECTOR</text>
        </g>
      </g>

      <!-- Lightning Sparks & Flying False Command Terminal Windows -->
      <g id="injectionVfx">
        <!-- Sparks -->
        <path d="M540 760 L450 630 L510 630 L400 490" stroke="${F2.yellow}" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M540 760 L630 620 L580 620 L680 470" stroke="${F2.orange}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        
        <!-- Flying Terminal Windows -->
        <g id="termWindow1" transform="translate(240 640)">
          <rect x="-120" y="-50" width="240" height="100" rx="14" fill="#0f172a" stroke="${F2.red}" stroke-width="4"/>
          <text x="-90" y="-10" font-family="'JetBrains Mono', monospace" font-size="16" fill="${F2.green}">$ powershell -enc</text>
          <text x="-90" y="20" font-family="'JetBrains Mono', monospace" font-size="16" fill="${F2.yellow}">$ curl malicious.io</text>
        </g>
        <g id="termWindow2" transform="translate(820 660)">
          <rect x="-120" y="-50" width="240" height="100" rx="14" fill="#0f172a" stroke="${F2.red}" stroke-width="4"/>
          <text x="-90" y="-10" font-family="'JetBrains Mono', monospace" font-size="16" fill="${F2.red}">$ dump SAM hive</text>
          <text x="-90" y="20" font-family="'JetBrains Mono', monospace" font-size="16" fill="${F2.green}">$ exit 0</text>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#xrayUsb'), s.t0 + 0.1, 0.5);
      tl.fromTo($('#injectionVfx path'), { opacity: 0, scale: 0.5, transformOrigin: '540px 760px' }, { opacity: 1, scale: 1, duration: 0.2, repeat: 6, yoyo: true }, K('sparks') - 0.4);
      f2Pop(tl, $('#termWindow1'), K('sparks') - 0.2, 0.4);
      f2Pop(tl, $('#termWindow2'), K('sparks'), 0.4);
    },
  },

  contain: {
    bg: '#111f38',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#111f38"/>

      <!-- Carlos Putting USB into Antistatic Pouch -->
      <g id="containmentScene" transform="translate(540 980)">
        <!-- Anti-Static Faraday Pouch -->
        <g id="faradayBag" transform="translate(0 40)">
          <!-- Bag body (silver-metallic with grid) -->
          <rect x="-240" y="-180" width="480" height="380" rx="28" fill="#475569" stroke="#94a3b8" stroke-width="8"/>
          <!-- Grid lines pattern -->
          ${[-120, -60, 0, 60, 120].map(y => `<line x1="-230" y1="${y}" x2="230" y2="${y}" stroke="#64748b" stroke-width="3" opacity="0.6"/>`).join('')}
          <!-- Zipper Seal on top -->
          <rect x="-240" y="-180" width="480" height="40" rx="12" fill="${F2.yellow}"/>
          <text x="0" y="-152" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="22" fill="#1e293b" text-anchor="middle">BOLSA DE CUARENTENA SOC</text>
        </g>

        <!-- USB Drive dropping safely inside bag -->
        <g id="droppingUsb" transform="translate(0 -160)">
          <rect x="-40" y="-50" width="80" height="120" rx="16" fill="${F2.blue}"/>
          <rect x="-25" y="-95" width="50" height="45" rx="6" fill="#cbd5e1"/>
          <!-- Arrow pointing into bag -->
          <path d="M0 80 L-25 40 L25 40 Z" fill="${F2.green}"/>
        </g>

        <!-- Safety Shield Stamp -->
        <g id="safetyStamp" transform="translate(0 120)">
          <circle r="46" fill="${F2.green}"/>
          <path d="M-18 0 L-4 14 L20 -12" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#faradayBag'), s.t0 + 0.1, 0.6);
      tl.fromTo($('#droppingUsb'), { y: -260, opacity: 0 }, { y: -40, opacity: 1, duration: 0.7, ease: 'power2.in' }, K('bag') - 0.4);
      f2Pop(tl, $('#safetyStamp'), K('bag') + 0.2, 0.4);
    },
  },

  quarantine: {
    bg: F2.night,
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="${F2.night}"/>
      <circle cx="540" cy="980" r="340" fill="#142a44" opacity="0.6"/>

      <!-- Heavy Forensic Vault Box in SOC -->
      <g id="forensicVault" transform="translate(540 960)">
        <!-- Vault body -->
        <rect x="-260" y="-200" width="520" height="400" rx="40" fill="#091322" opacity="0.8" transform="translate(0 20)"/>
        <rect x="-270" y="-220" width="540" height="420" rx="40" fill="${F2.blueD}"/>
        <rect x="-230" y="-180" width="460" height="340" rx="26" fill="${F2.blue}"/>
        <!-- Dial & Wheel -->
        <circle cx="0" cy="-10" r="95" fill="${F2.white}"/>
        <circle cx="0" cy="-10" r="75" fill="${F2.night}"/>
        <!-- Turn Wheel -->
        <line x1="-50" y1="-10" x2="50" y2="-10" stroke="${F2.yellow}" stroke-width="20" stroke-linecap="round"/>
        <line x1="0" y1="-60" x2="0" y2="40" stroke="${F2.yellow}" stroke-width="20" stroke-linecap="round"/>
        <!-- Big Safe Seal -->
        <circle id="safeSealBadge" cx="170" cy="-130" r="48" fill="${F2.green}"/>
        <path d="M150 -130 L164 -116 L192 -146" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/>
      </g>

      <!-- Safety particles -->
      <g id="vaultSparks">
        <circle cx="220" cy="740" r="20" fill="${F2.yellow}"/>
        <circle cx="860" cy="760" r="24" fill="${F2.green}"/>
        <circle cx="200" cy="1200" r="18" fill="${F2.sky}"/>
        <circle cx="880" cy="1180" r="22" fill="${F2.yellow}"/>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#forensicVault'), s.t0 + 0.1, 0.6);
      f2Pop(tl, $('#safeSealBadge'), s.t0 + 0.5, 0.45);
      tl.fromTo($('#vaultSparks circle'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' }, s.t0 + 0.7);
    },
  },
});
