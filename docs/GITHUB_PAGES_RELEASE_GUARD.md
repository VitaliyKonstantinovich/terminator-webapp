# GitHub Pages Release Guard

Status: active.

## Purpose

Prevent the old GitHub Pages legacy build status from confusing release acceptance.

The active deploy path is:

```text
main -> Deploy GitHub Pages workflow -> GitHub Pages
```

The `gh-pages` branch is only a static mirror. It is not the development source and should not be edited manually during normal work.

## Why this exists

GitHub can keep an old `pages/builds/latest` legacy status even after the site is successfully deployed by the workflow. That produced a stale `Page build failed` warning while the live site was already working.

## Guardrails

- GitHub Pages must remain `build_type=workflow`.
- The deploy workflow syncs a static `gh-pages` mirror after a successful Pages deploy.
- The public Pages artifact is a whitelist:
  `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `sw.js`, `.nojekyll`, and `assets/`.
- The deploy workflow runs a live smoke check for:
  - current V1 HTML marker: `20260529-product-loop4-final-experience-v1`;
  - PWA manifest;
  - current Service Worker cache marker: `terminator-mina-pwa-20260529-product-loop4-final-experience-v1`.
- Historical phase markers may remain in older evidence, but they are not the current acceptance requirement.
- Manual pushes to `gh-pages` are not part of the normal release flow.

## Manual Health Check

Run from `webapp`:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\check-pages-health.ps1
```

Expected:

```text
Pages health check: PASS
```

Current marker policy:

- Current V1 marker: `20260529-product-loop4-final-experience-v1`.
- Current cache marker: `terminator-mina-pwa-20260529-product-loop4-final-experience-v1`.
- Future release blocks must update the workflow marker, health script marker and final acceptance index together.

## Scope

This guard only touches:

```text
VitaliyKonstantinovich/terminator-webapp
```

It does not affect other GitHub accounts or repositories.
