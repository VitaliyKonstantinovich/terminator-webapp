const MODELS = {
  chatgpt: {
    name: 'ChatGPT',
    short: 'GPT',
    profile: 'ChatGPT Profile',
    iconClass: 'model-icon--chatgpt'
  },
  gemini: {
    name: 'Gemini',
    short: 'GM',
    profile: 'Gemini Profile',
    iconClass: 'model-icon--gemini'
  },
  deepseek: {
    name: 'DeepSeek',
    short: 'DS',
    profile: 'DeepSeek Profile',
    iconClass: 'model-icon--deepseek'
  },
  qwen: {
    name: 'Qwen',
    short: 'Q',
    profile: 'Qwen Profile',
    iconClass: 'model-icon--qwen'
  }
};

const BRAIN_ROLES = [
  {
    id: 'chatgpt_strategy',
    brain: 'ChatGPT',
    short: 'GPT',
    role: 'Стратег',
    mission: 'Принять железобетонное решение, удерживая качество, риски и цель владельца.',
    focus: 'синтез, приоритеты, финальное решение',
    artifact_title: 'Ответ ChatGPT / Стратег'
  },
  {
    id: 'gemini_analysis',
    brain: 'Gemini',
    short: 'GM',
    role: 'Аналитик длинного контекста',
    mission: 'Разобрать большой контекст, найти зависимости, пропуски и скрытые условия.',
    focus: 'контекст, документы, полнота, длинные цепочки',
    artifact_title: 'Ответ Gemini / Аналитик'
  },
  {
    id: 'deepseek_critic',
    brain: 'DeepSeek',
    short: 'DS',
    role: 'Критик / red team / код',
    mission: 'Найти слабые места, технические риски, противоречия и плохие решения.',
    focus: 'критика, код, баги, безопасность, проверка',
    artifact_title: 'Ответ DeepSeek / Критик'
  },
  {
    id: 'qwen_alternative',
    brain: 'Qwen',
    short: 'Q',
    role: 'Альтернативный взгляд',
    mission: 'Дать независимую альтернативу, fallback-идею и нестандартный путь.',
    focus: 'альтернатива, упрощение, второй план',
    artifact_title: 'Ответ Qwen / Альтернатива'
  }
];

const BRAIN_ROLE_BY_ID = Object.fromEntries(BRAIN_ROLES.map((role) => [role.id, role]));

const HEAD_BRAIN_ROLES = [
  'Главный Стратег',
  'Стратег',
  'Аналитик длинного контекста',
  'Критик / red team / код',
  'Альтернативный взгляд',
  'Исследователь источников',
  'Премиальный архитектор',
  'Fallback',
  'Пользовательская роль'
];

const HEAD_BRAIN_CATALOG = [
  {
    brain_id: 'brain_chatgpt',
    provider_name: 'OpenAI',
    display_name: 'ChatGPT',
    selected_model_name: 'ChatGPT',
    official_url: 'https://chatgpt.com/',
    role: 'Стратег',
    default_role: 'Стратег / синтез / структура / финальная логика',
    ready_phrase: 'READY_TERMINATOR_CHATGPT',
    can_be_strategist: true,
    enabled: true,
    order: 10,
    notes: 'Базовый стратегический мозг для синтеза и финальной логики.'
  },
  {
    brain_id: 'brain_claude',
    provider_name: 'Anthropic',
    display_name: 'Claude',
    selected_model_name: 'Claude Opus',
    official_url: 'https://claude.ai/',
    role: 'Премиальный архитектор',
    default_role: 'Премиальный архитектор / стратег / длинный reasoning',
    ready_phrase: 'READY_TERMINATOR_CLAUDE',
    can_be_strategist: true,
    enabled: false,
    order: 20,
    notes: 'Сильный кандидат на главного Стратега, если владелец выберет его вручную.'
  },
  {
    brain_id: 'brain_gemini',
    provider_name: 'Google',
    display_name: 'Gemini',
    selected_model_name: 'Gemini',
    official_url: 'https://gemini.google.com/',
    role: 'Аналитик длинного контекста',
    default_role: 'Аналитик длинного контекста / документы / сравнение',
    ready_phrase: 'READY_TERMINATOR_GEMINI',
    can_be_strategist: true,
    enabled: true,
    order: 30,
    notes: 'Разбор больших материалов, документов и длинных цепочек.'
  },
  {
    brain_id: 'brain_deepseek',
    provider_name: 'DeepSeek',
    display_name: 'DeepSeek',
    selected_model_name: 'DeepSeek',
    official_url: 'https://chat.deepseek.com/',
    role: 'Критик / red team / код',
    default_role: 'Критик / инженер / red team / код / риски',
    ready_phrase: 'READY_TERMINATOR_DEEPSEEK',
    can_be_strategist: false,
    enabled: true,
    order: 40,
    notes: 'Проверяет слабые места, инженерные риски и противоречия.'
  },
  {
    brain_id: 'brain_qwen',
    provider_name: 'Alibaba',
    display_name: 'Qwen',
    selected_model_name: 'Qwen',
    official_url: 'https://chat.qwen.ai/',
    role: 'Альтернативный взгляд',
    default_role: 'Альтернативный взгляд / fallback / второе мнение',
    ready_phrase: 'READY_TERMINATOR_QWEN',
    can_be_strategist: false,
    enabled: true,
    order: 50,
    notes: 'Даёт независимый вариант и запасной взгляд.'
  },
  {
    brain_id: 'brain_perplexity',
    provider_name: 'Perplexity',
    display_name: 'Perplexity',
    selected_model_name: 'Perplexity',
    official_url: 'https://www.perplexity.ai/',
    role: 'Исследователь источников',
    default_role: 'Web-oriented исследователь источников',
    ready_phrase: 'READY_TERMINATOR_PERPLEXITY',
    can_be_strategist: false,
    enabled: false,
    order: 60,
    notes: 'Опциональный source-aware помощник. Не является обязательным мозгом.'
  },
  {
    brain_id: 'brain_kimi',
    provider_name: 'Moonshot',
    display_name: 'Kimi',
    selected_model_name: 'Kimi',
    official_url: 'https://kimi.moonshot.cn/',
    role: 'Аналитик длинного контекста',
    default_role: 'Длинный контекст / альтернативный аналитик',
    ready_phrase: 'READY_TERMINATOR_KIMI',
    can_be_strategist: true,
    enabled: false,
    order: 70,
    notes: 'Опциональный длинноконтекстный аналитик.'
  },
  {
    brain_id: 'brain_grok',
    provider_name: 'xAI',
    display_name: 'Grok',
    selected_model_name: 'Grok',
    official_url: 'https://grok.com/',
    role: 'Альтернативный взгляд',
    default_role: 'Альтернативный взгляд / социальный контекст',
    ready_phrase: 'READY_TERMINATOR_GROK',
    can_be_strategist: false,
    enabled: false,
    order: 80,
    notes: 'Опциональный участник Совета.'
  },
  {
    brain_id: 'brain_mistral',
    provider_name: 'Mistral',
    display_name: 'Mistral',
    selected_model_name: 'Le Chat',
    official_url: 'https://chat.mistral.ai/',
    role: 'Fallback',
    default_role: 'Европейский fallback / альтернативное reasoning',
    ready_phrase: 'READY_TERMINATOR_MISTRAL',
    can_be_strategist: true,
    enabled: false,
    order: 90,
    notes: 'Опциональный fallback.'
  }
];

const HEAD_SEARCH_AGENT_CATALOG = [
  ['search_official_docs', 'Official Docs Agent', 'official_docs', 'Официальная документация', 'Ищет первичные документы и официальные источники.', true],
  ['search_github', 'GitHub Agent', 'github', 'Код и issues', 'Ищет репозитории, issues, changelog и README.', true],
  ['search_youtube', 'YouTube Agent', 'youtube', 'Видео и демонстрации', 'Собирает наблюдения из видео и обзоров вручную.', true],
  ['search_reddit', 'Reddit Agent', 'reddit', 'Форумы и опыт пользователей', 'Фиксирует живой опыт и проблемы пользователей.', true],
  ['search_4pda', '4PDA Agent', 'forum', 'Русскоязычные форумы', 'Полезен для устройств, Android, Windows и нестандартных кейсов.', true],
  ['search_xda', 'XDA Agent', 'forum', 'Android / devices', 'Сильный источник для Android, ADB, устройств и прошивок.', true],
  ['search_stackoverflow', 'StackOverflow Agent', 'qa_forum', 'Технические ответы', 'Ищет проверенные решения и типовые ошибки разработки.', true],
  ['search_news', 'News Agent', 'news', 'Новости', 'Нужен для свежих изменений рынка и сервисов.', false],
  ['search_academic', 'Academic / Papers Agent', 'papers', 'Исследования', 'Нужен для статей, papers и фундаментальных решений.', false],
  ['search_product_reviews', 'Product Reviews Agent', 'reviews', 'Отзывы продуктов', 'Сравнивает практический пользовательский опыт.', false]
];

const HEAD_PROFILE_TYPES = {
  default: 'Основной',
  research: 'Максимальное исследование',
  custom: 'Пользовательский'
};

const WORK_PROJECTS = [
  {
    id: 'terminator',
    name: 'Терминатор',
    short_description: 'Mina UI, Direct Mode, Local Agent, Bridge и runtime проекта'
  },
  {
    id: 'diploma_qa',
    name: 'Диплом / QA',
    short_description: 'Тестирование, критерии, дипломные материалы и QA-проверки'
  },
  {
    id: 'development_executors',
    name: 'Разработка / Codex / Antigravity',
    short_description: 'Код, аудит, checkpoint, фиксы и работа исполнителей'
  },
  {
    id: 'research_documents',
    name: 'Исследования / документы / анализ',
    short_description: 'Сравнение источников, документы, исследования и аналитика'
  }
];

const WORK_MODES = [
  { id: 'auto', name: 'Авто' },
  { id: 'fast', name: 'Быстро' },
  { id: 'deep', name: 'Глубоко' },
  { id: 'analysis', name: 'Анализ' },
  { id: 'prepare_task', name: 'Подготовить ТЗ' },
  { id: 'check_result', name: 'Проверить результат' },
  { id: 'brain_council', name: 'Совет мозгов' },
  { id: 'research', name: 'Исследование' },
  { id: 'save_memory', name: 'Сохранить в память' }
];

const WORK_QUALITY_LEVELS = [
  { id: 'auto', name: 'Авто' },
  { id: 'fast', name: 'Быстро' },
  { id: 'standard', name: 'Стандарт' },
  { id: 'maximum', name: 'Максимум' }
];

const WORK_STATUSES = [
  'created',
  'waiting_user_approval',
  'context_ready',
  'planning',
  'ready_for_executor',
  'assigned',
  'waiting_executor_report',
  'executor_report_received',
  'verifying',
  'needs_fix',
  'accepted_with_risks',
  'accepted',
  'rejected',
  'saving_memory',
  'saved',
  'failed',
  'cancelled',
  'manual_required'
];

const WORK_STORAGE_KEY = 'mina_work_tasks_v1';
const WORK_COUNTER_KEY = 'mina_work_task_counter_v1';
const SYSTEM_DIAGNOSTICS_STORAGE_KEY = 'mina_system_diagnostics_v1';
const GUARDIAN_STATE_STORAGE_KEY = 'mina_guardian_state_v1';
const GUARDIAN_INCIDENTS_STORAGE_KEY = 'mina_guardian_incidents_v1';
const GUARDIAN_WORKER_REPORTS_STORAGE_KEY = 'mina_guardian_worker_reports_v1';
const TASK_STORE_SYNC_STATE_KEY = 'mina_task_store_sync_state_v1';
const HEAD_RUNTIME_FALLBACK_KEY = 'mina_head_runtime_v1';
const MINA_SCHEME_STATE_KEY = 'mina_system_scheme_state_v1';
const PWA_STATE_STORAGE_KEY = 'mina_pwa_state_v1';
const VOICE_SETTINGS_STORAGE_KEY = 'mina_voice_settings_v1';
const VOICE_EVENTS_STORAGE_KEY = 'mina_voice_events_v1';
const PRODUCTION_RELEASE_STATE_KEY = 'mina_production_release_state_v1';
const PRE_QAMAX_GATE_STATE_KEY = 'mina_pre_qamax_gate_state_v1';
const BACKUP_RESTORE_STATE_KEY = 'mina_backup_restore_state_v1';
const OBSERVABILITY_STATE_KEY = 'mina_observability_state_v1';
const WINDOWS_COMPANION_STATE_STORAGE_KEY = 'mina_windows_companion_state_v1';
const MEMORY_SEARCH_STATE_STORAGE_KEY = 'mina_memory_search_state_v1';
const SCHEMA_SAFETY_STATE_STORAGE_KEY = 'mina_schema_safety_state_v1';
const SYSTEM_REGISTRY_STATE_STORAGE_KEY = 'mina_system_registry_state_v1';
const POLICY_CENTER_STATE_STORAGE_KEY = 'mina_policy_center_state_v1';
const LIVE_RUNTIME_STATE_STORAGE_KEY = 'mina_live_runtime_state_v1';
const DEVICE_PAIRING_STATE_STORAGE_KEY = 'mina_device_pairing_state_v1';
const HANDOFF_ROUTE_PLANNER_SCHEMA_VERSION = 1;
const CONTINUITY_SCHEMA_VERSION = 1;
const CONTINUITY_STORAGE_KEY = 'mina_continuity_offline_teleport_v1';
const CONTINUITY_MAX_CHECKPOINTS = 20;
const CONTINUITY_MAX_TELEPORT_PACKAGES = 30;
const CONTINUITY_MAX_OFFLINE_EVENTS = 40;
const SOURCE_OF_TRUTH_SCHEMA_VERSION = 1;
const SOURCE_OF_TRUTH_STORAGE_KEY = 'mina_source_of_truth_v1';
const SOURCE_OF_TRUTH_MAX_HISTORY = 24;
const WORK_RUNTIME_DB_NAME = 'mina_task_runtime_v1';
const WORK_RUNTIME_DB_VERSION = 9;
const WORK_RUNTIME_META_KEY = 'runtime_meta';
const GUARDIAN_STATE_META_KEY = 'guardian_state_v1';
const WORK_RUNTIME_MIGRATION_KEY = 'localStorage_migrated_v1';
const WORK_PROJECT_BY_ID = Object.fromEntries(WORK_PROJECTS.map((project) => [project.id, project]));
const WORK_MODE_BY_ID = Object.fromEntries(WORK_MODES.map((mode) => [mode.id, mode]));
const WORK_QUALITY_BY_ID = Object.fromEntries(WORK_QUALITY_LEVELS.map((quality) => [quality.id, quality]));

const HANDOFF_STATUS_LABELS = {
  draft: 'черновик',
  prepared: 'пакет готов',
  copied: 'пакет скопирован',
  owner_confirmed: 'передано вручную',
  cancelled: 'отменено',
  blocked: 'заблокировано'
};

const HANDOFF_ROUTE_STATUS_LABELS = {
  ready: 'готов',
  partial: 'частично',
  waiting: 'ожидает',
  review: 'проверить',
  blocked: 'заблокирован'
};

const TELEPORT_PACKAGE_MODES = [
  ['resume_short', 'Короткий пакет', 'Минимум для продолжения: задача, статус, следующий шаг.'],
  ['resume_standard', 'Стандартный пакет', 'Задача, критерии, артефакты, handoff, safety rules.'],
  ['phone_pwa', 'Телефон / PWA', 'Сжатый пакет для продолжения с телефона.'],
  ['brain_council', 'Совет мозгов', 'Пакет для ручной передачи в Brain Council.'],
  ['external_executor', 'Внешний исполнитель', 'Пакет для Codex/Antigravity/внешнего чата без секретов.']
];
const TELEPORT_PACKAGE_MODE_BY_ID = Object.fromEntries(TELEPORT_PACKAGE_MODES.map(([id, label, note]) => [id, { id, label, note }]));
const CONTINUITY_STATUS_LABELS = {
  ready: 'готово',
  partial: 'частично',
  waiting: 'ожидает',
  review: 'нужно проверить',
  offline: 'offline',
  blocked: 'заблокировано'
};

const TASK_RUNTIME_STORES = {
  META: 'meta',
  PROJECTS: 'projects',
  TASKS: 'tasks',
  EVENTS: 'events',
  MESSAGES: 'messages',
  ARTIFACTS: 'artifacts',
  FILES: 'files',
  APPROVALS: 'approvals',
  MEMORY: 'memory',
  DEVICES: 'devices',
  DEVICE_CAPABILITIES: 'device_capabilities',
  DEVICE_EVENTS: 'device_events',
  DIAGNOSTICS: 'diagnostics',
  INCIDENTS: 'incidents',
  GUARDIAN_EVENTS: 'guardian_events',
  GUARDIAN_WORKER_REPORTS: 'guardian_worker_reports',
  HEAD_BRAINS: 'head_brains',
  HEAD_PROFILES: 'head_profiles',
  HEAD_SEARCH_AGENTS: 'head_search_agents',
  HEAD_EVENTS: 'head_events',
  MEMORY_INDEX: 'memory_index'
};

const MEMORY_SEARCH_SCHEMA_VERSION = 1;
const MEMORY_SEARCH_INDEX_VERSION = 'context-index-keyword-v1';
const MEMORY_SEARCH_MAX_RECORDS = 1200;
const MEMORY_SEARCH_MAX_PREVIEW_CHARS = 900;
const MEMORY_SEARCH_RESULT_LIMIT = 24;
const MEMORY_SEARCH_TYPE_LABELS = {
  project: 'Проект',
  task: 'Задача',
  memory: 'Память',
  artifact: 'Артефакт',
  evidence: 'Доказательство',
  file_ref: 'Файл',
  source: 'Источник',
  research: 'Исследование',
  brain_answer: 'Ответ мозга',
  decision: 'Решение',
  message: 'Событие'
};
const MEMORY_SEARCH_STOP_WORDS = new Set([
  'и', 'в', 'во', 'на', 'по', 'для', 'что', 'это', 'как', 'или', 'но', 'из', 'с', 'со', 'к', 'ко', 'а',
  'the', 'and', 'or', 'to', 'of', 'in', 'for', 'with', 'is', 'are'
]);

const EYES_VISUAL_SCHEMA_VERSION = 1;
const EYES_VISUAL_STATE_STORAGE_KEY = 'mina_eyes_visual_state_v1';
const EYES_VISUAL_MAX_CHECKS = 80;
const EYES_VISUAL_MODES = [
  ['desktop', 'Desktop'],
  ['mobile', 'Mobile'],
  ['workspace', 'Рабочее окно'],
  ['scheme', 'Схема Мины'],
  ['manual', 'Ручная фиксация']
];
const EYES_VISUAL_MODE_BY_ID = Object.fromEntries(EYES_VISUAL_MODES);
const EYES_VISUAL_CHECKLIST = [
  ['screenshot_ref', 'Есть ссылка или путь к скриншоту'],
  ['layout_readable', 'Текст читается и не налезает'],
  ['no_horizontal_overflow', 'Нет горизонтального разъезда'],
  ['buttons_clickable', 'Кнопки кликабельны нормальными DOM-элементами'],
  ['no_mojibake', 'Нет кракозябр'],
  ['no_secret_visible', 'Секреты не попали в evidence']
];

const HANDS_SAFE_ACTION_SCHEMA_VERSION = 1;
const HANDS_SAFE_ACTION_STORAGE_KEY = 'mina_hands_safe_actions_v1';
const HANDS_SAFE_ACTION_MAX_PLANS = 60;
const HANDS_WORKER_OPTIONS = [
  ['file_worker', 'Файловый помощник', 'metadata, hash, task storage; без удаления и auto-run'],
  ['code_worker', 'Кодовый помощник', 'repair workspace, diff, проверки; active project не меняет напрямую'],
  ['browser_worker', 'Браузерный помощник', 'future QA actions; без логинов, cookies и платежей'],
  ['system_worker', 'Системный помощник', 'только health/status; без network/firewall/Defender'],
  ['memory_worker', 'Помощник памяти', 'Memory Preview и индекс; без raw noise и секретов'],
  ['device_worker', 'Помощник устройств', 'Device Mesh events; без pairing/settings без Approval']
];
const HANDS_WORKER_BY_ID = Object.fromEntries(HANDS_WORKER_OPTIONS.map(([id, label, note]) => [id, { id, label, note }]));
const HANDS_RISK_OPTIONS = [
  ['safe', 'Безопасно'],
  ['review', 'Нужна проверка'],
  ['approval_required', 'Требуется подтверждение'],
  ['dangerous', 'Опасно / блокировать']
];
const HANDS_RISK_LABELS = Object.fromEntries(HANDS_RISK_OPTIONS);
const HANDS_STATUS_LABELS = {
  draft: 'черновик',
  plan_ready: 'план готов',
  review_required: 'нужна проверка',
  approval_required: 'нужно подтверждение',
  blocked: 'заблокировано',
  approval_created: 'approval создан',
  copied: 'скопировано',
  controlled_running: 'runtime выполняется',
  controlled_completed: 'runtime выполнен',
  controlled_blocked: 'runtime заблокирован'
};
const HANDS_BLOCKED_ACTIONS = [
  'delete / remove / wipe',
  'deploy / Cloudflare publish',
  'push main / force push',
  '.env / secrets / tokens / cookies',
  'network / DNS / VPN / proxy / firewall',
  'Defender / Windows security',
  'account / payment actions',
  'unknown executable / archive extraction'
];
const CONTROLLED_WORKER_RUNTIME_SCHEMA_VERSION = 1;
const CONTROLLED_WORKER_RUNTIME_STORAGE_KEY = 'mina_controlled_worker_runtime_v1';
const CONTROLLED_WORKER_RUNTIME_MAX_RUNS = 80;
const CONTROLLED_RUNTIME_ACTION_OPTIONS = [
  ['readiness_snapshot', 'Снимок готовности', 'Собрать read-only состояние Guardian, Рук, памяти, задач и approval.'],
  ['memory_index_refresh', 'Обновить индекс памяти', 'Пересобрать локальный Memory Search index без внешних API и без чтения секретов.'],
  ['task_metadata_stamp', 'Записать metadata в задачу', 'Добавить audit/event/artifact в выбранную задачу без изменения файлов проекта.'],
  ['worker_readiness_report', 'Worker readiness report', 'Создать отчёт готовности workers через Guardian без запуска команд.']
];
const CONTROLLED_RUNTIME_ACTION_BY_ID = Object.fromEntries(CONTROLLED_RUNTIME_ACTION_OPTIONS.map(([id, label, note]) => [id, { id, label, note }]));
const CONTROLLED_RUNTIME_STATUS_LABELS = {
  not_started: 'не запускался',
  gate_passed: 'допущен',
  running: 'выполняется',
  completed: 'выполнен',
  blocked: 'заблокирован',
  failed: 'ошибка'
};
const CONTROLLED_APPLY_PIPELINE_SCHEMA_VERSION = 1;
const CONTROLLED_APPLY_PIPELINE_STORAGE_KEY = 'mina_controlled_apply_pipeline_v1';
const CONTROLLED_APPLY_PIPELINE_MAX_PACKAGES = 80;
const CONTROLLED_APPLY_STATUS_LABELS = {
  draft: 'черновик',
  prepared: 'пакет готов',
  verifier_ready: 'готов к Verifier',
  approval_required: 'нужно подтверждение',
  approved_for_manual_apply: 'разрешено ручное применение',
  manual_applied: 'владелец отметил применённым',
  blocked: 'заблокировано',
  rejected: 'отклонено'
};

const DATA_SCHEMA_VERSION = 1;
const SAFE_BACKUP_PACKAGE_VERSION = 1;
const SCHEMA_SAFETY_TARGETS = [
  ['projects', 'Проекты', 'хранилище проектов', true],
  ['tasks', 'Задачи', 'хранилище задач (TaskStore / IndexedDB)', true],
  ['messages', 'Сообщения', 'история задачи', false],
  ['artifacts', 'Артефакты', 'полка результатов', true],
  ['files', 'Метаданные файлов', 'файловый контур', true],
  ['evidence', 'Доказательства', 'проверка / исследование', true],
  ['approvals', 'Подтверждения', 'центр подтверждений (Approval Center)', true],
  ['memory', 'Память', 'память и поиск', true],
  ['brains', 'Мозги', 'Голова / Совет мозгов', true],
  ['profiles', 'Профили Совета', 'профили Совета', true],
  ['search_agents', 'Поисковики', 'исследователи', true],
  ['devices', 'Устройства', 'связь устройств (Device Mesh)', true],
  ['incidents', 'Инциденты', 'защитник (Guardian)', true],
  ['diagnostics', 'Диагност', 'диагност', false]
];

const DEFAULT_PROJECT_TYPE = 'custom';
const DIAGNOSTIC_WAITING_REPORT_STALE_MS = 2 * 60 * 60 * 1000;
const DIAGNOSTIC_MANUAL_REVIEW_STALE_MS = 24 * 60 * 60 * 1000;
const DIAGNOSTIC_DIRECT_HEALTH_TIMEOUT_MS = 6000;
const LIVE_RUNTIME_CHECK_TIMEOUT_MS = 3500;
const TASK_STORAGE_SCHEMA_VERSION = 3;
const FILE_HASH_MAX_BYTES = 50 * 1024 * 1024;
const TASK_STORAGE_SUBFOLDERS = ['files', 'evidence', 'artifacts', 'reports', 'logs', 'previews', 'restore_points', 'manifests', 'memory', 'incoming', 'quarantine'];
const RAW_FILE_STORAGE_PATTERN = /(?:data:[^"'\\\s]+;base64,|;base64,)/i;
const TASK_STORAGE_FOLDER_LABELS = {
  files: 'Файлы',
  evidence: 'Evidence',
  artifacts: 'Артефакты',
  reports: 'Отчёты',
  logs: 'Логи',
  previews: 'Preview',
  restore_points: 'Restore points',
  manifests: 'Manifests',
  memory: 'Memory',
  incoming: 'Incoming',
  quarantine: 'Quarantine'
};

const LEGACY_PERSONAL_SCREENS = new Set(['personal', 'brain', 'remote', 'complete']);
const LEGACY_PERSONAL_ACCESS_KEY = 'mina_allow_legacy_personal';

const GUARDIAN_DEFAULT_STATE = {
  status: 'active',
  safe_mode: false,
  emergency_stop_active: false,
  autonomy_level: 2,
  paid_services_allowed: false,
  ai_api_allowed: false,
  browser_automation_allowed: false,
  active_policy: 'owner_controlled',
  last_event: 'Phase 4 Guardian foundation initialized',
  updated_at: ''
};

const GUARDIAN_STATUS_LABELS = {
  active: 'активен',
  safe_mode: 'безопасный режим',
  emergency_stop: 'стоп действия',
  review: 'требует проверки'
};

const INCIDENT_STATUS_LABELS = {
  detected: 'обнаружен',
  triaged: 'разобран',
  user_notified: 'показан владельцу',
  safe_action_suggested: 'есть безопасное действие',
  approval_required: 'нужно подтверждение',
  fixed: 'исправлен',
  ignored_by_user: 'проигнорирован',
  closed: 'закрыт',
  reopened: 'переоткрыт'
};

const INCIDENT_SEVERITY_LABELS = {
  info: 'информация',
  warning: 'внимание',
  error: 'ошибка',
  critical: 'критично'
};

const COST_GUARD_SERVICES = [
  ['cloudflare_billing', 'Cloudflare billing', 'unknown', 'Проверять перед Worker/Storage/paid features.'],
  ['github_actions_usage', 'GitHub Actions usage', 'unknown', 'Бесплатные лимиты возможны, платные runner запрещены без Cost Approval.'],
  ['amvera', 'Amvera', 'legacy', 'Не является активным путём. Не развивать и не оплачивать без отдельного решения.'],
  ['n8n', 'n8n', 'legacy', 'Legacy automation. Не возвращать как основной путь.'],
  ['ai_subscriptions', 'AI subscriptions', 'owner_manual', 'Только ручные web-chat подписки владельца. API не включать.'],
  ['paid_api', 'Paid API risk', 'blocked', 'OpenAI/Gemini/DeepSeek/OpenRouter API заблокированы по умолчанию.'],
  ['paid_runners', 'Paid runners', 'blocked', 'Платные runners/VPS запрещены без Cost Approval.'],
  ['cloud_storage', 'Future cloud storage', 'blocked', 'Тяжёлые файлы живут на D, облако только после отдельного решения.']
];

const GUARDIAN_CAPABILITY_MATRIX = [
  ['user', 'Владелец', 'все разрешённые данные', 'после осознанного решения', 'ручные подтверждения', 'только через Approval', 'критичные действия', 'owner-approved paths', 'critical'],
  ['system', 'Система', 'runtime state', 'events/artifacts metadata', 'нет', 'нет', 'secrets/delete/deploy', 'IndexedDB / TaskStore metadata', 'medium'],
  ['guardian', 'Guardian', 'policies/incidents', 'incident/status', 'нет', 'нет', 'опасные действия без Approval', 'system policy state', 'high'],
  ['diagnost', 'Диагност', 'health/status/log summaries', 'diagnostic reports/incidents', 'read-only checks', 'нет', 'repair/delete/network', 'diagnostic records', 'review'],
  ['local_agent', 'Local Agent', 'allowlisted local metadata', 'D storage task outputs после разрешения', 'только allowlist', 'нет', '.env/secrets/network/security', 'D:\\TerminatorStorage allowlist', 'high'],
  ['codex_repair_operator', 'Codex Repair Operator', 'selected project files', 'repair workspace only', 'limited checks', 'нет', '.env/secrets/deploy/push main/network', 'D:\\TerminatorStorage\\repair_workspaces', 'high'],
  ['verifier', 'Verifier', 'reports/evidence/artifacts', 'verdict/check logs', 'нет', 'нет', 'apply fixes/accept for owner', 'task artifacts/evidence', 'review'],
  ['file_worker', 'File Worker', 'allowlisted task files', 'task storage after Approval', 'safe metadata checks', 'только explicit Approval', 'unknown files/archives/secrets', 'D:\\TerminatorStorage\\tasks', 'high'],
  ['browser_worker', 'Browser Worker', 'approved browser surface', 'screenshots/evidence', 'approved automation later', 'нет', 'login/cookies/payments', 'future browser sandbox', 'critical'],
  ['system_worker', 'System Worker', 'system health metadata', 'approved system reports', 'approved safe commands later', 'нет', 'firewall/Defender/network/.env', 'future system sandbox', 'critical'],
  ['code_worker', 'Code Worker', 'selected repo files', 'repair workspace/diff only', 'tests after Approval', 'нет', 'push/deploy/secrets', 'repair workspace', 'high'],
  ['memory_worker', 'Memory Worker', 'accepted memory candidates', 'Memory records after preview', 'нет', 'destructive edit only Approval', 'secrets/raw noise', 'memory store/index', 'medium'],
  ['device_worker', 'Device Worker', 'trusted device status', 'device events', 'safe capabilities only', 'нет', 'pairing/settings/smart home without Approval', 'Device Mesh allowlist', 'high']
];

const PHASE4_WORKER_FOUNDATION = [
  ['eyes', 'Глаза', 'наблюдение', 'скриншоты, DOM, visual diff позже', 'только evidence, без автоконтроля браузера'],
  ['file_worker', 'File Worker', 'файлы', 'metadata, hash, task storage', 'без удаления, auto-run и auto-extract'],
  ['browser_worker', 'Browser Worker', 'браузер', 'future QA screenshots / DOM checks', 'нет логинов, cookies, payments без Approval'],
  ['code_worker', 'Code Worker', 'код', 'repair workspace, diff, tests', 'не пушит и не деплоит'],
  ['system_worker', 'System Worker', 'система', 'health/status later', 'нет firewall/Defender/network без critical Approval'],
  ['memory_worker', 'Memory Worker', 'память', 'Memory Preview / search index', 'не сохраняет raw noise и secrets'],
  ['device_worker', 'Device Worker', 'устройства', 'Device Mesh capabilities', 'не меняет pairing/settings без Approval']
];

const PHASE4_WORKER_ACTIONS = [
  {
    id: 'eyes_visual_snapshot',
    worker: 'Eyes',
    title: 'Визуальное наблюдение UI',
    mode: 'read_only',
    risk_level: 'safe',
    output: 'SCREENSHOT / VISUAL_CHECK evidence',
    status: 'ready_with_manual_capture',
    rule: 'Скриншот создаётся только как evidence; логины, cookies и платежи не трогаются.'
  },
  {
    id: 'eyes_dom_snapshot',
    worker: 'Eyes',
    title: 'DOM / layout snapshot',
    mode: 'read_only',
    risk_level: 'safe',
    output: 'CHECK_LOG',
    status: 'ready',
    rule: 'Читает только видимую структуру UI и overflow-состояние.'
  },
  {
    id: 'file_worker_metadata',
    worker: 'Hands / File Worker',
    title: 'Файловая metadata',
    mode: 'read_only',
    risk_level: 'review',
    output: 'FILE_METADATA report',
    status: 'approval_gate',
    rule: 'Только allowlist-пути на D; .env/secrets/archives skipped.'
  },
  {
    id: 'code_worker_repair_diff',
    worker: 'Hands / Code Worker',
    title: 'Repair diff',
    mode: 'isolated_workspace',
    risk_level: 'approval_required',
    output: 'DIFF_REVIEW',
    status: 'blocked_until_verifier',
    rule: 'Пишет только в repair workspace; apply в active project запрещён до Verifier/Approval.'
  },
  {
    id: 'browser_worker_qa',
    worker: 'Hands / Browser Worker',
    title: 'Browser QA action',
    mode: 'guarded_future',
    risk_level: 'approval_required',
    output: 'QA_EVIDENCE',
    status: 'blocked_for_phase4',
    rule: 'Нет автологина, cookies, платежей, account actions и hidden browser control.'
  },
  {
    id: 'system_worker_health',
    worker: 'Hands / System Worker',
    title: 'System health',
    mode: 'read_only',
    risk_level: 'review',
    output: 'DIAGNOSTIC_REPORT',
    status: 'safe_checks_only',
    rule: 'Разрешены только health/status; firewall/Defender/network запрещены.'
  }
];

const FIRST_RUN_SAFETY_CHECKS = [
  ['storage', 'D:\\TerminatorStorage', 'обязательное хранилище тяжёлых данных'],
  ['local_agent', 'Local Agent', 'локальный исполнитель и future repair helper'],
  ['direct_bridge', 'Direct Bridge', 'мост между сайтом и ПК'],
  ['task_store', 'TaskStore', 'общее хранилище задач и статусов'],
  ['guardian', 'Guardian', 'защитник опасных действий'],
  ['codex_repair', 'Codex Repair Operator', 'ремонт через Codex в изоляции'],
  ['verifier', 'Verifier', 'проверка результата перед принятием'],
  ['cost_guard', 'Cost Guard', 'защита от платных сервисов'],
  ['head', 'Голова / Стратег', 'настройка мозгов и профилей'],
  ['restore_point', 'Первый restore point', 'точка восстановления перед крупными изменениями']
];

const SERVICE_INVENTORY_CATALOG = [
  ['webapp_mina_ui', 'WebApp Mina UI', 'hosting', 'active', 'главный интерфейс владельца', 'none', false, false, 'medium', 'проверять live URL и cache marker'],
  ['github_pages', 'GitHub Pages', 'hosting', 'active', 'публикация сайта', 'github', false, false, 'medium', 'health check после каждого deploy'],
  ['github_repository', 'GitHub repository', 'source_control', 'active', 'кодовая база и история изменений', 'github', false, false, 'high', 'push main только осознанно'],
  ['github_actions', 'GitHub Actions', 'deployment', 'controlled', 'публикация WebApp и smoke-проверки', 'github_secrets', false, true, 'review', 'следить за workflow и лимитами'],
  ['cloudflare_worker', 'Cloudflare Worker / Direct Bridge', 'bridge', 'active', 'мост между WebApp и локальным контуром', 'owner_session', true, true, 'high', 'не менять route/secrets без отдельного решения'],
  ['cloudflare_durable_object', 'Cloudflare Durable Object', 'state_sync', 'active', 'очередь команд и состояние задач', 'worker_binding', true, false, 'high', 'не смешивать команды и задачи'],
  ['local_agent', 'Local Agent', 'local_runtime', 'active', 'локальный исполнитель и связь с ПК', 'local_config', true, false, 'high', 'опасные действия только через Approval'],
  ['windows_task_scheduler', 'Windows Task Scheduler', 'local_runtime', 'active', 'автозапуск локального агента', 'windows_user', false, false, 'review', 'проверять single-instance и LastTaskResult'],
  ['terminator_storage_d', 'D:\\TerminatorStorage', 'storage', 'active', 'тяжёлые файлы, evidence, backups и restore points', 'local_owner', true, false, 'medium', 'не хранить тяжёлое на C'],
  ['official_ai_web_chats', 'Official AI web chats', 'external_brain', 'manual_external', 'мозги через ручной web-chat без API', 'owner_login_manual', true, false, 'review', 'пароли/cookies не хранить'],
  ['pwa_browser', 'PWA / Browser', 'client', 'future_ready', 'мобильный и desktop контейнер интерфейса', 'browser_session', true, false, 'medium', 'no heavy files in localStorage'],
  ['telegram_bot', 'Telegram bot', 'legacy', 'legacy', 'старый интерфейс MVP', 'legacy_secret', true, true, 'high', 'не развивать как main path'],
  ['n8n', 'n8n', 'legacy_automation', 'legacy', 'старые webhooks/automation', 'legacy_secret', true, true, 'high', 'не возвращать как ядро'],
  ['amvera', 'Amvera', 'legacy_hosting', 'legacy', 'старый hosting/runtime', 'account', true, true, 'review', 'не развивать без отдельного решения'],
  ['pm2_brain_workers', 'PM2 brain workers', 'legacy_runtime', 'audit_later', 'старые brain workers', 'local_process', true, true, 'high', 'audit later, не строить Phase 3+ на них'],
  ['windows_tray_app', 'Windows Tray App', 'future_client', 'future', 'будущий desktop companion', 'local_owner', true, false, 'review', 'после стабильного WebApp/PWA'],
  ['local_search_engine', 'Local Search Engine', 'future_memory', 'future_ready', 'локальный поиск по памяти и проектам', 'local_owner', true, false, 'medium', 'только без AI API по умолчанию'],
  ['voice_engine', 'Voice Engine', 'future_voice', 'future', 'локальное/браузерное распознавание речи', 'owner_permission', true, false, 'review', 'без фонового hotword в ранних фазах'],
  ['browser_automation_runtime', 'Browser Automation Runtime', 'future_hands', 'future_blocked', 'будущие глаза/руки браузера', 'approval', true, true, 'critical', 'только после Guardian/Approval/Evidence']
];

const DEPENDENCY_REGISTRY_CATALOG = [
  ['browser', 'Браузер / Chrome', 'WebApp UI, PWA, live smoke', 'открыть сайт и проверить marker', 'text fallback / local static smoke', 'medium'],
  ['nodejs', 'Node.js', 'syntax checks, local server, test scripts', 'node --check app.js', 'ручной browser smoke без Node ограничен', 'medium'],
  ['git', 'Git', 'source control, commits, rollback diff', 'git status / git log', 'ручной file backup на D', 'high'],
  ['github', 'GitHub', 'repository, Actions, Pages', 'gh run list / Pages health', 'локальный режим без publish', 'high'],
  ['cloudflare_worker', 'Cloudflare Worker', 'Direct Bridge transport', '/health, commands next', 'local-only Task Runtime', 'high'],
  ['local_agent_runtime', 'Local Agent Runtime', 'локальный исполнитель и future workers', 'System / Local Agent status', 'browser-only safe mode', 'high'],
  ['task_scheduler', 'Windows Task Scheduler', 'autostart Local Agent', 'LastTaskResult / single-instance', 'ручной запуск агента', 'review'],
  ['terminator_storage_d', 'D:\\TerminatorStorage', 'files/evidence/backups/restore points', 'проверить путь и screenshots', 'lightweight browser metadata only', 'high'],
  ['indexeddb', 'IndexedDB', 'локальная база задач и metadata', 'Task Runtime статус', 'localStorage fallback', 'medium'],
  ['service_worker', 'Service Worker', 'PWA/offline shell', 'service worker marker', 'online-only browser mode', 'medium'],
  ['github_actions_secrets', 'GitHub Actions secrets', 'controlled deploy secrets', 'GitHub settings без вывода значений', 'manual local deploy prohibited', 'critical'],
  ['future_sqlite_fts', 'SQLite FTS', 'future fast memory search', 'not active', 'current keyword index', 'review'],
  ['future_local_stt', 'Local STT', 'future Mina Voice', 'not active', 'text input / push-to-talk later', 'review']
];

const SYSTEM_REGISTRY_STATUS_LABELS = {
  active: 'активен',
  controlled: 'контролируемый',
  manual_external: 'ручной внешний',
  future_ready: 'готовность',
  future: 'будущее',
  future_blocked: 'будущее / заблокировано',
  legacy: 'legacy',
  audit_later: 'аудит позже',
  ready: 'готово',
  review: 'требует проверки',
  blocked: 'заблокировано',
  unknown: 'неизвестно'
};

const POLICY_CENTER_SCHEMA_VERSION = 1;
const POLICY_CENTER_STATUS_LABELS = {
  ready: 'готово',
  review: 'требует проверки',
  blocked: 'заблокировано',
  not_checked: 'не проверено'
};

const POLICY_CENTER_SELECTS = {
  'owner.language': [
    ['ru-RU', 'Русский'],
    ['en-US', 'English later']
  ],
  'owner.theme': [
    ['mina_dark', 'Mina UI тёмная'],
    ['mina_high_contrast', 'Высокий контраст']
  ],
  'owner.mobile_mode': [
    ['responsive', 'Адаптивный режим'],
    ['pwa_first', 'PWA приоритет']
  ],
  'security.privacy_guard_level': [
    ['strict', 'Строгий'],
    ['balanced', 'Сбалансированный'],
    ['manual', 'Только ручная проверка']
  ],
  'security.approval_strictness': [
    ['high', 'Высокая'],
    ['standard', 'Стандартная'],
    ['low', 'Низкая, не рекомендуется']
  ],
  'security.dangerous_actions': [
    ['blocked', 'Блокировать до подтверждения'],
    ['approval_required', 'Только через подтверждение'],
    ['manual_review', 'Ручная проверка']
  ],
  'security.ai_api_policy': [
    ['disabled', 'Отключены'],
    ['approval_only', 'Только после отдельного подтверждения']
  ],
  'runtime.default_context_pack_size': [
    ['standard', 'Стандартный'],
    ['short', 'Короткий'],
    ['expert', 'Экспертный']
  ],
  'runtime.diagnostics_frequency': [
    ['manual_plus_health', 'Ручной запуск + проверка здоровья'],
    ['manual_only', 'Только вручную']
  ],
  'runtime.backup_policy': [
    ['checkpoint_before_risk', 'Контрольная копия перед риском'],
    ['manual_only', 'Только вручную']
  ],
  'runtime.release_channel': [
    ['live_pages_controlled', 'Публикация сайта под контролем'],
    ['local_only', 'Только локально']
  ],
  'project_defaults.memory_policy': [
    ['preview_required', 'Только через предпросмотр памяти'],
    ['manual_only', 'Только вручную']
  ],
  'project_defaults.verifier_strictness': [
    ['evidence_required', 'Доказательства обязательны'],
    ['standard', 'Стандартно']
  ],
  'project_defaults.research_depth': [
    ['standard', 'Стандартное исследование'],
    ['maximum', 'Максимальное исследование'],
    ['fast', 'Быстро']
  ],
  'task_defaults.quality': [
    ['maximum', 'Максимум'],
    ['standard', 'Стандарт'],
    ['fast', 'Быстро']
  ],
  'task_defaults.memory_save_scope': [
    ['verified_only', 'Только проверенное'],
    ['decision_only', 'Только решения'],
    ['manual_only', 'Только вручную']
  ]
};

const MINA_SCHEME_SUBSYSTEMS = [
  {
    id: 'head',
    display: 'Голова / Мозги',
    short: 'Голова',
    side: 'left',
    icon: '◎',
    anchor: { x: 50, y: 17 },
    card: { x: 5, y: 15 },
    description: 'Стратег, Совет мозгов, исследователи и поисковики.',
    required_for_comfort: true,
    required_for_full: true
  },
  {
    id: 'eyes',
    display: 'Глаза',
    short: 'Глаза',
    side: 'left',
    icon: '◉',
    anchor: { x: 49, y: 24 },
    card: { x: 5, y: 31 },
    description: 'Наблюдение, скриншоты, визуальные доказательства и проверка интерфейса.',
    required_for_full: true
  },
  {
    id: 'voice',
    display: 'Голос',
    short: 'Голос',
    side: 'left',
    icon: '≋',
    anchor: { x: 50, y: 29 },
    card: { x: 5, y: 47 },
    description: 'Нажать и говорить, текст речи, предпросмотр намерения и безопасные голосовые команды.',
    required_for_full: true
  },
  {
    id: 'hands',
    display: 'Руки',
    short: 'Руки',
    side: 'left',
    icon: '✦',
    anchor: { x: 38, y: 62 },
    card: { x: 5, y: 71 },
    description: 'Ремонт через Codex, рабочая область ремонта и будущие помощники под защитником.',
    required_for_comfort: true,
    required_for_full: true
  },
  {
    id: 'memory',
    display: 'Память',
    short: 'Память',
    side: 'right',
    icon: '▣',
    anchor: { x: 61, y: 35 },
    card: { x: 73, y: 26 },
    description: 'Memory Preview, записи решений, поиск и индекс контекста.',
    required_for_comfort: true,
    required_for_full: true
  },
  {
    id: 'body',
    display: 'Тело',
    short: 'Тело',
    side: 'right',
    icon: '◆',
    anchor: { x: 60, y: 51 },
    card: { x: 73, y: 43 },
    description: 'Контур задач, маршрутизация, локальный агент, мост и подтверждения.',
    required_for_minimum: true,
    required_for_full: true
  },
  {
    id: 'legs',
    display: 'Ноги',
    short: 'Ноги',
    side: 'right',
    icon: '⌁',
    anchor: { x: 52, y: 75 },
    card: { x: 73, y: 59 },
    description: 'Связь устройств, маршруты, передача задачи, непрерывность и перенос контекста.',
    required_for_full: true
  },
  {
    id: 'diagnost',
    display: 'Диагност',
    short: 'Диагност',
    side: 'right',
    icon: '◇',
    anchor: { x: 57, y: 62 },
    card: { x: 73, y: 75 },
    description: 'Защитник, безопасный режим, инциденты, платные риски и восстановление.',
    required_for_minimum: true,
    required_for_full: true
  }
];

const MINA_SCHEME_STATUS_LABELS = {
  ready: 'готово',
  partial: 'частично',
  waiting: 'не настроено',
  error: 'ошибка',
  active: 'выбрано'
};

const DEVICE_TYPES = {
  windows_pc: 'ПК Windows',
  webapp: 'WebApp Mina UI',
  pwa_shell: 'PWA / мобильный вход',
  windows_companion: 'Windows-компаньон',
  local_agent: 'Local Agent',
  android_phone: 'Android телефон',
  mission_display: 'Экран штаба',
  smart_home_hub: 'Умный дом',
  usb_bus: 'USB устройства',
  network_allowlist: 'Сетевые устройства'
};

const DEVICE_TRUST_LEVELS = {
  unknown: 'неизвестно',
  paired: 'известное',
  trusted: 'доверенное',
  owner_device: 'устройство владельца',
  system_device: 'системное',
  restricted: 'ограничено',
  blocked: 'заблокировано'
};

const DEVICE_STATUSES = {
  unknown: 'не проверено',
  discovered: 'обнаружено',
  pending_trust: 'ждёт доверия',
  trusted: 'доверено',
  connected: 'на связи',
  ready: 'готово',
  degraded: 'ограничено',
  offline: 'не подключено',
  blocked: 'заблокировано',
  archived: 'в архиве',
  not_configured: 'не настроено'
};

const DEVICE_RISK_LEVELS = {
  safe: 'безопасно',
  review: 'нужна проверка',
  approval_required: 'требуется подтверждение',
  dangerous: 'опасно',
  blocked: 'заблокировано'
};

const VOICE_STATES = {
  idle: 'готово',
  listening: 'слушаю',
  transcribing: 'обрабатываю',
  preview_waiting: 'нужно подтверждение',
  approval_required: 'требуется подтверждение',
  completed: 'выполнено',
  cancelled: 'отменено',
  stopped: 'остановлено',
  failed: 'ошибка',
  permission_denied: 'микрофон недоступен',
  browser_not_supported: 'не поддерживается'
};

const VOICE_INTENT_LABELS = {
  create_task: 'Создать задачу',
  add_note: 'Добавить уточнение',
  open_workspace: 'Открыть Рабочее',
  open_mission_control: 'Открыть Центр управления',
  open_system: 'Открыть Систему',
  create_context_pack: 'Сформировать пакет для Codex',
  mark_sent_to_executor: 'Отметить пакет отправленным',
  open_verifier: 'Открыть проверку',
  show_memory_preview: 'Показать память',
  show_next_best_action: 'Что дальше',
  show_voice_status: 'Статус голоса',
  open_device_mesh: 'Открыть Ноги / Устройства',
  stop_listening: 'Остановить голос',
  help: 'Подсказка',
  dangerous_command: 'Опасная команда',
  unknown: 'Не распознано'
};

const VOICE_CONFIDENCE_LABELS = {
  high: 'высокая',
  medium: 'средняя',
  low: 'низкая',
  manual: 'ручная'
};

const VOICE_DANGEROUS_PATTERN = /\b(?:удали|delete|remove|деплой|deploy|push|main|force|\.env|secret|token|api\s*key|network|vpn|proxy|firewall|defender|route|hosts|format|wipe|reset|kill|password|cookie|session|cloudflare)\b/i;

const PWA_INSTALL_STATUS_LABELS = {
  installed: 'установлено',
  installable: 'можно установить',
  browser_only: 'браузерный режим',
  unsupported: 'не поддерживается'
};

const WINDOWS_COMPANION_SCRIPT_ROOT = '$env:USERPROFILE\\Desktop\\терминатор - DeepSeek_files\\council\\webapp\\tools\\windows-companion';
const WINDOWS_COMPANION_SELF_TEST_COMMAND = `powershell -NoProfile -ExecutionPolicy Bypass -File "${WINDOWS_COMPANION_SCRIPT_ROOT}\\mina-windows-companion.ps1" -SelfTest`;
const WINDOWS_COMPANION_SELF_TEST_REPORT_COMMAND = `powershell -NoProfile -ExecutionPolicy Bypass -File "${WINDOWS_COMPANION_SCRIPT_ROOT}\\mina-windows-companion.ps1" -SelfTest -WriteReport`;
const WINDOWS_COMPANION_TRAY_COMMAND = `powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "${WINDOWS_COMPANION_SCRIPT_ROOT}\\mina-windows-companion.ps1" -Tray`;
const WINDOWS_COMPANION_INSTALL_DRY_RUN_COMMAND = `powershell -NoProfile -ExecutionPolicy Bypass -File "${WINDOWS_COMPANION_SCRIPT_ROOT}\\install-mina-windows-companion.ps1" -DryRun`;
const WINDOWS_COMPANION_INSTALL_START_MENU_COMMAND = `powershell -NoProfile -ExecutionPolicy Bypass -File "${WINDOWS_COMPANION_SCRIPT_ROOT}\\install-mina-windows-companion.ps1" -CreateStartMenuShortcut`;

const WINDOWS_COMPANION_CONTRACT = [
  ['Статус Local Agent', 'только чтение', 'Показывать online/offline и last seen без запуска опасных команд.'],
  ['Tray shell', 'готовится локально', 'Открыть WebApp / Схему Мины / Диагност из системного меню Windows.'],
  ['Installer readiness', 'dry-run first', 'Установка сначала проверяется без изменения системы.'],
  ['Start Menu shortcut', 'рекомендуется', 'Безопасный вход через меню Пуск без автозапуска tray.'],
  ['Тихая автозагрузка', 'обязательно', 'Автозапуск должен идти через hidden launcher без видимого node/powershell окна.'],
  ['Legacy PM2', 'выключено', 'PM2/n8n/Gemini/DeepSeek legacy не должен подниматься при входе в Windows.'],
  ['Window hygiene', 'обязательно', 'После перезагрузки не должно оставаться лишних видимых окон Терминатора.'],
  ['Безопасный рестарт агента', 'approval', 'Restart только через Guardian и подтверждение владельца.'],
  ['Логи и health', 'read-only', 'Показать путь к логам, storage root и последние incidents.'],
  ['Голос из tray', 'future', 'Только после зрелого Mina Voice и явного privacy indicator.']
];

const VERIFIER_CHECKLIST = [
  { id: 'matches_task', label: 'отчет соответствует задаче', critical: false },
  { id: 'changed_files', label: 'есть список измененных файлов', critical: false },
  { id: 'evidence_archive', label: 'есть evidence или архив', critical: true },
  { id: 'checks_passed', label: 'указаны пройденные проверки', critical: true },
  { id: 'unchecked_listed', label: 'указано, что не проверено', critical: false },
  { id: 'risks_listed', label: 'указаны риски', critical: false },
  { id: 'no_ai_api', label: 'подтверждено, что AI API не использовались', critical: true, rejectIfMissing: true },
  { id: 'no_bridge_agent_changes', label: 'подтверждено, что Direct Bridge / Local Agent не менялись', critical: true, rejectIfMissing: true },
  { id: 'no_env_secrets', label: 'подтверждено, что .env и секреты не добавлены', critical: true, rejectIfMissing: true },
  { id: 'personal_not_developed', label: 'подтверждено, что Личное не развивалось', critical: false },
  { id: 'no_mojibake', label: 'нет кракозябр в русском тексте', critical: false },
  { id: 'no_click_zone_only', label: 'UI/код не использует click-zone-only подход', critical: false },
  { id: 'result_archive_path', label: 'есть архив или путь к результату', critical: true },
  { id: 'first_check', label: 'есть что проверить первым', critical: true },
  { id: 'acceptance_decision_ready', label: 'понятно принять или вернуть на доработку', critical: true },
  { id: 'memory_ready', label: 'понятно, что сохранять в память', critical: false }
];

const VERIFIER_VERDICTS = {
  PASS: { name: 'принять', status: 'executor_report_received' },
  PASS_WITH_RISKS: { name: 'принять с рисками', status: 'executor_report_received' },
  NEEDS_FIX: { name: 'вернуть на доработку', status: 'needs_fix' },
  REJECT: { name: 'отклонить', status: 'rejected' },
  MANUAL_REVIEW: { name: 'нужна ручная проверка', status: 'manual_required' }
};

const WORK_FILE_ROLES = [
  { id: 'attachment', name: 'Обычный файл' },
  { id: 'spec', name: 'ТЗ / требования' },
  { id: 'evidence', name: 'Evidence' },
  { id: 'verifier_input', name: 'Для проверки' },
  { id: 'research_source', name: 'Для исследования' },
  { id: 'executor_package', name: 'Для пакета Codex' },
  { id: 'memory_candidate', name: 'Для памяти' },
  { id: 'result_archive', name: 'Результат исполнителя' }
];

const WORK_FILE_ROLE_BY_ID = Object.fromEntries(WORK_FILE_ROLES.map((role) => [role.id, role]));
const WORKSPACE_TABS = new Set(['files', 'artifacts', 'research', 'council', 'eyes', 'hands', 'handoff', 'check', 'memory']);
const RESEARCH_SOURCE_TYPES = [
  ['official_docs', 'Официальная документация'],
  ['github', 'GitHub / код'],
  ['youtube', 'YouTube / видео'],
  ['reddit', 'Reddit / обсуждения'],
  ['forum', 'Форум / сообщество'],
  ['4pda', '4PDA'],
  ['xda', 'XDA'],
  ['stackoverflow', 'StackOverflow'],
  ['news', 'Новости'],
  ['papers', 'Papers / академические'],
  ['product_review', 'Обзор продукта'],
  ['manual_note', 'Ручная заметка']
];
const RESEARCH_SOURCE_TYPE_BY_ID = Object.fromEntries(RESEARCH_SOURCE_TYPES);
const RESEARCH_TRUST_LEVELS = [
  ['high', 'высокий'],
  ['medium', 'средний'],
  ['low', 'низкий'],
  ['unknown', 'неизвестно']
];
const RESEARCH_TRUST_LEVEL_BY_ID = Object.fromEntries(RESEARCH_TRUST_LEVELS);
const TEXT_PREVIEW_EXTENSIONS = new Set(['txt', 'md', 'json', 'log', 'js', 'ts', 'py', 'html', 'css', 'yaml', 'yml', 'xml', 'sql', 'mjs', 'cjs']);
const IMAGE_PREVIEW_EXTENSIONS = new Set(['png', 'jpg', 'jpeg', 'webp', 'gif']);
const ARCHIVE_EXTENSIONS = new Set(['zip', '7z', 'rar']);
const MEDIA_EXTENSIONS = new Set(['mp4', 'mov', 'mkv', 'webm', 'mp3', 'wav', 'm4a']);
const PRIVACY_GUARD_RULES = [
  { id: 'env_file', label: '.env / env mention', severity: 'review', pattern: /\.env(?:\.local|\.production)?/i },
  { id: 'api_key', label: 'API key marker', severity: 'danger', pattern: /\b[A-Z0-9_]*(?:API[_-]?KEY|OPENAI[_-]?KEY|GEMINI[_-]?KEY|DEEPSEEK[_-]?KEY|QWEN[_-]?KEY)\b/i },
  { id: 'token', label: 'token marker', severity: 'danger', pattern: /\b(?:TOKEN|ACCESS_TOKEN|REFRESH_TOKEN|BOT_TOKEN|PRIVATE_TOKEN)\b/i },
  { id: 'secret', label: 'secret marker', severity: 'danger', pattern: /\b(?:SECRET|CLIENT_SECRET|WEBHOOK_SECRET)\b/i },
  { id: 'password', label: 'password marker', severity: 'danger', pattern: /\b(?:PASSWORD|PASSWD|PWD)\b/i },
  { id: 'bearer', label: 'Bearer token', severity: 'danger', pattern: /Authorization\s*:\s*Bearer|Bearer\s+[A-Za-z0-9._~+/=-]{12,}/i },
  { id: 'openai_like', label: 'sk-like key', severity: 'danger', pattern: /\bsk-[A-Za-z0-9_-]{10,}\b/i },
  { id: 'google_like', label: 'AIza-like key', severity: 'danger', pattern: /\bAIza[A-Za-z0-9_-]{10,}\b/i },
  { id: 'github_pat', label: 'GitHub token', severity: 'danger', pattern: /\bgh[pousr]_[A-Za-z0-9_]{10,}\b/i },
  { id: 'webhook', label: 'webhook URL/secret', severity: 'review', pattern: /\bwebhook\b|https?:\/\/[^\s]+webhook[^\s]*/i },
  { id: 'cookie_session', label: 'cookie/session marker', severity: 'danger', pattern: /\b(?:cookie|session|sessionid|connect.sid)\b/i },
  { id: 'private_key', label: 'private key block', severity: 'danger', pattern: /BEGIN\s+(?:RSA\s+|OPENSSH\s+|EC\s+)?PRIVATE\s+KEY/i }
];
const DANGEROUS_COMMAND_PATTERN = /деплой|удали|delete|remove|\.env|secret|api key|network|vpn|proxy|cloudflare|push|main/i;

const APPROVAL_STATUSES = {
  manual_required: 'требует решения',
  pending: 'ожидает',
  plan_prepared: 'план подготовлен',
  denied: 'отклонено',
  cancelled: 'отменено',
  expired: 'истекло'
};

const APPROVAL_RISK_LEVELS = {
  review: 'нужна проверка',
  approval_required: 'требуется подтверждение',
  dangerous: 'опасно',
  blocked: 'заблокировано'
};

const WEBAPP_TRANSPORT_MODE = 'auto'; // telegram | direct | auto
const WEBAPP_TRANSPORT_MODES = new Set(['telegram', 'direct', 'auto']);
const DEFAULT_DIRECT_BRIDGE_URL = 'https://mina-direct-bridge.glebik2807.workers.dev';
const TERMINATOR_DEFAULT_AGENT_ID = 'Terminator-PC';
const TERMINATOR_LOCAL_AGENT_ID = TERMINATOR_DEFAULT_AGENT_ID;
const OWNED_DEVICE_REGISTRY_SCHEMA_VERSION = 1;
const OWNED_AGENT_HEARTBEAT_EVENT_MIN_MS = 15 * 60 * 1000;
const TERMINATOR_STORAGE_ROOT = 'D:\\TerminatorStorage';
const TERMINATOR_LAST_CHECKPOINT = {
  name: 'Phase 25 Pre-QAMAX Release Candidate Gate V1',
  date: '2026-05-28',
  status: 'в работе',
  previous: 'Phase 24 Windows-компаньон / установленный пользовательский слой V1',
  next: 'Остановиться перед финальным QAMAX'
};
const TERMINATOR_PHASE_STEPS = [
  { id: 1, name: 'Product Core Reset + Task Runtime V1', status: 'закрыт' },
  { id: 2, name: 'Workspace Production Binding', status: 'закрыт' },
  { id: 3, name: 'Mission Control + System Basic', status: 'закрыт' },
  { id: 4, name: 'Diagnost / Self-Healing Basic', status: 'закрыт' },
  { id: 5, name: 'Verifier / Privacy / Evidence V2', status: 'закрыт' },
  { id: 6, name: 'Files + Storage Foundation на D', status: 'закрыт' },
  { id: 7, name: 'System Extensions: Device Mesh + Mina Voice Hooks', status: 'закрыт' },
  { id: 8, name: 'BrainOps / Council UI-Assisted Foundation', status: 'закрыт' },
  { id: 9, name: 'Phase 1 QA Max + Live Acceptance', status: 'закрыт' },
  { id: 10, name: 'Remove Personal Legacy + Phase 2 Local Runtime Storage Foundation', status: 'закрыт' },
  { id: 11, name: 'Local Agent File Storage Runtime V1', status: 'закрыт' },
  { id: 12, name: 'Verifier Runtime Read-only V1', status: 'закрыт' },
  { id: 13, name: 'Memory Runtime V1 на D', status: 'закрыт' },
  { id: 14, name: 'Restore Points + Storage Diagnostics', status: 'закрыт' },
  { id: 15, name: 'Phase 2 Local Runtime Acceptance', status: 'закрыт локально' },
  { id: 16, name: 'Bridge TaskStore + EventLog backend', status: 'закрыт live' },
  { id: 17, name: 'Голова: Стратег и Совет мозгов', status: 'закрыт локально' },
  { id: 18, name: 'WebApp TaskStore sync binding', status: 'закрыт live' },
  { id: 19, name: 'Local Agent task status sync', status: 'закрыт' },
  { id: 20, name: 'Phase 2 Full Runtime Live Acceptance', status: 'закрыт live' },
  { id: 21, name: 'ResearchOps + Brain Council Runtime V1', status: 'закрыт локально' },
  { id: 22, name: 'Guardian + Eyes + Hands + Codex Repair Foundation', status: 'закрыт локально' },
  { id: 23, name: 'Схема Мины / Visual System Center', status: 'закрыт live' },
  { id: 24, name: 'Mobile / PWA / APK Foundation', status: 'закрыт live' },
  { id: 25, name: 'Production Hardening + Release Quality', status: 'закрыт live' },
  { id: 26, name: 'Windows Companion + Installer Foundation', status: 'закрыт live' },
  { id: 27, name: 'Memory Search Engine / Context Index V1', status: 'закрыт live' },
  { id: 28, name: 'Schema Versioning + Backup/Restore + Migration Safety', status: 'закрыт live' },
  { id: 29, name: 'Service Inventory + Dependency Registry + Capability Matrix', status: 'закрыт live' },
  { id: 30, name: 'Settings / Policy Center V1 + Phase 6 Closure', status: 'закрыт live' },
  { id: 31, name: 'Device Mesh / Ноги Control Center V1', status: 'закрыт live' },
  { id: 32, name: 'Mina Voice / Safe Command Layer V1', status: 'закрыт live' },
  { id: 33, name: 'Eyes / Visual Evidence V1', status: 'закрыт локально' },
  { id: 34, name: 'Hands / Safe Workers V1', status: 'закрыт локально' },
  { id: 35, name: 'Controlled Worker Runtime V1', status: 'закрыт локально' },
  { id: 36, name: 'Integration Hardening V1', status: 'закрыт локально' },
  { id: 37, name: 'Live Runtime Binding V1', status: 'закрыт локально' },
  { id: 38, name: 'Real Health Endpoints + Agent Heartbeat V1', status: 'закрыт live' },
  { id: 39, name: 'Controlled Bridge Rollout + Live Heartbeat Acceptance V1', status: 'закрыт live' },
  { id: 40, name: 'Owned Device / Agent Registry V1', status: 'закрыт live' },
  { id: 41, name: 'Phone / PWA Pairing + Multi-Device Presence V1', status: 'закрыт live' },
  { id: 42, name: 'Handoff / Route Planner V1', status: 'закрыт live' },
  { id: 43, name: 'Continuity / Offline Recovery / Task Teleport V1', status: 'закрыт live' },
  { id: 44, name: 'Controlled Apply Pipeline / Verifier Gate V1', status: 'закрыт live' },
  { id: 45, name: 'Единый источник истины / снимок состояния V1', status: 'закрыт live' },
  { id: 46, name: 'Windows-компаньон / тихая автозагрузка V1', status: 'закрыт live' },
  { id: 47, name: 'Windows-компаньон / установленный пользовательский слой V1', status: 'закрыт live' },
  { id: 48, name: 'Pre-QAMAX Release Candidate Gate V1', status: 'в работе' }
];
const DIRECT_BRIDGE_NAMES = [
  'TerminatorCommandBridge',
  'TerminatorDirectBridge',
  'MinaCommandBridge'
];
const DIRECT_STATUS_POLL_INTERVAL_MS = 1500;
const DIRECT_STATUS_POLL_TIMEOUT_MS = 240000;
const DIRECT_REQUEST_TIMEOUT_MS = 30000;
const DIRECT_REQUEST_RETRY_ATTEMPTS = 3;
const DIRECT_REQUEST_RETRY_BASE_DELAY_MS = 700;
const DIRECT_FINAL_STATUSES = new Set(['completed', 'failed', 'manual_required']);
const DIRECT_RETRYABLE_HTTP_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);
const DIRECT_BRIDGE_FRAME_PATH = '/bridge-frame';
const DIRECT_BRIDGE_FRAME_READY_TIMEOUT_MS = 12000;
const DIRECT_BRIDGE_FRAME_SOURCE = 'mina-bridge-frame';
const DIRECT_BRIDGE_RPC_SOURCE = 'mina-webapp-bridge-rpc';
const directBridgeFrameTransports = new Map();
const directBridgePopupTransports = new Map();
const TASK_STORE_SYNC_DEBOUNCE_MS = 1800;
const TASK_STORE_SYNC_MAX_TASKS = 100;
const DIRECT_SESSION_LEGACY_STORAGE_KEY = 'mina_direct_owner_session';
const DIRECT_SESSION_TOKEN_KEY = 'minaOwnerSessionToken';
const DIRECT_SESSION_EXPIRES_KEY = 'minaOwnerSessionExpiresAt';
const DIRECT_SESSION_BRIDGE_KEY = 'minaOwnerSessionBridgeUrl';
const DIRECT_SESSION_EXPIRY_SKEW_MS = 5000;
const DIRECT_SESSION_FALLBACK_TTL_MS = 6 * 60 * 60 * 1000;
const OWNER_SESSION_EXPIRED_MESSAGE = 'Сессия владельца истекла. Войдите снова.';
const OWNER_SESSION_REQUIRED_MESSAGE = 'Доступ владельца не активен. В разделе Система нажмите "Синхронизировать задачи" и введите пароль.';
const ANYDESK_INSTALL_URL = 'https://play.google.com/store/apps/details?id=com.anydesk.anydeskandroid';

function normalizeTransportMode(mode) {
  const normalized = String(mode || '').trim().toLowerCase();
  return WEBAPP_TRANSPORT_MODES.has(normalized) ? normalized : WEBAPP_TRANSPORT_MODE;
}

function getWebAppTransportMode() {
  const queryMode = new URLSearchParams(window.location.search).get('transport');
  return normalizeTransportMode(window.WEBAPP_TRANSPORT_MODE || queryMode || WEBAPP_TRANSPORT_MODE);
}

function getTelegramTransport() {
  const tg = window.Telegram?.WebApp || null;
  return tg?.sendData ? tg : null;
}

function getDirectTransport() {
  for (const name of DIRECT_BRIDGE_NAMES) {
    const bridge = window[name];
    if (!bridge) continue;

    if (typeof bridge === 'function') {
      return { send: bridge, getStatus: null };
    }

    let send = null;
    if (typeof bridge.sendTerminatorAction === 'function') {
      send = bridge.sendTerminatorAction.bind(bridge);
    } else if (typeof bridge.send === 'function') {
      send = bridge.send.bind(bridge);
    }

    if (!send) continue;

    const getStatus = bridge.getCommandStatus || bridge.getStatus || bridge.status;
    return {
      send,
      getStatus: typeof getStatus === 'function' ? getStatus.bind(bridge) : null
    };
  }

  return createConfiguredDirectBridge();
}

function getConfiguredDirectBridgeBaseUrl() {
  const config = getDirectBridgeConfig();
  return config?.baseUrl ? config.baseUrl.replace(/\/+$/, '') : '';
}

function hasStoredOwnerSession(baseUrl) {
  return Boolean(getStoredOwnerSession(baseUrl)?.token);
}

async function directTaskStoreRequest(route, options = {}) {
  const baseUrl = getConfiguredDirectBridgeBaseUrl();
  if (!baseUrl) {
    return { ok: false, reason: 'bridge_unconfigured', message: 'Direct Bridge не настроен' };
  }

  const token = options.token || (options.interactive
    ? await ensureOwnerSession(baseUrl, { interactive: true })
    : getStoredOwnerSession(baseUrl)?.token);

  if (!token) {
    return { ok: false, reason: 'owner_session_required', message: OWNER_SESSION_REQUIRED_MESSAGE };
  }

  return directBridgeRequest(baseUrl, route, {
    method: options.method || 'GET',
    token,
    body: options.body,
    idempotent: options.idempotent !== false,
    allowPopup: false,
    preferFrame: true,
    timeoutMs: options.timeoutMs || DIRECT_REQUEST_TIMEOUT_MS
  });
}

function isConfiguredDirectModeActive() {
  const mode = getWebAppTransportMode();
  if (mode === 'telegram') return false;
  if (!getConfiguredDirectBridgeBaseUrl()) return false;
  if (mode === 'direct') return true;
  return !getTelegramTransport();
}

async function getDirectCommandStatus(commandId) {
  const directTransport = getDirectTransport();
  if (!directTransport?.getStatus) return null;
  return directTransport.getStatus(commandId);
}

function createConfiguredDirectBridge() {
  const baseUrl = getConfiguredDirectBridgeBaseUrl();
  if (!baseUrl) return null;

  return {
    async send(payload) {
      const token = await ensureOwnerSession(baseUrl);
      if (!token) {
        return { ok: false, reason: 'owner_session_required', message: OWNER_SESSION_REQUIRED_MESSAGE };
      }

      const commandPayload = {
        ...payload,
        client_command_id: payload.client_command_id || createClientCommandId()
      };

      return directBridgeRequest(baseUrl, '/commands', {
        method: 'POST',
        token,
        body: commandPayload,
        idempotent: true
      });
    },

    async getStatus(commandId) {
      const token = getStoredOwnerSession(baseUrl)?.token;
      if (!token) return null;

      return directBridgeRequest(baseUrl, `/commands/${encodeURIComponent(commandId)}/status`, {
        method: 'GET',
        token
      });
    }
  };
}

function getDirectBridgeConfig() {
  const query = new URLSearchParams(window.location.search);
  const config = window.MINA_DIRECT_BRIDGE || window.MINA_DIRECT_BRIDGE_CONFIG || {};
  const baseUrl = window.MINA_DIRECT_BRIDGE_URL
    || config.baseUrl
    || config.bridgeUrl
    || query.get('direct_bridge')
    || DEFAULT_DIRECT_BRIDGE_URL;

  return {
    baseUrl: String(baseUrl || '').trim()
  };
}

async function ensureOwnerSession(baseUrl, options = {}) {
  if (!options.forceRefresh) {
    const stored = getStoredOwnerSession(baseUrl);
    if (stored?.token) return stored.token;
  }

  if (!options.interactive) return null;

  clearStoredOwnerSession();
  return createOwnerSession(baseUrl);
}

async function createOwnerSession(baseUrl) {
  const token = await getOwnerSessionToken(baseUrl);
  if (token) showAppToast('Доступ владельца активен');
  return token;
}

async function getOwnerSessionToken(baseUrl) {
  const stored = getStoredOwnerSession(baseUrl);
  if (stored?.token) return stored.token;

  const secret = await requestOwnerSecret();
  if (!secret) return null;

  const session = await directBridgeRequest(baseUrl, '/owner/session', {
    method: 'POST',
    body: { secret },
    skipAuth: true,
    idempotent: false,
    allowPopup: false,
    preferPopup: false,
    preferFrame: true,
    timeoutMs: 10000
  });

  const token = session?.session_token || session?.token;
  if (!token) throw new Error('Owner session token missing');

  storeOwnerSession(baseUrl, {
    token,
    expiresAt: resolveOwnerSessionExpiresAt(session)
  });

  return token;
}

async function requestOwnerSecret() {
  if (typeof window.requestTerminatorOwnerSecret === 'function') {
    return window.requestTerminatorOwnerSecret();
  }

  return showOwnerLoginModal();
}

function resolveOwnerSessionExpiresAt(session) {
  const explicitExpiresAt = session?.expires_at || session?.expiresAt;
  if (explicitExpiresAt && !Number.isNaN(Date.parse(explicitExpiresAt))) {
    return new Date(Date.parse(explicitExpiresAt)).toISOString();
  }

  const ttlSeconds = Number(session?.expires_in ?? session?.expiresIn ?? session?.ttl);
  const ttlMs = Number.isFinite(ttlSeconds) && ttlSeconds > 0
    ? ttlSeconds * 1000
    : DIRECT_SESSION_FALLBACK_TTL_MS;

  return new Date(Date.now() + ttlMs).toISOString();
}

function getStoredOwnerSession(baseUrl) {
  try {
    const token = window.sessionStorage?.getItem(DIRECT_SESSION_TOKEN_KEY);
    const expiresAt = window.sessionStorage?.getItem(DIRECT_SESSION_EXPIRES_KEY);
    const sessionBaseUrl = window.sessionStorage?.getItem(DIRECT_SESSION_BRIDGE_KEY);

    if (token || expiresAt || sessionBaseUrl) {
      if (sessionBaseUrl !== baseUrl) return null;
      if (!token || !expiresAt || Date.parse(expiresAt) - DIRECT_SESSION_EXPIRY_SKEW_MS <= Date.now()) {
        clearStoredOwnerSession();
        return null;
      }

      return { baseUrl, token, expiresAt };
    }

    const legacyRaw = window.sessionStorage?.getItem(DIRECT_SESSION_LEGACY_STORAGE_KEY);
    if (!legacyRaw) return null;

    const legacySession = JSON.parse(legacyRaw);
    if (legacySession.baseUrl !== baseUrl) return null;
    if (!legacySession.token || Date.parse(legacySession.expiresAt) - DIRECT_SESSION_EXPIRY_SKEW_MS <= Date.now()) {
      clearStoredOwnerSession();
      return null;
    }

    storeOwnerSession(baseUrl, legacySession);
    return legacySession;
  } catch {
    return null;
  }
}

function storeOwnerSession(baseUrl, session) {
  try {
    window.sessionStorage?.setItem(DIRECT_SESSION_TOKEN_KEY, session.token);
    window.sessionStorage?.setItem(DIRECT_SESSION_EXPIRES_KEY, session.expiresAt);
    window.sessionStorage?.setItem(DIRECT_SESSION_BRIDGE_KEY, baseUrl);
    window.sessionStorage?.removeItem(DIRECT_SESSION_LEGACY_STORAGE_KEY);
  } catch {
    // Session storage is optional. If unavailable, the user will be asked again.
  }
}

function clearStoredOwnerSession() {
  try {
    window.sessionStorage?.removeItem(DIRECT_SESSION_TOKEN_KEY);
    window.sessionStorage?.removeItem(DIRECT_SESSION_EXPIRES_KEY);
    window.sessionStorage?.removeItem(DIRECT_SESSION_BRIDGE_KEY);
    window.sessionStorage?.removeItem(DIRECT_SESSION_LEGACY_STORAGE_KEY);
  } catch {}
}

function logoutOwnerSession() {
  clearStoredOwnerSession();
  showAppToast('Сессия владельца завершена');
}

function showOwnerSessionExpired() {
  clearStoredOwnerSession();
  showAppToast(OWNER_SESSION_EXPIRED_MESSAGE, 3600);
}

function loadTaskStoreSyncState() {
  try {
    const raw = window.localStorage?.getItem(TASK_STORE_SYNC_STATE_KEY);
    if (!raw) return {};
    const state = JSON.parse(raw);
    return {
      status: String(state.status || ''),
      lastSyncAt: String(state.lastSyncAt || ''),
      error: String(state.error || ''),
      taskCount: Number.isFinite(Number(state.taskCount)) ? Number(state.taskCount) : null,
      updatedAt: String(state.updatedAt || '')
    };
  } catch {
    return {};
  }
}

function storeTaskStoreSyncState(state) {
  try {
    window.localStorage?.setItem(TASK_STORE_SYNC_STATE_KEY, JSON.stringify({
      status: state.status || 'not_connected',
      lastSyncAt: state.lastSyncAt || '',
      error: state.error || '',
      taskCount: Number.isFinite(Number(state.taskCount)) ? Number(state.taskCount) : null,
      updatedAt: state.updatedAt || new Date().toISOString()
    }));
  } catch {}
}

function getOwnerSessionErrorMessage(error) {
  const code = String(error?.data?.error || error?.message || '').toUpperCase();
  if (error?.status === 401 || code.includes('OWNER_AUTH_FAILED')) {
    return 'Пароль владельца не принят. Проверьте раскладку клавиатуры и введите пароль ещё раз.';
  }
  if (code.includes('OWNER_SECRET_NOT_CONFIGURED')) {
    return 'На мосте не настроен пароль владельца. Нужна настройка секрета в Cloudflare.';
  }
  if (error?.name === 'AbortError') {
    return 'Мост не ответил вовремя. Попробуйте синхронизировать задачи ещё раз.';
  }
  return 'Не удалось открыть доступ владельца. Проверьте соединение с Direct Bridge.';
}

function showAppToast(message, duration = 2600) {
  if (!message) return;
  if (window.MinaApp?.toast) {
    window.MinaApp.toast(message, duration);
    return;
  }

  const toast = document.getElementById('toast');
  if (!toast) return;

  window.clearTimeout(showAppToast.timer);
  toast.textContent = message;
  toast.classList.add('visible');
  showAppToast.timer = window.setTimeout(() => {
    toast.classList.remove('visible');
  }, duration);
}

function showOwnerLoginModal() {
  return new Promise((resolve) => {
    const existing = document.getElementById('owner-session-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'owner-session-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'owner-session-title');
    overlay.style.cssText = [
      'position:fixed',
      'inset:0',
      'z-index:9999',
      'display:grid',
      'place-items:center',
      'background:rgba(0,8,18,.78)',
      'backdrop-filter:blur(6px)'
    ].join(';');

    const panel = document.createElement('form');
    panel.style.cssText = [
      'width:min(420px,calc(100vw - 40px))',
      'padding:24px',
      'border:1px solid rgba(62,181,255,.82)',
      'background:linear-gradient(180deg,rgba(2,16,34,.96),rgba(0,6,16,.98))',
      'box-shadow:0 0 34px rgba(0,132,255,.45), inset 0 0 28px rgba(0,132,255,.14)',
      'color:#eaf7ff',
      'font:inherit'
    ].join(';');

    const title = document.createElement('h2');
    title.id = 'owner-session-title';
    title.textContent = 'Доступ владельца';
    title.style.cssText = 'margin:0 0 10px;font-size:24px;letter-spacing:0;color:#ffffff';

    const text = document.createElement('p');
    text.textContent = 'Введите пароль Мины для управления Терминатором';
    text.style.cssText = 'margin:0 0 18px;color:#9ec9ff;line-height:1.45';

    const input = document.createElement('input');
    input.type = 'password';
    input.autocomplete = 'current-password';
    input.required = true;
    input.style.cssText = [
      'width:100%',
      'box-sizing:border-box',
      'height:48px',
      'padding:0 14px',
      'border:1px solid rgba(62,181,255,.68)',
      'background:rgba(0,20,42,.78)',
      'color:#ffffff',
      'outline:none',
      'font:inherit'
    ].join(';');

    const revealLabel = document.createElement('label');
    revealLabel.style.cssText = [
      'display:flex',
      'align-items:center',
      'gap:10px',
      'margin-top:12px',
      'color:#cfe8ff',
      'font-size:14px',
      'line-height:1.3',
      'user-select:none',
      'cursor:pointer'
    ].join(';');

    const reveal = document.createElement('input');
    reveal.type = 'checkbox';
    reveal.style.cssText = [
      'width:18px',
      'height:18px',
      'accent-color:#38d8ff',
      'cursor:pointer'
    ].join(';');

    const revealText = document.createElement('span');
    revealText.textContent = 'Показать пароль';
    reveal.addEventListener('change', () => {
      input.type = reveal.checked ? 'text' : 'password';
      input.focus();
    });
    revealLabel.append(reveal, revealText);

    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:12px;justify-content:flex-end;margin-top:18px';

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.textContent = 'Отмена';
    cancel.style.cssText = [
      'min-width:104px',
      'height:42px',
      'border:1px solid rgba(144,186,224,.42)',
      'background:rgba(7,22,42,.72)',
      'color:#cfe8ff',
      'font:inherit',
      'cursor:pointer'
    ].join(';');

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Войти';
    submit.style.cssText = [
      'min-width:104px',
      'height:42px',
      'border:1px solid rgba(80,220,255,.95)',
      'background:linear-gradient(180deg,rgba(0,122,255,.9),rgba(0,64,150,.92))',
      'color:#ffffff',
      'font:inherit',
      'cursor:pointer',
      'box-shadow:0 0 18px rgba(0,140,255,.55)'
    ].join(';');

    const finish = (value) => {
      const secret = value || '';
      input.value = '';
      overlay.remove();
      document.removeEventListener('keydown', handleKeydown);
      resolve(secret);
    };

    const handleKeydown = (event) => {
      if (event.key === 'Escape') finish('');
    };

    cancel.addEventListener('click', () => finish(''));
    panel.addEventListener('submit', (event) => {
      event.preventDefault();
      finish(input.value);
    });
    document.addEventListener('keydown', handleKeydown);

    actions.append(cancel, submit);
    panel.append(title, text, input, revealLabel, actions);
    overlay.append(panel);
    document.body.append(overlay);
    window.setTimeout(() => input.focus(), 0);
  });
}

async function directBridgeRequest(baseUrl, route, options = {}) {
  const attempts = shouldRetryDirectRequest(options)
    ? DIRECT_REQUEST_RETRY_ATTEMPTS
    : 1;
  let lastError = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await directBridgeRequestOnce(baseUrl, route, options);
    } catch (error) {
      lastError = error;
      if (attempt >= attempts || !isRetryableDirectError(error)) break;
      await delay(Math.min(DIRECT_REQUEST_RETRY_BASE_DELAY_MS * attempt, 3000));
    }
  }

  throw lastError;
}

async function directBridgeRequestOnce(baseUrl, route, options = {}) {
  const headers = buildDirectBridgeHeaders(options);
  if (options.preferPopup && options.allowPopup) {
    try {
      const popupResponse = await directBridgePopupRequest(baseUrl, route, options);
      return parseDirectBridgeResponse(popupResponse, options);
    } catch (error) {
      error.retryable = true;
    } finally {
      closeDirectBridgePopupTransport(baseUrl);
    }
  }

  const shouldPreferFrame = options.preferFrame
    && shouldUseDirectBridgeFrame(baseUrl, options)
    && new URL(baseUrl).origin !== window.location.origin;

  if (shouldPreferFrame) {
    try {
      const frameResponse = await directBridgeFrameRequest(baseUrl, route, options);
      return parseDirectBridgeResponse(frameResponse, options);
    } catch (error) {
      error.retryable = true;
    }
  }

  if (options.allowPopup) {
    try {
      const targetOrigin = new URL(baseUrl).origin;
      const transport = directBridgePopupTransports.get(targetOrigin);
      if (transport && !transport.popup.closed) {
        const popupResponse = await directBridgePopupRequest(baseUrl, route, options);
        return parseDirectBridgeResponse(popupResponse, options);
      }
    } catch {}
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs || DIRECT_REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(`${baseUrl}${route}`, {
      method: options.method || 'GET',
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: 'no-store',
      credentials: 'omit',
      mode: 'cors',
      signal: controller.signal
    });
  } catch (error) {
    error.retryable = true;
    if (options.allowPopup) {
      try {
        const popupResponse = await directBridgePopupRequest(baseUrl, route, options);
        return parseDirectBridgeResponse(popupResponse, options);
      } catch {}
    }
    if (shouldUseDirectBridgeFrame(baseUrl, options)) {
      const frameResponse = await directBridgeFrameRequest(baseUrl, route, options);
      return parseDirectBridgeResponse(frameResponse, options);
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }

  return parseDirectBridgeResponse({
    status: response.status,
    ok: response.ok,
    text: await response.text()
  }, options);
}

function buildDirectBridgeHeaders(options = {}, requestId = createClientCommandId()) {
  const headers = { 'content-type': 'application/json' };
  headers['x-request-id'] = requestId;
  if (options.token && !options.skipAuth) {
    headers.authorization = `Bearer ${options.token}`;
  }
  return headers;
}

function shouldUseDirectBridgeFrame(baseUrl, options = {}) {
  if (options.frameTransport === false) return false;
  if (!baseUrl || !window.location?.origin) return false;
  try {
    const url = new URL(baseUrl);
    return window.location.protocol === 'https:' && url.protocol === 'https:' && url.hostname.endsWith('.workers.dev');
  } catch {
    return false;
  }
}

async function directBridgeFrameRequest(baseUrl, route, options = {}) {
  const transport = await getDirectBridgeFrameTransport(baseUrl);
  const requestId = createClientCommandId();
  const timeoutMs = options.timeoutMs || DIRECT_REQUEST_TIMEOUT_MS;

  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      transport.pending.delete(requestId);
      const error = new Error('Bridge frame request timed out.');
      error.retryable = true;
      reject(error);
    }, timeoutMs + 1000);

    transport.pending.set(requestId, {
      resolve: (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      reject: (error) => {
        window.clearTimeout(timer);
        reject(error);
      }
    });

    transport.frame.contentWindow.postMessage({
      source: DIRECT_BRIDGE_RPC_SOURCE,
      requestId,
      method: options.method || 'GET',
      route,
      headers: buildDirectBridgeHeaders(options, requestId),
      body: options.body,
      timeoutMs
    }, transport.targetOrigin);
  });
}

async function getDirectBridgeFrameTransport(baseUrl) {
  const targetOrigin = new URL(baseUrl).origin;
  const existing = directBridgeFrameTransports.get(targetOrigin);
  if (existing) {
    await existing.ready;
    return existing;
  }

  const frame = document.createElement('iframe');
  frame.src = `${targetOrigin}${DIRECT_BRIDGE_FRAME_PATH}?v=1`;
  frame.title = 'Mina Direct Bridge';
  frame.hidden = true;
  frame.tabIndex = -1;
  frame.setAttribute('aria-hidden', 'true');
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin');
  frame.style.cssText = 'display:none;width:0;height:0;border:0;position:absolute;left:-9999px;';

  const transport = {
    frame,
    targetOrigin,
    pending: new Map(),
    ready: null
  };

  transport.ready = new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      cleanupDirectBridgeFrameTransport(targetOrigin);
      reject(new Error('Bridge frame did not become ready.'));
    }, DIRECT_BRIDGE_FRAME_READY_TIMEOUT_MS);

    const handleMessage = (event) => {
      if (event.origin !== targetOrigin) return;
      const message = event.data || {};
      if (message.source !== DIRECT_BRIDGE_FRAME_SOURCE) return;

      if (message.type === 'ready') {
        window.clearTimeout(timer);
        transport.handleMessage = handleMessage;
        resolve();
        return;
      }

      if (message.type === 'response' && message.requestId) {
        const pending = transport.pending.get(message.requestId);
        if (!pending) return;
        transport.pending.delete(message.requestId);
        if (message.ok) {
          pending.resolve({
            status: message.status,
            ok: message.status >= 200 && message.status < 300,
            text: message.text || ''
          });
        } else {
          const error = new Error(message.message || message.errorName || 'Bridge frame request failed.');
          error.retryable = true;
          pending.reject(error);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    frame.addEventListener('error', () => {
      window.clearTimeout(timer);
      window.removeEventListener('message', handleMessage);
      cleanupDirectBridgeFrameTransport(targetOrigin);
      reject(new Error('Bridge frame failed to load.'));
    }, { once: true });
  });

  directBridgeFrameTransports.set(targetOrigin, transport);
  document.body.append(frame);
  await transport.ready;
  return transport;
}

function prepareDirectBridgePopupTransport(baseUrl) {
  if (!baseUrl || !window.open) return null;
  const targetOrigin = new URL(baseUrl).origin;
  const existing = directBridgePopupTransports.get(targetOrigin);
  if (existing && !existing.popup.closed) return existing;

  const popupUrl = `${targetOrigin}${DIRECT_BRIDGE_FRAME_PATH}?mode=popup&v=1`;
  const popup = window.open('', 'mina-direct-bridge', 'popup=yes,width=420,height=260,left=40,top=40');
  if (!popup) return null;
  try {
    popup.location.href = popupUrl;
  } catch {
    popup.close();
    return null;
  }

  const transport = createDirectBridgeWindowTransport(targetOrigin, popup, () => {
    directBridgePopupTransports.delete(targetOrigin);
  });
  directBridgePopupTransports.set(targetOrigin, transport);
  try {
    popup.blur();
    window.focus();
  } catch {}
  return transport;
}

async function directBridgePopupRequest(baseUrl, route, options = {}) {
  const targetOrigin = new URL(baseUrl).origin;
  let transport = directBridgePopupTransports.get(targetOrigin);
  if (!transport || transport.popup.closed) {
    transport = prepareDirectBridgePopupTransport(baseUrl);
  }
  if (!transport) throw new Error('Bridge popup was blocked.');
  await transport.ready;
  return directBridgeWindowRequest(transport, route, options);
}

function createDirectBridgeWindowTransport(targetOrigin, popup, cleanup) {
  const transport = {
    popup,
    targetOrigin,
    pending: new Map(),
    ready: null,
    cleanup
  };

  transport.ready = new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      window.clearInterval(pingTimer);
      cleanup?.();
      reject(new Error('Bridge window did not become ready.'));
    }, DIRECT_BRIDGE_FRAME_READY_TIMEOUT_MS);

    const postPing = () => {
      try {
        popup.postMessage({ source: DIRECT_BRIDGE_RPC_SOURCE, type: 'ping' }, targetOrigin);
      } catch {}
    };
    const pingTimer = window.setInterval(postPing, 250);
    postPing();

    const handleMessage = (event) => {
      if (event.origin !== targetOrigin) return;
      const message = event.data || {};
      if (message.source !== DIRECT_BRIDGE_FRAME_SOURCE) return;

      if (message.type === 'ready') {
        window.clearTimeout(timer);
        window.clearInterval(pingTimer);
        transport.handleMessage = handleMessage;
        resolve();
        return;
      }

      if (message.type === 'response' && message.requestId) {
        const pending = transport.pending.get(message.requestId);
        if (!pending) return;
        transport.pending.delete(message.requestId);
        if (message.ok) {
          pending.resolve({
            status: message.status,
            ok: message.status >= 200 && message.status < 300,
            text: message.text || ''
          });
        } else {
          const error = new Error(message.message || message.errorName || 'Bridge window request failed.');
          error.retryable = true;
          pending.reject(error);
        }
      }
    };

    window.addEventListener('message', handleMessage);
  });

  return transport;
}

async function directBridgeWindowRequest(transport, route, options = {}) {
  const requestId = createClientCommandId();
  const timeoutMs = options.timeoutMs || DIRECT_REQUEST_TIMEOUT_MS;

  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      transport.pending.delete(requestId);
      const error = new Error('Bridge window request timed out.');
      error.retryable = true;
      reject(error);
    }, timeoutMs + 1000);

    transport.pending.set(requestId, {
      resolve: (value) => {
        window.clearTimeout(timer);
        resolve(value);
      },
      reject: (error) => {
        window.clearTimeout(timer);
        reject(error);
      }
    });

    transport.popup.postMessage({
      source: DIRECT_BRIDGE_RPC_SOURCE,
      requestId,
      method: options.method || 'GET',
      route,
      headers: buildDirectBridgeHeaders(options, requestId),
      body: options.body,
      timeoutMs
    }, transport.targetOrigin);
  });
}

function closeDirectBridgePopupTransport(baseUrl) {
  try {
    const targetOrigin = new URL(baseUrl).origin;
    const transport = directBridgePopupTransports.get(targetOrigin);
    if (!transport) return;
    if (transport.handleMessage) {
      window.removeEventListener('message', transport.handleMessage);
    }
    transport.pending.forEach((pending) => pending.reject(new Error('Bridge popup transport closed.')));
    transport.pending.clear();
    if (transport.popup && !transport.popup.closed) transport.popup.close();
    directBridgePopupTransports.delete(targetOrigin);
  } catch {}
}

function cleanupDirectBridgeFrameTransport(targetOrigin) {
  const transport = directBridgeFrameTransports.get(targetOrigin);
  if (!transport) return;
  if (transport.handleMessage) {
    window.removeEventListener('message', transport.handleMessage);
  }
  transport.pending.forEach((pending) => pending.reject(new Error('Bridge frame transport closed.')));
  transport.pending.clear();
  transport.frame.remove();
  directBridgeFrameTransports.delete(targetOrigin);
}

function parseDirectBridgeResponse(response, options = {}) {
  const text = response.text || '';
  const data = text ? JSON.parse(text) : null;

  if (response.status === 401 && !options.skipAuth) {
    showOwnerSessionExpired();
  }

  if (!response.ok || data?.ok === false) {
    const error = new Error(data?.message || data?.error || `HTTP_${response.status}`);
    error.status = response.status;
    error.data = data;
    error.retryable = DIRECT_RETRYABLE_HTTP_STATUSES.has(response.status);
    throw error;
  }

  return data;
}

function shouldRetryDirectRequest(options) {
  const method = String(options.method || 'GET').toUpperCase();
  if (method === 'GET') return true;
  if (options.skipAuth) return options.idempotent === true;
  return options.idempotent === true;
}

function isRetryableDirectError(error) {
  if (error?.status === 401 || error?.status === 403) return false;
  if (error?.retryable === true) return true;
  if (error?.status) return DIRECT_RETRYABLE_HTTP_STATUSES.has(error.status);

  const name = String(error?.name || '');
  const message = String(error?.message || '').toLowerCase();
  return name === 'AbortError'
    || message.includes('fetch')
    || message.includes('network')
    || message.includes('timeout')
    || message.includes('aborted');
}

function createClientCommandId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

async function sendTerminatorAction(payload) {
  const mode = getWebAppTransportMode();
  const tg = getTelegramTransport();

  if ((mode === 'telegram' || mode === 'auto') && tg) {
    try {
      tg.sendData(JSON.stringify(payload));
      return { ok: true, transport: 'telegram', message: 'Команда отправлена в Telegram' };
    } catch (error) {
      console.error('[MinaWebApp] Telegram sendData failed', error);
      return { ok: false, transport: 'telegram', message: 'Не удалось отправить команду в Telegram' };
    }
  }

  if (mode === 'telegram') {
    return {
      ok: false,
      transport: 'telegram',
      reason: 'telegram_unavailable',
      message: 'Команда доступна при запуске из Telegram'
    };
  }

  const directTransport = getDirectTransport();
  if (!directTransport) {
    console.log('[MinaWebApp] direct transport not configured', payload);
    return {
      ok: false,
      transport: 'direct',
      reason: 'direct_unconfigured',
      message: 'Прямое управление ещё не подключено'
    };
  }

  try {
    const response = await directTransport.send(payload);
    if (response?.ok === false) {
      return {
        ok: false,
        transport: 'direct',
        reason: response.reason || 'direct_rejected',
        message: response.message || 'Не удалось отправить прямую команду'
      };
    }

    const commandId = response?.command_id || response?.commandId || response?.id || null;
    return {
      ok: true,
      transport: 'direct',
      commandId,
      canTrackStatus: !!directTransport.getStatus,
      status: response?.status || (commandId ? 'queued' : null),
      message: commandId ? 'Команда отправлена' : 'Команда отправлена напрямую'
    };
  } catch (error) {
    console.error('[MinaWebApp] Direct transport failed', error);
    return {
      ok: false,
      transport: 'direct',
      message: error.status === 401 ? OWNER_SESSION_EXPIRED_MESSAGE : 'Не удалось отправить прямую команду'
    };
  }
}

window.sendTerminatorAction = sendTerminatorAction;
window.logoutOwnerSession = logoutOwnerSession;

function indexedDbRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('IndexedDB request failed'));
  });
}

function indexedDbTransactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error('IndexedDB transaction failed'));
    transaction.onabort = () => reject(transaction.error || new Error('IndexedDB transaction aborted'));
  });
}

function openTaskRuntimeDatabase() {
  if (!window.indexedDB) return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(WORK_RUNTIME_DB_NAME, WORK_RUNTIME_DB_VERSION);
    let settled = false;
    const finish = (ok, value) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(openTimeout);
      ok ? resolve(value) : reject(value);
    };
    const openTimeout = window.setTimeout(() => {
      console.warn('[MinaWebApp] Task Runtime IndexedDB open timed out, using fallback');
      finish(true, null);
    }, 5000);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.META)) {
        db.createObjectStore(TASK_RUNTIME_STORES.META, { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.PROJECTS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.PROJECTS, { keyPath: 'project_id' });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('updated_at', 'updated_at', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.TASKS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.TASKS, { keyPath: 'task_id' });
        store.createIndex('project_id', 'project_id', { unique: false });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('updated_at', 'updated_at', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.EVENTS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.EVENTS, { keyPath: 'event_id' });
        store.createIndex('task_id', 'task_id', { unique: false });
        store.createIndex('project_id', 'project_id', { unique: false });
        store.createIndex('created_at', 'created_at', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.MESSAGES)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.MESSAGES, { keyPath: 'message_id' });
        store.createIndex('task_id', 'task_id', { unique: false });
        store.createIndex('created_at', 'created_at', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.ARTIFACTS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.ARTIFACTS, { keyPath: 'artifact_id' });
        store.createIndex('task_id', 'task_id', { unique: false });
        store.createIndex('type', 'type', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.FILES)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.FILES, { keyPath: 'file_id' });
        store.createIndex('task_id', 'task_id', { unique: false });
        store.createIndex('role', 'role', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.APPROVALS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.APPROVALS, { keyPath: 'approval_id' });
        store.createIndex('task_id', 'task_id', { unique: false });
        store.createIndex('status', 'status', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.MEMORY)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.MEMORY, { keyPath: 'memory_id' });
        store.createIndex('task_id', 'task_id', { unique: false });
        store.createIndex('status', 'status', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.DEVICES)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.DEVICES, { keyPath: 'device_id' });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('trust_level', 'trust_level', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.DEVICE_CAPABILITIES)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.DEVICE_CAPABILITIES, { keyPath: 'capability_id' });
        store.createIndex('device_id', 'device_id', { unique: false });
        store.createIndex('risk_level', 'risk_level', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.DEVICE_EVENTS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.DEVICE_EVENTS, { keyPath: 'event_id' });
        store.createIndex('device_id', 'device_id', { unique: false });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('created_at', 'created_at', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.DIAGNOSTICS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.DIAGNOSTICS, { keyPath: 'diagnostic_id' });
        store.createIndex('created_at', 'created_at', { unique: false });
        store.createIndex('status', 'status', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.INCIDENTS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.INCIDENTS, { keyPath: 'incident_id' });
        store.createIndex('created_at', 'created_at', { unique: false });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('severity', 'severity', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.GUARDIAN_EVENTS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.GUARDIAN_EVENTS, { keyPath: 'event_id' });
        store.createIndex('created_at', 'created_at', { unique: false });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('incident_id', 'incident_id', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.GUARDIAN_WORKER_REPORTS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.GUARDIAN_WORKER_REPORTS, { keyPath: 'report_id' });
        store.createIndex('created_at', 'created_at', { unique: false });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('risk_level', 'risk_level', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.HEAD_BRAINS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.HEAD_BRAINS, { keyPath: 'brain_id' });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('enabled', 'enabled', { unique: false });
        store.createIndex('order', 'order', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.HEAD_PROFILES)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.HEAD_PROFILES, { keyPath: 'profile_id' });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('is_default', 'is_default', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.HEAD_SEARCH_AGENTS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.HEAD_SEARCH_AGENTS, { keyPath: 'agent_id' });
        store.createIndex('enabled', 'enabled', { unique: false });
        store.createIndex('source_type', 'source_type', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.HEAD_EVENTS)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.HEAD_EVENTS, { keyPath: 'event_id' });
        store.createIndex('created_at', 'created_at', { unique: false });
        store.createIndex('type', 'type', { unique: false });
      }
      if (!db.objectStoreNames.contains(TASK_RUNTIME_STORES.MEMORY_INDEX)) {
        const store = db.createObjectStore(TASK_RUNTIME_STORES.MEMORY_INDEX, { keyPath: 'record_id' });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('task_id', 'task_id', { unique: false });
        store.createIndex('project_id', 'project_id', { unique: false });
        store.createIndex('updated_at', 'updated_at', { unique: false });
      }
    };

    request.onblocked = () => {
      console.warn('[MinaWebApp] Task Runtime IndexedDB upgrade blocked, using fallback');
      finish(true, null);
    };
    request.onsuccess = () => {
      if (settled) {
        try { request.result?.close?.(); } catch {}
        return;
      }
      finish(true, request.result);
    };
    request.onerror = () => finish(false, request.error || new Error('IndexedDB open failed'));
  });
}

const INITIAL_TASK_STORE_SYNC_STATE = loadTaskStoreSyncState();

const App = {
  current: 'start',
  selectedModel: 'chatgpt',
  taskRuntimeDb: null,
  taskRuntimeReady: false,
  taskRuntimeFallback: false,
  taskStoreSyncStatus: INITIAL_TASK_STORE_SYNC_STATE.status || 'not_connected',
  taskStoreLastSyncAt: INITIAL_TASK_STORE_SYNC_STATE.lastSyncAt || '',
  taskStoreSyncError: INITIAL_TASK_STORE_SYNC_STATE.error || '',
  taskStoreLastTaskCount: INITIAL_TASK_STORE_SYNC_STATE.taskCount,
  taskStoreSyncRunning: false,
  taskStoreSyncTimer: null,
  workProjects: [],
  workTasks: [],
  systemDevices: [],
  headBrains: [],
  headProfiles: [],
  headSearchAgents: [],
  headEvents: [],
  approvalRecords: [],
  systemDiagnostics: [],
  guardianState: null,
  guardianIncidents: [],
  guardianWorkerReports: [],
  activeDeviceId: '',
  activeHeadBrainId: '',
  activeHeadProfileId: '',
  activeApprovalId: '',
  activeDiagnosticId: '',
  activeIncidentId: '',
  activeMinaSchemeZone: 'body',
  minaSchemeMode: 'normal',
  minaSchemeExpertOpen: false,
  minaSchemeDismissedHints: [],
  diagnosticRunning: false,
  activeWorkTaskId: '',
  workPreview: null,
  workExpertOpen: false,
  workspaceActiveTab: 'files',
  workspacePendingCopyText: '',
  workspaceVoiceState: 'idle',
  workspaceVoiceTranscript: '',
  workspaceVoicePreview: null,
  workspaceVoiceRecognition: null,
  workspaceVoiceSupported: false,
  workspaceVoiceOpen: false,
  voiceSettings: null,
  voiceEventLog: [],
  voiceResponsesEnabled: true,
  voiceTtsSupported: false,
  pwaInstallPrompt: null,
  pwaInstallAvailable: false,
  pwaInstalled: false,
  pwaServiceWorkerStatus: 'not_checked',
  pwaServiceWorkerScope: '',
  pwaDisplayMode: 'browser',
  pwaLastCheckedAt: '',
  productionReleaseState: null,
  preQamaxGateState: null,
  backupRestoreState: null,
  observabilityState: null,
  windowsCompanionState: null,
  memorySearchState: null,
  eyesVisualState: null,
  schemaSafetyState: null,
  systemRegistryState: null,
  policyCenterState: null,
  liveRuntimeState: null,
  publicRuntimeHealth: null,
  liveRuntimeChecking: false,
  devicePairingState: null,
  continuityState: null,
  activeContinuityCheckpointId: '',
  activeTeleportPackageId: '',
  workspaceFileRuntime: new Map(),
  handsSafeState: null,
  activeHandsPlanId: '',
  controlledWorkerRuntimeState: null,
  activeControlledRunId: '',
  controlledApplyPipelineState: null,
  activeApplyPackageId: '',
  sourceOfTruthState: null,
  workspaceTimer: null,
  runtimeSavePromise: null,
  toastTimer: null,
  commandPollTimer: null,
  tg: null,
  order: ['start', 'menu', 'work', 'mission', 'system', 'scheme'],
  anydesk: {
    id: '',
    status: 'не проверен',
    deepLink: '',
    checked: false,
    error: ''
  },

  async init() {
    window.MinaApp = this;
    this.tg = window.Telegram?.WebApp || null;
    this.initTelegram();
    this.bindEvents();
    this.loadVoiceSettings();
    this.loadVoiceEvents();
    this.initVoiceSupport();
    this.initPwaRuntime();
    await this.initTaskRuntime();
    await this.loadWorkProjects();
    await this.loadWorkTasks();
    await this.loadSystemDevices();
    this.loadDevicePairingState();
    await this.syncDevicePresenceState({ silent: true });
    await this.loadHeadRuntime();
    await this.loadApprovalRecords();
    await this.loadSystemDiagnostics();
    await this.loadGuardianRuntime();
    this.loadProductionState();
    this.loadLiveRuntimeState();
    this.loadWindowsCompanionState();
    await this.loadMemorySearchState();
    this.loadEyesVisualState();
    this.loadHandsSafeState();
    this.loadControlledWorkerRuntimeState();
    this.loadControlledApplyPipelineState();
    this.loadSourceOfTruthState();
    this.loadContinuityState();
    this.bindContinuityRuntime();
    this.loadMinaSchemeState();
    this.attachVerifierPanel();
    this.renderWorkFormOptions();
    this.renderProjectRuntimePanel();
    this.renderWorkTaskCard();
    this.renderMissionControl();
    this.renderSystemStatus();
    this.renderBrain();
    this.renderAnyDeskAccess();
    this.startWorkspaceTimer();
    this.go(this.initialScreenFromUrl(), { immediate: true });
    this.retryTelegramInit();
    this.startBackgroundTaskStoreSync('init');
  },

  initialScreenFromUrl() {
    const params = new URLSearchParams(window.location.search || '');
    const requested = `${params.get('screen') || ''} ${params.get('force') || ''} ${window.location.hash || ''}`.toLowerCase();
    if (requested.includes('scheme')) return 'scheme';
    if (requested.includes('system')) return 'system';
    if (requested.includes('mission')) return 'mission';
    if (requested.includes('work')) return 'work';
    if (requested.includes('menu')) return 'menu';
    return 'start';
  },

  initTelegram() {
    if (!this.tg) return;

    this.tg.ready();
    this.tg.expand();
    this.tg.setHeaderColor('#020710');
    this.tg.setBackgroundColor('#020710');

    if (this.tg.BackButton) {
      this.tg.BackButton.onClick(() => this.handleBack());
    }
  },

  retryTelegramInit() {
    if (this.tg) return;

    window.setTimeout(() => {
      if (this.tg || !window.Telegram?.WebApp) return;
      this.tg = window.Telegram.WebApp;
      this.initTelegram();
      this.updateTelegramControls();
    }, 500);
  },

  bindEvents() {
    document.addEventListener('click', (event) => {
      const navButton = event.target.closest('[data-nav]');
      if (navButton) {
        this.go(navButton.dataset.nav);
        return;
      }

      const closeButton = event.target.closest('[data-close]');
      if (closeButton) {
        this.closeOrFallback();
        return;
      }

      const toastButton = event.target.closest('[data-toast]');
      if (toastButton) {
        this.toast(toastButton.dataset.toast);
        return;
      }

      const modelButton = event.target.closest('[data-model]');
      if (modelButton) {
        this.selectModel(modelButton.dataset.model);
        return;
      }

      const workPreviewButton = event.target.closest('[data-work-preview]');
      if (workPreviewButton) {
        this.handleWorkPreviewAction(workPreviewButton.dataset.workPreview);
        return;
      }

      const workActionButton = event.target.closest('[data-work-action]');
      if (workActionButton) {
        this.handleWorkTaskAction(workActionButton.dataset.workAction);
        return;
      }

      const verifierButton = event.target.closest('[data-verifier-action]');
      if (verifierButton) {
        this.handleVerifierAction(verifierButton.dataset.verifierAction);
        return;
      }

      const workspaceTabButton = event.target.closest('[data-workspace-tab]');
      if (workspaceTabButton) {
        this.switchWorkspaceTab(workspaceTabButton.dataset.workspaceTab);
        return;
      }

      const workspaceActionButton = event.target.closest('[data-workspace-action]');
      if (workspaceActionButton) {
        this.handleWorkspaceAction(workspaceActionButton.dataset.workspaceAction, workspaceActionButton);
        return;
      }

      const voiceActionButton = event.target.closest('[data-voice-action]');
      if (voiceActionButton) {
        this.handleVoiceAction(voiceActionButton.dataset.voiceAction);
        return;
      }

      const voiceSettingButton = event.target.closest('[data-voice-setting]');
      if (voiceSettingButton) {
        this.handleVoiceSetting(voiceSettingButton.dataset.voiceSetting, voiceSettingButton);
        return;
      }

      const pwaActionButton = event.target.closest('[data-pwa-action]');
      if (pwaActionButton) {
        this.handlePwaAction(pwaActionButton.dataset.pwaAction);
        return;
      }

      const companionActionButton = event.target.closest('[data-companion-action]');
      if (companionActionButton) {
        this.handleCompanionAction(companionActionButton.dataset.companionAction, companionActionButton);
        return;
      }

      const memorySearchButton = event.target.closest('[data-memory-search-action]');
      if (memorySearchButton) {
        this.handleMemorySearchAction(memorySearchButton.dataset.memorySearchAction, memorySearchButton);
        return;
      }

      const eyesButton = event.target.closest('[data-eyes-action]');
      if (eyesButton) {
        this.handleEyesVisualAction(eyesButton.dataset.eyesAction, eyesButton);
        return;
      }

      const handsButton = event.target.closest('[data-hands-action]');
      if (handsButton) {
        this.handleHandsAction(handsButton.dataset.handsAction, handsButton);
        return;
      }

      const phase6ActionButton = event.target.closest('[data-phase6-action]');
      if (phase6ActionButton) {
        this.handlePhase6Action(phase6ActionButton.dataset.phase6Action, phase6ActionButton);
        return;
      }

      const fileActionButton = event.target.closest('[data-file-action]');
      if (fileActionButton) {
        this.handleWorkspaceFileAction(fileActionButton.dataset.fileAction, fileActionButton.dataset.fileId);
        return;
      }

      const artifactButton = event.target.closest('[data-artifact-action]');
      if (artifactButton) {
        this.handleWorkspaceArtifactAction(artifactButton.dataset.artifactAction, artifactButton.dataset.artifactId);
        return;
      }

      const privacyButton = event.target.closest('[data-privacy-action]');
      if (privacyButton) {
        this.handlePrivacyAction(privacyButton.dataset.privacyAction);
        return;
      }

      const approvalButton = event.target.closest('[data-approval-action]');
      if (approvalButton) {
        this.handleApprovalAction(approvalButton.dataset.approvalAction);
        return;
      }

      const workShortcutButton = event.target.closest('[data-work-shortcut]');
      if (workShortcutButton) {
        this.handleWorkShortcut(workShortcutButton.dataset.workShortcut);
        return;
      }

      const projectActionButton = event.target.closest('[data-project-action]');
      if (projectActionButton) {
        this.handleProjectAction(projectActionButton.dataset.projectAction);
        return;
      }

      const missionActionButton = event.target.closest('[data-mission-action]');
      if (missionActionButton) {
        this.handleMissionAction(missionActionButton.dataset.missionAction, missionActionButton);
        return;
      }

      const deviceActionButton = event.target.closest('[data-device-action]');
      if (deviceActionButton) {
        this.handleDeviceAction(deviceActionButton.dataset.deviceAction, deviceActionButton);
        return;
      }

      const handoffActionButton = event.target.closest('[data-handoff-action]');
      if (handoffActionButton) {
        this.handleHandoffAction(handoffActionButton.dataset.handoffAction, handoffActionButton);
        return;
      }

      const continuityActionButton = event.target.closest('[data-continuity-action]');
      if (continuityActionButton) {
        this.handleContinuityAction(continuityActionButton.dataset.continuityAction, continuityActionButton);
        return;
      }

      const approvalCenterButton = event.target.closest('[data-approval-center-action]');
      if (approvalCenterButton) {
        this.handleApprovalCenterAction(approvalCenterButton.dataset.approvalCenterAction, approvalCenterButton);
        return;
      }

      const diagnostButton = event.target.closest('[data-diagnost-action]');
      if (diagnostButton) {
        this.handleDiagnostAction(diagnostButton.dataset.diagnostAction, diagnostButton);
        return;
      }

      const guardianButton = event.target.closest('[data-guardian-action]');
      if (guardianButton) {
        this.handleGuardianAction(guardianButton.dataset.guardianAction, guardianButton);
        return;
      }

      const integrationButton = event.target.closest('[data-integration-action]');
      if (integrationButton) {
        this.handleIntegrationAction(integrationButton.dataset.integrationAction, integrationButton);
        return;
      }

      const liveRuntimeButton = event.target.closest('[data-live-runtime-action]');
      if (liveRuntimeButton) {
        this.handleLiveRuntimeAction(liveRuntimeButton.dataset.liveRuntimeAction, liveRuntimeButton);
        return;
      }

      const schemeButton = event.target.closest('[data-scheme-action]');
      if (schemeButton) {
        this.handleMinaSchemeAction(schemeButton.dataset.schemeAction, schemeButton);
        return;
      }

      const schemeZone = event.target.closest('[data-scheme-zone]');
      if (schemeZone) {
        this.selectMinaSchemeZone(schemeZone.dataset.schemeZone);
        return;
      }

      const headButton = event.target.closest('[data-head-action]');
      if (headButton) {
        this.handleHeadAction(headButton.dataset.headAction, headButton);
      }
    });

    document.addEventListener('change', (event) => {
      const roleSelect = event.target.closest('[data-file-role]');
      if (roleSelect) {
        this.updateWorkspaceFileRole(roleSelect.dataset.fileRole, roleSelect.value);
      }

      const voiceTranscript = event.target.closest('#workspace-voice-transcript');
      if (voiceTranscript) {
        this.workspaceVoiceTranscript = voiceTranscript.value;
        this.workspaceVoicePreview = this.buildVoiceIntentPreview(this.workspaceVoiceTranscript);
        this.workspaceVoiceState = 'preview_waiting';
        this.renderVoicePanel();
        return;
      }

      const brainRoleSelect = event.target.closest('[data-head-role]');
      if (brainRoleSelect) {
        this.updateHeadBrainRole(brainRoleSelect.dataset.headRole, brainRoleSelect.value);
        return;
      }

      const councilProfileSelect = event.target.closest('#workspace-council-profile-select');
      if (councilProfileSelect) {
        this.updateTaskCouncilProfile(councilProfileSelect.value);
        return;
      }

      const schemeStrategist = event.target.closest('#mina-scheme-strategist-select');
      if (schemeStrategist) {
        this.updateMinaSchemeStrategist(schemeStrategist.value);
      }
    });

    document.addEventListener('input', (event) => {
      const memorySearchInput = event.target.closest('#system-memory-search-query');
      if (memorySearchInput) {
        if (!this.memorySearchState) this.memorySearchState = this.defaultMemorySearchState();
        this.memorySearchState.query = memorySearchInput.value;
        return;
      }

      const voiceTranscript = event.target.closest('#workspace-voice-transcript');
      if (!voiceTranscript) return;
      this.workspaceVoiceTranscript = voiceTranscript.value;
    });

    document.getElementById('btn-start').addEventListener('click', () => {
      this.go('menu');
    });
    document.getElementById('work-task-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      this.createWorkPreview();
    });
    document.getElementById('workspace-file-input')?.addEventListener('change', (event) => {
      this.addWorkspaceFiles(event.target.files);
      event.target.value = '';
    });
    const dropzone = document.getElementById('workspace-file-drop');
    dropzone?.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropzone.classList.add('is-dragover');
    });
    dropzone?.addEventListener('dragleave', () => dropzone.classList.remove('is-dragover'));
    dropzone?.addEventListener('drop', (event) => {
      event.preventDefault();
      dropzone.classList.remove('is-dragover');
      this.addWorkspaceFiles(event.dataTransfer?.files);
    });
    document.getElementById('btn-open-model').addEventListener('click', () => {
      this.sendPersonalAction('open_brain', { brain: this.selectedModel });
    });
    document.getElementById('btn-anydesk').addEventListener('click', () => {
      this.sendPersonalAction('ensure_anydesk', { brain: this.selectedModel });
    });
    document.getElementById('btn-check-window').addEventListener('click', () => {
      this.sendPersonalAction('verify_brain', { brain: this.selectedModel });
    });
    document.getElementById('btn-open-anydesk').addEventListener('click', () => {
      this.openAnyDeskApp();
    });
    document.getElementById('btn-copy-anydesk').addEventListener('click', () => {
      this.copyAnyDeskId();
    });
    document.getElementById('btn-copy-anydesk-fallback').addEventListener('click', () => {
      this.copyAnyDeskId();
    });
    document.getElementById('btn-finished').addEventListener('click', () => {
      this.sendPersonalAction('done', { brain: this.selectedModel });
    });
    document.getElementById('btn-minimize').addEventListener('click', () => {
      this.sendPersonalAction('minimize_brain', { brain: this.selectedModel });
    });
    document.getElementById('btn-end-session').addEventListener('click', () => {
      this.closeOrFallback('start');
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') this.closeOrFallback();
      if (event.key === 'Backspace' && !this.isTypingTarget(event.target)) this.handleBack();
    });
  },

  attachVerifierPanel() {
    const verifier = document.getElementById('work-verifier-panel');
    const tab = document.getElementById('workspace-tab-check');
    if (verifier && tab && verifier.parentElement !== tab) {
      tab.appendChild(verifier);
    }
  },

  initVoiceSupport() {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.workspaceVoiceSupported = Boolean(Recognition);
    if (!Recognition) {
      this.workspaceVoiceState = 'browser_not_supported';
      return;
    }
    const recognition = new Recognition();
    recognition.lang = this.voiceSettings?.speech_language || 'ru-RU';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onstart = () => {
      this.workspaceVoiceState = 'listening';
      this.renderVoicePanel();
    };
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results || [])
        .map((result) => result?.[0]?.transcript || '')
        .join(' ')
        .trim();
      this.workspaceVoiceTranscript = transcript;
      this.workspaceVoicePreview = this.buildVoiceIntentPreview(transcript);
      this.workspaceVoiceState = 'preview_waiting';
      this.renderVoicePanel();
    };
    recognition.onerror = (event) => {
      this.workspaceVoiceState = event.error === 'not-allowed' ? 'permission_denied' : 'failed';
      this.renderVoicePanel();
      this.toast(event.error === 'not-allowed' ? 'Микрофон недоступен' : 'Голос не распознан');
    };
    recognition.onend = () => {
      if (this.workspaceVoiceState === 'listening') this.workspaceVoiceState = 'idle';
      this.renderVoicePanel();
    };
    this.workspaceVoiceRecognition = recognition;
  },

  startWorkspaceTimer() {
    if (this.workspaceTimer) return;
    this.workspaceTimer = window.setInterval(() => this.updateWorkspaceTimer(), 1000);
  },

  get model() {
    return MODELS[this.selectedModel] || MODELS.chatgpt;
  },

  selectModel(key) {
    if (!MODELS[key]) return;
    if (!this.isLegacyPersonalAccessAllowed()) {
      this.handleLegacyPersonalBlocked('brain');
      return;
    }
    this.selectedModel = key;
    this.renderBrain();
    this.updateModelButtons();
    this.go('brain');
  },

  renderBrain() {
    const model = this.model;
    const brainIcon = document.getElementById('brain-icon');

    document.getElementById('brain-title').textContent = model.name;
    document.getElementById('brain-subtitle').textContent = `Подключение к официальному окну через runtime владельца (${this.getPrimaryOwnedAgentId()})`;
    document.getElementById('open-model-label').textContent = `Открыть ${model.name}`;
    document.getElementById('brain-profile').textContent = model.profile;
    const runtimeAgent = document.getElementById('brain-runtime-agent');
    if (runtimeAgent) runtimeAgent.textContent = this.getPrimaryOwnedAgentId();

    brainIcon.textContent = model.short;
    brainIcon.className = `brain-mark model-icon ${model.iconClass}`;
  },

  updateModelButtons() {
    document.querySelectorAll('[data-model]').forEach((button) => {
      button.classList.toggle('command-button--active', button.dataset.model === this.selectedModel);
    });
  },

  go(name, options = {}) {
    if (LEGACY_PERSONAL_SCREENS.has(name) && !this.isLegacyPersonalAccessAllowed()) {
      this.handleLegacyPersonalBlocked(name);
      return;
    }

    const target = document.getElementById(`screen-${name}`);
    if (!target) return;

    this.current = name;

    document.querySelectorAll('.screen.active').forEach((screen) => {
      if (screen !== target) screen.classList.remove('active');
    });

    if (options.immediate) {
      target.classList.add('active');
    } else {
      window.requestAnimationFrame(() => target.classList.add('active'));
    }

    document.body.dataset.screen = name;
    if (name === 'mission') this.renderMissionControl();
    if (name === 'system') this.renderSystemStatus();
    if (name === 'scheme') this.renderMinaSystemScheme();
    this.updateTelegramControls();
  },

  handleBack() {
    const backMap = {
      start: null,
      menu: 'start',
      work: 'menu',
      mission: 'menu',
      system: 'menu',
      scheme: 'system',
      personal: 'menu',
      brain: this.isLegacyPersonalAccessAllowed() ? 'personal' : 'menu',
      remote: this.isLegacyPersonalAccessAllowed() ? 'brain' : 'menu',
      complete: this.isLegacyPersonalAccessAllowed() ? 'remote' : 'menu'
    };

    const next = backMap[this.current];
    if (next) this.go(next);
  },

  closeOrFallback(fallback) {
    if (this.tg?.close) {
      this.tg.close();
      return;
    }

    if (fallback) {
      this.go(fallback);
      return;
    }

    this.go(this.current === 'menu' ? 'start' : 'menu');
  },

  isLegacyPersonalAccessAllowed() {
    const params = new URLSearchParams(window.location.search);
    return params.get('legacy_personal') === '1'
      || window.sessionStorage?.getItem(LEGACY_PERSONAL_ACCESS_KEY) === '1';
  },

  handleLegacyPersonalBlocked(target = 'personal') {
    const label = {
      personal: 'Личное',
      brain: 'старый экран модели',
      remote: 'старый AnyDesk flow',
      complete: 'старое завершение сессии'
    }[target] || target;
    this.current = this.current || 'menu';
    this.toast(`${label}: legacy-режим скрыт. Используй Рабочее / Совет / Система.`);
    this.go('system');
  },

  updateTelegramControls() {
    if (!this.tg?.BackButton) return;

    if (this.current === 'start') {
      this.tg.BackButton.hide();
    } else {
      this.tg.BackButton.show();
    }
  },

  async initTaskRuntime() {
    try {
      this.taskRuntimeDb = await openTaskRuntimeDatabase();
      this.taskRuntimeReady = !!this.taskRuntimeDb;
      this.taskRuntimeFallback = !this.taskRuntimeReady;
      if (this.taskRuntimeReady) {
        await this.seedRuntimeProjects();
        await this.migrateLegacyWorkTasks();
        await this.saveRuntimeMeta({
          key: WORK_RUNTIME_META_KEY,
          version: WORK_RUNTIME_DB_VERSION,
          updated_at: new Date().toISOString(),
          runtime: 'indexeddb'
        });
      }
    } catch (error) {
      console.warn('[MinaWebApp] Task Runtime IndexedDB fallback', error);
      this.taskRuntimeDb = null;
      this.taskRuntimeReady = false;
      this.taskRuntimeFallback = true;
    }
  },

  async seedRuntimeProjects() {
    if (!this.taskRuntimeDb) return;
    const existing = await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.PROJECTS);
    const existingIds = new Set(existing.map((project) => project.project_id));
    const now = new Date().toISOString();
    const presets = WORK_PROJECTS
      .filter((project) => !existingIds.has(project.id))
      .map((project) => ({
        project_id: project.id,
        name: project.name,
        short_description: project.short_description,
        type: project.id,
        status: 'active',
        archived: false,
        preset: true,
        goal: project.short_description,
        created_at: now,
        updated_at: now
      }));
    if (presets.length) await this.putRuntimeRecords(TASK_RUNTIME_STORES.PROJECTS, presets);
  },

  async migrateLegacyWorkTasks() {
    if (!this.taskRuntimeDb) return;
    const migration = await this.getRuntimeRecord(TASK_RUNTIME_STORES.META, WORK_RUNTIME_MIGRATION_KEY);
    if (migration?.done) return;

    let legacyTasks = [];
    try {
      const raw = window.localStorage?.getItem(WORK_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      legacyTasks = Array.isArray(parsed) ? parsed.filter((task) => task?.task_id).map((task) => this.normalizeWorkTask(task)) : [];
    } catch {
      legacyTasks = [];
    }

    if (legacyTasks.length) await this.putRuntimeRecords(TASK_RUNTIME_STORES.TASKS, legacyTasks);
    await this.saveRuntimeMeta({
      key: WORK_RUNTIME_MIGRATION_KEY,
      done: true,
      migrated_count: legacyTasks.length,
      migrated_at: new Date().toISOString()
    });
  },

  async getRuntimeRecord(storeName, key) {
    if (!this.taskRuntimeDb) return null;
    const transaction = this.taskRuntimeDb.transaction(storeName, 'readonly');
    return indexedDbRequest(transaction.objectStore(storeName).get(key));
  },

  async getAllRuntimeRecords(storeName) {
    if (!this.taskRuntimeDb) return [];
    const transaction = this.taskRuntimeDb.transaction(storeName, 'readonly');
    return indexedDbRequest(transaction.objectStore(storeName).getAll());
  },

  async putRuntimeRecords(storeName, records) {
    if (!this.taskRuntimeDb || !records?.length) return;
    const transaction = this.taskRuntimeDb.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    records.forEach((record) => store.put(record));
    await indexedDbTransactionDone(transaction);
  },

  async putRuntimeRecord(storeName, record) {
    if (!this.taskRuntimeDb || !record) return;
    await this.putRuntimeRecords(storeName, [record]);
  },

  async replaceRuntimeStoreRecords(storeName, records) {
    if (!this.taskRuntimeDb) return;
    const transaction = this.taskRuntimeDb.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    store.clear();
    (records || []).forEach((record) => store.put(record));
    await indexedDbTransactionDone(transaction);
  },

  async saveRuntimeMeta(record) {
    await this.putRuntimeRecord(TASK_RUNTIME_STORES.META, record);
  },

  async loadWorkProjects() {
    if (this.taskRuntimeDb) {
      const projects = await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.PROJECTS);
      this.workProjects = projects.length ? projects.map((project) => this.normalizeWorkProject(project)) : this.defaultRuntimeProjects();
      return;
    }

    this.workProjects = this.defaultRuntimeProjects();
  },

  defaultRuntimeProjects() {
    const now = new Date().toISOString();
    return WORK_PROJECTS.map((project) => ({
      project_id: project.id,
      name: project.name,
      short_description: project.short_description,
      type: project.id,
      status: 'active',
      archived: false,
      preset: true,
      goal: project.short_description,
      created_at: now,
      updated_at: now
    }));
  },

  normalizeWorkProject(project) {
    const now = new Date().toISOString();
    return {
      project_id: project.project_id || project.id || this.generateWorkspaceId('PROJECT'),
      name: project.name || 'Новый проект',
      short_description: project.short_description || project.goal || 'проект Терминатора',
      type: project.type || DEFAULT_PROJECT_TYPE,
      status: project.status || (project.archived ? 'archived' : 'active'),
      archived: Boolean(project.archived || project.status === 'archived'),
      preset: Boolean(project.preset),
      goal: project.goal || project.short_description || '',
      created_at: project.created_at || now,
      updated_at: project.updated_at || now,
      schema_version: Number(project.schema_version || 0),
      migration_status: project.migration_status || '',
      schema_updated_at: project.schema_updated_at || ''
    };
  },

  activeWorkProjects() {
    return (this.workProjects || [])
      .filter((project) => !project.archived && project.status !== 'archived')
      .sort((a, b) => Number(Boolean(b.preset)) - Number(Boolean(a.preset)) || a.name.localeCompare(b.name, 'ru'));
  },

  projectById(projectId) {
    return (this.workProjects || []).find((project) => project.project_id === projectId)
      || this.defaultRuntimeProjects().find((project) => project.project_id === projectId)
      || null;
  },

  renderWorkFormOptions() {
    const currentProject = document.getElementById('work-project-select')?.value || 'terminator';
    const selectedProject = this.activeWorkProjects().some((project) => project.project_id === currentProject) ? currentProject : 'terminator';
    this.fillSelect('work-project-select', this.activeWorkProjects().map((project) => ({ id: project.project_id, name: project.name })), selectedProject);
    this.fillSelect('work-mode-select', WORK_MODES, 'auto');
    this.fillSelect('work-quality-select', WORK_QUALITY_LEVELS, 'auto');
    this.fillSelect('work-project-type-select', [
      { id: DEFAULT_PROJECT_TYPE, name: 'Обычный проект' },
      ...WORK_PROJECTS.map((project) => ({ id: project.id, name: project.name }))
    ], DEFAULT_PROJECT_TYPE);
  },

  fillSelect(id, options, selectedId) {
    const select = document.getElementById(id);
    if (!select) return;

    select.innerHTML = options
      .map((item) => `<option value="${this.escapeHtml(item.id)}"${item.id === selectedId ? ' selected' : ''}>${this.escapeHtml(item.name)}</option>`)
      .join('');
  },

  renderProjectRuntimePanel() {
    const count = document.getElementById('runtime-project-count');
    const storage = document.getElementById('runtime-storage-status');
    const activeProjects = this.activeWorkProjects();
    if (count) {
      const archived = (this.workProjects || []).filter((project) => project.archived || project.status === 'archived').length;
      count.textContent = `${activeProjects.length} активных проектов${archived ? `, ${archived} в архиве` : ''}`;
    }
    if (storage) {
      storage.textContent = this.taskRuntimeReady ? 'IndexedDB: активен' : 'IndexedDB: fallback localStorage';
    }
  },

  async handleProjectAction(action) {
    let selectedProjectId = '';
    if (action === 'create') {
      selectedProjectId = await this.createRuntimeProjectFromForm();
    } else if (action === 'rename') {
      selectedProjectId = await this.renameSelectedRuntimeProject();
    } else if (action === 'archive') {
      await this.archiveSelectedRuntimeProject();
    }
    this.renderWorkFormOptions();
    if (selectedProjectId) {
      const select = document.getElementById('work-project-select');
      if (select) select.value = selectedProjectId;
    }
    this.renderProjectRuntimePanel();
    this.renderMissionControl();
    this.renderSystemStatus();
  },

  async createRuntimeProjectFromForm() {
    const nameInput = document.getElementById('work-project-name-input');
    const goalInput = document.getElementById('work-project-goal-input');
    const type = document.getElementById('work-project-type-select')?.value || DEFAULT_PROJECT_TYPE;
    const name = String(nameInput?.value || '').trim();
    const goal = String(goalInput?.value || '').trim();

    if (!name) {
      this.toast('Укажи название проекта');
      nameInput?.focus();
      return '';
    }

    const now = new Date().toISOString();
    const project = {
      project_id: this.generateWorkspaceId('PROJECT'),
      name,
      type,
      short_description: goal || 'пользовательский проект Терминатора',
      goal,
      status: 'active',
      archived: false,
      preset: false,
      created_at: now,
      updated_at: now
    };
    this.workProjects.push(project);
    await this.saveRuntimeProject(project);
    if (nameInput) nameInput.value = '';
    if (goalInput) goalInput.value = '';
    this.toast('Проект создан');
    return project.project_id;
  },

  async renameSelectedRuntimeProject() {
    const projectId = document.getElementById('work-project-select')?.value || '';
    const nameInput = document.getElementById('work-project-name-input');
    const name = String(nameInput?.value || '').trim();
    const project = this.projectById(projectId);
    if (!project) {
      this.toast('Проект не найден');
      return '';
    }
    if (!name) {
      this.toast('Укажи новое название');
      nameInput?.focus();
      return '';
    }
    project.name = name;
    project.updated_at = new Date().toISOString();
    await this.saveRuntimeProject(project);
    if (nameInput) nameInput.value = '';
    this.toast('Проект переименован');
    return project.project_id;
  },

  async archiveSelectedRuntimeProject() {
    const projectId = document.getElementById('work-project-select')?.value || '';
    const project = this.projectById(projectId);
    if (!project) {
      this.toast('Проект не найден');
      return;
    }
    if (project.preset) {
      this.toast('Preset-проект нельзя архивировать в этом слое');
      return;
    }
    project.archived = true;
    project.status = 'archived';
    project.updated_at = new Date().toISOString();
    await this.saveRuntimeProject(project);
    this.toast('Проект отправлен в архив');
  },

  async saveRuntimeProject(project) {
    const normalized = this.normalizeWorkProject(project);
    const index = this.workProjects.findIndex((item) => item.project_id === normalized.project_id);
    if (index >= 0) this.workProjects[index] = normalized;
    if (this.taskRuntimeDb) await this.putRuntimeRecord(TASK_RUNTIME_STORES.PROJECTS, normalized);
  },

  renderMissionControl() {
    const host = document.getElementById('mission-summary');
    if (!host) return;
    const tasks = this.workTasks || [];
    const projects = this.activeWorkProjects();
    const waiting = tasks.filter((task) => task.status === 'waiting_executor_report').length;
    const verifying = tasks.filter((task) => this.taskNeedsVerification(task)).length;
    const approvals = this.pendingApprovalRecords().length;
    const risks = tasks.filter((task) => this.workspaceRiskLevel(task) !== 'низкий').length;
    const active = tasks.filter((task) => !['accepted', 'saved', 'cancelled', 'rejected', 'failed'].includes(task.status)).length;
    const researchActive = tasks.filter((task) => {
      const status = this.ensureResearchOpsState(task).status;
      return status && status !== 'not_started';
    }).length;
    const head = this.headStatusSnapshot();
    const guardian = this.guardianSnapshot();
    const deviceMesh = this.buildDeviceMeshSnapshot();
    const integration = this.buildIntegrationSnapshot();
    const truth = this.refreshSourceOfTruthSnapshot();
    const cards = [
      ['Источник истины', `${truth.score}%`, `${truth.label}: ${truth.next.name}`],
      ['Проекты', projects.length, 'активные проекты'],
      ['Активные задачи', active, 'в работе или ожидании'],
      ['Исследование', researchActive, 'пакет исследования / источники'],
      ['Ждут отчёт', waiting, 'ожидание исполнителя'],
      ['Проверка', verifying, 'требуют Verifier'],
      ['Approval', approvals, 'требуют решения'],
      ['Риски', risks, 'не низкий риск'],
      ['Ноги', `${deviceMesh.readiness}%`, `${deviceMesh.trusted} доверенных · ${deviceMesh.routes.length} маршрутов`],
      ['Интеграция', `${integration.score}%`, integration.summary],
      ['Guardian', guardian.label, `${guardian.openIncidents.length} открытых incidents`],
      ['Голова', head.status, head.note]
    ];
    host.innerHTML = cards.map(([title, value, note]) => `
      <article class="mission-card">
        <span>${this.escapeHtml(title)}</span>
        <strong>${this.escapeHtml(value)}</strong>
        <p>${this.escapeHtml(note)}</p>
      </article>
    `).join('');
    this.renderMissionProjectOverview(projects, tasks);
    this.renderMissionRiskRadar(tasks);
    this.renderMissionRuntimeHealth(tasks);
    this.renderMissionNextStep(tasks, projects);
    this.renderMissionTaskQueues(tasks);
    this.renderMissionEventFeed(tasks);
  },

  renderMissionProjectOverview(projects, tasks) {
    const host = document.getElementById('mission-project-overview');
    if (!host) return;
    const activeProjects = projects.filter((project) => project.status !== 'archived');
    host.innerHTML = activeProjects.slice(0, 6).map((project) => {
      const projectTasks = tasks.filter((task) => task.project_id === project.project_id);
      const activeCount = projectTasks.filter((task) => !['accepted', 'saved', 'cancelled', 'rejected', 'failed'].includes(task.status)).length;
      const waitingCount = projectTasks.filter((task) => task.status === 'waiting_executor_report').length;
      const approvalCount = projectTasks.filter((task) => this.taskRequiresApproval(task)).length;
      return `
        <article class="mission-project-card">
          <div>
            <strong>${this.escapeHtml(project.name)}</strong>
            <p>${this.escapeHtml(project.goal || project.short_description || 'цель не задана')}</p>
          </div>
          <dl>
            <div><dt>активно</dt><dd>${activeCount}</dd></div>
            <div><dt>отчёт</dt><dd>${waitingCount}</dd></div>
            <div><dt>approval</dt><dd>${approvalCount}</dd></div>
          </dl>
        </article>
      `;
    }).join('') || '<p class="mission-empty">Активных проектов пока нет.</p>';
  },

  renderMissionRiskRadar(tasks) {
    const host = document.getElementById('mission-risk-radar');
    if (!host) return;
    const highRiskTasks = tasks.filter((task) => this.workspaceRiskLevel(task) === 'высокий');
    const mediumRiskTasks = tasks.filter((task) => this.workspaceRiskLevel(task) === 'средний');
    const pendingApprovals = tasks.filter((task) => this.taskRequiresApproval(task));
    const blockedAcceptance = tasks.filter((task) => !['accepted', 'saved', 'cancelled', 'rejected', 'failed'].includes(task.status) && !this.acceptanceGateStatus(task).ready);
    const noEvidence = tasks.filter((task) => task.verifier_result && !this.verifierEvidenceGate(task).ok);
    const rows = [
      ['Высокий риск', String(highRiskTasks.length), highRiskTasks[0]?.title || 'критичных задач нет'],
      ['Средний риск', String(mediumRiskTasks.length), mediumRiskTasks[0]?.title || 'средних рисков нет'],
      ['Ждут approval', String(pendingApprovals.length), pendingApprovals[0]?.title || 'очередь approval пуста'],
      ['Gates не закрыты', String(blockedAcceptance.length), blockedAcceptance[0]?.title || 'активные gates чистые'],
      ['Нет evidence', String(noEvidence.length), noEvidence[0]?.title || 'evidence gaps не найдены']
    ];
    host.innerHTML = rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('');
  },

  renderMissionRuntimeHealth(tasks) {
    const host = document.getElementById('mission-runtime-health');
    if (!host) return;
    const direct = this.directModeStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const guardian = this.guardianSnapshot();
    const deviceMesh = this.buildDeviceMeshSnapshot();
    const integration = this.buildIntegrationSnapshot();
    const liveRuntime = this.buildLiveRuntimeSnapshot();
    const truth = this.currentSourceOfTruthSnapshot({ refresh: true });
    const rows = [
      ['Источник истины', `${truth.score}%`, `${truth.summary}; следующий шаг: ${truth.next.name}`],
      ['Интеграция контура', `${integration.score}%`, `${integration.summary}; следующий шаг: ${integration.next.name}`],
      ['Живой контур', `${liveRuntime.score}%`, `${liveRuntime.summary}; следующий шаг: ${liveRuntime.next.name}`],
      ['Task Runtime', this.taskRuntimeReady ? 'OK' : 'Fallback', this.taskRuntimeReady ? `${tasks.length} задач в IndexedDB/local mirror` : 'Работает localStorage fallback'],
      ['Guardian', guardian.label, guardian.note],
      ['Ноги / Device Mesh', `${deviceMesh.readiness}%`, `${deviceMesh.devices.length} устройств; следующий шаг: ${deviceMesh.next}`],
      ['Общее хранилище задач', this.taskStoreSyncStatus || 'не проверен', this.taskStoreLastSyncAt ? `синхронизация: ${this.formatTaskTime(this.taskStoreLastSyncAt)}` : (this.taskStoreSyncError || 'ожидает вход владельца')],
      ['Direct Mode', direct.status, direct.note],
      ['Local Agent', agent.status, agent.note],
      ['Storage', TERMINATOR_STORAGE_ROOT, 'тяжёлые outputs, архивы и evidence backups на D'],
      ['Checkpoint', 'Phase 2', `${TERMINATOR_LAST_CHECKPOINT.previous} закрыт; текущий слой: ${TERMINATOR_LAST_CHECKPOINT.name}`]
    ];
    host.innerHTML = rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('');
  },

  renderMissionNextStep(tasks, projects) {
    const host = document.getElementById('mission-next-step');
    if (!host) return;
    const waiting = tasks.filter((task) => task.status === 'waiting_executor_report');
    const verification = tasks.filter((task) => this.taskNeedsVerification(task));
    const approval = tasks.filter((task) => this.taskRequiresApproval(task));
    const draft = tasks.filter((task) => ['created', 'context_ready', 'ready_for_executor'].includes(task.status));
    const guardian = this.guardianSnapshot();
    const activeIncident = guardian.openIncidents[0];
    let title = 'Создать первую задачу';
    let body = 'Task Runtime готов. Следующий шаг — создать задачу в Рабочем окне.';
    let action = 'open_work';
    let taskId = '';

    if (guardian.state.emergency_stop_active || activeIncident?.severity === 'critical') {
      title = 'Разобрать инцидент Guardian';
      body = activeIncident
        ? `${activeIncident.title}: ${activeIncident.summary || 'требуется проверка владельца'}`
        : 'Стоп действия включён. Новые risky actions заблокированы.';
      action = 'open_system';
    } else if (approval.length) {
      const task = approval[0];
      title = 'Решить Approval';
      body = `${task.title}: есть действие, которое нельзя выполнять автоматически.`;
      action = 'open_task';
      taskId = task.task_id;
    } else if (verification.length) {
      const task = verification[0];
      title = 'Проверить результат';
      body = `${task.title}: отчёт или результат ждёт Verifier.`;
      action = 'open_task';
      taskId = task.task_id;
    } else if (waiting.length) {
      const task = waiting[0];
      title = 'Ожидаем отчёт исполнителя';
      body = `${task.title}: таймер ожидания активен.`;
      action = 'open_task';
      taskId = task.task_id;
    } else if (draft.length) {
      const task = draft[0];
      title = 'Подготовить задачу к исполнителю';
      body = `${task.title}: сформируй пакет или добавь контекст.`;
      action = 'open_task';
      taskId = task.task_id;
    } else if (projects.length) {
      title = 'Runtime чистый';
      body = 'Активных задач нет. Можно открыть Рабочее и создать следующий управляемый процесс.';
    }

    host.innerHTML = `
      <h3>${this.escapeHtml(title)}</h3>
      <p>${this.escapeHtml(body)}</p>
      <button type="button" data-mission-action="${this.escapeHtml(action)}"${taskId ? ` data-task-id="${this.escapeHtml(taskId)}"` : ''}>
        Открыть
      </button>
    `;
  },

  renderMissionTaskQueues(tasks) {
    const host = document.getElementById('mission-task-queues');
    if (!host) return;
    const lanes = [
      {
        id: 'active',
        title: 'Активные',
        tasks: tasks.filter((task) => ['created', 'context_ready', 'planning', 'ready_for_executor', 'assigned'].includes(task.status))
      },
      {
        id: 'research',
        title: 'Исследование',
        tasks: tasks.filter((task) => {
          const status = this.ensureResearchOpsState(task).status;
          return status && status !== 'not_started' && status !== 'decision_ready';
        })
      },
      {
        id: 'waiting',
        title: 'Ждут отчёт',
        tasks: tasks.filter((task) => task.status === 'waiting_executor_report')
      },
      {
        id: 'check',
        title: 'Проверка',
        tasks: tasks.filter((task) => this.taskNeedsVerification(task))
      },
      {
        id: 'approval',
        title: 'Approval',
        tasks: tasks.filter((task) => this.taskRequiresApproval(task))
      }
    ];
    host.innerHTML = lanes.map((lane) => `
      <section class="mission-lane">
        <div class="mission-lane-head">
          <strong>${this.escapeHtml(lane.title)}</strong>
          <span>${lane.tasks.length}</span>
        </div>
        <div class="mission-lane-list">
          ${lane.tasks.slice(0, 5).map((task) => this.renderMissionTaskButton(task)).join('') || '<p class="mission-empty">Нет задач</p>'}
        </div>
      </section>
    `).join('');
  },

  renderMissionTaskButton(task) {
    const risk = this.workspaceRiskLevel(task);
    return `
      <button type="button" class="mission-task-button" data-mission-action="open_task" data-task-id="${this.escapeHtml(task.task_id)}">
        <span>${this.escapeHtml(task.title || 'Задача')}</span>
        <small>${this.escapeHtml(this.statusName(task.status))} · риск: ${this.escapeHtml(risk)}</small>
      </button>
    `;
  },

  renderMissionEventFeed(tasks) {
    const host = document.getElementById('mission-event-feed');
    if (!host) return;
    const events = tasks.flatMap((task) => this.collectMissionEvents(task))
      .sort((a, b) => new Date(b.time || b.created_at || 0) - new Date(a.time || a.created_at || 0))
      .slice(0, 8);
    host.innerHTML = events.map((event) => `
      <article class="mission-event">
        <time>${this.escapeHtml(this.formatTaskTime(event.time || event.created_at))}</time>
        <strong>${this.escapeHtml(event.title)}</strong>
        <p>${this.escapeHtml(event.text)}</p>
      </article>
    `).join('') || '<p class="mission-empty">События появятся после задач, отчётов и решений.</p>';
  },

  collectMissionEvents(task) {
    const events = [];
    const add = (time, title, text) => {
      events.push({
        time: time || task.updated_at || task.created_at,
        title,
        text: `${task.title || task.task_id}: ${text}`
      });
    };
    if (Array.isArray(task.events) && task.events.length) {
      task.events.forEach((event) => add(event.created_at, this.workspaceMessageLabel(event.type), event.text || 'событие'));
      return events;
    }
    add(task.created_at, 'Задача создана', this.statusName(task.status));
    (task.messages || []).forEach((message) => add(message.created_at, this.workspaceMessageLabel(message.type), message.text || 'событие'));
    (task.artifacts || []).forEach((artifact) => add(artifact.created_at, 'Артефакт', artifact.title || artifact.type));
    (task.approval_requests || []).forEach((approval) => add(approval.created_at, 'Approval', approval.command || approval.status || 'требуется решение'));
    if (task.verifier_result) add(task.verified_at || task.updated_at, 'Проверка', task.verifier_result);
    if (task.memory_preview?.status && task.memory_preview.status !== 'draft') add(task.updated_at, 'Память', task.memory_preview.status);
    return events;
  },

  handleMissionAction(action, button) {
    if (action === 'open_work') {
      this.go('work');
      return;
    }
    if (action === 'open_system') {
      this.go('system');
      return;
    }
    if (action === 'open_task') {
      const taskId = button?.dataset?.taskId || '';
      if (!taskId) {
        this.go('work');
        return;
      }
      this.activeWorkTaskId = taskId;
      const activeTask = this.getActiveWorkTask();
      this.workspaceActiveTab = this.taskNeedsVerification(activeTask)
        ? 'check'
        : (activeTask && this.ensureResearchOpsState(activeTask).status !== 'not_started' ? 'research' : 'artifacts');
      this.renderWorkTaskCard();
      this.go('work');
    }
  },

  taskNeedsVerification(task) {
    if (!task) return false;
    if (['PASS', 'PASS_WITH_RISKS', 'NEEDS_FIX', 'REJECT'].includes(task.verifier_result)) return false;
    return ['executor_report_received', 'verifying', 'manual_required'].includes(task.status)
      || task.verifier_result === 'MANUAL_REVIEW';
  },

  taskRequiresApproval(task) {
    if (!task) return false;
    return task.status === 'manual_required'
      || (task.approval_requests || []).some((approval) => ['manual_required', 'pending'].includes(approval.status));
  },

  pendingApprovalRecords() {
    return (this.approvalRecords || []).filter((approval) => ['manual_required', 'pending'].includes(approval.status));
  },

  async loadSystemDiagnostics() {
    try {
      const stored = this.taskRuntimeDb
        ? await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.DIAGNOSTICS)
        : JSON.parse(window.localStorage?.getItem(SYSTEM_DIAGNOSTICS_STORAGE_KEY) || '[]');
      this.systemDiagnostics = Array.isArray(stored)
        ? stored.map((run) => this.normalizeDiagnosticRun(run)).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)).slice(0, 20)
        : [];
      this.activeDiagnosticId = this.systemDiagnostics[0]?.diagnostic_id || '';
    } catch {
      this.systemDiagnostics = [];
      this.activeDiagnosticId = '';
    }
  },

  normalizeDiagnosticRun(run) {
    const now = new Date().toISOString();
    const checks = Array.isArray(run.checks) ? run.checks.map((check) => ({
      check_id: check.check_id || this.generateWorkspaceId('CHECK'),
      name: check.name || 'Проверка',
      status: check.status || 'manual_check',
      severity: check.severity || 'review',
      note: check.note || '',
      safe_action: check.safe_action || '',
      created_at: check.created_at || run.created_at || now
    })) : [];
    const suggestions = Array.isArray(run.suggestions) ? run.suggestions.map((suggestion) => ({
      suggestion_id: suggestion.suggestion_id || this.generateWorkspaceId('SUGGEST'),
      title: suggestion.title || 'Предложение',
      risk_level: suggestion.risk_level || 'review',
      action: suggestion.action || '',
      text: suggestion.text || ''
    })) : [];
    return {
      diagnostic_id: run.diagnostic_id || this.generateWorkspaceId('DIAG'),
      status: run.status || this.diagnosticOverallStatus(checks),
      created_at: run.created_at || now,
      updated_at: run.updated_at || run.created_at || now,
      checks,
      suggestions,
      summary: run.summary || ''
    };
  },

  diagnosticOverallStatus(checks) {
    if ((checks || []).some((check) => ['fail', 'blocked'].includes(check.status) || ['dangerous', 'blocked'].includes(check.severity))) return 'danger';
    if ((checks || []).some((check) => ['review', 'manual_check'].includes(check.status) || ['review', 'approval_required'].includes(check.severity))) return 'review';
    return 'ok';
  },

  async saveSystemDiagnostic(run) {
    const normalized = this.normalizeDiagnosticRun(run);
    const index = this.systemDiagnostics.findIndex((item) => item.diagnostic_id === normalized.diagnostic_id);
    if (index >= 0) this.systemDiagnostics[index] = normalized;
    else this.systemDiagnostics.unshift(normalized);
    this.systemDiagnostics = this.systemDiagnostics
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      .slice(0, 20);
    this.activeDiagnosticId = normalized.diagnostic_id;
    try {
      window.localStorage?.setItem(SYSTEM_DIAGNOSTICS_STORAGE_KEY, JSON.stringify(this.systemDiagnostics.slice(0, 10)));
    } catch {}
    if (this.taskRuntimeDb) await this.putRuntimeRecord(TASK_RUNTIME_STORES.DIAGNOSTICS, normalized);
    return normalized;
  },

  async loadGuardianRuntime() {
    const fallbackState = this.readJsonStorage(GUARDIAN_STATE_STORAGE_KEY, null);
    const fallbackIncidents = this.readJsonStorage(GUARDIAN_INCIDENTS_STORAGE_KEY, []);
    const fallbackWorkerReports = this.readJsonStorage(GUARDIAN_WORKER_REPORTS_STORAGE_KEY, []);
    try {
      const storedState = this.taskRuntimeDb
        ? await this.getRuntimeRecord(TASK_RUNTIME_STORES.META, GUARDIAN_STATE_META_KEY)
        : fallbackState;
      const storedIncidents = this.taskRuntimeDb
        ? await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.INCIDENTS)
        : fallbackIncidents;
      const storedWorkerReports = this.taskRuntimeDb
        ? await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.GUARDIAN_WORKER_REPORTS)
        : fallbackWorkerReports;
      this.guardianState = this.normalizeGuardianState(storedState || fallbackState || {});
      this.guardianIncidents = Array.isArray(storedIncidents)
        ? storedIncidents.map((incident) => this.normalizeIncident(incident)).sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0)).slice(0, 40)
        : [];
      this.guardianWorkerReports = Array.isArray(storedWorkerReports)
        ? storedWorkerReports.map((report) => this.normalizeGuardianWorkerReport(report)).sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)).slice(0, 20)
        : [];
      this.activeIncidentId = this.guardianIncidents[0]?.incident_id || '';
    } catch {
      this.guardianState = this.normalizeGuardianState(fallbackState || {});
      this.guardianIncidents = Array.isArray(fallbackIncidents) ? fallbackIncidents.map((incident) => this.normalizeIncident(incident)).slice(0, 40) : [];
      this.guardianWorkerReports = Array.isArray(fallbackWorkerReports) ? fallbackWorkerReports.map((report) => this.normalizeGuardianWorkerReport(report)).slice(0, 20) : [];
      this.activeIncidentId = this.guardianIncidents[0]?.incident_id || '';
    }
    await this.saveGuardianState(this.guardianState, { silent: true });
  },

  normalizeGuardianState(state = {}) {
    const now = new Date().toISOString();
    const safeMode = Boolean(state.safe_mode || state.emergency_stop_active);
    const status = state.emergency_stop_active ? 'emergency_stop' : safeMode ? 'safe_mode' : (state.status || 'active');
    return {
      key: GUARDIAN_STATE_META_KEY,
      status,
      safe_mode: safeMode,
      emergency_stop_active: Boolean(state.emergency_stop_active),
      autonomy_level: Number.isFinite(Number(state.autonomy_level)) ? Number(state.autonomy_level) : GUARDIAN_DEFAULT_STATE.autonomy_level,
      paid_services_allowed: Boolean(state.paid_services_allowed),
      ai_api_allowed: Boolean(state.ai_api_allowed),
      browser_automation_allowed: Boolean(state.browser_automation_allowed),
      active_policy: state.active_policy || GUARDIAN_DEFAULT_STATE.active_policy,
      last_event: state.last_event || GUARDIAN_DEFAULT_STATE.last_event,
      created_at: state.created_at || now,
      updated_at: state.updated_at || now
    };
  },

  async saveGuardianState(state, options = {}) {
    this.guardianState = this.normalizeGuardianState({
      ...(this.guardianState || {}),
      ...(state || {}),
      updated_at: new Date().toISOString()
    });
    this.writeJsonStorage(GUARDIAN_STATE_STORAGE_KEY, this.guardianState);
    if (this.taskRuntimeDb) await this.putRuntimeRecord(TASK_RUNTIME_STORES.META, this.guardianState);
    if (!options.silent) {
      this.renderMissionControl();
      this.renderSystemStatus();
    }
    return this.guardianState;
  },

  normalizeIncident(incident = {}) {
    const now = new Date().toISOString();
    const severity = incident.severity || 'warning';
    const repair = incident.repair && typeof incident.repair === 'object' ? incident.repair : {};
    return {
      incident_id: incident.incident_id || this.generateWorkspaceId('INCIDENT'),
      title: incident.title || 'Инцидент',
      summary: incident.summary || incident.note || '',
      source: incident.source || 'guardian',
      source_ref: incident.source_ref || '',
      severity,
      status: incident.status || 'detected',
      risk_level: incident.risk_level || (severity === 'critical' ? 'critical' : severity === 'error' ? 'high' : 'review'),
      affected_area: incident.affected_area || 'system',
      safe_action: incident.safe_action || '',
      approval_required: Boolean(incident.approval_required || ['high', 'critical', 'approval_required'].includes(incident.risk_level)),
      diagnostic_pack: incident.diagnostic_pack || null,
      repair_workspace: incident.repair_workspace || null,
      diff_review: incident.diff_review || null,
      rollback_point: incident.rollback_point || null,
      repair: {
        status: repair.status || 'not_started',
        executor: repair.executor || 'codex_repair_operator',
        autonomy_level: Number.isFinite(Number(repair.autonomy_level)) ? Number(repair.autonomy_level) : 1,
        verifier_status: repair.verifier_status || 'not_checked',
        apply_allowed: Boolean(repair.apply_allowed),
        apply_status: repair.apply_status || 'not_allowed'
      },
      created_at: incident.created_at || now,
      updated_at: incident.updated_at || incident.created_at || now
    };
  },

  async saveGuardianIncident(incident) {
    const normalized = this.normalizeIncident(incident);
    const index = this.guardianIncidents.findIndex((item) => item.incident_id === normalized.incident_id);
    if (index >= 0) this.guardianIncidents[index] = normalized;
    else this.guardianIncidents.unshift(normalized);
    this.guardianIncidents = this.guardianIncidents
      .sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0))
      .slice(0, 40);
    this.activeIncidentId = normalized.incident_id;
    this.writeJsonStorage(GUARDIAN_INCIDENTS_STORAGE_KEY, this.guardianIncidents.slice(0, 40));
    if (this.taskRuntimeDb) await this.putRuntimeRecord(TASK_RUNTIME_STORES.INCIDENTS, normalized);
    return normalized;
  },

  normalizeGuardianWorkerReport(report = {}) {
    const now = new Date().toISOString();
    const checks = Array.isArray(report.checks) ? report.checks.map((check) => ({
      check_id: check.check_id || this.generateWorkspaceId('WCHK'),
      worker_id: check.worker_id || check.worker || 'worker',
      title: check.title || 'Worker check',
      status: check.status || 'manual_check',
      risk_level: check.risk_level || 'review',
      note: check.note || '',
      evidence_type: check.evidence_type || '',
      requires_approval: Boolean(check.requires_approval),
      created_at: check.created_at || report.created_at || now
    })) : [];
    const blocked = checks.filter((check) => ['blocked', 'approval_required'].includes(check.status) || check.requires_approval);
    const warnings = checks.filter((check) => ['review', 'manual_check'].includes(check.status) || check.risk_level === 'review');
    return {
      report_id: report.report_id || this.generateWorkspaceId('WORKERREP'),
      title: report.title || 'Phase 4 worker readiness report',
      status: report.status || (blocked.length ? 'guarded' : warnings.length ? 'review' : 'pass'),
      risk_level: report.risk_level || (blocked.length ? 'approval_required' : warnings.length ? 'review' : 'safe'),
      summary: report.summary || '',
      source: report.source || 'guardian_worker_console',
      checks,
      blocked_actions: Array.isArray(report.blocked_actions) ? report.blocked_actions : blocked.map((check) => check.title),
      local_agent_command: report.local_agent_command || this.buildPhase4WorkerLocalAgentCommand(),
      created_at: report.created_at || now,
      updated_at: report.updated_at || report.created_at || now
    };
  },

  async saveGuardianWorkerReport(report) {
    const normalized = this.normalizeGuardianWorkerReport(report);
    const index = this.guardianWorkerReports.findIndex((item) => item.report_id === normalized.report_id);
    if (index >= 0) this.guardianWorkerReports[index] = normalized;
    else this.guardianWorkerReports.unshift(normalized);
    this.guardianWorkerReports = this.guardianWorkerReports
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
      .slice(0, 20);
    this.writeJsonStorage(GUARDIAN_WORKER_REPORTS_STORAGE_KEY, this.guardianWorkerReports.slice(0, 20));
    if (this.taskRuntimeDb) await this.putRuntimeRecord(TASK_RUNTIME_STORES.GUARDIAN_WORKER_REPORTS, normalized);
    await this.saveGuardianState({
      last_event: `Worker report: ${normalized.status}`
    }, { silent: true });
    return normalized;
  },

  async createGuardianIncident(data) {
    const incident = await this.saveGuardianIncident({
      ...data,
      incident_id: data.incident_id || this.generateWorkspaceId('INCIDENT'),
      created_at: data.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
    await this.saveGuardianState({
      status: this.guardianState?.emergency_stop_active ? 'emergency_stop' : this.guardianState?.safe_mode ? 'safe_mode' : 'review',
      last_event: `Incident created: ${incident.title}`
    }, { silent: true });
    return incident;
  },

  guardianSnapshot() {
    const state = this.normalizeGuardianState(this.guardianState || {});
    const openIncidents = (this.guardianIncidents || []).filter((incident) => !['closed', 'fixed', 'ignored_by_user'].includes(incident.status));
    const critical = openIncidents.filter((incident) => incident.severity === 'critical').length;
    const warnings = openIncidents.filter((incident) => ['warning', 'error'].includes(incident.severity)).length;
    return {
      status: state.status,
      label: GUARDIAN_STATUS_LABELS[state.status] || state.status,
      tone: state.emergency_stop_active ? 'danger' : state.safe_mode ? 'review' : critical ? 'danger' : warnings ? 'review' : 'safe',
      note: state.emergency_stop_active
        ? 'Стоп действия включён. Новые risky actions заблокированы.'
        : state.safe_mode
          ? 'Safe Mode включён. Автоматические действия ограничены.'
          : 'Guardian контролирует риски, стоимость и dangerous actions.',
      openIncidents,
      critical,
      warnings,
      state
    };
  },

  incidentFromDiagnosticCheck(run, check) {
    const severity = check.severity === 'blocked' || check.status === 'blocked'
      ? 'critical'
      : check.severity === 'approval_required' || check.status === 'fail'
        ? 'error'
        : check.severity === 'review' || check.status === 'review' || check.status === 'manual_check'
          ? 'warning'
          : 'info';
    return {
      incident_id: this.generateWorkspaceId('INCIDENT'),
      title: check.name,
      summary: check.note,
      source: 'diagnost',
      source_ref: `${run.diagnostic_id}:${check.check_id}`,
      severity,
      status: severity === 'info' ? 'closed' : 'detected',
      risk_level: check.severity || 'review',
      affected_area: check.name,
      safe_action: check.safe_action || '',
      approval_required: check.severity === 'approval_required' || check.severity === 'blocked',
      created_at: run.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  },

  async createIncidentsFromDiagnosticRun(run) {
    const existingRefs = new Set((this.guardianIncidents || []).map((incident) => incident.source_ref).filter(Boolean));
    const relevant = (run.checks || [])
      .filter((check) => ['review', 'manual_check', 'fail', 'blocked'].includes(check.status) || ['review', 'approval_required', 'blocked', 'dangerous'].includes(check.severity))
      .filter((check) => !existingRefs.has(`${run.diagnostic_id}:${check.check_id}`))
      .slice(0, 8);
    for (const check of relevant) {
      await this.saveGuardianIncident(this.incidentFromDiagnosticCheck(run, check));
    }
    if (relevant.length) {
      await this.saveGuardianState({
        status: this.guardianState?.emergency_stop_active ? 'emergency_stop' : this.guardianState?.safe_mode ? 'safe_mode' : 'review',
        last_event: `Диагност создал incidents: ${relevant.length}`
      }, { silent: true });
    }
  },

  repairWorkspacePath(incident) {
    const id = this.safeStorageSegment(incident?.incident_id || 'incident');
    return `${TERMINATOR_STORAGE_ROOT}\\repair_workspaces\\${id}`;
  },

  buildDiagnosticPack(incident) {
    const guardian = this.guardianSnapshot();
    return [
      '# Diagnostic Pack',
      '',
      `incident_id: ${incident.incident_id}`,
      `title: ${incident.title}`,
      `severity: ${incident.severity}`,
      `status: ${incident.status}`,
      `affected_area: ${incident.affected_area}`,
      '',
      '## Симптом',
      incident.summary || 'Симптом не описан.',
      '',
      '## Безопасные ограничения',
      '- Не использовать AI API.',
      '- Не читать и не менять .env, secrets, tokens, cookies.',
      '- Не делать deploy, push main, network/firewall/DNS/VPN/proxy.',
      '- Не удалять файлы.',
      '- Работать только в repair workspace.',
      '- Вернуть diff, список файлов, проверки, риски и rollback plan.',
      '',
      '## Runtime facts',
      `Guardian: ${guardian.label}`,
      `Safe Mode: ${guardian.state.safe_mode ? 'on' : 'off'}`,
      `Emergency Stop: ${guardian.state.emergency_stop_active ? 'on' : 'off'}`,
      `Task Runtime: ${this.taskRuntimeReady ? 'IndexedDB active' : 'localStorage fallback'}`,
      `TaskStore sync: ${this.taskStoreSyncStatus || 'unknown'}`,
      `Storage root: ${TERMINATOR_STORAGE_ROOT}`,
      '',
      '## Expected Codex output',
      '- что найдено;',
      '- какие файлы предложено изменить;',
      '- diff summary;',
      '- проверки;',
      '- риски;',
      '- rollback instructions;',
      '- что не проверено.'
    ].join('\n');
  },

  buildRepairWorkspaceMetadata(incident) {
    const root = this.repairWorkspacePath(incident);
    return {
      root,
      input: `${root}\\input`,
      diagnostic_pack: `${root}\\diagnostic_pack`,
      working_copy: `${root}\\working_copy`,
      codex_output: `${root}\\codex_output`,
      diff: `${root}\\diff`,
      verifier: `${root}\\verifier`,
      evidence: `${root}\\evidence`,
      rollback: `${root}\\rollback`,
      report: `${root}\\report.md`,
      status: 'planned',
      created_at: new Date().toISOString()
    };
  },

  buildDiffReviewPlaceholder(incident) {
    return {
      title: 'Исправление готовится',
      changed_files: [],
      summary: 'Diff появится после работы Codex Repair Operator.',
      risk_level: incident.risk_level || 'review',
      checks: [
        { name: 'syntax', status: 'not_run' },
        { name: 'no secrets', status: 'not_run' },
        { name: 'no AI API', status: 'not_run' },
        { name: 'smoke', status: 'not_run' }
      ],
      unknowns: ['Codex ещё не вернул diff.'],
      created_at: new Date().toISOString()
    };
  },

  buildRollbackPointMetadata(incident) {
    const root = this.repairWorkspacePath(incident);
    return {
      rollback_id: this.generateWorkspaceId('ROLLBACK'),
      incident_id: incident.incident_id,
      affected_files: [],
      previous_file_hashes: [],
      backup_path: `${root}\\rollback`,
      approval_id: '',
      instructions: 'Rollback создаётся до применения diff. Пока применение запрещено.',
      status: 'planned',
      created_at: new Date().toISOString()
    };
  },

  buildPhase4WorkerLocalAgentCommand() {
    return [
      '# Phase 4 Local Agent worker self-test',
      '',
      'Рабочая папка Local Agent:',
      '$env:USERPROFILE\\Desktop\\терминатор - DeepSeek_files\\council\\local-agent',
      '',
      'PowerShell:',
      'node .\\mina-local-agent.mjs --phase4-worker-self-test',
      '',
      'Что делает:',
      '- создаёт read-only worker report на D;',
      '- проверяет policy Guardian / Eyes / Hands;',
      '- не читает .env/secrets/cookies/tokens;',
      '- не запускает неизвестные файлы;',
      '- не меняет сеть, firewall, Defender, DNS, VPN или proxy;',
      '- не применяет repair diff к active project.',
      '',
      'Future Direct Bridge payload:',
      JSON.stringify({
        type: 'storage_action',
        action: 'run_phase4_worker_selftest',
        storage_root: TERMINATOR_STORAGE_ROOT,
        dry_run: false
      }, null, 2)
    ].join('\n');
  },

  buildPhase4WorkerReadinessReport() {
    const now = new Date().toISOString();
    const guardian = this.guardianSnapshot();
    const checks = [
      {
        worker_id: 'guardian',
        title: 'Guardian policy state',
        status: guardian.state.emergency_stop_active ? 'blocked' : 'pass',
        risk_level: guardian.state.emergency_stop_active ? 'critical' : 'safe',
        note: guardian.state.emergency_stop_active ? 'Emergency Stop активен; worker actions не запускаются.' : 'Guardian активен, dangerous actions gated.',
        evidence_type: 'GUARDIAN_STATE',
        requires_approval: false
      },
      {
        worker_id: 'eyes',
        title: 'Eyes read-only readiness',
        status: 'pass',
        risk_level: 'safe',
        note: 'Глаза готовы создавать screenshot/DOM/layout evidence без логинов и без hidden browser control.',
        evidence_type: 'VISUAL_CHECK',
        requires_approval: false
      },
      {
        worker_id: 'file_worker',
        title: 'File Worker metadata gate',
        status: 'approval_required',
        risk_level: 'review',
        note: 'Реальные файлы только через allowlist на D; .env/secrets/archives skipped.',
        evidence_type: 'FILE_METADATA',
        requires_approval: true
      },
      {
        worker_id: 'code_worker',
        title: 'Code Worker repair gate',
        status: 'blocked',
        risk_level: 'approval_required',
        note: 'Пишет только в repair workspace. Active project apply запрещён до Verifier/rollback/Approval.',
        evidence_type: 'DIFF_REVIEW',
        requires_approval: true
      },
      {
        worker_id: 'browser_worker',
        title: 'Browser Worker automation gate',
        status: 'blocked',
        risk_level: 'approval_required',
        note: 'Автологин, cookies, payments, account actions и скрытая browser automation заблокированы.',
        evidence_type: 'QA_EVIDENCE',
        requires_approval: true
      },
      {
        worker_id: 'system_worker',
        title: 'System Worker health gate',
        status: 'manual_check',
        risk_level: 'review',
        note: 'Разрешены только health/status; network/firewall/Defender/system changes требуют critical Approval.',
        evidence_type: 'DIAGNOSTIC_REPORT',
        requires_approval: true
      }
    ].map((check) => ({
      check_id: this.generateWorkspaceId('WCHK'),
      created_at: now,
      ...check
    }));
    return this.normalizeGuardianWorkerReport({
      report_id: this.generateWorkspaceId('WORKERREP'),
      title: 'Phase 4 Eyes / Hands worker readiness',
      summary: 'Read-only readiness report: safe observations are available, action workers remain gated by Guardian/Approval/Verifier/rollback.',
      source: 'guardian_worker_console',
      checks,
      created_at: now,
      updated_at: now
    });
  },

  buildPhase4WorkerReportText(report) {
    return [
      '# Phase 4 Worker Report',
      '',
      `report_id: ${report.report_id}`,
      `status: ${report.status}`,
      `risk_level: ${report.risk_level}`,
      `created_at: ${report.created_at}`,
      '',
      '## Summary',
      report.summary || 'не задано',
      '',
      '## Checks',
      ...(report.checks || []).map((check) => [
        `- ${check.title}`,
        `  worker: ${check.worker_id}`,
        `  status: ${check.status}`,
        `  risk: ${check.risk_level}`,
        `  approval: ${check.requires_approval ? 'required' : 'not_required'}`,
        `  note: ${check.note}`
      ].join('\n')),
      '',
      '## Blocked Actions',
      ...((report.blocked_actions || []).length ? report.blocked_actions.map((item) => `- ${item}`) : ['- none']),
      '',
      '## Local Agent Command',
      report.local_agent_command || this.buildPhase4WorkerLocalAgentCommand()
    ].join('\n');
  },

  readJsonStorage(key, fallback) {
    try {
      const raw = window.localStorage?.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  writeJsonStorage(key, value) {
    try {
      window.localStorage?.setItem(key, JSON.stringify(value));
    } catch {}
  },

  loadProductionState() {
    this.productionReleaseState = this.readJsonStorage(PRODUCTION_RELEASE_STATE_KEY, {
      status: 'not_checked',
      checks: [],
      history: [],
      last_checked_at: ''
    });
    this.preQamaxGateState = this.readJsonStorage(PRE_QAMAX_GATE_STATE_KEY, {
      status: 'not_checked',
      score: 0,
      checked_at: '',
      checks: [],
      qamax_scope: [],
      blockers: [],
      warnings: [],
      evidence_manifest: [],
      history: []
    });
    this.backupRestoreState = this.readJsonStorage(BACKUP_RESTORE_STATE_KEY, {
      checkpoints: [],
      last_checkpoint_at: '',
      last_export_at: ''
    });
    this.observabilityState = this.readJsonStorage(OBSERVABILITY_STATE_KEY, {
      samples: [],
      last_sample_at: ''
    });
    this.schemaSafetyState = this.readJsonStorage(SCHEMA_SAFETY_STATE_STORAGE_KEY, {
      schema_version: DATA_SCHEMA_VERSION,
      status: 'not_checked',
      last_checked_at: '',
      last_migration_dry_run_at: '',
      last_schema_stamp_at: '',
      last_backup_at: '',
      registry: [],
      migration_plan: null,
      backup_packages: [],
      restore_points: []
    });
    this.systemRegistryState = this.readJsonStorage(SYSTEM_REGISTRY_STATE_STORAGE_KEY, {
      status: 'not_checked',
      score: 0,
      last_checked_at: '',
      services: [],
      dependencies: [],
      capabilities: [],
      history: []
    });
    this.policyCenterState = this.normalizePolicyCenterState(this.readJsonStorage(POLICY_CENTER_STATE_STORAGE_KEY, {}));
  },

  saveProductionState() {
    this.writeJsonStorage(PRODUCTION_RELEASE_STATE_KEY, this.productionReleaseState || {});
    this.writeJsonStorage(PRE_QAMAX_GATE_STATE_KEY, this.preQamaxGateState || {});
    this.writeJsonStorage(BACKUP_RESTORE_STATE_KEY, this.backupRestoreState || {});
    this.writeJsonStorage(OBSERVABILITY_STATE_KEY, this.observabilityState || {});
    this.writeJsonStorage(SCHEMA_SAFETY_STATE_STORAGE_KEY, this.schemaSafetyState || {});
    this.writeJsonStorage(SYSTEM_REGISTRY_STATE_STORAGE_KEY, this.systemRegistryState || {});
    this.writeJsonStorage(POLICY_CENTER_STATE_STORAGE_KEY, this.policyCenterState || {});
  },

  defaultLiveRuntimeState() {
    return {
      schema_version: 1,
      status: 'not_checked',
      score: 0,
      checked_at: '',
      next_action: 'refresh',
      next_label: 'Проверить живой контур',
      checks: [],
      history: [],
      bridge_latency_ms: null,
      task_count: null,
      last_error: ''
    };
  },

  normalizeLiveRuntimeCheck(check) {
    const source = check && typeof check === 'object' ? check : {};
    const allowed = new Set(['ready', 'partial', 'review', 'manual_check', 'blocked', 'failed', 'checking', 'not_checked']);
    const status = allowed.has(source.status) ? source.status : 'not_checked';
    const latencySource = source.latency_ms;
    const taskCountSource = source.task_count;
    return {
      id: String(source.id || source.check_id || this.generateWorkspaceId('LIVECHK')),
      name: String(source.name || 'Проверка'),
      status,
      severity: source.severity || (['blocked', 'failed'].includes(status) ? 'blocked' : ['review', 'manual_check'].includes(status) ? 'review' : 'safe'),
      note: String(source.note || ''),
      source: String(source.source || 'webapp'),
      action: String(source.action || 'refresh'),
      latency_ms: latencySource !== null && latencySource !== undefined && latencySource !== '' && Number.isFinite(Number(latencySource)) ? Number(latencySource) : null,
      task_count: taskCountSource !== null && taskCountSource !== undefined && taskCountSource !== '' && Number.isFinite(Number(taskCountSource)) ? Number(taskCountSource) : null,
      checked_at: source.checked_at || new Date().toISOString()
    };
  },

  normalizeLiveRuntimeState(state) {
    const fallback = this.defaultLiveRuntimeState();
    const source = state && typeof state === 'object' ? state : {};
    const checks = Array.isArray(source.checks)
      ? source.checks.map((check) => this.normalizeLiveRuntimeCheck(check)).slice(0, 20)
      : [];
    const history = Array.isArray(source.history) ? source.history.slice(0, 20).map((item) => ({
      checked_at: item?.checked_at || '',
      status: item?.status || 'not_checked',
      score: Number.isFinite(Number(item?.score)) ? Number(item.score) : 0,
      summary: String(item?.summary || '')
    })) : [];
    return {
      ...fallback,
      ...source,
      schema_version: 1,
      status: source.status || fallback.status,
      score: Number.isFinite(Number(source.score)) ? Number(source.score) : 0,
      checks,
      history,
      bridge_latency_ms: source.bridge_latency_ms !== null && source.bridge_latency_ms !== undefined && source.bridge_latency_ms !== '' && Number.isFinite(Number(source.bridge_latency_ms)) ? Number(source.bridge_latency_ms) : null,
      task_count: source.task_count !== null && source.task_count !== undefined && source.task_count !== '' && Number.isFinite(Number(source.task_count)) ? Number(source.task_count) : null,
      checked_at: source.checked_at || '',
      last_error: String(source.last_error || '')
    };
  },

  loadLiveRuntimeState() {
    this.liveRuntimeState = this.normalizeLiveRuntimeState(this.readJsonStorage(LIVE_RUNTIME_STATE_STORAGE_KEY, null));
  },

  saveLiveRuntimeState() {
    this.liveRuntimeState = this.normalizeLiveRuntimeState(this.liveRuntimeState || this.defaultLiveRuntimeState());
    this.writeJsonStorage(LIVE_RUNTIME_STATE_STORAGE_KEY, this.liveRuntimeState);
  },

  liveRuntimeCheck(id, name, status, note, options = {}) {
    return this.normalizeLiveRuntimeCheck({
      id,
      name,
      status,
      note,
      severity: options.severity,
      source: options.source,
      action: options.action,
      latency_ms: options.latency_ms,
      task_count: options.task_count,
      checked_at: options.checked_at || new Date().toISOString()
    });
  },

  liveRuntimeStatusName(status) {
    const names = {
      ready: 'готово',
      partial: 'частично',
      review: 'нужно проверить',
      manual_check: 'нужен вход',
      blocked: 'заблокировано',
      failed: 'ошибка',
      checking: 'проверяется',
      not_checked: 'не проверено'
    };
    return names[status] || status || 'не проверено';
  },

  liveRuntimeCheckScore(status) {
    if (status === 'ready') return 100;
    if (status === 'partial') return 76;
    if (status === 'checking') return 62;
    if (status === 'review' || status === 'manual_check') return 54;
    if (status === 'blocked' || status === 'failed') return 0;
    return 35;
  },

  liveRuntimeSummaryFromChecks(checks) {
    const ready = checks.filter((check) => check.status === 'ready').length;
    const review = checks.filter((check) => ['partial', 'review', 'manual_check', 'checking', 'not_checked'].includes(check.status)).length;
    const blocked = checks.filter((check) => ['blocked', 'failed'].includes(check.status)).length;
    return `${ready}/${checks.length} готовы; ${review} требуют внимания; ${blocked} блокеров`;
  },

  liveRuntimeNextFromChecks(checks) {
    return checks.find((check) => ['blocked', 'failed'].includes(check.status))
      || checks.find((check) => ['review', 'manual_check', 'partial', 'not_checked'].includes(check.status))
      || checks[0]
      || this.liveRuntimeCheck('refresh', 'Проверить живой контур', 'not_checked', 'Запустите проверку живого контура.', { action: 'refresh' });
  },

  buildLiveRuntimeFallbackChecks() {
    const direct = this.directModeStatusSnapshot();
    const taskStore = this.taskStoreStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const guardian = this.guardianSnapshot();
    const pwa = this.pwaSnapshot();
    const directReady = direct.status === 'сессия активна' || direct.status === 'активен' || direct.status === 'на связи';
    const taskReady = ['активна', 'вход активен', 'идёт синхронизация'].includes(taskStore.status);
    const agentReady = /на связи|доверено|системное|готов/i.test(agent.status) && !/не проверено|не найден/i.test(agent.status);
    return [
      this.liveRuntimeCheck('webapp', 'WebApp', 'ready', `${window.location.host || 'локально'} открыт; UI работает в браузере.`, { action: 'open_system' }),
      this.liveRuntimeCheck('direct_bridge', 'Мост сайт-ПК', directReady ? 'partial' : 'manual_check', direct.note, { action: 'refresh', source: 'direct_mode_snapshot' }),
      this.liveRuntimeCheck('task_store', 'Общее хранилище задач', taskReady ? 'partial' : 'manual_check', taskStore.note, { action: 'sync_taskstore', source: 'task_store_snapshot', task_count: this.taskStoreLastTaskCount }),
      this.liveRuntimeCheck('local_agent', 'Локальный агент', agentReady ? 'partial' : 'manual_check', agent.note, { action: 'open_diagnostics', source: 'device_registry' }),
      this.liveRuntimeCheck('pwa', 'PWA / offline shell', pwa.serviceWorker === 'registered' ? 'ready' : 'review', `Service Worker: ${pwa.serviceWorker}; режим: ${pwa.displayMode}.`, { action: 'open_pwa', source: 'pwa_runtime' }),
      this.liveRuntimeCheck('guardian', 'Guardian', guardian.tone === 'danger' ? 'blocked' : guardian.tone === 'review' ? 'review' : 'ready', guardian.note, { action: 'open_guardian', source: 'guardian_state' })
    ];
  },

  buildLiveRuntimeSnapshot() {
    const stored = this.normalizeLiveRuntimeState(this.liveRuntimeState || this.defaultLiveRuntimeState());
    const checks = stored.checks.length ? stored.checks : this.buildLiveRuntimeFallbackChecks();
    const next = this.liveRuntimeNextFromChecks(checks);
    const blocked = checks.some((check) => ['blocked', 'failed'].includes(check.status));
    const review = checks.some((check) => ['partial', 'review', 'manual_check', 'checking', 'not_checked'].includes(check.status));
    const score = stored.checks.length
      ? stored.score
      : Math.round(checks.reduce((sum, check) => sum + this.liveRuntimeCheckScore(check.status), 0) / Math.max(1, checks.length));
    return {
      ...stored,
      status: this.liveRuntimeChecking ? 'checking' : blocked ? 'blocked' : review ? 'review' : 'ready',
      label: this.liveRuntimeChecking
        ? 'проверяется'
        : blocked
          ? 'есть блокер'
          : review
            ? 'требует проверки'
            : 'живой контур готов',
      score,
      summary: this.liveRuntimeSummaryFromChecks(checks),
      next,
      checks
    };
  },

  async probePublicRuntimeHealth() {
    const baseUrl = getConfiguredDirectBridgeBaseUrl();
    if (!baseUrl) return null;
    try {
      const params = new URLSearchParams({ agent_id: this.getPrimaryOwnedAgentId() });
      const result = await directBridgeRequest(baseUrl, `/public/runtime-health?${params.toString()}`, {
        method: 'GET',
        skipAuth: true,
        idempotent: true,
        preferFrame: true,
        allowPopup: false,
        timeoutMs: LIVE_RUNTIME_CHECK_TIMEOUT_MS
      });
      this.publicRuntimeHealth = result?.ok ? result : null;
      if (this.publicRuntimeHealth) await this.applyPublicRuntimeHealthToOwnedRegistry(this.publicRuntimeHealth);
      return this.publicRuntimeHealth;
    } catch {
      this.publicRuntimeHealth = null;
      return null;
    }
  },

  publicRuntimeHeartbeatSummary() {
    const heartbeat = this.publicRuntimeHealth?.agent_heartbeat;
    if (!heartbeat || heartbeat.status === 'missing') return null;
    const ageMs = Number.isFinite(Number(heartbeat.age_ms)) ? Number(heartbeat.age_ms) : null;
    const ageText = ageMs === null ? 'возраст неизвестен' : `последний сигнал ${this.formatDuration(ageMs)} назад`;
    const agent = heartbeat.agent_id || 'локальный агент';
    return {
      status: heartbeat.status,
      stale: Boolean(heartbeat.stale),
      note: `${agent}: ${heartbeat.status === 'online' ? 'heartbeat активен' : 'heartbeat устарел'}; ${ageText}; storage=${heartbeat.storage_root_status || 'unknown'}`,
      age_ms: ageMs,
      version: heartbeat.version || ''
    };
  },

  async probeLiveBridgeHealth() {
    const baseUrl = getConfiguredDirectBridgeBaseUrl();
    if (!baseUrl) {
      return this.liveRuntimeCheck('direct_bridge', 'Мост сайт-ПК', 'failed', 'Direct Bridge URL не задан в конфигурации WebApp.', { action: 'open_diagnostics', source: 'bridge_health' });
    }
    let host = baseUrl;
    try { host = new URL(baseUrl).host; } catch {}
    const started = performance.now();
    const publicHealth = await this.probePublicRuntimeHealth();
    const publicLatency = Math.round(performance.now() - started);
    if (publicHealth?.ok) {
      const queue = publicHealth.command_queue || {};
      const taskStore = publicHealth.task_store || {};
      const heartbeat = publicHealth.agent_heartbeat || {};
      const bridgeStatus = publicHealth.status === 'ready' ? 'ready' : 'partial';
      const note = `${host}: публичный read-only статус получен за ${publicLatency} мс; очередь=${queue.status || 'unknown'}; хранилище=${taskStore.status || 'unknown'}; агент=${heartbeat.status || 'missing'}.`;
      return this.liveRuntimeCheck('direct_bridge', 'Мост сайт-ПК', bridgeStatus, note, { action: 'open_diagnostics', source: 'public_runtime_health', latency_ms: publicLatency });
    }

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), LIVE_RUNTIME_CHECK_TIMEOUT_MS);
    try {
      const bridgeOrigin = (() => {
        try { return new URL(baseUrl).origin; } catch { return ''; }
      })();
      const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/health`, {
        method: 'GET',
        mode: bridgeOrigin && bridgeOrigin !== window.location.origin ? 'no-cors' : 'cors',
        signal: controller.signal,
        cache: 'no-store'
      });
      const latency = Math.round(performance.now() - started);
      if (response.type === 'opaque') {
        return this.liveRuntimeCheck('direct_bridge', 'Мост сайт-ПК', 'partial', `${host}: браузер достучался до адреса проверки здоровья за ${latency} мс, но не может прочитать ответ из-за cross-origin режима. Глубокую проверку показывает Диагност.`, { action: 'open_diagnostics', source: 'bridge_health', latency_ms: latency });
      }
      if (!response.ok) {
        return this.liveRuntimeCheck('direct_bridge', 'Мост сайт-ПК', 'review', `${host} ответил HTTP ${response.status}. Настройки не менялись.`, { action: 'open_diagnostics', source: 'bridge_health', latency_ms: latency });
      }
      let detail = '';
      try {
        const data = await response.clone().json();
        detail = `${data?.service || 'bridge'}; storage=${data?.storage || 'unknown'}; TaskStore=${data?.task_store || 'unknown'}`;
      } catch {
        detail = 'health ответ получен, JSON не разобран';
      }
      return this.liveRuntimeCheck('direct_bridge', 'Мост сайт-ПК', 'ready', `${host}: ${latency} мс; ${detail}.`, { action: 'open_diagnostics', source: 'bridge_health', latency_ms: latency });
    } catch (error) {
      const latency = Math.round(performance.now() - started);
      return this.liveRuntimeCheck('direct_bridge', 'Мост сайт-ПК', 'review', `${host}: read-only health check не завершился (${error?.name || 'fetch_error'}).`, { action: 'open_diagnostics', source: 'bridge_health', latency_ms: latency });
    } finally {
      window.clearTimeout(timer);
    }
  },

  async probeLiveTaskStoreSummary() {
    const baseUrl = getConfiguredDirectBridgeBaseUrl();
    if (!baseUrl) {
      return this.liveRuntimeCheck('task_store', 'Общее хранилище задач', 'failed', 'Нет Direct Bridge URL, поэтому TaskStore недоступен.', { action: 'open_diagnostics', source: 'task_store_live' });
    }
    const token = getStoredOwnerSession(baseUrl)?.token;
    const publicTaskStore = this.publicRuntimeHealth?.task_store;
    if (publicTaskStore?.status === 'ready' && !token) {
      const publicCount = Number.isFinite(Number(publicTaskStore.task_count)) ? Number(publicTaskStore.task_count) : this.taskStoreLastTaskCount;
      return this.liveRuntimeCheck('task_store', 'Общее хранилище задач', 'partial', `Хранилище задач отвечает публичным read-only статусом: ${publicCount ?? 'неизвестно'} задач. Для полной синхронизации нужен вход владельца.`, { action: 'sync_taskstore', source: 'public_runtime_health', task_count: publicCount });
    }
    if (!token) {
      return this.liveRuntimeCheck('task_store', 'Общее хранилище задач', 'manual_check', 'Нужен вход владельца. Нажмите “Синхронизировать хранилище задач”.', { action: 'sync_taskstore', source: 'task_store_live', task_count: this.taskStoreLastTaskCount });
    }
    const started = performance.now();
    try {
      const result = await directTaskStoreRequest('/tasks', {
        method: 'GET',
        token,
        interactive: false,
        timeoutMs: LIVE_RUNTIME_CHECK_TIMEOUT_MS
      });
      const latency = Math.round(performance.now() - started);
      if (result?.ok === false || result?.reason) {
        return this.liveRuntimeCheck('task_store', 'Общее хранилище задач', result.reason === 'owner_session_required' ? 'manual_check' : 'review', result.message || result.reason || 'TaskStore требует проверки.', { action: 'sync_taskstore', source: 'task_store_live', latency_ms: latency, task_count: this.taskStoreLastTaskCount });
      }
      const count = Array.isArray(result?.tasks)
        ? result.tasks.length
        : Number.isFinite(Number(result?.total ?? result?.count))
          ? Number(result.total ?? result.count)
          : Number(this.taskStoreLastTaskCount || (this.workTasks || []).length);
      return this.liveRuntimeCheck('task_store', 'Общее хранилище задач', 'ready', `TaskStore отвечает: ${count} задач; ${latency} мс.`, { action: 'sync_taskstore', source: 'task_store_live', latency_ms: latency, task_count: count });
    } catch (error) {
      const latency = Math.round(performance.now() - started);
      return this.liveRuntimeCheck('task_store', 'Общее хранилище задач', 'review', `TaskStore read-only check не завершился: ${error?.message || error?.name || 'fetch_error'}.`, { action: 'sync_taskstore', source: 'task_store_live', latency_ms: latency, task_count: this.taskStoreLastTaskCount });
    }
  },

  probeLiveLocalAgentSummary() {
    const heartbeat = this.publicRuntimeHeartbeatSummary();
    if (heartbeat) {
      return this.liveRuntimeCheck('local_agent', 'Локальный агент', heartbeat.status === 'online' && !heartbeat.stale ? 'ready' : 'review', heartbeat.note, { action: 'open_diagnostics', source: 'agent_heartbeat', latency_ms: heartbeat.age_ms });
    }

    const agent = this.localAgentStatusSnapshot();
    const ready = /на связи|доверено|системное|готов/i.test(agent.status) && !/не проверено|не найден/i.test(agent.status);
    const status = ready ? 'partial' : 'manual_check';
    return this.liveRuntimeCheck('local_agent', 'Локальный агент', status, `${agent.note}. Это статус из реестра устройств; прямой системный ping будет через слой проверки локального агента.`, { action: 'open_diagnostics', source: 'device_registry' });
  },

  probeLivePwaSummary() {
    const pwa = this.pwaSnapshot();
    const status = pwa.serviceWorker === 'registered' ? 'ready' : pwa.serviceWorker === 'failed' ? 'review' : 'partial';
    return this.liveRuntimeCheck('pwa', 'PWA / offline shell', status, `Установка: ${pwa.installLabel}; Service Worker: ${pwa.serviceWorker}; режим: ${pwa.displayMode}.`, { action: 'open_pwa', source: 'pwa_runtime' });
  },

  probeLiveGuardianSummary() {
    const guardian = this.guardianSnapshot();
    const status = guardian.tone === 'danger' ? 'blocked' : guardian.tone === 'review' ? 'review' : 'ready';
    return this.liveRuntimeCheck('guardian', 'Guardian', status, `${guardian.note}; incidents: ${guardian.openIncidents.length}.`, { action: 'open_guardian', source: 'guardian_state' });
  },

  async refreshLiveRuntimeBinding(options = {}) {
    if (this.liveRuntimeChecking) return this.buildLiveRuntimeSnapshot();
    this.liveRuntimeChecking = true;
    this.renderSystemLiveRuntimePanel();
    try {
      const webappCheck = this.liveRuntimeCheck('webapp', 'WebApp', 'ready', `${window.location.host || 'локально'} открыт; экран и runtime state доступны.`, { action: 'open_system', source: 'browser_runtime' });
      this.publicRuntimeHealth = null;
      const bridgeCheck = await this.probeLiveBridgeHealth();
      const taskStoreCheck = await this.probeLiveTaskStoreSummary();
      const checks = [
        webappCheck,
        bridgeCheck,
        taskStoreCheck,
        this.probeLiveLocalAgentSummary(),
        this.probeLivePwaSummary(),
        this.probeLiveGuardianSummary()
      ];
      const score = Math.round(checks.reduce((sum, check) => sum + this.liveRuntimeCheckScore(check.status), 0) / Math.max(1, checks.length));
      const next = this.liveRuntimeNextFromChecks(checks);
      const blocked = checks.some((check) => ['blocked', 'failed'].includes(check.status));
      const review = checks.some((check) => ['partial', 'review', 'manual_check', 'not_checked'].includes(check.status));
      const checkedAt = new Date().toISOString();
      this.liveRuntimeState = this.normalizeLiveRuntimeState({
        status: blocked ? 'blocked' : review ? 'review' : 'ready',
        score,
        checked_at: checkedAt,
        next_action: next.action,
        next_label: next.name,
        checks,
        bridge_latency_ms: bridgeCheck.latency_ms,
        task_count: taskStoreCheck.task_count,
        last_error: checks.find((check) => ['blocked', 'failed', 'review'].includes(check.status))?.note || '',
        history: [
          {
            checked_at: checkedAt,
            status: blocked ? 'blocked' : review ? 'review' : 'ready',
            score,
            summary: this.liveRuntimeSummaryFromChecks(checks)
          },
          ...((this.liveRuntimeState?.history || []).slice(0, 19))
        ]
      });
      this.saveLiveRuntimeState();
      this.updateObservabilitySample();
      if (!options.silent) this.toast(`Живой контур: ${score}%`);
    } finally {
      this.liveRuntimeChecking = false;
      this.renderMissionControl();
      this.renderSystemStatus();
      this.renderMinaSystemScheme();
    }
    return this.buildLiveRuntimeSnapshot();
  },

  async handleLiveRuntimeAction(action) {
    const scrollTo = (id) => {
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    };
    if (action === 'refresh' || action === 'run') {
      await this.refreshLiveRuntimeBinding();
      return;
    }
    if (action === 'sync_taskstore') {
      await this.syncTaskStore({ interactive: true, reason: 'live_runtime_manual_sync' });
      await this.refreshLiveRuntimeBinding({ silent: true });
      return;
    }
    if (action === 'open_diagnostics') {
      this.go('system');
      scrollTo('system-diagnostics');
      return;
    }
    if (action === 'open_guardian') {
      this.go('system');
      scrollTo('system-guardian-panel');
      return;
    }
    if (action === 'open_pwa') {
      this.go('system');
      scrollTo('system-pwa-panel');
      return;
    }
    if (action === 'open_integration') {
      this.go('system');
      scrollTo('system-integration-panel');
      return;
    }
    this.go('system');
    scrollTo('system-live-runtime-panel');
  },

  defaultMemorySearchState() {
    return {
      schema_version: MEMORY_SEARCH_SCHEMA_VERSION,
      index_version: MEMORY_SEARCH_INDEX_VERSION,
      status: 'not_indexed',
      records: [],
      results: [],
      query: '',
      context_pack: '',
      stats: {
        total_records: 0,
        projects: 0,
        tasks: 0,
        artifacts: 0,
        evidence: 0,
        memory: 0,
        research: 0,
        brain_answers: 0
      },
      warnings: [],
      last_indexed_at: '',
      last_query_at: ''
    };
  },

  normalizeMemorySearchState(state) {
    const fallback = this.defaultMemorySearchState();
    const source = state && typeof state === 'object' ? state : {};
    return {
      ...fallback,
      ...source,
      schema_version: MEMORY_SEARCH_SCHEMA_VERSION,
      index_version: MEMORY_SEARCH_INDEX_VERSION,
      records: Array.isArray(source.records) ? source.records.slice(0, MEMORY_SEARCH_MAX_RECORDS) : [],
      results: Array.isArray(source.results) ? source.results.slice(0, MEMORY_SEARCH_RESULT_LIMIT) : [],
      warnings: Array.isArray(source.warnings) ? source.warnings.slice(0, 40) : [],
      stats: { ...fallback.stats, ...(source.stats || {}) },
      query: String(source.query || ''),
      context_pack: String(source.context_pack || '')
    };
  },

  async loadMemorySearchState() {
    const fallback = this.normalizeMemorySearchState(this.readJsonStorage(MEMORY_SEARCH_STATE_STORAGE_KEY, null));
    try {
      const indexedRecords = this.taskRuntimeDb
        ? await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.MEMORY_INDEX)
        : [];
      this.memorySearchState = this.normalizeMemorySearchState({
        ...fallback,
        records: indexedRecords.length ? indexedRecords : fallback.records
      });
    } catch {
      this.memorySearchState = fallback;
    }

    if (!this.memorySearchState.records.length) {
      await this.refreshMemorySearchIndex({ silent: true, render: false });
    }
  },

  async saveMemorySearchState() {
    const state = this.normalizeMemorySearchState(this.memorySearchState);
    this.memorySearchState = state;
    const storageCopy = {
      ...state,
      records: state.records.slice(0, this.taskRuntimeDb ? 80 : 160),
      context_pack: state.context_pack.slice(0, 10000)
    };
    this.writeJsonStorage(MEMORY_SEARCH_STATE_STORAGE_KEY, storageCopy);
    if (this.taskRuntimeDb) {
      await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.MEMORY_INDEX, state.records);
    }
  },

  memorySearchSnapshot() {
    const state = this.memorySearchState || this.defaultMemorySearchState();
    const count = state.records?.length || 0;
    const status = count ? (state.warnings?.length ? 'review' : 'ready') : 'not_indexed';
    const indexAge = state.last_indexed_at ? Date.now() - new Date(state.last_indexed_at).getTime() : Number.POSITIVE_INFINITY;
    const stale = Number.isFinite(indexAge) && indexAge > 24 * 60 * 60 * 1000;
    return {
      status: stale && count ? 'stale' : status,
      label: count ? `${count} записей` : 'индекс не собран',
      note: stale
        ? 'индекс старше суток, лучше пересобрать'
        : count
          ? `последняя сборка: ${this.formatTaskTime(state.last_indexed_at)}`
          : 'нажмите “Пересобрать индекс”',
      tone: status === 'ready' && !stale ? 'pass' : 'review',
      count,
      stats: state.stats || {},
      warnings: state.warnings || []
    };
  },

  defaultEyesVisualState() {
    return {
      schema_version: EYES_VISUAL_SCHEMA_VERSION,
      status: 'not_started',
      checks: [],
      last_checked_at: '',
      last_task_id: '',
      warnings: []
    };
  },

  normalizeEyesVisualCheck(check) {
    const now = new Date().toISOString();
    const source = check && typeof check === 'object' ? check : {};
    const mode = EYES_VISUAL_MODE_BY_ID[source.mode] ? source.mode : 'manual';
    const status = ['ready', 'needs_review', 'blocked', 'draft'].includes(source.status) ? source.status : 'ready';
    const checklist = Array.isArray(source.checklist)
      ? source.checklist.map((item) => ({
          id: String(item.id || ''),
          label: String(item.label || ''),
          status: ['pass', 'review', 'missing'].includes(item.status) ? item.status : 'review'
        })).filter((item) => item.id && item.label)
      : EYES_VISUAL_CHECKLIST.map(([id, label]) => ({ id, label, status: id === 'screenshot_ref' && !source.screenshot_ref ? 'missing' : 'review' }));
    return {
      check_id: source.check_id || this.generateWorkspaceId('EYES'),
      task_id: source.task_id || '',
      project_id: source.project_id || '',
      mode,
      target: String(source.target || ''),
      screenshot_ref: String(source.screenshot_ref || ''),
      notes: String(source.notes || ''),
      status,
      privacy_status: source.privacy_status || 'clean',
      privacy_summary: source.privacy_summary || 'clean',
      checklist,
      artifact_id: source.artifact_id || '',
      storage_ref: source.storage_ref && typeof source.storage_ref === 'object' ? source.storage_ref : null,
      created_at: source.created_at || now,
      updated_at: source.updated_at || source.created_at || now
    };
  },

  normalizeEyesVisualState(state) {
    const fallback = this.defaultEyesVisualState();
    const source = state && typeof state === 'object' ? state : {};
    const checks = Array.isArray(source.checks)
      ? source.checks.map((check) => this.normalizeEyesVisualCheck(check)).slice(0, EYES_VISUAL_MAX_CHECKS)
      : [];
    const warnings = Array.isArray(source.warnings) ? source.warnings.slice(0, 20).map(String) : [];
    return {
      ...fallback,
      ...source,
      schema_version: EYES_VISUAL_SCHEMA_VERSION,
      status: checks.length ? (warnings.length ? 'review' : 'ready') : (source.status || 'not_started'),
      checks,
      warnings,
      last_checked_at: source.last_checked_at || checks[0]?.created_at || '',
      last_task_id: source.last_task_id || checks[0]?.task_id || ''
    };
  },

  loadEyesVisualState() {
    this.eyesVisualState = this.normalizeEyesVisualState(this.readJsonStorage(EYES_VISUAL_STATE_STORAGE_KEY, null));
  },

  saveEyesVisualState() {
    this.eyesVisualState = this.normalizeEyesVisualState(this.eyesVisualState);
    this.writeJsonStorage(EYES_VISUAL_STATE_STORAGE_KEY, {
      ...this.eyesVisualState,
      checks: this.eyesVisualState.checks.slice(0, EYES_VISUAL_MAX_CHECKS)
    });
  },

  eyesVisualSnapshot() {
    const state = this.normalizeEyesVisualState(this.eyesVisualState || this.defaultEyesVisualState());
    const workerReports = (this.guardianWorkerReports || []).filter((report) => String(report.worker_id || '').includes('eyes'));
    const checks = state.checks || [];
    const taskChecks = (this.workTasks || []).flatMap((task) => Array.isArray(task.eyes_visual_checks) ? task.eyes_visual_checks : []);
    const totalChecks = checks.length + taskChecks.filter((check) => !checks.some((item) => item.check_id === check.check_id)).length;
    const latest = checks[0] || taskChecks.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))[0] || null;
    const hasReview = checks.some((check) => check.status !== 'ready') || state.warnings.length;
    const status = totalChecks ? (hasReview ? 'review' : 'ready') : (workerReports.length ? 'partial' : 'not_started');
    const readiness = status === 'ready' ? 82 : status === 'review' ? 66 : status === 'partial' ? 58 : 38;
    const schemeStatus = status === 'ready' ? 'ready' : status === 'review' || status === 'partial' ? 'partial' : 'waiting';
    return {
      status,
      scheme_status: schemeStatus,
      readiness,
      count: totalChecks,
      latest,
      worker_reports: workerReports.length,
      tone: status === 'ready' ? 'pass' : 'review',
      label: totalChecks ? `${totalChecks} visual evidence` : workerReports.length ? 'готовность read-only' : 'ожидает фиксации',
      summary: totalChecks ? 'visual evidence создано' : workerReports.length ? 'read-only контур готов' : 'ожидает первой проверки',
      note: latest
        ? `${EYES_VISUAL_MODE_BY_ID[latest.mode] || latest.mode}: ${latest.target || 'цель не задана'}`
        : workerReports.length
          ? 'Guardian подтверждает read-only готовность; создайте первую visual evidence запись.'
          : 'Создайте первую визуальную проверку: цель, режим, скриншот/путь и вывод.',
      snapshot_source: totalChecks ? 'Eyes Visual Evidence records' : workerReports.length ? 'Guardian worker reports' : 'Eyes V1 UI-assisted state',
      checks: [
        ['Visual evidence', totalChecks ? `${totalChecks} записей` : 'нет записей'],
        ['Скриншоты', latest?.screenshot_ref ? 'есть ссылка/путь' : 'ручная ссылка ожидается'],
        ['Mobile smoke', checks.some((check) => check.mode === 'mobile') ? 'есть запись' : 'ожидает записи'],
        ['Privacy', hasReview ? 'нужна проверка' : 'clean']
      ]
    };
  },

  defaultHandsSafeState() {
    return {
      schema_version: HANDS_SAFE_ACTION_SCHEMA_VERSION,
      status: 'not_started',
      action_plans: [],
      last_plan_id: '',
      last_checked_at: '',
      warnings: []
    };
  },

  handsWorkerLabel(workerId) {
    return HANDS_WORKER_BY_ID[workerId]?.label || workerId || 'Worker не выбран';
  },

  handsRiskName(risk) {
    return HANDS_RISK_LABELS[risk] || risk || 'Нужна проверка';
  },

  handsStatusName(status) {
    return HANDS_STATUS_LABELS[status] || status || 'черновик';
  },

  controlledRuntimeActionName(actionId) {
    return CONTROLLED_RUNTIME_ACTION_BY_ID[actionId]?.label || actionId || 'Действие не выбрано';
  },

  controlledRuntimeStatusName(status) {
    return CONTROLLED_RUNTIME_STATUS_LABELS[status] || status || 'не запускался';
  },

  normalizeHandsActionPlan(plan = {}, task = null) {
    const now = new Date().toISOString();
    const source = plan && typeof plan === 'object' ? plan : {};
    const workerId = HANDS_WORKER_BY_ID[source.worker_id] ? source.worker_id : 'code_worker';
    const sourceText = [
      source.title || '',
      source.goal || '',
      source.expected_result || '',
      source.action_type || ''
    ].join('\n');
    const forbiddenDetected = this.detectForbiddenActions(sourceText);
    const blockedActions = [...new Set([
      ...(Array.isArray(source.blocked_actions) ? source.blocked_actions : []),
      ...forbiddenDetected
    ])];
    let riskLevel = HANDS_RISK_LABELS[source.risk_level] ? source.risk_level : (blockedActions.length ? 'approval_required' : 'review');
    if (riskLevel === 'safe' && blockedActions.length) riskLevel = 'review';
    const approvalRequired = Boolean(
      source.approval_required
      || blockedActions.length
      || riskLevel === 'approval_required'
      || riskLevel === 'dangerous'
    );
    const status = source.status || (riskLevel === 'dangerous'
      ? 'blocked'
      : approvalRequired
        ? 'approval_required'
        : riskLevel === 'review'
          ? 'review_required'
          : 'plan_ready');
    const safeSteps = Array.isArray(source.safe_steps) && source.safe_steps.length
      ? source.safe_steps.map(String).slice(0, 10)
      : [
          'Проверить цель действия и затрагиваемые файлы.',
          'Проверить Privacy Guard: секреты, .env, tokens, cookies не используются.',
          'Подготовить rollback point до любых изменений.',
          'Передать результат Verifier до применения.',
          'Выполнять только после Approval, если риск выше safe.'
        ];
    return {
      schema_version: HANDS_SAFE_ACTION_SCHEMA_VERSION,
      plan_id: source.plan_id || this.generateWorkspaceId('HAND'),
      task_id: source.task_id || task?.task_id || '',
      project_id: source.project_id || task?.project_id || '',
      title: String(source.title || 'Безопасный план действия'),
      goal: String(source.goal || 'цель не задана'),
      worker_id: workerId,
      worker_label: this.handsWorkerLabel(workerId),
      action_type: String(source.action_type || 'safe_worker_plan'),
      risk_level: riskLevel,
      status,
      safe_steps: safeSteps,
      blocked_actions: blockedActions,
      approval_required: approvalRequired,
      approval_id: source.approval_id || '',
      controlled_runtime_action: CONTROLLED_RUNTIME_ACTION_BY_ID[source.controlled_runtime_action] ? source.controlled_runtime_action : 'readiness_snapshot',
      controlled_runtime_status: source.controlled_runtime_status || 'not_started',
      controlled_runtime_run_ids: Array.isArray(source.controlled_runtime_run_ids) ? source.controlled_runtime_run_ids.map(String).slice(0, 12) : [],
      verifier_required: source.verifier_required !== false,
      verifier_status: source.verifier_status || 'not_checked',
      rollback_required: source.rollback_required !== undefined ? Boolean(source.rollback_required) : (approvalRequired || riskLevel === 'review'),
      rollback_plan: String(source.rollback_plan || 'До применения создать restore/backup affected files; без rollback MEDIUM/HIGH изменения не применять.'),
      execution_allowed: Boolean(source.execution_allowed && riskLevel === 'safe' && !approvalRequired && !blockedActions.length),
      execution_result: source.execution_result || 'not_executed',
      artifact_id: source.artifact_id || '',
      privacy_status: source.privacy_status || 'clean',
      privacy_summary: source.privacy_summary || 'clean',
      created_at: source.created_at || now,
      updated_at: source.updated_at || source.created_at || now
    };
  },

  normalizeHandsSafeState(state) {
    const fallback = this.defaultHandsSafeState();
    const source = state && typeof state === 'object' ? state : {};
    const plans = Array.isArray(source.action_plans)
      ? source.action_plans.map((plan) => this.normalizeHandsActionPlan(plan)).slice(0, HANDS_SAFE_ACTION_MAX_PLANS)
      : [];
    const warnings = Array.isArray(source.warnings) ? source.warnings.map(String).slice(0, 20) : [];
    return {
      ...fallback,
      ...source,
      schema_version: HANDS_SAFE_ACTION_SCHEMA_VERSION,
      status: plans.length ? (warnings.length ? 'review' : 'ready') : (source.status || 'not_started'),
      action_plans: plans,
      warnings,
      last_plan_id: source.last_plan_id || plans[0]?.plan_id || '',
      last_checked_at: source.last_checked_at || plans[0]?.updated_at || ''
    };
  },

  loadHandsSafeState() {
    this.handsSafeState = this.normalizeHandsSafeState(this.readJsonStorage(HANDS_SAFE_ACTION_STORAGE_KEY, null));
    this.activeHandsPlanId = this.handsSafeState.last_plan_id || '';
  },

  saveHandsSafeState() {
    this.handsSafeState = this.normalizeHandsSafeState(this.handsSafeState || this.defaultHandsSafeState());
    this.writeJsonStorage(HANDS_SAFE_ACTION_STORAGE_KEY, {
      ...this.handsSafeState,
      action_plans: this.handsSafeState.action_plans.slice(0, HANDS_SAFE_ACTION_MAX_PLANS)
    });
  },

  defaultControlledWorkerRuntimeState() {
    return {
      schema_version: CONTROLLED_WORKER_RUNTIME_SCHEMA_VERSION,
      status: 'not_started',
      runs: [],
      last_run_id: '',
      last_checked_at: '',
      policy: {
        execution_mode: 'browser_controlled_allowlist',
        shell_execution: false,
        active_project_write: false,
        dangerous_actions: 'blocked',
        approval_required_above_low: true,
        rollback_required_for_state_mutation: true,
        verifier_required: true
      }
    };
  },

  normalizeControlledWorkerRun(run = {}) {
    const now = new Date().toISOString();
    const source = run && typeof run === 'object' ? run : {};
    const actionId = CONTROLLED_RUNTIME_ACTION_BY_ID[source.action_type] ? source.action_type : 'readiness_snapshot';
    const status = CONTROLLED_RUNTIME_STATUS_LABELS[source.status] ? source.status : 'not_started';
    return {
      schema_version: CONTROLLED_WORKER_RUNTIME_SCHEMA_VERSION,
      run_id: source.run_id || this.generateWorkspaceId('RUN'),
      plan_id: source.plan_id || '',
      task_id: source.task_id || '',
      project_id: source.project_id || '',
      worker_id: HANDS_WORKER_BY_ID[source.worker_id] ? source.worker_id : 'system_worker',
      action_type: actionId,
      status,
      risk_level: HANDS_RISK_LABELS[source.risk_level] ? source.risk_level : 'safe',
      gate_status: source.gate_status || (status === 'blocked' ? 'blocked' : 'pass'),
      gate_reasons: Array.isArray(source.gate_reasons) ? source.gate_reasons.map(String).slice(0, 12) : [],
      output_summary: String(source.output_summary || ''),
      output: source.output && typeof source.output === 'object' ? source.output : {},
      rollback_point: source.rollback_point && typeof source.rollback_point === 'object' ? source.rollback_point : null,
      verifier_status: source.verifier_status || 'not_checked',
      evidence_refs: Array.isArray(source.evidence_refs) ? source.evidence_refs.map(String).slice(0, 20) : [],
      no_shell: source.no_shell !== false,
      no_active_project_write: source.no_active_project_write !== false,
      no_ai_api: source.no_ai_api !== false,
      created_at: source.created_at || now,
      updated_at: source.updated_at || source.created_at || now
    };
  },

  normalizeControlledWorkerRuntimeState(state = {}) {
    const fallback = this.defaultControlledWorkerRuntimeState();
    const source = state && typeof state === 'object' ? state : {};
    const runs = Array.isArray(source.runs)
      ? source.runs.map((run) => this.normalizeControlledWorkerRun(run)).slice(0, CONTROLLED_WORKER_RUNTIME_MAX_RUNS)
      : [];
    return {
      ...fallback,
      ...source,
      schema_version: CONTROLLED_WORKER_RUNTIME_SCHEMA_VERSION,
      status: runs.length ? (runs.some((run) => run.status === 'blocked') ? 'review' : 'ready') : (source.status || 'not_started'),
      runs,
      last_run_id: source.last_run_id || runs[0]?.run_id || '',
      last_checked_at: source.last_checked_at || runs[0]?.updated_at || '',
      policy: {
        ...fallback.policy,
        ...(source.policy && typeof source.policy === 'object' ? source.policy : {})
      }
    };
  },

  loadControlledWorkerRuntimeState() {
    this.controlledWorkerRuntimeState = this.normalizeControlledWorkerRuntimeState(this.readJsonStorage(CONTROLLED_WORKER_RUNTIME_STORAGE_KEY, null));
    this.activeControlledRunId = this.controlledWorkerRuntimeState.last_run_id || '';
  },

  saveControlledWorkerRuntimeState() {
    this.controlledWorkerRuntimeState = this.normalizeControlledWorkerRuntimeState(this.controlledWorkerRuntimeState || this.defaultControlledWorkerRuntimeState());
    this.writeJsonStorage(CONTROLLED_WORKER_RUNTIME_STORAGE_KEY, {
      ...this.controlledWorkerRuntimeState,
      runs: this.controlledWorkerRuntimeState.runs.slice(0, CONTROLLED_WORKER_RUNTIME_MAX_RUNS)
    });
  },

  controlledRuntimeSnapshot() {
    const state = this.normalizeControlledWorkerRuntimeState(this.controlledWorkerRuntimeState || this.defaultControlledWorkerRuntimeState());
    const runs = state.runs || [];
    const completed = runs.filter((run) => run.status === 'completed');
    const blocked = runs.filter((run) => run.status === 'blocked' || run.gate_status === 'blocked');
    const readiness = Math.max(25, Math.min(92, 42 + (runs.length ? 18 : 0) + (completed.length ? 18 : 0) - (blocked.length ? 8 : 0)));
    return {
      status: blocked.length ? 'review' : completed.length ? 'ready' : runs.length ? 'partial' : 'not_started',
      readiness,
      count: runs.length,
      completed_count: completed.length,
      blocked_count: blocked.length,
      latest: runs[0] || null,
      label: completed.length ? `${completed.length} выполнено` : runs.length ? `${runs.length} попыток` : 'ожидает запуска',
      note: runs[0]
        ? `${this.controlledRuntimeActionName(runs[0].action_type)}: ${this.controlledRuntimeStatusName(runs[0].status)}`
        : 'Runtime выполняет только allowlist LOW-risk действия без shell, deploy, delete и active project write.'
    };
  },

  sourceOfTruthStatusName(status) {
    const names = {
      ready: 'единый контур готов',
      review: 'нужно проверить связи',
      blocked: 'есть блокер',
      stale: 'снимок устарел'
    };
    return names[status] || status || 'не проверено';
  },

  truthStatusScore(status) {
    if (status === 'ready') return 100;
    if (status === 'partial') return 76;
    if (status === 'review') return 58;
    if (status === 'blocked' || status === 'error') return 0;
    return 42;
  },

  defaultSourceOfTruthState() {
    return {
      schema_version: SOURCE_OF_TRUTH_SCHEMA_VERSION,
      status: 'review',
      score: 0,
      label: 'снимок не собран',
      summary: 'Единый источник состояния ещё не обновлялся.',
      next: {
        name: 'Проверить связи',
        action: 'refresh',
        note: 'Собрать новый снимок состояния.'
      },
      blockers: [],
      warnings: [],
      sources: [],
      counts: {
        ready: 0,
        review: 0,
        blocked: 0,
        total: 0
      },
      history: [],
      checked_at: ''
    };
  },

  normalizeSourceOfTruthState(state = {}) {
    const fallback = this.defaultSourceOfTruthState();
    const source = state && typeof state === 'object' ? state : {};
    const history = Array.isArray(source.history) ? source.history.slice(0, SOURCE_OF_TRUTH_MAX_HISTORY) : [];
    const sources = Array.isArray(source.sources) ? source.sources.map((item) => ({
      id: String(item.id || ''),
      name: String(item.name || item.id || ''),
      status: item.status || 'review',
      score: Number.isFinite(Number(item.score)) ? Math.round(Number(item.score)) : this.truthStatusScore(item.status),
      note: String(item.note || ''),
      action: item.action || 'refresh',
      owner_text: item.owner_text || this.integrationStatusName?.(item.status) || item.status || 'проверить'
    })).filter((item) => item.id) : [];
    return {
      ...fallback,
      ...source,
      schema_version: SOURCE_OF_TRUTH_SCHEMA_VERSION,
      status: source.status || fallback.status,
      score: Number.isFinite(Number(source.score)) ? Math.max(0, Math.min(100, Math.round(Number(source.score)))) : fallback.score,
      label: String(source.label || fallback.label),
      summary: String(source.summary || fallback.summary),
      next: {
        ...fallback.next,
        ...(source.next && typeof source.next === 'object' ? source.next : {})
      },
      blockers: Array.isArray(source.blockers) ? source.blockers.map(String).slice(0, 20) : [],
      warnings: Array.isArray(source.warnings) ? source.warnings.map(String).slice(0, 30) : [],
      sources,
      counts: {
        ...fallback.counts,
        ...(source.counts && typeof source.counts === 'object' ? source.counts : {})
      },
      history,
      checked_at: source.checked_at || ''
    };
  },

  loadSourceOfTruthState() {
    this.sourceOfTruthState = this.normalizeSourceOfTruthState(this.readJsonStorage(SOURCE_OF_TRUTH_STORAGE_KEY, null));
  },

  saveSourceOfTruthState() {
    this.sourceOfTruthState = this.normalizeSourceOfTruthState(this.sourceOfTruthState || this.defaultSourceOfTruthState());
    this.writeJsonStorage(SOURCE_OF_TRUTH_STORAGE_KEY, {
      ...this.sourceOfTruthState,
      history: this.sourceOfTruthState.history.slice(0, SOURCE_OF_TRUTH_MAX_HISTORY)
    });
  },

  sourceTruthItem(id, name, status, score, note, action = 'refresh', ownerText = '') {
    return {
      id,
      name,
      status,
      score: Number.isFinite(Number(score)) ? Math.max(0, Math.min(100, Math.round(Number(score)))) : this.truthStatusScore(status),
      note,
      action,
      owner_text: ownerText || this.integrationStatusName(status)
    };
  },

  buildSourceOfTruthSnapshot() {
    const tasks = this.workTasks || [];
    const integration = this.buildIntegrationSnapshot();
    const liveRuntime = this.buildLiveRuntimeSnapshot();
    const guardian = this.guardianSnapshot();
    const head = this.headStatusSnapshot();
    const memory = this.memorySearchSnapshot();
    const eyes = this.eyesVisualSnapshot();
    const hands = this.handsSnapshot();
    const runtime = this.controlledRuntimeSnapshot();
    const applyPipeline = this.controlledApplySnapshot();
    const deviceMesh = this.buildDeviceMeshSnapshot();
    const continuity = this.buildContinuitySnapshot(this.getActiveWorkTask());
    const voice = this.buildVoiceReadinessSnapshot();
    const pwa = this.pwaSnapshot();
    const companion = this.buildWindowsCompanionSnapshot();
    const taskStore = this.taskStoreStatusSnapshot();
    const direct = this.directModeStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const latestDiagnostic = (this.systemDiagnostics || [])[0] || null;
    const approvals = this.pendingApprovalRecords();
    const activeTask = this.getActiveWorkTask();
    const sourceItems = [
      this.sourceTruthItem('integration', 'Интеграция контура', integration.status, integration.score, integration.summary, integration.next?.action || 'open_integration'),
      this.sourceTruthItem('live_runtime', 'Живой контур', liveRuntime.status, liveRuntime.score, liveRuntime.summary, liveRuntime.next?.action || 'open_live_runtime'),
      this.sourceTruthItem('guardian', 'Guardian / Approval', guardian.state?.emergency_stop_active ? 'blocked' : approvals.length ? 'review' : 'ready', guardian.state?.emergency_stop_active ? 0 : approvals.length ? 64 : 92, guardian.note, approvals.length ? 'open_approval' : 'open_guardian'),
      this.sourceTruthItem('workspace', 'Рабочее / Task Runtime', this.taskRuntimeReady ? (activeTask ? 'ready' : 'partial') : 'review', this.taskRuntimeReady ? (activeTask ? 88 : 72) : 44, activeTask ? `активная задача: ${activeTask.title || activeTask.task_id}` : `${tasks.length} задач; активную задачу можно создать`, 'open_work'),
      this.sourceTruthItem('memory', 'Память / поиск', memory.status === 'ready' ? 'ready' : memory.status === 'stale' ? 'review' : 'partial', memory.status === 'ready' ? 88 : memory.count ? 72 : 56, memory.note, 'open_memory'),
      this.sourceTruthItem('head', 'Голова / Совет', head.tone === 'pass' ? 'ready' : this.mainStrategistBrain() ? 'partial' : 'review', head.tone === 'pass' ? 90 : this.mainStrategistBrain() ? 68 : 42, head.note, 'open_head'),
      this.sourceTruthItem('hands', 'Руки / Apply Pipeline', hands.status === 'ready' && applyPipeline.status === 'ready' ? 'ready' : applyPipeline.status === 'review' ? 'review' : 'partial', Math.max(hands.readiness, applyPipeline.readiness), `${hands.note}; apply: ${applyPipeline.note}`, 'open_hands'),
      this.sourceTruthItem('eyes', 'Глаза / evidence', eyes.status === 'ready' ? 'ready' : eyes.status === 'review' ? 'review' : 'partial', eyes.readiness, eyes.note, 'open_eyes'),
      this.sourceTruthItem('voice', 'Голос / intent preview', voice.score >= 86 ? 'ready' : voice.score >= 60 ? 'partial' : 'review', voice.score, voice.note, 'open_voice'),
      this.sourceTruthItem('legs', 'Ноги / Device Mesh', deviceMesh.readiness >= 78 ? 'ready' : 'review', Math.max(deviceMesh.readiness, continuity.readiness), `${deviceMesh.next}; continuity: ${continuity.next}`, 'open_devices'),
      this.sourceTruthItem('taskstore', 'TaskStore / Direct Bridge', taskStore.tone === 'synced' ? 'ready' : direct.status === 'сессия активна' ? 'partial' : 'review', taskStore.tone === 'synced' ? 88 : direct.status === 'сессия активна' ? 70 : 52, `${taskStore.note}; мост: ${direct.status}; агент: ${agent.status}`, 'open_live_runtime'),
      this.sourceTruthItem('pwa', 'PWA / mobile shell', pwa.serviceWorker === 'registered' ? 'ready' : 'partial', pwa.serviceWorker === 'registered' ? 82 : 58, `установка: ${pwa.installLabel}; offline shell: ${pwa.serviceWorker}`, 'open_pwa'),
      this.sourceTruthItem('windows_companion', 'Windows-компаньон', companion.status === 'ready' ? 'ready' : companion.status === 'blocked' ? 'blocked' : 'review', companion.score || 0, `тихий автозапуск: ${companion.autostart_silent_status}; legacy PM2: ${companion.legacy_pm2_status}; окна: ${companion.visible_window_status}`, 'open_companion'),
      this.sourceTruthItem('diagnostics', 'Диагност / incidents', latestDiagnostic ? (latestDiagnostic.status === 'pass' ? 'ready' : latestDiagnostic.status === 'fail' ? 'blocked' : 'review') : 'partial', latestDiagnostic ? (latestDiagnostic.status === 'pass' ? 86 : latestDiagnostic.status === 'fail' ? 20 : 62) : 54, latestDiagnostic ? this.diagnosticSummaryText(latestDiagnostic.checks || []) : 'последний прогон диагностики отсутствует', 'open_diagnostics'),
      this.sourceTruthItem('controlled_runtime', 'Controlled Runtime', runtime.status === 'ready' ? 'ready' : runtime.status === 'review' ? 'review' : 'partial', runtime.readiness, runtime.note, 'open_hands')
    ];
    const blockers = [];
    const warnings = [];
    sourceItems.forEach((item) => {
      if (item.status === 'blocked') blockers.push(`${item.name}: ${item.note}`);
      else if (item.status !== 'ready') warnings.push(`${item.name}: ${item.note}`);
    });
    if (guardian.state?.emergency_stop_active) blockers.unshift('Guardian: Стоп действия включён.');
    if (guardian.state?.safe_mode) warnings.unshift('Guardian: Safe Mode включён.');
    if (liveRuntime.status !== 'ready') warnings.push(`Живой контур: ${liveRuntime.summary}`);
    if (taskStore.tone !== 'synced') warnings.push(`TaskStore: ${taskStore.note}`);
    const counts = {
      ready: sourceItems.filter((item) => item.status === 'ready').length,
      review: sourceItems.filter((item) => item.status === 'review' || item.status === 'partial').length,
      blocked: sourceItems.filter((item) => item.status === 'blocked').length,
      total: sourceItems.length
    };
    const score = Math.round(sourceItems.reduce((sum, item) => sum + item.score, 0) / Math.max(1, sourceItems.length));
    const status = blockers.length ? 'blocked' : score >= 86 && counts.review <= 2 ? 'ready' : 'review';
    const nextSource = sourceItems.find((item) => item.status === 'blocked')
      || sourceItems.find((item) => item.status === 'review')
      || sourceItems.find((item) => item.status === 'partial')
      || integration.next
      || sourceItems[0];
    const previousHistory = Array.isArray(this.sourceOfTruthState?.history) ? this.sourceOfTruthState.history : [];
    return this.normalizeSourceOfTruthState({
      schema_version: SOURCE_OF_TRUTH_SCHEMA_VERSION,
      status,
      score,
      label: status === 'ready' ? 'единая правда собрана' : status === 'blocked' ? 'есть блокер' : 'нужно закрыть связи',
      summary: `${counts.ready}/${counts.total} источников готовы; ${counts.review} требуют проверки; ${counts.blocked} блокеров`,
      next: {
        name: nextSource.name || 'Проверить связи',
        action: nextSource.action || 'refresh',
        note: nextSource.note || 'Собрать актуальный снимок.'
      },
      blockers: [...new Set(blockers)].slice(0, 20),
      warnings: [...new Set(warnings)].slice(0, 30),
      sources: sourceItems,
      counts,
      checked_at: new Date().toISOString(),
      history: [
        {
          checked_at: new Date().toISOString(),
          status,
          score,
          summary: `${counts.ready}/${counts.total} ready`
        },
        ...previousHistory
      ].slice(0, SOURCE_OF_TRUTH_MAX_HISTORY)
    });
  },

  refreshSourceOfTruthSnapshot(options = {}) {
    const snapshot = this.buildSourceOfTruthSnapshot();
    this.sourceOfTruthState = snapshot;
    if (options.persist !== false) this.saveSourceOfTruthState();
    return snapshot;
  },

  currentSourceOfTruthSnapshot(options = {}) {
    if (options.refresh || !this.sourceOfTruthState?.checked_at) {
      return this.refreshSourceOfTruthSnapshot({ persist: options.persist !== false });
    }
    return this.normalizeSourceOfTruthState(this.sourceOfTruthState);
  },

  integrationStatusName(status) {
    const names = {
      ready: 'готово',
      review: 'нужно проверить',
      blocked: 'есть блокер',
      partial: 'частично'
    };
    return names[status] || status || 'не проверено';
  },

  integrationCheckScore(status) {
    if (status === 'ready') return 100;
    if (status === 'partial') return 76;
    if (status === 'blocked') return 0;
    return 58;
  },

  integrationCheck(id, name, status, note, action = 'refresh', ownerText = '') {
    return {
      id,
      name,
      status,
      note,
      action,
      owner_text: ownerText || this.integrationStatusName(status)
    };
  },

  buildIntegrationSnapshot() {
    const tasks = this.workTasks || [];
    const activeTask = this.getActiveWorkTask();
    const direct = this.directModeStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const taskStore = this.taskStoreStatusSnapshot();
    const guardian = this.guardianSnapshot();
    const head = this.headStatusSnapshot();
    const memory = this.memorySearchSnapshot();
    const eyes = this.eyesVisualSnapshot();
    const hands = this.handsSnapshot();
    const runtime = this.controlledRuntimeSnapshot();
    const applyPipeline = this.controlledApplySnapshot();
    const deviceMesh = this.buildDeviceMeshSnapshot();
    const pwa = this.pwaSnapshot();
    const liveRuntime = this.buildLiveRuntimeSnapshot();
    const approvals = this.pendingApprovalRecords();
    const verifierReady = tasks.some((task) => task.verifier_result || (task.artifacts || []).some((artifact) => artifact.type === 'VERIFIER_VERDICT'));
    const contextPackReady = tasks.some((task) => (task.artifacts || []).some((artifact) => artifact.type === 'CONTEXT_PACK'));
    const researchReady = tasks.some((task) => {
      const research = this.ensureResearchOpsState(task);
      return research.status && research.status !== 'not_started';
    });
    const councilReady = tasks.some((task) => (task.brain_answers || []).length || (task.artifacts || []).some((artifact) => artifact.type === 'BRAIN_ANSWER' || artifact.type === 'DECISION_PASSPORT'));

    const directReady = direct.status === 'сессия активна' || direct.status === 'активен' || direct.status === 'на связи';
    const agentReady = agent.status === 'на связи' || agent.status === 'connected' || agent.status === 'готов';
    const taskStoreReady = ['активна', 'вход активен', 'идёт синхронизация'].includes(taskStore.status);
    const guardianBlocked = guardian.tone === 'danger' || guardian.state?.emergency_stop_active;

    const checks = [
      this.integrationCheck(
        'workspace_task_runtime',
        'Рабочее + задачи',
        this.taskRuntimeReady && activeTask ? 'ready' : this.taskRuntimeReady ? 'partial' : 'review',
        activeTask
          ? `активная задача: ${activeTask.title || activeTask.task_id}; всего задач ${tasks.length}`
          : this.taskRuntimeReady
            ? 'локальная база задач готова, активную задачу можно создать в Рабочем'
            : 'IndexedDB недоступен, работает резервный режим',
        'open_work'
      ),
      this.integrationCheck(
        'context_verifier',
        'Context Pack + Verifier',
        contextPackReady && verifierReady ? 'ready' : contextPackReady || verifierReady ? 'partial' : 'review',
        contextPackReady && verifierReady
          ? 'пакеты и проверка уже есть в задачах'
          : contextPackReady
            ? 'пакет есть, Verifier нужно прогнать на результате'
            : verifierReady
              ? 'Verifier есть, пакет контекста можно собрать из Рабочего'
              : 'создайте задачу, соберите пакет и проверьте результат',
        'open_work'
      ),
      this.integrationCheck(
        'guardian_approval',
        'Guardian + Approval',
        guardianBlocked ? 'blocked' : approvals.length ? 'review' : 'ready',
        guardianBlocked
          ? guardian.note
          : approvals.length
            ? `${approvals.length} approval-запросов ждут решения владельца`
            : 'опасные действия блокируются, очередь approval пуста',
        approvals.length ? 'open_approval' : 'open_guardian'
      ),
      this.integrationCheck(
        'memory_search',
        'Память + поиск',
        memory.status === 'ready' ? 'ready' : memory.status === 'stale' ? 'review' : 'partial',
        memory.note,
        'open_memory'
      ),
      this.integrationCheck(
        'research_council',
        'ResearchOps + Совет',
        researchReady && councilReady ? 'ready' : researchReady || councilReady ? 'partial' : ['готова', 'готово'].includes(head.status) ? 'review' : 'partial',
        researchReady && councilReady
          ? 'исследование и ответы мозгов уже связаны с задачами'
          : head.note || 'Голова готовит Стратега, Совет и исследователей',
        'open_head'
      ),
      this.integrationCheck(
        'eyes_evidence',
        'Глаза + evidence',
        eyes.status === 'ready' ? 'ready' : eyes.status === 'review' ? 'review' : 'partial',
        eyes.note,
        'open_eyes'
      ),
      this.integrationCheck(
        'hands_runtime',
        'Руки + controlled runtime + apply gate',
        hands.status === 'ready' && runtime.status === 'ready' && applyPipeline.status === 'ready' ? 'ready' : runtime.status === 'review' || applyPipeline.status === 'review' ? 'review' : 'partial',
        `${hands.note}; runtime: ${runtime.note}; apply gate: ${applyPipeline.note}`,
        'open_hands'
      ),
      this.integrationCheck(
        'voice_workspace',
        'Голос + Рабочее',
        this.workspaceVoiceSupported ? 'ready' : 'partial',
        this.workspaceVoiceSupported
          ? 'push-to-talk доступен; опасные голосовые команды идут через Approval'
          : 'ручной transcript preview работает, браузерный микрофон зависит от устройства',
        'open_voice'
      ),
      this.integrationCheck(
        'legs_devices',
        'Ноги + устройства',
        deviceMesh.readiness >= 70 ? 'ready' : 'review',
        `${deviceMesh.readiness}% готовности; ${deviceMesh.devices.length} устройств; следующий шаг: ${deviceMesh.next}`,
        'open_devices'
      ),
      this.integrationCheck(
        'cloud_local_sync',
        'Сайт + мост + локальный контур',
        liveRuntime.status === 'ready'
          ? 'ready'
          : liveRuntime.status === 'blocked'
            ? 'blocked'
            : directReady || taskStoreReady || agentReady
              ? 'partial'
              : 'review',
        `живой контур: ${liveRuntime.score}%; ${liveRuntime.summary}; мост: ${direct.status}; задачи: ${taskStore.status}; локальный агент: ${agent.status}`,
        'open_live_runtime'
      ),
      this.integrationCheck(
        'mobile_pwa',
        'Mobile / PWA',
        pwa.installLabel === 'установлено' || pwa.serviceWorker === 'registered' ? 'ready' : 'partial',
        `установка: ${pwa.installLabel}; offline shell: ${pwa.serviceWorker}`,
        'open_pwa'
      )
    ];

    const blocked = checks.filter((check) => check.status === 'blocked');
    const review = checks.filter((check) => check.status === 'review' || check.status === 'partial');
    const ready = checks.filter((check) => check.status === 'ready');
    const score = Math.round(checks.reduce((sum, check) => sum + this.integrationCheckScore(check.status), 0) / Math.max(1, checks.length));
    const status = blocked.length ? 'blocked' : score >= 86 ? 'ready' : 'review';
    const next = blocked[0] || review[0] || checks[0];
    return {
      status,
      label: status === 'ready' ? 'контур связан' : status === 'blocked' ? 'есть блокер' : 'нужно связать хвосты',
      score,
      checked_at: new Date().toISOString(),
      summary: `${ready.length}/${checks.length} связей готовы; ${review.length} требуют проверки; ${blocked.length} блокеров`,
      next,
      checks,
      counts: {
        ready: ready.length,
        review: review.length,
        blocked: blocked.length,
        total: checks.length
      }
    };
  },

  evaluateControlledRuntimeGate(plan, task = null) {
    const normalized = this.normalizeHandsActionPlan(plan, task);
    const reasons = [];
    const guardian = this.guardianSnapshot();
    if (this.guardianState?.emergency_stop_active) reasons.push('Emergency Stop активен.');
    if (this.guardianState?.safe_mode || guardian.status === 'safe_mode') reasons.push('Safe Mode активен.');
    if (normalized.risk_level !== 'safe') reasons.push('Controlled Runtime V1 допускает только LOW-risk / безопасные планы.');
    if (normalized.approval_required || normalized.approval_id) reasons.push('План требует Approval или уже связан с Approval.');
    if (normalized.blocked_actions.length) reasons.push(`Есть заблокированные действия: ${normalized.blocked_actions.join('; ')}`);
    if (normalized.privacy_status !== 'clean') reasons.push(`Privacy Guard: ${normalized.privacy_summary || normalized.privacy_status}`);
    if (!CONTROLLED_RUNTIME_ACTION_BY_ID[normalized.controlled_runtime_action]) reasons.push('Действие не входит в allowlist controlled runtime.');
    if (normalized.controlled_runtime_action === 'task_metadata_stamp' && !task) reasons.push('Для записи metadata нужна выбранная задача.');
    if (normalized.controlled_runtime_action === 'memory_index_refresh' && !this.memorySearchState) reasons.push('Memory Search ещё не инициализирован.');
    return {
      ok: reasons.length === 0,
      reasons,
      plan: normalized,
      gate_status: reasons.length ? 'blocked' : 'pass'
    };
  },

  createControlledRuntimeRollbackPoint(plan, task = null) {
    const state = this.normalizeControlledWorkerRuntimeState(this.controlledWorkerRuntimeState || this.defaultControlledWorkerRuntimeState());
    return {
      rollback_id: this.generateWorkspaceId('ROLLBACK'),
      plan_id: plan.plan_id,
      task_id: task?.task_id || plan.task_id || '',
      action_type: plan.controlled_runtime_action,
      snapshot: {
        task_updated_at: task?.updated_at || '',
        task_artifact_count: task?.artifacts?.length || 0,
        task_message_count: task?.messages?.length || 0,
        task_audit_count: task?.audit_log?.length || 0,
        runtime_run_count: state.runs.length,
        memory_indexed_at: this.memorySearchState?.last_indexed_at || '',
        guardian_report_count: this.guardianWorkerReports?.length || 0
      },
      instructions: 'Rollback V1 откатывает metadata вручную по snapshot. Active project files не менялись.',
      created_at: new Date().toISOString()
    };
  },

  async saveControlledWorkerRun(run) {
    const normalized = this.normalizeControlledWorkerRun(run);
    if (!this.controlledWorkerRuntimeState) this.controlledWorkerRuntimeState = this.defaultControlledWorkerRuntimeState();
    this.controlledWorkerRuntimeState.runs = Array.isArray(this.controlledWorkerRuntimeState.runs) ? this.controlledWorkerRuntimeState.runs : [];
    const index = this.controlledWorkerRuntimeState.runs.findIndex((item) => item.run_id === normalized.run_id);
    if (index >= 0) this.controlledWorkerRuntimeState.runs[index] = normalized;
    else this.controlledWorkerRuntimeState.runs.unshift(normalized);
    this.controlledWorkerRuntimeState.last_run_id = normalized.run_id;
    this.controlledWorkerRuntimeState.last_checked_at = normalized.updated_at;
    this.controlledWorkerRuntimeState.status = normalized.status === 'completed' ? 'ready' : normalized.status === 'blocked' ? 'review' : 'running';
    this.activeControlledRunId = normalized.run_id;
    this.saveControlledWorkerRuntimeState();
    return normalized;
  },

  async runControlledWorkerPlan(plan, task = null) {
    const gate = this.evaluateControlledRuntimeGate(plan, task);
    const now = new Date().toISOString();
    const baseRun = {
      run_id: this.generateWorkspaceId('RUN'),
      plan_id: gate.plan.plan_id,
      task_id: task?.task_id || gate.plan.task_id || '',
      project_id: task?.project_id || gate.plan.project_id || '',
      worker_id: gate.plan.worker_id,
      action_type: gate.plan.controlled_runtime_action,
      risk_level: gate.plan.risk_level,
      gate_status: gate.gate_status,
      gate_reasons: gate.reasons,
      created_at: now,
      updated_at: now
    };

    if (!gate.ok) {
      const blockedRun = await this.saveControlledWorkerRun({
        ...baseRun,
        status: 'blocked',
        output_summary: 'Controlled Runtime заблокировал выполнение: нужен safe-план без Approval, секретов и опасных действий.',
        verifier_status: 'blocked_by_guardian'
      });
      gate.plan.controlled_runtime_status = 'blocked';
      gate.plan.execution_allowed = false;
      gate.plan.execution_result = 'blocked_by_controlled_runtime';
      gate.plan.controlled_runtime_run_ids = [...new Set([blockedRun.run_id, ...(gate.plan.controlled_runtime_run_ids || [])])].slice(0, 12);
      await this.saveHandsActionPlan(gate.plan, task);
      return blockedRun;
    }

    const rollbackPoint = this.createControlledRuntimeRollbackPoint(gate.plan, task);
    let output = {};
    let summary = '';
    const evidenceRefs = [];

    if (gate.plan.controlled_runtime_action === 'readiness_snapshot') {
      const guardian = this.guardianSnapshot();
      const hands = this.handsSnapshot();
      const memory = this.memorySearchState || {};
      output = {
        guardian: guardian.label,
        hands: hands.label,
        tasks: (this.workTasks || []).length,
        approvals: (this.approvalRecords || []).length,
        memory_records: memory.records?.length || 0,
        direct_bridge: this.taskStoreSyncStatus || 'not_connected'
      };
      summary = `Снимок готовности собран: задач ${output.tasks}, approval ${output.approvals}, memory records ${output.memory_records}.`;
    } else if (gate.plan.controlled_runtime_action === 'memory_index_refresh') {
      await this.refreshMemorySearchIndex({ silent: true, render: false });
      output = {
        records: this.memorySearchState?.records?.length || 0,
        warnings: this.memorySearchState?.warnings?.length || 0,
        indexed_at: this.memorySearchState?.last_indexed_at || ''
      };
      summary = `Индекс памяти обновлён: ${output.records} записей, предупреждений ${output.warnings}.`;
    } else if (gate.plan.controlled_runtime_action === 'worker_readiness_report') {
      const report = await this.saveGuardianWorkerReport(this.buildPhase4WorkerReadinessReport());
      output = {
        report_id: report.report_id,
        status: report.status,
        checks: report.checks?.length || 0
      };
      evidenceRefs.push(report.report_id);
      summary = `Worker readiness report создан: ${report.report_id}, checks ${output.checks}.`;
    } else if (gate.plan.controlled_runtime_action === 'task_metadata_stamp' && task) {
      this.addWorkAudit(task, `Controlled Worker Runtime выполнил LOW-risk metadata stamp: ${gate.plan.title}.`);
      this.addWorkspaceMessage(task, 'worker_runtime', 'Руки Runtime', `LOW-risk действие выполнено контролируемо: ${gate.plan.title}. Файлы проекта не менялись.`);
      summary = `Metadata stamp добавлен в задачу ${task.task_id}.`;
      output = {
        task_id: task.task_id,
        audit_count: task.audit_log?.length || 0,
        message_count: task.messages?.length || 0
      };
    }

    const completedRun = await this.saveControlledWorkerRun({
      ...baseRun,
      status: 'completed',
      gate_status: 'pass',
      output,
      output_summary: summary,
      rollback_point: rollbackPoint,
      verifier_status: 'runtime_self_check_pass',
      evidence_refs: evidenceRefs,
      updated_at: new Date().toISOString()
    });

    gate.plan.controlled_runtime_status = 'completed';
    gate.plan.execution_allowed = true;
    gate.plan.execution_result = 'controlled_runtime_completed';
    gate.plan.verifier_status = 'runtime_self_check_pass';
    gate.plan.controlled_runtime_run_ids = [...new Set([completedRun.run_id, ...(gate.plan.controlled_runtime_run_ids || [])])].slice(0, 12);
    gate.plan.updated_at = completedRun.updated_at;
    await this.saveHandsActionPlan(gate.plan, task);

    if (task) {
      const content = this.buildControlledWorkerRunMarkdown(completedRun, gate.plan, task);
      const artifact = this.createArtifact(task, 'WORKER_RUNTIME_REPORT', `Runtime: ${gate.plan.title}`, summary, content, 'hands_runtime');
      artifact.status = 'verified';
      completedRun.evidence_refs = [...new Set([...(completedRun.evidence_refs || []), artifact.artifact_id])];
      await this.saveControlledWorkerRun(completedRun);
      this.saveWorkTasks();
      await this.refreshMemorySearchIndex({ silent: true, render: false });
    }

    return completedRun;
  },

  buildControlledWorkerRunMarkdown(run, plan = null, task = null) {
    const normalized = this.normalizeControlledWorkerRun(run);
    const ownerPlan = plan ? this.normalizeHandsActionPlan(plan, task) : null;
    return [
      `# Controlled Worker Runtime Report`,
      '',
      `run_id: ${normalized.run_id}`,
      `plan_id: ${normalized.plan_id}`,
      `task_id: ${task?.task_id || normalized.task_id || 'не привязано'}`,
      `worker: ${this.handsWorkerLabel(normalized.worker_id)}`,
      `action: ${this.controlledRuntimeActionName(normalized.action_type)}`,
      `status: ${this.controlledRuntimeStatusName(normalized.status)}`,
      `risk: ${this.handsRiskName(normalized.risk_level)}`,
      `gate: ${normalized.gate_status}`,
      `verifier: ${normalized.verifier_status}`,
      '',
      '## Output',
      normalized.output_summary || 'нет summary',
      '',
      '## Safety',
      `no_shell: ${normalized.no_shell}`,
      `no_active_project_write: ${normalized.no_active_project_write}`,
      `no_ai_api: ${normalized.no_ai_api}`,
      '',
      '## Rollback',
      JSON.stringify(normalized.rollback_point || {}, null, 2),
      '',
      '## Plan',
      ownerPlan ? this.buildHandsActionPlanMarkdown(ownerPlan, task) : 'План не найден.'
    ].join('\n');
  },

  renderControlledWorkerRunCard(run, options = {}) {
    const normalized = this.normalizeControlledWorkerRun(run);
    return `
      <article class="controlled-run controlled-run--${this.escapeHtml(normalized.status)}">
        <div>
          <span>${this.escapeHtml(this.controlledRuntimeActionName(normalized.action_type))} · ${this.escapeHtml(this.controlledRuntimeStatusName(normalized.status))}</span>
          <strong>${this.escapeHtml(normalized.output_summary || normalized.run_id)}</strong>
          <p>${this.escapeHtml(normalized.gate_reasons.length ? normalized.gate_reasons.join('; ') : 'Gate пройден. Shell, deploy, delete и active project write не использовались.')}</p>
          <small>${this.escapeHtml(this.formatTaskTime(normalized.created_at))} · Verifier: ${this.escapeHtml(normalized.verifier_status)}</small>
        </div>
        ${options.compact ? '' : `<button type="button" data-hands-action="copy_controlled_run" data-run-id="${this.escapeHtml(normalized.run_id)}">Скопировать</button>`}
      </article>
    `;
  },

  controlledApplyStatusName(status) {
    return CONTROLLED_APPLY_STATUS_LABELS[status] || status || 'черновик';
  },

  defaultControlledApplyPipelineState() {
    return {
      schema_version: CONTROLLED_APPLY_PIPELINE_SCHEMA_VERSION,
      status: 'not_started',
      packages: [],
      last_package_id: '',
      last_checked_at: '',
      policy: {
        active_project_write: false,
        shell_execution: false,
        direct_apply: false,
        verifier_required: true,
        rollback_required: true,
        approval_required_above_low: true,
        manual_owner_apply_only: true
      }
    };
  },

  normalizeControlledApplyCheck(check = {}) {
    return {
      name: String(check.name || 'check'),
      status: String(check.status || 'not_run'),
      note: String(check.note || '')
    };
  },

  normalizeControlledApplyPackage(pack = {}, task = null) {
    const now = new Date().toISOString();
    const source = pack && typeof pack === 'object' ? pack : {};
    const packageId = source.apply_package_id || this.generateWorkspaceId('APPLY');
    const taskId = source.task_id || task?.task_id || '';
    const projectId = source.project_id || task?.project_id || '';
    const changedFiles = Array.isArray(source.changed_files) && source.changed_files.length
      ? source.changed_files.map(String).slice(0, 20)
      : ['repair workspace diff refs only'];
    const textForScan = [
      source.title || '',
      source.source_summary || '',
      source.diff_summary || '',
      source.manual_apply_instructions || '',
      changedFiles.join('\n')
    ].join('\n');
    const privacy = this.scanPrivacyText(textForScan);
    const detectedForbidden = this.detectForbiddenActions(textForScan);
    const forbiddenActions = [...new Set([
      ...(Array.isArray(source.forbidden_actions) ? source.forbidden_actions.map(String) : []),
      ...detectedForbidden
    ])].slice(0, 20);
    const riskLevel = HANDS_RISK_LABELS[source.risk_level]
      ? source.risk_level
      : forbiddenActions.length || privacy.blocked
        ? 'approval_required'
        : 'review';
    const approvalRequired = Boolean(
      source.approval_required
      || forbiddenActions.length
      || privacy.findings.length
      || riskLevel === 'review'
      || riskLevel === 'approval_required'
      || riskLevel === 'dangerous'
    );
    const rollbackPoint = source.rollback_point && typeof source.rollback_point === 'object'
      ? source.rollback_point
      : {
          rollback_id: this.generateWorkspaceId('ROLLBACK'),
          apply_package_id: packageId,
          task_id: taskId,
          affected_files: changedFiles,
          previous_file_hashes: [],
          backup_path: `${TERMINATOR_STORAGE_ROOT}\\tasks\\${taskId || 'manual'}\\restore_points\\${packageId}`,
          status: 'prepared',
          instructions: 'Перед ручным применением сохранить affected files и откатить по этому пакету, если проверка провалится.',
          created_at: now
        };
    const checks = Array.isArray(source.checks) && source.checks.length
      ? source.checks.map((check) => this.normalizeControlledApplyCheck(check)).slice(0, 12)
      : [
          { name: 'rollback point', status: 'pass', note: rollbackPoint.rollback_id },
          { name: 'no secrets', status: privacy.findings.length ? 'review' : 'pass', note: this.privacyScanSummary(privacy) },
          { name: 'no AI API', status: /ai api|openai api|gemini api|deepseek api|openrouter/i.test(textForScan) ? 'blocked' : 'pass', note: 'AI API не используется' },
          { name: 'active project write', status: 'blocked_by_policy', note: 'Прямое изменение active project запрещено этим пакетом.' },
          { name: 'verifier', status: source.verifier_status === 'metadata_self_check_pass' ? 'pass' : 'not_run', note: source.verifier_status || 'ожидает проверки' }
        ];
    const baseStatus = CONTROLLED_APPLY_STATUS_LABELS[source.status] ? source.status : 'prepared';
    const blocked = forbiddenActions.length || privacy.blocked || checks.some((check) => ['blocked', 'fail'].includes(check.status));
    const status = blocked ? 'blocked' : baseStatus;
    return {
      schema_version: CONTROLLED_APPLY_PIPELINE_SCHEMA_VERSION,
      apply_package_id: packageId,
      plan_id: source.plan_id || '',
      task_id: taskId,
      project_id: projectId,
      source_type: source.source_type || 'hands_plan',
      title: String(source.title || 'Пакет контролируемого применения'),
      source_summary: String(source.source_summary || 'Пакет подготовлен из плана Рук. Активный проект не менялся.'),
      risk_level: riskLevel,
      status,
      changed_files: changedFiles,
      diff_summary: String(source.diff_summary || 'Diff summary не применён к active project. Пакет хранит только refs, инструкции и проверки.'),
      checks,
      rollback_point: rollbackPoint,
      verifier_status: source.verifier_status || 'not_checked',
      approval_required: approvalRequired,
      approval_id: source.approval_id || '',
      manual_apply_allowed: Boolean(source.manual_apply_allowed && !approvalRequired && !blocked),
      manual_apply_instructions: String(source.manual_apply_instructions || 'Применение выполняется отдельным ручным шагом после Verifier, rollback point и решения владельца. WebApp не пишет изменения в active project.'),
      forbidden_actions: forbiddenActions,
      privacy_status: privacy.status,
      privacy_summary: this.privacyScanSummary(privacy),
      gate_reasons: Array.isArray(source.gate_reasons) ? source.gate_reasons.map(String).slice(0, 20) : [],
      artifact_id: source.artifact_id || '',
      no_shell: source.no_shell !== false,
      no_active_project_write: source.no_active_project_write !== false,
      no_ai_api: source.no_ai_api !== false,
      created_at: source.created_at || now,
      updated_at: source.updated_at || source.created_at || now
    };
  },

  normalizeControlledApplyPipelineState(state = {}) {
    const fallback = this.defaultControlledApplyPipelineState();
    const source = state && typeof state === 'object' ? state : {};
    const packages = Array.isArray(source.packages)
      ? source.packages.map((pack) => this.normalizeControlledApplyPackage(pack)).slice(0, CONTROLLED_APPLY_PIPELINE_MAX_PACKAGES)
      : [];
    const blocked = packages.filter((pack) => pack.status === 'blocked');
    return {
      ...fallback,
      ...source,
      schema_version: CONTROLLED_APPLY_PIPELINE_SCHEMA_VERSION,
      status: blocked.length ? 'review' : packages.length ? 'ready' : (source.status || 'not_started'),
      packages,
      last_package_id: source.last_package_id || packages[0]?.apply_package_id || '',
      last_checked_at: source.last_checked_at || packages[0]?.updated_at || '',
      policy: {
        ...fallback.policy,
        ...(source.policy && typeof source.policy === 'object' ? source.policy : {})
      }
    };
  },

  loadControlledApplyPipelineState() {
    this.controlledApplyPipelineState = this.normalizeControlledApplyPipelineState(this.readJsonStorage(CONTROLLED_APPLY_PIPELINE_STORAGE_KEY, null));
    this.activeApplyPackageId = this.controlledApplyPipelineState.last_package_id || '';
  },

  saveControlledApplyPipelineState() {
    this.controlledApplyPipelineState = this.normalizeControlledApplyPipelineState(this.controlledApplyPipelineState || this.defaultControlledApplyPipelineState());
    this.writeJsonStorage(CONTROLLED_APPLY_PIPELINE_STORAGE_KEY, {
      ...this.controlledApplyPipelineState,
      packages: this.controlledApplyPipelineState.packages.slice(0, CONTROLLED_APPLY_PIPELINE_MAX_PACKAGES)
    });
  },

  collectControlledApplyPackages() {
    const globalPackages = this.controlledApplyPipelineState?.packages || [];
    const taskPackages = (this.workTasks || []).flatMap((task) => Array.isArray(task.controlled_apply_packages) ? task.controlled_apply_packages : []);
    return [...globalPackages, ...taskPackages.filter((pack) => !globalPackages.some((item) => item.apply_package_id === pack.apply_package_id))]
      .map((pack) => this.normalizeControlledApplyPackage(pack))
      .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
  },

  controlledApplySnapshot() {
    const packages = this.collectControlledApplyPackages();
    const verified = packages.filter((pack) => pack.verifier_status === 'metadata_self_check_pass');
    const blocked = packages.filter((pack) => pack.status === 'blocked');
    const approvalRequired = packages.filter((pack) => pack.approval_required && !pack.approval_id);
    const readiness = Math.max(20, Math.min(94, 38 + (packages.length ? 18 : 0) + (verified.length ? 18 : 0) - (blocked.length ? 10 : 0) - (approvalRequired.length ? 6 : 0)));
    return {
      status: blocked.length ? 'review' : verified.length ? 'ready' : packages.length ? 'partial' : 'not_started',
      readiness,
      count: packages.length,
      verified_count: verified.length,
      blocked_count: blocked.length,
      approval_required_count: approvalRequired.length,
      latest: packages[0] || null,
      label: verified.length ? `${verified.length} проверено` : packages.length ? `${packages.length} пакетов` : 'нет пакетов',
      note: packages[0]
        ? `${packages[0].title}: ${this.controlledApplyStatusName(packages[0].status)}`
        : 'Пакет применения пока не создан: нужен diff summary, rollback point, Verifier и Approval gate.'
    };
  },

  controlledApplyPackageChangedFiles(plan, task = null) {
    const normalized = this.normalizeHandsActionPlan(plan, task);
    const taskId = task?.task_id || normalized.task_id || 'manual';
    if (normalized.worker_id === 'file_worker') return [`${TERMINATOR_STORAGE_ROOT}\\tasks\\${taskId}\\files\\metadata`, `${TERMINATOR_STORAGE_ROOT}\\tasks\\${taskId}\\artifacts\\refs`];
    if (normalized.worker_id === 'code_worker') return ['repair workspace diff refs only', 'active project files: manual apply only'];
    if (normalized.worker_id === 'memory_worker') return [`${TERMINATOR_STORAGE_ROOT}\\memory\\indexes\\metadata`];
    if (normalized.worker_id === 'system_worker') return ['system status metadata only'];
    return ['task metadata / artifact refs only'];
  },

  buildControlledApplyPackageFromPlan(plan, task = null) {
    const normalized = this.normalizeHandsActionPlan(plan, task);
    const changedFiles = this.controlledApplyPackageChangedFiles(normalized, task);
    const forbidden = this.detectForbiddenActions([normalized.goal, normalized.title, normalized.blocked_actions.join('\n')].join('\n'));
    return this.normalizeControlledApplyPackage({
      apply_package_id: this.generateWorkspaceId('APPLY'),
      plan_id: normalized.plan_id,
      task_id: task?.task_id || normalized.task_id || '',
      project_id: task?.project_id || normalized.project_id || '',
      title: `Пакет применения: ${normalized.title}`,
      source_summary: `${this.handsWorkerLabel(normalized.worker_id)} · ${this.handsRiskName(normalized.risk_level)} · active project write запрещён.`,
      risk_level: normalized.risk_level === 'safe' ? 'safe' : normalized.risk_level,
      status: 'verifier_ready',
      changed_files: changedFiles,
      diff_summary: [
        `Цель: ${normalized.goal}`,
        `Worker: ${this.handsWorkerLabel(normalized.worker_id)}`,
        `Runtime action: ${this.controlledRuntimeActionName(normalized.controlled_runtime_action)}`,
        'Изменения active project не применялись. Пакет описывает безопасный путь: repair workspace -> diff review -> Verifier -> rollback -> решение владельца.'
      ].join('\n'),
      verifier_status: 'not_checked',
      approval_required: normalized.approval_required || normalized.risk_level !== 'safe' || forbidden.length > 0,
      forbidden_actions: [...new Set([...(normalized.blocked_actions || []), ...forbidden])],
      manual_apply_instructions: [
        '1. Проверить diff summary и список affected refs.',
        '2. Убедиться, что rollback point создан.',
        '3. Прогнать Verifier package check.',
        '4. Если риск выше safe — создать Approval.',
        '5. Применять только вручную или будущим Hands-слоем после отдельного подтверждения владельца.'
      ].join('\n')
    }, task);
  },

  evaluateControlledApplyPackageIntegrity(pack, task = null) {
    const normalized = this.normalizeControlledApplyPackage(pack, task);
    const reasons = [];
    const checkText = [normalized.title, normalized.source_summary, normalized.diff_summary, normalized.manual_apply_instructions, normalized.changed_files.join('\n')].join('\n');
    const privacy = this.scanPrivacyText(checkText);
    const forbidden = this.detectForbiddenActions(checkText);
    if (privacy.findings.length) reasons.push(`Privacy Guard: ${this.privacyScanSummary(privacy)}.`);
    if (forbidden.length || normalized.forbidden_actions.length) reasons.push(`Forbidden actions: ${[...new Set([...forbidden, ...normalized.forbidden_actions])].join('; ')}.`);
    if (!normalized.rollback_point?.rollback_id) reasons.push('Rollback point не создан.');
    if (!normalized.changed_files.length) reasons.push('Список affected refs пуст.');
    if (normalized.no_shell === false) reasons.push('Shell execution запрещён.');
    if (normalized.no_active_project_write === false) reasons.push('Active project write запрещён.');
    if (normalized.no_ai_api === false) reasons.push('AI API запрещён.');
    return {
      ok: reasons.length === 0,
      reasons,
      package: normalized
    };
  },

  evaluateControlledApplyGate(pack, task = null) {
    const integrity = this.evaluateControlledApplyPackageIntegrity(pack, task);
    const reasons = [...integrity.reasons];
    const guardian = this.guardianSnapshot();
    const approval = integrity.package.approval_id
      ? this.approvalRecords.find((record) => record.approval_id === integrity.package.approval_id)
      : null;
    if (this.guardianState?.emergency_stop_active) reasons.push('Emergency Stop активен.');
    if (this.guardianState?.safe_mode || guardian.status === 'safe_mode') reasons.push('Safe Mode активен.');
    if (integrity.package.verifier_status !== 'metadata_self_check_pass') reasons.push('Verifier package check не PASS.');
    if (integrity.package.approval_required && !approval) reasons.push('Нужен Approval владельца.');
    if (approval && ['manual_required', 'pending'].includes(approval.status)) reasons.push('Approval ещё ждёт решения владельца.');
    if (approval && ['denied', 'cancelled', 'expired'].includes(approval.status)) reasons.push(`Approval не разрешает применение: ${APPROVAL_STATUSES[approval.status] || approval.status}.`);
    return {
      ok: reasons.length === 0,
      reasons,
      package: integrity.package,
      gate_status: reasons.length ? 'blocked' : 'pass'
    };
  },

  async saveControlledApplyPackage(pack, task = null) {
    const normalized = this.normalizeControlledApplyPackage(pack, task);
    if (!this.controlledApplyPipelineState) this.controlledApplyPipelineState = this.defaultControlledApplyPipelineState();
    this.controlledApplyPipelineState.packages = Array.isArray(this.controlledApplyPipelineState.packages) ? this.controlledApplyPipelineState.packages : [];
    const globalIndex = this.controlledApplyPipelineState.packages.findIndex((item) => item.apply_package_id === normalized.apply_package_id);
    if (globalIndex >= 0) this.controlledApplyPipelineState.packages[globalIndex] = normalized;
    else this.controlledApplyPipelineState.packages.unshift(normalized);
    this.controlledApplyPipelineState.last_package_id = normalized.apply_package_id;
    this.controlledApplyPipelineState.last_checked_at = normalized.updated_at;
    this.controlledApplyPipelineState.status = normalized.status === 'blocked' ? 'review' : 'ready';
    this.activeApplyPackageId = normalized.apply_package_id;

    if (task) {
      task.controlled_apply_packages = Array.isArray(task.controlled_apply_packages) ? task.controlled_apply_packages : [];
      const taskIndex = task.controlled_apply_packages.findIndex((item) => item.apply_package_id === normalized.apply_package_id);
      if (taskIndex >= 0) task.controlled_apply_packages[taskIndex] = normalized;
      else task.controlled_apply_packages.unshift(normalized);
      const existingArtifact = normalized.artifact_id
        ? task.artifacts?.find((artifact) => artifact.artifact_id === normalized.artifact_id)
        : null;
      const content = this.buildControlledApplyPackageMarkdown(normalized, task);
      const artifact = existingArtifact || this.createArtifact(task, 'CONTROLLED_APPLY_PACKAGE', normalized.title, `${this.controlledApplyStatusName(normalized.status)} · ${this.handsRiskName(normalized.risk_level)}`, content, 'hands_apply');
      artifact.status = normalized.status === 'blocked' ? 'review' : 'ready';
      artifact.content = content;
      normalized.artifact_id = artifact.artifact_id;
      const savedIndex = task.controlled_apply_packages.findIndex((item) => item.apply_package_id === normalized.apply_package_id);
      if (savedIndex >= 0) task.controlled_apply_packages[savedIndex] = normalized;
      this.addWorkspaceMessage(task, 'hands_apply_package', 'Руки', `Подготовлен пакет применения: ${normalized.title}. Active project не менялся.`, {
        linked_artifacts: [artifact.artifact_id],
        linked_artifact_id: artifact.artifact_id
      });
      task.updated_at = new Date().toISOString();
      this.saveWorkTasks();
      await this.refreshMemorySearchIndex({ silent: true, render: false });
    }

    this.saveControlledApplyPipelineState();
    return normalized;
  },

  async prepareControlledApplyPackageFromPlan(plan, task = null) {
    const pack = this.buildControlledApplyPackageFromPlan(plan, task);
    return this.saveControlledApplyPackage(pack, task);
  },

  async verifyControlledApplyPackage(pack, task = null) {
    const integrity = this.evaluateControlledApplyPackageIntegrity(pack, task);
    const updated = {
      ...integrity.package,
      verifier_status: integrity.ok ? 'metadata_self_check_pass' : 'metadata_self_check_failed',
      status: integrity.ok
        ? integrity.package.approval_required
          ? 'approval_required'
          : 'approved_for_manual_apply'
        : 'blocked',
      manual_apply_allowed: integrity.ok && !integrity.package.approval_required,
      gate_reasons: integrity.reasons,
      checks: integrity.package.checks.map((check) => {
        if (check.name === 'verifier') return { ...check, status: integrity.ok ? 'pass' : 'fail', note: integrity.ok ? 'metadata self-check pass' : integrity.reasons.join('; ') };
        return check;
      }),
      updated_at: new Date().toISOString()
    };
    return this.saveControlledApplyPackage(updated, task);
  },

  async createControlledApplyApproval(pack, task = null) {
    const normalized = this.normalizeControlledApplyPackage(pack, task);
    const approval = this.createApprovalRecord({
      source: 'controlled_apply_pipeline',
      action_type: 'controlled_apply_package',
      capability_id: 'hands_apply',
      action: normalized.diff_summary,
      command: normalized.diff_summary,
      title: normalized.title,
      reason: 'Пакет применения подготовлен. Active project не менялся. Нужен осознанный переход к ручному apply после Verifier и rollback.',
      risk_level: normalized.risk_level === 'dangerous' ? 'dangerous' : 'approval_required',
      impact: 'Автоматическое применение не выполняется. Approval нужен для следующего ручного/будущего apply шага.',
      rollback_note: normalized.rollback_point?.instructions || normalized.manual_apply_instructions,
      forbidden_actions: normalized.forbidden_actions.length ? normalized.forbidden_actions : HANDS_BLOCKED_ACTIONS,
      requested_by: 'controlled_apply_pipeline'
    }, task);
    normalized.approval_required = true;
    normalized.approval_id = approval.approval_id;
    normalized.status = 'approval_required';
    normalized.updated_at = new Date().toISOString();
    await this.saveApprovalRecord(approval);
    await this.saveControlledApplyPackage(normalized, task);
    return approval;
  },

  async markControlledApplyManualApplied(pack, task = null) {
    const gate = this.evaluateControlledApplyGate(pack, task);
    const updated = {
      ...gate.package,
      status: gate.ok ? 'manual_applied' : 'blocked',
      gate_reasons: gate.reasons,
      manual_apply_allowed: gate.ok,
      updated_at: new Date().toISOString()
    };
    const saved = await this.saveControlledApplyPackage(updated, task);
    if (task) {
      this.addWorkAudit(task, gate.ok
        ? `Владелец отметил ручное применение пакета ${saved.apply_package_id}.`
        : `Ручное применение пакета ${saved.apply_package_id} заблокировано: ${gate.reasons.join('; ')}`);
      this.saveWorkTasks();
    }
    return saved;
  },

  buildControlledApplyPackageMarkdown(pack, task = null) {
    const normalized = this.normalizeControlledApplyPackage(pack, task);
    return [
      '# Controlled Apply Package',
      '',
      `apply_package_id: ${normalized.apply_package_id}`,
      `plan_id: ${normalized.plan_id || 'не привязан'}`,
      `task_id: ${task?.task_id || normalized.task_id || 'не привязано'}`,
      `status: ${this.controlledApplyStatusName(normalized.status)}`,
      `risk: ${this.handsRiskName(normalized.risk_level)}`,
      `verifier: ${normalized.verifier_status}`,
      `approval_required: ${normalized.approval_required}`,
      `approval_id: ${normalized.approval_id || 'нет'}`,
      '',
      '## Source',
      normalized.source_summary,
      '',
      '## Diff Summary',
      normalized.diff_summary,
      '',
      '## Affected Refs',
      ...normalized.changed_files.map((file) => `- ${file}`),
      '',
      '## Checks',
      ...normalized.checks.map((check) => `- ${check.name}: ${check.status}${check.note ? ` — ${check.note}` : ''}`),
      '',
      '## Rollback Point',
      JSON.stringify(normalized.rollback_point, null, 2),
      '',
      '## Manual Apply Rules',
      normalized.manual_apply_instructions,
      '',
      '## Safety',
      `no_shell: ${normalized.no_shell}`,
      `no_active_project_write: ${normalized.no_active_project_write}`,
      `no_ai_api: ${normalized.no_ai_api}`,
      `privacy: ${normalized.privacy_summary}`,
      '',
      '## Gate Reasons',
      ...(normalized.gate_reasons.length ? normalized.gate_reasons : ['Gate не запускался или блокеров нет.']).map((reason) => `- ${reason}`)
    ].join('\n');
  },

  renderControlledApplyPackageCard(pack, options = {}) {
    const normalized = this.normalizeControlledApplyPackage(pack);
    const compact = Boolean(options.compact);
    const ownerTask = this.workTasks.find((task) => task.task_id === normalized.task_id) || null;
    const gate = this.evaluateControlledApplyGate(normalized, ownerTask);
    return `
      <article class="controlled-apply controlled-apply--${this.escapeHtml(normalized.status)}">
        <div>
          <span>${this.escapeHtml(this.controlledApplyStatusName(normalized.status))} · ${this.escapeHtml(this.handsRiskName(normalized.risk_level))}</span>
          <strong>${this.escapeHtml(normalized.title)}</strong>
          <p>${this.escapeHtml(normalized.diff_summary)}</p>
          <small>Verifier: ${this.escapeHtml(normalized.verifier_status)} · Rollback: ${this.escapeHtml(normalized.rollback_point?.rollback_id || 'нет')} · Apply gate: ${gate.ok ? 'pass' : 'blocked'}</small>
          ${!compact && gate.reasons.length ? `<small>Блокеры: ${this.escapeHtml(gate.reasons.join('; '))}</small>` : ''}
        </div>
        <div class="hands-plan-actions">
          <button type="button" data-hands-action="copy_apply_package" data-apply-id="${this.escapeHtml(normalized.apply_package_id)}">Скопировать</button>
          <button type="button" data-hands-action="verify_apply_package" data-apply-id="${this.escapeHtml(normalized.apply_package_id)}">Verifier</button>
          ${normalized.approval_id ? `<button type="button" data-hands-action="open_approval" data-approval-id="${this.escapeHtml(normalized.approval_id)}">Approval</button>` : `<button type="button" data-hands-action="create_apply_approval" data-apply-id="${this.escapeHtml(normalized.apply_package_id)}">Approval</button>`}
          <button type="button" data-hands-action="mark_manual_apply" data-apply-id="${this.escapeHtml(normalized.apply_package_id)}" ${gate.ok ? '' : 'disabled'}>Отметить применённым</button>
        </div>
      </article>
    `;
  },

  handsSnapshot() {
    const state = this.normalizeHandsSafeState(this.handsSafeState || this.defaultHandsSafeState());
    const guardian = this.guardianSnapshot();
    const workerReports = (this.guardianWorkerReports || []).filter((report) => /hands|worker|codex|file|code/i.test(String(report.worker_id || report.title || '')));
    const taskPlans = (this.workTasks || []).flatMap((task) => Array.isArray(task.hands_action_plans) ? task.hands_action_plans : []);
    const allPlans = [...state.action_plans, ...taskPlans.filter((plan) => !state.action_plans.some((item) => item.plan_id === plan.plan_id))]
      .map((plan) => this.normalizeHandsActionPlan(plan))
      .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
    const approvalPlans = allPlans.filter((plan) => plan.approval_required || plan.approval_id);
    const blockedPlans = allPlans.filter((plan) => plan.status === 'blocked' || plan.risk_level === 'dangerous');
    const controlledRuntime = this.controlledRuntimeSnapshot();
    const controlledApply = this.controlledApplySnapshot();
    const emergency = this.guardianState?.safe_mode || guardian.status === 'safe_mode';
    let readiness = 48;
    if (workerReports.length) readiness += 14;
    if (allPlans.length) readiness += 14;
    if (allPlans.some((plan) => plan.verifier_required)) readiness += 8;
    if (approvalPlans.length) readiness += 6;
    if (controlledRuntime.completed_count) readiness += 6;
    if (controlledApply.verified_count) readiness += 6;
    if (emergency) readiness -= 35;
    if (blockedPlans.length) readiness -= 10;
    if (controlledApply.blocked_count) readiness -= 8;
    readiness = Math.max(15, Math.min(94, readiness));
    const status = emergency
      ? 'error'
      : allPlans.length || controlledApply.count
        ? (blockedPlans.length || controlledApply.blocked_count ? 'review' : 'ready')
        : workerReports.length
          ? 'partial'
          : 'not_started';
    const schemeStatus = status === 'ready' ? 'ready' : status === 'error' ? 'error' : status === 'not_started' ? 'waiting' : 'partial';
    return {
      status,
      scheme_status: schemeStatus,
      readiness,
      count: allPlans.length,
      approval_count: approvalPlans.length,
      blocked_count: blockedPlans.length,
      worker_reports: workerReports.length,
      controlled_runtime_count: controlledRuntime.count,
      controlled_runtime_completed: controlledRuntime.completed_count,
      controlled_apply_count: controlledApply.count,
      controlled_apply_verified: controlledApply.verified_count,
      latest: allPlans[0] || null,
      tone: status === 'ready' ? 'pass' : status === 'error' ? 'fail' : 'review',
      label: emergency ? 'Safe Mode' : allPlans.length ? `${allPlans.length} планов` : workerReports.length ? 'workers готовы' : 'ожидает план',
      summary: allPlans.length ? 'безопасные планы действий доступны' : workerReports.length ? 'foundation готов, нужен первый план' : 'создайте безопасный план действия',
      note: emergency
        ? 'Safe Mode включён: новые действия заблокированы.'
        : controlledApply.latest
          ? `Apply Pipeline: ${controlledApply.note}`
        : controlledRuntime.latest
          ? `Controlled Runtime: ${controlledRuntime.note}`
          : allPlans[0]
          ? `${allPlans[0].title}: ${this.handsRiskName(allPlans[0].risk_level)}`
          : workerReports.length
            ? 'Guardian подтверждает worker readiness; действия всё равно проходят через план и Approval.'
            : 'Руки V1 не выполняют команды напрямую. Сначала нужен безопасный план действия.',
      snapshot_source: allPlans.length ? 'Hands Safe Action plans' : workerReports.length ? 'Guardian worker reports' : 'Hands V1 safe planner',
      checks: [
        ['Guardian gate', emergency ? 'Safe Mode' : 'активен'],
        ['Планы действий', allPlans.length ? `${allPlans.length} создано` : 'нет планов'],
        ['Approval bridge', approvalPlans.length ? `${approvalPlans.length} требуют решения` : 'готов'],
        ['Verifier gate', allPlans.some((plan) => plan.verifier_required) ? 'обязателен' : 'ожидает плана'],
        ['Controlled Runtime', controlledRuntime.completed_count ? `${controlledRuntime.completed_count} LOW-risk выполнено` : 'ожидает safe-план'],
        ['Apply Pipeline', controlledApply.verified_count ? `${controlledApply.verified_count} пакетов проверено` : controlledApply.count ? `${controlledApply.count} пакетов ждут Verifier` : 'нет пакетов'],
        ['Автовыполнение опасного', 'заблокировано']
      ]
    };
  },

  latestHandsPlan(scope = 'system', task = null) {
    const state = this.normalizeHandsSafeState(this.handsSafeState || this.defaultHandsSafeState());
    const plans = scope === 'workspace' && task
      ? (Array.isArray(task.hands_action_plans) ? task.hands_action_plans : [])
      : state.action_plans;
    return (plans || [])
      .map((plan) => this.normalizeHandsActionPlan(plan, task))
      .sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))[0] || null;
  },

  buildHandsActionPlanFromForm(scope = 'system', forceApproval = false) {
    const prefix = scope === 'workspace' ? 'workspace-hands' : 'system-hands';
    const task = scope === 'workspace' ? this.getActiveWorkTask() : this.getActiveWorkTask();
    const title = String(document.getElementById(`${prefix}-title`)?.value || '').trim() || 'Безопасный план действия';
    const workerId = document.getElementById(`${prefix}-worker`)?.value || 'code_worker';
    const requestedRisk = document.getElementById(`${prefix}-risk`)?.value || 'review';
    const controlledAction = document.getElementById(`${prefix}-runtime-action`)?.value || 'readiness_snapshot';
    const goal = String(document.getElementById(`${prefix}-goal`)?.value || '').trim() || 'Сформировать безопасное действие без выполнения.';
    const privacy = this.scanPrivacyText([title, goal].join('\n'));
    const safeTitle = privacy.findings.length ? this.redactPrivacyText(title) : title;
    const safeGoal = privacy.findings.length ? this.redactPrivacyText(goal) : goal;
    const detected = this.detectForbiddenActions([safeTitle, safeGoal].join('\n'));
    const risk = forceApproval || detected.length
      ? 'approval_required'
      : HANDS_RISK_LABELS[requestedRisk]
        ? requestedRisk
        : 'review';
    return this.normalizeHandsActionPlan({
      plan_id: this.generateWorkspaceId('HAND'),
      task_id: task?.task_id || '',
      project_id: task?.project_id || '',
      title: safeTitle,
      goal: safeGoal,
      worker_id: workerId,
      risk_level: risk,
      controlled_runtime_action: controlledAction,
      blocked_actions: detected,
      approval_required: forceApproval || detected.length > 0 || risk === 'approval_required' || risk === 'dangerous',
      privacy_status: privacy.blocked ? 'blocked' : privacy.findings.length ? 'redacted' : 'clean',
      privacy_summary: this.privacyScanSummary(privacy),
      created_at: new Date().toISOString()
    }, task);
  },

  async saveHandsActionPlan(plan, task = null) {
    const normalized = this.normalizeHandsActionPlan(plan, task);
    if (!this.handsSafeState) this.handsSafeState = this.defaultHandsSafeState();
    this.handsSafeState.action_plans = Array.isArray(this.handsSafeState.action_plans) ? this.handsSafeState.action_plans : [];
    const globalIndex = this.handsSafeState.action_plans.findIndex((item) => item.plan_id === normalized.plan_id);
    if (globalIndex >= 0) this.handsSafeState.action_plans[globalIndex] = normalized;
    else this.handsSafeState.action_plans.unshift(normalized);
    this.handsSafeState.last_plan_id = normalized.plan_id;
    this.handsSafeState.last_checked_at = normalized.updated_at;
    this.handsSafeState.status = 'ready';
    this.activeHandsPlanId = normalized.plan_id;

    if (task) {
      task.hands_action_plans = Array.isArray(task.hands_action_plans) ? task.hands_action_plans : [];
      const taskIndex = task.hands_action_plans.findIndex((item) => item.plan_id === normalized.plan_id);
      const shouldAddTimelineMessage = taskIndex < 0;
      if (taskIndex >= 0) task.hands_action_plans[taskIndex] = normalized;
      else task.hands_action_plans.unshift(normalized);
      const existingArtifact = normalized.artifact_id
        ? task.artifacts?.find((artifact) => artifact.artifact_id === normalized.artifact_id)
        : null;
      const content = this.buildHandsActionPlanMarkdown(normalized, task);
      const artifact = existingArtifact || this.createArtifact(task, 'HANDS_ACTION_PLAN', normalized.title, `${this.handsWorkerLabel(normalized.worker_id)} · ${this.handsRiskName(normalized.risk_level)}`, content, 'hands');
      artifact.status = normalized.approval_required ? 'review' : 'ready';
      artifact.content = content;
      normalized.artifact_id = artifact.artifact_id;
      const savedIndex = task.hands_action_plans.findIndex((item) => item.plan_id === normalized.plan_id);
      if (savedIndex >= 0) task.hands_action_plans[savedIndex] = normalized;
      const alreadyLogged = (task.messages || []).some((message) => message.type === 'hands_plan' && message.linked_artifact_id === artifact.artifact_id);
      if (shouldAddTimelineMessage || !alreadyLogged) {
        this.addWorkspaceMessage(task, 'hands_plan', 'Руки', `Подготовлен план: ${normalized.title}. Выполнение не запускалось.`, {
          linked_artifacts: [artifact.artifact_id],
          linked_artifact_id: artifact.artifact_id
        });
      }
      task.updated_at = new Date().toISOString();
    }

    this.saveHandsSafeState();
    if (task) {
      this.saveWorkTasks();
      await this.refreshMemorySearchIndex({ silent: true, render: false });
    }
    return normalized;
  },

  buildHandsActionPlanMarkdown(plan, task = null) {
    const normalized = this.normalizeHandsActionPlan(plan, task);
    return [
      `# ${normalized.title}`,
      '',
      `Task: ${task?.task_id || normalized.task_id || 'не привязано'}`,
      `Worker: ${this.handsWorkerLabel(normalized.worker_id)}`,
      `Controlled Runtime action: ${this.controlledRuntimeActionName(normalized.controlled_runtime_action)}`,
      `Риск: ${this.handsRiskName(normalized.risk_level)}`,
      `Статус: ${this.handsStatusName(normalized.status)}`,
      `Approval: ${normalized.approval_required ? 'требуется' : 'не требуется для подготовки плана'}`,
      `Runtime: ${this.controlledRuntimeStatusName(normalized.controlled_runtime_status)}`,
      `Verifier: ${normalized.verifier_required ? 'обязателен перед применением' : 'не требуется'}`,
      `Rollback: ${normalized.rollback_required ? 'обязателен' : 'не требуется'}`,
      '',
      '## Цель',
      normalized.goal,
      '',
      '## Безопасные шаги',
      ...normalized.safe_steps.map((step) => `- ${step}`),
      '',
      '## Заблокированные действия',
      ...(normalized.blocked_actions.length ? normalized.blocked_actions : ['Прямое выполнение команд не разрешено в Hands V1.']).map((item) => `- ${item}`),
      '',
      '## Rollback',
      normalized.rollback_plan,
      '',
      '## Execution',
      `${normalized.execution_result}: dangerous actions remain blocked; Controlled Runtime can run only allowlisted LOW-risk actions.`
    ].join('\n');
  },

  async createHandsApprovalFromPlan(plan, task = null) {
    const normalized = this.normalizeHandsActionPlan(plan, task);
    const approval = this.createApprovalRecord({
      source: 'hands_v1',
      action_type: 'hands_action_plan',
      capability_id: normalized.worker_id,
      action: normalized.goal,
      command: normalized.goal,
      title: normalized.title,
      reason: 'Руки V1 подготовили план действия. Выполнение запрещено до Verifier, rollback и решения владельца.',
      risk_level: normalized.risk_level === 'dangerous' ? 'dangerous' : 'approval_required',
      impact: 'Команда не запускалась. Approval нужен только для дальнейшего применения плана отдельным шагом.',
      rollback_note: normalized.rollback_plan,
      forbidden_actions: normalized.blocked_actions.length ? normalized.blocked_actions : HANDS_BLOCKED_ACTIONS,
      requested_by: 'hands_v1'
    }, task);
    normalized.approval_required = true;
    normalized.approval_id = approval.approval_id;
    normalized.status = 'approval_created';
    normalized.updated_at = new Date().toISOString();
    await this.saveApprovalRecord(approval);
    await this.saveHandsActionPlan(normalized, task);
    if (task) {
      this.addWorkspaceMessage(task, 'approval_event', 'Руки', `Approval создан для плана: ${normalized.title}`, {
        linked_approval_id: approval.approval_id,
        linked_artifact_id: normalized.artifact_id
      });
      this.saveWorkTasks();
    }
    return approval;
  },

  renderHandsPlanCard(plan, options = {}) {
    const normalized = this.normalizeHandsActionPlan(plan);
    const compact = Boolean(options.compact);
    return `
      <article class="hands-plan hands-plan--${this.escapeHtml(normalized.risk_level)}">
        <div>
          <span>${this.escapeHtml(this.handsWorkerLabel(normalized.worker_id))} · ${this.escapeHtml(this.handsStatusName(normalized.status))}</span>
          <strong>${this.escapeHtml(normalized.title)}</strong>
          <p>${this.escapeHtml(normalized.goal)}</p>
          <small>${this.escapeHtml(this.handsRiskName(normalized.risk_level))} · Runtime: ${this.escapeHtml(this.controlledRuntimeStatusName(normalized.controlled_runtime_status))} · ${this.escapeHtml(this.controlledRuntimeActionName(normalized.controlled_runtime_action))}</small>
          <small>Approval: ${normalized.approval_required ? 'да' : 'нет'} · Verifier: ${normalized.verifier_required ? 'да' : 'нет'} · Execution: ${this.escapeHtml(normalized.execution_result)}</small>
          ${!compact && normalized.blocked_actions.length ? `<small>Блокировки: ${this.escapeHtml(normalized.blocked_actions.join('; '))}</small>` : ''}
        </div>
        <div class="hands-plan-actions">
          <button type="button" data-hands-action="copy_plan" data-plan-id="${this.escapeHtml(normalized.plan_id)}">Скопировать</button>
          <button type="button" data-hands-action="prepare_apply_package" data-plan-id="${this.escapeHtml(normalized.plan_id)}">Пакет применения</button>
          <button type="button" data-hands-action="run_controlled" data-plan-id="${this.escapeHtml(normalized.plan_id)}">Выполнить LOW-risk</button>
          ${normalized.approval_id ? `<button type="button" data-hands-action="open_approval" data-approval-id="${this.escapeHtml(normalized.approval_id)}">Approval</button>` : `<button type="button" data-hands-action="create_approval" data-plan-id="${this.escapeHtml(normalized.plan_id)}">Approval</button>`}
        </div>
      </article>
    `;
  },

  memorySearchSafePreview(parts, warnings, contextLabel) {
    const source = (Array.isArray(parts) ? parts : [parts])
      .flatMap((part) => Array.isArray(part) ? part : [part])
      .filter((part) => part !== null && part !== undefined)
      .map((part) => typeof part === 'string' ? part : JSON.stringify(part))
      .join('\n')
      .replace(/\s+/g, ' ')
      .trim();
    if (!source) return { text: '', privacy_status: 'empty' };
    const scan = this.scanPrivacyText(source);
    if (scan.findings.length) {
      warnings.push(`${contextLabel}: скрыто Privacy Guard (${this.privacyScanSummary(scan)})`);
      return {
        text: '[скрыто Privacy Guard: возможный секрет]',
        privacy_status: 'redacted'
      };
    }
    return {
      text: source.slice(0, MEMORY_SEARCH_MAX_PREVIEW_CHARS),
      privacy_status: 'ok'
    };
  },

  memorySearchTokenize(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}_-]+/gu, ' ')
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length > 1 && !MEMORY_SEARCH_STOP_WORDS.has(token))
      .slice(0, 80);
  },

  addMemorySearchRecord(records, warnings, data) {
    const safeTitle = this.memorySearchSafePreview(data.title || data.record_id, warnings, `${data.type}:title`);
    const safeSummary = this.memorySearchSafePreview([data.summary, data.content_preview], warnings, `${data.type}:${data.record_id}`);
    const keywords = [...new Set(this.memorySearchTokenize([safeTitle.text, safeSummary.text, data.keywords || []].join(' ')))].slice(0, 40);
    records.push({
      schema_version: MEMORY_SEARCH_SCHEMA_VERSION,
      record_id: data.record_id,
      type: data.type,
      label: MEMORY_SEARCH_TYPE_LABELS[data.type] || data.type,
      title: safeTitle.text || data.record_id,
      summary: safeSummary.text || 'summary не задан',
      project_id: data.project_id || '',
      project_name: data.project_name || (data.project_id ? this.projectName(data.project_id) : ''),
      task_id: data.task_id || '',
      task_title: data.task_title || '',
      source_id: data.source_id || '',
      source_type: data.source_type || '',
      refs: data.refs || {},
      keywords,
      confidence: data.confidence || 'metadata',
      privacy_status: safeSummary.privacy_status === 'redacted' || safeTitle.privacy_status === 'redacted' ? 'redacted' : 'ok',
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || data.created_at || new Date().toISOString(),
      search_text: [safeTitle.text, safeSummary.text, keywords.join(' ')].join(' ').toLowerCase()
    });
  },

  buildMemorySearchIndex() {
    const records = [];
    const warnings = [];
    const projects = this.workProjects || [];
    const projectById = new Map(projects.map((project) => [project.project_id, project]));

    projects.forEach((project) => {
      this.addMemorySearchRecord(records, warnings, {
        record_id: `project:${project.project_id}`,
        type: 'project',
        title: `Проект: ${project.name}`,
        summary: [project.goal, project.short_description, project.type, project.status].filter(Boolean).join(' · '),
        project_id: project.project_id,
        project_name: project.name,
        source_id: project.project_id,
        refs: { project_id: project.project_id },
        keywords: ['project', project.type, project.status],
        created_at: project.created_at,
        updated_at: project.updated_at
      });
    });

    (this.workTasks || []).forEach((task) => {
      const project = projectById.get(task.project_id);
      const projectName = project?.name || this.projectName(task.project_id);
      const taskTitle = task.title || task.user_request || task.task_id;
      const taskBase = {
        project_id: task.project_id,
        project_name: projectName,
        task_id: task.task_id,
        task_title: taskTitle,
        created_at: task.created_at,
        updated_at: task.updated_at || task.created_at
      };

      this.addMemorySearchRecord(records, warnings, {
        ...taskBase,
        record_id: `task:${task.task_id}`,
        type: 'task',
        title: `Задача: ${taskTitle}`,
        summary: [
          task.user_request,
          task.goal,
          `статус: ${this.statusName(task.status)}`,
          `следующий шаг: ${task.next_step || 'не задан'}`,
          `проект: ${projectName}`
        ],
        source_id: task.task_id,
        refs: { task_id: task.task_id, project_id: task.project_id },
        keywords: [task.status, task.mode, task.quality_level, projectName]
      });

      if (task.memory_preview || task.memory_status) {
        const memory = task.memory_preview || {};
        this.addMemorySearchRecord(records, warnings, {
          ...taskBase,
          record_id: `memory:${task.task_id}`,
          type: 'memory',
          title: `Память: ${taskTitle}`,
          summary: [
            memory.summary || task.goal || task.user_request,
            this.listOrFallback(memory.decisions, ''),
            this.listOrFallback(memory.risks || task.risks, ''),
            memory.next_step || task.next_step,
            memory.acceptance_gate
          ],
          source_id: task.memory_preview?.memory_id || task.task_id,
          refs: {
            task_id: task.task_id,
            project_id: task.project_id,
            artifact_ids: memory.linked_artifact_ids || [],
            file_ids: memory.linked_file_ids || []
          },
          keywords: ['memory', 'decision', 'next_step', memory.status || task.memory_status],
          updated_at: memory.updated_at || task.updated_at || task.created_at
        });
      }

      (task.artifacts || []).forEach((artifact) => {
        const type = artifact.type === 'EVIDENCE_CARD' ? 'evidence'
          : artifact.type === 'SOURCE_CARD' ? 'source'
            : artifact.type === 'RESEARCH_PACK' || artifact.type === 'RESEARCH_BRIEF' ? 'research'
              : artifact.type === 'BRAIN_ANSWER' ? 'brain_answer'
                : artifact.type === 'DECISION_RECORD' || artifact.type === 'DECISION_PASSPORT' || artifact.type === 'STRATEGIST_SYNTHESIS' ? 'decision'
                  : 'artifact';
        this.addMemorySearchRecord(records, warnings, {
          ...taskBase,
          record_id: `artifact:${artifact.artifact_id}`,
          type,
          title: `${this.artifactTypeName(artifact.type)}: ${artifact.title}`,
          summary: [artifact.summary, artifact.content],
          source_id: artifact.artifact_id,
          source_type: artifact.type,
          refs: {
            artifact_id: artifact.artifact_id,
            task_id: task.task_id,
            project_id: task.project_id,
            storage_ref: artifact.storage_ref?.planned_path || ''
          },
          keywords: [artifact.type, artifact.status, artifact.source],
          created_at: artifact.created_at,
          updated_at: artifact.updated_at || artifact.created_at || task.updated_at
        });
      });

      (task.files || []).forEach((file) => {
        this.addMemorySearchRecord(records, warnings, {
          ...taskBase,
          record_id: `file:${file.file_id}`,
          type: file.is_evidence ? 'evidence' : 'file_ref',
          title: `Файл: ${file.name}`,
          summary: [
            `${this.fileKindLabel(file.extension)} · ${file.human_size || ''}`,
            `роль: ${this.fileRoleName(file.role)}`,
            file.is_evidence ? 'помечен как evidence' : '',
            file.storage_ref?.planned_path || file.storage_path || ''
          ],
          source_id: file.file_id,
          source_type: file.extension || 'file',
          refs: {
            file_id: file.file_id,
            task_id: task.task_id,
            project_id: task.project_id,
            storage_ref: file.storage_ref?.planned_path || file.storage_path || ''
          },
          keywords: [file.extension, file.role, file.status, file.is_evidence ? 'evidence' : 'file'],
          created_at: file.created_at,
          updated_at: file.updated_at || file.created_at || task.updated_at
        });
      });

      (task.eyes_visual_checks || []).forEach((check) => {
        this.addMemorySearchRecord(records, warnings, {
          ...taskBase,
          record_id: `eyes:${check.check_id}`,
          type: 'evidence',
          title: `Visual evidence: ${check.target || check.mode}`,
          summary: [check.notes, check.screenshot_ref, check.privacy_summary, check.status],
          source_id: check.check_id,
          source_type: 'EYES_VISUAL_CHECK',
          refs: {
            evidence_id: check.check_id,
            artifact_id: check.artifact_id || '',
            task_id: task.task_id,
            screenshot_ref: check.screenshot_ref || ''
          },
          keywords: ['eyes', 'visual evidence', check.mode, check.status, check.privacy_status],
          created_at: check.created_at,
          updated_at: check.updated_at || check.created_at || task.updated_at
        });
      });

      const research = task.research_ops || {};
      (research.source_cards || []).forEach((card) => {
        this.addMemorySearchRecord(records, warnings, {
          ...taskBase,
          record_id: `source:${card.source_id}`,
          type: 'source',
          title: `Источник: ${card.title}`,
          summary: [card.summary, card.confirms, card.risks, card.check_first, card.url],
          source_id: card.source_id,
          source_type: card.type,
          refs: { source_id: card.source_id, task_id: task.task_id, url: card.url || '' },
          keywords: [card.type, card.trust_level, 'research', 'source'],
          created_at: card.created_at,
          updated_at: card.updated_at || card.created_at || task.updated_at
        });
      });
      (research.evidence_cards || []).forEach((card) => {
        this.addMemorySearchRecord(records, warnings, {
          ...taskBase,
          record_id: `research-evidence:${card.evidence_id}`,
          type: 'evidence',
          title: `Доказательство: ${card.title}`,
          summary: [card.claim, card.source_title, card.confidence, card.notes],
          source_id: card.evidence_id,
          source_type: 'research_evidence',
          refs: { evidence_id: card.evidence_id, source_id: card.source_id, task_id: task.task_id },
          keywords: [card.confidence, card.use_in_decision ? 'decision' : 'review', 'evidence'],
          created_at: card.created_at,
          updated_at: card.updated_at || card.created_at || task.updated_at
        });
      });

      const council = task.brain_council || {};
      (council.answers || []).forEach((answer) => {
        this.addMemorySearchRecord(records, warnings, {
          ...taskBase,
          record_id: `brain-answer:${answer.answer_id}`,
          type: 'brain_answer',
          title: `Ответ мозга: ${answer.brain || answer.role}`,
          summary: [answer.summary, answer.main_conclusion, answer.risks, answer.what_to_check_first, answer.content],
          source_id: answer.answer_id,
          source_type: answer.source_type || 'manual_web_chat',
          refs: { answer_id: answer.answer_id, task_id: task.task_id, brain_id: answer.brain_id || '' },
          keywords: [answer.brain, answer.role, answer.confidence, answer.integrity?.status],
          created_at: answer.created_at,
          updated_at: answer.updated_at || answer.created_at || task.updated_at
        });
      });
      if (council.comparison) {
        this.addMemorySearchRecord(records, warnings, {
          ...taskBase,
          record_id: `brain-comparison:${council.comparison.comparison_id}`,
          type: 'decision',
          title: 'Сравнение Совета мозгов',
          summary: [council.comparison.consensus, council.comparison.disagreements, council.comparison.risks, council.comparison.next_step],
          source_id: council.comparison.comparison_id,
          source_type: 'BRAIN_COMPARISON',
          refs: { comparison_id: council.comparison.comparison_id, task_id: task.task_id },
          keywords: ['brain_comparison', 'decision', 'risks'],
          created_at: council.comparison.created_at,
          updated_at: council.updated_at || council.comparison.created_at
        });
      }
      if (council.strategist_synthesis) {
        this.addMemorySearchRecord(records, warnings, {
          ...taskBase,
          record_id: `decision:${council.strategist_synthesis.decision_id || council.strategist_synthesis.synthesis_id}`,
          type: 'decision',
          title: 'Паспорт решения',
          summary: council.strategist_synthesis.content,
          source_id: council.strategist_synthesis.decision_id || council.strategist_synthesis.synthesis_id,
          source_type: 'DECISION_PASSPORT',
          refs: {
            decision_id: council.strategist_synthesis.decision_id || '',
            synthesis_id: council.strategist_synthesis.synthesis_id || '',
            task_id: task.task_id
          },
          keywords: ['decision_passport', 'strategist', 'memory_candidate'],
          created_at: council.strategist_synthesis.created_at,
          updated_at: council.updated_at || council.strategist_synthesis.created_at
        });
      }

      (task.messages || [])
        .filter((message) => ['decision', 'memory_event', 'verifier_result', 'executor_report_received', 'approval_event', 'hands_plan', 'worker_runtime'].includes(message.type))
        .slice(-12)
        .forEach((message) => {
          this.addMemorySearchRecord(records, warnings, {
            ...taskBase,
            record_id: `message:${message.message_id}`,
            type: message.type === 'decision' ? 'decision' : 'message',
            title: `${this.workspaceMessageLabel(message.type)}: ${message.author || 'Рабочее'}`,
            summary: message.text,
            source_id: message.message_id,
            source_type: message.type,
            refs: {
              message_id: message.message_id,
              task_id: task.task_id,
              linked_artifacts: message.linked_artifacts || []
            },
            keywords: [message.type, message.author],
            created_at: message.created_at,
            updated_at: message.created_at
          });
        });
    });

    return records
      .sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0))
      .slice(0, MEMORY_SEARCH_MAX_RECORDS)
      .map((record) => ({ ...record, warnings: warnings.filter((warning) => warning.includes(record.record_id)).slice(0, 3) }));
  },

  memorySearchStats(records) {
    return {
      total_records: records.length,
      projects: records.filter((record) => record.type === 'project').length,
      tasks: records.filter((record) => record.type === 'task').length,
      artifacts: records.filter((record) => record.type === 'artifact').length,
      evidence: records.filter((record) => record.type === 'evidence').length,
      memory: records.filter((record) => record.type === 'memory').length,
      research: records.filter((record) => ['source', 'research'].includes(record.type)).length,
      brain_answers: records.filter((record) => record.type === 'brain_answer').length
    };
  },

  async refreshMemorySearchIndex(options = {}) {
    const records = this.buildMemorySearchIndex();
    const warnings = records.filter((record) => record.privacy_status === 'redacted').map((record) => `${record.label}: ${record.title}`).slice(0, 20);
    const previousQuery = this.memorySearchState?.query || '';
    this.memorySearchState = this.normalizeMemorySearchState({
      ...(this.memorySearchState || {}),
      status: records.length ? 'ready' : 'empty',
      records,
      stats: this.memorySearchStats(records),
      warnings,
      last_indexed_at: new Date().toISOString(),
      query: previousQuery
    });
    if (previousQuery) this.runMemorySearch(previousQuery, { persist: false });
    await this.saveMemorySearchState();
    if (options.render !== false) {
      this.renderSystemMemorySearchPanel();
      this.renderMinaSystemScheme();
    }
    if (!options.silent) this.toast(`Индекс памяти собран: ${records.length} записей`);
  },

  runMemorySearch(query, options = {}) {
    const state = this.normalizeMemorySearchState(this.memorySearchState || this.defaultMemorySearchState());
    const normalizedQuery = String(query ?? state.query ?? '').trim();
    const tokens = this.memorySearchTokenize(normalizedQuery);
    const results = (state.records || [])
      .map((record) => ({
        ...record,
        score: this.scoreMemorySearchRecord(record, normalizedQuery, tokens)
      }))
      .filter((record) => tokens.length ? record.score > 0 : true)
      .sort((a, b) => b.score - a.score || new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
      .slice(0, MEMORY_SEARCH_RESULT_LIMIT);
    this.memorySearchState = this.normalizeMemorySearchState({
      ...state,
      query: normalizedQuery,
      results,
      context_pack: this.buildMemorySearchContextPack(results, normalizedQuery),
      last_query_at: new Date().toISOString()
    });
    if (options.persist !== false) this.saveMemorySearchState();
    return results;
  },

  scoreMemorySearchRecord(record, query, tokens) {
    if (!tokens.length) return new Date(record.updated_at || record.created_at || 0).getTime() / 100000000000;
    const title = String(record.title || '').toLowerCase();
    const summary = String(record.summary || '').toLowerCase();
    const text = String(record.search_text || '').toLowerCase();
    const keywordText = (record.keywords || []).join(' ').toLowerCase();
    const phrase = String(query || '').toLowerCase();
    let score = phrase && text.includes(phrase) ? 18 : 0;
    tokens.forEach((token) => {
      if (title.includes(token)) score += 9;
      if (keywordText.includes(token)) score += 6;
      if (summary.includes(token)) score += 4;
      if (text.includes(token)) score += 2;
    });
    if (['memory', 'decision', 'evidence'].includes(record.type)) score += 3;
    if (record.privacy_status === 'redacted') score -= 2;
    return score;
  },

  buildMemorySearchContextPack(results, query = '') {
    const selected = (results || []).slice(0, 10);
    if (!selected.length) return 'Context Pack не собран: результатов нет.';
    return [
      '# Context Pack из памяти Терминатора',
      '',
      `query: ${query || 'последние записи'}`,
      `created_at: ${new Date().toISOString()}`,
      'storage_policy: только summary и refs; raw files, secrets, cookies и tokens не включены',
      'ai_api_used: false',
      '',
      '## Найденные записи',
      ...selected.map((record, index) => [
        `${index + 1}. ${record.label}: ${record.title}`,
        `   summary: ${record.summary}`,
        `   project: ${record.project_name || record.project_id || 'не задан'}`,
        `   task_id: ${record.task_id || 'нет'}`,
        `   refs: ${JSON.stringify(record.refs || {})}`,
        `   privacy: ${record.privacy_status}`
      ].join('\n')),
      '',
      '## Что проверить первым',
      '- Открыть связанные task_id/artifact_id/evidence refs перед принятием решения.',
      '- Если запись redacted, не копировать исходный текст во внешние чаты без Privacy Guard.',
      '- Для больших файлов использовать путь на D и выборочный контекст, не raw dump.'
    ].join('\n');
  },

  memorySearchTypeName(type) {
    return MEMORY_SEARCH_TYPE_LABELS[type] || type || 'Запись';
  },

  memorySearchStatusName(status) {
    const names = {
      ready: 'готов',
      review: 'требует проверки',
      stale: 'устарел',
      not_indexed: 'не собран',
      empty: 'пусто'
    };
    return names[status] || status || 'не собран';
  },

  phase6Check(name, status, note, severity = 'safe') {
    return {
      check_id: this.generateWorkspaceId('P6CHK'),
      name,
      status,
      severity,
      note,
      checked_at: new Date().toISOString()
    };
  },

  buildProductionReadinessSnapshot() {
    const checks = [];
    const guardian = this.guardianSnapshot();
    const pwa = this.pwaSnapshot();
    const taskStore = this.taskStoreStatusSnapshot();
    const direct = this.directModeStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const localText = this.localStorageSnapshotText();
    const privacy = this.scanPrivacyText(this.safeLocalStorageAuditText());
    const bodyText = document.body?.innerText || '';
    const visibleMojibake = /(?:\u0420\u045E|\u0420\u045F|\u0420 \u0420\u00B0|\u0420\u045F\u0421\u0402)/.test(bodyText);
    const rawStorage = RAW_FILE_STORAGE_PATTERN.test(localText);
    const currentHost = window.location.host || 'local';
    const isLive = /github\.io$/i.test(currentHost);

    checks.push(this.phase6Check(
      'Интерфейс',
      document.getElementById('screen-system') && document.getElementById('screen-work') ? 'pass' : 'review',
      'Рабочее, Центр управления, Система и Схема Мины присутствуют в WebApp.'
    ));
    checks.push(this.phase6Check(
      'Публикация сайта',
      isLive ? 'pass' : 'manual_check',
      isLive ? 'Открыта live-версия GitHub Pages.' : 'Сейчас открыт локальный/preview URL. Live проверяется скриптом release guard.',
      isLive ? 'safe' : 'review'
    ));
    checks.push(this.phase6Check(
      'PWA shell',
      pwa.serviceWorker === 'registered' ? 'pass' : 'review',
      `Service Worker: ${pwa.serviceWorker}; режим: ${pwa.displayMode}.`,
      pwa.serviceWorker === 'registered' ? 'safe' : 'review'
    ));
    checks.push(this.phase6Check(
      'Хранилище задач',
      this.taskRuntimeReady ? 'pass' : 'review',
      this.taskRuntimeReady ? 'IndexedDB активен; localStorage mirror остаётся fallback.' : 'IndexedDB недоступен, работает резерв localStorage.',
      this.taskRuntimeReady ? 'safe' : 'review'
    ));
    checks.push(this.phase6Check(
      'Синхронизация задач',
      this.taskStoreSyncStatus === 'synced' ? 'pass' : 'manual_check',
      taskStore.note,
      this.taskStoreSyncStatus === 'failed' ? 'review' : 'safe'
    ));
    checks.push(this.phase6Check(
      'Guardian',
      guardian.tone === 'danger' ? 'blocked' : guardian.tone === 'review' ? 'review' : 'pass',
      `${guardian.label}; открытых incidents: ${guardian.openIncidents.length}.`,
      guardian.tone === 'danger' ? 'blocked' : guardian.tone === 'review' ? 'review' : 'safe'
    ));
    checks.push(this.phase6Check(
      'Direct Bridge',
      direct.status === 'сессия активна' ? 'pass' : 'manual_check',
      direct.note,
      'review'
    ));
    checks.push(this.phase6Check(
      'Локальный агент',
      /на связи|доверено|системное|готов/i.test(agent.status) && !/не проверено|не найден/i.test(agent.status) ? 'pass' : 'manual_check',
      agent.note,
      'review'
    ));
    checks.push(this.phase6Check(
      'Секреты в локальном состоянии',
      privacy.blocked ? 'blocked' : privacy.findings.length ? 'review' : 'pass',
      privacy.findings.length ? `Privacy Guard: ${this.privacyScanSummary(privacy)}.` : 'Секреты в локальном состоянии не обнаружены.',
      privacy.blocked ? 'blocked' : privacy.findings.length ? 'review' : 'safe'
    ));
    checks.push(this.phase6Check(
      'Raw/base64 в браузерном storage',
      rawStorage ? 'review' : 'pass',
      rawStorage ? 'Найдены признаки raw/base64. Нужно проверить Files policy.' : 'Raw/base64 file data не обнаружены.',
      rawStorage ? 'review' : 'safe'
    ));
    checks.push(this.phase6Check(
      'Текст и кодировка',
      visibleMojibake ? 'review' : 'pass',
      visibleMojibake ? 'Видимый UI содержит признаки mojibake.' : 'Видимых кракозябр не найдено.',
      visibleMojibake ? 'review' : 'safe'
    ));
    checks.push(this.phase6Check(
      'AI API',
      'pass',
      'Phase 6 не добавляет AI API и не включает платные провайдеры.',
      'safe'
    ));

    const blocked = checks.filter((check) => check.status === 'blocked' || check.severity === 'blocked').length;
    const review = checks.filter((check) => ['review', 'manual_check'].includes(check.status) || check.severity === 'review').length;
    const pass = checks.filter((check) => check.status === 'pass').length;
    const score = Math.round((pass / checks.length) * 100);
    return {
      release_id: this.generateWorkspaceId('RELEASE'),
      status: blocked ? 'blocked' : review ? 'review' : 'ready',
      score,
      checks,
      summary: `${pass} pass, ${review} review/manual, ${blocked} blocked`,
      checked_at: new Date().toISOString()
    };
  },

  preQamaxGateCheck(id, name, status, note, severity = 'safe') {
    return {
      check_id: id,
      name,
      status,
      severity,
      note,
      checked_at: new Date().toISOString()
    };
  },

  preQamaxEvidenceManifest() {
    return [
      {
        name: 'Phase 21 Controlled Apply Pipeline',
        path: `${TERMINATOR_STORAGE_ROOT}\\evidence_backups\\phase21_controlled_apply_pipeline`,
        note: 'Verifier Gate, rollback и безопасное применение.'
      },
      {
        name: 'Phase 22 Source of Truth',
        path: `${TERMINATOR_STORAGE_ROOT}\\evidence_backups\\phase22_source_of_truth`,
        note: 'Единый снимок состояния системы.'
      },
      {
        name: 'Phase 23 Windows Companion Autostart',
        path: `${TERMINATOR_STORAGE_ROOT}\\evidence_backups\\phase23_windows_companion`,
        note: 'Тихая автозагрузка, отсутствие лишних окон, legacy PM2 disabled.'
      },
      {
        name: 'Phase 24 Windows Companion Installed',
        path: `${TERMINATOR_STORAGE_ROOT}\\evidence_backups\\phase24_windows_companion_installed`,
        note: 'Ярлык меню Пуск и installer report.'
      },
      {
        name: 'Phase 25 Pre-QAMAX Gate',
        path: `${TERMINATOR_STORAGE_ROOT}\\evidence_backups\\phase25_pre_qamax_gate`,
        note: 'Финальный gate перед большим QAMAX.'
      }
    ];
  },

  preQamaxScope() {
    return [
      'Start → Главное меню → Рабочее / Центр управления / Система / Схема Мины.',
      'Рабочее: проект, задача, reload persistence, Context Pack, отчёт, Verifier, Memory Preview.',
      'Голова: Стратег, Совет мозгов, поисковики, ResearchOps, BrainAnswer, Decision Passport.',
      'Память: Memory Preview, Memory Search, индексы, no secrets, refs на D.',
      'Guardian: Safe Mode, Emergency Stop, Approval Center, Cost Guard, incidents.',
      'Руки: Controlled Worker Runtime, Controlled Apply Pipeline, rollback before apply.',
      'Глаза: visual evidence, screenshots, desktop/mobile layout, no horizontal overflow.',
      'Ноги: Device Mesh, handoff, continuity, phone/PWA presence.',
      'Голос: push-to-talk, transcript, intent preview, dangerous command block.',
      'Windows-компаньон: меню Пуск, Local Agent, тихая автозагрузка, отсутствие лишних окон.',
      'Cloud/Live: GitHub Pages marker, PWA service worker, TaskStore sync, Direct Bridge health.',
      'Security: no AI API, no paid services, no secrets in docs/evidence/logs, no heavy files on C.',
      'Premium UI: Mina style, readable Russian text, no mojibake, real buttons, mobile smoke.'
    ];
  },

  buildPreQamaxGateSnapshot() {
    const now = new Date().toISOString();
    const release = this.productionReleaseState?.checked_at ? this.productionReleaseState : this.buildProductionReadinessSnapshot();
    const truth = this.currentSourceOfTruthSnapshot({ refresh: true, persist: false });
    const integration = this.buildIntegrationSnapshot();
    const liveRuntime = this.buildLiveRuntimeSnapshot();
    const guardian = this.guardianSnapshot();
    const companion = this.windowsCompanionState?.checked_at ? this.windowsCompanionState : this.buildWindowsCompanionSnapshot();
    const memory = this.memorySearchSnapshot();
    const eyes = this.eyesVisualSnapshot();
    const hands = this.handsSnapshot();
    const applyPipeline = this.controlledApplySnapshot();
    const runtime = this.controlledRuntimeSnapshot();
    const deviceMesh = this.buildDeviceMeshSnapshot();
    const continuity = this.buildContinuitySnapshot(this.getActiveWorkTask());
    const voice = this.buildVoiceReadinessSnapshot();
    const pwa = this.pwaSnapshot();
    const schemaSafety = this.schemaSafetyState?.last_checked_at ? this.schemaSafetyState : this.buildSchemaSafetySnapshot();
    const registry = this.systemRegistryState?.last_checked_at ? this.systemRegistryState : this.buildSystemRegistrySnapshot();
    const policy = this.policyCenterState?.last_checked_at ? this.policyCenterState : this.buildPolicyCenterSnapshot();
    const localText = this.localStorageSnapshotText();
    const privacy = this.scanPrivacyText(this.safeLocalStorageAuditText());
    const currentHost = window.location.host || '';
    const isLive = /github\.io$/i.test(currentHost);
    const checks = [
      this.preQamaxGateCheck(
        'qamax_boundary',
        'Граница QAMAX',
        'pass',
        'Gate подтверждает готовность к финальному тесту, но сам QAMAX не запускает.',
        'safe'
      ),
      this.preQamaxGateCheck(
        'phase_roadmap',
        'Закрытые слои roadmap',
        TERMINATOR_PHASE_STEPS.filter((step) => /закрыт/.test(step.status)).length >= 47 ? 'pass' : 'review',
        `${TERMINATOR_PHASE_STEPS.filter((step) => /закрыт/.test(step.status)).length}/${TERMINATOR_PHASE_STEPS.length} слоёв отмечены закрытыми; текущий слой: ${TERMINATOR_LAST_CHECKPOINT.name}.`,
        'safe'
      ),
      this.preQamaxGateCheck(
        'live_publication',
        'Live публикация',
        isLive ? 'pass' : 'manual_check',
        isLive ? 'Открыта live-версия GitHub Pages.' : 'Локальная проверка; live подтверждается отдельным smoke после публикации.',
        isLive ? 'safe' : 'review'
      ),
      this.preQamaxGateCheck(
        'source_truth',
        'Единый источник истины',
        truth.status === 'blocked' ? 'blocked' : truth.score >= 60 ? 'pass' : 'review',
        `${truth.score}% · ${truth.summary}`,
        truth.status === 'blocked' ? 'blocked' : truth.score >= 60 ? 'safe' : 'review'
      ),
      this.preQamaxGateCheck(
        'integration',
        'Интеграция слоёв',
        integration.status === 'blocked' ? 'blocked' : integration.score >= 60 ? 'pass' : 'review',
        `${integration.score}% · ${integration.summary}`,
        integration.status === 'blocked' ? 'blocked' : integration.score >= 60 ? 'safe' : 'review'
      ),
      this.preQamaxGateCheck(
        'release_readiness',
        'Производственный контур',
        release.status === 'blocked' ? 'blocked' : release.score >= 70 ? 'pass' : 'review',
        `${release.score || 0}% · ${release.summary || 'релизный снимок не собран'}`,
        release.status === 'blocked' ? 'blocked' : release.score >= 70 ? 'safe' : 'review'
      ),
      this.preQamaxGateCheck(
        'guardian',
        'Guardian / защита',
        guardian.state?.emergency_stop_active ? 'blocked' : guardian.tone === 'danger' ? 'blocked' : guardian.tone === 'review' ? 'review' : 'pass',
        `${guardian.label}; ${guardian.note}`,
        guardian.state?.emergency_stop_active || guardian.tone === 'danger' ? 'blocked' : guardian.tone === 'review' ? 'review' : 'safe'
      ),
      this.preQamaxGateCheck(
        'controlled_apply',
        'Руки / безопасное применение',
        hands.status === 'blocked' || applyPipeline.status === 'blocked' ? 'blocked' : Math.max(hands.readiness || 0, applyPipeline.readiness || 0, runtime.readiness || 0) >= 60 ? 'pass' : 'review',
        `${hands.note}; apply: ${applyPipeline.note}; runtime: ${runtime.note}`,
        hands.status === 'blocked' || applyPipeline.status === 'blocked' ? 'blocked' : Math.max(hands.readiness || 0, applyPipeline.readiness || 0, runtime.readiness || 0) >= 60 ? 'safe' : 'review'
      ),
      this.preQamaxGateCheck(
        'windows_companion',
        'Windows-компаньон',
        companion.status === 'ready' ? 'pass' : companion.status === 'blocked' ? 'blocked' : 'review',
        `готовность ${companion.score || 0}%; окна: ${companion.visible_window_status}; legacy PM2: ${companion.legacy_pm2_status}`,
        companion.status === 'blocked' ? 'blocked' : companion.status === 'ready' ? 'safe' : 'review'
      ),
      this.preQamaxGateCheck(
        'memory_search',
        'Память и поиск',
        memory.status === 'ready' || memory.status === 'stale' ? 'pass' : 'review',
        memory.note,
        memory.status === 'ready' || memory.status === 'stale' ? 'safe' : 'review'
      ),
      this.preQamaxGateCheck(
        'eyes_visual',
        'Глаза / visual evidence',
        eyes.status === 'ready' || eyes.readiness >= 70 ? 'pass' : 'review',
        eyes.note,
        eyes.status === 'blocked' ? 'blocked' : eyes.readiness >= 70 ? 'safe' : 'review'
      ),
      this.preQamaxGateCheck(
        'legs_device_mesh',
        'Ноги / устройства',
        Math.max(deviceMesh.readiness || 0, continuity.readiness || 0) >= 70 ? 'pass' : 'review',
        `${deviceMesh.next}; continuity: ${continuity.next}`,
        'review'
      ),
      this.preQamaxGateCheck(
        'voice_layer',
        'Голос Мины',
        voice.score >= 60 ? 'pass' : 'review',
        voice.note,
        'safe'
      ),
      this.preQamaxGateCheck(
        'pwa_mobile',
        'Mobile / PWA',
        pwa.serviceWorker === 'registered' ? 'pass' : 'review',
        `PWA: ${pwa.installLabel}; offline shell: ${pwa.serviceWorker}.`,
        pwa.serviceWorker === 'registered' ? 'safe' : 'review'
      ),
      this.preQamaxGateCheck(
        'schema_backup_registry_policy',
        'Схемы / backup / реестр / policy',
        [schemaSafety.status, registry.status, policy.status].includes('blocked') ? 'blocked' : (schemaSafety.score || 0) >= 20 && (registry.score || 0) >= 60 && (policy.score || 0) >= 80 ? 'pass' : 'review',
        `схемы ${schemaSafety.score || 0}%; реестр ${registry.score || 0}%; правила ${policy.score || 0}%.`,
        [schemaSafety.status, registry.status, policy.status].includes('blocked') ? 'blocked' : 'safe'
      ),
      this.preQamaxGateCheck(
        'task_runtime',
        'Рабочее / Task Runtime',
        this.taskRuntimeReady ? 'pass' : 'review',
        this.taskRuntimeReady ? `${(this.workTasks || []).length} задач в IndexedDB/local mirror.` : 'IndexedDB недоступен, fallback localStorage.',
        this.taskRuntimeReady ? 'safe' : 'review'
      ),
      this.preQamaxGateCheck(
        'privacy',
        'Privacy / secrets',
        privacy.blocked ? 'blocked' : privacy.findings.length ? 'review' : 'pass',
        privacy.findings.length ? `Privacy Guard: ${this.privacyScanSummary(privacy)}.` : 'Секреты в локальном состоянии не обнаружены.',
        privacy.blocked ? 'blocked' : privacy.findings.length ? 'review' : 'safe'
      ),
      this.preQamaxGateCheck(
        'no_raw_storage',
        'Файлы / raw storage',
        RAW_FILE_STORAGE_PATTERN.test(localText) ? 'review' : 'pass',
        RAW_FILE_STORAGE_PATTERN.test(localText) ? 'Найдены признаки raw/base64 в браузерном storage.' : 'Raw/base64 file data в браузерном storage не обнаружены.',
        RAW_FILE_STORAGE_PATTERN.test(localText) ? 'review' : 'safe'
      ),
      this.preQamaxGateCheck(
        'ai_api_policy',
        'AI API / платные сервисы',
        policy.security?.ai_api_policy === 'disabled' && guardian.state?.paid_services_allowed !== true ? 'pass' : 'review',
        'AI API и платные сервисы должны оставаться выключены до отдельного Approval.',
        'safe'
      ),
      this.preQamaxGateCheck(
        'live_runtime',
        'Живой runtime',
        liveRuntime.status === 'ready' ? 'pass' : liveRuntime.status === 'blocked' ? 'blocked' : 'review',
        `${liveRuntime.score || 0}% · ${liveRuntime.summary || liveRuntime.label || 'не проверен'}`,
        liveRuntime.status === 'blocked' ? 'blocked' : liveRuntime.status === 'ready' ? 'safe' : 'review'
      )
    ];
    const blockers = checks.filter((check) => check.status === 'blocked' || check.severity === 'blocked').map((check) => `${check.name}: ${check.note}`);
    const warnings = checks.filter((check) => ['review', 'manual_check'].includes(check.status) || check.severity === 'review').map((check) => `${check.name}: ${check.note}`);
    const pass = checks.filter((check) => check.status === 'pass').length;
    const reviewCount = checks.filter((check) => ['review', 'manual_check'].includes(check.status) || check.severity === 'review').length;
    const score = Math.round(((pass + reviewCount * 0.5) / Math.max(1, checks.length)) * 100);
    const status = blockers.length ? 'blocked' : score >= 80 ? 'ready' : 'review';
    const qamaxScope = this.preQamaxScope();
    const evidenceManifest = this.preQamaxEvidenceManifest();
    return {
      schema_version: 1,
      gate_id: this.generateWorkspaceId('QAGATE'),
      phase: 'Phase 25 Pre-QAMAX Release Candidate Gate V1',
      status,
      score,
      checked_at: now,
      summary: `${pass}/${checks.length} gate checks PASS; ${warnings.length} пунктов уйдут в QAMAX; ${blockers.length} блокеров`,
      decision: status === 'ready'
        ? 'Можно переходить к финальному QAMAX после явной команды владельца. Предупреждения остаются scope тестирования, не скрываются.'
        : status === 'blocked'
          ? 'QAMAX запускать нельзя, пока не сняты блокеры.'
          : 'Перед QAMAX нужно разобрать предупреждения или принять их осознанно.',
      checks,
      qamax_scope: qamaxScope,
      blockers: [...new Set(blockers)].slice(0, 20),
      warnings: [...new Set(warnings)].slice(0, 30),
      evidence_manifest: evidenceManifest,
      stop_rule: 'QAMAX не запускается автоматически. Gate останавливается перед финальным тестом.',
      live_url: 'https://vitaliykonstantinovich.github.io/terminator-webapp/',
      storage_root: TERMINATOR_STORAGE_ROOT,
      no_ai_api: true,
      no_paid_services: true
    };
  },

  updateObservabilitySample() {
    const tasks = this.workTasks || [];
    const approvals = this.pendingApprovalRecords();
    const incidents = this.guardianSnapshot().openIncidents || [];
    const latestDiagnostic = this.systemDiagnostics?.[0] || null;
    const liveRuntime = this.buildLiveRuntimeSnapshot();
    const now = new Date().toISOString();
    const sample = {
      sample_id: this.generateWorkspaceId('OBS'),
      sampled_at: now,
      task_count: tasks.length,
      active_tasks: tasks.filter((task) => !['accepted', 'saved', 'cancelled', 'rejected'].includes(task.status)).length,
      waiting_reports: tasks.filter((task) => task.status === 'waiting_executor_report').length,
      approvals_pending: approvals.length,
      open_incidents: incidents.length,
      task_store_status: this.taskStoreSyncStatus || 'not_checked',
      last_sync_at: this.taskStoreLastSyncAt || '',
      last_diagnostic_at: latestDiagnostic?.created_at || '',
      pwa_service_worker: this.pwaServiceWorkerStatus,
      guardian_status: this.guardianSnapshot().label,
      live_runtime_status: liveRuntime.status,
      live_runtime_score: liveRuntime.score,
      live_runtime_checked_at: liveRuntime.checked_at || '',
      bridge_latency_ms: liveRuntime.bridge_latency_ms
    };
    const current = this.observabilityState || { samples: [] };
    this.observabilityState = {
      ...current,
      last_sample_at: now,
      samples: [sample, ...(current.samples || [])].slice(0, 20)
    };
    this.saveProductionState();
    return sample;
  },

  safeLocalStorageAuditText() {
    try {
      const skip = new Set([
        DIRECT_SESSION_TOKEN_KEY,
        DIRECT_SESSION_EXPIRES_KEY,
        DIRECT_SESSION_BRIDGE_KEY,
        DIRECT_SESSION_LEGACY_STORAGE_KEY
      ]);
      const parts = [];
      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index);
        if (skip.has(key)) {
          parts.push(`owner_auth_redacted_${parts.length}: [REDACTED]`);
          continue;
        }
        parts.push(`${key}: ${window.localStorage.getItem(key) || ''}`);
      }
      return parts.join('\n');
    } catch {
      return '';
    }
  },

  createBrowserCheckpoint(reason = 'manual') {
    const now = new Date().toISOString();
    const release = this.productionReleaseState || {};
    const checkpoint = {
      checkpoint_id: this.generateWorkspaceId('CHECKPOINT'),
      created_at: now,
      reason,
      storage_root: TERMINATOR_STORAGE_ROOT,
      schema_version: TASK_STORAGE_SCHEMA_VERSION,
      counts: {
        projects: (this.activeWorkProjects() || []).length,
        tasks: (this.workTasks || []).length,
        approvals: (this.approvalRecords || []).length,
        diagnostics: (this.systemDiagnostics || []).length,
        incidents: (this.guardianIncidents || []).length,
        head_brains: (this.headBrains || []).length,
        council_profiles: (this.headProfiles || []).length,
        search_agents: (this.headSearchAgents || []).length
      },
      release_status: release.status || 'not_checked',
      task_store_status: this.taskStoreSyncStatus || 'not_checked',
      pwa_service_worker: this.pwaServiceWorkerStatus,
      secrets_policy: 'secrets are not exported'
    };
    const current = this.backupRestoreState || { checkpoints: [] };
    this.backupRestoreState = {
      ...current,
      last_checkpoint_at: now,
      checkpoints: [checkpoint, ...(current.checkpoints || [])].slice(0, 12)
    };
    this.saveProductionState();
    return checkpoint;
  },

  buildSafeStateExport() {
    return {
      exported_at: new Date().toISOString(),
      app: 'Terminator Mina UI',
      phase: 'Schema Versioning + Backup/Restore + Migration Safety',
      storage_root: TERMINATOR_STORAGE_ROOT,
      release: this.productionReleaseState || {},
      backup: this.backupRestoreState || {},
      observability: this.observabilityState || {},
      schema_safety: this.schemaSafetyState || {},
      system_registry: this.systemRegistryState || {},
      policy_center: this.policyCenterState || {},
      counters: {
        tasks: (this.workTasks || []).length,
        projects: (this.activeWorkProjects() || []).length,
        approvals: (this.approvalRecords || []).length,
        incidents: (this.guardianIncidents || []).length
      },
      policy: {
        no_secrets: true,
        no_ai_api: true,
        no_heavy_files_in_export: true,
        raw_files_not_included: true
      }
    };
  },

  schemaVersionOf(record) {
    const value = Number(record?.schema_version || record?.runtime?.schema_version || 0);
    return Number.isFinite(value) ? value : 0;
  },

  dataSchemaRecords(targetId) {
    const tasks = this.workTasks || [];
    const researchEvidence = tasks.flatMap((task) => (task.research_ops?.evidence_cards || []).map((evidence) => ({ ...evidence, task_id: task.task_id, project_id: task.project_id })));
    const artifactEvidence = tasks.flatMap((task) => (task.artifacts || []).filter((artifact) => artifact.type === 'EVIDENCE_CARD').map((artifact) => ({ ...artifact, task_id: task.task_id, project_id: task.project_id })));
    const fileEvidence = tasks.flatMap((task) => (task.files || []).filter((file) => file.is_evidence).map((file) => ({ ...file, task_id: task.task_id, project_id: task.project_id })));
    const taskMemory = tasks
      .filter((task) => task.memory_preview || task.memory_status)
      .map((task) => ({
        memory_id: `MEMORY-${task.task_id}`,
        task_id: task.task_id,
        project_id: task.project_id,
        schema_version: task.memory_preview?.schema_version || task.schema_version || 0,
        status: task.memory_preview?.status || task.memory_status || 'draft'
      }));

    const sources = {
      projects: this.workProjects || [],
      tasks,
      messages: tasks.flatMap((task) => (task.messages || []).map((message) => ({ ...message, task_id: task.task_id, project_id: task.project_id }))),
      artifacts: tasks.flatMap((task) => (task.artifacts || []).map((artifact) => ({ ...artifact, task_id: task.task_id, project_id: task.project_id }))),
      files: tasks.flatMap((task) => (task.files || []).map((file) => ({ ...file, task_id: task.task_id, project_id: task.project_id }))),
      evidence: [...artifactEvidence, ...fileEvidence, ...researchEvidence],
      approvals: this.approvalRecords || [],
      memory: [...taskMemory, ...((this.memorySearchState?.records || []).map((record) => ({ ...record, memory_id: record.record_id })))],
      brains: this.headBrains || [],
      profiles: this.headProfiles || [],
      search_agents: this.headSearchAgents || [],
      devices: this.systemDevices || [],
      incidents: this.guardianIncidents || [],
      diagnostics: this.systemDiagnostics || []
    };
    return sources[targetId] || [];
  },

  schemaTargetSummary(target) {
    const [id, displayName, source, critical] = target;
    const records = this.dataSchemaRecords(id);
    const missing = records.filter((record) => !this.schemaVersionOf(record)).length;
    const outdated = records.filter((record) => {
      const version = this.schemaVersionOf(record);
      return version > 0 && version < DATA_SCHEMA_VERSION;
    }).length;
    const current = records.length - missing - outdated;
    const status = records.length && (missing || outdated) ? 'review' : 'pass';
    return {
      id,
      display_name: displayName,
      source,
      critical: Boolean(critical),
      target_version: DATA_SCHEMA_VERSION,
      total: records.length,
      current,
      missing,
      outdated,
      status,
      note: records.length
        ? `${current}/${records.length} имеют версию схемы v${DATA_SCHEMA_VERSION}`
        : 'записей пока нет'
    };
  },

  buildSchemaRegistrySnapshot() {
    return SCHEMA_SAFETY_TARGETS.map((target) => this.schemaTargetSummary(target));
  },

  buildSchemaMigrationPlan() {
    const registry = this.buildSchemaRegistrySnapshot();
    const actions = registry
      .filter((item) => item.missing || item.outdated)
      .map((item) => ({
        action_id: `schema_stamp_${item.id}`,
        target: item.id,
        display_name: item.display_name,
        status: 'planned',
        risk_level: item.critical ? 'review' : 'safe',
        records_to_stamp: item.missing + item.outdated,
        operation: `set schema_version=${DATA_SCHEMA_VERSION}; migration_status=current`,
        destructive: false,
        requires_backup: item.critical
      }));
    return {
      migration_id: this.generateWorkspaceId('MIGRATION'),
      schema_version: DATA_SCHEMA_VERSION,
      generated_at: new Date().toISOString(),
      status: actions.length ? 'review' : 'ready',
      actions,
      rollback_required: actions.some((action) => action.requires_backup),
      policy: {
        no_delete: true,
        no_raw_files: true,
        no_secrets: true,
        approval_for_destructive_restore: true
      }
    };
  },

  buildSchemaSafetySnapshot() {
    const registry = this.buildSchemaRegistrySnapshot();
    const total = registry.reduce((sum, item) => sum + item.total, 0);
    const missing = registry.reduce((sum, item) => sum + item.missing, 0);
    const outdated = registry.reduce((sum, item) => sum + item.outdated, 0);
    const criticalGaps = registry.filter((item) => item.critical && (item.missing || item.outdated)).length;
    const backup = this.schemaSafetyState || {};
    const privacy = this.scanPrivacyText(this.safeLocalStorageAuditText());
    const status = privacy.blocked ? 'blocked' : criticalGaps ? 'review' : 'ready';
    const score = total ? Math.max(20, Math.round(((total - missing - outdated) / total) * 100)) : 100;
    return {
      status,
      score,
      total,
      missing,
      outdated,
      critical_gaps: criticalGaps,
      registry,
      last_checked_at: new Date().toISOString(),
      last_backup_at: backup.last_backup_at || '',
      last_schema_stamp_at: backup.last_schema_stamp_at || '',
      restore_points: backup.restore_points || [],
      backup_packages: backup.backup_packages || [],
      privacy_findings: privacy.findings.length,
      summary: criticalGaps
        ? `${criticalGaps} критичных групп требуют schema stamp`
        : missing || outdated
          ? `${missing + outdated} записей требуют мягкой миграции`
          : 'схемы данных актуальны'
    };
  },

  createSchemaRestorePoint(reason = 'schema_safety') {
    const snapshot = this.buildSchemaSafetySnapshot();
    const restorePointId = this.generateWorkspaceId('RESTORE');
    const restorePoint = {
      restore_point_id: restorePointId,
      checkpoint_id: restorePointId,
      created_at: new Date().toISOString(),
      reason,
      schema_version: DATA_SCHEMA_VERSION,
      storage_root: TERMINATOR_STORAGE_ROOT,
      counts: {
        projects: (this.workProjects || []).length,
        tasks: (this.workTasks || []).length,
        messages: this.dataSchemaRecords('messages').length,
        artifacts: this.dataSchemaRecords('artifacts').length,
        evidence: this.dataSchemaRecords('evidence').length,
        approvals: (this.approvalRecords || []).length,
        memory_index: this.memorySearchState?.records?.length || 0
      },
      schema_summary: snapshot.summary,
      rollback_policy: 'metadata restore only; destructive restore requires Approval'
    };
    const current = this.schemaSafetyState || {};
    this.schemaSafetyState = {
      ...current,
      schema_version: DATA_SCHEMA_VERSION,
      restore_points: [restorePoint, ...(current.restore_points || [])].slice(0, 12),
      last_restore_point_at: restorePoint.created_at
    };
    this.backupRestoreState = {
      ...(this.backupRestoreState || {}),
      last_checkpoint_at: restorePoint.created_at,
      checkpoints: [restorePoint, ...((this.backupRestoreState?.checkpoints || []))].slice(0, 12)
    };
    this.saveProductionState();
    return restorePoint;
  },

  schemaSafeText(parts, label = 'schema_backup') {
    const source = (Array.isArray(parts) ? parts : [parts]).filter((part) => part !== null && part !== undefined).join('\n');
    const scan = this.scanPrivacyText(source);
    return scan.findings.length ? `[скрыто Privacy Guard: ${label}]` : source.slice(0, MEMORY_SEARCH_MAX_PREVIEW_CHARS);
  },

  buildSchemaSafeBackupPackage() {
    const snapshot = this.buildSchemaSafetySnapshot();
    const packageId = this.generateWorkspaceId('BACKUP');
    const tasks = (this.workTasks || []).map((task) => ({
      schema_version: task.schema_version || DATA_SCHEMA_VERSION,
      task_id: task.task_id,
      project_id: task.project_id,
      title: this.schemaSafeText(task.title || task.user_request || task.task_id, `task:${task.task_id}:title`),
      status: task.status,
      goal: this.schemaSafeText(task.goal || task.user_request || '', `task:${task.task_id}:goal`),
      next_step: this.schemaSafeText(task.next_step || '', `task:${task.task_id}:next_step`),
      counts: {
        messages: (task.messages || []).length,
        artifacts: (task.artifacts || []).length,
        files: (task.files || []).length,
        approvals: (task.approval_requests || []).length
      },
      artifact_refs: (task.artifacts || []).map((artifact) => ({
        artifact_id: artifact.artifact_id,
        type: artifact.type,
        title: this.schemaSafeText(artifact.title || artifact.artifact_id, `artifact:${artifact.artifact_id}`),
        status: artifact.status || ''
      })).slice(0, 80),
      file_refs: (task.files || []).map((file) => ({
        file_id: file.file_id,
        name: this.schemaSafeText(file.name || file.file_id, `file:${file.file_id}`),
        role: file.role,
        extension: file.extension,
        human_size: file.human_size,
        storage_ref: file.storage_ref?.planned_path || file.storage_path || '',
        is_evidence: Boolean(file.is_evidence)
      })).slice(0, 80),
      created_at: task.created_at,
      updated_at: task.updated_at
    }));

    const backup = {
      package_id: packageId,
      package_version: SAFE_BACKUP_PACKAGE_VERSION,
      schema_version: DATA_SCHEMA_VERSION,
      created_at: new Date().toISOString(),
      app: 'Terminator Mina UI',
      storage_root: TERMINATOR_STORAGE_ROOT,
      policy: {
        no_secrets: true,
        no_ai_api: true,
        no_raw_files: true,
        no_cookies_or_sessions: true,
        heavy_files_on_d: true
      },
      schema_snapshot: snapshot,
      projects: (this.workProjects || []).map((project) => ({
        schema_version: project.schema_version || DATA_SCHEMA_VERSION,
        project_id: project.project_id,
        name: this.schemaSafeText(project.name, `project:${project.project_id}`),
        type: project.type,
        status: project.status,
        goal: this.schemaSafeText(project.goal || project.short_description || '', `project:${project.project_id}:goal`),
        created_at: project.created_at,
        updated_at: project.updated_at
      })),
      tasks,
      head: {
        strategist_id: this.mainStrategistBrain()?.brain_id || '',
        brains: (this.headBrains || []).map((brain) => ({
          brain_id: brain.brain_id,
          provider: brain.provider_name || brain.provider || '',
          display_name: brain.display_name,
          role: brain.role,
          status: brain.status,
          enabled: Boolean(brain.enabled),
          schema_version: brain.schema_version || DATA_SCHEMA_VERSION
        })),
        profiles: (this.headProfiles || []).map((profile) => ({
          profile_id: profile.profile_id,
          name: profile.name,
          main_strategist_id: profile.main_strategist_id,
          member_count: (profile.council_members || profile.members || []).length,
          search_agent_count: (profile.search_agent_ids || profile.search_agents || []).length,
          schema_version: profile.schema_version || DATA_SCHEMA_VERSION
        }))
      },
      memory_index_summary: {
        count: this.memorySearchState?.records?.length || 0,
        stats: this.memorySearchState?.stats || {},
        last_indexed_at: this.memorySearchState?.last_indexed_at || ''
      },
      restore_policy: {
        browser_restore: 'metadata preview only',
        destructive_restore: 'Approval required',
        rollback_notes: 'restore package is safe summary; raw files stay on D and are not embedded'
      }
    };
    const current = this.schemaSafetyState || {};
    this.schemaSafetyState = {
      ...current,
      last_backup_at: backup.created_at,
      backup_packages: [
        {
          package_id: backup.package_id,
          created_at: backup.created_at,
          task_count: backup.tasks.length,
          project_count: backup.projects.length,
          schema_status: backup.schema_snapshot.status
        },
        ...(current.backup_packages || [])
      ].slice(0, 12)
    };
    this.saveProductionState();
    return backup;
  },

  stampSchemaObject(record, now = new Date().toISOString()) {
    if (!record || typeof record !== 'object') return record;
    return {
      ...record,
      schema_version: DATA_SCHEMA_VERSION,
      migration_status: 'current',
      schema_updated_at: now
    };
  },

  stampTaskSchema(task, now) {
    const stamped = this.stampSchemaObject(task, now);
    return this.normalizeWorkTask({
      ...stamped,
      messages: (task.messages || []).map((message) => this.stampSchemaObject(message, now)),
      artifacts: (task.artifacts || []).map((artifact) => this.stampSchemaObject(artifact, now)),
      files: (task.files || []).map((file) => this.stampSchemaObject(file, now)),
      events: (task.events || []).map((event) => this.stampSchemaObject(event, now)),
      approval_requests: (task.approval_requests || []).map((approval) => this.stampSchemaObject(approval, now)),
      updated_at: task.updated_at || now
    });
  },

  async applySafeSchemaStamp() {
    const now = new Date().toISOString();
    const restorePoint = this.createSchemaRestorePoint('before_safe_schema_stamp');
    this.workProjects = (this.workProjects || []).map((project) => this.normalizeWorkProject(this.stampSchemaObject(project, now)));
    this.workTasks = (this.workTasks || []).map((task) => this.stampTaskSchema(task, now));
    this.approvalRecords = (this.approvalRecords || []).map((approval) => this.normalizeApprovalRecord(this.stampSchemaObject(approval, now)));
    this.systemDevices = (this.systemDevices || []).map((device) => this.normalizeDevice(this.stampSchemaObject(device, now)));
    this.headBrains = (this.headBrains || []).map((brain) => this.normalizeHeadBrain(this.stampSchemaObject(brain, now)));
    this.headProfiles = (this.headProfiles || []).map((profile) => this.normalizeHeadProfile(this.stampSchemaObject(profile, now)));
    this.headSearchAgents = (this.headSearchAgents || []).map((agent) => this.normalizeHeadSearchAgent(this.stampSchemaObject(agent, now)));
    this.systemDiagnostics = (this.systemDiagnostics || []).map((diagnostic) => this.stampSchemaObject(diagnostic, now));
    this.guardianIncidents = (this.guardianIncidents || []).map((incident) => this.stampSchemaObject(incident, now));
    if (this.memorySearchState?.records) {
      this.memorySearchState.records = this.memorySearchState.records.map((record) => this.stampSchemaObject(record, now));
      await this.saveMemorySearchState();
    }
    if (this.taskRuntimeDb) {
      await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.PROJECTS, this.workProjects);
      await this.persistRuntimeSnapshot();
      await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.APPROVALS, this.approvalRecords);
      await this.saveSystemDevices();
      await this.saveHeadRuntime();
      await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.DIAGNOSTICS, this.systemDiagnostics);
      await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.INCIDENTS, this.guardianIncidents);
    } else {
      this.saveWorkTasks();
    }
    const snapshot = this.buildSchemaSafetySnapshot();
    this.schemaSafetyState = {
      ...(this.schemaSafetyState || {}),
      ...snapshot,
      schema_version: DATA_SCHEMA_VERSION,
      status: snapshot.status,
      registry: snapshot.registry,
      last_checked_at: snapshot.last_checked_at,
      last_schema_stamp_at: now,
      last_restore_point_id: restorePoint.restore_point_id
    };
    this.saveProductionState();
    return snapshot;
  },

  systemRegistryStatusName(status) {
    return SYSTEM_REGISTRY_STATUS_LABELS[status] || status || 'неизвестно';
  },

  policyCenterStatusName(status) {
    return POLICY_CENTER_STATUS_LABELS[status] || status || 'неизвестно';
  },

  defaultPolicyCenterState() {
    const defaultProject = (this.activeWorkProjects?.() || this.workProjects || [])[0]?.id || 'terminator';
    const activeProfile = this.activeHeadProfile?.();
    return {
      schema_version: POLICY_CENTER_SCHEMA_VERSION,
      status: 'not_checked',
      score: 0,
      last_checked_at: '',
      updated_at: '',
      owner: {
        language: 'ru-RU',
        theme: 'mina_dark',
        mobile_mode: 'responsive',
        default_project_id: defaultProject,
        default_council_profile_id: activeProfile?.profile_id || 'default'
      },
      security: {
        privacy_guard_level: 'strict',
        approval_strictness: 'high',
        dangerous_actions: 'blocked',
        ai_api_policy: 'disabled',
        secrets_policy: 'redact_and_block'
      },
      runtime: {
        storage_root: TERMINATOR_STORAGE_ROOT,
        default_context_pack_size: 'standard',
        diagnostics_frequency: 'manual_plus_health',
        backup_policy: 'checkpoint_before_risk',
        log_retention_days: 30,
        release_channel: 'live_pages_controlled'
      },
      project_defaults: {
        memory_policy: 'preview_required',
        verifier_strictness: 'evidence_required',
        research_depth: 'standard',
        allowed_executors: 'Ручные web-чаты + Codex'
      },
      task_defaults: {
        quality: 'maximum',
        memory_save_scope: 'verified_only',
        evidence_required: true,
        approval_required_for_commands: true
      },
      history: []
    };
  },

  normalizePolicyCenterState(state = {}) {
    const defaults = this.defaultPolicyCenterState();
    const normalized = {
      ...defaults,
      ...state,
      schema_version: POLICY_CENTER_SCHEMA_VERSION,
      owner: { ...defaults.owner, ...(state.owner || {}) },
      security: { ...defaults.security, ...(state.security || {}) },
      runtime: { ...defaults.runtime, ...(state.runtime || {}) },
      project_defaults: { ...defaults.project_defaults, ...(state.project_defaults || {}) },
      task_defaults: { ...defaults.task_defaults, ...(state.task_defaults || {}) },
      history: Array.isArray(state.history) ? state.history.slice(0, 20) : []
    };
    if (normalized.project_defaults.allowed_executors === 'manual_web_chat_codex') {
      normalized.project_defaults.allowed_executors = 'Ручные web-чаты + Codex';
    }
    return normalized;
  },

  policyCenterSelectOptions(path, value) {
    const options = POLICY_CENTER_SELECTS[path] || [];
    return options.map(([id, label]) => `<option value="${this.escapeHtml(id)}" ${id === value ? 'selected' : ''}>${this.escapeHtml(label)}</option>`).join('');
  },

  policyCenterDisplayValue(path, value) {
    const options = POLICY_CENTER_SELECTS[path] || [];
    const found = options.find(([id]) => id === value);
    return found?.[1] || value || 'не задано';
  },

  policyCenterGet(path) {
    return path.split('.').reduce((source, key) => source?.[key], this.policyCenterState || {});
  },

  policyCenterSet(target, path, value) {
    const parts = path.split('.');
    let cursor = target;
    parts.slice(0, -1).forEach((part) => {
      cursor[part] = { ...(cursor[part] || {}) };
      cursor = cursor[part];
    });
    cursor[parts[parts.length - 1]] = value;
  },

  collectPolicyCenterFormValues() {
    const next = this.normalizePolicyCenterState(this.policyCenterState || {});
    document.querySelectorAll('[data-policy-setting]').forEach((field) => {
      const path = field.dataset.policySetting;
      const value = field.type === 'checkbox' ? Boolean(field.checked) : field.value;
      this.policyCenterSet(next, path, value);
    });
    const retention = Number(next.runtime.log_retention_days || 30);
    next.runtime.log_retention_days = Number.isFinite(retention) ? Math.max(7, Math.min(365, retention)) : 30;
    next.runtime.storage_root = TERMINATOR_STORAGE_ROOT;
    next.security.secrets_policy = 'redact_and_block';
    next.schema_version = POLICY_CENTER_SCHEMA_VERSION;
    next.updated_at = new Date().toISOString();
    return next;
  },

  buildPolicyCenterSnapshot(state = this.policyCenterState) {
    const current = this.normalizePolicyCenterState(state || {});
    const checks = [
      ['owner_language', 'Язык интерфейса', current.owner.language === 'ru-RU' ? 'pass' : 'review', current.owner.language === 'ru-RU' ? 'Основной UI на русском.' : 'Нужна ручная проверка переводов.'],
      ['storage_root', 'Корень хранения', current.runtime.storage_root === TERMINATOR_STORAGE_ROOT && current.runtime.storage_root.startsWith('D:\\') ? 'pass' : 'blocked', `Хранилище: ${current.runtime.storage_root || 'не задано'}`],
      ['privacy_guard', 'Защита приватности', current.security.privacy_guard_level === 'strict' ? 'pass' : 'review', `Уровень: ${this.policyCenterDisplayValue('security.privacy_guard_level', current.security.privacy_guard_level)}`],
      ['approval', 'Подтверждения действий', ['high', 'standard'].includes(current.security.approval_strictness) ? 'pass' : 'review', `Строгость: ${this.policyCenterDisplayValue('security.approval_strictness', current.security.approval_strictness)}`],
      ['dangerous_actions', 'Опасные действия', ['blocked', 'approval_required'].includes(current.security.dangerous_actions) ? 'pass' : 'blocked', `Правило: ${this.policyCenterDisplayValue('security.dangerous_actions', current.security.dangerous_actions)}`],
      ['ai_api', 'ИИ API', current.security.ai_api_policy === 'disabled' ? 'pass' : 'review', current.security.ai_api_policy === 'disabled' ? 'ИИ API отключены по умолчанию.' : 'ИИ API только после отдельного подтверждения.'],
      ['backup', 'Резервные копии', current.runtime.backup_policy === 'checkpoint_before_risk' ? 'pass' : 'review', `Правило: ${this.policyCenterDisplayValue('runtime.backup_policy', current.runtime.backup_policy)}`],
      ['memory_policy', 'Правила памяти', current.project_defaults.memory_policy === 'preview_required' && current.task_defaults.memory_save_scope === 'verified_only' ? 'pass' : 'review', 'Память сохраняется только через предварительный просмотр и только проверенное.'],
      ['verifier', 'Проверка результата', current.project_defaults.verifier_strictness === 'evidence_required' && current.task_defaults.evidence_required ? 'pass' : 'review', 'Для важных результатов нужны доказательства.'],
      ['release', 'Публикация', current.runtime.release_channel === 'live_pages_controlled' ? 'pass' : 'review', `Канал: ${this.policyCenterDisplayValue('runtime.release_channel', current.runtime.release_channel)}`]
    ].map(([checkId, name, status, note]) => ({
      check_id: checkId,
      name,
      status,
      note,
      checked_at: new Date().toISOString()
    }));
    const blocked = checks.filter((check) => check.status === 'blocked').length;
    const review = checks.filter((check) => check.status === 'review').length;
    const pass = checks.filter((check) => check.status === 'pass').length;
    return {
      ...current,
      status: blocked ? 'blocked' : review ? 'review' : 'ready',
      score: Math.round((pass / checks.length) * 100),
      checks,
      summary: `${pass} пройдено, ${review} на проверке, ${blocked} заблокировано`,
      last_checked_at: new Date().toISOString()
    };
  },

  savePolicyCenterSnapshot(snapshot) {
    this.policyCenterState = this.normalizePolicyCenterState({
      ...snapshot,
      history: [snapshot, ...((this.policyCenterState?.history || []).slice(0, 9))]
    });
    this.saveProductionState();
    return this.policyCenterState;
  },

  buildPolicyCenterExport(snapshot = this.policyCenterState) {
    return {
      type: 'terminator_policy_center',
      exported_at: new Date().toISOString(),
      schema_version: POLICY_CENTER_SCHEMA_VERSION,
      policy_center: this.normalizePolicyCenterState(snapshot || {}),
      policy: {
        no_secrets: true,
        no_cookies: true,
        no_tokens: true,
        no_ai_api_by_default: true,
        dangerous_actions_require_approval: true,
        heavy_files_live_on_d: true
      }
    };
  },

  buildPolicyCenterPolicyText(snapshot = this.policyCenterState) {
    const state = this.normalizePolicyCenterState(snapshot || {});
    return [
      'Terminator Policy Center:',
      `- язык: ${this.policyCenterDisplayValue('owner.language', state.owner.language)}`,
      `- хранилище: ${state.runtime.storage_root}`,
      `- защита приватности: ${this.policyCenterDisplayValue('security.privacy_guard_level', state.security.privacy_guard_level)}`,
      `- подтверждения: ${this.policyCenterDisplayValue('security.approval_strictness', state.security.approval_strictness)}`,
      `- опасные действия: ${this.policyCenterDisplayValue('security.dangerous_actions', state.security.dangerous_actions)}`,
      `- ИИ API: ${this.policyCenterDisplayValue('security.ai_api_policy', state.security.ai_api_policy)}`,
      `- резервные копии: ${this.policyCenterDisplayValue('runtime.backup_policy', state.runtime.backup_policy)}`,
      `- память: ${this.policyCenterDisplayValue('project_defaults.memory_policy', state.project_defaults.memory_policy)} / ${this.policyCenterDisplayValue('task_defaults.memory_save_scope', state.task_defaults.memory_save_scope)}`,
      '- секреты, cookies и токены не экспортируются',
      '- публикация, push, удаление, .env, сеть и billing требуют отдельного подтверждения'
    ].join('\n');
  },

  normalizeServiceInventoryItem(item) {
    const [serviceId, name, category, activeStatus, purpose, authType, storesUserData, storesSecrets, riskLevel, nextAction] = item;
    const now = new Date().toISOString();
    return {
      service_id: serviceId,
      service_name: name,
      category,
      active_status: activeStatus,
      purpose,
      auth_type: authType,
      stores_user_data: Boolean(storesUserData),
      stores_secrets: Boolean(storesSecrets),
      risk_level: riskLevel,
      owner_action_required: nextAction,
      linked_tasks: [],
      last_checked: now,
      next_action: nextAction,
      legacy_cleanup_status: activeStatus === 'legacy' || activeStatus === 'audit_later' ? 'не развивать; аудит позже' : 'not_applicable'
    };
  },

  buildServiceInventorySnapshot() {
    const direct = this.directModeStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const taskStore = this.taskStoreStatusSnapshot();
    const pwa = this.pwaSnapshot();
    const guardian = this.guardianSnapshot();
    const overrides = {
      cloudflare_worker: direct.status === 'сессия активна' || direct.status === 'ожидает вход' ? direct.status : direct.status,
      local_agent: agent.status,
      pwa_browser: pwa.serviceWorker === 'registered' ? 'active' : 'future_ready',
      github_pages: 'active',
      cloudflare_durable_object: taskStore.status === 'синхронизировано' ? 'active' : 'active',
      browser_automation_runtime: guardian.state.browser_automation_allowed ? 'controlled' : 'future_blocked'
    };
    return SERVICE_INVENTORY_CATALOG.map((item) => {
      const service = this.normalizeServiceInventoryItem(item);
      if (overrides[service.service_id]) service.runtime_status = overrides[service.service_id];
      else service.runtime_status = service.active_status;
      service.requires_attention = ['legacy', 'audit_later', 'future_blocked'].includes(service.active_status)
        || service.stores_secrets
        || service.risk_level === 'critical';
      return service;
    });
  },

  buildDependencyRegistrySnapshot() {
    const taskStore = this.taskStoreStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const pwa = this.pwaSnapshot();
    const dependencyStatus = {
      browser: 'ready',
      nodejs: 'ready',
      git: 'ready',
      github: 'ready',
      cloudflare_worker: 'review',
      local_agent_runtime: agent.status === 'не проверено' ? 'review' : 'ready',
      task_scheduler: 'review',
      terminator_storage_d: TERMINATOR_STORAGE_ROOT.startsWith('D:\\') ? 'ready' : 'blocked',
      indexeddb: this.taskRuntimeReady ? 'ready' : 'review',
      service_worker: pwa.serviceWorker === 'registered' ? 'ready' : 'review',
      github_actions_secrets: 'review',
      future_sqlite_fts: 'future',
      future_local_stt: 'future'
    };
    return DEPENDENCY_REGISTRY_CATALOG.map(([dependencyId, name, usedFor, check, fallback, riskLevel]) => ({
      dependency_id: dependencyId,
      name,
      used_for: usedFor,
      check,
      fallback,
      risk_level: riskLevel,
      status: dependencyStatus[dependencyId] || 'unknown',
      last_checked: new Date().toISOString(),
      note: dependencyId === 'indexeddb'
        ? taskStore.note
        : dependencyId === 'local_agent_runtime'
          ? agent.note
          : ''
    }));
  },

  buildCapabilityRegistrySnapshot() {
    return GUARDIAN_CAPABILITY_MATRIX.map(([actor, title, canRead, canWrite, canExecute, canDelete, forbidden, allowedPaths, risk]) => ({
      actor_id: actor,
      title,
      can_read: canRead,
      can_write: canWrite,
      can_execute: canExecute,
      can_delete: canDelete,
      requires_approval: ['high', 'critical'].includes(risk) || canDelete !== 'нет',
      forbidden_actions: forbidden,
      allowed_paths: allowedPaths,
      risk_level: risk,
      status: risk === 'critical' ? 'blocked' : risk === 'high' ? 'review' : 'ready'
    }));
  },

  buildSystemRegistrySnapshot() {
    const services = this.buildServiceInventorySnapshot();
    const dependencies = this.buildDependencyRegistrySnapshot();
    const capabilities = this.buildCapabilityRegistrySnapshot();
    const active = services.filter((service) => service.active_status === 'active' || service.active_status === 'controlled').length;
    const legacy = services.filter((service) => service.active_status === 'legacy' || service.active_status === 'audit_later').length;
    const future = services.filter((service) => service.active_status.startsWith('future')).length;
    const serviceRisks = services.filter((service) => service.requires_attention).length;
    const dependencyRisks = dependencies.filter((dependency) => ['blocked', 'review', 'unknown'].includes(dependency.status)).length;
    const capabilityRisks = capabilities.filter((capability) => capability.status === 'blocked').length;
    const blocked = services.some((service) => ['active', 'controlled'].includes(service.active_status) && service.risk_level === 'critical' && service.stores_secrets)
      || dependencies.some((dependency) => dependency.status === 'blocked');
    const status = blocked ? 'blocked' : (serviceRisks || dependencyRisks || capabilityRisks) ? 'review' : 'ready';
    const total = services.length + dependencies.length + capabilities.length;
    const riskTotal = serviceRisks + dependencyRisks + capabilityRisks;
    const score = Math.max(10, Math.round(((total - riskTotal) / total) * 100));
    return {
      status,
      score,
      generated_at: new Date().toISOString(),
      summary: `${active} active/controlled, ${legacy} legacy, ${future} future; ${riskTotal} требуют внимания`,
      counts: {
        services: services.length,
        dependencies: dependencies.length,
        capabilities: capabilities.length,
        active,
        legacy,
        future,
        risks: riskTotal
      },
      services,
      dependencies,
      capabilities,
      policy: {
        no_ai_api_by_default: true,
        no_paid_services_by_default: true,
        no_legacy_as_main_path: true,
        secrets_never_exported: true,
        dangerous_actions_require_approval: true
      }
    };
  },

  saveSystemRegistrySnapshot(snapshot) {
    this.systemRegistryState = {
      ...snapshot,
      last_checked_at: snapshot.generated_at,
      history: [
        {
          checked_at: snapshot.generated_at,
          status: snapshot.status,
          score: snapshot.score,
          summary: snapshot.summary,
          counts: snapshot.counts
        },
        ...((this.systemRegistryState?.history || []).slice(0, 9))
      ]
    };
    this.saveProductionState();
    return this.systemRegistryState;
  },

  buildSystemRegistryExport() {
    const snapshot = this.systemRegistryState?.last_checked_at ? this.systemRegistryState : this.buildSystemRegistrySnapshot();
    return {
      export_type: 'terminator_system_registry',
      exported_at: new Date().toISOString(),
      app: 'Terminator Mina UI',
      policy: {
        no_secrets: true,
        no_ai_api: true,
        no_paid_services_added: true,
        no_runtime_changes: true
      },
      registry: snapshot
    };
  },

  downloadTextFile(filename, text, mimeType = 'application/json') {
    try {
      const blob = new Blob([text], { type: `${mimeType};charset=utf-8` });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      anchor.rel = 'noopener';
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      return true;
    } catch {
      return false;
    }
  },

  diagnosticCheck(name, status, severity, note, safeAction = '') {
    return {
      check_id: this.generateWorkspaceId('CHECK'),
      name,
      status,
      severity,
      note,
      safe_action: safeAction,
      created_at: new Date().toISOString()
    };
  },

  async runSystemDiagnostics() {
    if (this.diagnosticRunning) return;
    this.diagnosticRunning = true;
    this.renderSystemDiagnostics();
    try {
      const checks = [];
      const suggestions = [];
      const direct = this.directModeStatusSnapshot();
      const agent = this.localAgentStatusSnapshot();
      const tasks = this.workTasks || [];
      const now = Date.now();
      const activeTaskExists = !this.activeWorkTaskId || tasks.some((task) => task.task_id === this.activeWorkTaskId);
      const activeDeviceExists = !this.activeDeviceId || this.systemDevices.some((device) => device.device_id === this.activeDeviceId);

      checks.push(this.diagnosticCheck(
        'Runtime задач',
        this.taskRuntimeReady ? 'pass' : 'review',
        this.taskRuntimeReady ? 'safe' : 'review',
        this.taskRuntimeReady ? 'IndexedDB активен, localStorage mirror остаётся fallback.' : 'IndexedDB недоступен, работает fallback. Требуется ручная проверка браузера.'
      ));

      const taskEventGaps = tasks.filter((task) => (task.messages?.length || task.artifacts?.length || task.audit_log?.length) && !(task.events?.length));
      checks.push(this.diagnosticCheck(
        'Журнал событий задач',
        taskEventGaps.length ? 'review' : 'pass',
        taskEventGaps.length ? 'review' : 'safe',
        taskEventGaps.length ? `${taskEventGaps.length} задач имеют старый формат без task.events.` : 'Task events доступны для активных задач.'
      ));

      const directHealth = await this.probeDirectBridgeHealth();
      checks.push(directHealth);

      checks.push(this.diagnosticCheck(
        'Синхронизация задач',
        ['synced', 'syncing'].includes(this.taskStoreSyncStatus) ? 'pass' : 'manual_check',
        this.taskStoreSyncStatus === 'failed' ? 'review' : 'safe',
        this.taskStoreSyncStatus === 'synced'
          ? `Общее хранилище задач синхронизировано: ${this.formatTaskTime(this.taskStoreLastSyncAt)}.`
          : this.taskStoreSyncStatus === 'owner_session_required'
            ? 'Общее хранилище задач ждёт вход владельца; данные остаются в IndexedDB.'
            : this.taskStoreSyncError || `Текущий статус: ${this.taskStoreSyncStatus || 'не проверено'}.`,
        'sync_task_store'
      ));

      checks.push(this.diagnosticCheck(
        'Local Agent',
        agent.status === 'на связи' || agent.status === 'connected' ? 'pass' : 'manual_check',
        'review',
        `${agent.note}. Browser-side Diagnost не опрашивает процессы Windows без Local Agent runtime.`
      ));

      checks.push(this.diagnosticCheck(
        'Storage D',
        'manual_check',
        'review',
        `${TERMINATOR_STORAGE_ROOT} является рабочим storage root. Browser не проверяет свободное место и папки без Local Agent storage.`
      ));

      const storageManifestGaps = tasks.filter((task) => !task.storage_manifest?.task_path || !Array.isArray(task.storage_manifest?.folders) || task.storage_manifest.folders.length < TASK_STORAGE_SUBFOLDERS.length);
      checks.push(this.diagnosticCheck(
        'Task storage manifest',
        storageManifestGaps.length ? 'review' : 'pass',
        storageManifestGaps.length ? 'review' : 'safe',
        storageManifestGaps.length ? `${storageManifestGaps.length} задач без полного storage manifest.` : `Storage manifest есть у ${tasks.length} задач.`
      ));

      const storageContractGaps = tasks.filter((task) => !task.storage_manifest?.local_agent_contract || task.storage_manifest.schema_version < TASK_STORAGE_SCHEMA_VERSION);
      checks.push(this.diagnosticCheck(
        'Local Agent storage contract',
        storageContractGaps.length ? 'review' : 'pass',
        storageContractGaps.length ? 'review' : 'safe',
        storageContractGaps.length
          ? `${storageContractGaps.length} задач требуют обновления storage contract до v${TASK_STORAGE_SCHEMA_VERSION}.`
          : `Storage contract v${TASK_STORAGE_SCHEMA_VERSION} готов: prepare_task_storage без destructive actions.`
      ));

      const rawFilePolicyBroken = tasks.some((task) => (task.files || []).some((file) => file.raw_file_saved || file.base64 || file.dataUrl || file.content));
      checks.push(this.diagnosticCheck(
        'File persistence policy',
        rawFilePolicyBroken ? 'blocked' : 'pass',
        rawFilePolicyBroken ? 'blocked' : 'safe',
        rawFilePolicyBroken ? 'Найден raw/base64/content в file metadata. Это запрещено.' : 'File metadata не содержит raw/base64/content.'
      ));

      const hashPending = tasks.flatMap((task) => task.files || []).filter((file) => file.hash_status && file.hash_status !== 'calculated_session').length;
      checks.push(this.diagnosticCheck(
        'File hash policy',
        hashPending ? 'manual_check' : 'pass',
        hashPending ? 'review' : 'safe',
        hashPending ? `${hashPending} файлов ждут hash через Local Agent или ручную проверку.` : 'Для session-safe файлов hash рассчитан.'
      ));

      const staleWaiting = tasks.filter((task) => task.status === 'waiting_executor_report' && task.timer_started_at && now - new Date(task.timer_started_at).getTime() > DIAGNOSTIC_WAITING_REPORT_STALE_MS);
      checks.push(this.diagnosticCheck(
        'Зависшие ожидания отчёта',
        staleWaiting.length ? 'review' : 'pass',
        staleWaiting.length ? 'review' : 'safe',
        staleWaiting.length ? `${staleWaiting.length} задач ждут отчёт дольше 2 часов.` : 'Зависших ожиданий отчёта не найдено.'
      ));

      const staleManual = tasks.filter((task) => task.status === 'manual_required' && now - new Date(task.updated_at || task.created_at || 0).getTime() > DIAGNOSTIC_MANUAL_REVIEW_STALE_MS);
      checks.push(this.diagnosticCheck(
        'Старые ручные решения',
        staleManual.length ? 'review' : 'pass',
        staleManual.length ? 'review' : 'safe',
        staleManual.length ? `${staleManual.length} задач требуют ручного решения больше суток.` : 'Старых manual_required задач не найдено.'
      ));

      const pendingApprovals = this.pendingApprovalRecords();
      checks.push(this.diagnosticCheck(
        'Approval-очередь',
        pendingApprovals.length ? 'review' : 'pass',
        pendingApprovals.length ? 'approval_required' : 'safe',
        pendingApprovals.length ? `${pendingApprovals.length} approval-запросов ждут владельца.` : 'Approval-очередь пуста.'
      ));

      const requiredDevices = ['device_terminator_pc', 'device_webapp_browser', 'device_pwa_shell', 'device_windows_companion', 'device_local_agent', 'device_owner_phone', 'device_mission_display', 'device_home_assistant'];
      const missingDevices = requiredDevices.filter((id) => !this.systemDevices.some((device) => device.device_id === id));
      const devicesWithoutCapabilities = this.systemDevices.filter((device) => !(device.capabilities || []).length);
      checks.push(this.diagnosticCheck(
        'Device Mesh foundation',
        missingDevices.length || devicesWithoutCapabilities.length ? 'review' : 'pass',
        missingDevices.length || devicesWithoutCapabilities.length ? 'review' : 'safe',
        missingDevices.length
          ? `Не хватает устройств: ${missingDevices.join(', ')}.`
          : `Device Registry содержит ${this.systemDevices.length} устройств, trust/risk/capability модель доступна.`
      ));

      checks.push(this.diagnosticCheck(
        'Mina Voice hook',
        this.workspaceVoiceSupported || document.getElementById('workspace-voice-panel') ? 'pass' : 'review',
        'safe',
        this.workspaceVoiceSupported ? 'Push-to-talk доступен через Browser Speech API.' : 'Speech API недоступен, но manual transcript preview работает без AI API.'
      ));

      checks.push(this.diagnosticCheck(
        'Активный выбор',
        activeTaskExists && activeDeviceExists ? 'pass' : 'review',
        activeTaskExists && activeDeviceExists ? 'safe' : 'review',
        activeTaskExists && activeDeviceExists ? 'Активные task/device pointers валидны.' : 'Найден stale active task/device pointer.',
        activeTaskExists && activeDeviceExists ? '' : 'clear_stale_selection'
      ));

      const bodyText = document.body?.innerText || '';
      const hasVisibleMojibake = /(?:\u0420\u045E|\u0420\u045F|\u0420 \u0420\u00B0|\u0420\u045F\u0421\u0402)/.test(bodyText);
      checks.push(this.diagnosticCheck(
        'Проверка кракозябр',
        hasVisibleMojibake ? 'review' : 'pass',
        hasVisibleMojibake ? 'review' : 'safe',
        hasVisibleMojibake ? 'В видимом UI найдены признаки mojibake.' : 'Видимых признаков mojibake не найдено.'
      ));

      const localStorageText = this.localStorageSnapshotText();
      checks.push(this.diagnosticCheck(
        'Raw/base64 guard',
        RAW_FILE_STORAGE_PATTERN.test(localStorageText) ? 'review' : 'pass',
        RAW_FILE_STORAGE_PATTERN.test(localStorageText) ? 'review' : 'safe',
        RAW_FILE_STORAGE_PATTERN.test(localStorageText) ? 'localStorage содержит признаки raw/base64 данных.' : 'Raw/base64 file data в localStorage не обнаружены.'
      ));

      const personalButtonVisible = Array.from(document.querySelectorAll('#screen-menu .command-button')).some((button) => button.innerText.includes('Личное'));
      const legacyPersonalAllowed = this.isLegacyPersonalAccessAllowed();
      checks.push(this.diagnosticCheck(
        'Legacy в активном UI',
        personalButtonVisible || legacyPersonalAllowed ? 'review' : 'pass',
        personalButtonVisible || legacyPersonalAllowed ? 'review' : 'safe',
        personalButtonVisible
          ? '`Личное` найдено в активном меню.'
          : legacyPersonalAllowed
            ? 'Legacy Personal rollback-флаг включён. Отключить перед production QA.'
            : '`Личное` скрыто и legacy-route заблокирован.'
      ));

      const releaseSnapshot = this.buildProductionReadinessSnapshot();
      checks.push(this.diagnosticCheck(
        'Производственный контур',
        releaseSnapshot.status === 'ready' ? 'pass' : releaseSnapshot.status === 'blocked' ? 'blocked' : 'review',
        releaseSnapshot.status === 'blocked' ? 'blocked' : releaseSnapshot.status === 'review' ? 'review' : 'safe',
        `Release readiness: ${releaseSnapshot.score}% (${releaseSnapshot.summary}).`
      ));

      checks.push(this.diagnosticCheck(
        'Лишние окна Windows',
        'manual_check',
        'review',
        'Browser-side Diagnost не видит окна Windows. После Windows app/tray этот check должен перейти в Local Agent/desktop companion.'
      ));

      if (!this.taskRuntimeReady) suggestions.push(this.diagnosticSuggestion('Проверить браузерный storage', 'review', 'manual_review', 'IndexedDB в fallback. Проверьте разрешения/режим браузера перед QA Max.'));
      if (this.taskStoreSyncStatus !== 'synced') suggestions.push(this.diagnosticSuggestion('Синхронизировать задачи', 'safe', 'sync_task_store', 'Общее хранилище задач переводит данные из локального браузерного кеша в общий контур Direct Mode.'));
      if (storageManifestGaps.length) suggestions.push(this.diagnosticSuggestion('Обновить storage manifests', 'safe', 'refresh_runtime', 'Безопасно открыть задачи и пересобрать planned storage paths.'));
      if (missingDevices.length || devicesWithoutCapabilities.length) suggestions.push(this.diagnosticSuggestion('Обновить Device Registry', 'safe', 'refresh_runtime', 'Безопасно перечитать локальный реестр устройств и default passports.'));
      if (taskEventGaps.length) suggestions.push(this.diagnosticSuggestion('Обновить старые задачи при открытии', 'safe', 'refresh_runtime', 'Безопасно перечитать runtime state и пересобрать панели.'));
      if (!activeTaskExists || !activeDeviceExists) suggestions.push(this.diagnosticSuggestion('Очистить stale selection', 'safe', 'clear_stale_selection', 'Сбросить несуществующий active task/device pointer.'));
      if (pendingApprovals.length) suggestions.push(this.diagnosticSuggestion('Разобрать Approval queue', 'approval_required', 'open_approval_center', 'Опасные действия не выполнять, только принять решение владельца.'));
      if (staleWaiting.length || staleManual.length) suggestions.push(this.diagnosticSuggestion('Подготовить recovery plan', 'review', 'create_recovery_plan', 'Сформировать план восстановления без выполнения команд.'));
      if (releaseSnapshot.status !== 'ready') suggestions.push(this.diagnosticSuggestion('Проверить производственный контур', 'review', 'manual_review', 'Откройте панель Производственный контур: она покажет release, backup и observability readiness.'));
      suggestions.push(this.diagnosticSuggestion('Обновить runtime панели', 'safe', 'refresh_runtime', 'Безопасно перечитать локальное состояние и перерисовать Mission/System.'));

      const run = await this.saveSystemDiagnostic({
        diagnostic_id: this.generateWorkspaceId('DIAG'),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        checks,
        suggestions,
        summary: this.diagnosticSummaryText(checks)
      });
      await this.createIncidentsFromDiagnosticRun(run);
      this.toast(`Диагностика: ${this.diagnosticStatusName(run.status)}`);
    } finally {
      this.diagnosticRunning = false;
      this.renderSystemStatus();
    }
  },

  diagnosticSuggestion(title, riskLevel, action, text) {
    return {
      suggestion_id: this.generateWorkspaceId('SUGGEST'),
      title,
      risk_level: riskLevel,
      action,
      text
    };
  },

  diagnosticSummaryText(checks) {
    const danger = checks.filter((check) => ['dangerous', 'blocked'].includes(check.severity) || ['fail', 'blocked'].includes(check.status)).length;
    const review = checks.filter((check) => ['review', 'approval_required'].includes(check.severity) || ['review', 'manual_check'].includes(check.status)).length;
    const pass = checks.filter((check) => check.status === 'pass').length;
    return `${pass} pass, ${review} review/manual, ${danger} danger`;
  },

  diagnosticStatusName(status) {
    const names = {
      ok: 'OK',
      review: 'требует проверки',
      danger: 'есть риск'
    };
    return names[status] || status || 'не запускалась';
  },

  async probeDirectBridgeHealth() {
    const baseUrl = getConfiguredDirectBridgeBaseUrl();
    if (!baseUrl) {
      return this.diagnosticCheck('Direct Bridge health', 'manual_check', 'review', 'Direct Bridge URL не задан.');
    }
    let host = baseUrl;
    try { host = new URL(baseUrl).host; } catch {}
    const publicHealth = await this.probePublicRuntimeHealth();
    if (publicHealth?.ok) {
      const heartbeat = publicHealth.agent_heartbeat?.status || 'missing';
      const taskStore = publicHealth.task_store?.status || 'unknown';
      const queue = publicHealth.command_queue?.status || 'unknown';
      return this.diagnosticCheck('Direct Bridge health', publicHealth.status === 'ready' ? 'pass' : 'manual_check', publicHealth.status === 'ready' ? 'safe' : 'review', `${host}: публичный read-only runtime status получен; очередь=${queue}; хранилище задач=${taskStore}; локальный агент=${heartbeat}.`);
    }
    try {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), DIAGNOSTIC_DIRECT_HEALTH_TIMEOUT_MS);
      const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/health`, {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-store'
      });
      window.clearTimeout(timer);
      if (!response.ok) {
        return this.diagnosticCheck('Direct Bridge health', 'review', 'review', `${host} вернул HTTP ${response.status}. Deploy/config не менялись.`);
      }
      let storage = '';
      try {
        const data = await response.clone().json();
        storage = data?.storage ? ` storage=${data.storage}` : '';
        if (data?.task_store) storage += `; хранилище задач=${data.task_store}`;
      } catch {}
      return this.diagnosticCheck('Direct Bridge health', 'pass', 'safe', `${host} отвечает 200 OK.${storage}`);
    } catch (error) {
      return this.diagnosticCheck('Direct Bridge health', 'manual_check', 'review', `${host}: health read-only check не завершился (${error?.name || 'fetch_error'}).`);
    }
  },

  async handleDiagnostAction(action, button) {
    if (action === 'run') {
      await this.runSystemDiagnostics();
      return;
    }
    if (action === 'refresh_runtime') {
      await this.loadWorkProjects();
      await this.loadWorkTasks();
      await this.syncTaskStore({ interactive: false, reason: 'refresh_runtime' });
      await this.loadSystemDevices();
      await this.loadApprovalRecords();
      await this.loadSystemDiagnostics();
      this.renderMissionControl();
      this.renderSystemStatus();
      this.toast('Runtime панели обновлены');
      return;
    }
    if (action === 'sync_task_store') {
      await this.syncTaskStore({ interactive: true, reason: 'manual_system_action' });
      return;
    }
    if (action === 'clear_stale_selection') {
      if (this.activeWorkTaskId && !this.workTasks.some((task) => task.task_id === this.activeWorkTaskId)) {
        this.activeWorkTaskId = this.workTasks[0]?.task_id || '';
      }
      if (this.activeDeviceId && !this.systemDevices.some((device) => device.device_id === this.activeDeviceId)) {
        this.activeDeviceId = this.systemDevices[0]?.device_id || '';
      }
      if (this.activeApprovalId && !this.approvalRecords.some((approval) => approval.approval_id === this.activeApprovalId)) {
        this.activeApprovalId = this.pendingApprovalRecords()[0]?.approval_id || this.approvalRecords[0]?.approval_id || '';
      }
      this.renderMissionControl();
      this.renderSystemStatus();
      this.toast('Stale selections очищены');
      return;
    }
    if (action === 'open_approval_center') {
      this.go('system');
      this.toast('Approval Center открыт');
      return;
    }
    if (action === 'create_recovery_plan') {
      const approval = this.createApprovalRecord({
        source: 'diagnost',
        action_type: 'recovery_plan',
        action: 'Подготовить recovery plan',
        command: 'Diagnost recovery plan',
        title: 'Diagnost recovery plan',
        reason: 'Диагност обнаружил состояние, требующее плана восстановления. Выполнение команд не запускается.',
        risk_level: 'review',
        impact: 'Будет создан только Approval-запрос/план. Автоматических действий нет.',
        rollback_note: 'Выполнение не запускалось; rollback не требуется.'
      });
      await this.saveApprovalRecord(approval);
      this.toast('Recovery plan создан как Approval');
      return;
    }
  },

  directModeStatusSnapshot() {
    const baseUrl = getConfiguredDirectBridgeBaseUrl();
    const active = isConfiguredDirectModeActive();
    let host = 'bridge url не задан';
    try {
      host = baseUrl ? new URL(baseUrl).host : host;
    } catch {
      host = 'bridge url требует проверки';
    }
    const session = baseUrl ? getStoredOwnerSession(baseUrl) : null;
    if (!baseUrl) return { status: 'не настроен', note: 'Direct Bridge URL не найден в WebApp config' };
    if (!active) return { status: 'не активен', note: `${host}; transport сейчас не direct` };
    if (session?.token) return { status: 'сессия активна', note: `${host}; токен не показывается` };
    return { status: 'ожидает вход', note: `${host}; вход владельца понадобится при отправке команды` };
  },

  localAgentStatusSnapshot() {
    const agent = (this.systemDevices || []).find((device) => device.type === 'local_agent');
    if (!agent) return { status: 'не найден', note: 'Local Agent отсутствует в Device Registry' };
    const status = DEVICE_STATUSES[agent.status] || agent.status || 'не проверено';
    const trust = DEVICE_TRUST_LEVELS[agent.trust_level] || agent.trust_level || 'неизвестно';
    const heartbeatStatus = agent.heartbeat_status
      ? `; heartbeat=${agent.heartbeat_status}${agent.heartbeat_age_ms !== null && agent.heartbeat_age_ms !== undefined ? ` ${this.formatDuration(agent.heartbeat_age_ms)} назад` : ''}`
      : '';
    return {
      status,
      note: `${agent.name}: ${trust}; agent_id=${agent.agent_id || this.getPrimaryOwnedAgentId()}${heartbeatStatus}; ${agent.notes || 'runtime не опрашивался в этом слое'}`
    };
  },

  getPrimaryOwnedAgentDevice() {
    const devices = this.systemDevices || [];
    return devices.find((device) => device.primary_agent && device.agent_id)
      || devices.find((device) => device.type === 'local_agent' && device.agent_id)
      || devices.find((device) => device.device_id === 'device_local_agent')
      || null;
  },

  getPrimaryOwnedAgentId() {
    const primary = this.getPrimaryOwnedAgentDevice();
    return primary?.agent_id || TERMINATOR_DEFAULT_AGENT_ID;
  },

  findOwnedAgentDevice(agentId) {
    const normalizedAgentId = String(agentId || '').trim();
    if (!normalizedAgentId) return null;
    const devices = this.systemDevices || [];
    return devices.find((device) => device.agent_id === normalizedAgentId)
      || devices.find((device) => Array.isArray(device.agent_aliases) && device.agent_aliases.includes(normalizedAgentId))
      || (normalizedAgentId === this.getPrimaryOwnedAgentId() ? this.getPrimaryOwnedAgentDevice() : null);
  },

  shouldRecordOwnedAgentHeartbeatEvent(device, heartbeat) {
    const events = Array.isArray(device.events) ? device.events : [];
    const lastHeartbeatEvent = events
      .filter((event) => event.type === 'agent_heartbeat')
      .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))[0];
    if (!lastHeartbeatEvent) return true;
    if (device.heartbeat_status && device.heartbeat_status !== heartbeat.status) return true;
    const lastAt = new Date(lastHeartbeatEvent.created_at || 0).getTime();
    return !Number.isFinite(lastAt) || Date.now() - lastAt > OWNED_AGENT_HEARTBEAT_EVENT_MIN_MS;
  },

  async applyPublicRuntimeHealthToOwnedRegistry(snapshot) {
    const heartbeat = snapshot?.agent_heartbeat;
    if (!heartbeat || heartbeat.status === 'missing' || !heartbeat.agent_id) return false;
    const now = new Date().toISOString();
    let agent = this.findOwnedAgentDevice(heartbeat.agent_id);
    if (!agent) {
      agent = this.normalizeDevice({
        device_id: `device_agent_${String(heartbeat.agent_id).replace(/[^a-z0-9_-]/gi, '_').toLowerCase()}`,
        name: `Локальный агент ${heartbeat.agent_id}`,
        type: 'local_agent',
        connection_type: 'bridge_polling',
        trust_level: 'paired',
        status: 'unknown',
        risk_level: 'review',
        owner_confirmed: false,
        agent_id: heartbeat.agent_id,
        owned_registry_role: 'discovered_agent',
        notes: 'Агент обнаружен через публичный heartbeat моста. Доверие владельца нужно подтвердить вручную.',
        route_role: 'обнаруженный runtime-агент',
        handoff_state: 'ожидает решения владельца',
        capabilities: [
          ['cap_agent_health', 'read_status', 'Показать heartbeat и read-only health', 'safe', false],
          ['cap_agent_commands', 'poll_commands', 'Получать только разрешённые команды после политики владельца', 'review', true]
        ]
      });
      this.systemDevices.push(agent);
    }

    const recordEvent = this.shouldRecordOwnedAgentHeartbeatEvent(agent, heartbeat);
    agent.agent_id = heartbeat.agent_id;
    const agentAliases = [...(agent.agent_aliases || []), heartbeat.agent_id];
    if (agent.primary_agent || heartbeat.agent_id === TERMINATOR_DEFAULT_AGENT_ID) {
      agentAliases.push(TERMINATOR_DEFAULT_AGENT_ID);
    }
    agent.agent_aliases = Array.from(new Set(agentAliases.filter(Boolean)));
    agent.heartbeat_status = heartbeat.status || 'missing';
    agent.heartbeat_stale = Boolean(heartbeat.stale);
    agent.heartbeat_age_ms = heartbeat.age_ms === null || heartbeat.age_ms === undefined ? null : Number(heartbeat.age_ms);
    agent.heartbeat_bridge_seen_at = heartbeat.bridge_seen_at || now;
    agent.heartbeat_version = heartbeat.version || '';
    agent.poll_interval_ms = heartbeat.poll_interval_ms === null || heartbeat.poll_interval_ms === undefined ? null : Number(heartbeat.poll_interval_ms);
    agent.storage_root_status = heartbeat.storage_root_status || agent.storage_root_status || 'unknown';
    agent.last_seen = heartbeat.bridge_seen_at || now;
    agent.status = heartbeat.status === 'online' && !heartbeat.stale ? 'connected' : 'degraded';
    agent.handoff_state = agent.status === 'connected'
      ? 'heartbeat активен, агент виден через мост'
      : 'heartbeat устарел, требуется проверка локального агента';
    agent.notes = `Runtime-агент владельца. Последний heartbeat: ${agent.status === 'connected' ? 'online' : 'stale'}; storage=${agent.storage_root_status}.`;
    agent.updated_at = now;
    const capabilities = Array.isArray(heartbeat.capabilities) ? heartbeat.capabilities : [];
    if (capabilities.length) {
      agent.runtime_capabilities = capabilities.slice(0, 20);
    }
    if (recordEvent) {
      this.addDeviceEvent(agent, 'agent_heartbeat', `Heartbeat: ${agent.heartbeat_status}; storage=${agent.storage_root_status}; version=${agent.heartbeat_version || 'unknown'}.`, agent.status === 'connected' ? 'safe' : 'review');
    }

    const pc = (this.systemDevices || []).find((device) => device.device_id === 'device_terminator_pc');
    if (pc) {
      pc.linked_agent_id = heartbeat.agent_id;
      pc.status = agent.status === 'connected' ? 'connected' : pc.status;
      pc.last_seen = agent.last_seen;
      pc.handoff_state = agent.status === 'connected' ? 'ПК подтверждён через heartbeat локального агента' : pc.handoff_state;
      pc.updated_at = now;
    }

    await this.saveSystemDevices();
    return true;
  },

  buildOwnedAgentRegistrySnapshot() {
    const devices = this.systemDevices || [];
    const agents = devices.filter((device) => device.agent_id || device.type === 'local_agent');
    const primary = this.getPrimaryOwnedAgentDevice();
    const publicRegistry = this.publicRuntimeHealth?.agent_registry || null;
    const onlineAgents = agents.filter((device) => device.heartbeat_status === 'online' && !device.heartbeat_stale);
    const staleAgents = agents.filter((device) => (device.heartbeat_status && device.heartbeat_status !== 'online') || device.heartbeat_stale);
    const unknownAgents = agents.filter((device) => !device.heartbeat_status);
    const connectedDevices = devices.filter((device) => ['connected', 'ready', 'trusted'].includes(device.status));
    const trustedDevices = devices.filter((device) => ['trusted', 'owner_device', 'system_device'].includes(device.trust_level));
    const readiness = Math.max(35, Math.min(100,
      36
      + (primary ? 14 : 0)
      + (onlineAgents.length ? 24 : 0)
      + (trustedDevices.length ? Math.min(14, trustedDevices.length * 2) : 0)
      + (connectedDevices.length ? Math.min(10, connectedDevices.length * 2) : 0)
      + (publicRegistry?.agent_count ? 2 : 0)
    ));
    const status = onlineAgents.length && primary ? 'ready' : staleAgents.length ? 'review' : primary ? 'partial' : 'waiting';
    const next = !primary
      ? 'Выбрать основной агент владельца.'
      : !onlineAgents.length
        ? 'Проверить heartbeat локального агента.'
        : unknownAgents.length
          ? 'Разобрать агентов без live heartbeat.'
          : 'Реестр владельца видит основной runtime.';
    return {
      schema_version: OWNED_DEVICE_REGISTRY_SCHEMA_VERSION,
      status,
      readiness,
      primary_agent_id: primary?.agent_id || TERMINATOR_DEFAULT_AGENT_ID,
      primary_device_id: primary?.device_id || '',
      agent_count: agents.length,
      online_count: onlineAgents.length,
      stale_count: staleAgents.length,
      unknown_count: unknownAgents.length,
      trusted_devices: trustedDevices.length,
      connected_devices: connectedDevices.length,
      agents,
      primary,
      public_registry: publicRegistry,
      next
    };
  },

  ownedAgentRegistryStatusText(status) {
    return {
      ready: 'готово',
      partial: 'частично',
      review: 'нужна проверка',
      waiting: 'не настроено',
      blocked: 'заблокировано'
    }[status] || status || 'не проверено';
  },

  buildOwnedAgentRegistryReport(snapshot = this.buildOwnedAgentRegistrySnapshot()) {
    return [
      'Owned Device / Agent Registry V1',
      `Готовность: ${snapshot.readiness}% (${this.ownedAgentRegistryStatusText(snapshot.status)})`,
      `Основной agent_id: ${snapshot.primary_agent_id}`,
      `Агентов: ${snapshot.agent_count}`,
      `Online: ${snapshot.online_count}`,
      `Устарели: ${snapshot.stale_count}`,
      `Без heartbeat: ${snapshot.unknown_count}`,
      `Доверенных устройств: ${snapshot.trusted_devices}`,
      `На связи: ${snapshot.connected_devices}`,
      '',
      'Агенты:',
      ...snapshot.agents.map((agent) => `- ${agent.name}: agent_id=${agent.agent_id || 'not_set'}; status=${DEVICE_STATUSES[agent.status] || agent.status}; heartbeat=${agent.heartbeat_status || 'not_checked'}; last_seen=${agent.last_seen || 'never'}; storage=${agent.storage_root_status || 'unknown'}`),
      '',
      `Следующий шаг: ${snapshot.next}`,
      'Секреты, cookies, токены и пароли не сохраняются в реестре.'
    ].join('\n');
  },

  taskStoreStatusSnapshot() {
    const baseUrl = getConfiguredDirectBridgeBaseUrl();
    const session = baseUrl ? getStoredOwnerSession(baseUrl) : null;
    const lastSync = this.taskStoreLastSyncAt ? this.formatTaskTime(this.taskStoreLastSyncAt) : '';
    const taskCount = Number.isFinite(Number(this.taskStoreLastTaskCount))
      ? Number(this.taskStoreLastTaskCount)
      : (this.workTasks || []).length;

    if (this.taskStoreSyncRunning || this.taskStoreSyncStatus === 'syncing') {
      return {
        status: 'идёт синхронизация',
        tone: 'syncing',
        note: 'Идёт обмен с общим хранилищем задач. Подождите несколько секунд.'
      };
    }

    if (this.taskStoreSyncStatus === 'synced') {
      return {
        status: 'активна',
        tone: 'synced',
        note: lastSync
          ? `Последняя синхронизация: ${lastSync}. Задач в контуре: ${taskCount}.`
          : `Общее хранилище задач подключено. Задач в контуре: ${taskCount}.`
      };
    }

    if (session?.token) {
      return {
        status: 'вход активен',
        tone: 'session',
        note: 'Пароль принят, сессия владельца активна. Нажмите «Синхронизировать задачи», чтобы обновить TaskStore.'
      };
    }

    if (this.taskStoreSyncStatus === 'owner_session_required') {
      return {
        status: 'ждёт вход',
        tone: 'waiting',
        note: this.taskStoreSyncError || 'Нажмите «Синхронизировать задачи» и введите пароль владельца.'
      };
    }

    if (this.taskStoreSyncStatus === 'failed') {
      return {
        status: 'ошибка',
        tone: 'failed',
        note: this.taskStoreSyncError || 'Синхронизация не прошла. Нажмите «Синхронизировать задачи» повторно.'
      };
    }

    if (!baseUrl) {
      return {
        status: 'не настроена',
        tone: 'failed',
        note: 'Direct Bridge URL не найден в конфигурации WebApp.'
      };
    }

    return {
      status: 'не проверялась',
      tone: 'waiting',
      note: 'Нажмите «Синхронизировать задачи». После успеха здесь появится время последней синхронизации.'
    };
  },

  persistTaskStoreSyncState() {
    storeTaskStoreSyncState({
      status: this.taskStoreSyncStatus,
      lastSyncAt: this.taskStoreLastSyncAt,
      error: this.taskStoreSyncError,
      taskCount: this.taskStoreLastTaskCount,
      updatedAt: new Date().toISOString()
    });
  },

  renderSystemStatus() {
    const host = document.getElementById('system-summary');
    if (!host) return;
    const tasks = this.workTasks || [];
    const projects = this.activeWorkProjects();
    const approvals = this.pendingApprovalRecords().length;
    const trustedDevices = this.systemDevices.filter((device) => ['trusted', 'owner_device', 'system_device'].includes(device.trust_level)).length;
    const direct = this.directModeStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const taskStore = this.taskStoreStatusSnapshot();
    const head = this.headStatusSnapshot();
    const guardian = this.guardianSnapshot();
    const pwa = this.pwaSnapshot();
    const release = this.productionReleaseState?.checked_at ? this.productionReleaseState : this.buildProductionReadinessSnapshot();
    const preQamax = this.preQamaxGateState?.checked_at ? this.preQamaxGateState : this.buildPreQamaxGateSnapshot();
    const schemaSafety = this.schemaSafetyState?.last_checked_at ? this.schemaSafetyState : this.buildSchemaSafetySnapshot();
    const registry = this.systemRegistryState?.last_checked_at ? this.systemRegistryState : this.buildSystemRegistrySnapshot();
    const policy = this.policyCenterState?.last_checked_at ? this.policyCenterState : this.buildPolicyCenterSnapshot();
    const memorySearch = this.memorySearchSnapshot();
    const eyes = this.eyesVisualSnapshot();
    const hands = this.handsSnapshot();
    const deviceMesh = this.buildDeviceMeshSnapshot();
    const ownedRegistry = deviceMesh.ownedRegistry || this.buildOwnedAgentRegistrySnapshot();
    const presence = deviceMesh.presence || this.buildDevicePresenceSnapshot();
    const integration = this.buildIntegrationSnapshot();
    const liveRuntime = this.buildLiveRuntimeSnapshot();
    const truth = this.refreshSourceOfTruthSnapshot();
    const cards = [
      ['Источник истины', `${truth.score}%`, `${truth.label}: ${truth.next.name}`],
      ['Интеграция', `${integration.score}%`, `${integration.label}: ${integration.next.name}`],
      ['Живой контур', `${liveRuntime.score}%`, `${liveRuntime.label}: ${liveRuntime.next.name}`],
      ['Guardian', guardian.label, guardian.note],
      ['Ворота перед QAMAX', this.phase6StatusName(preQamax.status), `${preQamax.score || 0}% · ${preQamax.summary || 'финальный gate ожидает запуска'}`],
      ['Производственный контур', this.phase6StatusName(release.status), `готовность ${release.score || 0}% · ${release.summary || 'проверка ожидает запуска'}`],
      ['Схемы данных', this.phase6StatusName(schemaSafety.status), `готовность ${schemaSafety.score || 0}% · ${schemaSafety.summary || 'dry-run ожидает запуска'}`],
      ['Реестр системы', this.systemRegistryStatusName(registry.status), `готовность ${registry.score || 0}% · ${registry.summary || 'проверка ожидает запуска'}`],
      ['Настройки и правила', this.policyCenterStatusName(policy.status), `готовность ${policy.score || 0}% · ${policy.summary || 'проверка ожидает запуска'}`],
      ['Поиск по памяти', this.memorySearchStatusName(memorySearch.status), memorySearch.note],
      ['Синхронизация задач', taskStore.status, taskStore.note],
      ['Задачи', this.taskRuntimeReady ? 'локальная база' : 'резервный режим', this.taskRuntimeReady ? `${tasks.length} задач, ${projects.length} проектов` : 'браузерный резерв localStorage'],
      ['Голова', head.status, head.note],
      ['Глаза', eyes.label, eyes.note],
      ['Руки', hands.label, hands.note],
      ['Подтверждения', approvals, 'опасные действия не выполняются автоматически'],
      ['Реестр владельца', `${ownedRegistry.readiness}%`, `агент ${ownedRegistry.primary_agent_id}; online=${ownedRegistry.online_count}; устройств на связи=${ownedRegistry.connected_devices}`],
      ['Ноги / Устройства', `${deviceMesh.readiness}%`, `${trustedDevices} доверенных; ${deviceMesh.routes.length} маршрутов; ${deviceMesh.attention} требуют внимания`],
      ['Телефон / PWA', `${presence.readiness}%`, `${presence.phone.owner_confirmed ? 'телефон отмечен владельцем' : 'телефон ждёт подключения'}; PWA: ${presence.pwa.install_label}`],
      ['Мобильное приложение', pwa.installLabel, `offline shell: ${pwa.serviceWorker}`],
      ['Голос Мины', this.workspaceVoiceSupported ? 'по кнопке' : 'текстовый режим', 'без фонового прослушивания и без AI API'],
      ['Хранилище', TERMINATOR_STORAGE_ROOT, 'тяжёлые outputs и evidence на D'],
      ['Мост', direct.status, direct.note],
      ['Локальный агент', agent.status, agent.note]
    ];
    host.innerHTML = cards.map(([title, value, note], index) => `
      <article class="mission-card ${index === 0 ? `task-sync-card task-sync-card--${this.escapeHtml(taskStore.tone)}` : ''}">
        <span>${this.escapeHtml(title)}</span>
        <strong>${this.escapeHtml(value)}</strong>
        <p>${this.escapeHtml(note)}</p>
      </article>
    `).join('');
    this.renderSystemIntegrationPanel();
    this.renderSystemLiveRuntimePanel();
    this.renderSystemDiagnostics();
    this.renderGuardianPanel();
    this.renderSystemRegistryPanel();
    this.renderSystemPolicyCenter();
    this.renderSystemStoragePolicy();
    this.renderSystemLastCheckpoint();
    this.renderSystemLegacyWarnings();
    this.renderSystemHeadPanel();
    this.renderSystemMemorySearchPanel();
    this.renderSystemEyesPanel();
    this.renderSystemHandsPanel();
    this.renderApprovalCenter();
    this.renderSystemDevicePreview();
    this.renderSystemVoiceHooks();
    this.renderSystemPwaPanel();
    this.renderSystemCompanionPanel();
    this.renderSystemPreQamaxGatePanel();
    this.renderSystemReleaseCenter();
    this.renderSystemSchemaSafetyPanel();
    this.renderSystemBackupCenter();
    this.renderSystemObservabilityPanel();
    this.renderMinaSystemScheme();
  },

  renderSystemIntegrationPanel() {
    const host = document.getElementById('system-integration-panel');
    if (!host) return;
    const snapshot = this.buildIntegrationSnapshot();
    const truth = this.currentSourceOfTruthSnapshot({ refresh: true });
    const tone = snapshot.status === 'ready' ? 'ready' : snapshot.status === 'blocked' ? 'blocked' : 'review';
    const truthTone = truth.status === 'ready' ? 'ready' : truth.status === 'blocked' ? 'blocked' : 'review';
    host.innerHTML = `
      <section class="source-truth-panel source-truth-panel--${this.escapeHtml(truthTone)}" aria-label="Единый источник истины">
        <div>
          <span>Источник истины</span>
          <strong>${this.escapeHtml(String(truth.score))}%</strong>
          <p>${this.escapeHtml(truth.summary)}</p>
        </div>
        <div>
          <span>Следующий шаг</span>
          <strong>${this.escapeHtml(truth.next.name)}</strong>
          <p>${this.escapeHtml(truth.next.note)}</p>
        </div>
        <div>
          <span>Источники</span>
          <strong>${this.escapeHtml(String(truth.counts.ready))}/${this.escapeHtml(String(truth.counts.total))}</strong>
          <p>Снимок: ${this.escapeHtml(truth.checked_at ? this.formatTaskTime(truth.checked_at) : 'не собран')}</p>
        </div>
        <div class="integration-actions">
          <button type="button" data-integration-action="refresh_source_truth">Обновить снимок</button>
          <button type="button" data-integration-action="${this.escapeHtml(truth.next.action)}">Открыть следующий шаг</button>
        </div>
      </section>
      <section class="integration-hero integration-hero--${this.escapeHtml(tone)}">
        <div>
          <span>Интеграция контура</span>
          <strong>${this.escapeHtml(String(snapshot.score))}%</strong>
          <p>${this.escapeHtml(snapshot.summary)}</p>
        </div>
        <div>
          <span>Следующий шаг</span>
          <strong>${this.escapeHtml(snapshot.next.name)}</strong>
          <p>${this.escapeHtml(snapshot.next.note)}</p>
        </div>
        <div class="integration-actions">
          <button type="button" data-integration-action="refresh">Проверить связи</button>
          <button type="button" data-integration-action="${this.escapeHtml(snapshot.next.action)}">Открыть следующий шаг</button>
          <button type="button" data-nav="mission">Центр управления</button>
        </div>
      </section>
      <section class="integration-grid" aria-label="Матрица связей Терминатора">
        ${truth.sources.slice(0, 8).map((source) => `
          <article class="integration-check integration-check--${this.escapeHtml(source.status)}">
            <div>
              <span>${this.escapeHtml(source.owner_text)}</span>
              <strong>${this.escapeHtml(source.name)}</strong>
              <p>${this.escapeHtml(source.note)}</p>
            </div>
            <button type="button" data-integration-action="${this.escapeHtml(source.action)}">${this.escapeHtml(source.status === 'ready' ? 'Открыть' : 'Проверить')}</button>
          </article>
        `).join('')}
        ${snapshot.checks.map((check) => `
          <article class="integration-check integration-check--${this.escapeHtml(check.status)}">
            <div>
              <span>${this.escapeHtml(check.owner_text)}</span>
              <strong>${this.escapeHtml(check.name)}</strong>
              <p>${this.escapeHtml(check.note)}</p>
            </div>
            <button type="button" data-integration-action="${this.escapeHtml(check.action)}">${this.escapeHtml(check.status === 'ready' ? 'Открыть' : 'Проверить')}</button>
          </article>
        `).join('')}
      </section>
    `;
  },

  renderSystemLiveRuntimePanel() {
    const host = document.getElementById('system-live-runtime-panel');
    if (!host) return;
    const snapshot = this.buildLiveRuntimeSnapshot();
    const tone = snapshot.status === 'ready' ? 'ready' : snapshot.status === 'blocked' ? 'blocked' : snapshot.status === 'checking' ? 'checking' : 'review';
    const lastChecked = snapshot.checked_at ? this.formatTaskTime(snapshot.checked_at) : 'ещё не проверялся';
    const bridgeLatency = Number.isFinite(Number(snapshot.bridge_latency_ms)) ? `${snapshot.bridge_latency_ms} мс` : 'нет замера';
    host.innerHTML = `
      <section class="live-runtime-hero live-runtime-hero--${this.escapeHtml(tone)}">
        <div>
          <span>Живой контур</span>
          <strong>${this.escapeHtml(String(snapshot.score))}%</strong>
          <p>${this.escapeHtml(snapshot.summary)}</p>
        </div>
        <div>
          <span>Последняя проверка</span>
          <strong>${this.escapeHtml(lastChecked)}</strong>
          <p>Задержка моста: ${this.escapeHtml(bridgeLatency)}; задач в общем хранилище: ${this.escapeHtml(String(snapshot.task_count ?? this.taskStoreLastTaskCount ?? 'неизвестно'))}</p>
        </div>
        <div>
          <span>Следующий шаг</span>
          <strong>${this.escapeHtml(snapshot.next.name)}</strong>
          <p>${this.escapeHtml(snapshot.next.note)}</p>
        </div>
        <div class="live-runtime-actions">
          <button type="button" data-live-runtime-action="refresh" ${this.liveRuntimeChecking ? 'disabled' : ''}>${this.liveRuntimeChecking ? 'Проверяю...' : 'Проверить живой контур'}</button>
          <button type="button" data-live-runtime-action="sync_taskstore">Синхронизировать хранилище задач</button>
          <button type="button" data-live-runtime-action="${this.escapeHtml(snapshot.next.action)}">Открыть следующий шаг</button>
        </div>
      </section>
      <section class="live-runtime-grid" aria-label="Проверки живого контура">
        ${snapshot.checks.map((check) => `
          <article class="live-runtime-check live-runtime-check--${this.escapeHtml(check.status)}">
            <div>
              <span>${this.escapeHtml(this.liveRuntimeStatusName(check.status))}</span>
              <strong>${this.escapeHtml(check.name)}</strong>
              <p>${this.escapeHtml(check.note)}</p>
              <small>${this.escapeHtml(check.source)}${check.latency_ms ? ` · ${this.escapeHtml(String(check.latency_ms))} мс` : ''}</small>
            </div>
            <button type="button" data-live-runtime-action="${this.escapeHtml(check.action)}">${this.escapeHtml(check.status === 'ready' ? 'Открыть' : 'Проверить')}</button>
          </article>
        `).join('')}
      </section>
    `;
  },

  async handleIntegrationAction(action) {
    const scrollTo = (id) => {
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    };

    if (action === 'refresh_source_truth') {
      this.refreshSourceOfTruthSnapshot();
      this.renderMissionControl();
      this.renderSystemStatus();
      this.renderMinaSystemScheme();
      this.toast('Источник истины обновлён');
      return;
    }

    if (action === 'refresh' || action === 'run') {
      this.refreshSourceOfTruthSnapshot();
      this.renderMissionControl();
      this.renderSystemStatus();
      this.toast('Связи контура проверены локально');
      return;
    }

    if (action === 'open_work') {
      this.go('work');
      return;
    }

    if (action === 'open_mission') {
      this.go('mission');
      return;
    }

    if (action === 'open_scheme') {
      this.go('scheme');
      return;
    }

    if (action === 'open_diagnostics') {
      this.go('system');
      scrollTo('system-diagnostics');
      return;
    }

    if (action === 'open_live_runtime') {
      this.go('system');
      scrollTo('system-live-runtime-panel');
      return;
    }

    if (action === 'open_guardian') {
      this.go('system');
      scrollTo('system-guardian-panel');
      return;
    }

    if (action === 'open_approval') {
      this.go('system');
      scrollTo('system-approval-center');
      return;
    }

    if (action === 'open_memory') {
      this.go('system');
      scrollTo('system-memory-search-panel');
      return;
    }

    if (action === 'open_head') {
      this.go('system');
      scrollTo('system-head-panel');
      return;
    }

    if (action === 'open_eyes') {
      this.go('system');
      scrollTo('system-eyes-panel');
      return;
    }

    if (action === 'open_hands') {
      this.go('system');
      scrollTo('system-hands-panel');
      return;
    }

    if (action === 'open_voice') {
      this.go('system');
      scrollTo('system-voice-hooks');
      return;
    }

    if (action === 'open_devices') {
      this.go('system');
      scrollTo('system-device-preview');
      return;
    }

    if (action === 'open_pwa') {
      this.go('system');
      scrollTo('system-pwa-panel');
      return;
    }

    if (action === 'open_companion') {
      this.go('system');
      scrollTo('system-companion-panel');
      return;
    }

    this.go('system');
    scrollTo('system-integration-panel');
  },

  renderSystemDiagnostics() {
    const host = document.getElementById('system-diagnostics');
    if (!host) return;
    const direct = this.directModeStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const taskStore = this.taskStoreStatusSnapshot();
    const head = this.headStatusSnapshot();
    const guardian = this.guardianSnapshot();
    const liveRuntime = this.buildLiveRuntimeSnapshot();
    const truth = this.currentSourceOfTruthSnapshot({ refresh: true });
    const latest = this.systemDiagnostics[0] || null;
    const rows = [
      ['Источник истины', `${truth.score}%`, `${truth.summary}; следующий шаг: ${truth.next.name}`],
      ['Guardian', guardian.label, `${guardian.note}; incidents: ${guardian.openIncidents.length}`],
      ['Живой контур', `${liveRuntime.score}%`, `${liveRuntime.summary}; последний прогон: ${liveRuntime.checked_at ? this.formatTaskTime(liveRuntime.checked_at) : 'не запускался'}`],
      ['Хранилище задач', this.taskRuntimeReady ? 'OK' : 'резерв', this.taskRuntimeReady ? 'локальная база браузера доступна' : 'используется резерв localStorage'],
      ['Журнал событий', 'OK', 'события Рабочего окна сохраняются в задаче и локальной базе'],
      ['Модель задач', 'OK', 'поля под голос и устройства есть в новых задачах'],
      ['Голова', head.status, head.note],
      ['Реестр устройств', this.systemDevices.length ? 'OK' : 'нет данных', `${this.systemDevices.length} устройств в локальном реестре`],
      ['Политика устройств', 'OK', 'только паспорта, доверие, риски и возможности; реальные команды устройствам не запускаются'],
      ['Голос Мины', this.workspaceVoiceSupported ? 'OK' : 'резерв', this.workspaceVoiceSupported ? 'режим по кнопке доступен' : 'доступен текстовый preview'],
      ['Главное меню', 'OK', '`Личное` скрыто из активного меню'],
      ['Legacy Personal route', this.isLegacyPersonalAccessAllowed() ? 'rollback flag on' : 'blocked', this.isLegacyPersonalAccessAllowed() ? 'Внутренний rollback-доступ включён; выключить перед production QA' : 'Прямой переход в старое Личное блокируется'],
      ['Хранилище агента', `контракт v${TASK_STORAGE_SCHEMA_VERSION}`, 'подготовка, запись, проверка и restore point готовы без удаления и без чтения секретов'],
      ['Проверка результата', 'read-only', 'локальный агент может проверить текст/task storage и записать CHECK_LOG'],
      ['Память', 'D storage ready', 'Memory Preview можно сохранить как запись в папку памяти задачи'],
      ['Мост', direct.status, `${direct.note}; deploy/config не менялись`],
      ['Локальный агент', agent.status, `${agent.note}; runtime на ПК не менялся`],
      ['AI API', 'Disabled', 'Runtime-вызовы AI API не добавлялись']
    ];
    host.innerHTML = `
      <section class="diagnost-console">
        <div class="task-sync-banner task-sync-banner--${this.escapeHtml(taskStore.tone)}">
          <strong>Синхронизация задач: ${this.escapeHtml(taskStore.status)}</strong>
          <span>${this.escapeHtml(taskStore.note)}</span>
        </div>
        <div class="diagnost-actions">
          <button type="button" data-diagnost-action="run" ${this.diagnosticRunning ? 'disabled' : ''}>${this.diagnosticRunning ? 'Проверяю...' : 'Запустить диагностику'}</button>
          <button type="button" data-diagnost-action="refresh_runtime">Обновить панели</button>
          <button type="button" data-diagnost-action="sync_task_store">Синхронизировать задачи</button>
          <button type="button" data-diagnost-action="clear_stale_selection">Очистить stale state</button>
        </div>
        <div class="diagnost-status">
          <strong>${this.escapeHtml(latest ? this.diagnosticStatusName(latest.status) : 'не запускалась')}</strong>
          <span>${this.escapeHtml(latest ? this.formatTaskTime(latest.created_at) : 'последнего прогона нет')}</span>
          <p>${this.escapeHtml(latest?.summary || 'Диагност готов к read-only проверке runtime, bridge health, approvals, storage policy и UI state.')}</p>
        </div>
      </section>
      <section class="diagnost-grid">
        <div>
          <div class="diagnost-subtitle">Базовое состояние</div>
          ${rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('')}
        </div>
        <div>
          <div class="diagnost-subtitle">Последний прогон</div>
          ${latest ? this.renderDiagnosticRun(latest) : '<p class="mission-empty">Запусти диагностику, чтобы увидеть checks и предложения восстановления.</p>'}
        </div>
      </section>
    `;
  },

  renderDiagnosticRun(run) {
    const checks = run.checks || [];
    const suggestions = run.suggestions || [];
    return `
      <div class="diagnost-run">
        ${checks.map((check) => `
          <article class="diagnost-check diagnost-check--${this.escapeHtml(check.status)}">
            <div>
              <strong>${this.escapeHtml(check.name)}</strong>
              <p>${this.escapeHtml(check.note)}</p>
            </div>
            <span>${this.escapeHtml(check.status)}</span>
          </article>
        `).join('')}
        <div class="diagnost-subtitle">Предложения восстановления</div>
        ${suggestions.map((suggestion) => `
          <article class="diagnost-suggestion">
            <div>
              <strong>${this.escapeHtml(suggestion.title)}</strong>
              <p>${this.escapeHtml(suggestion.text)}</p>
              <small>${this.escapeHtml(suggestion.risk_level)}</small>
            </div>
            ${suggestion.action ? `<button type="button" data-diagnost-action="${this.escapeHtml(suggestion.action)}">${this.escapeHtml(this.diagnosticActionName(suggestion.action))}</button>` : ''}
          </article>
        `).join('') || '<p class="mission-empty">Предложений нет.</p>'}
      </div>
    `;
  },

  diagnosticActionName(action) {
    const names = {
      refresh_runtime: 'Обновить',
      sync_task_store: 'Синхронизировать',
      clear_stale_selection: 'Очистить',
      open_approval_center: 'Открыть',
      create_recovery_plan: 'Создать план',
      manual_review: 'Ручная проверка'
    };
    return names[action] || 'Открыть';
  },

  renderGuardianPanel() {
    const host = document.getElementById('system-guardian-panel');
    if (!host) return;
    const snapshot = this.guardianSnapshot();
    const state = snapshot.state;
    const incidents = this.guardianIncidents || [];
    const openIncidents = snapshot.openIncidents;
    const active = incidents.find((incident) => incident.incident_id === this.activeIncidentId) || openIncidents[0] || incidents[0] || null;
    if (active) this.activeIncidentId = active.incident_id;
    host.innerHTML = `
      <section class="guardian-hero guardian-hero--${this.escapeHtml(snapshot.tone)}">
        <div>
          <span>Состояние защиты</span>
          <strong>${this.escapeHtml(snapshot.label)}</strong>
          <p>${this.escapeHtml(snapshot.note)}</p>
        </div>
        <dl>
          <div><dt>Safe Mode</dt><dd>${state.safe_mode ? 'включён' : 'выключен'}</dd></div>
          <div><dt>Стоп</dt><dd>${state.emergency_stop_active ? 'активен' : 'нет'}</dd></div>
          <div><dt>Autonomy</dt><dd>Level ${state.autonomy_level}</dd></div>
          <div><dt>Incidents</dt><dd>${openIncidents.length}</dd></div>
        </dl>
      </section>

      <div class="guardian-actions">
        <button type="button" class="guardian-danger" data-guardian-action="emergency_stop">Стоп действия</button>
        <button type="button" data-guardian-action="${state.safe_mode ? 'safe_mode_off' : 'safe_mode_on'}">${state.safe_mode ? 'Снять Safe Mode' : 'Включить Safe Mode'}</button>
        <button type="button" data-guardian-action="create_manual_incident">Создать incident</button>
        <button type="button" data-guardian-action="refresh_guardian">Обновить Guardian</button>
      </div>

      <section class="guardian-layout">
        <div class="guardian-queue">
          <div class="approval-center-head">
            <strong>Incident Log</strong>
            <span>${openIncidents.length} открытых</span>
          </div>
          ${incidents.slice(0, 10).map((incident) => this.renderGuardianIncidentItem(incident, active)).join('') || '<p class="mission-empty">Инцидентов пока нет. Диагност создаст их при проблемах.</p>'}
        </div>
        <div class="guardian-detail">
          ${active ? this.renderGuardianIncidentDetail(active) : '<p class="mission-empty">Выберите incident или запустите диагностику.</p>'}
        </div>
      </section>

      <section class="guardian-two-col">
        <div>
          <div class="diagnost-subtitle">Cost Guard</div>
          <div class="guardian-cost-grid">${this.renderCostGuardRows()}</div>
        </div>
        <div>
          <div class="diagnost-subtitle">Capability Matrix</div>
          <div class="guardian-capability-grid">${this.renderCapabilityMatrixRows()}</div>
        </div>
      </section>

      <section class="guardian-two-col">
        <div>
          <div class="diagnost-subtitle">Eyes / Hands Foundation</div>
          <div class="guardian-cost-grid">${this.renderWorkerFoundationRows()}</div>
        </div>
        <div>
          <div class="diagnost-subtitle">First Run Safety Wizard</div>
          <div class="guardian-cost-grid">${this.renderSafetyWizardRows()}</div>
        </div>
      </section>

      <section class="guardian-two-col">
        <div>
          <div class="diagnost-subtitle">Eyes / Hands Actions</div>
          <div class="guardian-worker-console">
            <div class="guardian-actions">
              <button type="button" data-guardian-action="run_worker_check">Проверить Eyes/Hands</button>
              <button type="button" data-guardian-action="copy_worker_command">Команда Local Agent</button>
              <button type="button" data-guardian-action="create_worker_incident">Создать worker incident</button>
            </div>
            <div class="guardian-cost-grid">${this.renderWorkerActionRows()}</div>
          </div>
        </div>
        <div>
          <div class="diagnost-subtitle">Worker Reports</div>
          <div class="guardian-cost-grid">${this.renderGuardianWorkerReportRows()}</div>
        </div>
      </section>
    `;
  },

  renderGuardianIncidentItem(incident, active) {
    return `
      <button type="button" class="approval-item guardian-incident ${active?.incident_id === incident.incident_id ? 'active' : ''}" data-guardian-action="select_incident" data-incident-id="${this.escapeHtml(incident.incident_id)}">
        <span>${this.escapeHtml(INCIDENT_STATUS_LABELS[incident.status] || incident.status)}</span>
        <strong>${this.escapeHtml(incident.title)}</strong>
        <small>${this.escapeHtml(INCIDENT_SEVERITY_LABELS[incident.severity] || incident.severity)} · ${this.escapeHtml(incident.source)}</small>
      </button>
    `;
  },

  renderGuardianIncidentDetail(incident) {
    const repair = incident.repair || {};
    const packReady = Boolean(incident.diagnostic_pack);
    const repairReady = Boolean(incident.repair_workspace);
    return `
      <div class="approval-detail-head guardian-detail-head">
        <div>
          <span>${this.escapeHtml(INCIDENT_SEVERITY_LABELS[incident.severity] || incident.severity)}</span>
          <h3>${this.escapeHtml(incident.title)}</h3>
          <p>${this.escapeHtml(incident.summary || 'Описание не задано.')}</p>
        </div>
        <strong>${this.escapeHtml(INCIDENT_STATUS_LABELS[incident.status] || incident.status)}</strong>
      </div>
      <dl class="approval-grid">
        <div><dt>incident_id</dt><dd>${this.escapeHtml(incident.incident_id)}</dd></div>
        <div><dt>Область</dt><dd>${this.escapeHtml(incident.affected_area)}</dd></div>
        <div><dt>Риск</dt><dd>${this.escapeHtml(incident.risk_level)}</dd></div>
        <div><dt>Approval</dt><dd>${incident.approval_required ? 'требуется' : 'не требуется'}</dd></div>
        <div><dt>Codex Repair</dt><dd>${this.escapeHtml(repair.status || 'not_started')}</dd></div>
        <div><dt>Verifier</dt><dd>${this.escapeHtml(repair.verifier_status || 'not_checked')}</dd></div>
      </dl>
      <section class="guardian-repair">
        <strong>Codex Repair Operator</strong>
        <p>${packReady ? 'Diagnostic Pack готов. ' : 'Diagnostic Pack ещё не собран. '} ${repairReady ? 'Repair workspace metadata создан.' : 'Repair workspace будет создан на D перед ремонтом.'}</p>
        ${incident.repair_workspace ? `<code>${this.escapeHtml(incident.repair_workspace.root)}</code>` : ''}
        ${incident.diff_review ? this.renderDiffReview(incident.diff_review) : '<p class="mission-empty">Diff review появится после работы Codex в repair workspace.</p>'}
      </section>
      <div class="approval-actions">
        <button type="button" data-guardian-action="build_diagnostic_pack" data-incident-id="${this.escapeHtml(incident.incident_id)}">Собрать Diagnostic Pack</button>
        <button type="button" data-guardian-action="prepare_codex_repair" data-incident-id="${this.escapeHtml(incident.incident_id)}">Починить через Codex</button>
        <button type="button" data-guardian-action="return_codex" data-incident-id="${this.escapeHtml(incident.incident_id)}">Вернуть Codex</button>
        <button type="button" data-guardian-action="close_incident" data-incident-id="${this.escapeHtml(incident.incident_id)}">Закрыть</button>
        <button type="button" disabled title="Применение появится только после Verifier и rollback point">Применить</button>
      </div>
    `;
  },

  renderDiffReview(diffReview) {
    return `
      <div class="diff-review">
        <strong>${this.escapeHtml(diffReview.title || 'Diff review')}</strong>
        <p>${this.escapeHtml(diffReview.summary || '')}</p>
        <dl class="approval-grid">
          <div><dt>Файлы</dt><dd>${this.escapeHtml((diffReview.changed_files || []).join(', ') || 'нет')}</dd></div>
          <div><dt>Риск</dt><dd>${this.escapeHtml(diffReview.risk_level || 'review')}</dd></div>
        </dl>
        <div class="guardian-checks">
          ${(diffReview.checks || []).map((check) => `<span>${this.escapeHtml(check.name)}: ${this.escapeHtml(check.status)}</span>`).join('')}
        </div>
      </div>
    `;
  },

  renderCostGuardRows() {
    return COST_GUARD_SERVICES.map(([id, name, status, note]) => {
      const blocked = ['blocked', 'unknown', 'legacy'].includes(status);
      return `
        <article class="guardian-mini-card guardian-mini-card--${blocked ? 'review' : 'safe'}" data-cost-id="${this.escapeHtml(id)}">
          <strong>${this.escapeHtml(name)}</strong>
          <span>${this.escapeHtml(status)}</span>
          <p>${this.escapeHtml(note)}</p>
        </article>
      `;
    }).join('');
  },

  renderCapabilityMatrixRows() {
    return GUARDIAN_CAPABILITY_MATRIX.map(([actor, title, canRead, canWrite, canExecute, canDelete, forbidden, allowedPaths, risk]) => `
      <article class="guardian-mini-card guardian-capability" data-actor="${this.escapeHtml(actor)}">
        <strong>${this.escapeHtml(title)}</strong>
        <span>risk: ${this.escapeHtml(risk)}</span>
        <p><b>read:</b> ${this.escapeHtml(canRead)}</p>
        <p><b>write:</b> ${this.escapeHtml(canWrite)}</p>
        <p><b>execute:</b> ${this.escapeHtml(canExecute)}</p>
        <p><b>delete:</b> ${this.escapeHtml(canDelete)}</p>
        <p><b>forbidden:</b> ${this.escapeHtml(forbidden)}</p>
        <p><b>paths:</b> ${this.escapeHtml(allowedPaths)}</p>
      </article>
    `).join('');
  },

  renderSystemRegistryPanel() {
    const host = document.getElementById('system-registry-panel');
    if (!host) return;
    const snapshot = this.systemRegistryState?.last_checked_at
      ? this.systemRegistryState
      : this.buildSystemRegistrySnapshot();
    const services = snapshot.services || [];
    const dependencies = snapshot.dependencies || [];
    const capabilities = snapshot.capabilities || [];
    host.innerHTML = `
      <section class="system-registry-hero system-registry-hero--${this.escapeHtml(snapshot.status || 'not_checked')}">
        <div>
          <span>Реестр системы</span>
          <strong>${this.escapeHtml(String(snapshot.score || 0))}%</strong>
          <p>${this.escapeHtml(snapshot.summary || 'Реестр ещё не проверялся.')}</p>
        </div>
        <dl>
          <div><dt>Сервисы</dt><dd>${this.escapeHtml(String(snapshot.counts?.services || services.length))}</dd><small>active / legacy / future</small></div>
          <div><dt>Зависимости</dt><dd>${this.escapeHtml(String(snapshot.counts?.dependencies || dependencies.length))}</dd><small>что нужно для работы</small></div>
          <div><dt>Права</dt><dd>${this.escapeHtml(String(snapshot.counts?.capabilities || capabilities.length))}</dd><small>кто что может делать</small></div>
        </dl>
      </section>

      <div class="system-registry-columns">
        <section>
          <div class="diagnost-subtitle">Реестр сервисов</div>
          <div class="system-registry-list">
            ${services.map((service) => `
              <article class="system-registry-card system-registry-card--${this.escapeHtml(service.requires_attention ? 'review' : 'ready')}">
                <strong>${this.escapeHtml(service.service_name)}</strong>
                <span>${this.escapeHtml(this.systemRegistryStatusName(service.active_status))} · ${this.escapeHtml(service.category)}</span>
                <p>${this.escapeHtml(service.purpose)}</p>
                <small>${this.escapeHtml(service.next_action)}</small>
              </article>
            `).join('')}
          </div>
        </section>

        <section>
          <div class="diagnost-subtitle">Реестр зависимостей</div>
          <div class="system-registry-list">
            ${dependencies.map((dependency) => `
              <article class="system-registry-card system-registry-card--${this.escapeHtml(dependency.status)}">
                <strong>${this.escapeHtml(dependency.name)}</strong>
                <span>${this.escapeHtml(this.systemRegistryStatusName(dependency.status))} · риск ${this.escapeHtml(dependency.risk_level)}</span>
                <p>${this.escapeHtml(dependency.used_for)}</p>
                <small>${this.escapeHtml(dependency.fallback)}</small>
              </article>
            `).join('')}
          </div>
        </section>
      </div>

      <section class="system-registry-capabilities">
        <div class="diagnost-subtitle">Матрица прав</div>
        <div class="system-registry-capability-grid">
          ${capabilities.map((capability) => `
            <article class="system-registry-card system-registry-card--${this.escapeHtml(capability.status)}">
              <strong>${this.escapeHtml(capability.title)}</strong>
              <span>${this.escapeHtml(capability.requires_approval ? 'нужно подтверждение' : 'безопасный режим')} · риск ${this.escapeHtml(capability.risk_level)}</span>
              <p><b>Читает:</b> ${this.escapeHtml(capability.can_read)}</p>
              <p><b>Пишет:</b> ${this.escapeHtml(capability.can_write)}</p>
              <p><b>Запрещено:</b> ${this.escapeHtml(capability.forbidden_actions)}</p>
            </article>
          `).join('')}
        </div>
      </section>

      <div class="system-action-strip system-action-strip--wrap">
        <button type="button" data-phase6-action="refresh_system_registry">Проверить реестр</button>
        <button type="button" data-phase6-action="export_system_registry">Скачать реестр</button>
        <button type="button" data-phase6-action="copy_system_registry_policy">Скопировать policy</button>
      </div>
    `;
  },

  renderPolicySetting(path, label, note = '') {
    const value = this.policyCenterGet(path);
    const options = POLICY_CENTER_SELECTS[path] || [];
    if (options.length) {
      return `
        <label class="policy-setting">
          <span>${this.escapeHtml(label)}</span>
          <select data-policy-setting="${this.escapeHtml(path)}">
            ${this.policyCenterSelectOptions(path, value)}
          </select>
          ${note ? `<small>${this.escapeHtml(note)}</small>` : ''}
        </label>
      `;
    }
    if (typeof value === 'boolean') {
      return `
        <label class="policy-setting policy-setting--checkbox">
          <span>${this.escapeHtml(label)}</span>
          <input type="checkbox" data-policy-setting="${this.escapeHtml(path)}" ${value ? 'checked' : ''}>
          ${note ? `<small>${this.escapeHtml(note)}</small>` : ''}
        </label>
      `;
    }
    return `
      <label class="policy-setting">
        <span>${this.escapeHtml(label)}</span>
        <input type="text" data-policy-setting="${this.escapeHtml(path)}" value="${this.escapeHtml(String(value ?? ''))}">
        ${note ? `<small>${this.escapeHtml(note)}</small>` : ''}
      </label>
    `;
  },

  renderSystemPolicyCenter() {
    const host = document.getElementById('system-policy-center');
    if (!host) return;
    this.policyCenterState = this.normalizePolicyCenterState(this.policyCenterState || {});
    const snapshot = this.policyCenterState.last_checked_at
      ? this.policyCenterState
      : this.buildPolicyCenterSnapshot(this.policyCenterState);
    const checks = snapshot.checks || [];
    host.innerHTML = `
      <section class="policy-center-hero policy-center-hero--${this.escapeHtml(snapshot.status || 'not_checked')}">
        <div>
          <span>Центр настроек и правил</span>
          <strong>${this.escapeHtml(String(snapshot.score || 0))}%</strong>
          <p>${this.escapeHtml(snapshot.summary || 'Политики ещё не проверялись.')}</p>
        </div>
        <dl>
          <div><dt>Приватность</dt><dd>${this.escapeHtml(this.policyCenterDisplayValue('security.privacy_guard_level', snapshot.security.privacy_guard_level))}</dd></div>
          <div><dt>Подтверждения</dt><dd>${this.escapeHtml(this.policyCenterDisplayValue('security.approval_strictness', snapshot.security.approval_strictness))}</dd></div>
          <div><dt>ИИ API</dt><dd>${this.escapeHtml(this.policyCenterDisplayValue('security.ai_api_policy', snapshot.security.ai_api_policy))}</dd></div>
          <div><dt>Резерв</dt><dd>${this.escapeHtml(this.policyCenterDisplayValue('runtime.backup_policy', snapshot.runtime.backup_policy))}</dd></div>
        </dl>
      </section>

      <div class="policy-center-grid">
        <section class="policy-center-card">
          <div class="diagnost-subtitle">Владелец и интерфейс</div>
          ${this.renderPolicySetting('owner.language', 'Язык')}
          ${this.renderPolicySetting('owner.theme', 'Тема')}
          ${this.renderPolicySetting('owner.mobile_mode', 'Мобильный режим')}
          ${this.renderPolicySetting('owner.default_project_id', 'Проект по умолчанию', 'Можно указать ID проекта вручную.')}
          ${this.renderPolicySetting('owner.default_council_profile_id', 'Профиль Совета по умолчанию')}
        </section>

        <section class="policy-center-card">
          <div class="diagnost-subtitle">Безопасность</div>
          ${this.renderPolicySetting('security.privacy_guard_level', 'Защита приватности')}
          ${this.renderPolicySetting('security.approval_strictness', 'Строгость подтверждений')}
          ${this.renderPolicySetting('security.dangerous_actions', 'Опасные действия')}
          ${this.renderPolicySetting('security.ai_api_policy', 'ИИ API')}
        </section>

        <section class="policy-center-card">
          <div class="diagnost-subtitle">Рабочий контур / публикация</div>
          ${this.renderPolicySetting('runtime.storage_root', 'Хранилище', 'Фиксировано на D, без тяжёлого C.')}
          ${this.renderPolicySetting('runtime.default_context_pack_size', 'Пакет контекста')}
          ${this.renderPolicySetting('runtime.diagnostics_frequency', 'Диагностика')}
          ${this.renderPolicySetting('runtime.backup_policy', 'Резервные копии')}
          ${this.renderPolicySetting('runtime.release_channel', 'Публикация')}
          ${this.renderPolicySetting('runtime.log_retention_days', 'Хранение логов, дней')}
        </section>

        <section class="policy-center-card">
          <div class="diagnost-subtitle">Проекты и задачи</div>
          ${this.renderPolicySetting('project_defaults.memory_policy', 'Память проекта')}
          ${this.renderPolicySetting('project_defaults.verifier_strictness', 'Проверка результата')}
          ${this.renderPolicySetting('project_defaults.research_depth', 'Глубина исследования')}
          ${this.renderPolicySetting('project_defaults.allowed_executors', 'Разрешённые исполнители')}
          ${this.renderPolicySetting('task_defaults.quality', 'Качество задачи')}
          ${this.renderPolicySetting('task_defaults.memory_save_scope', 'Что сохранять в память')}
          ${this.renderPolicySetting('task_defaults.evidence_required', 'Доказательства обязательны')}
          ${this.renderPolicySetting('task_defaults.approval_required_for_commands', 'Команды через подтверждение')}
        </section>
      </div>

      <section class="policy-checks">
        <div class="diagnost-subtitle">Проверки политики</div>
        <div class="phase6-check-grid">
          ${checks.map((check) => `
            <article class="phase6-check phase6-check--${this.escapeHtml(check.status)}">
              <strong>${this.escapeHtml(check.name)}</strong>
              <span>${this.escapeHtml(this.phase6StatusName(check.status))}</span>
              <p>${this.escapeHtml(check.note)}</p>
            </article>
          `).join('') || '<p class="mission-empty">Проверка политики ещё не запускалась.</p>'}
        </div>
      </section>

      <div class="system-action-strip system-action-strip--wrap">
        <button type="button" data-phase6-action="save_policy_center">Сохранить правила</button>
        <button type="button" data-phase6-action="refresh_policy_center">Проверить правила</button>
        <button type="button" data-phase6-action="export_policy_center">Скачать policy</button>
        <button type="button" data-phase6-action="copy_policy_center">Скопировать policy</button>
      </div>
    `;
  },

  renderWorkerFoundationRows() {
    return PHASE4_WORKER_FOUNDATION.map(([id, title, area, capability, rule]) => `
      <article class="guardian-mini-card" data-worker="${this.escapeHtml(id)}">
        <strong>${this.escapeHtml(title)}</strong>
        <span>${this.escapeHtml(area)}</span>
        <p>${this.escapeHtml(capability)}</p>
        <p><b>Правило:</b> ${this.escapeHtml(rule)}</p>
      </article>
    `).join('');
  },

  renderWorkerActionRows() {
    return PHASE4_WORKER_ACTIONS.map((action) => {
      const tone = action.risk_level === 'safe' ? 'safe' : 'review';
      return `
        <article class="guardian-mini-card guardian-mini-card--${tone}" data-worker-action="${this.escapeHtml(action.id)}">
          <strong>${this.escapeHtml(action.title)}</strong>
          <span>${this.escapeHtml(action.worker)} · ${this.escapeHtml(action.status)}</span>
          <p><b>Режим:</b> ${this.escapeHtml(action.mode)}</p>
          <p><b>Выход:</b> ${this.escapeHtml(action.output)}</p>
          <p>${this.escapeHtml(action.rule)}</p>
        </article>
      `;
    }).join('');
  },

  renderGuardianWorkerReportRows() {
    const reports = (this.guardianWorkerReports || []).slice(0, 6);
    if (!reports.length) {
      return '<p class="mission-empty">Worker reports ещё не создавались. Нажмите «Проверить Eyes/Hands».</p>';
    }
    return reports.map((report) => `
      <article class="guardian-mini-card guardian-worker-report" data-worker-report="${this.escapeHtml(report.report_id)}">
        <strong>${this.escapeHtml(report.title)}</strong>
        <span>${this.escapeHtml(report.status)} · ${this.escapeHtml(report.risk_level)}</span>
        <p>${this.escapeHtml(report.summary || 'Readiness report')}</p>
        <p><b>Checks:</b> ${this.escapeHtml(String((report.checks || []).length))}; <b>Blocked:</b> ${this.escapeHtml(String((report.blocked_actions || []).length))}</p>
        <button type="button" data-guardian-action="copy_worker_report" data-report-id="${this.escapeHtml(report.report_id)}">Скопировать отчёт</button>
      </article>
    `).join('');
  },

  renderSafetyWizardRows() {
    return FIRST_RUN_SAFETY_CHECKS.map(([id, title, note]) => {
      const status = id === 'cost_guard'
        ? 'платное заблокировано'
        : id === 'codex_repair'
          ? 'metadata ready'
          : id === 'restore_point'
            ? 'нужен перед apply'
            : 'готов к проверке';
      return `
        <article class="guardian-mini-card" data-safety-check="${this.escapeHtml(id)}">
          <strong>${this.escapeHtml(title)}</strong>
          <span>${this.escapeHtml(status)}</span>
          <p>${this.escapeHtml(note)}</p>
        </article>
      `;
    }).join('');
  },

  async handleGuardianAction(action, button) {
    const incidentId = button?.dataset?.incidentId || this.activeIncidentId;
    const incident = this.guardianIncidents.find((item) => item.incident_id === incidentId);
    const now = new Date().toISOString();

    if (action === 'select_incident') {
      if (incident) this.activeIncidentId = incident.incident_id;
      this.renderGuardianPanel();
      return;
    }

    if (action === 'refresh_guardian') {
      await this.loadGuardianRuntime();
      this.renderSystemStatus();
      this.toast('Guardian обновлён');
      return;
    }

    if (action === 'safe_mode_on') {
      await this.saveGuardianState({ safe_mode: true, status: 'safe_mode', last_event: 'Safe Mode enabled by owner' });
      await this.createGuardianIncident({
        title: 'Safe Mode включён',
        summary: 'Автоматические рискованные действия ограничены. Данные не удалялись, сеть не менялась.',
        source: 'guardian',
        severity: 'warning',
        status: 'user_notified',
        risk_level: 'review',
        affected_area: 'guardian'
      });
      this.renderSystemStatus();
      this.toast('Safe Mode включён');
      return;
    }

    if (action === 'safe_mode_off') {
      await this.saveGuardianState({ safe_mode: false, emergency_stop_active: false, status: 'active', last_event: 'Safe Mode disabled by owner' });
      this.toast('Safe Mode снят');
      return;
    }

    if (action === 'emergency_stop') {
      await this.saveGuardianState({
        safe_mode: true,
        emergency_stop_active: true,
        status: 'emergency_stop',
        last_event: 'Emergency Stop activated'
      }, { silent: true });
      for (const approval of this.pendingApprovalRecords()) {
        approval.blocked_by_guardian = true;
        approval.execution_allowed = false;
        approval.execution_result = 'blocked_by_emergency_stop';
        approval.updated_at = now;
        await this.saveApprovalRecord(approval);
      }
      await this.createGuardianIncident({
        title: 'Стоп действия активирован',
        summary: 'Новые risky actions заблокированы. Pending approvals помечены как заблокированные Guardian. Данные не удалялись, сеть не менялась.',
        source: 'guardian',
        severity: 'critical',
        status: 'user_notified',
        risk_level: 'critical',
        affected_area: 'all_actions',
        approval_required: true
      });
      this.renderSystemStatus();
      this.toast('Стоп действия включён');
      return;
    }

    if (action === 'create_manual_incident') {
      await this.createGuardianIncident({
        title: 'Ручной incident Guardian',
        summary: 'Создан владельцем/системой для проверки контура Phase 4.',
        source: 'guardian',
        severity: 'warning',
        status: 'detected',
        risk_level: 'review',
        affected_area: 'manual_check'
      });
      this.renderSystemStatus();
      this.toast('Incident создан');
      return;
    }

    if (action === 'run_worker_check') {
      const report = await this.saveGuardianWorkerReport(this.buildPhase4WorkerReadinessReport());
      await this.createGuardianIncident({
        title: 'Eyes / Hands readiness report создан',
        summary: `Создан worker report ${report.report_id}. Safe observations доступны; action workers остаются под Guardian/Approval.`,
        source: 'guardian_worker_console',
        severity: report.risk_level === 'safe' ? 'info' : 'warning',
        status: 'safe_action_suggested',
        risk_level: report.risk_level,
        affected_area: 'phase4_workers',
        approval_required: report.risk_level !== 'safe'
      });
      this.renderSystemStatus();
      this.toast('Eyes/Hands report создан');
      return;
    }

    if (action === 'copy_worker_command') {
      this.copyWorkspaceText(this.buildPhase4WorkerLocalAgentCommand());
      this.toast('Команда Local Agent скопирована');
      return;
    }

    if (action === 'copy_worker_report') {
      const reportId = button?.dataset?.reportId || '';
      const report = (this.guardianWorkerReports || []).find((item) => item.report_id === reportId);
      if (report) {
        this.copyWorkspaceText(this.buildPhase4WorkerReportText(report));
        this.toast('Worker report скопирован');
      }
      return;
    }

    if (action === 'create_worker_incident') {
      await this.createGuardianIncident({
        title: 'Phase 4 worker readiness требует проверки',
        summary: 'Создан incident для проверки Eyes/Hands, repair workspace, Cost Guard, rollback и запрещённых действий.',
        source: 'guardian_worker_console',
        severity: 'warning',
        status: 'detected',
        risk_level: 'review',
        affected_area: 'phase4_workers',
        approval_required: true
      });
      this.renderSystemStatus();
      this.toast('Worker incident создан');
      return;
    }

    if (!incident) return;

    if (action === 'build_diagnostic_pack') {
      incident.diagnostic_pack = {
        pack_id: this.generateWorkspaceId('DIAGPACK'),
        text: this.buildDiagnosticPack(incident),
        created_at: now
      };
      incident.status = 'safe_action_suggested';
      incident.updated_at = now;
      await this.saveGuardianIncident(incident);
      this.renderSystemStatus();
      this.toast('Diagnostic Pack готов');
      return;
    }

    if (action === 'prepare_codex_repair') {
      incident.diagnostic_pack = incident.diagnostic_pack || {
        pack_id: this.generateWorkspaceId('DIAGPACK'),
        text: this.buildDiagnosticPack(incident),
        created_at: now
      };
      incident.repair_workspace = incident.repair_workspace || this.buildRepairWorkspaceMetadata(incident);
      incident.diff_review = incident.diff_review || this.buildDiffReviewPlaceholder(incident);
      incident.rollback_point = incident.rollback_point || this.buildRollbackPointMetadata(incident);
      incident.repair = {
        status: 'diagnostic_pack_ready',
        executor: 'codex_repair_operator',
        autonomy_level: Math.min(this.guardianState?.autonomy_level || 2, 2),
        verifier_status: 'not_checked',
        apply_allowed: false,
        apply_status: 'blocked_until_verifier_and_approval'
      };
      incident.status = 'triaged';
      incident.updated_at = now;
      await this.saveGuardianIncident(incident);
      this.renderSystemStatus();
      this.toast('Repair workspace подготовлен');
      return;
    }

    if (action === 'return_codex') {
      incident.repair = {
        ...(incident.repair || {}),
        status: 'returned_to_codex',
        apply_allowed: false,
        apply_status: 'not_allowed'
      };
      incident.status = 'triaged';
      incident.updated_at = now;
      await this.saveGuardianIncident(incident);
      this.renderSystemStatus();
      this.toast('Возврат Codex зафиксирован');
      return;
    }

    if (action === 'close_incident') {
      incident.status = 'closed';
      incident.updated_at = now;
      await this.saveGuardianIncident(incident);
      this.renderSystemStatus();
      this.toast('Incident закрыт');
    }
  },

  renderSystemStoragePolicy() {
    const host = document.getElementById('system-storage-policy');
    if (!host) return;
    const taskCount = (this.workTasks || []).length;
    const fileCount = (this.workTasks || []).reduce((sum, task) => sum + (task.files || []).length, 0);
    const rows = [
      ['Активный код', 'C:', 'в проектной папке остаются source и лёгкие docs/evidence'],
      ['Архивы Codex', 'D:', `${TERMINATOR_STORAGE_ROOT}\\codex_outputs`],
      ['Evidence backups', 'D:', `${TERMINATOR_STORAGE_ROOT}\\evidence_backups`],
      ['Task files', 'D:', `${TERMINATOR_STORAGE_ROOT}\\tasks\\<task_id>\\files`],
      ['Task evidence', 'D:', `${TERMINATOR_STORAGE_ROOT}\\tasks\\<task_id>\\evidence`],
      ['Task artifacts/reports', 'D:', `${TERMINATOR_STORAGE_ROOT}\\tasks\\<task_id>\\artifacts / reports`],
      ['Local Agent storage', 'Phase 2 runtime', 'prepare/write artifacts/reports/memory/restore/check logs на D; без удаления и без чтения секретов'],
      ['Storage schema', `v${TASK_STORAGE_SCHEMA_VERSION}`, `${TASK_STORAGE_SUBFOLDERS.length} папок в task folder contract`],
      ['Runtime manifests', `${taskCount} задач`, `${fileCount} file metadata records; raw/base64 не хранится`],
      ['Синхронизация задач', this.taskStoreSyncStatus || 'не проверено', this.taskStoreLastSyncAt ? `последняя синхронизация: ${this.formatTaskTime(this.taskStoreLastSyncAt)}` : (this.taskStoreSyncError || 'Общее хранилище ждёт вход владельца')],
      ['Secrets', 'запрещено', 'не писать в docs/evidence/logs']
    ];
    host.innerHTML = rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('');
  },

  renderSystemMemorySearchPanel() {
    const host = document.getElementById('system-memory-search-panel');
    if (!host) return;
    if (!this.memorySearchState) this.memorySearchState = this.defaultMemorySearchState();
    const snapshot = this.memorySearchSnapshot();
    const state = this.memorySearchState;
    const results = state.results || [];
    const query = state.query || '';
    const stats = state.stats || {};
    host.innerHTML = `
      <section class="memory-search-hero memory-search-hero--${this.escapeHtml(snapshot.tone)}">
        <div>
          <span>Контекстный индекс</span>
          <strong>${this.escapeHtml(this.memorySearchStatusName(snapshot.status))}</strong>
          <p>${this.escapeHtml(snapshot.note)}</p>
        </div>
        <dl>
          <div><dt>Записей</dt><dd>${this.escapeHtml(String(stats.total_records || snapshot.count || 0))}</dd></div>
          <div><dt>Память</dt><dd>${this.escapeHtml(String(stats.memory || 0))}</dd></div>
          <div><dt>Evidence</dt><dd>${this.escapeHtml(String(stats.evidence || 0))}</dd></div>
          <div><dt>Решения</dt><dd>${this.escapeHtml(String(results.filter((item) => item.type === 'decision').length))}</dd></div>
        </dl>
      </section>

      <div class="memory-search-console">
        <label class="work-field">
          <span>Найти в памяти</span>
          <input id="system-memory-search-query" type="search" value="${this.escapeHtml(query)}" placeholder="Например: паспорт решения, отчёт Codex, evidence, голос, GitHub Pages">
        </label>
        <div class="system-action-strip">
          <button type="button" data-memory-search-action="run_search">Найти</button>
          <button type="button" data-memory-search-action="rebuild_index">Пересобрать индекс</button>
          <button type="button" data-memory-search-action="copy_context_pack">Скопировать Context Pack</button>
          <button type="button" data-memory-search-action="download_index_report">Скачать отчёт индекса</button>
          <button type="button" data-memory-search-action="open_scheme_memory">Схема Мины: Память</button>
          <button type="button" data-memory-search-action="clear_query">Очистить</button>
        </div>
      </div>

      <div class="memory-search-grid">
        <section class="memory-search-results" aria-label="Результаты поиска памяти">
          <div class="runtime-panel-head">
            <div>
              <strong>Результаты</strong>
              <span>${this.escapeHtml(results.length ? `${results.length} найдено` : 'поиск ещё не запускался')}</span>
            </div>
          </div>
          ${results.length ? results.map((record) => `
            <article class="memory-result memory-result--${this.escapeHtml(record.type)}">
              <div>
                <span>${this.escapeHtml(record.label)} · score ${this.escapeHtml(String(Math.round(record.score || 0)))}</span>
                <strong>${this.escapeHtml(record.title)}</strong>
                <p>${this.escapeHtml(record.summary)}</p>
                <small>${this.escapeHtml(record.project_name || 'проект не задан')} ${record.task_id ? `· ${this.escapeHtml(record.task_id)}` : ''} · privacy: ${this.escapeHtml(record.privacy_status)}</small>
              </div>
              ${record.task_id ? `<button type="button" data-memory-search-action="open_result" data-task-id="${this.escapeHtml(record.task_id)}">Открыть задачу</button>` : ''}
            </article>
          `).join('') : '<p class="mission-empty">Введите запрос или пересоберите индекс. Поиск работает по задачам, артефактам, evidence, решениям и памяти.</p>'}
        </section>

        <section class="memory-context-pack" aria-label="Context Pack из памяти">
          <div class="runtime-panel-head">
            <div>
              <strong>Context Pack</strong>
              <span>summary + refs, без raw files</span>
            </div>
          </div>
          <textarea readonly>${this.escapeHtml(state.context_pack || 'После поиска здесь появится компактный пакет контекста.')}</textarea>
        </section>
      </div>

      <div class="memory-search-policy">
        <span>Без AI API</span>
        <span>Без raw/base64 файлов</span>
        <span>Секреты скрывает Privacy Guard</span>
        <span>D:\\TerminatorStorage остаётся источником тяжёлых файлов</span>
      </div>
    `;
  },

  async handleMemorySearchAction(action, button) {
    const input = document.getElementById('system-memory-search-query');
    if (!this.memorySearchState) this.memorySearchState = this.defaultMemorySearchState();

    if (action === 'rebuild_index') {
      this.memorySearchState.query = String(input?.value || this.memorySearchState.query || '').trim();
      await this.refreshMemorySearchIndex({ silent: false });
      this.renderSystemStatus();
      return;
    }

    if (action === 'run_search') {
      const query = String(input?.value || '').trim();
      if (!this.memorySearchState.records?.length) await this.refreshMemorySearchIndex({ silent: true, render: false });
      const results = this.runMemorySearch(query);
      this.renderSystemMemorySearchPanel();
      this.renderMinaSystemScheme();
      this.toast(results.length ? `Найдено: ${results.length}` : 'Ничего не найдено');
      return;
    }

    if (action === 'copy_context_pack') {
      if (!this.memorySearchState.context_pack) {
        this.runMemorySearch(String(input?.value || this.memorySearchState.query || ''));
      }
      this.copyWorkspaceText(this.memorySearchState.context_pack || 'Context Pack не собран.');
      return;
    }

    if (action === 'download_index_report') {
      const report = {
        schema_version: MEMORY_SEARCH_SCHEMA_VERSION,
        index_version: MEMORY_SEARCH_INDEX_VERSION,
        generated_at: new Date().toISOString(),
        stats: this.memorySearchState.stats,
        warnings: this.memorySearchState.warnings,
        records: (this.memorySearchState.records || []).map(({ search_text, ...record }) => record)
      };
      const ok = this.downloadTextFile(`terminator-memory-index-${Date.now()}.json`, JSON.stringify(report, null, 2));
      if (!ok) this.copyWorkspaceText(JSON.stringify(report, null, 2));
      this.toast(ok ? 'Отчёт индекса скачан' : 'Отчёт индекса скопирован');
      return;
    }

    if (action === 'open_scheme_memory') {
      this.activeMinaSchemeZone = 'memory';
      this.saveMinaSchemeState();
      this.go('scheme');
      return;
    }

    if (action === 'open_result') {
      const taskId = button?.dataset?.taskId || '';
      if (taskId) {
        this.activeWorkTaskId = taskId;
        this.workspaceActiveTab = 'memory';
        this.go('work');
      }
      return;
    }

    if (action === 'clear_query') {
      this.memorySearchState = this.normalizeMemorySearchState({
        ...this.memorySearchState,
        query: '',
        results: [],
        context_pack: ''
      });
      await this.saveMemorySearchState();
      this.renderSystemMemorySearchPanel();
    }
  },

  renderSystemEyesPanel() {
    const host = document.getElementById('system-eyes-panel');
    if (!host) return;
    const snapshot = this.eyesVisualSnapshot();
    const state = this.normalizeEyesVisualState(this.eyesVisualState || this.defaultEyesVisualState());
    const checks = state.checks || [];
    const activeTask = this.getActiveWorkTask();
    host.innerHTML = `
      <section class="eyes-hero eyes-hero--${this.escapeHtml(snapshot.tone)}">
        <div>
          <span>Визуальные доказательства</span>
          <strong>${this.escapeHtml(snapshot.label)}</strong>
          <p>${this.escapeHtml(snapshot.note)}</p>
        </div>
        <dl>
          <div><dt>Готовность</dt><dd>${this.escapeHtml(String(snapshot.readiness))}%</dd></div>
          <div><dt>Записей</dt><dd>${this.escapeHtml(String(snapshot.count))}</dd></div>
          <div><dt>Worker</dt><dd>${this.escapeHtml(String(snapshot.worker_reports))}</dd></div>
          <div><dt>Задача</dt><dd>${this.escapeHtml(activeTask?.task_id || 'не выбрана')}</dd></div>
        </dl>
      </section>

      <section class="eyes-console" aria-label="Создание visual evidence">
        <label class="work-field">
          <span>Что проверяем</span>
          <input id="system-eyes-target" type="text" value="${this.escapeHtml(activeTask?.title || 'Mina UI')}" placeholder="Например: Схема Мины, Рабочее окно, мобильный экран">
        </label>
        <div class="eyes-form-grid">
          <label class="work-field">
            <span>Режим</span>
            <select id="system-eyes-mode">
              ${EYES_VISUAL_MODES.map(([id, label]) => `<option value="${this.escapeHtml(id)}">${this.escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
          <label class="work-field">
            <span>Скриншот / путь / ссылка</span>
            <input id="system-eyes-screenshot-ref" type="text" placeholder="D:\\TerminatorStorage\\tasks\\...\\evidence\\screen.png или ссылка">
          </label>
        </div>
        <label class="work-field">
          <span>Наблюдение</span>
          <textarea id="system-eyes-notes" placeholder="Что видно, что подтверждает скрин, есть ли mobile overflow, кракозябры, перекрытия."></textarea>
        </label>
        <div class="system-action-strip">
          <button type="button" data-eyes-action="create_check" data-eyes-scope="system">Создать visual evidence</button>
          <button type="button" data-eyes-action="create_desktop_check" data-eyes-scope="system">Desktop smoke</button>
          <button type="button" data-eyes-action="create_mobile_check" data-eyes-scope="system">Mobile smoke</button>
          <button type="button" data-eyes-action="copy_report" data-eyes-scope="system">Скопировать отчёт</button>
          <button type="button" data-eyes-action="open_scheme_eyes">Схема Мины: Глаза</button>
        </div>
      </section>

      <section class="eyes-records" aria-label="Последние visual evidence записи">
        ${checks.length ? checks.slice(0, 8).map((check) => this.renderEyesVisualCheckCard(check, { compact: false })).join('') : '<p class="mission-empty">Visual evidence ещё не создано. Глаза работают read-only: только фиксируют, не кликают и не входят в аккаунты.</p>'}
      </section>
    `;
  },

  renderWorkspaceEyes(task) {
    const host = document.getElementById('workspace-eyes-panel');
    if (!host || !task) return;
    const checks = Array.isArray(task.eyes_visual_checks) ? task.eyes_visual_checks : [];
    host.innerHTML = `
      <section class="eyes-workspace-panel">
        <div class="workspace-panel-head">
          <strong>Глаза задачи</strong>
          <span>${this.escapeHtml(String(checks.length))} visual evidence</span>
        </div>
        <p>Глаза создают доказательства для Verifier: скриншот/путь, что проверено, что видно и какие риски остались. Они не кликают и не читают cookies.</p>
        <label class="work-field">
          <span>Что проверяем</span>
          <input id="workspace-eyes-target" type="text" value="${this.escapeHtml(task.title || task.goal || 'Рабочее окно')}" placeholder="Например: рабочее окно задачи">
        </label>
        <div class="eyes-form-grid">
          <label class="work-field">
            <span>Режим</span>
            <select id="workspace-eyes-mode">
              ${EYES_VISUAL_MODES.map(([id, label]) => `<option value="${this.escapeHtml(id)}" ${id === 'workspace' ? 'selected' : ''}>${this.escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
          <label class="work-field">
            <span>Скриншот / путь / ссылка</span>
            <input id="workspace-eyes-screenshot-ref" type="text" placeholder="${this.escapeHtml(this.taskStoragePath(task.task_id, 'evidence'))}\\screen.png">
          </label>
        </div>
        <label class="work-field">
          <span>Наблюдение</span>
          <textarea id="workspace-eyes-notes" placeholder="Опишите, что подтверждает скриншот и что проверить первым."></textarea>
        </label>
        <div class="workspace-file-actions">
          <button type="button" data-eyes-action="create_check" data-eyes-scope="workspace">Создать evidence</button>
          <button type="button" data-eyes-action="create_desktop_check" data-eyes-scope="workspace">Desktop smoke</button>
          <button type="button" data-eyes-action="create_mobile_check" data-eyes-scope="workspace">Mobile smoke</button>
          <button type="button" data-eyes-action="copy_report" data-eyes-scope="workspace">Скопировать отчёт</button>
        </div>
      </section>
      <section class="eyes-records eyes-records--workspace">
        ${checks.length ? checks.map((check) => this.renderEyesVisualCheckCard(check, { compact: true })).join('') : '<p class="workspace-empty">Для этой задачи visual evidence ещё не создано.</p>'}
      </section>
    `;
  },

  renderSystemHandsPanel() {
    const host = document.getElementById('system-hands-panel');
    if (!host) return;
    const snapshot = this.handsSnapshot();
    const state = this.normalizeHandsSafeState(this.handsSafeState || this.defaultHandsSafeState());
    const runtime = this.controlledRuntimeSnapshot();
    const runtimeState = this.normalizeControlledWorkerRuntimeState(this.controlledWorkerRuntimeState || this.defaultControlledWorkerRuntimeState());
    const applySnapshot = this.controlledApplySnapshot();
    const applyPackages = this.collectControlledApplyPackages();
    const activeTask = this.getActiveWorkTask();
    const plans = state.action_plans || [];
    host.innerHTML = `
      <section class="hands-hero hands-hero--${this.escapeHtml(snapshot.tone)}">
        <div>
          <span>Безопасные Руки</span>
          <strong>${this.escapeHtml(snapshot.label)}</strong>
          <p>${this.escapeHtml(snapshot.note)}</p>
        </div>
        <dl>
          <div><dt>Готовность</dt><dd>${this.escapeHtml(String(snapshot.readiness))}%</dd></div>
          <div><dt>Планы</dt><dd>${this.escapeHtml(String(snapshot.count))}</dd></div>
          <div><dt>Approval</dt><dd>${this.escapeHtml(String(snapshot.approval_count))}</dd></div>
          <div><dt>LOW-run</dt><dd>${this.escapeHtml(String(runtime.completed_count))}</dd></div>
          <div><dt>Apply</dt><dd>${this.escapeHtml(String(applySnapshot.verified_count))}/${this.escapeHtml(String(applySnapshot.count))}</dd></div>
        </dl>
      </section>

      <section class="hands-console" aria-label="Безопасный план действия">
        <div class="hands-form-grid">
          <label class="work-field">
            <span>Название плана</span>
            <input id="system-hands-title" type="text" value="${this.escapeHtml(activeTask?.title ? `План: ${activeTask.title}` : 'Безопасный план действия')}" placeholder="Например: исправить визуальный баг через repair workspace">
          </label>
          <label class="work-field">
            <span>Worker</span>
            <select id="system-hands-worker">
              ${HANDS_WORKER_OPTIONS.map(([id, label]) => `<option value="${this.escapeHtml(id)}">${this.escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
          <label class="work-field">
            <span>Риск</span>
            <select id="system-hands-risk">
              ${HANDS_RISK_OPTIONS.map(([id, label]) => `<option value="${this.escapeHtml(id)}" ${id === 'review' ? 'selected' : ''}>${this.escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
          <label class="work-field">
            <span>Controlled Runtime</span>
            <select id="system-hands-runtime-action">
              ${CONTROLLED_RUNTIME_ACTION_OPTIONS.map(([id, label]) => `<option value="${this.escapeHtml(id)}">${this.escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
        </div>
        <label class="work-field">
          <span>Что нужно сделать</span>
          <textarea id="system-hands-goal" placeholder="Опишите действие. Руки создадут план, но не запустят команду. Опасные слова автоматически поднимут риск."></textarea>
        </label>
        <div class="system-action-strip">
          <button type="button" data-hands-action="prepare_system_plan">Подготовить план</button>
          <button type="button" data-hands-action="prepare_system_approval">План + Approval</button>
          <button type="button" data-guardian-action="run_worker_check">Проверить workers</button>
          <button type="button" data-hands-action="open_scheme_hands">Схема Мины: Руки</button>
        </div>
      </section>

      <section class="hands-worker-grid" aria-label="Матрица Рук">
        ${HANDS_WORKER_OPTIONS.map(([id, label, note]) => `
          <article>
            <span>${this.escapeHtml(label)}</span>
            <strong>${this.escapeHtml(id === 'browser_worker' ? 'позже' : id === 'system_worker' ? 'ограничено' : 'готов к плану')}</strong>
            <p>${this.escapeHtml(note)}</p>
          </article>
        `).join('')}
      </section>

      <section class="hands-plan-grid" aria-label="Планы действий">
        ${plans.length ? plans.slice(0, 8).map((plan) => this.renderHandsPlanCard(plan)).join('') : '<p class="mission-empty">Планов Рук пока нет. Создайте безопасный план: он станет artifact, но ничего не выполнит.</p>'}
      </section>

      <section class="controlled-runtime-panel" aria-label="Controlled Worker Runtime">
        <div class="workspace-panel-head">
          <strong>Controlled Runtime</strong>
          <span>${this.escapeHtml(runtime.label)}</span>
        </div>
        <p>Выполняются только allowlist LOW-risk действия внутри WebApp: без shell, deploy, delete, .env, network и active project write.</p>
        <div class="controlled-runtime-grid">
          <article><span>Режим</span><strong>allowlist</strong><p>${this.escapeHtml(runtimeState.policy.execution_mode)}</p></article>
          <article><span>Shell</span><strong>запрещён</strong><p>Команды ОС не запускаются.</p></article>
          <article><span>Rollback</span><strong>обязателен</strong><p>Перед state mutation создаётся snapshot.</p></article>
          <article><span>Verifier</span><strong>обязателен</strong><p>Run получает runtime self-check.</p></article>
        </div>
        <div class="controlled-run-list">
          ${runtimeState.runs.length ? runtimeState.runs.slice(0, 6).map((run) => this.renderControlledWorkerRunCard(run)).join('') : '<p class="mission-empty">LOW-risk запусков пока нет.</p>'}
        </div>
      </section>

      <section class="controlled-apply-panel" aria-label="Controlled Apply Pipeline">
        <div class="workspace-panel-head">
          <strong>Apply Pipeline</strong>
          <span>${this.escapeHtml(applySnapshot.label)}</span>
        </div>
        <p>Пакет применения собирает diff summary, affected refs, rollback point, Verifier check и Approval gate. Active project из WebApp не меняется.</p>
        <div class="controlled-runtime-grid">
          <article><span>Direct apply</span><strong>запрещён</strong><p>Применение только отдельным ручным/будущим Hands-шагом.</p></article>
          <article><span>Rollback</span><strong>обязателен</strong><p>Без rollback package не проходит gate.</p></article>
          <article><span>Verifier</span><strong>обязателен</strong><p>Metadata self-check должен быть PASS.</p></article>
          <article><span>Approval</span><strong>выше safe</strong><p>Review/опасное не идёт дальше без решения владельца.</p></article>
        </div>
        <div class="controlled-run-list">
          ${applyPackages.length ? applyPackages.slice(0, 6).map((pack) => this.renderControlledApplyPackageCard(pack)).join('') : '<p class="mission-empty">Пакетов применения пока нет. Создайте план Рук и нажмите “Пакет применения”.</p>'}
        </div>
      </section>
    `;
  },

  renderWorkspaceHands(task) {
    const host = document.getElementById('workspace-hands-panel');
    if (!host || !task) return;
    const plans = Array.isArray(task.hands_action_plans) ? task.hands_action_plans : [];
    const applyPackages = Array.isArray(task.controlled_apply_packages) ? task.controlled_apply_packages : [];
    host.innerHTML = `
      <section class="hands-workspace-panel">
        <div class="workspace-panel-head">
          <strong>Руки задачи</strong>
          <span>${this.escapeHtml(String(plans.length))} планов действий</span>
        </div>
        <p>Руки готовят безопасный план, rollback и Approval. Команды, файлы и deploy не запускаются из этого экрана.</p>
        <label class="work-field">
          <span>Название плана</span>
          <input id="workspace-hands-title" type="text" value="${this.escapeHtml(task.title ? `План: ${task.title}` : 'Безопасный план задачи')}">
        </label>
        <div class="hands-form-grid">
          <label class="work-field">
            <span>Worker</span>
            <select id="workspace-hands-worker">
              ${HANDS_WORKER_OPTIONS.map(([id, label]) => `<option value="${this.escapeHtml(id)}">${this.escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
          <label class="work-field">
            <span>Риск</span>
            <select id="workspace-hands-risk">
              ${HANDS_RISK_OPTIONS.map(([id, label]) => `<option value="${this.escapeHtml(id)}" ${id === 'review' ? 'selected' : ''}>${this.escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
          <label class="work-field">
            <span>Controlled Runtime</span>
            <select id="workspace-hands-runtime-action">
              ${CONTROLLED_RUNTIME_ACTION_OPTIONS.map(([id, label]) => `<option value="${this.escapeHtml(id)}">${this.escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
        </div>
        <label class="work-field">
          <span>Действие для подготовки</span>
          <textarea id="workspace-hands-goal" placeholder="Например: подготовить diff через repair workspace, проверить UI, создать rollback, передать Verifier."></textarea>
        </label>
        <div class="workspace-file-actions">
          <button type="button" data-hands-action="prepare_workspace_plan">Подготовить план</button>
          <button type="button" data-hands-action="prepare_workspace_approval">План + Approval</button>
          <button type="button" data-hands-action="copy_workspace_report">Скопировать отчёт</button>
          <button type="button" data-hands-action="open_system_hands">Открыть Руки в Системе</button>
        </div>
      </section>
      <section class="hands-plan-grid hands-plan-grid--workspace">
        ${plans.length ? plans.map((plan) => this.renderHandsPlanCard(plan, { compact: true })).join('') : '<p class="workspace-empty">Для этой задачи планов Рук ещё нет.</p>'}
      </section>
      <section class="controlled-run-list controlled-run-list--workspace">
        ${(this.controlledWorkerRuntimeState?.runs || []).filter((run) => run.task_id === task.task_id).slice(0, 6).map((run) => this.renderControlledWorkerRunCard(run, { compact: true })).join('') || '<p class="workspace-empty">Controlled Runtime для этой задачи ещё не запускался.</p>'}
      </section>
      <section class="controlled-run-list controlled-run-list--workspace">
        ${applyPackages.length ? applyPackages.slice(0, 6).map((pack) => this.renderControlledApplyPackageCard(pack, { compact: true })).join('') : '<p class="workspace-empty">Пакетов применения для этой задачи ещё нет.</p>'}
      </section>
    `;
  },

  renderWorkspaceHandoff(task) {
    const host = document.getElementById('workspace-handoff-panel');
    if (!host || !task) return;
    const mesh = this.buildDeviceMeshSnapshot();
    host.innerHTML = `
      <section class="handoff-workspace-intro">
        <strong>Передача задачи</strong>
        <p>Выберите маршрут, подготовьте безопасный пакет и вручную перенесите его туда, где продолжите работу. Терминатор не нажимает за вас кнопки, не открывает аккаунты и не отправляет команды устройствам.</p>
      </section>
      ${this.renderHandoffPlannerPanel(mesh, { task })}
      ${this.renderContinuityPanel(task)}
    `;
  },

  renderEyesVisualCheckCard(check, options = {}) {
    const normalized = this.normalizeEyesVisualCheck(check);
    const checklistSummary = normalized.checklist
      .map((item) => `${item.label}: ${item.status}`)
      .slice(0, options.compact ? 3 : 6)
      .join(' · ');
    return `
      <article class="eyes-record eyes-record--${this.escapeHtml(normalized.status)}">
        <div>
          <span>${this.escapeHtml(EYES_VISUAL_MODE_BY_ID[normalized.mode] || normalized.mode)} · ${this.escapeHtml(this.formatTaskTime(normalized.created_at))}</span>
          <strong>${this.escapeHtml(normalized.target || 'Цель не задана')}</strong>
          <p>${this.escapeHtml(normalized.notes || 'Наблюдение не заполнено.')}</p>
          <small>${this.escapeHtml(checklistSummary || 'checklist ожидает данных')}</small>
          ${normalized.screenshot_ref ? `<small>Скрин: ${this.escapeHtml(normalized.screenshot_ref)}</small>` : ''}
        </div>
        <span class="eyes-record-status">${this.escapeHtml(this.eyesVisualStatusName(normalized.status))}</span>
      </article>
    `;
  },

  async handleEyesVisualAction(action, button) {
    const scope = button?.dataset?.eyesScope || 'system';
    if (action === 'open_scheme_eyes') {
      this.activeMinaSchemeZone = 'eyes';
      this.saveMinaSchemeState();
      this.go('scheme');
      return;
    }

    if (action === 'open_system_eyes') {
      this.go('system');
      window.setTimeout(() => document.getElementById('system-eyes-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      return;
    }

    if (action === 'open_verifier') {
      const task = this.getActiveWorkTask();
      if (task) this.openVerifierPanel(task);
      else this.toast('Сначала создай задачу');
      return;
    }

    if (action === 'copy_report') {
      const text = this.buildEyesVisualStateReport(scope === 'workspace' ? this.getActiveWorkTask() : null);
      await this.copyWorkspaceText(text);
      return;
    }

    if (['create_check', 'create_desktop_check', 'create_mobile_check'].includes(action)) {
      const modeOverride = action === 'create_desktop_check' ? 'desktop' : action === 'create_mobile_check' ? 'mobile' : '';
      const check = this.createEyesVisualCheckFromForm(scope, modeOverride);
      if (!check) return;
      this.renderSystemStatus();
      if (this.getActiveWorkTask()) this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      this.toast(check.status === 'ready' ? 'Visual evidence создано' : 'Visual evidence требует проверки Privacy Guard');
    }
  },

  async handleHandsAction(action, button) {
    const task = this.getActiveWorkTask();
    const planId = button?.dataset?.planId || this.activeHandsPlanId || '';
    const findPlan = () => {
      const globalPlans = this.handsSafeState?.action_plans || [];
      const taskPlans = task?.hands_action_plans || [];
      return [...globalPlans, ...taskPlans].find((plan) => plan.plan_id === planId) || null;
    };
    const findApplyPackage = () => {
      const applyId = button?.dataset?.applyId || this.activeApplyPackageId || '';
      const globalPackages = this.controlledApplyPipelineState?.packages || [];
      const taskPackages = (this.workTasks || []).flatMap((item) => Array.isArray(item.controlled_apply_packages) ? item.controlled_apply_packages : []);
      return [...globalPackages, ...taskPackages].find((pack) => pack.apply_package_id === applyId) || null;
    };

    if (action === 'open_scheme_hands') {
      this.activeMinaSchemeZone = 'hands';
      this.saveMinaSchemeState();
      this.go('scheme');
      return;
    }

    if (action === 'open_system_hands') {
      this.go('system');
      window.setTimeout(() => document.getElementById('system-hands-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      return;
    }

    if (action === 'open_approval') {
      const approvalId = button?.dataset?.approvalId || '';
      if (approvalId) this.activeApprovalId = approvalId;
      this.go('system');
      window.setTimeout(() => document.getElementById('system-approval-center')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      return;
    }

    if (action === 'copy_plan') {
      const plan = findPlan();
      if (!plan) {
        this.toast('План не найден');
        return;
      }
      await this.copyWorkspaceText(this.buildHandsActionPlanMarkdown(plan, task));
      return;
    }

    if (action === 'copy_controlled_run') {
      const runId = button?.dataset?.runId || this.activeControlledRunId || '';
      const run = (this.controlledWorkerRuntimeState?.runs || []).find((item) => item.run_id === runId);
      if (!run) {
        this.toast('Runtime report не найден');
        return;
      }
      const ownerPlan = [...(this.handsSafeState?.action_plans || []), ...(task?.hands_action_plans || [])].find((item) => item.plan_id === run.plan_id) || null;
      await this.copyWorkspaceText(this.buildControlledWorkerRunMarkdown(run, ownerPlan, task));
      return;
    }

    if (action === 'copy_apply_package') {
      const pack = findApplyPackage();
      if (!pack) {
        this.toast('Пакет применения не найден');
        return;
      }
      const ownerTask = this.workTasks.find((item) => item.task_id === pack.task_id) || task || null;
      await this.copyWorkspaceText(this.buildControlledApplyPackageMarkdown(pack, ownerTask));
      return;
    }

    if (action === 'copy_workspace_report') {
      if (!task) {
        this.toast('Сначала выберите задачу');
        return;
      }
      const plans = Array.isArray(task.hands_action_plans) ? task.hands_action_plans : [];
      const report = plans.length
        ? plans.map((plan) => this.buildHandsActionPlanMarkdown(plan, task)).join('\n\n---\n\n')
        : 'Для задачи нет планов Рук.';
      await this.copyWorkspaceText(report);
      return;
    }

    if (action === 'create_approval') {
      const plan = findPlan();
      if (!plan) {
        this.toast('План не найден');
        return;
      }
      const ownerTask = this.workTasks.find((item) => item.task_id === plan.task_id) || task || null;
      await this.createHandsApprovalFromPlan(plan, ownerTask);
      this.renderSystemStatus();
      this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      this.toast('Approval создан, выполнение не запускалось');
      return;
    }

    if (action === 'run_controlled') {
      const plan = findPlan();
      if (!plan) {
        this.toast('План не найден');
        return;
      }
      const ownerTask = this.workTasks.find((item) => item.task_id === plan.task_id) || task || null;
      const run = await this.runControlledWorkerPlan(plan, ownerTask);
      this.renderSystemStatus();
      if (ownerTask) this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      this.toast(run.status === 'completed' ? 'LOW-risk runtime выполнен' : 'Controlled Runtime заблокировал действие');
      return;
    }

    if (action === 'prepare_apply_package') {
      const plan = findPlan();
      if (!plan) {
        this.toast('План не найден');
        return;
      }
      const ownerTask = this.workTasks.find((item) => item.task_id === plan.task_id) || task || null;
      const pack = await this.prepareControlledApplyPackageFromPlan(plan, ownerTask);
      this.renderSystemStatus();
      if (ownerTask) this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      this.toast(`Пакет применения готов: ${this.controlledApplyStatusName(pack.status)}`);
      return;
    }

    if (action === 'verify_apply_package') {
      const pack = findApplyPackage();
      if (!pack) {
        this.toast('Пакет применения не найден');
        return;
      }
      const ownerTask = this.workTasks.find((item) => item.task_id === pack.task_id) || task || null;
      const verified = await this.verifyControlledApplyPackage(pack, ownerTask);
      this.renderSystemStatus();
      if (ownerTask) this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      this.toast(verified.verifier_status === 'metadata_self_check_pass' ? 'Verifier пакета PASS' : 'Verifier пакета заблокировал применение');
      return;
    }

    if (action === 'create_apply_approval') {
      const pack = findApplyPackage();
      if (!pack) {
        this.toast('Пакет применения не найден');
        return;
      }
      const ownerTask = this.workTasks.find((item) => item.task_id === pack.task_id) || task || null;
      await this.createControlledApplyApproval(pack, ownerTask);
      this.renderSystemStatus();
      if (ownerTask) this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      this.toast('Approval для пакета применения создан');
      return;
    }

    if (action === 'mark_manual_apply') {
      const pack = findApplyPackage();
      if (!pack) {
        this.toast('Пакет применения не найден');
        return;
      }
      const ownerTask = this.workTasks.find((item) => item.task_id === pack.task_id) || task || null;
      const saved = await this.markControlledApplyManualApplied(pack, ownerTask);
      this.renderSystemStatus();
      if (ownerTask) this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      this.toast(saved.status === 'manual_applied' ? 'Ручное применение отмечено' : 'Apply gate заблокировал отметку');
      return;
    }

    if (['prepare_system_plan', 'prepare_system_approval', 'prepare_workspace_plan', 'prepare_workspace_approval'].includes(action)) {
      const scope = action.includes('workspace') ? 'workspace' : 'system';
      const forceApproval = action.includes('approval');
      const targetTask = scope === 'workspace' ? task : task;
      if (scope === 'workspace' && !targetTask) {
        this.toast('Сначала создайте или выберите задачу');
        return;
      }
      const plan = this.buildHandsActionPlanFromForm(scope, forceApproval);
      const saved = await this.saveHandsActionPlan(plan, targetTask);
      if (forceApproval || saved.approval_required) {
        await this.createHandsApprovalFromPlan(saved, targetTask);
      }
      this.renderSystemStatus();
      if (targetTask) this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      this.toast(saved.approval_required ? 'План и Approval готовы' : 'План Рук готов');
    }
  },

  createEyesVisualCheckFromForm(scope = 'system', modeOverride = '') {
    const prefix = scope === 'workspace' ? 'workspace-eyes' : 'system-eyes';
    const task = scope === 'workspace' ? this.getActiveWorkTask() : this.getActiveWorkTask();
    const modeInput = document.getElementById(`${prefix}-mode`);
    const targetInput = document.getElementById(`${prefix}-target`);
    const screenshotInput = document.getElementById(`${prefix}-screenshot-ref`);
    const notesInput = document.getElementById(`${prefix}-notes`);
    const mode = EYES_VISUAL_MODE_BY_ID[modeOverride] ? modeOverride : (modeInput?.value || (scope === 'workspace' ? 'workspace' : 'manual'));
    const target = String(targetInput?.value || task?.title || 'Mina UI').trim();
    const screenshotRef = String(screenshotInput?.value || '').trim();
    const notes = String(notesInput?.value || '').trim() || (mode === 'mobile'
      ? 'Mobile smoke: проверить читаемость, отсутствие horizontal overflow, крупные кнопки и корректное состояние.'
      : 'Visual smoke: проверить читаемость, кликабельность, отсутствие перекрытий, кракозябр и видимых секретов.');
    if (!target) {
      this.toast('Укажи, что проверяем');
      return null;
    }
    const source = [target, screenshotRef, notes].join('\n');
    const privacy = this.scanPrivacyText(source);
    const safeTarget = privacy.findings.length ? this.redactPrivacyText(target) : target;
    const safeScreenshotRef = privacy.findings.length ? this.redactPrivacyText(screenshotRef) : screenshotRef;
    const safeNotes = privacy.findings.length ? this.redactPrivacyText(notes) : notes;
    const status = privacy.blocked ? 'blocked' : privacy.findings.length ? 'needs_review' : 'ready';
    const now = new Date().toISOString();
    const check = this.normalizeEyesVisualCheck({
      check_id: this.generateWorkspaceId('EYES'),
      task_id: task?.task_id || '',
      project_id: task?.project_id || '',
      mode,
      target: safeTarget,
      screenshot_ref: safeScreenshotRef,
      notes: safeNotes,
      status,
      privacy_status: privacy.status,
      privacy_summary: this.privacyScanSummary(privacy),
      checklist: EYES_VISUAL_CHECKLIST.map(([id, label]) => ({
        id,
        label,
        status: id === 'screenshot_ref' && !safeScreenshotRef
          ? 'missing'
          : privacy.findings.length && id === 'no_secret_visible'
            ? 'review'
            : 'pass'
      })),
      storage_ref: task ? {
        root: TERMINATOR_STORAGE_ROOT,
        task_path: this.taskStoragePath(task.task_id),
        folder: 'evidence',
        planned_path: `${this.taskStoragePath(task.task_id, 'evidence')}\\${this.safeStorageSegment(`eyes_${Date.now()}_${mode}`)}.md`,
        raw_file_saved: false,
        persistence: 'metadata_only_browser'
      } : null,
      created_at: now,
      updated_at: now
    });

    if (!this.eyesVisualState) this.eyesVisualState = this.defaultEyesVisualState();
    this.eyesVisualState.checks = [check, ...(this.eyesVisualState.checks || []).filter((item) => item.check_id !== check.check_id)].slice(0, EYES_VISUAL_MAX_CHECKS);
    this.eyesVisualState.last_checked_at = check.created_at;
    this.eyesVisualState.last_task_id = check.task_id;
    this.eyesVisualState.warnings = privacy.findings.length ? [`${check.check_id}: Privacy Guard ${check.privacy_summary}`] : [];

    if (task) {
      task.eyes_visual_checks = Array.isArray(task.eyes_visual_checks) ? task.eyes_visual_checks : [];
      task.eyes_visual_checks.unshift(check);
      const artifact = this.createArtifact(task, 'SCREENSHOT', `Visual evidence: ${safeTarget}`, `Eyes ${EYES_VISUAL_MODE_BY_ID[mode] || mode}: ${status}`, this.buildEyesVisualEvidenceMarkdown(check, task), 'eyes');
      artifact.status = status === 'ready' ? 'ready' : 'needs_review';
      artifact.linked_evidence_ids = [check.check_id];
      check.artifact_id = artifact.artifact_id;
      task.eyes_visual_checks[0] = check;
      this.addWorkspaceMessage(task, 'eyes_evidence', 'Глаза', `Создано visual evidence: ${safeTarget}`, {
        linked_artifacts: [artifact.artifact_id]
      });
      task.updated_at = now;
      this.saveWorkTasks();
    }

    this.saveEyesVisualState();
    if (notesInput) notesInput.value = '';
    return check;
  },

  buildEyesVisualEvidenceMarkdown(check, task = null) {
    const normalized = this.normalizeEyesVisualCheck(check);
    return [
      '# Visual Evidence / Глаза',
      '',
      `- check_id: ${normalized.check_id}`,
      `- task_id: ${normalized.task_id || task?.task_id || 'not linked'}`,
      `- project_id: ${normalized.project_id || task?.project_id || 'not linked'}`,
      `- mode: ${EYES_VISUAL_MODE_BY_ID[normalized.mode] || normalized.mode}`,
      `- status: ${this.eyesVisualStatusName(normalized.status)}`,
      `- privacy: ${normalized.privacy_summary}`,
      `- created_at: ${normalized.created_at}`,
      '',
      '## Что проверяли',
      normalized.target || 'не задано',
      '',
      '## Скриншот / ссылка / путь',
      normalized.screenshot_ref || 'не приложено; запись описывает ручное наблюдение',
      '',
      '## Наблюдение',
      normalized.notes || 'не задано',
      '',
      '## Checklist',
      ...normalized.checklist.map((item) => `- ${item.label}: ${item.status}`),
      '',
      '## Safety',
      '- Глаза не кликали, не входили в аккаунты и не читали cookies.',
      '- Raw/base64 изображения в localStorage не сохранялись.',
      '- Запись предназначена для Verifier, evidence и Memory Preview.'
    ].join('\n');
  },

  buildEyesVisualStateReport(task = null) {
    const state = this.normalizeEyesVisualState(this.eyesVisualState || this.defaultEyesVisualState());
    const taskChecks = task ? (task.eyes_visual_checks || []) : [];
    const checks = task ? taskChecks : state.checks;
    return [
      '# Eyes V1 / Visual Evidence Report',
      '',
      `Generated: ${new Date().toISOString()}`,
      `Scope: ${task ? `task ${task.task_id}` : 'system'}`,
      `Records: ${checks.length}`,
      '',
      ...checks.slice(0, 12).map((check) => this.buildEyesVisualEvidenceMarkdown(check, task)),
      '',
      'Policy:',
      '- read-only observation only;',
      '- no browser auto-control;',
      '- no cookies/session access;',
      '- no AI API;',
      '- evidence refs only, no heavy raw files in browser storage.'
    ].join('\n');
  },

  eyesVisualStatusName(status) {
    return {
      ready: 'готово',
      needs_review: 'нужна проверка',
      blocked: 'заблокировано Privacy Guard',
      draft: 'черновик'
    }[status] || 'ожидает';
  },

  renderSystemLastCheckpoint() {
    const host = document.getElementById('system-last-checkpoint');
    if (!host) return;
    const rows = [
      ['Текущий checkpoint', TERMINATOR_LAST_CHECKPOINT.name, `${TERMINATOR_LAST_CHECKPOINT.date}; ${TERMINATOR_LAST_CHECKPOINT.status}`],
      ['Предыдущий слой', 'закрыт', TERMINATOR_LAST_CHECKPOINT.previous],
      ['Следующий слой', 'не закрыт', TERMINATOR_LAST_CHECKPOINT.next],
      ...TERMINATOR_PHASE_STEPS.map((step) => [`Шаг ${step.id}`, step.status, step.name])
    ];
    host.innerHTML = rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('');
  },

  renderSystemLegacyWarnings() {
    const host = document.getElementById('system-legacy-warnings');
    if (!host) return;
    const rows = [
      ['Личное', 'blocked legacy', 'скрыто из активного меню; прямой legacy-route блокируется без внутреннего rollback-флага'],
      ['n8n / Telegram', 'legacy', 'не является Phase 1 core path и не восстанавливается здесь'],
      ['Amvera workflows', 'legacy debt', 'не участвуют в Direct Mode / Рабочем как основном пути'],
      ['PM2 brain workers', 'legacy audit later', 'не строим новые функции на этом слое'],
      ['Personal handlers', 'оставлены', 'код и Direct actions не удалялись; активный продуктовый путь заблокирован']
    ];
    host.innerHTML = rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('');
  },

  headStatusSnapshot() {
    const strategist = this.mainStrategistBrain();
    const readyBrains = (this.headBrains || []).filter((brain) => brain.status === 'ready' && !brain.archived);
    const enabledBrains = (this.headBrains || []).filter((brain) => brain.enabled && !brain.archived);
    const activeProfile = this.activeHeadProfile();
    if (!strategist) {
      return {
        status: 'не настроена',
        note: 'выберите главного Стратега вручную',
        tone: 'review'
      };
    }
    if (!readyBrains.length) {
      return {
        status: 'ждёт тест',
        note: `${strategist.display_name}: выбран, но мозги ещё не проверены`,
        tone: 'review'
      };
    }
    return {
      status: 'готова',
      note: `${strategist.display_name}; профиль: ${activeProfile?.name || 'не выбран'}; мозгов: ${enabledBrains.length}`,
      tone: 'pass'
    };
  },

  defaultHeadBrains() {
    const now = new Date().toISOString();
    return HEAD_BRAIN_CATALOG.map((brain) => this.normalizeHeadBrain({
      ...brain,
      status: brain.enabled ? 'selected' : 'not_selected',
      connection_status: brain.enabled ? 'selected' : 'not_selected',
      test_passed: false,
      is_main_strategist: false,
      preset: true,
      archived: false,
      created_at: now,
      updated_at: now
    }));
  },

  defaultHeadSearchAgents() {
    const now = new Date().toISOString();
    return HEAD_SEARCH_AGENT_CATALOG.map(([agentId, name, sourceType, role, description, enabled], index) => this.normalizeHeadSearchAgent({
      agent_id: agentId,
      name,
      source_type: sourceType,
      role,
      description,
      enabled,
      status: enabled ? 'enabled' : 'disabled',
      order: (index + 1) * 10,
      preset: true,
      created_at: now,
      updated_at: now
    }));
  },

  defaultHeadProfiles(brains = this.defaultHeadBrains(), searchAgents = this.defaultHeadSearchAgents()) {
    const now = new Date().toISOString();
    const enabledBrainIds = brains.filter((brain) => brain.enabled && !brain.archived).map((brain) => brain.brain_id);
    const researchBrainIds = brains.filter((brain) => !brain.archived && ['brain_chatgpt', 'brain_claude', 'brain_gemini', 'brain_deepseek', 'brain_qwen', 'brain_perplexity', 'brain_kimi'].includes(brain.brain_id)).map((brain) => brain.brain_id);
    const enabledSearchIds = searchAgents.filter((agent) => agent.enabled && !agent.archived).map((agent) => agent.agent_id);
    return [
      this.normalizeHeadProfile({
        profile_id: 'profile_main',
        name: 'Основной',
        type: 'default',
        description: 'Базовый профиль Совета для рабочих задач Терминатора.',
        main_strategist_id: '',
        council_members: enabledBrainIds,
        search_agent_ids: enabledSearchIds.slice(0, 2),
        is_default: true,
        status: 'needs_setup',
        created_at: now,
        updated_at: now
      }),
      this.normalizeHeadProfile({
        profile_id: 'profile_research_max',
        name: 'Максимальное исследование',
        type: 'research',
        description: 'Широкий профиль: мозги + исследователи для глубоких решений.',
        main_strategist_id: '',
        council_members: researchBrainIds,
        search_agent_ids: enabledSearchIds,
        is_default: false,
        status: 'template',
        created_at: now,
        updated_at: now
      })
    ];
  },

  normalizeHeadBrain(brain) {
    const now = new Date().toISOString();
    const id = brain.brain_id || this.generateWorkspaceId('BRAIN');
    const displayName = brain.display_name || brain.name || 'Новый мозг';
    const providerName = brain.provider_name || brain.provider || displayName;
    return {
      brain_id: id,
      provider_name: providerName,
      display_name: displayName,
      selected_model_name: brain.selected_model_name || brain.model || displayName,
      official_url: brain.official_url || '',
      role: brain.role || 'Пользовательская роль',
      default_role: brain.default_role || brain.role || 'Пользовательская роль',
      status: brain.archived ? 'archived' : (brain.status || brain.connection_status || 'not_selected'),
      connection_status: brain.archived ? 'archived' : (brain.connection_status || brain.status || 'not_selected'),
      ready_phrase: brain.ready_phrase || `READY_TERMINATOR_${displayName.replace(/[^a-z0-9]+/gi, '_').toUpperCase()}`,
      enabled: Boolean(brain.enabled),
      can_be_strategist: brain.can_be_strategist !== false,
      is_main_strategist: Boolean(brain.is_main_strategist),
      order: Number(brain.order || 999),
      test_passed: Boolean(brain.test_passed),
      last_test_at: brain.last_test_at || '',
      last_test_response: brain.last_test_response ? '[REDACTED]' : '',
      preset: Boolean(brain.preset),
      archived: Boolean(brain.archived || brain.status === 'archived'),
      notes: brain.notes || '',
      created_at: brain.created_at || now,
      updated_at: brain.updated_at || now,
      schema_version: Number(brain.schema_version || 0),
      migration_status: brain.migration_status || '',
      schema_updated_at: brain.schema_updated_at || ''
    };
  },

  normalizeHeadSearchAgent(agent) {
    const now = new Date().toISOString();
    return {
      agent_id: agent.agent_id || this.generateWorkspaceId('SEARCH'),
      name: agent.name || 'Новый исследователь',
      source_type: agent.source_type || 'custom',
      role: agent.role || 'Пользовательский источник',
      description: agent.description || 'Источник добавлен владельцем.',
      enabled: Boolean(agent.enabled),
      status: agent.archived ? 'archived' : (agent.status || (agent.enabled ? 'enabled' : 'disabled')),
      order: Number(agent.order || 999),
      preset: Boolean(agent.preset),
      archived: Boolean(agent.archived || agent.status === 'archived'),
      created_at: agent.created_at || now,
      updated_at: agent.updated_at || now,
      schema_version: Number(agent.schema_version || 0),
      migration_status: agent.migration_status || '',
      schema_updated_at: agent.schema_updated_at || ''
    };
  },

  normalizeHeadProfile(profile) {
    const now = new Date().toISOString();
    return {
      profile_id: profile.profile_id || this.generateWorkspaceId('PROFILE'),
      name: profile.name || 'Профиль Совета',
      type: profile.type || 'custom',
      description: profile.description || 'Пользовательская сборка Совета.',
      main_strategist_id: profile.main_strategist_id || '',
      council_members: Array.isArray(profile.council_members) ? profile.council_members : [],
      search_agent_ids: Array.isArray(profile.search_agent_ids) ? profile.search_agent_ids : [],
      is_default: Boolean(profile.is_default),
      status: profile.status || 'draft',
      created_at: profile.created_at || now,
      updated_at: profile.updated_at || now,
      schema_version: Number(profile.schema_version || 0),
      migration_status: profile.migration_status || '',
      schema_updated_at: profile.schema_updated_at || ''
    };
  },

  normalizeHeadEvent(event) {
    const now = new Date().toISOString();
    return {
      event_id: event.event_id || this.generateWorkspaceId('HEADEVT'),
      type: event.type || 'head_event',
      text: event.text || '',
      target_id: event.target_id || '',
      actor: event.actor || 'Владелец',
      risk_level: event.risk_level || 'safe',
      created_at: event.created_at || now
    };
  },

  async loadHeadRuntime() {
    const defaultsBrains = this.defaultHeadBrains();
    const defaultsAgents = this.defaultHeadSearchAgents();
    const defaultsProfiles = this.defaultHeadProfiles(defaultsBrains, defaultsAgents);
    try {
      if (this.taskRuntimeDb) {
        const [brains, profiles, agents, events] = await Promise.all([
          this.getAllRuntimeRecords(TASK_RUNTIME_STORES.HEAD_BRAINS),
          this.getAllRuntimeRecords(TASK_RUNTIME_STORES.HEAD_PROFILES),
          this.getAllRuntimeRecords(TASK_RUNTIME_STORES.HEAD_SEARCH_AGENTS),
          this.getAllRuntimeRecords(TASK_RUNTIME_STORES.HEAD_EVENTS)
        ]);
        this.headBrains = brains.length ? brains.map((brain) => this.normalizeHeadBrain(brain)) : defaultsBrains;
        this.headSearchAgents = agents.length ? agents.map((agent) => this.normalizeHeadSearchAgent(agent)) : defaultsAgents;
        this.headProfiles = profiles.length ? profiles.map((profile) => this.normalizeHeadProfile(profile)) : this.defaultHeadProfiles(this.headBrains, this.headSearchAgents);
        this.headEvents = events.length ? events.map((event) => this.normalizeHeadEvent(event)) : [];
        if (!brains.length || !profiles.length || !agents.length) await this.saveHeadRuntime();
      } else {
        const fallback = this.readHeadFallback();
        this.headBrains = fallback.brains?.length ? fallback.brains.map((brain) => this.normalizeHeadBrain(brain)) : defaultsBrains;
        this.headSearchAgents = fallback.search_agents?.length ? fallback.search_agents.map((agent) => this.normalizeHeadSearchAgent(agent)) : defaultsAgents;
        this.headProfiles = fallback.profiles?.length ? fallback.profiles.map((profile) => this.normalizeHeadProfile(profile)) : this.defaultHeadProfiles(this.headBrains, this.headSearchAgents);
        this.headEvents = fallback.events?.length ? fallback.events.map((event) => this.normalizeHeadEvent(event)) : [];
      }
      this.reconcileHeadState();
    } catch {
      this.headBrains = defaultsBrains;
      this.headSearchAgents = defaultsAgents;
      this.headProfiles = defaultsProfiles;
      this.headEvents = [];
      this.reconcileHeadState();
    }
  },

  readHeadFallback() {
    try {
      const raw = window.localStorage?.getItem(HEAD_RUNTIME_FALLBACK_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  },

  reconcileHeadState() {
    const strategistId = this.headProfiles.find((profile) => profile.is_default)?.main_strategist_id
      || this.headProfiles.find((profile) => profile.main_strategist_id)?.main_strategist_id
      || this.headBrains.find((brain) => brain.is_main_strategist && !brain.archived)?.brain_id
      || '';
    this.headBrains = this.headBrains.map((brain) => this.normalizeHeadBrain({
      ...brain,
      is_main_strategist: Boolean(strategistId && brain.brain_id === strategistId)
    })).sort((a, b) => a.order - b.order || a.display_name.localeCompare(b.display_name, 'ru'));
    this.activeHeadBrainId = this.headBrains.find((brain) => !brain.archived && brain.brain_id === this.activeHeadBrainId)?.brain_id
      || strategistId
      || this.headBrains.find((brain) => !brain.archived)?.brain_id
      || '';
    this.activeHeadProfileId = this.headProfiles.find((profile) => profile.profile_id === this.activeHeadProfileId)?.profile_id
      || this.headProfiles.find((profile) => profile.is_default)?.profile_id
      || this.headProfiles[0]?.profile_id
      || '';
  },

  async saveHeadRuntime() {
    this.reconcileHeadState();
    try {
      window.localStorage?.setItem(HEAD_RUNTIME_FALLBACK_KEY, JSON.stringify({
        brains: this.headBrains,
        profiles: this.headProfiles,
        search_agents: this.headSearchAgents,
        events: this.headEvents.slice(0, 80),
        updated_at: new Date().toISOString()
      }));
    } catch {}
    if (!this.taskRuntimeDb) return;
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.HEAD_BRAINS, this.headBrains);
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.HEAD_PROFILES, this.headProfiles);
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.HEAD_SEARCH_AGENTS, this.headSearchAgents);
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.HEAD_EVENTS, this.headEvents.slice(0, 200));
  },

  addHeadEvent(type, text, targetId = '', riskLevel = 'safe') {
    const event = this.normalizeHeadEvent({ type, text, target_id: targetId, risk_level: riskLevel });
    this.headEvents.unshift(event);
    this.headEvents = this.headEvents.slice(0, 200);
    return event;
  },

  activeHeadProfile() {
    return this.headProfiles.find((profile) => profile.profile_id === this.activeHeadProfileId)
      || this.headProfiles.find((profile) => profile.is_default)
      || this.headProfiles[0]
      || null;
  },

  headProfileById(profileId) {
    return this.headProfiles.find((profile) => profile.profile_id === profileId) || null;
  },

  headBrainById(brainId) {
    return this.headBrains.find((brain) => brain.brain_id === brainId) || null;
  },

  mainStrategistBrain() {
    const strategistId = this.activeHeadProfile()?.main_strategist_id
      || this.headBrains.find((brain) => brain.is_main_strategist && !brain.archived)?.brain_id
      || '';
    return strategistId ? this.headBrainById(strategistId) : null;
  },

  activeHeadBrains(profile = this.activeHeadProfile()) {
    const ids = new Set(profile?.council_members || []);
    return (this.headBrains || [])
      .filter((brain) => !brain.archived && brain.enabled && (!ids.size || ids.has(brain.brain_id)))
      .sort((a, b) => a.order - b.order || a.display_name.localeCompare(b.display_name, 'ru'));
  },

  activeHeadSearchAgents(profile = this.activeHeadProfile()) {
    const ids = new Set(profile?.search_agent_ids || []);
    return (this.headSearchAgents || [])
      .filter((agent) => !agent.archived && agent.enabled && (!ids.size || ids.has(agent.agent_id)))
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'ru'));
  },

  renderSystemHeadPanel() {
    const host = document.getElementById('system-head-panel');
    if (!host) return;
    const status = this.headStatusSnapshot();
    const profile = this.activeHeadProfile();
    const strategist = this.mainStrategistBrain();
    const activeBrains = this.activeHeadBrains(profile);
    const activeAgents = this.activeHeadSearchAgents(profile);
    const selectedBrain = this.headBrainById(this.activeHeadBrainId) || activeBrains[0] || this.headBrains.find((brain) => !brain.archived);
    host.innerHTML = `
      <section class="head-status head-status--${this.escapeHtml(status.tone)}">
        <div>
          <span>Голова Терминатора</span>
          <strong>${this.escapeHtml(status.status)}</strong>
          <p>${this.escapeHtml(status.note)}</p>
        </div>
        <div>
          <span>Главный Стратег</span>
          <strong>${this.escapeHtml(strategist ? `${strategist.display_name} / ${strategist.selected_model_name}` : 'не выбран')}</strong>
          <p>Стратег меняется только вручную владельцем.</p>
        </div>
        <div>
          <span>Активный профиль</span>
          <strong>${this.escapeHtml(profile?.name || 'не выбран')}</strong>
          <p>${this.escapeHtml(`${activeBrains.length} мозгов, ${activeAgents.length} исследователей`)}</p>
        </div>
      </section>

      <section class="head-wizard">
        <div class="workspace-panel-head">
          <strong>Первый запуск головы</strong>
          <span>${strategist ? 'стратег выбран' : 'нужен выбор владельца'}</span>
        </div>
        <ol>
          <li class="${strategist ? 'done' : ''}">Выбрать главного Стратега.</li>
          <li class="${activeBrains.length ? 'done' : ''}">Собрать Совет мозгов.</li>
          <li class="${activeAgents.length ? 'done' : ''}">Добавить исследователей.</li>
          <li class="${this.headBrains.some((brain) => brain.status === 'ready') ? 'done' : ''}">Проверить готовность тестовым prompt.</li>
        </ol>
      </section>

      <section class="head-grid">
        <div class="head-column">
          <div class="workspace-panel-head">
            <strong>Мозги</strong>
            <span>добавить, включить, роль, порядок</span>
          </div>
          <div class="head-brain-list">
            ${(this.headBrains || []).filter((brain) => !brain.archived).map((brain) => this.renderHeadBrainCard(brain, strategist)).join('')}
          </div>
          <div class="head-add-form">
            <label class="work-field"><span>Название</span><input id="head-new-brain-name" type="text" placeholder="Например: Claude Opus"></label>
            <label class="work-field"><span>Провайдер</span><input id="head-new-brain-provider" type="text" placeholder="Например: Anthropic"></label>
            <label class="work-field"><span>Модель</span><input id="head-new-brain-model" type="text" placeholder="Укажу вручную"></label>
            <label class="work-field"><span>Сайт</span><input id="head-new-brain-url" type="url" placeholder="https://..."></label>
            <button type="button" data-head-action="add_brain">+ Добавить мозг</button>
          </div>
        </div>

        <div class="head-column">
          <div class="workspace-panel-head">
            <strong>Проверка готовности</strong>
            <span>ручной тест без API</span>
          </div>
          ${selectedBrain ? this.renderHeadBrainTest(selectedBrain) : '<p class="mission-empty">Выберите мозг.</p>'}

          <div class="workspace-panel-head head-profile-title">
            <strong>Профили Совета</strong>
            <span>сохранённые сборки</span>
          </div>
          <div class="head-profile-list">
            ${(this.headProfiles || []).map((item) => this.renderHeadProfileCard(item)).join('')}
          </div>
          <div class="head-add-form">
            <label class="work-field"><span>Новый профиль</span><input id="head-new-profile-name" type="text" placeholder="Например: Codex Review"></label>
            <button type="button" data-head-action="create_profile">Создать профиль из текущего состава</button>
          </div>
        </div>

        <div class="head-column">
          <div class="workspace-panel-head">
            <strong>Исследователи</strong>
            <span>поисковые роли, не crawler-боты</span>
          </div>
          <div class="head-agent-list">
            ${(this.headSearchAgents || []).filter((agent) => !agent.archived).map((agent) => this.renderHeadSearchAgentCard(agent)).join('')}
          </div>
          <div class="head-add-form">
            <label class="work-field"><span>Источник</span><input id="head-new-agent-name" type="text" placeholder="Custom Source Agent"></label>
            <label class="work-field"><span>Роль</span><input id="head-new-agent-role" type="text" placeholder="Что он ищет"></label>
            <button type="button" data-head-action="add_search_agent">+ Добавить исследователя</button>
          </div>
          <div class="head-event-log">
            <div class="workspace-panel-head">
              <strong>История Головы</strong>
              <span>${this.headEvents.length}</span>
            </div>
            ${(this.headEvents || []).slice(0, 5).map((event) => `
              <article>
                <time>${this.escapeHtml(this.formatTaskTime(event.created_at))}</time>
                <strong>${this.escapeHtml(event.type)}</strong>
                <p>${this.escapeHtml(event.text)}</p>
              </article>
            `).join('') || '<p class="mission-empty">История появится после настройки.</p>'}
          </div>
        </div>
      </section>
    `;
  },

  renderHeadBrainCard(brain, strategist) {
    const isActive = brain.brain_id === this.activeHeadBrainId;
    const isStrategist = strategist?.brain_id === brain.brain_id;
    return `
      <article class="head-brain-card ${isActive ? 'active' : ''} ${isStrategist ? 'strategist' : ''}">
        <button type="button" class="head-card-select" data-head-action="select_brain" data-brain-id="${this.escapeHtml(brain.brain_id)}">
          <strong>${this.escapeHtml(brain.display_name)}</strong>
          <span>${this.escapeHtml(brain.selected_model_name)} · ${this.escapeHtml(this.headBrainStatusName(brain.status))}</span>
        </button>
        <label class="work-field">
          <span>Роль</span>
          <select data-head-role="${this.escapeHtml(brain.brain_id)}">
            ${HEAD_BRAIN_ROLES.map((role) => `<option value="${this.escapeHtml(role)}"${role === brain.role ? ' selected' : ''}>${this.escapeHtml(role)}</option>`).join('')}
          </select>
        </label>
        <div class="head-actions">
          <button type="button" data-head-action="toggle_brain" data-brain-id="${this.escapeHtml(brain.brain_id)}">${brain.enabled ? 'Выключить' : 'Включить'}</button>
          <button type="button" data-head-action="set_strategist" data-brain-id="${this.escapeHtml(brain.brain_id)}" ${brain.can_be_strategist ? '' : 'disabled'}>${isStrategist ? 'Стратег' : 'Сделать Стратегом'}</button>
          <button type="button" data-head-action="move_up" data-brain-id="${this.escapeHtml(brain.brain_id)}">↑</button>
          <button type="button" data-head-action="move_down" data-brain-id="${this.escapeHtml(brain.brain_id)}">↓</button>
          <button type="button" data-head-action="remove_brain" data-brain-id="${this.escapeHtml(brain.brain_id)}">Удалить</button>
        </div>
      </article>
    `;
  },

  renderHeadBrainTest(brain) {
    return `
      <section class="head-test">
        <div class="head-test-target">
          <strong>${this.escapeHtml(brain.display_name)}</strong>
          <span>${this.escapeHtml(brain.official_url || 'сайт не задан')}</span>
        </div>
        <label class="work-field">
          <span>Тестовый prompt</span>
          <textarea readonly>${this.escapeHtml(this.headTestPrompt(brain))}</textarea>
        </label>
        <label class="work-field">
          <span>Ответ из официального чата</span>
          <textarea id="head-test-response" placeholder="Вставьте ответ мозга. Пароли, cookies и токены сюда не вставлять."></textarea>
        </label>
        <div class="head-actions">
          <button type="button" data-head-action="copy_test" data-brain-id="${this.escapeHtml(brain.brain_id)}">Скопировать тест</button>
          <button type="button" data-head-action="open_site" data-brain-id="${this.escapeHtml(brain.brain_id)}">Открыть сайт</button>
          <button type="button" data-head-action="verify_test" data-brain-id="${this.escapeHtml(brain.brain_id)}">Проверить ответ</button>
        </div>
        <p class="runtime-note">Готовность ставится только после ручного теста. Пароли, cookies, API keys и платёжные данные Терминатор не хранит.</p>
      </section>
    `;
  },

  renderHeadProfileCard(profile) {
    const isActive = profile.profile_id === this.activeHeadProfileId;
    const strategist = this.headBrainById(profile.main_strategist_id);
    return `
      <article class="head-profile-card ${isActive ? 'active' : ''}">
        <button type="button" data-head-action="activate_profile" data-profile-id="${this.escapeHtml(profile.profile_id)}">
          <strong>${this.escapeHtml(profile.name)}</strong>
          <span>${this.escapeHtml(HEAD_PROFILE_TYPES[profile.type] || profile.type)} · ${profile.council_members.length} мозгов · ${profile.search_agent_ids.length} исследователей</span>
        </button>
        <p>${this.escapeHtml(profile.description || 'профиль без описания')}</p>
        <small>Стратег: ${this.escapeHtml(strategist?.display_name || 'не выбран')}</small>
      </article>
    `;
  },

  renderHeadSearchAgentCard(agent) {
    return `
      <article class="head-agent-card">
        <div>
          <strong>${this.escapeHtml(agent.name)}</strong>
          <span>${this.escapeHtml(agent.role)} · ${this.escapeHtml(agent.source_type)}</span>
          <p>${this.escapeHtml(agent.description)}</p>
        </div>
        <button type="button" data-head-action="toggle_agent" data-agent-id="${this.escapeHtml(agent.agent_id)}">${agent.enabled ? 'Включён' : 'Выключен'}</button>
      </article>
    `;
  },

  headBrainStatusName(status) {
    const names = {
      not_selected: 'не выбран',
      selected: 'выбран',
      site_opened: 'сайт открыт',
      logged_in_by_user: 'пользователь вошёл',
      test_waiting: 'ждёт тест',
      ready: 'готов к задачам',
      attention: 'требует внимания',
      archived: 'удалён'
    };
    return names[status] || status || 'не выбран';
  },

  headTestPrompt(brain) {
    return `Ответь строго одной строкой:\n${brain.ready_phrase}`;
  },

  async handleHeadAction(action, button) {
    const brainId = button?.dataset?.brainId || this.activeHeadBrainId;
    const profileId = button?.dataset?.profileId || this.activeHeadProfileId;
    const agentId = button?.dataset?.agentId || '';
    const brain = this.headBrainById(brainId);
    if (action === 'select_brain' && brain) {
      this.activeHeadBrainId = brain.brain_id;
      this.renderSystemHeadPanel();
      return;
    }
    if (action === 'toggle_brain' && brain) {
      brain.enabled = !brain.enabled;
      brain.status = brain.enabled ? (brain.test_passed ? 'ready' : 'selected') : 'not_selected';
      brain.connection_status = brain.status;
      brain.updated_at = new Date().toISOString();
      this.addHeadEvent('brain_toggle', `${brain.display_name}: ${brain.enabled ? 'включён' : 'выключен'}.`, brain.brain_id);
    } else if (action === 'set_strategist' && brain) {
      if (!brain.can_be_strategist) {
        this.toast('Этот мозг не назначается Стратегом');
        return;
      }
      this.setMainStrategist(brain.brain_id);
    } else if (action === 'move_up' && brain) {
      brain.order -= 15;
      brain.updated_at = new Date().toISOString();
      this.addHeadEvent('brain_order_changed', `${brain.display_name}: выше в Совете.`, brain.brain_id);
    } else if (action === 'move_down' && brain) {
      brain.order += 15;
      brain.updated_at = new Date().toISOString();
      this.addHeadEvent('brain_order_changed', `${brain.display_name}: ниже в Совете.`, brain.brain_id);
    } else if (action === 'remove_brain' && brain) {
      brain.archived = true;
      brain.enabled = false;
      brain.status = 'archived';
      brain.updated_at = new Date().toISOString();
      this.headProfiles.forEach((profile) => {
        profile.council_members = profile.council_members.filter((id) => id !== brain.brain_id);
        if (profile.main_strategist_id === brain.brain_id) profile.main_strategist_id = '';
      });
      this.addHeadEvent('brain_removed', `${brain.display_name}: удалён из активного Совета.`, brain.brain_id, 'review');
    } else if (action === 'open_site' && brain) {
      if (brain.official_url) window.open(brain.official_url, '_blank', 'noopener,noreferrer');
      brain.status = 'site_opened';
      brain.connection_status = 'site_opened';
      brain.updated_at = new Date().toISOString();
      this.addHeadEvent('brain_site_opened', `${brain.display_name}: официальный сайт открыт владельцем.`, brain.brain_id);
    } else if (action === 'copy_test' && brain) {
      this.copyWorkspaceText(this.headTestPrompt(brain));
      brain.status = 'test_waiting';
      brain.connection_status = 'test_waiting';
      brain.updated_at = new Date().toISOString();
      this.addHeadEvent('brain_test_copied', `${brain.display_name}: тестовый prompt скопирован.`, brain.brain_id);
    } else if (action === 'verify_test' && brain) {
      this.verifyHeadBrainTest(brain);
    } else if (action === 'add_brain') {
      this.addCustomHeadBrain();
    } else if (action === 'toggle_agent' && agentId) {
      this.toggleHeadSearchAgent(agentId);
    } else if (action === 'add_search_agent') {
      this.addCustomHeadSearchAgent();
    } else if (action === 'activate_profile' && profileId) {
      this.activeHeadProfileId = profileId;
      this.addHeadEvent('profile_selected', `Выбран профиль Совета: ${this.headProfileById(profileId)?.name || profileId}.`, profileId);
    } else if (action === 'create_profile') {
      this.createHeadProfileFromCurrent();
    }
    this.reindexHeadBrains();
    await this.saveHeadRuntime();
    this.renderSystemStatus();
    this.renderMissionControl();
    this.renderWorkTaskCard();
  },

  setMainStrategist(brainId) {
    const brain = this.headBrainById(brainId);
    if (!brain) return;
    this.headBrains.forEach((item) => {
      item.is_main_strategist = item.brain_id === brainId;
      if (item.brain_id === brainId) {
        item.enabled = true;
        item.status = item.test_passed ? 'ready' : 'selected';
        item.connection_status = item.status;
      }
    });
    const activeProfile = this.activeHeadProfile();
    if (activeProfile) {
      activeProfile.main_strategist_id = brainId;
      if (!activeProfile.council_members.includes(brainId)) activeProfile.council_members.unshift(brainId);
      activeProfile.updated_at = new Date().toISOString();
      activeProfile.status = brain.test_passed ? 'ready' : 'needs_test';
    }
    this.activeHeadBrainId = brainId;
    this.addHeadEvent('strategist_selected', `${brain.display_name} выбран главным Стратегом вручную владельцем.`, brainId, 'review');
    this.toast('Главный Стратег выбран');
  },

  reindexHeadBrains() {
    this.headBrains = this.headBrains
      .map((brain) => this.normalizeHeadBrain(brain))
      .sort((a, b) => a.order - b.order || a.display_name.localeCompare(b.display_name, 'ru'))
      .map((brain, index) => ({ ...brain, order: (index + 1) * 10 }));
  },

  async updateHeadBrainRole(brainId, role) {
    const brain = this.headBrainById(brainId);
    if (!brain) return;
    brain.role = role;
    brain.updated_at = new Date().toISOString();
    this.addHeadEvent('brain_role_changed', `${brain.display_name}: роль изменена на ${role}.`, brain.brain_id);
    await this.saveHeadRuntime();
    this.renderSystemHeadPanel();
    this.renderWorkTaskCard();
  },

  verifyHeadBrainTest(brain) {
    const response = String(document.getElementById('head-test-response')?.value || '').trim();
    if (!response) {
      this.toast('Вставь ответ теста');
      return;
    }
    const passed = response.includes(brain.ready_phrase);
    brain.last_test_at = new Date().toISOString();
    brain.test_passed = passed;
    brain.status = passed ? 'ready' : 'attention';
    brain.connection_status = brain.status;
    brain.enabled = passed || brain.enabled;
    brain.updated_at = brain.last_test_at;
    this.addHeadEvent(
      passed ? 'brain_test_passed' : 'brain_test_failed',
      `${brain.display_name}: ${passed ? 'готов к задачам' : 'тест не пройден'}.`,
      brain.brain_id,
      passed ? 'safe' : 'review'
    );
    this.toast(passed ? 'Мозг готов к задачам' : 'Тест не пройден');
  },

  addCustomHeadBrain() {
    const nameInput = document.getElementById('head-new-brain-name');
    const providerInput = document.getElementById('head-new-brain-provider');
    const modelInput = document.getElementById('head-new-brain-model');
    const urlInput = document.getElementById('head-new-brain-url');
    const name = String(nameInput?.value || '').trim();
    if (!name) {
      this.toast('Укажи название мозга');
      nameInput?.focus();
      return;
    }
    const now = new Date().toISOString();
    const brain = this.normalizeHeadBrain({
      brain_id: this.generateWorkspaceId('BRAIN'),
      display_name: name,
      provider_name: String(providerInput?.value || '').trim() || name,
      selected_model_name: String(modelInput?.value || '').trim() || 'укажу вручную',
      official_url: String(urlInput?.value || '').trim(),
      role: 'Пользовательская роль',
      default_role: 'Пользовательская роль',
      enabled: true,
      can_be_strategist: true,
      status: 'selected',
      connection_status: 'selected',
      order: (this.headBrains.length + 1) * 10,
      preset: false,
      created_at: now,
      updated_at: now
    });
    this.headBrains.push(brain);
    const activeProfile = this.activeHeadProfile();
    if (activeProfile && !activeProfile.council_members.includes(brain.brain_id)) {
      activeProfile.council_members.push(brain.brain_id);
      activeProfile.updated_at = now;
    }
    [nameInput, providerInput, modelInput, urlInput].forEach((input) => {
      if (input) input.value = '';
    });
    this.activeHeadBrainId = brain.brain_id;
    this.addHeadEvent('brain_added', `${brain.display_name}: добавлен в Совет.`, brain.brain_id);
    this.toast('Мозг добавлен');
  },

  toggleHeadSearchAgent(agentId) {
    const agent = this.headSearchAgents.find((item) => item.agent_id === agentId);
    if (!agent) return;
    agent.enabled = !agent.enabled;
    agent.status = agent.enabled ? 'enabled' : 'disabled';
    agent.updated_at = new Date().toISOString();
    const activeProfile = this.activeHeadProfile();
    if (activeProfile) {
      if (agent.enabled && !activeProfile.search_agent_ids.includes(agent.agent_id)) {
        activeProfile.search_agent_ids.push(agent.agent_id);
      } else if (!agent.enabled) {
        activeProfile.search_agent_ids = activeProfile.search_agent_ids.filter((id) => id !== agent.agent_id);
      }
      activeProfile.updated_at = agent.updated_at;
    }
    this.addHeadEvent('search_agent_toggle', `${agent.name}: ${agent.enabled ? 'включён' : 'выключен'}.`, agent.agent_id);
  },

  addCustomHeadSearchAgent() {
    const nameInput = document.getElementById('head-new-agent-name');
    const roleInput = document.getElementById('head-new-agent-role');
    const name = String(nameInput?.value || '').trim();
    if (!name) {
      this.toast('Укажи источник');
      nameInput?.focus();
      return;
    }
    const now = new Date().toISOString();
    const agent = this.normalizeHeadSearchAgent({
      agent_id: this.generateWorkspaceId('SEARCH'),
      name,
      source_type: 'custom',
      role: String(roleInput?.value || '').trim() || 'Пользовательский источник',
      description: 'Добавлен владельцем. В Phase 3 это research slot, не автоматический crawler.',
      enabled: true,
      status: 'enabled',
      order: (this.headSearchAgents.length + 1) * 10,
      created_at: now,
      updated_at: now
    });
    this.headSearchAgents.push(agent);
    const activeProfile = this.activeHeadProfile();
    if (activeProfile && !activeProfile.search_agent_ids.includes(agent.agent_id)) {
      activeProfile.search_agent_ids.push(agent.agent_id);
      activeProfile.updated_at = now;
    }
    if (nameInput) nameInput.value = '';
    if (roleInput) roleInput.value = '';
    this.addHeadEvent('search_agent_added', `${agent.name}: добавлен в исследователи.`, agent.agent_id);
    this.toast('Исследователь добавлен');
  },

  createHeadProfileFromCurrent() {
    const input = document.getElementById('head-new-profile-name');
    const name = String(input?.value || '').trim();
    if (!name) {
      this.toast('Укажи название профиля');
      input?.focus();
      return;
    }
    const now = new Date().toISOString();
    const profile = this.normalizeHeadProfile({
      profile_id: this.generateWorkspaceId('PROFILE'),
      name,
      type: 'custom',
      description: 'Профиль создан из текущего состава Головы.',
      main_strategist_id: this.mainStrategistBrain()?.brain_id || '',
      council_members: this.headBrains.filter((brain) => brain.enabled && !brain.archived).map((brain) => brain.brain_id),
      search_agent_ids: this.headSearchAgents.filter((agent) => agent.enabled && !agent.archived).map((agent) => agent.agent_id),
      is_default: false,
      status: 'draft',
      created_at: now,
      updated_at: now
    });
    this.headProfiles.push(profile);
    this.activeHeadProfileId = profile.profile_id;
    if (input) input.value = '';
    this.addHeadEvent('profile_created', `Создан профиль Совета: ${profile.name}.`, profile.profile_id);
    this.toast('Профиль создан');
  },

  currentPhonePairingUrl() {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('screen', 'system');
      url.searchParams.set('force', 'phase19-handoff-route-planner');
      return url.toString();
    } catch {
      return 'https://vitaliykonstantinovich.github.io/terminator-webapp/?screen=system&force=phase19-handoff-route-planner';
    }
  },

  buildLocalPairingDisplayCode() {
    const raw = `${window.location.host || 'local'}:${TERMINATOR_DEFAULT_AGENT_ID}:phone-pwa`;
    let hash = 0;
    for (let index = 0; index < raw.length; index += 1) {
      hash = ((hash << 5) - hash + raw.charCodeAt(index)) | 0;
    }
    return `MINA-${String(Math.abs(hash) % 10000).padStart(4, '0')}`;
  },

  normalizeDevicePairingState(raw = null) {
    const now = new Date().toISOString();
    const pwa = this.pwaSnapshot();
    const phone = raw?.phone || {};
    const pwaState = raw?.pwa || {};
    const handoff = raw?.handoff || {};
    const pairingUrl = phone.pairing_url || this.currentPhonePairingUrl();
    return {
      schema_version: 1,
      status: raw?.status || 'not_started',
      updated_at: raw?.updated_at || now,
      last_checked_at: raw?.last_checked_at || '',
      phone: {
        device_id: 'device_owner_phone',
        display_name: phone.display_name || 'Телефон владельца',
        pairing_status: phone.pairing_status || 'not_started',
        presence_status: phone.presence_status || 'offline',
        pairing_url: pairingUrl,
        display_code: phone.display_code || this.buildLocalPairingDisplayCode(),
        owner_confirmed_at: phone.owner_confirmed_at || '',
        last_seen: phone.last_seen || '',
        note: phone.note || 'Телефон пока не даёт heartbeat. Pairing V1 готовит ручной вход без паролей, cookies и API.'
      },
      pwa: {
        device_id: 'device_pwa_shell',
        install_status: pwaState.install_status || pwa.installStatus,
        install_label: pwaState.install_label || pwa.installLabel,
        service_worker: pwaState.service_worker || pwa.serviceWorker,
        display_mode: pwaState.display_mode || pwa.displayMode,
        scope: pwaState.scope || pwa.scope || '',
        last_checked_at: pwaState.last_checked_at || pwa.lastCheckedAt || ''
      },
      handoff: {
        status: handoff.status || 'not_started',
        direction: handoff.direction || 'pc_to_phone',
        active_task_id: handoff.active_task_id || '',
        active_handoff_id: handoff.active_handoff_id || '',
        active_route_id: handoff.active_route_id || '',
        package_status: handoff.package_status || 'not_started',
        last_handoff_at: handoff.last_handoff_at || '',
        note: handoff.note || 'Передача задачи теперь готовит безопасный пакет и ждёт ручного подтверждения владельца. Команды устройствам не отправляются.'
      }
    };
  },

  loadDevicePairingState() {
    this.devicePairingState = this.normalizeDevicePairingState(this.readJsonStorage(DEVICE_PAIRING_STATE_STORAGE_KEY, null));
    this.saveDevicePairingState();
  },

  saveDevicePairingState() {
    if (!this.devicePairingState) return;
    this.writeJsonStorage(DEVICE_PAIRING_STATE_STORAGE_KEY, this.devicePairingState);
  },

  buildDevicePresenceSnapshot() {
    if (!this.devicePairingState) this.loadDevicePairingState();
    const now = new Date().toISOString();
    const pwa = this.pwaSnapshot();
    const phoneDevice = (this.systemDevices || []).find((device) => device.device_id === 'device_owner_phone');
    const pwaDevice = (this.systemDevices || []).find((device) => device.device_id === 'device_pwa_shell');
    const ownedRegistry = this.buildOwnedAgentRegistrySnapshot();
    const phone = this.devicePairingState.phone;
    const phonePairingReady = ['link_ready', 'manual_confirmed'].includes(phone.pairing_status);
    const phoneOwnerConfirmed = Boolean(phone.owner_confirmed_at);
    const pwaReady = pwa.installed || pwa.serviceWorker === 'registered';
    const webappOnline = navigator.onLine !== false;
    const primaryAgentOnline = ownedRegistry.online_count > 0;
    const readiness = Math.max(22, Math.min(94,
      24
      + (webappOnline ? 12 : 0)
      + (primaryAgentOnline ? 18 : 0)
      + (pwa.serviceWorker === 'registered' ? 16 : 0)
      + (pwa.installed ? 8 : 0)
      + (phonePairingReady ? 12 : 0)
      + (phoneOwnerConfirmed ? 8 : 0)
    ));
    const status = readiness >= 82
      ? 'ready'
      : readiness >= 58
        ? 'partial'
        : webappOnline
          ? 'waiting'
          : 'review';
    const next = !phonePairingReady
      ? 'Подготовить ссылку подключения телефона.'
      : !phoneOwnerConfirmed
        ? 'Открыть ссылку на телефоне и подтвердить ручной вход.'
        : !pwaReady
          ? 'Установить или обновить PWA, чтобы телефон мог быть удобным контроллером.'
          : !primaryAgentOnline
            ? 'Проверить heartbeat основного агента ПК.'
            : 'Мульти-устройство готово к следующему слою handoff.';
    return {
      now,
      status,
      readiness,
      next,
      webapp: {
        status: webappOnline ? 'online' : 'offline',
        note: webappOnline ? 'браузер владельца на связи' : 'браузер показывает offline'
      },
      primary_agent: {
        agent_id: ownedRegistry.primary_agent_id,
        status: primaryAgentOnline ? 'online' : 'not_seen',
        online_count: ownedRegistry.online_count,
        last_seen: ownedRegistry.primary?.last_seen || ''
      },
      phone: {
        ...phone,
        device_status: phoneDevice?.status || 'offline',
        owner_confirmed: phoneOwnerConfirmed,
        pairing_ready: phonePairingReady
      },
      pwa: {
        ...this.devicePairingState.pwa,
        install_status: pwa.installStatus,
        install_label: pwa.installLabel,
        service_worker: pwa.serviceWorker,
        display_mode: pwa.displayMode,
        scope: pwa.scope || '',
        device_status: pwaDevice?.status || 'unknown',
        ready: Boolean(pwaReady)
      },
      handoff: this.devicePairingState.handoff
    };
  },

  async syncDevicePresenceState(options = {}) {
    if (!this.devicePairingState) this.loadDevicePairingState();
    const now = new Date().toISOString();
    const pwa = this.pwaSnapshot();
    const snapshot = this.buildDevicePresenceSnapshot();
    this.devicePairingState = {
      ...this.devicePairingState,
      status: snapshot.status,
      updated_at: now,
      last_checked_at: now,
      pwa: {
        ...this.devicePairingState.pwa,
        install_status: pwa.installStatus,
        install_label: pwa.installLabel,
        service_worker: pwa.serviceWorker,
        display_mode: pwa.displayMode,
        scope: pwa.scope || '',
        last_checked_at: pwa.lastCheckedAt || now
      }
    };
    this.systemDevices = (this.systemDevices || []).map((device) => {
      const next = this.normalizeDevice(device);
      if (next.device_id === 'device_pwa_shell') {
        next.status = pwa.installed || pwa.serviceWorker === 'registered' ? 'ready' : 'unknown';
        next.owner_confirmed = Boolean(pwa.installed || pwa.serviceWorker === 'registered');
        next.last_seen = now;
        next.handoff_state = pwa.installed
          ? 'готов к мобильному входу как установленное приложение'
          : pwa.serviceWorker === 'registered'
            ? 'offline shell готов, установка PWA опциональна'
            : 'ожидает установки или проверки PWA';
        next.notes = 'PWA используется как мобильный контроллер интерфейса; не выполняет системные команды.';
      }
      if (next.device_id === 'device_owner_phone') {
        const phone = this.devicePairingState.phone;
        next.connection_type = 'pwa_manual_pairing';
        next.owner_confirmed = Boolean(phone.owner_confirmed_at);
        next.status = phone.presence_status === 'online'
          ? 'connected'
          : phone.owner_confirmed_at
            ? 'offline'
            : phone.pairing_status === 'link_ready'
              ? 'pending_trust'
              : 'offline';
        next.handoff_state = phone.owner_confirmed_at
          ? 'ручной вход телефона подтверждён; heartbeat телефона ещё не подключён'
          : phone.pairing_status === 'link_ready'
            ? 'ссылка подключения подготовлена; ждём ручной вход владельца на телефоне'
            : 'ожидает подготовки ссылки подключения';
        next.notes = 'Телефон владельца как контроллер Mina UI/PWA. ADB, скриншоты и команды устройству не запускаются.';
      }
      return next;
    });
    this.saveDevicePairingState();
    await this.saveSystemDevices();
    if (!options.silent) this.toast('Присутствие устройств обновлено');
    return this.buildDevicePresenceSnapshot();
  },

  defaultContinuityState() {
    return {
      schema_version: CONTINUITY_SCHEMA_VERSION,
      status: 'not_started',
      last_checkpoint_id: '',
      last_checkpoint_at: '',
      last_teleport_package_id: '',
      last_teleport_at: '',
      checkpoints: [],
      teleport_packages: [],
      offline_events: [],
      settings: {
        auto_checkpoint_on_hide: true,
        auto_checkpoint_on_offline: true,
        restore_mode: 'owner_confirmed',
        heavy_files_policy: 'refs_only'
      }
    };
  },

  normalizeContinuityCheckpoint(checkpoint = {}) {
    const now = new Date().toISOString();
    return {
      schema_version: CONTINUITY_SCHEMA_VERSION,
      checkpoint_id: checkpoint.checkpoint_id || this.generateWorkspaceId('CONT'),
      task_id: checkpoint.task_id || '',
      project_id: checkpoint.project_id || '',
      task_title: checkpoint.task_title || '',
      task_status: checkpoint.task_status || '',
      workspace_tab: checkpoint.workspace_tab || this.workspaceActiveTab || 'files',
      screen: checkpoint.screen || this.activeScreen || this.initialScreenFromUrl(),
      reason: checkpoint.reason || 'manual_checkpoint',
      next_step: checkpoint.next_step || '',
      handoff_count: Number.isFinite(Number(checkpoint.handoff_count)) ? Number(checkpoint.handoff_count) : 0,
      teleport_count: Number.isFinite(Number(checkpoint.teleport_count)) ? Number(checkpoint.teleport_count) : 0,
      artifact_refs: Array.isArray(checkpoint.artifact_refs) ? checkpoint.artifact_refs : [],
      package_refs: Array.isArray(checkpoint.package_refs) ? checkpoint.package_refs : [],
      browser_online: checkpoint.browser_online !== false,
      pwa_service_worker: checkpoint.pwa_service_worker || this.pwaServiceWorkerStatus || 'not_checked',
      storage_status: checkpoint.storage_status || (this.taskRuntimeReady ? 'indexeddb' : 'localStorage_fallback'),
      privacy_status: checkpoint.privacy_status || 'not_required',
      created_at: checkpoint.created_at || now,
      updated_at: checkpoint.updated_at || checkpoint.created_at || now,
      note: checkpoint.note || 'Checkpoint хранит metadata и ссылки. Raw файлы, cookies, tokens и пароли не сохраняются.'
    };
  },

  normalizeTeleportPackage(pack = {}, task = null) {
    const now = new Date().toISOString();
    const mode = TELEPORT_PACKAGE_MODE_BY_ID[pack.mode] ? pack.mode : 'resume_standard';
    return {
      schema_version: CONTINUITY_SCHEMA_VERSION,
      package_id: pack.package_id || this.generateWorkspaceId('TELEPORT'),
      task_id: pack.task_id || task?.task_id || '',
      project_id: pack.project_id || task?.project_id || '',
      task_title: pack.task_title || task?.title || task?.user_request || '',
      mode,
      mode_label: pack.mode_label || TELEPORT_PACKAGE_MODE_BY_ID[mode].label,
      target: pack.target || TELEPORT_PACKAGE_MODE_BY_ID[mode].label,
      status: pack.status || 'prepared',
      package_text: pack.package_text || '',
      package_summary: pack.package_summary || '',
      artifact_id: pack.artifact_id || '',
      checkpoint_id: pack.checkpoint_id || '',
      privacy_status: pack.privacy_status || 'not_checked',
      privacy_summary: pack.privacy_summary || '',
      copied_at: pack.copied_at || '',
      owner_confirmed_at: pack.owner_confirmed_at || '',
      created_at: pack.created_at || now,
      updated_at: pack.updated_at || now,
      note: pack.note || 'Task Teleport переносит контекст вручную. Команды устройствам не отправляются.',
      artifact_refs: Array.isArray(pack.artifact_refs) ? pack.artifact_refs : [],
      evidence_refs: Array.isArray(pack.evidence_refs) ? pack.evidence_refs : []
    };
  },

  normalizeContinuityState(state = {}) {
    const fallback = this.defaultContinuityState();
    const source = state && typeof state === 'object' ? state : {};
    const checkpoints = Array.isArray(source.checkpoints)
      ? source.checkpoints.map((checkpoint) => this.normalizeContinuityCheckpoint(checkpoint)).slice(0, CONTINUITY_MAX_CHECKPOINTS)
      : [];
    const teleportPackages = Array.isArray(source.teleport_packages)
      ? source.teleport_packages.map((pack) => this.normalizeTeleportPackage(pack)).slice(0, CONTINUITY_MAX_TELEPORT_PACKAGES)
      : [];
    const offlineEvents = Array.isArray(source.offline_events)
      ? source.offline_events.map((event) => ({
          event_id: event.event_id || this.generateWorkspaceId('OFFLINE'),
          type: event.type || 'status',
          status: event.status || 'recorded',
          task_id: event.task_id || '',
          message: event.message || '',
          created_at: event.created_at || new Date().toISOString()
        })).slice(0, CONTINUITY_MAX_OFFLINE_EVENTS)
      : [];
    return {
      ...fallback,
      ...source,
      schema_version: CONTINUITY_SCHEMA_VERSION,
      checkpoints,
      teleport_packages: teleportPackages,
      offline_events: offlineEvents,
      settings: {
        ...fallback.settings,
        ...(source.settings && typeof source.settings === 'object' ? source.settings : {})
      },
      last_checkpoint_id: source.last_checkpoint_id || checkpoints[0]?.checkpoint_id || '',
      last_checkpoint_at: source.last_checkpoint_at || checkpoints[0]?.created_at || '',
      last_teleport_package_id: source.last_teleport_package_id || teleportPackages[0]?.package_id || '',
      last_teleport_at: source.last_teleport_at || teleportPackages[0]?.created_at || ''
    };
  },

  loadContinuityState() {
    this.continuityState = this.normalizeContinuityState(this.readJsonStorage(CONTINUITY_STORAGE_KEY, null));
    this.activeContinuityCheckpointId = this.continuityState.last_checkpoint_id || '';
    this.activeTeleportPackageId = this.continuityState.last_teleport_package_id || '';
  },

  saveContinuityState() {
    this.continuityState = this.normalizeContinuityState(this.continuityState || this.defaultContinuityState());
    this.writeJsonStorage(CONTINUITY_STORAGE_KEY, this.continuityState);
  },

  bindContinuityRuntime() {
    if (this.continuityRuntimeBound || typeof window === 'undefined') return;
    this.continuityRuntimeBound = true;
    window.addEventListener('beforeunload', () => {
      if (this.continuityState?.settings?.auto_checkpoint_on_hide !== false) {
        this.createContinuityCheckpoint('beforeunload');
      }
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && this.continuityState?.settings?.auto_checkpoint_on_hide !== false) {
        this.createContinuityCheckpoint('visibility_hidden');
      }
    });
    window.addEventListener('offline', () => {
      this.recordOfflineContinuityEvent('browser_offline', 'Браузер перешёл в offline. Черновики и checkpoint остаются локально.');
      if (this.continuityState?.settings?.auto_checkpoint_on_offline !== false) this.createContinuityCheckpoint('browser_offline');
      this.renderSystemStatus();
      this.renderWorkTaskCard();
    });
    window.addEventListener('online', () => {
      this.recordOfflineContinuityEvent('browser_online', 'Браузер снова online. Можно продолжить handoff/sync вручную.');
      this.renderSystemStatus();
      this.renderWorkTaskCard();
    });
  },

  continuityStatusName(status) {
    return CONTINUITY_STATUS_LABELS[status] || status || 'ожидает';
  },

  createContinuityCheckpoint(reason = 'manual_checkpoint', task = this.getActiveWorkTask()) {
    if (!this.continuityState) this.continuityState = this.defaultContinuityState();
    const now = new Date().toISOString();
    const normalizedTask = task || this.getActiveWorkTask();
    const checkpoint = this.normalizeContinuityCheckpoint({
      task_id: normalizedTask?.task_id || '',
      project_id: normalizedTask?.project_id || '',
      task_title: normalizedTask?.title || normalizedTask?.user_request || '',
      task_status: normalizedTask?.status || '',
      workspace_tab: this.workspaceActiveTab || 'files',
      screen: this.activeScreen || this.initialScreenFromUrl(),
      reason,
      next_step: normalizedTask?.next_step || '',
      handoff_count: this.taskHandoffRecords(normalizedTask).length,
      teleport_count: Array.isArray(normalizedTask?.teleport_packages) ? normalizedTask.teleport_packages.length : 0,
      artifact_refs: Array.isArray(normalizedTask?.artifacts) ? normalizedTask.artifacts.slice(0, 8).map((artifact) => artifact.artifact_id) : [],
      package_refs: Array.isArray(normalizedTask?.teleport_packages) ? normalizedTask.teleport_packages.slice(0, 5).map((pack) => pack.package_id) : [],
      browser_online: typeof navigator === 'undefined' ? true : navigator.onLine !== false,
      pwa_service_worker: this.pwaServiceWorkerStatus || 'not_checked',
      storage_status: this.taskRuntimeReady ? 'indexeddb' : 'localStorage_fallback',
      created_at: now,
      updated_at: now
    });
    this.continuityState.checkpoints = [checkpoint, ...(this.continuityState.checkpoints || []).filter((item) => item.checkpoint_id !== checkpoint.checkpoint_id)].slice(0, CONTINUITY_MAX_CHECKPOINTS);
    this.continuityState.last_checkpoint_id = checkpoint.checkpoint_id;
    this.continuityState.last_checkpoint_at = checkpoint.created_at;
    this.continuityState.status = 'checkpoint_ready';
    this.activeContinuityCheckpointId = checkpoint.checkpoint_id;
    this.saveContinuityState();
    return checkpoint;
  },

  recordOfflineContinuityEvent(type, message, task = this.getActiveWorkTask()) {
    if (!this.continuityState) this.continuityState = this.defaultContinuityState();
    const event = {
      event_id: this.generateWorkspaceId('OFFLINE'),
      type,
      status: 'recorded',
      task_id: task?.task_id || '',
      message,
      created_at: new Date().toISOString()
    };
    this.continuityState.offline_events = [event, ...(this.continuityState.offline_events || [])].slice(0, CONTINUITY_MAX_OFFLINE_EVENTS);
    this.saveContinuityState();
    return event;
  },

  buildContinuitySnapshot(task = this.getActiveWorkTask()) {
    const state = this.normalizeContinuityState(this.continuityState || this.defaultContinuityState());
    const pwa = this.pwaSnapshot();
    const hasCheckpoint = Boolean(state.checkpoints.length);
    const hasTask = Boolean(task?.task_id);
    const taskPackages = task ? (task.teleport_packages || []) : [];
    const browserOnline = typeof navigator === 'undefined' ? true : navigator.onLine !== false;
    let readiness = 18;
    if (this.taskRuntimeReady) readiness += 16;
    if (hasTask) readiness += 16;
    if (hasCheckpoint) readiness += 18;
    if (pwa.serviceWorker === 'registered') readiness += 14;
    if (taskPackages.length || state.teleport_packages.length) readiness += 12;
    if (browserOnline) readiness += 8;
    readiness = Math.min(100, readiness);
    const status = !browserOnline ? 'offline' : readiness >= 84 ? 'ready' : readiness >= 55 ? 'partial' : hasTask ? 'review' : 'waiting';
    const next = !hasTask
      ? 'Создать или открыть задачу.'
      : !hasCheckpoint
        ? 'Создать checkpoint продолжения.'
        : !taskPackages.length
          ? 'Подготовить Task Teleport package.'
          : browserOnline
            ? 'Можно продолжать работу или передать пакет вручную.'
            : 'Работа сохранена локально; продолжить после восстановления online.';
    return {
      schema_version: CONTINUITY_SCHEMA_VERSION,
      status,
      label: this.continuityStatusName(status),
      readiness,
      browser_online: browserOnline,
      pwa_service_worker: pwa.serviceWorker,
      task_id: task?.task_id || '',
      checkpoint_count: state.checkpoints.length,
      last_checkpoint: state.checkpoints[0] || null,
      teleport_count: state.teleport_packages.length,
      task_teleport_count: taskPackages.length,
      offline_events: state.offline_events || [],
      next,
      state
    };
  },

  buildTaskTeleportPackageText(task, mode = 'resume_standard') {
    const selectedMode = TELEPORT_PACKAGE_MODE_BY_ID[mode] ? mode : 'resume_standard';
    const modeInfo = TELEPORT_PACKAGE_MODE_BY_ID[selectedMode];
    const artifacts = Array.isArray(task.artifacts) ? task.artifacts : [];
    const files = Array.isArray(task.files) ? task.files : [];
    const handoffs = this.taskHandoffRecords(task);
    const checks = Array.isArray(task.eyes_visual_checks) ? task.eyes_visual_checks : [];
    const plans = Array.isArray(task.hands_action_plans) ? task.hands_action_plans : [];
    const isShort = selectedMode === 'resume_short' || selectedMode === 'phone_pwa';
    const lines = [
      'MINA TASK TELEPORT PACKAGE',
      `schema_version: ${CONTINUITY_SCHEMA_VERSION}`,
      `mode: ${modeInfo.label}`,
      `created_at: ${new Date().toISOString()}`,
      '',
      '## Задача',
      `task_id: ${task.task_id}`,
      `project: ${this.projectName(task.project_id)}`,
      `title: ${task.title || task.user_request}`,
      `status: ${this.statusName(task.status)}`,
      `next_step: ${task.next_step || 'не задан'}`,
      '',
      '## Цель',
      task.goal || task.user_request || 'не задано',
      '',
      '## Критерии',
      ...(Array.isArray(task.criteria) && task.criteria.length ? task.criteria.map((item) => `- ${item}`) : ['- критерии не заданы'])
    ];
    if (!isShort) {
      lines.push(
        '',
        '## Артефакты',
        ...(artifacts.length ? artifacts.slice(0, 12).map((artifact) => `- ${artifact.artifact_id}: ${artifact.title} (${this.artifactTypeName(artifact.type)}, ${artifact.status || 'draft'})`) : ['- нет']),
        '',
        '## Файлы metadata',
        ...(files.length ? files.slice(0, 12).map((file) => `- ${file.file_id || file.name}: ${file.name || file.file_name || 'file'}; role=${file.role || 'context'}`) : ['- нет']),
        '',
        '## Evidence / Проверки',
        ...(checks.length ? checks.slice(0, 8).map((check) => `- ${check.check_id}: ${check.target}; ${this.eyesVisualStatusName(check.status)}`) : ['- visual evidence нет']),
        '',
        '## Руки / Планы',
        ...(plans.length ? plans.slice(0, 8).map((plan) => `- ${plan.plan_id}: ${plan.title}; risk=${plan.risk_level}; status=${plan.status}`) : ['- планов Рук нет']),
        '',
        '## Handoff',
        ...(handoffs.length ? handoffs.slice(0, 8).map((handoff) => `- ${handoff.handoff_id}: ${handoff.route_title}; ${this.handoffStatusName(handoff.status)}`) : ['- handoff пакетов нет'])
      );
    }
    lines.push(
      '',
      '## Как продолжить',
      '1. Открыть Терминатор / Рабочее.',
      '2. Найти task_id из пакета.',
      '3. Проверить следующий шаг и статус.',
      '4. Если нужен внешний исполнитель, использовать пакет вручную.',
      '5. Любые опасные действия отправлять в Approval.',
      '',
      '## Safety',
      '- Пакет не содержит raw/base64 файлов.',
      '- Пакет не должен содержать passwords, cookies, tokens, API keys.',
      '- AI API не использовались.',
      '- Устройствам команды не отправлялись.',
      '- Это ручной перенос контекста, не автозапуск.'
    );
    return lines.join('\n');
  },

  async prepareTaskTeleportPackage(mode = 'resume_standard') {
    const task = this.getActiveWorkTask();
    if (!task) {
      this.toast('Сначала создайте или выберите задачу');
      return null;
    }
    const checkpoint = this.createContinuityCheckpoint(`teleport_${mode}`, task);
    const rawPackage = this.buildTaskTeleportPackageText(task, mode);
    const privacy = this.scanPrivacyText(rawPackage);
    const packageText = privacy.findings.length ? this.redactPrivacyText(rawPackage) : rawPackage;
    const modeInfo = TELEPORT_PACKAGE_MODE_BY_ID[TELEPORT_PACKAGE_MODE_BY_ID[mode] ? mode : 'resume_standard'];
    const artifact = this.createArtifact(
      task,
      'CONTEXT_PACK',
      `Task Teleport: ${modeInfo.label}`,
      `Пакет продолжения задачи. Privacy: ${this.privacyScanSummary(privacy)}.`,
      packageText,
      'continuity'
    );
    artifact.status = privacy.blocked ? 'blocked' : privacy.findings.length ? 'needs_review' : 'ready';
    const pack = this.normalizeTeleportPackage({
      task_id: task.task_id,
      project_id: task.project_id,
      task_title: task.title || task.user_request,
      mode: modeInfo.id,
      target: modeInfo.label,
      status: privacy.blocked ? 'blocked' : 'prepared',
      package_text: packageText,
      package_summary: `${modeInfo.label}: ${task.title || task.user_request}`,
      artifact_id: artifact.artifact_id,
      checkpoint_id: checkpoint.checkpoint_id,
      privacy_status: privacy.status,
      privacy_summary: this.privacyScanSummary(privacy),
      artifact_refs: [artifact.artifact_id],
      evidence_refs: [checkpoint.checkpoint_id]
    }, task);
    task.teleport_packages = Array.isArray(task.teleport_packages) ? task.teleport_packages : [];
    task.teleport_packages = [pack, ...task.teleport_packages.filter((item) => item.package_id !== pack.package_id)].slice(0, 12);
    task.device_context = task.device_context && typeof task.device_context === 'object' ? task.device_context : { device_ids: [], required_capabilities: [], device_events: [] };
    task.device_context.device_events = Array.isArray(task.device_context.device_events) ? task.device_context.device_events : [];
    task.device_context.device_events.unshift({
      event_id: this.generateWorkspaceId('DEVICE-EVENT'),
      type: 'task_teleport_package_prepared',
      status: pack.status,
      package_id: pack.package_id,
      checkpoint_id: checkpoint.checkpoint_id,
      created_at: pack.created_at
    });
    this.addWorkspaceMessage(task, 'teleport_event', 'Ноги', `Подготовлен Task Teleport package: ${modeInfo.label}`, {
      linked_artifacts: [artifact.artifact_id]
    });
    task.updated_at = pack.updated_at;
    this.saveWorkTasks();

    if (!this.continuityState) this.continuityState = this.defaultContinuityState();
    this.continuityState.teleport_packages = [pack, ...(this.continuityState.teleport_packages || []).filter((item) => item.package_id !== pack.package_id)].slice(0, CONTINUITY_MAX_TELEPORT_PACKAGES);
    this.continuityState.last_teleport_package_id = pack.package_id;
    this.continuityState.last_teleport_at = pack.created_at;
    this.continuityState.status = pack.status === 'blocked' ? 'blocked' : 'teleport_ready';
    this.activeTeleportPackageId = pack.package_id;
    this.saveContinuityState();
    return pack;
  },

  findTeleportPackage(packageId) {
    const id = String(packageId || '').trim();
    if (!id) return { task: null, pack: null };
    for (const task of this.workTasks || []) {
      const packs = Array.isArray(task.teleport_packages) ? task.teleport_packages.map((pack) => this.normalizeTeleportPackage(pack, task)) : [];
      const pack = packs.find((item) => item.package_id === id);
      if (pack) return { task, pack };
    }
    const statePack = (this.continuityState?.teleport_packages || []).find((item) => item.package_id === id);
    return { task: null, pack: statePack || null };
  },

  async copyTeleportPackage(packageId) {
    const { task, pack } = this.findTeleportPackage(packageId);
    if (!pack?.package_text) {
      this.toast('Task Teleport package не найден');
      return;
    }
    await this.copyWorkspaceText(pack.package_text);
    pack.status = 'copied';
    pack.copied_at = new Date().toISOString();
    pack.updated_at = pack.copied_at;
    if (task) {
      task.teleport_packages = (task.teleport_packages || []).map((item) => item.package_id === pack.package_id ? pack : item);
      this.addWorkspaceMessage(task, 'teleport_event', 'Ноги', `Task Teleport package скопирован вручную: ${pack.mode_label}`);
      task.updated_at = pack.updated_at;
      this.saveWorkTasks();
    }
    if (this.continuityState) {
      this.continuityState.teleport_packages = (this.continuityState.teleport_packages || []).map((item) => item.package_id === pack.package_id ? pack : item);
      this.saveContinuityState();
    }
    this.renderSystemStatus();
    this.renderWorkTaskCard();
  },

  restoreContinuityCheckpoint(checkpointId) {
    const state = this.normalizeContinuityState(this.continuityState || this.defaultContinuityState());
    const id = String(checkpointId || state.last_checkpoint_id || '').trim();
    const checkpoint = state.checkpoints.find((item) => item.checkpoint_id === id) || state.checkpoints[0];
    if (!checkpoint) {
      this.toast('Checkpoint не найден');
      return null;
    }
    if (checkpoint.task_id && this.workTasks.some((task) => task.task_id === checkpoint.task_id)) {
      this.activeWorkTaskId = checkpoint.task_id;
      this.workspaceActiveTab = WORKSPACE_TABS.has(checkpoint.workspace_tab) ? checkpoint.workspace_tab : 'handoff';
      this.go('work');
      this.toast('Контекст задачи восстановлен');
    } else {
      this.go(checkpoint.screen || 'work');
      this.toast('Checkpoint открыт без active task');
    }
    return checkpoint;
  },

  buildContinuityReport(task = this.getActiveWorkTask()) {
    const snapshot = this.buildContinuitySnapshot(task);
    return [
      '# Continuity / Offline Recovery / Task Teleport V1',
      '',
      `Generated: ${new Date().toISOString()}`,
      `Status: ${snapshot.label}`,
      `Readiness: ${snapshot.readiness}%`,
      `Browser online: ${snapshot.browser_online ? 'yes' : 'no'}`,
      `PWA service worker: ${snapshot.pwa_service_worker}`,
      `Task: ${snapshot.task_id || 'not selected'}`,
      `Checkpoints: ${snapshot.checkpoint_count}`,
      `Task Teleport packages: ${snapshot.teleport_count}`,
      '',
      '## Последние checkpoints',
      ...(snapshot.state.checkpoints.length ? snapshot.state.checkpoints.slice(0, 8).map((checkpoint) => `- ${checkpoint.checkpoint_id}: task=${checkpoint.task_id || 'none'}; reason=${checkpoint.reason}; ${this.formatTaskTime(checkpoint.created_at)}`) : ['- нет']),
      '',
      '## Последние teleport packages',
      ...(snapshot.state.teleport_packages.length ? snapshot.state.teleport_packages.slice(0, 8).map((pack) => `- ${pack.package_id}: task=${pack.task_id || 'none'}; mode=${pack.mode_label}; status=${pack.status}`) : ['- нет']),
      '',
      '## Offline events',
      ...(snapshot.offline_events.length ? snapshot.offline_events.slice(0, 8).map((event) => `- ${event.type}: ${event.message} (${this.formatTaskTime(event.created_at)})`) : ['- нет']),
      '',
      '## Safety',
      '- No device commands.',
      '- No ADB.',
      '- No browser/account automation.',
      '- No AI API.',
      '- Heavy files stay on D or remain referenced by metadata only.'
    ].join('\n');
  },

  handoffStatusName(status) {
    return HANDOFF_STATUS_LABELS[status] || status || 'черновик';
  },

  handoffRouteStatusName(status) {
    return HANDOFF_ROUTE_STATUS_LABELS[status] || status || 'проверить';
  },

  normalizeHandoffRecord(record = {}, task = null) {
    const now = new Date().toISOString();
    return {
      schema_version: HANDOFF_ROUTE_PLANNER_SCHEMA_VERSION,
      handoff_id: record.handoff_id || this.generateWorkspaceId('HANDOFF'),
      task_id: record.task_id || task?.task_id || '',
      project_id: record.project_id || task?.project_id || '',
      task_title: record.task_title || task?.title || task?.user_request || '',
      route_id: record.route_id || 'workspace_to_webapp',
      route_title: record.route_title || 'Рабочее -> WebApp',
      from: record.from || 'Рабочее',
      to: record.to || 'Mina UI',
      target_device_id: record.target_device_id || '',
      target_label: record.target_label || record.to || 'Mina UI',
      status: record.status || 'draft',
      risk_level: record.risk_level || 'safe',
      requires_approval: Boolean(record.requires_approval),
      manual_delivery_required: record.manual_delivery_required !== false,
      package_type: record.package_type || 'task_context',
      package_summary: record.package_summary || '',
      package_text: record.package_text || '',
      artifact_id: record.artifact_id || '',
      privacy_status: record.privacy_status || 'not_checked',
      privacy_summary: record.privacy_summary || '',
      prepared_at: record.prepared_at || '',
      copied_at: record.copied_at || '',
      owner_confirmed_at: record.owner_confirmed_at || '',
      cancelled_at: record.cancelled_at || '',
      created_at: record.created_at || now,
      updated_at: record.updated_at || now,
      note: record.note || 'Handoff готовит пакет передачи. Устройствам команды не отправляются.',
      evidence_refs: Array.isArray(record.evidence_refs) ? record.evidence_refs : [],
      artifact_refs: Array.isArray(record.artifact_refs) ? record.artifact_refs : []
    };
  },

  taskHandoffRecords(task) {
    if (!task) return [];
    task.handoff_records = Array.isArray(task.handoff_records)
      ? task.handoff_records.map((record) => this.normalizeHandoffRecord(record, task))
      : [];
    return task.handoff_records;
  },

  allHandoffRecords() {
    return (this.workTasks || [])
      .flatMap((task) => this.taskHandoffRecords(task).map((record) => ({ ...record, task })))
      .sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
  },

  findHandoffRecord(handoffId) {
    const id = String(handoffId || '').trim();
    if (!id) return { task: null, record: null };
    for (const task of this.workTasks || []) {
      const records = this.taskHandoffRecords(task);
      const record = records.find((item) => item.handoff_id === id);
      if (record) return { task, record };
    }
    return { task: null, record: null };
  },

  buildHandoffRoutes(mesh = this.buildDeviceMeshSnapshot(), task = this.getActiveWorkTask()) {
    const presence = mesh.presence || this.buildDevicePresenceSnapshot();
    const head = this.headStatusSnapshot();
    const hasTask = Boolean(task?.task_id);
    const primaryOnline = Boolean(mesh.ownedRegistry?.online_count);
    const phoneReady = Boolean(presence.phone?.owner_confirmed || presence.phone?.pairing_ready || presence.pwa?.ready);
    const pwaReady = Boolean(presence.pwa?.ready);
    const headReady = head.tone === 'pass' || Boolean(this.mainStrategistBrain());
    const routes = [
      {
        route_id: 'workspace_to_phone_pwa',
        title: 'Рабочее -> Телефон / PWA',
        from: 'Рабочее окно',
        to: 'Телефон владельца / PWA',
        target_device_id: 'device_owner_phone',
        target_label: 'Телефон / PWA',
        status: phoneReady ? 'ready' : presence.phone?.pairing_ready ? 'partial' : 'waiting',
        risk_level: 'safe',
        requires_approval: false,
        can_prepare: hasTask && phoneReady,
        note: phoneReady
          ? 'Можно подготовить пакет задачи для ручного продолжения на телефоне или в PWA.'
          : 'Сначала подготовьте ссылку телефона или проверьте PWA. Online heartbeat не подделывается.'
      },
      {
        route_id: 'workspace_to_pc_runtime',
        title: 'Рабочее -> ПК Терминатора',
        from: 'Mina UI',
        to: 'ПК / локальный runtime',
        target_device_id: 'device_terminator_pc',
        target_label: 'ПК Терминатора',
        status: primaryOnline ? 'ready' : 'review',
        risk_level: 'review',
        requires_approval: false,
        can_prepare: hasTask,
        note: primaryOnline
          ? 'Пакет можно вернуть в основной контур ПК. Выполнение команд не запускается.'
          : 'Heartbeat ПК не подтверждён. Пакет можно подготовить, но маршрут требует проверки.'
      },
      {
        route_id: 'workspace_to_brain_council',
        title: 'Рабочее -> Совет мозгов',
        from: 'Рабочее окно',
        to: 'Голова / Совет',
        target_device_id: 'brain_council',
        target_label: 'Совет мозгов',
        status: headReady ? 'ready' : 'partial',
        risk_level: 'safe',
        requires_approval: false,
        can_prepare: hasTask,
        note: headReady
          ? 'Пакет содержит цель, критерии и ссылки на артефакты для ручного web-chat workflow.'
          : 'Стратег или Совет ещё не полностью настроены, но ручной пакет можно подготовить.'
      },
      {
        route_id: 'workspace_to_external_executor',
        title: 'Рабочее -> внешний исполнитель',
        from: 'Рабочее окно',
        to: 'Codex / Antigravity / web-chat вручную',
        target_device_id: 'external_manual_executor',
        target_label: 'Внешний исполнитель',
        status: 'ready',
        risk_level: 'safe',
        requires_approval: false,
        can_prepare: hasTask,
        note: 'Формируется краткий пакет без автоматической отправки, автологина и браузерной автоматики.'
      },
      {
        route_id: 'phone_pwa_to_workspace',
        title: 'Телефон / PWA -> Рабочее',
        from: 'Телефон / PWA',
        to: 'Рабочее окно',
        target_device_id: 'device_webapp_browser',
        target_label: 'Рабочее окно',
        status: pwaReady ? 'partial' : 'waiting',
        risk_level: 'safe',
        requires_approval: false,
        can_prepare: hasTask && pwaReady,
        note: pwaReady
          ? 'Фиксируется маршрут возврата контекста в Рабочее. Реальный heartbeat телефона будет отдельным слоем.'
          : 'PWA/offline shell ещё не готов к честному маршруту возврата.'
      }
    ];
    return routes.map((route) => ({
      ...route,
      can_prepare: Boolean(route.can_prepare && hasTask),
      blocked_reason: hasTask
        ? (route.can_prepare ? '' : route.note)
        : 'Сначала создайте или выберите задачу.'
    }));
  },

  buildHandoffRoutePlannerSnapshot(mesh = this.buildDeviceMeshSnapshot(), task = this.getActiveWorkTask()) {
    const routes = this.buildHandoffRoutes(mesh, task);
    const records = this.allHandoffRecords();
    const taskRecords = task ? this.taskHandoffRecords(task) : [];
    const active = taskRecords[0] || records[0]?.record || null;
    const readyRoutes = routes.filter((route) => route.status === 'ready').length;
    const prepared = records.filter((item) => ['prepared', 'copied', 'owner_confirmed'].includes(item.status)).length;
    const confirmed = records.filter((item) => item.status === 'owner_confirmed').length;
    const readiness = Math.max(28, Math.min(96,
      34
      + (task ? 18 : 0)
      + Math.min(20, readyRoutes * 5)
      + Math.min(14, prepared * 4)
      + Math.min(10, confirmed * 5)
      + (routes.some((route) => route.route_id === 'workspace_to_phone_pwa' && route.status === 'ready') ? 8 : 0)
    ));
    const status = readiness >= 82
      ? 'ready'
      : readiness >= 58
        ? 'partial'
        : task
          ? 'review'
          : 'waiting';
    const next = !task
      ? 'Создать или выбрать задачу для передачи.'
      : !routes.some((route) => route.can_prepare)
        ? 'Подготовить телефон/PWA или проверить ПК runtime.'
        : !taskRecords.length
          ? 'Выбрать маршрут и подготовить пакет передачи.'
          : active?.status === 'prepared'
            ? 'Скопировать пакет и подтвердить ручную передачу.'
            : active?.status === 'copied'
              ? 'Отметить, что пакет передан вручную.'
              : 'Маршрут записан. Можно продолжить работу или подготовить новый пакет.';
    return {
      schema_version: HANDOFF_ROUTE_PLANNER_SCHEMA_VERSION,
      status,
      readiness,
      task,
      routes,
      records,
      task_records: taskRecords,
      active,
      next
    };
  },

  buildTaskHandoffPackageText(task, route) {
    const criteria = Array.isArray(task.readiness_criteria) ? task.readiness_criteria : [];
    const artifacts = Array.isArray(task.artifacts) ? task.artifacts.slice(0, 8) : [];
    const files = Array.isArray(task.files) ? task.files.slice(0, 8) : [];
    const raw = [
      task.title,
      task.goal,
      task.user_request,
      task.next_step,
      ...criteria,
      ...artifacts.map((artifact) => artifact.title || artifact.summary || ''),
      ...files.map((file) => file.name || '')
    ].join('\n');
    const privacy = this.scanPrivacyText(raw);
    const safe = (value) => privacy.findings.length ? this.redactPrivacyText(String(value || '')) : String(value || '');
    const lines = [
      'MINA HANDOFF PACKAGE',
      `schema_version: ${HANDOFF_ROUTE_PLANNER_SCHEMA_VERSION}`,
      `route: ${route.title}`,
      `from: ${route.from}`,
      `to: ${route.to}`,
      `risk: ${route.risk_level}`,
      `manual_delivery_required: true`,
      `approval_required: ${route.requires_approval ? 'true' : 'false'}`,
      '',
      `task_id: ${task.task_id}`,
      `project: ${this.projectName(task.project_id)}`,
      `title: ${safe(task.title)}`,
      `status: ${this.statusName(task.status)}`,
      '',
      'goal:',
      safe(task.goal || task.user_request || 'не задано'),
      '',
      'readiness_criteria:',
      ...(criteria.length ? criteria.map((item) => `- ${safe(item)}`) : ['- не задано']),
      '',
      `next_step: ${safe(task.next_step || 'не задано')}`,
      '',
      'artifact_refs:',
      ...(artifacts.length ? artifacts.map((artifact) => `- ${artifact.artifact_id}: ${safe(artifact.title || artifact.type)}`) : ['- нет']),
      '',
      'file_refs_metadata_only:',
      ...(files.length ? files.map((file) => `- ${file.file_id}: ${safe(file.name || 'file')} (${file.role || 'attachment'})`) : ['- нет']),
      '',
      'handoff_rules:',
      '- Не выполнять команды автоматически.',
      '- Не входить в аккаунты автоматически.',
      '- Не читать cookies/tokens/passwords.',
      '- Не запускать ADB, browser automation, deploy, push или delete.',
      '- Если нужен опасный шаг, открыть Approval Center.',
      '',
      `privacy: ${this.privacyScanSummary(privacy)}`
    ];
    return { text: lines.join('\n'), privacy };
  },

  async prepareHandoffPackage(routeId) {
    const task = this.getActiveWorkTask();
    if (!task) {
      this.toast('Сначала создай или выбери задачу');
      return null;
    }
    const mesh = this.buildDeviceMeshSnapshot();
    const route = this.buildHandoffRoutes(mesh, task).find((item) => item.route_id === routeId);
    if (!route) {
      this.toast('Маршрут не найден');
      return null;
    }
    if (!route.can_prepare) {
      this.toast(route.blocked_reason || 'Маршрут пока не готов');
      return null;
    }
    const now = new Date().toISOString();
    const pack = this.buildTaskHandoffPackageText(task, route);
    const artifact = this.createArtifact(
      task,
      'CONTEXT_PACK',
      `Handoff package: ${route.title}`,
      `Пакет передачи задачи по маршруту ${route.title}. Privacy: ${this.privacyScanSummary(pack.privacy)}.`,
      pack.text,
      'handoff_route_planner'
    );
    artifact.status = pack.privacy.blocked ? 'needs_review' : 'ready_for_copy';
    artifact.privacy_scan = pack.privacy;
    const record = this.normalizeHandoffRecord({
      task_id: task.task_id,
      project_id: task.project_id,
      task_title: task.title,
      route_id: route.route_id,
      route_title: route.title,
      from: route.from,
      to: route.to,
      target_device_id: route.target_device_id,
      target_label: route.target_label,
      status: pack.privacy.blocked ? 'blocked' : 'prepared',
      risk_level: route.risk_level,
      requires_approval: route.requires_approval,
      package_summary: `Пакет готов: ${route.title}`,
      package_text: pack.text,
      artifact_id: artifact.artifact_id,
      privacy_status: pack.privacy.blocked ? 'blocked' : pack.privacy.findings.length ? 'redacted' : 'clean',
      privacy_summary: this.privacyScanSummary(pack.privacy),
      prepared_at: now,
      created_at: now,
      updated_at: now,
      note: route.note,
      artifact_refs: [artifact.artifact_id]
    }, task);
    task.handoff_records = [record, ...this.taskHandoffRecords(task).filter((item) => item.handoff_id !== record.handoff_id)];
    task.device_context = task.device_context && typeof task.device_context === 'object' ? task.device_context : { device_ids: [], required_capabilities: [], device_events: [] };
    task.device_context.device_ids = Array.from(new Set([...(task.device_context.device_ids || []), route.target_device_id].filter(Boolean)));
    task.device_context.device_events = Array.isArray(task.device_context.device_events) ? task.device_context.device_events : [];
    task.device_context.device_events.push({
      event_id: this.generateWorkspaceId('DEVENT'),
      type: 'handoff_package_prepared',
      route_id: route.route_id,
      handoff_id: record.handoff_id,
      target_device_id: route.target_device_id,
      created_at: now,
      risk_level: route.risk_level
    });
    if (!this.devicePairingState) this.loadDevicePairingState();
    this.devicePairingState.handoff = {
      ...this.devicePairingState.handoff,
      status: record.status,
      direction: route.route_id,
      active_task_id: task.task_id,
      active_handoff_id: record.handoff_id,
      active_route_id: route.route_id,
      package_status: record.status,
      last_handoff_at: now,
      note: `Пакет передачи подготовлен: ${route.title}.`
    };
    this.saveDevicePairingState();
    this.addWorkspaceMessage(task, 'handoff_event', 'Ноги', `Пакет передачи подготовлен: ${route.title}.`, {
      linked_artifact_id: artifact.artifact_id
    });
    this.saveWorkTasks();
    this.renderWorkTaskCard();
    this.renderSystemStatus();
    this.toast('Пакет передачи готов');
    return record;
  },

  async copyHandoffPackage(handoffId) {
    const { task, record } = this.findHandoffRecord(handoffId);
    if (!task || !record) {
      this.toast('Пакет передачи не найден');
      return;
    }
    if (!record.package_text) {
      this.toast('Пакет пустой');
      return;
    }
    await this.copyWorkspaceText(record.package_text);
    record.status = record.status === 'owner_confirmed' ? record.status : 'copied';
    record.copied_at = new Date().toISOString();
    record.updated_at = record.copied_at;
    this.addWorkspaceMessage(task, 'handoff_event', 'Ноги', `Пакет передачи скопирован: ${record.route_title}.`);
    this.saveWorkTasks();
    this.renderWorkTaskCard();
    this.renderSystemStatus();
  },

  async confirmHandoffDelivered(handoffId) {
    const { task, record } = this.findHandoffRecord(handoffId);
    if (!task || !record) {
      this.toast('Маршрут передачи не найден');
      return;
    }
    const now = new Date().toISOString();
    record.status = 'owner_confirmed';
    record.owner_confirmed_at = now;
    record.updated_at = now;
    if (!this.devicePairingState) this.loadDevicePairingState();
    this.devicePairingState.handoff = {
      ...this.devicePairingState.handoff,
      status: 'owner_confirmed',
      active_task_id: task.task_id,
      active_handoff_id: record.handoff_id,
      active_route_id: record.route_id,
      package_status: 'owner_confirmed',
      last_handoff_at: now,
      note: `Владелец отметил ручную передачу: ${record.route_title}.`
    };
    this.saveDevicePairingState();
    this.addWorkspaceMessage(task, 'handoff_event', 'Ноги', `Ручная передача подтверждена: ${record.route_title}.`);
    this.saveWorkTasks();
    this.renderWorkTaskCard();
    this.renderSystemStatus();
    this.toast('Передача отмечена');
  },

  async cancelHandoff(handoffId) {
    const { task, record } = this.findHandoffRecord(handoffId);
    if (!task || !record) {
      this.toast('Маршрут передачи не найден');
      return;
    }
    const now = new Date().toISOString();
    record.status = 'cancelled';
    record.cancelled_at = now;
    record.updated_at = now;
    this.addWorkspaceMessage(task, 'handoff_event', 'Ноги', `Передача отменена: ${record.route_title}.`);
    this.saveWorkTasks();
    this.renderWorkTaskCard();
    this.renderSystemStatus();
    this.toast('Передача отменена');
  },

  openHandoffTask(handoffId) {
    const { task } = this.findHandoffRecord(handoffId);
    if (!task) return;
    this.activeWorkTaskId = task.task_id;
    this.workspaceActiveTab = 'handoff';
    this.go('work');
    this.renderWorkTaskCard();
  },

  async handleHandoffAction(action, button) {
    if (action === 'prepare') {
      await this.prepareHandoffPackage(button?.dataset?.routeId || '');
      return;
    }
    if (action === 'copy') {
      await this.copyHandoffPackage(button?.dataset?.handoffId || '');
      return;
    }
    if (action === 'confirm') {
      await this.confirmHandoffDelivered(button?.dataset?.handoffId || '');
      return;
    }
    if (action === 'cancel') {
      await this.cancelHandoff(button?.dataset?.handoffId || '');
      return;
    }
    if (action === 'open_task') {
      this.openHandoffTask(button?.dataset?.handoffId || '');
      return;
    }
    if (action === 'prepare_phone') {
      await this.handleDeviceAction('prepare_phone_pairing', { dataset: { deviceId: 'device_owner_phone' } });
      return;
    }
    if (action === 'open_devices') {
      this.go('system');
      window.setTimeout(() => document.getElementById('system-device-preview')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    }
  },

  async handleContinuityAction(action, button) {
    if (action === 'create_checkpoint') {
      const checkpoint = this.createContinuityCheckpoint(button?.dataset?.reason || 'manual_checkpoint');
      this.renderSystemStatus();
      this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      this.toast(`Checkpoint создан: ${checkpoint.checkpoint_id}`);
      return;
    }

    if (action === 'prepare_teleport') {
      const pack = await this.prepareTaskTeleportPackage(button?.dataset?.mode || 'resume_standard');
      this.renderSystemStatus();
      this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      if (pack) this.toast(pack.status === 'blocked' ? 'Teleport заблокирован Privacy Guard' : 'Task Teleport package готов');
      return;
    }

    if (action === 'copy_teleport') {
      await this.copyTeleportPackage(button?.dataset?.packageId || this.activeTeleportPackageId || '');
      return;
    }

    if (action === 'restore_checkpoint') {
      this.restoreContinuityCheckpoint(button?.dataset?.checkpointId || this.activeContinuityCheckpointId || '');
      return;
    }

    if (action === 'copy_report') {
      await this.copyWorkspaceText(this.buildContinuityReport(this.getActiveWorkTask()));
      return;
    }

    if (action === 'offline_recovery_test') {
      this.recordOfflineContinuityEvent('manual_recovery_test', 'Ручной recovery smoke: checkpoint и Task Teleport остаются локально доступными.');
      const checkpoint = this.createContinuityCheckpoint('manual_offline_recovery_test');
      this.renderSystemStatus();
      this.renderWorkTaskCard();
      this.renderMinaSystemScheme();
      this.toast(`Offline recovery smoke записан: ${checkpoint.checkpoint_id}`);
      return;
    }

    if (action === 'open_work_handoff') {
      const task = this.getActiveWorkTask();
      if (task) {
        this.activeWorkTaskId = task.task_id;
        this.workspaceActiveTab = 'handoff';
        this.go('work');
      } else {
        this.toast('Сначала создайте задачу');
      }
    }
  },

  buildDevicePresenceReport(snapshot = this.buildDevicePresenceSnapshot()) {
    return [
      'Phone / PWA Pairing + Multi-Device Presence V1',
      `Статус: ${this.deviceMeshStatusText(snapshot.status)}`,
      `Готовность: ${snapshot.readiness}%`,
      `WebApp: ${snapshot.webapp.status}`,
      `Основной агент: ${snapshot.primary_agent.agent_id} / ${snapshot.primary_agent.status}`,
      `Телефон: ${snapshot.phone.pairing_status}; presence=${snapshot.phone.presence_status}; подтверждён=${snapshot.phone.owner_confirmed ? 'да' : 'нет'}`,
      `PWA: ${snapshot.pwa.install_label}; service worker=${snapshot.pwa.service_worker}; режим=${snapshot.pwa.display_mode}`,
      `Передача задачи: ${snapshot.handoff.status}; ${snapshot.handoff.note}`,
      '',
      `Следующий шаг: ${snapshot.next}`,
      'Пароли, cookies, tokens, AI API, ADB, сетевое сканирование и команды устройствам не использовались.'
    ].join('\n');
  },

  buildDeviceMeshSnapshot() {
    const devices = this.systemDevices || [];
    const pwa = this.pwaSnapshot();
    const direct = this.directModeStatusSnapshot();
    const taskStore = this.taskStoreStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const ownedRegistry = this.buildOwnedAgentRegistrySnapshot();
    const presence = this.buildDevicePresenceSnapshot();
    const trusted = devices.filter((device) => ['trusted', 'owner_device', 'system_device'].includes(device.trust_level)).length;
    const connected = devices.filter((device) => ['connected', 'ready', 'trusted'].includes(device.status)).length;
    const attention = devices.filter((device) => ['unknown', 'offline', 'degraded', 'blocked', 'not_configured', 'pending_trust'].includes(device.status)).length;
    const riskyCapabilities = devices.reduce((sum, device) => sum + (device.capabilities || []).filter((capability) => capability.requires_approval || ['approval_required', 'dangerous', 'blocked'].includes(capability.risk_level)).length, 0);
    const readiness = Math.max(28, Math.min(94,
      34
      + (devices.length ? 10 : 0)
      + Math.round((trusted / Math.max(devices.length, 1)) * 18)
      + Math.round((connected / Math.max(devices.length, 1)) * 18)
      + (pwa.serviceWorker === 'registered' ? 8 : 0)
      + (taskStore.tone === 'synced' ? 6 : 0)
      + (direct.status === 'сессия активна' ? 5 : 0)
      + (ownedRegistry.online_count ? 6 : 0)
      + (presence.phone.pairing_ready ? 4 : 0)
      + (presence.pwa.ready ? 4 : 0)
    ));
    const status = readiness >= 80 ? 'ready' : readiness >= 55 ? 'partial' : attention ? 'review' : 'not_checked';
    const routes = [
      {
        id: 'pc_webapp',
        title: 'ПК → WebApp',
        from: 'ПК Терминатора',
        to: 'Mina UI',
        status: ownedRegistry.online_count || devices.some((device) => device.device_id === 'device_terminator_pc' && device.status === 'connected') ? 'ready' : 'partial',
        risk: 'safe',
        note: `Рабочий экран и локальный контур видимы владельцу; основной агент: ${ownedRegistry.primary_agent_id}.`
      },
      {
        id: 'webapp_taskstore',
        title: 'WebApp → Общее хранилище задач',
        from: 'Mina UI',
        to: 'общее хранилище задач',
        status: taskStore.tone === 'synced' ? 'ready' : (taskStore.tone === 'session' ? 'partial' : 'review'),
        risk: 'review',
        note: taskStore.note
      },
      {
        id: 'webapp_phone',
        title: 'WebApp → Телефон / PWA',
        from: 'Mina UI',
        to: 'Телефон владельца',
        status: presence.phone.owner_confirmed || presence.pwa.ready ? 'partial' : 'waiting',
        risk: 'safe',
        note: presence.phone.owner_confirmed
          ? 'ручной вход телефона подтверждён; heartbeat телефона появится в следующем слое.'
          : `Pairing: ${presence.phone.pairing_status}; PWA: ${pwa.installLabel}; работа без сети: ${pwa.serviceWorker}.`
      },
      {
        id: 'diagnost_repair',
        title: 'Диагност → Ремонт через Codex',
        from: 'Защитник / Диагност',
        to: 'Рабочая область ремонта',
        status: 'partial',
        risk: 'approval_required',
        note: 'Ремонт не применяется без проверки, плана отката и подтверждения владельца.'
      },
      {
        id: 'future_display',
        title: 'Центр управления → Экран штаба',
        from: 'Центр управления',
        to: 'ТВ / внешний экран',
        status: 'waiting',
        risk: 'review',
        note: 'Будущий маршрут. Сейчас только паспорт и правила, без команд трансляции.'
      }
    ];
    const next = connected < 2
      ? 'Проверить ПК, WebApp и локальный агент.'
      : pwa.serviceWorker !== 'registered'
        ? 'Проверить мобильную версию и работу без сети перед мобильным сценарием.'
        : attention
          ? 'Разобрать устройства со статусом “не проверено” или “не настроено”.'
          : 'Связь устройств готова; передачу задач ведёт Handoff Planner.';
    return { devices, pwa, direct, taskStore, agent, ownedRegistry, presence, trusted, connected, attention, riskyCapabilities, readiness, status, routes, next };
  },

  deviceMeshStatusText(status) {
    return {
      ready: 'готово',
      partial: 'частично готово',
      review: 'нужна проверка',
      waiting: 'ожидает настройки',
      not_checked: 'не проверено'
    }[status] || status || 'не проверено';
  },

  renderOwnedAgentRegistryPanel(registry = this.buildOwnedAgentRegistrySnapshot()) {
    const primary = registry.primary;
    const primaryLastSeen = primary?.last_seen ? this.formatTaskTime(primary.last_seen) : 'не проверялось';
    const publicRegistry = registry.public_registry;
    const publicNote = publicRegistry
      ? `${publicRegistry.agent_count || 0} агентов в мосте; online=${publicRegistry.online_count || 0}; stale=${publicRegistry.stale_count || 0}`
      : 'публичный snapshot моста появится после проверки живого контура';
    return `
      <section class="owned-agent-registry owned-agent-registry--${this.escapeHtml(registry.status)}">
        <div class="owned-agent-registry__head">
          <div>
            <span>Реестр владельца</span>
            <h3>Доверенные устройства и агенты</h3>
            <p>Это слой “кто имеет право быть runtime”. Он хранит agent_id, доверие, последний сигнал и возможности, но не хранит пароли, cookies, токены или API-ключи.</p>
          </div>
          <strong>${this.escapeHtml(String(registry.readiness))}%<small>${this.escapeHtml(this.ownedAgentRegistryStatusText(registry.status))}</small></strong>
        </div>
        <div class="owned-agent-registry__metrics">
          <article>
            <span>Основной агент</span>
            <strong>${this.escapeHtml(registry.primary_agent_id)}</strong>
            <p>${this.escapeHtml(primary?.name || 'ожидает привязки')}</p>
          </article>
          <article>
            <span>Heartbeat</span>
            <strong>${this.escapeHtml(primary?.heartbeat_status || 'не проверено')}</strong>
            <p>${this.escapeHtml(primaryLastSeen)}</p>
          </article>
          <article>
            <span>Storage</span>
            <strong>${this.escapeHtml(primary?.storage_root_status || 'unknown')}</strong>
            <p>${this.escapeHtml(primary?.heartbeat_version || 'версия не получена')}</p>
          </article>
          <article>
            <span>Мост</span>
            <strong>${this.escapeHtml(publicRegistry?.status || 'ожидает')}</strong>
            <p>${this.escapeHtml(publicNote)}</p>
          </article>
        </div>
        <div class="owned-agent-registry__agents">
          ${registry.agents.map((agent) => `
            <article>
              <span>${this.escapeHtml(DEVICE_TYPES[agent.type] || agent.type)} · ${this.escapeHtml(DEVICE_TRUST_LEVELS[agent.trust_level] || agent.trust_level)}</span>
              <strong>${this.escapeHtml(agent.name)}</strong>
              <p>agent_id=${this.escapeHtml(agent.agent_id || 'не задан')} · ${this.escapeHtml(DEVICE_STATUSES[agent.status] || agent.status)} · heartbeat=${this.escapeHtml(agent.heartbeat_status || 'не проверено')}</p>
            </article>
          `).join('') || '<p class="mission-empty">Агенты появятся после настройки локального runtime.</p>'}
        </div>
        <div class="owned-agent-registry__actions">
          <button type="button" data-device-action="refresh_owned_registry">Проверить heartbeat</button>
          <button type="button" data-device-action="copy_owned_registry_report">Скопировать паспорт</button>
        </div>
        <p class="owned-agent-registry__next">${this.escapeHtml(registry.next)}</p>
      </section>
    `;
  },

  renderDevicePresencePanel(snapshot = this.buildDevicePresenceSnapshot()) {
    const statusLabel = this.deviceMeshStatusText(snapshot.status);
    const rows = [
      ['WebApp', snapshot.webapp.status === 'online' ? 'на связи' : 'offline', snapshot.webapp.note],
      ['ПК runtime', snapshot.primary_agent.status === 'online' ? 'агент online' : 'heartbeat не получен', `agent_id=${snapshot.primary_agent.agent_id}`],
      ['Телефон', snapshot.phone.owner_confirmed ? 'ручной вход подтверждён' : (snapshot.phone.pairing_ready ? 'ссылка готова' : 'не подключён'), snapshot.phone.note],
      ['PWA', snapshot.pwa.ready ? 'готово' : snapshot.pwa.install_label, `Service Worker: ${snapshot.pwa.service_worker}; режим: ${snapshot.pwa.display_mode}`]
    ];
    return `
      <section class="device-presence-panel device-presence-panel--${this.escapeHtml(snapshot.status)}">
        <div class="device-presence-head">
          <div>
            <span>Phone / PWA Presence</span>
            <h3>Присутствие устройств</h3>
            <p>Здесь видно, какие устройства реально готовы быть частью контура: WebApp, ПК, телефон владельца и PWA. Телефон не считается online без подтверждённого сигнала.</p>
          </div>
          <strong>${this.escapeHtml(String(snapshot.readiness))}%<small>${this.escapeHtml(statusLabel)}</small></strong>
        </div>
        <div class="device-presence-grid">
          ${rows.map(([name, value, note]) => `
            <article>
              <span>${this.escapeHtml(name)}</span>
              <strong>${this.escapeHtml(value)}</strong>
              <p>${this.escapeHtml(note)}</p>
            </article>
          `).join('')}
        </div>
        <div class="phone-pairing-card">
          <div>
            <span>Подключение телефона</span>
            <strong>${this.escapeHtml(snapshot.phone.pairing_status === 'not_started' ? 'ожидает подготовки' : snapshot.phone.pairing_status === 'manual_confirmed' ? 'ручной вход подтверждён' : 'ссылка готова')}</strong>
            <p>Ссылка открывает Mina UI на телефоне. Это не пароль и не токен; она не даёт системных прав и не запускает команды.</p>
          </div>
          <code>${this.escapeHtml(snapshot.phone.display_code)}</code>
        </div>
        <div class="device-mesh-actions">
          <button type="button" data-device-action="prepare_phone_pairing" data-device-id="device_owner_phone">Подготовить ссылку телефона</button>
          <button type="button" data-device-action="copy_phone_pairing_link" data-device-id="device_owner_phone">Скопировать ссылку</button>
          <button type="button" data-device-action="mark_phone_pairing_manual" data-device-id="device_owner_phone">Я открыл на телефоне</button>
          <button type="button" data-device-action="refresh_device_presence" data-device-id="device_owner_phone">Обновить присутствие</button>
          <button type="button" data-device-action="copy_device_presence_report" data-device-id="device_owner_phone">Скопировать отчёт</button>
        </div>
        <p class="device-presence-next">${this.escapeHtml(snapshot.next)}</p>
      </section>
    `;
  },

  renderDeviceMeshHero(mesh) {
    const metrics = [
      ['Устройств', mesh.devices.length, 'в локальном реестре'],
      ['Доверенные', mesh.trusted, 'системные или подтверждённые'],
      ['На связи', mesh.connected, 'видимы как активные'],
      ['Требуют решения', mesh.attention, 'не проверены или ограничены'],
      ['Подтверждение', mesh.riskyCapabilities, 'возможностей требуют решения владельца']
    ];
    return `
      <section class="device-mesh-hero device-mesh-hero--${this.escapeHtml(mesh.status)}">
        <div>
          <span>Ноги / связь устройств</span>
          <h3>Центр устройств и маршрутов</h3>
          <p>Ноги не выполняют действия. Они показывают, куда можно безопасно передать задачу, контекст и статус: ПК, WebApp, телефон, мобильная версия, локальный агент и будущие устройства.</p>
        </div>
        <strong>${this.escapeHtml(String(mesh.readiness))}%<small>${this.escapeHtml(this.deviceMeshStatusText(mesh.status))}</small></strong>
      </section>
      <div class="device-mesh-metrics">
        ${metrics.map(([name, value, note]) => `
          <article>
            <span>${this.escapeHtml(name)}</span>
            <strong>${this.escapeHtml(String(value))}</strong>
            <p>${this.escapeHtml(note)}</p>
          </article>
        `).join('')}
      </div>
    `;
  },

  renderDeviceRoutePlanner(mesh) {
    return `
      <section class="device-route-panel">
        <div class="device-route-head">
          <div>
            <strong>Маршруты задач</strong>
            <span>Куда можно передать контекст без опасной автоматики</span>
          </div>
          <b>${this.escapeHtml(mesh.next)}</b>
        </div>
        <div class="device-route-grid">
          ${mesh.routes.map((route) => `
            <article class="device-route-card device-route-card--${this.escapeHtml(route.status)}">
              <span>${this.escapeHtml(this.deviceMeshStatusText(route.status))} · ${this.escapeHtml(DEVICE_RISK_LEVELS[route.risk] || route.risk)}</span>
              <strong>${this.escapeHtml(route.title)}</strong>
              <p>${this.escapeHtml(route.from)} → ${this.escapeHtml(route.to)}</p>
              <small>${this.escapeHtml(route.note)}</small>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  },

  renderHandoffPlannerPanel(mesh = this.buildDeviceMeshSnapshot(), options = {}) {
    const task = options.task || this.getActiveWorkTask();
    const planner = this.buildHandoffRoutePlannerSnapshot(mesh, task);
    const active = planner.active;
    return `
      <section class="handoff-route-panel handoff-route-panel--${this.escapeHtml(planner.status)}">
        <div class="handoff-route-head">
          <div>
            <span>Handoff / Route Planner</span>
            <h3>Передача задачи</h3>
            <p>Маршрут выбирает, куда безопасно передать контекст: телефон/PWA, ПК, Совет мозгов или внешний исполнитель. Никаких автокликов, ADB, автологина и команд устройствам.</p>
          </div>
          <strong>${this.escapeHtml(String(planner.readiness))}%<small>${this.escapeHtml(this.deviceMeshStatusText(planner.status))}</small></strong>
        </div>
        <div class="handoff-task-strip">
          <article>
            <span>Активная задача</span>
            <strong>${this.escapeHtml(task?.title || 'не выбрана')}</strong>
            <p>${this.escapeHtml(task ? `${task.task_id} · ${this.projectName(task.project_id)} · ${this.statusName(task.status)}` : 'Создайте или выберите задачу в Рабочем.')}</p>
          </article>
          <article>
            <span>Следующий шаг</span>
            <strong>${this.escapeHtml(planner.next)}</strong>
            <p>Передача считается завершённой только после ручного подтверждения владельца.</p>
          </article>
        </div>
        <div class="handoff-route-grid">
          ${planner.routes.map((route) => `
            <article class="handoff-route-card handoff-route-card--${this.escapeHtml(route.status)}">
              <span>${this.escapeHtml(this.handoffRouteStatusName(route.status))} · ${this.escapeHtml(DEVICE_RISK_LEVELS[route.risk_level] || route.risk_level)}</span>
              <strong>${this.escapeHtml(route.title)}</strong>
              <p>${this.escapeHtml(route.from)} -> ${this.escapeHtml(route.to)}</p>
              <small>${this.escapeHtml(route.note)}</small>
              <div>
                ${route.route_id === 'workspace_to_phone_pwa' && !route.can_prepare ? '<button type="button" data-handoff-action="prepare_phone">Подготовить телефон</button>' : ''}
                <button type="button" data-handoff-action="prepare" data-route-id="${this.escapeHtml(route.route_id)}" ${route.can_prepare ? '' : 'disabled'}>Подготовить пакет</button>
              </div>
            </article>
          `).join('')}
        </div>
        ${active ? this.renderHandoffRecordCard(active, { active: true }) : '<p class="mission-empty">Пакетов передачи по активной задаче ещё нет.</p>'}
        <div class="handoff-log-list">
          ${planner.records.slice(0, 5).map((item) => this.renderHandoffRecordCard(item.record || item, { task: item.task })).join('') || '<p class="mission-empty">История передач появится после подготовки первого пакета.</p>'}
        </div>
      </section>
    `;
  },

  renderHandoffRecordCard(record, options = {}) {
    const task = options.task || (this.workTasks || []).find((item) => item.task_id === record.task_id);
    return `
      <article class="handoff-record-card handoff-record-card--${this.escapeHtml(record.status)} ${options.active ? 'active' : ''}">
        <div>
          <span>${this.escapeHtml(this.handoffStatusName(record.status))} · ${this.escapeHtml(record.privacy_summary || 'privacy не проверялась')}</span>
          <strong>${this.escapeHtml(record.route_title)}</strong>
          <p>${this.escapeHtml(record.task_title || task?.title || record.task_id || 'задача не найдена')}</p>
          <small>${this.escapeHtml(record.note || 'ручная передача контекста')}</small>
        </div>
        <dl>
          <div><dt>task_id</dt><dd>${this.escapeHtml(record.task_id || 'нет')}</dd></div>
          <div><dt>куда</dt><dd>${this.escapeHtml(record.target_label || record.to)}</dd></div>
          <div><dt>artifact</dt><dd>${this.escapeHtml(record.artifact_id || 'нет')}</dd></div>
          <div><dt>когда</dt><dd>${this.escapeHtml(this.formatTaskTime(record.updated_at || record.created_at))}</dd></div>
        </dl>
        <div class="handoff-record-actions">
          <button type="button" data-handoff-action="copy" data-handoff-id="${this.escapeHtml(record.handoff_id)}" ${record.package_text ? '' : 'disabled'}>Скопировать пакет</button>
          <button type="button" data-handoff-action="confirm" data-handoff-id="${this.escapeHtml(record.handoff_id)}" ${record.status === 'owner_confirmed' || record.status === 'cancelled' ? 'disabled' : ''}>Отметить переданным</button>
          <button type="button" data-handoff-action="open_task" data-handoff-id="${this.escapeHtml(record.handoff_id)}">Открыть задачу</button>
          <button type="button" data-handoff-action="cancel" data-handoff-id="${this.escapeHtml(record.handoff_id)}" ${record.status === 'cancelled' || record.status === 'owner_confirmed' ? 'disabled' : ''}>Отменить</button>
        </div>
      </article>
    `;
  },

  renderContinuityPanel(task = this.getActiveWorkTask(), options = {}) {
    const snapshot = this.buildContinuitySnapshot(task);
    const state = snapshot.state;
    const taskPackages = task?.teleport_packages || [];
    const latestCheckpoint = snapshot.last_checkpoint;
    return `
      <section class="continuity-panel continuity-panel--${this.escapeHtml(snapshot.status)}">
        <div class="continuity-head">
          <div>
            <span>Continuity / Offline Recovery</span>
            <h3>Непрерывность работы</h3>
            <p>Сохраняет checkpoint задачи, готовит Task Teleport package и помогает продолжить после перезагрузки, offline или перехода на телефон/PWA.</p>
          </div>
          <strong>${this.escapeHtml(String(snapshot.readiness))}%<small>${this.escapeHtml(snapshot.label)}</small></strong>
        </div>
        <div class="continuity-metrics">
          <article><span>Checkpoint</span><strong>${this.escapeHtml(latestCheckpoint ? this.formatTaskTime(latestCheckpoint.created_at) : 'нет')}</strong><p>${this.escapeHtml(latestCheckpoint?.reason || 'создайте checkpoint перед переносом')}</p></article>
          <article><span>Task Teleport</span><strong>${this.escapeHtml(String(snapshot.task_teleport_count))}</strong><p>${this.escapeHtml(task ? 'пакеты активной задачи' : 'задача не выбрана')}</p></article>
          <article><span>Offline</span><strong>${snapshot.browser_online ? 'online' : 'offline'}</strong><p>Состояние браузера владельца</p></article>
          <article><span>PWA</span><strong>${this.escapeHtml(snapshot.pwa_service_worker)}</strong><p>offline shell / mobile continuity</p></article>
        </div>
        <div class="continuity-actions">
          <button type="button" data-continuity-action="create_checkpoint">Создать checkpoint</button>
          <button type="button" data-continuity-action="prepare_teleport" data-mode="resume_standard" ${task ? '' : 'disabled'}>Task Teleport</button>
          <button type="button" data-continuity-action="prepare_teleport" data-mode="phone_pwa" ${task ? '' : 'disabled'}>Пакет для телефона</button>
          <button type="button" data-continuity-action="offline_recovery_test">Проверить recovery</button>
          <button type="button" data-continuity-action="copy_report">Скопировать отчёт</button>
        </div>
        <div class="teleport-mode-grid">
          ${TELEPORT_PACKAGE_MODES.map(([id, label, note]) => `
            <article>
              <span>${this.escapeHtml(label)}</span>
              <p>${this.escapeHtml(note)}</p>
              <button type="button" data-continuity-action="prepare_teleport" data-mode="${this.escapeHtml(id)}" ${task ? '' : 'disabled'}>Собрать</button>
            </article>
          `).join('')}
        </div>
        <div class="continuity-log-grid">
          <section>
            <strong>Последние Task Teleport packages</strong>
            ${taskPackages.length ? taskPackages.slice(0, 5).map((pack) => this.renderTeleportPackageCard(pack, task)).join('') : '<p class="mission-empty">Для активной задачи пакетов продолжения пока нет.</p>'}
            ${!taskPackages.length && state.teleport_packages.length ? state.teleport_packages.slice(0, 3).map((pack) => this.renderTeleportPackageCard(pack)).join('') : ''}
          </section>
          <section>
            <strong>Checkpoints</strong>
            ${state.checkpoints.length ? state.checkpoints.slice(0, options.compact ? 3 : 6).map((checkpoint) => this.renderContinuityCheckpointCard(checkpoint)).join('') : '<p class="mission-empty">Checkpoint ещё не создан.</p>'}
          </section>
        </div>
        <p class="continuity-safe-note">Task Teleport не запускает действия, не открывает аккаунты и не отправляет команды устройствам. Это переносимый контекст под контролем владельца.</p>
      </section>
    `;
  },

  renderTeleportPackageCard(pack, task = null) {
    const normalized = this.normalizeTeleportPackage(pack, task);
    return `
      <article class="teleport-card teleport-card--${this.escapeHtml(normalized.status)}">
        <div>
          <span>${this.escapeHtml(normalized.mode_label)} · ${this.escapeHtml(normalized.privacy_summary || 'privacy не проверялась')}</span>
          <strong>${this.escapeHtml(normalized.task_title || normalized.task_id || 'задача')}</strong>
          <p>${this.escapeHtml(normalized.package_summary || normalized.note)}</p>
          <small>${this.escapeHtml(this.formatTaskTime(normalized.updated_at || normalized.created_at))}</small>
        </div>
        <div class="teleport-card-actions">
          <button type="button" data-continuity-action="copy_teleport" data-package-id="${this.escapeHtml(normalized.package_id)}" ${normalized.package_text ? '' : 'disabled'}>Скопировать</button>
          ${normalized.checkpoint_id ? `<button type="button" data-continuity-action="restore_checkpoint" data-checkpoint-id="${this.escapeHtml(normalized.checkpoint_id)}">Открыть checkpoint</button>` : ''}
        </div>
      </article>
    `;
  },

  renderContinuityCheckpointCard(checkpoint) {
    const normalized = this.normalizeContinuityCheckpoint(checkpoint);
    return `
      <article class="continuity-checkpoint-card">
        <div>
          <span>${this.escapeHtml(this.formatTaskTime(normalized.created_at))} · ${this.escapeHtml(normalized.reason)}</span>
          <strong>${this.escapeHtml(normalized.task_title || normalized.task_id || 'общий checkpoint')}</strong>
          <p>${this.escapeHtml(normalized.next_step || normalized.note)}</p>
        </div>
        <button type="button" data-continuity-action="restore_checkpoint" data-checkpoint-id="${this.escapeHtml(normalized.checkpoint_id)}">Восстановить контекст</button>
      </article>
    `;
  },

  renderDeviceHandoffPanel(mesh) {
    const steps = [
      ['Создать задачу', 'Рабочее создаёт task_id и привязывает проект.'],
      ['Собрать пакет', 'Context Pack передаётся исполнителю вручную, без скрытой автоматизации.'],
      ['Ожидать отчёт', 'Терминатор честно показывает ожидание, не притворяется, что видит Codex.'],
      ['Продолжить на телефоне', 'Handoff Planner готовит пакет передачи; владелец вручную переносит его на телефон/PWA.'],
      ['Вернуть в проверку', 'Проверка и Защитник оценивают результат перед памятью или действием.']
    ];
    return `
      <section class="device-handoff-panel">
        <div>
          <strong>Передача работы</strong>
          <p>Ноги отвечают за непрерывность: начал на ПК, проверил в WebApp, позже продолжил с телефона. Реальные действия остаются у Рук и проходят Защитник.</p>
        </div>
        <div class="device-handoff-steps">
          ${steps.map(([name, note], index) => `
            <article>
              <span>${index + 1}</span>
              <div>
                <strong>${this.escapeHtml(name)}</strong>
                <p>${this.escapeHtml(note)}</p>
              </div>
            </article>
          `).join('')}
        </div>
        <div class="device-policy-note">
          <strong>Правило безопасности</strong>
          <p>Нет ADB, сетевого сканирования, умного дома, трансляции экрана, подключения устройств или браузерной автоматики без отдельного подтверждения владельца.</p>
        </div>
      </section>
    `;
  },

  buildDeviceMeshReport(mesh = this.buildDeviceMeshSnapshot()) {
    const planner = this.buildHandoffRoutePlannerSnapshot(mesh, this.getActiveWorkTask());
    const continuity = this.buildContinuitySnapshot(this.getActiveWorkTask());
    return [
      'Ноги / Handoff + Route Planner + Continuity V1',
      `Готовность: ${mesh.readiness}% (${this.deviceMeshStatusText(mesh.status)})`,
      `Устройств: ${mesh.devices.length}`,
      `Доверенные: ${mesh.trusted}`,
      `На связи: ${mesh.connected}`,
      `Требуют внимания: ${mesh.attention}`,
      `Возможности через подтверждение владельца: ${mesh.riskyCapabilities}`,
      `Телефон: ${mesh.presence.phone.pairing_status}; подтверждён=${mesh.presence.phone.owner_confirmed ? 'да' : 'нет'}`,
      `PWA: ${mesh.presence.pwa.install_label}; service worker=${mesh.presence.pwa.service_worker}`,
      `Handoff readiness: ${planner.readiness}% (${this.deviceMeshStatusText(planner.status)})`,
      `Пакетов передачи: ${planner.records.length}; по активной задаче: ${planner.task_records.length}`,
      `Continuity readiness: ${continuity.readiness}% (${continuity.label})`,
      `Checkpoints: ${continuity.checkpoint_count}; Task Teleport packages: ${continuity.teleport_count}; Browser online: ${continuity.browser_online ? 'да' : 'нет'}`,
      '',
      'Маршруты:',
      ...mesh.routes.map((route) => `- ${route.title}: ${this.deviceMeshStatusText(route.status)}; риск: ${DEVICE_RISK_LEVELS[route.risk] || route.risk}; ${route.note}`),
      '',
      'Маршруты передачи задачи:',
      ...planner.routes.map((route) => `- ${route.title}: ${this.handoffRouteStatusName(route.status)}; можно подготовить=${route.can_prepare ? 'да' : 'нет'}; ${route.note}`),
      '',
      'Непрерывность:',
      `- Последний checkpoint: ${continuity.last_checkpoint ? `${continuity.last_checkpoint.checkpoint_id} / ${this.formatTaskTime(continuity.last_checkpoint.created_at)}` : 'нет'}`,
      `- Следующий шаг continuity: ${continuity.next}`,
      '',
      `Следующий шаг: ${planner.next || mesh.next}`,
      'Опасные действия устройствам не отправлялись.'
    ].join('\n');
  },

  renderSystemDevicePreview() {
    const host = document.getElementById('system-device-preview');
    if (!host) return;
    const devices = this.systemDevices || [];
    const active = this.getActiveDevice();
    if (!devices.length || !active) {
      host.innerHTML = '<p class="mission-empty">Device Registry пока пуст.</p>';
      return;
    }
    const mesh = this.buildDeviceMeshSnapshot();
    host.innerHTML = `
      <section class="device-mesh-center">
        ${this.renderDeviceMeshHero(mesh)}
        ${this.renderOwnedAgentRegistryPanel(this.buildOwnedAgentRegistrySnapshot())}
        ${this.renderDevicePresencePanel(mesh.presence)}
        <div class="device-mesh-actions">
          <button type="button" data-device-action="refresh_mesh">Обновить состояние</button>
          <button type="button" data-device-action="refresh_owned_registry">Проверить heartbeat</button>
          <button type="button" data-device-action="copy_mesh_report">Скопировать отчёт</button>
          <button type="button" data-device-action="copy_owned_registry_report">Скопировать паспорт агента</button>
          <button type="button" data-device-action="create_pairing_note" data-device-id="${this.escapeHtml(active.device_id)}">Создать заметку подключения</button>
          <button type="button" data-device-action="open_legs_scheme">Открыть в Схеме Мины</button>
        </div>
        <section class="device-hub">
          <div class="device-list" aria-label="Список устройств">
            ${devices.map((device) => this.renderDeviceCard(device)).join('')}
          </div>
          <div class="device-passport" aria-label="Паспорт устройства">
            ${this.renderDevicePassport(active)}
          </div>
        </section>
        ${this.renderDeviceRoutePlanner(mesh)}
        ${this.renderHandoffPlannerPanel(mesh)}
        ${this.renderContinuityPanel(this.getActiveWorkTask(), { compact: true })}
        ${this.renderDeviceHandoffPanel(mesh)}
      </section>
    `;
  },

  renderDeviceCard(device) {
    const isActive = device.device_id === this.activeDeviceId;
    const statusClass = ['connected', 'ready', 'trusted'].includes(device.status)
      ? 'ready'
      : ['unknown', 'degraded', 'offline', 'not_configured', 'pending_trust'].includes(device.status)
        ? 'review'
        : device.status === 'blocked' ? 'blocked' : 'partial';
    return `
      <button type="button" class="device-card device-card--${this.escapeHtml(statusClass)} ${isActive ? 'active' : ''}" data-device-action="select" data-device-id="${this.escapeHtml(device.device_id)}">
        <span>${this.escapeHtml(DEVICE_TYPES[device.type] || device.type)}</span>
        <strong>${this.escapeHtml(device.name)}</strong>
        <small>${this.escapeHtml(DEVICE_STATUSES[device.status] || device.status)} · ${this.escapeHtml(DEVICE_TRUST_LEVELS[device.trust_level] || device.trust_level)}</small>
      </button>
    `;
  },

  renderDevicePassport(device) {
    const capabilities = device.capabilities || [];
    const events = (device.events || []).slice().sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)).slice(0, 6);
    return `
      <div class="device-passport-head">
        <div>
          <span>Паспорт устройства</span>
          <h3>${this.escapeHtml(device.name)}</h3>
          <p>${this.escapeHtml(device.notes || 'не задано')}</p>
        </div>
        <strong>${this.escapeHtml(DEVICE_RISK_LEVELS[device.risk_level] || device.risk_level)}</strong>
      </div>
      <dl class="device-passport-grid">
        <div><dt>ID устройства</dt><dd>${this.escapeHtml(device.device_id)}</dd></div>
        <div><dt>тип</dt><dd>${this.escapeHtml(DEVICE_TYPES[device.type] || device.type)}</dd></div>
        <div><dt>подключение</dt><dd>${this.escapeHtml(device.connection_type)}</dd></div>
        <div><dt>статус</dt><dd>${this.escapeHtml(DEVICE_STATUSES[device.status] || device.status)}</dd></div>
        <div><dt>доверие</dt><dd>${this.escapeHtml(DEVICE_TRUST_LEVELS[device.trust_level] || device.trust_level)}</dd></div>
        <div><dt>последний сигнал</dt><dd>${this.escapeHtml(device.last_seen ? this.formatTaskTime(device.last_seen) : 'не проверялось')}</dd></div>
        <div><dt>роль маршрута</dt><dd>${this.escapeHtml(device.route_role || 'наблюдение и статус')}</dd></div>
        <div><dt>передача работы</dt><dd>${this.escapeHtml(device.handoff_state || 'не запускалось')}</dd></div>
        <div><dt>политика</dt><dd>${this.escapeHtml(device.safe_action_policy || 'только read-only')}</dd></div>
        <div><dt>отпечаток</dt><dd>${this.escapeHtml(device.fingerprint || 'не задано')}</dd></div>
        <div><dt>владелец подтвердил</dt><dd>${device.owner_confirmed ? 'да' : 'нет'}</dd></div>
      </dl>
      <div class="device-actions">
        <button type="button" data-device-action="check" data-device-id="${this.escapeHtml(device.device_id)}">Проверить</button>
        <button type="button" data-device-action="trust" data-device-id="${this.escapeHtml(device.device_id)}">Доверять</button>
        <button type="button" data-device-action="restrict" data-device-id="${this.escapeHtml(device.device_id)}">Ограничить</button>
        <button type="button" data-device-action="create_pairing_note" data-device-id="${this.escapeHtml(device.device_id)}">Заметка подключения</button>
      </div>
      <section class="device-section">
        <h4>Возможности</h4>
        <div class="capability-grid">
          ${capabilities.map((capability) => this.renderDeviceCapability(capability, device)).join('') || '<p class="mission-empty">Возможности не заданы.</p>'}
        </div>
      </section>
      <section class="device-section">
        <h4>События</h4>
        <div class="device-timeline">
          ${events.map((event) => `
            <article>
              <time>${this.escapeHtml(this.formatTaskTime(event.created_at))}</time>
              <strong>${this.escapeHtml(event.type)}</strong>
              <p>${this.escapeHtml(event.text)}</p>
            </article>
          `).join('') || '<p class="mission-empty">События появятся после действий с устройством.</p>'}
        </div>
      </section>
    `;
  },

  renderDeviceCapability(capability, device) {
    return `
      <article class="capability-card">
        <strong>${this.escapeHtml(capability.name)}</strong>
        <p>${this.escapeHtml(capability.description)}</p>
        <span>${this.escapeHtml(DEVICE_RISK_LEVELS[capability.risk_level] || capability.risk_level)}${capability.requires_approval ? ' · нужно подтверждение' : ''}</span>
        ${capability.requires_approval ? `<button type="button" data-device-action="request_capability_approval" data-device-id="${this.escapeHtml(device.device_id)}" data-capability-id="${this.escapeHtml(capability.capability_id)}">Запросить</button>` : ''}
      </article>
    `;
  },

  renderSystemVoiceHooks() {
    const host = document.getElementById('system-voice-hooks');
    if (!host) return;
    const voiceTasks = (this.workTasks || []).filter((task) => task.input_source === 'voice' || task.voice_event_type);
    const activeTask = this.getActiveWorkTask();
    const repliesStatus = this.voiceResponsesEnabled && this.voiceTtsSupported ? 'включены' : (this.voiceTtsSupported ? 'выключены' : 'недоступны');
    const settings = this.voiceSettings || {};
    const lastEvents = (this.voiceEventLog || []).slice(0, 5);
    const readiness = this.buildVoiceReadinessSnapshot();
    const rows = [
      ['Готовность', `${readiness.score}%`, readiness.note],
      ['Режим', settings.push_to_talk_enabled === false ? 'ручной предпросмотр' : 'нажать и говорить', 'фонового прослушивания нет'],
      ['Распознавание речи', this.workspaceVoiceSupported ? 'доступно' : 'ручной ввод', 'браузерное распознавание, без ИИ API'],
      ['Короткий ответ Мины', repliesStatus, 'ответы только короткими фразами, длинные данные остаются текстом'],
      ['Предпросмотр намерения', 'включён', 'команда сначала показывается владельцу'],
      ['Опасные команды', 'заблокированы', 'deploy, push, delete, .env, network и billing не выполняются голосом'],
      ['Текст речи', settings.save_transcripts || 'confirmed_only', 'сохраняется только после подтверждения или привязки к задаче'],
      ['Голосовые события', `${this.voiceEventLog.length} событий`, activeTask ? `активная задача: ${activeTask.task_id}` : `${voiceTasks.length} задач из голоса`]
    ];
    host.innerHTML = `
      <section class="voice-command-center">
        <div>
          <span>MINA VOICE V1</span>
          <h3>Голос безопасных команд</h3>
          <p>Мина слушает только по действию владельца, превращает речь в намерение, показывает предпросмотр, риск и выполняет только разрешённые действия.</p>
        </div>
        <strong>${this.escapeHtml(String(readiness.score))}%<small>${this.escapeHtml(readiness.status)}</small></strong>
      </section>
      <div class="voice-system-grid">
        ${rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('')}
      </div>
      <section class="voice-command-examples">
        <strong>Команды, которые уже понимает Мина</strong>
        <div>
          ${[
            'создай задачу проверить отчёт Codex',
            'добавь уточнение не трогать Local Agent',
            'открой Рабочее',
            'покажи Центр управления',
            'что дальше',
            'сформируй пакет Codex',
            'открой Ноги',
            'стоп'
          ].map((item) => `<button type="button" data-voice-setting="load_example" data-voice-example="${this.escapeHtml(item)}">${this.escapeHtml(item)}</button>`).join('')}
        </div>
      </section>
      <section class="voice-event-strip">
        <strong>Последние голосовые события</strong>
        ${lastEvents.length ? lastEvents.map((event) => `
          <article>
            <span>${this.escapeHtml(this.formatTaskTime(event.created_at))}</span>
            <b>${this.escapeHtml(VOICE_INTENT_LABELS[event.intent] || event.intent || event.type)}</b>
            <p>${this.escapeHtml(event.summary || event.transcript || 'без текста')}</p>
          </article>
        `).join('') : '<p>Событий пока нет. Голос не запускается в фоне.</p>'}
      </section>
      <div class="system-action-strip">
        <button type="button" data-voice-setting="toggle_responses">${this.voiceResponsesEnabled ? 'Отключить ответы' : 'Включить ответы'}</button>
        <button type="button" data-voice-setting="test_reply">Тест ответа</button>
        <button type="button" data-voice-setting="open_workspace_voice">Открыть голос в Рабочем</button>
        <button type="button" data-voice-setting="copy_voice_report">Скопировать отчёт голоса</button>
        <button type="button" data-scheme-action="select_voice">Открыть в Схеме Мины</button>
      </div>
    `;
  },

  loadVoiceSettings() {
    const stored = this.readJsonStorage(VOICE_SETTINGS_STORAGE_KEY, {});
    this.voiceSettings = {
      voice_enabled: stored.voice_enabled !== false,
      push_to_talk_enabled: stored.push_to_talk_enabled !== false,
      speech_language: stored.speech_language || 'ru-RU',
      text_to_speech_enabled: stored.text_to_speech_enabled !== false,
      voice_responses_enabled: stored.voice_responses_enabled !== false,
      auto_preview: stored.auto_preview || 'always',
      dangerous_voice_actions: 'blocked',
      save_transcripts: stored.save_transcripts || 'confirmed_only',
      speech_engine: stored.speech_engine || 'browser_web_speech',
      tts_engine: stored.tts_engine || 'browser_speech_synthesis',
      updated_at: stored.updated_at || ''
    };
    this.voiceTtsSupported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    this.voiceResponsesEnabled = this.voiceSettings.voice_responses_enabled && this.voiceSettings.text_to_speech_enabled;
  },

  saveVoiceSettings() {
    this.voiceSettings = {
      ...(this.voiceSettings || {}),
      voice_responses_enabled: this.voiceResponsesEnabled,
      tts_supported: this.voiceTtsSupported,
      speech_language: this.voiceSettings?.speech_language || 'ru-RU',
      mode: 'push-to-talk',
      updated_at: new Date().toISOString()
    };
    this.writeJsonStorage(VOICE_SETTINGS_STORAGE_KEY, this.voiceSettings);
  },

  loadVoiceEvents() {
    const stored = this.readJsonStorage(VOICE_EVENTS_STORAGE_KEY, []);
    this.voiceEventLog = Array.isArray(stored) ? stored.slice(0, 50) : [];
  },

  saveVoiceEvents() {
    this.writeJsonStorage(VOICE_EVENTS_STORAGE_KEY, (this.voiceEventLog || []).slice(0, 50));
  },

  buildVoiceReadinessSnapshot() {
    const supported = this.workspaceVoiceSupported;
    const tts = this.voiceTtsSupported;
    const settings = this.voiceSettings || {};
    const checks = [
      settings.voice_enabled !== false,
      settings.push_to_talk_enabled !== false,
      true,
      settings.dangerous_voice_actions === 'blocked',
      settings.save_transcripts === 'confirmed_only',
      supported,
      tts || !this.voiceResponsesEnabled
    ];
    const pass = checks.filter(Boolean).length;
    const score = Math.round((pass / checks.length) * 100);
    return {
      score,
      status: score >= 86 ? 'готово' : score >= 60 ? 'частично' : 'ручной режим',
      note: supported ? 'Распознавание доступно; ручной ввод остаётся запасным способом.' : 'Микрофон через браузер недоступен, но ручной предпросмотр текста работает.'
    };
  },

  buildVoiceSafetyReport() {
    const readiness = this.buildVoiceReadinessSnapshot();
    return [
      'Mina Voice V1',
      `Готовность: ${readiness.score}% (${readiness.status})`,
      `Речь: ${this.workspaceVoiceSupported ? 'доступно' : 'ручной ввод'}`,
      `Короткие ответы: ${this.voiceResponsesEnabled && this.voiceTtsSupported ? 'включены' : 'выключены/недоступны'}`,
      'Фоновое прослушивание: нет',
      'Фоновая фраза запуска: не включена',
      'ИИ API: не используются',
      'Опасные команды: заблокированы, только предупреждение/подтверждение',
      'Текст речи: только после подтверждения',
      `Событий: ${(this.voiceEventLog || []).length}`,
      '',
      'Понимаемые действия:',
      '- создать задачу',
      '- добавить уточнение',
      '- открыть Рабочее / Центр управления / Систему',
      '- сформировать пакет Codex',
      '- открыть проверку / память / Ноги',
      '- показать следующий шаг',
      '- остановить голос'
    ].join('\n');
  },

  async handleVoiceSetting(action, button = null) {
    if (action === 'toggle_responses') {
      this.voiceResponsesEnabled = !this.voiceResponsesEnabled;
      this.saveVoiceSettings();
      this.renderSystemVoiceHooks();
      this.renderVoicePanel();
      this.renderMinaSystemScheme();
      this.toast(this.voiceResponsesEnabled ? 'Голосовые ответы включены' : 'Голосовые ответы выключены');
      return;
    }
    if (action === 'test_reply') {
      this.speakMina('Голос Мины готов.');
      this.toast(this.voiceTtsSupported ? 'Тестовый ответ отправлен' : 'Голосовой ответ недоступен в браузере');
    }
    if (action === 'open_workspace_voice') {
      this.go('work');
      this.workspaceVoiceOpen = true;
      this.workspaceVoiceState = this.workspaceVoiceSupported ? 'idle' : 'browser_not_supported';
      this.renderVoicePanel();
      document.getElementById('workspace-voice-transcript')?.focus();
    }
    if (action === 'copy_voice_report') {
      await this.copyWorkspaceText(this.buildVoiceSafetyReport());
      this.toast('Отчёт голоса скопирован');
    }
    if (action === 'load_example') {
      const example = button?.dataset?.voiceExample || '';
      this.go('work');
      this.workspaceVoiceOpen = true;
      this.workspaceVoiceTranscript = example;
      this.workspaceVoicePreview = this.buildVoiceIntentPreview(example);
      this.workspaceVoiceState = 'preview_waiting';
      this.renderVoicePanel();
    }
  },

  speakMina(text) {
    const phrase = String(text || '').trim();
    if (!phrase || !this.voiceResponsesEnabled || !this.voiceTtsSupported) return;
    if (phrase.length > 120) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = this.voiceSettings?.speech_language || 'ru-RU';
      utterance.rate = 0.96;
      utterance.pitch = 0.92;
      window.speechSynthesis.speak(utterance);
    } catch {
      this.voiceTtsSupported = false;
      this.saveVoiceSettings();
    }
  },

  loadPwaState() {
    const stored = this.readJsonStorage(PWA_STATE_STORAGE_KEY, {});
    this.pwaInstallAvailable = Boolean(stored.install_available);
    this.pwaInstalled = Boolean(stored.installed_at);
    this.pwaServiceWorkerStatus = stored.service_worker || this.pwaServiceWorkerStatus || 'not_checked';
    this.pwaServiceWorkerScope = stored.scope || '';
    this.pwaLastCheckedAt = stored.updated_at || stored.installed_at || '';
    this.pwaDisplayMode = this.detectPwaDisplayMode();
    if (this.pwaDisplayMode !== 'browser') this.pwaInstalled = true;
  },

  savePwaState(patch = {}) {
    const current = this.readJsonStorage(PWA_STATE_STORAGE_KEY, {});
    const next = {
      ...current,
      ...patch,
      display_mode: this.pwaDisplayMode,
      updated_at: new Date().toISOString()
    };
    this.writeJsonStorage(PWA_STATE_STORAGE_KEY, next);
    this.pwaLastCheckedAt = next.updated_at;
  },

  detectPwaDisplayMode() {
    if (window.matchMedia?.('(display-mode: standalone)').matches) return 'standalone';
    if (window.navigator?.standalone) return 'standalone';
    if (document.referrer.startsWith('android-app://')) return 'twa';
    return 'browser';
  },

  initPwaRuntime() {
    this.loadPwaState();
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.pwaInstallPrompt = event;
      this.pwaInstallAvailable = true;
      this.savePwaState({ install_available: true });
      this.renderSystemPwaPanel();
      this.renderMinaSystemScheme();
    });
    window.addEventListener('appinstalled', () => {
      this.pwaInstalled = true;
      this.pwaInstallAvailable = false;
      this.pwaInstallPrompt = null;
      this.savePwaState({ installed_at: new Date().toISOString(), install_available: false });
      this.renderSystemPwaPanel();
      this.renderMinaSystemScheme();
      this.toast('Mina установлена как приложение');
    });
    if (!('serviceWorker' in navigator) || !window.isSecureContext) {
      this.pwaServiceWorkerStatus = 'unsupported';
      this.savePwaState({ service_worker: 'unsupported' });
      return;
    }
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        this.pwaServiceWorkerStatus = 'registered';
        this.pwaServiceWorkerScope = registration.scope || '';
        this.savePwaState({ service_worker: 'registered', scope: this.pwaServiceWorkerScope });
        this.renderSystemPwaPanel();
        this.renderMinaSystemScheme();
      })
      .catch(() => {
        this.pwaServiceWorkerStatus = 'failed';
        this.savePwaState({ service_worker: 'failed' });
        this.renderSystemPwaPanel();
        this.renderMinaSystemScheme();
      });
  },

  pwaSnapshot() {
    this.pwaDisplayMode = this.detectPwaDisplayMode();
    const installed = this.pwaInstalled || this.pwaDisplayMode !== 'browser';
    const installStatus = installed
      ? 'installed'
      : this.pwaInstallAvailable || this.pwaInstallPrompt
        ? 'installable'
        : ('serviceWorker' in navigator ? 'browser_only' : 'unsupported');
    return {
      installed,
      installStatus,
      installLabel: PWA_INSTALL_STATUS_LABELS[installStatus] || installStatus,
      displayMode: this.pwaDisplayMode,
      serviceWorker: this.pwaServiceWorkerStatus,
      scope: this.pwaServiceWorkerScope || '',
      lastCheckedAt: this.pwaLastCheckedAt
    };
  },

  async handlePwaAction(action) {
    if (action === 'install') {
      if (!this.pwaInstallPrompt) {
        this.toast('Установка доступна через меню браузера: установить приложение');
        this.savePwaState({ install_attempted_at: new Date().toISOString() });
        this.renderSystemPwaPanel();
        return;
      }
      const prompt = this.pwaInstallPrompt;
      this.pwaInstallPrompt = null;
      prompt.prompt();
      const choice = await prompt.userChoice.catch(() => ({ outcome: 'unknown' }));
      this.pwaInstallAvailable = false;
      if (choice?.outcome === 'accepted') this.pwaInstalled = true;
      this.savePwaState({
        install_choice: choice?.outcome || 'unknown',
        installed_at: choice?.outcome === 'accepted' ? new Date().toISOString() : undefined,
        install_available: false
      });
      await this.syncDevicePresenceState({ silent: true });
      this.renderSystemPwaPanel();
      this.renderMinaSystemScheme();
      this.toast(choice?.outcome === 'accepted' ? 'Установка принята' : 'Установка не выполнена');
      return;
    }
    if (action === 'refresh') {
      this.pwaDisplayMode = this.detectPwaDisplayMode();
      this.savePwaState({ checked_at: new Date().toISOString(), service_worker: this.pwaServiceWorkerStatus });
      await this.syncDevicePresenceState({ silent: true });
      this.renderSystemPwaPanel();
      this.renderMinaSystemScheme();
      this.toast('PWA статус обновлён');
      return;
    }
    if (action === 'open_scheme') {
      this.go('scheme');
      return;
    }
    if (action === 'open_work') {
      this.go('work');
      return;
    }
    if (action === 'copy_link') {
      await this.copyWorkspaceText(this.currentPhonePairingUrl());
      this.toast('Ссылка Mina UI для телефона скопирована');
    }
  },

  renderSystemPwaPanel() {
    const host = document.getElementById('system-pwa-panel');
    if (!host) return;
    const pwa = this.pwaSnapshot();
    const presence = this.buildDevicePresenceSnapshot();
    const rows = [
      ['Установка', pwa.installLabel, pwa.installed ? 'открывается как приложение' : 'можно открыть в браузере и установить через prompt/меню'],
      ['Offline shell', pwa.serviceWorker === 'registered' ? 'готов' : pwa.serviceWorker, pwa.scope || 'service worker проверяется'],
      ['Display mode', pwa.displayMode, pwa.displayMode === 'browser' ? 'обычная вкладка браузера' : 'standalone / app mode'],
      ['Телефон', presence.phone.owner_confirmed ? 'ручной вход отмечен' : (presence.phone.pairing_ready ? 'ссылка готова' : 'не подключён'), presence.next],
      ['Mobile smoke', 'готов к проверке', 'адаптивная вёрстка и sticky console проверяются на 390/430px']
    ];
    host.innerHTML = `
      <div class="voice-system-grid">
        ${rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('')}
      </div>
      <div class="system-action-strip">
        <button type="button" data-pwa-action="install">Установить приложение</button>
        <button type="button" data-pwa-action="refresh">Обновить статус</button>
        <button type="button" data-pwa-action="copy_link">Скопировать ссылку</button>
        <button type="button" data-device-action="prepare_phone_pairing" data-device-id="device_owner_phone">Подключить телефон</button>
        <button type="button" data-pwa-action="open_scheme">Схема Мины</button>
      </div>
    `;
  },

  loadWindowsCompanionState() {
    const stored = this.readJsonStorage(WINDOWS_COMPANION_STATE_STORAGE_KEY, {});
    this.windowsCompanionState = {
      status: stored.status || 'not_checked',
      checked_at: stored.checked_at || '',
      install_mode: stored.install_mode || 'manual_owner_run',
      tray_status: stored.tray_status || 'ready_to_launch',
      self_test_status: stored.self_test_status || 'not_run',
      installer_status: stored.installer_status || 'dry_run_available',
      autostart_silent_status: stored.autostart_silent_status || 'needs_self_test',
      legacy_pm2_status: stored.legacy_pm2_status || 'needs_self_test',
      visible_window_status: stored.visible_window_status || 'needs_self_test',
      report_path: stored.report_path || `${TERMINATOR_STORAGE_ROOT}\\diagnostics\\phase23_windows_companion\\companion-self-test.json`,
      local_agent_dir: stored.local_agent_dir || 'council\\local-agent',
      script_root: stored.script_root || WINDOWS_COMPANION_SCRIPT_ROOT,
      notes: Array.isArray(stored.notes) ? stored.notes : [],
      checks: Array.isArray(stored.checks) ? stored.checks : []
    };
  },

  saveWindowsCompanionState(patch = {}) {
    const next = {
      ...(this.windowsCompanionState || {}),
      ...patch,
      updated_at: new Date().toISOString()
    };
    this.windowsCompanionState = next;
    this.writeJsonStorage(WINDOWS_COMPANION_STATE_STORAGE_KEY, next);
  },

  buildWindowsCompanionSnapshot() {
    const agent = this.localAgentStatusSnapshot();
    const pwa = this.pwaSnapshot();
    const guardian = this.guardianState || GUARDIAN_DEFAULT_STATE;
    const checks = [
      {
        id: 'scripts_present',
        name: 'Скрипты компаньона',
        status: 'pass',
        note: 'Добавлены tray shell, installer dry-run и self-test команды.'
      },
      {
        id: 'local_agent_contract',
        name: 'Local Agent контракт',
        status: agent.status === 'online' || agent.status === 'ready' ? 'pass' : 'manual_check',
        note: agent.note || 'Проверяется через Local Agent status и self-test.'
      },
      {
        id: 'pwa_entry',
        name: 'Быстрый вход WebApp',
        status: pwa.serviceWorker === 'registered' ? 'pass' : 'manual_check',
        note: `PWA: ${pwa.installLabel}; service worker: ${pwa.serviceWorker}.`
      },
      {
        id: 'guardian_restart_gate',
        name: 'Restart через Guardian',
        status: guardian.emergency_stop_active ? 'blocked' : 'pass',
        note: 'Рестарт агента не выполняется автоматически из WebApp.'
      },
      {
        id: 'installer_policy',
        name: 'Installer policy',
        status: 'pass',
        note: 'Dry-run сначала; автозапуск только отдельным флагом в PowerShell.'
      },
      {
        id: 'silent_autostart',
        name: 'Тихая автозагрузка',
        status: 'manual_check',
        note: 'Self-test проверяет hidden wscript //B //NoLogo launcher и отсутствие видимых console windows.'
      },
      {
        id: 'legacy_pm2_disabled',
        name: 'Legacy PM2 выключен',
        status: 'manual_check',
        note: 'Self-test проверяет, что Terminator-PM2-Resurrect выключен или отсутствует.'
      },
      {
        id: 'visible_window_hygiene',
        name: 'Лишние окна',
        status: 'manual_check',
        note: 'Self-test проверяет видимые node/powershell/wscript окна, связанные с Терминатором.'
      },
      {
        id: 'secrets_policy',
        name: 'Секреты',
        status: 'pass',
        note: 'Команды не печатают токены, cookies, session и .env.'
      }
    ];
    const passCount = checks.filter((check) => check.status === 'pass').length;
    const blockedCount = checks.filter((check) => check.status === 'blocked').length;
    const score = Math.round((passCount / checks.length) * 100);
    const status = blockedCount ? 'blocked' : (score >= 80 ? 'ready' : 'review');
    return {
      schema_version: 1,
      phase: 'Phase 23 Windows Companion Silent Autostart',
      status,
      score,
      checked_at: new Date().toISOString(),
      install_mode: 'manual_owner_run',
      tray_status: 'ready_to_launch',
      self_test_status: 'command_ready',
      installer_status: 'dry_run_available',
      autostart_silent_status: 'self_test_required',
      legacy_pm2_status: 'self_test_required',
      visible_window_status: 'self_test_required',
      report_path: `${TERMINATOR_STORAGE_ROOT}\\diagnostics\\phase23_windows_companion\\companion-self-test.json`,
      script_root: WINDOWS_COMPANION_SCRIPT_ROOT,
      local_agent_dir: 'council\\local-agent',
      checks,
      commands: {
        self_test: WINDOWS_COMPANION_SELF_TEST_COMMAND,
        self_test_report: WINDOWS_COMPANION_SELF_TEST_REPORT_COMMAND,
        tray: WINDOWS_COMPANION_TRAY_COMMAND,
        install_dry_run: WINDOWS_COMPANION_INSTALL_DRY_RUN_COMMAND,
        install_start_menu: WINDOWS_COMPANION_INSTALL_START_MENU_COMMAND
      },
      notes: [
        'Windows-компаньон не обходит Approval.',
        'WebApp не запускает PowerShell сам; владелец запускает команду локально.',
        'Autostart disabled by default; включается только явным флагом installer script.',
        'После перезагрузки активный Local Agent должен стартовать скрыто, legacy PM2 должен оставаться выключенным.'
      ]
    };
  },

  renderWindowsCompanionCommandBlock(command, label) {
    return `
      <div class="companion-command-block">
        <span>${this.escapeHtml(label)}</span>
        <code>${this.escapeHtml(command)}</code>
      </div>
    `;
  },

  renderSystemCompanionPanel() {
    const host = document.getElementById('system-companion-panel');
    if (!host) return;
    if (!this.windowsCompanionState) this.loadWindowsCompanionState();
    const agent = this.localAgentStatusSnapshot();
    const companion = this.windowsCompanionState?.checked_at
      ? this.windowsCompanionState
      : this.buildWindowsCompanionSnapshot();
    const rows = [
      ['Статус', this.phase6StatusName(companion.status), `готовность: ${companion.score || 0}%`],
      ['Local Agent', agent.status, agent.note],
      ['Tray shell', companion.tray_status || 'ready_to_launch', 'Открывает Mina UI, Схему, Диагност и команды агента из меню Windows.'],
      ['Installer', companion.installer_status || 'dry_run_available', 'Сначала dry-run; автозапуск только явным флагом.'],
      ['Start Menu', companion.start_menu_status || 'command_ready', 'Рекомендуемый безопасный слой установки: ярлык в меню Пуск, без автозапуска tray.'],
      ['Тихая автозагрузка', companion.autostart_silent_status || 'self_test_required', 'Self-test проверяет hidden launcher без видимого node/powershell окна.'],
      ['Legacy PM2', companion.legacy_pm2_status || 'self_test_required', 'Legacy PM2/n8n autostart должен быть выключен.'],
      ['Окна после входа', companion.visible_window_status || 'self_test_required', 'Не должно оставаться видимых окон node/powershell/wscript, связанных с Терминатором.'],
      ['Отчёт', companion.report_path || `${TERMINATOR_STORAGE_ROOT}\\diagnostics\\phase23_windows_companion\\companion-self-test.json`, 'Self-test может сохранить JSON-отчёт на D.'],
      ['Safe restart', 'только через Guardian', 'WebApp не перезапускает агент молча.']
    ];
    host.innerHTML = `
      <section class="phase7-companion-hero phase7-companion-hero--${this.escapeHtml(companion.status || 'not_checked')}">
        <div>
          <span>Windows-компаньон</span>
          <strong>${this.escapeHtml(String(companion.score || 0))}%</strong>
          <p>Tray shell и installer foundation готовы как локальный управляемый слой вокруг Mina UI и Local Agent.</p>
        </div>
        <div>
          ${this.renderWindowsCompanionCommandBlock(WINDOWS_COMPANION_SELF_TEST_COMMAND, 'Self-test')}
          ${this.renderWindowsCompanionCommandBlock(WINDOWS_COMPANION_SELF_TEST_REPORT_COMMAND, 'Self-test + отчёт на D')}
          ${this.renderWindowsCompanionCommandBlock(WINDOWS_COMPANION_TRAY_COMMAND, 'Запуск tray shell')}
          ${this.renderWindowsCompanionCommandBlock(WINDOWS_COMPANION_INSTALL_START_MENU_COMMAND, 'Установить в меню Пуск')}
        </div>
      </section>
      <div class="voice-system-grid">
        ${rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('')}
      </div>
      <div class="phase6-check-grid">
        ${(companion.checks || []).map((check) => `
          <article class="phase6-check phase6-check--${this.escapeHtml(check.status)}">
            <strong>${this.escapeHtml(check.name)}</strong>
            <span>${this.escapeHtml(this.phase6StatusName(check.status))}</span>
            <p>${this.escapeHtml(check.note)}</p>
          </article>
        `).join('')}
      </div>
      <div class="companion-contract-grid">
        ${WINDOWS_COMPANION_CONTRACT.map(([title, mode, note]) => `
          <article>
            <strong>${this.escapeHtml(title)}</strong>
            <span>${this.escapeHtml(mode)}</span>
            <p>${this.escapeHtml(note)}</p>
          </article>
        `).join('')}
      </div>
      <div class="system-action-strip">
        <button type="button" data-companion-action="run_check">Проверить компаньон</button>
        <button type="button" data-companion-action="copy_self_test">Скопировать self-test</button>
        <button type="button" data-companion-action="copy_self_test_report">Скопировать self-test + отчёт</button>
        <button type="button" data-companion-action="copy_tray">Скопировать запуск tray</button>
        <button type="button" data-companion-action="copy_install_dry_run">Скопировать dry-run install</button>
        <button type="button" data-companion-action="copy_install_start_menu">Скопировать установку в меню Пуск</button>
        <button type="button" data-companion-action="open_scheme">Схема Мины</button>
      </div>
    `;
  },

  async handleCompanionAction(action) {
    if (action === 'run_check') {
      const snapshot = this.buildWindowsCompanionSnapshot();
      this.saveWindowsCompanionState(snapshot);
      this.renderSystemCompanionPanel();
      this.renderMinaSystemScheme();
      this.toast('Windows-компаньон проверен локальной моделью готовности');
      return;
    }
    if (action === 'copy_self_test') {
      await this.copyWorkspaceText(WINDOWS_COMPANION_SELF_TEST_COMMAND);
      this.toast('Self-test команда скопирована');
      return;
    }
    if (action === 'copy_self_test_report') {
      await this.copyWorkspaceText(WINDOWS_COMPANION_SELF_TEST_REPORT_COMMAND);
      this.toast('Self-test с отчётом на D скопирован');
      return;
    }
    if (action === 'copy_tray') {
      await this.copyWorkspaceText(WINDOWS_COMPANION_TRAY_COMMAND);
      this.toast('Команда запуска tray скопирована');
      return;
    }
    if (action === 'copy_install_dry_run') {
      await this.copyWorkspaceText(WINDOWS_COMPANION_INSTALL_DRY_RUN_COMMAND);
      this.toast('Dry-run install команда скопирована');
      return;
    }
    if (action === 'copy_install_start_menu') {
      await this.copyWorkspaceText(WINDOWS_COMPANION_INSTALL_START_MENU_COMMAND);
      this.toast('Команда установки в меню Пуск скопирована');
      return;
    }
    if (action === 'open_scheme') {
      this.go('scheme');
    }
  },

  phase6StatusName(status) {
    const names = {
      ready: 'готово',
      review: 'требует проверки',
      blocked: 'заблокировано',
      not_checked: 'не проверялось',
      pass: 'OK',
      manual_check: 'ручная проверка',
      self_test_required: 'нужен self-test',
      needs_self_test: 'нужен self-test',
      command_ready: 'команда готова',
      ready_to_launch: 'готов к запуску',
      dry_run_available: 'доступен dry-run'
    };
    return names[status] || status || 'не проверялось';
  },

  renderSystemPreQamaxGatePanel() {
    const host = document.getElementById('system-pre-qamax-gate');
    if (!host) return;
    const gate = this.preQamaxGateState?.checked_at
      ? this.preQamaxGateState
      : this.buildPreQamaxGateSnapshot();
    const checks = gate.checks || [];
    const scope = gate.qamax_scope || this.preQamaxScope();
    const evidence = gate.evidence_manifest || this.preQamaxEvidenceManifest();
    const rows = [
      ['Статус', this.phase6StatusName(gate.status), gate.decision || 'Gate не запускался.'],
      ['Готовность', `${gate.score || 0}%`, gate.summary || 'финальный снимок не собран'],
      ['Правило остановки', 'QAMAX не запущен', gate.stop_rule || 'Финальный тест запускается только отдельной командой владельца.'],
      ['Evidence root', TERMINATOR_STORAGE_ROOT, 'Доказательства и screenshots лежат на D, не в localStorage.']
    ];
    host.innerHTML = `
      <section class="pre-qamax-hero pre-qamax-hero--${this.escapeHtml(gate.status || 'not_checked')}">
        <div>
          <span>Ворота финальной сборки</span>
          <strong>${this.escapeHtml(String(gate.score || 0))}%</strong>
          <p>${this.escapeHtml(gate.summary || 'Проверка перед QAMAX ещё не запускалась.')}</p>
        </div>
        <div>
          <span>Решение</span>
          <strong>${this.escapeHtml(this.phase6StatusName(gate.status))}</strong>
          <p>${this.escapeHtml(gate.decision || 'Сначала собрать gate snapshot.')}</p>
        </div>
        <div>
          <span>Граница</span>
          <strong>СТОП перед QAMAX</strong>
          <p>Эта панель подтверждает готовность, но не запускает финальный QA Max автоматически.</p>
        </div>
      </section>
      <div class="voice-system-grid">
        ${rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('')}
      </div>
      <div class="phase6-check-grid pre-qamax-check-grid">
        ${checks.map((check) => `
          <article class="phase6-check phase6-check--${this.escapeHtml(check.status)}">
            <strong>${this.escapeHtml(check.name)}</strong>
            <span>${this.escapeHtml(this.phase6StatusName(check.status))}</span>
            <p>${this.escapeHtml(check.note)}</p>
          </article>
        `).join('')}
      </div>
      <section class="pre-qamax-scope">
        <div>
          <strong>Что проверит финальный QAMAX</strong>
          <ol>
            ${scope.map((item) => `<li>${this.escapeHtml(item)}</li>`).join('')}
          </ol>
        </div>
        <div>
          <strong>Evidence manifest</strong>
          ${evidence.map((item) => `
            <article>
              <span>${this.escapeHtml(item.name)}</span>
              <code>${this.escapeHtml(item.path)}</code>
              <p>${this.escapeHtml(item.note)}</p>
            </article>
          `).join('')}
        </div>
      </section>
      <div class="system-action-strip system-action-strip--wrap">
        <button type="button" data-phase6-action="run_pre_qamax_gate">Проверить Gate</button>
        <button type="button" data-phase6-action="export_pre_qamax_manifest">Скачать manifest</button>
        <button type="button" data-phase6-action="copy_qamax_scope">Скопировать scope QAMAX</button>
        <button type="button" data-phase6-action="stop_before_qamax">Остановиться перед QAMAX</button>
      </div>
    `;
  },

  renderSystemReleaseCenter() {
    const host = document.getElementById('system-release-center');
    if (!host) return;
    const release = this.productionReleaseState?.checked_at
      ? this.productionReleaseState
      : this.buildProductionReadinessSnapshot();
    const checks = release.checks || [];
    const rows = [
      ['Готовность', `${release.score || 0}%`, release.summary || 'проверка ещё не запускалась'],
      ['Последняя проверка', release.checked_at ? this.formatTaskTime(release.checked_at) : 'не запускалась', 'Проверка выполняется локально в браузере, без deploy и без изменения файлов.'],
      ['Статус релиза', this.phase6StatusName(release.status), release.status === 'ready' ? 'Можно готовить release package.' : 'Перед релизом разобрать review/blocked пункты.']
    ];
    host.innerHTML = `
      <section class="phase6-hero phase6-hero--${this.escapeHtml(release.status || 'not_checked')}">
        <div>
          <span>Релиз-готовность</span>
          <strong>${this.escapeHtml(String(release.score || 0))}%</strong>
          <p>${this.escapeHtml(release.summary || 'Проверка не запускалась.')}</p>
        </div>
        <dl>
          ${rows.map(([name, value, note]) => `
            <div>
              <dt>${this.escapeHtml(name)}</dt>
              <dd>${this.escapeHtml(value)}</dd>
              <small>${this.escapeHtml(note)}</small>
            </div>
          `).join('')}
        </dl>
      </section>
      <div class="phase6-check-grid">
        ${checks.map((check) => `
          <article class="phase6-check phase6-check--${this.escapeHtml(check.status)}">
            <strong>${this.escapeHtml(check.name)}</strong>
            <span>${this.escapeHtml(this.phase6StatusName(check.status))}</span>
            <p>${this.escapeHtml(check.note)}</p>
          </article>
        `).join('')}
      </div>
      <div class="system-action-strip">
        <button type="button" data-phase6-action="run_release_check">Проверить релиз</button>
        <button type="button" data-phase6-action="create_checkpoint">Создать checkpoint</button>
        <button type="button" data-phase6-action="export_release_report">Скачать отчёт</button>
        <button type="button" data-phase6-action="copy_pages_guard">Скопировать команду проверки сайта</button>
      </div>
    `;
  },

  renderSystemSchemaSafetyPanel() {
    const host = document.getElementById('system-schema-safety-panel');
    if (!host) return;
    const snapshot = this.schemaSafetyState?.last_checked_at
      ? this.schemaSafetyState
      : this.buildSchemaSafetySnapshot();
    const registry = snapshot.registry?.length ? snapshot.registry : this.buildSchemaRegistrySnapshot();
    const migration = this.schemaSafetyState?.migration_plan || null;
    const backupPackages = this.schemaSafetyState?.backup_packages || [];
    const restorePoints = this.schemaSafetyState?.restore_points || [];
    const summaryRows = [
      ['Последняя проверка', snapshot.last_checked_at ? this.formatTaskTime(snapshot.last_checked_at) : 'не запускалась', 'Проверка локальная: без удаления, deploy, секретов и AI API.'],
      ['Dry-run миграции', migration?.generated_at ? this.formatTaskTime(migration.generated_at) : 'не запускался', migration?.actions?.length ? `${migration.actions.length} мягких действий запланировано` : 'опасных изменений нет'],
      ['Backup / restore', backupPackages[0]?.created_at ? this.formatTaskTime(backupPackages[0].created_at) : 'backup не создан', `${restorePoints.length} restore point в журнале схемы`]
    ];
    host.innerHTML = `
      <section class="phase6-hero phase6-hero--${this.escapeHtml(snapshot.status || 'not_checked')} schema-safety-hero">
        <div>
          <span>Схемы данных</span>
          <strong>${this.escapeHtml(String(snapshot.score || 0))}%</strong>
          <p>${this.escapeHtml(snapshot.summary || 'Состояние схем ещё не проверялось.')}</p>
        </div>
        <dl>
          ${summaryRows.map(([name, value, note]) => `
            <div>
              <dt>${this.escapeHtml(name)}</dt>
              <dd>${this.escapeHtml(value)}</dd>
              <small>${this.escapeHtml(note)}</small>
            </div>
          `).join('')}
        </dl>
      </section>
      <div class="schema-safety-table" role="table" aria-label="Версии схем данных">
        ${registry.map((item) => `
          <article class="schema-safety-row schema-safety-row--${this.escapeHtml(item.status)}" role="row">
            <div>
              <strong>${this.escapeHtml(item.display_name)}</strong>
              <span>${this.escapeHtml(item.source)}</span>
            </div>
            <b>${this.escapeHtml(this.phase6StatusName(item.status))}</b>
            <p>${this.escapeHtml(item.note)}</p>
            <small>${this.escapeHtml(item.critical ? 'критичная группа' : 'служебная группа')}</small>
          </article>
        `).join('')}
      </div>
      <div class="schema-safety-plan">
        <article>
          <strong>План миграции</strong>
          <span>${this.escapeHtml(migration ? this.phase6StatusName(migration.status) : 'не запускался')}</span>
          <p>${this.escapeHtml(migration?.actions?.length
            ? `Будет проставлена версия схемы v${DATA_SCHEMA_VERSION} для ${migration.actions.reduce((sum, action) => sum + action.records_to_stamp, 0)} записей. Удалений нет.`
            : 'Сначала запустите dry-run. Он покажет, что будет обновлено, без применения изменений.')}</p>
        </article>
        <article>
          <strong>Restore policy</strong>
          <span>только безопасный откат</span>
          <p>Перед schema stamp создаётся restore point. Деструктивный restore требует Approval и rollback notes.</p>
        </article>
      </div>
      <div class="system-action-strip system-action-strip--wrap">
        <button type="button" data-phase6-action="run_schema_check">Проверить схемы</button>
        <button type="button" data-phase6-action="run_schema_dry_run">Dry-run миграции</button>
        <button type="button" data-phase6-action="apply_schema_stamp">Проставить версию схемы</button>
        <button type="button" data-phase6-action="create_schema_restore_point">Создать restore point</button>
        <button type="button" data-phase6-action="export_schema_backup">Скачать backup схем</button>
        <button type="button" data-phase6-action="copy_restore_policy">Скопировать restore policy</button>
      </div>
    `;
  },

  renderSystemBackupCenter() {
    const host = document.getElementById('system-backup-center');
    if (!host) return;
    const backup = this.backupRestoreState || { checkpoints: [] };
    const checkpoints = backup.checkpoints || [];
    const schemaPackages = this.schemaSafetyState?.backup_packages || [];
    const rows = [
      ['Последний checkpoint', backup.last_checkpoint_at ? this.formatTaskTime(backup.last_checkpoint_at) : 'не создан', 'Создаётся metadata snapshot без файлов, секретов и cookies.'],
      ['Последний schema backup', schemaPackages[0]?.created_at ? this.formatTaskTime(schemaPackages[0].created_at) : 'не создан', 'Safe package хранит только metadata, ссылки и summary.'],
      ['Где жить полным backup', `${TERMINATOR_STORAGE_ROOT}\\backups`, 'Тяжёлые архивы должны уходить на D через Local Agent/ручной экспорт.'],
      ['Restore policy', 'только с подтверждением', 'Деструктивный restore требует Approval и rollback notes.']
    ];
    host.innerHTML = `
      <div class="voice-system-grid">
        ${rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('')}
      </div>
      <div class="phase6-timeline">
        ${checkpoints.slice(0, 5).map((checkpoint) => `
          <article>
            <strong>${this.escapeHtml(checkpoint.checkpoint_id || checkpoint.restore_point_id || 'CHECKPOINT')}</strong>
            <span>${this.escapeHtml(this.formatTaskTime(checkpoint.created_at))}</span>
            <p>${this.escapeHtml(`${checkpoint.reason}; задач: ${checkpoint.counts?.tasks ?? 0}; release: ${checkpoint.release_status || 'not_checked'}`)}</p>
          </article>
        `).join('') || '<p class="mission-empty">Checkpoint ещё не создан.</p>'}
      </div>
      <div class="system-action-strip">
        <button type="button" data-phase6-action="create_checkpoint">Создать checkpoint</button>
        <button type="button" data-phase6-action="export_safe_state">Скачать safe export</button>
        <button type="button" data-phase6-action="copy_backup_policy">Скопировать policy</button>
      </div>
    `;
  },

  renderSystemObservabilityPanel() {
    const host = document.getElementById('system-observability-panel');
    if (!host) return;
    if (!this.observabilityState?.last_sample_at) this.updateObservabilitySample();
    const state = this.observabilityState || { samples: [] };
    const sample = state.samples?.[0] || {};
    const rows = [
      ['Последний health sample', sample.sampled_at ? this.formatTaskTime(sample.sampled_at) : 'не снимался', 'Метрики собираются без сети и без отправки данных.'],
      ['Задачи', `${sample.task_count ?? 0}`, `${sample.active_tasks ?? 0} активных; ждут отчёт: ${sample.waiting_reports ?? 0}`],
      ['Approval / incidents', `${sample.approvals_pending ?? 0} / ${sample.open_incidents ?? 0}`, 'Открытые решения владельца и предупреждения Guardian.'],
      ['Синхронизация', sample.task_store_status || 'not_checked', sample.last_sync_at ? `последняя: ${this.formatTaskTime(sample.last_sync_at)}` : 'последней синхронизации нет'],
      ['PWA', sample.pwa_service_worker || this.pwaServiceWorkerStatus, 'offline shell и установка контролируются отдельно.']
    ];
    host.innerHTML = `
      <div class="voice-system-grid">
        ${rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('')}
      </div>
      <div class="phase6-timeline">
        ${(state.samples || []).slice(0, 5).map((item) => `
          <article>
            <strong>${this.escapeHtml(this.formatTaskTime(item.sampled_at))}</strong>
            <span>${this.escapeHtml(item.guardian_status || 'Guardian')}</span>
            <p>${this.escapeHtml(`tasks=${item.task_count}; approvals=${item.approvals_pending}; incidents=${item.open_incidents}; sync=${item.task_store_status}`)}</p>
          </article>
        `).join('')}
      </div>
      <div class="system-action-strip">
        <button type="button" data-phase6-action="sample_observability">Обновить метрики</button>
        <button type="button" data-phase6-action="run_release_check">Проверить релиз</button>
        <button type="button" data-phase6-action="open_diagnostics">Открыть Диагност</button>
      </div>
    `;
  },

  async handlePhase6Action(action) {
    if (action === 'run_pre_qamax_gate') {
      const snapshot = this.buildPreQamaxGateSnapshot();
      this.preQamaxGateState = {
        ...snapshot,
        history: [snapshot, ...((this.preQamaxGateState?.history || []).slice(0, 9))]
      };
      this.updateObservabilitySample();
      this.saveProductionState();
      this.renderSystemStatus();
      this.toast(`Pre-QAMAX Gate: ${this.phase6StatusName(snapshot.status)}`);
      return;
    }

    if (action === 'export_pre_qamax_manifest') {
      const snapshot = this.preQamaxGateState?.checked_at ? this.preQamaxGateState : this.buildPreQamaxGateSnapshot();
      const text = JSON.stringify({
        type: 'pre_qamax_release_candidate_gate',
        generated_at: new Date().toISOString(),
        gate: snapshot,
        policy: {
          qamax_not_started: true,
          no_ai_api: true,
          no_paid_services: true,
          no_secrets: true,
          storage_root: TERMINATOR_STORAGE_ROOT
        }
      }, null, 2);
      const ok = this.downloadTextFile(`terminator-pre-qamax-gate-${Date.now()}.json`, text);
      if (!ok) await this.copyWorkspaceText(text);
      this.toast(ok ? 'Pre-QAMAX manifest скачан' : 'Pre-QAMAX manifest скопирован');
      return;
    }

    if (action === 'copy_qamax_scope') {
      await this.copyWorkspaceText([
        'Final QAMAX scope:',
        ...this.preQamaxScope().map((item, index) => `${index + 1}. ${item}`),
        '',
        'Boundary: Pre-QAMAX Gate only. Do not start final QAMAX without explicit owner command.'
      ].join('\n'));
      this.toast('Scope QAMAX скопирован');
      return;
    }

    if (action === 'stop_before_qamax') {
      this.toast('Остановлено перед QAMAX. Финальный QA Max не запускаю без отдельной команды владельца.', 5200);
      return;
    }

    if (action === 'run_release_check') {
      const snapshot = this.buildProductionReadinessSnapshot();
      this.productionReleaseState = {
        ...snapshot,
        history: [snapshot, ...((this.productionReleaseState?.history || []).slice(0, 9))]
      };
      this.updateObservabilitySample();
      this.saveProductionState();
      this.renderSystemStatus();
      this.toast(`Релиз: ${this.phase6StatusName(snapshot.status)}`);
      return;
    }

    if (action === 'create_checkpoint') {
      const checkpoint = this.createBrowserCheckpoint('manual_phase6_checkpoint');
      this.renderSystemStatus();
      this.toast(`Checkpoint создан: ${checkpoint.checkpoint_id}`);
      return;
    }

    if (action === 'sample_observability') {
      this.updateObservabilitySample();
      this.renderSystemStatus();
      this.toast('Метрики обновлены');
      return;
    }

    if (action === 'open_diagnostics') {
      await this.runSystemDiagnostics();
      this.renderSystemStatus();
      return;
    }

    if (action === 'export_release_report') {
      const snapshot = this.productionReleaseState?.checked_at ? this.productionReleaseState : this.buildProductionReadinessSnapshot();
      const text = JSON.stringify({
        type: 'release_report',
        generated_at: new Date().toISOString(),
        release: snapshot,
        policy: { no_ai_api: true, no_secrets: true, no_deploy_from_browser: true }
      }, null, 2);
      const ok = this.downloadTextFile(`terminator-release-report-${Date.now()}.json`, text);
      if (!ok) this.copyWorkspaceText(text);
      this.toast(ok ? 'Отчёт скачан' : 'Отчёт скопирован');
      return;
    }

    if (action === 'export_safe_state') {
      const exportData = this.buildSafeStateExport();
      this.backupRestoreState = {
        ...(this.backupRestoreState || {}),
        last_export_at: new Date().toISOString()
      };
      this.saveProductionState();
      const text = JSON.stringify(exportData, null, 2);
      const ok = this.downloadTextFile(`terminator-safe-state-${Date.now()}.json`, text);
      if (!ok) this.copyWorkspaceText(text);
      this.renderSystemStatus();
      this.toast(ok ? 'Safe export скачан' : 'Safe export скопирован');
      return;
    }

    if (action === 'run_schema_check') {
      const snapshot = this.buildSchemaSafetySnapshot();
      this.schemaSafetyState = {
        ...(this.schemaSafetyState || {}),
        ...snapshot,
        status: snapshot.status,
        registry: snapshot.registry,
        last_checked_at: snapshot.last_checked_at
      };
      this.saveProductionState();
      this.renderSystemStatus();
      this.toast(`Схемы данных: ${this.phase6StatusName(snapshot.status)}`);
      return;
    }

    if (action === 'run_schema_dry_run') {
      const plan = this.buildSchemaMigrationPlan();
      const snapshot = this.buildSchemaSafetySnapshot();
      this.schemaSafetyState = {
        ...(this.schemaSafetyState || {}),
        ...snapshot,
        migration_plan: plan,
        registry: snapshot.registry,
        last_migration_dry_run_at: plan.generated_at,
        last_checked_at: snapshot.last_checked_at
      };
      this.saveProductionState();
      this.renderSystemStatus();
      this.toast(plan.actions.length ? `Dry-run: ${plan.actions.length} действий` : 'Dry-run: миграция не нужна');
      return;
    }

    if (action === 'apply_schema_stamp') {
      const snapshot = await this.applySafeSchemaStamp();
      this.renderSystemStatus();
      this.toast(`Schema stamp завершён: ${this.phase6StatusName(snapshot.status)}`);
      return;
    }

    if (action === 'create_schema_restore_point') {
      const restorePoint = this.createSchemaRestorePoint('manual_schema_restore_point');
      this.renderSystemStatus();
      this.toast(`Restore point создан: ${restorePoint.restore_point_id}`);
      return;
    }

    if (action === 'export_schema_backup') {
      const backup = this.buildSchemaSafeBackupPackage();
      const text = JSON.stringify(backup, null, 2);
      const ok = this.downloadTextFile(`terminator-schema-backup-${Date.now()}.json`, text);
      if (!ok) await this.copyWorkspaceText(text);
      this.renderSystemStatus();
      this.toast(ok ? 'Schema backup скачан' : 'Schema backup скопирован');
      return;
    }

    if (action === 'copy_restore_policy') {
      await this.copyWorkspaceText([
        'Restore policy:',
        '- schema backup содержит metadata, ссылки, summary и версии схем',
        '- raw files / cookies / tokens / passwords не экспортируются',
        '- schema stamp создаёт restore point перед применением',
        '- destructive restore только через Approval + rollback notes',
        `- full restore files live on D: ${TERMINATOR_STORAGE_ROOT}\\backups`
      ].join('\n'));
      this.toast('Restore policy скопирован');
      return;
    }

    if (action === 'refresh_system_registry') {
      const snapshot = this.buildSystemRegistrySnapshot();
      this.saveSystemRegistrySnapshot(snapshot);
      this.renderSystemStatus();
      this.toast(`Реестр системы: ${this.systemRegistryStatusName(snapshot.status)}`);
      return;
    }

    if (action === 'export_system_registry') {
      const snapshot = this.systemRegistryState?.last_checked_at ? this.systemRegistryState : this.saveSystemRegistrySnapshot(this.buildSystemRegistrySnapshot());
      const exportData = this.buildSystemRegistryExport(snapshot);
      const text = JSON.stringify(exportData, null, 2);
      const ok = this.downloadTextFile(`terminator-system-registry-${Date.now()}.json`, text);
      if (!ok) await this.copyWorkspaceText(text);
      this.renderSystemStatus();
      this.toast(ok ? 'Реестр скачан' : 'Реестр скопирован');
      return;
    }

    if (action === 'copy_system_registry_policy') {
      await this.copyWorkspaceText([
        'System Registry policy:',
        '- active / legacy / future services must be separated',
        '- legacy Telegram/n8n/Amvera/PM2 are not main path',
        '- paid services and AI API stay blocked by default',
        '- secrets are never exported',
        '- high/critical capability requires Approval',
        '- Direct Bridge / Local Agent changes require explicit scope'
      ].join('\n'));
      this.toast('Policy реестра скопирован');
      return;
    }

    if (action === 'save_policy_center') {
      const next = this.collectPolicyCenterFormValues();
      const snapshot = this.buildPolicyCenterSnapshot(next);
      this.savePolicyCenterSnapshot(snapshot);
      this.renderSystemStatus();
      this.toast(`Правила сохранены: ${this.policyCenterStatusName(snapshot.status)}`);
      return;
    }

    if (action === 'refresh_policy_center') {
      const snapshot = this.buildPolicyCenterSnapshot(this.collectPolicyCenterFormValues());
      this.savePolicyCenterSnapshot(snapshot);
      this.renderSystemStatus();
      this.toast(`Правила: ${this.policyCenterStatusName(snapshot.status)}`);
      return;
    }

    if (action === 'export_policy_center') {
      const snapshot = this.policyCenterState?.last_checked_at ? this.policyCenterState : this.savePolicyCenterSnapshot(this.buildPolicyCenterSnapshot());
      const text = JSON.stringify(this.buildPolicyCenterExport(snapshot), null, 2);
      const ok = this.downloadTextFile(`terminator-policy-center-${Date.now()}.json`, text);
      if (!ok) await this.copyWorkspaceText(text);
      this.renderSystemStatus();
      this.toast(ok ? 'Policy скачан' : 'Policy скопирован');
      return;
    }

    if (action === 'copy_policy_center') {
      await this.copyWorkspaceText(this.buildPolicyCenterPolicyText(this.policyCenterState));
      this.toast('Policy Center скопирован');
      return;
    }

    if (action === 'copy_pages_guard') {
      this.copyWorkspaceText('powershell -ExecutionPolicy Bypass -File .\\scripts\\check-pages-health.ps1');
      return;
    }

    if (action === 'copy_backup_policy') {
      this.copyWorkspaceText([
        'Backup policy:',
        `- metadata checkpoints: browser state / Task Runtime summary`,
        `- full archives: ${TERMINATOR_STORAGE_ROOT}\\backups`,
        '- secrets/cookies/tokens: never export',
        '- destructive restore: only after Approval and rollback notes'
      ].join('\n'));
    }
  },

  loadMinaSchemeState() {
    const stored = this.readJsonStorage(MINA_SCHEME_STATE_KEY, {});
    const validZones = new Set(MINA_SCHEME_SUBSYSTEMS.map((item) => item.id));
    const validModes = new Set(['first_run', 'normal', 'expert']);
    this.activeMinaSchemeZone = validZones.has(stored.selected_zone) ? stored.selected_zone : 'body';
    this.minaSchemeMode = validModes.has(stored.mode) ? stored.mode : 'normal';
    this.minaSchemeExpertOpen = Boolean(stored.expert_open);
    this.minaSchemeDismissedHints = Array.isArray(stored.dismissed_hints) ? stored.dismissed_hints : [];
  },

  saveMinaSchemeState() {
    this.writeJsonStorage(MINA_SCHEME_STATE_KEY, {
      selected_zone: this.activeMinaSchemeZone,
      mode: this.minaSchemeMode,
      expert_open: this.minaSchemeExpertOpen,
      dismissed_hints: this.minaSchemeDismissedHints,
      updated_at: new Date().toISOString()
    });
  },

  selectMinaSchemeZone(zoneId) {
    if (!MINA_SCHEME_SUBSYSTEMS.some((item) => item.id === zoneId)) return;
    this.activeMinaSchemeZone = zoneId;
    this.saveMinaSchemeState();
    this.renderMinaSystemScheme();
  },

  minaSchemeStatusClass(status) {
    if (status === 'ready') return 'ready';
    if (status === 'error') return 'error';
    if (status === 'waiting') return 'waiting';
    return 'partial';
  },

  minaSchemeStatusText(status) {
    return MINA_SCHEME_STATUS_LABELS[status] || status || 'частично';
  },

  minaSchemeHealth() {
    const tasks = this.workTasks || [];
    const head = this.headStatusSnapshot();
    const guardian = this.guardianSnapshot();
    const direct = this.directModeStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const taskStore = this.taskStoreStatusSnapshot();
    const pwa = this.pwaSnapshot();
    const memorySearch = this.memorySearchSnapshot();
    const eyesSnapshot = this.eyesVisualSnapshot();
    const handsSnapshot = this.handsSnapshot();
    const savedMemory = tasks.filter((task) => ['saved_local', 'memory_saved'].includes(task.memory_preview?.status || task.memory_status)).length;
    const memoryCandidates = tasks.filter((task) => task.memory_preview || task.memory_status || task.memory_candidate).length;
    const researchTasks = tasks.filter((task) => this.ensureResearchOpsState(task).status !== 'not_started').length;
    const devicePhone = (this.systemDevices || []).find((device) => device.device_id === 'device_owner_phone');
    const ownedRegistry = this.buildOwnedAgentRegistrySnapshot();
    const repairIncidents = guardian.openIncidents.filter((incident) => incident.repair_workspace || incident.diagnostic_pack || incident.repair?.status !== 'not_started');
    const criticalIncident = guardian.openIncidents.find((incident) => incident.severity === 'critical');
    const costUnknown = COST_GUARD_SERVICES.some(([, , status]) => status === 'unknown');
    const directReady = direct.status === 'сессия активна';
    const directNeedsOwner = direct.status === 'ожидает вход';
    const localAgentReady = ownedRegistry.online_count > 0 || (/на связи|доверено|системное|готов/i.test(agent.status) && !/не проверено|не найден/i.test(agent.status));
    const localAgentKnown = !/не найден/i.test(agent.status);
    const bodyScore = this.taskRuntimeReady
      ? 54 + (taskStore.tone === 'synced' ? 14 : 0) + (directReady ? 12 : directNeedsOwner ? 6 : 0) + (localAgentReady ? 10 : localAgentKnown ? 4 : 0)
      : 36;
    const bodyStatus = this.taskRuntimeReady && directReady && localAgentReady
      ? 'ready'
      : this.taskRuntimeReady && (directReady || directNeedsOwner || localAgentKnown)
        ? 'partial'
        : 'error';
    const guardianStatus = criticalIncident || guardian.state.emergency_stop_active
      ? 'error'
      : guardian.state.safe_mode
        ? 'partial'
        : costUnknown
          ? 'partial'
          : 'ready';
    const headStatus = head.tone === 'pass' ? 'ready' : (this.mainStrategistBrain() ? 'partial' : 'waiting');
    const memoryStatus = memorySearch.status === 'ready' && (savedMemory || memorySearch.count)
      ? 'ready'
      : savedMemory || memoryCandidates || memorySearch.count
        ? 'partial'
        : (this.taskRuntimeReady ? 'partial' : 'waiting');
    const handsStatus = handsSnapshot.scheme_status;
    const eyesStatus = eyesSnapshot.scheme_status;
    const voiceSnapshot = this.buildVoiceReadinessSnapshot();
    const voiceStatus = voiceSnapshot.score >= 86 ? 'ready' : voiceSnapshot.score >= 60 ? 'partial' : 'waiting';
    const deviceMesh = this.buildDeviceMeshSnapshot();
    const devicePresence = deviceMesh.presence || this.buildDevicePresenceSnapshot();
    const handoffPlanner = this.buildHandoffRoutePlannerSnapshot(deviceMesh, this.getActiveWorkTask());
    const continuity = this.buildContinuitySnapshot(this.getActiveWorkTask());
    const legsStatus = deviceMesh.readiness >= 80 || devicePhone?.status === 'connected' || pwa.installed || devicePresence.phone.owner_confirmed
      ? 'ready'
      : (deviceMesh.readiness >= 50 || continuity.readiness >= 60 || (this.systemDevices || []).length || pwa.serviceWorker === 'registered' ? 'partial' : 'waiting');

    const subsystems = {
      head: {
        status: headStatus,
        readiness: headStatus === 'ready' ? 92 : (headStatus === 'partial' ? 62 : 25),
        summary: head.status,
        note: head.note,
        snapshot_source: 'Head / BrainOps',
        is_mock: false,
        checks: [
          ['Главный Стратег', this.mainStrategistBrain() ? 'готово' : 'нужно выбрать'],
          ['Совет мозгов', this.activeHeadBrains().length ? `${this.activeHeadBrains().length} активных` : 'пусто'],
          ['Исследователи', this.activeHeadSearchAgents().length ? `${this.activeHeadSearchAgents().length} активных` : 'не добавлены'],
          ['Тесты подключения', (this.headBrains || []).some((brain) => brain.status === 'ready') ? 'есть готовый мозг' : 'ждут ручного теста']
        ]
      },
      eyes: {
        status: eyesStatus,
        readiness: eyesSnapshot.readiness,
        summary: eyesSnapshot.summary,
        note: 'Глаза фиксируют visual evidence: скриншоты, визуальные проверки и состояние интерфейса.',
        snapshot_source: eyesSnapshot.snapshot_source,
        is_mock: false,
        checks: eyesSnapshot.checks
      },
      voice: {
        status: voiceStatus,
        readiness: voiceSnapshot.score,
        summary: voiceSnapshot.note,
        note: 'Фонового прослушивания нет. Опасные голосовые команды блокируются Approval.',
        snapshot_source: 'Mina Voice V1 / Workspace voice hooks',
        is_mock: false,
        checks: [
          ['Режим', 'Нажать и говорить'],
          ['Язык', 'Русский'],
          ['Распознавание речи', this.workspaceVoiceSupported ? 'доступно в браузере' : 'ручной ввод'],
          ['Ответы Мины', this.voiceResponsesEnabled && this.voiceTtsSupported ? 'короткие ответы включены' : 'текстовый режим'],
          ['События', `${(this.voiceEventLog || []).length} в журнале`],
          ['Опасные команды', 'заблокированы']
        ]
      },
      hands: {
        status: handsStatus,
        readiness: Math.max(handsSnapshot.readiness, repairIncidents.length ? 72 : 0),
        summary: repairIncidents.length ? `${repairIncidents.length} ремонтных инцидентов · ${handsSnapshot.label}` : handsSnapshot.summary,
        note: handsSnapshot.note,
        snapshot_source: handsSnapshot.snapshot_source,
        is_mock: false,
        checks: [
          ...handsSnapshot.checks,
          ['Repair workspace', `${TERMINATOR_STORAGE_ROOT}\\repair_workspaces`],
          ['Repair incidents', repairIncidents.length ? `${repairIncidents.length} активных` : 'нет активных'],
          ['Auto-fix LOW', guardian.state.autonomy_level >= 3 ? 'разрешён политикой' : 'ручной контроль']
        ]
      },
      memory: {
        status: memoryStatus,
        readiness: memoryStatus === 'ready' ? 88 : (memorySearch.count ? 72 : (savedMemory ? 70 : (memoryCandidates ? 64 : this.taskRuntimeReady ? 56 : 36))),
        summary: memorySearch.count ? `${memorySearch.count} записей индекса` : (savedMemory ? `${savedMemory} записей памяти` : (memoryCandidates ? `${memoryCandidates} кандидатов памяти` : 'поиск по памяти требует индекса')),
        note: memorySearch.count ? `Контекстный индекс активен: ${memorySearch.note}.` : 'Предпросмотр памяти работает; индекс нужно собрать из задач, решений, evidence и артефактов.',
        snapshot_source: 'Memory Search Engine / Task Runtime memory previews',
        is_mock: false,
        checks: [
          ['Хранилище', `${TERMINATOR_STORAGE_ROOT}\\memory`],
          ['Memory Preview', memoryCandidates ? `${memoryCandidates} кандидатов` : 'нет кандидатов'],
          ['Записи памяти', savedMemory ? `${savedMemory} сохранено` : 'не сохранено'],
          ['Индекс поиска', memorySearch.count ? `${memorySearch.count} записей` : 'ожидает сборки'],
          ['Research/Brain refs', `${memorySearch.stats?.research || 0} research · ${memorySearch.stats?.brain_answers || 0} brain answers`],
          ['Файлы', 'только refs, не raw huge data']
        ]
      },
      body: {
        status: bodyStatus,
        readiness: Math.min(92, bodyScore),
        summary: this.taskRuntimeReady ? 'контур задач активен' : 'контур задач требует внимания',
        note: `Мост: ${direct.status}; локальный агент: ${agent.status}; agent_id=${ownedRegistry.primary_agent_id}; хранилище задач: ${taskStore.status}.`,
        snapshot_source: 'Task Runtime / Bridge / Local Agent / TaskStore',
        is_mock: false,
        checks: [
          ['Контур задач', this.taskRuntimeReady ? 'локальная база активна' : 'резервный режим'],
          ['Мост', direct.status],
          ['Локальный агент', `${agent.status}; ${ownedRegistry.primary_agent_id}`],
          ['Подтверждения', 'включены']
        ]
      },
      legs: {
        status: legsStatus,
        readiness: Math.max(deviceMesh.readiness, Math.min(96, continuity.readiness + 4)),
        summary: `${deviceMesh.devices.length} устройств · ${deviceMesh.trusted} доверенных · checkpoints ${continuity.checkpoint_count} · teleport ${continuity.teleport_count}`,
        note: `Ноги маршрутизируют задачи и контекст. ${continuity.next}`,
        snapshot_source: 'Реестр владельца / Handoff Planner / Continuity / Task Teleport / PWA',
        is_mock: false,
        checks: [
          ['Основной агент', ownedRegistry.primary_agent_id],
          ['Heartbeat', ownedRegistry.online_count ? 'online' : 'не получен'],
          ['Телефон', devicePresence.phone.owner_confirmed ? 'ручной вход отмечен' : (devicePhone ? (DEVICE_STATUSES[devicePhone.status] || devicePhone.status) : 'не добавлен')],
          ['PWA', `${devicePresence.pwa.install_label}; работа без сети: ${devicePresence.pwa.service_worker}`],
          ['Маршруты', `${deviceMesh.routes.length} описано`],
          ['Handoff', `${handoffPlanner.task_records.length} по активной задаче · ${handoffPlanner.readiness}%`],
          ['Continuity', `${continuity.checkpoint_count} checkpoint · ${continuity.readiness}%`],
          ['Task Teleport', `${continuity.teleport_count} пакетов · active task ${continuity.task_teleport_count}`],
          ['Offline recovery', continuity.browser_online ? 'браузер online' : 'offline snapshot активен'],
          ['Передача задачи', devicePresence.handoff.status === 'route_ready' || handoffPlanner.active ? 'маршрут подготовлен' : 'локальный слой статуса'],
          ['Подтверждение', `${deviceMesh.riskyCapabilities} возможностей требуют решения владельца`]
        ]
      },
      diagnost: {
        status: guardianStatus,
        readiness: guardianStatus === 'ready' ? 90 : (guardianStatus === 'partial' ? 68 : 30),
        summary: guardian.label,
        note: guardian.state.emergency_stop_active
          ? 'Стоп действия включён. Новые рискованные действия заблокированы.'
          : guardian.state.safe_mode
            ? 'Безопасный режим включён. Автоматические действия ограничены.'
            : 'Защитник контролирует риски, стоимость и опасные действия. Платные сервисы не разрешены.',
        snapshot_source: 'Guardian / Diagnost / Cost Guard',
        is_mock: false,
        checks: [
          ['Guardian', guardian.label],
          ['Безопасный режим', guardian.state.safe_mode ? 'включён' : 'выключен'],
          ['Инциденты', `${guardian.openIncidents.length} открытых`],
          ['Платные сервисы', guardian.state.paid_services_allowed ? 'требуют проверки' : 'заблокированы'],
          ['Billing status', costUnknown ? 'не проверен' : 'проверен']
        ]
      }
    };

    if (researchTasks) {
      subsystems.head.note += ` ResearchOps активен в ${researchTasks} задачах.`;
    }

    const minimumReady = ['body', 'diagnost'].every((id) => ['ready', 'partial'].includes(subsystems[id].status) && subsystems[id].readiness >= 65);
    const comfortReady = minimumReady && ['head', 'memory', 'hands'].every((id) => subsystems[id].readiness >= 60);
    const fullReady = comfortReady && ['eyes', 'voice', 'legs'].every((id) => subsystems[id].status === 'ready');
    const readinessPercent = fullReady
      ? 100
      : comfortReady
        ? Math.min(88, 70 + Math.round((subsystems.eyes.readiness + subsystems.voice.readiness + subsystems.legs.readiness) / 15))
        : minimumReady
          ? Math.min(69, 35 + Math.round((subsystems.head.readiness + subsystems.memory.readiness + subsystems.hands.readiness) / 12))
          : Math.max(12, Math.round((subsystems.body.readiness + subsystems.diagnost.readiness) / 4));
    const next = this.minaSchemeNextAction(subsystems, fullReady);
    const sourceTruth = this.currentSourceOfTruthSnapshot({ refresh: false, persist: false });
    return { subsystems, minimumReady, comfortReady, fullReady, readinessPercent, next, sourceTruth };
  },

  minaSchemeNextAction(subsystems, fullReady = false) {
    if (subsystems.body.readiness < 65) return { zone: 'body', label: 'Проверить Тело', action: 'select_body', note: 'Проверить контур задач, мост, локальный агент и хранилище задач.' };
    if (subsystems.diagnost.readiness < 65) return { zone: 'diagnost', label: 'Запустить Диагност', action: 'run_diagnostics', note: 'Проверить защитник, инциденты и платные риски.' };
    if (subsystems.head.readiness < 65) return { zone: 'head', label: 'Настроить Голову', action: 'select_head', note: 'Выбрать Стратега и проверить мозги.' };
    if (subsystems.memory.readiness < 70) return { zone: 'memory', label: 'Проверить Память', action: 'select_memory', note: 'Подготовить поиск по памяти и индекс.' };
    if (subsystems.hands.readiness < 70) return { zone: 'hands', label: 'Настроить Руки', action: 'select_hands', note: 'Создать безопасный план действия: worker, риск, rollback, Verifier и Approval.' };
    if (subsystems.legs.readiness < 70) return { zone: 'legs', label: 'Настроить Ноги', action: 'select_legs', note: 'Проверить связь устройств и передачу задач.' };
    if (subsystems.voice.readiness < 70) return { zone: 'voice', label: 'Настроить Голос', action: 'select_voice', note: 'Проверить режим “нажать и говорить” и предпросмотр намерения.' };
    if (subsystems.eyes.readiness < 70) return { zone: 'eyes', label: 'Проверить Глаза', action: 'select_eyes', note: 'Проверить визуальный контроль и сбор доказательств.' };
    return { zone: 'body', label: fullReady ? 'Запустить Терминатор' : 'Продолжить настройку', action: 'launch', note: 'Минимальный и комфортный контур готовы.' };
  },

  renderMinaSystemScheme() {
    const host = document.getElementById('mina-system-scheme');
    if (!host) return;
    const health = this.minaSchemeHealth();
    const activeMeta = MINA_SCHEME_SUBSYSTEMS.find((item) => item.id === this.activeMinaSchemeZone) || MINA_SCHEME_SUBSYSTEMS[0];
    const active = health.subsystems[activeMeta.id] || health.subsystems.body;
    const modeLabel = this.minaSchemeMode === 'first_run' ? 'Первый запуск' : this.minaSchemeMode === 'expert' || this.minaSchemeExpertOpen ? 'Экспертный режим' : 'Обычный режим';
    host.innerHTML = `
      <section class="scheme-console" aria-label="Схема Мины">
        ${this.renderMinaSchemeSidebar(health)}
        <main class="scheme-main">
          <header class="scheme-topbar">
            <div>
              <span class="scheme-kicker">Настройка системы</span>
              <h2>Схема Мины</h2>
              <p>Настройте ключевые подсистемы Мины.</p>
            </div>
            <div class="scheme-top-actions">
              <span class="scheme-system-pill"><i></i> Правда ${this.escapeHtml(String(health.sourceTruth.score))}%</span>
              <span class="scheme-system-pill"><i></i> Система активна</span>
              <button type="button" data-scheme-action="run_diagnostics" aria-label="Проверить систему">⌁</button>
              <button type="button" data-scheme-action="save_state" aria-label="Сохранить состояние">▣</button>
            </div>
          </header>

          <section class="scheme-modebar" aria-label="Режим схемы">
            <button type="button" data-scheme-action="set_mode" data-mode="first_run" class="${this.minaSchemeMode === 'first_run' ? 'active' : ''}">Первый запуск</button>
            <button type="button" data-scheme-action="set_mode" data-mode="normal" class="${this.minaSchemeMode === 'normal' && !this.minaSchemeExpertOpen ? 'active' : ''}">Обычный</button>
            <button type="button" data-scheme-action="set_mode" data-mode="expert" class="${this.minaSchemeMode === 'expert' || this.minaSchemeExpertOpen ? 'active' : ''}">Экспертный</button>
            <span>${this.escapeHtml(modeLabel)}</span>
          </section>

          <section class="scheme-workbench">
            <div class="scheme-map" aria-label="Интерактивная карта подсистем Мины">
              ${this.renderMinaSchemeLines()}
              ${this.renderMinaSchemeSilhouette(health.subsystems)}
              ${MINA_SCHEME_SUBSYSTEMS.map((meta) => this.renderMinaSchemeZoneCard(meta, health.subsystems[meta.id])).join('')}
            </div>
            <aside class="scheme-panel" aria-label="Настройка выбранной зоны">
              ${this.renderMinaSchemePanel(activeMeta, active, health)}
            </aside>
          </section>

          ${this.renderMinaSchemeBottomActions(health)}
        </main>
      </section>
    `;
  },

  renderMinaSchemeSidebar(health) {
    const navItems = [
      ['Обзор', 'overview'],
      ['Схема Мины', 'scheme'],
      ['Рабочее', 'work'],
      ['Память', 'memory'],
      ['Задачи', 'tasks'],
      ['Диагност', 'diagnost'],
      ['Инциденты', 'incidents'],
      ['Настройки', 'settings']
    ];
    return `
      <aside class="scheme-side-nav" aria-label="Навигация схемы Мины">
        <div class="scheme-brand">
          <span class="scheme-brand-mark">△</span>
          <strong>TERMINATOR</strong>
          <small>МИНА</small>
        </div>
        <nav>
          ${navItems.map(([label, key]) => `
            <button type="button" class="${key === 'scheme' ? 'active' : ''}" data-scheme-action="${key === 'work' ? 'open_work' : key === 'diagnost' ? 'run_diagnostics' : key === 'memory' ? 'select_memory' : key === 'scheme' ? 'select_body' : 'save_state'}">
              <span aria-hidden="true">${key === 'scheme' ? '◇' : key === 'work' ? '▤' : key === 'memory' ? '▣' : key === 'diagnost' ? '◈' : '•'}</span>
              ${this.escapeHtml(label)}
            </button>
          `).join('')}
        </nav>
        <div class="scheme-operator">
          <div class="scheme-operator-avatar">M</div>
          <div>
            <strong>Оператор</strong>
            <span>Главный пользователь</span>
          </div>
          <i></i>
        </div>
        <div class="scheme-mini-readiness">
          <b>${health.readinessPercent}%</b>
          <span>готовность</span>
        </div>
      </aside>
    `;
  },

  renderMinaSchemeBottomActions(health) {
    return `
      <footer class="scheme-bottom-grid">
        <button type="button" data-scheme-action="run_diagnostics">
          <span>◈</span>
          <strong>Проверить систему</strong>
          <small>Проверка целостности и статуса</small>
        </button>
        <button type="button" data-scheme-action="continue_setup">
          <span>☷</span>
          <strong>${this.escapeHtml(health.next.label)}</strong>
          <small>${this.escapeHtml(health.next.note)}</small>
        </button>
        <button type="button" data-scheme-action="launch" class="scheme-launch-tile">
          <span>▷</span>
          <strong>Запустить Мину</strong>
          <small>Активировать рабочий контур</small>
        </button>
      </footer>
    `;
  },

  renderMinaSchemeLines() {
    const active = this.activeMinaSchemeZone;
    const lines = MINA_SCHEME_SUBSYSTEMS.map((meta) => {
      const startX = meta.side === 'left' ? meta.card.x + 22 : meta.card.x;
      const startY = meta.card.y + 7;
      const elbowX = meta.side === 'left' ? Math.max(startX + 6, meta.anchor.x - 7) : Math.min(startX - 6, meta.anchor.x + 7);
      const className = meta.id === active ? 'active' : '';
      return `<path class="${className}" d="M ${startX} ${startY} H ${elbowX} V ${meta.anchor.y} H ${meta.anchor.x}" />`;
    }).join('');
    return `
      <svg class="scheme-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        ${lines}
      </svg>
    `;
  },

  renderMinaSchemeSilhouette(subsystems) {
    const anchorDots = MINA_SCHEME_SUBSYSTEMS.map((meta) => {
      const status = this.minaSchemeStatusClass(subsystems[meta.id]?.status);
      const active = meta.id === this.activeMinaSchemeZone ? 'active' : '';
      return `<circle class="scheme-anchor-dot ${status} ${active}" cx="${meta.anchor.x}" cy="${meta.anchor.y}" r="${active ? 1.85 : 1.25}" />`;
    }).join('');
    return `
      <div class="scheme-silhouette" aria-hidden="true">
        <img
          class="scheme-hologram-img"
          src="assets/mina-ui/system-scheme/mina_hologram_silhouette.png"
          alt=""
          loading="eager"
          decoding="async">
        <svg viewBox="0 0 320 760" role="img" aria-label="Стилизованный силуэт Мины">
          <defs>
            <linearGradient id="minaBodyGlow" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stop-color="#bff7ff" stop-opacity="0.96" />
              <stop offset="0.38" stop-color="#1d86ff" stop-opacity="0.82" />
              <stop offset="0.74" stop-color="#0c2e92" stop-opacity="0.72" />
              <stop offset="1" stop-color="#75f8ff" stop-opacity="0.94" />
            </linearGradient>
            <radialGradient id="minaCoreGlow" cx="50%" cy="43%" r="62%">
              <stop offset="0" stop-color="#25d8ff" stop-opacity="0.72" />
              <stop offset="0.48" stop-color="#073b8e" stop-opacity="0.28" />
              <stop offset="1" stop-color="#020b1f" stop-opacity="0" />
            </linearGradient>
            <filter id="minaGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <ellipse class="scheme-aura" cx="160" cy="404" rx="138" ry="318" />
          <ellipse class="scheme-aura-ring" cx="160" cy="406" rx="116" ry="264" />
          <ellipse class="scheme-aura-ring scheme-aura-ring--inner" cx="160" cy="402" rx="88" ry="198" />
          <path class="scheme-hair" d="M108 103 C102 46 130 19 160 18 C194 23 221 56 211 129 C205 185 207 235 225 286 C194 266 184 216 186 165 C177 180 144 180 134 165 C136 218 125 264 95 286 C112 234 116 181 108 103 Z" />
          <path class="scheme-head" d="M125 100 C126 64 144 44 161 44 C181 45 195 67 195 101 C195 138 179 160 160 160 C141 160 125 138 125 100 Z" />
          <path class="scheme-neck" d="M145 156 L176 156 L184 199 C172 209 148 209 136 199 Z" />
          <path class="scheme-body" d="M112 204 C126 181 194 181 208 204 C230 251 224 318 206 362 C192 398 204 450 219 512 C236 587 224 676 199 728 C186 664 176 588 169 512 C165 469 155 469 151 512 C144 588 133 664 121 728 C96 676 84 587 101 512 C116 450 128 398 114 362 C96 318 90 251 112 204 Z" />
          <path class="scheme-core" d="M128 224 C140 211 180 211 192 224 C204 277 197 330 181 373 C174 392 176 428 189 465 L131 465 C144 428 146 392 139 373 C123 330 116 277 128 224 Z" />
          <path class="scheme-arm scheme-arm-left" d="M116 214 C78 262 66 358 75 474 C79 530 59 575 43 619" />
          <path class="scheme-arm scheme-arm-right" d="M204 214 C242 262 254 358 245 474 C241 530 261 575 277 619" />
          <path class="scheme-leg scheme-leg-left" d="M143 463 C128 548 126 636 132 735" />
          <path class="scheme-leg scheme-leg-right" d="M177 463 C192 548 194 636 188 735" />
          <path class="scheme-hand-dot" d="M35 611 C52 608 58 624 44 635 C31 633 28 621 35 611 Z" />
          <path class="scheme-hand-dot" d="M285 611 C268 608 262 624 276 635 C289 633 292 621 285 611 Z" />
          <path class="scheme-foot" d="M119 727 C136 724 147 731 149 744 C132 750 114 748 105 742 C107 735 112 731 119 727 Z" />
          <path class="scheme-foot" d="M201 727 C184 724 173 731 171 744 C188 750 206 748 215 742 C213 735 208 731 201 727 Z" />
          <path class="scheme-line-detail" d="M160 164 L160 724 M119 250 C142 268 178 268 201 250 M112 337 C139 352 181 352 208 337 M129 450 C148 464 172 464 191 450 M135 574 C149 587 171 587 185 574" />
          <circle class="scheme-face-dot scheme-face-dot--left" cx="149" cy="98" r="5" />
          <circle class="scheme-face-dot scheme-face-dot--right" cx="172" cy="98" r="5" />
          <circle class="scheme-face-dot scheme-face-dot--voice" cx="160" cy="126" r="5" />
          <circle class="scheme-core-node" cx="160" cy="292" r="8" />
          <circle class="scheme-core-node scheme-core-node--small" cx="122" cy="402" r="6" />
          <circle class="scheme-core-node scheme-core-node--small" cx="198" cy="402" r="6" />
          <circle class="scheme-core-node scheme-core-node--warn" cx="137" cy="658" r="7" />
        </svg>
        <svg class="scheme-anchor-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          ${anchorDots}
        </svg>
      </div>
    `;
  },

  renderMinaSchemeZoneCard(meta, subsystem) {
    const status = this.minaSchemeStatusClass(subsystem?.status || 'waiting');
    const active = meta.id === this.activeMinaSchemeZone;
    const aria = `Открыть настройку ${meta.display}. Статус: ${this.minaSchemeStatusText(subsystem?.status || 'waiting')}.`;
    return `
      <button
        type="button"
        class="scheme-zone-card ${status} ${active ? 'active' : ''} scheme-zone-card--${this.escapeHtml(meta.side)}"
        style="--zone-x:${meta.card.x}%; --zone-y:${meta.card.y}%;"
        data-scheme-zone="${this.escapeHtml(meta.id)}"
        aria-label="${this.escapeHtml(aria)}">
        <span class="scheme-zone-icon" aria-hidden="true">${this.escapeHtml(meta.icon)}</span>
        <span>
          <strong>${this.escapeHtml(meta.display)}</strong>
          <small>${this.escapeHtml(this.minaSchemeStatusText(subsystem?.status || 'waiting'))} · ${this.escapeHtml(String(subsystem?.readiness || 0))}%</small>
        </span>
      </button>
    `;
  },

  renderMinaSchemePanel(meta, subsystem, health) {
    const statusClass = this.minaSchemeStatusClass(subsystem.status);
    const expert = this.minaSchemeMode === 'expert' || this.minaSchemeExpertOpen;
    return `
      <div class="scheme-panel-head">
        <div>
          <span>${this.escapeHtml(meta.short)}</span>
          <h3>${this.escapeHtml(meta.display)}</h3>
          <p>${this.escapeHtml(subsystem.note || meta.description)}</p>
        </div>
        <strong class="scheme-status-badge ${statusClass}">${this.escapeHtml(this.minaSchemeStatusText(subsystem.status))}</strong>
      </div>

      <div class="scheme-panel-summary">
        <div><span>Готовность</span><strong>${this.escapeHtml(String(subsystem.readiness))}%</strong></div>
        <div><span>Источник</span><strong>${this.escapeHtml(expert ? subsystem.snapshot_source : 'состояние системы')}</strong></div>
      </div>

      ${this.renderMinaSchemePanelBody(meta.id, subsystem, health)}

      <section class="scheme-checklist">
        <strong>Готовность</strong>
        ${subsystem.checks.map(([name, value]) => `
          <article>
            <span>${this.escapeHtml(name)}</span>
            <b>${this.escapeHtml(value)}</b>
          </article>
        `).join('')}
      </section>

      <section class="scheme-panel-actions">
        ${this.renderMinaSchemeActions(meta.id)}
      </section>

      ${expert ? this.renderMinaSchemeExpert(meta, subsystem, health) : ''}
    `;
  },

  renderMinaSchemePanelBody(zoneId, subsystem, health) {
    if (zoneId === 'head') {
      const strategist = this.mainStrategistBrain();
      const brains = (this.headBrains || []).filter((brain) => !brain.archived);
      const activeBrains = this.activeHeadBrains();
      const activeAgents = this.activeHeadSearchAgents();
      return `
        <section class="scheme-config-block">
          <label class="work-field">
            <span>Главный Стратег</span>
            <select id="mina-scheme-strategist-select">
              <option value="">Не выбран</option>
              ${brains.filter((brain) => brain.can_be_strategist).map((brain) => `<option value="${this.escapeHtml(brain.brain_id)}"${strategist?.brain_id === brain.brain_id ? ' selected' : ''}>${this.escapeHtml(brain.display_name)} / ${this.escapeHtml(brain.selected_model_name)}</option>`).join('')}
            </select>
          </label>
          <div class="scheme-chip-list">
            ${activeBrains.slice(0, 5).map((brain) => `<span>${this.escapeHtml(brain.display_name)} · ${this.escapeHtml(brain.role)}</span>`).join('') || '<span>Совет не собран</span>'}
          </div>
          <div class="scheme-chip-list">
            ${activeAgents.slice(0, 5).map((agent) => `<span>${this.escapeHtml(agent.name)}</span>`).join('') || '<span>Исследователи не выбраны</span>'}
          </div>
        </section>
      `;
    }

    if (zoneId === 'memory') {
      const memoryTasks = (this.workTasks || []).filter((task) => task.memory_preview || task.memory_status);
      const memorySearch = this.memorySearchSnapshot();
      return `
        <section class="scheme-config-block">
          <div class="scheme-path">${this.escapeHtml(TERMINATOR_STORAGE_ROOT)}\\memory</div>
          <p>Память хранит смысл, решения и ссылки. Индекс ищет по задачам, артефактам, evidence, Research Pack и ответам Совета без raw-файлов и без секретов.</p>
          <div class="scheme-chip-list">
            <span>${memoryTasks.length} кандидатов памяти</span>
            <span>Индекс: ${this.escapeHtml(this.memorySearchStatusName(memorySearch.status))}</span>
            <span>${this.escapeHtml(String(memorySearch.count))} записей</span>
            <span>AI API не включены</span>
          </div>
        </section>
      `;
    }

    if (zoneId === 'diagnost') {
      const guardian = this.guardianSnapshot();
      return `
        <section class="scheme-config-block">
          <div class="scheme-chip-list">
            <span>Безопасный режим: ${guardian.state.safe_mode ? 'включён' : 'выключен'}</span>
            <span>Стоп: ${guardian.state.emergency_stop_active ? 'активен' : 'нет'}</span>
            <span>Инциденты: ${guardian.openIncidents.length}</span>
            <span>Платное: заблокировано</span>
          </div>
        </section>
      `;
    }

    if (zoneId === 'hands') {
      const hands = this.handsSnapshot();
      const runtime = this.controlledRuntimeSnapshot();
      const latest = hands.latest;
      return `
        <section class="scheme-config-block">
          <div class="scheme-path">${this.escapeHtml(TERMINATOR_STORAGE_ROOT)}\\repair_workspaces\\&lt;incident_id&gt;</div>
          <p>${this.escapeHtml(hands.note)} Phase 12 добавляет Controlled Runtime: выполняются только allowlist LOW-risk действия без shell и без active project write.</p>
          <div class="scheme-chip-list">
            <span>Планы: ${this.escapeHtml(String(hands.count))}</span>
            <span>Approval: ${this.escapeHtml(String(hands.approval_count))}</span>
            <span>Worker reports: ${this.escapeHtml(String(hands.worker_reports))}</span>
            <span>LOW-run: ${this.escapeHtml(String(runtime.completed_count))}</span>
            <span>Опасная автоматика: заблокирована</span>
          </div>
          ${latest ? `<div class="scheme-chip-list"><span>Последний план: ${this.escapeHtml(latest.title)}</span><span>${this.escapeHtml(this.handsRiskName(latest.risk_level))}</span></div>` : ''}
        </section>
      `;
    }

    if (zoneId === 'legs') {
      const devices = this.systemDevices || [];
      const mesh = this.buildDeviceMeshSnapshot();
      const ownedRegistry = mesh.ownedRegistry || this.buildOwnedAgentRegistrySnapshot();
      const handoff = this.buildHandoffRoutePlannerSnapshot(mesh, this.getActiveWorkTask());
      const continuity = this.buildContinuitySnapshot(this.getActiveWorkTask());
      return `
        <section class="scheme-config-block">
          <div class="scheme-chip-list">
            ${devices.slice(0, 5).map((device) => `<span>${this.escapeHtml(String(device.name || '').replace(/Local Agent/g, 'Локальный агент'))} · ${this.escapeHtml(DEVICE_STATUSES[device.status] || device.status)}</span>`).join('')}
          </div>
          <div class="scheme-chip-list">
            <span>Основной агент: ${this.escapeHtml(ownedRegistry.primary_agent_id)}</span>
            <span>Heartbeat: ${this.escapeHtml(ownedRegistry.online_count ? 'online' : 'не получен')}</span>
            <span>${this.escapeHtml(String(mesh.routes.length))} маршрутов</span>
            <span>Handoff: ${this.escapeHtml(String(handoff.task_records.length))} по задаче</span>
            <span>Checkpoint: ${this.escapeHtml(String(continuity.checkpoint_count))}</span>
            <span>Task Teleport: ${this.escapeHtml(String(continuity.teleport_count))}</span>
            <span>Offline recovery: ${this.escapeHtml(continuity.label)}</span>
            <span>${this.escapeHtml(String(mesh.trusted))} доверенных</span>
            <span>${this.escapeHtml(String(mesh.attention))} требуют внимания</span>
          </div>
          <p>Ноги доставляют задачу и контекст между средами. ${this.escapeHtml(handoff.next)} Исполнение остаётся за Руками и проходит через Защитник.</p>
        </section>
      `;
    }

    if (zoneId === 'voice') {
      return `
        <section class="scheme-config-block">
          <div class="scheme-chip-list">
            <span>Нажать и говорить</span>
            <span>Русский</span>
            <span>${this.workspaceVoiceSupported ? 'Речь распознаётся' : 'ручной ввод'}</span>
            <span>Опасное заблокировано</span>
          </div>
          <p>Мина сначала показывает “Я поняла так”, затем ждёт подтверждение. Опасные слова не выполняются.</p>
        </section>
      `;
    }

    if (zoneId === 'eyes') {
      const eyes = this.eyesVisualSnapshot();
      return `
        <section class="scheme-config-block">
          <div class="scheme-chip-list">
            <span>Записей: ${this.escapeHtml(String(eyes.count))}</span>
            <span>Готовность: ${this.escapeHtml(String(eyes.readiness))}%</span>
            <span>Последнее: ${this.escapeHtml(eyes.latest ? this.formatTaskTime(eyes.latest.created_at) : 'нет')}</span>
            <span>Только доказательства</span>
          </div>
          <p>${this.escapeHtml(eyes.note)} Глаза не кликают и не входят в аккаунты. Только наблюдение и доказательства.</p>
        </section>
      `;
    }

    return `
      <section class="scheme-config-block">
        <div class="scheme-chip-list">
          <span>Контур задач: ${this.taskRuntimeReady ? 'локальная база' : 'резервный режим'}</span>
          <span>Хранилище задач: ${this.escapeHtml(this.taskStoreStatusSnapshot().status)}</span>
          <span>Мост: ${this.escapeHtml(this.directModeStatusSnapshot().status)}</span>
          <span>Локальный агент: ${this.escapeHtml(this.localAgentStatusSnapshot().status)}</span>
          <span>agent_id: ${this.escapeHtml(this.getPrimaryOwnedAgentId())}</span>
        </div>
        <p>Тело держит маршрут задачи, политики, статусы и следующий лучший шаг.</p>
      </section>
    `;
  },

  renderMinaSchemeActions(zoneId) {
    const actions = {
      head: [
        ['open_system_head', 'Открыть полную настройку Головы'],
        ['select_memory', 'Проверить Память']
      ],
      memory: [
        ['open_memory_search', 'Открыть поиск памяти'],
        ['rebuild_memory_index', 'Пересобрать индекс']
      ],
      diagnost: [
        ['run_diagnostics', 'Быстрая проверка'],
        ['emergency_stop', 'Остановить действия']
      ],
      hands: [
        ['open_system_hands', 'Открыть Руки'],
        ['open_work_hands', 'План действия в задаче'],
        ['run_worker_check', 'Проверить workers']
      ],
      legs: [
        ['open_devices', 'Открыть устройства'],
        ['open_work_handoff', 'Передача задачи'],
        ['create_continuity_checkpoint', 'Создать checkpoint'],
        ['prepare_task_teleport', 'Task Teleport'],
        ['select_body', 'Проверить Тело']
      ],
      voice: [
        ['open_voice', 'Открыть голосовые hooks'],
        ['open_work_voice', 'Проверить в Рабочем']
      ],
      eyes: [
        ['open_system_eyes', 'Открыть панель Глаз'],
        ['create_visual_check', 'Создать visual evidence'],
        ['open_verifier', 'Открыть Verifier']
      ],
      body: [
        ['run_diagnostics', 'Проверить систему'],
        ['open_work', 'Открыть Рабочее']
      ]
    }[zoneId] || [];
    return actions.map(([action, label]) => `<button type="button" data-scheme-action="${this.escapeHtml(action)}">${this.escapeHtml(label)}</button>`).join('');
  },

  renderMinaSchemeExpert(meta, subsystem, health) {
    return `
      <section class="scheme-expert">
        <div class="workspace-panel-head">
          <strong>Экспертный режим</strong>
          <span>${subsystem.is_mock ? 'partial/mock state' : 'real snapshot'}</span>
        </div>
        <dl>
          <div><dt>subsystem_id</dt><dd>${this.escapeHtml(meta.id)}</dd></div>
          <div><dt>snapshot_source</dt><dd>${this.escapeHtml(subsystem.snapshot_source)}</dd></div>
          <div><dt>status</dt><dd>${this.escapeHtml(subsystem.status)}</dd></div>
          <div><dt>readiness</dt><dd>${this.escapeHtml(String(subsystem.readiness))}%</dd></div>
          <div><dt>global</dt><dd>${health.readinessPercent}% · minimum=${health.minimumReady} · comfort=${health.comfortReady} · full=${health.fullReady}</dd></div>
        </dl>
      </section>
    `;
  },

  async updateMinaSchemeStrategist(brainId) {
    if (!brainId) return;
    this.setMainStrategist(brainId);
    await this.saveHeadRuntime();
    this.renderSystemHeadPanel();
    this.renderMissionControl();
    this.renderMinaSystemScheme();
  },

  async handleMinaSchemeAction(action, button) {
    const mode = button?.dataset?.mode;
    if (action === 'set_mode' && mode) {
      this.minaSchemeMode = mode;
      this.minaSchemeExpertOpen = mode === 'expert';
      this.saveMinaSchemeState();
      this.renderMinaSystemScheme();
      return;
    }

    if (action === 'continue_setup') {
      const next = this.minaSchemeHealth().next;
      if (next.action === 'launch') {
        this.go('work');
        return;
      }
      this.selectMinaSchemeZone(next.zone);
      return;
    }

    if (action.startsWith('select_')) {
      this.selectMinaSchemeZone(action.replace('select_', ''));
      return;
    }

    if (action === 'save_state') {
      this.saveMinaSchemeState();
      this.toast('Схема Мины сохранена');
      return;
    }

    if (action === 'launch' || action === 'open_work' || action === 'open_work_voice') {
      this.go('work');
      return;
    }

    if (action === 'open_work_handoff') {
      this.go('work');
      this.workspaceActiveTab = 'handoff';
      this.renderWorkTaskCard();
      window.setTimeout(() => document.getElementById('workspace-handoff-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      return;
    }

    if (action === 'create_continuity_checkpoint') {
      await this.handleContinuityAction('create_checkpoint', { dataset: { reason: 'scheme_legs_checkpoint' } });
      return;
    }

    if (action === 'prepare_task_teleport') {
      await this.handleContinuityAction('prepare_teleport', { dataset: { mode: 'resume_standard' } });
      return;
    }

    if (action === 'open_memory_search') {
      this.go('system');
      window.setTimeout(() => document.getElementById('system-memory-search-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      return;
    }

    if (action === 'rebuild_memory_index') {
      this.activeMinaSchemeZone = 'memory';
      this.saveMinaSchemeState();
      await this.refreshMemorySearchIndex({ silent: false });
      this.renderMinaSystemScheme();
      return;
    }

    if (action === 'open_system_head' || action === 'open_guardian' || action === 'open_devices' || action === 'open_voice' || action === 'open_system_eyes' || action === 'open_system_hands') {
      this.go('system');
      const target = action === 'open_devices'
        ? 'system-device-preview'
        : action === 'open_voice'
          ? 'system-voice-hooks'
          : action === 'open_system_eyes'
            ? 'system-eyes-panel'
            : action === 'open_system_hands'
              ? 'system-hands-panel'
              : action === 'open_system_head'
                ? 'system-head-panel'
                : 'system-guardian-panel';
      window.setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      return;
    }

    if (action === 'open_work_hands') {
      this.go('work');
      this.workspaceActiveTab = 'hands';
      this.renderWorkTaskCard();
      window.setTimeout(() => document.getElementById('workspace-hands-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      return;
    }

    if (action === 'create_visual_check') {
      this.go('work');
      this.workspaceActiveTab = 'eyes';
      this.renderWorkTaskCard();
      window.setTimeout(() => document.getElementById('workspace-eyes-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      return;
    }

    if (action === 'open_verifier') {
      const task = this.getActiveWorkTask();
      if (task) {
        this.openVerifierPanel(task);
        this.go('work');
      } else {
        this.toast('Сначала создай задачу');
      }
      return;
    }

    if (action === 'run_diagnostics') {
      this.activeMinaSchemeZone = 'diagnost';
      this.saveMinaSchemeState();
      await this.runSystemDiagnostics();
      this.renderMinaSystemScheme();
      return;
    }

    if (action === 'run_worker_check') {
      this.activeMinaSchemeZone = 'hands';
      this.saveMinaSchemeState();
      await this.handleGuardianAction('run_worker_check', button);
      this.renderMinaSystemScheme();
      return;
    }

    if (action === 'emergency_stop') {
      this.activeMinaSchemeZone = 'diagnost';
      this.saveMinaSchemeState();
      await this.handleGuardianAction('emergency_stop', button);
      this.renderMinaSystemScheme();
    }
  },

  toggleWorkspaceVoice() {
    this.workspaceVoiceOpen = true;
    const panel = document.getElementById('workspace-voice-panel');
    if (panel) panel.hidden = false;
    if (!this.workspaceVoiceSupported || !this.workspaceVoiceRecognition) {
      this.workspaceVoiceState = this.workspaceVoiceSupported ? 'idle' : 'browser_not_supported';
      this.renderVoicePanel();
      this.toast('Можно вставить голосовую команду текстом');
      return;
    }
    try {
      this.workspaceVoiceRecognition.start();
      this.recordVoiceEvent('voice_listening_started', '', null);
    } catch {
      this.workspaceVoiceState = 'failed';
      this.renderVoicePanel();
    }
  },

  renderVoicePanel() {
    const panel = document.getElementById('workspace-voice-panel');
    const toggles = document.querySelectorAll('[data-workspace-action="toggle_voice"]');
    if (!panel) return;
    panel.hidden = !this.workspaceVoiceOpen;
    toggles.forEach((toggle) => {
      toggle.setAttribute('aria-pressed', this.workspaceVoiceState === 'listening' ? 'true' : 'false');
      toggle.textContent = this.workspaceVoiceState === 'listening' ? 'Слушаю...' : 'Микрофон';
    });
    const state = document.getElementById('workspace-voice-state');
    const support = document.getElementById('workspace-voice-support');
    const transcript = document.getElementById('workspace-voice-transcript');
    const preview = document.getElementById('workspace-voice-preview');
    if (state) state.textContent = VOICE_STATES[this.workspaceVoiceState] || this.workspaceVoiceState || 'готово';
    if (support) support.textContent = this.workspaceVoiceSupported
      ? 'Распознавание браузера: доступно, режим “нажать и говорить”'
      : 'Распознавание браузера недоступно, работает ручной предпросмотр';
    if (transcript && transcript.value !== this.workspaceVoiceTranscript) transcript.value = this.workspaceVoiceTranscript || '';
    if (!preview) return;
    const intent = this.workspaceVoicePreview;
    if (!intent) {
      preview.hidden = false;
      preview.innerHTML = `
        <p>Голос не выполняет действия напрямую. Сначала будет предпросмотр намерения, риск и подтверждение владельца.</p>
        <div class="voice-actions">
          <button type="button" data-voice-action="preview_manual">Показать предпросмотр</button>
          <button type="button" data-voice-setting="toggle_responses">${this.voiceResponsesEnabled ? 'Ответы: вкл' : 'Ответы: выкл'}</button>
          <button type="button" data-voice-action="cancel">Закрыть</button>
        </div>
      `;
      return;
    }
    const secretWarning = this.scanPrivacyText(intent.transcript || '').findings.length
      ? '<p class="voice-warning">В тексте есть признаки секрета. В журнал будет записана только безопасная версия.</p>'
      : '';
    const canExecuteIntent = intent.intent !== 'unknown' && intent.confidence !== 'low' && intent.status !== 'completed';
    const executeLabel = intent.risk === 'dangerous'
      ? 'Создать предупреждение'
      : intent.intent === 'create_task'
        ? 'Создать задачу'
        : 'Выполнить';
    const statusClass = intent.risk === 'dangerous' ? 'danger' : intent.risk === 'review' ? 'review' : 'safe';
    preview.hidden = false;
    preview.innerHTML = `
      <div class="voice-preview-head">
        <span>Я поняла команду так</span>
        <strong>${this.escapeHtml(intent.label)}</strong>
      </div>
      <div class="voice-preview-status ${statusClass}">
        <span>Риск: ${this.escapeHtml(DEVICE_RISK_LEVELS[intent.risk] || intent.risk)}</span>
        <span>Уверенность: ${this.escapeHtml(VOICE_CONFIDENCE_LABELS[intent.confidence] || intent.confidence)}</span>
        <span>${intent.risk === 'dangerous' ? 'Автовыполнение заблокировано' : 'Сначала подтверждение владельца'}</span>
      </div>
      <dl class="voice-preview-grid">
        <div><dt>Действие</dt><dd>${this.escapeHtml(intent.label)}</dd></div>
        <div><dt>Риск</dt><dd>${this.escapeHtml(DEVICE_RISK_LEVELS[intent.risk] || intent.risk)}</dd></div>
        <div><dt>Уверенность</dt><dd>${this.escapeHtml(VOICE_CONFIDENCE_LABELS[intent.confidence] || intent.confidence)}</dd></div>
        <div><dt>Проект</dt><dd>${this.escapeHtml(this.projectName(intent.entities.project_id || 'terminator'))}</dd></div>
        <div><dt>Исполнитель</dt><dd>${this.escapeHtml(intent.entities.executor || 'не задано')}</dd></div>
        <div><dt>Статус</dt><dd>${this.escapeHtml(VOICE_STATES[intent.status] || (intent.status === 'blocked_preview' ? 'заблокировано до подтверждения' : intent.status))}</dd></div>
      </dl>
      <p>${this.escapeHtml(intent.summary)}</p>
      ${secretWarning}
      ${this.renderVoiceEntityChips(intent)}
      <div class="voice-safety-list">
        <span>Фоновое прослушивание: нет</span>
        <span>Аудио не сохраняется</span>
        <span>Опасные действия только через подтверждение</span>
      </div>
      <div class="voice-actions">
        ${canExecuteIntent
          ? `<button type="button" data-voice-action="execute">${this.escapeHtml(executeLabel)}</button>`
          : intent.status === 'completed'
            ? '<button type="button" disabled>Готово</button>'
            : '<button type="button" data-voice-action="edit">Уточнить вручную</button>'}
        <button type="button" data-voice-action="edit">Изменить</button>
        <button type="button" data-voice-action="cancel">Отмена</button>
      </div>
    `;
  },

  renderVoiceEntityChips(intent) {
    const entities = intent?.entities || {};
    const chips = Object.entries(entities)
      .filter(([, value]) => value !== undefined && value !== null && String(value).trim())
      .map(([key, value]) => `<span>${this.escapeHtml(this.voiceEntityName(key))}: ${this.escapeHtml(this.voiceEntityValue(key, value))}</span>`);
    if (!chips.length) return '';
    return `<div class="voice-entity-chips">${chips.join('')}</div>`;
  },

  voiceEntityValue(key, value) {
    if (key === 'project_id') return this.projectName(value);
    return String(value);
  },

  voiceEntityName(key) {
    return {
      task_text: 'задача',
      project_id: 'проект',
      mode: 'режим',
      quality_level: 'качество',
      executor: 'исполнитель',
      note: 'уточнение',
      command: 'команда'
    }[key] || key;
  },

  handleVoiceAction(action) {
    if (action === 'preview_manual') {
      this.workspaceVoicePreview = this.buildVoiceIntentPreview(this.workspaceVoiceTranscript);
      this.workspaceVoiceState = 'preview_waiting';
      this.renderVoicePanel();
      return;
    }
    if (action === 'edit') {
      document.getElementById('workspace-voice-transcript')?.focus();
      return;
    }
    if (action === 'cancel') {
      this.workspaceVoiceOpen = false;
      this.workspaceVoiceState = 'cancelled';
      this.workspaceVoicePreview = null;
      this.renderVoicePanel();
      return;
    }
    if (action === 'execute') {
      if (!this.workspaceVoicePreview) this.workspaceVoicePreview = this.buildVoiceIntentPreview(this.workspaceVoiceTranscript);
      this.executeVoiceIntent(this.workspaceVoicePreview);
    }
  },

  normalizeVoiceCommand(text) {
    return String(text || '')
      .trim()
      .replace(/^(?:мина|терминатор)(?:[, ]+слушай)?[, ]*/i, '')
      .replace(/\s+/g, ' ')
      .trim();
  },

  voiceProjectFromText(text) {
    const lower = String(text || '').toLowerCase();
    const projects = [...(this.activeWorkProjects?.() || []), ...this.defaultRuntimeProjects()];
    const seen = new Set();
    for (const project of projects) {
      if (!project?.project_id || seen.has(project.project_id)) continue;
      seen.add(project.project_id);
      const name = String(project.name || '').toLowerCase();
      if (name && lower.includes(name)) return project.project_id;
    }
    if (/диплом|qa|тест/.test(lower)) return 'diploma_qa';
    if (/codex|кодекс|antigravity|исполнитель/.test(lower)) return 'development_executors';
    if (/исслед|документ|источник/.test(lower)) return 'research_documents';
    if (/терминатор|мина|mina|direct|bridge|local agent|рабочее/.test(lower)) return 'terminator';
    return '';
  },

  voiceExecutorFromText(text) {
    const lower = String(text || '').toLowerCase();
    const executors = [
      ['Codex', /\b(codex|кодекс)\b/],
      ['Claude', /\bclaude\b|клод/],
      ['Gemini', /\bgemini\b|джемини/],
      ['DeepSeek', /\bdeepseek\b|дипсик|дип seek/],
      ['Qwen', /\bqwen\b|квен/],
      ['ChatGPT', /\bchatgpt\b|чат ?gpt|чатджпт/]
    ];
    return executors.find(([, pattern]) => pattern.test(lower))?.[0] || '';
  },

  buildVoiceIntentPreview(transcript) {
    const raw = String(transcript || '').trim();
    const command = this.normalizeVoiceCommand(raw);
    const normalized = command.toLowerCase().replace(/\s+/g, ' ');
    if (!raw || !command) {
      return {
        transcript: raw,
        normalized_text: normalized,
        intent: 'unknown',
        label: VOICE_INTENT_LABELS.unknown,
        entities: {},
        confidence: 'low',
        risk: 'review',
        status: 'нужно больше данных',
        summary: 'Команда пустая. Скажите или вставьте текст.'
      };
    }
    const executor = this.voiceExecutorFromText(command);
    const projectId = this.voiceProjectFromText(command);

    if (VOICE_DANGEROUS_PATTERN.test(command)) {
      return this.voiceIntent(raw, 'dangerous_command', 'high', 'dangerous', {
        command: command
      }, 'Опасная команда не будет выполнена автоматически. Можно только подготовить предупреждение и запрос подтверждения.');
    }
    if (/(^|\s)(стоп|отмена|не выполняй|останови|остановить|закрой голос|хватит)(\s|$)/i.test(command)) {
      return this.voiceIntent(raw, 'stop_listening', 'high', 'safe', {}, 'Голосовой режим будет остановлен. Никаких действий не выполняется.');
    }
    if (/(помощь|что умеешь|команды|подсказка)/i.test(command)) {
      return this.voiceIntent(raw, 'help', 'high', 'safe', {}, 'Покажу подсказку по безопасным голосовым командам.');
    }
    if (/(что дальше|следующий шаг|что делать дальше|куда дальше|next best)/i.test(command)) {
      return this.voiceIntent(raw, 'show_next_best_action', 'high', 'safe', {}, 'Покажу следующий лучший шаг по текущей задаче или системе.');
    }
    if (/(статус голоса|проверь голос|готовность голоса|voice status)/i.test(command)) {
      return this.voiceIntent(raw, 'show_voice_status', 'high', 'safe', {}, 'Покажу состояние Mina Voice.');
    }
    if (/(ноги|устройства|телефон|device mesh|девайс|устройство)/i.test(command)) {
      return this.voiceIntent(raw, 'open_device_mesh', 'high', 'safe', {}, 'Будет открыт центр связи устройств и Ноги Терминатора.');
    }
    if (/(создай|создать|новая|новую).{0,24}задач/i.test(command)) {
      const request = command.replace(/создай|создать|новая|новую|задачу|задача/gi, '').trim() || command;
      const preview = this.buildWorkPreview(request, { project_id: projectId || 'terminator', mode: 'auto', quality_level: 'auto' });
      return this.voiceIntent(raw, 'create_task', 'high', 'safe', {
        project_id: preview.project_id,
        mode: preview.mode,
        quality_level: preview.quality_level,
        task_text: request,
        ...(executor ? { executor } : {})
      }, `Будет создан предпросмотр задачи: ${preview.title}`);
    }
    if (/(добавь|добавить|запиши|записать).{0,28}(уточнен|уточнён|замет|комментар)|^(уточнение|заметка)/i.test(command)) {
      const note = command.replace(/добавь|добавить|запиши|записать|уточнение|уточнённое|уточненное|заметку|заметка|комментарий/gi, '').replace(/^[-—: ]+/, '').trim() || command;
      return this.voiceIntent(raw, 'add_note', 'high', 'safe', { note }, 'Уточнение будет добавлено в историю текущей задачи.');
    }
    if (/(центр управления|mission|задачи ждут|риски|ожидают отчёт|ожидают отчет)/i.test(command)) {
      return this.voiceIntent(raw, 'open_mission_control', 'high', 'safe', {}, 'Будет открыт Центр управления.');
    }
    if (/(система|диагност|статус системы)/i.test(command)) {
      return this.voiceIntent(raw, 'open_system', 'high', 'safe', {}, 'Будет открыт экран Система.');
    }
    if (/(рабочее|рабочее окно|workspace)/i.test(command)) {
      return this.voiceIntent(raw, 'open_workspace', 'high', 'safe', {}, 'Будет открыт экран Рабочее.');
    }
    if (/(сформируй|создай|сделай).{0,24}(пакет|context pack|контекст).{0,24}(codex|кодекс)?/i.test(command)) {
      return this.voiceIntent(raw, 'create_context_pack', 'medium', 'review', { executor: executor || 'Codex' }, 'Будет подготовлен Context Pack, без автоматической отправки.');
    }
    if (/(отметь|пометь).{0,30}(отправил|отправлено|отправлен).{0,20}(codex|кодекс)?/i.test(command)) {
      return this.voiceIntent(raw, 'mark_sent_to_executor', 'medium', 'review', { executor: executor || 'Codex' }, 'Пакет будет отмечен как отправленный исполнителю.');
    }
    if (/(провер|verifier|верифик)/i.test(command)) {
      return this.voiceIntent(raw, 'open_verifier', 'medium', 'review', {}, 'Будет открыта проверка результата.');
    }
    if (/(памят|memory|сохрани вывод|что сохранить)/i.test(command)) {
      return this.voiceIntent(raw, 'show_memory_preview', 'medium', 'review', {}, 'Будет открыт Memory Preview.');
    }
    return this.voiceIntent(raw, 'unknown', 'low', 'review', {}, 'Я не уверена. Проверьте команду вручную.');
  },

  voiceIntent(transcript, intent, confidence, risk, entities, summary) {
    const normalized = this.normalizeVoiceCommand(transcript).toLowerCase().replace(/\s+/g, ' ');
    return {
      transcript,
      normalized_text: normalized,
      intent,
      label: VOICE_INTENT_LABELS[intent] || intent,
      entities: entities || {},
      confidence,
      risk,
      status: risk === 'dangerous' ? 'blocked_preview' : 'preview_waiting',
      summary
    };
  },

  executeVoiceIntent(preview) {
    const task = this.getActiveWorkTask();
    if (!preview) return;
    this.workspaceVoiceState = preview.risk === 'dangerous' ? 'approval_required' : 'completed';
    if (preview.intent === 'dangerous_command') {
      if (task) {
        this.showWorkspaceApproval(task, preview.entities.command || preview.transcript);
        this.recordVoiceEvent('voice_approval_required', preview.transcript, preview);
        this.saveWorkTasks();
        this.renderWorkTaskCard();
        this.speakMina('Нужно подтверждение владельца.');
      } else {
        this.toast('Опасная команда заблокирована');
        this.recordVoiceEvent('voice_blocked_without_task', preview.transcript, preview);
        this.speakMina('Команда заблокирована.');
      }
      this.renderVoicePanel();
      return;
    }
    if (preview.intent === 'unknown') {
      this.workspaceVoiceState = 'failed';
      this.toast('Команда не распознана');
      this.speakMina('Я не уверена.');
      this.renderVoicePanel();
      return;
    }
    if (preview.intent === 'stop_listening') {
      this.workspaceVoiceOpen = false;
      this.workspaceVoiceState = 'stopped';
      try {
        this.workspaceVoiceRecognition?.stop();
      } catch {}
      this.recordVoiceEvent('voice_stopped', preview.transcript, preview);
      this.renderVoicePanel();
      this.speakMina('Голос остановлен.');
      return;
    }
    if (preview.intent === 'help') {
      this.toast('Голос: создать задачу, добавить уточнение, открыть Рабочее, Центр управления, Систему, проверку или память.', 5200);
      this.recordVoiceEvent('voice_help_shown', preview.transcript, preview);
      this.speakMina('Показываю подсказку.');
      this.renderVoicePanel();
      return;
    }
    if (preview.intent === 'show_next_best_action') {
      const next = task?.next_step || this.minaSchemeHealth().next.note || 'Откройте Рабочее и создайте задачу.';
      this.toast(`Следующий шаг: ${next}`, 6200);
      this.recordVoiceEvent('voice_next_step_shown', preview.transcript, preview);
      this.speakMina('Показываю следующий шаг.');
      this.renderVoicePanel();
      return;
    }
    if (preview.intent === 'show_voice_status') {
      const status = this.buildVoiceReadinessSnapshot();
      this.toast(`Голос Мины: ${status.score}%, ${status.status}. ${status.note}`, 6200);
      this.recordVoiceEvent('voice_status_shown', preview.transcript, preview);
      this.speakMina('Статус голоса показан.');
      this.renderSystemVoiceHooks();
      this.renderVoicePanel();
      return;
    }
    if (preview.intent === 'open_workspace') this.go('work');
    if (preview.intent === 'open_mission_control') this.go('mission');
    if (preview.intent === 'open_system') this.go('system');
    if (preview.intent === 'open_device_mesh') {
      this.go('system');
      window.setTimeout(() => document.getElementById('system-device-preview')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
    }
    if (preview.intent === 'create_task') {
      this.go('work');
      const input = document.getElementById('work-task-input');
      if (input) input.value = preview.entities.task_text || preview.transcript;
      this.workPreview = this.buildWorkPreview(preview.entities.task_text || preview.transcript, {
        project_id: preview.entities.project_id || 'terminator',
        mode: preview.entities.mode || 'auto',
        quality_level: preview.entities.quality_level || 'auto'
      });
      this.workPreview.input_source = 'voice';
      this.workPreview.original_transcript = this.safeVoiceTranscript(preview.transcript);
      this.workPreview.normalized_text = preview.normalized_text;
      this.workPreview.intent_preview = preview;
      this.confirmWorkPreview();
      this.recordVoiceEvent('voice_action_completed', preview.transcript, preview);
    }
    if (preview.intent === 'add_note') {
      if (!task) {
        this.toast('Сначала выбери задачу');
      } else {
        task.input_source = task.input_source || 'keyboard';
        task.voice_event_type = 'voice_note_added';
        this.addWorkspaceMessage(task, 'clarification', 'Голос', preview.entities.note || preview.transcript, {
          input_source: 'voice',
          original_transcript: this.safeVoiceTranscript(preview.transcript),
          normalized_text: preview.normalized_text,
          intent_preview: preview
        });
        this.recordVoiceEvent('voice_action_completed', preview.transcript, preview);
      }
    }
    if (preview.intent === 'create_context_pack' && task) this.buildAndShowContextPack(task);
    if (preview.intent === 'mark_sent_to_executor' && task) this.markContextPackSent(task);
    if (preview.intent === 'open_verifier' && task) this.openVerifierPanel(task);
    if (preview.intent === 'show_memory_preview' && task) {
      task.memory_preview = this.buildWorkspaceMemoryPreview(task, task.memory_preview?.status || 'draft');
      this.switchWorkspaceTab('memory');
    }
    if (['create_context_pack', 'mark_sent_to_executor', 'open_verifier', 'show_memory_preview', 'open_workspace', 'open_mission_control', 'open_system', 'open_device_mesh'].includes(preview.intent)) {
      this.recordVoiceEvent('voice_action_completed', preview.transcript, preview);
    }
    preview.status = 'completed';
    this.saveWorkTasks();
    this.renderWorkTaskCard();
    this.renderMissionControl();
    this.renderSystemStatus();
    this.renderVoicePanel();
    this.toast('Голосовая команда обработана безопасно');
    if (preview.intent === 'create_task') this.speakMina('Задача создана.');
    else if (preview.intent === 'add_note') this.speakMina('Уточнение добавлено.');
    else if (preview.intent.startsWith('open_')) this.speakMina('Открываю.');
    else this.speakMina('Готово.');
  },

  recordVoiceEvent(type, transcript, preview) {
    const task = this.getActiveWorkTask();
    const safeTranscript = this.safeVoiceTranscript(transcript);
    const event = {
      event_id: this.generateWorkspaceId('VOICE'),
      type,
      intent: preview?.intent || '',
      label: VOICE_INTENT_LABELS[preview?.intent] || 'Голос',
      transcript: safeTranscript,
      normalized_text: preview?.normalized_text || this.normalizeVoiceCommand(transcript).toLowerCase().replace(/\s+/g, ' '),
      risk_level: preview?.risk || 'safe',
      confidence: preview?.confidence || '',
      summary: preview?.summary || safeTranscript,
      task_id: task?.task_id || '',
      created_at: new Date().toISOString()
    };
    this.voiceEventLog = [event, ...(this.voiceEventLog || [])].slice(0, 50);
    this.saveVoiceEvents();
    if (!task) {
      this.renderSystemVoiceHooks();
      return event;
    }
    task.voice_event_type = type;
    task.intent_preview = preview || task.intent_preview;
    const taskEvent = this.recordTaskEvent(task, 'voice_command', `${VOICE_INTENT_LABELS[preview?.intent] || 'Голос'}: ${safeTranscript}`, {
      actor: 'Mina Voice',
      source: 'voice',
      risk_level: preview?.risk || 'safe'
    });
    this.saveWorkTasks();
    this.renderSystemVoiceHooks();
    return taskEvent;
  },

  safeVoiceTranscript(text) {
    const source = String(text || '');
    const scan = this.scanPrivacyText(source);
    if (scan.findings.length) return '[скрыто: возможный секрет в голосовом тексте]';
    return source;
  },

  renderSystemRow(name, status, note) {
    return `
      <article class="system-row">
        <div>
          <strong>${this.escapeHtml(name)}</strong>
          <p>${this.escapeHtml(note)}</p>
        </div>
        <span>${this.escapeHtml(status)}</span>
      </article>
    `;
  },

  async loadApprovalRecords() {
    const taskApprovals = (this.workTasks || []).flatMap((task) => (task.approval_requests || []).map((approval) => this.normalizeApprovalRecord(approval, task)));
    try {
      const stored = this.taskRuntimeDb ? await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.APPROVALS) : [];
      const byId = new Map();
      [...stored, ...taskApprovals].forEach((approval) => {
        const normalized = this.normalizeApprovalRecord(approval);
        byId.set(normalized.approval_id, normalized);
      });
      this.approvalRecords = Array.from(byId.values()).sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
      this.activeApprovalId = this.pendingApprovalRecords()[0]?.approval_id || this.approvalRecords[0]?.approval_id || '';
    } catch {
      this.approvalRecords = taskApprovals;
      this.activeApprovalId = this.pendingApprovalRecords()[0]?.approval_id || this.approvalRecords[0]?.approval_id || '';
    }
  },

  normalizeApprovalRecord(approval, task = null) {
    const now = new Date().toISOString();
    const command = approval.command || approval.action || approval.title || 'действие';
    return {
      approval_id: approval.approval_id || this.generateWorkspaceId('APPROVAL'),
      task_id: approval.task_id || task?.task_id || '',
      project_id: approval.project_id || task?.project_id || '',
      device_id: approval.device_id || '',
      capability_id: approval.capability_id || '',
      source: approval.source || (approval.device_id ? 'device_hub' : 'workspace'),
      action_type: approval.action_type || 'dangerous_command',
      action: approval.action || command,
      command,
      title: approval.title || this.approvalTitle(command),
      reason: approval.reason || 'Действие требует решения владельца.',
      risk_level: approval.risk_level || this.classifyApprovalRisk(command),
      status: approval.status || 'manual_required',
      requested_by: approval.requested_by || 'user',
      forbidden_actions: Array.isArray(approval.forbidden_actions) ? approval.forbidden_actions : this.detectForbiddenActions(command),
      impact: approval.impact || 'В v1 действие не выполняется автоматически.',
      rollback_note: approval.rollback_note || 'Rollback не требуется, потому что выполнение не запускается.',
      execution_allowed: false,
      execution_result: approval.execution_result || 'not_executed',
      typed_confirmation_required: approval.typed_confirmation_required ?? this.requiresTypedConfirmation(command),
      owner_decision: approval.owner_decision || '',
      decision_note: approval.decision_note || '',
      created_at: approval.created_at || now,
      updated_at: approval.updated_at || approval.created_at || now,
      resolved_at: approval.resolved_at || '',
      schema_version: Number(approval.schema_version || 0),
      migration_status: approval.migration_status || '',
      schema_updated_at: approval.schema_updated_at || ''
    };
  },

  approvalTitle(command) {
    const normalized = String(command || '').trim();
    if (!normalized) return 'Подтверждение действия';
    return normalized.length > 54 ? `${normalized.slice(0, 54)}...` : normalized;
  },

  classifyApprovalRisk(command) {
    const text = String(command || '').toLowerCase();
    if (/force|format|wipe|delete|удали|remove|defender|firewall|vpn|proxy|network|dns|hosts|route|token|secret|\.env|password|cookie|session/.test(text)) {
      return 'dangerous';
    }
    if (/push|main|deploy|cloudflare|adb|screenshot|home assistant|cast|device/.test(text)) {
      return 'approval_required';
    }
    return 'review';
  },

  detectForbiddenActions(command) {
    const text = String(command || '').toLowerCase();
    const rules = [
      ['delete/remove/удали', /delete|remove|удали/],
      ['deploy/cloudflare', /deploy|деплой|cloudflare/],
      ['push/main/force', /push|main|force/],
      ['.env/secrets/tokens', /\.env|secret|token|api key|password|cookie|session/],
      ['network/vpn/proxy/firewall', /network|vpn|proxy|firewall|dns|hosts|route/],
      ['defender/security', /defender|security|антивирус/]
    ];
    return rules.filter(([, pattern]) => pattern.test(text)).map(([name]) => name);
  },

  requiresTypedConfirmation(command) {
    return this.classifyApprovalRisk(command) === 'dangerous';
  },

  createApprovalRecord(data, task = null) {
    const record = this.normalizeApprovalRecord(data, task);
    const index = this.approvalRecords.findIndex((approval) => approval.approval_id === record.approval_id);
    if (index >= 0) this.approvalRecords[index] = record;
    else this.approvalRecords.unshift(record);
    this.activeApprovalId = record.approval_id;
    if (task) {
      task.approval_requests = Array.isArray(task.approval_requests) ? task.approval_requests : [];
      const taskIndex = task.approval_requests.findIndex((approval) => approval.approval_id === record.approval_id);
      if (taskIndex >= 0) task.approval_requests[taskIndex] = record;
      else task.approval_requests.push(record);
      task.approval_required = record.status;
      if (['manual_required', 'pending'].includes(record.status)) task.status = 'manual_required';
    }
    return record;
  },

  async saveApprovalRecord(record) {
    const normalized = this.normalizeApprovalRecord(record);
    const index = this.approvalRecords.findIndex((approval) => approval.approval_id === normalized.approval_id);
    if (index >= 0) this.approvalRecords[index] = normalized;
    else this.approvalRecords.unshift(normalized);
    const task = this.workTasks.find((item) => item.task_id === normalized.task_id);
    if (task) {
      task.approval_requests = Array.isArray(task.approval_requests) ? task.approval_requests : [];
      const taskIndex = task.approval_requests.findIndex((approval) => approval.approval_id === normalized.approval_id);
      if (taskIndex >= 0) task.approval_requests[taskIndex] = normalized;
      else task.approval_requests.push(normalized);
      task.approval_required = normalized.status;
      task.updated_at = normalized.updated_at;
      const hasPendingApprovals = task.approval_requests.some((approval) => ['manual_required', 'pending'].includes(approval.status));
      if (['denied', 'cancelled', 'plan_prepared'].includes(normalized.status) && !hasPendingApprovals) {
        task.status = task.status === 'manual_required' ? 'context_ready' : task.status;
      }
    }
    if (this.taskRuntimeDb) await this.putRuntimeRecord(TASK_RUNTIME_STORES.APPROVALS, normalized);
    this.saveWorkTasks();
  },

  renderApprovalCenter() {
    const host = document.getElementById('system-approval-center');
    if (!host) return;
    const records = this.approvalRecords || [];
    const pending = this.pendingApprovalRecords();
    const active = records.find((approval) => approval.approval_id === this.activeApprovalId) || pending[0] || records[0] || null;
    if (active) this.activeApprovalId = active.approval_id;
    host.innerHTML = `
      <section class="approval-center-grid">
        <div class="approval-queue">
          <div class="approval-center-head">
            <strong>Очередь</strong>
            <span>${pending.length} ждут решения</span>
          </div>
          ${records.slice(0, 8).map((approval) => this.renderApprovalQueueItem(approval, active)).join('') || '<p class="mission-empty">Approval-запросов пока нет.</p>'}
        </div>
        <div class="approval-detail">
          ${active ? this.renderApprovalDetail(active) : '<p class="mission-empty">Опасные действия будут попадать сюда перед выполнением.</p>'}
        </div>
      </section>
    `;
  },

  renderApprovalQueueItem(approval, active) {
    return `
      <button type="button" class="approval-item ${active?.approval_id === approval.approval_id ? 'active' : ''}" data-approval-center-action="select" data-approval-id="${this.escapeHtml(approval.approval_id)}">
        <span>${this.escapeHtml(APPROVAL_STATUSES[approval.status] || approval.status)}</span>
        <strong>${this.escapeHtml(approval.title)}</strong>
        <small>${this.escapeHtml(APPROVAL_RISK_LEVELS[approval.risk_level] || approval.risk_level)} · ${this.escapeHtml(approval.source)}</small>
      </button>
    `;
  },

  renderApprovalDetail(approval) {
    const task = this.workTasks.find((item) => item.task_id === approval.task_id);
    const device = this.systemDevices.find((item) => item.device_id === approval.device_id);
    return `
      <div class="approval-detail-head">
        <div>
          <span>Подтверждение действия</span>
          <h3>${this.escapeHtml(approval.title)}</h3>
          <p>${this.escapeHtml(approval.reason)}</p>
        </div>
        <strong>${this.escapeHtml(APPROVAL_RISK_LEVELS[approval.risk_level] || approval.risk_level)}</strong>
      </div>
      <dl class="approval-grid">
        <div><dt>Статус</dt><dd>${this.escapeHtml(APPROVAL_STATUSES[approval.status] || approval.status)}</dd></div>
        <div><dt>Источник</dt><dd>${this.escapeHtml(approval.source)}</dd></div>
        <div><dt>Задача</dt><dd>${this.escapeHtml(task?.title || approval.task_id || 'не привязано')}</dd></div>
        <div><dt>Устройство</dt><dd>${this.escapeHtml(device?.name || approval.device_id || 'не привязано')}</dd></div>
        <div><dt>Typed confirm</dt><dd>${approval.typed_confirmation_required ? 'требуется позже' : 'не требуется'}</dd></div>
        <div><dt>Выполнение</dt><dd>${this.escapeHtml(approval.execution_result)}</dd></div>
      </dl>
      <section class="approval-warning">
        <strong>Что заблокировано</strong>
        <p>${this.escapeHtml(approval.forbidden_actions.length ? approval.forbidden_actions.join('; ') : 'опасных ключевых слов не найдено')}</p>
      </section>
      <section class="approval-plan">
        <strong>Безопасный план</strong>
        <textarea readonly>${this.escapeHtml(this.buildApprovalPlanText(approval))}</textarea>
      </section>
      <div class="approval-actions">
        <button type="button" data-approval-center-action="plan" data-approval-id="${this.escapeHtml(approval.approval_id)}">Подготовить план</button>
        <button type="button" data-approval-center-action="deny" data-approval-id="${this.escapeHtml(approval.approval_id)}">Отклонить</button>
        <button type="button" data-approval-center-action="postpone" data-approval-id="${this.escapeHtml(approval.approval_id)}">Отложить</button>
      </div>
    `;
  },

  buildApprovalPlanText(approval) {
    return [
      'Действие не выполнено автоматически.',
      '',
      `Запрос: ${approval.command}`,
      `Риск: ${APPROVAL_RISK_LEVELS[approval.risk_level] || approval.risk_level}`,
      `Источник: ${approval.source}`,
      '',
      'Перед выполнением нужно:',
      '- проверить цель действия;',
      '- проверить затрагиваемые файлы/системы;',
      '- подтвердить отсутствие секретов;',
      '- подготовить rollback;',
      '- выполнить только отдельной задачей с явным approval владельца.',
      '',
      `Rollback: ${approval.rollback_note}`
    ].join('\n');
  },

  async handleApprovalCenterAction(action, button) {
    const approvalId = button?.dataset?.approvalId || this.activeApprovalId;
    const approval = this.approvalRecords.find((record) => record.approval_id === approvalId);
    if (!approval) return;
    if (action === 'select') {
      this.activeApprovalId = approval.approval_id;
      this.renderApprovalCenter();
      return;
    }
    const now = new Date().toISOString();
    const task = this.workTasks.find((item) => item.task_id === approval.task_id);
    if (action === 'plan') {
      approval.status = 'plan_prepared';
      approval.owner_decision = 'plan_prepared';
      approval.decision_note = 'Подготовлен безопасный план. Выполнение не запускалось.';
      approval.resolved_at = now;
      if (task) {
        this.addWorkspaceMessage(task, 'approval_event', 'Approval Center', 'Подготовлен безопасный план вместо выполнения опасного действия.');
        this.createArtifact(task, 'FIX_REQUEST', 'Approval plan', 'Безопасный план для рискованного действия.', this.buildApprovalPlanText(approval), 'approval');
      }
      this.toast('Approval plan подготовлен');
    } else if (action === 'deny') {
      approval.status = 'denied';
      approval.owner_decision = 'denied';
      approval.decision_note = 'Владелец отклонил действие. Выполнение не запускалось.';
      approval.resolved_at = now;
      if (task) this.addWorkspaceMessage(task, 'approval_event', 'Approval Center', 'Опасное действие отклонено.');
      this.toast('Действие отклонено');
    } else if (action === 'postpone') {
      approval.status = 'manual_required';
      approval.owner_decision = 'postponed';
      approval.decision_note = 'Решение отложено.';
      this.toast('Approval отложен');
    }
    approval.updated_at = now;
    approval.execution_allowed = false;
    approval.execution_result = 'not_executed';
    await this.saveApprovalRecord(approval);
    this.renderSystemStatus();
    this.renderWorkTaskCard();
  },

  async loadSystemDevices() {
    const defaults = this.defaultSystemDevices();
    try {
      if (!this.taskRuntimeDb) {
        this.systemDevices = defaults;
        this.activeDeviceId = defaults[0]?.device_id || '';
        return;
      }
      const storedDevices = await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.DEVICES);
      if (!storedDevices.length) {
        this.systemDevices = defaults;
        this.activeDeviceId = defaults[0]?.device_id || '';
        await this.saveSystemDevices();
        return;
      }
      const capabilities = await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.DEVICE_CAPABILITIES);
      const events = await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.DEVICE_EVENTS);
      this.systemDevices = storedDevices.map((device) => {
        const normalized = this.normalizeDevice(device);
        const deviceCapabilities = capabilities.filter((capability) => capability.device_id === normalized.device_id);
        const deviceEvents = events.filter((event) => event.device_id === normalized.device_id);
        if (deviceCapabilities.length) normalized.capabilities = deviceCapabilities.map((capability) => this.normalizeDeviceCapability(capability, normalized));
        if (deviceEvents.length) normalized.events = deviceEvents.map((event) => this.normalizeDeviceEvent(event, normalized));
        return normalized;
      });
      const knownDeviceIds = new Set(this.systemDevices.map((device) => device.device_id));
      const missingDefaults = defaults.filter((device) => !knownDeviceIds.has(device.device_id));
      if (missingDefaults.length) {
        this.systemDevices.push(...missingDefaults);
        await this.saveSystemDevices();
      }
      this.activeDeviceId = this.systemDevices.find((device) => device.device_id === this.activeDeviceId)?.device_id
        || this.systemDevices[0]?.device_id
        || '';
    } catch {
      this.systemDevices = defaults;
      this.activeDeviceId = defaults[0]?.device_id || '';
    }
  },

  defaultSystemDevices() {
    const now = new Date().toISOString();
    return [
      this.normalizeDevice({
        device_id: 'device_terminator_pc',
        name: 'ПК Терминатора',
        type: 'windows_pc',
        connection_type: 'local_runtime',
        trust_level: 'system_device',
        status: 'connected',
        risk_level: 'safe',
        owner_confirmed: true,
        linked_agent_id: TERMINATOR_DEFAULT_AGENT_ID,
        last_seen: now,
        notes: 'Главная рабочая машина и будущий runtime/storage узел.',
        route_role: 'основной runtime и рабочая станция',
        handoff_state: 'активная точка старта',
        capabilities: [
          ['cap_pc_status', 'read_status', 'Показать состояние runtime', 'safe', false],
          ['cap_pc_storage', 'storage_policy', 'Показать storage policy', 'safe', false],
          ['cap_pc_diagnostics', 'safe_diagnostics', 'Безопасные read-only диагностики', 'review', true]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_webapp_browser',
        name: 'WebApp Mina UI',
        type: 'webapp',
        connection_type: 'browser_session',
        trust_level: 'system_device',
        status: 'connected',
        risk_level: 'safe',
        owner_confirmed: true,
        last_seen: now,
        notes: 'Главный экран владельца: Рабочее, Центр управления, Система и Схема Мины.',
        route_role: 'панель управления и точка просмотра статусов',
        handoff_state: 'принимает задачи и показывает next best action',
        capabilities: [
          ['cap_webapp_workspace', 'open_workspace', 'Открыть Рабочее окно', 'safe', false],
          ['cap_webapp_context', 'copy_context_pack', 'Копировать Context Pack вручную', 'safe', false],
          ['cap_webapp_approval', 'approval_review', 'Показать предупреждение Approval', 'review', false]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_pwa_shell',
        name: 'PWA / мобильный вход',
        type: 'pwa_shell',
        connection_type: 'browser_pwa',
        trust_level: 'paired',
        status: 'unknown',
        risk_level: 'safe',
        owner_confirmed: false,
        notes: 'Будущий удобный вход с телефона. Сейчас проверяется оболочка и offline shell, без нативных команд.',
        route_role: 'мобильный контроллер без выполнения опасных действий',
        handoff_state: 'ожидает установки или проверки PWA',
        capabilities: [
          ['cap_pwa_open', 'open_webapp', 'Открыть Mina UI в браузере или PWA', 'safe', false],
          ['cap_pwa_offline', 'offline_shell', 'Показать shell без сети после кеширования', 'safe', false],
          ['cap_pwa_push', 'push_notifications', 'Уведомления позже и только после согласия владельца', 'review', true]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_windows_companion',
        name: 'Windows-компаньон',
        type: 'windows_companion',
        connection_type: 'tray_companion',
        trust_level: 'system_device',
        status: 'not_configured',
        risk_level: 'review',
        owner_confirmed: true,
        notes: 'Будущий tray/установщик: статус агента, быстрый вход, безопасный restart только через Approval.',
        route_role: 'локальная панель статуса Windows',
        handoff_state: 'foundation закрыт, runtime не запускается из WebApp',
        capabilities: [
          ['cap_tray_status', 'read_status', 'Показать статус Local Agent из tray позже', 'safe', false],
          ['cap_tray_open_webapp', 'open_webapp', 'Открыть WebApp из tray', 'safe', false],
          ['cap_tray_restart_agent', 'restart_agent', 'Перезапуск агента только через Guardian и Approval', 'approval_required', true]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_local_agent',
        name: 'Локальный агент Mina',
        type: 'local_agent',
        connection_type: 'bridge_polling',
        trust_level: 'system_device',
        status: 'unknown',
        risk_level: 'review',
        owner_confirmed: true,
        agent_id: TERMINATOR_DEFAULT_AGENT_ID,
        agent_aliases: [TERMINATOR_DEFAULT_AGENT_ID],
        primary_agent: true,
        owned_registry_role: 'primary_runtime_agent',
        storage_root_status: 'unknown',
        notes: 'Runtime-исполнитель. В этом слое команды агенту не отправляются.',
        route_role: 'локальный исполнитель только по разрешённым командам',
        handoff_state: 'ожидает проверки health',
        capabilities: [
          ['cap_agent_health', 'read_status', 'Показать health/status позже', 'safe', false],
          ['cap_agent_file_meta', 'file_metadata', 'Файловая metadata через Local Agent позже', 'review', true]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_owner_phone',
        name: 'Телефон владельца',
        type: 'android_phone',
        connection_type: 'pwa_manual_pairing',
        trust_level: 'owner_device',
        status: 'offline',
        risk_level: 'review',
        owner_confirmed: false,
        notes: 'Телефон владельца как будущий контроллер Mina UI/PWA. Без ADB, без автологина и без команд устройству.',
        route_role: 'устройство владельца для мобильного контроля и продолжения задачи',
        handoff_state: 'ожидает подготовки ссылки подключения',
        capabilities: [
          ['cap_phone_status', 'read_status', 'Показать ручной pairing/status телефона', 'safe', false],
          ['cap_phone_open_url', 'copy_url', 'Скопировать ссылку Mina UI для ручного открытия на телефоне', 'safe', false],
          ['cap_phone_heartbeat', 'phone_heartbeat', 'Online heartbeat телефона позже и только через owner session', 'review', true],
          ['cap_phone_screenshot', 'screenshot', 'Скриншот для evidence позже и только после Approval', 'approval_required', true]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_mission_display',
        name: 'Экран штаба',
        type: 'mission_display',
        connection_type: 'chromecast_or_android_tv',
        trust_level: 'paired',
        status: 'unknown',
        risk_level: 'review',
        owner_confirmed: false,
        notes: 'Будущий Mission Control display на ТВ или Chromecast.',
        route_role: 'вывод Центра управления на внешний экран',
        handoff_state: 'только будущий маршрут',
        capabilities: [
          ['cap_display_status', 'read_status', 'Показать доступность экрана позже', 'safe', false],
          ['cap_display_cast', 'cast_dashboard', 'Вывести Mission Control после approval', 'review', true]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_home_assistant',
        name: 'Home Assistant',
        type: 'smart_home_hub',
        connection_type: 'home_assistant',
        trust_level: 'restricted',
        status: 'unknown',
        risk_level: 'approval_required',
        owner_confirmed: false,
        notes: 'Будущий read-only smart home hub. Управление домом только через Approval.',
        route_role: 'будущий read-only статус дома',
        handoff_state: 'заблокировано до отдельного решения владельца',
        capabilities: [
          ['cap_ha_status', 'read_status', 'Read-only sensors/status позже', 'safe', false],
          ['cap_ha_scene', 'run_scene', 'Запустить сцену только через Approval', 'approval_required', true]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_usb_devices',
        name: 'USB устройства',
        type: 'usb_bus',
        connection_type: 'manual_allowlist',
        trust_level: 'restricted',
        status: 'not_configured',
        risk_level: 'review',
        owner_confirmed: false,
        notes: 'Будущий adapter для USB/COM. В v1 только паспорт и политика доверия.',
        route_role: 'ручной allowlist USB/COM устройств',
        handoff_state: 'не настроено',
        capabilities: [
          ['cap_usb_list', 'read_status', 'Показать trusted USB devices позже', 'safe', false],
          ['cap_usb_serial', 'usb_serial_readonly', 'Read-only COM telemetry позже', 'review', true]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_network_allowlist',
        name: 'Network allowlist',
        type: 'network_allowlist',
        connection_type: 'manual_allowlist_only',
        trust_level: 'restricted',
        status: 'not_configured',
        risk_level: 'approval_required',
        owner_confirmed: false,
        notes: 'Никакого хаотичного network scan. Только ручной allowlist после approval.',
        route_role: 'ручной allowlist сетевых устройств',
        handoff_state: 'заблокировано без отдельного approval',
        capabilities: [
          ['cap_network_status', 'read_status', 'Показать allowlisted endpoints позже', 'safe', false],
          ['cap_network_connect', 'connect_allowlisted_device', 'Подключаться только к owner-approved устройствам', 'approval_required', true]
        ]
      })
    ];
  },

  normalizeDevice(device) {
    const now = new Date().toISOString();
    const normalized = {
      device_id: device.device_id || this.generateWorkspaceId('DEVICE'),
      name: device.name || 'Устройство',
      type: device.type || 'unknown',
      connection_type: device.connection_type || 'manual',
      trust_level: device.trust_level || 'unknown',
      status: device.status || 'unknown',
      risk_level: device.risk_level || 'review',
      fingerprint: device.fingerprint || `${device.type || 'device'}:${device.connection_type || 'manual'}:${device.device_id || 'local'}`,
      agent_id: device.agent_id || '',
      agent_aliases: Array.isArray(device.agent_aliases) ? device.agent_aliases : [],
      linked_agent_id: device.linked_agent_id || '',
      primary_agent: Boolean(device.primary_agent),
      owned_registry_role: device.owned_registry_role || '',
      heartbeat_status: device.heartbeat_status || '',
      heartbeat_stale: Boolean(device.heartbeat_stale),
      heartbeat_age_ms: device.heartbeat_age_ms === null || device.heartbeat_age_ms === undefined ? null : Number(device.heartbeat_age_ms),
      heartbeat_bridge_seen_at: device.heartbeat_bridge_seen_at || '',
      heartbeat_version: device.heartbeat_version || '',
      poll_interval_ms: device.poll_interval_ms === null || device.poll_interval_ms === undefined ? null : Number(device.poll_interval_ms),
      storage_root_status: device.storage_root_status || '',
      runtime_capabilities: Array.isArray(device.runtime_capabilities) ? device.runtime_capabilities : [],
      capabilities: [],
      events: [],
      last_seen: device.last_seen || '',
      first_seen: device.first_seen || now,
      owner_confirmed: Boolean(device.owner_confirmed),
      notes: device.notes || 'не задано',
      route_role: device.route_role || 'наблюдение и статус',
      handoff_state: device.handoff_state || 'не запускалось',
      safe_action_policy: device.safe_action_policy || 'только read-only и локальные заметки без реального выполнения',
      linked_project_ids: Array.isArray(device.linked_project_ids) ? device.linked_project_ids : [],
      linked_task_ids: Array.isArray(device.linked_task_ids) ? device.linked_task_ids : [],
      created_at: device.created_at || now,
      updated_at: device.updated_at || now,
      schema_version: Number(device.schema_version || 0),
      migration_status: device.migration_status || '',
      schema_updated_at: device.schema_updated_at || ''
    };
    const rawCapabilities = Array.isArray(device.capabilities) ? device.capabilities : [];
    normalized.capabilities = rawCapabilities.map((capability) => {
      if (Array.isArray(capability)) {
        return this.normalizeDeviceCapability({
          capability_id: capability[0],
          name: capability[1],
          description: capability[2],
          risk_level: capability[3],
          requires_approval: capability[4]
        }, normalized);
      }
      return this.normalizeDeviceCapability(capability, normalized);
    });
    normalized.events = Array.isArray(device.events) ? device.events.map((event) => this.normalizeDeviceEvent(event, normalized)) : [];
    if (!normalized.events.length) {
      normalized.events.push(this.normalizeDeviceEvent({
        event_id: this.generateWorkspaceId('DEVENT'),
        type: 'device_registered',
        text: 'Устройство добавлено в локальный реестр.',
        risk_level: 'safe',
        created_at: normalized.created_at
      }, normalized));
    }
    return normalized;
  },

  normalizeDeviceCapability(capability, device) {
    return {
      capability_id: capability.capability_id || this.generateWorkspaceId('CAP'),
      device_id: capability.device_id || device.device_id,
      name: capability.name || 'read_status',
      description: capability.description || 'не задано',
      risk_level: capability.risk_level || 'review',
      requires_approval: Boolean(capability.requires_approval),
      requires_owner_presence: Boolean(capability.requires_owner_presence),
      adapter: capability.adapter || device.connection_type || 'manual',
      available: Boolean(capability.available),
      last_checked: capability.last_checked || '',
      schema_version: Number(capability.schema_version || 0),
      migration_status: capability.migration_status || '',
      schema_updated_at: capability.schema_updated_at || ''
    };
  },

  normalizeDeviceEvent(event, device) {
    return {
      event_id: event.event_id || this.generateWorkspaceId('DEVENT'),
      device_id: event.device_id || device.device_id,
      type: event.type || 'device_event',
      text: event.text || 'событие',
      created_at: event.created_at || new Date().toISOString(),
      actor: event.actor || 'System',
      risk_level: event.risk_level || 'safe',
      linked_task_id: event.linked_task_id || '',
      linked_approval_id: event.linked_approval_id || '',
      schema_version: Number(event.schema_version || 0),
      migration_status: event.migration_status || '',
      schema_updated_at: event.schema_updated_at || ''
    };
  },

  getActiveDevice() {
    return this.systemDevices.find((device) => device.device_id === this.activeDeviceId) || this.systemDevices[0] || null;
  },

  async saveSystemDevices() {
    if (!this.taskRuntimeDb) return;
    const devices = this.systemDevices.map((device) => {
      const normalized = this.normalizeDevice(device);
      return {
        ...normalized,
        capabilities: normalized.capabilities,
        events: normalized.events
      };
    });
    const capabilities = devices.flatMap((device) => device.capabilities.map((capability) => ({ ...capability, device_id: device.device_id })));
    const events = devices.flatMap((device) => device.events.map((event) => ({ ...event, device_id: device.device_id })));
    await this.putRuntimeRecords(TASK_RUNTIME_STORES.DEVICES, devices);
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.DEVICE_CAPABILITIES, capabilities);
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.DEVICE_EVENTS, events);
  },

  addDeviceEvent(device, type, text, riskLevel = 'safe') {
    const event = this.normalizeDeviceEvent({
      type,
      text,
      risk_level: riskLevel,
      created_at: new Date().toISOString()
    }, device);
    device.events = Array.isArray(device.events) ? device.events : [];
    device.events.push(event);
    device.updated_at = event.created_at;
    return event;
  },

  async handleDeviceAction(action, button) {
    const deviceId = button?.dataset?.deviceId || this.activeDeviceId;
    const device = this.systemDevices.find((item) => item.device_id === deviceId);
    if (!device) return;
    this.activeDeviceId = device.device_id;
    if (action === 'refresh_owned_registry') {
      await this.probePublicRuntimeHealth();
      this.renderSystemStatus();
      this.toast('Реестр владельца обновлён');
      return;
    }
    if (action === 'copy_owned_registry_report') {
      await this.copyWorkspaceText(this.buildOwnedAgentRegistryReport());
      this.toast('Паспорт реестра владельца скопирован');
      return;
    }
    if (action === 'prepare_phone_pairing') {
      const now = new Date().toISOString();
      if (!this.devicePairingState) this.loadDevicePairingState();
      this.devicePairingState.phone.pairing_status = 'link_ready';
      this.devicePairingState.phone.pairing_url = this.currentPhonePairingUrl();
      this.devicePairingState.phone.note = 'Ссылка подключения подготовлена. Телефон станет “на связи” только после отдельного heartbeat/подтверждённого входа.';
      this.devicePairingState.status = 'partial';
      this.devicePairingState.updated_at = now;
      if (device) this.addDeviceEvent(device, 'phone_pairing_link_ready', 'Подготовлена ссылка для ручного открытия Mina UI на телефоне. Команды телефону не отправлялись.', 'safe');
      await this.syncDevicePresenceState({ silent: true });
      this.renderSystemStatus();
      this.toast('Ссылка телефона подготовлена');
      return;
    }
    if (action === 'copy_phone_pairing_link') {
      if (!this.devicePairingState) this.loadDevicePairingState();
      if (this.devicePairingState.phone.pairing_status === 'not_started') {
        this.devicePairingState.phone.pairing_status = 'link_ready';
        this.devicePairingState.phone.pairing_url = this.currentPhonePairingUrl();
        this.saveDevicePairingState();
      }
      await this.copyWorkspaceText(this.devicePairingState.phone.pairing_url);
      this.toast('Ссылка для телефона скопирована');
      return;
    }
    if (action === 'mark_phone_pairing_manual') {
      const now = new Date().toISOString();
      if (!this.devicePairingState) this.loadDevicePairingState();
      this.devicePairingState.phone.pairing_status = 'manual_confirmed';
      this.devicePairingState.phone.owner_confirmed_at = now;
      this.devicePairingState.phone.presence_status = 'offline';
      this.devicePairingState.phone.note = 'Владелец отметил ручной вход. Online heartbeat телефона пока не подключён, поэтому статус присутствия остаётся честно offline.';
      this.devicePairingState.handoff.status = 'route_ready';
      this.devicePairingState.handoff.last_handoff_at = now;
      if (device) this.addDeviceEvent(device, 'phone_manual_pairing_confirmed', 'Владелец отметил, что Mina UI открыта на телефоне. Online heartbeat не подделывался.', 'safe');
      await this.syncDevicePresenceState({ silent: true });
      this.renderSystemStatus();
      this.toast('Ручной вход телефона отмечен');
      return;
    }
    if (action === 'refresh_device_presence') {
      await this.syncDevicePresenceState({ silent: true });
      this.renderSystemStatus();
      this.toast('Присутствие устройств обновлено');
      return;
    }
    if (action === 'copy_device_presence_report') {
      await this.copyWorkspaceText(this.buildDevicePresenceReport());
      this.toast('Отчёт присутствия устройств скопирован');
      return;
    }
    if (action === 'refresh_mesh') {
      const now = new Date().toISOString();
      this.systemDevices = (this.systemDevices || []).map((item) => {
        const next = this.normalizeDevice(item);
        if (['device_terminator_pc', 'device_webapp_browser'].includes(next.device_id)) {
          next.status = 'connected';
          next.last_seen = now;
          next.handoff_state = next.device_id === 'device_webapp_browser'
            ? 'готов показывать задачи и статусы'
            : 'активная точка старта';
        }
        if (next.device_id === 'device_pwa_shell') {
          const pwa = this.pwaSnapshot();
          next.status = pwa.installed || pwa.serviceWorker === 'registered' ? 'ready' : 'unknown';
          next.handoff_state = pwa.installed ? 'готов к мобильному входу' : 'ожидает установки или проверки PWA';
        }
        this.addDeviceEvent(next, 'mesh_refresh', 'Device Mesh обновлён безопасно: реальные команды устройствам не отправлялись.', 'safe');
        return next;
      });
      await this.saveSystemDevices();
      this.renderSystemStatus();
      this.toast('Device Mesh обновлён без команд устройствам');
      return;
    }
    if (action === 'copy_mesh_report') {
      await this.copyWorkspaceText(this.buildDeviceMeshReport());
      this.toast('Отчёт Device Mesh скопирован');
      return;
    }
    if (action === 'open_legs_scheme') {
      this.go('system');
      this.activeMinaSchemeZone = 'legs';
      this.saveMinaSchemeState();
      this.renderMinaSystemScheme();
      window.setTimeout(() => document.getElementById('mina-system-scheme')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      return;
    }
    if (action === 'select' || action === 'passport') {
      this.renderSystemDevicePreview();
      return;
    }
    if (action === 'check') {
      const now = new Date().toISOString();
      if (device.device_id === 'device_terminator_pc') {
        device.status = 'connected';
        device.last_seen = now;
      }
      this.addDeviceEvent(device, 'health_check_preview', 'Safe preview: реальные команды и адаптеры не запускались.', 'safe');
      this.toast('Проверка устройства записана как safe preview');
    }
    if (action === 'trust') {
      device.owner_confirmed = true;
      device.trust_level = device.device_id === 'device_owner_phone' ? 'owner_device' : 'trusted';
      device.status = device.status === 'unknown' ? 'pending_trust' : device.status;
      this.addDeviceEvent(device, 'device_trust_changed', 'Доверие отмечено локально. Реальное подключение не запускалось.', 'review');
      this.toast('Устройство отмечено доверенным локально');
    }
    if (action === 'restrict') {
      device.trust_level = 'restricted';
      this.addDeviceEvent(device, 'device_trust_changed', 'Устройство переведено в ограниченный режим.', 'review');
      this.toast('Устройство ограничено');
    }
    if (action === 'create_pairing_note') {
      device.handoff_state = device.device_id === 'device_owner_phone'
        ? 'создана заметка: владелец подключит телефон вручную позже'
        : 'создана заметка подключения без реального сопряжения';
      this.addDeviceEvent(device, 'pairing_note_created', 'Создана локальная заметка подключения. Pairing, ADB, сеть и smart home не запускались.', 'safe');
      this.toast('Заметка подключения создана');
    }
    if (action === 'request_capability_approval') {
      const capabilityId = button?.dataset?.capabilityId || '';
      const capability = (device.capabilities || []).find((item) => item.capability_id === capabilityId);
      if (!capability) return;
      const approval = this.createApprovalRecord({
        device_id: device.device_id,
        capability_id: capability.capability_id,
        source: 'device_hub',
        action_type: 'device_capability',
        action: capability.name,
        command: `${device.name}: ${capability.name}`,
        title: `${device.name}: ${capability.name}`,
        reason: capability.description,
        risk_level: capability.risk_level || 'approval_required',
        impact: 'В v1 создаётся только Approval-запрос. Команда устройству не отправляется.',
        rollback_note: 'Выполнение не запускалось; rollback не требуется.'
      });
      this.addDeviceEvent(device, 'approval_required', `Создан Approval: ${approval.title}`, approval.risk_level);
      await this.saveApprovalRecord(approval);
      this.toast('Approval создан, действие не запускалось');
    }
    device.updated_at = new Date().toISOString();
    await this.saveSystemDevices();
    this.renderSystemStatus();
  },

  async loadWorkTasks() {
    try {
      if (this.taskRuntimeDb) {
        const tasks = await this.getAllRuntimeRecords(TASK_RUNTIME_STORES.TASKS);
        const indexedTasks = Array.isArray(tasks) ? tasks.filter((task) => task?.task_id).map((task) => this.normalizeWorkTask(task)) : [];
        const mirrorTasks = this.readLocalWorkTasks();
        const merged = this.mergeWorkTaskLists(indexedTasks, mirrorTasks);
        this.workTasks = merged.tasks;
        if (merged.changed) {
          await this.persistRuntimeSnapshot();
        }
      } else {
        this.workTasks = this.readLocalWorkTasks();
      }
      this.workTasks.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
      this.activeWorkTaskId = this.workTasks[0]?.task_id || '';
    } catch {
      this.workTasks = [];
      this.activeWorkTaskId = '';
    }
  },

  readLocalWorkTasks() {
    try {
      const raw = window.localStorage?.getItem(WORK_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((task) => task?.task_id).map((task) => this.normalizeWorkTask(task)) : [];
    } catch {
      return [];
    }
  },

  mergeWorkTaskLists(primaryTasks, mirrorTasks) {
    const byId = new Map();
    let changed = false;
    const put = (task, source) => {
      if (!task?.task_id) return;
      const existing = byId.get(task.task_id);
      if (!existing) {
        byId.set(task.task_id, task);
        if (source === 'mirror') changed = true;
        return;
      }
      const existingTime = this.taskUpdatedTime(existing);
      const taskTime = this.taskUpdatedTime(task);
      if (taskTime > existingTime) {
        byId.set(task.task_id, task);
        if (source === 'mirror') changed = true;
      }
    };
    (primaryTasks || []).forEach((task) => put(task, 'primary'));
    (mirrorTasks || []).forEach((task) => put(task, 'mirror'));
    const tasks = Array.from(byId.values()).sort((a, b) => this.taskUpdatedTime(b) - this.taskUpdatedTime(a));
    return {
      tasks,
      changed: changed || tasks.length !== (primaryTasks || []).length
    };
  },

  taskUpdatedTime(task) {
    const date = new Date(task?.updated_at || task?.created_at || 0);
    const time = date.getTime();
    return Number.isNaN(time) ? 0 : time;
  },

  normalizeWorkTask(task) {
    const now = new Date().toISOString();
    task.goal = task.goal || task.user_request || task.title || 'не задано';
    task.messages = Array.isArray(task.messages) ? task.messages : [];
    task.events = Array.isArray(task.events) ? task.events : [];
    task.files = Array.isArray(task.files) ? task.files : [];
    task.artifacts = Array.isArray(task.artifacts) ? task.artifacts : [];
    task.audit_log = Array.isArray(task.audit_log) ? task.audit_log : [];
    task.executor_state = task.executor_state && typeof task.executor_state === 'object'
      ? task.executor_state
      : {
          executor: task.executor || 'не назначен',
          status: 'not_sent',
          package_artifact_id: '',
          sent_by_user_at: '',
          timer_started_at: task.timer_started_at || '',
          timer_stopped_at: task.timer_stopped_at || '',
          report_artifact_id: ''
        };
    task.memory_preview = task.memory_preview && typeof task.memory_preview === 'object'
      ? task.memory_preview
      : {
          status: task.memory_status || 'ожидает данных',
          summary: '',
          decisions: [],
          risks: task.risks || [],
          next_step: task.next_step || '',
          linked_artifact_ids: [],
          linked_file_ids: []
        };
    task.approval_requests = Array.isArray(task.approval_requests) ? task.approval_requests : [];
    task.brain_council = task.brain_council && typeof task.brain_council === 'object'
      ? task.brain_council
      : {
          status: 'not_started',
          prompt_packages: [],
          answers: [],
          comparison: null,
          strategist_synthesis: null,
          integrity_status: 'not_checked',
          updated_at: ''
        };
    task.brain_council.prompt_packages = Array.isArray(task.brain_council.prompt_packages) ? task.brain_council.prompt_packages : [];
    task.brain_council.answers = Array.isArray(task.brain_council.answers) ? task.brain_council.answers : [];
    this.ensureResearchOpsState(task);
    task.project_id = task.project_id || 'terminator';
    task.eyes_visual_checks = Array.isArray(task.eyes_visual_checks)
      ? task.eyes_visual_checks.map((check) => this.normalizeEyesVisualCheck({
          ...check,
          task_id: check.task_id || task.task_id,
          project_id: check.project_id || task.project_id
        }))
      : [];
    task.hands_action_plans = Array.isArray(task.hands_action_plans)
      ? task.hands_action_plans.map((plan) => this.normalizeHandsActionPlan({
          ...plan,
          task_id: plan.task_id || task.task_id,
          project_id: plan.project_id || task.project_id
        }, task))
      : [];
    task.controlled_apply_packages = Array.isArray(task.controlled_apply_packages)
      ? task.controlled_apply_packages.map((pack) => this.normalizeControlledApplyPackage({
          ...pack,
          task_id: pack.task_id || task.task_id,
          project_id: pack.project_id || task.project_id
        }, task))
      : [];
    task.handoff_records = Array.isArray(task.handoff_records)
      ? task.handoff_records.map((record) => this.normalizeHandoffRecord({
          ...record,
          task_id: record.task_id || task.task_id,
          project_id: record.project_id || task.project_id
        }, task))
      : [];
    task.teleport_packages = Array.isArray(task.teleport_packages)
      ? task.teleport_packages.map((pack) => this.normalizeTeleportPackage({
          ...pack,
          task_id: pack.task_id || task.task_id,
          project_id: pack.project_id || task.project_id
        }, task))
      : [];
    task.input_source = task.input_source || 'keyboard';
    task.original_transcript = task.original_transcript || '';
    task.normalized_text = task.normalized_text || task.user_request || task.goal || '';
    task.intent_preview = task.intent_preview && typeof task.intent_preview === 'object'
      ? task.intent_preview
      : {
          transcript: task.original_transcript || '',
          intent: 'create_task',
          entities: {},
          confidence: 'manual',
          risk: 'safe',
          status: 'confirmed'
        };
    task.voice_event_type = task.voice_event_type || '';
    task.device_context = task.device_context && typeof task.device_context === 'object'
      ? task.device_context
      : {
          device_ids: [],
          required_capabilities: [],
          device_events: []
        };
    task.runtime = task.runtime && typeof task.runtime === 'object'
      ? task.runtime
      : {
          schema_version: 1,
          source: 'task_runtime_v1',
          persistence: this.taskRuntimeReady ? 'indexeddb' : 'localStorage_fallback'
        };
    task.sync_status = task.sync_status || 'local_only';
    task.task_store_status = task.task_store_status || task.sync_status;
    task.task_store_revision = Number(task.task_store_revision || task.sync_revision || 0);
    task.server_updated_at = task.server_updated_at || '';
    this.ensureTaskStorageManifest(task);
    task.timer_started_at = task.timer_started_at || task.executor_state.timer_started_at || '';
    task.timer_stopped_at = task.timer_stopped_at || task.executor_state.timer_stopped_at || '';
    task.updated_at = task.updated_at || now;
    task.created_at = task.created_at || now;
    task.schema_version = Number(task.schema_version || task.runtime?.schema_version || 0);
    task.migration_status = task.migration_status || '';
    task.schema_updated_at = task.schema_updated_at || '';
    task.executor = task.executor || task.executor_state.executor || 'не назначен';
    task.messages = task.messages.map((message) => ({
      ...message,
      message_id: message.message_id || this.generateWorkspaceId('MSG'),
      task_id: task.task_id,
      created_at: message.created_at || now,
      attachments: Array.isArray(message.attachments) ? message.attachments : [],
      linked_artifacts: Array.isArray(message.linked_artifacts) ? message.linked_artifacts : []
    }));
    task.events = task.events.map((event) => this.normalizeTaskEvent(event, task));
    task.artifacts = task.artifacts.map((artifact) => ({
      ...artifact,
      artifact_id: artifact.artifact_id || this.generateWorkspaceId('ART'),
      task_id: task.task_id,
      project_id: task.project_id,
      created_at: artifact.created_at || now,
      linked_file_ids: Array.isArray(artifact.linked_file_ids) ? artifact.linked_file_ids : [],
      linked_evidence_ids: Array.isArray(artifact.linked_evidence_ids) ? artifact.linked_evidence_ids : [],
      version: artifact.version || 1,
      status: artifact.status || 'draft'
    }));
    task.approval_requests = task.approval_requests.map((approval) => this.normalizeApprovalRecord(approval, task));
    task.files = task.files.map((file) => {
      const normalizedFile = {
        ...file,
        file_id: file.file_id || this.generateWorkspaceId('FILE'),
        task_id: task.task_id,
        project_id: task.project_id,
        role: file.role || 'attachment',
        status: file.status || 'attached',
        is_evidence: Boolean(file.is_evidence || file.role === 'evidence'),
        notes: file.notes || '',
        hash_algorithm: file.hash_algorithm || 'SHA-256',
        sha256: file.sha256 || '',
        hash_status: file.hash_status || (file.sha256 ? 'calculated_session' : 'pending_local_agent'),
        raw_file_saved: false
      };
      if (!normalizedFile.storage_ref) this.updateFileStorageRef(task, normalizedFile);
      return normalizedFile;
    });
    return task;
  },

  saveWorkTasks() {
    try {
      window.localStorage?.setItem(WORK_STORAGE_KEY, JSON.stringify(this.workTasks.slice(0, 50)));
    } catch {
      this.toast('Локальное сохранение недоступно');
    }
    if (this.taskRuntimeDb) {
      this.runtimeSavePromise = this.persistRuntimeSnapshot().catch((error) => {
        console.warn('[MinaWebApp] Task Runtime save failed', error);
        this.taskRuntimeFallback = true;
      });
    }
    this.scheduleTaskStoreSync();
    this.renderMissionControl();
    this.renderSystemStatus();
  },

  async flushRuntimeSave() {
    if (this.runtimeSavePromise) await this.runtimeSavePromise;
  },

  scheduleTaskStoreSync() {
    if (this.taskStoreSyncRunning) return;
    const baseUrl = getConfiguredDirectBridgeBaseUrl();
    if (!baseUrl || !hasStoredOwnerSession(baseUrl)) {
      this.taskStoreSyncStatus = baseUrl ? 'owner_session_required' : 'not_configured';
      this.persistTaskStoreSyncState();
      return;
    }

    window.clearTimeout(this.taskStoreSyncTimer);
    this.taskStoreSyncTimer = window.setTimeout(() => {
      this.syncTaskStore({ interactive: false, reason: 'debounced_save' });
    }, TASK_STORE_SYNC_DEBOUNCE_MS);
  },

  startBackgroundTaskStoreSync(reason = 'background') {
    window.setTimeout(() => {
      void this.syncTaskStore({ interactive: false, reason });
    }, 0);
  },

  async syncTaskStore(options = {}) {
    const interactive = Boolean(options.interactive);
    const baseUrl = getConfiguredDirectBridgeBaseUrl();
    if (!baseUrl) {
      this.taskStoreSyncStatus = 'not_configured';
      this.taskStoreSyncError = 'Direct Bridge URL не задан';
      this.persistTaskStoreSyncState();
      return { ok: false, reason: 'bridge_unconfigured' };
    }

    let token = null;
    try {
      token = interactive
        ? await ensureOwnerSession(baseUrl, { interactive: true })
        : getStoredOwnerSession(baseUrl)?.token;
    } catch (error) {
      console.warn('[MinaWebApp] Owner session failed', error);
      this.taskStoreSyncStatus = 'owner_session_required';
      this.taskStoreSyncError = getOwnerSessionErrorMessage(error);
      this.persistTaskStoreSyncState();
      this.renderMissionControl();
      this.renderSystemStatus();
      if (interactive) this.toast(this.taskStoreSyncError, 5200);
      return { ok: false, reason: 'owner_session_failed', error };
    }

    if (!token) {
      this.taskStoreSyncStatus = 'owner_session_required';
      this.taskStoreSyncError = interactive ? OWNER_SESSION_REQUIRED_MESSAGE : '';
      this.persistTaskStoreSyncState();
      this.renderMissionControl();
      this.renderSystemStatus();
      return { ok: false, reason: 'owner_session_required' };
    }

    if (this.taskStoreSyncRunning) return { ok: false, reason: 'sync_running' };
    this.taskStoreSyncRunning = true;
    this.taskStoreSyncStatus = 'syncing';
    this.taskStoreSyncError = '';
    this.persistTaskStoreSyncState();
    this.renderMissionControl();
    this.renderSystemStatus();
    this.renderMinaSystemScheme();

    try {
      await this.flushRuntimeSave();
      const localTasks = (this.workTasks || [])
        .map((task) => this.serializeTaskForTaskStore(task))
        .slice(0, TASK_STORE_SYNC_MAX_TASKS);

      for (const task of localTasks) {
        const result = await directTaskStoreRequest(`/tasks/${encodeURIComponent(task.task_id)}`, {
          method: 'PUT',
          token,
          body: { task },
          idempotent: true,
          interactive,
          timeoutMs: 45000
        });
        if (result?.task) {
          const index = this.workTasks.findIndex((item) => item.task_id === task.task_id);
          if (index >= 0) {
            this.workTasks[index] = this.normalizeWorkTask({
              ...this.workTasks[index],
              task_store_revision: result.sync_revision,
              sync_status: 'synced',
              server_updated_at: result.task.server_updated_at || result.summary?.server_updated_at || new Date().toISOString()
            });
          }
        }
      }

      const remote = await directTaskStoreRequest('/tasks?full=1', {
        method: 'GET',
        token,
        interactive,
        timeoutMs: 45000
      });
      const remoteTasks = Array.isArray(remote?.tasks)
        ? remote.tasks.filter((task) => task?.task_id).map((task) => this.normalizeWorkTask({
            ...task,
            sync_status: 'synced',
            task_store_revision: task.sync_revision || task.task_store_revision || 0
          }))
        : [];
      const merged = this.mergeWorkTaskLists(remoteTasks, this.workTasks || []);
      this.workTasks = merged.tasks.map((task) => this.normalizeWorkTask({
        ...task,
        sync_status: 'synced',
        task_store_status: 'synced'
      }));
      if (!this.workTasks.some((task) => task.task_id === this.activeWorkTaskId)) {
        this.activeWorkTaskId = this.workTasks[0]?.task_id || '';
      }

      try {
        window.localStorage?.setItem(WORK_STORAGE_KEY, JSON.stringify(this.workTasks.slice(0, 50)));
      } catch {}
      await this.persistRuntimeSnapshot();

      this.taskStoreSyncStatus = 'synced';
      this.taskStoreLastSyncAt = new Date().toISOString();
      this.taskStoreSyncError = '';
      this.taskStoreLastTaskCount = this.workTasks.length;
      this.persistTaskStoreSyncState();
      this.renderWorkTaskCard();
      this.renderMissionControl();
      this.renderSystemStatus();
      if (interactive) this.toast('Задачи синхронизированы');
      return { ok: true, task_count: this.workTasks.length };
    } catch (error) {
      console.warn('[MinaWebApp] TaskStore sync failed', error);
      this.taskStoreSyncStatus = 'failed';
      this.taskStoreSyncError = error?.message || 'Синхронизация задач не прошла';
      this.persistTaskStoreSyncState();
      this.renderMissionControl();
      this.renderSystemStatus();
      if (interactive) this.toast('Синхронизация задач не прошла');
      return { ok: false, reason: 'sync_failed', error };
    } finally {
      this.taskStoreSyncRunning = false;
      this.persistTaskStoreSyncState();
      this.renderMissionControl();
      this.renderSystemStatus();
      if (interactive) {
        window.setTimeout(() => closeDirectBridgePopupTransport(baseUrl), 1500);
      }
    }
  },

  serializeTaskForTaskStore(task) {
    const normalized = this.normalizeWorkTask({ ...task });
    return {
      ...normalized,
      sync_status: normalized.sync_status || 'pending_sync',
      runtime: {
        ...(normalized.runtime || {}),
        task_store: 'direct_bridge_task_store',
        local_cache: this.taskRuntimeReady ? 'indexeddb' : 'localStorage_fallback'
      }
    };
  },

  async persistRuntimeSnapshot() {
    if (!this.taskRuntimeDb) return;
    const tasks = (this.workTasks || []).map((task) => this.normalizeWorkTask({ ...task }));
    await this.putRuntimeRecords(TASK_RUNTIME_STORES.TASKS, tasks);

    const messages = tasks.flatMap((task) => (task.messages || []).map((message) => ({ ...message, project_id: task.project_id })));
    const artifacts = tasks.flatMap((task) => (task.artifacts || []));
    const files = tasks.flatMap((task) => (task.files || []));
    const taskApprovals = tasks.flatMap((task) => (task.approval_requests || []).map((approval) => this.normalizeApprovalRecord(approval, task)));
    const approvalMap = new Map();
    [...(this.approvalRecords || []), ...taskApprovals].forEach((approval) => {
      const normalized = this.normalizeApprovalRecord(approval);
      approvalMap.set(normalized.approval_id, normalized);
    });
    const approvals = Array.from(approvalMap.values());
    this.approvalRecords = approvals.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
    const memory = tasks
      .filter((task) => task.memory_preview)
      .map((task) => ({
        memory_id: `MEMORY-${task.task_id}`,
        task_id: task.task_id,
        project_id: task.project_id,
        status: task.memory_preview?.status || task.memory_status || 'draft',
        preview: task.memory_preview,
        updated_at: task.updated_at || new Date().toISOString()
      }));
    const events = tasks.flatMap((task) => this.buildRuntimeEventsFromTask(task));

    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.MESSAGES, messages);
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.ARTIFACTS, artifacts);
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.FILES, files);
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.APPROVALS, approvals);
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.MEMORY, memory);
    await this.replaceRuntimeStoreRecords(TASK_RUNTIME_STORES.EVENTS, events);
    await this.saveRuntimeMeta({
      key: WORK_RUNTIME_META_KEY,
      version: WORK_RUNTIME_DB_VERSION,
      updated_at: new Date().toISOString(),
      task_count: tasks.length,
      project_count: (this.workProjects || []).length,
      runtime: 'indexeddb'
    });
  },

  buildRuntimeEventsFromTask(task) {
    if (Array.isArray(task.events) && task.events.length) {
      return task.events.map((event) => this.normalizeTaskEvent(event, task));
    }

    const audit = (task.audit_log || []).map((text, index) => ({
      event_id: `${task.task_id}-AUDIT-${index}`,
      task_id: task.task_id,
      project_id: task.project_id,
      type: 'audit',
      text,
      actor: 'system',
      risk_level: 'safe',
      created_at: task.updated_at || task.created_at
    }));
    const messages = (task.messages || []).map((message) => ({
      event_id: `${task.task_id}-${message.message_id}`,
      task_id: task.task_id,
      project_id: task.project_id,
      type: message.type || 'message',
      text: message.text || '',
      actor: message.author || 'workspace',
      risk_level: message.type === 'approval_event' ? 'approval_required' : 'safe',
      created_at: message.created_at || task.updated_at
    }));
    return [...audit, ...messages];
  },

  normalizeTaskEvent(event, task) {
    const now = new Date().toISOString();
    return {
      event_id: event.event_id || this.generateWorkspaceId('EVT'),
      task_id: event.task_id || task?.task_id || '',
      project_id: event.project_id || task?.project_id || '',
      type: event.type || 'system_event',
      text: event.text || '',
      actor: event.actor || 'workspace',
      source: event.source || 'workspace',
      target_id: event.target_id || '',
      linked_artifact_id: event.linked_artifact_id || '',
      linked_file_id: event.linked_file_id || '',
      linked_approval_id: event.linked_approval_id || '',
      risk_level: event.risk_level || 'safe',
      created_at: event.created_at || now
    };
  },

  recordTaskEvent(task, type, text, options = {}) {
    if (!task) return null;
    task.events = Array.isArray(task.events) ? task.events : [];
    const event = this.normalizeTaskEvent({
      event_id: options.event_id || this.generateWorkspaceId('EVT'),
      task_id: task.task_id,
      project_id: task.project_id,
      type,
      text,
      actor: options.actor || 'workspace',
      source: options.source || 'workspace',
      target_id: options.target_id || '',
      linked_artifact_id: options.linked_artifact_id || '',
      linked_file_id: options.linked_file_id || '',
      linked_approval_id: options.linked_approval_id || '',
      risk_level: options.risk_level || (type === 'approval_event' ? 'approval_required' : 'safe'),
      created_at: options.created_at || new Date().toISOString()
    }, task);
    task.events.push(event);
    if (!options.skip_touch) task.updated_at = event.created_at;
    return event;
  },

  createWorkPreview() {
    const input = document.getElementById('work-task-input');
    const request = String(input?.value || '').trim();
    if (!request) {
      this.toast('Опиши задачу');
      input?.focus();
      return;
    }

    const selected = {
      project_id: document.getElementById('work-project-select')?.value || 'terminator',
      mode: document.getElementById('work-mode-select')?.value || 'auto',
      quality_level: document.getElementById('work-quality-select')?.value || 'auto'
    };

    this.workPreview = this.buildWorkPreview(request, selected);
    this.renderWorkPreview(false);
    this.toast('Preview задачи готов');
  },

  buildWorkPreview(request, selected) {
    const lower = request.toLowerCase();
    let projectId = selected.project_id || 'terminator';
    let mode = selected.mode || 'auto';
    let quality = selected.quality_level || 'auto';
    let nextStep = 'Уточнить контекст и подготовить безопасный план';
    let criteria = [
      'Результат понятен владельцу',
      'Риски перечислены',
      'Следующий шаг можно проверить'
    ];
    let risks = ['контекст может быть неполным'];

    if (/(архив|codex|отчет|отчёт|проверка|принять|fix|checkpoint)/i.test(request)) {
      projectId = 'development_executors';
      mode = 'check_result';
      quality = 'maximum';
      nextStep = 'Запустить проверку результата';
      criteria = ['проверки пройдены', 'evidence создан', 'секреты не раскрыты'];
      risks = ['может потребоваться ручная перепроверка архива'];
    } else if (/(диплом|qa|тест|критерии|проверка)/i.test(request)) {
      projectId = 'diploma_qa';
      mode = 'analysis';
      quality = 'maximum';
      nextStep = 'Разобрать критерии и составить проверочный план';
      criteria = ['критерии понятны', 'план проверки готов', 'результат можно защитить'];
      risks = ['может не хватить исходных материалов'];
    } else if (/(исследуй|найди|сравни|источники|deep research)/i.test(lower)) {
      projectId = 'research_documents';
      mode = 'research';
      quality = 'maximum';
      nextStep = 'Собрать источники и сравнить позиции';
      criteria = ['источники перечислены', 'выводы отделены от фактов', 'есть краткая рекомендация'];
      risks = ['нужна проверка актуальности источников'];
    } else if (/(терминатор|mina|direct|local agent|bridge|рабочее)/i.test(request)) {
      projectId = 'terminator';
      mode = selected.mode === 'prepare_task' ? 'prepare_task' : 'analysis';
      quality = 'maximum';
      nextStep = 'Разложить задачу на безопасный минимальный v1';
      criteria = ['Direct Mode не сломан', 'legacy Personal не удалён', 'нет сетевых изменений'];
      risks = ['можно задеть стабильный runtime'];
    }

    if (quality === 'auto') quality = this.isImportantWorkRequest(request) ? 'maximum' : 'standard';

    return {
      user_request: request,
      project_id: projectId,
      mode,
      quality_level: quality,
      title: this.makeWorkTitle(request),
      next_step: nextStep,
      readiness_criteria: criteria,
      risks,
      context_scope: 'локальный UI-фундамент, без запуска исполнителей',
      constraints: [
        'без AI API',
        'без Direct Bridge изменений',
        'без Local Agent изменений',
        'без сетевых изменений'
      ],
      forbidden_actions: [
        'автозапуск внешних исполнителей',
        'изменение .env',
        'деплой',
        'опасные действия на ПК'
      ]
    };
  },

  isImportantWorkRequest(request) {
    return /(провер|принять|архив|код|fix|checkpoint|диплом|источник|терминатор|direct|bridge)/i.test(request);
  },

  makeWorkTitle(request) {
    const compact = request.replace(/\s+/g, ' ').trim();
    if (compact.length <= 58) return compact;
    return `${compact.slice(0, 55).trim()}...`;
  },

  renderWorkPreview(showExpert) {
    const preview = this.workPreview;
    const panel = document.getElementById('work-preview');
    const details = document.getElementById('work-preview-details');
    if (!panel || !details || !preview) return;

    const rows = [
      ['Проект', this.projectName(preview.project_id)],
      ['Режим', this.modeName(preview.mode)],
      ['Качество', this.qualityName(preview.quality_level)],
      ['Название', preview.title],
      ['Лучший следующий шаг', preview.next_step],
      ['Критерии готовности', preview.readiness_criteria.join('; ')],
      ['Риски', preview.risks.join('; ')]
    ];

    if (showExpert) {
      rows.push(
        ['context_scope', preview.context_scope],
        ['constraints', preview.constraints.join('; ')],
        ['forbidden_actions', preview.forbidden_actions.join('; ')]
      );
    }

    details.innerHTML = rows.map(([label, value]) => `
      <div>
        <dt>${this.escapeHtml(label)}</dt>
        <dd>${this.escapeHtml(value)}</dd>
      </div>
    `).join('');
    panel.hidden = false;
    panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  },

  handleWorkPreviewAction(action) {
    if (action === 'confirm') {
      this.confirmWorkPreview();
      return;
    }
    if (action === 'edit') {
      document.getElementById('work-task-input')?.focus();
      this.toast('Можно изменить описание задачи');
      return;
    }
    if (action === 'expert') {
      this.renderWorkPreview(true);
      this.toast('Экспертный preview открыт');
      return;
    }
    if (action === 'cancel') {
      this.workPreview = null;
      const panel = document.getElementById('work-preview');
      if (panel) panel.hidden = true;
      this.toast('Создание задачи отменено');
    }
  },

  confirmWorkPreview() {
    if (!this.workPreview) return;
    const now = new Date().toISOString();
    const task = {
      task_id: this.createTaskId(),
      project_id: this.workPreview.project_id,
      title: this.workPreview.title,
      goal: this.workPreview.user_request,
      user_request: this.workPreview.user_request,
      input_source: this.workPreview.input_source || 'keyboard',
      original_transcript: this.workPreview.original_transcript || '',
      normalized_text: this.workPreview.normalized_text || this.workPreview.user_request,
      intent_preview: this.workPreview.intent_preview
        ? {
            ...this.workPreview.intent_preview,
            transcript: this.safeVoiceTranscript(this.workPreview.intent_preview.transcript || this.workPreview.original_transcript || ''),
            status: 'confirmed'
          }
        : {
            transcript: this.workPreview.original_transcript || '',
            intent: 'create_task',
            entities: {
              project_id: this.workPreview.project_id,
              mode: this.workPreview.mode,
              quality_level: this.workPreview.quality_level
            },
            confidence: this.workPreview.input_source === 'voice' ? 'high' : 'manual',
            risk: 'safe',
            status: 'confirmed'
          },
      voice_event_type: this.workPreview.input_source === 'voice' ? 'voice_task_preview_confirmed' : '',
      device_context: {
        device_ids: [],
        required_capabilities: [],
        device_events: []
      },
      runtime: {
        schema_version: 1,
        source: 'task_runtime_v1',
        persistence: this.taskRuntimeReady ? 'indexeddb' : 'localStorage_fallback'
      },
      mode: this.workPreview.mode,
      quality_level: this.workPreview.quality_level,
      status: 'created',
      created_at: now,
      updated_at: now,
      readiness_criteria: this.workPreview.readiness_criteria,
      risks: this.workPreview.risks,
      next_step: this.workPreview.next_step,
      context_scope: this.workPreview.context_scope,
      constraints: this.workPreview.constraints,
      forbidden_actions: this.workPreview.forbidden_actions,
      executor: 'не назначен',
      timer_started_at: '',
      timer_stopped_at: '',
      messages: [],
      files: [],
      artifacts: [],
      executor_state: {
        executor: 'не назначен',
        status: 'not_sent',
        package_artifact_id: '',
        sent_by_user_at: '',
        timer_started_at: '',
        timer_stopped_at: '',
        report_artifact_id: ''
      },
      evidence_ids: [],
      verifier_result: '',
      verifier_checklist: {},
      verifier_risks: {
        not_checked: '',
        manual_review: '',
        can_break: '',
        first_check: ''
      },
      verifier_notes: {
        report: '',
        evidence: '',
        expected: this.workPreview.user_request,
        first_check: this.workPreview.next_step
      },
      verifier_return_text: '',
      verified_at: '',
      memory_status: 'не сохранено',
      memory_preview: {
        status: 'ожидает данных',
        summary: this.workPreview.user_request,
        decisions: [],
        risks: this.workPreview.risks,
        next_step: this.workPreview.next_step,
        linked_artifact_ids: [],
        linked_file_ids: []
      },
      approval_required: 'ожидает решения владельца',
      approval_requests: [],
      brain_council: {
        status: 'not_started',
        prompt_packages: [],
        answers: [],
        comparison: null,
        strategist_synthesis: null,
        integrity_status: 'not_checked',
        updated_at: ''
      },
      research_ops: this.defaultResearchOpsState(),
      audit_log: []
    };
    this.ensureTaskStorageManifest(task);
    this.addWorkAudit(task, 'Preview показан пользователю.');
    this.addWorkAudit(task, 'Preview подтвержден.');
    this.addWorkspaceMessage(task, 'system_event', 'Рабочее окно', 'Задача создана. Preview подтверждён владельцем.');
    if (task.input_source === 'voice') {
      this.recordTaskEvent(task, 'voice_command', `Задача создана из голосового предпросмотра: ${this.safeVoiceTranscript(task.original_transcript)}`, {
        actor: 'Mina Voice',
        source: 'voice',
        risk_level: 'safe'
      });
    }
    this.createArtifact(
      task,
      'SPEC',
      'Исходная задача',
      task.title,
      [
        `Задача: ${task.title}`,
        `Цель: ${task.goal}`,
        `Критерии: ${task.readiness_criteria.join('; ')}`,
        `Ограничения: ${task.constraints.join('; ')}`
      ].join('\n'),
      'preview'
    );
    this.workTasks.unshift(task);
    this.activeWorkTaskId = task.task_id;
    this.workExpertOpen = false;
    this.saveWorkTasks();
    document.getElementById('work-preview').hidden = true;
    this.renderWorkTaskCard();
    this.toast(`Задача создана: ${task.task_id}`);
    return task;
  },

  createTaskId() {
    const year = new Date().getFullYear();
    let counter = Number(window.localStorage?.getItem(WORK_COUNTER_KEY) || '0') + 1;
    let taskId = `TASK-${year}-${String(counter).padStart(4, '0')}`;

    while (this.workTasks.some((task) => task.task_id === taskId)) {
      counter += 1;
      taskId = `TASK-${year}-${String(counter).padStart(4, '0')}`;
    }

    try {
      window.localStorage?.setItem(WORK_COUNTER_KEY, String(counter));
    } catch {}
    return taskId;
  },

  renderWorkTaskCard() {
    const card = document.getElementById('work-task-card');
    if (!card) return;
    const task = this.getActiveWorkTask();
    if (!task) {
      card.hidden = true;
      return;
    }

    card.hidden = false;
    document.getElementById('work-task-id-label').textContent = task.task_id;
    document.getElementById('work-task-title').textContent = task.title;
    document.getElementById('work-task-status').textContent = this.statusName(task.status);
    document.getElementById('work-task-simple').innerHTML = this.renderWorkSimpleHtml(task);
    this.renderWorkspaceWindow(task);
    this.updateVerifierActionHints(task);
    this.renderVerifierPanel(task);
    this.renderWorkExpertView(task);
  },

  renderWorkSimpleHtml(task) {
    const plan = this.buildShortWorkPlan(task);
    const gate = this.acceptanceGateStatus(task);
    const evidenceGate = this.verifierEvidenceGate(task);
    const qualityGate = this.verifierQualityGate(task);
    return `
      <dl class="work-details">
        <div><dt>Проект</dt><dd>${this.escapeHtml(this.projectName(task.project_id))}</dd></div>
        <div><dt>Статус</dt><dd>${this.escapeHtml(this.statusName(task.status))}</dd></div>
        <div><dt>Краткая цель</dt><dd>${this.escapeHtml(task.user_request)}</dd></div>
        <div><dt>Лучший следующий шаг</dt><dd>${this.escapeHtml(task.next_step)}</dd></div>
        <div><dt>Краткий план</dt><dd>${this.escapeHtml(plan)}</dd></div>
        <div><dt>Проверка</dt><dd>${this.escapeHtml(this.verifierVerdictName(task.verifier_result))}</dd></div>
        <div><dt>Evidence gate</dt><dd>${this.escapeHtml(evidenceGate.label)}</dd></div>
        <div><dt>Quality gate</dt><dd>${this.escapeHtml(qualityGate.label)}</dd></div>
        <div><dt>Приёмка</dt><dd>${this.escapeHtml(gate.label)}</dd></div>
      </dl>
      ${gate.ready ? '' : `<p class="workspace-gate-note">${this.escapeHtml(gate.reason)}</p>`}
    `;
  },

  buildShortWorkPlan(task) {
    return [
      '1. Уточнить контекст.',
      `2. Подготовить режим: ${this.modeName(task.mode)}.`,
      '3. Согласовать безопасный следующий шаг.'
    ].join(' ');
  },

  acceptanceGateStatus(task) {
    const verifierOk = ['PASS', 'PASS_WITH_RISKS'].includes(task.verifier_result);
    const memoryHandled = ['saved_local', 'skipped', 'не сохранять'].includes(task.memory_preview?.status || task.memory_status);
    const evidenceGate = this.verifierEvidenceGate(task);
    const qualityGate = this.verifierQualityGate(task);
    const pendingApprovals = (task.approval_requests || []).some((approval) => ['manual_required', 'pending'].includes(approval.status));

    if (pendingApprovals) {
      return { ready: false, label: 'ждёт approval', reason: 'Есть pending approval-запросы. Принятие результата заблокировано.' };
    }
    if (!verifierOk) {
      return { ready: false, label: 'нужен Verifier PASS', reason: 'Для приёмки нужен verdict PASS или PASS_WITH_RISKS.' };
    }
    if (!evidenceGate.ok && !(evidenceGate.honestAbsence && task.verifier_result === 'PASS_WITH_RISKS')) {
      return { ready: false, label: evidenceGate.label, reason: evidenceGate.reason };
    }
    if (!qualityGate.ok && task.verifier_result === 'PASS') {
      return { ready: false, label: qualityGate.label, reason: qualityGate.reason };
    }
    if (!memoryHandled) {
      return { ready: false, label: 'нужно обработать память', reason: 'Перед приёмкой нужно сохранить или осознанно пропустить Memory Preview.' };
    }
    return {
      ready: true,
      label: task.verifier_result === 'PASS_WITH_RISKS' ? 'можно принять с рисками' : 'можно принять',
      reason: 'Ключевые gates закрыты.'
    };
  },

  verifierEvidenceGate(task, input = null) {
    const notes = input ? { evidence: input.evidence || '', report: input.report || '' } : this.normalizedVerifierNotes(task || {});
    const evidenceText = String(notes.evidence || '').trim();
    const files = Array.isArray(task?.files) ? task.files : [];
    const artifacts = Array.isArray(task?.artifacts) ? task.artifacts : [];
    const hasEvidenceFile = files.some((file) => file.is_evidence || ['evidence', 'result_archive', 'verifier_input'].includes(file.role));
    const hasEvidenceArtifact = artifacts.some((artifact) => (
      ['RESULT_ARCHIVE', 'SCREENSHOT'].includes(artifact.type)
      || (artifact.type === 'CHECK_LOG' && artifact.source !== 'privacy_guard')
    ));
    const hasEvidencePath = /(?:[A-Z]:\\|\/|\.zip\b|\.7z\b|\.rar\b|\.png\b|\.jpg\b|\.jpeg\b|\.webp\b|\.log\b|evidence|artifact|archive|screenshot|скрин|архив|лог|путь)/i.test(evidenceText);
    const declaresNoEvidence = /(?:нет|отсутств|не прилож|no)\s+(?:evidence|доказ|архив|скрин)|(?:evidence|архив|скрин|доказ)\s+(?:нет|отсутств|не прилож|no)/i.test(evidenceText);
    const hasEvidenceDescription = evidenceText.length >= 12 && !declaresNoEvidence && (hasEvidencePath || /(?:приложен|создан|сохранен|сохранён|проверен|attached|provided)/i.test(evidenceText));

    if (hasEvidenceFile || hasEvidenceArtifact || hasEvidenceDescription) {
      return {
        ok: true,
        honestAbsence: false,
        label: 'evidence есть',
        reason: 'Есть evidence-файл, проверочный artifact или описанный путь/архив.'
      };
    }

    if (declaresNoEvidence) {
      return {
        ok: false,
        honestAbsence: true,
        label: 'evidence с риском',
        reason: 'Evidence честно указан как отсутствующий. Чистый PASS запрещён; допустима только приёмка с риском после решения владельца.'
      };
    }

    return {
      ok: false,
      honestAbsence: false,
      label: 'нужно evidence',
      reason: 'Для важной задачи нужен evidence-файл, проверочный artifact, архив, скрин, лог или явное описание приложенного доказательства.'
    };
  },

  verifierQualityGate(task, input = null, findings = null) {
    const notes = input ? {
      report: input.report || '',
      evidence: input.evidence || '',
      first_check: input.first_check || ''
    } : this.normalizedVerifierNotes(task || {});
    const checklist = input?.checklist || task?.verifier_checklist || {};
    const risks = input?.risks || this.normalizedVerifierRisks(task || {});
    const text = [notes.report, notes.evidence, notes.first_check].join('\n');
    const hasReport = notes.report.trim().length >= 80;
    const hasChecks = this.verifierHasCheckSignals(text);
    const hasFirstCheck = notes.first_check.trim().length >= 8;
    const hasBlockingFindings = (findings || task?.verifier_gate_findings || []).some((finding) => finding.blocksPass || finding.severity === 'danger');
    const coreChecklistOk = ['evidence_archive', 'checks_passed', 'no_ai_api', 'no_env_secrets', 'result_archive_path', 'first_check', 'acceptance_decision_ready']
      .every((id) => Boolean(checklist[id]));
    const riskTextOk = ![risks.not_checked, risks.manual_review, risks.can_break].some(Boolean) || task?.verifier_result === 'PASS_WITH_RISKS';

    if (hasReport && hasChecks && hasFirstCheck && coreChecklistOk && !hasBlockingFindings && riskTextOk) {
      return { ok: true, label: 'quality gate закрыт', reason: 'Отчёт, проверки, evidence gate и ключевой checklist согласованы.' };
    }

    return {
      ok: false,
      label: 'quality gate не закрыт',
      reason: 'Для clean PASS нужны содержательный отчёт, явные проверки, первый шаг проверки, ключевой checklist и отсутствие blocking findings.'
    };
  },

  verifierHasCheckSignals(text) {
    return /(?:node\s+--check|npm\s+test|pytest|pass\b|smoke|syntax|lint|регресс|провер|тест|ручн|desktop|mobile|overflow|скрин|screenshot|verifier|qa)/i.test(String(text || ''));
  },

  verifierHasChangedFileSignals(text) {
    return /(?:webapp\/|direct-bridge\/|local-agent\/|runtime\/|docs\/|evidence\/|memory\/|[A-Za-z0-9_-]+\.(?:js|mjs|cjs|html|css|md|json|toml|yml|yaml|ps1|py|ts))/i.test(String(text || ''));
  },

  verifierHasMojibakeSignals(text) {
    const pattern = /(?:\u0420[\u045E\u045F\u00A0\u00B0-\u00BF\u0402-\u040F]|\u0421[\u2018\u2019\u0451\u0401\u0402-\u040F])/;
    return pattern.test(String(text || ''));
  },

  verifierHasDisallowedAiApiSignals(text) {
    const source = String(text || '');
    const mentionsAiApi = /\b(?:openai|api\.openai|gemini\s+api|deepseek\s+api|openrouter|embedding|embeddings|authorization\s*:\s*bearer)\b/i.test(source);
    if (!mentionsAiApi) return false;

    const safeNegation = /(?:AI API|OpenAI API|Gemini API|DeepSeek API|OpenRouter|embedding|embeddings)\s*[:=-]?\s*(?:не использ|не примен|не подключ|disabled|not used|no runtime calls)|(?:не использ|не примен|не подключ|без)\s.{0,60}(?:AI API|OpenAI|Gemini API|DeepSeek API|OpenRouter|embedding|embeddings)/i.test(source);
    const explicitUse = /(?:использовал|использовали|применил|подключил|вызвал|runtime call|used|enabled|called|request to|authorization\s*:\s*bearer|sk-[A-Za-z0-9_-]{10,}|AIza[A-Za-z0-9_-]{10,})/i.test(source);
    return explicitUse && !safeNegation;
  },

  renderWorkspaceWindow(task) {
    if (!task) return;
    this.ensureTaskStorageManifest(task);
    this.renderWorkspaceTop(task);
    this.renderWorkspaceTaskList();
    this.renderWorkspaceSummary(task);
    this.renderWorkspaceHistory(task);
    this.renderWorkspaceTabs();
    this.renderWorkspaceFiles(task);
    this.renderWorkspaceArtifacts(task);
    this.renderWorkspaceResearch(task);
    this.renderWorkspaceCouncil(task);
    this.renderWorkspaceEyes(task);
    this.renderWorkspaceHands(task);
    this.renderWorkspaceHandoff(task);
    this.renderWorkspaceMemory(task);
    this.renderVoicePanel();
    this.updateWorkspaceTimer();
  },

  renderWorkspaceTop(task) {
    const setText = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };
    setText('workspace-title', task.title || 'Задача');
    setText('workspace-project', `Проект: ${this.projectName(task.project_id)}`);
    setText('workspace-status', `Статус: ${this.statusName(task.status)}`);
    setText('workspace-executor', `Исполнитель: ${task.executor || task.executor_state?.executor || 'не назначен'}`);
    setText('workspace-risk', `Риск: ${this.workspaceRiskLevel(task)}`);
    const truth = this.currentSourceOfTruthSnapshot({ refresh: true });
    const truthChip = document.getElementById('workspace-source-truth');
    if (truthChip) {
      truthChip.textContent = `Источник истины: ${truth.score}%`;
      truthChip.title = `${truth.label}: ${truth.next.name}`;
      truthChip.classList.toggle('workspace-chip--green', truth.status === 'ready');
      truthChip.classList.toggle('workspace-chip--yellow', truth.status !== 'ready');
    }
  },

  renderWorkspaceTaskList() {
    const host = document.getElementById('workspace-task-list');
    const activeCount = document.getElementById('workspace-active-count');
    const waitingCount = document.getElementById('workspace-waiting-count');
    const checkCount = document.getElementById('workspace-check-count');
    const riskCount = document.getElementById('workspace-risk-count');
    const tasks = this.workTasks || [];

    if (activeCount) activeCount.textContent = String(tasks.length);
    if (waitingCount) waitingCount.textContent = String(tasks.filter((task) => task.status === 'waiting_executor_report').length);
    if (checkCount) checkCount.textContent = String(tasks.filter((task) => ['executor_report_received', 'verifying', 'manual_required'].includes(task.status)).length);
    if (riskCount) riskCount.textContent = String(tasks.filter((task) => this.workspaceRiskLevel(task) !== 'низкий').length);

    if (!host) return;
    host.innerHTML = tasks.slice(0, 8).map((task) => `
      <button type="button" class="${task.task_id === this.activeWorkTaskId ? 'active' : ''}" data-workspace-action="select_task" data-task-id="${this.escapeHtml(task.task_id)}">
        <span>${this.escapeHtml(task.title || task.task_id)}</span>
        <small>${this.escapeHtml(this.statusName(task.status))}</small>
      </button>
    `).join('') || '<p class="workspace-empty">Задачи появятся после создания.</p>';
  },

  renderWorkspaceSummary(task) {
    const goal = document.getElementById('workspace-goal');
    const readiness = document.getElementById('workspace-readiness');
    const nextStep = document.getElementById('workspace-next-step');
    const truthDetail = document.getElementById('workspace-source-truth-detail');
    if (goal) goal.textContent = task.goal || task.user_request || 'не задано';
    if (nextStep) nextStep.textContent = task.next_step || 'не задано';
    if (truthDetail) {
      const truth = this.currentSourceOfTruthSnapshot({ refresh: false });
      truthDetail.textContent = `${truth.label}: ${truth.summary}. Следующий шаг: ${truth.next.name}.`;
    }
    if (readiness) {
      const criteria = Array.isArray(task.readiness_criteria) ? task.readiness_criteria : [];
      readiness.innerHTML = criteria.length
        ? criteria.map((item) => `<li>${this.escapeHtml(item)}</li>`).join('')
        : '<li>не задано</li>';
    }
  },

  renderWorkspaceHistory(task) {
    const host = document.getElementById('workspace-history');
    if (!host) return;
    const messages = Array.isArray(task.messages) ? task.messages : [];
    const hasRuntimeEvents = Array.isArray(task.events) && task.events.length;
    const audit = !hasRuntimeEvents && Array.isArray(task.audit_log) ? task.audit_log.slice(-8) : [];
    const auditMessages = audit.map((text, index) => ({
      message_id: `audit-${index}`,
      type: 'system_event',
      author: 'Система',
      text,
      created_at: task.updated_at || task.created_at
    }));
    const messageIds = new Set(messages.map((message) => message.message_id));
    const eventMessages = hasRuntimeEvents ? task.events
      .filter((event) => event.source !== 'message' || !messageIds.has(event.target_id))
      .map((event) => ({
        message_id: event.event_id,
        type: event.type || 'system_event',
        author: event.actor || 'Runtime',
        text: event.text || 'событие',
        created_at: event.created_at || task.updated_at
      })) : [];
    const combined = [...messages, ...eventMessages, ...auditMessages]
      .filter((message, index, list) => list.findIndex((item) => item.message_id === message.message_id) === index)
      .sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));

    host.innerHTML = combined.length ? combined.map((message) => `
      <article class="workspace-message workspace-message--${this.escapeHtml(message.type || 'system_event')}">
        <div>
          <strong>${this.escapeHtml(this.workspaceMessageAuthor(message))}</strong>
          <span>${this.escapeHtml(this.formatTaskTime(message.created_at))}</span>
        </div>
        <em>${this.escapeHtml(this.workspaceMessageLabel(message.type))}</em>
        <p>${this.escapeHtml(message.text || 'нет текста')}</p>
      </article>
    `).join('') : '<p class="workspace-empty">История появится после уточнений, файлов и отчётов.</p>';
    host.scrollTop = host.scrollHeight;
  },

  renderWorkspaceTabs() {
    const activeTab = WORKSPACE_TABS.has(this.workspaceActiveTab) ? this.workspaceActiveTab : 'files';
    this.workspaceActiveTab = activeTab;
    document.querySelectorAll('[data-workspace-tab]').forEach((button) => {
      button.classList.toggle('active', button.dataset.workspaceTab === activeTab);
    });
    document.querySelectorAll('.workspace-tab-panel').forEach((panel) => {
      panel.hidden = panel.id !== `workspace-tab-${activeTab}`;
    });
    const verifierPanel = document.getElementById('work-verifier-panel');
    if (verifierPanel) verifierPanel.hidden = activeTab !== 'check';
  },

  renderWorkspaceFiles(task) {
    const host = document.getElementById('workspace-files-list');
    if (!host) return;
    this.renderWorkspaceStorageManifest(task);
    const files = Array.isArray(task.files) ? task.files : [];
    host.innerHTML = files.length ? files.map((file) => {
      const runtime = this.workspaceFileRuntime.get(file.file_id) || {};
      const preview = this.renderWorkspaceFilePreview(file, runtime);
      const storage = this.fileStorageSummary(file);
      const roles = WORK_FILE_ROLES.map((role) => `
        <option value="${this.escapeHtml(role.id)}" ${file.role === role.id ? 'selected' : ''}>${this.escapeHtml(role.name)}</option>
      `).join('');
      return `
        <article class="workspace-file-card">
          <div class="workspace-file-main">
            <strong>${this.escapeHtml(file.name)}</strong>
            <span>${this.escapeHtml(file.extension || 'file')} · ${this.escapeHtml(file.human_size || '0 B')} · ${this.escapeHtml(file.status || 'attached')}</span>
            <span>${this.escapeHtml(storage)}</span>
            ${preview}
          </div>
          <label>
            <span>Роль</span>
            <select data-file-role="${this.escapeHtml(file.file_id)}">${roles}</select>
          </label>
          <div class="workspace-file-actions">
            <button type="button" data-file-action="make_evidence" data-file-id="${this.escapeHtml(file.file_id)}">Сделать evidence</button>
            <button type="button" data-file-action="verifier_input" data-file-id="${this.escapeHtml(file.file_id)}">Для проверки</button>
            <button type="button" data-file-action="executor_package" data-file-id="${this.escapeHtml(file.file_id)}">В пакет Codex</button>
            <button type="button" data-file-action="research_source" data-file-id="${this.escapeHtml(file.file_id)}">Для исследования</button>
            <button type="button" data-file-action="remove" data-file-id="${this.escapeHtml(file.file_id)}">Удалить из задачи</button>
          </div>
        </article>
      `;
    }).join('') : '<p class="workspace-empty">Файлы пока не прикреплены. В v1 после перезагрузки доступны только metadata.</p>';
  },

  renderWorkspaceStorageManifest(task) {
    const host = document.getElementById('workspace-storage-manifest');
    if (!host || !task) return;
    const manifest = this.ensureTaskStorageManifest(task);
    const summary = this.taskStorageSummary(task);
    host.innerHTML = `
      <section class="storage-manifest-card">
        <div class="workspace-panel-head">
          <strong>Хранилище задачи</strong>
          <span>${this.escapeHtml(manifest.status_label || 'metadata-only')}</span>
        </div>
        <dl class="storage-manifest-grid">
          <div><dt>Task path</dt><dd>${this.escapeHtml(manifest.task_path)}</dd></div>
          <div><dt>Policy</dt><dd>${this.escapeHtml(manifest.raw_file_policy)}</dd></div>
          <div><dt>Files</dt><dd>${this.escapeHtml(`${summary.files} metadata · ${summary.evidence} evidence · ${summary.hashed} hash`)}</dd></div>
          <div><dt>Restore points</dt><dd>${this.escapeHtml(String(summary.restore_points))}</dd></div>
        </dl>
        <div class="storage-folder-grid">
          ${manifest.folders.map((folder) => `
            <article>
              <span>${this.escapeHtml(folder.label)}</span>
              <strong>${this.escapeHtml(folder.path)}</strong>
            </article>
          `).join('')}
        </div>
        <p>В браузере сохраняются только metadata, planned paths и hashes. Local Agent storage v1 создаёт папки и manifest на D, но не удаляет файлы, не читает секреты и не распаковывает архивы.</p>
        <div class="workspace-file-actions">
          <button type="button" data-workspace-action="copy_storage_manifest">Скопировать карту</button>
          <button type="button" data-workspace-action="copy_storage_agent_command">Команда Local Agent</button>
          <button type="button" data-workspace-action="copy_phase2_runtime_package">Пакет Phase 2</button>
          <button type="button" data-workspace-action="send_storage_prepare">Подготовить на D</button>
          <button type="button" data-workspace-action="create_restore_point">Создать restore point</button>
        </div>
      </section>
    `;
  },

  renderWorkspaceFilePreview(file, runtime) {
    if (runtime.previewType === 'image' && runtime.objectUrl) {
      return `<img class="workspace-file-thumb" src="${this.escapeHtml(runtime.objectUrl)}" alt="">`;
    }
    if (runtime.previewType === 'text' && runtime.previewText) {
      return `<pre class="workspace-file-preview">${this.escapeHtml(runtime.previewText)}</pre>`;
    }
    if (ARCHIVE_EXTENSIONS.has(file.extension)) return '<p class="workspace-file-note">Архив: автораспаковка недоступна.</p>';
    if (MEDIA_EXTENSIONS.has(file.extension)) return '<p class="workspace-file-note">Медиа: автоанализ будет добавлен позже.</p>';
    if (['pdf', 'docx', 'xlsx', 'rtf'].includes(file.extension)) return '<p class="workspace-file-note">Preview для этого формата будет добавлен позже.</p>';
    return '<p class="workspace-file-note">Файл прикреплён к текущей сессии. Постоянное файловое хранилище будет добавлено позже.</p>';
  },

  ensureTaskStorageManifest(task) {
    const now = new Date().toISOString();
    const taskPath = this.taskStoragePath(task.task_id);
    const existing = task.storage_manifest && typeof task.storage_manifest === 'object' ? task.storage_manifest : {};
    const manifest = {
      schema_version: TASK_STORAGE_SCHEMA_VERSION,
      storage_root: TERMINATOR_STORAGE_ROOT,
      task_path: taskPath,
      status: existing.status || 'planned',
      status_label: 'Phase 2 storage contract / ждёт Local Agent prepare',
      persistence: 'browser_runtime_metadata + local_agent_manifest',
      raw_file_policy: 'raw/base64 не хранить в localStorage',
      local_agent_required: true,
      prepared_by_local_agent: Boolean(existing.prepared_by_local_agent),
      runtime_status: existing.runtime_status || task.phase2_runtime_status || 'browser_ready',
      created_at: existing.created_at || task.created_at || now,
      updated_at: now,
      manifest_files: {
        json: `${taskPath}\\manifests\\task-storage-manifest.json`,
        markdown: `${taskPath}\\manifests\\task-storage-manifest.md`
      },
      local_agent_contract: {
        action_type: 'storage_action',
        action: 'prepare_task_storage',
        supported_actions: [
          'prepare_task_storage',
          'write_task_artifact',
          'write_task_report',
          'write_memory_record',
          'create_restore_point',
          'inspect_task_storage',
          'verify_task_bundle'
        ],
        execution: 'safe_folder_prepare_only',
        destructive_actions_allowed: false,
        reads_secret_files: false,
        extracts_archives: false,
        runs_files: false
      },
      safe_operations: [
        'create_task_folders',
        'write_storage_manifest',
        'write_restore_point_metadata'
      ],
      blocked_operations: [
        'delete_files',
        'read_env',
        'extract_archives',
        'run_unknown_files',
        'network_changes',
        'security_changes'
      ],
      folders: TASK_STORAGE_SUBFOLDERS.map((folder) => ({
        id: folder,
        label: TASK_STORAGE_FOLDER_LABELS[folder] || folder,
        path: this.taskStoragePath(task.task_id, folder),
        status: existing.folders?.find?.((item) => item.id === folder)?.status || 'planned'
      }))
    };
    task.storage_manifest = manifest;
    task.storage_policy = {
      ...(task.storage_policy || {}),
      root: TERMINATOR_STORAGE_ROOT,
      task_path: taskPath,
      browser_persistence: 'metadata_only',
      local_agent_storage: 'phase2_prepare_manifest_contract',
      local_agent_runtime: 'phase2_write_records_hashes_verify_readonly',
      raw_files_in_localStorage: false,
      hash_policy: `browser SHA-256 до ${this.humanFileSize(FILE_HASH_MAX_BYTES)}, дальше Local Agent`,
      safe_prepare_action: 'prepare_task_storage',
      safe_runtime_actions: manifest.local_agent_contract?.supported_actions || []
    };
    return manifest;
  },

  taskStoragePath(taskId, folder = '') {
    const base = `${TERMINATOR_STORAGE_ROOT}\\tasks\\${this.safeStorageSegment(taskId || 'TASK-UNKNOWN')}`;
    return folder ? `${base}\\${folder}` : base;
  },

  safeStorageSegment(value) {
    return String(value || 'item')
      .replace(/[<>:"/\\|?*\u0000-\u001F]/g, '_')
      .replace(/\s+/g, '_')
      .slice(0, 120);
  },

  plannedFileStoragePath(task, file) {
    const folderByRole = {
      evidence: 'evidence',
      verifier_input: 'evidence',
      result_archive: 'reports',
      executor_package: 'files',
      memory_candidate: 'artifacts',
      research_source: 'files',
      spec: 'files',
      attachment: 'files'
    };
    const folder = folderByRole[file.role] || 'files';
    const safeName = this.safeStorageSegment(`${file.file_id}_${file.name || 'file'}`);
    return this.taskStoragePath(task.task_id, folder) + '\\' + safeName;
  },

  updateFileStorageRef(task, file) {
    const folder = file.role === 'evidence' || file.role === 'verifier_input'
      ? 'evidence'
      : file.role === 'result_archive'
        ? 'reports'
        : 'files';
    file.storage_ref = {
      root: TERMINATOR_STORAGE_ROOT,
      task_path: this.taskStoragePath(task.task_id),
      folder,
      planned_path: this.plannedFileStoragePath(task, file),
      persistence: 'metadata_only_browser',
      raw_file_saved: false,
      local_agent_required: true,
      updated_at: new Date().toISOString()
    };
    return file.storage_ref;
  },

  taskStorageSummary(task) {
    const files = Array.isArray(task.files) ? task.files : [];
    const artifacts = Array.isArray(task.artifacts) ? task.artifacts : [];
    return {
      files: files.length,
      evidence: files.filter((file) => file.is_evidence).length,
      hashed: files.filter((file) => file.hash_status === 'calculated_session').length,
      hash_pending: files.filter((file) => file.hash_status && file.hash_status !== 'calculated_session').length,
      artifacts: artifacts.length,
      restore_points: artifacts.filter((artifact) => artifact.type === 'RESTORE_POINT').length
    };
  },

  fileStorageSummary(file) {
    const hash = file.sha256 ? `SHA-256 ${file.sha256.slice(0, 12)}...` : this.hashStatusName(file.hash_status);
    const path = file.storage_ref?.planned_path || 'planned path не задан';
    return `${hash} · ${path}`;
  },

  hashStatusName(status) {
    const names = {
      calculated_session: 'hash рассчитан',
      pending_local_agent: 'hash рассчитает Local Agent',
      unavailable: 'hash недоступен',
      skipped_large_file: 'hash позже для большого файла'
    };
    return names[status] || 'hash ожидает';
  },

  localStorageSnapshotText() {
    try {
      const parts = [];
      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index);
        parts.push(`${key}: ${window.localStorage.getItem(key) || ''}`);
      }
      return parts.join('\n');
    } catch {
      return '';
    }
  },

  buildStorageManifestText(task) {
    const manifest = this.ensureTaskStorageManifest(task);
    const summary = this.taskStorageSummary(task);
    const files = (task.files || []).map((file) => [
      `- ${file.name}`,
      `  role: ${this.fileRoleName(file.role)}`,
      `  size: ${file.human_size}`,
      `  hash: ${file.sha256 || this.hashStatusName(file.hash_status)}`,
      `  planned_path: ${file.storage_ref?.planned_path || this.plannedFileStoragePath(task, file)}`,
      `  raw_file_saved: false`
    ].join('\n')).join('\n') || '- файлов пока нет';
    return [
      '# Storage Manifest',
      '',
      `task_id: ${task.task_id}`,
      `task_path: ${manifest.task_path}`,
      `policy: ${manifest.raw_file_policy}`,
      `browser_persistence: ${manifest.persistence}`,
      `local_agent_action: ${manifest.local_agent_contract?.action || 'prepare_task_storage'}`,
      `manifest_json: ${manifest.manifest_files?.json || 'не задано'}`,
      `manifest_md: ${manifest.manifest_files?.markdown || 'не задано'}`,
      `files: ${summary.files}`,
      `evidence: ${summary.evidence}`,
      `hashed: ${summary.hashed}`,
      '',
      '## Folders',
      ...manifest.folders.map((folder) => `- ${folder.label}: ${folder.path}`),
      '',
      '## Files',
      files,
      '',
      '## Ограничение v1',
      '- браузер хранит только metadata/hash/planned paths;',
      '- реальные файлы не пишутся в localStorage;',
      '- Local Agent storage runtime готовит папки, пишет artifacts/reports/memory/restore points на D и считает hashes;',
      '- Verifier runtime делает read-only scan без запуска файлов;',
      '- Local Agent не удаляет файлы, не читает .env/secrets, не распаковывает архивы и не запускает неизвестные файлы.'
    ].join('\n');
  },

  copyStorageManifest(task) {
    const text = this.buildStorageManifestText(task);
    this.copyWorkspaceText(text);
    this.addWorkspaceMessage(task, 'system_event', 'Хранилище', 'Storage manifest скопирован.');
    this.addWorkAudit(task, 'Storage manifest скопирован.');
  },

  buildStorageAgentCommand(task) {
    const manifest = this.ensureTaskStorageManifest(task);
    const payload = {
      type: 'storage_action',
      action: 'prepare_task_storage',
      task_id: task.task_id,
      project_id: task.project_id,
      title: task.title,
      storage_root: manifest.storage_root,
      dry_run: false
    };
    return [
      '# Local Agent storage prepare',
      '',
      'Рабочая папка Local Agent:',
      '$env:USERPROFILE\\Desktop\\терминатор - DeepSeek_files\\council\\local-agent',
      '',
      'PowerShell:',
      `node .\\mina-local-agent.mjs --prepare-task-storage=${task.task_id}`,
      '',
      'Future Direct Bridge payload:',
      JSON.stringify(payload, null, 2),
      '',
      'Supported Phase 2 storage actions:',
      '- prepare_task_storage',
      '- write_task_artifact',
      '- write_task_report',
      '- write_memory_record',
      '- create_restore_point',
      '- inspect_task_storage',
      '- verify_task_bundle',
      '',
      'Safety:',
      '- создаёт только папки задачи и manifest на D;',
      '- не удаляет файлы;',
      '- не читает .env/secrets;',
      '- не распаковывает архивы;',
      '- не запускает неизвестные файлы.'
    ].join('\n');
  },

  buildPhase2RuntimePayloads(task) {
    const manifest = this.ensureTaskStorageManifest(task);
    const taskBase = {
      type: 'storage_action',
      task_id: task.task_id,
      project_id: task.project_id,
      title: task.title,
      storage_root: manifest.storage_root,
      source: 'mina_webapp',
      version: 2
    };
    const payloads = [
      {
        ...taskBase,
        action: 'prepare_task_storage'
      },
      ...((task.artifacts || []).slice(0, 20).map((artifact) => ({
        ...taskBase,
        action: artifact.type === 'EXECUTOR_REPORT' ? 'write_task_report' : 'write_task_artifact',
        artifact_id: artifact.artifact_id,
        artifact_type: artifact.type,
        title: artifact.title,
        summary: artifact.summary,
        content: artifact.content || artifact.summary || artifact.title,
        linked_file_ids: artifact.linked_file_ids || [],
        linked_artifact_ids: artifact.linked_artifact_ids || []
      }))),
      {
        ...taskBase,
        action: 'write_memory_record',
        memory_id: `MEMORY-${task.task_id}`,
        title: 'Memory preview',
        summary: task.memory_preview?.summary || task.goal || task.user_request || '',
        content: JSON.stringify(this.buildWorkspaceMemoryPreview(task, task.memory_preview?.status || 'draft'), null, 2),
        linked_artifact_ids: task.memory_preview?.linked_artifact_ids || []
      },
      {
        ...taskBase,
        action: 'create_restore_point',
        snapshot: this.buildTaskRuntimeSnapshot(task)
      },
      {
        ...taskBase,
        action: 'verify_task_bundle',
        report: this.normalizedVerifierNotes(task).report || (task.artifacts || []).find((artifact) => artifact.type === 'EXECUTOR_REPORT')?.content || '',
        evidence: this.normalizedVerifierNotes(task).evidence || this.taskStoragePath(task.task_id, 'evidence'),
        expected: task.user_request || task.goal || task.title,
        notes: this.verifierRisksSummary(task)
      },
      {
        ...taskBase,
        action: 'inspect_task_storage'
      }
    ];
    return payloads;
  },

  buildTaskRuntimeSnapshot(task) {
    return {
      restore_point_id: `RESTORE-${task.task_id}-${Date.now()}`,
      title: `Restore point ${task.task_id}`,
      summary: 'Phase 2 metadata snapshot for Local Agent storage runtime.',
      source: 'mina_webapp',
      task_id: task.task_id,
      project_id: task.project_id,
      status: task.status,
      title_text: task.title,
      updated_at: task.updated_at,
      messages: (task.messages || []).length,
      events: (task.events || []).length,
      files: (task.files || []).map((file) => ({
        file_id: file.file_id,
        name: file.name,
        role: file.role,
        size_bytes: file.size_bytes,
        sha256: file.sha256 || '',
        hash_status: file.hash_status || '',
        planned_path: file.storage_ref?.planned_path || ''
      })),
      artifacts: (task.artifacts || []).map((artifact) => ({
        artifact_id: artifact.artifact_id,
        type: artifact.type,
        title: artifact.title,
        status: artifact.status,
        planned_path: artifact.storage_ref?.planned_path || ''
      })),
      verifier_result: task.verifier_result || '',
      memory_status: task.memory_preview?.status || task.memory_status || '',
      approval_count: (task.approval_requests || []).length
    };
  },

  buildPhase2RuntimePackageText(task) {
    const payloads = this.buildPhase2RuntimePayloads(task);
    return [
      '# Phase 2 Local Agent Runtime Package',
      '',
      `task_id: ${task.task_id}`,
      `project: ${this.projectName(task.project_id)}`,
      `created_at: ${new Date().toISOString()}`,
      '',
      '## Что делает пакет',
      '- готовит task storage на D;',
      '- сохраняет artifacts/reports/memory records;',
      '- создаёт restore point;',
      '- запускает read-only verifier scan;',
      '- инспектирует task storage;',
      '- не удаляет файлы, не читает .env/secrets, не распаковывает архивы, не запускает файлы.',
      '',
      '## Payloads',
      JSON.stringify(payloads, null, 2)
    ].join('\n');
  },

  copyPhase2RuntimePackage(task) {
    const text = this.buildPhase2RuntimePackageText(task);
    this.copyWorkspaceText(text);
    const artifact = this.createArtifact(task, 'PLAN', 'Phase 2 Local Agent Runtime Package', 'Payload-пакет для безопасного сохранения runtime на D.', text, 'storage');
    artifact.status = 'ready';
    task.phase2_runtime_status = 'package_ready';
    task.storage_manifest.runtime_status = 'package_ready';
    this.addWorkspaceMessage(task, 'system_event', 'Хранилище', 'Phase 2 Local Agent Runtime Package создан и скопирован.', {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.addWorkAudit(task, 'Создан Phase 2 Local Agent Runtime Package.');
    this.toast('Phase 2 пакет создан');
  },

  async sendStoragePrepare(task) {
    const manifest = this.ensureTaskStorageManifest(task);
    const payload = {
      type: 'storage_action',
      action: 'prepare_task_storage',
      task_id: task.task_id,
      project_id: task.project_id,
      title: task.title,
      storage_root: manifest.storage_root,
      source: 'mina_webapp',
      version: 2
    };
    const result = await sendTerminatorAction(payload);
    if (result.ok && result.commandId && result.canTrackStatus) {
      this.watchDirectCommand(result.commandId, { action: 'prepare_task_storage' });
    }
    task.phase2_runtime_status = result.ok ? 'prepare_command_sent' : 'prepare_command_not_sent';
    this.addWorkspaceMessage(task, 'system_event', 'Хранилище', result.ok ? 'Команда подготовки storage отправлена Local Agent.' : `Команда storage не отправлена: ${result.message || result.reason || 'ошибка'}`);
    this.toast(result.ok ? 'Команда storage отправлена' : 'Storage command не отправлен');
  },

  copyStorageAgentCommand(task) {
    const text = this.buildStorageAgentCommand(task);
    this.copyWorkspaceText(text);
    const artifact = this.createArtifact(task, 'PLAN', 'Local Agent storage prepare', 'Команда и payload для безопасной подготовки storage на D.', text, 'storage');
    artifact.status = 'ready';
    this.addWorkspaceMessage(task, 'system_event', 'Хранилище', 'Команда Local Agent storage скопирована.', {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.addWorkAudit(task, 'Скопирована команда Local Agent storage prepare.');
  },

  createStorageRestorePoint(task) {
    const manifestText = this.buildStorageManifestText(task);
    const content = [
      '# Restore Point',
      '',
      `task_id: ${task.task_id}`,
      `created_at: ${new Date().toISOString()}`,
      `status: ${task.status}`,
      '',
      '## Storage',
      manifestText,
      '',
      '## Runtime snapshot',
      `messages: ${(task.messages || []).length}`,
      `events: ${(task.events || []).length}`,
      `files: ${(task.files || []).length}`,
      `artifacts: ${(task.artifacts || []).length}`,
      '',
      'Note: это metadata restore point. Raw файлы в браузере не сохранялись.'
    ].join('\n');
    const artifact = this.createArtifact(task, 'RESTORE_POINT', 'Restore point задачи', 'Metadata restore point для runtime/storage состояния.', content, 'storage');
    artifact.status = 'ready';
    this.addWorkspaceMessage(task, 'system_event', 'Хранилище', 'Создан restore point metadata.', {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.addWorkAudit(task, 'Создан storage restore point.');
    this.toast('Restore point создан');
  },

  renderWorkspaceArtifacts(task) {
    const host = document.getElementById('workspace-artifacts-list');
    const previewWrap = document.getElementById('workspace-context-preview-wrap');
    const preview = document.getElementById('workspace-context-preview');
    if (!host) return;
    const artifacts = Array.isArray(task.artifacts) ? task.artifacts : [];
    host.innerHTML = artifacts.length ? artifacts.map((artifact) => {
      const privacy = artifact.privacy_scan ? ` · Privacy: ${this.privacyScanSummary(artifact.privacy_scan)}` : '';
      return `
      <article class="workspace-artifact-card">
        <div>
          <strong>${this.escapeHtml(artifact.title)}</strong>
          <span>${this.escapeHtml(this.artifactTypeName(artifact.type))} · ${this.escapeHtml(artifact.status || 'draft')} · ${this.escapeHtml(this.formatTaskTime(artifact.created_at))}${this.escapeHtml(privacy)}</span>
          <p>${this.escapeHtml(artifact.summary || 'нет краткого описания')}</p>
        </div>
        <div class="workspace-file-actions">
          <button type="button" data-artifact-action="open" data-artifact-id="${this.escapeHtml(artifact.artifact_id)}">Открыть</button>
          <button type="button" data-artifact-action="copy" data-artifact-id="${this.escapeHtml(artifact.artifact_id)}">Копировать</button>
        </div>
      </article>
    `;
    }).join('') : '<p class="workspace-empty">Артефакты появятся после создания пакета, отчёта или проверки.</p>';
    const contextPack = artifacts.find((artifact) => artifact.type === 'CONTEXT_PACK' && artifact.status !== 'archived');
    if (previewWrap && preview) {
      previewWrap.hidden = !contextPack;
      preview.value = contextPack?.content || '';
    }
  },

  defaultResearchOpsState() {
    return {
      status: 'not_started',
      brief: {
        brief_id: '',
        question: '',
        scope: '',
        required_sources: [],
        open_questions: [],
        success_criteria: [],
        created_at: '',
        updated_at: ''
      },
      source_notes: [],
      source_cards: [],
      evidence_cards: [],
      research_pack: null,
      contradiction_map: null,
      rounds: [],
      updated_at: ''
    };
  },

  ensureResearchOpsState(task) {
    task.research_ops = task.research_ops && typeof task.research_ops === 'object' ? task.research_ops : this.defaultResearchOpsState();
    const research = task.research_ops;
    research.status = research.status || 'not_started';
    research.brief = research.brief && typeof research.brief === 'object' ? research.brief : this.defaultResearchOpsState().brief;
    research.brief.required_sources = Array.isArray(research.brief.required_sources) ? research.brief.required_sources : [];
    research.brief.open_questions = Array.isArray(research.brief.open_questions) ? research.brief.open_questions : [];
    research.brief.success_criteria = Array.isArray(research.brief.success_criteria) ? research.brief.success_criteria : [];
    research.source_notes = Array.isArray(research.source_notes) ? research.source_notes : [];
    research.source_cards = Array.isArray(research.source_cards) ? research.source_cards : [];
    research.evidence_cards = Array.isArray(research.evidence_cards) ? research.evidence_cards : [];
    research.research_pack = research.research_pack || null;
    research.contradiction_map = research.contradiction_map || null;
    research.rounds = Array.isArray(research.rounds) ? research.rounds : [];
    research.updated_at = research.updated_at || '';
    return research;
  },

  renderWorkspaceResearch(task) {
    const host = document.getElementById('workspace-research-panel');
    if (!host || !task) return;
    const research = this.ensureResearchOpsState(task);
    const brief = research.brief || {};
    const sourceCards = research.source_cards || [];
    const evidenceCards = research.evidence_cards || [];
    const pack = research.research_pack;
    host.innerHTML = `
      <section class="researchops-status-grid">
        <article>
          <span>Статус</span>
          <strong>${this.escapeHtml(this.researchStatusName(research.status))}</strong>
          <p>Автопоиск и скрытое чтение сайтов не выполняются.</p>
        </article>
        <article>
          <span>Источники</span>
          <strong>${sourceCards.length}</strong>
          <p>карточки источников</p>
        </article>
        <article>
          <span>Evidence</span>
          <strong>${evidenceCards.length}</strong>
          <p>карточки доказательств</p>
        </article>
        <article>
          <span>Пакет исследования</span>
          <strong>${pack ? 'готов' : 'не собран'}</strong>
          <p>${this.escapeHtml(pack ? this.formatTaskTime(pack.created_at) : 'сначала добавь brief и источники')}</p>
        </article>
      </section>

      <section class="researchops-block">
        <div class="workspace-panel-head">
          <strong>План исследования</strong>
          <span>что ищем и по каким критериям</span>
        </div>
        <label class="work-field">
          <span>Главный вопрос</span>
          <textarea id="research-brief-question" placeholder="Что нужно выяснить для решения задачи?">${this.escapeHtml(brief.question || '')}</textarea>
        </label>
        <label class="work-field">
          <span>Границы исследования</span>
          <textarea id="research-brief-scope" placeholder="Что входит, что не входит, какие ограничения важны.">${this.escapeHtml(brief.scope || '')}</textarea>
        </label>
        <div class="researchops-form-grid">
          <label class="work-field">
            <span>Нужные источники</span>
            <textarea id="research-required-sources" placeholder="Официальные docs&#10;GitHub issues&#10;Форумы владельцев">${this.escapeHtml((brief.required_sources || []).join('\n'))}</textarea>
          </label>
          <label class="work-field">
            <span>Открытые вопросы</span>
            <textarea id="research-open-questions" placeholder="Что пока непонятно?">${this.escapeHtml((brief.open_questions || []).join('\n'))}</textarea>
          </label>
          <label class="work-field">
            <span>Критерии качества</span>
            <textarea id="research-success-criteria" placeholder="Что должно быть доказано?">${this.escapeHtml((brief.success_criteria || []).join('\n'))}</textarea>
          </label>
        </div>
        <div class="work-actions">
          <button type="button" data-workspace-action="create_research_brief">Создать план из задачи</button>
          <button type="button" data-workspace-action="save_research_brief">Сохранить план</button>
          <button type="button" data-workspace-action="build_research_pack">Собрать пакет исследования</button>
          <button type="button" data-workspace-action="copy_research_pack" ${pack ? '' : 'disabled'}>Скопировать пакет</button>
        </div>
      </section>

      <section class="researchops-block">
        <div class="workspace-panel-head">
          <strong>Источник</strong>
          <span>ручная заметка владельца</span>
        </div>
        <div class="researchops-form-grid">
          <label class="work-field"><span>Название</span><input id="research-source-title" type="text" placeholder="Название источника"></label>
          <label class="work-field"><span>Ссылка или описание</span><input id="research-source-url" type="text" placeholder="https://... или где найдено"></label>
          <label class="work-field">
            <span>Тип</span>
            <select id="research-source-type">
              ${RESEARCH_SOURCE_TYPES.map(([id, label]) => `<option value="${this.escapeHtml(id)}">${this.escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
          <label class="work-field">
            <span>Доверие</span>
            <select id="research-source-trust">
              ${RESEARCH_TRUST_LEVELS.map(([id, label]) => `<option value="${this.escapeHtml(id)}">${this.escapeHtml(label)}</option>`).join('')}
            </select>
          </label>
        </div>
        <label class="work-field">
          <span>Краткий вывод источника</span>
          <textarea id="research-source-summary" placeholder="Что источник говорит по задаче?"></textarea>
        </label>
        <div class="researchops-form-grid">
          <label class="work-field"><span>Что подтверждает</span><textarea id="research-source-confirms" placeholder="Факт, решение, ограничение или риск"></textarea></label>
          <label class="work-field"><span>Риски источника</span><textarea id="research-source-risks" placeholder="Что может быть ошибочным, устаревшим или спорным"></textarea></label>
          <label class="work-field"><span>Проверить первым</span><textarea id="research-source-check" placeholder="Что основной ветке проверить первым"></textarea></label>
        </div>
        <label class="researchops-check">
          <input id="research-source-evidence" type="checkbox" checked>
          <span>Создать карточку доказательства</span>
        </label>
        <div class="work-actions">
          <button type="button" data-workspace-action="add_source_card">Добавить источник</button>
        </div>
      </section>

      <section class="researchops-block">
        <div class="workspace-panel-head">
          <strong>Карточки источников</strong>
          <span>${sourceCards.length}</span>
        </div>
        <div class="researchops-card-list">
          ${sourceCards.length ? sourceCards.map((card) => this.renderResearchSourceCard(card)).join('') : '<p class="workspace-empty">Источники появятся после ручного добавления.</p>'}
        </div>
      </section>

      <section class="researchops-block">
        <div class="workspace-panel-head">
          <strong>Карточки доказательств</strong>
          <span>${evidenceCards.length}</span>
        </div>
        <div class="researchops-card-list">
          ${evidenceCards.length ? evidenceCards.map((card) => this.renderResearchEvidenceCard(card)).join('') : '<p class="workspace-empty">Карточки доказательств появятся из источников, которые что-то подтверждают.</p>'}
        </div>
      </section>

      <section class="researchops-block">
        <div class="workspace-panel-head">
          <strong>Карта противоречий</strong>
          <span>${research.contradiction_map ? 'готово' : 'ожидает пакет исследования'}</span>
        </div>
        ${research.contradiction_map ? this.renderResearchContradictionMap(research.contradiction_map) : '<p class="workspace-empty">Карта строится при сборке пакета исследования.</p>'}
      </section>
    `;
  },

  renderResearchSourceCard(card) {
    return `
      <article class="researchops-card">
        <div>
          <strong>${this.escapeHtml(card.title)}</strong>
          <span>${this.escapeHtml(this.researchSourceTypeName(card.type))} · доверие: ${this.escapeHtml(this.researchTrustName(card.trust_level))}</span>
          <p>${this.escapeHtml(card.summary || 'summary не задан')}</p>
          <small>${this.escapeHtml(card.url || 'ссылка не задана')}</small>
        </div>
        <dl>
          <div><dt>Подтверждает</dt><dd>${this.escapeHtml(card.confirms || 'не задано')}</dd></div>
          <div><dt>Риски</dt><dd>${this.escapeHtml(card.risks || 'не задано')}</dd></div>
          <div><dt>Проверить</dt><dd>${this.escapeHtml(card.check_first || 'не задано')}</dd></div>
        </dl>
      </article>
    `;
  },

  renderResearchEvidenceCard(card) {
    return `
      <article class="researchops-card researchops-card--evidence">
        <div>
          <strong>${this.escapeHtml(card.title)}</strong>
          <span>доверие: ${this.escapeHtml(this.researchTrustName(card.confidence))} · источник: ${this.escapeHtml(card.source_title || card.source_id)}</span>
          <p>${this.escapeHtml(card.claim || 'claim не задан')}</p>
        </div>
        <small>${this.escapeHtml(card.use_in_decision ? 'использовать в решении' : 'требует проверки')}</small>
      </article>
    `;
  },

  renderResearchContradictionMap(map) {
    return `
      <dl class="researchops-map">
        <div><dt>Сильные источники</dt><dd>${this.escapeHtml(this.listOrFallback(map.strong_sources, 'нет'))}</dd></div>
        <div><dt>Слабые источники</dt><dd>${this.escapeHtml(this.listOrFallback(map.weak_sources, 'нет'))}</dd></div>
        <div><dt>Противоречия</dt><dd>${this.escapeHtml(this.listOrFallback(map.contradictions, 'явных противоречий нет'))}</dd></div>
        <div><dt>Пробелы</dt><dd>${this.escapeHtml(this.listOrFallback(map.source_gaps, 'нет'))}</dd></div>
        <div><dt>Проверить первым</dt><dd>${this.escapeHtml(this.listOrFallback(map.what_to_check_first, 'не задано'))}</dd></div>
      </dl>
    `;
  },

  researchStatusName(status) {
    const names = {
      not_started: 'не начато',
      brief_ready: 'план готов',
      sources_collecting: 'источники собираются',
      pack_ready: 'пакет готов',
      decision_ready: 'решение готово'
    };
    return names[status] || status || 'не начато';
  },

  researchSourceTypeName(type) {
    return RESEARCH_SOURCE_TYPE_BY_ID[type] || type || 'Источник';
  },

  researchTrustName(level) {
    return RESEARCH_TRUST_LEVEL_BY_ID[level] || level || 'неизвестно';
  },

  parseResearchList(text) {
    return String(text || '')
      .split(/\r?\n|;/)
      .map((item) => item.trim())
      .filter(Boolean);
  },

  createResearchBriefFromTask(task) {
    const research = this.ensureResearchOpsState(task);
    const activeAgents = this.activeHeadSearchAgents(this.headProfileById(this.ensureBrainCouncilState(task).profile_id) || this.activeHeadProfile());
    const now = new Date().toISOString();
    research.brief = {
      brief_id: research.brief.brief_id || this.generateWorkspaceId('RBRIEF'),
      question: `Какое решение по задаче "${task.title}" будет самым качественным, безопасным и проверяемым?`,
      scope: [
        `Проект: ${this.projectName(task.project_id)}.`,
        `Цель: ${task.goal || task.user_request}.`,
        `Режим: ${this.modeName(task.mode)}.`,
        `Качество: ${this.qualityName(task.quality_level)}.`,
        'Автопоиск, AI API и скрытый браузерный контроль не используются.'
      ].join('\n'),
      required_sources: activeAgents.length
        ? activeAgents.map((agent) => `${agent.name}: ${agent.role}`)
        : ['Официальные источники', 'Практические кейсы', 'Риски и ограничения'],
      open_questions: [
        task.next_step || 'Что проверить первым?',
        'Какие источники подтверждают решение?',
        'Какие риски могут опровергнуть вывод?'
      ],
      success_criteria: [
        'Есть карточки источников.',
        'Есть карточки доказательств или честно указан их недостаток.',
        'Есть пакет исследования.',
        'Совет мозгов получил исследовательский контекст.',
        'Паспорт решения содержит риски и проверки.'
      ],
      created_at: research.brief.created_at || now,
      updated_at: now
    };
    research.status = 'brief_ready';
    research.updated_at = now;
    this.upsertResearchBriefArtifact(task);
    this.addWorkspaceMessage(task, 'research_event', 'Исследование', 'План исследования создан из задачи.');
    this.addWorkAudit(task, 'Research Brief created.');
    this.toast('План исследования создан');
  },

  saveResearchBrief(task) {
    const research = this.ensureResearchOpsState(task);
    const now = new Date().toISOString();
    const current = research.brief || {};
    research.brief = {
      brief_id: current.brief_id || this.generateWorkspaceId('RBRIEF'),
      question: String(document.getElementById('research-brief-question')?.value || current.question || '').trim(),
      scope: String(document.getElementById('research-brief-scope')?.value || current.scope || '').trim(),
      required_sources: this.parseResearchList(document.getElementById('research-required-sources')?.value || current.required_sources?.join('\n') || ''),
      open_questions: this.parseResearchList(document.getElementById('research-open-questions')?.value || current.open_questions?.join('\n') || ''),
      success_criteria: this.parseResearchList(document.getElementById('research-success-criteria')?.value || current.success_criteria?.join('\n') || ''),
      created_at: current.created_at || now,
      updated_at: now
    };
    if (!research.brief.question) research.brief.question = `Что нужно выяснить для задачи: ${task.title}?`;
    research.status = 'brief_ready';
    research.updated_at = now;
    this.upsertResearchBriefArtifact(task);
    this.addWorkspaceMessage(task, 'research_event', 'Исследование', 'План исследования сохранён.');
    this.toast('План исследования сохранён');
  },

  addResearchSourceCard(task) {
    const research = this.ensureResearchOpsState(task);
    const now = new Date().toISOString();
    const title = String(document.getElementById('research-source-title')?.value || '').trim();
    const url = String(document.getElementById('research-source-url')?.value || '').trim();
    const summary = String(document.getElementById('research-source-summary')?.value || '').trim();
    const confirms = String(document.getElementById('research-source-confirms')?.value || '').trim();
    const risks = String(document.getElementById('research-source-risks')?.value || '').trim();
    const checkFirst = String(document.getElementById('research-source-check')?.value || '').trim();
    if (!title || !summary) {
      this.toast('Укажи название и краткий вывод источника');
      return;
    }
    const card = {
      source_id: this.generateWorkspaceId('SOURCE'),
      task_id: task.task_id,
      project_id: task.project_id,
      title,
      type: document.getElementById('research-source-type')?.value || 'manual_note',
      url,
      added_at: now,
      source_date: '',
      trust_level: document.getElementById('research-source-trust')?.value || 'unknown',
      summary,
      confirms,
      risks,
      check_first: checkFirst,
      status: 'added'
    };
    research.source_cards.unshift(card);
    research.source_notes.unshift({
      note_id: this.generateWorkspaceId('SNOTE'),
      source_id: card.source_id,
      text: summary,
      inserted_by: 'owner',
      created_at: now
    });
    const artifact = this.createArtifact(task, 'SOURCE_CARD', `Источник: ${title}`, summary, this.formatResearchSourceCard(card), 'researchops');
    artifact.status = 'ready';
    card.artifact_id = artifact.artifact_id;
    if (document.getElementById('research-source-evidence')?.checked && confirms) {
      const evidence = {
        evidence_id: this.generateWorkspaceId('EVID'),
        source_id: card.source_id,
        source_title: card.title,
        title: `Доказательство: ${title}`,
        claim: confirms,
        confidence: card.trust_level,
        risks,
        use_in_decision: card.trust_level !== 'low',
        created_at: now
      };
      research.evidence_cards.unshift(evidence);
      const evidenceArtifact = this.createArtifact(task, 'EVIDENCE_CARD', evidence.title, evidence.claim, this.formatResearchEvidenceCard(evidence), 'researchops');
      evidenceArtifact.status = 'ready';
      evidence.artifact_id = evidenceArtifact.artifact_id;
    }
    research.status = 'sources_collecting';
    research.research_pack = null;
    research.contradiction_map = null;
    research.updated_at = now;
    this.addWorkspaceMessage(task, 'research_event', 'Исследование', `Добавлен источник: ${title}.`, {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    ['research-source-title', 'research-source-url', 'research-source-summary', 'research-source-confirms', 'research-source-risks', 'research-source-check'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.value = '';
    });
    this.toast('Источник добавлен');
  },

  buildResearchPack(task) {
    const research = this.ensureResearchOpsState(task);
    if (!research.brief?.question) this.createResearchBriefFromTask(task);
    const now = new Date().toISOString();
    const sourceCards = research.source_cards || [];
    const evidenceCards = research.evidence_cards || [];
    const contradictionMap = this.buildResearchContradictionMap(task, sourceCards, evidenceCards);
    const pack = {
      research_pack_id: this.generateWorkspaceId('RPACK'),
      task_id: task.task_id,
      project_id: task.project_id,
      brief: research.brief,
      source_card_ids: sourceCards.map((card) => card.source_id),
      evidence_card_ids: evidenceCards.map((card) => card.evidence_id),
      facts: sourceCards.map((card) => card.confirms).filter(Boolean),
      assumptions: research.brief.open_questions || [],
      contradictions: contradictionMap.contradictions,
      strong_sources: contradictionMap.strong_sources,
      weak_sources: contradictionMap.weak_sources,
      source_gaps: contradictionMap.source_gaps,
      what_to_check_first: contradictionMap.what_to_check_first,
      recommendations: this.researchRecommendations(task, contradictionMap),
      created_at: now,
      status: sourceCards.length ? 'ready' : 'needs_sources'
    };
    research.contradiction_map = contradictionMap;
    research.research_pack = pack;
    research.status = 'pack_ready';
    research.updated_at = now;
    research.rounds = [
      ...research.rounds.filter((round) => round.type !== 'research_pack_created'),
      { round_id: this.generateWorkspaceId('RROUND'), type: 'research_pack_created', text: 'Пакет исследования собран для Совета мозгов.', created_at: now }
    ];
    const artifact = this.createArtifact(task, 'RESEARCH_PACK', 'Пакет исследования', `${sourceCards.length} источников, ${evidenceCards.length} доказательств.`, this.formatResearchPack(task, pack), 'researchops');
    artifact.status = pack.status === 'ready' ? 'ready' : 'needs_sources';
    pack.artifact_id = artifact.artifact_id;
    this.addWorkspaceMessage(task, 'research_event', 'Исследование', 'Пакет исследования собран и готов для Совета мозгов.', {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.addWorkAudit(task, 'Research Pack created.');
    this.toast('Пакет исследования собран');
  },

  copyResearchPack(task) {
    const research = this.ensureResearchOpsState(task);
    if (!research.research_pack) this.buildResearchPack(task);
    const content = this.formatResearchPack(task, research.research_pack);
    const scan = this.scanPrivacyText(content);
    if (scan.findings.length) {
      this.workspacePendingCopyText = content;
      this.workspacePendingPrivacyFindings = scan.findings;
      this.renderPrivacyGuardFindings(scan.findings);
      const guard = document.getElementById('workspace-privacy-guard');
      if (guard) guard.hidden = false;
      this.addWorkspaceMessage(task, 'system_event', 'Privacy Guard', `Пакет исследования требует проверки: ${this.privacyScanSummary(scan)}.`);
      this.toast('Privacy Guard требует проверки');
      return;
    }
    this.copyWorkspaceText(content);
    this.addWorkspaceMessage(task, 'research_event', 'Исследование', 'Пакет исследования скопирован вручную.');
  },

  buildResearchContradictionMap(task, sourceCards, evidenceCards) {
    const activeAgents = this.activeHeadSearchAgents(this.headProfileById(this.ensureBrainCouncilState(task).profile_id) || this.activeHeadProfile());
    const strongSources = sourceCards
      .filter((card) => card.trust_level === 'high')
      .map((card) => card.title);
    const weakSources = sourceCards
      .filter((card) => ['low', 'unknown'].includes(card.trust_level))
      .map((card) => `${card.title}: ${this.researchTrustName(card.trust_level)}`);
    const contradictions = sourceCards
      .filter((card) => /противореч|не совпад|conflict|contradict|спорн/i.test([card.summary, card.risks, card.confirms].join(' ')))
      .map((card) => `${card.title}: ${card.risks || card.summary}`);
    const existingTypes = new Set(sourceCards.map((card) => card.type));
    const sourceGaps = activeAgents
      .filter((agent) => !this.researchAgentCovered(agent, existingTypes))
      .map((agent) => `${agent.name}: источник ещё не добавлен`);
    if (!sourceCards.length) sourceGaps.push('Нет карточек источников. Решение нельзя считать исследованным.');
    if (!evidenceCards.length) sourceGaps.push('Нет карточек доказательств. Финальный вывод должен быть с риском.');
    return {
      map_id: this.generateWorkspaceId('RMAP'),
      strong_sources: strongSources,
      weak_sources: weakSources,
      contradictions: contradictions.length ? contradictions : [],
      source_gaps: sourceGaps,
      what_to_check_first: [
        ...sourceCards.map((card) => card.check_first).filter(Boolean).slice(0, 5),
        task.next_step || ''
      ].filter(Boolean),
      created_at: new Date().toISOString()
    };
  },

  researchAgentCovered(agent, existingTypes) {
    const text = `${agent.name} ${agent.source_type || ''} ${agent.role || ''}`.toLowerCase();
    if (/github/.test(text)) return existingTypes.has('github');
    if (/youtube/.test(text)) return existingTypes.has('youtube');
    if (/reddit/.test(text)) return existingTypes.has('reddit');
    if (/4pda/.test(text)) return existingTypes.has('4pda') || existingTypes.has('forum');
    if (/xda/.test(text)) return existingTypes.has('xda') || existingTypes.has('forum');
    if (/stackoverflow/.test(text)) return existingTypes.has('stackoverflow');
    if (/news/.test(text)) return existingTypes.has('news');
    if (/paper|academic|академ/.test(text)) return existingTypes.has('papers');
    if (/review|обзор/.test(text)) return existingTypes.has('product_review');
    if (/official|docs|докум/.test(text)) return existingTypes.has('official_docs');
    return existingTypes.size > 0;
  },

  researchRecommendations(task, map) {
    const recommendations = [];
    if (map.source_gaps.length) recommendations.push('Закрыть пробелы источников или явно принять решение с риском.');
    if (map.contradictions.length) recommendations.push('Перед решением дать критику противоречий DeepSeek/критиком.');
    if (!map.strong_sources.length) recommendations.push('Добавить хотя бы один источник высокого доверия.');
    recommendations.push('Передать пакет исследования всем активным мозгам Совета.');
    recommendations.push(task.next_step || 'Сформировать паспорт решения после сравнения ответов.');
    return recommendations;
  },

  formatResearchSourceCard(card) {
    return [
      '# Карточка источника',
      '',
      `source_id: ${card.source_id}`,
      `title: ${card.title}`,
      `type: ${this.researchSourceTypeName(card.type)}`,
      `trust_level: ${this.researchTrustName(card.trust_level)}`,
      `url_or_description: ${card.url || 'не задано'}`,
      `added_at: ${card.added_at}`,
      '',
      '## Summary',
      card.summary || 'не задано',
      '',
      '## Confirms',
      card.confirms || 'не задано',
      '',
      '## Risks',
      card.risks || 'не задано',
      '',
      '## What To Check First',
      card.check_first || 'не задано'
    ].join('\n');
  },

  formatResearchEvidenceCard(card) {
    return [
      '# Карточка доказательства',
      '',
      `evidence_id: ${card.evidence_id}`,
      `source_id: ${card.source_id}`,
      `source_title: ${card.source_title}`,
      `confidence: ${this.researchTrustName(card.confidence)}`,
      `use_in_decision: ${card.use_in_decision ? 'yes' : 'needs_review'}`,
      '',
      '## Claim',
      card.claim || 'не задано',
      '',
      '## Risks',
      card.risks || 'не задано'
    ].join('\n');
  },

  upsertResearchBriefArtifact(task) {
    const research = this.ensureResearchOpsState(task);
    const content = this.formatResearchBrief(task, research.brief);
    const existing = (task.artifacts || []).find((artifact) => artifact.type === 'RESEARCH_BRIEF' && artifact.status !== 'archived');
    const artifact = existing || this.createArtifact(task, 'RESEARCH_BRIEF', 'План исследования', 'Вопрос, границы и критерии исследования.', content, 'researchops');
    artifact.content = content;
    artifact.summary = research.brief.question || 'План исследования';
    artifact.status = 'ready';
    artifact.updated_at = new Date().toISOString();
    research.brief.artifact_id = artifact.artifact_id;
    return artifact;
  },

  formatResearchBrief(task, brief) {
    return [
      '# План исследования',
      '',
      `brief_id: ${brief?.brief_id || 'draft'}`,
      `task_id: ${task.task_id}`,
      `project: ${this.projectName(task.project_id)}`,
      '',
      '## Главный вопрос',
      brief?.question || 'не задано',
      '',
      '## Границы',
      brief?.scope || 'не задано',
      '',
      '## Нужные источники',
      this.listOrFallback(brief?.required_sources, 'не задано'),
      '',
      '## Открытые вопросы',
      this.listOrFallback(brief?.open_questions, 'не задано'),
      '',
      '## Критерии качества',
      this.listOrFallback(brief?.success_criteria, 'не задано')
    ].join('\n');
  },

  formatResearchPack(task, pack) {
    const research = this.ensureResearchOpsState(task);
    const brief = pack?.brief || research.brief || {};
    return [
      '# Пакет исследования',
      '',
      `research_pack_id: ${pack?.research_pack_id || 'draft'}`,
      `task_id: ${task.task_id}`,
      `project: ${this.projectName(task.project_id)}`,
      `status: ${pack?.status || 'draft'}`,
      `created_at: ${pack?.created_at || new Date().toISOString()}`,
      '',
      '## План исследования',
      brief.question || 'не задано',
      '',
      '## Scope',
      brief.scope || 'не задано',
      '',
      '## Required Sources',
      this.listOrFallback(brief.required_sources, 'не задано'),
      '',
      '## Open Questions',
      this.listOrFallback(brief.open_questions, 'не задано'),
      '',
      '## Карточки источников',
      (research.source_cards || []).length ? research.source_cards.map((card) => `- ${card.title} (${this.researchSourceTypeName(card.type)}, доверие: ${this.researchTrustName(card.trust_level)}): ${card.summary}`).join('\n') : '- нет',
      '',
      '## Карточки доказательств',
      (research.evidence_cards || []).length ? research.evidence_cards.map((card) => `- ${card.title}: ${card.claim}`).join('\n') : '- нет',
      '',
      '## Facts',
      this.listOrFallback(pack?.facts, 'нет подтверждённых фактов'),
      '',
      '## Contradictions',
      this.listOrFallback(pack?.contradictions, 'явных противоречий нет'),
      '',
      '## Source Gaps',
      this.listOrFallback(pack?.source_gaps, 'нет'),
      '',
      '## What To Check First',
      this.listOrFallback(pack?.what_to_check_first, task.next_step || 'не задано'),
      '',
      '## Research Recommendations',
      this.listOrFallback(pack?.recommendations, 'передать Совету мозгов')
    ].join('\n');
  },

  researchPackPromptBlock(task) {
    const research = this.ensureResearchOpsState(task);
    if (!research.research_pack) {
      return [
        'Пакет исследования:',
        '- Пакет исследования ещё не собран.',
        '- Финальное решение должно явно указать риск недостаточного исследования.'
      ].join('\n');
    }
    return this.formatResearchPack(task, research.research_pack);
  },

  renderWorkspaceCouncil(task) {
    const host = document.getElementById('workspace-council-panel');
    if (!host) return;
    this.ensureBrainCouncilState(task);
    const council = task.brain_council;
    const profile = this.headProfileById(council.profile_id) || this.activeHeadProfile();
    const roles = this.councilRolesForTask(task);
    const packages = council.prompt_packages || [];
    const answers = council.answers || [];
    const comparison = council.comparison;
    const synthesis = council.strategist_synthesis;
    const research = this.ensureResearchOpsState(task);
    host.innerHTML = `
      <section class="brainops-status-grid">
        <article>
          <span>Режим</span>
          <strong>ручной совет</strong>
          <p>Терминатор готовит пакеты. Пользователь копирует их во внешние чаты и вставляет ответы обратно.</p>
        </article>
        <article>
          <span>Профиль</span>
          <strong>${this.escapeHtml(profile?.name || 'Основной')}</strong>
          <p>Стратег сохраняется до ручного изменения владельцем.</p>
        </article>
        <article>
          <span>Исследование</span>
          <strong>${this.escapeHtml(this.researchStatusName(research.status))}</strong>
          <p>${research.research_pack ? 'Пакет исследования включается в пакеты Совета.' : 'Можно собрать пакет исследования перед промптами.'}</p>
        </article>
        <article>
          <span>AI API</span>
          <strong>не используются</strong>
          <p>Нет backend-вызовов, токенов, внешних API или скрытой отправки данных.</p>
        </article>
        <article>
          <span>Integrity</span>
          <strong>${this.escapeHtml(this.brainIntegrityName(council.integrity_status))}</strong>
          <p>${this.escapeHtml(this.brainCouncilStatusText(task))}</p>
        </article>
      </section>

      <section class="brainops-roles">
        ${roles.map((role) => this.renderBrainRoleCard(role, packages, answers)).join('') || '<p class="workspace-empty">В Голова -> Совет включите хотя бы один мозг.</p>'}
      </section>

      <section class="brainops-panel-block">
        <div class="workspace-panel-head">
          <strong>Ответ мозга</strong>
          <span>Вставка вручную</span>
        </div>
        <label class="work-field">
          <span>Профиль Совета</span>
          <select id="workspace-council-profile-select">
            ${(this.headProfiles || []).map((item) => `<option value="${this.escapeHtml(item.profile_id)}"${item.profile_id === profile?.profile_id ? ' selected' : ''}>${this.escapeHtml(item.name)}</option>`).join('')}
          </select>
        </label>
        <label class="work-field">
          <span>Мозг</span>
          <select id="workspace-brain-role">
            ${roles.map((role) => `<option value="${this.escapeHtml(role.id)}">${this.escapeHtml(role.brain)} — ${this.escapeHtml(role.role)}</option>`).join('')}
          </select>
        </label>
        <label class="work-field">
          <span>Ответ</span>
          <textarea id="workspace-brain-answer" placeholder="Вставьте ответ выбранного мозга."></textarea>
        </label>
        <div class="work-actions">
          <button type="button" data-workspace-action="save_brain_answer">Сохранить ответ</button>
          <button type="button" data-workspace-action="build_brain_comparison">Сравнить ответы</button>
          <button type="button" data-workspace-action="create_brain_decision">Создать паспорт решения</button>
        </div>
      </section>

      <section class="brainops-panel-block">
        <div class="workspace-panel-head">
          <strong>Ответы</strong>
          <span>${answers.length}</span>
        </div>
        <div class="brainops-answer-list">
          ${answers.length ? answers.map((answer) => this.renderBrainAnswerCard(answer)).join('') : '<p class="workspace-empty">Ответы появятся после ручной вставки.</p>'}
        </div>
      </section>

      <section class="brainops-panel-block">
        <div class="workspace-panel-head">
          <strong>Сравнение</strong>
          <span>${comparison ? 'готово' : 'ожидает ответов'}</span>
        </div>
        ${comparison ? this.renderBrainComparison(comparison) : '<p class="workspace-empty">Нужно минимум два ответа для полезного сравнения.</p>'}
      </section>

      <section class="brainops-panel-block">
        <div class="workspace-panel-head">
          <strong>Паспорт решения</strong>
          <span>${synthesis ? 'создан' : 'не создан'}</span>
        </div>
        ${synthesis ? `<pre class="brainops-decision">${this.escapeHtml(synthesis.content)}</pre>` : '<p class="workspace-empty">Паспорт решения создаётся после сравнения или хотя бы одного ответа.</p>'}
      </section>
    `;
  },

  councilRolesForTask(task) {
    const council = this.ensureBrainCouncilState(task);
    const profile = this.headProfileById(council.profile_id) || this.activeHeadProfile();
    const profileBrainIds = new Set(profile?.council_members || []);
    const brains = (this.headBrains || [])
      .filter((brain) => !brain.archived && brain.enabled && (!profileBrainIds.size || profileBrainIds.has(brain.brain_id)))
      .sort((a, b) => a.order - b.order || a.display_name.localeCompare(b.display_name, 'ru'));
    if (brains.length) {
      return brains.map((brain) => ({
        id: `head_${brain.brain_id}`,
        brain_id: brain.brain_id,
        brain: brain.display_name,
        short: this.brainShortLabel(brain.display_name),
        role: brain.role,
        mission: brain.default_role || brain.notes || 'Дать самостоятельную позицию в Совете.',
        focus: brain.notes || brain.default_role || brain.role,
        artifact_title: `Ответ ${brain.display_name} / ${brain.role}`,
        official_url: brain.official_url,
        selected_model_name: brain.selected_model_name,
        is_main_strategist: Boolean(brain.is_main_strategist || profile?.main_strategist_id === brain.brain_id)
      }));
    }
    return BRAIN_ROLES;
  },

  brainRoleById(roleId, task = this.getActiveWorkTask()) {
    return this.councilRolesForTask(task || {}).find((role) => role.id === roleId)
      || BRAIN_ROLE_BY_ID[roleId]
      || this.councilRolesForTask(task || {})[0]
      || BRAIN_ROLES[0];
  },

  brainShortLabel(name) {
    const clean = String(name || 'AI').replace(/[^A-Za-zА-Яа-я0-9 ]/g, '').trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length > 1) return parts.map((part) => part[0]).join('').slice(0, 3).toUpperCase();
    return clean.slice(0, 3).toUpperCase() || 'AI';
  },

  async updateTaskCouncilProfile(profileId) {
    const task = this.getActiveWorkTask();
    const profile = this.headProfileById(profileId);
    if (!task || !profile) return;
    const council = this.ensureBrainCouncilState(task);
    council.profile_id = profile.profile_id;
    council.profile_name = profile.name;
    council.prompt_packages = [];
    council.status = 'profile_selected';
    council.updated_at = new Date().toISOString();
    this.addWorkspaceMessage(task, 'brain_council', 'Голова', `Выбран профиль Совета: ${profile.name}.`);
    await this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  renderBrainRoleCard(role, packages, answers) {
    const pack = packages.find((item) => item.role_id === role.id);
    const answer = answers.find((item) => item.role_id === role.id);
    return `
      <article class="brainops-role-card">
        <div class="brainops-role-mark">${this.escapeHtml(role.short)}</div>
        <div>
          <strong>${this.escapeHtml(role.brain)}</strong>
          <span>${this.escapeHtml(role.role)}</span>
          <p>${this.escapeHtml(role.mission)}</p>
          <small>${this.escapeHtml(role.focus)}</small>
        </div>
        <div class="brainops-role-actions">
          <button type="button" data-workspace-action="copy_brain_prompt" data-brain-role="${this.escapeHtml(role.id)}" ${pack ? '' : 'disabled'}>Скопировать пакет</button>
          <span>${pack ? 'пакет готов' : 'нет пакета'} · ${answer ? 'ответ сохранён' : 'нет ответа'}</span>
        </div>
      </article>
    `;
  },

  renderBrainAnswerCard(answer) {
    const role = this.brainRoleById(answer.role_id) || {};
    return `
      <article class="brainops-answer-card">
        <div>
          <strong>${this.escapeHtml(role.brain || answer.brain || answer.role_id)}</strong>
          <span>${this.escapeHtml(role.role || answer.role || 'роль не задана')} · ${this.escapeHtml(this.brainIntegrityName(answer.integrity?.status))}</span>
          <p>${this.escapeHtml(answer.summary || 'краткое резюме не выделено')}</p>
          <small>Уверенность: ${this.escapeHtml(answer.confidence || 'не указана')} · Проверить: ${this.escapeHtml(answer.what_to_check_first || 'не указано')}</small>
        </div>
        <small>${this.escapeHtml(this.formatTaskTime(answer.created_at))}</small>
      </article>
    `;
  },

  renderBrainComparison(comparison) {
    return `
      <dl class="brainops-comparison">
        <div><dt>Общее</dt><dd>${this.escapeHtml(comparison.consensus || 'не найдено')}</dd></div>
        <div><dt>Расхождения</dt><dd>${this.escapeHtml(this.listOrFallback(comparison.disagreements, 'нет данных'))}</dd></div>
        <div><dt>Карта противоречий</dt><dd>${this.escapeHtml(this.listOrFallback([
          ...(comparison.contradiction_map?.source_contradictions || []),
          ...(comparison.contradiction_map?.answer_contradictions || []),
          ...(comparison.contradiction_map?.source_gaps || [])
        ], 'критичных противоречий нет'))}</dd></div>
        <div><dt>Источники</dt><dd>${this.escapeHtml(comparison.source_support || 'Research Pack не собран')}</dd></div>
        <div><dt>Риски</dt><dd>${this.escapeHtml(this.listOrFallback(comparison.risks, 'нет данных'))}</dd></div>
        <div><dt>Лучший следующий шаг</dt><dd>${this.escapeHtml(comparison.next_step || 'не задано')}</dd></div>
      </dl>
    `;
  },

  ensureBrainCouncilState(task) {
    task.brain_council = task.brain_council && typeof task.brain_council === 'object' ? task.brain_council : {};
    task.brain_council.status = task.brain_council.status || 'not_started';
    task.brain_council.prompt_packages = Array.isArray(task.brain_council.prompt_packages) ? task.brain_council.prompt_packages : [];
    task.brain_council.answers = Array.isArray(task.brain_council.answers) ? task.brain_council.answers : [];
    task.brain_council.comparison = task.brain_council.comparison || null;
    task.brain_council.strategist_synthesis = task.brain_council.strategist_synthesis || null;
    task.brain_council.integrity_status = task.brain_council.integrity_status || 'not_checked';
    task.brain_council.profile_id = task.brain_council.profile_id || this.activeHeadProfileId || 'profile_main';
    task.brain_council.profile_name = task.brain_council.profile_name || this.headProfileById(task.brain_council.profile_id)?.name || 'Основной';
    return task.brain_council;
  },

  buildBrainPromptPackages(task) {
    const council = this.ensureBrainCouncilState(task);
    const createdAt = new Date().toISOString();
    const roles = this.councilRolesForTask(task);
    council.prompt_packages = roles.map((role) => {
      const existing = council.prompt_packages.find((item) => item.role_id === role.id);
      return {
        package_id: existing?.package_id || this.generateWorkspaceId('BRAINPROMPT'),
        role_id: role.id,
        brain_id: role.brain_id || '',
        brain: role.brain,
        role: role.role,
        content: this.buildBrainPromptText(task, role),
        created_at: existing?.created_at || createdAt,
        updated_at: createdAt,
        status: 'ready'
      };
    });
    council.status = 'prompts_ready';
    council.updated_at = createdAt;
    const artifact = this.createArtifact(
      task,
      'BRAIN_PROMPT_PACKAGE',
      'Пакеты для Совета мозгов',
      `Prompt packages для профиля ${this.headProfileById(council.profile_id)?.name || 'Совет'}. Отправка вручную.`,
      council.prompt_packages.map((pack) => `# ${pack.brain} — ${pack.role}\n\n${pack.content}`).join('\n\n---\n\n'),
      'brainops'
    );
    artifact.status = 'ready';
    this.addWorkspaceMessage(task, 'context_pack_created', 'Совет мозгов', 'Пакеты для Совета мозгов сформированы. Отправка только вручную.', {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.addWorkAudit(task, 'BrainOps prompt packages created.');
    this.switchWorkspaceTab('council');
    this.toast('Пакеты Совета готовы');
  },

  buildBrainPromptText(task, role) {
    const evidence = (task.files || []).filter((file) => file.is_evidence || ['evidence', 'verifier_input', 'result_archive'].includes(file.role));
    const artifacts = (task.artifacts || []).filter((artifact) => ['SPEC', 'CONTEXT_PACK', 'EXECUTOR_REPORT', 'VERIFIER_VERDICT', 'CHECK_LOG', 'DECISION_RECORD'].includes(artifact.type));
    const council = this.ensureBrainCouncilState(task);
    const profile = this.headProfileById(council.profile_id) || this.activeHeadProfile();
    const strategist = this.headBrainById(profile?.main_strategist_id || '');
    const searchAgents = this.activeHeadSearchAgents(profile);
    return [
      `Ты работаешь как ${role.brain}: ${role.role} в Совете мозгов Терминатора.`,
      '',
      'Правила:',
      '- Не использовать AI API.',
      '- Не предлагать опасные действия без Approval.',
      '- Не просить секреты, токены, .env значения.',
      '- Дай самостоятельную позицию, но учитывай роль Совета.',
      '- Не пиши общие рассуждения без практического вывода.',
      '- Финальный Стратег выбирается владельцем и не подменяется автоматически.',
      '',
      `Профиль Совета: ${profile?.name || 'Основной'}.`,
      `Главный Стратег владельца: ${strategist ? `${strategist.display_name} / ${strategist.selected_model_name}` : 'не выбран'}.`,
      `Твой желаемый model label: ${role.selected_model_name || role.brain}.`,
      `Фокус роли: ${role.focus}.`,
      `Миссия роли: ${role.mission}`,
      `Активные исследователи: ${searchAgents.length ? searchAgents.map((agent) => `${agent.name} (${agent.role})`).join('; ') : 'не заданы'}.`,
      '',
      'Задача:',
      `task_id: ${task.task_id}`,
      `project: ${this.projectName(task.project_id)}`,
      `title: ${task.title}`,
      `goal: ${task.goal || task.user_request}`,
      `status: ${this.statusName(task.status)}`,
      `mode: ${this.modeName(task.mode)}`,
      `quality: ${this.qualityName(task.quality_level)}`,
      '',
      'Контекст:',
      `- next_step: ${task.next_step || 'не задано'}`,
      `- readiness: ${this.listOrFallback(task.readiness_criteria, 'не задано')}`,
      `- risks: ${this.listOrFallback(task.risks, 'не задано')}`,
      `- forbidden_actions: ${this.listOrFallback(task.forbidden_actions, 'не задано')}`,
      '',
      'Артефакты:',
      artifacts.length ? artifacts.map((artifact) => `- ${artifact.title} (${this.artifactTypeName(artifact.type)}, ${artifact.status || 'draft'})`).join('\n') : '- нет',
      '',
      'Evidence/files:',
      evidence.length ? evidence.map((file) => `- ${file.name} (${this.fileRoleName(file.role)}, ${file.hash_status || 'hash не задан'})`).join('\n') : '- нет evidence',
      '',
      'Исследование:',
      this.researchPackPromptBlock(task),
      '',
      'Ответь строго в формате:',
      '1. Позиция роли.',
      '2. Лучшее решение.',
      '3. Аргументы.',
      '4. Допущения.',
      '5. Риски и слабые места.',
      '6. Что может опровергнуть вывод.',
      '7. Что проверить первым.',
      '8. Что нельзя делать.',
      '9. Уверенность.',
      '10. Итоговый verdict роли.'
    ].join('\n');
  },

  copyBrainPromptPackage(task, roleId) {
    const council = this.ensureBrainCouncilState(task);
    if (!council.prompt_packages.length) this.buildBrainPromptPackages(task);
    const pack = council.prompt_packages.find((item) => item.role_id === roleId) || council.prompt_packages[0];
    if (!pack) return;
    const scan = this.scanPrivacyText(pack.content);
    if (scan.findings.length) {
      this.workspacePendingCopyText = pack.content;
      this.workspacePendingPrivacyFindings = scan.findings;
      this.renderPrivacyGuardFindings(scan.findings);
      const guard = document.getElementById('workspace-privacy-guard');
      if (guard) guard.hidden = false;
      this.addWorkspaceMessage(task, 'system_event', 'Privacy Guard', `Brain prompt требует проверки: ${this.privacyScanSummary(scan)}.`);
      this.toast('Privacy Guard требует проверки');
      return;
    }
    this.copyWorkspaceText(pack.content);
    this.addWorkspaceMessage(task, 'system_event', 'Совет мозгов', `Скопирован пакет: ${pack.brain} / ${pack.role}.`);
  },

  saveBrainAnswer(task) {
    const roles = this.councilRolesForTask(task);
    const roleId = document.getElementById('workspace-brain-role')?.value || roles[0]?.id || BRAIN_ROLES[0].id;
    const textarea = document.getElementById('workspace-brain-answer');
    const text = String(textarea?.value || '').trim();
    const role = this.brainRoleById(roleId, task) || roles[0] || BRAIN_ROLES[0];
    if (!text) {
      this.toast('Вставь ответ мозга');
      textarea?.focus();
      return;
    }
    const council = this.ensureBrainCouncilState(task);
    const integrity = this.checkBrainAnswerIntegrity(text, role);
    const passport = this.extractBrainAnswerPassport(text);
    const promptPackage = (council.prompt_packages || []).find((item) => item.role_id === role.id);
    const research = this.ensureResearchOpsState(task);
    const now = new Date().toISOString();
    const answer = {
      answer_id: this.generateWorkspaceId('BRAINANS'),
      role_id: role.id,
      brain_id: role.brain_id || '',
      brain: role.brain,
      role: role.role,
      content: text,
      summary: this.summarizeBrainAnswer(text),
      main_conclusion: passport.main_conclusion,
      arguments: passport.arguments,
      assumptions: passport.assumptions,
      risks: passport.risks,
      confidence: passport.confidence,
      what_can_disprove: passport.what_can_disprove,
      what_to_check_first: passport.what_to_check_first,
      contradictions_with_others: [],
      used_in_final_decision: false,
      prompt_text: promptPackage?.content || '',
      source_refs: research.research_pack?.source_card_ids || [],
      research_pack_id: research.research_pack?.research_pack_id || '',
      integrity,
      created_at: now,
      status: integrity.status === 'blocked' ? 'needs_review' : 'saved',
      source_type: 'manual_web_chat',
      api_used: false,
      inserted_by: 'owner'
    };
    council.answers = (council.answers || []).filter((item) => item.role_id !== role.id);
    council.answers.push(answer);
    council.status = 'answers_collecting';
    council.integrity_status = this.brainCouncilIntegrityStatus(council);
    council.updated_at = now;
    const artifact = this.createArtifact(task, 'BRAIN_ANSWER', role.artifact_title, answer.summary, text, 'brainops');
    artifact.status = answer.status;
    artifact.brain_role_id = role.id;
    artifact.integrity = integrity;
    this.addWorkspaceMessage(task, 'brain_answer', role.brain, `Ответ сохранён: ${role.role}. Integrity: ${this.brainIntegrityName(integrity.status)}.`, {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    if (textarea) textarea.value = '';
    this.toast('Ответ Совета сохранён');
  },

  checkBrainAnswerIntegrity(text, role) {
    const findings = [];
    const source = String(text || '');
    if (source.length < 120) findings.push('ответ слишком короткий для серьёзного решения');
    if (!/(риск|опас|слаб|ошиб|risk)/i.test(source)) findings.push('нет явного блока рисков');
    if (!/(провер|verify|check|qa|тест)/i.test(source)) findings.push('нет явного первого шага проверки');
    if (!/(нельзя|запрещ|do not|avoid)/i.test(source)) findings.push('нет запретов / what not to do');
    const privacy = this.scanPrivacyText(source);
    if (privacy.findings.length) findings.push(`possible secret: ${this.privacyScanSummary(privacy)}`);
    if (this.verifierHasDisallowedAiApiSignals(source)) findings.push('текст выглядит как использование AI API');
    return {
      role_id: role.id,
      status: findings.some((item) => /secret|AI API/i.test(item)) ? 'blocked' : findings.length ? 'review' : 'pass',
      findings,
      checked_at: new Date().toISOString()
    };
  },

  brainCouncilIntegrityStatus(council) {
    const answers = council.answers || [];
    if (!answers.length) return 'not_checked';
    if (answers.some((answer) => answer.integrity?.status === 'blocked')) return 'blocked';
    if (answers.some((answer) => answer.integrity?.status === 'review')) return 'review';
    return 'pass';
  },

  brainIntegrityName(status) {
    const names = {
      not_checked: 'не проверено',
      pass: 'PASS',
      review: 'требует проверки',
      blocked: 'заблокировано'
    };
    return names[status] || status || 'не проверено';
  },

  summarizeBrainAnswer(text) {
    return String(text || '').replace(/\s+/g, ' ').trim().slice(0, 220) || 'ответ без summary';
  },

  extractBrainAnswerPassport(text) {
    const source = String(text || '');
    const lines = source.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const riskLines = lines.filter((line) => /риск|опас|слаб|ошиб|risk/i.test(line)).slice(0, 6);
    const assumptionLines = lines.filter((line) => /допущ|предполож|assumption/i.test(line)).slice(0, 6);
    const argumentLines = lines.filter((line) => /аргумент|потому|так как|следует|^\d+\.|^-|\*/i.test(line)).slice(0, 8);
    const checkLine = lines.find((line) => /проверить первым|что проверить|first|check/i.test(line)) || '';
    const disproveLine = lines.find((line) => /опроверг|disprove|сломает вывод|что может/i.test(line)) || '';
    const confidenceMatch = source.match(/(?:уверенность|confidence)\s*[:=-]?\s*([А-Яа-яA-Za-z0-9% ]{3,30})/i);
    return {
      main_conclusion: lines.find((line) => /итог|вывод|решение|verdict/i.test(line)) || this.summarizeBrainAnswer(source),
      arguments: argumentLines,
      assumptions: assumptionLines,
      risks: riskLines,
      confidence: confidenceMatch ? confidenceMatch[1].trim() : 'не указана',
      what_can_disprove: disproveLine || 'не указано',
      what_to_check_first: checkLine || 'не указано'
    };
  },

  detectBrainAnswerContradictions(answers) {
    const contradictions = [];
    const hasApprove = answers.filter((answer) => /принять|pass|готов|можно делать|accept/i.test(answer.content));
    const hasReject = answers.filter((answer) => /отклон|reject|нельзя принимать|вернуть|needs_fix|опасно/i.test(answer.content));
    if (hasApprove.length && hasReject.length) {
      contradictions.push(`Разные verdict: ${hasApprove.map((answer) => answer.brain).join(', ')} склоняются принять; ${hasReject.map((answer) => answer.brain).join(', ')} видят блокер.`);
    }
    const noEvidence = answers.filter((answer) => /нет evidence|нет доказ|без evidence|missing evidence/i.test(answer.content));
    const enoughEvidence = answers.filter((answer) => /evidence (?:есть|достат)|доказательств достаточно|скрин|лог|архив/i.test(answer.content));
    if (noEvidence.length && enoughEvidence.length) {
      contradictions.push(`Спор по evidence: ${noEvidence.map((answer) => answer.brain).join(', ')} считают evidence слабым; ${enoughEvidence.map((answer) => answer.brain).join(', ')} считают его достаточным.`);
    }
    return contradictions;
  },

  buildBrainComparison(task) {
    const council = this.ensureBrainCouncilState(task);
    const answers = council.answers || [];
    if (answers.length < 2) {
      this.toast('Для сравнения нужно минимум два ответа');
      return;
    }
    const research = this.ensureResearchOpsState(task);
    const riskAnswers = answers.filter((answer) => /(риск|опас|ошиб|слаб|risk)/i.test(answer.content));
    const checkAnswers = answers.filter((answer) => /(провер|verify|check|qa|тест)/i.test(answer.content));
    const contradictionMap = research.contradiction_map || this.buildResearchContradictionMap(task, research.source_cards || [], research.evidence_cards || []);
    const answerContradictions = this.detectBrainAnswerContradictions(answers);
    const consensus = answers.length >= 3
      ? 'Есть несколько независимых позиций. Стратег должен выбрать золотую середину качества, рисков и скорости.'
      : 'Есть начальное сравнение двух позиций. Для более сильного решения желательно добавить ещё один ответ.';
    council.comparison = {
      comparison_id: this.generateWorkspaceId('BRAINCOMP'),
      answer_ids: answers.map((answer) => answer.answer_id),
      research_pack_id: research.research_pack?.research_pack_id || '',
      consensus,
      disagreements: answers.map((answer) => `${answer.brain}: ${answer.summary}`).slice(0, 4),
      contradiction_map: {
        source_contradictions: contradictionMap.contradictions || [],
        answer_contradictions: answerContradictions,
        source_gaps: contradictionMap.source_gaps || []
      },
      risks: riskAnswers.length ? riskAnswers.map((answer) => `${answer.brain}: риски указаны`) : ['Не все ответы явно указали риски'],
      checks: checkAnswers.length ? checkAnswers.map((answer) => `${answer.brain}: есть проверочный фокус`) : ['Не все ответы указали проверки'],
      source_support: research.research_pack
        ? `${(research.source_cards || []).length} источников, ${(research.evidence_cards || []).length} доказательств`
        : 'Пакет исследования не собран',
      next_step: contradictionMap.what_to_check_first?.[0] || 'Стратег формирует паспорт решения и список проверки первым.',
      created_at: new Date().toISOString()
    };
    council.answers = answers.map((answer) => ({
      ...answer,
      contradictions_with_others: answerContradictions.filter((item) => item.includes(answer.brain))
    }));
    council.status = 'comparison_ready';
    council.updated_at = council.comparison.created_at;
    const artifact = this.createArtifact(
      task,
      'BRAIN_COMPARISON',
      'Сравнение Совета мозгов',
      council.comparison.consensus,
      JSON.stringify(council.comparison, null, 2),
      'brainops'
    );
    artifact.status = 'ready';
    this.addWorkspaceMessage(task, 'brain_council', 'Совет мозгов', 'Сравнение ответов Совета создано.', {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.toast('Сравнение Совета готово');
  },

  createBrainDecisionPassport(task) {
    const council = this.ensureBrainCouncilState(task);
    const answers = council.answers || [];
    if (!answers.length) {
      this.toast('Сначала добавь ответы Совета');
      return;
    }
    if (!council.comparison && answers.length >= 2) this.buildBrainComparison(task);
    const profile = this.headProfileById(council.profile_id) || this.activeHeadProfile();
    const mainStrategistId = profile?.main_strategist_id || this.mainStrategistBrain()?.brain_id || '';
    const strategistBrain = this.headBrainById(mainStrategistId);
    const strategist = answers.find((answer) => answer.brain_id && answer.brain_id === mainStrategistId)
      || answers.find((answer) => strategistBrain && answer.brain === strategistBrain.display_name)
      || answers[0];
    const research = this.ensureResearchOpsState(task);
    const decisionId = this.generateWorkspaceId('DECISION');
    council.answers = answers.map((answer) => ({
      ...answer,
      used_in_final_decision: answer.answer_id === strategist.answer_id || Boolean(council.comparison?.answer_ids?.includes(answer.answer_id))
    }));
    const content = [
      '# Паспорт решения',
      '',
      `decision_id: ${decisionId}`,
      `task_id: ${task.task_id}`,
      `project_id: ${task.project_id}`,
      `project: ${this.projectName(task.project_id)}`,
      `decision_title: ${task.title}`,
      `council_profile: ${profile?.name || 'Основной'}`,
      `main_strategist: ${strategistBrain ? `${strategistBrain.display_name} / ${strategistBrain.selected_model_name}` : 'не выбран'}`,
      `research_pack_id: ${research.research_pack?.research_pack_id || 'не собран'}`,
      `created_at: ${new Date().toISOString()}`,
      '',
      '## Решение',
      strategist.main_conclusion || strategist.summary,
      '',
      '## Почему выбрано',
      strategist.summary,
      '',
      '## Что отвергли',
      this.listOrFallback(council.comparison?.disagreements, 'отклонённые альтернативы не выделены'),
      '',
      '## Стратегическая позиция',
      strategist.content,
      '',
      '## Участники',
      ...answers.map((answer) => `- ${answer.brain} / ${answer.role}: ${this.brainIntegrityName(answer.integrity?.status)}`),
      '',
      '## Пакет исследования',
      research.research_pack ? `Источников: ${(research.source_cards || []).length}; доказательств: ${(research.evidence_cards || []).length}; статус: ${research.research_pack.status}` : 'Пакет исследования не собран. Решение требует ручной осторожности.',
      '',
      '## Source refs',
      this.listOrFallback(research.research_pack?.source_card_ids, 'нет source refs'),
      '',
      '## Evidence refs',
      this.listOrFallback(research.research_pack?.evidence_card_ids, 'нет evidence refs'),
      '',
      '## Brain answer refs',
      this.listOrFallback(answers.map((answer) => `${answer.answer_id}: ${answer.brain}`), 'нет ответов'),
      '',
      '## Сравнение',
      council.comparison?.consensus || 'Сравнение не создано.',
      '',
      '## Карта противоречий',
      this.listOrFallback([
        ...(council.comparison?.contradiction_map?.source_contradictions || []),
        ...(council.comparison?.contradiction_map?.answer_contradictions || []),
        ...(council.comparison?.contradiction_map?.source_gaps || [])
      ], 'критичных противоречий не выделено'),
      '',
      '## Риски',
      council.comparison ? this.listOrFallback(council.comparison.risks, 'нет данных') : this.listOrFallback(task.risks, 'нет данных'),
      '',
      '## Что проверить первым',
      council.comparison?.next_step || task.next_step || 'не задано',
      '',
      '## Acceptance criteria',
      this.listOrFallback(task.readiness_criteria, 'не заданы'),
      '',
      '## Можно выполнять сейчас?',
      research.research_pack && !council.comparison?.contradiction_map?.source_gaps?.length ? 'да, после решения владельца и Verifier' : 'только после ручного принятия риска владельцем',
      '',
      '## Нужен Approval?',
      this.taskRequiresApproval(task) ? 'да' : 'нет опасного действия в рамках паспорта',
      '',
      '## Verifier status',
      this.verifierVerdictName(task.verifier_result),
      '',
      '## Memory candidate',
      'да, после принятия владельцем сохранить вывод, риски, источники и следующий шаг.',
      '',
      '## Запреты',
      this.listOrFallback(task.forbidden_actions, 'не задано'),
      '',
      '## Следующий шаг',
      council.comparison?.next_step || task.next_step || 'передать решение на Verifier / владельцу'
    ].join('\n');
    council.strategist_synthesis = {
      synthesis_id: this.generateWorkspaceId('BRAINSYN'),
      decision_id: decisionId,
      content,
      strategist_answer_id: strategist.answer_id,
      research_pack_id: research.research_pack?.research_pack_id || '',
      created_at: new Date().toISOString(),
      status: 'draft'
    };
    council.status = 'decision_passport_ready';
    research.status = research.status === 'not_started' ? 'not_started' : 'decision_ready';
    council.updated_at = council.strategist_synthesis.created_at;
    const artifact = this.createArtifact(task, 'DECISION_PASSPORT', 'Паспорт решения Совета', 'Стратегический синтез, источники, риски и проверки.', content, 'brainops');
    artifact.status = 'draft';
    this.addWorkspaceMessage(task, 'decision', 'Совет мозгов', 'Паспорт решения Совета создан и ждёт решения владельца.', {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.toast('Паспорт решения создан');
  },

  brainCouncilStatusText(task) {
    const council = this.ensureBrainCouncilState(task);
    const research = this.ensureResearchOpsState(task);
    const answers = council.answers?.length || 0;
    if (council.status === 'decision_passport_ready') return 'паспорт решения готов';
    if (council.status === 'comparison_ready') return `сравнение готово, ответов: ${answers}`;
    if (answers) return `ответы собираются: ${answers}`;
    if (council.prompt_packages?.length) return research.research_pack ? 'пакеты готовы с исследованием' : 'пакеты готовы, исследование не собрано';
    return 'совет ещё не запускался';
  },

  renderWorkspaceMemory(task) {
    const status = document.getElementById('workspace-memory-status');
    const host = document.getElementById('workspace-memory-preview');
    const memory = task.memory_preview || {};
    if (status) status.textContent = memory.status || task.memory_status || 'ожидает данных';
    if (!host) return;
    const linkedArtifacts = (memory.linked_artifact_ids || []).length || (task.artifacts || []).filter((artifact) => ['DECISION_RECORD', 'VERIFIER_VERDICT', 'EXECUTOR_REPORT', 'BRAIN_ANSWER', 'BRAIN_COMPARISON', 'STRATEGIST_SYNTHESIS'].includes(artifact.type)).length;
    const linkedFiles = (memory.linked_file_ids || []).length || (task.files || []).filter((file) => file.is_evidence).length;
    const gate = this.acceptanceGateStatus(task);
    const council = task.brain_council || {};
    host.innerHTML = `
      <dl class="work-details">
        <div><dt>Что сохранить</dt><dd>${this.escapeHtml(memory.summary || task.goal || task.user_request || 'не задано')}</dd></div>
        <div><dt>Решения</dt><dd>${this.escapeHtml(this.listOrFallback(memory.decisions, 'ожидает данных'))}</dd></div>
        <div><dt>Риски</dt><dd>${this.escapeHtml(this.listOrFallback(memory.risks || task.risks, 'не задано'))}</dd></div>
        <div><dt>Следующий шаг</dt><dd>${this.escapeHtml(memory.next_step || task.next_step || 'не задано')}</dd></div>
        <div><dt>Verifier</dt><dd>${this.escapeHtml(this.verifierVerdictName(memory.verifier_result || task.verifier_result))}</dd></div>
        <div><dt>Исследование</dt><dd>${this.escapeHtml(this.researchStatusName(memory.research_ops?.status || this.ensureResearchOpsState(task).status))} · источников: ${this.escapeHtml(String(memory.research_ops?.source_cards ?? this.ensureResearchOpsState(task).source_cards.length))}</dd></div>
        <div><dt>Совет</dt><dd>${this.escapeHtml(this.brainCouncilStatusText(task))} · ${this.escapeHtml(this.brainIntegrityName(council.integrity_status || memory.brain_council?.integrity))}</dd></div>
        <div><dt>Privacy</dt><dd>${this.escapeHtml(memory.privacy_status || task.privacy_guard?.status || task.verifier_privacy_scan?.status || 'not_checked')}</dd></div>
        <div><dt>Приёмка</dt><dd>${this.escapeHtml(gate.label)}</dd></div>
        <div><dt>Storage</dt><dd>${this.escapeHtml(memory.storage_manifest?.task_path || task.storage_manifest?.task_path || 'не задано')}</dd></div>
        <div><dt>Связанные artifacts</dt><dd>${linkedArtifacts ? String(linkedArtifacts) : 'нет artifacts'}</dd></div>
        <div><dt>Связанные files/evidence</dt><dd>${linkedFiles ? String(linkedFiles) : 'нет evidence'}</dd></div>
      </dl>
    `;
  },

  switchWorkspaceTab(tab) {
    if (!WORKSPACE_TABS.has(tab)) return;
    this.workspaceActiveTab = tab;
    this.renderWorkspaceTabs();
    if (tab === 'check') {
      const task = this.getActiveWorkTask();
      if (task) this.renderVerifierPanel(task);
    }
  },

  handleWorkspaceAction(action, sourceButton = null) {
    const task = this.getActiveWorkTask();
    if (action === 'toggle_voice') {
      this.toggleWorkspaceVoice();
      return;
    }
    if (!task && !['add_files'].includes(action)) {
      this.toast('Сначала создай задачу');
      return;
    }

    const actionTaskId = sourceButton?.closest?.('[data-task-id]')?.dataset?.taskId;
    if (action === 'select_task' && actionTaskId) {
      this.activeWorkTaskId = actionTaskId;
      this.renderWorkTaskCard();
      return;
    }

    const handlers = {
      add_files: () => document.getElementById('workspace-file-input')?.click(),
      send_message: () => this.sendWorkspaceMessage(),
      build_context_pack: () => this.buildAndShowContextPack(task),
      copy_context_pack: () => this.copyContextPack(task),
      mark_sent: () => this.markContextPackSent(task),
      insert_report: () => this.prepareReportInput(),
      open_verifier: () => this.openVerifierPanel(task),
      save_memory_preview: () => this.saveWorkspaceMemoryPreview(task),
      edit_memory_preview: () => this.showWorkSafeOutput(task, 'Память', 'Редактирование Memory preview будет реализовано следующим этапом.', task.status),
      skip_memory_preview: () => this.skipWorkspaceMemoryPreview(task),
      copy_storage_manifest: () => this.copyStorageManifest(task),
      copy_storage_agent_command: () => this.copyStorageAgentCommand(task),
      copy_phase2_runtime_package: () => this.copyPhase2RuntimePackage(task),
      send_storage_prepare: () => this.sendStoragePrepare(task),
      create_restore_point: () => this.createStorageRestorePoint(task),
      create_research_brief: () => this.createResearchBriefFromTask(task),
      save_research_brief: () => this.saveResearchBrief(task),
      add_source_card: () => this.addResearchSourceCard(task),
      build_research_pack: () => this.buildResearchPack(task),
      copy_research_pack: () => this.copyResearchPack(task),
      build_brain_prompts: () => this.buildBrainPromptPackages(task),
      copy_brain_prompt: () => this.copyBrainPromptPackage(task, sourceButton?.dataset?.brainRole || ''),
      save_brain_answer: () => this.saveBrainAnswer(task),
      build_brain_comparison: () => this.buildBrainComparison(task),
      create_brain_decision: () => this.createBrainDecisionPassport(task)
    };

    handlers[action]?.();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  handleWorkspaceFileAction(action, fileId) {
    const task = this.getActiveWorkTask();
    if (!task) return;
    const file = task.files.find((item) => item.file_id === fileId);
    if (!file) return;

    if (action === 'remove') {
      task.files = task.files.filter((item) => item.file_id !== fileId);
      this.workspaceFileRuntime.delete(fileId);
      this.addWorkspaceMessage(task, 'file_added', 'Файлы', `Файл удалён из задачи: ${file.name}`);
    } else {
      const role = action === 'make_evidence' ? 'evidence' : action;
      this.setWorkspaceFileRole(task, file, role);
    }

    task.updated_at = new Date().toISOString();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  handleWorkspaceArtifactAction(action, artifactId) {
    const task = this.getActiveWorkTask();
    if (!task) return;
    const artifact = task.artifacts.find((item) => item.artifact_id === artifactId);
    if (!artifact) return;
    if (action === 'open') {
      const previewWrap = document.getElementById('workspace-context-preview-wrap');
      const preview = document.getElementById('workspace-context-preview');
      if (previewWrap && preview) {
        previewWrap.hidden = false;
        preview.value = artifact.content || artifact.summary || '';
      }
      this.switchWorkspaceTab('artifacts');
      this.toast('Артефакт открыт');
      return;
    }
    if (action === 'copy') {
      const content = artifact.content || artifact.summary || artifact.title;
      const privacyScan = this.scanPrivacyText(content);
      if (privacyScan.findings.length) {
        this.workspacePendingCopyText = content;
        this.workspacePendingPrivacyFindings = privacyScan.findings;
        this.renderPrivacyGuardFindings(privacyScan.findings);
        const guard = document.getElementById('workspace-privacy-guard');
        if (guard) guard.hidden = false;
        this.addWorkspaceMessage(task, 'system_event', 'Privacy Guard', `Копирование artifact требует проверки: ${this.privacyScanSummary(privacyScan)}.`);
        this.toast('Privacy Guard требует проверки');
        return;
      }
      this.copyWorkspaceText(content);
      this.addWorkspaceMessage(task, 'system_event', 'Артефакты', `Скопирован артефакт: ${artifact.title}`);
      this.saveWorkTasks();
      this.renderWorkTaskCard();
    }
  },

  updateWorkspaceFileRole(fileId, role) {
    const task = this.getActiveWorkTask();
    if (!task) return;
    const file = task.files.find((item) => item.file_id === fileId);
    if (!file) return;
    this.setWorkspaceFileRole(task, file, role);
    task.updated_at = new Date().toISOString();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  setWorkspaceFileRole(task, file, role) {
    if (!WORK_FILE_ROLE_BY_ID[role]) return;
    file.role = role;
    file.is_evidence = role === 'evidence';
    file.status = role === 'executor_package' ? 'ready_for_package' : 'attached';
    this.updateFileStorageRef(task, file);
    this.addWorkspaceMessage(task, 'file_added', 'Файлы', `Файлу назначена роль: ${file.name} — ${this.fileRoleName(role)}`, {
      linked_file_id: file.file_id
    });
  },

  async addWorkspaceFiles(fileList) {
    const task = this.getActiveWorkTask();
    const files = Array.from(fileList || []);
    if (!task) {
      this.toast('Сначала создай задачу');
      return;
    }
    if (!files.length) return;

    for (const file of files) {
      const metadata = this.createFileMetadata(task, file);
      this.updateFileStorageRef(task, metadata);
      await this.enrichFileMetadataWithHash(file, metadata);
      task.files.push(metadata);
      await this.prepareWorkspaceFileRuntime(file, metadata);
      this.addWorkspaceMessage(task, 'file_added', 'Файлы', `Прикреплён файл: ${metadata.name}`, {
        linked_file_id: metadata.file_id
      });
    }
    task.updated_at = new Date().toISOString();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
    this.switchWorkspaceTab('files');
    this.toast(`Файлы добавлены: ${files.length}`);
  },

  createFileMetadata(task, file) {
    const extension = this.fileExtension(file.name);
    const now = new Date().toISOString();
    return {
      file_id: this.generateWorkspaceId('FILE'),
      task_id: task.task_id,
      project_id: task.project_id,
      name: file.name,
      extension,
      mime_type: file.type || 'application/octet-stream',
      size_bytes: file.size || 0,
      human_size: this.humanFileSize(file.size || 0),
      role: 'attachment',
      status: 'session_only',
      is_evidence: false,
      added_at: now,
      notes: this.fileKindLabel(extension),
      hash_algorithm: 'SHA-256',
      sha256: '',
      hash_status: file.size > FILE_HASH_MAX_BYTES ? 'skipped_large_file' : 'pending_session',
      storage_ref: null,
      raw_file_saved: false
    };
  },

  async enrichFileMetadataWithHash(file, metadata) {
    if (!window.crypto?.subtle || !file?.arrayBuffer) {
      metadata.hash_status = 'unavailable';
      return metadata;
    }
    if ((file.size || 0) > FILE_HASH_MAX_BYTES) {
      metadata.hash_status = 'pending_local_agent';
      return metadata;
    }
    try {
      const digest = await window.crypto.subtle.digest('SHA-256', await file.arrayBuffer());
      metadata.sha256 = Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
      metadata.hash_status = 'calculated_session';
    } catch {
      metadata.hash_status = 'unavailable';
    }
    return metadata;
  },

  async prepareWorkspaceFileRuntime(file, metadata) {
    const extension = metadata.extension;
    const runtime = {};
    if (IMAGE_PREVIEW_EXTENSIONS.has(extension)) {
      runtime.previewType = 'image';
      runtime.objectUrl = URL.createObjectURL(file);
    } else if (TEXT_PREVIEW_EXTENSIONS.has(extension) && file.size <= 128 * 1024) {
      runtime.previewType = 'text';
      runtime.previewText = (await file.text()).slice(0, 900);
    }
    this.workspaceFileRuntime.set(metadata.file_id, runtime);
  },

  sendWorkspaceMessage() {
    const task = this.getActiveWorkTask();
    const input = document.getElementById('workspace-message-input');
    const mode = document.getElementById('workspace-message-mode')?.value || 'clarification';
    const text = String(input?.value || '').trim();
    if (!task) {
      this.toast('Сначала создай задачу');
      return;
    }
    if (!text) {
      input?.focus();
      this.toast('Напиши сообщение');
      return;
    }

    if (mode === 'command' && DANGEROUS_COMMAND_PATTERN.test(text)) {
      this.showWorkspaceApproval(task, text);
      input.value = '';
      this.saveWorkTasks();
      this.renderWorkTaskCard();
      return;
    }

    if (mode === 'report') {
      this.insertExecutorReport(task, text);
    } else {
      const typeByMode = {
        clarification: 'clarification',
        command: 'system_event',
        codex: 'clarification',
        research: 'research_event',
        decision: 'decision'
      };
      const authorByMode = {
        clarification: 'Владелец',
        command: 'Команда',
        codex: 'Для Codex',
        research: 'Исследование',
        decision: 'Решение'
      };
      this.addWorkspaceMessage(task, typeByMode[mode] || 'user_message', authorByMode[mode] || 'Владелец', text);
      if (mode === 'codex') this.createFollowupArtifact(task, text);
      if (mode === 'research') {
        const research = this.ensureResearchOpsState(task);
        research.source_notes.unshift({
          note_id: this.generateWorkspaceId('SNOTE'),
          source_id: '',
          text,
          inserted_by: 'owner',
          created_at: new Date().toISOString()
        });
        research.status = research.status === 'not_started' ? 'sources_collecting' : research.status;
        this.switchWorkspaceTab('research');
      }
      if (mode === 'decision') this.createArtifact(task, 'DECISION_RECORD', 'Решение владельца', text.slice(0, 160), text, 'console');
    }

    input.value = '';
    task.updated_at = new Date().toISOString();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  prepareReportInput() {
    const mode = document.getElementById('workspace-message-mode');
    const input = document.getElementById('workspace-message-input');
    if (mode) mode.value = 'report';
    if (input) {
      input.placeholder = 'Вставьте отчёт исполнителя';
      input.focus();
    }
    this.toast('Вставь отчёт в нижнюю консоль');
  },

  insertExecutorReport(task, reportText) {
    const now = new Date().toISOString();
    const artifact = this.createArtifact(
      task,
      'EXECUTOR_REPORT',
      'Отчёт исполнителя',
      reportText.slice(0, 220),
      reportText,
      'executor_report'
    );
    task.status = 'executor_report_received';
    task.timer_stopped_at = now;
    task.executor_state = {
      ...(task.executor_state || {}),
      executor: task.executor || 'Codex',
      status: 'report_received',
      timer_stopped_at: now,
      report_artifact_id: artifact.artifact_id
    };
    this.addWorkspaceMessage(task, 'executor_report_received', 'Исполнитель', 'Отчёт получен. Можно запустить проверку.', {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.addWorkAudit(task, 'Отчёт исполнителя сохранён как artifact.');
    this.switchWorkspaceTab('artifacts');
  },

  buildAndShowContextPack(task) {
    const content = this.buildContextPackContent(task);
    const privacyScan = this.scanPrivacyText(content);
    const existing = task.artifacts.find((artifact) => artifact.type === 'CONTEXT_PACK' && artifact.status !== 'archived');
    const artifact = existing || this.createArtifact(task, 'CONTEXT_PACK', 'Пакет для Codex', 'Контекст задачи для внешнего исполнителя.', content, 'workspace');
    artifact.content = content;
    artifact.summary = `Контекст задачи для внешнего исполнителя. Privacy: ${this.privacyScanSummary(privacyScan)}.`;
    artifact.context_pack_version = 2;
    artifact.privacy_scan = privacyScan;
    artifact.status = privacyScan.blocked ? 'needs_review' : 'ready_for_copy';
    artifact.updated_at = new Date().toISOString();
    task.executor_state = {
      ...(task.executor_state || {}),
      package_artifact_id: artifact.artifact_id
    };
    task.context_pack_status = artifact.status;
    task.privacy_guard = privacyScan;
    this.addWorkspaceMessage(task, 'context_pack_created', 'Рабочее окно', 'Пакет для Codex сформирован.', {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.switchWorkspaceTab('artifacts');
  },

  buildContextPackContent(task) {
    const files = (task.files || []).map((file) => [
      `- ${file.name}`,
      `  - file_id: ${file.file_id}`,
      `  - роль: ${this.fileRoleName(file.role)}`,
      `  - тип: ${file.extension || 'file'}`,
      `  - размер: ${file.human_size || '0 B'}`,
      `  - evidence: ${file.is_evidence ? 'да' : 'нет'}`,
      `  - статус: ${file.status || 'attached'}`,
      `  - hash: ${file.sha256 || this.hashStatusName(file.hash_status)}`,
      `  - planned_path: ${file.storage_ref?.planned_path || this.plannedFileStoragePath(task, file)}`,
      `  - raw_file_saved: false`
    ].join('\n')).join('\n') || '- файлов нет';
    const clarifications = (task.messages || [])
      .filter((message) => ['clarification', 'user_message', 'decision'].includes(message.type))
      .map((message) => `- ${this.formatTaskTime(message.created_at)} ${message.author}: ${message.text}`)
      .join('\n') || '- уточнений пока нет';
    const artifacts = (task.artifacts || [])
      .filter((artifact) => artifact.type !== 'CONTEXT_PACK')
      .slice(0, 12)
      .map((artifact) => `- ${artifact.title} (${this.artifactTypeName(artifact.type)}, ${artifact.status || 'draft'}, ${this.formatTaskTime(artifact.created_at)})`)
      .join('\n') || '- artifacts пока нет';
    const storage = this.buildStorageManifestText(task);
    const approvals = (task.approval_requests || [])
      .map((approval) => `- ${approval.title || approval.command}: ${APPROVAL_STATUSES[approval.status] || approval.status}`)
      .join('\n') || '- approval-запросов нет';
    const verifier = task.verifier_result
      ? `${this.verifierVerdictName(task.verifier_result)}\n${this.verifierRisksSummary(task)}`
      : 'проверка ещё не выполнена';
    const memory = task.memory_preview?.status
      ? `${task.memory_preview.status}: ${task.memory_preview.summary || task.goal || task.user_request || 'не задано'}`
      : 'memory preview ещё не обработан';
    const research = this.ensureResearchOpsState(task);
    const privacy = this.privacyScanSummary(this.scanPrivacyText([
      task.title,
      task.user_request,
      task.goal,
      clarifications,
      files,
      artifacts
    ].join('\n')));
    return [
      '# Пакет для Codex',
      '',
      'Версия пакета: Context Pack V2',
      'Назначение: передать задачу внешнему исполнителю вручную через copy/paste.',
      'Автоматическая отправка не выполняется.',
      '',
      `Задача: ${task.title}`,
      `task_id: ${task.task_id}`,
      `Проект: ${this.projectName(task.project_id)}`,
      `Статус: ${this.statusName(task.status)}`,
      `Исполнитель: ${task.executor || 'Codex'}`,
      `Качество: ${this.qualityName(task.quality_level)}`,
      `Режим: ${this.modeName(task.mode)}`,
      `Privacy Guard: ${privacy}`,
      '',
      '## Цель',
      task.goal || task.user_request || 'не задано',
      '',
      '## Уточнения пользователя',
      clarifications,
      '',
      '## Файлы и роли',
      files,
      '',
      '## Storage',
      storage,
      '',
      '## Artifacts',
      artifacts,
      '',
      '## Исследование',
      research.research_pack ? this.formatResearchPack(task, research.research_pack) : `Статус: ${this.researchStatusName(research.status)}. Пакет исследования ещё не собран.`,
      '',
      '## Текущий Verifier',
      verifier,
      '',
      '## Memory Preview',
      memory,
      '',
      '## Approval / ограничения действий',
      approvals,
      '',
      '## Ограничения',
      this.listOrFallback(task.constraints, 'не задано'),
      '',
      '## Что нельзя трогать',
      this.listOrFallback(task.forbidden_actions, 'не задано'),
      '',
      '## Критерии готовности',
      this.listOrFallback(task.readiness_criteria, 'не задано'),
      '',
      '## Правила безопасности для исполнителя',
      '- не использовать AI API;',
      '- не менять .env, secrets, tokens, credentials, cookies;',
      '- не менять DNS/VPN/proxy/network/firewall/hosts/routes;',
      '- не делать Cloudflare deploy или GitHub push без отдельного approval;',
      '- не менять Direct Bridge / Local Agent, если это не указано явно;',
      '- не выполнять опасные действия и не скрывать ошибки;',
      '- не удалять legacy-код без отдельной cleanup-задачи;',
      '',
      '## Формат ответа',
      '- что сделано;',
      '- какие файлы изменены;',
      '- какие проверки пройдены;',
      '- что не проверено;',
      '- риски;',
      '- что основной ветке проверить первым;',
      '- использовались ли AI API;',
      '- менялись ли Direct Bridge / Local Agent;',
      '- были ли добавлены .env/secrets;',
      '- где архив/evidence, если есть.',
      '',
      '## Что основной ветке проверить первым',
      task.next_step || 'не задано',
      '',
      '## Критерии приемки результата',
      '- результат соответствует задаче;',
      '- есть evidence или честно указано, что evidence нет;',
      '- есть список проверок;',
      '- есть список рисков и непроверенных пунктов;',
      '- Verifier может сформировать verdict;',
      '- Memory Preview можно сохранить или пропустить осознанно.'
    ].join('\n');
  },

  copyContextPack(task) {
    const artifact = (task.artifacts || []).find((item) => item.type === 'CONTEXT_PACK' && item.status !== 'archived');
    const content = artifact?.content || this.buildContextPackContent(task);
    this.workspacePendingCopyText = content;
    const privacyScan = this.scanPrivacyText(content);
    this.workspacePendingPrivacyFindings = privacyScan.findings;
    if (artifact) {
      artifact.privacy_scan = privacyScan;
      artifact.status = privacyScan.blocked ? 'needs_review' : 'ready_for_copy';
      artifact.summary = `Контекст задачи для внешнего исполнителя. Privacy: ${this.privacyScanSummary(privacyScan)}.`;
    }
    task.privacy_guard = privacyScan;
    if (privacyScan.findings.length) {
      const guard = document.getElementById('workspace-privacy-guard');
      this.renderPrivacyGuardFindings(privacyScan.findings);
      if (guard) guard.hidden = false;
      this.addWorkspaceMessage(task, 'system_event', 'Privacy Guard', `Найдены потенциально чувствительные строки: ${this.privacyScanSummary(privacyScan)}.`);
      this.toast('Privacy Guard требует проверки');
      return;
    }
    this.copyWorkspaceText(content);
    this.addWorkspaceMessage(task, 'system_event', 'Рабочее окно', 'Пакет для Codex скопирован.');
  },

  handlePrivacyAction(action) {
    const guard = document.getElementById('workspace-privacy-guard');
    const task = this.getActiveWorkTask();
    if (action === 'copy_anyway' && this.workspacePendingCopyText) {
      this.copyWorkspaceText(this.workspacePendingCopyText);
      if (task) this.addWorkspaceMessage(task, 'system_event', 'Privacy Guard', 'Пакет скопирован после ручного подтверждения warning.');
    }
    if (action === 'redact_copy' && this.workspacePendingCopyText) {
      const redacted = this.redactPrivacyText(this.workspacePendingCopyText);
      this.copyWorkspaceText(redacted);
      if (task) {
        const artifact = this.createArtifact(task, 'CHECK_LOG', 'Privacy Guard redacted copy', 'Создана редактированная копия пакета для ручной отправки.', redacted, 'privacy_guard');
        task.memory_preview = {
          ...(task.memory_preview || {}),
          linked_artifact_ids: [...new Set([...(task.memory_preview?.linked_artifact_ids || []), artifact.artifact_id])]
        };
        this.addWorkspaceMessage(task, 'system_event', 'Privacy Guard', 'Скопирована redacted-версия пакета. Исходные данные задачи не изменялись.');
      }
    }
    if (action === 'review') this.switchWorkspaceTab('artifacts');
    if (guard) guard.hidden = true;
    this.workspacePendingCopyText = '';
    this.workspacePendingPrivacyFindings = [];
  },

  scanPrivacyText(text) {
    const lines = String(text || '').split(/\r?\n/);
    const findings = [];
    lines.forEach((line, index) => {
      PRIVACY_GUARD_RULES.forEach((rule) => {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(line)) return;
        findings.push({
          rule_id: rule.id,
          label: rule.label,
          severity: rule.severity,
          line: index + 1,
          preview: this.maskPrivacyLine(line)
        });
      });
    });
    const blocked = findings.some((finding) => finding.severity === 'danger');
    const review = findings.some((finding) => finding.severity === 'review');
    return {
      status: blocked ? 'blocked' : review ? 'review' : 'clean',
      blocked,
      findings,
      checked_at: new Date().toISOString()
    };
  },

  privacyScanSummary(scan) {
    const findings = scan?.findings || [];
    if (!findings.length) return 'clean';
    const danger = findings.filter((finding) => finding.severity === 'danger').length;
    const review = findings.filter((finding) => finding.severity === 'review').length;
    return `${danger} danger / ${review} review`;
  },

  renderPrivacyGuardFindings(findings) {
    const host = document.getElementById('workspace-privacy-findings');
    if (!host) return;
    host.innerHTML = (findings || []).slice(0, 8).map((finding) => `
      <article>
        <strong>${this.escapeHtml(finding.severity)} · ${this.escapeHtml(finding.label)}</strong>
        <span>Строка ${this.escapeHtml(String(finding.line))}: ${this.escapeHtml(finding.preview)}</span>
      </article>
    `).join('') || '<article><span>Подозрительных строк не найдено.</span></article>';
  },

  maskPrivacyLine(line) {
    return String(line || '')
      .replace(/(Authorization\s*:\s*Bearer\s+)[^\s]+/ig, '$1[REDACTED]')
      .replace(/(Bearer\s+)[A-Za-z0-9._~+/=-]{8,}/ig, '$1[REDACTED]')
      .replace(/\bsk-[A-Za-z0-9_-]{6,}\b/g, 'sk-[REDACTED]')
      .replace(/\bAIza[A-Za-z0-9_-]{6,}\b/g, 'AIza[REDACTED]')
      .replace(/\bgh[pousr]_[A-Za-z0-9_]{6,}\b/g, 'ghp_[REDACTED]')
      .replace(/((?:API[_-]?KEY|TOKEN|SECRET|PASSWORD|PASSWD|PWD)\s*[:=]\s*)[^\s;,)]+/ig, '$1[REDACTED]')
      .slice(0, 220);
  },

  redactPrivacyText(text) {
    return String(text || '').split(/\r?\n/).map((line) => this.maskPrivacyLine(line)).join('\n');
  },

  markContextPackSent(task) {
    const now = new Date().toISOString();
    if (!task.artifacts?.some((artifact) => artifact.type === 'CONTEXT_PACK')) {
      this.buildAndShowContextPack(task);
    }
    const contextPack = task.artifacts.find((artifact) => artifact.type === 'CONTEXT_PACK');
    task.executor = 'Codex';
    task.status = 'waiting_executor_report';
    task.timer_started_at = now;
    task.timer_stopped_at = '';
    task.executor_state = {
      executor: 'Codex',
      status: 'waiting_report',
      package_artifact_id: contextPack?.artifact_id || '',
      sent_by_user_at: now,
      timer_started_at: now,
      timer_stopped_at: '',
      report_artifact_id: ''
    };
    this.addWorkspaceMessage(task, 'executor_marked_sent', 'Рабочее окно', 'Пакет отмечен как отправленный в Codex. Терминатор ожидает отчёт исполнителя.');
    this.addWorkAudit(task, 'Пакет отмечен как отправленный в Codex.');
    this.toast('Ожидание отчёта исполнителя запущено');
  },

  showWorkspaceApproval(task, commandText) {
    const request = this.createApprovalRecord({
      task_id: task.task_id,
      project_id: task.project_id,
      command: commandText,
      action: commandText,
      action_type: 'workspace_command',
      source: 'workspace',
      reason: 'Команда содержит опасные ключевые слова и не может выполняться автоматически.'
    }, task);
    const panel = document.getElementById('workspace-approval-panel');
    if (panel) panel.hidden = false;
    this.addWorkspaceMessage(task, 'approval_event', 'Подтверждение', `Опасная команда не выполнена. Approval создан: ${request.approval_id}.`, {
      linked_approval_id: request.approval_id
    });
  },

  async handleApprovalAction(action) {
    const task = this.getActiveWorkTask();
    const panel = document.getElementById('workspace-approval-panel');
    if (!task) return;
    const approval = [...(task.approval_requests || [])].reverse().find((item) => ['manual_required', 'pending'].includes(item.status));
    if (action === 'plan') {
      if (approval) {
        approval.status = 'plan_prepared';
        approval.owner_decision = 'plan_prepared';
        approval.decision_note = 'Подготовлен безопасный план из рабочего окна. Выполнение не запускалось.';
        approval.resolved_at = new Date().toISOString();
        approval.updated_at = approval.resolved_at;
        approval.execution_allowed = false;
        approval.execution_result = 'not_executed';
        await this.saveApprovalRecord(approval);
      }
      this.addWorkspaceMessage(task, 'approval_event', 'Подтверждение', 'Подготовлен безопасный план вместо автоматического выполнения.');
      this.createArtifact(task, 'FIX_REQUEST', 'План безопасного действия', 'Опасное действие требует отдельного подтверждения.', approval ? this.buildApprovalPlanText(approval) : 'Сформировать отдельное ТЗ и выполнить только после approval владельца.', 'approval');
    } else {
      if (approval) {
        approval.status = 'cancelled';
        approval.owner_decision = 'cancelled';
        approval.decision_note = 'Отменено из рабочего окна. Выполнение не запускалось.';
        approval.resolved_at = new Date().toISOString();
        approval.updated_at = approval.resolved_at;
        approval.execution_allowed = false;
        approval.execution_result = 'not_executed';
        await this.saveApprovalRecord(approval);
      }
      this.addWorkspaceMessage(task, 'approval_event', 'Подтверждение', 'Опасное действие отменено.');
    }
    if (panel) panel.hidden = true;
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  saveWorkspaceMemoryPreview(task) {
    task.memory_status = 'saved_local';
    task.memory_preview = this.buildWorkspaceMemoryPreview(task, 'saved_local');
    const artifact = this.createArtifact(task, 'MEMORY_SUMMARY', 'Memory preview', 'Локальный черновик памяти для будущего Memory v2.', JSON.stringify(task.memory_preview, null, 2), 'memory_preview');
    this.addWorkspaceMessage(task, 'memory_event', 'Память', 'Memory preview сохранён локально.', {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.refreshMemorySearchIndex({ silent: true, render: false });
    this.toast('Memory preview сохранён локально');
  },

  buildWorkspaceMemoryPreview(task, status = 'draft') {
    const linkedArtifacts = (task.artifacts || [])
      .filter((artifact) => [
        'DECISION_RECORD',
        'VERIFIER_VERDICT',
        'EXECUTOR_REPORT',
        'RESULT_ARCHIVE',
        'CHECK_LOG',
        'CONTEXT_PACK',
        'RESEARCH_BRIEF',
        'SOURCE_CARD',
        'EVIDENCE_CARD',
        'RESEARCH_PACK',
        'BRAIN_ANSWER',
        'BRAIN_COMPARISON',
        'STRATEGIST_SYNTHESIS',
        'DECISION_PASSPORT'
      ].includes(artifact.type))
      .map((artifact) => artifact.artifact_id);
    const council = task.brain_council || {};
    const research = this.ensureResearchOpsState(task);
    return {
      ...(task.memory_preview || {}),
      status,
      summary: task.goal || task.user_request,
      decisions: (task.messages || []).filter((message) => message.type === 'decision').map((message) => message.text),
      risks: task.risks || [],
      next_step: task.next_step,
      storage_manifest: {
        task_path: this.ensureTaskStorageManifest(task).task_path,
        files: this.taskStorageSummary(task).files,
        evidence: this.taskStorageSummary(task).evidence,
        restore_points: this.taskStorageSummary(task).restore_points,
        policy: task.storage_manifest?.raw_file_policy || 'metadata only'
      },
      verifier_result: task.verifier_result || 'не проверено',
      verifier_risks: this.normalizedVerifierRisks(task),
      privacy_status: task.privacy_guard?.status || task.verifier_privacy_scan?.status || 'not_checked',
      acceptance_gate: this.acceptanceGateStatus(task).label,
      research_ops: {
        status: research.status || 'not_started',
        source_cards: research.source_cards?.length || 0,
        evidence_cards: research.evidence_cards?.length || 0,
        research_pack_id: research.research_pack?.research_pack_id || null,
        source_gaps: research.contradiction_map?.source_gaps || []
      },
      brain_council: {
        status: council.status || 'not_started',
        answers: Array.isArray(council.answers) ? council.answers.length : 0,
        integrity: council.integrity_status || 'not_checked',
        decision_passport: council.strategist_synthesis?.decision_id || council.strategist_synthesis?.synthesis_id || null
      },
      linked_artifact_ids: [...new Set([...(task.memory_preview?.linked_artifact_ids || []), ...linkedArtifacts])],
      linked_file_ids: (task.files || []).filter((file) => file.is_evidence).map((file) => file.file_id),
      updated_at: new Date().toISOString()
    };
  },

  skipWorkspaceMemoryPreview(task) {
    task.memory_status = 'не сохранять';
    task.memory_preview = { ...(task.memory_preview || {}), status: 'skipped' };
    this.addWorkspaceMessage(task, 'memory_event', 'Память', 'Сохранение в память пропущено.');
    this.toast('Память пропущена');
  },

  createFollowupArtifact(task, text) {
    return this.createArtifact(task, 'FOLLOWUP_PACKAGE', 'Follow-up для Codex', text.slice(0, 180), text, 'console');
  },

  createArtifact(task, type, title, summary, content, source, linkedFileIds = []) {
    task.artifacts = Array.isArray(task.artifacts) ? task.artifacts : [];
    this.ensureTaskStorageManifest(task);
    const artifactId = this.generateWorkspaceId('ART');
    const artifact = {
      artifact_id: artifactId,
      task_id: task.task_id,
      project_id: task.project_id,
      type,
      title,
      summary: summary || '',
      content: content || '',
      created_at: new Date().toISOString(),
      source: source || 'workspace',
      linked_file_ids: linkedFileIds,
      linked_evidence_ids: [],
      version: 1,
      status: 'draft',
      storage_ref: {
        root: TERMINATOR_STORAGE_ROOT,
        task_path: this.taskStoragePath(task.task_id),
        folder: this.artifactStorageFolder(type),
        planned_path: `${this.taskStoragePath(task.task_id, this.artifactStorageFolder(type))}\\${this.safeStorageSegment(`${artifactId}_${type || 'artifact'}`)}.md`,
        persistence: 'metadata_only_browser',
        raw_file_saved: false,
        local_agent_required: true
      }
    };
    task.artifacts.unshift(artifact);
    this.recordTaskEvent(task, 'artifact_created', `Artifact создан: ${title}`, {
      actor: source || 'workspace',
      source: source || 'workspace',
      target_id: artifact.artifact_id,
      linked_artifact_id: artifact.artifact_id
    });
    return artifact;
  },

  artifactStorageFolder(type) {
    if (type === 'EXECUTOR_REPORT') return 'reports';
    if (type === 'CHECK_LOG') return 'logs';
    if (type === 'SCREENSHOT' || type === 'RESULT_ARCHIVE') return 'evidence';
    if (type === 'RESTORE_POINT') return 'restore_points';
    return 'artifacts';
  },

  addWorkspaceMessage(task, type, author, text, extras = {}) {
    task.messages = Array.isArray(task.messages) ? task.messages : [];
    const linkedArtifacts = Array.isArray(extras.linked_artifacts) ? extras.linked_artifacts : [];
    const message = {
      message_id: this.generateWorkspaceId('MSG'),
      task_id: task.task_id,
      type,
      author,
      text,
      created_at: new Date().toISOString(),
      attachments: [],
      linked_artifacts: linkedArtifacts,
      ...extras
    };
    task.messages.push(message);
    this.recordTaskEvent(task, type, text, {
      actor: author || 'workspace',
      source: 'message',
      target_id: message.message_id,
      linked_artifact_id: extras.linked_artifact_id || linkedArtifacts[0] || '',
      linked_file_id: extras.linked_file_id || '',
      linked_approval_id: extras.linked_approval_id || '',
      risk_level: type === 'approval_event' ? 'approval_required' : 'safe',
      created_at: message.created_at
    });
    return message;
  },

  updateWorkspaceTimer() {
    const task = this.getActiveWorkTask();
    const timer = document.getElementById('workspace-timer');
    if (!timer || !task) return;
    const started = task.timer_started_at || task.executor_state?.timer_started_at;
    const stopped = task.timer_stopped_at || task.executor_state?.timer_stopped_at;
    if (!started) {
      timer.textContent = 'Ожидание отчёта: 00:00:00';
      return;
    }
    const startMs = new Date(started).getTime();
    const endMs = stopped ? new Date(stopped).getTime() : Date.now();
    timer.textContent = `Ожидание отчёта: ${this.formatDuration(Math.max(0, endMs - startMs))}`;
  },

  workspaceRiskLevel(task) {
    const risks = Array.isArray(task.risks) ? task.risks : [];
    if (task.status === 'failed' || task.status === 'rejected') return 'высокий';
    if (task.status === 'manual_required' || task.status === 'needs_fix' || risks.length > 2) return 'средний';
    return 'низкий';
  },

  copyWorkspaceText(text) {
    try {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        this.copyTextFallback(text);
      }
      this.toast('Скопировано');
    } catch {
      this.copyTextFallback(text);
      this.toast('Скопировано');
    }
  },

  fileExtension(name) {
    const parts = String(name || '').toLowerCase().split('.');
    return parts.length > 1 ? parts.pop() : 'file';
  },

  fileKindLabel(extension) {
    if (['txt', 'md', 'docx', 'pdf', 'rtf'].includes(extension)) return 'документ';
    if (['xlsx', 'csv'].includes(extension)) return 'таблица';
    if (ARCHIVE_EXTENSIONS.has(extension)) return 'архив';
    if (['js', 'ts', 'py', 'html', 'css', 'json', 'yaml', 'xml', 'sql', 'mjs', 'cjs'].includes(extension)) return 'код';
    if (IMAGE_PREVIEW_EXTENSIONS.has(extension)) return 'изображение';
    if (['mp4', 'mov', 'mkv', 'webm'].includes(extension)) return 'видео';
    if (['mp3', 'wav', 'm4a'].includes(extension)) return 'аудио';
    if (['log'].includes(extension)) return 'лог';
    return 'прочее';
  },

  humanFileSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let value = Number(bytes) || 0;
    let index = 0;
    while (value >= 1024 && index < units.length - 1) {
      value /= 1024;
      index += 1;
    }
    return `${value.toFixed(index ? 1 : 0)} ${units[index]}`;
  },

  fileRoleName(role) {
    return WORK_FILE_ROLE_BY_ID[role]?.name || 'Обычный файл';
  },

  artifactTypeName(type) {
    const names = {
      SPEC: 'ТЗ',
      PLAN: 'План',
      CONTEXT_PACK: 'Пакет для Codex',
      EXECUTOR_REPORT: 'Отчёт исполнителя',
      RESULT_ARCHIVE: 'Архив результата',
      SCREENSHOT: 'Скриншот',
      CHECK_LOG: 'Лог проверки',
      VERIFIER_VERDICT: 'Вердикт проверки',
      RESEARCH_REPORT: 'Исследование',
      RESEARCH_BRIEF: 'План исследования',
      SOURCE_CARD: 'Источник',
      EVIDENCE_CARD: 'Доказательство',
      RESEARCH_PACK: 'Пакет исследования',
      MEMORY_SUMMARY: 'Память',
      DECISION_RECORD: 'Решение',
      DECISION_PASSPORT: 'Паспорт решения',
      FOLLOWUP_PACKAGE: 'Follow-up',
      FIX_REQUEST: 'Запрос доработки',
      RESTORE_POINT: 'Restore point',
      HANDS_ACTION_PLAN: 'План Рук',
      WORKER_RUNTIME_REPORT: 'Runtime Рук',
      BRAIN_PROMPT_PACKAGE: 'Пакеты Совета',
      BRAIN_ANSWER: 'Ответ мозга',
      BRAIN_COMPARISON: 'Сравнение Совета',
      STRATEGIST_SYNTHESIS: 'Паспорт решения Совета'
    };
    return names[type] || type || 'Артефакт';
  },

  workspaceMessageLabel(type) {
    const labels = {
      user_message: 'сообщение',
      system_event: 'событие',
      clarification: 'уточнение',
      file_added: 'файл',
      context_pack_created: 'пакет',
      executor_marked_sent: 'исполнитель',
      executor_report_received: 'отчёт',
      artifact_created: 'артефакт',
      verifier_result: 'проверка',
      memory_event: 'память',
      approval_event: 'подтверждение',
      research_event: 'исследование',
      eyes_evidence: 'глаза',
      hands_plan: 'руки',
      handoff_event: 'передача',
      teleport_event: 'перенос задачи',
      continuity_event: 'непрерывность',
      worker_runtime: 'runtime',
      brain_answer: 'ответ мозга',
      brain_council: 'совет',
      audit: 'аудит',
      decision: 'решение'
    };
    return labels[type] || 'событие';
  },

  workspaceMessageAuthor(message) {
    return message.author || 'Рабочее окно';
  },

  formatTaskTime(value) {
    if (!value) return 'время не задано';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  },

  formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
  },

  generateWorkspaceId(prefix) {
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
  },

  openVerifierPanel(task) {
    task.status = 'verifying';
    task.updated_at = new Date().toISOString();
    this.addWorkAudit(task, 'Открыта панель Verifier v2.');
    this.workspaceActiveTab = 'check';

    const output = document.getElementById('work-safe-output');
    if (output) output.hidden = true;

    const panel = document.getElementById('work-verifier-panel');
    if (panel) panel.hidden = false;

    this.renderWorkspaceTabs();
    this.renderVerifierPanel(task);
    this.toast('Verifier v2 открыт');
  },

  renderVerifierPanel(task) {
    const panel = document.getElementById('work-verifier-panel');
    if (!panel || !task) return;

    const notes = this.normalizedVerifierNotes(task);
    const risks = this.normalizedVerifierRisks(task);
    const checklist = task.verifier_checklist || {};
    const setValue = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.value = value || '';
    };

    setValue('verifier-report-input', notes.report);
    setValue('verifier-evidence-input', notes.evidence);
    setValue('verifier-expected-input', notes.expected || task.user_request);
    setValue('verifier-first-check-input', notes.first_check || task.next_step);
    setValue('verifier-not-checked-input', risks.not_checked);
    setValue('verifier-manual-input', risks.manual_review);
    setValue('verifier-break-risk-input', risks.can_break);

    const verdict = document.getElementById('verifier-current-verdict');
    if (verdict) {
      verdict.textContent = this.verifierVerdictName(task.verifier_result);
      verdict.className = `verifier-verdict verifier-verdict--${this.verifierVerdictClass(task.verifier_result)}`;
    }

    const checklistHost = document.getElementById('verifier-checklist');
    if (checklistHost) {
      checklistHost.innerHTML = VERIFIER_CHECKLIST.map((item) => `
        <label class="verifier-check-item">
          <input type="checkbox" data-verifier-check="${this.escapeHtml(item.id)}" ${checklist[item.id] ? 'checked' : ''}>
          <span>${this.escapeHtml(item.label)}</span>
        </label>
      `).join('');
    }

    this.renderVerifierResult(task);
  },

  handleVerifierAction(action) {
    const task = this.getActiveWorkTask();
    if (!task) {
      this.toast('Сначала создай задачу');
      return;
    }

    if (action === 'close') {
      const panel = document.getElementById('work-verifier-panel');
      if (panel) panel.hidden = true;
      this.addWorkAudit(task, 'Панель Verifier v2 закрыта.');
      this.saveWorkTasks();
      this.toast('Проверка закрыта');
      return;
    }

    if (action !== 'build') return;

    const verifierInput = this.collectVerifierInput();
    const evaluation = this.evaluateVerifierInput(verifierInput, task);
    this.saveVerifierResult(task, verifierInput, evaluation);
    this.saveWorkTasks();
    this.renderWorkTaskCard();
    this.toast(`Verifier: ${this.verifierVerdictName(evaluation.verdict)}`);
  },

  collectVerifierInput() {
    const value = (id) => document.getElementById(id)?.value.trim() || '';
    const checklist = {};
    document.querySelectorAll('[data-verifier-check]').forEach((input) => {
      checklist[input.dataset.verifierCheck] = input.checked;
    });

    return {
      report: value('verifier-report-input'),
      evidence: value('verifier-evidence-input'),
      expected: value('verifier-expected-input'),
      first_check: value('verifier-first-check-input'),
      risks: {
        not_checked: value('verifier-not-checked-input'),
        manual_review: value('verifier-manual-input'),
        can_break: value('verifier-break-risk-input'),
        first_check: value('verifier-first-check-input')
      },
      checklist
    };
  },

  evaluateVerifierInput(input, task = null) {
    const checkedItems = VERIFIER_CHECKLIST.filter((item) => input.checklist[item.id]);
    const missingCritical = VERIFIER_CHECKLIST.filter((item) => item.critical && !input.checklist[item.id]);
    const rejectCritical = missingCritical.filter((item) => item.rejectIfMissing);
    const risksPresent = [input.risks.not_checked, input.risks.manual_review, input.risks.can_break].some(Boolean);
    const checklistIncomplete = checkedItems.length < VERIFIER_CHECKLIST.length;
    const textForScan = [input.report, input.evidence, input.expected, input.first_check].join('\n');
    const privacyScan = this.scanPrivacyText(textForScan);
    const gateFindings = this.buildVerifierGateFindings(input, task, privacyScan);
    const evidenceGate = this.verifierEvidenceGate(task, input);
    const qualityGate = this.verifierQualityGate(task, input, gateFindings);
    const reasons = [];
    let verdict = 'MANUAL_REVIEW';

    if (!input.report && !input.evidence && checkedItems.length === 0) {
      reasons.push('Недостаточно данных: нет отчета, evidence и checklist.');
      return { verdict, reasons, checklistIncomplete, risksPresent, privacyScan, gateFindings, evidenceGate, qualityGate };
    }

    if (privacyScan.blocked) {
      verdict = 'REJECT';
      reasons.push('Privacy Guard нашёл потенциальные секреты или чувствительные значения в отчете/evidence.');
    }

    const dangerousFindings = gateFindings.filter((finding) => finding.severity === 'danger');
    if (dangerousFindings.length) {
      verdict = 'REJECT';
      reasons.push(...dangerousFindings.map((finding) => finding.text));
    }

    const blockingFindings = gateFindings.filter((finding) => finding.blocksPass);
    if (verdict !== 'REJECT' && blockingFindings.length) {
      verdict = 'NEEDS_FIX';
      reasons.push(...blockingFindings.map((finding) => finding.text));
    }

    if (verdict !== 'REJECT' && rejectCritical.length) {
      verdict = 'REJECT';
      reasons.push(...rejectCritical.map((item) => `Не подтверждено: ${item.label}.`));
    } else if (verdict !== 'REJECT' && missingCritical.length) {
      verdict = 'NEEDS_FIX';
      reasons.push(...missingCritical.map((item) => `Не закрыт критичный пункт: ${item.label}.`));
    } else if (verdict !== 'REJECT' && verdict !== 'NEEDS_FIX' && !evidenceGate.ok && !evidenceGate.honestAbsence) {
      verdict = 'NEEDS_FIX';
      reasons.push(evidenceGate.reason);
    } else if (verdict !== 'REJECT' && verdict !== 'NEEDS_FIX' && evidenceGate.honestAbsence) {
      verdict = 'PASS_WITH_RISKS';
      reasons.push(evidenceGate.reason);
    } else if (verdict !== 'REJECT' && (checklistIncomplete || risksPresent || gateFindings.length || privacyScan.findings.length)) {
      verdict = 'PASS_WITH_RISKS';
      if (checklistIncomplete) reasons.push('Есть неполные проверки.');
      if (risksPresent) reasons.push('Есть риски или пункты для ручной проверки.');
      if (privacyScan.findings.length) reasons.push(`Privacy Guard требует ручной проверки: ${this.privacyScanSummary(privacyScan)}.`);
      if (gateFindings.length) reasons.push('Есть дополнительные gate findings.');
    } else if (verdict !== 'REJECT' && !qualityGate.ok) {
      verdict = 'PASS_WITH_RISKS';
      reasons.push(qualityGate.reason);
    } else if (verdict !== 'REJECT') {
      verdict = 'PASS';
      reasons.push('Ключевые проверки отмечены, явных рисков не указано.');
    }

    return { verdict, reasons, checklistIncomplete, risksPresent, privacyScan, gateFindings, evidenceGate, qualityGate };
  },

  buildVerifierGateFindings(input, task, privacyScan) {
    const findings = [];
    const report = input.report || '';
    const evidence = input.evidence || '';
    const text = `${report}\n${evidence}`;
    const lower = text.toLowerCase();
    const evidenceGate = this.verifierEvidenceGate(task, input);

    if (!report.trim()) {
      findings.push({ severity: 'review', blocksPass: true, text: 'Отчет исполнителя не вставлен.' });
    } else if (report.length < 80) {
      findings.push({ severity: 'review', blocksPass: true, text: 'Отчет слишком короткий для уверенной приемки.' });
    }
    if (!evidenceGate.ok) {
      findings.push({ severity: evidenceGate.honestAbsence ? 'review' : 'review', blocksPass: !evidenceGate.honestAbsence, text: evidenceGate.reason });
    }
    if (input.checklist.checks_passed && !this.verifierHasCheckSignals(text)) {
      findings.push({ severity: 'review', blocksPass: true, text: 'Пункт про проверки отмечен, но в отчете/evidence нет явного списка проверок.' });
    }
    if (input.checklist.changed_files && !this.verifierHasChangedFileSignals(text)) {
      findings.push({ severity: 'review', text: 'Пункт про измененные файлы отмечен, но список файлов в отчете не найден.' });
    }
    if (input.checklist.first_check && !input.first_check.trim()) {
      findings.push({ severity: 'review', blocksPass: true, text: 'Пункт "что проверить первым" отмечен, но поле проверки пустое.' });
    }
    if (input.checklist.result_archive_path && !evidence.trim() && !(task?.artifacts || []).some((artifact) => artifact.type === 'RESULT_ARCHIVE')) {
      findings.push({ severity: 'review', blocksPass: true, text: 'Пункт про архив/путь отмечен, но путь или описание результата не заполнены.' });
    }
    if (this.verifierHasDisallowedAiApiSignals(text)) {
      findings.push({ severity: 'danger', text: 'Отчет похож на использование AI API, что запрещено без отдельного approval.' });
    }
    if (/direct bridge|local agent|cloudflare worker|mina-local-agent/i.test(text) && !input.checklist.no_bridge_agent_changes) {
      findings.push({ severity: 'review', text: 'В отчете упомянуты Direct Bridge / Local Agent, но checklist не подтверждает, что они не менялись.' });
    }
    if (/\b(?:не проверено|not checked|не тестировал|не тестировалось)\b/i.test(text) && !input.risks.not_checked) {
      findings.push({ severity: 'review', text: 'В отчете есть непроверенные пункты, но поле "Что не проверено" пустое.' });
    }
    if (/\b(?:ошибка|failed|fail|не работает|сломано|crash|exception)\b/i.test(text) && !input.risks.can_break) {
      findings.push({ severity: 'review', text: 'В отчете есть признаки ошибок, но риск поломки не описан.' });
    }
    if ((privacyScan?.findings || []).some((finding) => finding.severity === 'danger')) {
      findings.push({ severity: 'danger', text: 'В отчете/evidence есть потенциальный секрет или токен.' });
    }
    if (lower.includes('кракозябр') && !input.checklist.no_mojibake) {
      findings.push({ severity: 'review', text: 'Упомянут текст/кодировка, но пункт про отсутствие кракозябр не отмечен.' });
    }
    if (this.verifierHasMojibakeSignals(text)) {
      findings.push({ severity: 'danger', text: 'В отчете/evidence найдены признаки сломанной кодировки.' });
    }
    if (/click-zone-only|click zones|click-zone/i.test(text) && !input.checklist.no_click_zone_only) {
      findings.push({ severity: 'review', text: 'Упомянут click-zone подход, но checklist не подтверждает отсутствие click-zone-only UI.' });
    }
    if (/(?:deploy|cloudflare|push\s+main|force\s+push|dns|vpn|proxy|firewall|defender|\.env|delete|remove|удали)/i.test(text) && !input.checklist.no_env_secrets) {
      findings.push({ severity: 'danger', text: 'В отчете есть признаки запрещенных действий или чувствительных зон без безопасного подтверждения.' });
    }
    return findings;
  },

  saveVerifierResult(task, input, evaluation) {
    const now = new Date().toISOString();
    task.verifier_result = evaluation.verdict;
    task.verifier_checklist = input.checklist;
    task.verifier_risks = input.risks;
    task.verifier_notes = {
      report: input.report,
      evidence: input.evidence,
      expected: input.expected,
      first_check: input.first_check
    };
    task.verifier_return_text = ['NEEDS_FIX', 'REJECT'].includes(evaluation.verdict)
      ? this.buildVerifierReturnText(task, evaluation.reasons, input)
      : '';
    task.verifier_gate_findings = evaluation.gateFindings || [];
    task.verifier_evidence_gate = evaluation.evidenceGate || this.verifierEvidenceGate(task, input);
    task.verifier_quality_gate = evaluation.qualityGate || this.verifierQualityGate(task, input, task.verifier_gate_findings);
    task.verifier_privacy_scan = evaluation.privacyScan || this.scanPrivacyText([input.report, input.evidence].join('\n'));
    task.verified_at = now;
    task.updated_at = now;
    task.status = VERIFIER_VERDICTS[evaluation.verdict]?.status || 'manual_required';
    const artifact = this.createArtifact(
      task,
      'VERIFIER_VERDICT',
      `Вердикт проверки: ${this.verifierVerdictName(evaluation.verdict)}`,
      evaluation.reasons.join(' ') || this.verifierDescription(evaluation.verdict),
      [
        `Вердикт: ${evaluation.verdict}`,
        '',
        'Причины:',
        ...(evaluation.reasons.length ? evaluation.reasons.map((reason) => `- ${reason}`) : ['- не указано']),
        '',
        `Checklist: ${this.verifierChecklistSummary({ verifier_checklist: input.checklist })}`,
        `Риски: ${this.verifierRisksSummary({ verifier_risks: input.risks })}`,
        `Privacy: ${this.privacyScanSummary(task.verifier_privacy_scan)}`,
        `Evidence gate: ${task.verifier_evidence_gate.label} — ${task.verifier_evidence_gate.reason}`,
        `Quality gate: ${task.verifier_quality_gate.label} — ${task.verifier_quality_gate.reason}`,
        '',
        'Gate findings:',
        ...((evaluation.gateFindings || []).length ? evaluation.gateFindings.map((finding) => `- ${finding.severity}${finding.blocksPass ? ' / blocks PASS' : ''}: ${finding.text}`) : ['- нет'])
      ].join('\n'),
      'verifier'
    );
    artifact.status = evaluation.verdict === 'PASS' ? 'accepted' : evaluation.verdict === 'PASS_WITH_RISKS' ? 'accepted_with_risks' : 'needs_action';
    artifact.privacy_scan = task.verifier_privacy_scan;
    task.memory_preview = {
      ...(task.memory_preview || {}),
      verifier_result: evaluation.verdict,
      verifier_risks: input.risks,
      linked_artifact_ids: [...new Set([...(task.memory_preview?.linked_artifact_ids || []), artifact.artifact_id])]
    };
    this.addWorkspaceMessage(task, 'verifier_result', 'Проверка', `Verifier сформировал verdict: ${this.verifierVerdictName(evaluation.verdict)}.`, {
      linked_artifact_id: artifact.artifact_id,
      linked_artifacts: [artifact.artifact_id]
    });
    this.addWorkAudit(task, `Verifier сформировал verdict: ${evaluation.verdict}.`);
  },

  renderVerifierResult(task) {
    const resultPanel = document.getElementById('verifier-result-panel');
    if (!resultPanel) return;

    const verdict = task.verifier_result || '';
    const resultTitle = document.getElementById('verifier-result-title');
    const resultDescription = document.getElementById('verifier-result-description');
    const returnBlock = document.getElementById('verifier-return-block');
    const returnText = document.getElementById('verifier-return-text');
    const riskNote = document.getElementById('verifier-risk-note');
    const gateList = document.getElementById('verifier-gate-list');

    if (!verdict || verdict === 'не проверено') {
      resultPanel.hidden = true;
      if (riskNote) riskNote.hidden = true;
      if (gateList) gateList.innerHTML = '';
      return;
    }

    resultPanel.hidden = false;
    resultPanel.className = `verifier-result verifier-result--${this.verifierVerdictClass(verdict)}`;
    if (resultTitle) resultTitle.textContent = `Вердикт: ${this.verifierVerdictName(verdict)}`;
    if (resultDescription) {
      resultDescription.textContent = this.verifierDescription(verdict);
    }

    if (returnBlock && returnText) {
      const needsReturn = ['NEEDS_FIX', 'REJECT'].includes(verdict);
      returnBlock.hidden = !needsReturn;
      returnText.value = needsReturn ? task.verifier_return_text || '' : '';
    }

    if (gateList) {
      const evidenceGate = task.verifier_evidence_gate || this.verifierEvidenceGate(task);
      const qualityGate = task.verifier_quality_gate || this.verifierQualityGate(task);
      const findings = [
        {
          severity: evidenceGate.ok ? 'safe' : 'review',
          text: `Evidence gate: ${evidenceGate.label}. ${evidenceGate.reason}`
        },
        {
          severity: qualityGate.ok ? 'safe' : 'review',
          text: `Quality gate: ${qualityGate.label}. ${qualityGate.reason}`
        },
        ...(task.verifier_gate_findings || []),
        ...((task.verifier_privacy_scan?.findings || []).map((finding) => ({
          severity: finding.severity,
          text: `Privacy: ${finding.label}, строка ${finding.line}`
        })))
      ];
      gateList.innerHTML = findings.length
        ? findings.slice(0, 8).map((finding) => `<article data-severity="${this.escapeHtml(finding.severity)}">${this.escapeHtml(finding.text)}</article>`).join('')
        : '<article>Дополнительных gate findings нет.</article>';
    }

    const checklist = task.verifier_checklist || {};
    const risks = this.normalizedVerifierRisks(task);
    const incomplete = VERIFIER_CHECKLIST.some((item) => !checklist[item.id]);
    const hasRiskText = [risks.not_checked, risks.manual_review, risks.can_break].some(Boolean);
    if (riskNote) {
      riskNote.hidden = !(incomplete && !hasRiskText);
      riskNote.textContent = 'Есть неполные проверки. Результат нельзя принимать как чистый PASS.';
    }
  },

  buildVerifierReturnText(task, reasons, input) {
    const reasonLines = reasons.length ? reasons : ['Verifier v2 не смог подтвердить безопасную приемку результата.'];
    const firstCheck = input.first_check || 'повторить проверку по исходным критериям задачи';
    return [
      'Результат не принят.',
      '',
      'Причины:',
      ...reasonLines.map((reason) => `- ${reason}`),
      '',
      'Что исправить:',
      '- закрыть критичные пункты checklist;',
      '- приложить недостающий отчет, evidence или архив;',
      '- явно указать, что не проверено и какие риски остались.',
      '- убрать секреты, токены, .env-значения и чувствительные строки из отчета/evidence;',
      '- подтвердить отсутствие AI API и запрещенных изменений.',
      '',
      'Что повторно проверить:',
      `- ${firstCheck}`,
      '',
      'Что вернуть:',
      '- отчет;',
      '- evidence;',
      '- архив;',
      '- список измененных файлов;',
      '- проверки;',
      '- риски.',
      '',
      `Задача: ${task.task_id} — ${task.title}`
    ].join('\n');
  },

  updateVerifierActionHints(task) {
    const card = document.getElementById('work-task-card');
    if (!card) return;

    const acceptButton = card.querySelector('[data-work-action="accept"]');
    const fixButton = card.querySelector('[data-work-action="needs_fix"]');
    const pass = ['PASS', 'PASS_WITH_RISKS'].includes(task.verifier_result);
    const needsFix = ['NEEDS_FIX', 'REJECT'].includes(task.verifier_result);

    acceptButton?.classList.toggle('work-action--recommended', pass);
    fixButton?.classList.toggle('work-action--warn', needsFix);
  },

  verifierVerdictName(verdict) {
    if (!verdict || verdict === 'не проверено') return 'не проверено';
    return VERIFIER_VERDICTS[verdict]?.name || verdict;
  },

  verifierVerdictClass(verdict) {
    if (verdict === 'PASS') return 'pass';
    if (verdict === 'PASS_WITH_RISKS') return 'risk';
    if (verdict === 'NEEDS_FIX') return 'needs-fix';
    if (verdict === 'REJECT') return 'reject';
    if (verdict === 'MANUAL_REVIEW') return 'manual';
    return 'empty';
  },

  verifierDescription(verdict) {
    const descriptions = {
      PASS: 'Ключевые пункты закрыты. Результат можно принять локально.',
      PASS_WITH_RISKS: 'Ключевые пункты закрыты, но есть риски или неполные проверки.',
      NEEDS_FIX: 'Результат нужно вернуть на доработку.',
      REJECT: 'Результат нельзя принимать в текущем виде.',
      MANUAL_REVIEW: 'Недостаточно данных. Нужна ручная проверка владельца.'
    };
    return descriptions[verdict] || 'Проверка ожидает данных.';
  },

  normalizedVerifierNotes(task) {
    const notes = task.verifier_notes && typeof task.verifier_notes === 'object' ? task.verifier_notes : {};
    return {
      report: notes.report || '',
      evidence: notes.evidence || '',
      expected: notes.expected || task.user_request || '',
      first_check: notes.first_check || task.next_step || ''
    };
  },

  normalizedVerifierRisks(task) {
    const risks = task.verifier_risks && typeof task.verifier_risks === 'object' ? task.verifier_risks : {};
    return {
      not_checked: risks.not_checked || '',
      manual_review: risks.manual_review || '',
      can_break: risks.can_break || '',
      first_check: risks.first_check || ''
    };
  },

  verifierChecklistSummary(task) {
    const checklist = task.verifier_checklist || {};
    const checked = VERIFIER_CHECKLIST.filter((item) => checklist[item.id]).length;
    return `${checked}/${VERIFIER_CHECKLIST.length}`;
  },

  verifierRisksSummary(task) {
    const risks = this.normalizedVerifierRisks(task);
    const lines = [
      risks.not_checked ? `Не проверено: ${risks.not_checked}` : '',
      risks.manual_review ? `Ручная проверка: ${risks.manual_review}` : '',
      risks.can_break ? `Может сломаться: ${risks.can_break}` : '',
      risks.first_check ? `Проверить первым: ${risks.first_check}` : ''
    ].filter(Boolean);
    return lines.length ? lines.join('\n') : 'не задано';
  },

  verifierNotesSummary(task) {
    const notes = this.normalizedVerifierNotes(task);
    const lines = [
      notes.report ? `Отчет: ${notes.report.slice(0, 220)}` : '',
      notes.evidence ? `Evidence: ${notes.evidence}` : '',
      notes.expected ? `Ожидание: ${notes.expected}` : '',
      notes.first_check ? `Проверить первым: ${notes.first_check}` : ''
    ].filter(Boolean);
    return lines.length ? lines.join('\n') : 'не задано';
  },

  handleWorkTaskAction(action) {
    const task = this.getActiveWorkTask();
    if (!task) {
      this.toast('Сначала создай задачу');
      return;
    }

    const handlers = {
      prepare_task: () => this.showWorkSafeOutput(task, 'Подготовить ТЗ', this.buildCodexTaskPreview(task), 'context_ready'),
      brain_council: () => {
        this.buildBrainPromptPackages(task);
        task.status = task.status === 'created' ? 'planning' : task.status;
      },
      assign_codex: () => this.showWorkSafeOutput(task, 'Отдать Codex', this.buildCodexTaskPreview(task), 'ready_for_executor'),
      check_result: () => this.openVerifierPanel(task),
      research: () => {
        if (!this.ensureResearchOpsState(task).brief.question) this.createResearchBriefFromTask(task);
        task.status = task.status === 'created' ? 'planning' : task.status;
        this.switchWorkspaceTab('research');
      },
      save_memory: () => this.saveWorkMemoryDraft(task),
      accept: () => this.attemptAcceptTask(task),
      needs_fix: () => this.showWorkSafeOutput(task, 'Вернуть на доработку', this.buildNeedsFixTemplate(task), 'needs_fix'),
      toggle_expert: () => this.toggleWorkExpert(task)
    };

    handlers[action]?.();
    this.saveWorkTasks();
    this.renderWorkTaskCard();
  },

  handleWorkShortcut(action) {
    if (action === 'verify') {
      const task = this.getActiveWorkTask();
      if (task) {
        this.openVerifierPanel(task);
        this.saveWorkTasks();
        this.renderWorkTaskCard();
        return;
      }
    }

    const labels = {
      tasks: `Локально сохранено задач: ${this.workTasks.length}`,
      verify: 'Сначала создай задачу для проверки результата.',
      research: 'Создай или открой задачу, затем используй вкладку Исследование.',
      council: 'Создай или открой задачу, затем используй вкладку Совет в Рабочем окне.'
    };
    this.toast(labels[action] || 'Действие будет реализовано следующим этапом', 3600);
  },

  showWorkSafeOutput(task, title, text, nextStatus) {
    if (nextStatus) task.status = nextStatus;
    task.updated_at = new Date().toISOString();
    this.addWorkAudit(task, `Нажата кнопка ${title}.`);
    const output = document.getElementById('work-safe-output');
    if (output) {
      output.hidden = false;
      output.innerHTML = `<strong>${this.escapeHtml(title)}</strong><p>${this.escapeHtml(text)}</p>`;
    }
    this.toast(`${title}: безопасный preview`);
  },

  buildCodexTaskPreview(task) {
    return [
      `Задача: ${task.title}`,
      `Проект: ${this.projectName(task.project_id)}`,
      `Режим: ${this.modeName(task.mode)}`,
      `Качество: ${this.qualityName(task.quality_level)}`,
      `Критерии: ${task.readiness_criteria.join('; ')}`,
      'Не использовать AI API, не менять сеть, не деплоить без разрешения.'
    ].join('\n');
  },

  buildNeedsFixTemplate(task) {
    return [
      `Вернуть задачу ${task.task_id} на доработку.`,
      `Причина: требуется уточнить результат по задаче "${task.title}".`,
      `Ожидание: исправить и снова предоставить evidence.`
    ].join('\n');
  },

  saveWorkMemoryDraft(task) {
    task.memory_status = 'saved_local';
    task.status = 'saved';
    task.memory_preview = this.buildWorkspaceMemoryPreview(task, 'saved_local');
    task.updated_at = new Date().toISOString();
    this.addWorkAudit(task, 'Создан memory preview.');
    this.showWorkSafeOutput(task, 'Сохранить в память', `Memory preview сохранён локально для ${task.task_id}.`, 'saved');
  },

  attemptAcceptTask(task) {
    const gate = this.acceptanceGateStatus(task);
    if (!gate.ready) {
      if (!['PASS', 'PASS_WITH_RISKS'].includes(task.verifier_result)) {
        this.openVerifierPanel(task);
      } else if (!['saved_local', 'skipped', 'не сохранять'].includes(task.memory_preview?.status || task.memory_status)) {
        task.memory_preview = this.buildWorkspaceMemoryPreview(task, 'draft');
        task.memory_status = 'draft';
        task.status = 'saving_memory';
        this.switchWorkspaceTab('memory');
        this.addWorkspaceMessage(task, 'memory_event', 'Память', 'Перед приёмкой нужно сохранить или пропустить Memory Preview.');
      }
      this.addWorkAudit(task, `Приёмка заблокирована: ${gate.reason}`);
      this.toast(gate.label);
      return;
    }

    const status = task.verifier_result === 'PASS_WITH_RISKS' ? 'accepted_with_risks' : 'accepted';
    task.status = status;
    task.accepted_at = new Date().toISOString();
    task.updated_at = task.accepted_at;
    const decision = [
      `Решение: ${this.statusName(status)}`,
      `Verifier: ${this.verifierVerdictName(task.verifier_result)}`,
      `Память: ${task.memory_preview?.status || task.memory_status}`,
      `Задача: ${task.task_id} — ${task.title}`
    ].join('\n');
    this.createArtifact(task, 'DECISION_RECORD', 'Решение по задаче', `Задача ${this.statusName(status)}.`, decision, 'acceptance');
    this.addWorkspaceMessage(task, 'decision', 'Владелец', `Задача ${this.statusName(status)}.`);
    this.addWorkAudit(task, `Статус изменен на ${status}.`);
    this.toast(this.statusName(status));
  },

  setWorkStatus(task, status, auditText) {
    if (!WORK_STATUSES.includes(status)) return;
    task.status = status;
    task.updated_at = new Date().toISOString();
    this.addWorkAudit(task, auditText);
    this.toast(this.statusName(status));
  },

  toggleWorkExpert(task) {
    this.workExpertOpen = !this.workExpertOpen;
    this.addWorkAudit(task, this.workExpertOpen ? 'Открыт экспертный вид.' : 'Экспертный вид закрыт.');
    this.renderWorkExpertView(task);
  },

  renderWorkExpertView(task) {
    const expert = document.getElementById('work-expert-view');
    if (!expert) return;
    expert.hidden = !this.workExpertOpen;
    if (expert.hidden) return;

    const rows = [
      ['task_id', task.task_id],
      ['project_id', task.project_id],
      ['mode', task.mode],
      ['quality_level', task.quality_level],
      ['status', task.status],
      ['context_scope', task.context_scope || 'не задано'],
      ['constraints', this.listOrFallback(task.constraints, 'не задано')],
      ['forbidden_actions', this.listOrFallback(task.forbidden_actions, 'не задано')],
      ['readiness_criteria', this.listOrFallback(task.readiness_criteria, 'не задано')],
      ['risks', this.listOrFallback(task.risks, 'не задано')],
      ['executor', task.executor || 'не задано'],
      ['evidence_ids', this.listOrFallback(task.evidence_ids, 'нет evidence')],
      ['verifier_result', this.verifierVerdictName(task.verifier_result)],
      ['verifier_checklist', this.verifierChecklistSummary(task)],
      ['verifier_risks', this.verifierRisksSummary(task)],
      ['verifier_notes', this.verifierNotesSummary(task)],
      ['verifier_evidence_gate', task.verifier_evidence_gate?.label || this.verifierEvidenceGate(task).label],
      ['verifier_quality_gate', task.verifier_quality_gate?.label || this.verifierQualityGate(task).label],
      ['verifier_return_text', task.verifier_return_text || 'не задано'],
      ['verified_at', task.verified_at || 'не проверено'],
      ['memory_status', task.memory_status || 'ожидает данных'],
      ['approval_required', task.approval_required || 'ожидает данных'],
      ['audit_log', this.listOrFallback(task.audit_log, 'ожидает данных')]
    ];

    expert.innerHTML = `
      <h4>Экспертный вид</h4>
      <dl class="work-details work-details--expert">
        ${rows.map(([label, value]) => `
          <div>
            <dt>${this.escapeHtml(label)}</dt>
            <dd>${this.escapeHtml(value)}</dd>
          </div>
        `).join('')}
      </dl>
    `;
  },

  addWorkAudit(task, text) {
    const at = new Date().toLocaleString('ru-RU', { hour12: false });
    task.audit_log = Array.isArray(task.audit_log) ? task.audit_log : [];
    task.audit_log.push(`${at} — ${text}`);
    this.recordTaskEvent(task, 'audit', text, {
      actor: 'system',
      source: 'audit'
    });
  },

  getActiveWorkTask() {
    return this.workTasks.find((task) => task.task_id === this.activeWorkTaskId) || this.workTasks[0] || null;
  },

  projectName(projectId) {
    return this.projectById(projectId)?.name || WORK_PROJECT_BY_ID[projectId]?.name || 'Терминатор';
  },

  modeName(modeId) {
    return WORK_MODE_BY_ID[modeId]?.name || 'Авто';
  },

  qualityName(qualityId) {
    return WORK_QUALITY_BY_ID[qualityId]?.name || 'Стандарт';
  },

  statusName(status) {
    return status || 'не задано';
  },

  listOrFallback(value, fallback) {
    if (Array.isArray(value)) return value.length ? value.join('; ') : fallback;
    return value || fallback;
  },

  escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  async prepareOwnerSession() {
    if (!isConfiguredDirectModeActive()) return true;

    try {
      const token = await ensureOwnerSession(getConfiguredDirectBridgeBaseUrl(), { interactive: true });
      if (token) return true;

      this.toast('Авторизация владельца отменена');
      return false;
    } catch (error) {
      console.error('[MinaWebApp] Owner session failed', error);
      this.toast(error.status === 401 ? 'Пароль владельца не принят' : 'Не удалось активировать доступ владельца');
      return false;
    }
  },

  async sendPersonalAction(action, payload = {}) {
    if (!this.isLegacyPersonalAccessAllowed()) {
      this.toast('Личное отключено как активный режим. Используй Рабочее / Совет мозгов.');
      return false;
    }

    const brain = payload.brain || this.selectedModel;
    if (action === 'ensure_anydesk') this.setAnyDeskPending();

    const data = {
      ...payload,
      type: 'personal_action',
      action,
      brain,
      source: 'mina_webapp',
      version: 1
    };

    const result = await sendTerminatorAction(data);
    this.toast(result.message);

    if (result.ok && result.transport === 'direct' && result.commandId && result.canTrackStatus) {
      this.watchDirectCommand(result.commandId, { action });
    }

    return result.ok;
  },

  watchDirectCommand(commandId, context = {}) {
    this.stopDirectCommandPolling();

    const startedAt = Date.now();
    const poll = async () => {
      try {
        const status = await getDirectCommandStatus(commandId);

        if (status?.status && DIRECT_FINAL_STATUSES.has(status.status)) {
          this.commandPollTimer = null;
          this.handleDirectCommandStatus(status, context);
          this.toast(this.formatDirectCommandStatus(status));
          return;
        }
      } catch (error) {
        console.error('[MinaWebApp] Direct status polling failed', error);
      }

      if (Date.now() - startedAt > DIRECT_STATUS_POLL_TIMEOUT_MS) {
        this.commandPollTimer = null;
        this.toast('Статус команды не получен');
        return;
      }

      this.commandPollTimer = window.setTimeout(poll, DIRECT_STATUS_POLL_INTERVAL_MS);
    };

    this.commandPollTimer = window.setTimeout(poll, DIRECT_STATUS_POLL_INTERVAL_MS);
  },

  stopDirectCommandPolling() {
    if (!this.commandPollTimer) return;
    window.clearTimeout(this.commandPollTimer);
    this.commandPollTimer = null;
  },

  handleDirectCommandStatus(status, context = {}) {
    if (context.action === 'ensure_anydesk' || status?.action === 'ensure_anydesk') {
      this.setAnyDeskResult(status);
    }
  },

  setAnyDeskPending() {
    this.anydesk = {
      id: '',
      status: 'проверяется',
      deepLink: '',
      checked: true,
      error: ''
    };
    this.renderAnyDeskAccess();
  },

  setAnyDeskResult(status) {
    const details = this.extractAnyDeskDetails(status);
    this.anydesk = {
      id: details.id,
      status: details.status,
      deepLink: details.deepLink,
      checked: true,
      error: details.id ? '' : 'AnyDesk ID не найден. Проверь AnyDesk на ПК Терминатора.'
    };

    this.renderAnyDeskAccess();
    if (!details.id) this.toast(this.anydesk.error, 4200);
  },

  extractAnyDeskDetails(status) {
    const result = status?.result || {};
    const errorDetail = status?.error?.detail || {};
    const detail = result.anydesk || errorDetail.anydesk || result || errorDetail;
    const id = this.normalizeAnyDeskId(
      result.anydeskId
      || result.anydesk_id
      || detail.anydeskId
      || detail.anydesk_id
      || detail.id
    );
    const deepLink = result.deepLink
      || result.anydeskUrl
      || detail.deepLink
      || detail.anydeskUrl
      || detail.url
      || (id ? `anydesk:${id}` : '');
    const statusText = result.anydeskStatus
      || detail.anydeskStatus
      || detail.statusText
      || (status?.status === 'completed' ? 'активен' : 'недоступен');

    return {
      id,
      deepLink: id ? deepLink : '',
      status: statusText
    };
  },

  normalizeAnyDeskId(value) {
    const match = String(value || '').match(/\b\d{6,12}\b/);
    return match ? match[0] : '';
  },

  renderAnyDeskAccess() {
    const statusEl = document.getElementById('anydesk-status');
    const idEl = document.getElementById('anydesk-id');
    const fallbackIdEl = document.getElementById('anydesk-fallback-id');
    const installLink = document.getElementById('anydesk-install-link');

    const id = this.anydesk.id || '';
    const idText = id || (this.anydesk.status === 'проверяется' ? 'ожидание' : (this.anydesk.checked ? 'не найден' : 'не получен'));
    if (statusEl) statusEl.textContent = this.anydesk.status || 'не проверен';
    if (idEl) idEl.textContent = idText;
    if (fallbackIdEl) fallbackIdEl.textContent = idText;
    if (installLink) installLink.href = ANYDESK_INSTALL_URL;
  },

  openAnyDeskApp() {
    const id = this.normalizeAnyDeskId(this.anydesk.id);
    if (!id) {
      this.toast('AnyDesk ID не найден. Проверь AnyDesk на ПК Терминатора.', 4200);
      return;
    }

    const deepLink = this.anydesk.deepLink || `anydesk:${id}`;
    window.location.href = deepLink;
    window.setTimeout(() => {
      this.showAnyDeskFallback();
      this.toast('Если AnyDesk не открылся, установи AnyDesk и введи ID вручную.', 5200);
    }, 1800);
  },

  async copyAnyDeskId() {
    const id = this.normalizeAnyDeskId(this.anydesk.id);
    if (!id) {
      this.toast('AnyDesk ID не найден. Проверь AnyDesk на ПК Терминатора.', 4200);
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(id);
      } else {
        this.copyTextFallback(id);
      }
      this.toast('AnyDesk ID скопирован');
    } catch {
      this.copyTextFallback(id);
      this.toast('AnyDesk ID скопирован');
    }
  },

  copyTextFallback(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  },

  showAnyDeskFallback() {
    const fallback = document.getElementById('anydesk-fallback');
    if (fallback) fallback.hidden = false;
  },

  formatDirectCommandStatus(status) {
    if (status.status === 'completed') return 'Команда выполнена';
    if (status.status === 'manual_required') return 'Требуется ручная проверка';
    if (status.status === 'failed') return 'Команда не выполнена';
    return 'Статус команды обновлён';
  },

  toast(message, duration = 2600) {
    const toast = document.getElementById('toast');
    window.clearTimeout(this.toastTimer);

    toast.textContent = message;
    toast.classList.add('visible');

    this.toastTimer = window.setTimeout(() => {
      toast.classList.remove('visible');
    }, duration);
  },

  isTypingTarget(target) {
    if (!target) return false;
    return ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
  }
};

function startMinaApp() {
  App.init().catch((error) => {
    console.error('[MinaWebApp] Init failed', error);
    App.toast?.('Ошибка запуска Mina UI');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startMinaApp, { once: true });
} else {
  startMinaApp();
}
