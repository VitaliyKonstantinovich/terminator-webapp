# Mina UI Product Style Guide V1

Status: PASS
Date: 2026-05-29
Scope: Product Completion Loop 4 visual/product acceptance.

## Visual Direction

Mina UI is a premium dark holographic cockpit, not a flat admin dashboard. The reference direction is taken from:

- `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\TERMINATOR_MOCKUPS_FINAL_UTF8\02_mina_system_setup_alt_desktop.png`
- `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\TERMINATOR_MOCKUPS_FINAL_UTF8\06_mina_diagnost_desktop.png`

The UI may use mockup images as composition references, but functional information must be real DOM/SVG controls, not passive text baked into a bitmap.

## Core Rules

1. Real state beats decoration.
2. Side HUD panels must show current data: date/time, Guardian state, task counts, memory index, bridge/agent status, notifications.
3. Buttons shown in the visual shell must be real controls when they are used for current flows.
4. Ordinary mode uses Russian user-facing text. Technical names stay in Expert mode or docs.
5. Dangerous actions must visibly route through Guardian/Approval.
6. Mobile must not be a squeezed desktop; no horizontal overflow.
7. Assets must not create stale facts such as old dates, fake credits, fake ready states, or paid provider names.

## Panels

Panel style:

- dark glass base;
- neon cyan border;
- angled corners;
- subtle inner glow;
- readable status text;
- status color plus status words.

Panel types:

- status panel;
- metric panel;
- action panel;
- notification panel;
- readiness panel.

The main menu side HUD is a live DOM layer over the visual shell. It intentionally covers the old static panel area from the background mockup.

## Mina Scheme

The Mina Scheme uses controlled SVG/DOM zones:

- Head / Brain points to head;
- Eyes point to eyes;
- Voice points to mouth;
- Memory is a system zone;
- Body points to control core;
- Hands point to hands;
- Legs point to legs;
- Diagnost is a shield/protective layer.

The silhouette is acceptable for V1 as a stylized SVG/DOM hologram. A future final asset may improve character art, but it must preserve accessibility and zone control.

## Typography

- White for primary labels.
- Cyan for system labels and metrics.
- Yellow for review.
- Green for safe.
- Red for danger.
- No negative letter spacing.
- Text must fit inside cards and buttons.

## Forbidden Patterns

- Static PNG screen as the only UI.
- Invisible click-map over a screenshot.
- Old dates or fake values visible as active facts.
- Technical names in normal mode: `RAW STATE`, `CommandQueue`, `Durable Object`, backend runtime.
- Paid provider placeholders as active integrations.
- AI API usage by default.

## Acceptance

For Loop 4 the main menu passes only if:

- side HUD exists as DOM;
- `Просмотреть` opens a notification panel;
- current date/time are rendered live;
- system state is user-readable;
- no active Personal/legacy path is visible;
- mobile 390/430 has no horizontal overflow.
