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
      return bridge;
    }

    if (typeof bridge.sendTerminatorAction === 'function') {
      return bridge.sendTerminatorAction.bind(bridge);
    }

    if (typeof bridge.send === 'function') {
      return bridge.send.bind(bridge);
    }
  }

  return null;
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
    const response = await directTransport(payload);
    if (response?.ok === false) {
      return {
        ok: false,
        transport: 'direct',
        reason: response.reason || 'direct_rejected',
        message: response.message || 'Не удалось отправить прямую команду'
      };
    }

    return { ok: true, transport: 'direct', message: 'Команда отправлена напрямую' };
  } catch (error) {
    console.error('[MinaWebApp] Direct transport failed', error);
    return { ok: false, transport: 'direct', message: 'Не удалось отправить прямую команду' };
  }
}

window.sendTerminatorAction = sendTerminatorAction;

const App = {
  current: 'start',
  selectedModel: 'chatgpt',
  toastTimer: null,
  tg: null,
  order: ['start', 'menu', 'personal', 'brain', 'remote', 'complete'],

  init() {
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

    document.getElementById('btn-start').addEventListener('click', () => this.go('menu'));
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
    return result.ok;
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
