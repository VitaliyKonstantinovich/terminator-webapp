/**
 * Terminator WebApp — Screen Controller & Telegram Integration
 */

const App = {
  currentScreen: null,
  tg: window.Telegram?.WebApp || null,

  init() {
    // Initialize Telegram WebApp if available
    if (this.tg) {
      this.tg.ready();
      this.tg.expand();
      this.tg.setHeaderColor('#070a12');
      this.tg.setBackgroundColor('#070a12');
    }

    this.bindEvents();
    this.showScreen('start');
  },

  bindEvents() {
    // Start button
    document.getElementById('btn-start').addEventListener('click', () => {
      this.showScreen('menu');
    });

    // Main menu — click zones on image
    document.getElementById('card-personal').addEventListener('click', () => {
      this.showScreen('personal');
    });

    document.getElementById('card-work').addEventListener('click', () => {
      this.showToast('💼 Раздел "Рабочее" в разработке');
    });

    document.getElementById('card-other').addEventListener('click', () => {
      this.showToast('🧩 Раздел "Прочее" в разработке');
    });

    // Personal — brain click zones on image
    document.querySelectorAll('[data-brain]').forEach(zone => {
      zone.addEventListener('click', () => {
        const brain = zone.dataset.brain;
        this.selectBrain(brain);
      });
    });

    // Back button
    document.getElementById('btn-back-personal').addEventListener('click', () => {
      this.showScreen('menu');
    });

    // Telegram back button
    if (this.tg) {
      this.tg.BackButton.onClick(() => {
        if (this.currentScreen === 'personal') {
          this.showScreen('menu');
        } else if (this.currentScreen === 'menu') {
          this.showScreen('start');
        } else {
          this.tg.close();
        }
      });
    }
  },

  showScreen(name) {
    const screens = document.querySelectorAll('.screen');

    // Determine direction
    const order = ['start', 'menu', 'personal'];
    const oldIdx = order.indexOf(this.currentScreen);
    const newIdx = order.indexOf(name);
    const goingForward = newIdx > oldIdx;

    screens.forEach(s => {
      if (s.classList.contains('active')) {
        s.classList.remove('active');
        s.classList.add(goingForward ? 'exit-left' : 'exit-right');
        setTimeout(() => {
          s.classList.remove('exit-left', 'exit-right');
        }, 400);
      }
    });

    const target = document.getElementById(`screen-${name}`);
    if (target) {
      setTimeout(() => {
        target.classList.add('active');
      }, 50);
    }

    this.currentScreen = name;

    // Telegram back button visibility
    if (this.tg) {
      if (name === 'start') {
        this.tg.BackButton.hide();
      } else {
        this.tg.BackButton.show();
      }
    }
  },

  async selectBrain(brain) {
    const names = {
      chatgpt: 'ChatGPT',
      gemini: 'Gemini',
      deepseek: 'DeepSeek',
      qwen: 'Qwen',
    };

    this.showStatus(`Подключение к ${names[brain] || brain}...`);

    // Send data to Telegram bot
    if (this.tg) {
      try {
        this.tg.sendData(JSON.stringify({
          action: 'personal_brain',
          brain: brain,
        }));
      } catch (e) {
        console.error('sendData error:', e);
      }
    } else {
      // Dev mode — simulate
      console.log(`[DEV] Brain selected: ${brain}`);
      setTimeout(() => {
        this.hideStatus();
        this.showToast(`🧠 ${names[brain]} выбран (dev mode)`);
      }, 1500);
    }
  },

  showStatus(text) {
    const overlay = document.getElementById('status-overlay');
    const statusText = document.getElementById('status-text');
    statusText.textContent = text;
    overlay.classList.add('visible');
  },

  hideStatus() {
    document.getElementById('status-overlay').classList.remove('visible');
  },

  showToast(message) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(10, 20, 50, 0.95);
      backdrop-filter: blur(20px);
      color: #f1f5f9;
      padding: 14px 24px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      border: 1px solid rgba(59, 130, 246, 0.3);
      z-index: 200;
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
