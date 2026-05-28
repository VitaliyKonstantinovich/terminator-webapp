# Phase 18 — Phone / PWA Pairing + Multi-Device Presence V1

Статус: PASS live.

## Что реализовано

- Добавлен слой Phone / PWA Pairing: ручная подготовка ссылки для телефона без паролей, cookies, токенов и AI API.
- Добавлен Multi-Device Presence: WebApp, основной ПК-агент, телефон владельца и PWA показываются как отдельные состояния.
- Телефон не считается online без отдельного подтверждённого сигнала. Если владелец нажал "Я открыл на телефоне", система честно пишет, что heartbeat телефона ещё не подключён.
- Device Mesh / Ноги теперь учитывает статус телефона и PWA.
- Схема Мины / Ноги показывает phone/PWA status и следующий шаг.
- System / PWA показывает телефонный pairing рядом с PWA status.
- Добавлены действия: подготовить ссылку телефона, скопировать ссылку, отметить ручной вход, обновить присутствие, скопировать отчёт.

## Термины

- PWA: установка WebApp как приложения в браузере.
- Pairing: ручное подключение телефона к Mina UI.
- Presence: присутствие устройства, то есть online/offline/готовность.
- Handoff: передача задачи или контекста между устройствами.
- Heartbeat: периодический сигнал, что агент или устройство действительно на связи.

## Безопасность

- ADB не запускался.
- BlueStacks не запускался.
- Телефон не открывался автоматически.
- Сетевое сканирование не выполнялось.
- AI API не использовались.
- Секреты, cookies, токены и пароли не сохранялись.
- Direct Bridge и Local Agent не менялись.

## Проверки

- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- `git diff --check`: PASS.
- Local desktop smoke: PASS.
- Local mobile overflow check 430px: PASS, `scrollWidth=430`.
- Click action: `Подготовить ссылку телефона` переводит телефон в `link_ready` и не подделывает online.
- GitHub Pages deploy run `26572725172`: PASS.
- Live HTML marker: PASS.
- Live Service Worker marker: PASS.
- Live `app.js` Phase 18 marker: PASS.
- Live mobile overflow check 430px: PASS, `scrollWidth=430`.

## Evidence

- `D:\TerminatorStorage\evidence_backups\phase18_phone_pwa_presence\phase18-local-system-device-presence.png`
- `D:\TerminatorStorage\evidence_backups\phase18_phone_pwa_presence\phase18-local-system-mobile.png`
- `D:\TerminatorStorage\evidence_backups\phase18_phone_pwa_presence\phase18-local-phone-pairing-ready.png`
- `D:\TerminatorStorage\evidence_backups\phase18_phone_pwa_presence\phase18-live-system-device-presence.png`
- `D:\TerminatorStorage\evidence_backups\phase18_phone_pwa_presence\phase18-live-system-mobile.png`

## Что проверить первым

1. Система -> Ноги / Устройства.
2. Блок "Присутствие устройств".
3. Кнопка "Подготовить ссылку телефона".
4. Мобильный экран без горизонтального скролла.
5. Схема Мины -> Ноги.
