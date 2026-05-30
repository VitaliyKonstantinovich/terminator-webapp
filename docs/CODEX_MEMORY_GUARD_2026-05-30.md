# Codex Memory Guard 2026-05-30

Status: ACTIVE WORKING RULE

## Why

Codex crashed with `memory allocation failed`. Windows Resource Exhaustion log showed `codex.exe` using heavy memory while BlueStacks also used several GB.

Chromium/Electron processes can reserve huge virtual address ranges, so the practical guard level is based on private memory plus free RAM. Reserved virtual memory is still shown as diagnostic context.

This is a tool/runtime memory pressure issue, not a Terminator code failure.

## Rule

Use soft memory guard, not a hard 19 GB limit.

- GREEN: normal work.
- YELLOW: no large evidence scans, screenshots in small batches.
- ORANGE: checkpoint, no BlueStacks, no massive browser/CDP runs.
- RED: stop heavy operations, checkpoint, continue only with small read-only block.

## Script

Read-only check:

```powershell
.\tools\memory-guard\check-codex-memory.ps1
```

JSON output:

```powershell
.\tools\memory-guard\check-codex-memory.ps1 -Json
```

Optional gate:

```powershell
.\tools\memory-guard\check-codex-memory.ps1 -FailOnRed
```

## Safety

- Does not kill processes.
- Does not change Windows settings.
- Does not change pagefile.
- Does not require admin rights.
- Does not touch secrets, network, billing, Cloudflare, GitHub settings, or AI API.

## Operating Practice

Before heavy product loops:

1. Run memory guard.
2. If GREEN/YELLOW, continue in small batches.
3. If ORANGE, checkpoint first.
4. If RED, stop heavy work and produce recovery checkpoint.

BlueStacks should be open only during APK/mobile checks.
