# Nihongo Quest

A modular, browser-based Japanese learning game. Open it through a local web server so ES modules load correctly.

The app keeps progress on the current device in `localStorage`. Use **Settings & backup** to export or import a JSON save.

## Structure

- `src/data.js` — areas, grouped lessons, vocabulary, grammar, kana and scenarios
- `src/state.js` — save schema, persistence and backup helpers
- `src/engine.js` — spaced repetition, mastery, quests and achievements
- `src/app.js` — screens, sessions and interaction handling
- `src/styles.css` — responsive visual system
