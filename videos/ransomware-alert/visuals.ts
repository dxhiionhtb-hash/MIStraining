// =====================================================================
//  Flat 2D Cyber Awareness: Ransomware Alert (25s Cinematic)
// =====================================================================
defineVisuals({
  freeze: {
    bg: '#1c2538',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#1c2538"/>

      <!-- Workstation Screen with Compromising Files -->
      <g id="workstationFreeze" transform="translate(540 980)">
        <!-- Monitor Frame -->
        <rect x="-420" y="-280" width="840" height="520" rx="36" fill="#0f172a" stroke="#1e293b" stroke-width="8"/>
        <rect x="-390" y="-250" width="780" height="460" rx="20" fill="#1e293b"/>
        <!-- Base -->
        <rect x="-40" y="240" width="80" height="120" fill="#334155"/>
        <rect x="-140" y="360" width="280" height="24" rx="12" fill="#0f172a"/>

        <!-- Grid of File Folders turning into Padlocks -->
        ${[-240, 0, 240].map((x, i) => `
          <g class="docItem" transform="translate(${x} -100)">
            <rect x="-70" y="-60" width="140" height="120" rx="16" fill="#3b82f6"/>
            <rect x="-50" y="-80" width="60" height="25" rx="6" fill="#2563eb"/>
            <circle cx="0" cy="0" r="25" fill="${F2.yellow}"/>
            <circle cx="0" cy="0" r="10" fill="#1e293b"/>
          </g>
        `).join('')}

        <!-- Frozen Spinning Cursor -->
        <g id="spinCursor" transform="translate(80 60)">
          <circle cx="0" cy="0" r="45" fill="none" stroke="${F2.sky}" stroke-width="12" stroke-dasharray="70 40"/>
          <circle cx="0" cy="0" r="20" fill="${F2.white}"/>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#workstationFreeze'), s.t0 + 0.1, 0.6);
      tl.to($('#spinCursor'), { rotation: 360, transformOrigin: '0 0', duration: 1.2, repeat: 3, ease: 'none' }, s.t0 + 0.4);
      tl.to($('.docItem rect'), { fill: F2.red, duration: 0.5, stagger: 0.2 }, K('cursor') + 0.2);
    },
  },

  blackmail: {
    bg: '#240c1c',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#240c1c"/>
      <circle cx="540" cy="980" r="360" fill="#361028" opacity="0.7"/>

      <!-- Giant Crimson Lockout Screen -->
      <g id="crimsonMonitor" transform="translate(540 980)">
        <!-- Bezel -->
        <rect x="-440" y="-280" width="880" height="540" rx="36" fill="#15050f" stroke="${F2.red}" stroke-width="8"/>
        <!-- Red Screen -->
        <rect x="-410" y="-250" width="820" height="480" rx="22" fill="${F2.red}"/>
        
        <!-- Skull Icon in Center -->
        <g id="ransomSkull" transform="translate(0 -90)">
          <circle cx="0" cy="0" r="65" fill="#fff"/>
          <circle cx="-22" cy="-5" r="14" fill="#240c1c"/>
          <circle cx="22" cy="-5" r="14" fill="#240c1c"/>
          <rect x="-24" y="35" width="48" height="30" rx="6" fill="#fff"/>
          <line x1="-12" y1="40" x2="-12" y2="60" stroke="#240c1c" stroke-width="5"/>
          <line x1="0" y1="40" x2="0" y2="60" stroke="#240c1c" stroke-width="5"/>
          <line x1="12" y1="40" x2="12" y2="60" stroke="#240c1c" stroke-width="5"/>
        </g>

        <!-- Heavy Padlock Slamming Down -->
        <g id="giantPadlock" transform="translate(0 70)">
          <path d="M-70 -20 L-70 -90 C-70 -160, 70 -160, 70 -90 L70 -20" stroke="#fff" stroke-width="28" fill="none" stroke-linecap="round"/>
          <rect x="-110" y="-20" width="220" height="160" rx="28" fill="${F2.yellow}"/>
          <circle cx="0" cy="50" r="20" fill="${F2.night}"/>
          <rect x="-8" y="50" width="16" height="36" rx="6" fill="${F2.night}"/>
        </g>
      </g>

      <!-- Alarm rings -->
      <g id="extortionRings" transform="translate(540 980)">
        <circle r="460" stroke="${F2.red}" stroke-width="6" fill="none" opacity="0.6"/>
        <circle r="520" stroke="${F2.orange}" stroke-width="4" stroke-dasharray="24 16" fill="none" opacity="0.4"/>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#crimsonMonitor'), s.t0 + 0.1, 0.5);
      tl.fromTo($('#giantPadlock'), { y: -200, scale: 0.5 }, { y: 70, scale: 1, duration: 0.5, ease: 'bounce.out' }, K('lock') - 0.3);
      tl.to($('#extortionRings circle'), { scale: 1.15, opacity: 0.8, duration: 0.8, repeat: 4, yoyo: true }, K('lock') + 0.2);
    },
  },

  unplug: {
    bg: '#14213d',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#14213d"/>
      <circle cx="540" cy="980" r="340" fill="#182c4f" opacity="0.6"/>

      <!-- Network Ethernet Disconnection -->
      <g id="ethernetYank" transform="translate(540 980)">
        <!-- Wall Jack Port -->
        <rect x="140" y="-120" width="140" height="240" rx="24" fill="#334155"/>
        <rect x="110" y="-70" width="60" height="140" rx="10" fill="#0f172a"/>
        
        <!-- Cable being yanked back -->
        <g id="cablePull">
          <path d="M-420 0 L-20 0" stroke="${F2.sky}" stroke-width="38" stroke-linecap="round"/>
          <rect x="-100" y="-55" width="170" height="110" rx="20" fill="${F2.blue}"/>
          <rect x="70" y="-35" width="50" height="70" rx="8" fill="#cbd5e1"/>
          <path d="M-30 -55 L35 -85 L60 -55" stroke="${F2.blueD}" stroke-width="14" fill="none" stroke-linecap="round"/>
        </g>

        <!-- Isolation Cut Line -->
        <line x1="90" y1="-180" x2="90" y2="180" stroke="${F2.yellow}" stroke-width="18" stroke-dasharray="24 16"/>

        <!-- Wi-Fi Off Switch Pill -->
        <g id="wifiOffPill" transform="translate(0 220)">
          <rect x="-160" y="-40" width="320" height="80" rx="40" fill="#1e293b" stroke="${F2.red}" stroke-width="6"/>
          <circle cx="-100" cy="0" r="24" fill="${F2.red}"/>
          <text x="30" y="10" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="28" fill="#fff" text-anchor="middle">WI-FI APAGADO</text>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#ethernetYank'), s.t0 + 0.1, 0.5);
      tl.fromTo($('#cablePull'), { x: 50 }, { x: -160, duration: 0.6, ease: 'power3.out' }, K('unplug') - 0.3);
      f2Pop(tl, $('#wifiOffPill'), K('unplug') + 0.3, 0.4);
    },
  },

  soc_call: {
    bg: '#0f1c34',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#0f1c34"/>

      <!-- SOC Incident Command Wall -->
      <g id="socCommandWall" transform="translate(540 960)">
        <!-- Video Wall Frame -->
        <rect x="-440" y="-240" width="880" height="480" rx="30" fill="#152442" stroke="#253a66" stroke-width="8"/>
        
        <!-- Screen 1: Network Topology Map -->
        <g transform="translate(-220 -80)">
          <rect x="-180" y="-120" width="360" height="240" rx="16" fill="#0c1628"/>
          <circle cx="-100" cy="0" r="25" fill="${F2.green}"/>
          <circle cx="100" cy="0" r="25" fill="${F2.yellow}"/>
          <circle cx="0" cy="-60" r="25" fill="${F2.sky}"/>
          <line x1="-75" y1="0" x2="75" y2="0" stroke="${F2.skyD}" stroke-width="8"/>
          <text x="0" y="80" font-family="'JetBrains Mono', monospace" font-size="18" fill="#94a3b8" text-anchor="middle">SEGMENTO AISLADO</text>
        </g>

        <!-- Screen 2: Sofia SOC Analyst Avatar with Headset -->
        <g transform="translate(220 -80)">
          <rect x="-180" y="-120" width="360" height="240" rx="16" fill="#0c1628"/>
          <!-- Sofia Avatar -->
          <circle cx="0" cy="-20" r="45" fill="#f2c29b"/>
          <path d="M-45 -20 Q0 -70 45 -20 Q30 -40 0 -40 Q-30 -40 -45 -20 Z" fill="#4a2e18"/>
          <!-- Headset -->
          <path d="M-50 -20 C-65 10, -40 35, -15 25" stroke="#94a3b8" stroke-width="6" fill="none"/>
          <circle cx="-10" cy="25" r="7" fill="${F2.yellow}"/>
          <rect x="-50" y="30" width="100" height="60" rx="20" fill="${F2.night}"/>
          <text x="0" y="80" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="18" fill="${F2.green}" text-anchor="middle">RESPUESTA ACTIVA</text>
        </g>

        <!-- Big Emergency Containment Button Pressed -->
        <g id="containmentButton" transform="translate(0 150)">
          <rect x="-160" y="-30" width="320" height="60" rx="18" fill="${F2.green}"/>
          <text x="0" y="10" font-family="'Nunito', Arial, sans-serif" font-weight="900" font-size="24" fill="#091322" text-anchor="middle">✓ CONTENCIÓN CONFIRMADA</text>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#socCommandWall'), s.t0 + 0.1, 0.6);
      f2Pop(tl, $('#containmentButton'), K('soc') - 0.2, 0.4);
      tl.to($('#containmentButton'), { scale: 0.95, duration: 0.15, yoyo: true, repeat: 1 }, K('soc'));
    },
  },

  restore: {
    bg: '#0c1b33',
    html: () => svg(`
      <rect x="0" y="0" width="1080" height="1920" fill="#0c1b33"/>
      <circle cx="540" cy="980" r="340" fill="#152e55" opacity="0.6"/>

      <!-- Cloud Backup Recovery Vault -->
      <g id="cloudRecoveryVault" transform="translate(540 940)">
        <!-- Cloud Body -->
        <ellipse cx="6" cy="14" rx="200" ry="60" fill="#000" opacity="0.12"/>
        <circle cx="-100" cy="-120" r="75" fill="${F2.sky}"/>
        <circle cx="0" cy="-170" r="105" fill="${F2.sky}"/>
        <circle cx="105" cy="-130" r="80" fill="${F2.sky}"/>
        <rect x="-170" y="-120" width="340" height="85" rx="42" fill="${F2.sky}"/>

        <!-- Clean Download Stream Arrow -->
        <g id="streamArrow">
          <line x1="0" y1="-20" x2="0" y2="120" stroke="${F2.green}" stroke-width="24" stroke-linecap="round"/>
          <path d="M0 155 L-35 95 L35 95 Z" fill="${F2.green}"/>
        </g>

        <!-- Restored Clean File Box with Checkmark -->
        <g id="restoredCleanFile" transform="translate(0 230)">
          <rect x="-180" y="-70" width="360" height="140" rx="24" fill="${F2.green}"/>
          <circle cx="-105" cy="0" r="30" fill="${F2.greenD}"/>
          <path d="M-120 0 L-110 10 L-90 -10" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>
          <rect x="-50" y="-22" width="180" height="20" rx="10" fill="#fff"/>
          <rect x="-50" y="12" width="120" height="16" rx="8" fill="${F2.greenD}"/>
        </g>
      </g>
    `),
    anim(tl, s, K, $) {
      f2Pop(tl, $('#cloudRecoveryVault'), s.t0 + 0.1, 0.6);
      tl.fromTo($('#streamArrow'), { y: -30, opacity: 0 }, { y: 15, opacity: 1, duration: 0.6, repeat: 2, yoyo: true }, s.t0 + 0.4);
      f2Pop(tl, $('#restoredCleanFile'), s.t0 + 0.7, 0.45);
    },
  },
});
