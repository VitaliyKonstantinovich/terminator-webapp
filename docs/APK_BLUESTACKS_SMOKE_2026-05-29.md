# APK / BlueStacks Smoke — 2026-05-29

Status: PASS with one infrastructure PARTIAL.

## Scope

Checked the Android wrapper after V1 QAMax Fix Block 1 live smoke.

Goal:
- build debug APK;
- install it in BlueStacks;
- verify that Terminator opens as an app, not as a browser shortcut;
- smoke Start, main menu, System, and Mina Scheme.

## What Changed

File: `android/terminator-mina/build-mobile-apk.ps1`
- Fixed local debug signing generation for the current PowerShell/.NET runtime.
- Kept signing secrets in ignored local build output, not in committed source.
- Uses the same local store/key password for debug PKCS12 compatibility.

File: `android/terminator-mina/AndroidManifest.xml`
- Added explicit `versionCode`, `versionName`, `minSdkVersion`, and `targetSdkVersion`.
- Kept only `android.permission.INTERNET`.

File: `android/terminator-mina/src/app/terminator/mina/MainActivity.java`
- Removed external browser launch.
- Android wrapper now opens Mina UI inside an embedded WebView.

## APK Output

APK:
`D:\TerminatorStorage\codex_outputs\apk_bluestacks_20260529\terminator-mina-phase5-debug.apk`

SHA256:
`A5F2B70171C129FF54D6D3CE11318081699AF870C6EC51D6255679BB418C2A44`

Signing:
- v1: true
- v2: true
- v3: true

Package:
- `app.terminator.mina`
- versionCode: `1`
- versionName: `1.0`
- minSdk: `23`
- targetSdk: `36`
- permission: `android.permission.INTERNET`

## BlueStacks Smoke

Result: PASS.

Verified:
- APK installed via BlueStacks UI.
- App launches without external Chrome UI.
- Start screen opens.
- Main menu opens.
- System screen opens.
- Mina Scheme opens.
- Mina Scheme zone click is visible on Head / Brain zone.

## Partial

ADB install path is PARTIAL.

Reason:
BlueStacks ADB returned `Connect error for write: closed`. The APK was installed through the official BlueStacks APK install UI instead.

Impact:
Not a product blocker. It affects automation convenience only.

## Android WebView V1 Boundaries

This APK is a V1 release-candidate debug wrapper, not production Android signing.

Security posture:
- Wrapper opens the live GitHub Pages Mina UI inside an embedded WebView.
- Manifest keeps only `android.permission.INTERNET`.
- External browser `ACTION_VIEW` launch path was removed.
- SSL errors are cancelled, not bypassed.
- Media playback requires user gesture.
- No AI API, paid provider integration, cookies export, token export or native file automation was added.

Known V1 limitations:
- Real phone install is owner-assisted and still pending.
- Release signing and Play Store-grade hardening are later production tasks.
- Offline/native storage is limited to the WebView/PWA layer; large user files still belong on `D:\TerminatorStorage`.
- The wrapper depends on live GitHub Pages availability.

## Checks

PASS:
- APK build.
- APK signing verify.
- Manifest/badging.
- WebView wrapper launch.
- Start/menu/System/Scheme smoke in BlueStacks.
- Android wrapper safety scan for old external browser launch markers.
- `node --check app.js`.
- `node --check sw.js`.
- No AI API used.
- No Cloudflare/GitHub settings changed.
- No billing changes.

PARTIAL:
- ADB install automation.
- Real phone was not checked in this block.

## Evidence

Screenshots:
- `evidence/apk_bluestacks_20260529/screenshots/bluestacks_webview_launch_after_update.png`
- `evidence/apk_bluestacks_20260529/screenshots/bluestacks_webview_menu.png`
- `evidence/apk_bluestacks_20260529/screenshots/bluestacks_webview_system.png`
- `evidence/apk_bluestacks_20260529/screenshots/bluestacks_webview_scheme_after_retry.png`
- `evidence/apk_bluestacks_20260529/screenshots/bluestacks_webview_scheme_head_icon_click.png`

Logs:
- `evidence/apk_bluestacks_20260529/logs/apk_hash.txt`
- `evidence/apk_bluestacks_20260529/logs/apk_badging.txt`
- `evidence/apk_bluestacks_20260529/logs/checks_summary.txt`
- `evidence/apk_bluestacks_20260529/logs/android_safety_scan.txt`

## Verdict

APK / BlueStacks smoke is good enough to proceed to owner-assisted checks:
- real phone install/PWA check;
- billing dashboards;
- optional reboot/autostart confirmation.
