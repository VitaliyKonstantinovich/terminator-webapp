# Terminator V2-P0-H Owner Command Center / First Run Runtime Panel

Status: PASS

## Scope

V2-P0-H exposes the V2 First Run readiness and Setup Route runtime in the owner-facing UI.

Implemented:
- Owner Command Center now uses `getV2FirstRunReadinessSnapshot()` through `buildV2OwnerCommandCenterSnapshot()`.
- The panel shows readiness percent, readiness level, minimum/comfort/maximum, one primary next action, attention items, owner-assisted checks, postponed checks, and collapsed expert details.
- Existing Start, Menu, Mission Control, and System hosts are reused.
- Route actions only navigate to existing panels or show a safe message.
- No dangerous action is executed by the “Перейти” button.
- Command Center events are sanitized and recorded:
  - `v2.command_center.opened`
  - `v2.setup_route.next_action_selected`
  - `v2.setup_route.owner_assisted_pending`
  - `v2.setup_route.ready`

## UI Placement

- Start screen: compact readiness status.
- Main menu: compact V2 launch card.
- Mission Control: full Owner Command Center panel.
- System: full Owner Command Center panel.

## UX Rules

- Normal mode shows plain Russian copy only.
- Expert details are hidden inside a collapsed `details` block.
- Owner-assisted checks are separate from blockers.
- Real phone APK remains postponed until production V2 final.
- Unknown states are not shown as ready.

## Files Changed

- `app.js`: wired V2 First Run readiness into the owner-facing panel, route aliases, command center events, and expert details.
- `styles.css`: added attention list, postponed owner item, and expert details styling.

## Evidence

Evidence directory:

`evidence/v2_p0_h_owner_command_center/`

Generated files:
- `readiness_panel_samples.json`
- `setup_route_navigation_samples.json`
- `command_center_events.json`
- `smoke.json`

## Checks

- `node --check app.js`: PASS
- `node --check sw.js`: PASS
- Owner Command Center VM smoke: PASS
- 9 readiness panel samples: PASS
- 8 route navigation samples: PASS
- Event log presence: PASS
- Owner-assisted separation: PASS
- Postponed phone rule: PASS
- Normal UI copy avoids forbidden technical labels: PASS
- Mobile CSS rules present: PASS

## Not Done

- No APK.
- No BlueStacks.
- No real phone.
- No full onboarding wizard.
- No full redesign.
- No Cloudflare/GitHub settings changes.
- No Local Agent / Direct Bridge changes.

## Residual Risks

- This is a bounded UI wiring block, not final V2 visual polish.
- Mobile was checked by lightweight DOM/CSS evidence; a full browser/device pass remains later.
- Owner-assisted checks remain manual production gates.
