const COMMAND_QUEUE_NAME = "personal-actions";
const TASK_STORE_NAME = "terminator-taskstore";
const COMMAND_PREFIX = "cmd:";
const CLIENT_COMMAND_PREFIX = "client_cmd:";
const OWNER_SESSION_PREFIX = "owner_session:";
const QUEUE_KEY = "queue:personal";
const TASK_PREFIX = "task:";
const TASK_EVENT_PREFIX = "task_event:";
const TASK_INDEX_KEY = "task:index";
const DEFAULT_OWNER_SESSION_TTL_SECONDS = 15 * 60;
const DEFAULT_COMMAND_QUEUE_TTL_SECONDS = 2 * 60;
const DEFAULT_COMMAND_LEASE_TTL_SECONDS = 3 * 60;
const TASK_STORE_SCHEMA_VERSION = 1;
const TASK_STORE_MAX_STRING_LENGTH = 30000;
const TASK_STORE_MAX_ARRAY_LENGTH = 250;
const TASK_STORE_MAX_DEPTH = 6;
const RAW_FILE_DATA_PATTERN = /(?:data:[^"'\\\s]+;base64,|;base64,)/i;
const WEBAPP_UPSTREAM_BASE = "https://vitaliykonstantinovich.github.io/terminator-webapp";

const ALL_STATUSES = new Set([
  "queued",
  "picked_up",
  "running",
  "completed",
  "failed",
  "manual_required",
]);

const FINAL_STATUSES = new Set(["completed", "failed", "manual_required"]);
const PERSONAL_ACTIONS = new Set(["open_brain", "verify_brain", "ensure_anydesk", "minimize_brain", "done"]);
const PERSONAL_BRAINS = new Set(["chatgpt", "gemini", "deepseek", "qwen"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("origin") || "";
    const requestId = getRequestId(request);
    const startedAt = Date.now();

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: responseHeaders(origin, env, requestId) });
    }

    try {
      logBridgeEvent("request_start", {
        request_id: requestId,
        method: request.method,
        path: url.pathname,
        agent_id: request.headers.get("x-agent-id") || url.searchParams.get("agent_id") || null,
      });

      if (url.pathname === "/" && request.method === "GET") {
        return Response.redirect(`${url.origin}/app/`, 302);
      }

      if ((url.pathname === "/app" || url.pathname.startsWith("/app/")) && (request.method === "GET" || request.method === "HEAD")) {
        return await serveWebAppAsset(request, env, requestId, startedAt);
      }

      if (url.pathname === "/bridge-frame" && request.method === "GET") {
        return bridgeFrameResponse(env);
      }

      if (url.pathname === "/health" && request.method === "GET") {
        await getCommandQueue(env);
        const taskStore = await getTaskStoreHealth(env);
        return tracedJson({
          ok: true,
          service: "mina-direct-bridge",
          storage: "durable_object",
          command_queue: "ready",
          task_store: taskStore.status,
          task_store_schema: taskStore.schema_version || null,
        }, 200, origin, env, requestId, startedAt);
      }

      if (url.pathname === "/owner/session" && request.method === "POST") {
        await assertAllowedOrigin(origin, env, request);
        return await createOwnerSession(request, env, origin, requestId, startedAt);
      }

      if (url.pathname === "/commands" && request.method === "POST") {
        await assertAllowedOrigin(origin, env, request);
        await assertOwnerSessionAuthorized(request, env);
        return await createCommand(request, env, origin, requestId, startedAt);
      }

      if (url.pathname === "/tasks" && request.method === "GET") {
        await assertAllowedOrigin(origin, env, request);
        await assertOwnerSessionAuthorized(request, env);
        return await listTasks(request, env, origin, requestId, startedAt);
      }

      if (url.pathname === "/tasks" && request.method === "POST") {
        await assertAllowedOrigin(origin, env, request);
        await assertOwnerSessionAuthorized(request, env);
        return await upsertTask(request, env, origin, requestId, startedAt);
      }

      const taskMatch = url.pathname.match(/^\/tasks\/([^/]+)$/);
      if (taskMatch && request.method === "GET") {
        await assertAllowedOrigin(origin, env, request);
        await assertOwnerSessionAuthorized(request, env);
        return await getTask(taskMatch[1], env, origin, requestId, startedAt);
      }

      if (taskMatch && (request.method === "PATCH" || request.method === "PUT")) {
        await assertAllowedOrigin(origin, env, request);
        await assertOwnerSessionAuthorized(request, env);
        return await upsertTask(request, env, origin, requestId, startedAt, taskMatch[1]);
      }

      const taskEventsMatch = url.pathname.match(/^\/tasks\/([^/]+)\/events$/);
      if (taskEventsMatch && request.method === "GET") {
        await assertAllowedOrigin(origin, env, request);
        await assertOwnerSessionAuthorized(request, env);
        return await listTaskEvents(taskEventsMatch[1], env, origin, requestId, startedAt);
      }

      if (taskEventsMatch && request.method === "POST") {
        await assertAllowedOrigin(origin, env, request);
        await assertOwnerSessionAuthorized(request, env);
        return await appendTaskEvent(taskEventsMatch[1], request, env, origin, requestId, startedAt);
      }

      const taskChildMatch = url.pathname.match(/^\/tasks\/([^/]+)\/(artifacts|files|approvals|memory)$/);
      if (taskChildMatch && request.method === "POST") {
        await assertAllowedOrigin(origin, env, request);
        await assertOwnerSessionAuthorized(request, env);
        return await appendTaskChild(taskChildMatch[1], taskChildMatch[2], request, env, origin, requestId, startedAt);
      }

      const statusMatch = url.pathname.match(/^\/commands\/([^/]+)\/status$/);
      if (statusMatch && request.method === "GET") {
        await assertAllowedOrigin(origin, env, request);
        await assertOwnerSessionAuthorized(request, env);
        return await getCommandStatus(statusMatch[1], env, origin, requestId, startedAt);
      }

      if (url.pathname === "/agent/commands/next" && request.method === "GET") {
        await assertAgentAuthorized(request, env);
        return await getNextCommand(request, env, origin, requestId, startedAt);
      }

      if (url.pathname === "/agent/diagnostics" && request.method === "GET") {
        await assertAgentAuthorized(request, env);
        return await getAgentDiagnostics(request, env, origin, requestId, startedAt);
      }

      const agentStatusMatch = url.pathname.match(/^\/agent\/commands\/([^/]+)\/status$/);
      if (agentStatusMatch && request.method === "POST") {
        await assertAgentAuthorized(request, env);
        return await updateCommandStatus(agentStatusMatch[1], request, env, origin, requestId, startedAt);
      }

      const agentTaskStatusMatch = url.pathname.match(/^\/agent\/tasks\/([^/]+)\/status$/);
      if (agentTaskStatusMatch && request.method === "POST") {
        await assertAgentAuthorized(request, env);
        return await updateAgentTaskStatus(agentTaskStatusMatch[1], request, env, origin, requestId, startedAt);
      }

      return tracedJson({ ok: false, error: "NOT_FOUND" }, 404, origin, env, requestId, startedAt);
    } catch (error) {
      if (error instanceof BridgeError) {
        return tracedJson({ ok: false, error: error.code, message: error.message }, error.status, origin, env, requestId, startedAt, error);
      }

      console.error("[bridge] unhandled error", error);
      return tracedJson({ ok: false, error: "BRIDGE_ERROR" }, 500, origin, env, requestId, startedAt, error);
    }
  },
};

