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
- The deploy workflow runs a live smoke check for:
  - HTML Phase 5 marker;
  - PWA manifest;
  - Service Worker.
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

## Scope

This guard only touches:

```text
VitaliyKonstantinovich/terminator-webapp
```

It does not affect other GitHub accounts or repositories.
