# APK / BlueStacks Smoke Result

Date: 2026-05-29

Status: PASS / PARTIAL

## Summary

Android debug APK was built, signed, installed in BlueStacks through the official UI, and launched successfully. The wrapper was upgraded from external Chrome launch to embedded WebView launch, so Terminator now opens as an app surface without Chrome address bar or translate overlays.

## Results

| Check | Status | Evidence |
|---|---|---|
| APK build | PASS | `logs/checks_summary.txt` |
| APK signing verify | PASS | `logs/checks_summary.txt` |
| APK hash captured | PASS | `logs/apk_hash.txt` |
| Android package badging | PASS | `logs/apk_badging.txt` |
| External browser launch removed | PASS | `logs/android_safety_scan.txt` |
| BlueStacks UI install | PASS | `screenshots/bluestacks_after_webview_apk_open_click.png` |
| WebView launch | PASS | `screenshots/bluestacks_webview_launch_after_update.png` |
| Main menu | PASS | `screenshots/bluestacks_webview_menu.png` |
| System screen | PASS | `screenshots/bluestacks_webview_system.png` |
| Mina Scheme | PASS | `screenshots/bluestacks_webview_scheme_after_retry.png` |
| Mina Scheme zone click | PASS | `screenshots/bluestacks_webview_scheme_head_icon_click.png` |
| ADB install | PARTIAL | BlueStacks ADB returned `Connect error for write: closed` |
| Real phone | PARTIAL | Owner-assisted check required |

## Changed Files

- `android/terminator-mina/build-mobile-apk.ps1`
- `android/terminator-mina/AndroidManifest.xml`
- `android/terminator-mina/src/app/terminator/mina/MainActivity.java`
- `docs/APK_BLUESTACKS_SMOKE_2026-05-29.md`
- `evidence/apk_bluestacks_20260529/`

## Risks

- BlueStacks ADB is unstable on this machine; UI install is usable.
- Real phone install is not yet checked.
- APK is a debug build, not a release-signed production APK.

## Final

Can proceed to owner-assisted checks: YES.

Can call final V1 fully accepted without owner-assisted checks: NO.