export class CommandQueue {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);

    try {
      if (url.pathname === "/internal/owner/session" && request.method === "POST") {
        return queueJson(await this.createOwnerSession(await readJson(request)));
      }

      const sessionMatch = url.pathname.match(/^\/internal\/owner\/session\/(.+)$/);
      if (sessionMatch && request.method === "GET") {
        return queueJson(await this.getOwnerSession(decodeURIComponent(sessionMatch[1])));
      }

      if (url.pathname === "/internal/commands" && request.method === "POST") {
        return queueJson(await this.createCommand(await readJson(request)));
      }

      const statusMatch = url.pathname.match(/^\/internal\/commands\/([^/]+)\/status$/);
      if (statusMatch && request.method === "GET") {
        return queueJson(await this.getCommandStatus(decodeURIComponent(statusMatch[1])));
      }

      if (url.pathname === "/internal/agent/commands/next" && request.method === "GET") {
        return queueJson(await this.getNextCommand(url.searchParams.get("agent_id")));
      }

      if (url.pathname === "/internal/agent/diagnostics" && request.method === "GET") {
        return queueJson(await this.getDiagnostics(url.searchParams.get("agent_id")));
      }

      const agentStatusMatch = url.pathname.match(/^\/internal\/agent\/commands\/([^/]+)\/status$/);
      if (agentStatusMatch && request.method === "POST") {
        return queueJson(await this.updateCommandStatus(decodeURIComponent(agentStatusMatch[1]), await readJson(request)));
      }

      return queueJson({ ok: false, error: "QUEUE_NOT_FOUND" }, 404);
    } catch (error) {
      if (error instanceof BridgeError) {
        return queueJson({ ok: false, error: error.code, message: error.message }, error.status);
      }

      console.error("[CommandQueue] unhandled error", error);
      return queueJson({ ok: false, error: "QUEUE_ERROR" }, 500);
    }
  }

  async createOwnerSession({ ttlSeconds }) {
    const ttl = normalizeSessionTtl(ttlSeconds);
    const token = `${crypto.randomUUID()}.${crypto.randomUUID()}`;
    const now = Date.now();
    const session = {
      token,
      created_at: new Date(now).toISOString(),
      expires_at: new Date(now + ttl * 1000).toISOString(),
    };

    await this.state.storage.put(ownerSessionKey(token), session);

    return {
      ok: true,
      session_token: token,
      expires_in: ttl,
      expires_at: session.expires_at,
    };
  }

  async getOwnerSession(token) {
    const session = await this.state.storage.get(ownerSessionKey(token));
    if (!session || Date.parse(session.expires_at) <= Date.now()) {
      if (session) await this.state.storage.delete(ownerSessionKey(token));
      throw new BridgeError(401, "OWNER_SESSION_EXPIRED", "Owner session is missing or expired.");
    }

    return { ok: true, session };
  }

  async createCommand({ payload, validation }) {
    const clientCommandId = normalizeClientCommandId(payload?.client_command_id || payload?.clientCommandId);
    if (clientCommandId) {
      const existingCommandId = await this.state.storage.get(clientCommandKey(clientCommandId));
      if (existingCommandId) {
        const existingCommand = await this.readCommand(existingCommandId, false);
        if (existingCommand) {
          return commandCreateResponse(await this.finalizeIfStale(existingCommand), true);
        }

        await this.state.storage.delete(clientCommandKey(clientCommandId));
      }
    }

    const now = new Date().toISOString();
    const action = validation?.action || String(payload?.action || "").trim();
    const brain = validation?.brain || String(payload?.brain || "").trim().toLowerCase();
    const command = {
      id: crypto.randomUUID(),
      client_command_id: clientCommandId,
      payload,
      action,
      brain,
      status: validation?.ok === false ? "failed" : "queued",
      created_at: now,
      updated_at: now,
      picked_at: null,
      running_at: null,
      completed_at: validation?.ok === false ? now : null,
      picked_by: null,
      agent_id: null,
      queued_expires_at: validation?.ok === false
        ? null
        : new Date(Date.now() + getCommandQueueTtl(this.env) * 1000).toISOString(),
      lease_expires_at: null,
      result: null,
      error: validation?.ok === false
        ? { code: "UNKNOWN_COMMAND", detail: validation.error || "Unknown command" }
        : null,
      events: [],
    };
    command.events.push({ status: command.status, at: now });

    await this.state.storage.put(commandKey(command.id), command);
    if (clientCommandId) {
      await this.state.storage.put(clientCommandKey(clientCommandId), command.id);
    }

    if (command.status === "queued") {
      const queue = await this.readQueue();
      queue.push(command.id);
      await this.writeQueue(queue);
    }

    return commandCreateResponse(command, false);
  }

  async getCommandStatus(commandId) {
    const command = await this.finalizeIfStale(await this.readCommand(commandId));
    return commandStatusResponse(command);
  }

  async getNextCommand(agentId) {
    await this.sweepStaleCommands();

    const queue = await this.readQueue();
    const remaining = [];
    const normalizedAgentId = normalizeAgentId(agentId);

    for (let index = 0; index < queue.length; index += 1) {
      const commandId = queue[index];
      let command = await this.readCommand(commandId, false);
      if (!command) continue;
      command = await this.finalizeIfStale(command);
      if (FINAL_STATUSES.has(command.status)) continue;
      if (command.status !== "queued") continue;

      const nowMs = Date.now();
      const now = new Date(nowMs).toISOString();
      command.status = "picked_up";
      command.updated_at = now;
      command.picked_at = now;
      command.picked_by = normalizedAgentId;
      command.agent_id = normalizedAgentId;
      command.lease_expires_at = new Date(nowMs + getCommandLeaseTtl(this.env) * 1000).toISOString();
      command.events.push({
        status: "picked_up",
        at: now,
        agent_id: normalizedAgentId,
        lease_expires_at: command.lease_expires_at,
        source: "agent_next",
      });

      await this.state.storage.put(commandKey(command.id), command);
      await this.writeQueue([...remaining, ...queue.slice(index + 1)]);

      return {
        ok: true,
        command: {
          command_id: command.id,
          payload: command.payload,
          action: command.action,
          brain: command.brain,
          status: command.status,
          created_at: command.created_at,
          picked_at: command.picked_at,
          picked_by: command.picked_by,
          lease_expires_at: command.lease_expires_at,
        },
      };
    }

    await this.writeQueue(remaining);
    return { ok: true, command: null };
  }

  async getDiagnostics(agentId) {
    await this.sweepStaleCommands();

    const queue = await this.readQueue();
    const commands = await this.state.storage.list({ prefix: COMMAND_PREFIX });
    const byStatus = {};
    let activeForAgent = 0;
    const normalizedAgentId = normalizeAgentId(agentId);
    const now = Date.now();
    let nextQueuedCreatedAt = null;
    let nearestLeaseExpiresAt = null;

    for (const command of commands.values()) {
      const status = command.status || "unknown";
      byStatus[status] = (byStatus[status] || 0) + 1;
      if ((command.agent_id === normalizedAgentId || command.picked_by === normalizedAgentId) && !FINAL_STATUSES.has(status)) {
        activeForAgent += 1;
      }
      if (status === "queued" && (!nextQueuedCreatedAt || String(command.created_at || "") < nextQueuedCreatedAt)) {
        nextQueuedCreatedAt = command.created_at || null;
      }
      if ((status === "picked_up" || status === "running") && command.lease_expires_at) {
        const leaseMs = Date.parse(command.lease_expires_at);
        if (Number.isFinite(leaseMs) && leaseMs > now && (!nearestLeaseExpiresAt || leaseMs < Date.parse(nearestLeaseExpiresAt))) {
          nearestLeaseExpiresAt = command.lease_expires_at;
        }
      }
    }

    return {
      ok: true,
      service: "mina-direct-bridge",
      storage: "durable_object",
      agent_id: normalizedAgentId,
      queue_depth: queue.length,
      command_count: commands.size,
      by_status: byStatus,
      active_for_agent: activeForAgent,
      next_queued_created_at: nextQueuedCreatedAt,
      nearest_lease_expires_at: nearestLeaseExpiresAt,
      checked_at: new Date(now).toISOString(),
    };
  }

  async updateCommandStatus(commandId, body) {
    const status = String(body?.status || "").trim();
    if (!ALL_STATUSES.has(status) || status === "queued") {
      throw new BridgeError(400, "INVALID_STATUS", "Unsupported command status.");
    }

    const command = await this.finalizeIfStale(await this.readCommand(commandId));
    if (FINAL_STATUSES.has(command.status)) {
      return commandStatusResponse(command);
    }

    const nowMs = Date.now();
    const now = new Date(nowMs).toISOString();
    const agentId = normalizeAgentId(body?.agent_id || body?.picked_by);
    command.status = status;
    command.updated_at = now;
    if (agentId) {
      command.agent_id = agentId;
      command.picked_by = command.picked_by || agentId;
    }
    if (status === "picked_up") {
      command.picked_at = command.picked_at || now;
      command.picked_by = agentId || command.picked_by || null;
      command.lease_expires_at = new Date(nowMs + getCommandLeaseTtl(this.env) * 1000).toISOString();
    }
    if (status === "running") {
      command.running_at = command.running_at || now;
      command.lease_expires_at = new Date(nowMs + getCommandLeaseTtl(this.env) * 1000).toISOString();
    }
    if (FINAL_STATUSES.has(status)) {
      command.completed_at = now;
      command.lease_expires_at = null;
    }
    command.result = body?.result ?? command.result;
    command.error = body?.error ?? null;
    command.events.push({
      status,
      at: now,
      agent_id: agentId || command.agent_id || null,
      lease_expires_at: command.lease_expires_at,
    });

    await this.state.storage.put(commandKey(command.id), command);

    return commandStatusResponse(command);
  }

  async sweepStaleCommands() {
    const commands = await this.state.storage.list({ prefix: COMMAND_PREFIX });
    for (const command of commands.values()) {
      await this.finalizeIfStale(command);
    }
  }

  async finalizeIfStale(command) {
    if (!command || FINAL_STATUSES.has(command.status)) return command;
    if (command.status === "queued") {
      const queuedExpiresAt = getQueuedExpiresAt(command, getCommandQueueTtl(this.env));
      if (!queuedExpiresAt || queuedExpiresAt > Date.now()) return command;
      return await this.finalizeStaleCommand(command, "queued", queuedExpiresAt);
    }

    if (command.status !== "picked_up" && command.status !== "running") return command;

    const expiresAt = getLeaseExpiresAt(command, getCommandLeaseTtl(this.env));
    if (!expiresAt || expiresAt > Date.now()) return command;

    return await this.finalizeStaleCommand(command, command.status, expiresAt);
  }

  async finalizeStaleCommand(command, previousStatus, expiresAt) {
    const now = new Date().toISOString();
    command.status = "failed";
    command.updated_at = now;
    command.completed_at = now;
    command.lease_expires_at = null;
    command.result = null;
    command.error = {
      code: "STALE_COMMAND_TIMEOUT",
      detail: {
        previous_status: previousStatus,
        action: command.action || command.payload?.action || null,
        brain: command.brain || command.payload?.brain || null,
        picked_by: command.picked_by || command.agent_id || null,
        picked_at: command.picked_at || null,
        running_at: command.running_at || null,
        queued_expires_at: command.queued_expires_at || null,
        lease_expires_at: command.lease_expires_at || null,
        expired_at: new Date(expiresAt).toISOString(),
      },
    };
    command.events.push({
      status: "failed",
      at: now,
      reason: "STALE_COMMAND_TIMEOUT",
      previous_status: previousStatus,
    });

    await this.state.storage.put(commandKey(command.id), command);
    return command;
  }

  async readCommand(commandId, required = true) {
    const command = await this.state.storage.get(commandKey(commandId));
    if (!command && required) {
      throw new BridgeError(404, "COMMAND_NOT_FOUND", "Command not found.");
    }
    return command || null;
  }

  async readQueue() {
    const queue = await this.state.storage.get(QUEUE_KEY);
    return Array.isArray(queue) ? queue : [];
  }

  async writeQueue(queue) {
    await this.state.storage.put(QUEUE_KEY, queue.filter(Boolean));
  }
}

