/**
 * Terminator WebApp v1 — Screen Controller
 * 3 screens: Start → Mode Select → Model Select
 * No backend calls. Pure UI navigation.
 */

const App = {
  currentScreen: null,
  tg: window.Telegram?.WebApp || null,

  init() {
    if (this.tg) {
      this.tg.ready();
      this.tg.expand();
      this.tg.setHeaderColor('#060a14');
      this.tg.setBackgroundColor('#060a14');
    }

    this.bind();
    this.showScreen('start');
  },

  bind() {
    // Screen 1 — Start
    document.getElementById('btn-start').addEventListener('click', () => {
      this.showScreen('menu');
    });

    // Screen 2 — Mode select
    document.getElementById('btn-personal').addEventListener('click', () => {
      this.showScreen('personal');
    });

    document.getElementById('btn-work').addEventListener('click', () => {
      this.toast('💼 Раздел «Рабочее» в разработке');
    });

    document.getElementById('btn-other').addEventListener('click', () => {
      this.toast('🧩 Раздел «Прочее» в разработке');
    });

    // Screen 3 — Model select
    document.querySelectorAll('.brain-card').forEach(card => {
      card.addEventListener('click', () => {
        const brain = card.dataset.brain;
        this.selectBrain(brain);
      });
    });

    document.getElementById('btn-back').addEventListener('click', () => {
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
    const order = ['start', 'menu', 'personal'];
    const oldIdx = order.indexOf(this.currentScreen);
    const newIdx = order.indexOf(name);
    const forward = newIdx > oldIdx;

    // Exit current
    document.querySelectorAll('.screen.active').forEach(s => {
      s.classList.remove('active');
      s.classList.add(forward ? 'exit-left' : 'exit-right');
      setTimeout(() => s.classList.remove('exit-left', 'exit-right'), 500);
    });

    // Enter new
    const target = document.getElementById(`screen-${name}`);
    if (target) {
      setTimeout(() => target.classList.add('active'), 60);
    }

    this.currentScreen = name;

    // Telegram back button
    if (this.tg) {
      name === 'start' ? this.tg.BackButton.hide() : this.tg.BackButton.show();
    }
  },

  selectBrain(brain) {
    const names = { chatgpt: 'ChatGPT', gemini: 'Gemini', deepseek: 'DeepSeek', qwen: 'Qwen' };
    const label = names[brain] || brain;

    this.toast(`🧠 Выбран ${label}.\nПодключение к ручному режиму будет добавлено на следующем этапе.`);

    // Send to Telegram if available (no backend action yet)
    if (this.tg) {
      try {
        this.tg.sendData(JSON.stringify({ action: 'personal_brain', brain }));
      } catch (e) {
        console.log('[Dev] sendData not available outside Telegram');
      }
    }
  },

  toast(message, duration = 3000) {
    // Remove existing
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    document.body.appendChild(el);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('visible'));
    });

    // Animate out
    setTimeout(() => {
      el.classList.remove('visible');
      setTimeout(() => el.remove(), 350);
    }, duration);
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
