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

## Development

Run `npm run build` to copy the app into `dist/`. Serve the project through a local web server so browser ES modules load correctly.