export class TaskStore {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const url = new URL(request.url);

    try {
      if (url.pathname === "/internal/diagnostics" && request.method === "GET") {
        return queueJson(await this.getDiagnostics());
      }

      if (url.pathname === "/internal/tasks" && request.method === "GET") {
        return queueJson(await this.listTasks(url.searchParams));
      }

      if (url.pathname === "/internal/tasks" && request.method === "POST") {
        return queueJson(await this.upsertTask(await readJson(request)));
      }

      const taskMatch = url.pathname.match(/^\/internal\/tasks\/([^/]+)$/);
      if (taskMatch && request.method === "GET") {
        return queueJson(await this.getTask(decodeURIComponent(taskMatch[1])));
      }

      if (taskMatch && (request.method === "PATCH" || request.method === "PUT")) {
        return queueJson(await this.upsertTask(await readJson(request), decodeURIComponent(taskMatch[1])));
      }

      const eventsMatch = url.pathname.match(/^\/internal\/tasks\/([^/]+)\/events$/);
      if (eventsMatch && request.method === "GET") {
        return queueJson(await this.listEvents(decodeURIComponent(eventsMatch[1])));
      }

      if (eventsMatch && request.method === "POST") {
        return queueJson(await this.appendEvent(decodeURIComponent(eventsMatch[1]), await readJson(request)));
      }

      const childMatch = url.pathname.match(/^\/internal\/tasks\/([^/]+)\/(artifacts|files|approvals|memory)$/);
      if (childMatch && request.method === "POST") {
        return queueJson(await this.appendChild(decodeURIComponent(childMatch[1]), childMatch[2], await readJson(request)));
      }

      const agentStatusMatch = url.pathname.match(/^\/internal\/agent\/tasks\/([^/]+)\/status$/);
      if (agentStatusMatch && request.method === "POST") {
        return queueJson(await this.updateAgentTaskStatus(decodeURIComponent(agentStatusMatch[1]), await readJson(request)));
      }

      return queueJson({ ok: false, error: "TASK_STORE_NOT_FOUND" }, 404);
    } catch (error) {
      if (error instanceof BridgeError) {
        return queueJson({ ok: false, error: error.code, message: error.message }, error.status);
      }

      console.error("[TaskStore] unhandled error", error);
      return queueJson({ ok: false, error: "TASK_STORE_ERROR" }, 500);
    }
  }

  async getDiagnostics() {
    const index = await this.readIndex();
    return {
      ok: true,
      service: "mina-task-store",
      storage: "durable_object",
      schema_version: TASK_STORE_SCHEMA_VERSION,
      task_count: index.length,
      updated_at: new Date().toISOString(),
    };
  }

  async listTasks(searchParams) {
    const full = searchParams.get("full") === "1" || searchParams.get("full") === "true";
    const projectId = normalizeProjectId(searchParams.get("project_id"));
    const status = String(searchParams.get("status") || "").trim();
    let index = await this.readIndex();
    if (projectId) index = index.filter((item) => item.project_id === projectId);
    if (status) index = index.filter((item) => item.status === status);
    index.sort((a, b) => String(b.updated_at || "").localeCompare(String(a.updated_at || "")));

    if (!full) {
      return {
        ok: true,
        schema_version: TASK_STORE_SCHEMA_VERSION,
        tasks: index,
      };
    }

    const tasks = [];
    for (const summary of index) {
      const record = await this.readTaskRecord(summary.task_id, false);
      if (record?.task) tasks.push(record.task);
    }

    return {
      ok: true,
      schema_version: TASK_STORE_SCHEMA_VERSION,
      tasks,
    };
  }

  async getTask(taskId) {
    const record = await this.readTaskRecord(taskId);
    return {
      ok: true,
      schema_version: TASK_STORE_SCHEMA_VERSION,
      task: record.task,
      summary: record.summary,
    };
  }

  async upsertTask(body, explicitTaskId = "") {
    const incoming = body?.task && typeof body.task === "object" ? body.task : body;
    const taskId = normalizeTaskId(explicitTaskId || incoming?.task_id);
    if (!taskId) {
      throw new BridgeError(400, "TASK_ID_REQUIRED", "task_id is required.");
    }

    const existing = await this.readTaskRecord(taskId, false);
    const now = new Date().toISOString();
    const sanitized = sanitizeTaskForStore({
      ...(existing?.task || {}),
      ...(incoming || {}),
      task_id: taskId,
    }, now);
    const revision = Math.max(Number(existing?.sync_revision || 0), Number(incoming?.sync_revision || 0)) + 1;
    sanitized.sync_revision = revision;
    sanitized.sync_status = "synced";
    sanitized.server_updated_at = now;
    sanitized.updated_at = latestIsoDate(sanitized.updated_at, incoming?.updated_at, now);

    const summary = buildTaskSummary(sanitized, revision, now);
    const record = {
      task_id: taskId,
      task: sanitized,
      summary,
      sync_revision: revision,
      created_at: existing?.created_at || sanitized.created_at || now,
      updated_at: now,
    };

    await this.state.storage.put(taskKey(taskId), record);
    await this.upsertIndexSummary(summary);

    return {
      ok: true,
      schema_version: TASK_STORE_SCHEMA_VERSION,
      task_id: taskId,
      sync_revision: revision,
      task: sanitized,
      summary,
    };
  }

  async listEvents(taskId) {
    const normalizedTaskId = normalizeTaskId(taskId);
    if (!normalizedTaskId) throw new BridgeError(400, "TASK_ID_REQUIRED", "task_id is required.");
    const events = await this.state.storage.list({ prefix: taskEventPrefix(normalizedTaskId) });
    const values = Array.from(events.values()).sort((a, b) => String(a.created_at || "").localeCompare(String(b.created_at || "")));
    return {
      ok: true,
      task_id: normalizedTaskId,
      events: values,
    };
  }

  async appendEvent(taskId, body) {
    const normalizedTaskId = normalizeTaskId(taskId);
    if (!normalizedTaskId) throw new BridgeError(400, "TASK_ID_REQUIRED", "task_id is required.");
    const record = await this.readTaskRecord(normalizedTaskId);
    const event = sanitizeTaskEvent(body?.event || body, record.task);
    await this.state.storage.put(taskEventKey(normalizedTaskId, event.event_id), event);

    record.task.events = capArray([...(record.task.events || []), event]);
    record.task.updated_at = latestIsoDate(record.task.updated_at, event.created_at, new Date().toISOString());
    return this.upsertTask({ task: record.task }, normalizedTaskId);
  }

  async appendChild(taskId, collection, body) {
    const normalizedTaskId = normalizeTaskId(taskId);
    if (!normalizedTaskId) throw new BridgeError(400, "TASK_ID_REQUIRED", "task_id is required.");
    const record = await this.readTaskRecord(normalizedTaskId);
    const now = new Date().toISOString();
    const item = sanitizeRuntimeValue(body?.item || body, 0);

    if (collection === "memory") {
      record.task.memory_preview = sanitizeRuntimeValue(item, 0);
    } else {
      const key = collection === "approvals" ? "approval_requests" : collection;
      record.task[key] = capArray([...(Array.isArray(record.task[key]) ? record.task[key] : []), item]);
    }

    const event = sanitizeTaskEvent({
      type: `${collection}_updated`,
      text: `Task ${collection} updated.`,
      actor: "task_store",
      source: "bridge",
      created_at: now,
    }, record.task);
    record.task.events = capArray([...(record.task.events || []), event]);
    record.task.updated_at = now;
    await this.state.storage.put(taskEventKey(normalizedTaskId, event.event_id), event);

    return this.upsertTask({ task: record.task }, normalizedTaskId);
  }

  async updateAgentTaskStatus(taskId, body) {
    const normalizedTaskId = normalizeTaskId(taskId);
    if (!normalizedTaskId) throw new BridgeError(400, "TASK_ID_REQUIRED", "task_id is required.");
    const record = await this.readTaskRecord(normalizedTaskId);
    const now = new Date().toISOString();
    const status = String(body?.status || "").trim();
    if (status) record.task.status = status;
    record.task.executor_state = {
      ...(record.task.executor_state || {}),
      executor: body?.executor || record.task.executor_state?.executor || record.task.executor || "Local Agent",
      status: body?.executor_status || body?.status || record.task.executor_state?.status || "reported",
      timer_started_at: body?.timer_started_at || record.task.executor_state?.timer_started_at || "",
      timer_stopped_at: body?.timer_stopped_at || record.task.executor_state?.timer_stopped_at || "",
      report_artifact_id: body?.report_artifact_id || record.task.executor_state?.report_artifact_id || "",
      updated_at: now,
    };
    const event = sanitizeTaskEvent({
      type: "agent_status",
      text: body?.note || `Local Agent reported status: ${status || record.task.executor_state.status}.`,
      actor: normalizeAgentId(body?.agent_id || body?.picked_by),
      source: "local_agent",
      risk_level: "safe",
      created_at: now,
    }, record.task);
    record.task.events = capArray([...(record.task.events || []), event]);
    record.task.updated_at = now;
    await this.state.storage.put(taskEventKey(normalizedTaskId, event.event_id), event);

    return this.upsertTask({ task: record.task }, normalizedTaskId);
  }

  async readTaskRecord(taskId, required = true) {
    const normalizedTaskId = normalizeTaskId(taskId);
    const record = normalizedTaskId ? await this.state.storage.get(taskKey(normalizedTaskId)) : null;
    if (!record && required) {
      throw new BridgeError(404, "TASK_NOT_FOUND", "Task not found.");
    }
    return record || null;
  }

  async readIndex() {
    const index = await this.state.storage.get(TASK_INDEX_KEY);
    return Array.isArray(index) ? index.filter((item) => item?.task_id) : [];
  }

  async writeIndex(index) {
    await this.state.storage.put(TASK_INDEX_KEY, capArray(index, 1000));
  }

  async upsertIndexSummary(summary) {
    const index = await this.readIndex();
    const byId = new Map(index.map((item) => [item.task_id, item]));
    byId.set(summary.task_id, summary);
    await this.writeIndex(Array.from(byId.values()).sort((a, b) => String(b.updated_at || "").localeCompare(String(a.updated_at || ""))));
  }
}

