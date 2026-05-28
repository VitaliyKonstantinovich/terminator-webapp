# Mina Windows Companion

Phase 24 keeps the Windows companion as the safe installed user layer for Terminator Mina.

It is not a hidden remote-control tool. It is a tray shell and installer readiness layer around the existing WebApp and Local Agent.

## What It Can Do

- Open Mina UI.
- Open `Схема Мины`.
- Open `Система`.
- Run a read-only self-test.
- Launch existing Local Agent helper scripts on explicit owner action.
- Show local-agent logs.

## What It Does Not Do

- It does not bypass Approval.
- It does not deploy.
- It does not push to GitHub.
- It does not read `.env`, cookies, tokens, sessions or private keys.
- It does not change DNS, VPN, proxy, firewall, Defender or routes.
- It does not enable paid services or AI API.

## Self-Test

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\mina-windows-companion.ps1 -SelfTest
```

## Launch Tray Shell

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File .\mina-windows-companion.ps1 -Tray
```

## Installer Dry-Run

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\install-mina-windows-companion.ps1 -DryRun
```

## Recommended Install

This creates a Start Menu shortcut only. It does not enable tray autostart and does not change the Local Agent autostart.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\install-mina-windows-companion.ps1 -CreateStartMenuShortcut
```

## Optional Install Actions

These are explicit and not enabled by default:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\install-mina-windows-companion.ps1 -CreateStartMenuShortcut
powershell -NoProfile -ExecutionPolicy Bypass -File .\install-mina-windows-companion.ps1 -CreateDesktopShortcut
powershell -NoProfile -ExecutionPolicy Bypass -File .\install-mina-windows-companion.ps1 -InstallAutostart
```

Autostart means Windows starts the tray shell after logon. It does not start hidden dangerous actions.
