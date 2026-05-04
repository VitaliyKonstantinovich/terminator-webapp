/**
 * Terminator WebApp — Screen Controller
 */
const App = {
  current: null,
  tg: window.Telegram?.WebApp || null,

  init() {
    if (this.tg) { this.tg.ready(); this.tg.expand(); this.tg.setHeaderColor('#060a14'); this.tg.setBackgroundColor('#060a14'); }
    this.bind();
    this.go('start');
  },

  bind() {
    document.getElementById('btn-start').addEventListener('click', () => this.go('menu'));
    document.getElementById('btn-personal').addEventListener('click', () => this.go('personal'));
    document.getElementById('btn-work').addEventListener('click', () => this.toast('💼 Раздел «Рабочее» в разработке'));
    document.getElementById('btn-other').addEventListener('click', () => this.toast('🧩 Раздел «Прочее» в разработке'));
    document.getElementById('btn-back').addEventListener('click', () => this.go('menu'));

    document.querySelectorAll('[data-brain]').forEach(z => {
      z.addEventListener('click', () => {
        const n = { chatgpt:'ChatGPT', gemini:'Gemini', deepseek:'DeepSeek', qwen:'Qwen' };
        this.toast(`🧠 Выбран ${n[z.dataset.brain]}.\nПодключение будет добавлено на следующем этапе.`);
        if (this.tg) try { this.tg.sendData(JSON.stringify({ action:'personal_brain', brain: z.dataset.brain })); } catch(e){}
      });
    });

    if (this.tg) {
      this.tg.BackButton.onClick(() => {
        if (this.current === 'personal') this.go('menu');
        else if (this.current === 'menu') this.go('start');
        else this.tg.close();
      });
    }
  },

  go(name) {
    const order = ['start','menu','personal'];
    const fwd = order.indexOf(name) > order.indexOf(this.current);
    document.querySelectorAll('.screen.active').forEach(s => {
      s.classList.remove('active');
      s.classList.add(fwd ? 'exit-left' : 'exit-right');
      setTimeout(() => s.classList.remove('exit-left','exit-right'), 500);
    });
    const t = document.getElementById('screen-' + name);
    if (t) setTimeout(() => t.classList.add('active'), 60);
    this.current = name;
    if (this.tg) name === 'start' ? this.tg.BackButton.hide() : this.tg.BackButton.show();
  },

  toast(msg, dur = 3000) {
    document.querySelectorAll('.toast').forEach(t => t.remove());
    const el = document.createElement('div');
    el.className = 'toast'; el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
    setTimeout(() => { el.classList.remove('visible'); setTimeout(() => el.remove(), 350); }, dur);
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