async function createOwnerSession(request, env, origin, requestId, startedAt) {
  const expectedHash = getOwnerSecretHash(env);
  const body = await readJson(request);
  const secret = String(body?.secret || body?.pin || body?.passphrase || "");
  const actualHash = await sha256Hex(secret);

  if (!safeEqual(actualHash, expectedHash)) {
    throw new BridgeError(401, "OWNER_AUTH_FAILED", "Owner authorization failed.");
  }

  const session = await queueRequest(env, "/internal/owner/session", {
    method: "POST",
    body: { ttlSeconds: getOwnerSessionTtl(env) },
  });

  return tracedJson(session, 200, origin, env, requestId, startedAt);
}

async function createCommand(request, env, origin, requestId, startedAt) {
  const payload = await readJson(request);
  const validation = validateCommandPayload(payload);
  const result = await queueRequest(env, "/internal/commands", {
    method: "POST",
    body: { payload, validation },
  });

  return tracedJson(result, result.status === "failed" ? 202 : 202, origin, env, requestId, startedAt);
}

async function getCommandStatus(commandId, env, origin, requestId, startedAt) {
  const status = await queueRequest(env, `/internal/commands/${encodeURIComponent(commandId)}/status`);
  return tracedJson(status, 200, origin, env, requestId, startedAt);
}

