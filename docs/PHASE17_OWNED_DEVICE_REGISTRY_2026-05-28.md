# Phase 17 — Owned Device / Agent Registry V1

Status: PASS.
Date: 2026-05-28.

## Meaning

Phase 17 replaces the temporary single-agent assumption with an owned device and agent registry.

User-facing translation:

- Owned Device Registry = реестр доверенных устройств владельца.
- Agent Registry = реестр локальных агентов владельца.
- Heartbeat = безопасный сигнал "агент жив".
- Direct Bridge = мост сайт-ПК.
- TaskStore = общее хранилище задач и статусов.

## Implemented

- Added owned registry schema v1 inside Device Mesh state.
- Added primary runtime agent binding:
  - default agent id: `Terminator-PC`;
  - owner PC linked to the primary Local Agent;
  - discovered agents are added as review-required devices instead of being trusted silently.
- Added public bridge registry endpoint:
  - internal route: `/internal/agent/registry`;
  - public field: `agent_registry` inside `/public/runtime-health`.
- Added WebApp registry snapshot:
  - primary agent;
  - online/stale/unknown agent counts;
  - heartbeat freshness;
  - trusted/connected device counts;
  - readiness score;
  - next action.
- Connected registry state to:
  - System summary;
  - Device Mesh panel;
  - Mina Scheme Body/Legs state;
  - Brain runtime label;
  - registry passport copy action.
- Updated GitHub Pages smoke marker to Phase 17.
- Fixed a related visual regression in Mina Scheme:
  - character asset now renders as a stable CSS visual layer;
  - no static PNG interface was added;
  - buttons, cards, statuses and panels remain real DOM.

## Live Results

- Direct Bridge deploy: PASS, GitHub Actions run `26561193534`.
- GitHub Pages deploy for Phase 17 code: PASS, run `26561193443`.
- GitHub Pages final visual fix deploy: PASS, run `26563138546`.
- Live `/public/runtime-health?agent_id=Terminator-PC`: PASS.
- Live `agent_heartbeat.status`: `online`.
- Live `agent_registry.status`: `ready`.
- Live `agent_registry.agent_count`: `1`.
- Live `agent_registry.online_count`: `1`.
- Live `agent_registry.stale_count`: `0`.
- Live HTML marker: `20260528-phase17-owned-device-registry-v1`.
- Live service worker marker: `terminator-mina-pwa-20260528-phase17-owned-device-registry-v1`.

## Checks

- `node --check webapp/app.js`: PASS.
- `node --check webapp/sw.js`: PASS.
- `node --check direct-bridge/bridge-worker.js`: PASS.
- `node --check webapp/.github/cloudflare/direct-bridge/bridge-worker.js`: PASS.
- `git diff --check`: PASS, CRLF notices only.
- Source bridge and deploy mirror hash match: PASS.
- Local System registry desktop smoke: PASS.
- Local System registry mobile smoke: PASS.
- Live System desktop smoke: PASS.
- Live System mobile smoke: PASS.
- Live Mina Scheme visual smoke after silhouette fix: PASS.
- No AI API added: PASS.
- No secret values exposed: PASS.
- No `.env` edits: PASS.

## Evidence

- `evidence/phase17_owned_device_registry/PHASE17_OWNED_DEVICE_REGISTRY_RESULT.md`.
- `D:\TerminatorStorage\evidence_backups\phase17_owned_device_registry\phase17-local-device-registry-anchor.png`.
- `D:\TerminatorStorage\evidence_backups\phase17_owned_device_registry\phase17-local-device-registry-mobile-anchor.png`.
- `D:\TerminatorStorage\evidence_backups\phase17_owned_device_registry\phase17-live-system-desktop.png`.
- `D:\TerminatorStorage\evidence_backups\phase17_owned_device_registry\phase17-live-system-mobile.png`.
- `D:\TerminatorStorage\evidence_backups\phase17_owned_device_registry\phase17-live-scheme-desktop-final3.png`.

## Not Touched

- No passwords, cookies, tokens or API keys were read or stored.
- No `.env` changes.
- No DNS, VPN, proxy, firewall or Defender changes.
- No paid services.
- No AI API.
- No destructive cleanup.

## Result

Phase 17 is closed live. The site, bridge and Local Agent now expose a real owner-agent registry foundation instead of relying only on the hardcoded `Terminator-PC` assumption.

Next layer should continue from this registry into real multi-device ownership: phone/PWA pairing, device presence, handoff and routing.
