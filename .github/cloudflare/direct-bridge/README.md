# Mina Direct Command Bridge

Direct Command Bridge is the outbound-friendly command queue for Mina WebApp Direct Mode.

The PC is not exposed to the internet. The WebApp sends a command to this bridge, and the local agent running on the Terminator PC polls the bridge over HTTPS.

Phase 2 adds a separate `TaskStore` Durable Object for task metadata and event log sync. `CommandQueue` remains only for short WebApp -> Local Agent commands.

## Flow

1. WebApp sends the owner secret to `POST /owner/session`.
2. Bridge validates `OWNER_SECRET_HASH` and returns a short-lived `session_token`.
3. WebApp stores the token only in runtime/sessionStorage.
4. WebApp sends a `personal_action` payload to `POST /commands`.
5. Bridge creates a `command_id` and stores the command as `queued`.
6. Local agent calls `GET /agent/commands/next`.
7. Bridge marks the command as `picked_up`, records `picked_by`, and creates a short lease.
8. Local agent reports `running`, then `completed`, `failed`, or `manual_required`.
9. WebApp polls `GET /commands/:command_id/status`.
10. If a `picked_up` or `running` command outlives its lease, the bridge finalizes it as `failed` with `STALE_COMMAND_TIMEOUT`.

## Statuses

- `queued`
- `picked_up`
- `running`
- `completed`
- `failed`
- `manual_required`

## Endpoints

- `GET /health`
- `POST /owner/session`
- `POST /commands`
- `GET /commands/:command_id/status`
- `GET /agent/commands/next`
- `POST /agent/commands/:command_id/status`

## Required Runtime Bindings

The worker expects a Durable Object binding named `COMMAND_QUEUE`.

`CommandQueue` stores:

- commands
- statuses
- owner sessions
- timestamps
- picked/running lease metadata
- agent identity
- results

`TaskStore` stores:

- task metadata;
- task status and sync revision;
- task event log;
- file metadata only, never raw/base64 file content;
- artifact metadata/content with truncation guard;
- approval and memory preview records;
- Local Agent task status reports.

Runtime config must be set in the bridge hosting environment, not committed with real secret values:

```env
OWNER_SECRET_HASH=<set_later>
AGENT_TOKEN=<set_later>
ALLOWED_ORIGIN=https://vitaliykonstantinovich.github.io
OWNER_SESSION_TTL_SECONDS=900
COMMAND_LEASE_TTL_SECONDS=180
```

`OWNER_SECRET_HASH` is the SHA-256 hex hash of the owner PIN/passphrase. The frontend must not contain this value or the raw secret.

`AGENT_TOKEN` is used only by the local agent.

`OWNER_SESSION_TTL_SECONDS` controls the short-lived owner session lifetime.

`COMMAND_LEASE_TTL_SECONDS` controls how long a command may remain `picked_up` or `running` before the bridge marks it final as `failed / STALE_COMMAND_TIMEOUT`. Stale commands are not automatically requeued because the PC action may have partially executed.

## Owner Auth

Commands and status reads from the WebApp require:

```http
Authorization: Bearer <owner_session_token>
```

The token is issued by:

```http
POST /owner/session
Content-Type: application/json

{ "secret": "<owner-passphrase-or-pin>" }
```

The bridge also accepts `OWNER_PIN_HASH` as a legacy alias for `OWNER_SECRET_HASH`, but new deploys should use `OWNER_SECRET_HASH`.

## Deploy Checklist

1. Deploy `bridge-worker.js` to the bridge host.
2. Bind Durable Object namespace `COMMAND_QUEUE` to class `CommandQueue`.
3. Set secrets in the dashboard or secret manager:
   - `OWNER_SECRET_HASH`
   - `AGENT_TOKEN`
4. Set runtime vars:
   - `ALLOWED_ORIGIN`
   - optional `OWNER_SESSION_TTL_SECONDS`
5. Apply the Durable Object migration.
6. Run `GET /health`.
7. Run a synthetic `/owner/session -> /commands -> /agent/commands/next -> /agent/commands/:id/status -> /commands/:id/status` test.
8. Run a stale command test and confirm `GET /commands/:id/status` returns `failed / STALE_COMMAND_TIMEOUT`.

Do not commit real secrets.

See `wrangler.example.toml` for an example Cloudflare Worker config.

## WebApp Adapter Contract

The WebApp already looks for one of these objects on `window`:

- `TerminatorCommandBridge`
- `TerminatorDirectBridge`
- `MinaCommandBridge`

The object should expose:

```js
window.TerminatorCommandBridge = {
  async sendTerminatorAction(payload) {
    // POST /commands
    return { ok: true, command_id: "...", status: "queued" };
  },

  async getCommandStatus(commandId) {
    // GET /commands/:command_id/status
    return { ok: true, command_id: commandId, status: "completed", final: true };
  }
};
```

This repository does not commit owner PINs, tokens, or deployment settings.

## Phase 2 TaskStore Endpoints

Owner session required:

- `GET /tasks`
- `GET /tasks?full=1`
- `POST /tasks`
- `GET /tasks/:task_id`
- `PUT /tasks/:task_id`
- `PATCH /tasks/:task_id`
- `GET /tasks/:task_id/events`
- `POST /tasks/:task_id/events`
- `POST /tasks/:task_id/artifacts`
- `POST /tasks/:task_id/files`
- `POST /tasks/:task_id/approvals`
- `POST /tasks/:task_id/memory`

Agent token required:

- `POST /agent/tasks/:task_id/status`

TaskStore safety:

- does not store raw files;
- strips `raw_file`, `blob`, `object_url`, `data_url`, `base64` fields;
- redacts base64 data URLs if they appear inside text;
- limits string and array sizes;
- does not execute, extract, delete, deploy, or call AI APIs.