async function getNextCommand(request, env, origin, requestId, startedAt) {
  const agentId = normalizeAgentId(request.headers.get("x-agent-id") || new URL(request.url).searchParams.get("agent_id"));
  const next = await queueRequest(env, `/internal/agent/commands/next?agent_id=${encodeURIComponent(agentId)}`);
  logBridgeEvent("agent_next_result", {
    request_id: requestId,
    agent_id: agentId,
    has_command: Boolean(next?.command),
    command_id: next?.command?.command_id || null,
    status: next?.command?.status || null,
  });
  return tracedJson(next, 200, origin, env, requestId, startedAt);
}

async function getAgentDiagnostics(request, env, origin, requestId, startedAt) {
  const agentId = normalizeAgentId(request.headers.get("x-agent-id") || new URL(request.url).searchParams.get("agent_id"));
  const diagnostics = await queueRequest(env, `/internal/agent/diagnostics?agent_id=${encodeURIComponent(agentId)}`);
  logBridgeEvent("agent_diagnostics_result", {
    request_id: requestId,
    agent_id: agentId,
    queue_depth: diagnostics.queue_depth,
    by_status: diagnostics.by_status,
  });
  return tracedJson(diagnostics, 200, origin, env, requestId, startedAt);
}

async function updateCommandStatus(commandId, request, env, origin, requestId, startedAt) {
  const body = await readJson(request);
  body.agent_id = body.agent_id || normalizeAgentId(request.headers.get("x-agent-id"));
  const result = await queueRequest(env, `/internal/agent/commands/${encodeURIComponent(commandId)}/status`, {
    method: "POST",
    body,
  });
  logBridgeEvent("agent_status_update", {
    request_id: requestId,
    command_id: commandId,
    agent_id: body.agent_id,
    status: body.status || null,
  });
  return tracedJson(result, 200, origin, env, requestId, startedAt);
}

async function listTasks(request, env, origin, requestId, startedAt) {
  const url = new URL(request.url);
  const query = url.search || "";
  const result = await taskStoreRequest(env, `/internal/tasks${query}`);
  return tracedJson(result, 200, origin, env, requestId, startedAt);
}

async function upsertTask(request, env, origin, requestId, startedAt, taskId = "") {
  const body = await readJson(request);
  const route = taskId ? `/internal/tasks/${encodeURIComponent(taskId)}` : "/internal/tasks";
  const result = await taskStoreRequest(env, route, {
    method: taskId ? "PATCH" : "POST",
    body,
  });
  logBridgeEvent("task_upsert", {
    request_id: requestId,
    task_id: result.task_id || taskId || null,
    sync_revision: result.sync_revision || null,
  });
  return tracedJson(result, 200, origin, env, requestId, startedAt);
}

async function getTask(taskId, env, origin, requestId, startedAt) {
  const result = await taskStoreRequest(env, `/internal/tasks/${encodeURIComponent(taskId)}`);
  return tracedJson(result, 200, origin, env, requestId, startedAt);
}

async function listTaskEvents(taskId, env, origin, requestId, startedAt) {
  const result = await taskStoreRequest(env, `/internal/tasks/${encodeURIComponent(taskId)}/events`);
  return tracedJson(result, 200, origin, env, requestId, startedAt);
}

async function appendTaskEvent(taskId, request, env, origin, requestId, startedAt) {
  const body = await readJson(request);
  const result = await taskStoreRequest(env, `/internal/tasks/${encodeURIComponent(taskId)}/events`, {
    method: "POST",
    body,
  });
  return tracedJson(result, 200, origin, env, requestId, startedAt);
}

async function appendTaskChild(taskId, collection, request, env, origin, requestId, startedAt) {
  const body = await readJson(request);
  const result = await taskStoreRequest(env, `/internal/tasks/${encodeURIComponent(taskId)}/${collection}`, {
    method: "POST",
    body,
  });
  return tracedJson(result, 200, origin, env, requestId, startedAt);
}

async function updateAgentTaskStatus(taskId, request, env, origin, requestId, startedAt) {
  const body = await readJson(request);
  body.agent_id = body.agent_id || normalizeAgentId(request.headers.get("x-agent-id"));
  const result = await taskStoreRequest(env, `/internal/agent/tasks/${encodeURIComponent(taskId)}/status`, {
    method: "POST",
    body,
  });
  logBridgeEvent("agent_task_status_update", {
    request_id: requestId,
    task_id: result.task_id || taskId,
    agent_id: body.agent_id,
    status: body.status || null,
  });
  return tracedJson(result, 200, origin, env, requestId, startedAt);
}

async function queueRequest(env, pathname, options = {}) {
  const queue = await getCommandQueue(env);
  const response = await queue.fetch(new Request(`https://command-queue.local${pathname}`, {
    method: options.method || "GET",
    headers: { "content-type": "application/json" },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  }));

  const data = await response.json();
  if (!response.ok || data?.ok === false) {
    throw new BridgeError(response.status || 500, data?.error || "COMMAND_QUEUE_ERROR", data?.message || "CommandQueue request failed.");
  }
  return data;
}

async function taskStoreRequest(env, pathname, options = {}) {
  const taskStore = await getTaskStore(env);
  const response = await taskStore.fetch(new Request(`https://task-store.local${pathname}`, {
    method: options.method || "GET",
    headers: { "content-type": "application/json" },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  }));

  const data = await response.json();
  if (!response.ok || data?.ok === false) {
    throw new BridgeError(response.status || 500, data?.error || "TASK_STORE_ERROR", data?.message || "TaskStore request failed.");
  }
  return data;
}

async function getCommandQueue(env) {
  const binding = env.COMMAND_QUEUE;
  if (!binding?.idFromName || !binding?.get) {
    throw new BridgeError(503, "COMMAND_QUEUE_NOT_CONFIGURED", "Bind Durable Object namespace as COMMAND_QUEUE.");
  }

  return binding.get(binding.idFromName(COMMAND_QUEUE_NAME));
}

async function getTaskStore(env) {
  const binding = env.TASK_STORE;
  if (!binding?.idFromName || !binding?.get) {
    throw new BridgeError(503, "TASK_STORE_NOT_CONFIGURED", "Bind Durable Object namespace as TASK_STORE.");
  }

  return binding.get(binding.idFromName(TASK_STORE_NAME));
}

async function getTaskStoreHealth(env) {
  try {
    const diagnostics = await taskStoreRequest(env, "/internal/diagnostics");
    return {
      status: "ready",
      schema_version: diagnostics.schema_version || TASK_STORE_SCHEMA_VERSION,
      task_count: diagnostics.task_count || 0,
    };
  } catch (error) {
    return {
      status: error?.code === "TASK_STORE_NOT_CONFIGURED" ? "not_configured" : "degraded",
      schema_version: null,
      task_count: null,
    };
  }
}

function commandKey(commandId) {
  return `${COMMAND_PREFIX}${commandId}`;
}

function taskKey(taskId) {
  return `${TASK_PREFIX}${normalizeTaskId(taskId)}`;
}

function taskEventPrefix(taskId) {
  return `${TASK_EVENT_PREFIX}${normalizeTaskId(taskId)}:`;
}

