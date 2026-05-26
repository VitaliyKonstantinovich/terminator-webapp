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
const WORK_RUNTIME_DB_NAME = 'mina_task_runtime_v1';
const WORK_RUNTIME_DB_VERSION = 8;
const WORK_RUNTIME_META_KEY = 'runtime_meta';
const GUARDIAN_STATE_META_KEY = 'guardian_state_v1';
const WORK_RUNTIME_MIGRATION_KEY = 'localStorage_migrated_v1';
const WORK_PROJECT_BY_ID = Object.fromEntries(WORK_PROJECTS.map((project) => [project.id, project]));
const WORK_MODE_BY_ID = Object.fromEntries(WORK_MODES.map((mode) => [mode.id, mode]));
const WORK_QUALITY_BY_ID = Object.fromEntries(WORK_QUALITY_LEVELS.map((quality) => [quality.id, quality]));

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
  HEAD_EVENTS: 'head_events'
};

const DEFAULT_PROJECT_TYPE = 'custom';
const DIAGNOSTIC_WAITING_REPORT_STALE_MS = 2 * 60 * 60 * 1000;
const DIAGNOSTIC_MANUAL_REVIEW_STALE_MS = 24 * 60 * 60 * 1000;
const DIAGNOSTIC_DIRECT_HEALTH_TIMEOUT_MS = 6000;
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

