#!/usr/bin/env node
// gallery.mjs: one still per built style (at --t, default the demo's fan-out beat) tiled into a contact sheet.
//   node gallery.mjs [--t 6.5] [--out ~/Downloads/Motion Styles Gallery.jpg] [--only id1,id2]
// Uses one Chrome for every style (fast, low memory), so it is safe to run while nothing else renders.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => { if (v.startsWith('--')) a.push([v.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]); return a; }, []));
const T = Number(args.t || 6.5);
const index = JSON.parse(fs.readFileSync(path.join(here, '..', 'index.json'), 'utf8'));
const only = args.only ? new Set(String(args.only).split(',')) : null;
const ids = index.styles.map((s) => s.id).filter((id) => fs.existsSync(path.join(here, '..', 'styles', `${id}.js`)) && (!only || only.has(id)));
const out = path.resolve(String(args.out || path.join(os.homedir(), 'Downloads', 'Motion Styles Gallery.jpg')));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ms-gallery-'));

function findChrome() {
  const cands = [];
  if (process.env.CHROME_PATH) cands.push(process.env.CHROME_PATH);
  if (process.platform === 'win32') {
    cands.push('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe') : null,
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe');
  } else if (process.platform === 'darwin') {
    cands.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge');
  } else {
    cands.push('/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser', '/snap/bin/chromium');
  }
  for (const c of cands) { try { if (c && fs.existsSync(c)) return c; } catch {} }
  throw new Error('Google Chrome (or Edge) not found; install it or set CHROME_PATH');
}

const browser = await puppeteer.launch({ executablePath: findChrome(), headless: 'new', args: ['--allow-file-access-from-files'] });
const failed = [];
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  for (const id of ids) {
    try {
      await page.goto(pathToFileURL(path.join(here, 'player.html')).href + `?style=${id}&w=1280&h=720&render=1`, { waitUntil: 'load', timeout: 60000 });
      await page.waitForFunction('window.READY || window.READY_ERROR', { timeout: 60000 });
      const err = await page.evaluate('window.READY_ERROR || null');
      if (err) throw new Error(err);
      const b64 = await page.evaluate((t) => { window.seek(t); return document.getElementById('c').toDataURL('image/jpeg', 0.85).split(',')[1]; }, T);
      fs.writeFileSync(path.join(tmp, `f${String(ids.indexOf(id)).padStart(4, '0')}.jpg`), Buffer.from(b64, 'base64'));
      process.stdout.write(`\r${ids.indexOf(id) + 1}/${ids.length} ${id}            `);
    } catch (e) { failed.push(`${id}: ${String(e.message || e).slice(0, 120)}`); }
  }
} finally { await browser.close(); }

// tile with ffmpeg (8 across, in index order; sequence pattern works on every platform incl. Windows)
const cols = 8, n = fs.readdirSync(tmp).length, rows = Math.ceil(n / cols);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-pattern_type', 'sequence', '-i', path.join(tmp, 'f%04d.jpg'), '-vf', `scale=320:180,tile=${cols}x${rows}:padding=4:color=black`, '-frames:v', '1', '-update', '1', out]);
console.log(`\n${n} styles -> ${out}`);
if (failed.length) console.log('failed:\n  ' + failed.join('\n  '));