function taskEventKey(taskId, eventId) {
  return `${taskEventPrefix(taskId)}${normalizeTaskId(eventId) || crypto.randomUUID()}`;
}

function clientCommandKey(clientCommandId) {
  return `${CLIENT_COMMAND_PREFIX}${clientCommandId}`;
}

function ownerSessionKey(token) {
  return `${OWNER_SESSION_PREFIX}${token}`;
}

function normalizeTaskId(value) {
  const taskId = String(value || "").trim();
  if (!taskId) return "";
  return taskId.replace(/[^a-zA-Z0-9._:-]/g, "").slice(0, 120);
}

function normalizeProjectId(value) {
  const projectId = String(value || "").trim();
  return projectId ? projectId.replace(/[^a-zA-Z0-9._:-]/g, "").slice(0, 120) : "";
}

function sanitizeTaskForStore(task, now) {
  const sanitized = sanitizeRuntimeValue(task, 0);
  const taskId = normalizeTaskId(sanitized.task_id);
  if (!taskId) throw new BridgeError(400, "TASK_ID_REQUIRED", "task_id is required.");

  sanitized.task_id = taskId;
  sanitized.project_id = normalizeProjectId(sanitized.project_id) || "terminator";
  sanitized.title = limitString(sanitized.title || sanitized.goal || sanitized.user_request || taskId, 240);
  sanitized.goal = limitString(sanitized.goal || sanitized.user_request || sanitized.title || "", 2000);
  sanitized.user_request = limitString(sanitized.user_request || sanitized.goal || sanitized.title || "", 4000);
  sanitized.status = limitString(sanitized.status || "created", 80);
  sanitized.mode = limitString(sanitized.mode || "auto", 80);
  sanitized.quality_level = limitString(sanitized.quality_level || "standard", 80);
  sanitized.executor = limitString(sanitized.executor || sanitized.executor_state?.executor || "не назначен", 120);
  sanitized.created_at = validIsoDate(sanitized.created_at) || now;
  sanitized.updated_at = validIsoDate(sanitized.updated_at) || now;
  sanitized.messages = capArray(Array.isArray(sanitized.messages) ? sanitized.messages : []);
  sanitized.events = capArray(Array.isArray(sanitized.events) ? sanitized.events : []);
  sanitized.files = sanitizeFilesMetadata(Array.isArray(sanitized.files) ? sanitized.files : [], taskId, sanitized.project_id);
  sanitized.artifacts = capArray(Array.isArray(sanitized.artifacts) ? sanitized.artifacts : []);
  sanitized.approval_requests = capArray(Array.isArray(sanitized.approval_requests) ? sanitized.approval_requests : []);
  sanitized.audit_log = capArray(Array.isArray(sanitized.audit_log) ? sanitized.audit_log : []);
  sanitized.raw_file_saved = false;
  sanitized.task_store_schema = TASK_STORE_SCHEMA_VERSION;
  return sanitized;
}

function sanitizeFilesMetadata(files, taskId, projectId) {
  return capArray(files).map((file) => {
    const sanitized = sanitizeRuntimeValue(file, 0);
    return {
      ...sanitized,
      task_id: taskId,
      project_id: projectId,
      raw_file_saved: false,
      object_url: "",
      data_url: "",
      base64: "",
    };
  });
}

function sanitizeTaskEvent(event, task) {
  const now = new Date().toISOString();
  const sanitized = sanitizeRuntimeValue(event, 0);
  return {
    event_id: normalizeTaskId(sanitized.event_id) || crypto.randomUUID(),
    task_id: normalizeTaskId(sanitized.task_id || task?.task_id),
    project_id: normalizeProjectId(sanitized.project_id || task?.project_id),
    type: limitString(sanitized.type || "system_event", 100),
    text: limitString(sanitized.text || "", 4000),
    actor: limitString(sanitized.actor || "workspace", 100),
    source: limitString(sanitized.source || "bridge", 100),
    target_id: limitString(sanitized.target_id || "", 160),
    linked_artifact_id: limitString(sanitized.linked_artifact_id || "", 160),
    linked_file_id: limitString(sanitized.linked_file_id || "", 160),
    linked_approval_id: limitString(sanitized.linked_approval_id || "", 160),
    risk_level: limitString(sanitized.risk_level || "safe", 80),
    created_at: validIsoDate(sanitized.created_at) || now,
  };
}

function sanitizeRuntimeValue(value, depth) {
  if (depth > TASK_STORE_MAX_DEPTH) return "[MAX_DEPTH]";
  if (value === null || value === undefined) return value;
  if (typeof value === "string") return sanitizeRuntimeString(value);
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "boolean") return value;
  if (Array.isArray(value)) return capArray(value).map((item) => sanitizeRuntimeValue(item, depth + 1));
  if (typeof value !== "object") return null;

  const result = {};
  for (const [key, raw] of Object.entries(value)) {
    if (isRawFileKey(key)) continue;
    result[key] = sanitizeRuntimeValue(raw, depth + 1);
  }
  return result;
}

function sanitizeRuntimeString(value) {
  const text = limitString(value, TASK_STORE_MAX_STRING_LENGTH);
  return RAW_FILE_DATA_PATTERN.test(text) ? "[REDACTED_RAW_FILE_DATA]" : text;
}

function isRawFileKey(key) {
  return /^(raw|raw_file|file|file_object|blob|object_url|data_url|base64|array_buffer)$/i.test(String(key || ""));
}

function capArray(values, max = TASK_STORE_MAX_ARRAY_LENGTH) {
  return Array.isArray(values) ? values.slice(0, max) : [];
}

function limitString(value, max = TASK_STORE_MAX_STRING_LENGTH) {
  const text = String(value ?? "");
  return text.length > max ? `${text.slice(0, max)}…[TRUNCATED]` : text;
}

function validIsoDate(value) {
  const parsed = Date.parse(value || "");
  return Number.isFinite(parsed) ? new Date(parsed).toISOString() : "";
}

function latestIsoDate(...values) {
  let latest = 0;
  for (const value of values) {
    const parsed = Date.parse(value || "");
    if (Number.isFinite(parsed) && parsed > latest) latest = parsed;
  }
  return latest ? new Date(latest).toISOString() : new Date().toISOString();
}

function buildTaskSummary(task, revision, serverUpdatedAt) {
  return {
    task_id: task.task_id,
    project_id: task.project_id,
    title: task.title,
    status: task.status,
    mode: task.mode,
    quality_level: task.quality_level,
    executor: task.executor || task.executor_state?.executor || "не назначен",
    verifier_result: task.verifier_result || "",
    memory_status: task.memory_preview?.status || task.memory_status || "",
    created_at: task.created_at,
    updated_at: task.updated_at,
    server_updated_at: serverUpdatedAt,
    sync_revision: revision,
  };
}

function validateCommandPayload(payload) {
  if (!payload || (payload.type !== "personal_action" && payload.type !== "storage_action")) {
    return { ok: false, error: "Only personal_action and storage_action commands are accepted." };
  }

  if (payload.type === "storage_action") {
    const action = String(payload.action || "").trim();
    const allowed = new Set([
      "prepare_task_storage",
      "write_task_artifact",
      "write_task_report",
      "write_memory_record",
      "create_restore_point",
      "inspect_task_storage",
      "verify_task_bundle",
    ]);
    if (!allowed.has(action)) {
      return { ok: false, error: `Unknown storage action: ${action || "<empty>"}` };
    }
    if (!normalizeTaskId(payload.task_id)) {
      return { ok: false, error: "storage_action requires task_id" };
    }
    return { ok: true, action, brain: "" };
  }

  const action = String(payload.action || "").trim();
  const brain = String(payload.brain || "").trim().toLowerCase();

  if (!PERSONAL_ACTIONS.has(action)) {
    return { ok: false, error: `Unknown personal action: ${action || "<empty>"}` };
  }

  if (!PERSONAL_BRAINS.has(brain)) {
    return { ok: false, error: `Unknown personal brain: ${brain || "<empty>"}` };
  }

  return { ok: true, action, brain };
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw new BridgeError(400, "INVALID_JSON", "Request body must be JSON.");
  }
}

