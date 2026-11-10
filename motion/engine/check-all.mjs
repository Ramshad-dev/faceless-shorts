#!/usr/bin/env node
// check-all.mjs: smoke-test every built style (loads it, seeks through the demo, reports failures).
//   node check-all.mjs [--stills 1.5,4.5,6.5,9.5,11.5] [--only id1,id2] [--portrait]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => { if (v.startsWith('--')) a.push([v.slice(2), all[i + 1] && !all[i + 1].startsWith('--') ? all[i + 1] : true]); return a; }, []));
const stills = String(args.stills || '1.5,4.5,6.5,9.5,11.5').split(',').map(Number);
const portrait = !!args.portrait;
const W = portrait ? 1080 : 1280, H = portrait ? 1920 : 720;
const index = JSON.parse(fs.readFileSync(path.join(here, '..', 'index.json'), 'utf8'));
const only = args.only ? new Set(String(args.only).split(',')) : null;
const ids = index.styles.filter((s) => s.built && fs.existsSync(path.join(here, '..', 'styles', `${s.id}.js`)) && (!only || only.has(s.id))).map((s) => s.id);

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
  await page.setViewport({ width: W, height: H });
  for (const id of ids) {
    const errs = [];
    const onErr = (e) => errs.push(String(e && e.message || e));
    page.on('pageerror', onErr);
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
    try {
      await page.goto(pathToFileURL(path.join(here, 'player.html')).href + `?style=${id}&w=${W}&h=${H}&render=1`, { waitUntil: 'load', timeout: 60000 });
      await page.waitForFunction('window.READY || window.READY_ERROR', { timeout: 60000 });
      const bad = await page.evaluate('window.READY_ERROR || null');
      if (bad) throw new Error(bad);
      for (const t of stills) await page.evaluate((tt) => { window.seek(tt); }, t);
      if (errs.length) throw new Error(errs[0]);
    } catch (e) { failed.push(`${id}: ${String((e && e.message) || e).slice(0, 200)}`); }
    page.off('pageerror', onErr);
    process.stdout.write(`\r${ids.indexOf(id) + 1}/${ids.length} ${id}          `);
  }
} finally { await browser.close(); }
console.log(`\n${ids.length - failed.length}/${ids.length} styles OK${portrait ? ' (portrait)' : ''}`);
if (failed.length) { console.log('failed:\n  ' + failed.join('\n  ')); process.exitCode = 1; }
