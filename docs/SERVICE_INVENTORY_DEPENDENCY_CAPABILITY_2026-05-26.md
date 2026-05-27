# Service Inventory + Dependency Registry + Capability Matrix

Date: 2026-05-26
Status: closed live

## User Meaning

- Service Inventory = реестр сервисов: что активно, что legacy, что future.
- Dependency Registry = реестр зависимостей: что нужно Терминатору для работы и что делать, если недоступно.
- Capability Matrix = матрица прав: кто что может читать, писать, выполнять и что запрещено.

## Implemented

- Added System panel `Реестр системы`.
- Added service inventory with active, controlled, manual external, legacy and future services.
- Added dependency registry with readiness, fallback and risk level.
- Added capability matrix built from Guardian actor rules.
- Added system registry snapshot and safe export.
- Added actions:
  - `Проверить реестр`;
  - `Скачать реестр`;
  - `Скопировать policy`.
- Added System summary card `Реестр системы`.
- Updated cache marker to `20260526-system-registry-v1`.

## Registered Services

- WebApp Mina UI.
- GitHub Pages.
- GitHub repository.
- GitHub Actions.
- Cloudflare Worker / Direct Bridge.
- Cloudflare Durable Object.
- Local Agent.
- Windows Task Scheduler.
- `D:\TerminatorStorage`.
- Official AI web chats.
- PWA / Browser.
- Telegram bot as legacy.
- n8n as legacy.
- Amvera as legacy.
- PM2 brain workers as audit later.
- Windows Tray App as future.
- Local Search Engine as future-ready.
- Voice Engine as future.
- Browser Automation Runtime as future-blocked.

## Safety Boundaries

- No AI API.
- No paid services added.
- No `.env`, tokens, cookies, passwords or private keys.
- No Direct Bridge source changes.
- No Cloudflare Worker source changes.
- No Local Agent runtime source changes.
- No legacy service resurrected as main path.

## Local Checks

- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- `git diff --check`: PASS, CRLF notices only.
- No mojibake scan: PASS.
- Local desktop Chrome smoke: PASS.
- Local mobile Chrome smoke 390px: PASS.
- Registry panel visible: PASS.
- Registry refresh action: PASS.
- Registry export action: PASS.
- Services count: 19.
- Dependencies count: 13.
- Capability actors count: 13.
- Desktop horizontal overflow: false.
- Mobile horizontal overflow: false.

## Live Checks

- GitHub Actions run `26486130046`: success.
- Pages health check: PASS.
- Live HTML marker `20260526-system-registry-v1`: PASS.
- Live service worker marker `terminator-mina-pwa-20260526-system-registry-v1`: PASS.
- Live System registry panel visible: PASS.
- Live registry refresh action: PASS.
- Live registry buttons visible: PASS.
- Live services count: 19.
- Live dependencies count: 13.
- Live capability actors count: 13.
- Live desktop horizontal overflow: false.
- Live mobile 390px horizontal overflow: false.

## Evidence

- `D:\TerminatorStorage\evidence_backups\system_registry\system-registry-desktop.png`
- `D:\TerminatorStorage\evidence_backups\system_registry\system-registry-mobile.png`
- `D:\TerminatorStorage\evidence_backups\system_registry\system-registry-live-desktop.png`
- `D:\TerminatorStorage\evidence_backups\system_registry\system-registry-live-mobile.png`
- `evidence/system_registry/SYSTEM_REGISTRY_RESULT.md`