async function serveWebAppAsset(request, env, requestId, startedAt) {
  const url = new URL(request.url);
  if (url.pathname === "/app") {
    return Response.redirect(`${url.origin}/app/`, 302);
  }

  const relativePath = url.pathname === "/app/"
    ? "/index.html"
    : url.pathname.replace(/^\/app/, "") || "/index.html";
  if (relativePath.includes("..")) {
    return tracedJson({ ok: false, error: "INVALID_APP_ASSET" }, 400, "", env, requestId, startedAt);
  }

  if (relativePath !== "/index.html") {
    const redirectUrl = new URL(`${WEBAPP_UPSTREAM_BASE}${relativePath}`);
    url.searchParams.forEach((value, key) => redirectUrl.searchParams.set(key, value));
    return Response.redirect(redirectUrl.toString(), 302);
  }

  const upstreamUrl = new URL(`${WEBAPP_UPSTREAM_BASE}${relativePath}`);
  url.searchParams.forEach((value, key) => upstreamUrl.searchParams.set(key, value));
  const upstream = await fetch(upstreamUrl.toString(), {
    headers: {
      "user-agent": "terminator-bridge-app-proxy/1.0",
      "accept-encoding": "identity",
    },
  });

  if (!upstream.ok) {
    return new Response("App asset not found", {
      status: upstream.status,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
        "x-request-id": requestId,
      },
    });
  }

  const headers = new Headers(upstream.headers);
  headers.set("x-request-id", requestId);
  headers.set("x-terminator-app-origin", "direct-bridge");
  headers.set("x-terminator-asset-mode", "buffered-v2");
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("transfer-encoding");
  headers.delete("content-security-policy");
  headers.delete("content-security-policy-report-only");

  if (relativePath === "/index.html") {
    const html = await upstream.text();
    const body = new TextEncoder().encode(injectSameOriginBridgeConfig(html, url.origin));
    const htmlHeaders = new Headers({
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate",
      "pragma": "no-cache",
      "expires": "0",
      "alt-svc": "clear",
      "content-length": String(body.byteLength),
      "x-request-id": requestId,
      "x-terminator-app-origin": "direct-bridge",
      "x-terminator-asset-mode": "static-html-buffer-v3",
    });
    return new Response(request.method === "HEAD" ? null : body, {
      status: 200,
      headers: htmlHeaders,
    });
  }

  if (relativePath === "/app.js" || relativePath === "/styles.css") {
    headers.set("cache-control", "no-store");
  }

  const body = await upstream.arrayBuffer();
  return new Response(body, {
    status: upstream.status,
    headers,
  });
}

function injectSameOriginBridgeConfig(html, origin) {
  const config = `<script>
window.MINA_DIRECT_BRIDGE_URL = ${JSON.stringify(origin)};
window.MINA_DIRECT_BRIDGE = { baseUrl: ${JSON.stringify(origin)}, transportMode: "direct" };
window.MINA_RUNTIME_ENTRY = "direct-bridge-app";
</script>`;
  const withAbsoluteAssets = html
    .replace(/href="styles\.css/g, `href="${WEBAPP_UPSTREAM_BASE}/styles.css`)
    .replace(/src="app\.js/g, `src="${WEBAPP_UPSTREAM_BASE}/app.js`);
  if (withAbsoluteAssets.includes("window.MINA_DIRECT_BRIDGE_URL")) return withAbsoluteAssets;
  return withAbsoluteAssets.replace("</head>", `${config}\n</head>`);
}

async function assertAllowedOrigin(origin, env, request = null) {
  const allowedOrigin = env.ALLOWED_ORIGIN;
  if (!allowedOrigin || allowedOrigin === "<set_later>") {
    throw new BridgeError(503, "ALLOWED_ORIGIN_NOT_CONFIGURED", "Set ALLOWED_ORIGIN before enabling Direct Mode.");
  }

  if (request) {
    const requestOrigin = new URL(request.url).origin;
    if (origin && origin === requestOrigin) return;
  }

  if (request?.headers?.get("x-bridge-frame") === "1") {
    const requestOrigin = new URL(request.url).origin;
    if (!origin || origin === requestOrigin) return;
  }

  if (origin && origin !== allowedOrigin) {
    throw new BridgeError(403, "ORIGIN_NOT_ALLOWED", "Origin is not allowed.");
  }
}

async function assertOwnerSessionAuthorized(request, env) {
  getOwnerSecretHash(env);

  const auth = request.headers.get("authorization") || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const token = bearer || request.headers.get("x-owner-session") || "";
  if (!token) {
    throw new BridgeError(401, "OWNER_SESSION_REQUIRED", "Owner session token is required.");
  }

  await queueRequest(env, `/internal/owner/session/${encodeURIComponent(token)}`);
}

async function assertAgentAuthorized(request, env) {
  const expectedToken = env.AGENT_TOKEN;
  if (!expectedToken || expectedToken === "<set_later>") {
    throw new BridgeError(503, "AGENT_TOKEN_NOT_CONFIGURED", "Set AGENT_TOKEN before starting local agent polling.");
  }

  const auth = request.headers.get("authorization") || "";
  const bearer = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  const token = bearer || request.headers.get("x-agent-token") || "";
  if (!safeEqual(token, expectedToken)) {
    throw new BridgeError(401, "AGENT_AUTH_FAILED", "Agent authorization failed.");
  }
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getOwnerSecretHash(env) {
  const expectedHash = env.OWNER_SECRET_HASH || env.OWNER_PIN_HASH;
  if (!expectedHash || expectedHash === "<set_later>") {
    throw new BridgeError(503, "OWNER_SECRET_NOT_CONFIGURED", "Set OWNER_SECRET_HASH before enabling owner sessions.");
  }
  return expectedHash;
}

function getOwnerSessionTtl(env) {
  return normalizeSessionTtl(env.OWNER_SESSION_TTL_SECONDS || DEFAULT_OWNER_SESSION_TTL_SECONDS);
}

function getCommandLeaseTtl(env) {
  return normalizePositiveSeconds(env.COMMAND_LEASE_TTL_SECONDS || DEFAULT_COMMAND_LEASE_TTL_SECONDS, DEFAULT_COMMAND_LEASE_TTL_SECONDS, 60 * 60);
}

function getCommandQueueTtl(env) {
  return normalizePositiveSeconds(env.COMMAND_QUEUE_TTL_SECONDS || DEFAULT_COMMAND_QUEUE_TTL_SECONDS, DEFAULT_COMMAND_QUEUE_TTL_SECONDS, 60 * 60);
}

function normalizeSessionTtl(value) {
  return normalizePositiveSeconds(value || DEFAULT_OWNER_SESSION_TTL_SECONDS, DEFAULT_OWNER_SESSION_TTL_SECONDS, 24 * 60 * 60);
}

function normalizePositiveSeconds(value, fallback, max) {
  const seconds = Number(value || fallback);
  return Number.isFinite(seconds) && seconds > 0 ? Math.min(seconds, max) : fallback;
}

function normalizeAgentId(value) {
  const agentId = String(value || "unknown-agent").trim();
  return agentId ? agentId.slice(0, 80) : "unknown-agent";
}

function normalizeClientCommandId(value) {
  const clientCommandId = String(value || "").trim();
  if (!clientCommandId) return null;
  return clientCommandId.replace(/[^a-zA-Z0-9._:-]/g, "").slice(0, 120) || null;
}

function getLeaseExpiresAt(command, ttlSeconds) {
  const explicit = Date.parse(command.lease_expires_at || "");
  if (Number.isFinite(explicit)) return explicit;

  const base = Date.parse(command.running_at || command.picked_at || command.updated_at || command.created_at || "");
  return Number.isFinite(base) ? base + ttlSeconds * 1000 : null;
}

function getQueuedExpiresAt(command, ttlSeconds) {
  const explicit = Date.parse(command.queued_expires_at || "");
  if (Number.isFinite(explicit)) return explicit;

  const base = Date.parse(command.created_at || command.updated_at || "");
  return Number.isFinite(base) ? base + ttlSeconds * 1000 : null;
}

function commandStatusResponse(command) {
  return {
    ok: true,
    command_id: command.id,
    client_command_id: command.client_command_id || null,
    action: command.action || command.payload?.action || null,
    brain: command.brain || command.payload?.brain || null,
    status: command.status,
    created_at: command.created_at,
    updated_at: command.updated_at,
    picked_at: command.picked_at || null,
    running_at: command.running_at || null,
    completed_at: command.completed_at || null,
    picked_by: command.picked_by || command.agent_id || null,
    agent_id: command.agent_id || command.picked_by || null,
    queued_expires_at: command.queued_expires_at || null,
    lease_expires_at: command.lease_expires_at || null,
    result: command.result,
    error: command.error,
    final: FINAL_STATUSES.has(command.status),
  };
}

function commandCreateResponse(command, deduplicated) {
  return {
    ok: true,
    command_id: command.id,
    client_command_id: command.client_command_id || null,
    status: command.status,
    error: command.error,
    final: FINAL_STATUSES.has(command.status),
    deduplicated,
  };
}

function safeEqual(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i++) {
    diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return diff === 0;
}

function getRequestId(request) {
  const incoming = String(request.headers.get("x-request-id") || "").trim();
  const normalized = incoming.replace(/[^a-zA-Z0-9._:-]/g, "").slice(0, 120);
  return normalized || crypto.randomUUID();
}

function tracedJson(data, status, origin, env, requestId, startedAt, error = null) {
  const body = {
    ...(data || {}),
    request_id: requestId,
  };
  const durationMs = Date.now() - startedAt;
  logBridgeEvent("request_end", {
    request_id: requestId,
    status,
    duration_ms: durationMs,
    error: error?.code || (status >= 500 ? "BRIDGE_ERROR" : null),
  });

  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders(origin, env, requestId),
  });
}

