# Nihongo Quest — Feature Opportunities

Review date: 10 September 2026

Implementation update: the recommended v0.9 Cultural Discovery & Sakura's Room milestone has now been implemented. The remaining entries continue to describe future opportunities.

This document records possible additions only. It does not propose implementation changes in the current release.

## Current product baseline

Nihongo Quest currently provides a local-first Japanese learning loop with:

- vocabulary and kana practice across recognition, listening, recall, and production;
- grammar lessons and multi-step conversation scenarios;
- spaced review, mistake practice, Focus Quest, and deterministic next-step recommendations;
- a 12-node Quest Journey, Sakura companion reactions, and a progress-derived Garden;
- browser Japanese speech with a canonical future asset boundary;
- a 16-item Cultural Collection and Aoi-san's Shop;
- progress statistics, searchable journals, accessibility settings, and JSON save backup;
- content, audio, and cultural-catalogue validation tools.

The automated suite passes 30 tests. The audio catalogue covers 113 prompts through browser TTS but has no local recordings. Cultural metadata is complete for 16 items; 15 have artwork, while `konbini-bag` uses the fallback presentation.

## Recommended sequence

| Priority | Opportunity | Learner value | Effort | Why now |
| --- | --- | --- | --- | --- |
| P0 | Cultural discovery wiring | Makes learning unlock visible, meaningful rewards | Medium | The registry, unlock rules, events, persistence, Shop, and art already exist but are not joined at the learning boundary. |
| P0 | Sakura's room and item placement | Gives owned objects a purpose and a personal, persistent space | Medium–large | Every cultural item already declares a placement type and room zone; the Shop currently describes placement as future-only. |
| P1 | Corrective answer coaching | Turns wrong answers into an explanation and a useful retry | Medium | The engine records expected answers, skill stage, source, and confusion pairs, but feedback is mainly correct/incorrect. |
| P1 | Curriculum and story expansion | Extends the learning runway beyond the current compact path | Large, content-heavy | The content schema, validator, prerequisite graph, and canonical session engine are ready for more material. |
| P1 | Learning goals and review forecast | Helps learners plan without introducing punishment mechanics | Small–medium | Due dates, study days, Focus durations, and recommendation data already exist. |
| P2 | Pronunciation practice | Adds productive speaking and listening confidence | Large | The audio boundary and stable content IDs provide a foundation, but speech capture and scoring need careful UX and privacy work. |
| P2 | Richer progress insights | Makes mastery and review decisions more understandable | Medium | Answer history and per-skill scores exist, but the current Progress page is mostly aggregate accuracy. |
| P2 | Offline installable app | Makes short daily practice more dependable | Medium | The app is already local-first and dependency-light; audio fallback and update behavior need explicit handling. |
| P3 | Optional cross-device sync | Removes manual backup friction | Large | Export/import is safe today; accounts, conflict resolution, privacy, and hosting would substantially expand scope. |

## P0 — Complete the Cultural Collection loop

### 1. Wire discoveries to meaningful progress

**Opportunity:** Evaluate each cultural item's existing `unlock` rule when a curriculum node or achievement is completed. Surface a single discovery moment, then let the learner open its knowledge card or continue studying.

**Evidence:** All 16 catalogue entries have stable discovery IDs and either curriculum or milestone unlock metadata. The engine has idempotent `discoverItem()` behavior and companion events, but normal completion paths do not currently call it.

**Smallest useful release:**

- resolve curriculum and milestone unlock conditions in one domain-level function;
- run it after canonical completion events, not from view buttons;
- show a non-blocking “new cultural item discovered” summary;
- mark the item acknowledged after its card is opened;
- show the associated discovery on the Journey node detail.

**Acceptance notes:** Imported saves should backfill eligible discoveries once without replaying a burst of notifications. Repeating a lesson must not rediscover an item. Discoveries must never depend on XP farming or opening the Shop.

### 2. Add Sakura's room and item placement

**Opportunity:** Create a calm personal room where owned items can be placed in their declared zones. This gives collection ownership a visible purpose without adding coins, random drops, or scarcity.

**Evidence:** Items already distinguish discovery from ownership and declare a placement type and room zone. The Shop copy explicitly says favourites are for Sakura's future home.

**Smallest useful release:**

- one fixed room scene with selectable zones such as shelf, desk, window, entrance, wall, table, and floor;
- one active item per zone, selected only from owned items;
- a text list mirroring the visual layout for accessibility;
- placement persisted separately from catalogue metadata;
- a clear remove/replace action and safe handling when an asset is missing.

**Defer:** Freeform dragging, collision physics, room expansion, currencies, randomized rewards, trading, and seasonal exclusivity.

## P1 — Improve learning quality and direction

### 3. Corrective answer coaching

**Opportunity:** After a wrong answer, briefly explain the distinction and offer a targeted retry later in the same session.

Possible coaching layers:

- kana confusion guidance for declared pairs such as ぬ/め and シ/ツ;
- a vocabulary example sentence with the target highlighted;
- accepted-answer transparency when an alternative was valid;
- a “why this appeared” label using the existing source metadata;
- one delayed retry, recorded as a separate attempt rather than overwriting the first.

