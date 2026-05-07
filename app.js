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

const WEBAPP_TRANSPORT_MODE = 'auto'; // telegram | direct | auto
const WEBAPP_TRANSPORT_MODES = new Set(['telegram', 'direct', 'auto']);
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
  const baseUrl = window.MINA_DIRECT_BRIDGE_URL || config.baseUrl || config.bridgeUrl || query.get('direct_bridge');

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
  toastTimer: null,
  commandPollTimer: null,
  tg: null,
  order: ['start', 'menu', 'personal', 'brain', 'remote', 'complete'],

  init() {
    window.MinaApp = this;
    this.tg = window.Telegram?.WebApp || null;
    this.initTelegram();
    this.bindEvents();
    this.renderBrain();
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
      }
    });

    document.getElementById('btn-start').addEventListener('click', async () => {
      if (await this.prepareOwnerSession()) this.go('menu');
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
      this.sendPersonalAction('ensure_anydesk', { brain: this.selectedModel });
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
      this.watchDirectCommand(result.commandId);
    }

    return result.ok;
  },

  watchDirectCommand(commandId) {
    this.stopDirectCommandPolling();

    const startedAt = Date.now();
    const poll = async () => {
      try {
        const status = await getDirectCommandStatus(commandId);

        if (status?.status && DIRECT_FINAL_STATUSES.has(status.status)) {
          this.commandPollTimer = null;
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