function bridgeFrameResponse(env) {
  const allowedOrigins = getFrameAllowedOrigins(env);
  const frameAncestors = allowedOrigins.length
    ? allowedOrigins.join(" ")
    : "'none'";
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <title>Mina Bridge Frame</title>
</head>
<body>
<script>
(() => {
  const SOURCE_IN = "mina-webapp-bridge-rpc";
  const SOURCE_OUT = "mina-bridge-frame";
  const ALLOWED_ORIGINS = new Set(${JSON.stringify(allowedOrigins)});
  const ALLOWED_HEADERS = new Set(["authorization", "content-type", "x-owner-session", "x-request-id"]);

  function send(event, payload) {
    if (!event.source || !event.origin) return;
    event.source.postMessage({ source: SOURCE_OUT, ...payload }, event.origin);
  }

  function safeRoute(route) {
    const value = String(route || "");
    if (!value.startsWith("/") || value.startsWith("//")) return "";
    return value;
  }

  function safeMethod(method) {
    const value = String(method || "GET").toUpperCase();
    return ["GET", "POST", "PATCH", "PUT"].includes(value) ? value : "GET";
  }

  function safeHeaders(input) {
    const headers = new Headers();
    Object.entries(input || {}).forEach(([key, value]) => {
      const name = String(key || "").toLowerCase();
      if (ALLOWED_HEADERS.has(name) && value !== undefined && value !== null) {
        headers.set(name, String(value));
      }
    });
    headers.set("x-bridge-frame", "1");
    return headers;
  }

  window.addEventListener("message", async (event) => {
    if (!ALLOWED_ORIGINS.has(event.origin)) return;
    const message = event.data || {};
    if (message.source !== SOURCE_IN) return;

    if (message.type === "ping") {
      send(event, { type: "ready" });
      return;
    }

    if (!message.requestId) return;

    const route = safeRoute(message.route);
    if (!route) {
      send(event, { type: "response", requestId: message.requestId, ok: false, status: 400, text: "{\"ok\":false,\"error\":\"INVALID_ROUTE\"}" });
      return;
    }

    const method = safeMethod(message.method);
    const headers = safeHeaders(message.headers);
    const hasBody = message.body !== undefined && method !== "GET";
    if (hasBody && !headers.has("content-type")) headers.set("content-type", "application/json");

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.max(1000, Math.min(Number(message.timeoutMs) || 30000, 60000)));

    try {
      const response = await fetch(route, {
        method,
        headers,
        body: hasBody ? JSON.stringify(message.body) : undefined,
        cache: "no-store",
        credentials: "omit",
        signal: controller.signal
      });
      const text = await response.text();
      send(event, { type: "response", requestId: message.requestId, ok: true, status: response.status, text });
    } catch (error) {
      send(event, {
        type: "response",
        requestId: message.requestId,
        ok: false,
        status: 0,
        errorName: error?.name || "BridgeFrameError",
        message: error?.message || "Bridge frame request failed."
      });
    } finally {
      clearTimeout(timer);
    }
  });

  function postReady() {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ source: SOURCE_OUT, type: "ready" }, "*");
    }
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ source: SOURCE_OUT, type: "ready" }, "*");
    }
  }

  postReady();
  const readyInterval = window.setInterval(postReady, 250);
  window.setTimeout(() => window.clearInterval(readyInterval), 5000);
})();
</script>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "alt-svc": "clear",
      "content-security-policy": `default-src 'none'; script-src 'unsafe-inline'; connect-src 'self'; frame-ancestors ${frameAncestors}; base-uri 'none'; form-action 'none'`,
      "referrer-policy": "no-referrer",
    },
  });
}

function getFrameAllowedOrigins(env) {
  const origins = new Set();
  const add = (value) => {
    const origin = String(value || "").trim().replace(/\/+$/, "");
    if (origin && origin !== "<set_later>") origins.add(origin);
  };
  add(env.ALLOWED_ORIGIN);
  String(env.ALLOWED_FRAME_ORIGINS || "")
    .split(",")
    .map((item) => item.trim())
    .forEach(add);
  return Array.from(origins);
}

function queueJson(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function responseHeaders(origin, env, requestId) {
  return {
    "content-type": "application/json; charset=utf-8",
    "x-request-id": requestId,
    "alt-svc": "clear",
    ...corsHeaders(origin, env),
  };
}

function corsHeaders(origin, env) {
  const allowedOrigin = env.ALLOWED_ORIGIN;
  const allowOrigin = origin && allowedOrigin && allowedOrigin !== "<set_later>" && origin === allowedOrigin
    ? origin
    : "null";

  return {
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": "GET,POST,PATCH,PUT,OPTIONS",
    "access-control-allow-headers": "content-type,authorization,x-agent-id,x-agent-token,x-owner-session,x-request-id",
    "access-control-expose-headers": "x-request-id",
    "access-control-max-age": "86400",
    "vary": "Origin",
  };
}

function logBridgeEvent(event, details = {}) {
  console.log(JSON.stringify({
    event,
    service: "mina-direct-bridge",
    ...details,
  }));
}

class BridgeError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}
