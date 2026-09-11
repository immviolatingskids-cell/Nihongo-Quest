# Nihongo Quest Roadmap Goals Prompt

Use this document as the implementation brief for the roadmap after the validated v0.9.4 Sakura identity pass.

## Global Objective

Advance Nihongo Quest from v0.9.5 through v1.0 as one cohesive, calm Japanese-learning experience. Keep learning primary and build on the existing mastery, discovery, Garden, Journey, room, shop, save, and companion systems. Do not introduce a second progression model.

Global constraints:

- Preserve existing save compatibility and progression semantics.
- Reuse existing events, engines, scenes, and components before adding new abstractions.
- Support desktop, tablet, and approximately 390px mobile layouts.
- Preserve accessible labels, keyboard use, contrast, text fallbacks, and reduced-motion behavior.
- Use approved artwork only; optimize loading and avoid unused assets.
- Do not add NPC simulation, dialogue trees, currency, gacha, loot, scarcity, adaptive learning, or curriculum expansion in this roadmap.

## v0.9.5 — Home + Journey: Sakura Horizon

Create a warmer Home entry point and apply the Sakura Horizon visual language to Journey.

- Redesign Home around a clear welcome, next action, progress summary, and today’s bounded quest.
- Apply the same tokens, card hierarchy, typography, spacing, and button language to Journey.
- Make the next step and current progress immediately understandable without adding progression rules.
- Keep existing Journey recommendations, resume behavior, quests, and mastery data canonical.
- Make navigation and cards consistent across Home, Learn, Journey, Garden, Room, and Shop.

Acceptance gate: the next action is obvious at desktop, tablet, and mobile widths; all existing journey/state tests remain green; no new progression state is created.

## v0.9.6 — World Reactions + Environmental Cohesion

Make the world respond quietly and consistently to learning progress.

- Connect Sakura’s deterministic reactions to existing answer, mistake, quest, discovery, milestone, and return events.
- Reflect canonical learning progress in Garden visuals without changing Garden scoring or unlock thresholds.
- Improve cultural discovery presentation while preserving discovery/ownership semantics.
- Smooth transitions between Home and location surfaces using existing scene infrastructure.
- Unify visual treatment across Sakura’s Room, Aoi’s Shop, Sakura Garden, Home, and Journey.
- Keep feedback brief, contextual, and meaningful; avoid game-like overload.

Acceptance gate: each reaction is deterministic and persisted; scene and asset loading remain bounded; reduced motion and accessible fallbacks are verified.

## v0.9.7 — Living World Synthesis and v0.9 Closure

Perform the release-hardening pass before moving beyond v0.9.

- Audit visual consistency across all surfaces and viewport sizes.
- Consolidate repeated UI values into Sakura Horizon design tokens and reusable components.
- Review accessibility, keyboard flow, contrast, copy clarity, and mobile usability.
- Optimize image dimensions, loading attributes, and unused asset references.
- Run the complete regression suite, production build, and focused browser audit.
- Record remaining warnings explicitly, then prepare the v0.9 release summary.

Acceptance gate: full tests/build pass, no known critical accessibility or layout regressions, and the release audit documents any non-blocking warnings.

## Beyond v0.9

- **v0.10 — Adaptive Learning:** personalized support and smarter practice, only after a separate design and data-safety review.
- **v0.11 — Japanese Expansion:** broader content and deeper learning, with a separately approved curriculum plan.
- **v0.12 — Product Hardening:** performance, accessibility, stability, and operational reliability.
- **v1.0 — Nihongo Quest:** a complete, polished learning experience with the established world and progression foundations intact.

## Delivery Protocol

For each milestone: inspect the current implementation first, make one focused slice, add/update focused tests, run `npm test` and the relevant build/audit commands, document warnings, and stop for commit review before beginning the next milestone.
