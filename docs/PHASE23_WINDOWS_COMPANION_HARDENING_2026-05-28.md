# Phase 23: Windows Companion / Silent Autostart V1

Status: live PASS.
Date: 2026-05-28.

## Purpose

Close the reboot/startup tail before final QAMAX.

Owner-facing meaning:

- Windows Companion = Windows companion layer for Mina UI and Local Agent.
- Silent autostart = Local Agent starts after Windows login without visible `node.exe` or PowerShell windows.
- Legacy PM2 = old n8n/Telegram/brain-worker startup path; it must stay disabled.
- Self-test report = local diagnostic JSON written to `D:\TerminatorStorage`.

## Implemented

- Added `-WriteReport` mode to `mina-windows-companion.ps1`.
- Companion self-test now writes:
  - Local Agent process state;
  - scheduled task state;
  - hidden autostart policy;
  - legacy PM2 policy;
  - visible Terminator-related window hygiene;
  - report path.
- Added visible window scan for Terminator-related `node.exe`, PowerShell and `wscript.exe` windows.
- Installer dry-run now checks silent window policy and legacy PM2 policy.
- Autostart registration sets the scheduled task Hidden flag when install mode is explicitly used.
- Tray stop action now starts PowerShell hidden.
- WebApp System panel now shows:
  - Windows Companion;
  - Silent autostart;
  - Legacy PM2;
  - visible windows after login;
  - self-test report command;
  - report path on D.
- Source of Truth includes Windows Companion as a separate status source.
- PWA/cache marker updated to Phase 23.

## Local Checks

- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- PowerShell parser check for `mina-windows-companion.ps1`: PASS.
- PowerShell parser check for `install-mina-windows-companion.ps1`: PASS.
- `mina-windows-companion.ps1 -SelfTest -WriteReport`: PASS, score 100.
- `install-mina-windows-companion.ps1 -DryRun`: PASS.
- Local desktop System companion smoke: PASS.
- Local mobile 390px no horizontal overflow: PASS.
- No AI API: PASS.
- No secrets: PASS.
- Direct Bridge code untouched: PASS.
- Local Agent code untouched: PASS.

## Live Checks

- GitHub Actions deploy `26602507005`: PASS.
- Live HTML Phase 23 marker: PASS.
- Live `app.js` Phase 23 marker: PASS.
- Live service worker Phase 23 marker: PASS.
- Live desktop System companion smoke: PASS.
- Live mobile 390px no horizontal overflow: PASS.

## Evidence

- `D:\TerminatorStorage\diagnostics\phase23_windows_companion\companion-self-test.json`.
- `D:\TerminatorStorage\evidence_backups\phase23_windows_companion\phase23-local-system-companion-desktop.png`.
- `D:\TerminatorStorage\evidence_backups\phase23_windows_companion\phase23-local-system-companion-mobile.png`.
- `D:\TerminatorStorage\evidence_backups\phase23_windows_companion\phase23-local-smoke.json`.
- `D:\TerminatorStorage\evidence_backups\phase23_windows_companion\phase23-live-system-companion-desktop.png`.
- `D:\TerminatorStorage\evidence_backups\phase23_windows_companion\phase23-live-system-companion-mobile.png`.
- `D:\TerminatorStorage\evidence_backups\phase23_windows_companion\phase23-live-smoke.json`.

## Not Touched

- No `.env` edits.
- No secret extraction.
- No Cloudflare settings changes.
- No GitHub settings changes.
- No AI API.
- No paid services.
- No browser automation for accounts.
- No direct Local Agent implementation changes.
- No Direct Bridge code changes.

## Residual

- No blocking residual for Phase 23.
- WebApp cannot directly read `D:\TerminatorStorage` from the public browser page; it exposes the command and report path, while the real self-test report stays local.