const DEVICE_TYPES = {
  windows_pc: 'ПК Windows',
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
const WORKSPACE_TABS = new Set(['files', 'artifacts', 'research', 'council', 'check', 'memory']);
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
const TERMINATOR_STORAGE_ROOT = 'D:\\TerminatorStorage';
const TERMINATOR_LAST_CHECKPOINT = {
  name: 'Phase 3: Голова и Совет мозгов',
  date: '2026-05-25',
  status: 'Phase 3.1 закрыта локально',
  previous: 'Phase 2 Full Runtime Sync закрыт live',
  next: 'Phase 3.2: Исследование и паспорт решения'
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
  { id: 21, name: 'ResearchOps + Brain Council Runtime V1', status: 'закрыт локально' }
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
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('IndexedDB open failed'));
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
  workspaceFileRuntime: new Map(),
  workspaceTimer: null,
  runtimeSavePromise: null,
  toastTimer: null,
  commandPollTimer: null,
  tg: null,
  order: ['start', 'menu', 'work', 'mission', 'system'],
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
    this.initVoiceSupport();
    await this.initTaskRuntime();
    await this.loadWorkProjects();
    await this.loadWorkTasks();
    await this.syncTaskStore({ interactive: false, reason: 'init' });
    await this.loadSystemDevices();
    await this.loadHeadRuntime();
    await this.loadApprovalRecords();
    await this.loadSystemDiagnostics();
    await this.loadGuardianRuntime();
    this.attachVerifierPanel();
    this.renderWorkFormOptions();
    this.renderProjectRuntimePanel();
    this.renderWorkTaskCard();
    this.renderMissionControl();
    this.renderSystemStatus();
    this.renderBrain();
    this.renderAnyDeskAccess();
    this.startWorkspaceTimer();
    this.go('start', { immediate: true });
    this.retryTelegramInit();
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
      }
    });

    document.addEventListener('input', (event) => {
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
    recognition.lang = 'ru-RU';
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
    document.getElementById('brain-subtitle').textContent = 'Подключение к официальному окну через ПК Терминатора';
    document.getElementById('open-model-label').textContent = `Открыть ${model.name}`;
    document.getElementById('brain-profile').textContent = model.profile;

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
    this.updateTelegramControls();
  },

  handleBack() {
    const backMap = {
      start: null,
      menu: 'start',
      work: 'menu',
      mission: 'menu',
      system: 'menu',
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
      updated_at: project.updated_at || now
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
    const cards = [
      ['Проекты', projects.length, 'активные проекты'],
      ['Активные задачи', active, 'в работе или ожидании'],
      ['Исследование', researchActive, 'пакет исследования / источники'],
      ['Ждут отчёт', waiting, 'ожидание исполнителя'],
      ['Проверка', verifying, 'требуют Verifier'],
      ['Approval', approvals, 'требуют решения'],
      ['Риски', risks, 'не низкий риск'],
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
    const rows = [
      ['Task Runtime', this.taskRuntimeReady ? 'OK' : 'Fallback', this.taskRuntimeReady ? `${tasks.length} задач в IndexedDB/local mirror` : 'Работает localStorage fallback'],
      ['Guardian', guardian.label, guardian.note],
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
      'C:\\Users\\glebi\\Desktop\\терминатор - DeepSeek_files\\council\\local-agent',
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

      const requiredDevices = ['device_terminator_pc', 'device_local_agent', 'device_owner_phone', 'device_mission_display', 'device_home_assistant'];
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
    return {
      status,
      note: `${agent.name}: ${trust}; ${agent.notes || 'runtime не опрашивался в этом слое'}`
    };
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
    const cards = [
      ['Guardian', guardian.label, guardian.note],
      ['Синхронизация задач', taskStore.status, taskStore.note],
      ['Задачи', this.taskRuntimeReady ? 'локальная база' : 'резервный режим', this.taskRuntimeReady ? `${tasks.length} задач, ${projects.length} проектов` : 'браузерный резерв localStorage'],
      ['Голова', head.status, head.note],
      ['Подтверждения', approvals, 'опасные действия не выполняются автоматически'],
      ['Устройства', this.systemDevices.length, `${trustedDevices} доверенных или системных`],
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
    this.renderSystemDiagnostics();
    this.renderGuardianPanel();
    this.renderSystemStoragePolicy();
    this.renderSystemLastCheckpoint();
    this.renderSystemLegacyWarnings();
    this.renderSystemHeadPanel();
    this.renderApprovalCenter();
    this.renderSystemDevicePreview();
    this.renderSystemVoiceHooks();
  },

  renderSystemDiagnostics() {
    const host = document.getElementById('system-diagnostics');
    if (!host) return;
    const direct = this.directModeStatusSnapshot();
    const agent = this.localAgentStatusSnapshot();
    const taskStore = this.taskStoreStatusSnapshot();
    const head = this.headStatusSnapshot();
    const guardian = this.guardianSnapshot();
    const latest = this.systemDiagnostics[0] || null;
    const rows = [
      ['Guardian', guardian.label, `${guardian.note}; incidents: ${guardian.openIncidents.length}`],
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
      updated_at: brain.updated_at || now
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
      updated_at: agent.updated_at || now
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
      updated_at: profile.updated_at || now
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

  renderSystemDevicePreview() {
    const host = document.getElementById('system-device-preview');
    if (!host) return;
    const devices = this.systemDevices || [];
    const active = this.getActiveDevice();
    if (!devices.length || !active) {
      host.innerHTML = '<p class="mission-empty">Device Registry пока пуст.</p>';
      return;
    }
    host.innerHTML = `
      <section class="device-hub">
        <div class="device-list" aria-label="Список устройств">
          ${devices.map((device) => this.renderDeviceCard(device)).join('')}
        </div>
        <div class="device-passport" aria-label="Паспорт устройства">
          ${this.renderDevicePassport(active)}
        </div>
      </section>
    `;
  },

  renderDeviceCard(device) {
    const isActive = device.device_id === this.activeDeviceId;
    return `
      <button type="button" class="device-card ${isActive ? 'active' : ''}" data-device-action="select" data-device-id="${this.escapeHtml(device.device_id)}">
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
        <div><dt>device_id</dt><dd>${this.escapeHtml(device.device_id)}</dd></div>
        <div><dt>тип</dt><dd>${this.escapeHtml(DEVICE_TYPES[device.type] || device.type)}</dd></div>
        <div><dt>подключение</dt><dd>${this.escapeHtml(device.connection_type)}</dd></div>
        <div><dt>статус</dt><dd>${this.escapeHtml(DEVICE_STATUSES[device.status] || device.status)}</dd></div>
        <div><dt>trust</dt><dd>${this.escapeHtml(DEVICE_TRUST_LEVELS[device.trust_level] || device.trust_level)}</dd></div>
        <div><dt>last seen</dt><dd>${this.escapeHtml(device.last_seen ? this.formatTaskTime(device.last_seen) : 'не проверялось')}</dd></div>
        <div><dt>fingerprint</dt><dd>${this.escapeHtml(device.fingerprint || 'не задано')}</dd></div>
        <div><dt>owner confirmed</dt><dd>${device.owner_confirmed ? 'да' : 'нет'}</dd></div>
      </dl>
      <div class="device-actions">
        <button type="button" data-device-action="check" data-device-id="${this.escapeHtml(device.device_id)}">Проверить</button>
        <button type="button" data-device-action="trust" data-device-id="${this.escapeHtml(device.device_id)}">Доверять</button>
        <button type="button" data-device-action="restrict" data-device-id="${this.escapeHtml(device.device_id)}">Ограничить</button>
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
        <span>${this.escapeHtml(DEVICE_RISK_LEVELS[capability.risk_level] || capability.risk_level)}${capability.requires_approval ? ' · approval' : ''}</span>
        ${capability.requires_approval ? `<button type="button" data-device-action="request_capability_approval" data-device-id="${this.escapeHtml(device.device_id)}" data-capability-id="${this.escapeHtml(capability.capability_id)}">Запросить</button>` : ''}
      </article>
    `;
  },

  renderSystemVoiceHooks() {
    const host = document.getElementById('system-voice-hooks');
    if (!host) return;
    const voiceTasks = (this.workTasks || []).filter((task) => task.input_source === 'voice' || task.voice_event_type);
    const activeTask = this.getActiveWorkTask();
    const rows = [
      ['Режим', 'push-to-talk', 'фонового прослушивания нет'],
      ['STT', this.workspaceVoiceSupported ? 'доступен' : 'manual fallback', 'Browser Web Speech API, без AI API'],
      ['Intent Preview', 'включён', 'команда сначала показывается владельцу'],
      ['Dangerous voice actions', 'blocked', 'опасные слова не выполняются автоматически'],
      ['Voice events', `${voiceTasks.length} задач`, activeTask ? `активная задача: ${activeTask.task_id}` : 'активная задача не выбрана']
    ];
    host.innerHTML = `
      <div class="voice-system-grid">
        ${rows.map(([name, status, note]) => this.renderSystemRow(name, status, note)).join('')}
      </div>
    `;
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
    const toggle = document.getElementById('workspace-voice-toggle');
    if (!panel) return;
    panel.hidden = !this.workspaceVoiceOpen;
    if (toggle) {
      toggle.setAttribute('aria-pressed', this.workspaceVoiceState === 'listening' ? 'true' : 'false');
      toggle.textContent = this.workspaceVoiceState === 'listening' ? 'Слушаю...' : 'Микрофон';
    }
    const state = document.getElementById('workspace-voice-state');
    const support = document.getElementById('workspace-voice-support');
    const transcript = document.getElementById('workspace-voice-transcript');
    const preview = document.getElementById('workspace-voice-preview');
    if (state) state.textContent = VOICE_STATES[this.workspaceVoiceState] || this.workspaceVoiceState || 'готово';
    if (support) support.textContent = this.workspaceVoiceSupported
      ? 'Browser Speech API: доступен, push-to-talk'
      : 'Browser Speech API: недоступен, работает ручной preview';
    if (transcript && transcript.value !== this.workspaceVoiceTranscript) transcript.value = this.workspaceVoiceTranscript || '';
    if (!preview) return;
    const intent = this.workspaceVoicePreview;
    if (!intent) {
      preview.hidden = false;
      preview.innerHTML = `
        <p>Голос не выполняет действия напрямую. Сначала будет preview намерения, риск и подтверждение.</p>
        <div class="voice-actions">
          <button type="button" data-voice-action="preview_manual">Показать preview</button>
          <button type="button" data-voice-action="cancel">Закрыть</button>
        </div>
      `;
      return;
    }
    preview.hidden = false;
    preview.innerHTML = `
      <div class="voice-preview-head">
        <span>Я понял команду так</span>
        <strong>${this.escapeHtml(intent.label)}</strong>
      </div>
      <dl class="voice-preview-grid">
        <div><dt>Действие</dt><dd>${this.escapeHtml(intent.label)}</dd></div>
        <div><dt>Риск</dt><dd>${this.escapeHtml(DEVICE_RISK_LEVELS[intent.risk] || intent.risk)}</dd></div>
        <div><dt>Уверенность</dt><dd>${this.escapeHtml(VOICE_CONFIDENCE_LABELS[intent.confidence] || intent.confidence)}</dd></div>
        <div><dt>Проект</dt><dd>${this.escapeHtml(this.projectName(intent.entities.project_id || 'terminator'))}</dd></div>
        <div><dt>Исполнитель</dt><dd>${this.escapeHtml(intent.entities.executor || 'не задано')}</dd></div>
        <div><dt>Статус</dt><dd>${this.escapeHtml(intent.status)}</dd></div>
      </dl>
      <p>${this.escapeHtml(intent.summary)}</p>
      <div class="voice-actions">
        <button type="button" data-voice-action="execute">${intent.risk === 'dangerous' ? 'Подготовить warning' : 'Выполнить'}</button>
        <button type="button" data-voice-action="edit">Изменить</button>
        <button type="button" data-voice-action="cancel">Отмена</button>
      </div>
    `;
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

  buildVoiceIntentPreview(transcript) {
    const raw = String(transcript || '').trim();
    const normalized = raw.toLowerCase().replace(/\s+/g, ' ');
    if (!raw) {
      return {
        transcript: '',
        normalized_text: '',
        intent: 'unknown',
        label: VOICE_INTENT_LABELS.unknown,
        entities: {},
        confidence: 'low',
        risk: 'review',
        status: 'нужно больше данных',
        summary: 'Команда пустая. Скажите или вставьте текст.'
      };
    }
    if (VOICE_DANGEROUS_PATTERN.test(raw)) {
      return this.voiceIntent(raw, 'dangerous_command', 'high', 'dangerous', {
        command: raw
      }, 'Опасная команда не будет выполнена автоматически. Можно только подготовить предупреждение/approval.');
    }
    if (/(создай|создать|новая|новую).{0,24}задач/i.test(raw)) {
      const request = raw.replace(/^(мина[, ]*)?/i, '').replace(/создай|создать|новая|новую|задачу|задача/gi, '').trim() || raw;
      const preview = this.buildWorkPreview(request, { project_id: 'terminator', mode: 'auto', quality_level: 'auto' });
      return this.voiceIntent(raw, 'create_task', 'high', 'safe', {
        project_id: preview.project_id,
        mode: preview.mode,
        quality_level: preview.quality_level,
        task_text: request
      }, `Будет создан preview задачи: ${preview.title}`);
    }
    if (/(добавь|добавить|запиши|записать).{0,28}(уточнен|уточнён|замет|комментар)|^(уточнение|заметка)/i.test(raw)) {
      const note = raw.replace(/^(мина[, ]*)?/i, '').replace(/добавь|добавить|запиши|записать|уточнение|уточнённое|уточненное|заметку|заметка|комментарий/gi, '').replace(/^[-—: ]+/, '').trim() || raw;
      return this.voiceIntent(raw, 'add_note', 'high', 'safe', { note }, 'Уточнение будет добавлено в историю текущей задачи.');
    }
    if (/(центр управления|mission|задачи ждут|риски|ожидают отчёт|ожидают отчет)/i.test(raw)) {
      return this.voiceIntent(raw, 'open_mission_control', 'high', 'safe', {}, 'Будет открыт Центр управления.');
    }
    if (/(система|устройства|диагност|статус системы)/i.test(raw)) {
      return this.voiceIntent(raw, 'open_system', 'high', 'safe', {}, 'Будет открыт экран Система.');
    }
    if (/(рабочее|рабочее окно|workspace)/i.test(raw)) {
      return this.voiceIntent(raw, 'open_workspace', 'high', 'safe', {}, 'Будет открыт экран Рабочее.');
    }
    if (/(сформируй|создай|сделай).{0,24}(пакет|context pack|контекст).{0,24}(codex|кодекс)?/i.test(raw)) {
      return this.voiceIntent(raw, 'create_context_pack', 'medium', 'review', { executor: 'Codex' }, 'Будет подготовлен Context Pack, без автоматической отправки.');
    }
    if (/(отметь|пометь).{0,30}(отправил|отправлено|отправлен).{0,20}(codex|кодекс)?/i.test(raw)) {
      return this.voiceIntent(raw, 'mark_sent_to_executor', 'medium', 'review', { executor: 'Codex' }, 'Пакет будет отмечен как отправленный исполнителю.');
    }
    if (/(провер|verifier|верифик)/i.test(raw)) {
      return this.voiceIntent(raw, 'open_verifier', 'medium', 'review', {}, 'Будет открыта проверка результата.');
    }
    if (/(памят|memory|сохрани вывод|что сохранить)/i.test(raw)) {
      return this.voiceIntent(raw, 'show_memory_preview', 'medium', 'review', {}, 'Будет открыт Memory Preview.');
    }
    return this.voiceIntent(raw, 'unknown', 'low', 'review', {}, 'Я не уверена. Проверьте команду вручную.');
  },

  voiceIntent(transcript, intent, confidence, risk, entities, summary) {
    return {
      transcript,
      normalized_text: transcript.toLowerCase().replace(/\s+/g, ' '),
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
      } else {
        this.toast('Опасная команда заблокирована');
      }
      this.renderVoicePanel();
      return;
    }
    if (preview.intent === 'unknown') {
      this.workspaceVoiceState = 'failed';
      this.toast('Команда не распознана');
      this.renderVoicePanel();
      return;
    }
    if (preview.intent === 'open_workspace') this.go('work');
    if (preview.intent === 'open_mission_control') this.go('mission');
    if (preview.intent === 'open_system') this.go('system');
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
      this.workPreview.original_transcript = preview.transcript;
      this.renderWorkPreview(false);
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
    if (['create_context_pack', 'mark_sent_to_executor', 'open_verifier', 'show_memory_preview'].includes(preview.intent) && task) {
      this.recordVoiceEvent('voice_action_completed', preview.transcript, preview);
    }
    this.saveWorkTasks();
    this.renderWorkTaskCard();
    this.renderMissionControl();
    this.renderSystemStatus();
    this.renderVoicePanel();
    this.toast('Voice action обработан безопасно');
  },

  recordVoiceEvent(type, transcript, preview) {
    const task = this.getActiveWorkTask();
    if (!task) return null;
    task.voice_event_type = type;
    task.intent_preview = preview || task.intent_preview;
    return this.recordTaskEvent(task, 'voice_command', `${VOICE_INTENT_LABELS[preview?.intent] || 'Голос'}: ${this.safeVoiceTranscript(transcript)}`, {
      actor: 'Mina Voice',
      source: 'voice',
      risk_level: preview?.risk || 'safe'
    });
  },

  safeVoiceTranscript(text) {
    const source = String(text || '');
    const scan = this.scanPrivacyText(source);
    if (scan.findings.length) return '[REDACTED: possible secret in voice transcript]';
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
      resolved_at: approval.resolved_at || ''
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
        last_seen: now,
        notes: 'Главная рабочая машина и будущий runtime/storage узел.',
        capabilities: [
          ['cap_pc_status', 'read_status', 'Показать состояние runtime', 'safe', false],
          ['cap_pc_storage', 'storage_policy', 'Показать storage policy', 'safe', false],
          ['cap_pc_diagnostics', 'safe_diagnostics', 'Безопасные read-only диагностики', 'review', true]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_local_agent',
        name: 'Mina Local Agent',
        type: 'local_agent',
        connection_type: 'bridge_polling',
        trust_level: 'system_device',
        status: 'unknown',
        risk_level: 'review',
        owner_confirmed: true,
        notes: 'Runtime-исполнитель. В этом слое команды агенту не отправляются.',
        capabilities: [
          ['cap_agent_health', 'read_status', 'Показать health/status позже', 'safe', false],
          ['cap_agent_file_meta', 'file_metadata', 'Файловая metadata через Local Agent позже', 'review', true]
        ]
      }),
      this.normalizeDevice({
        device_id: 'device_owner_phone',
        name: 'Телефон владельца',
        type: 'android_phone',
        connection_type: 'adb_usb',
        trust_level: 'owner_device',
        status: 'offline',
        risk_level: 'review',
        owner_confirmed: false,
        notes: 'Будущий первый реальный adapter: ADB USB для mobile QA.',
        capabilities: [
          ['cap_phone_status', 'read_status', 'Определить подключение телефона позже', 'safe', false],
          ['cap_phone_open_url', 'open_url', 'Открыть WebApp на телефоне после approval', 'review', true],
          ['cap_phone_screenshot', 'screenshot', 'Скриншот для evidence после approval', 'approval_required', true]
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
      capabilities: [],
      events: [],
      last_seen: device.last_seen || '',
      first_seen: device.first_seen || now,
      owner_confirmed: Boolean(device.owner_confirmed),
      notes: device.notes || 'не задано',
      linked_project_ids: Array.isArray(device.linked_project_ids) ? device.linked_project_ids : [],
      linked_task_ids: Array.isArray(device.linked_task_ids) ? device.linked_task_ids : [],
      created_at: device.created_at || now,
      updated_at: device.updated_at || now
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
      last_checked: capability.last_checked || ''
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
      linked_approval_id: event.linked_approval_id || ''
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
      intent_preview: {
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
      this.recordTaskEvent(task, 'voice_command', `Задача создана из голосового preview: ${this.safeVoiceTranscript(task.original_transcript)}`, {
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
    if (goal) goal.textContent = task.goal || task.user_request || 'не задано';
    if (nextStep) nextStep.textContent = task.next_step || 'не задано';
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
      'C:\\Users\\glebi\\Desktop\\терминатор - DeepSeek_files\\council\\local-agent',
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
