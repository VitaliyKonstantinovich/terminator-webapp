import { spawn } from 'node:child_process';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repo = 'C:/Users/glebi/Desktop/терминатор - DeepSeek_files/council/webapp';
const evidence = path.join(repo, 'evidence/product_completion_loop5');
const screenshotDir = path.join(evidence, 'screenshots');
const smokeDir = path.join(evidence, 'smoke');
const logsDir = path.join(evidence, 'logs');
await Promise.all([screenshotDir, smokeDir, logsDir].map((dir) => mkdir(dir, { recursive: true })));

const liveRoot = 'https://vitaliykonstantinovich.github.io/terminator-webapp/';
const marker = '20260529-product-loop5-visual-parity-v1';
const cacheMarker = 'terminator-mina-pwa-20260529-product-loop5-visual-parity-v1';

function delay(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

async function fetchText(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.text();
}

async function waitFor(url, timeoutMs = 20000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch {}
    await delay(300);
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
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(`${message.error.message || 'CDP error'} ${JSON.stringify(message.error)}`));
        else resolve(message.result || {});
      } else if (message.method) {
        const handlers = this.events.get(message.method) || [];
        for (const handler of handlers) handler(message.params || {});
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

async function capture(cdp, name, mobile = false) {
  await delay(200);
  const image = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  const out = path.join(screenshotDir, `${name}.png`);
  await writeFile(out, Buffer.from(image.data, 'base64'));
  return out;
}

const html = await fetchText(`${liveRoot}?force=loop5-live-smoke-${Date.now()}`);
const sw = await fetchText(`${liveRoot}sw.js?force=loop5-live-smoke-${Date.now()}`);
const manifest = JSON.parse(await fetchText(`${liveRoot}manifest.webmanifest?force=loop5-live-smoke-${Date.now()}`));

const profile = path.join(repo, 'tmp-chrome-live-loop5');
if (existsSync(profile)) await rm(profile, { recursive: true, force: true });
const debugPort = 9244;
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
    '--disable-background-networking',
    '--window-size=1920,1080',
    `${liveRoot}?force=loop5-live-ui-${Date.now()}`
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  await waitFor(`http://127.0.0.1:${debugPort}/json/version`, 20000);
  const tabs = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const page = tabs.find((item) => item.type === 'page') || tabs[0];
  if (!page) throw new Error('No Chrome page target');
  cdp = new CDP(page.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await Promise.race([cdp.once('Page.loadEventFired'), delay(10000)]);
  await cdp.send('Runtime.evaluate', {
    expression: `new Promise((resolve) => { const check = () => (window.MinaApp && document.readyState !== 'loading') ? resolve(true) : setTimeout(check, 100); check(); })`,
    awaitPromise: true,
    returnByValue: true
  });

  const start = Date.now();
  const evalResult = await cdp.send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `
(async () => {
  const app = window.MinaApp;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const zones = ['head', 'eyes', 'voice', 'memory', 'body', 'hands', 'legs', 'diagnost'];
  const perf = [];
  const measure = async (name, fn) => {
    const started = performance.now();
    const value = await fn();
    perf.push({ name, duration_ms: Math.round(performance.now() - started) });
    return value;
  };

  await measure('menu_open', async () => { app.go('menu', { immediate: true }); await delay(400); });
  const hud = document.querySelector('#screen-menu > .mina-side-hud');
  const viewButton = hud?.querySelector('[data-side-hud-action="open_notifications"]');
  const hudText = hud?.innerText?.replace(/\\s+/g, ' ').trim() || '';
  const sideHud = {
    active_dom: Boolean(hud && getComputedStyle(hud).display !== 'none'),
    left_cards: hud?.querySelectorAll('.mina-side-hud-panel--left .mina-hud-card').length || 0,
    right_cards: hud?.querySelectorAll('.mina-side-hud-panel--right .mina-hud-card').length || 0,
    has_live_date: /\\d{2}\\.\\d{2}\\.\\d{4}/.test(hudText),
    has_status: /Система|Задачи|Память|Связь|Готовность/i.test(hudText),
    view_button: Boolean(viewButton),
    has_static_old_date: hudText.includes('24.05.2025'),
    text: hudText.slice(0, 320)
  };
  app.sideHudNotificationsOpen = false;
  app.renderSideHud();
  document.querySelector('#screen-menu [data-side-hud-action="open_notifications"]')?.click();
  await delay(180);
  sideHud.notifications_opened = Boolean(document.querySelector('#screen-menu .mina-hud-notification-panel'));
  sideHud.notification_text = document.querySelector('#screen-menu .mina-hud-notification-panel')?.innerText?.replace(/\\s+/g, ' ').trim().slice(0, 240) || '';

  await measure('scheme_open', async () => { app.go('scheme', { immediate: true }); await delay(260); });
  const zoneChecks = [];
  for (const zone of zones) {
    const card = document.querySelector('.scheme-zone-card[data-scheme-zone="' + zone + '"]');
    const svg = document.querySelector('.scheme-svg-zone[data-scheme-zone="' + zone + '"]');
    card?.click();
    await delay(80);
    zoneChecks.push({
      zone,
      card: Boolean(card),
      svg: Boolean(svg),
      panel: document.querySelector('.scheme-panel h3')?.innerText || '',
      aria: card?.getAttribute('aria-label') || svg?.getAttribute('aria-label') || ''
    });
  }
  const voiceCircle = document.querySelector('.scheme-svg-zone[data-scheme-zone="voice"] circle');
  const eyesRect = document.querySelector('.scheme-svg-zone[data-scheme-zone="eyes"] rect');
  const schemeBackground = getComputedStyle(document.querySelector('.scheme-silhouette')).backgroundImage || '';
  const scheme = {
    zone_count: zoneChecks.filter((item) => item.card && item.svg && item.panel).length,
    zones: zoneChecks,
    voice_points_to_mouth: voiceCircle?.getAttribute('cx') === '160' && voiceCircle?.getAttribute('cy') === '126',
    eyes_points_to_eyes: eyesRect?.getAttribute('x') === '135' && eyesRect?.getAttribute('y') === '76',
    png_background: /\\.png|url\\(/i.test(schemeBackground)
  };
  const normalModeText = [
    document.querySelector('#screen-menu')?.innerText || '',
    document.querySelector('#screen-scheme')?.innerText || ''
  ].join(' ');

  if (!app.memorySearchState?.records?.some((record) => record.record_id === 'live-loop5-weak-fixture')) {
    app.memorySearchState.records.unshift({
      schema_version: 1,
      record_id: 'live-loop5-weak-fixture',
      type: 'artifact',
      label: 'Артефакт',
      title: 'Контрольная запись слабого совпадения',
      summary: 'Фикстура live smoke для проверки предупреждения слабого совпадения.',
      search_text: 'loop5weakfixture',
      keywords: [],
      refs: {},
      privacy_status: 'safe',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  const impossible = app.runMemorySearch('zzzxxy qqqrrr 918273 impossible-nonsense-live', { persist: false });
  const weak = app.runMemorySearch('loop5weakfixture unmatched', { persist: false });
  const memory = {
    impossible_count: impossible.length,
    impossible_warning: app.memorySearchResultWarning('zzzxxy qqqrrr 918273 impossible-nonsense-live', impossible, app.memorySearchResultQuality(impossible, 4)),
    weak_count: weak.length,
    weak_quality: app.memorySearchResultQuality(weak, 2),
    weak_warning: app.memorySearchResultWarning('loop5weakfixture unmatched', weak, app.memorySearchResultQuality(weak, 2))
  };

  app.go('system', { immediate: true });
  await delay(200);
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

  return JSON.stringify({
    location: location.href,
    app_ready: Boolean(app),
    text_ok: !/(?:\\u0420\\u045E|\\u0420\\u045F|\\u0420 \\u0420\\u00B0|\\u0420\\u045F\\u0421\\u0402)/.test(document.body.innerText || ''),
    no_technical_junk_in_normal: !/RAW STATE|CommandQueue|Durable Object|backend runtime/.test(normalModeText),
    side_hud: sideHud,
    scheme,
    memory,
    emergency_stop: { emergencyActive, stillActiveAfterSafeOff, stillActiveAfterWrongPhrase, resetCleared },
    perf
  });
})()
`
  });
  const ui = JSON.parse(evalResult.result.value);

  await cdp.send('Runtime.evaluate', {
    expression: `
      (async () => {
        window.MinaApp.guardianIncidents = [];
        await window.MinaApp.saveGuardianState({
          safe_mode: false,
          emergency_stop_active: false,
          status: 'active',
          last_event: 'Loop 5 live visual screenshot reset'
        }, { silent: true });
        window.MinaApp.go('menu', { immediate: true });
        window.MinaApp.sideHudNotificationsOpen = false;
        window.MinaApp.renderSideHud();
        window.MinaApp.toastTimer && clearTimeout(window.MinaApp.toastTimer);
        document.getElementById('toast')?.classList.remove('visible');
        return true;
      })()
    `,
    awaitPromise: true,
    returnByValue: true
  });
  const liveMainMenu = await capture(cdp, 'live_main_menu_side_hud');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('#screen-menu [data-side-hud-action="open_notifications"]')?.click();`, returnByValue: true });
  const liveNotifications = await capture(cdp, 'live_notifications_opened');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('scheme', { immediate: true });`, returnByValue: true });
  const liveSchemeDefault = await capture(cdp, 'live_scheme_default');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="head"]')?.click();`, returnByValue: true });
  const liveSchemeHead = await capture(cdp, 'live_scheme_head');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="voice"]')?.click();`, returnByValue: true });
  const liveSchemeVoice = await capture(cdp, 'live_scheme_voice');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="hands"]')?.click();`, returnByValue: true });
  const liveSchemeHands = await capture(cdp, 'live_scheme_hands');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="diagnost"]')?.click();`, returnByValue: true });
  const liveSchemeDiagnost = await capture(cdp, 'live_scheme_diagnost');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="memory"]')?.click();`, returnByValue: true });
  const liveMemorySearch = await capture(cdp, 'live_memory_search');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('system', { immediate: true });`, returnByValue: true });
  const liveDiagnost = await capture(cdp, 'live_diagnost');

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 950, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Page.navigate', { url: `${liveRoot}?force=loop5-live-mobile-390-${Date.now()}` });
  await Promise.race([cdp.once('Page.loadEventFired'), delay(10000)]);
  await cdp.send('Runtime.evaluate', {
    expression: `new Promise((resolve) => { const check = () => (window.MinaApp && document.readyState !== 'loading') ? resolve(true) : setTimeout(check, 100); check(); })`,
    awaitPromise: true,
    returnByValue: true
  });
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('menu', { immediate: true });`, returnByValue: true });
  const mobile390MainEval = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `JSON.stringify({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, no_horizontal_overflow: document.documentElement.scrollWidth <= innerWidth + 1 })`
  });
  const mobile390Main = JSON.parse(mobile390MainEval.result.value);
  const liveMobile390Main = await capture(cdp, 'live_mobile_390_main', true);
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('scheme', { immediate: true });`, returnByValue: true });
  const mobile390SchemeEval = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `JSON.stringify({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, no_horizontal_overflow: document.documentElement.scrollWidth <= innerWidth + 1, schemeVisible: Boolean(document.querySelector('#screen-scheme.active')) })`
  });
  const mobile390Scheme = JSON.parse(mobile390SchemeEval.result.value);
  const liveMobile390Scheme = await capture(cdp, 'live_mobile_390_scheme', true);

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 430, height: 950, deviceScaleFactor: 1, mobile: true });
  await delay(200);
  const mobile430Eval = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `JSON.stringify({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, no_horizontal_overflow: document.documentElement.scrollWidth <= innerWidth + 1 })`
  });
  const mobile430 = JSON.parse(mobile430Eval.result.value);

  const status = (
    html.includes(marker)
    && sw.includes(cacheMarker)
    && manifest.name === 'Terminator Mina UI'
    && ui.app_ready
    && ui.text_ok
    && ui.side_hud.active_dom
    && ui.side_hud.left_cards >= 3
    && ui.side_hud.right_cards >= 4
    && ui.side_hud.view_button
    && ui.side_hud.notifications_opened
    && ui.scheme.zone_count === 8
    && ui.scheme.voice_points_to_mouth
    && ui.scheme.eyes_points_to_eyes
    && !ui.scheme.png_background
    && ui.memory.impossible_count === 0
    && ui.memory.weak_quality === 'weak'
    && ui.memory.weak_warning
    && ui.emergency_stop.emergencyActive
    && ui.emergency_stop.stillActiveAfterSafeOff
    && ui.emergency_stop.stillActiveAfterWrongPhrase
    && ui.emergency_stop.resetCleared
    && mobile390Main.no_horizontal_overflow
    && mobile390Scheme.no_horizontal_overflow
    && mobile430.no_horizontal_overflow
  ) ? 'PASS' : 'PARTIAL';

  const result = {
    checked_at: new Date().toISOString(),
    live_url: liveRoot,
    marker,
    cache_marker: cacheMarker,
    html_marker: html.includes(marker),
    sw_marker: sw.includes(cacheMarker),
    manifest_ok: manifest.name === 'Terminator Mina UI' && manifest.display === 'standalone',
    chrome_cold_start_to_ready_ms: Date.now() - start,
    ui,
    mobile: { mobile390Main, mobile390Scheme, mobile430 },
    screenshots: {
      live_main_menu_side_hud: liveMainMenu,
      live_notifications_opened: liveNotifications,
      live_scheme_default: liveSchemeDefault,
      live_scheme_head: liveSchemeHead,
      live_scheme_voice: liveSchemeVoice,
      live_scheme_hands: liveSchemeHands,
      live_scheme_diagnost: liveSchemeDiagnost,
      live_memory_search: liveMemorySearch,
      live_diagnost: liveDiagnost,
      live_mobile_390_main: liveMobile390Main,
      live_mobile_390_scheme: liveMobile390Scheme
    },
    status
  };
  await writeFile(path.join(smokeDir, 'live_loop5_smoke.json'), JSON.stringify(result, null, 2), 'utf8');
  console.log(JSON.stringify(result, null, 2));
} finally {
  if (cdp) cdp.close();
  if (chrome) chrome.kill();
}

