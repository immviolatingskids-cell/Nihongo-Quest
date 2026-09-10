# Nihongo Quest

A modular, browser-based Japanese learning game. Open it through a local web server so ES modules load correctly.

The app keeps progress on the current device in `localStorage`. Use **Settings & backup** to export or import a JSON save.

## Sakura companion

Sakura is a persistent learning companion rather than decorative artwork. The v0.2 companion system responds to session starts, lesson starts and completions, correct and incorrect answers, answer streaks, milestones, and returning users. Reactions are deliberately throttled so they support learning without interrupting it.

Companion state and dialogue are centralized in `src/companion.js`, with presence persisted through `src/state.js`. Return detection distinguishes same-day visits, next-day returns, and longer absences. See [SAKURA_V0.2.md](SAKURA_V0.2.md) for the milestone architecture, verification notes, and future extension points.

## Structure

- `src/data.js` — areas, grouped lessons, vocabulary, grammar, kana and scenarios
- `src/state.js` — save schema, persistence and backup helpers
- `src/engine.js` — spaced repetition, mastery, quests and achievements
- `src/app.js` — screens, sessions and interaction handling
- `src/companion.js` — Sakura events, states, dialogue and reaction throttling
- `src/audio.js` — canonical asset/TTS/unavailable audio boundary, preferences and diagnostics
- `src/cultural-items.js` — canonical culturally grounded object registry and validation
- `src/storekeeper.js` — Aoi-san identity, image slots and bounded dialogue registry
- `src/styles.css` — responsive visual system
- `tests/engine.test.js` — learning-engine contracts and integrity tests
- `tests/audio.test.js` — provider fallback and save compatibility tests

The v0.3 learning engine centralizes question construction, answer evaluation, progress recording, session composition, source metadata, and learning-event emission while preserving specialized grammar and conversation activities. See [docs/milestones/v0.3_LEARNING_ENGINE.md](docs/milestones/v0.3_LEARNING_ENGINE.md) for the architecture and verification record.

## Focus Quest

Focus Quest is the low-friction v0.4 study mode. From Home, choose an approximate 2-, 5-, or 10-minute session and begin immediately. The existing engine composes a short, useful batch from due reviews, recent mistakes, weak skills, reinforcement, and appropriate new material; the duration is a learning budget, not a countdown.

Focus sessions use a calm single-question layout with lightweight progress, safe interruption, and local checkpoints. Answers already recorded are never undone, and an unfinished session can be continued or safely discarded with **Start fresh**. Completion offers an optional **Keep going +2 minutes** extension, while **That’s enough for today** is always a valid finish.

Focus Quest also remembers the last selected duration, records small local session metadata, and gives Sakura a longer reaction cooldown so concentration is not interrupted. See [docs/milestones/v0.4_FOCUS_QUEST.md](docs/milestones/v0.4_FOCUS_QUEST.md) for the architecture, persistence behavior, QA notes, known limitations, and v0.5 extension points.

## Sakura Garden

The Garden turns genuine learning into visible, persistent traces. Mastered vocabulary grows blossoms, strengthened kana extends the stone path, grammar lights lanterns, curriculum chapters grow branches, and completed conversations bring songbirds. Garden level and growth are derived from the same reviews, kana, grammar, conversation, and curriculum state used by learning; selecting a session or taking time away never changes them.

The Garden screen shows the current level, transparent growth toward the next level, the next meaningful unlock, recent growth, and category contributions. Unlock notifications go through Sakura's existing event system and are protected against duplicates. See [docs/milestones/v0.5_SAKURA_GARDEN.md](docs/milestones/v0.5_SAKURA_GARDEN.md) for the progression model, persistence strategy, accessibility notes, tests, and future extension points.

## Quest Journey

Quest Journey is the v0.6 direction layer over the existing curriculum. It groups the current learning nodes into a readable path, distinguishes completed/recommended/available/locked work, explains prerequisites, and puts one deterministic “Recommended next” action on Home. An unfinished lesson can be continued from the same checkpoint, while Focus Quest remains an equally valid short alternative.

Journey recommendations use actual curriculum, review, mistake, weakness, return, and active-session state. They do not add energy, currencies, artificial progress, or a second learning engine. See [docs/milestones/v0.6_QUEST_JOURNEY.md](docs/milestones/v0.6_QUEST_JOURNEY.md) for the node model, recommendation rules, resume integrity, future audio/discovery/artwork hooks, and verification notes.

## Voices of Japan

v0.7 routes kana, vocabulary, example sentences, conversations and eligible listening questions through one canonical audio service. It prefers a checked-in asset when available, falls back to the browser's Japanese `speechSynthesis`, and fails gently when audio is unavailable. Voice, speed and listening autoplay preferences are saved with the learner's progress. Listening answers use the existing review/mastery/streak/Garden systems and reveal the transcript after answering; Focus Quest only benefits from real learning progress.

Run `npm run audio:report` for the current content coverage report. See [docs/milestones/v0.7_VOICES_OF_JAPAN.md](docs/milestones/v0.7_VOICES_OF_JAPAN.md) for the provider contract, accessibility, persistence, diagnostics, tests and extension points.

## Cultural Collection

v0.8A adds a first-class Shop foundation where learners can browse culturally grounded Japanese objects, discover them through meaningful progress hooks, hear their names through the v0.7 audio service, and acquire discovered favourites. Discovery and ownership are separate persisted states, while item metadata stays in the canonical registry. Aoi-san is the Storekeeper and Sakura remains the learning companion. The release uses replaceable placeholders and does not add an economy or final artwork.

Run `npm run culture:report` to validate the catalogue and see image/audio/placement coverage. See [docs/milestones/v0.8A_CULTURAL_COLLECTION_FOUNDATION.md](docs/milestones/v0.8A_CULTURAL_COLLECTION_FOUNDATION.md) for the registry, persistence contract, asset handoff and v0.8B plan.

## Development

Run `npm run build` to copy the app into `dist/`. Serve the project through a local web server so browser ES modules load correctly.

Run `npm test` to execute the learning-engine regression suite.
