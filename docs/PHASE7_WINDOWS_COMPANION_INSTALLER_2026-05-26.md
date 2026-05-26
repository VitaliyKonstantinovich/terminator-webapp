# Phase 7: Windows Companion + Installer Foundation

## Status
Live PASS on 2026-05-26. Phase 7 adds a safe Windows companion foundation without changing Direct Bridge, Cloudflare Worker, Local Agent runtime code, secrets, network settings, paid services or AI API.

## User Meaning
- Windows-компаньон = локальная Windows-оболочка рядом с сайтом Терминатора.
- Tray shell = значок в трее Windows с быстрыми безопасными действиями.
- Installer dry-run = проверка установки без реальной установки.
- Local Agent = локальный исполнитель на ПК.

## Implemented
- WebApp marker updated to `20260526-phase7`.
- System panel `Windows-компаньон` upgraded from future contract to Phase 7 readiness control.
- Added companion commands in the UI:
  - self-test;
  - tray shell launch;
  - installer dry-run.
- Added tracked Windows companion scripts:
  - `tools/windows-companion/mina-windows-companion.ps1`;
  - `tools/windows-companion/install-mina-windows-companion.ps1`;
  - `tools/windows-companion/README.md`.
- Self-test checks Windows, Node.js, Local Agent folder, config existence only, agent process, scheduled task, D storage root and safety policy.
- Tray shell can open Mina UI, Scheme, System, Diagnost, run self-test, start/stop Local Agent by explicit user action, and open logs.
- Installer supports safe dry-run and explicit shortcut/autostart flags.
- PowerShell companion script is saved as UTF-8 with BOM so Windows PowerShell parses Russian tray labels correctly.

## Safety Boundaries
- No `.env`, tokens, cookies, passwords or private keys are read.
- No deploy, push, DNS, VPN, proxy, firewall, Defender or route changes.
- No paid service or AI API is enabled.
- Autostart is not installed by default.
- Local Agent start/stop is only through explicit tray menu action or existing owner-run scripts.

## Checks
- `powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\windows-companion\mina-windows-companion.ps1 -SelfTest`: PASS.
- `powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\windows-companion\install-mina-windows-companion.ps1 -DryRun`: PASS.
- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- `git diff --check`: PASS.
- Local desktop UI smoke: PASS.
- Local mobile UI smoke 390px: PASS.
- Horizontal overflow desktop/mobile: false.

## Evidence
- `D:\TerminatorStorage\evidence_backups\phase7_windows_companion\phase7-desktop.png`
- `D:\TerminatorStorage\evidence_backups\phase7_windows_companion\phase7-mobile.png`

## Live Acceptance
- Commit `42765a1 feat: add phase 7 windows companion foundation`: pushed.
- GitHub Actions `Deploy GitHub Pages` run `26475453305`: success.
- `scripts/check-pages-health.ps1`: PASS.
- Live HTML marker `20260526-phase7`: PASS.
- Live service worker marker `terminator-mina-pwa-20260526-phase7`: PASS.
- Live System DOM smoke:
  - `Windows-компаньон`: PASS;
  - `Проверить компаньон`: PASS;
  - `Скопировать self-test`: PASS.

## Next Layer
Memory Search Engine / Context Index V1.
