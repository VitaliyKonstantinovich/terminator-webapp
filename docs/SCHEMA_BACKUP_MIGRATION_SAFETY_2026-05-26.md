# Schema Versioning + Backup/Restore + Migration Safety

Date: 2026-05-26
Status: local implementation complete, live publication pending

## User Meaning

This step adds a data-safety layer for Terminator growth.

- Schema version = версия структуры данных.
- Migration dry-run = пробный прогон обновления без применения.
- Restore point = точка восстановления перед изменением.
- Safe backup = безопасный экспорт metadata without raw files, secrets, cookies or tokens.

## Implemented

- Added schema registry for projects, tasks, messages, artifacts, files, evidence, approvals, memory, brains, council profiles, search agents, devices, incidents and diagnostics.
- Added local schema safety state under `mina_schema_safety_state_v1`.
- Added migration dry-run that reports which records need a schema stamp.
- Added safe schema stamp that sets schema version and migration status without deleting data.
- Added restore point before schema stamp.
- Added safe schema backup package.
- Added System UI panel: `Схемы данных / Миграции`.
- Added actions:
  - `Проверить схемы`;
  - `Dry-run миграции`;
  - `Проставить версию схемы`;
  - `Создать restore point`;
  - `Скачать backup схем`;
  - `Скопировать restore policy`.
- Extended backup center to show last schema backup.
- Updated GitHub Pages asset markers to `20260526-schema-backup-v1`.

## Safety Boundaries

- No AI API.
- No paid service.
- No `.env`, tokens, cookies, passwords or private keys.
- No raw user files in backup.
- No destructive restore.
- No Direct Bridge source changes.
- No Cloudflare Worker source changes.
- No Local Agent runtime source changes.
- Heavy evidence screenshots saved on `D:\TerminatorStorage`.

## Local Checks

- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- Local desktop smoke through Chrome CDP: PASS.
- Local mobile smoke 390px: PASS.
- Schema check: PASS.
- Migration dry-run: PASS.
- Safe schema stamp: PASS.
- Restore point creation: PASS.
- Schema backup creation: PASS.
- Desktop horizontal overflow: false.
- Mobile horizontal overflow: false.

## Evidence

- `D:\TerminatorStorage\evidence_backups\schema_backup_migration\schema-backup-desktop.png`
- `D:\TerminatorStorage\evidence_backups\schema_backup_migration\schema-backup-mobile.png`
- `evidence/schema_backup_migration/SCHEMA_BACKUP_MIGRATION_RESULT.md`

## What To Check First

1. Open `System`.
2. Find `Схемы данных / Миграции`.
3. Click `Проверить схемы`.
4. Click `Dry-run миграции`.
5. Click `Проставить версию схемы`.
6. Confirm readiness becomes 100% when all local records are stamped.

## Remaining Before Final Close

- Publish to GitHub Pages.
- Run Pages health check.
- Run live desktop/mobile DOM smoke.
