import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const topics = ['phishing-alert', 'badusb-alert', 'ransomware-alert', 'ai-safety-alert'];

for (const topic of topics) {
  const dir = path.join('videos', topic);
  const voiceDir = path.join(dir, 'voice');
  if (fs.existsSync(voiceDir)) {
    for (const f of fs.readdirSync(voiceDir)) {
      try { fs.unlinkSync(path.join(voiceDir, f)); } catch(e) {}
    }
  }

  console.log(`\n======================================================`);
  console.log(`[TTS] Synthesizing Latin American Spanish for: ${topic}`);
  console.log(`======================================================`);
  
  const r = spawnSync('node', ['core/voice.ts', dir], { stdio: 'inherit' });
  if (r.status !== 0) {
    console.error(`Failed to generate audio for ${topic}`);
    process.exit(1);
  }

  const wavPath = path.join(dir, 'audio.wav');
  if (fs.existsSync(wavPath)) {
    const probe = spawnSync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      wavPath
    ]);
    const duration = parseFloat(probe.stdout.toString().trim()).toFixed(2);
    const stat = fs.statSync(wavPath);
    console.log(`[SUCCESS] ${topic}/audio.wav: ${duration}s (${(stat.size / 1024).toFixed(1)} KB)`);
  }
}

console.log('\n[COMPLETE] All 4 awareness videos have freshly generated Latin American Spanish audio.');
