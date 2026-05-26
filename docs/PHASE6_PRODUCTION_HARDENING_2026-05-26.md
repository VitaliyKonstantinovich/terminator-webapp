# Phase 6: Production Hardening + Release Quality

## Status
Local PASS on 2026-05-26. Live Pages deployment pending at the time of this note.

## Implemented
- System summary card: `Производственный контур`.
- System panel: `Производственный контур`.
- System panel: `Резервные копии`.
- System panel: `Наблюдаемость`.
- Local release readiness state:
  - `mina_production_release_state_v1`;
  - `mina_backup_restore_state_v1`;
  - `mina_observability_state_v1`.
- Browser-side release check:
  - WebApp shell;
  - live/local context;
  - PWA shell;
  - IndexedDB task runtime;
  - TaskStore sync;
  - Guardian;
  - Direct Bridge owner session;
  - Local Agent;
  - secrets audit with owner-session redaction;
  - raw/base64 guard;
  - mojibake guard;
  - no AI API.
- Metadata checkpoint and safe state export.
- Observability samples.
- Diagnost check for production readiness.
- Static asset marker `20260526-phase6`.
- GitHub Pages workflow smoke validates Phase 6 markers.

## Russian Explanations
- Direct Bridge = мост между сайтом и локальным контуром.
- TaskStore sync = синхронизация задач с общим хранилищем.
- Local Runtime = локальный исполнитель/контур на ПК.
- Observability = наблюдаемость системы.

## Boundaries
- No AI API.
- No paid services.
- No deploy from browser.
- No secrets/cookies/tokens in export.
- No raw files in export.
- Direct Bridge / Cloudflare Worker source untouched.
- Local Agent runtime untouched.

## Local Checks
- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- `git diff --check`: PASS.
- HTTP local smoke: PASS.
- Desktop headless screenshot: PASS.
- Mobile 390px screenshot: PASS.
- CDP DOM smoke: panels/buttons present, active `screen-system`, no horizontal overflow.
