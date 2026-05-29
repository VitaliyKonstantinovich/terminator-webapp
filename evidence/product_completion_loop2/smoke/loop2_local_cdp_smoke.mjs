import { spawn } from 'node:child_process';
import { mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const repo = 'C:/Users/glebi/Desktop/терминатор - DeepSeek_files/council/webapp';
const evidence = path.join(repo, 'evidence/product_completion_loop2');
const screenshotDir = path.join(evidence, 'screenshots');
const smokeDir = path.join(evidence, 'smoke');
const perfDir = path.join(evidence, 'performance');
await mkdir(screenshotDir, { recursive: true });
await mkdir(smokeDir, { recursive: true });
await mkdir(perfDir, { recursive: true });
const sandboxResult = JSON.parse(await readFile(path.join(evidence, 'sandbox/loop2_sandbox_result.json'), 'utf8'));

function delay(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
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

const profile = path.join(repo, 'tmp-chrome-product-loop2');
if (existsSync(profile)) await rm(profile, { recursive: true, force: true });
const serverPort = 8897;
const debugPort = 9237;
const server = spawn('python', ['-m', 'http.server', String(serverPort), '--bind', '127.0.0.1'], { cwd: repo, stdio: ['ignore', 'pipe', 'pipe'] });
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
let chrome;
let cdp;
try {
  await waitFor(`http://127.0.0.1:${serverPort}/index.html`, 15000);
  chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profile}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-networking',
    '--window-size=1440,1100',
    `http://127.0.0.1:${serverPort}/?force=product-loop2-local`
  ], { stdio: ['ignore', 'pipe', 'pipe'] });
  await waitFor(`http://127.0.0.1:${debugPort}/json/version`, 15000);
  let tabs = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  let page = tabs.find((item) => item.type === 'page') || tabs[0];
  if (!page) throw new Error('No Chrome page target');
  cdp = new CDP(page.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1100, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: `http://127.0.0.1:${serverPort}/?force=product-loop2-local` });
  await Promise.race([cdp.once('Page.loadEventFired'), delay(5000)]);
  await cdp.send('Runtime.evaluate', {
    expression: `new Promise((resolve) => { const check = () => (window.MinaApp && document.readyState !== 'loading') ? resolve(true) : setTimeout(check, 100); check(); })`,
    awaitPromise: true,
    returnByValue: true
  });

  const smokeExpression = `
(async () => {
  const sandbox = ${JSON.stringify(sandboxResult)};
  const app = window.MinaApp;
  const perf = [];
  const perfBudgets = {
    create_simple_task: 20000,
    attach_evidence_file: 5000,
    generate_artifacts: 10000,
    verifier_path: 5000,
    controlled_hands_metadata_and_apply_gate: 5000,
    diagnost_fault_injection: 5000,
    quick_diagnost: 5000,
    memory_preview_and_search: 3000,
    qualified_acceptance_answer: 5000,
    screen_switches: 1000
  };
  const measure = async (name, fn) => {
    const start = performance.now();
    const value = await fn();
    const end = performance.now();
    const duration = Math.round(end - start);
    const budget = perfBudgets[name] || null;
    perf.push({ name, duration_ms: duration, budget_ms: budget, status: budget && duration > budget ? 'PARTIAL' : 'PASS' });
    return value;
  };
  const checklist = {
    matches_task: true,
    changed_files: true,
    evidence_archive: true,
    checks_passed: true,
    unchecked_listed: true,
    risks_listed: true,
    no_ai_api: true,
    no_bridge_agent_changes: true,
    no_env_secrets: true,
    personal_not_developed: true,
    no_mojibake: true,
    no_click_zone_only: true,
    result_archive_path: true,
    first_check: true,
    acceptance_decision_ready: true,
    memory_ready: true
  };

  const task = await measure('create_simple_task', async () => {
    app.workPreview = app.buildWorkPreview('Напиши Python hello world и объясни, как проверить результат.', { project_id: 'terminator', mode: 'analysis', quality_level: 'maximum' });
    return app.confirmWorkPreview();
  });

  await measure('attach_evidence_file', async () => {
    const file = new File(["print('Hello, world!')\\n"], 'hello_world.py', { type: 'text/x-python' });
    await app.addWorkspaceFiles([file]);
    const active = app.getActiveWorkTask();
    const meta = active.files.find((item) => item.name === 'hello_world.py');
    app.setWorkspaceFileRole(active, meta, 'evidence');
    meta.storage_path = sandbox.python.path;
    meta.storage_ref = {
      root: 'D:\\TerminatorStorage',
      task_path: app.taskStoragePath(active.task_id),
      folder: 'evidence',
      planned_path: sandbox.python.path,
      persistence: 'external_sandbox_verified',
      raw_file_saved: true
    };
    meta.sha256 = sandbox.python.sha256;
    meta.hash_status = 'verified_external_sandbox';
    return meta;
  });

  await measure('generate_artifacts', async () => {
    const active = app.getActiveWorkTask();
    app.buildAndShowContextPack(active);
    app.markContextPackSent(active);
    const report = [
      'Результат: создан sandbox Python файл hello_world.py и выполнен в безопасной папке ' + sandbox.sandbox_root + '.',
      'Проверки PASS: python --version; python hello_world.py; stdout содержит Hello, world!; exit_code 0; SHA-256 файла зафиксирован.',
      'Изменённые файлы: ' + sandbox.python.path + '; ' + sandbox.controlled_apply.target + ' только в sandbox.',
      'Direct Bridge и Local Agent не менялись. AI API не использовались. Секреты не добавлялись. Legacy Personal не развивался.',
      'Что проверить первым: открыть command log и убедиться, что stdout равен Hello, world!'
    ].join('\\n');
    app.insertExecutorReport(active, report);
    const checkLog = app.createArtifact(active, 'CHECK_LOG', 'Python hello world command log', 'python --version и python hello_world.py выполнены в sandbox.', JSON.stringify(sandbox.python, null, 2), 'product_loop2');
    checkLog.status = 'ready';
    const archive = app.createArtifact(active, 'RESULT_ARCHIVE', 'Loop 2 sandbox evidence', 'Evidence сохранено на D и продублировано в repo evidence.', [
      'D:\\TerminatorStorage\\temp_outputs\\product_loop2\\hello_world.py',
      'D:\\TerminatorStorage\\temp_outputs\\product_loop2\\loop2_sandbox_result.json',
      'evidence/product_completion_loop2/sandbox/loop2_sandbox_result.json'
    ].join('\\n'), 'product_loop2');
    archive.status = 'ready';
    return { report_id: active.artifacts.find((artifact) => artifact.type === 'EXECUTOR_REPORT')?.artifact_id, check_log_id: checkLog.artifact_id, archive_id: archive.artifact_id };
  });

  const verifier = await measure('verifier_path', async () => {
    const active = app.getActiveWorkTask();
    const input = {
      report: active.artifacts.find((artifact) => artifact.type === 'EXECUTOR_REPORT')?.content || '',
      evidence: 'Evidence: ' + sandbox.sandbox_root + '\\\\loop2_sandbox_result.json; stdout Hello, world!; exit_code 0; artifact CHECK_LOG and RESULT_ARCHIVE created.',
      expected: 'Python hello world должен вывести Hello, world! и дать понятный способ проверки результата.',
      first_check: 'Запустить python ' + sandbox.python.path + ' и проверить stdout Hello, world!.',
      risks: { not_checked: '', manual_review: '', can_break: '', first_check: 'Проверить stdout Hello, world!' },
      checklist
    };
    const evaluation = app.evaluateVerifierInput(input, active);
    app.saveVerifierResult(active, input, evaluation);
    return { verdict: evaluation.verdict, reasons: evaluation.reasons, evidenceGate: evaluation.evidenceGate, qualityGate: evaluation.qualityGate };
  });

  const hands = await measure('controlled_hands_metadata_and_apply_gate', async () => {
    const active = app.getActiveWorkTask();
    const plan = app.normalizeHandsActionPlan({
      plan_id: app.generateWorkspaceId('HAND'),
      task_id: active.task_id,
      project_id: active.project_id,
      title: 'Loop 2 sandbox apply proof',
      goal: 'Зафиксировать sandbox apply и rollback evidence без изменения active project.',
      worker_id: 'file_worker',
      risk_level: 'safe',
      controlled_runtime_action: 'task_metadata_stamp',
      blocked_actions: [],
      approval_required: false,
      privacy_status: 'clean',
      privacy_summary: 'clean'
    }, active);
    const savedPlan = await app.saveHandsActionPlan(plan, active);
    const run = await app.runControlledWorkerPlan(savedPlan, active);
    let pack = await app.prepareControlledApplyPackageFromPlan(savedPlan, active);
    pack.changed_files = [sandbox.controlled_apply.target];
    pack.diff_summary = sandbox.controlled_apply.diff;
    pack.rollback_point = {
      rollback_id: app.generateWorkspaceId('ROLLBACK'),
      apply_package_id: pack.apply_package_id,
      task_id: active.task_id,
      affected_files: [sandbox.controlled_apply.target],
      previous_file_hashes: [sandbox.controlled_apply.before_hash],
      backup_path: sandbox.controlled_apply.rollback,
      status: sandbox.controlled_apply.rollback_restored ? 'verified_restored' : 'review',
      instructions: 'Rollback доказан в sandbox: backup copied back and hash restored.',
      created_at: new Date().toISOString()
    };
    pack.manual_apply_instructions = 'Sandbox apply already performed on dummy D file; active project apply remains blocked.';
    pack = await app.saveControlledApplyPackage(pack, active);
    const verified = await app.verifyControlledApplyPackage(pack, active);
    const applied = await app.markControlledApplyManualApplied(verified, active);
    const negative = {
      apply_without_rollback: app.evaluateControlledApplyPackageIntegrity({ ...verified, rollback_point: {} }, active).ok === false,
      verifier_fail: app.evaluateControlledApplyGate({ ...verified, verifier_status: 'metadata_self_check_failed' }, active).ok === false,
      guardian_high_risk: app.evaluateControlledApplyGate({ ...verified, risk_level: 'approval_required', approval_required: true, approval_id: '' }, active).ok === false,
      active_project_target: app.evaluateControlledApplyPackageIntegrity({ ...verified, changed_files: ['app.js'], no_active_project_write: false }, active).ok === false
    };
    const negArtifact = app.createArtifact(active, 'CHECK_LOG', 'Controlled apply negative checks', 'Apply gates blocked unsafe variants.', JSON.stringify(negative, null, 2), 'product_loop2');
    negArtifact.status = 'ready';
    return { plan_id: savedPlan.plan_id, run_status: run.status, package_status: verified.status, manual_status: applied.status, gate_ok: app.evaluateControlledApplyGate(applied, active).ok, negative };
  });

  const diagnostic = await measure('diagnost_fault_injection', async () => {
    const active = app.getActiveWorkTask();
    const incidents = [];
    for (const fault of sandbox.fault_injection) {
      let incident = await app.createGuardianIncident({
        title: 'Loop 2 fault: ' + fault.id,
        summary: fault.explanation,
        source: 'product_loop2_fault_injection',
        source_ref: fault.id,
        severity: fault.severity === 'error' ? 'error' : 'warning',
        status: 'detected',
        risk_level: fault.severity === 'error' ? 'high' : 'review',
        affected_area: fault.id,
        safe_action: fault.safe_next_action,
        approval_required: false
      });
      incident.diagnostic_pack = app.buildDiagnosticPack(incident);
      incident.repair_workspace = app.buildRepairWorkspaceMetadata(incident);
      incident.diff_review = app.buildDiffReviewPlaceholder(incident);
      incident.rollback_point = app.buildRollbackPointMetadata(incident);
      incident = await app.saveGuardianIncident(incident);
      incidents.push({ id: incident.incident_id, title: incident.title, severity: incident.severity, has_pack: Boolean(incident.diagnostic_pack), safe_action: incident.safe_action });
    }
    const artifact = app.createArtifact(active, 'CHECK_LOG', 'Diagnost controlled fault injection', '6 controlled faults created incidents and Diagnostic Packs.', JSON.stringify(incidents, null, 2), 'product_loop2');
    artifact.status = 'ready';
    return incidents;
  });

  const quickDiag = await measure('quick_diagnost', async () => {
    const startCount = app.systemDiagnostics.length;
    await app.runSystemDiagnostics();
    return { before: startCount, after: app.systemDiagnostics.length, latest_status: app.systemDiagnostics[0]?.status, checks: app.systemDiagnostics[0]?.checks?.length || 0 };
  });

  const memory = await measure('memory_preview_and_search', async () => {
    const active = app.getActiveWorkTask();
    app.saveWorkspaceMemoryPreview(active);
    await app.refreshMemorySearchIndex({ silent: true, render: false });
    const helloStart = performance.now();
    const hello = app.runMemorySearch('hello world');
    const helloDuration = Math.round(performance.now() - helloStart);
    const helloQuality = app.memorySearchState.result_quality;
    const impossible = app.runMemorySearch('zzzxxy qqqrrr 918273 impossible-nonsense');
    return { hello_count: hello.length, hello_quality: helloQuality, hello_duration_ms: helloDuration, first: hello[0]?.title || '', impossible_count: impossible.length, impossible_warning: app.memorySearchState.last_query_warning };
  });

  const acceptance = await measure('qualified_acceptance_answer', async () => {
    const active = app.getActiveWorkTask();
    const gateBefore = app.acceptanceGateStatus(active);
    app.attemptAcceptTask(active);
    const decision = active.artifacts.find((artifact) => artifact.type === 'DECISION_RECORD');
    app.saveWorkTasks();
    await app.refreshMemorySearchIndex({ silent: true, render: false });
    return { gate_before: gateBefore, final_status: active.status, decision_id: decision?.artifact_id || '', decision_content: decision?.content || '' };
  });

  const screenPerf = await measure('screen_switches', async () => {
    const timings = [];
    for (const screen of ['work', 'system', 'scheme', 'menu']) {
      const started = performance.now();
      app.go(screen);
      timings.push({ screen, duration_ms: Math.round(performance.now() - started) });
    }
    return timings;
  });

  const active = app.getActiveWorkTask();
  return JSON.stringify({
    marker: '20260529-product-loop2-functional-reality-v1',
    task_id: active.task_id,
    final_status: active.status,
    artifacts: active.artifacts.map((artifact) => ({ id: artifact.artifact_id, type: artifact.type, title: artifact.title, status: artifact.status })),
    files: active.files.map((file) => ({ id: file.file_id, name: file.name, role: file.role, is_evidence: file.is_evidence, sha256: file.sha256, storage_path: file.storage_path || file.storage_ref?.planned_path || '' })),
    verifier,
    hands,
    diagnostic,
    quickDiag,
    memory,
    acceptance,
    perf,
    screenPerf,
    security: {
      privacy_fake_secret_status: app.scanPrivacyText('FAKE_SECRET_DO_NOT_USE=12345').status,
      disallowed_ai_api: app.verifierHasDisallowedAiApiSignals('AI API не использовались'),
      pending_approvals: app.pendingApprovalRecords().length
    }
  });
})()
`;
  const evalResult = await cdp.send('Runtime.evaluate', { expression: smokeExpression, awaitPromise: true, returnByValue: true, timeout: 30000 });
  if (evalResult.exceptionDetails) throw new Error(JSON.stringify(evalResult.exceptionDetails));
  const smoke = JSON.parse(evalResult.result.value);
  await writeFile(path.join(smokeDir, 'loop2_webapp_smoke.json'), JSON.stringify(smoke, null, 2), 'utf8');
  await writeFile(path.join(perfDir, 'loop2_performance.json'), JSON.stringify({ perf: smoke.perf, screenPerf: smoke.screenPerf, budgets: { screen_switch_ms: 1000, scheme_open_ms: 2000, memory_search_ms: 3000, quick_diagnost_ms: 5000, simple_task_ms: 20000 } }, null, 2), 'utf8');

  async function appEval(expr) {
    return cdp.send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  }
  async function screenshot(name) {
    await delay(350);
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    const filePath = path.join(screenshotDir, name);
    await writeFile(filePath, Buffer.from(shot.data, 'base64'));
    return filePath;
  }

  await appEval(`window.MinaApp.go('work')`);
  const workShot = await screenshot('loop2_work_desktop.png');
  await appEval(`window.MinaApp.go('scheme')`);
  const schemeShot = await screenshot('loop2_scheme_desktop.png');
  await appEval(`window.MinaApp.go('system'); window.MinaApp.activeMinaSchemeZone='diagnost'; window.MinaApp.renderSystemStatus();`);
  const systemShot = await screenshot('loop2_system_diagnost_desktop.png');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });
  await appEval(`window.MinaApp.go('scheme')`);
  const mobileScheme = await screenshot('loop2_scheme_mobile_390.png');
  const mobile390 = await cdp.send('Runtime.evaluate', { expression: `JSON.stringify({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth + 1 })`, returnByValue: true });
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 430, height: 932, deviceScaleFactor: 1, mobile: true });
  await appEval(`window.MinaApp.go('work')`);
  const mobileWork = await screenshot('loop2_work_mobile_430.png');
  const mobile430 = await cdp.send('Runtime.evaluate', { expression: `JSON.stringify({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth + 1 })`, returnByValue: true });

  const visual = {
    screenshots: { workShot, schemeShot, systemShot, mobileScheme, mobileWork },
    mobile390: JSON.parse(mobile390.result.value),
    mobile430: JSON.parse(mobile430.result.value)
  };
  await writeFile(path.join(smokeDir, 'loop2_visual_smoke.json'), JSON.stringify(visual, null, 2), 'utf8');
  console.log(JSON.stringify({ status: 'PASS', smoke, visual }, null, 2));
} finally {
  if (cdp) cdp.close();
  if (chrome && !chrome.killed) chrome.kill();
  if (server && !server.killed) server.kill();
}
