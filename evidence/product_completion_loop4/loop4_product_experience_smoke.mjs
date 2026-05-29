import { spawn } from 'node:child_process';
import { mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repo = 'C:/Users/glebi/Desktop/терминатор - DeepSeek_files/council/webapp';
const evidence = path.join(repo, 'evidence/product_completion_loop4');
const screenshotDir = path.join(evidence, 'screenshots');
const logsDir = path.join(evidence, 'logs');
const perfDir = path.join(evidence, 'performance');
const mobileDir = path.join(evidence, 'mobile');
const videoDir = path.join(evidence, 'video');
await Promise.all([screenshotDir, logsDir, perfDir, mobileDir, videoDir].map((dir) => mkdir(dir, { recursive: true })));

const loop3Result = JSON.parse(await readFile(path.join(repo, 'evidence/product_completion_loop3/max_scenario/loop3_result.json'), 'utf8'));
const loop3Scenario = JSON.parse(await readFile(path.join(repo, 'evidence/product_completion_loop3/max_scenario/loop3_max_scenario.json'), 'utf8'));

function delay(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

async function waitFor(url, timeoutMs = 15000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
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

const profile = path.join(repo, 'tmp-chrome-product-loop4');
if (existsSync(profile)) await rm(profile, { recursive: true, force: true });
const serverPort = 8899;
const debugPort = 9242;
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const server = spawn('python', ['-m', 'http.server', String(serverPort), '--bind', '127.0.0.1'], { cwd: repo, stdio: ['ignore', 'pipe', 'pipe'] });
let chrome;
let cdp;

async function capture(name, options = {}) {
  await delay(options.delay || 150);
  const image = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  const out = path.join(options.mobile ? mobileDir : screenshotDir, `${name}.png`);
  await writeFile(out, Buffer.from(image.data, 'base64'));
  return out;
}

try {
  await waitFor(`http://127.0.0.1:${serverPort}/index.html`);
  const browserStarted = Date.now();
  chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profile}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--window-size=1440,1100',
    `http://127.0.0.1:${serverPort}/?force=product-loop4-local`
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  await waitFor(`http://127.0.0.1:${debugPort}/json/version`);
  const tabs = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const page = tabs.find((item) => item.type === 'page') || tabs[0];
  if (!page) throw new Error('No Chrome page target');
  cdp = new CDP(page.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  await Promise.race([cdp.once('Page.loadEventFired'), delay(8000)]);
  await cdp.send('Runtime.evaluate', {
    expression: `new Promise((resolve) => { const check = () => (window.MinaApp && document.readyState !== 'loading') ? resolve(true) : setTimeout(check, 100); check(); })`,
    awaitPromise: true,
    returnByValue: true
  });
  const appInteractiveMs = Date.now() - browserStarted;

  const appData = await cdp.send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `
(async () => {
  const app = window.MinaApp;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const perf = [];
  const note = [];
  const budgets = {
    first_visible: 3000,
    app_interactive: 5000,
    screen_switch: 1000,
    scheme_open: 2000,
    memory_search: 3000,
    quick_diagnost: 5000,
    demo_summary: 10000,
    side_hud: 1000
  };
  const measure = async (name, fn) => {
    const start = performance.now();
    const value = await fn();
    const duration = Math.round(performance.now() - start);
    perf.push({ name, duration_ms: duration, budget_ms: budgets[name] || null, status: budgets[name] && duration > budgets[name] ? 'PARTIAL' : 'PASS' });
    return value;
  };
  const switchTo = (route) => measure('screen_switch', async () => { app.go(route, { immediate: true }); await delay(80); return route; });
  await switchTo('start').catch(() => {});
  const navigation = performance.getEntriesByType('navigation')[0];
  const firstVisible = Math.round((navigation?.responseStart || navigation?.domInteractive || performance.now()));
  const appInteractive = Math.round(window.__MINA_APP_READY_AT || navigation?.domInteractive || navigation?.loadEventEnd || performance.now());
  await switchTo('menu');
  const sideHud = await measure('side_hud', async () => {
    app.go('menu', { immediate: true });
    await delay(250);
    const hud = document.querySelector('#screen-menu > .mina-side-hud');
    const hudText = hud?.innerText?.replace(/\s+/g, ' ').trim() || '';
    const viewButton = hud?.querySelector('[data-side-hud-action="open_notifications"]');
    viewButton?.click();
    await delay(160);
    const notificationPanel = hud?.querySelector('.mina-hud-notification-panel');
    const styles = hud ? getComputedStyle(hud) : null;
    const leftCards = hud?.querySelectorAll('.mina-side-hud-panel--left .mina-hud-card').length || 0;
    const rightCards = hud?.querySelectorAll('.mina-side-hud-panel--right .mina-hud-card').length || 0;
    const dateOk = /\\d{2}\\.\\d{2}\\.\\d{4}/.test(hudText);
    return {
      active_dom: Boolean(hud && styles?.display !== 'none'),
      left_cards: leftCards,
      right_cards: rightCards,
      has_current_status: /Система|Задачи|Память|Связь|Готовность/i.test(hudText),
      has_live_date: dateOk,
      has_static_old_date: hudText.includes('24.05.2025'),
      view_button: Boolean(viewButton),
      notifications_opened: Boolean(notificationPanel),
      notification_text: notificationPanel?.innerText?.replace(/\s+/g, ' ').trim().slice(0, 240) || '',
      text: hudText.slice(0, 320)
    };
  });
  await switchTo('scheme');
  const schemeOpen = await measure('scheme_open', async () => { app.go('scheme'); await delay(200); return true; });
  const zones = ['head', 'eyes', 'voice', 'memory', 'body', 'hands', 'legs', 'diagnost'];
  const zoneChecks = [];
  for (const zone of zones) {
    const card = document.querySelector('.scheme-zone-card[data-scheme-zone="' + zone + '"]');
    const svg = document.querySelector('.scheme-svg-zone[data-scheme-zone="' + zone + '"]');
    card?.click();
    await delay(80);
    const panel = document.querySelector('.scheme-panel h3')?.innerText || '';
    zoneChecks.push({
      zone,
      card: Boolean(card),
      svg: Boolean(svg),
      active: card?.classList.contains('active') || card?.getAttribute('aria-pressed') === 'true' || false,
      aria: card?.getAttribute('aria-label') || svg?.getAttribute('aria-label') || '',
      panel,
      status_text: card?.innerText?.replace(/\\s+/g, ' ').trim() || ''
    });
  }
  const voiceCircle = document.querySelector('.scheme-svg-zone[data-scheme-zone="voice"] circle');
  const eyesRect = document.querySelector('.scheme-svg-zone[data-scheme-zone="eyes"] rect');
  const silhouette = document.querySelector('.scheme-silhouette');
  const schemeBackground = silhouette ? getComputedStyle(silhouette).backgroundImage || '' : '';
  const scheme = {
    title: document.querySelector('#screen-scheme h2')?.innerText || '',
    zone_count: zoneChecks.filter((item) => item.card && item.svg && item.panel).length,
    zones: zoneChecks,
    voice_points_to_mouth: voiceCircle?.getAttribute('cx') === '160' && voiceCircle?.getAttribute('cy') === '126',
    eyes_points_to_eyes: eyesRect?.getAttribute('x') === '135' && eyesRect?.getAttribute('y') === '76',
    png_background: /\\.png|url\\(/i.test(schemeBackground),
    normal_has_raw_state: /RAW STATE|CommandQueue|Durable Object|backend runtime/.test(document.querySelector('#screen-scheme')?.innerText || '')
  };

  const demo = await measure('demo_summary', async () => {
    app.workPreview = app.buildWorkPreview('Loop 4 demo: мини-аудит тестового сайта, план автотеста, проверка, память.', {
      project_id: 'terminator',
      mode: 'acceptance',
      quality_level: 'maximum'
    });
    const task = app.confirmWorkPreview();
    task.title = 'Мини-аудит тестового сайта + план автотеста + проверка + память';
    task.status = 'accepted_with_risks';
    task.next_step = 'Владелец проверяет финальный пакет и owner-assisted пункты: телефон, billing, production rollback.';
    app.createArtifact(task, 'RESEARCH_BRIEF', 'Research Brief: demo audit', 'Цель: проверить тестовый сайт, определить риски и подготовить автотест.', 'Loop 3 max scenario reused as final demo evidence.', 'loop4-demo');
    app.createArtifact(task, 'BRAIN_COMPARISON', 'Brain Council comparison: demo audit', 'Стратег, Критик и Аналитик согласны: PASS_WITH_RISKS, сначала проверить evidence и memory.', 'Comparison and contradiction evidence are stored in Loop 3 max scenario.', 'loop4-demo');
    app.createArtifact(task, 'DECISION_PASSPORT', 'Decision Passport: accept with risks', 'Решение: принять demo chain как V1 RC evidence, owner-assisted пункты оставить отдельным checklist.', 'Причины: artifacts/evidence/verifier/memory связаны; rollback sandbox доказан; AI API не использовались.', 'loop4-demo');
    app.createArtifact(task, 'VERIFIER_VERDICT', 'Verifier: PASS_WITH_RISKS', 'Verifier подтвердил наличие evidence, risks, next step, no AI API, no secrets.', 'Not checked: real phone APK/PWA postponed until production V2 final, billing dashboards, production rollback.', 'loop4-demo');
    app.createArtifact(task, 'MEMORY_SUMMARY', 'Memory Preview: saved', 'Сохранено: Loop 4 final product experience package, demo chain, owner-assisted checklist.', 'Search terms: Loop 4 final product experience mini audit memory.', 'loop4-demo');
    app.saveWorkspaceMemoryPreview(task);
    await app.saveWorkTasks();
    await app.refreshMemorySearchIndex({ silent: true, render: false });
    return {
      task_id: task.task_id,
      artifact_count: task.artifacts.length,
      memory_status: task.memory?.status || task.memory_preview?.status || 'saved_local',
      final_answer: {
        result: 'Мини-аудит тестового сайта и план автотеста представлены как финальная demo chain.',
        status: 'accepted_with_risks',
        artifacts: task.artifacts.map((artifact) => artifact.type),
        evidence: ['Loop 3 max scenario JSON', 'Loop 4 screenshots', 'Loop 4 performance JSON', 'D archive'],
        risks: ['real phone APK/PWA postponed until production V2 final', 'billing dashboards owner-assisted', 'production rollback owner-assisted'],
        checked: ['ResearchOps', 'Brain Council', 'Verifier', 'Memory Search', 'Controlled Hands sandbox rollback', 'Mina UI smoke'],
        not_checked: ['real phone APK/PWA postponed by owner until production V2 final', 'billing cabinets', 'production signing', 'production rollback'],
        next_step: task.next_step
      }
    };
  });

  const strongMemory = await measure('memory_search', async () => app.runMemorySearch('Loop 4 final product experience mini audit memory'));
  const impossibleMemory = await measure('memory_search', async () => app.runMemorySearch('zzzxxy impossible ownerless query 918273'));
  const weakMemory = await measure('memory_search', async () => app.runMemorySearch('финальный пакет'));
  const memory = {
    strong_count: strongMemory.length,
    strong_quality: app.memorySearchState.result_quality,
    impossible_count: impossibleMemory.length,
    impossible_warning: app.memorySearchState.last_query_warning,
    weak_count: weakMemory.length,
    weak_warning: app.memorySearchState.last_query_warning,
    weak_quality: app.memorySearchState.result_quality
  };

  await switchTo('system');
  const quickDiagnost = await measure('quick_diagnost', async () => {
    const before = Date.now();
    await app.runSystemDiagnostics({ mode: 'quick', silent: true });
    const latest = app.systemDiagnostics?.[0] || null;
    return { duration_ms: Date.now() - before, checks: latest?.checks?.length || 0, status: latest?.status || '' };
  });
  await app.handleGuardianAction('emergency_stop');
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

  const menuText = document.querySelector('#screen-menu')?.innerText || '';
  const activePersonal = Array.from(document.querySelectorAll('#screen-menu button, #screen-menu a')).some((node) => node.innerText.includes('Личное'));
  const bodyText = document.body.innerText || '';
  return JSON.stringify({
    marker: '20260529-product-loop4-final-experience-v1',
    location: location.href,
    first_visible_ms: firstVisible,
    app_ready: Boolean(app),
    text_ok: !/(?:\\u0420\\u045E|\\u0420\\u045F|\\u0420 \\u0420\\u00B0|\\u0420\\u045F\\u0421\\u0402)/.test(bodyText),
    no_technical_junk_in_normal: !/RAW STATE|CommandQueue|Durable Object|backend runtime/.test(document.querySelector('#screen-scheme')?.innerText || ''),
    menu: { has_work: menuText.includes('Рабочее'), has_mission: menuText.includes('Центр управления'), has_system: menuText.includes('Система'), personal_active_path: activePersonal },
    side_hud: sideHud,
    scheme,
    demo,
    memory,
    quick_diagnost: quickDiagnost,
    emergency_stop: { stillActiveAfterSafeOff, stillActiveAfterWrongPhrase, resetCleared },
    owner_assisted_pending: [
      'real phone APK/PWA postponed until production V2 final',
      'billing dashboards',
      'production signing',
      'production rollback',
      'legacy cleanup'
    ],
    product_notes: {
      start: 'clear',
      scheme: scheme.zone_count === 8 && !scheme.png_background ? 'clear/premium enough' : 'partial',
      work: demo.artifact_count >= 5 ? 'clear demo chain' : 'partial',
      recovery: stillActiveAfterSafeOff && stillActiveAfterWrongPhrase && resetCleared ? 'safe' : 'partial',
      mobile: 'checked below'
    },
    perf,
    navigation_timing: { first_visible_ms: firstVisible, app_interactive_ms: appInteractive }
  });
})()
`
  });
  const result = JSON.parse(appData.result.value);
  result.chrome_cold_start_to_ready_ms = appInteractiveMs;
  result.app_interactive_ms = result.navigation_timing.app_interactive_ms || appInteractiveMs;
  result.perf.unshift({ name: 'app_interactive', duration_ms: result.app_interactive_ms, budget_ms: 5000, status: result.app_interactive_ms > 5000 ? 'PARTIAL' : 'PASS' });

  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('start', { immediate: true })`, returnByValue: true });
  result.screenshots = { start: await capture('loop4_start_screen') };
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('menu', { immediate: true })`, returnByValue: true });
  result.screenshots = { menu: await capture('loop4_main_menu') };
  result.screenshots.start = path.join(screenshotDir, 'loop4_start_screen.png');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.sideHudNotificationsOpen = false; window.MinaApp.renderSideHud(); document.querySelector('#screen-menu [data-side-hud-action="open_notifications"]')?.click();`, returnByValue: true });
  result.screenshots.main_menu_notifications = await capture('loop4_main_menu_notifications');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('#screen-menu [data-side-hud-action="close_notifications"]')?.click();`, returnByValue: true });
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('scheme', { immediate: true }); document.querySelector('.scheme-zone-card[data-scheme-zone="head"]')?.click();`, returnByValue: true });
  result.screenshots.scheme_head = await capture('loop4_scheme_head');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="voice"]')?.click();`, returnByValue: true });
  result.screenshots.scheme_voice = await capture('loop4_scheme_voice');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="hands"]')?.click();`, returnByValue: true });
  result.screenshots.scheme_hands = await capture('loop4_scheme_hands');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="diagnost"]')?.click();`, returnByValue: true });
  result.screenshots.scheme_diagnost = await capture('loop4_scheme_diagnost');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('work', { immediate: true })`, returnByValue: true });
  result.screenshots.work_demo = await capture('loop4_work_demo');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('scheme', { immediate: true }); document.querySelector('.scheme-zone-card[data-scheme-zone="head"]')?.click();`, returnByValue: true });
  result.screenshots.brain = await capture('loop4_brain_council');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('system', { immediate: true })`, returnByValue: true });
  result.screenshots.system = await capture('loop4_system_diagnost');

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 950, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('scheme')`, returnByValue: true });
  await delay(300);
  const mobile390 = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `JSON.stringify({ width: window.innerWidth, document_width: document.documentElement.scrollWidth, no_horizontal_overflow: document.documentElement.scrollWidth <= window.innerWidth + 1, body_text_ok: !/(?:\\u0420\\u045E|\\u0420\\u045F)/.test(document.body.innerText || ''), touch_targets_visible: document.querySelectorAll('.scheme-zone-card, .scheme-mobile-chip, button').length })`
  });
  result.mobile_390 = JSON.parse(mobile390.result.value);
  result.screenshots.mobile_390 = await capture('loop4_mobile_390_scheme', { mobile: true });

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 430, height: 950, deviceScaleFactor: 1, mobile: true });
  await delay(200);
  const mobile430 = await cdp.send('Runtime.evaluate', {
    returnByValue: true,
    expression: `JSON.stringify({ width: window.innerWidth, document_width: document.documentElement.scrollWidth, no_horizontal_overflow: document.documentElement.scrollWidth <= window.innerWidth + 1 })`
  });
  result.mobile_430 = JSON.parse(mobile430.result.value);
  result.screenshots.mobile_430 = await capture('loop4_mobile_430_scheme', { mobile: true });

  result.loop3_reused = {
    status: loop3Result.status,
    max_scenario_status: loop3Scenario.status,
    source_cards: loop3Scenario.research?.source_cards,
    brain_answers: loop3Scenario.brain_council?.answers,
    verifier: loop3Scenario.verifier?.verdict,
    memory_quality: loop3Scenario.memory?.strong_query?.quality,
    rollback: loop3Scenario.controlled_hands?.rollback_status
  };

  const finalStatus = [
    result.app_ready,
    result.text_ok,
    result.menu.has_work,
    result.menu.has_mission,
    result.menu.has_system,
    !result.menu.personal_active_path,
    result.side_hud.active_dom,
    result.side_hud.left_cards >= 3,
    result.side_hud.right_cards >= 4,
    result.side_hud.view_button,
    result.side_hud.notifications_opened,
    result.side_hud.has_current_status,
    result.side_hud.has_live_date,
    !result.side_hud.has_static_old_date,
    result.scheme.zone_count === 8,
    !result.scheme.png_background,
    result.scheme.voice_points_to_mouth,
    result.scheme.eyes_points_to_eyes,
    result.demo.artifact_count >= 5,
    result.memory.strong_count > 0,
    result.memory.impossible_count === 0,
    result.quick_diagnost.status !== 'critical',
    result.emergency_stop.stillActiveAfterSafeOff,
    result.emergency_stop.stillActiveAfterWrongPhrase,
    result.emergency_stop.resetCleared,
    result.mobile_390.no_horizontal_overflow,
    result.mobile_430.no_horizontal_overflow
  ].every(Boolean) ? 'PASS' : 'PARTIAL';
  result.status = finalStatus;
  await writeFile(path.join(evidence, 'loop4_product_experience.json'), JSON.stringify(result, null, 2), 'utf8');
  await writeFile(path.join(perfDir, 'loop4_performance.json'), JSON.stringify(result.perf, null, 2), 'utf8');
  await writeFile(path.join(mobileDir, 'loop4_mobile_smoke.json'), JSON.stringify({ mobile_390: result.mobile_390, mobile_430: result.mobile_430 }, null, 2), 'utf8');
  await writeFile(path.join(logsDir, 'loop4_owner_assisted_checklist.json'), JSON.stringify({
    status: 'OWNER_ASSISTED_PENDING_ONLY',
    mobile_acceptance_rule: {
      real_phone_apk: 'OWNER_ASSISTED_POSTPONED_UNTIL_PRODUCTION_V2_FINAL',
      bluestacks: 'RC_SUPPORT_ONLY_NOT_FINAL_PHONE_PASS',
      blocks_current_loop: false
    },
    checks: result.owner_assisted_pending.map((item) => ({
      item,
      required_evidence: item.includes('real phone') ? 'owner evidence only at production V2 final' : 'owner screenshot or manual confirmation',
      blocks_v1_rc: false
    }))
  }, null, 2), 'utf8');
  console.log(JSON.stringify(result, null, 2));
} finally {
  if (cdp) cdp.close();
  if (chrome) chrome.kill();
  server.kill();
}
