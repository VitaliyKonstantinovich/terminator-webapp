# Phase 9 — Mina Voice / Safe Command Layer V1

Дата: 2026-05-27
Статус: local PASS, live pending

## Что реализовано

- Добавлен безопасный слой Mina Voice V1 в Рабочем.
- Голосовой вход доступен до создания задачи: можно сказать или вставить команду и получить предпросмотр.
- Команда проходит цепочку: текст речи -> нормализация -> намерение -> сущности -> уверенность -> риск -> подтверждение владельца -> безопасное действие.
- Команда "создай задачу..." после подтверждения создаёт реальный task_id через Task Runtime.
- Команда "добавь уточнение..." добавляет уточнение в текущую задачу.
- Навигационные команды открывают Рабочее, Центр управления, Систему, Ноги / Устройства.
- Команда "что дальше" показывает следующий шаг.
- Опасные команды блокируются и не выполняются голосом.
- Добавлен глобальный журнал голосовых событий.
- Добавлен System-блок "Mina Voice V1" с готовностью, примерами команд, событиями и отчётом безопасности.
- Схема Мины теперь получает голосовой статус из Mina Voice snapshot.

## Что не делалось

- Нет wake phrase / фонового прослушивания.
- Нет сохранения аудио.
- Нет AI API.
- Нет автоматического браузерного управления внешними чатами.
- Нет обхода Approval Center.
- Direct Bridge и Local Agent не менялись.

## Проверки

- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- `git diff --check`: PASS, только рабочие предупреждения Git о будущей нормализации line endings.
- Local UI smoke: PASS.
- Voice create task: PASS.
- Dangerous voice command block: PASS.
- System Mina Voice panel: PASS.
- Mobile overflow check: PASS.
- No AI API runtime calls added: PASS.
- No secrets added: PASS; scanner false positives are existing DOM ids / privacy scanner patterns.

## Evidence

- `D:\TerminatorStorage\evidence_backups\phase9_mina_voice\phase9-voice-local-workspace.png`
- `D:\TerminatorStorage\evidence_backups\phase9_mina_voice\phase9-voice-local-system.png`
- `D:\TerminatorStorage\evidence_backups\phase9_mina_voice\phase9-voice-local-mobile.png`

## Что проверить первым

1. Рабочее -> Голос Мины -> команда "создай задачу проверить отчёт Codex".
2. Предпросмотр показывает риск, уверенность и проект.
3. Нажатие "Создать задачу" создаёт task_id.
4. Команда "пушни main" не выполняется и показывает блокировку.
5. Система -> Голос показывает Mina Voice V1, готовность, примеры и журнал.

