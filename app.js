const MODELS = {
  chatgpt: {
    name: 'ChatGPT',
    short: 'GPT',
    profile: 'ChatGPT Profile',
    iconClass: 'model-icon--chatgpt'
  },
  gemini: {
    name: 'Gemini',
    short: 'GM',
    profile: 'Gemini Profile',
    iconClass: 'model-icon--gemini'
  },
  deepseek: {
    name: 'DeepSeek',
    short: 'DS',
    profile: 'DeepSeek Profile',
    iconClass: 'model-icon--deepseek'
  },
  qwen: {
    name: 'Qwen',
    short: 'Q',
    profile: 'Qwen Profile',
    iconClass: 'model-icon--qwen'
  }
};

const WORK_PROJECTS = [
  {
    id: 'terminator',
    name: 'Терминатор',
    short_description: 'Mina UI, Direct Mode, Local Agent, Bridge и runtime проекта'
  },
  {
    id: 'diploma_qa',
    name: 'Диплом / QA',
    short_description: 'Тестирование, критерии, дипломные материалы и QA-проверки'
  },
  {
    id: 'development_executors',
    name: 'Разработка / Codex / Antigravity',
    short_description: 'Код, аудит, checkpoint, фиксы и работа исполнителей'
  },
  {
    id: 'research_documents',
    name: 'Исследования / документы / анализ',
    short_description: 'Сравнение источников, документы, исследования и аналитика'
  }
];

const WORK_MODES = [
  { id: 'auto', name: 'Авто' },
  { id: 'fast', name: 'Быстро' },
  { id: 'deep', name: 'Глубоко' },
  { id: 'analysis', name: 'Анализ' },
  { id: 'prepare_task', name: 'Подготовить ТЗ' },
  { id: 'check_result', name: 'Проверить результат' },
  { id: 'brain_council', name: 'Совет мозгов' },
  { id: 'research', name: 'Исследование' },
  { id: 'save_memory', name: 'Сохранить в память' }
];

const WORK_QUALITY_LEVELS = [
  { id: 'auto', name: 'Авто' },
  { id: 'fast', name: 'Быстро' },
  { id: 'standard', name: 'Стандарт' },
  { id: 'maximum', name: 'Максимум' }
];

const WORK_STATUSES = [
  'created',
  'waiting_user_approval',
  'context_ready',
  'planning',
  'ready_for_executor',
  'assigned',
  'waiting_executor_report',
  'executor_report_received',
  'verifying',
  'needs_fix',
  'accepted_with_risks',
  'accepted',
  'rejected',
  'saving_memory',
  'saved',
  'failed',
  'cancelled',
  'manual_required'
];

const WORK_STORAGE_KEY = 'mina_work_tasks_v1';
const WORK_COUNTER_KEY = 'mina_work_task_counter_v1';
const WORK_PROJECT_BY_ID = Object.fromEntries(WORK_PROJECTS.map((project) => [project.id, project]));
const WORK_MODE_BY_ID = Object.fromEntries(WORK_MODES.map((mode) => [mode.id, mode]));
const WORK_QUALITY_BY_ID = Object.fromEntries(WORK_QUALITY_LEVELS.map((quality) => [quality.id, quality]));

const VERIFIER_CHECKLIST = [
  { id: 'matches_task', label: 'отчет соответствует задаче', critical: false },
  { id: 'changed_files', label: 'есть список измененных файлов', critical: false },
  { id: 'evidence_archive', label: 'есть evidence или архив', critical: true },
  { id: 'checks_passed', label: 'указаны пройденные проверки', critical: true },
  { id: 'unchecked_listed', label: 'указано, что не проверено', critical: false },
  { id: 'risks_listed', label: 'указаны риски', critical: false },
  { id: 'no_ai_api', label: 'подтверждено, что AI API не использовались', critical: true, rejectIfMissing: true },
  { id: 'no_bridge_agent_changes', label: 'подтверждено, что Direct Bridge / Local Agent не менялись', critical: true, rejectIfMissing: true },
  { id: 'no_env_secrets', label: 'подтверждено, что .env и секреты не добавлены', critical: true, rejectIfMissing: true },
  { id: 'personal_not_developed', label: 'подтверждено, что Личное не развивалось', critical: false },
  { id: 'no_mojibake', label: 'нет кракозябр в русском тексте', critical: false },
  { id: 'no_click_zone_only', label: 'UI/код не использует click-zone-only подход', critical: false },
  { id: 'result_archive_path', label: 'есть архив или путь к результату', critical: true },
  { id: 'first_check', label: 'есть что проверить первым', critical: true }
];

const VERIFIER_VERDICTS = {
  PASS: { name: 'принять', status: 'executor_report_received' },
  PASS_WITH_RISKS: { name: 'принять с рисками', status: 'executor_report_received' },
  NEEDS_FIX: { name: 'вернуть на доработку', status: 'needs_fix' },
  REJECT: { name: 'отклонить', status: 'rejected' },
  MANUAL_REVIEW: { name: 'нужна ручная проверка', status: 'manual_required' }
};

const WORK_FILE_ROLES = [
  { id: 'attachment', name: 'Обычный файл' },
  { id: 'spec', name: 'ТЗ / требования' },
  { id: 'evidence', name: 'Evidence' },
  { id: 'verifier_input', name: 'Для проверки' },
  { id: 'research_source', name: 'Для исследования' },
  { id: 'executor_package', name: 'Для пакета Codex' },
  { id: 'memory_candidate', name: 'Для памяти' },
  { id: 'result_archive', name: 'Результат исполнителя' }
];

const WORK_FILE_ROLE_BY_ID = Object.fromEntries(WORK_FILE_ROLES.map((role) => [role.id, role]));
const WORKSPACE_TABS = new Set(['files', 'artifacts', 'check', 'memory']);
const TEXT_PREVIEW_EXTENSIONS = new Set(['txt', 'md', 'json', 'log', 'js', 'ts', 'py', 'html', 'css', 'yaml', 'yml', 'xml', 'sql', 'mjs', 'cjs']);
const IMAGE_PREVIEW_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif']);
const ARCHIVE_EXTENSIONS = new Set(['zip', '7z', 'rar']);
const MEDIA_EXTENSIONS = new Set(['mp4', 'mov', 'mkv', 'webm', 'mp3', 'wav', 'm4a']);
const PRIVACY_GUARD_PATTERN = /\.env|API_KEY|TOKEN|SECRET|PASSWORD|Bearer|sk-|AIza|ghp_|webhook|cookie|session/i;
const DANGEROUS_COMMAND_PATTERN = /деплой|удали|delete|remove|\.env|secret|api key|network|vpn|proxy|cloudflare|push|main/i;

const WEBAPP_TRANSPORT_MODE = 'auto'; // telegram | direct | auto
const WEBAPP_TRANSPORT_MODES = new Set(['telegram', 'direct', 'auto']);
const DEFAULT_DIRECT_BRIDGE_URL = 'https://mina-direct-bridge.glebik2807.workers.dev';
const DIRECT_BRIDGE_NAMES = [
  'TerminatorCommandBridge',
  'TerminatorDirectBridge',
  'MinaCommandBridge'
];
const DIRECT_STATUS_POLL_INTERVAL_MS = 1500;
const DIRECT_STATUS_POLL_TIMEOUT_MS = 240000;
const DIRECT_REQUEST_TIMEOUT_MS = 30000;
const DIRECT_REQUEST_RETRY_ATTEMPTS = 3;
const DIRECT_REQUEST_RETRY_BASE_DELAY_MS = 700;
const DIRECT_FINAL_STATUSES = new Set(['completed', 'failed', 'manual_required']);
const DIRECT_RETRYABLE_HTTP_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);
const DIRECT_SESSION_LEGACY_STORAGE_KEY = 'mina_direct_owner_session';
const DIRECT_SESSION_TOKEN_KEY = 'minaOwnerSessionToken';
const DIRECT_SESSION_EXPIRES_KEY = 'minaOwnerSessionExpiresAt';
const DIRECT_SESSION_BRIDGE_KEY = 'minaOwnerSessionBridgeUrl';
const DIRECT_SESSION_EXPIRY_SKEW_MS = 5000;
const DIRECT_SESSION_FALLBACK_TTL_MS = 6 * 60 * 60 * 1000;
const OWNER_SESSION_EXPIRED_MESSAGE = 'Сессия владельца истекла. Войдите снова.';
const OWNER_SESSION_REQUIRED_MESSAGE = 'Доступ владельца не активен. Нажмите Старт и войдите снова.';
const ANYDESK_INSTALL_URL = 'https://play.google.com/store/apps/details?id=com.anydesk.anydeskandroid';

function normalizeTransportMode(mode) {
  const normalized = String(mode || '').trim().toLowerCase();
  return WEBAPP_TRANSPORT_MODES.has(normalized) ? normalized : WEBAPP_TRANSPORT_MODE;
}

function getWebAppTransportMode() {
  const queryMode = new URLSearchParams(window.location.search).get('transport');
  return normalizeTransportMode(window.WEBAPP_TRANSPORT_MODE || queryMode || WEBAPP_TRANSPORT_MODE);
}

function getTelegramTransport() {
  const tg = window.Telegram?.WebApp || null;
  return tg?.sendData ? tg : null;
}

function getDirectTransport() {
  for (const name of DIRECT_BRIDGE_NAMES) {
    const bridge = window[name];
    if (!bridge) continue;

    if (typeof bridge === 'function') {
      return { send: bridge, getStatus: null };
    }

    let send = null;
    if (typeof bridge.sendTerminatorAction === 'function') {
      send = bridge.sendTerminatorAction.bind(bridge);
    } else if (typeof bridge.send === 'function') {
      send = bridge.send.bind(bridge);
    }

    if (!send) continue;

    const getStatus = bridge.getCommandStatus || bridge.getStatus || bridge.status;
    return {
      send,
      getStatus: typeof getStatus === 'function' ? getStatus.bind(bridge) : null
    };
  }

  return createConfiguredDirectBridge();
}

function getConfiguredDirectBridgeBaseUrl() {
  const config = getDirectBridgeConfig();
  return config?.baseUrl ? config.baseUrl.replace(/\/+$/, '') : '';
}

function isConfiguredDirectModeActive() {
  const mode = getWebAppTransportMode();
  if (mode === 'telegram') return false;
  if (!getConfiguredDirectBridgeBaseUrl()) return false;
  if (mode === 'direct') return true;
  return !getTelegramTransport();
}

async function getDirectCommandStatus(commandId) {
  const directTransport = getDirectTransport();
  if (!directTransport?.getStatus) return null;
  return directTransport.getStatus(commandId);
}

function createConfiguredDirectBridge() {
  const baseUrl = getConfiguredDirectBridgeBaseUrl();
  if (!baseUrl) return null;

  return {
    async send(payload) {
      const token = await ensureOwnerSession(baseUrl);
      if (!token) {
        return { ok: false, reason: 'owner_session_required', message: OWNER_SESSION_REQUIRED_MESSAGE };
      }

      const commandPayload = {
        ...payload,
        client_command_id: payload.client_command_id || createClientCommandId()
      };

      return directBridgeRequest(baseUrl, '/commands', {
        method: 'POST',
        token,
        body: commandPayload,
        idempotent: true
      });
    },

    async getStatus(commandId) {
      const token = getStoredOwnerSession(baseUrl)?.token;
      if (!token) return null;

      return directBridgeRequest(baseUrl, `/commands/${encodeURIComponent(commandId)}/status`, {
        method: 'GET',
        token
      });
    }
  };
}

function getDirectBridgeConfig() {
  const query = new URLSearchParams(window.location.search);
  const config = window.MINA_DIRECT_BRIDGE || window.MINA_DIRECT_BRIDGE_CONFIG || {};
  const baseUrl = window.MINA_DIRECT_BRIDGE_URL
    || config.baseUrl
    || config.bridgeUrl
    || query.get('direct_bridge')
    || DEFAULT_DIRECT_BRIDGE_URL;

  return {
    baseUrl: String(baseUrl || '').trim()
  };
}

async function ensureOwnerSession(baseUrl, options = {}) {
  if (!options.forceRefresh) {
    const stored = getStoredOwnerSession(baseUrl);
    if (stored?.token) return stored.token;
  }

  if (!options.interactive) return null;

  clearStoredOwnerSession();
  return createOwnerSession(baseUrl);
}

async function createOwnerSession(baseUrl) {
  const token = await getOwnerSessionToken(baseUrl);
  if (token) showAppToast('Доступ владельца активен');
  return token;
}

async function getOwnerSessionToken(baseUrl) {
  const stored = getStoredOwnerSession(baseUrl);
  if (stored?.token) return stored.token;

  const secret = await requestOwnerSecret();
  if (!secret) return null;

  const session = await directBridgeRequest(baseUrl, '/owner/session', {
    method: 'POST',
    body: { secret },
    skipAuth: true
  });

  const token = session?.session_token || session?.token;
  if (!token) throw new Error('Owner session token missing');

  storeOwnerSession(baseUrl, {
    token,
    expiresAt: resolveOwnerSessionExpiresAt(session)
  });

  return token;
}

async function requestOwnerSecret() {
  if (typeof window.requestTerminatorOwnerSecret === 'function') {
    return window.requestTerminatorOwnerSecret();
  }

  return showOwnerLoginModal();
}

