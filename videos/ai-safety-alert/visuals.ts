// =====================================================================
//  Flat 2D Cyber Awareness: AI Safety & Data Protection (25s Cinematic)
// =====================================================================
defineVisuals({
  shortcut: {
    bg: '#14213d',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#14213d"/>

      <!-- Modern Workspace with Dual Screens -->
      <g id="workspaceAi" transform="translate(540 980)">
        <!-- Desk -->
        <rect x="-420" y="160" width="840" height="35" rx="10" fill="#8b5a2b"/>
        
        <!-- Left Monitor: Confidential Document -->
        <g transform="translate(-200 -20)">
          <rect x="-180" y="-180" width="360" height="280" rx="20" fill="#0f172a" stroke="#334155" stroke-width="6"/>
          <rect x="-160" y="-160" width="320" height="240" rx="12" fill="#fff"/>
          <!-- Confidential Red Stamp -->
          <rect x="-100" y="-140" width="200" height="36" rx="8" fill="${F2.red}"/>
          <text x="0" y="-115" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="18" fill="#fff" text-anchor="middle">CONFIDENCIAL</text>
          <!-- Text lines -->
          <rect x="-130" y="-80" width="260" height="14" rx="7" fill="#64748b"/>
          <rect x="-130" y="-50" width="240" height="14" rx="7" fill="#94a3b8"/>
          <rect x="-130" y="-20" width="200" height="14" rx="7" fill="#94a3b8"/>
        </g>

        <!-- Right Monitor: Public AI Chat Prompt -->
        <g transform="translate(200 -20)">
          <rect x="-180" y="-180" width="360" height="280" rx="20" fill="#0f172a" stroke="#334155" stroke-width="6"/>
          <rect x="-160" y="-160" width="320" height="240" rx="12" fill="#1b2a4a"/>
          <!-- Sparkle icon -->
          <circle cx="-110" cy="-120" r="24" fill="${F2.yellow}"/>
          <text x="-110" y="-112" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="24" fill="${F2.night}" text-anchor="middle">✦</text>
          <text x="10" y="-112" font-family="'Nunito', Arial, sans-serif" font-weight="800" font-size="20" fill="#fff">IA PÚBLICA</text>
          <!-- Chat prompt input box -->
          <rect x="-140" y="-20" width="280" height="70" rx="14" fill="#0a1220"/>
          <text x="-120" y="22" font-family="'JetBrains Mono', monospace" font-size="16" fill="#94a3b8">Pegar contrato...</text>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#workspaceAi'), s.t0 + 0.1, 0.6);
    },
  },

  public_leak: {
    bg: '#161d36',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#161d36"/>
      <circle cx="540" cy="980" r="380" fill="#202a4e" opacity="0.6"/>

      <!-- Giant Neural Net Brain absorbing Data -->
      <g id="giantNeuralBrain" transform="translate(540 960)">
        <!-- Neural Connections -->
        ${[[-160, -120], [160, -120], [-180, 120], [180, 120]].map(([x, y]) => `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${F2.sky}" stroke-width="12"/>`).join('')}
        ${[[-160, -120], [160, -120]].map(([x, y]) => `<line x1="${x}" y1="${y}" x2="0" y2="-180" stroke="${F2.purple}" stroke-width="10"/>`).join('')}
        
        <!-- Nodes -->
        <circle cx="0" cy="0" r="90" fill="${F2.purple}"/>
        <circle cx="-160" cy="-120" r="50" fill="${F2.blue}"/>
        <circle cx="160" cy="-120" r="50" fill="${F2.blue}"/>
        <circle cx="-180" cy="120" r="50" fill="${F2.blue}"/>
        <circle cx="180" cy="120" r="50" fill="${F2.blue}"/>
        <circle cx="0" cy="-180" r="50" fill="${F2.sky}"/>

        <!-- Brain Icon -->
        <circle cx="0" cy="0" r="55" fill="#fff" opacity="0.3"/>
        <path d="M-28 -15 Q0 -50 28 -15 Q50 20 0 35 Q-50 20 -28 -15" fill="#fff"/>
      </g>

      <!-- Dissolving Confidential Document Particles -->
      <g id="dissolvingDoc" transform="translate(540 1340)">
        <rect x="-180" y="-50" width="360" height="100" rx="18" fill="${F2.white}"/>
        <rect x="-140" y="-20" width="160" height="18" rx="8" fill="${F2.red}"/>
        <text x="30" y="-6" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="22" fill="${F2.red}">SECRETO</text>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#giantNeuralBrain'), s.t0 + 0.1, 0.6);
      f2Pop(tl, $('#dissolvingDoc'), s.t0 + 0.3, 0.5);
      tl.to($('#dissolvingDoc'), { y: 1100, scale: 0.3, opacity: 0, duration: 1.2, ease: 'power2.in' }, K('leak') - 0.4);
      tl.to($('#giantNeuralBrain'), { scale: 1.08, transformOrigin: '540px 960px', duration: 0.5, repeat: 3, yoyo: true }, K('leak'));
    },
  },

  competitor: {
    bg: '#1c152a',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#1c152a"/>
      <circle cx="540" cy="980" r="360" fill="#2d1d3f" opacity="0.6"/>

      <!-- Competitor Unknown User Screen exposing your data -->
      <g id="competitorScreen" transform="translate(540 960)">
        <rect x="-420" y="-260" width="840" height="520" rx="36" fill="#0c0714" stroke="${F2.red}" stroke-width="8"/>
        <rect x="-390" y="-230" width="780" height="460" rx="20" fill="#180e26"/>

        <!-- External Hacker / Rival Silhouette in corner -->
        <circle cx="-280" cy="-120" r="45" fill="#3b2550"/>
        <path d="M-330 -40 C-330 -100, -230 -100, -230 -40 Z" fill="#3b2550"/>

        <!-- AI Output bubble leaking your company code & charts -->
        <g id="leakedOutputBubble" transform="translate(60 -60)">
          <rect x="-240" y="-120" width="480" height="240" rx="24" fill="${F2.white}"/>
          <text x="-200" y="-75" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="26" fill="${F2.red}">DATOS DE TU EMPRESA EXPUestos</text>
          <rect x="-200" y="-40" width="380" height="16" rx="8" fill="#64748b"/>
          <rect x="-200" y="-10" width="340" height="16" rx="8" fill="#94a3b8"/>
          <!-- Financial Chart Leaked -->
          <polyline points="-200,80 -120,40 -40,65 40,20 120,45" fill="none" stroke="${F2.red}" stroke-width="8"/>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#competitorScreen'), s.t0 + 0.1, 0.6);
      f2Pop(tl, $('#leakedOutputBubble'), K('exposed') - 0.3, 0.5);
    },
  },

  enclave: {
    bg: '#0f1f3a',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#0f1f3a"/>
      <circle cx="540" cy="980" r="340" fill="#152e55" opacity="0.6"/>

      <!-- Private Corporate AI Enclave Domed Perimeter -->
      <g id="enclaveDome" transform="translate(540 960)">
        <!-- Protective Shield Boundary -->
        <circle cx="0" cy="0" r="260" fill="#0b172b" stroke="${F2.green}" stroke-width="16" stroke-dasharray="32 20"/>
        
        <!-- Corporate Private AI Brain inside -->
        <g transform="translate(0 -30)">
          <path d="M0 -150 L140 -80 C140 60, 0 180, 0 180 C0 180, -140 60, -140 -80 Z" fill="${F2.blue}"/>
          <!-- Padlock -->
          <rect x="-45" y="-10" width="90" height="75" rx="16" fill="${F2.yellow}"/>
          <path d="M-30 -10 L-30 -45 C-30 -65, 30 -65, 30 -45 L30 -10" stroke="${F2.yellow}" stroke-width="14" fill="none"/>
          <circle cx="0" cy="25" r="10" fill="${F2.night}"/>
        </g>

        <!-- Approved Enterprise Stamp -->
        <g id="approvedStamp" transform="translate(0 200)">
          <rect x="-180" y="-35" width="360" height="70" rx="35" fill="${F2.green}"/>
          <text x="0" y="10" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="24" fill="#091322" text-anchor="middle">✓ ENTORNO CORPORATIVO</text>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#enclaveDome'), s.t0 + 0.1, 0.6);
      f2Pop(tl, $('#approvedStamp'), K('enclave') - 0.2, 0.45);
    },
  },

  intellectual_property: {
    bg: F2.night,
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="${F2.night}"/>
      <circle cx="540" cy="980" r="340" fill="#142c4b" opacity="0.6"/>

      <!-- Master Intellectual Property Vault & Checkmark -->
      <g id="ipVault" transform="translate(540 960)">
        <path d="M0 -240 L210 -150 C210 70, 0 270, 0 270 C0 270, -210 70, -210 -150 Z" fill="#0c172a" opacity="0.6" transform="translate(0 20)"/>
        <path d="M0 -240 L210 -150 C210 70, 0 270, 0 270 C0 270, -210 70, -210 -150 Z" fill="${F2.blue}"/>
        <path d="M0 -200 L170 -125 C170 50, 0 225, 0 225 C0 225, -170 50, -170 -125 Z" fill="${F2.blueD}"/>
        <path id="ipCheck" d="M-70 10 L-10 75 L95 -45" fill="none" stroke="${F2.green}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <!-- Innovation Sparkles -->
      <g id="sparkleGroup">
        <circle cx="220" cy="740" r="22" fill="${F2.yellow}"/>
        <circle cx="860" cy="760" r="24" fill="${F2.green}"/>
        <circle cx="200" cy="1180" r="20" fill="${F2.sky}"/>
        <circle cx="880" cy="1160" r="22" fill="${F2.yellow}"/>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#ipVault'), s.t0 + 0.1, 0.6);
      tl.fromTo($('#ipCheck'), { strokeDasharray: 260, strokeDashoffset: 260 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }, s.t0 + 0.5);
      tl.fromTo($('#sparkleGroup circle'), { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.45, stagger: 0.1, ease: 'back.out(2)' }, s.t0 + 0.7);
    },
  },
});
