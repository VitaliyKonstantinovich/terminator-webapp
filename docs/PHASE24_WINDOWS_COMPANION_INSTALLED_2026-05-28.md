# Phase 24: Windows Companion Installed User Layer V1

Status: local PASS, live pending.
Date: 2026-05-28.

## Purpose

Turn the Windows Companion from available scripts into a safe installed user entry point.

Owner-facing meaning:

- Windows Companion = Windows layer around Mina UI and Local Agent.
- Start Menu shortcut = a normal Windows entry in the Start menu.
- Tray shell = local menu for opening Mina UI, Scheme, System, Diagnostics and explicit Local Agent actions.

## Implemented

- Installer now writes reports to `D:\TerminatorStorage\diagnostics\phase24_windows_companion_installed`.
- Installer reports Start Menu and Desktop shortcut paths.
- Installer reports whether each shortcut exists.
- Recommended install path is Start Menu only.
- WebApp System panel exposes the Start Menu install command.
- WebApp action strip can copy the Start Menu install command.
- README updated with recommended install flow.
- Phase 24 cache markers added.

## Installed Locally

Created:

- `C:\Users\glebi\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Terminator Mina\Mina Windows Companion.lnk`

Not created:

- Desktop shortcut.
- Tray autostart task.

## Checks

- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- PowerShell parser check for installer: PASS.
- PowerShell parser check for companion: PASS.
- Installer dry-run: PASS.
- Start Menu install: PASS.
- Start Menu shortcut exists: PASS.
- Shortcut target is PowerShell with hidden tray launch arguments: PASS.
- Desktop shortcut absent: PASS.
- Companion self-test: PASS, score 100.
- Local desktop companion panel smoke: PASS.
- Local mobile 390px no horizontal overflow: PASS.
- No AI API: PASS.
- No secrets: PASS.
- No paid services: PASS.
- No autostart tray install: PASS.

## Evidence

- `D:\TerminatorStorage\diagnostics\phase24_windows_companion_installed\installer-report.json`.
- `D:\TerminatorStorage\evidence_backups\phase24_windows_companion_installed\phase24-local-system-companion-desktop.png`.
- `D:\TerminatorStorage\evidence_backups\phase24_windows_companion_installed\phase24-local-system-companion-mobile.png`.
- `D:\TerminatorStorage\evidence_backups\phase24_windows_companion_installed\phase24-local-smoke.json`.

## Residual Before Live Close

- Publish GitHub Pages marker.
- Verify live System companion panel includes Start Menu install command.
- Verify live mobile no horizontal overflow.