function resolveOwnerSessionExpiresAt(session) {
  const explicitExpiresAt = session?.expires_at || session?.expiresAt;
  if (explicitExpiresAt && !Number.isNaN(Date.parse(explicitExpiresAt))) {
    return new Date(Date.parse(explicitExpiresAt)).toISOString();
  }

  const ttlSeconds = Number(session?.expires_in ?? session?.expiresIn ?? session?.ttl);
  const ttlMs = Number.isFinite(ttlSeconds) && ttlSeconds > 0
    ? ttlSeconds * 1000
    : DIRECT_SESSION_FALLBACK_TTL_MS;

  return new Date(Date.now() + ttlMs).toISOString();
}

function getStoredOwnerSession(baseUrl) {
  try {
    const token = window.sessionStorage?.getItem(DIRECT_SESSION_TOKEN_KEY);
    const expiresAt = window.sessionStorage?.getItem(DIRECT_SESSION_EXPIRES_KEY);
    const sessionBaseUrl = window.sessionStorage?.getItem(DIRECT_SESSION_BRIDGE_KEY);

    if (token || expiresAt || sessionBaseUrl) {
      if (sessionBaseUrl !== baseUrl) return null;
      if (!token || !expiresAt || Date.parse(expiresAt) - DIRECT_SESSION_EXPIRY_SKEW_MS <= Date.now()) {
        clearStoredOwnerSession();
        return null;
      }

      return { baseUrl, token, expiresAt };
    }

    const legacyRaw = window.sessionStorage?.getItem(DIRECT_SESSION_LEGACY_STORAGE_KEY);
    if (!legacyRaw) return null;

    const legacySession = JSON.parse(legacyRaw);
    if (legacySession.baseUrl !== baseUrl) return null;
    if (!legacySession.token || Date.parse(legacySession.expiresAt) - DIRECT_SESSION_EXPIRY_SKEW_MS <= Date.now()) {
      clearStoredOwnerSession();
      return null;
    }

    storeOwnerSession(baseUrl, legacySession);
    return legacySession;
  } catch {
    return null;
  }
}

function storeOwnerSession(baseUrl, session) {
  try {
    window.sessionStorage?.setItem(DIRECT_SESSION_TOKEN_KEY, session.token);
    window.sessionStorage?.setItem(DIRECT_SESSION_EXPIRES_KEY, session.expiresAt);
    window.sessionStorage?.setItem(DIRECT_SESSION_BRIDGE_KEY, baseUrl);
    window.sessionStorage?.removeItem(DIRECT_SESSION_LEGACY_STORAGE_KEY);
  } catch {
    // Session storage is optional. If unavailable, the user will be asked again.
  }
}

function clearStoredOwnerSession() {
  try {
    window.sessionStorage?.removeItem(DIRECT_SESSION_TOKEN_KEY);
    window.sessionStorage?.removeItem(DIRECT_SESSION_EXPIRES_KEY);
    window.sessionStorage?.removeItem(DIRECT_SESSION_BRIDGE_KEY);
    window.sessionStorage?.removeItem(DIRECT_SESSION_LEGACY_STORAGE_KEY);
  } catch {}
}

function logoutOwnerSession() {
  clearStoredOwnerSession();
  showAppToast('Сессия владельца завершена');
}

function showOwnerSessionExpired() {
  clearStoredOwnerSession();
  showAppToast(OWNER_SESSION_EXPIRED_MESSAGE, 3600);
}

function showAppToast(message, duration = 2600) {
  if (!message) return;
  if (window.MinaApp?.toast) {
    window.MinaApp.toast(message, duration);
    return;
  }

  const toast = document.getElementById('toast');
  if (!toast) return;

  window.clearTimeout(showAppToast.timer);
  toast.textContent = message;
  toast.classList.add('visible');
  showAppToast.timer = window.setTimeout(() => {
    toast.classList.remove('visible');
  }, duration);
}

function showOwnerLoginModal() {
  return new Promise((resolve) => {
    const existing = document.getElementById('owner-session-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'owner-session-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'owner-session-title');
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:9999',
      'display:grid',
      'place-items:center',
      'background:rgba(0,8,18,.78)',
      'backdrop-filter:blur(6px)'
    ].join(';');

    const panel = document.createElement('form');
    panel.style.cssText = [
      'width:min(420px,calc(100vw - 40px))',
      'padding:24px',
      'border:1px solid rgba(62,181,255,.82)',
      'background:linear-gradient(180deg,rgba(2,16,34,.96),rgba(0,6,16,.98))',
      'box-shadow:0 0 34px rgba(0,132,255,.45), inset 0 0 28px rgba(0,132,255,.14)',
      'color:#eaf7ff',
      'font:inherit'
    ].join(';');

    const title = document.createElement('h2');
    title.id = 'owner-session-title';
    title.textContent = 'Доступ владельца';
    title.style.cssText = 'margin:0 0 10px;font-size:24px;letter-spacing:0;color:#ffffff';

    const text = document.createElement('p');
    text.textContent = 'Введите пароль Мины для управления Терминатором';
    text.style.cssText = 'margin:0 0 18px;color:#9ec9ff;line-height:1.45';

    const input = document.createElement('input');
    input.type = 'password';
    input.autocomplete = 'current-password';
    input.required = true;
    input.style.cssText = [
      'width:100%',
      'box-sizing:border-box',
      'height:48px',
      'padding:0 14px',
      'border:1px solid rgba(62,181,255,.68)',
      'background:rgba(0,20,42,.78)',
      'color:#ffffff',
      'outline:none',
      'font:inherit'
    ].join(';');

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:12px;justify-content:flex-end;margin-top:18px';

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.textContent = 'Отмена';
    cancel.style.cssText = [
      'min-width:104px',
      'height:42px',
      'border:1px solid rgba(144,186,224,.42)',
      'background:rgba(7,22,42,.72)',
      'color:#cfe8ff',
      'font:inherit',
      'cursor:pointer'
    ].join(';');

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Войти';
    submit.style.cssText = [
      'min-width:104px',
      'height:42px',
      'border:1px solid rgba(80,220,255,.95)',
      'background:linear-gradient(180deg,rgba(0,122,255,.9),rgba(0,64,150,.92))',
      'color:#ffffff',
      'font:inherit',
      'cursor:pointer',
      'box-shadow:0 0 18px rgba(0,140,255,.55)'
    ].join(';');

    const finish = (value) => {
      const secret = value || '';
      input.value = '';
      overlay.remove();
      document.removeEventListener('keydown', handleKeydown);
      resolve(secret);
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape') finish('');
    };

    cancel.addEventListener('click', () => finish(''));
    panel.addEventListener('submit', (event) => {
      event.preventDefault();
      finish(input.value);
    });
    document.addEventListener('keydown', handleKeydown);

    actions.append(cancel, submit);
    panel.append(title, text, input, actions);
    overlay.append(panel);
    document.body.append(overlay);
    window.setTimeout(() => input.focus(), 0);
  });
}

async function directBridgeRequest(baseUrl, route, options = {}) {
  const attempts = shouldRetryDirectRequest(options)
    ? DIRECT_REQUEST_RETRY_ATTEMPTS
    : 1;
  let lastError = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await directBridgeRequestOnce(baseUrl, route, options);
    } catch (error) {
      lastError = error;
      if (attempt >= attempts || !isRetryableDirectError(error)) break;
      await delay(Math.min(DIRECT_REQUEST_RETRY_BASE_DELAY_MS * attempt, 3000));
    }
  }

  throw lastError;
}

