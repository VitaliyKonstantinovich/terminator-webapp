# Phase 15: Real Health Endpoints + Agent Heartbeat V1

Status: local PASS.
Date: 2026-05-27.

## Owner Meaning

Phase 15 makes the live status layer more honest and readable.

- Direct Bridge = мост сайт-ПК.
- TaskStore = общее хранилище задач и статусов.
- Local Agent = локальный агент на ПК.
- Heartbeat = короткий безопасный сигнал "агент жив".
- Public health = публичная read-only проверка без секретов.

This phase does not deploy the bridge. It prepares the code and local WebApp binding for a controlled live rollout.

## Implemented

### Direct Bridge

- Added public read-only endpoints:
  - `GET /public/runtime-health`;
  - `GET /public/health`.
- Added authenticated local-agent heartbeat endpoint:
  - `POST /agent/heartbeat`.
- Added internal Durable Object heartbeat read/write routes.
- Added heartbeat TTL handling.
- Added sanitized public heartbeat output.

Public health exposes only safe operational metadata:

- bridge status;
- storage type;
- command queue summary;
- task store summary;
- latest sanitized agent heartbeat;
- request id;
- checked time.

It does not expose commands, task payloads, owner session, tokens, cookies, secrets or private data.

### Local Agent

- Added agent version `phase15-live-heartbeat-v1`.
- Added periodic heartbeat send before command polling.
- Added startup heartbeat attempt.
- Added safe CLI health snapshot:
  - `node local-agent/mina-local-agent.mjs --health-snapshot`.
- Heartbeat payload includes only:
  - agent id;
  - version;
  - local time;
  - uptime seconds;
  - polling interval;
  - D storage status;
  - safe capability list.

If the deployed bridge does not yet support heartbeat, the agent logs a warning and continues normal work.

### WebApp

- `Живой контур` now tries `/public/runtime-health` first.
- If public runtime health is available, the WebApp reuses it for:
  - bridge status;
  - task store status;
  - local-agent status.
- If public runtime health is not available, the WebApp falls back to the Phase 14 behavior.
- TaskStore text now explains owner-session requirements more clearly.
- Local Agent status can show heartbeat age once the bridge is deployed.
- Cache marker updated to `phase15-real-health-heartbeat-v1`.

## Changed Files

- `direct-bridge/bridge-worker.js`
- `local-agent/mina-local-agent.mjs`
- `webapp/app.js`
- `webapp/index.html`
- `webapp/sw.js`
- `CODEX_CURRENT_TASK.md`
- `docs/CODEX_SESSION_SUMMARY.md`
- `CODEX_SESSION_SUMMARY.md`
- `memory/TERMINATOR_MASTER_MEMORY.md`
- `webapp/docs/PHASE15_REAL_HEALTH_HEARTBEAT_2026-05-27.md`
- `evidence/phase15_real_health_heartbeat/PHASE15_REAL_HEALTH_HEARTBEAT_RESULT.md`

## Checks

- `node --check webapp/app.js`: PASS.
- `node --check webapp/sw.js`: PASS.
- `node --check direct-bridge/bridge-worker.js`: PASS.
- `node --check local-agent/mina-local-agent.mjs`: PASS.
- `node local-agent/mina-local-agent.mjs --health-snapshot`: PASS.
- Local Chrome headless desktop smoke: PASS.
- Local Chrome headless mobile 390px smoke: PASS.
- Captured DOM contains `Живой контур`, refresh and sync buttons: PASS.
- Captured DOM mojibake scan: PASS.
- No AI API added: PASS.
- No secrets printed in heartbeat snapshot: PASS.

## Evidence

- `D:\TerminatorStorage\evidence_backups\phase15_real_health_heartbeat\phase15-live-runtime-desktop.png`
- `D:\TerminatorStorage\evidence_backups\phase15_real_health_heartbeat\phase15-live-runtime-mobile-390.png`
- `D:\TerminatorStorage\evidence_backups\phase15_real_health_heartbeat\phase15-local-agent-health-snapshot.txt`
- `D:\TerminatorStorage\evidence_backups\phase15_real_health_heartbeat\phase15-dump-stdout.txt`

## Not Touched

- No deploy.
- No push.
- No `.env` edit.
- No GitHub settings.
- No Cloudflare settings.
- No DNS / VPN / proxy / firewall / Defender changes.
- No paid services.
- No AI API.
- No raw secrets copied into docs or evidence.

## Residual Risk

- Live Cloudflare Worker still needs a controlled deploy before `/public/runtime-health` and `/agent/heartbeat` exist in production.
- Until deploy, live WebApp uses fallback health logic.
- TaskStore owner sync still needs owner login by design.

## Next

Phase 16 should be Controlled Bridge Rollout + Live Heartbeat Acceptance:

1. Deploy the updated bridge through the controlled release path.
2. Verify `/public/runtime-health` from the live WebApp.
3. Verify Local Agent heartbeat appears in `Живой контур`.
4. Keep release rollback and no-secrets rules active.
