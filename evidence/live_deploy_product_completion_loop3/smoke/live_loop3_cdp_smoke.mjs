import { spawn } from 'node:child_process';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repo = 'C:/Users/glebi/Desktop/терминатор - DeepSeek_files/council/webapp';
const evidence = path.join(repo, 'evidence/live_deploy_product_completion_loop3');
const screenshotDir = path.join(evidence, 'screenshots');
const smokeDir = path.join(evidence, 'smoke');
const logsDir = path.join(evidence, 'logs');
await mkdir(screenshotDir, { recursive: true });
await mkdir(smokeDir, { recursive: true });
await mkdir(logsDir, { recursive: true });

const liveRoot = 'https://vitaliykonstantinovich.github.io/terminator-webapp/';
const marker = '20260529-product-loop3-max-scenario-v1';
const cacheMarker = 'terminator-mina-pwa-20260529-product-loop3-max-scenario-v1';

function delay(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

async function fetchText(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.text();
}

async function waitFor(url, timeoutMs = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
    } catch {}
    await delay(250);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class CDP {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();
    this.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`${msg.error.message || 'CDP error'} ${JSON.stringify(msg.error)}`));
        else resolve(msg.result || {});
      } else if (msg.method) {
        const handlers = this.events.get(msg.method) || [];
        for (const handler of handlers) handler(msg.params || {});
      }
    });
  }

  async open() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('WebSocket open timeout')), 15000);
      this.ws.addEventListener('open', () => { clearTimeout(timer); resolve(); }, { once: true });
      this.ws.addEventListener('error', (error) => { clearTimeout(timer); reject(error); }, { once: true });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 30000);
    });
  }

  once(method) {
    return new Promise((resolve) => {
      const list = this.events.get(method) || [];
      const handler = (params) => {
        this.events.set(method, (this.events.get(method) || []).filter((item) => item !== handler));
        resolve(params);
      };
      list.push(handler);
      this.events.set(method, list);
    });
  }

  close() { try { this.ws.close(); } catch {} }
}

const html = await fetchText(`${liveRoot}?force=loop3-live-smoke-${Date.now()}`);
const sw = await fetchText(`${liveRoot}sw.js?force=loop3-live-smoke-${Date.now()}`);
const manifest = JSON.parse(await fetchText(`${liveRoot}manifest.webmanifest?force=loop3-live-smoke-${Date.now()}`));

