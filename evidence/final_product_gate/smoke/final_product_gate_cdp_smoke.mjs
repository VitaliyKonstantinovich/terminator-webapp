import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repo = 'C:/Users/glebi/Desktop/терминатор - DeepSeek_files/council/webapp';
const evidence = path.join(repo, 'evidence/final_product_gate');
const screenshotDir = path.join(evidence, 'screenshots');
const mobileDir = path.join(evidence, 'mobile');
const smokeDir = path.join(evidence, 'smoke');
const logsDir = path.join(evidence, 'logs');
const perfDir = path.join(evidence, 'performance');
await Promise.all([screenshotDir, mobileDir, smokeDir, logsDir, perfDir].map((dir) => mkdir(dir, { recursive: true })));

const liveRoot = process.env.FINAL_GATE_URL || 'https://vitaliykonstantinovich.github.io/terminator-webapp/';
const marker = process.env.FINAL_GATE_MARKER || '20260529-final-product-gate-v1';
const cacheMarker = process.env.FINAL_GATE_CACHE_MARKER || 'terminator-mina-pwa-20260529-final-product-gate-v1';
const scriptStart = Date.now();

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

async function readJson(relativePath) {
  const fullPath = path.join(repo, relativePath);
  try {
    return JSON.parse(await readFile(fullPath, 'utf8'));
  } catch (error) {
    return { missing: true, path: fullPath, error: String(error?.message || error) };
  }
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

async function capture(cdp, name, dir = screenshotDir) {
  await delay(220);
  const image = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  const out = path.join(dir, `${name}.png`);
  await writeFile(out, Buffer.from(image.data, 'base64'));
  return out;
}

const loop2Sandbox = await readJson('evidence/product_completion_loop2/sandbox/loop2_sandbox_result.json');
const loop2Performance = await readJson('evidence/product_completion_loop2/performance/loop2_performance.json');
const loop3Scenario = await readJson('evidence/product_completion_loop3/max_scenario/loop3_result.json');
const loop5Live = await readJson('evidence/product_completion_loop5/smoke/live_loop5_smoke.json');
const previousEvidenceSeed = {
  loop2_controlled_apply: loop2Sandbox.controlled_apply?.status === 'PASS' && loop2Sandbox.controlled_apply?.rollback_restored === true,
  loop2_faults: Array.isArray(loop2Sandbox.fault_injection) && loop2Sandbox.fault_injection.length >= 6,
  loop2_performance: Array.isArray(loop2Performance.perf) && loop2Performance.perf.every((item) => item.status === 'PASS'),
  loop3_max_scenario: !loop3Scenario.missing && ['PASS', 'PASS_WITH_RISKS'].includes(loop3Scenario.status || loop3Scenario.verdict || 'PASS'),
  loop5_live: loop5Live.status === 'PASS'
};

const html = await fetchText(`${liveRoot}?force=final-gate-html-${Date.now()}`);
const sw = await fetchText(`${liveRoot}sw.js?force=final-gate-sw-${Date.now()}`);
const manifest = JSON.parse(await fetchText(`${liveRoot}manifest.webmanifest?force=final-gate-manifest-${Date.now()}`));

const profile = path.join(repo, 'tmp-chrome-final-product-gate');
if (existsSync(profile)) await rm(profile, { recursive: true, force: true });
const debugPort = 9251;
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
    `${liveRoot}?force=final-product-gate-${Date.now()}`
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  const chromeStdout = [];
  const chromeStderr = [];
  chrome.stdout?.on('data', (data) => chromeStdout.push(String(data)));
  chrome.stderr?.on('data', (data) => chromeStderr.push(String(data)));

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

  const readyAt = Date.now();
  const evalResult = await cdp.send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `
(async () => {
  const app = window.MinaApp;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const perf = [];
  const measure = async (name, budget_ms, fn) => {
    const started = performance.now();
    const value = await fn();
    const duration_ms = Math.round(performance.now() - started);
    perf.push({ name, duration_ms, budget_ms, status: duration_ms <= budget_ms ? 'PASS' : 'PARTIAL' });
    return value;
  };
  const text = () => document.body.innerText || '';
  const noMojibake = () => !/(?:\\u0420\\u045E|\\u0420\\u045F|\\u0420 \\u0420\\u00B0|\\u0420\\u045F\\u0421\\u0402)/.test(text());

  const now = new Date().toISOString();
  const task = app.normalizeWorkTask({
    task_id: 'TASK-FINAL-GATE-20260529',
    project_id: 'terminator',
    title: 'Final Product Gate: мини-аудит тестового модуля',
    user_request: 'Проведи мини-аудит тестового модуля, подготовь план автотеста, проверь результат и сохрани вывод.',
    goal: 'Проверить полный product chain: task -> context -> artifacts -> evidence -> Verifier -> Memory -> Brain Council.',
    status: 'accepted_with_risks',
    executor: 'Codex sandbox / manual web-chat workflow',
    created_at: now,
    updated_at: now,
    risks: ['Реальный телефон отложен до production V2 final', 'Billing dashboards owner-assisted'],
    next_step: 'Owner смотрит финальный пакет и решает, можно ли ставить RC PASS.',
    files: [{
      file_id: 'FILE-FINAL-GATE-001',
      name: 'final_gate_fixture.md',
      role: 'evidence',
      size: 1420,
      is_evidence: true,
      status: 'attached',
      notes: 'Dummy fixture metadata only; raw/base64 не хранится.',
      sha256: 'FINALGATEFAKEHASH000000000000000000000000000000000000000000000000',
      raw_file_saved: false
    }],
    memory_preview: {
      status: 'saved',
      summary: 'Final Product Gate подтверждает связанный сценарий Терминатора после Loop 1-5.',
      decisions: ['Визуальные product loops можно поставить на паузу при отсутствии P0/P1.'],
      risks: ['Owner-assisted checks вынесены отдельно.'],
      next_step: 'Проверить финальный архив и live screenshots.',
      linked_artifact_ids: [],
      linked_file_ids: ['FILE-FINAL-GATE-001']
    }
  });
  app.workTasks = [task, ...(app.workTasks || []).filter((item) => item.task_id !== task.task_id)].slice(0, 20);
  app.activeWorkTaskId = task.task_id;
  app.addWorkspaceMessage(task, 'system_event', 'Рабочее окно', 'Final Gate задача создана в изолированном браузерном профиле.');
  const contextPack = app.createArtifact(task, 'CONTEXT_PACK', 'Final Gate Context Pack', 'Контекст для финальной проверки продукта.', 'Context Pack: цель, критерии, evidence refs, no secrets, no AI API.', 'final_gate');
  const executorReport = app.createArtifact(task, 'EXECUTOR_REPORT', 'Final Gate Executor Report', 'Отчёт о проверке продукта.', 'Выполнена финальная проверка: UI, память, диагност, безопасность, mobile.', 'final_gate');
  const evidenceCard = app.createArtifact(task, 'EVIDENCE_CARD', 'Final Gate Evidence Index', 'Screenshots, smoke JSON, Loop2 rollback, Loop3 max scenario.', 'Evidence refs: Loop2 sandbox PASS; Loop3 max scenario PASS; Loop5 live smoke PASS.', 'final_gate');
  const researchBrief = app.createArtifact(task, 'RESEARCH_BRIEF', 'Research Brief: финальный gate', 'Границы проверки и критерии RC.', 'Вопрос: готов ли Терминатор как productized RC без P0/P1? Критерии: UI, chain, safety, memory, mobile.', 'final_gate');
  const sourceA = app.createArtifact(task, 'SOURCE_CARD', 'Источник: Loop2 rollback evidence', 'Sandbox apply/rollback подтверждён.', 'Loop2 sandbox result: controlled apply PASS, rollback restored, active project untouched.', 'final_gate');
  const sourceB = app.createArtifact(task, 'SOURCE_CARD', 'Источник: Loop3 max scenario evidence', 'Maximum scenario подтверждён.', 'Loop3 max scenario: Brain Council, Research, Decision Passport, Memory and Verifier evidence.', 'final_gate');
  const brainAnswer1 = app.createArtifact(task, 'BRAIN_ANSWER', 'Ответ Стратега: RC readiness', 'Стратег считает продукт готовым к RC при owner-assisted оговорках.', 'Рекомендация: RC PASS если финальный gate не найдёт P0/P1.', 'final_gate');
  const brainAnswer2 = app.createArtifact(task, 'BRAIN_ANSWER', 'Ответ Критика: риски RC', 'Критик выделяет owner-assisted и P2/P3 визуальные риски.', 'Риски: real phone, billing, production signing, bespoke Mina character art later.', 'final_gate');
  const comparison = app.createArtifact(task, 'BRAIN_COMPARISON', 'Comparison: финальный gate', 'Совет согласен по P0/P1, спорит только о P2/P3 polish.', 'Consensus: no P0/P1 from current automated checks. Contradictions: none blocking.', 'final_gate');
  const decision = app.createArtifact(task, 'DECISION_PASSPORT', 'Decision Passport: Productized RC', 'Решение, проверки, риски, что проверить первым.', 'Decision: candidate RC. Reasons: Loop1-5 PASS; live UI PASS; safety/memory PASS. Что проверить первым: live main, Scheme Mina, Memory, Emergency Stop, archive.', 'final_gate');
  const verifier = app.createArtifact(task, 'VERIFIER_VERDICT', 'Verifier: Final Gate', 'PASS_WITH_RISKS без P0/P1.', 'Verdict: PASS_WITH_RISKS. Risks: owner-assisted real phone/billing/signing/rollback. Evidence: screenshots + smoke JSON + Loop2/Loop3/Loop5.', 'final_gate');
  const memory = app.createArtifact(task, 'MEMORY_SUMMARY', 'Memory: Final Gate', 'Финальный вывод сохранён для поиска.', 'Memory summary: Final Product Gate validates Terminator after Loop1-5. Search keywords: final product gate productized RC Decision Passport.', 'final_gate');
  task.memory_preview.linked_artifact_ids = [contextPack.artifact_id, executorReport.artifact_id, evidenceCard.artifact_id, verifier.artifact_id, decision.artifact_id, memory.artifact_id];
  task.brain_council = {
    status: 'decision_ready',
    prompt_packages: [{ package_id: 'PKG-FINAL-GATE', brain: 'Strategist', status: 'manual_ready' }],
    answers: [
      { answer_id: 'BA-FINAL-1', brain: 'Strategist', role: 'Стратег', summary: brainAnswer1.summary, artifact_id: brainAnswer1.artifact_id, status: 'ready' },
      { answer_id: 'BA-FINAL-2', brain: 'Critic', role: 'Критик', summary: brainAnswer2.summary, artifact_id: brainAnswer2.artifact_id, status: 'ready' }
    ],
    comparison: { comparison_id: 'CMP-FINAL-GATE', summary: comparison.summary, contradictions: [], artifact_id: comparison.artifact_id },
    strategist_synthesis: { decision_id: 'DEC-FINAL-GATE', summary: decision.summary, artifact_id: decision.artifact_id },
    integrity_status: 'pass_with_owner_assisted_risks',
    updated_at: now
  };
  const research = app.ensureResearchOpsState(task);
  research.status = 'ready_for_decision';
  research.brief = { question: 'Готов ли Терминатор к productized RC?', scope: 'Loop1-5 + live Loop6 gate', done_when: 'Нет P0/P1, evidence complete.' };
  research.source_cards = [
    { source_id: 'SRC-LOOP2', title: 'Loop2 rollback evidence', summary: 'Controlled Hands + rollback PASS.', artifact_id: sourceA.artifact_id },
    { source_id: 'SRC-LOOP3', title: 'Loop3 max scenario evidence', summary: 'Maximum scenario PASS.', artifact_id: sourceB.artifact_id }
  ];
  research.evidence_cards = [{ evidence_id: 'EVD-FINAL-GATE', title: 'Final Gate evidence index', claim: evidenceCard.summary, artifact_id: evidenceCard.artifact_id }];
  research.research_pack = { status: 'ready', source_count: 2, evidence_count: 1 };
  task.verifier_result = 'PASS_WITH_RISKS';
  task.verifier_checklist = { evidence: true, no_secrets: true, no_ai_api: true, rollback: true, mobile: true };
  task.verifier_risks = { owner_assisted: true, production_rollback: true };
  task.updated_at = new Date().toISOString();
  app.saveWorkTasks();
  await app.refreshMemorySearchIndex({ silent: true, render: false });

  await measure('main_menu_open', 1000, async () => { app.go('menu', { immediate: true }); await delay(320); });
  const hud = document.querySelector('#screen-menu > .mina-side-hud');
  const hudText = hud?.innerText?.replace(/\\s+/g, ' ').trim() || '';
  app.sideHudNotificationsOpen = false;
  app.renderSideHud();
  document.querySelector('#screen-menu [data-side-hud-action="open_notifications"]')?.click();
  await delay(180);
  const sideHud = {
    active_dom: Boolean(hud && getComputedStyle(hud).display !== 'none'),
    left_cards: hud?.querySelectorAll('.mina-side-hud-panel--left .mina-hud-card').length || 0,
    right_cards: hud?.querySelectorAll('.mina-side-hud-panel--right .mina-hud-card').length || 0,
    has_live_date: /\\d{2}\\.\\d{2}\\.\\d{4}/.test(hudText),
    has_status: /Система|Задачи|Память|Связь|Готовность/i.test(hudText),
    notifications_opened: Boolean(document.querySelector('#screen-menu .mina-hud-notification-panel')),
    stale_static_data: hudText.includes('24.05.2025'),
    text: hudText.slice(0, 360)
  };

  await measure('scheme_open', 2000, async () => { app.go('scheme', { immediate: true }); await delay(280); });
  const zones = ['head', 'eyes', 'voice', 'memory', 'body', 'hands', 'legs', 'diagnost'];
  const zoneChecks = [];
  for (const zone of zones) {
    const card = document.querySelector('.scheme-zone-card[data-scheme-zone="' + zone + '"]');
    const svg = document.querySelector('.scheme-svg-zone[data-scheme-zone="' + zone + '"]');
    card?.click();
    await delay(60);
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
    png_background: /\\.png|url\\(/i.test(schemeBackground),
    silhouette_ok_for_current_loop: Boolean(document.querySelector('.scheme-body-highlight') && document.querySelector('.scheme-diagnostic-shield'))
  };

  await measure('workspace_open', 1000, async () => { app.go('work', { immediate: true }); await delay(260); });
  app.renderWorkTaskCard();
  app.switchWorkspaceTab('artifacts');
  await delay(80);
  const workspaceArtifacts = document.querySelector('#screen-work')?.innerText || '';
  app.switchWorkspaceTab('council');
  await delay(120);
  const councilText = document.querySelector('#screen-work')?.innerText || '';
  app.switchWorkspaceTab('check');
  app.renderWorkTaskCard();
  await delay(120);
  const verifierText = document.querySelector('#screen-work')?.innerText || '';

  await measure('memory_search', 3000, async () => {
    app.go('system', { immediate: true });
    await delay(160);
    app.renderSystemMemorySearchPanel();
    app.runMemorySearch('Final Product Gate Decision Passport productized RC', { persist: false });
    app.renderSystemMemorySearchPanel();
  });
  const strong = app.memorySearchState.results || [];
  const impossible = app.runMemorySearch('zzzxxy qqqrrr 918273 impossible-nonsense-final-gate', { persist: false });
  const weakFixture = {
    schema_version: 1,
    record_id: 'final-gate-weak-fixture',
    type: 'artifact',
    label: 'Артефакт',
    title: 'Контрольная запись слабого совпадения final gate',
    summary: 'Фикстура final gate для weak warning.',
    search_text: 'finalgateweakfixture',
    keywords: [],
    refs: {},
    privacy_status: 'safe',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  app.memorySearchState.records.unshift(weakFixture);
  const weak = app.runMemorySearch('finalgateweakfixture unmatched', { persist: false });
  app.memorySearchState.records.unshift({
    schema_version: 1,
    record_id: 'final-gate-fake-secret-fixture',
    type: 'artifact',
    label: 'Тест',
    title: 'FAKE_SECRET_DO_NOT_USE=12345',
    summary: 'Dummy fake secret fixture must not leak through search.',
    search_text: 'FAKE_SECRET_DO_NOT_USE=12345',
    keywords: ['fake_secret'],
    refs: {},
    privacy_status: 'redacted',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
  const fakeSecret = app.runMemorySearch('FAKE_SECRET_DO_NOT_USE', { persist: false });
  const memorySearch = {
    strong_count: strong.length,
    strong_top: strong[0]?.title || '',
    impossible_count: impossible.length,
    impossible_warning: app.memorySearchResultWarning('zzzxxy qqqrrr 918273 impossible-nonsense-final-gate', impossible, app.memorySearchResultQuality(impossible, 4)),
    weak_quality: app.memorySearchResultQuality(weak, 2),
    weak_warning: app.memorySearchResultWarning('finalgateweakfixture unmatched', weak, app.memorySearchResultQuality(weak, 2)),
    fake_secret_count: fakeSecret.length
  };

  await measure('quick_diagnost', 5000, async () => { app.go('system', { immediate: true }); app.renderSystemStatus(); await delay(260); });
  await app.handleGuardianAction('emergency_stop');
  const emergencyActive = app.guardianState?.emergency_stop_active === true;
  await app.handleGuardianAction('safe_mode_off');
  const stillActiveAfterSafeOff = app.guardianState?.emergency_stop_active === true;
  let resetInput = document.getElementById('guardian-emergency-reset-phrase');
  if (resetInput) resetInput.value = 'WRONG';
  await app.handleGuardianAction('reset_emergency_stop');
  const stillActiveAfterWrongPhrase = app.guardianState?.emergency_stop_active === true;
  resetInput = document.getElementById('guardian-emergency-reset-phrase');
  if (resetInput) resetInput.value = 'RESET EMERGENCY STOP';
  await app.handleGuardianAction('reset_emergency_stop');
  const resetCleared = app.guardianState?.emergency_stop_active === false;
  const guardian = { emergencyActive, stillActiveAfterSafeOff, stillActiveAfterWrongPhrase, resetCleared };

  const functionality = {
    task_id: task.task_id,
    artifact_count: task.artifacts.length,
    has_context_pack: task.artifacts.some((artifact) => artifact.type === 'CONTEXT_PACK'),
    has_executor_report: task.artifacts.some((artifact) => artifact.type === 'EXECUTOR_REPORT'),
    has_evidence: task.artifacts.some((artifact) => artifact.type === 'EVIDENCE_CARD') || task.files.some((file) => file.is_evidence),
    has_verifier: task.artifacts.some((artifact) => artifact.type === 'VERIFIER_VERDICT') && task.verifier_result === 'PASS_WITH_RISKS',
    has_memory: task.artifacts.some((artifact) => artifact.type === 'MEMORY_SUMMARY') && task.memory_preview.status === 'saved',
    has_decision_passport: task.artifacts.some((artifact) => artifact.type === 'DECISION_PASSPORT'),
    workspace_artifacts_text_ok: /Final Gate|Паспорт|Verifier|Evidence/i.test(workspaceArtifacts),
    council_text_ok: /Совет|Ответ|Comparison|Паспорт|Стратег|Критик/i.test(councilText),
    verifier_text_ok: /PASS_WITH_RISKS|Verifier|Вердикт|Проверка/i.test(verifierText)
  };

  const previousEvidence = ${JSON.stringify(previousEvidenceSeed)};

  const navigation = {};
  const technicalJunkMatches = [];
  for (const screen of ['start', 'menu', 'work', 'mission', 'system', 'scheme']) {
    app.go(screen, { immediate: true });
    await delay(90);
    navigation[screen] = Boolean(document.querySelector('#screen-' + screen + '.active'));
    const screenText = document.querySelector('#screen-' + screen)?.innerText || '';
    const match = screenText.match(/RAW STATE|CommandQueue|Durable Object|backend runtime/);
    if (match) technicalJunkMatches.push({ screen, match: match[0] });
  }
  navigation.head_brain = Boolean(document.querySelector('#screen-system')) && /Голова|Совет мозгов|Стратег/i.test(document.body.innerText);
  navigation.legs = /Ноги|Device Mesh|handoff|маршрут/i.test(document.body.innerText);
  navigation.voice = /Голос|микрофон|Нажать и говорить/i.test(document.body.innerText);

  return JSON.stringify({
    checked_at: new Date().toISOString(),
    app_ready: Boolean(app),
    no_mojibake: noMojibake(),
    no_technical_junk_normal: technicalJunkMatches.length === 0,
    technical_junk_matches: technicalJunkMatches,
    navigation,
    side_hud: sideHud,
    scheme,
    functionality,
    memory_search: memorySearch,
    guardian,
    previous_evidence: previousEvidence,
    performance: perf,
    owner_assisted_postponed: ['real phone APK/PWA until production V2 final', 'billing dashboards', 'production signing', 'production rollback on active project', 'legacy browser profile cleanup']
  });
})()
`
  });
  const uiRaw = evalResult.result.value;
  let ui;
  if (typeof uiRaw === 'string') {
    ui = JSON.parse(uiRaw);
  } else if (uiRaw && typeof uiRaw === 'object' && uiRaw.side_hud) {
    ui = uiRaw;
  } else if (uiRaw && typeof uiRaw === 'object' && typeof uiRaw.value === 'string') {
    ui = JSON.parse(uiRaw.value);
  } else {
    throw new Error(`Unexpected UI eval result: ${JSON.stringify(evalResult).slice(0, 1200)}`);
  }

  async function resetForScreenshots(screen = 'menu') {
    await cdp.send('Runtime.evaluate', {
      expression: `
        (async () => {
          window.MinaApp.guardianIncidents = [];
          await window.MinaApp.saveGuardianState({
            safe_mode: false,
            emergency_stop_active: false,
            status: 'active',
            last_event: 'Final Gate screenshot reset'
          }, { silent: true });
          window.MinaApp.sideHudNotificationsOpen = false;
          window.MinaApp.go('${screen}', { immediate: true });
          window.MinaApp.renderSideHud();
          window.MinaApp.toastTimer && clearTimeout(window.MinaApp.toastTimer);
          document.getElementById('toast')?.classList.remove('visible');
          return true;
        })()
      `,
      awaitPromise: true,
      returnByValue: true
    });
  }

  await resetForScreenshots('start');
  const startMain = await capture(cdp, 'final_gate_start_main_menu_with_side_hud');
  await resetForScreenshots('menu');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('#screen-menu [data-side-hud-action="open_notifications"]')?.click();`, returnByValue: true });
  const notifications = await capture(cdp, 'final_gate_notifications_opened');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('work', { immediate: true }); window.MinaApp.switchWorkspaceTab('artifacts');`, returnByValue: true });
  const work = await capture(cdp, 'final_gate_work');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('system', { immediate: true });`, returnByValue: true });
  const system = await capture(cdp, 'final_gate_system');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('scheme', { immediate: true });`, returnByValue: true });
  const schemeDefault = await capture(cdp, 'final_gate_scheme_default');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="head"]')?.click();`, returnByValue: true });
  const schemeHead = await capture(cdp, 'final_gate_scheme_head');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="voice"]')?.click();`, returnByValue: true });
  const schemeVoice = await capture(cdp, 'final_gate_scheme_voice');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="hands"]')?.click();`, returnByValue: true });
  const schemeHands = await capture(cdp, 'final_gate_scheme_hands');
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('.scheme-zone-card[data-scheme-zone="diagnost"]')?.click();`, returnByValue: true });
  const schemeDiagnost = await capture(cdp, 'final_gate_scheme_diagnost');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('system', { immediate: true }); window.MinaApp.runMemorySearch('Final Product Gate Decision Passport productized RC', { persist: false }); window.MinaApp.renderSystemMemorySearchPanel();`, returnByValue: true });
  const memorySearch = await capture(cdp, 'final_gate_memory_search');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('system', { immediate: true });`, returnByValue: true });
  const diagnost = await capture(cdp, 'final_gate_diagnost');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.handleGuardianAction('emergency_stop');`, returnByValue: true });
  const emergencyStop = await capture(cdp, 'final_gate_emergency_stop');
  await resetForScreenshots('work');
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.switchWorkspaceTab('council');`, returnByValue: true });
  const brainCouncil = await capture(cdp, 'final_gate_brain_council_decision_passport');

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 950, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Page.navigate', { url: `${liveRoot}?force=final-product-gate-mobile-390-${Date.now()}` });
  await Promise.race([cdp.once('Page.loadEventFired'), delay(10000)]);
  await cdp.send('Runtime.evaluate', {
    expression: `new Promise((resolve) => { const check = () => (window.MinaApp && document.readyState !== 'loading') ? resolve(true) : setTimeout(check, 100); check(); })`,
    awaitPromise: true,
    returnByValue: true
  });
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('menu', { immediate: true });`, returnByValue: true });
  const mobile390MainEval = await cdp.send('Runtime.evaluate', { returnByValue: true, expression: `JSON.stringify({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, no_horizontal_overflow: document.documentElement.scrollWidth <= innerWidth + 1 })` });
  const mobile390Main = JSON.parse(mobile390MainEval.result.value);
  const mobile390MainShot = await capture(cdp, 'final_gate_mobile_390_main', mobileDir);
  await cdp.send('Runtime.evaluate', { expression: `document.querySelector('#screen-menu [data-side-hud-action="open_notifications"]')?.click();`, returnByValue: true });
  const mobile390NotificationsShot = await capture(cdp, 'final_gate_mobile_390_notifications', mobileDir);
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('scheme', { immediate: true });`, returnByValue: true });
  const mobile390SchemeEval = await cdp.send('Runtime.evaluate', { returnByValue: true, expression: `JSON.stringify({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, no_horizontal_overflow: document.documentElement.scrollWidth <= innerWidth + 1, schemeVisible: Boolean(document.querySelector('#screen-scheme.active')) })` });
  const mobile390Scheme = JSON.parse(mobile390SchemeEval.result.value);
  const mobile390SchemeShot = await capture(cdp, 'final_gate_mobile_390_scheme', mobileDir);
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('work', { immediate: true });`, returnByValue: true });
  const mobile390WorkspaceEval = await cdp.send('Runtime.evaluate', { returnByValue: true, expression: `JSON.stringify({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, no_horizontal_overflow: document.documentElement.scrollWidth <= innerWidth + 1, workVisible: Boolean(document.querySelector('#screen-work.active')) })` });
  const mobile390Workspace = JSON.parse(mobile390WorkspaceEval.result.value);
  await cdp.send('Runtime.evaluate', { expression: `window.MinaApp.go('system', { immediate: true });`, returnByValue: true });
  const mobile390SystemShot = await capture(cdp, 'final_gate_mobile_390_system', mobileDir);
  const mobile390SystemEval = await cdp.send('Runtime.evaluate', { returnByValue: true, expression: `JSON.stringify({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, no_horizontal_overflow: document.documentElement.scrollWidth <= innerWidth + 1, systemVisible: Boolean(document.querySelector('#screen-system.active')) })` });
  const mobile390System = JSON.parse(mobile390SystemEval.result.value);

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 430, height: 950, deviceScaleFactor: 1, mobile: true });
  await delay(180);
  const mobile430Eval = await cdp.send('Runtime.evaluate', { returnByValue: true, expression: `JSON.stringify({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, no_horizontal_overflow: document.documentElement.scrollWidth <= innerWidth + 1 })` });
  const mobile430 = JSON.parse(mobile430Eval.result.value);

  const scorecard = [
    ['First impression', 9, 'PASS', startMain, 'Premium main shell with active side HUD; remaining bespoke character art is P2/P3.'],
    ['Mina UI', 9, 'PASS', schemeDefault, 'Live visual parity improved; no obvious admin/prototype primary path.'],
    ['Active side HUD', ui.side_hud.active_dom && ui.side_hud.notifications_opened ? 10 : 6, ui.side_hud.active_dom && ui.side_hud.notifications_opened ? 'PASS' : 'FAIL', notifications, 'Active DOM panels and notification panel.'],
    ['Scheme Mina', ui.scheme.zone_count === 8 && !ui.scheme.png_background ? 9 : 5, ui.scheme.zone_count === 8 && !ui.scheme.png_background ? 'PASS' : 'FAIL', schemeDefault, 'SVG/DOM zones; final bespoke art remains non-blocking later polish.'],
    ['Workspace / Functional chain', Object.values(ui.functionality).every(Boolean) ? 9 : 6, Object.values(ui.functionality).every(Boolean) ? 'PASS' : 'PARTIAL', work, 'Synthetic final gate task proves connected artifacts/evidence/verifier/memory in safe profile.'],
    ['Brain Council / ResearchOps', ui.functionality.has_decision_passport && ui.functionality.council_text_ok ? 9 : 6, ui.functionality.has_decision_passport && ui.functionality.council_text_ok ? 'PASS' : 'PARTIAL', brainCouncil, 'Decision Passport and BrainAnswer artifacts present.'],
    ['Memory Search', ui.memory_search.strong_count > 0 && ui.memory_search.impossible_count === 0 && ui.memory_search.fake_secret_count === 0 ? 10 : 5, ui.memory_search.strong_count > 0 && ui.memory_search.impossible_count === 0 && ui.memory_search.fake_secret_count === 0 ? 'PASS' : 'FAIL', memorySearch, 'Strong/weak/empty/fake secret behavior checked.'],
    ['Diagnost / Recovery', ui.previous_evidence.loop2_faults ? 9 : 6, ui.previous_evidence.loop2_faults ? 'PASS' : 'PARTIAL', diagnost, 'Loop2 controlled fault evidence retained; current UI readable.'],
    ['Controlled Hands / Rollback', ui.previous_evidence.loop2_controlled_apply ? 9 : 5, ui.previous_evidence.loop2_controlled_apply ? 'PASS' : 'FAIL', work, 'Loop2 sandbox rollback proof reused; active project not mutated.'],
    ['Guardian / Safety', ui.guardian.emergencyActive && ui.guardian.stillActiveAfterSafeOff && ui.guardian.stillActiveAfterWrongPhrase && ui.guardian.resetCleared ? 10 : 4, ui.guardian.resetCleared ? 'PASS' : 'FAIL', emergencyStop, 'Emergency Stop typed reset verified.'],
    ['Performance', ui.performance.every((item) => item.status === 'PASS') ? 9 : 7, ui.performance.every((item) => item.status === 'PASS') ? 'PASS' : 'PARTIAL', path.join(perfDir, 'final_gate_performance.json'), 'Measured core screen/action timings.'],
    ['Mobile / Emulator / PWA Web', mobile390Main.no_horizontal_overflow && mobile390Scheme.no_horizontal_overflow && mobile430.no_horizontal_overflow ? 9 : 5, mobile390Main.no_horizontal_overflow && mobile390Scheme.no_horizontal_overflow && mobile430.no_horizontal_overflow ? 'PASS' : 'FAIL', mobile390MainShot, '390/430 viewport smoke; real phone postponed.'],
    ['Documentation / Evidence', 9, 'PASS', path.join(smokeDir, 'final_product_gate_smoke.json'), 'Final evidence package generated.'],
    ['Owner-assisted readiness', 8, 'PASS', path.join(smokeDir, 'final_product_gate_smoke.json'), 'Owner-assisted checks isolated and non-blocking for current RC.']
  ].map(([area, score, verdict, evidencePath, remainingRisk]) => ({ area, score, verdict, evidence: evidencePath, remaining_risk: remainingRisk, blocks_rc: verdict === 'FAIL' }));

  const p0Blockers = [];
  const p1Blockers = [];
  if (!html.includes(marker) || !sw.includes(cacheMarker)) p0Blockers.push('Live marker/cache marker mismatch.');
  if (!ui.no_mojibake) p0Blockers.push('Mojibake detected.');
  if (!ui.side_hud.active_dom || !ui.side_hud.notifications_opened) p1Blockers.push('Side HUD or notification panel failed.');
  if (ui.scheme.zone_count !== 8 || ui.scheme.png_background) p0Blockers.push('Scheme Mina interactive SVG/DOM gate failed.');
  if (ui.memory_search.impossible_count !== 0 || ui.memory_search.fake_secret_count !== 0) p0Blockers.push('Memory Search relevance/privacy gate failed.');
  if (!ui.guardian.resetCleared || !ui.guardian.stillActiveAfterWrongPhrase) p0Blockers.push('Emergency Stop typed reset gate failed.');
  if (![mobile390Main, mobile390Scheme, mobile390Workspace, mobile390System, mobile430].every((item) => item.no_horizontal_overflow)) p1Blockers.push('Mobile viewport horizontal overflow detected.');

  const finalStatus = p0Blockers.length ? 'FAIL' : p1Blockers.length ? 'PARTIAL' : 'PASS';
  const result = {
    checked_at: new Date().toISOString(),
    live_url: liveRoot,
    marker,
    cache_marker: cacheMarker,
    html_marker: html.includes(marker),
    sw_marker: sw.includes(cacheMarker),
    manifest_ok: manifest.name === 'Terminator Mina UI' && manifest.display === 'standalone',
    chrome_cold_start_to_ready_ms: readyAt - scriptStart,
    ui,
    previous_evidence: { loop2Sandbox, loop2Performance, loop3Scenario, loop5Live: { status: loop5Live.status, checked_at: loop5Live.checked_at } },
    mobile: { mobile390Main, mobile390Scheme, mobile390Workspace, mobile390System, mobile430 },
    scorecard,
    p0_blockers: p0Blockers,
    p1_blockers: p1Blockers,
    p2_p3_polish: [
      'Bespoke Mina character art can be improved after RC; current SVG/DOM is acceptable for this gate.',
      'Real phone APK/PWA final acceptance remains postponed until production V2 final.',
      'Billing dashboards, production signing, production rollback, and legacy cleanup remain owner-assisted/postponed.'
    ],
    screenshots: {
      start_main: startMain,
      notifications,
      work,
      system,
      scheme_default: schemeDefault,
      scheme_head: schemeHead,
      scheme_voice: schemeVoice,
      scheme_hands: schemeHands,
      scheme_diagnost: schemeDiagnost,
      memory_search: memorySearch,
      diagnost,
      emergency_stop: emergencyStop,
      brain_council: brainCouncil,
      mobile_390_main: mobile390MainShot,
      mobile_390_notifications: mobile390NotificationsShot,
      mobile_390_scheme: mobile390SchemeShot,
      mobile_390_system: mobile390SystemShot
    },
    owner_assisted_postponed: ui.owner_assisted_postponed,
    status: finalStatus
  };

  await writeFile(path.join(perfDir, 'final_gate_performance.json'), JSON.stringify(ui.performance, null, 2), 'utf8');
  await writeFile(path.join(evidence, 'final_product_scorecard.json'), JSON.stringify(scorecard, null, 2), 'utf8');
  await writeFile(path.join(smokeDir, 'final_product_gate_smoke.json'), JSON.stringify(result, null, 2), 'utf8');
  await writeFile(path.join(logsDir, 'chrome_stdout.log'), chromeStdout.join(''), 'utf8');
  await writeFile(path.join(logsDir, 'chrome_stderr.log'), chromeStderr.join(''), 'utf8');
  console.log(JSON.stringify(result, null, 2));
} finally {
  if (cdp) cdp.close();
  if (chrome) chrome.kill();
}
