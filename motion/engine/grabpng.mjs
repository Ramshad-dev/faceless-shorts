// grabpng.mjs — lossless PNG stills from a scene (QA utility; same page setup as render.mjs).
//   node grabpng.mjs [--style low-poly] [--scene /abs/scene.js] [--size 1080x1920] [--times 2,8] [--out dir]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => { if (v.startsWith('--')) a.push([v.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]); return a; }, []));
const style = args.style || 'low-poly';
const [W, H] = String(args.size || '1080x1920').split('x').map(Number);

function findChrome() {
  const cands = [];
  if (process.env.CHROME_PATH) cands.push(process.env.CHROME_PATH);
  if (process.platform === 'win32') {
    cands.push('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe') : null,
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe');
  } else {
    cands.push('/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  }
  for (const c of cands) { try { if (c && fs.existsSync(c)) return c; } catch {} }
  throw new Error('Chrome not found');
}

const qs = new URLSearchParams({ style, w: W, h: H, render: '1' });
if (args.scene) qs.set('scene', pathToFileURL(path.resolve(args.scene)).href);
const url = pathToFileURL(path.join(here, 'player.html')).href + '?' + qs;
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: 'new', args: ['--allow-file-access-from-files'] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  page.on('pageerror', (e) => console.error('pageerror:', String(e)));
  await page.goto(url, { waitUntil: 'load', timeout: 120000 });
  await page.waitForFunction('window.READY || window.READY_ERROR', { timeout: 120000 });
  const bad = await page.evaluate('window.READY_ERROR || null');
  if (bad) throw new Error(bad);
  const dir = path.resolve(args.out || '.');
  fs.mkdirSync(dir, { recursive: true });
  for (const t of String(args.times || '2').split(',').map(Number)) {
    const b64 = await page.evaluate((tt) => { window.seek(tt); return document.getElementById('c').toDataURL('image/png').split(',')[1]; }, t);
    fs.writeFileSync(path.join(dir, `still-${t.toFixed(2)}.png`), Buffer.from(b64, 'base64'));
  }
  console.log('png stills ->', dir);
} finally { await browser.close(); }
