#!/usr/bin/env node
// =====================================================================
//  Local Voicebox Server Emulator (Latin American Spanish TTS)
//  Listens on http://127.0.0.1:17493 for core/voice.ts
// =====================================================================
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import os from 'node:os';

const PORT = 17493;
const HOST = '127.0.0.1';

// Voice Profiles
const PROFILES = [
  { id: 'latino-carlos', name: 'Carlos (Español Latino - Humano Natural)' },
  { id: 'latino-sofia', name: 'Sofía (Español Latino - Humano Natural)' },
  { id: 'Carlos (Español Latino)', name: 'Carlos (Español Latino)' },
  { id: 'Sofía (Español Latino)', name: 'Sofía (Español Latino)' },
  { id: 'default', name: 'My voice' }
];

// Jobs storage
const jobs = new Map();

// Helper: Synthesize Natural Human Voice in Latin American Spanish (Jorge / Dalia Neural)
function synthesizeNaturalHumanSpanish(text, outputFile, profileId = 'latino-carlos', rate = '+20%') {
  const isSofia = profileId === 'latino-sofia' || (typeof profileId === 'string' && profileId.toLowerCase().includes('sofia'));
  const voice = isSofia ? 'es-MX-DaliaNeural' : 'es-MX-JorgeNeural';

  const tmpTxt = path.join(os.tmpdir(), `tts_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.txt`);
  const tmpMp3 = path.join(os.tmpdir(), `tts_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.mp3`);
  fs.writeFileSync(tmpTxt, text, 'utf8');

  try {
    const edgeRate = typeof rate === 'string' && rate.includes('%') ? rate : '+20%';
    const r = spawnSync('edge-tts', [
      '-f', tmpTxt,
      '--voice', voice,
      '--rate=' + edgeRate,
      '--write-media', tmpMp3
    ]);

    if (r.status === 0 && fs.existsSync(tmpMp3) && fs.statSync(tmpMp3).size > 100) {
      const conv = spawnSync('ffmpeg', [
        '-y', '-v', 'error',
        '-i', tmpMp3,
        '-ar', '48000',
        '-ac', '1',
        outputFile
      ]);
      if (conv.status === 0 && fs.existsSync(outputFile)) {
        console.log(`[Voicebox] Natural Human Neural Voice generated (${voice}) -> ${outputFile}`);
        return;
      }
    }
    console.warn('[Voicebox] Neural voice unavailable, invoking SAPI fallback');
  } catch (err) {
    console.warn('[Voicebox] Neural TTS error:', err.message);
  } finally {
    try { fs.unlinkSync(tmpTxt); } catch (e) {}
    try { fs.unlinkSync(tmpMp3); } catch (e) {}
  }

  // Fallback: SAPI5 Hilda
  synthesizeSapiSpanish(text, outputFile, 4);
}

// Fallback: Synthesize Spanish Audio Locally using SAPI5 Hilda
function synthesizeSapiSpanish(text, outputFile, rate = 4) {
  const escapedText = text.replace(/'/g, "''").replace(/[\r\n]+/g, ' ');
  const psScript = `
Add-Type -AssemblyName System.Speech;
$s = New-Object System.Speech.Synthesis.SpeechSynthesizer;
$installed = $s.GetInstalledVoices() | ForEach-Object { $_.VoiceInfo.Name };
if ($installed -contains 'Microsoft Server Speech Text to Speech Voice (es-MX, Hilda)') {
    $s.SelectVoice('Microsoft Server Speech Text to Speech Voice (es-MX, Hilda)');
}
$s.Rate = ${rate};
$s.Volume = 100;
$s.SetOutputToWaveFile('${outputFile.replace(/\\/g, '/')}');
$s.Speak('${escapedText}');
$s.Dispose();
`;

  const r = spawnSync('powershell', ['-NoProfile', '-Command', psScript], {
    encoding: 'utf8',
    maxBuffer: 1 << 26
  });

  if (r.status !== 0 || !fs.existsSync(outputFile)) {
    throw new Error('SAPI5 TTS failed: ' + (r.stderr || r.stdout));
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 1. GET /profiles
  if (req.method === 'GET' && pathname === '/profiles') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(PROFILES));
    return;
  }

  // 2. POST /generate
  if (req.method === 'POST' && pathname === '/generate') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const text = payload.text || '';
        const profileId = payload.profile_id || 'latino-carlos';
        const rate = payload.rate || '+20%';
        const id = 'job_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);

        const tmpFile = path.join(os.tmpdir(), `${id}.wav`);
        synthesizeNaturalHumanSpanish(text, tmpFile, profileId, rate);

        const wavData = fs.readFileSync(tmpFile);
        jobs.set(id, {
          id,
          status: 'completed',
          data: wavData,
          createdAt: Date.now()
        });

        // Clean temp file
        try { fs.unlinkSync(tmpFile); } catch (e) {}

        console.log(`[Voicebox] Generated ${wavData.length} bytes for: "${text.slice(0, 50)}..."`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ id, status: 'completed' }));
      } catch (err) {
        console.error('[Voicebox] Generation error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // 3. GET /history/:id
  const historyMatch = pathname.match(/^\/history\/([^/]+)$/);
  if (req.method === 'GET' && historyMatch) {
    const id = historyMatch[1];
    const job = jobs.get(id);
    if (!job) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ id, status: job.status }));
    return;
  }

  // 4. GET /history/:id/export-audio
  const exportMatch = pathname.match(/^\/history\/([^/]+)\/export-audio$/);
  if (req.method === 'GET' && exportMatch) {
    const id = exportMatch[1];
    const job = jobs.get(id);
    if (!job || !job.data) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'audio not found' }));
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'audio/wav',
      'Content-Length': job.data.length
    });
    res.end(job.data);
    return;
  }

  // 5. Health check
  if (pathname === '/health' || pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Voicebox Local Server OK (Español Latino - Jorge / Dalia Neural Human Voices)');
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, HOST, () => {
  console.log(`✓ Voicebox Local Server running on http://${HOST}:${PORT}`);
  console.log(`  Profiles available: ${PROFILES.map(p => p.name).join(', ')}`);
});
