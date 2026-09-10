# Sakura v0.2 milestone

## Architecture

Sakura is represented by the reusable companion module in `src/companion.js`. Learning code emits semantic events; the companion maps them to a small state vocabulary, dialogue pool, and persisted presence record. UI components read the current presence rather than owning Sakura-specific learning logic.

## Event model

The initial event vocabulary includes session start, lesson start/completion, correct and incorrect answers, answer streaks, milestone reached, session completion, and user return. Legacy aliases remain available so existing engine calls stay compatible.

## States and dialogue

Idle, welcome back, happy, encouraging, celebrating, thinking, and surprised states use existing Sakura artwork. Dialogue is structured by event and state, supports multiple short lines, and falls back to a state message. The 1.8-second cooldown prevents rapid repetitive reactions; meaningful milestones remain eligible immediately.

## Persistence and return behaviour

The existing local save is extended with `companionPresence.lastSeenDate`. On load, Sakura distinguishes a same-day greeting, a next-day return, and a return after several days. No streak punishment or analytics system is introduced.

## UI integration

The home hero, sidebar/mobile companion treatment, learning session feedback, companion profile, and lesson completion view reuse the existing visual identity and assets. Companion feedback is supplemental and never disables or covers the exercise controls.

## Verification

The project was audited for component structure, state persistence, navigation, event handling, responsive CSS, and existing Sakura assets. Static source checks confirmed all new imports and event names resolve. Run `npm run build` for the distributable copy and manually verify the primary learning, incorrect/correct answer, completion, return, and mobile flows.

## Known limitations and future hooks

Artwork states currently share the available Sakura assets and vary through labels, tone classes, and backgrounds. Dialogue selection is lightweight in-memory randomness. The event boundary is ready for future quests, focus sessions, garden progression, rewards, and adaptive learning without coupling those systems to exercise components.