async function directBridgeRequestOnce(baseUrl, route, options = {}) {
  const headers = { 'content-type': 'application/json' };
  if (options.token && !options.skipAuth) {
    headers.authorization = `Bearer ${options.token}`;
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs || DIRECT_REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(`${baseUrl}${route}`, {
      method: options.method || 'GET',
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: controller.signal
    });
  } catch (error) {
    error.retryable = true;
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (response.status === 401 && !options.skipAuth) {
    showOwnerSessionExpired();
  }

  if (!response.ok || data?.ok === false) {
    const error = new Error(data?.message || data?.error || `HTTP_${response.status}`);
    error.status = response.status;
    error.data = data;
    error.retryable = DIRECT_RETRYABLE_HTTP_STATUSES.has(response.status);
    throw error;
  }

  return data;
}

function shouldRetryDirectRequest(options) {
  const method = String(options.method || 'GET').toUpperCase();
  if (method === 'GET') return true;
  if (options.skipAuth) return true;
  return options.idempotent === true;
}

function isRetryableDirectError(error) {
  if (error?.status === 401 || error?.status === 403) return false;
  if (error?.retryable === true) return true;
  if (error?.status) return DIRECT_RETRYABLE_HTTP_STATUSES.has(error.status);

  const name = String(error?.name || '');
  const message = String(error?.message || '').toLowerCase();
  return name === 'AbortError'
    || message.includes('fetch')
    || message.includes('network')
    || message.includes('timeout')
    || message.includes('aborted');
}

function createClientCommandId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function sendTerminatorAction(payload) {
  const mode = getWebAppTransportMode();
  const tg = getTelegramTransport();

  if ((mode === 'telegram' || mode === 'auto') && tg) {
    try {
      tg.sendData(JSON.stringify(payload));
      return { ok: true, transport: 'telegram', message: 'Команда отправлена в Telegram' };
    } catch (error) {
      console.error('[MinaWebApp] Telegram sendData failed', error);
      return { ok: false, transport: 'telegram', message: 'Не удалось отправить команду в Telegram' };
    }
  }

  if (mode === 'telegram') {
    return {
      ok: false,
      transport: 'telegram',
      reason: 'telegram_unavailable',
      message: 'Команда доступна при запуске из Telegram'
    };
  }

  const directTransport = getDirectTransport();
  if (!directTransport) {
    console.log('[MinaWebApp] direct transport not configured', payload);
    return {
      ok: false,
      transport: 'direct',
      reason: 'direct_unconfigured',
      message: 'Прямое управление ещё не подключено'
    };
  }

  try {
    const response = await directTransport.send(payload);
    if (response?.ok === false) {
      return {
        ok: false,
        transport: 'direct',
        reason: response.reason || 'direct_rejected',
        message: response.message || 'Не удалось отправить прямую команду'
      };
    }

    const commandId = response?.command_id || response?.commandId || response?.id || null;
    return {
      ok: true,
      transport: 'direct',
      commandId,
      canTrackStatus: !!directTransport.getStatus,
      status: response?.status || (commandId ? 'queued' : null),
      message: commandId ? 'Команда отправлена' : 'Команда отправлена напрямую'
    };
  } catch (error) {
    console.error('[MinaWebApp] Direct transport failed', error);
    return {
      ok: false,
      transport: 'direct',
      message: error.status === 401 ? OWNER_SESSION_EXPIRED_MESSAGE : 'Не удалось отправить прямую команду'
    };
  }
}

window.sendTerminatorAction = sendTerminatorAction;
window.logoutOwnerSession = logoutOwnerSession;

const App = {
  current: 'start',
  selectedModel: 'chatgpt',
  workTasks: [],
  activeWorkTaskId: '',
  workPreview: null,
  workExpertOpen: false,
  workspaceActiveTab: 'files',
  workspacePendingCopyText: '',
  workspaceFileRuntime: new Map(),
  workspaceTimer: null,
  toastTimer: null,
  commandPollTimer: null,
  tg: null,
  order: ['start', 'menu', 'work', 'personal', 'brain', 'remote', 'complete'],
  anydesk: {
    id: '',
    status: 'не проверен',
    deepLink: '',
    checked: false,
    error: ''
  },

  init() {
    window.MinaApp = this;
    this.tg = window.Telegram?.WebApp || null;
    this.initTelegram();
    this.bindEvents();
    this.loadWorkTasks();
    this.attachVerifierPanel();
    this.renderWorkFormOptions();
    this.renderWorkTaskCard();
    this.renderBrain();
    this.renderAnyDeskAccess();
    this.startWorkspaceTimer();
    this.go('start', { immediate: true });
    this.retryTelegramInit();
  },

  initTelegram() {
    if (!this.tg) return;

    this.tg.ready();
    this.tg.expand();
    this.tg.setHeaderColor('#020710');
    this.tg.setBackgroundColor('#020710');

    if (this.tg.BackButton) {
      this.tg.BackButton.onClick(() => this.handleBack());
    }
  },

  retryTelegramInit() {
    if (this.tg) return;

    window.setTimeout(() => {
      if (this.tg || !window.Telegram?.WebApp) return;
      this.tg = window.Telegram.WebApp;
      this.initTelegram();
      this.updateTelegramControls();
    }, 500);
  },

  bindEvents() {
    document.addEventListener('click', (event) => {
      const navButton = event.target.closest('[data-nav]');
      if (navButton) {
        this.go(navButton.dataset.nav);
        return;
      }

      const closeButton = event.target.closest('[data-close]');
      if (closeButton) {
        this.closeOrFallback();
        return;
      }

      const toastButton = event.target.closest('[data-toast]');
      if (toastButton) {
        this.toast(toastButton.dataset.toast);
        return;
      }

      const modelButton = event.target.closest('[data-model]');
      if (modelButton) {
        this.selectModel(modelButton.dataset.model);
        return;
      }

      const workPreviewButton = event.target.closest('[data-work-preview]');
      if (workPreviewButton) {
        this.handleWorkPreviewAction(workPreviewButton.dataset.workPreview);
        return;
      }

      const workActionButton = event.target.closest('[data-work-action]');
      if (workActionButton) {
        this.handleWorkTaskAction(workActionButton.dataset.workAction);
        return;
      }

      const verifierButton = event.target.closest('[data-verifier-action]');
      if (verifierButton) {
        this.handleVerifierAction(verifierButton.dataset.verifierAction);
        return;
      }

      const workspaceTabButton = event.target.closest('[data-workspace-tab]');
      if (workspaceTabButton) {
        this.switchWorkspaceTab(workspaceTabButton.dataset.workspaceTab);
        return;
      }

      const workspaceActionButton = event.target.closest('[data-workspace-action]');
      if (workspaceActionButton) {
        this.handleWorkspaceAction(workspaceActionButton.dataset.workspaceAction, workspaceActionButton);
        return;
      }

      const fileActionButton = event.target.closest('[data-file-action]');
      if (fileActionButton) {
        this.handleWorkspaceFileAction(fileActionButton.dataset.fileAction, fileActionButton.dataset.fileId);
        return;
      }

      const artifactButton = event.target.closest('[data-artifact-action]');
      if (artifactButton) {
        this.handleWorkspaceArtifactAction(artifactButton.dataset.artifactAction, artifactButton.dataset.artifactId);
        return;
      }

      const privacyButton = event.target.closest('[data-privacy-action]');
      if (privacyButton) {
        this.handlePrivacyAction(privacyButton.dataset.privacyAction);
        return;
      }

      const approvalButton = event.target.closest('[data-approval-action]');
      if (approvalButton) {
        this.handleApprovalAction(approvalButton.dataset.approvalAction);
        return;
      }

      const workShortcutButton = event.target.closest('[data-work-shortcut]');
      if (workShortcutButton) {
        this.handleWorkShortcut(workShortcutButton.dataset.workShortcut);
      }
    });

    document.addEventListener('change', (event) => {
      const roleSelect = event.target.closest('[data-file-role]');
      if (roleSelect) {
        this.updateWorkspaceFileRole(roleSelect.dataset.fileRole, roleSelect.value);
      }
    });

    document.getElementById('btn-start').addEventListener('click', async () => {
      if (await this.prepareOwnerSession()) this.go('menu');
    });
    document.getElementById('work-task-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      this.createWorkPreview();
    });
    document.getElementById('workspace-file-input')?.addEventListener('change', (event) => {
      this.addWorkspaceFiles(event.target.files);
      event.target.value = '';
    });
    const dropzone = document.getElementById('workspace-file-drop');
    dropzone?.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropzone.classList.add('is-dragover');
    });
    dropzone?.addEventListener('dragleave', () => dropzone.classList.remove('is-dragover'));
    dropzone?.addEventListener('drop', (event) => {
      event.preventDefault();
      dropzone.classList.remove('is-dragover');
      this.addWorkspaceFiles(event.dataTransfer?.files);
    });
    document.getElementById('btn-open-model').addEventListener('click', () => {
      this.sendPersonalAction('open_brain', { brain: this.selectedModel });
    });
    document.getElementById('btn-anydesk').addEventListener('click', () => {
      this.sendPersonalAction('ensure_anydesk', { brain: this.selectedModel });
    });
    document.getElementById('btn-check-window').addEventListener('click', () => {
      this.sendPersonalAction('verify_brain', { brain: this.selectedModel });
    });
    document.getElementById('btn-open-anydesk').addEventListener('click', () => {
      this.openAnyDeskApp();
    });
    document.getElementById('btn-copy-anydesk').addEventListener('click', () => {
      this.copyAnyDeskId();
    });
    document.getElementById('btn-copy-anydesk-fallback').addEventListener('click', () => {
      this.copyAnyDeskId();
    });
    document.getElementById('btn-finished').addEventListener('click', () => {
      this.sendPersonalAction('done', { brain: this.selectedModel });
    });
    document.getElementById('btn-minimize').addEventListener('click', () => {
      this.sendPersonalAction('minimize_brain', { brain: this.selectedModel });
    });
    document.getElementById('btn-end-session').addEventListener('click', () => {
      this.closeOrFallback('start');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.closeOrFallback();
      if (event.key === 'Backspace' && !this.isTypingTarget(event.target)) this.handleBack();
    });
  },

  attachVerifierPanel() {
    const verifier = document.getElementById('work-verifier-panel');
    const tab = document.getElementById('workspace-tab-check');
    if (verifier && tab && verifier.parentElement !== tab) {
      tab.appendChild(verifier);
    }
  },

  startWorkspaceTimer() {
    if (this.workspaceTimer) return;
    this.workspaceTimer = window.setInterval(() => this.updateWorkspaceTimer(), 1000);
  },

  get model() {
    return MODELS[this.selectedModel] || MODELS.chatgpt;
  },

  selectModel(key) {
    if (!MODELS[key]) return;
    this.selectedModel = key;
    this.renderBrain();
    this.updateModelButtons();
    this.go('brain');
  },

  renderBrain() {
    const model = this.model;
    const brainIcon = document.getElementById('brain-icon');

    document.getElementById('brain-title').textContent = model.name;
    document.getElementById('brain-subtitle').textContent = 'Подключение к официальному окну через ПК Терминатора';
    document.getElementById('open-model-label').textContent = `Открыть ${model.name}`;
    document.getElementById('brain-profile').textContent = model.profile;

    brainIcon.textContent = model.short;
    brainIcon.className = `brain-mark model-icon ${model.iconClass}`;
  },

  updateModelButtons() {
    document.querySelectorAll('[data-model]').forEach((button) => {
      button.classList.toggle('command-button--active', button.dataset.model === this.selectedModel);
    });
  },

  go(name, options = {}) {
    const target = document.getElementById(`screen-${name}`);
    if (!target) return;

    this.current = name;

    document.querySelectorAll('.screen.active').forEach((screen) => {
      if (screen !== target) screen.classList.remove('active');
    });

    if (options.immediate) {
      target.classList.add('active');
    } else {
      window.requestAnimationFrame(() => target.classList.add('active'));
    }

    document.body.dataset.screen = name;
    this.updateTelegramControls();
  },

  handleBack() {
    const backMap = {
      start: null,
      menu: 'start',
      work: 'menu',
      personal: 'menu',
      brain: 'personal',
      remote: 'brain',
      complete: 'remote'
    };

    const next = backMap[this.current];
    if (next) this.go(next);
  },

  closeOrFallback(fallback) {
    if (this.tg?.close) {
      this.tg.close();
      return;
    }

    if (fallback) {
      this.go(fallback);
      return;
    }

    this.go(this.current === 'menu' ? 'start' : 'menu');
  },

  updateTelegramControls() {
    if (!this.tg?.BackButton) return;

    if (this.current === 'start') {
      this.tg.BackButton.hide();
    } else {
      this.tg.BackButton.show();
    }
  },

  renderWorkFormOptions() {
    this.fillSelect('work-project-select', WORK_PROJECTS, 'terminator');
    this.fillSelect('work-mode-select', WORK_MODES, 'auto');
    this.fillSelect('work-quality-select', WORK_QUALITY_LEVELS, 'auto');
  },

  fillSelect(id, options, selectedId) {
    const select = document.getElementById(id);
    if (!select) return;

    select.innerHTML = options
      .map((item) => `<option value="${item.id}"${item.id === selectedId ? ' selected' : ''}>${item.name}</option>`)
      .join('');
  },

  loadWorkTasks() {
    try {
      const raw = window.localStorage?.getItem(WORK_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      this.workTasks = Array.isArray(parsed) ? parsed.filter((task) => task?.task_id).map((task) => this.normalizeWorkTask(task)) : [];
      this.activeWorkTaskId = this.workTasks[0]?.task_id || '';
    } catch {
      this.workTasks = [];
      this.activeWorkTaskId = '';
    }
  },

  normalizeWorkTask(task) {
    const now = new Date().toISOString();
    task.goal = task.goal || task.user_request || task.title || 'не задано';
    task.messages = Array.isArray(task.messages) ? task.messages : [];
    task.files = Array.isArray(task.files) ? task.files : [];
    task.artifacts = Array.isArray(task.artifacts) ? task.artifacts : [];
    task.audit_log = Array.isArray(task.audit_log) ? task.audit_log : [];
    task.executor_state = task.executor_state && typeof task.executor_state === 'object'
      ? task.executor_state
      : {
          executor: task.executor || 'не назначен',
          status: 'not_sent',
          package_artifact_id: '',
          sent_by_user_at: '',
          timer_started_at: task.timer_started_at || '',
          timer_stopped_at: task.timer_stopped_at || '',
          report_artifact_id: ''
        };
    task.memory_preview = task.memory_preview && typeof task.memory_preview === 'object'
      ? task.memory_preview
      : {
          status: task.memory_status || 'ожидает данных',
          summary: '',
          decisions: [],
          risks: task.risks || [],
          next_step: task.next_step || '',
          linked_artifact_ids: [],
          linked_file_ids: []
        };
    task.approval_requests = Array.isArray(task.approval_requests) ? task.approval_requests : [];
    task.timer_started_at = task.timer_started_at || task.executor_state.timer_started_at || '';
    task.timer_stopped_at = task.timer_stopped_at || task.executor_state.timer_stopped_at || '';
    task.updated_at = task.updated_at || now;
    task.created_at = task.created_at || now;
    task.executor = task.executor || task.executor_state.executor || 'не назначен';
    task.files = task.files.map((file) => ({
      ...file,
      role: file.role || 'attachment',
      status: file.status || 'attached',
      is_evidence: Boolean(file.is_evidence || file.role === 'evidence'),
      notes: file.notes || ''
    }));
    return task;
  },

  saveWorkTasks() {
    try {
      window.localStorage?.setItem(WORK_STORAGE_KEY, JSON.stringify(this.workTasks.slice(0, 50)));
    } catch {
      this.toast('Локальное сохранение недоступно');
    }
  },

  createWorkPreview() {
    const input = document.getElementById('work-task-input');
    const request = String(input?.value || '').trim();
    if (!request) {
      this.toast('Опиши задачу');
      input?.focus();
      return;
    }

    const selected = {
      project_id: document.getElementById('work-project-select')?.value || 'terminator',
      mode: document.getElementById('work-mode-select')?.value || 'auto',
      quality_level: document.getElementById('work-quality-select')?.value || 'auto'
    };

    this.workPreview = this.buildWorkPreview(request, selected);
    this.renderWorkPreview(false);
    this.toast('Preview задачи готов');
  },

  buildWorkPreview(request, selected) {
    const lower = request.toLowerCase();
    let projectId = selected.project_id || 'terminator';
    let mode = selected.mode || 'auto';
    let quality = selected.quality_level || 'auto';
    let nextStep = 'Уточнить контекст и подготовить безопасный план';
    let criteria = [
      'Результат понятен владельцу',
      'Риски перечислены',
      'Следующий шаг можно проверить'
    ];
    let risks = ['контекст может быть неполным'];

    if (/(архив|codex|отчет|отчёт|проверка|принять|fix|checkpoint)/i.test(request)) {
      projectId = 'development_executors';
      mode = 'check_result';
      quality = 'maximum';
      nextStep = 'Запустить проверку результата';
      criteria = ['проверки пройдены', 'evidence создан', 'секреты не раскрыты'];
      risks = ['может потребоваться ручная перепроверка архива'];
    } else if (/(диплом|qa|тест|критерии|проверка)/i.test(request)) {
      projectId = 'diploma_qa';
      mode = 'analysis';
      quality = 'maximum';
      nextStep = 'Разобрать критерии и составить проверочный план';
      criteria = ['критерии понятны', 'план проверки готов', 'результат можно защитить'];
      risks = ['может не хватить исходных материалов'];
    } else if (/(исследуй|найди|сравни|источники|deep research)/i.test(lower)) {
      projectId = 'research_documents';
      mode = 'research';
      quality = 'maximum';
      nextStep = 'Собрать источники и сравнить позиции';
      criteria = ['источники перечислены', 'выводы отделены от фактов', 'есть краткая рекомендация'];
      risks = ['нужна проверка актуальности источников'];
    } else if (/(терминатор|mina|direct|local agent|bridge|рабочее)/i.test(request)) {
      projectId = 'terminator';
      mode = selected.mode === 'prepare_task' ? 'prepare_task' : 'analysis';
      quality = 'maximum';
      nextStep = 'Разложить задачу на безопасный минимальный v1';
      criteria = ['Direct Mode не сломан', 'Personal fallback сохранён', 'нет сетевых изменений'];
      risks = ['можно задеть стабильный runtime'];
    }

    if (quality === 'auto') quality = this.isImportantWorkRequest(request) ? 'maximum' : 'standard';

    return {
      user_request: request,
      project_id: projectId,
      mode,
      quality_level: quality,
      title: this.makeWorkTitle(request),
      next_step: nextStep,
      readiness_criteria: criteria,
      risks,
      context_scope: 'локальный UI-фундамент, без запуска исполнителей',
      constraints: [
        'без AI API',
        'без Direct Bridge изменений',
        'без Local Agent изменений',
        'без сетевых изменений'
      ],
      forbidden_actions: [
        'автозапуск внешних исполнителей',
        'изменение .env',
        'деплой',
        'опасные действия на ПК'
      ]
    };
  },

  isImportantWorkRequest(request) {
    return /(провер|принять|архив|код|fix|checkpoint|диплом|источник|терминатор|direct|bridge)/i.test(request);
  },

  makeWorkTitle(request) {
    const compact = request.replace(/\s+/g, ' ').trim();
    if (compact.length <= 58) return compact;
    return `${compact.slice(0, 55).trim()}...`;
  },

  renderWorkPreview(showExpert) {
    const preview = this.workPreview;
    const panel = document.getElementById('work-preview');
    const details = document.getElementById('work-preview-details');
    if (!panel || !details || !preview) return;

    const rows = [
      ['Проект', this.projectName(preview.project_id)],
      ['Режим', this.modeName(preview.mode)],
      ['Качество', this.qualityName(preview.quality_level)],
      ['Название', preview.title],
      ['Лучший следующий шаг', preview.next_step],
      ['Критерии готовности', preview.readiness_criteria.join('; ')],
      ['Риски', preview.risks.join('; ')]
    ];

    if (showExpert) {
      rows.push(
        ['context_scope', preview.context_scope],
        ['constraints', preview.constraints.join('; ')],
        ['forbidden_actions', preview.forbidden_actions.join('; ')]
      );
    }

    details.innerHTML = rows.map(([label, value]) => `
      <div>
        <dt>${this.escapeHtml(label)}</dt>
        <dd>${this.escapeHtml(value)}</dd>
      </div>
    `).join('');
    panel.hidden = false;
    panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  },

  handleWorkPreviewAction(action) {
    if (action === 'confirm') {
      this.confirmWorkPreview();
      return;
    }
    if (action === 'edit') {
      document.getElementById('work-task-input')?.focus();
      this.toast('Можно изменить описание задачи');
      return;
    }
    if (action === 'expert') {
      this.renderWorkPreview(true);
      this.toast('Экспертный preview открыт');
      return;
    }
    if (action === 'cancel') {
      this.workPreview = null;
      const panel = document.getElementById('work-preview');
      if (panel) panel.hidden = true;
      this.toast('Создание задачи отменено');
    }
  },

  confirmWorkPreview() {
    if (!this.workPreview) return;
    const now = new Date().toISOString();
    const task = {
      task_id: this.createTaskId(),
      project_id: this.workPreview.project_id,
      title: this.workPreview.title,
      goal: this.workPreview.user_request,
      user_request: this.workPreview.user_request,
      mode: this.workPreview.mode,
      quality_level: this.workPreview.quality_level,
      status: 'created',
      created_at: now,
      updated_at: now,
      readiness_criteria: this.workPreview.readiness_criteria,
      risks: this.workPreview.risks,
      next_step: this.workPreview.next_step,
      context_scope: this.workPreview.context_scope,
      constraints: this.workPreview.constraints,
      forbidden_actions: this.workPreview.forbidden_actions,
      executor: 'не назначен',
      timer_started_at: '',
      timer_stopped_at: '',
      messages: [],
      files: [],
      artifacts: [],
      executor_state: {
        executor: 'не назначен',
        status: 'not_sent',
        package_artifact_id: '',
        sent_by_user_at: '',
        timer_started_at: '',
        timer_stopped_at: '',
        report_artifact_id: ''
      },
      evidence_ids: [],
      verifier_result: '',
      verifier_checklist: {},
      verifier_risks: {
        not_checked: '',
        manual_review: '',
        can_break: '',
        first_check: ''
      },
      verifier_notes: {
        report: '',
        evidence: '',
        expected: this.workPreview.user_request,
        first_check: this.workPreview.next_step
      },
      verifier_return_text: '',
      verified_at: '',
      memory_status: 'не сохранено',
      memory_preview: {
        status: 'ожидает данных',
        summary: this.workPreview.user_request,
        decisions: [],
        risks: this.workPreview.risks,
        next_step: this.workPreview.next_step,
        linked_artifact_ids: [],
        linked_file_ids: []
      },
      approval_required: 'ожидает решения владельца',
      approval_requests: [],
      audit_log: []
    };
    this.addWorkAudit(task, 'Preview показан пользователю.');
    this.addWorkAudit(task, 'Preview подтвержден.');
    this.addWorkspaceMessage(task, 'system_event', 'Рабочее окно', 'Задача создана. Preview подтверждён владельцем.');
    this.createArtifact(
      task,
      'SPEC',
      'Исходная задача',
      task.title,
      [
        `Задача: ${task.title}`,
        `Цель: ${task.goal}`,
        `Критерии: ${task.readiness_criteria.join('; ')}`,
        `Ограничения: ${task.constraints.join('; ')}`
      ].join('\n'),
      'preview'
    );
    this.workTasks.unshift(task);
    this.activeWorkTaskId = task.task_id;
    this.workExpertOpen = false;
    this.saveWorkTasks();
    document.getElementById('work-preview').hidden = true;
    this.renderWorkTaskCard();
    this.toast(`Задача создана: ${task.task_id}`);
  },

  createTaskId() {
    const year = new Date().getFullYear();
    let counter = Number(window.localStorage?.getItem(WORK_COUNTER_KEY) || '0') + 1;
    let taskId = `TASK-${year}-${String(counter).padStart(4, '0')}`;

    while (this.workTasks.some((task) => task.task_id === taskId)) {
      counter += 1;
      taskId = `TASK-${year}-${String(counter).padStart(4, '0')}`;
    }

    try {
      window.localStorage?.setItem(WORK_COUNTER_KEY, String(counter));
    } catch {}
    return taskId;
  },

  renderWorkTaskCard() {
    const card = document.getElementById('work-task-card');
    if (!card) return;
    const task = this.getActiveWorkTask();
    if (!task) {
      card.hidden = true;
      return;
    }

    card.hidden = false;
    document.getElementById('work-task-id-label').textContent = task.task_id;
    document.getElementById('work-task-title').textContent = task.title;
    document.getElementById('work-task-status').textContent = this.statusName(task.status);
    document.getElementById('work-task-simple').innerHTML = this.renderWorkSimpleHtml(task);
    this.renderWorkspaceWindow(task);
    this.updateVerifierActionHints(task);
    this.renderVerifierPanel(task);
    this.renderWorkExpertView(task);
  },

  renderWorkSimpleHtml(task) {
    const plan = this.buildShortWorkPlan(task);
    return `
      <dl class="work-details">
        <div><dt>Проект</dt><dd>${this.escapeHtml(this.projectName(task.project_id))}</dd></div>
        <div><dt>Статус</dt><dd>${this.escapeHtml(this.statusName(task.status))}</dd></div>
        <div><dt>Краткая цель</dt><dd>${this.escapeHtml(task.user_request)}</dd></div>
        <div><dt>Лучший следующий шаг</dt><dd>${this.escapeHtml(task.next_step)}</dd></div>
        <div><dt>Краткий план</dt><dd>${this.escapeHtml(plan)}</dd></div>
        <div><dt>Проверка</dt><dd>${this.escapeHtml(this.verifierVerdictName(task.verifier_result))}</dd></div>
      </dl>
    `;
  },

  buildShortWorkPlan(task) {
    return [
      '1. Уточнить контекст.',
      `2. Подготовить режим: ${this.modeName(task.mode)}.`,
      '3. Согласовать безопасный следующий шаг.'
    ].join(' ');
  },

  renderWorkspaceWindow(task) {
    if (!task) return;
    this.renderWorkspaceTop(task);
    this.renderWorkspaceTaskList();
    this.renderWorkspaceSummary(task);
    this.renderWorkspaceHistory(task);
    this.renderWorkspaceTabs();
    this.renderWorkspaceFiles(task);
    this.renderWorkspaceArtifacts(task);
    this.renderWorkspaceMemory(task);
    this.updateWorkspaceTimer();
  },

  renderWorkspaceTop(task) {
    const setText = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };
    setText('workspace-title', task.title || 'Задача');
    setText('workspace-project', `Проект: ${this.projectName(task.project_id)}`);
    setText('workspace-status', `Статус: ${this.statusName(task.status)}`);
    setText('workspace-executor', `Исполнитель: ${task.executor || task.executor_state?.executor || 'не назначен'}`);
    setText('workspace-risk', `Риск: ${this.workspaceRiskLevel(task)}`);
  },

  renderWorkspaceTaskList() {
    const host = document.getElementById('workspace-task-list');
    const activeCount = document.getElementById('workspace-active-count');
    const waitingCount = document.getElementById('workspace-waiting-count');
    const checkCount = document.getElementById('workspace-check-count');
    const riskCount = document.getElementById('workspace-risk-count');
    const tasks = this.workTasks || [];

    if (activeCount) activeCount.textContent = String(tasks.length);
    if (waitingCount) waitingCount.textContent = String(tasks.filter((task) => task.status === 'waiting_executor_report').length);
    if (checkCount) checkCount.textContent = String(tasks.filter((task) => ['executor_report_received', 'verifying', 'manual_required'].includes(task.status)).length);
    if (riskCount) riskCount.textContent = String(tasks.filter((task) => this.workspaceRiskLevel(task) !== 'низкий').length);

    if (!host) return;
    host.innerHTML = tasks.slice(0, 8).map((task) => `
      <button type="button" class="${task.task_id === this.activeWorkTaskId ? 'active' : ''}" data-workspace-action="select_task" data-task-id="${this.escapeHtml(task.task_id)}">
        <span>${this.escapeHtml(task.title || task.task_id)}</span>
        <small>${this.escapeHtml(this.statusName(task.status))}</small>
      </button>
    `).join('') || '<p class="workspace-empty">Задачи появятся после создания.</p>';
  },

  renderWorkspaceSummary(task) {
    const goal = document.getElementById('workspace-goal');
    const readiness = document.getElementById('workspace-readiness');
    const nextStep = document.getElementById('workspace-next-step');
    if (goal) goal.textContent = task.goal || task.user_request || 'не задано';
    if (nextStep) nextStep.textContent = task.next_step || 'не задано';
    if (readiness) {
      const criteria = Array.isArray(task.readiness_criteria) ? task.readiness_criteria : [];
      readiness.innerHTML = criteria.length
        ? criteria.map((item) => `<li>${this.escapeHtml(item)}</li>`).join('')
        : '<li>не задано</li>';
    }
  },

  renderWorkspaceHistory(task) {
    const host = document.getElementById('workspace-history');
    if (!host) return;
    const messages = Array.isArray(task.messages) ? task.messages : [];
    const audit = Array.isArray(task.audit_log) ? task.audit_log.slice(-8) : [];
    const auditMessages = audit.map((text, index) => ({
      message_id: `audit-${index}`,
      type: 'system_event',
      author: 'Система',
      text,
      created_at: task.updated_at || task.created_at
    }));
    const combined = [...messages, ...auditMessages]
      .sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));

    host.innerHTML = combined.length ? combined.map((message) => `
      <article class="workspace-message workspace-message--${this.escapeHtml(message.type || 'system_event')}">
        <div>
          <strong>${this.escapeHtml(this.workspaceMessageAuthor(message))}</strong>
          <span>${this.escapeHtml(this.formatTaskTime(message.created_at))}</span>
        </div>
        <em>${this.escapeHtml(this.workspaceMessageLabel(message.type))}</em>
        <p>${this.escapeHtml(message.text || 'нет текста')}</p>
      </article>
    `).join('') : '<p class="workspace-empty">История появится после уточнений, файлов и отчётов.</p>';
    host.scrollTop = host.scrollHeight;
  },

  renderWorkspaceTabs() {
    const activeTab = WORKSPACE_TABS.has(this.workspaceActiveTab) ? this.workspaceActiveTab : 'files';
    this.workspaceActiveTab = activeTab;
    document.querySelectorAll('[data-workspace-tab]').forEach((button) => {
      button.classList.toggle('active', button.dataset.workspaceTab === activeTab);
    });
    document.querySelectorAll('.workspace-tab-panel').forEach((panel) => {
      panel.hidden = panel.id !== `workspace-tab-${activeTab}`;
    });
    const verifierPanel = document.getElementById('work-verifier-panel');
    if (verifierPanel) verifierPanel.hidden = activeTab !== 'check';
  },

  renderWorkspaceFiles(task) {
    const host = document.getElementById('workspace-files-list');
    if (!host) return;
    const files = Array.isArray(task.files) ? task.files : [];
    host.innerHTML = files.length ? files.map((file) => {
      const runtime = this.workspaceFileRuntime.get(file.file_id) || {};
      const preview = this.renderWorkspaceFilePreview(file, runtime);
      const roles = WORK_FILE_ROLES.map((role) => `
        <option value="${this.escapeHtml(role.id)}" ${file.role === role.id ? 'selected' : ''}>${this.escapeHtml(role.name)}</option>
      `).join('');
      return `
        <article class="workspace-file-card">
          <div class="workspace-file-main">
            <strong>${this.escapeHtml(file.name)}</strong>
            <span>${this.escapeHtml(file.extension || 'file')} · ${this.escapeHtml(file.human_size || '0 B')} · ${this.escapeHtml(file.status || 'attached')}</span>
            ${preview}
          </div>
          <label>
            <span>Роль</span>
            <select data-file-role="${this.escapeHtml(file.file_id)}">${roles}</select>
          </label>
          <div class="workspace-file-actions">
            <button type="button" data-file-action="make_evidence" data-file-id="${this.escapeHtml(file.file_id)}">Сделать evidence</button>
            <button type="button" data-file-action="verifier_input" data-file-id="${this.escapeHtml(file.file_id)}">Для проверки</button>
            <button type="button" data-file-action="executor_package" data-file-id="${this.escapeHtml(file.file_id)}">В пакет Codex</button>
            <button type="button" data-file-action="research_source" data-file-id="${this.escapeHtml(file.file_id)}">Для исследования</button>
            <button type="button" data-file-action="remove" data-file-id="${this.escapeHtml(file.file_id)}">Удалить из задачи</button>
          </div>
        </article>
      `;
    }).join('') : '<p class="workspace-empty">Файлы пока не прикреплены. В v1 после перезагрузки доступны только metadata.</p>';
  },

  renderWorkspaceFilePreview(file, runtime) {
    if (runtime.previewType === 'image' && runtime.objectUrl) {
      return `<img class="workspace-file-thumb" src="${this.escapeHtml(runtime.objectUrl)}" alt="">`;
    }
    if (runtime.previewType === 'text' && runtime.previewText) {
      return `<pre class="workspace-file-preview">${this.escapeHtml(runtime.previewText)}</pre>`;
    }
    if (ARCHIVE_EXTENSIONS.has(file.extension)) return '<p class="workspace-file-note">Архив: автораспаковка недоступна.</p>';
    if (MEDIA_EXTENSIONS.has(file.extension)) return '<p class="workspace-file-note">Медиа: автоанализ будет добавлен позже.</p>';
    if (['pdf', 'docx', 'xlsx', 'rtf'].includes(file.extension)) return '<p class="workspace-file-note">Preview для этого формата будет добавлен позже.</p>';
    return '<p class="workspace-file-note">Файл прикреплён к текущей сессии. Постоянное файловое хранилище будет добавлено позже.</p>';
  },

  renderWorkspaceArtifacts(task) {
    const host = document.getElementById('workspace-artifacts-list');
    const previewWrap = document.getElementById('workspace-context-preview-wrap');
    const preview = document.getElementById('workspace-context-preview');
    if (!host) return;
    const artifacts = Array.isArray(task.artifacts) ? task.artifacts : [];
    host.innerHTML = artifacts.length ? artifacts.map((artifact) => `
      <article class="workspace-artifact-card">
        <div>
          <strong>${this.escapeHtml(artifact.title)}</strong>
          <span>${this.escapeHtml(this.artifactTypeName(artifact.type))} · ${this.escapeHtml(artifact.status || 'draft')} · ${this.escapeHtml(this.formatTaskTime(artifact.created_at))}</span>
          <p>${this.escapeHtml(artifact.summary || 'нет краткого описания')}</p>
        </div>
        <div class="workspace-file-actions">
          <button type="button" data-artifact-action="open" data-artifact-id="${this.escapeHtml(artifact.artifact_id)}">Открыть</button>
          <button type="button" data-artifact-action="copy" data-artifact-id="${this.escapeHtml(artifact.artifact_id)}">Копировать</button>
        </div>
      </article>
    `).join('') : '<p class="workspace-empty">Артефакты появятся после создания пакета, отчёта или проверки.</p>';
    const contextPack = artifacts.find((artifact) => artifact.type === 'CONTEXT_PACK' && artifact.status !== 'archived');
    if (previewWrap && preview) {
      previewWrap.hidden = !contextPack;
      preview.value = contextPack?.content || '';
    }
  },

  renderWorkspaceMemory(task) {
    const status = document.getElementById('workspace-memory-status');
    const host = document.getElementById('workspace-memory-preview');
    const memory = task.memory_preview || {};
    if (status) status.textContent = memory.status || task.memory_status || 'ожидает данных';
    if (!host) return;
    const linkedArtifacts = (memory.linked_artifact_ids || []).length || (task.artifacts || []).filter((artifact) => ['DECISION_RECORD', 'VERIFIER_VERDICT', 'EXECUTOR_REPORT'].includes(artifact.type)).length;
    const linkedFiles = (memory.linked_file_ids || []).length || (task.files || []).filter((file) => file.is_evidence).length;
    host.innerHTML = `
      <dl class="work-details">
        <div><dt>Что сохранить</dt><dd>${this.escapeHtml(memory.summary || task.goal || task.user_request || 'не задано')}</dd></div>
        <div><dt>Решения</dt><dd>${this.escapeHtml(this.listOrFallback(memory.decisions, 'ожидает данных'))}</dd></div>
        <div><dt>Риски</dt><dd>${this.escapeHtml(this.listOrFallback(memory.risks || task.risks, 'не задано'))}</dd></div>
        <div><dt>Следующий шаг</dt><dd>${this.escapeHtml(memory.next_step || task.next_step || 'не задано')}</dd></div>
        <div><dt>Связанные artifacts</dt><dd>${linkedArtifacts ? String(linkedArtifacts) : 'нет artifacts'}</dd></div>
        <div><dt>Связанные files/evidence</dt><dd>${linkedFiles ? String(linkedFiles) : 'нет evidence'}</dd></div>
      </dl>
    `;
  },

  switchWorkspaceTab(tab) {
    if (!WORKSPACE_TABS.has(tab)) return;
    this.workspaceActiveTab = tab;
    this.renderWorkspaceTabs();
    if (tab === 'check') {
      const task = this.getActiveWorkTask();
      if (task) this.renderVerifierPanel(task);
    }
  },

  handleWorkspaceAction(action, sourceButton = null) {
    const task = this.getActiveWorkTask();
    if (!task && action !== 'add_files') {
      this.toast('Сначала создай задачу');
      return;
    }

    const actionTaskId = sourceButton?.closest?.('[data-task-id]')?.dataset?.taskId;
    if (action === 'select_task' && actionTaskId) {
      this.activeWorkTaskId = actionTaskId;
      this.renderWorkTaskCard();
      return;
    }

    const handlers = {
      add_files: () => document.getElementById('workspace-file-input')?.click(),
      send_message: () => this.sendWorkspaceMessage(),
      build_context_pack: () => this.buildAndShowContextPack(task),
      copy_context_pack: () => this.copyContextPack(task),
      mark_sent: () => this.markContextPackSent(task),
      insert_report: () => this.prepareReportInput(),
      open_verifier: () => this.openVerifierPanel(task),
      save_memory_preview: () => this.saveWorkspaceMemoryPreview(task),
      edit_memory_preview: () => this.showWorkSafeOutput(task, 'Память', 'Редактирование Memory preview будет реализовано следующим этапом.', task.status),
      skip_memory_preview: () => this.skipWorkspaceMemoryPreview(task)
    };

    handlers[action]?.();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  handleWorkspaceFileAction(action, fileId) {
    const task = this.getActiveWorkTask();
    if (!task) return;
    const file = task.files.find((item) => item.file_id === fileId);
    if (!file) return;

    if (action === 'remove') {
      task.files = task.files.filter((item) => item.file_id !== fileId);
      this.workspaceFileRuntime.delete(fileId);
      this.addWorkspaceMessage(task, 'file_added', 'Файлы', `Файл удалён из задачи: ${file.name}`);
    } else {
      const role = action === 'make_evidence' ? 'evidence' : action;
      this.setWorkspaceFileRole(task, file, role);
    }

    task.updated_at = new Date().toISOString();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  handleWorkspaceArtifactAction(action, artifactId) {
    const task = this.getActiveWorkTask();
    if (!task) return;
    const artifact = task.artifacts.find((item) => item.artifact_id === artifactId);
    if (!artifact) return;
    if (action === 'open') {
      const previewWrap = document.getElementById('workspace-context-preview-wrap');
      const preview = document.getElementById('workspace-context-preview');
      if (previewWrap && preview) {
        previewWrap.hidden = false;
        preview.value = artifact.content || artifact.summary || '';
      }
      this.switchWorkspaceTab('artifacts');
      this.toast('Артефакт открыт');
      return;
    }
    if (action === 'copy') {
      this.copyWorkspaceText(artifact.content || artifact.summary || artifact.title);
      this.addWorkspaceMessage(task, 'system_event', 'Артефакты', `Скопирован артефакт: ${artifact.title}`);
      this.saveWorkTasks();
      this.renderWorkTaskCard();
    }
  },

  updateWorkspaceFileRole(fileId, role) {
    const task = this.getActiveWorkTask();
    if (!task) return;
    const file = task.files.find((item) => item.file_id === fileId);
    if (!file) return;
    this.setWorkspaceFileRole(task, file, role);
    task.updated_at = new Date().toISOString();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  setWorkspaceFileRole(task, file, role) {
    if (!WORK_FILE_ROLE_BY_ID[role]) return;
    file.role = role;
    file.is_evidence = role === 'evidence';
    file.status = role === 'executor_package' ? 'ready_for_package' : 'attached';
    this.addWorkspaceMessage(task, 'file_added', 'Файлы', `Файлу назначена роль: ${file.name} — ${this.fileRoleName(role)}`);
  },

  async addWorkspaceFiles(fileList) {
    const task = this.getActiveWorkTask();
    const files = Array.from(fileList || []);
    if (!task) {
      this.toast('Сначала создай задачу');
      return;
    }
    if (!files.length) return;

    for (const file of files) {
      const metadata = this.createFileMetadata(task, file);
      task.files.push(metadata);
      await this.prepareWorkspaceFileRuntime(file, metadata);
      this.addWorkspaceMessage(task, 'file_added', 'Файлы', `Прикреплён файл: ${metadata.name}`);
    }
    task.updated_at = new Date().toISOString();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
    this.switchWorkspaceTab('files');
    this.toast(`Файлы добавлены: ${files.length}`);
  },

  createFileMetadata(task, file) {
    const extension = this.fileExtension(file.name);
    return {
      file_id: this.generateWorkspaceId('FILE'),
      task_id: task.task_id,
      project_id: task.project_id,
      name: file.name,
      extension,
      mime_type: file.type || 'application/octet-stream',
      size_bytes: file.size || 0,
      human_size: this.humanFileSize(file.size || 0),
      role: 'attachment',
      status: 'session_only',
      is_evidence: false,
      added_at: new Date().toISOString(),
      notes: this.fileKindLabel(extension)
    };
  },

  async prepareWorkspaceFileRuntime(file, metadata) {
    const extension = metadata.extension;
    const runtime = {};
    if (IMAGE_PREVIEW_EXTENSIONS.has(extension)) {
      runtime.previewType = 'image';
      runtime.objectUrl = URL.createObjectURL(file);
    } else if (TEXT_PREVIEW_EXTENSIONS.has(extension) && file.size <= 128 * 1024) {
      runtime.previewType = 'text';
      runtime.previewText = (await file.text()).slice(0, 900);
    }
    this.workspaceFileRuntime.set(metadata.file_id, runtime);
  },

  sendWorkspaceMessage() {
    const task = this.getActiveWorkTask();
    const input = document.getElementById('workspace-message-input');
    const mode = document.getElementById('workspace-message-mode')?.value || 'clarification';
    const text = String(input?.value || '').trim();
    if (!task) {
      this.toast('Сначала создай задачу');
      return;
    }
    if (!text) {
      input?.focus();
      this.toast('Напиши сообщение');
      return;
    }

    if (mode === 'command' && DANGEROUS_COMMAND_PATTERN.test(text)) {
      this.showWorkspaceApproval(task, text);
      input.value = '';
      this.saveWorkTasks();
      this.renderWorkTaskCard();
      return;
    }

    if (mode === 'report') {
      this.insertExecutorReport(task, text);
    } else {
      const typeByMode = {
        clarification: 'clarification',
        command: 'system_event',
        codex: 'clarification',
        research: 'memory_event',
        decision: 'decision'
      };
      const authorByMode = {
        clarification: 'Владелец',
        command: 'Команда',
        codex: 'Для Codex',
        research: 'Research',
        decision: 'Решение'
      };
      this.addWorkspaceMessage(task, typeByMode[mode] || 'user_message', authorByMode[mode] || 'Владелец', text);
      if (mode === 'codex') this.createFollowupArtifact(task, text);
      if (mode === 'decision') this.createArtifact(task, 'DECISION_RECORD', 'Решение владельца', text.slice(0, 160), text, 'console');
    }

    input.value = '';
    task.updated_at = new Date().toISOString();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  prepareReportInput() {
    const mode = document.getElementById('workspace-message-mode');
    const input = document.getElementById('workspace-message-input');
    if (mode) mode.value = 'report';
    if (input) {
      input.placeholder = 'Вставьте отчёт исполнителя';
      input.focus();
    }
    this.toast('Вставь отчёт в нижнюю консоль');
  },

  insertExecutorReport(task, reportText) {
    const now = new Date().toISOString();
    const artifact = this.createArtifact(
      task,
      'EXECUTOR_REPORT',
      'Отчёт исполнителя',
      reportText.slice(0, 220),
      reportText,
      'executor_report'
    );
    task.status = 'executor_report_received';
    task.timer_stopped_at = now;
    task.executor_state = {
      ...(task.executor_state || {}),
      executor: task.executor || 'Codex',
      status: 'report_received',
      timer_stopped_at: now,
      report_artifact_id: artifact.artifact_id
    };
    this.addWorkspaceMessage(task, 'executor_report_received', 'Исполнитель', 'Отчёт получен. Можно запустить проверку.');
    this.addWorkAudit(task, 'Отчёт исполнителя сохранён как artifact.');
    this.switchWorkspaceTab('artifacts');
  },

  buildAndShowContextPack(task) {
    const content = this.buildContextPackContent(task);
    const existing = task.artifacts.find((artifact) => artifact.type === 'CONTEXT_PACK' && artifact.status !== 'archived');
    const artifact = existing || this.createArtifact(task, 'CONTEXT_PACK', 'Пакет для Codex', 'Контекст задачи для внешнего исполнителя.', content, 'workspace');
    artifact.content = content;
    artifact.summary = 'Контекст задачи для внешнего исполнителя.';
    artifact.updated_at = new Date().toISOString();
    task.executor_state = {
      ...(task.executor_state || {}),
      package_artifact_id: artifact.artifact_id
    };
    this.addWorkspaceMessage(task, 'context_pack_created', 'Рабочее окно', 'Пакет для Codex сформирован.');
    this.switchWorkspaceTab('artifacts');
  },

  buildContextPackContent(task) {
    const files = (task.files || []).map((file) => `- ${file.name} (${this.fileRoleName(file.role)}, ${file.human_size})`).join('\n') || '- файлов нет';
    const clarifications = (task.messages || [])
      .filter((message) => ['clarification', 'user_message', 'decision'].includes(message.type))
      .map((message) => `- ${this.formatTaskTime(message.created_at)} ${message.author}: ${message.text}`)
      .join('\n') || '- уточнений пока нет';
    return [
      '# Пакет для Codex',
      '',
      `Задача: ${task.title}`,
      `task_id: ${task.task_id}`,
      `Проект: ${this.projectName(task.project_id)}`,
      `Статус: ${this.statusName(task.status)}`,
      `Исполнитель: ${task.executor || 'Codex'}`,
      '',
      '## Цель',
      task.goal || task.user_request || 'не задано',
      '',
      '## Уточнения пользователя',
      clarifications,
      '',
      '## Файлы и роли',
      files,
      '',
      '## Ограничения',
      this.listOrFallback(task.constraints, 'не задано'),
      '',
      '## Что нельзя трогать',
      this.listOrFallback(task.forbidden_actions, 'не задано'),
      '',
      '## Критерии готовности',
      this.listOrFallback(task.readiness_criteria, 'не задано'),
      '',
      '## Формат ответа',
      '- что сделано;',
      '- какие файлы изменены;',
      '- какие проверки пройдены;',
      '- что не проверено;',
      '- риски;',
      '- что основной ветке проверить первым.',
      '',
      '## Что основной ветке проверить первым',
      task.next_step || 'не задано'
    ].join('\n');
  },

  copyContextPack(task) {
    const artifact = (task.artifacts || []).find((item) => item.type === 'CONTEXT_PACK' && item.status !== 'archived');
    const content = artifact?.content || this.buildContextPackContent(task);
    this.workspacePendingCopyText = content;
    if (PRIVACY_GUARD_PATTERN.test(content)) {
      const guard = document.getElementById('workspace-privacy-guard');
      if (guard) guard.hidden = false;
      this.toast('Проверь пакет на секреты');
      return;
    }
    this.copyWorkspaceText(content);
    this.addWorkspaceMessage(task, 'system_event', 'Рабочее окно', 'Пакет для Codex скопирован.');
  },

  handlePrivacyAction(action) {
    const guard = document.getElementById('workspace-privacy-guard');
    if (action === 'copy_anyway' && this.workspacePendingCopyText) {
      this.copyWorkspaceText(this.workspacePendingCopyText);
    }
    if (action === 'review') this.switchWorkspaceTab('artifacts');
    if (guard) guard.hidden = true;
    this.workspacePendingCopyText = '';
  },

  markContextPackSent(task) {
    const now = new Date().toISOString();
    if (!task.artifacts?.some((artifact) => artifact.type === 'CONTEXT_PACK')) {
      this.buildAndShowContextPack(task);
    }
    const contextPack = task.artifacts.find((artifact) => artifact.type === 'CONTEXT_PACK');
    task.executor = 'Codex';
    task.status = 'waiting_executor_report';
    task.timer_started_at = now;
    task.timer_stopped_at = '';
    task.executor_state = {
      executor: 'Codex',
      status: 'waiting_report',
      package_artifact_id: contextPack?.artifact_id || '',
      sent_by_user_at: now,
      timer_started_at: now,
      timer_stopped_at: '',
      report_artifact_id: ''
    };
    this.addWorkspaceMessage(task, 'executor_marked_sent', 'Рабочее окно', 'Пакет отмечен как отправленный в Codex. Терминатор ожидает отчёт исполнителя.');
    this.addWorkAudit(task, 'Пакет отмечен как отправленный в Codex.');
    this.toast('Ожидание отчёта исполнителя запущено');
  },

  showWorkspaceApproval(task, commandText) {
    const request = {
      approval_id: this.generateWorkspaceId('APPROVAL'),
      task_id: task.task_id,
      command: commandText,
      status: 'manual_required',
      created_at: new Date().toISOString()
    };
    task.approval_requests = Array.isArray(task.approval_requests) ? task.approval_requests : [];
    task.approval_requests.push(request);
    task.approval_required = 'manual_required';
    const panel = document.getElementById('workspace-approval-panel');
    if (panel) panel.hidden = false;
    this.addWorkspaceMessage(task, 'approval_event', 'Подтверждение', 'Опасная команда не выполнена. Требуется Approval Center.');
  },

  handleApprovalAction(action) {
    const task = this.getActiveWorkTask();
    const panel = document.getElementById('workspace-approval-panel');
    if (!task) return;
    if (action === 'plan') {
      this.addWorkspaceMessage(task, 'approval_event', 'Подтверждение', 'Подготовлен безопасный план вместо автоматического выполнения.');
      this.createArtifact(task, 'FIX_REQUEST', 'План безопасного действия', 'Опасное действие требует отдельного подтверждения.', 'Сформировать отдельное ТЗ и выполнить только после approval владельца.', 'approval');
    } else {
      this.addWorkspaceMessage(task, 'approval_event', 'Подтверждение', 'Опасное действие отменено.');
    }
    if (panel) panel.hidden = true;
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  saveWorkspaceMemoryPreview(task) {
    task.memory_status = 'saved_local';
    task.memory_preview = {
      ...(task.memory_preview || {}),
      status: 'saved_local',
      summary: task.goal || task.user_request,
      decisions: (task.messages || []).filter((message) => message.type === 'decision').map((message) => message.text),
      risks: task.risks || [],
      next_step: task.next_step,
      linked_artifact_ids: (task.artifacts || []).map((artifact) => artifact.artifact_id),
      linked_file_ids: (task.files || []).filter((file) => file.is_evidence).map((file) => file.file_id)
    };
    this.createArtifact(task, 'MEMORY_SUMMARY', 'Memory preview', 'Локальный черновик памяти для будущего Memory v2.', JSON.stringify(task.memory_preview, null, 2), 'memory_preview');
    this.addWorkspaceMessage(task, 'memory_event', 'Память', 'Memory preview сохранён локально.');
    this.toast('Memory preview сохранён локально');
  },

  skipWorkspaceMemoryPreview(task) {
    task.memory_status = 'не сохранять';
    task.memory_preview = { ...(task.memory_preview || {}), status: 'skipped' };
    this.addWorkspaceMessage(task, 'memory_event', 'Память', 'Сохранение в память пропущено.');
    this.toast('Память пропущена');
  },

  createFollowupArtifact(task, text) {
    return this.createArtifact(task, 'FOLLOWUP_PACKAGE', 'Follow-up для Codex', text.slice(0, 180), text, 'console');
  },

  createArtifact(task, type, title, summary, content, source, linkedFileIds = []) {
    task.artifacts = Array.isArray(task.artifacts) ? task.artifacts : [];
    const artifact = {
      artifact_id: this.generateWorkspaceId('ART'),
      task_id: task.task_id,
      project_id: task.project_id,
      type,
      title,
      summary: summary || '',
      content: content || '',
      created_at: new Date().toISOString(),
      source: source || 'workspace',
      linked_file_ids: linkedFileIds,
      linked_evidence_ids: [],
      version: 1,
      status: 'draft'
    };
    task.artifacts.unshift(artifact);
    return artifact;
  },

  addWorkspaceMessage(task, type, author, text, extras = {}) {
    task.messages = Array.isArray(task.messages) ? task.messages : [];
    const message = {
      message_id: this.generateWorkspaceId('MSG'),
      task_id: task.task_id,
      type,
      author,
      text,
      created_at: new Date().toISOString(),
      attachments: [],
      linked_artifacts: [],
      ...extras
    };
    task.messages.push(message);
    return message;
  },

  updateWorkspaceTimer() {
    const task = this.getActiveWorkTask();
    const timer = document.getElementById('workspace-timer');
    if (!timer || !task) return;
    const started = task.timer_started_at || task.executor_state?.timer_started_at;
    const stopped = task.timer_stopped_at || task.executor_state?.timer_stopped_at;
    if (!started) {
      timer.textContent = 'Ожидание отчёта: 00:00:00';
      return;
    }
    const startMs = new Date(started).getTime();
    const endMs = stopped ? new Date(stopped).getTime() : Date.now();
    timer.textContent = `Ожидание отчёта: ${this.formatDuration(Math.max(0, endMs - startMs))}`;
  },

  workspaceRiskLevel(task) {
    const risks = Array.isArray(task.risks) ? task.risks : [];
    if (task.status === 'failed' || task.status === 'rejected') return 'высокий';
    if (task.status === 'manual_required' || task.status === 'needs_fix' || risks.length > 2) return 'средний';
    return 'низкий';
  },

  copyWorkspaceText(text) {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        this.copyTextFallback(text);
      }
      this.toast('Скопировано');
    } catch {
      this.copyTextFallback(text);
      this.toast('Скопировано');
    }
  },

  fileExtension(name) {
    const parts = String(name || '').toLowerCase().split('.');
    return parts.length > 1 ? parts.pop() : 'file';
  },

  fileKindLabel(extension) {
    if (['txt', 'md', 'docx', 'pdf', 'rtf'].includes(extension)) return 'документ';
    if (['xlsx', 'csv'].includes(extension)) return 'таблица';
    if (ARCHIVE_EXTENSIONS.has(extension)) return 'архив';
    if (['js', 'ts', 'py', 'html', 'css', 'json', 'yaml', 'xml', 'sql', 'mjs', 'cjs'].includes(extension)) return 'код';
    if (IMAGE_PREVIEW_EXTENSIONS.has(extension)) return 'изображение';
    if (['mp4', 'mov', 'mkv', 'webm'].includes(extension)) return 'видео';
    if (['mp3', 'wav', 'm4a'].includes(extension)) return 'аудио';
    if (['log'].includes(extension)) return 'лог';
    return 'прочее';
  },

  humanFileSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let value = Number(bytes) || 0;
    let index = 0;
    while (value >= 1024 && index < units.length - 1) {
      value /= 1024;
      index += 1;
    }
    return `${value.toFixed(index ? 1 : 0)} ${units[index]}`;
  },

  fileRoleName(role) {
    return WORK_FILE_ROLE_BY_ID[role]?.name || 'Обычный файл';
  },

  artifactTypeName(type) {
    const names = {
      SPEC: 'ТЗ',
      PLAN: 'План',
      CONTEXT_PACK: 'Пакет для Codex',
      EXECUTOR_REPORT: 'Отчёт исполнителя',
      RESULT_ARCHIVE: 'Архив результата',
      SCREENSHOT: 'Скриншот',
      CHECK_LOG: 'Лог проверки',
      VERIFIER_VERDICT: 'Вердикт проверки',
      RESEARCH_REPORT: 'Исследование',
      MEMORY_SUMMARY: 'Память',
      DECISION_RECORD: 'Решение',
      FOLLOWUP_PACKAGE: 'Follow-up',
      FIX_REQUEST: 'Запрос доработки'
    };
    return names[type] || type || 'Артефакт';
  },

  workspaceMessageLabel(type) {
    const labels = {
      user_message: 'сообщение',
      system_event: 'событие',
      clarification: 'уточнение',
      file_added: 'файл',
      context_pack_created: 'пакет',
      executor_marked_sent: 'исполнитель',
      executor_report_received: 'отчёт',
      verifier_result: 'проверка',
      memory_event: 'память',
      approval_event: 'подтверждение',
      decision: 'решение'
    };
    return labels[type] || 'событие';
  },

  workspaceMessageAuthor(message) {
    return message.author || 'Рабочее окно';
  },

  formatTaskTime(value) {
    if (!value) return 'время не задано';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  },

  formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
  },

  generateWorkspaceId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
  },

  openVerifierPanel(task) {
    task.status = 'verifying';
    task.updated_at = new Date().toISOString();
    this.addWorkAudit(task, 'Открыта панель Verifier v1.');
    this.workspaceActiveTab = 'check';

    const output = document.getElementById('work-safe-output');
    if (output) output.hidden = true;

    const panel = document.getElementById('work-verifier-panel');
    if (panel) panel.hidden = false;

    this.renderWorkspaceTabs();
    this.renderVerifierPanel(task);
    this.toast('Verifier v1 открыт');
  },

  renderVerifierPanel(task) {
    const panel = document.getElementById('work-verifier-panel');
    if (!panel || !task) return;

    const notes = this.normalizedVerifierNotes(task);
    const risks = this.normalizedVerifierRisks(task);
    const checklist = task.verifier_checklist || {};
    const setValue = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.value = value || '';
    };

    setValue('verifier-report-input', notes.report);
    setValue('verifier-evidence-input', notes.evidence);
    setValue('verifier-expected-input', notes.expected || task.user_request);
    setValue('verifier-first-check-input', notes.first_check || task.next_step);
    setValue('verifier-not-checked-input', risks.not_checked);
    setValue('verifier-manual-input', risks.manual_review);
    setValue('verifier-break-risk-input', risks.can_break);

    const verdict = document.getElementById('verifier-current-verdict');
    if (verdict) {
      verdict.textContent = this.verifierVerdictName(task.verifier_result);
      verdict.className = `verifier-verdict verifier-verdict--${this.verifierVerdictClass(task.verifier_result)}`;
    }

    const checklistHost = document.getElementById('verifier-checklist');
    if (checklistHost) {
      checklistHost.innerHTML = VERIFIER_CHECKLIST.map((item) => `
        <label class="verifier-check-item">
          <input type="checkbox" data-verifier-check="${this.escapeHtml(item.id)}" ${checklist[item.id] ? 'checked' : ''}>
          <span>${this.escapeHtml(item.label)}</span>
        </label>
      `).join('');
    }

    this.renderVerifierResult(task);
  },

  handleVerifierAction(action) {
    const task = this.getActiveWorkTask();
    if (!task) {
      this.toast('Сначала создай задачу');
      return;
    }

    if (action === 'close') {
      const panel = document.getElementById('work-verifier-panel');
      if (panel) panel.hidden = true;
      this.addWorkAudit(task, 'Панель Verifier v1 закрыта.');
      this.saveWorkTasks();
      this.toast('Проверка закрыта');
      return;
    }

    if (action !== 'build') return;

    const verifierInput = this.collectVerifierInput();
    const evaluation = this.evaluateVerifierInput(verifierInput);
    this.saveVerifierResult(task, verifierInput, evaluation);
    this.saveWorkTasks();
    this.renderWorkTaskCard();
    this.toast(`Verifier: ${this.verifierVerdictName(evaluation.verdict)}`);
  },

  collectVerifierInput() {
    const value = (id) => document.getElementById(id)?.value.trim() || '';
    const checklist = {};
    document.querySelectorAll('[data-verifier-check]').forEach((input) => {
      checklist[input.dataset.verifierCheck] = input.checked;
    });

    return {
      report: value('verifier-report-input'),
      evidence: value('verifier-evidence-input'),
      expected: value('verifier-expected-input'),
      first_check: value('verifier-first-check-input'),
      risks: {
        not_checked: value('verifier-not-checked-input'),
        manual_review: value('verifier-manual-input'),
        can_break: value('verifier-break-risk-input'),
        first_check: value('verifier-first-check-input')
      },
      checklist
    };
  },

  evaluateVerifierInput(input) {
    const checkedItems = VERIFIER_CHECKLIST.filter((item) => input.checklist[item.id]);
    const missingCritical = VERIFIER_CHECKLIST.filter((item) => item.critical && !input.checklist[item.id]);
    const rejectCritical = missingCritical.filter((item) => item.rejectIfMissing);
    const risksPresent = [input.risks.not_checked, input.risks.manual_review, input.risks.can_break].some(Boolean);
    const checklistIncomplete = checkedItems.length < VERIFIER_CHECKLIST.length;
    const reasons = [];
    let verdict = 'MANUAL_REVIEW';

    if (!input.report && !input.evidence && checkedItems.length === 0) {
      reasons.push('Недостаточно данных: нет отчета, evidence и checklist.');
      return { verdict, reasons, checklistIncomplete, risksPresent };
    }

    if (rejectCritical.length) {
      verdict = 'REJECT';
      reasons.push(...rejectCritical.map((item) => `Не подтверждено: ${item.label}.`));
    } else if (missingCritical.length) {
      verdict = 'NEEDS_FIX';
      reasons.push(...missingCritical.map((item) => `Не закрыт критичный пункт: ${item.label}.`));
    } else if (checklistIncomplete || risksPresent) {
      verdict = 'PASS_WITH_RISKS';
      if (checklistIncomplete) reasons.push('Есть неполные проверки.');
      if (risksPresent) reasons.push('Есть риски или пункты для ручной проверки.');
    } else {
      verdict = 'PASS';
      reasons.push('Ключевые проверки отмечены, явных рисков не указано.');
    }

    return { verdict, reasons, checklistIncomplete, risksPresent };
  },

  saveVerifierResult(task, input, evaluation) {
    const now = new Date().toISOString();
    task.verifier_result = evaluation.verdict;
    task.verifier_checklist = input.checklist;
    task.verifier_risks = input.risks;
    task.verifier_notes = {
      report: input.report,
      evidence: input.evidence,
      expected: input.expected,
      first_check: input.first_check
    };
    task.verifier_return_text = ['NEEDS_FIX', 'REJECT'].includes(evaluation.verdict)
      ? this.buildVerifierReturnText(task, evaluation.reasons, input)
      : '';
    task.verified_at = now;
    task.updated_at = now;
    task.status = VERIFIER_VERDICTS[evaluation.verdict]?.status || 'manual_required';
    const artifact = this.createArtifact(
      task,
      'VERIFIER_VERDICT',
      `Вердикт проверки: ${this.verifierVerdictName(evaluation.verdict)}`,
      evaluation.reasons.join(' ') || this.verifierDescription(evaluation.verdict),
      [
        `Вердикт: ${evaluation.verdict}`,
        '',
        'Причины:',
        ...(evaluation.reasons.length ? evaluation.reasons.map((reason) => `- ${reason}`) : ['- не указано']),
        '',
        `Checklist: ${this.verifierChecklistSummary({ verifier_checklist: input.checklist })}`,
        `Риски: ${this.verifierRisksSummary({ verifier_risks: input.risks })}`
      ].join('\n'),
      'verifier'
    );
    task.memory_preview = {
      ...(task.memory_preview || {}),
      linked_artifact_ids: [...new Set([...(task.memory_preview?.linked_artifact_ids || []), artifact.artifact_id])]
    };
    this.addWorkspaceMessage(task, 'verifier_result', 'Проверка', `Verifier сформировал verdict: ${this.verifierVerdictName(evaluation.verdict)}.`);
    this.addWorkAudit(task, `Verifier сформировал verdict: ${evaluation.verdict}.`);
  },

  renderVerifierResult(task) {
    const resultPanel = document.getElementById('verifier-result-panel');
    if (!resultPanel) return;

    const verdict = task.verifier_result || '';
    const resultTitle = document.getElementById('verifier-result-title');
    const resultDescription = document.getElementById('verifier-result-description');
    const returnBlock = document.getElementById('verifier-return-block');
    const returnText = document.getElementById('verifier-return-text');
    const riskNote = document.getElementById('verifier-risk-note');

    if (!verdict || verdict === 'не проверено') {
      resultPanel.hidden = true;
      if (riskNote) riskNote.hidden = true;
      return;
    }

    resultPanel.hidden = false;
    resultPanel.className = `verifier-result verifier-result--${this.verifierVerdictClass(verdict)}`;
    if (resultTitle) resultTitle.textContent = `Вердикт: ${this.verifierVerdictName(verdict)}`;
    if (resultDescription) {
      resultDescription.textContent = this.verifierDescription(verdict);
    }

    if (returnBlock && returnText) {
      const needsReturn = ['NEEDS_FIX', 'REJECT'].includes(verdict);
      returnBlock.hidden = !needsReturn;
      returnText.value = needsReturn ? task.verifier_return_text || '' : '';
    }

    const checklist = task.verifier_checklist || {};
    const risks = this.normalizedVerifierRisks(task);
    const incomplete = VERIFIER_CHECKLIST.some((item) => !checklist[item.id]);
    const hasRiskText = [risks.not_checked, risks.manual_review, risks.can_break].some(Boolean);
    if (riskNote) {
      riskNote.hidden = !(incomplete && !hasRiskText);
      riskNote.textContent = 'Есть неполные проверки. Результат нельзя принимать как чистый PASS.';
    }
  },

  buildVerifierReturnText(task, reasons, input) {
    const reasonLines = reasons.length ? reasons : ['Verifier v1 не смог подтвердить безопасную приемку результата.'];
    const firstCheck = input.first_check || 'повторить проверку по исходным критериям задачи';
    return [
      'Результат не принят.',
      '',
      'Причины:',
      ...reasonLines.map((reason) => `- ${reason}`),
      '',
      'Что исправить:',
      '- закрыть критичные пункты checklist;',
      '- приложить недостающий отчет, evidence или архив;',
      '- явно указать, что не проверено и какие риски остались.',
      '',
      'Что повторно проверить:',
      `- ${firstCheck}`,
      '',
      'Что вернуть:',
      '- отчет;',
      '- evidence;',
      '- архив;',
      '- список измененных файлов;',
      '- проверки;',
      '- риски.',
      '',
      `Задача: ${task.task_id} — ${task.title}`
    ].join('\n');
  },

  updateVerifierActionHints(task) {
    const card = document.getElementById('work-task-card');
    if (!card) return;

    const acceptButton = card.querySelector('[data-work-action="accept"]');
    const fixButton = card.querySelector('[data-work-action="needs_fix"]');
    const pass = ['PASS', 'PASS_WITH_RISKS'].includes(task.verifier_result);
    const needsFix = ['NEEDS_FIX', 'REJECT'].includes(task.verifier_result);

    acceptButton?.classList.toggle('work-action--recommended', pass);
    fixButton?.classList.toggle('work-action--warn', needsFix);
  },

  verifierVerdictName(verdict) {
    if (!verdict || verdict === 'не проверено') return 'не проверено';
    return VERIFIER_VERDICTS[verdict]?.name || verdict;
  },

  verifierVerdictClass(verdict) {
    if (verdict === 'PASS') return 'pass';
    if (verdict === 'PASS_WITH_RISKS') return 'risk';
    if (verdict === 'NEEDS_FIX') return 'needs-fix';
    if (verdict === 'REJECT') return 'reject';
    if (verdict === 'MANUAL_REVIEW') return 'manual';
    return 'empty';
  },

  verifierDescription(verdict) {
    const descriptions = {
      PASS: 'Ключевые пункты закрыты. Результат можно принять локально.',
      PASS_WITH_RISKS: 'Ключевые пункты закрыты, но есть риски или неполные проверки.',
      NEEDS_FIX: 'Результат нужно вернуть на доработку.',
      REJECT: 'Результат нельзя принимать в текущем виде.',
      MANUAL_REVIEW: 'Недостаточно данных. Нужна ручная проверка владельца.'
    };
    return descriptions[verdict] || 'Проверка ожидает данных.';
  },

  normalizedVerifierNotes(task) {
    const notes = task.verifier_notes && typeof task.verifier_notes === 'object' ? task.verifier_notes : {};
    return {
      report: notes.report || '',
      evidence: notes.evidence || '',
      expected: notes.expected || task.user_request || '',
      first_check: notes.first_check || task.next_step || ''
    };
  },

  normalizedVerifierRisks(task) {
    const risks = task.verifier_risks && typeof task.verifier_risks === 'object' ? task.verifier_risks : {};
    return {
      not_checked: risks.not_checked || '',
      manual_review: risks.manual_review || '',
      can_break: risks.can_break || '',
      first_check: risks.first_check || ''
    };
  },

  verifierChecklistSummary(task) {
    const checklist = task.verifier_checklist || {};
    const checked = VERIFIER_CHECKLIST.filter((item) => checklist[item.id]).length;
    return `${checked}/${VERIFIER_CHECKLIST.length}`;
  },

  verifierRisksSummary(task) {
    const risks = this.normalizedVerifierRisks(task);
    const lines = [
      risks.not_checked ? `Не проверено: ${risks.not_checked}` : '',
      risks.manual_review ? `Ручная проверка: ${risks.manual_review}` : '',
      risks.can_break ? `Может сломаться: ${risks.can_break}` : '',
      risks.first_check ? `Проверить первым: ${risks.first_check}` : ''
    ].filter(Boolean);
    return lines.length ? lines.join('\n') : 'не задано';
  },

  verifierNotesSummary(task) {
    const notes = this.normalizedVerifierNotes(task);
    const lines = [
      notes.report ? `Отчет: ${notes.report.slice(0, 220)}` : '',
      notes.evidence ? `Evidence: ${notes.evidence}` : '',
      notes.expected ? `Ожидание: ${notes.expected}` : '',
      notes.first_check ? `Проверить первым: ${notes.first_check}` : ''
    ].filter(Boolean);
    return lines.length ? lines.join('\n') : 'не задано';
  },

  handleWorkTaskAction(action) {
    const task = this.getActiveWorkTask();
    if (!task) {
      this.toast('Сначала создай задачу');
      return;
    }

    const handlers = {
      prepare_task: () => this.showWorkSafeOutput(task, 'Подготовить ТЗ', this.buildCodexTaskPreview(task), 'context_ready'),
      brain_council: () => this.showWorkSafeOutput(task, 'Совет мозгов', 'Промпты для ChatGPT / Gemini / DeepSeek / Qwen будут реализованы следующим этапом.', 'planning'),
      assign_codex: () => this.showWorkSafeOutput(task, 'Отдать Codex', this.buildCodexTaskPreview(task), 'ready_for_executor'),
      check_result: () => this.openVerifierPanel(task),
      research: () => this.showWorkSafeOutput(task, 'Исследовать', 'ResearchOps v1 будет реализован следующим этапом.', 'planning'),
      save_memory: () => this.saveWorkMemoryDraft(task),
      accept: () => this.setWorkStatus(task, 'accepted', 'Статус изменен на accepted.'),
      needs_fix: () => this.showWorkSafeOutput(task, 'Вернуть на доработку', this.buildNeedsFixTemplate(task), 'needs_fix'),
      toggle_expert: () => this.toggleWorkExpert(task)
    };

    handlers[action]?.();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  handleWorkShortcut(action) {
    if (action === 'verify') {
      const task = this.getActiveWorkTask();
      if (task) {
        this.openVerifierPanel(task);
        this.saveWorkTasks();
        this.renderWorkTaskCard();
        return;
      }
    }

    const labels = {
      tasks: `Локально сохранено задач: ${this.workTasks.length}`,
      verify: 'Сначала создай задачу для проверки результата.',
      research: 'ResearchOps v1 будет реализован следующим этапом.',
      council: 'Совет мозгов будет реализован следующим этапом.'
    };
    this.toast(labels[action] || 'Действие будет реализовано следующим этапом', 3600);
  },

  showWorkSafeOutput(task, title, text, nextStatus) {
    if (nextStatus) task.status = nextStatus;
    task.updated_at = new Date().toISOString();
    this.addWorkAudit(task, `Нажата кнопка ${title}.`);
    const output = document.getElementById('work-safe-output');
    if (output) {
      output.hidden = false;
      output.innerHTML = `<strong>${this.escapeHtml(title)}</strong><p>${this.escapeHtml(text)}</p>`;
    }
    this.toast(`${title}: безопасный preview`);
  },

  buildCodexTaskPreview(task) {
    return [
      `Задача: ${task.title}`,
      `Проект: ${this.projectName(task.project_id)}`,
      `Режим: ${this.modeName(task.mode)}`,
      `Качество: ${this.qualityName(task.quality_level)}`,
      `Критерии: ${task.readiness_criteria.join('; ')}`,
      'Не использовать AI API, не менять сеть, не деплоить без разрешения.'
    ].join('\n');
  },

  buildNeedsFixTemplate(task) {
    return [
      `Вернуть задачу ${task.task_id} на доработку.`,
      `Причина: требуется уточнить результат по задаче "${task.title}".`,
      `Ожидание: исправить и снова предоставить evidence.`
    ].join('\n');
  },

  saveWorkMemoryDraft(task) {
    task.memory_status = 'saved_local';
    task.status = 'saved';
    task.updated_at = new Date().toISOString();
    this.addWorkAudit(task, 'Создан memory preview.');
    this.showWorkSafeOutput(task, 'Сохранить в память', `Memory preview сохранён локально для ${task.task_id}.`, 'saved');
  },

  setWorkStatus(task, status, auditText) {
    if (!WORK_STATUSES.includes(status)) return;
    task.status = status;
    task.updated_at = new Date().toISOString();
    this.addWorkAudit(task, auditText);
    this.toast(this.statusName(status));
  },

  toggleWorkExpert(task) {
    this.workExpertOpen = !this.workExpertOpen;
    this.addWorkAudit(task, this.workExpertOpen ? 'Открыт экспертный вид.' : 'Экспертный вид закрыт.');
    this.renderWorkExpertView(task);
  },

  renderWorkExpertView(task) {
    const expert = document.getElementById('work-expert-view');
    if (!expert) return;
    expert.hidden = !this.workExpertOpen;
    if (expert.hidden) return;

    const rows = [
      ['task_id', task.task_id],
      ['project_id', task.project_id],
      ['mode', task.mode],
      ['quality_level', task.quality_level],
      ['status', task.status],
      ['context_scope', task.context_scope || 'не задано'],
      ['constraints', this.listOrFallback(task.constraints, 'не задано')],
      ['forbidden_actions', this.listOrFallback(task.forbidden_actions, 'не задано')],
      ['readiness_criteria', this.listOrFallback(task.readiness_criteria, 'не задано')],
      ['risks', this.listOrFallback(task.risks, 'не задано')],
      ['executor', task.executor || 'не задано'],
      ['evidence_ids', this.listOrFallback(task.evidence_ids, 'нет evidence')],
      ['verifier_result', this.verifierVerdictName(task.verifier_result)],
      ['verifier_checklist', this.verifierChecklistSummary(task)],
      ['verifier_risks', this.verifierRisksSummary(task)],
      ['verifier_notes', this.verifierNotesSummary(task)],
      ['verifier_return_text', task.verifier_return_text || 'не задано'],
      ['verified_at', task.verified_at || 'не проверено'],
      ['memory_status', task.memory_status || 'ожидает данных'],
      ['approval_required', task.approval_required || 'ожидает данных'],
      ['audit_log', this.listOrFallback(task.audit_log, 'ожидает данных')]
    ];

    expert.innerHTML = `
      <h4>Экспертный вид</h4>
      <dl class="work-details work-details--expert">
        ${rows.map(([label, value]) => `
          <div>
            <dt>${this.escapeHtml(label)}</dt>
            <dd>${this.escapeHtml(value)}</dd>
          </div>
        `).join('')}
      </dl>
    `;
  },

  addWorkAudit(task, text) {
    const at = new Date().toLocaleString('ru-RU', { hour12: false });
    task.audit_log = Array.isArray(task.audit_log) ? task.audit_log : [];
    task.audit_log.push(`${at} — ${text}`);
  },

  getActiveWorkTask() {
    return this.workTasks.find((task) => task.task_id === this.activeWorkTaskId) || this.workTasks[0] || null;
  },

  projectName(projectId) {
    return WORK_PROJECT_BY_ID[projectId]?.name || 'Терминатор';
  },

  modeName(modeId) {
    return WORK_MODE_BY_ID[modeId]?.name || 'Авто';
  },

  qualityName(qualityId) {
    return WORK_QUALITY_BY_ID[qualityId]?.name || 'Стандарт';
  },

  statusName(status) {
    return status || 'не задано';
  },

  listOrFallback(value, fallback) {
    if (Array.isArray(value)) return value.length ? value.join('; ') : fallback;
    return value || fallback;
  },

  escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  async prepareOwnerSession() {
    if (!isConfiguredDirectModeActive()) return true;

    try {
      const token = await ensureOwnerSession(getConfiguredDirectBridgeBaseUrl(), { interactive: true });
      if (token) return true;

      this.toast('Авторизация владельца отменена');
      return false;
    } catch (error) {
      console.error('[MinaWebApp] Owner session failed', error);
      this.toast(error.status === 401 ? 'Пароль владельца не принят' : 'Не удалось активировать доступ владельца');
      return false;
    }
  },

  async sendPersonalAction(action, payload = {}) {
    const brain = payload.brain || this.selectedModel;
    if (action === 'ensure_anydesk') this.setAnyDeskPending();

    const data = {
      ...payload,
      type: 'personal_action',
      action,
      brain,
      source: 'mina_webapp',
      version: 1
    };

    const result = await sendTerminatorAction(data);
    this.toast(result.message);

    if (result.ok && result.transport === 'direct' && result.commandId && result.canTrackStatus) {
      this.watchDirectCommand(result.commandId, { action });
    }

    return result.ok;
  },

  watchDirectCommand(commandId, context = {}) {
    this.stopDirectCommandPolling();

    const startedAt = Date.now();
    const poll = async () => {
      try {
        const status = await getDirectCommandStatus(commandId);

        if (status?.status && DIRECT_FINAL_STATUSES.has(status.status)) {
          this.commandPollTimer = null;
          this.handleDirectCommandStatus(status, context);
          this.toast(this.formatDirectCommandStatus(status));
          return;
        }
      } catch (error) {
        console.error('[MinaWebApp] Direct status polling failed', error);
      }

      if (Date.now() - startedAt > DIRECT_STATUS_POLL_TIMEOUT_MS) {
        this.commandPollTimer = null;
        this.toast('Статус команды не получен');
        return;
      }

      this.commandPollTimer = window.setTimeout(poll, DIRECT_STATUS_POLL_INTERVAL_MS);
    };

    this.commandPollTimer = window.setTimeout(poll, DIRECT_STATUS_POLL_INTERVAL_MS);
  },

  stopDirectCommandPolling() {
    if (!this.commandPollTimer) return;
    window.clearTimeout(this.commandPollTimer);
    this.commandPollTimer = null;
  },

  handleDirectCommandStatus(status, context = {}) {
    if (context.action === 'ensure_anydesk' || status?.action === 'ensure_anydesk') {
      this.setAnyDeskResult(status);
    }
  },

  setAnyDeskPending() {
    this.anydesk = {
      id: '',
      status: 'проверяется',
      deepLink: '',
      checked: true,
      error: ''
    };
    this.renderAnyDeskAccess();
  },

  setAnyDeskResult(status) {
    const details = this.extractAnyDeskDetails(status);
    this.anydesk = {
      id: details.id,
      status: details.status,
      deepLink: details.deepLink,
      checked: true,
      error: details.id ? '' : 'AnyDesk ID не найден. Проверь AnyDesk на ПК Терминатора.'
    };

    this.renderAnyDeskAccess();
    if (!details.id) this.toast(this.anydesk.error, 4200);
  },

  extractAnyDeskDetails(status) {
    const result = status?.result || {};
    const errorDetail = status?.error?.detail || {};
    const detail = result.anydesk || errorDetail.anydesk || result || errorDetail;
    const id = this.normalizeAnyDeskId(
      result.anydeskId
      || result.anydesk_id
      || detail.anydeskId
      || detail.anydesk_id
      || detail.id
    );
    const deepLink = result.deepLink
      || result.anydeskUrl
      || detail.deepLink
      || detail.anydeskUrl
      || detail.url
      || (id ? `anydesk:${id}` : '');
    const statusText = result.anydeskStatus
      || detail.anydeskStatus
      || detail.statusText
      || (status?.status === 'completed' ? 'активен' : 'недоступен');

    return {
      id,
      deepLink: id ? deepLink : '',
      status: statusText
    };
  },

  normalizeAnyDeskId(value) {
    const match = String(value || '').match(/\b\d{6,12}\b/);
    return match ? match[0] : '';
  },

  renderAnyDeskAccess() {
    const statusEl = document.getElementById('anydesk-status');
    const idEl = document.getElementById('anydesk-id');
    const fallbackIdEl = document.getElementById('anydesk-fallback-id');
    const installLink = document.getElementById('anydesk-install-link');

    const id = this.anydesk.id || '';
    const idText = id || (this.anydesk.status === 'проверяется' ? 'ожидание' : (this.anydesk.checked ? 'не найден' : 'не получен'));
    if (statusEl) statusEl.textContent = this.anydesk.status || 'не проверен';
    if (idEl) idEl.textContent = idText;
    if (fallbackIdEl) fallbackIdEl.textContent = idText;
    if (installLink) installLink.href = ANYDESK_INSTALL_URL;
  },

  openAnyDeskApp() {
    const id = this.normalizeAnyDeskId(this.anydesk.id);
    if (!id) {
      this.toast('AnyDesk ID не найден. Проверь AnyDesk на ПК Терминатора.', 4200);
      return;
    }

    const deepLink = this.anydesk.deepLink || `anydesk:${id}`;
    window.location.href = deepLink;
    window.setTimeout(() => {
      this.showAnyDeskFallback();
      this.toast('Если AnyDesk не открылся, установи AnyDesk и введи ID вручную.', 5200);
    }, 1800);
  },

  async copyAnyDeskId() {
    const id = this.normalizeAnyDeskId(this.anydesk.id);
    if (!id) {
      this.toast('AnyDesk ID не найден. Проверь AnyDesk на ПК Терминатора.', 4200);
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(id);
      } else {
        this.copyTextFallback(id);
      }
      this.toast('AnyDesk ID скопирован');
    } catch {
      this.copyTextFallback(id);
      this.toast('AnyDesk ID скопирован');
    }
  },

  copyTextFallback(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  },

  showAnyDeskFallback() {
    const fallback = document.getElementById('anydesk-fallback');
    if (fallback) fallback.hidden = false;
  },

  formatDirectCommandStatus(status) {
    if (status.status === 'completed') return 'Команда выполнена';
    if (status.status === 'manual_required') return 'Требуется ручная проверка';
    if (status.status === 'failed') return 'Команда не выполнена';
    return 'Статус команды обновлён';
  },

  toast(message, duration = 2600) {
    const toast = document.getElementById('toast');
    window.clearTimeout(this.toastTimer);

    toast.textContent = message;
    toast.classList.add('visible');

    this.toastTimer = window.setTimeout(() => {
      toast.classList.remove('visible');
    }, duration);
  },

  isTypingTarget(target) {
    if (!target) return false;
    return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