const profile = path.join(repo, 'tmp-chrome-live-loop3');
if (existsSync(profile)) await rm(profile, { recursive: true, force: true });
const debugPort = 9241;
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
let chrome;
let cdp;
try {
  chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profile}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,1100',
    `${liveRoot}?force=loop3-live-ui-${Date.now()}`
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  await waitFor(`http://127.0.0.1:${debugPort}/json/version`, 15000);
  const tabs = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const page = tabs.find((item) => item.type === 'page') || tabs[0];
  if (!page) throw new Error('No Chrome page target');
  cdp = new CDP(page.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await Promise.race([cdp.once('Page.loadEventFired'), delay(8000)]);
  await cdp.send('Runtime.evaluate', {
    expression: `new Promise((resolve) => { const check = () => (window.MinaApp && document.readyState !== 'loading') ? resolve(true) : setTimeout(check, 100); check(); })`,
    awaitPromise: true,
    returnByValue: true
  });

  const smokeExpression = `
(async () => {
  const app = window.MinaApp;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const zones = ['head', 'eyes', 'voice', 'memory', 'body', 'hands', 'legs', 'diagnost'];

  app.go('scheme');
  await delay(100);
  const zoneChecks = [];
  for (const zone of zones) {
    const card = document.querySelector('.scheme-zone-card[data-scheme-zone="' + zone + '"]');
    const svg = document.querySelector('.scheme-svg-zone[data-scheme-zone="' + zone + '"]');
    if (card) card.click();
    await delay(80);
    zoneChecks.push({
      zone,
      card: Boolean(card),
      svg: Boolean(svg),
      active: document.querySelector('.scheme-zone-card[data-scheme-zone="' + zone + '"]')?.classList.contains('active') || false,
      aria: card?.getAttribute('aria-label') || svg?.getAttribute('aria-label') || '',
      panel: document.querySelector('.scheme-panel h3')?.innerText || ''
    });
  }

  const voiceCircle = document.querySelector('.scheme-svg-zone[data-scheme-zone="voice"] circle');
  const eyesRect = document.querySelector('.scheme-svg-zone[data-scheme-zone="eyes"] rect');
  const schemeSilhouetteStyle = getComputedStyle(document.querySelector('.scheme-silhouette'));
  const schemeBackground = schemeSilhouetteStyle.backgroundImage || '';
  const schemePngBackground = /\\.png|url\\(/i.test(schemeBackground);

  const impossible = app.runMemorySearch('zzzxxy qqqrrr 918273 impossible-nonsense-live');
  const memory = {
    impossible_count: impossible.length,
    warning: app.memorySearchState.last_query_warning || '',
    quality: app.memorySearchState.result_quality || ''
  };

  app.go('system');
  await delay(100);
  await app.handleGuardianAction('emergency_stop');
  const emergencyActive = app.guardianState?.emergency_stop_active === true;
  await app.handleGuardianAction('safe_mode_off');
  const stillActiveAfterSafeOff = app.guardianState?.emergency_stop_active === true;
  let input = document.getElementById('guardian-emergency-reset-phrase');
  if (input) input.value = 'WRONG';
  await app.handleGuardianAction('reset_emergency_stop');
  const stillActiveAfterWrongPhrase = app.guardianState?.emergency_stop_active === true;
  input = document.getElementById('guardian-emergency-reset-phrase');
  if (input) input.value = 'RESET EMERGENCY STOP';
  await app.handleGuardianAction('reset_emergency_stop');
  const resetCleared = app.guardianState?.emergency_stop_active === false;
  const guardianEvents = app.readJsonStorage('mina_guardian_events_v1', []).slice(0, 6).map((event) => event.type);

  return JSON.stringify({
    location: window.location.href,
    app_ready: Boolean(app),
    text_ok: !/(?:\\u0420\\u045E|\\u0420\\u045F|\\u0420 \\u0420\\u00B0|\\u0420\\u045F\\u0421\\u0402)/.test(document.body.innerText || ''),
    scheme: {
      title: document.querySelector('#screen-scheme h2')?.innerText || '',
      zones: zoneChecks,
      zone_count: zoneChecks.filter((item) => item.card && item.svg && item.active).length,
      voice_points_to_mouth: voiceCircle?.getAttribute('cx') === '160' && voiceCircle?.getAttribute('cy') === '126',
      eyes_points_to_eyes: eyesRect?.getAttribute('x') === '135' && eyesRect?.getAttribute('y') === '76',
      png_background: schemePngBackground
    },
    memory,
    emergency_stop: {
      emergencyActive,
      stillActiveAfterSafeOff,
      stillActiveAfterWrongPhrase,
      resetCleared,
      guardianEvents
    }
  });
})()
`;
  const smokeResult = await cdp.send('Runtime.evaluate', {
    expression: smokeExpression,
    awaitPromise: true,
    returnByValue: true
  });
  const uiSmoke = JSON.parse(smokeResult.result.value);

  const desktopShot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  await writeFile(path.join(screenshotDir, 'live_loop3_scheme_desktop.png'), Buffer.from(desktopShot.data, 'base64'));

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 950, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Page.navigate', { url: `${liveRoot}?force=loop3-live-mobile-${Date.now()}` });
  await Promise.race([cdp.once('Page.loadEventFired'), delay(8000)]);
  await cdp.send('Runtime.evaluate', {
    expression: `new Promise((resolve) => { const check = () => (window.MinaApp && document.readyState !== 'loading') ? resolve(true) : setTimeout(check, 100); check(); })`,
    awaitPromise: true,
    returnByValue: true
  });
  const mobileEval = await cdp.send('Runtime.evaluate', {
    expression: `(async () => { window.MinaApp.go('scheme'); await new Promise((r) => setTimeout(r, 120)); return JSON.stringify({ width: window.innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > window.innerWidth, title: document.querySelector('#screen-scheme h2')?.innerText || '' }); })()`,
    awaitPromise: true,
    returnByValue: true
  });
  const mobile390 = JSON.parse(mobileEval.result.value);
  const mobileShot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  await writeFile(path.join(screenshotDir, 'live_loop3_scheme_mobile_390.png'), Buffer.from(mobileShot.data, 'base64'));

  const result = {
    checked_at: new Date().toISOString(),
    live_url: liveRoot,
    marker,
    html_marker: html.includes(marker),
    sw_marker: sw.includes(cacheMarker),
    manifest_ok: manifest.name === 'Terminator Mina UI' && manifest.display === 'standalone',
    ui: uiSmoke,
    mobile390,
    screenshots: {
      desktop: path.join(screenshotDir, 'live_loop3_scheme_desktop.png'),
      mobile390: path.join(screenshotDir, 'live_loop3_scheme_mobile_390.png')
    },
    status: (
      html.includes(marker)
      && sw.includes(cacheMarker)
      && manifest.name === 'Terminator Mina UI'
      && uiSmoke.app_ready
      && uiSmoke.scheme.zone_count === 8
      && uiSmoke.scheme.voice_points_to_mouth
      && uiSmoke.scheme.eyes_points_to_eyes
      && !uiSmoke.scheme.png_background
      && uiSmoke.memory.impossible_count === 0
      && uiSmoke.emergency_stop.emergencyActive
      && uiSmoke.emergency_stop.stillActiveAfterSafeOff
      && uiSmoke.emergency_stop.stillActiveAfterWrongPhrase
      && uiSmoke.emergency_stop.resetCleared
      && !mobile390.overflow
    ) ? 'PASS' : 'PARTIAL'
  };
  await writeFile(path.join(smokeDir, 'live_loop3_smoke.json'), JSON.stringify(result, null, 2), 'utf8');
  console.log(JSON.stringify(result, null, 2));
} finally {
  if (cdp) cdp.close();
  if (chrome) chrome.kill();
}


