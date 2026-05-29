# V1 Owner-Assisted Final Checklist - 2026-05-29

Status: pending owner-assisted final acceptance.

This checklist is the final owner-side pass before calling Terminator V1 fully accepted. It does not require code changes.

## A. Real Phone APK Check

Target device:

Galaxy S22 Ultra.

APK:

`D:\TerminatorStorage\codex_outputs\apk_bluestacks_20260529\terminator-mina-phase5-debug.apk`

SHA256:

`A5F2B70171C129FF54D6D3CE11318081699AF870C6EC51D6255679BB418C2A44`

Steps:

1. Install the APK on the phone.
2. Open Terminator Mina.
3. Confirm it opens as an app surface.
4. Open Start.
5. Open main menu.
6. Open Рабочее.
7. Open Система.
8. Open Схема Мины.
9. Open Диагност.
10. Run or view Memory Search.
11. Confirm Emergency Stop is visible and not easy to trigger accidentally.
12. Confirm no horizontal overflow.
13. Confirm buttons are readable and tappable.
14. Capture screenshots or short video evidence.

Expected PASS:

- App opens.
- Main screens are readable.
- Buttons/tap targets are usable.
- No horizontal overflow.
- No browser address bar appears inside the app surface.

## B. PWA / Web Mobile Check

Live URL:

`https://vitaliykonstantinovich.github.io/terminator-webapp/`

Steps:

1. Open the live URL in Chrome or Samsung Internet on the phone.
2. Hard refresh if needed.
3. Confirm live marker path is current by visible UI freshness.
4. Add to home screen if the browser offers it.
5. Launch from home screen.
6. Check Start, main menu, Рабочее, Система, Схема Мины, Диагност, and Memory Search.
7. Capture screenshots or short video evidence.

Expected PASS:

- Web/PWA route opens.
- Main screens are readable.
- No horizontal overflow.
- PWA/home-screen launch works if available.

If add-to-home is unavailable:

Mark PWA as PARTIAL, not FAIL.

## C. Billing Check

Do not change billing settings during this check. Screenshot only what is safe for owner records. Hide payment details if sharing evidence.

Cloudflare:

- Billing overview.
- Subscriptions.
- Payment method presence.
- Invoices.
- Workers/pages billable usage.
- Any paid plan or active paid add-on.

GitHub:

- Billing overview.
- Actions usage.
- Payment info presence.
- GitHub Pages status.
- Any paid runner/package/storage usage.

Amvera:

- Balance.
- Active apps/services.
- Autopay status.
- Any paid resource still running.

n8n:

- Cloud status if used.
- Active subscription/trial status.
- Confirm n8n is not the main path.

AI subscriptions:

- Confirm which web-chat subscriptions are intentional.
- Confirm no AI API billing was enabled by Terminator.

Expected PASS:

- No unknown paid service.
- Any active paid service is intentional and owner-approved.
- AI API billing remains disabled unless separately approved.

## D. Production Signing Later

Current APK is a debug V1 RC wrapper.

Before production distribution:

- decide release keystore strategy;
- keep signing credentials outside git;
- document secure owner storage;
- build a release-signed APK only in a separate approved release task.

This is not a V1 RC blocker.

## E. Production Rollback Later

Sandbox rollback was tested during QAMax/Fix Block 1 evidence. Production rollback on active project remains owner-assisted.

Before production controlled apply:

- choose a low-risk real target;
- create restore point;
- verify affected files;
- apply only after Approval;
- verify rollback path.

This is not a V1 RC blocker.

## F. Legacy Cleanup Later

Do not delete legacy without a separate cleanup block.

Review only:

- Telegram;
- n8n;
- Amvera;
- AnyDesk flow;
- PM2 brain workers;
- old browser profiles/cookies/sessions.

Expected PASS:

- Legacy remains classified and not main path.
- No cleanup performed without approval.

## Final Owner Verdict Options

PASS:

All owner-assisted checks are acceptable for V1.

PARTIAL:

Core V1 RC is accepted, but at least one owner-assisted item remains pending.

FAIL:

Real phone, billing, or another owner-side check exposes a blocker.

## Evidence Needed

- Phone screenshots or short video.
- PWA/home-screen screenshots if available.
- Billing dashboard screenshots or owner notes.
- Any exception notes with date and exact screen.

## Current Recommendation

V1 RC can be treated as ready for final owner-assisted checks.

Do not start V2 until the owner decides whether V1 is accepted, accepted with pending items, or needs a bounded final fix.
