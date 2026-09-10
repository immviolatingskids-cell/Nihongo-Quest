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
- `src/styles.css` — responsive visual system
- `tests/engine.test.js` — learning-engine contracts and integrity tests

The v0.3 learning engine centralizes question construction, answer evaluation, progress recording, session composition, source metadata, and learning-event emission while preserving specialized grammar and conversation activities. See [docs/milestones/v0.3_LEARNING_ENGINE.md](docs/milestones/v0.3_LEARNING_ENGINE.md) for the architecture and verification record.

## Focus Quest

Focus Quest is the low-friction v0.4 study mode. From Home, choose an approximate 2-, 5-, or 10-minute session and begin immediately. The existing engine composes a short, useful batch from due reviews, recent mistakes, weak skills, reinforcement, and appropriate new material; the duration is a learning budget, not a countdown.

Focus sessions use a calm single-question layout with lightweight progress, safe interruption, and local checkpoints. Answers already recorded are never undone, and an unfinished session can be continued or safely discarded with **Start fresh**. Completion offers an optional **Keep going +2 minutes** extension, while **That’s enough for today** is always a valid finish.

Focus Quest also remembers the last selected duration, records small local session metadata, and gives Sakura a longer reaction cooldown so concentration is not interrupted. See [docs/milestones/v0.4_FOCUS_QUEST.md](docs/milestones/v0.4_FOCUS_QUEST.md) for the architecture, persistence behavior, QA notes, known limitations, and v0.5 extension points.

## Sakura Garden

The Garden turns genuine learning into visible, persistent traces. Mastered vocabulary grows blossoms, strengthened kana extends the stone path, grammar lights lanterns, curriculum chapters grow branches, and completed conversations bring songbirds. Garden level and growth are derived from the same reviews, kana, grammar, conversation, and curriculum state used by learning; selecting a session or taking time away never changes them.

The Garden screen shows the current level, transparent growth toward the next level, the next meaningful unlock, recent growth, and category contributions. Unlock notifications go through Sakura's existing event system and are protected against duplicates. See [docs/milestones/v0.5_SAKURA_GARDEN.md](docs/milestones/v0.5_SAKURA_GARDEN.md) for the progression model, persistence strategy, accessibility notes, tests, and future extension points.

## Development

Run `npm run build` to copy the app into `dist/`. Serve the project through a local web server so browser ES modules load correctly.

Run `npm test` to execute the learning-engine regression suite.
