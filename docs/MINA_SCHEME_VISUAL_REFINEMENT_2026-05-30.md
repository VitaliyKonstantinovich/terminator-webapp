# Mina Scheme Visual Refinement 2026-05-30

Status: PASS

## Scope

Refined the Mina Scheme visual layer so the central Mina figure follows the approved mockup/reference more closely while preserving the interactive V1 screen behavior.

Changed files:

- `app.js` - updated the Mina Scheme inline SVG layer, added a controlled hologram visual asset, and kept real interactive SVG zones.
- `styles.css` - refined silhouette sizing, glow treatment, mobile layout, and status/action layout.
- `assets/mina-hologram-silhouette.png` - approved mockup-derived visual asset used inside SVG as a non-interactive hologram layer.

## Implementation

- The silhouette is not a page background and not a click-map.
- The hologram asset is rendered as an SVG image layer with `pointer-events: none`.
- The 8 subsystem zones remain real SVG/DOM elements with `data-scheme-zone` and `aria-label`.
- Zone cards remain real DOM controls and continue to update the right panel.
- SVG callouts remain separate line elements, not baked into a full-page screenshot.

## Checks

- Local DOM smoke: PASS.
- Hologram asset present: PASS.
- PNG as CSS/page background: PASS, not used.
- SVG zones count: PASS, 8.
- Aria zone labels: PASS, 8.
- Desktop screenshot: PASS.
- 599px smoke: PASS, no horizontal overflow.
- 390px mobile smoke: PASS, no horizontal overflow.
- Zone card click smoke: PASS, all 8 zones select the matching subsystem.

## Evidence

- `evidence/mina_scheme_visual_refinement/mina_scheme_visual_refinement_smoke.json`
- `evidence/mina_scheme_visual_refinement/mina_scheme_card_click_smoke.json`
- `evidence/mina_scheme_visual_refinement/screenshots/mina_scheme_asset_desktop.png`
- `evidence/mina_scheme_visual_refinement/screenshots/mina_scheme_asset_narrow_599.png`
- `evidence/mina_scheme_visual_refinement/screenshots/mina_scheme_asset_mobile_390.png`

## Risk

LOW. The visual asset is derived from an approved project mockup and does not replace the app with a static background. Future product polish can replace it with a dedicated clean production illustration, but the current result fixes the visible mismatch and keeps the screen functional.