The first version should use authored hints, not unrestricted generated explanations. This keeps feedback accurate, offline-capable, and testable.

### 4. Expand the curriculum and stories

**Opportunity:** Grow the 12-node linear path into a longer beginner journey while keeping one canonical progression model.

Suggested content order:

1. Complete the current introductory arc with numbers, time, shopping, directions, routines, and basic adjectives.
2. Add short scenario branches where different valid replies lead to authored follow-up lines.
3. Add milestone recap nodes that mix earlier skills without creating a second mastery score.
4. Introduce optional side paths for culture or focused grammar, clearly marked as optional.

Each new node should provide an objective, prerequisites, estimated time, content IDs, audio coverage, cultural discovery links where relevant, and a completion rule. Content breadth is the main constraint: authored distractors, examples, accepted answers, and conversation alternatives need review by a qualified Japanese-language editor.

### 5. Add gentle goals and a review forecast

**Opportunity:** Let the learner choose a weekly intention such as “study on 3 days” or “complete two 5-minute sessions,” and show a compact forecast of reviews due today and over the next seven days.

Principles:

- goals are optional and editable;
- missed goals do not break streaks, remove Garden growth, or trigger guilt-oriented copy;
- forecast counts come from canonical review due dates;
- Home continues to recommend one best next action;
- reminders, if ever added, require explicit opt-in and quiet hours.

## P2 — Broaden practice and reliability

### 6. Pronunciation practice

**Opportunity:** Add an opt-in “speak this” exercise with playback, transcript confirmation, and learner-controlled recording.

Stage it carefully:

- begin with record-and-playback and no score;
- add speech-to-text only as a transcription aid with clear uncertainty;
- do not claim accent quality from text matching;
- require an evidence-based pronunciation model before adding phoneme or pitch feedback;
- keep microphone permission contextual and never retain audio by default.

Local native recordings should precede pronunciation scoring. The current report finds zero checked-in audio assets, so browser voice differences would otherwise make comparison inconsistent.

### 7. Richer progress insights

**Opportunity:** Extend Progress from aggregate accuracy to actionable learning trends.

Useful views include:

- mastery by recognition, listening, recall, and production;
- due-review forecast and overdue count;
- recurring confusion pairs and frequently missed vocabulary;
- accuracy over recent sessions rather than calendar-only buckets;
- curriculum chapter progress and estimated remaining items;
- a plain-language explanation of what “mastered” means.

Avoid a single fluency score. It would imply a level of measurement the current content and data do not support.

### 8. Installable offline experience

**Opportunity:** Add a web app manifest and service worker so the app can be installed and opened without a network connection.

The offline contract should cache the application shell, curriculum, and checked-in artwork; preserve local saves across updates; identify when Japanese audio depends on browser TTS; provide an explicit refresh action for new releases; and test migration from older cached bundles.

## P3 — Optional platform expansion

### 9. Cross-device sync

**Opportunity:** Offer account-based encrypted sync as an optional alternative to manual JSON backups.

This should wait until the save schema has explicit migrations and conflict semantics. A reasonable first policy is to merge immutable answer events and take the highest durable mastery/progression state, while prompting for conflicts in settings and placement preferences. Local-only use must remain fully supported.

## Small improvements that can ship independently

- Complete the missing `konbini-bag` cultural artwork or deliberately mark it as a text-only collection entry.
- Add filters to Journal for category, mastery stage, due status, and recently mistaken items.
- Expose local audio/TTS coverage and the active provider in Settings in learner-friendly language.
- Add a session-end review list showing missed prompts and their correct answers.
- Offer a no-romaji onboarding preset while retaining the current per-setting controls.
- Add keyboard shortcuts for replay audio, submit, and continue, with an discoverable shortcut help panel.
- Give conversation scenes a “listen to the full exchange” replay after completion.
- Add a release-notes panel so local-first users can see newly added lessons and assets.

## Ideas to avoid for now

- **Coins, paid items, loot boxes, or random drops:** A dormant `coins` field exists, but an economy would conflict with the product's current progress-earned, low-pressure design.
- **Punitive streaks or Garden decay:** The Garden intentionally represents durable learning and absence currently removes nothing.
- **Unbounded AI-generated lessons:** They would bypass the validated content graph, accepted-answer contracts, and editorial quality bar.
- **Competitive leaderboards:** Current data is device-local and the learning design emphasizes personal consistency rather than comparison.
- **A second recommendation or mastery system:** New surfaces should consume the canonical engine instead of creating parallel truth.

## Suggested next milestone

**v0.9 — Cultural Discovery & Sakura's Room (implemented)**

Scope the milestone around automatic, idempotent cultural discoveries; acknowledgement; Journey discovery previews; a fixed-zone room; persistent owned-item placement; accessible text equivalents; and tests for legacy imports, duplicate prevention, and missing artwork. This is the strongest next release because it closes two intentionally prepared loops while preserving the existing learning-first philosophy.

After that, a learning-quality milestone should prioritize corrective coaching and expanded authored content before pronunciation scoring or account infrastructure.
