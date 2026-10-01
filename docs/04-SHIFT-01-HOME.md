# Shift 01 — Home Convergence

## Goal
Bring Nihongo Quest's current Home substantially closer to the approved welcome-dashboard composition while preserving all shipped learning behavior. Deliver one stable, responsive Home baseline that can guide the later Journey shift. Complete the finite structural mismatch ledger and prove the Home actions still work.

## Project and verified baseline
- Repository: https://github.com/immviolatingskids-cell/Nihongo-Quest
- Branch: main. HEAD checked on 2026-10-01: d8312ee67dca494d7705dd9906603ebbd7e522d6 — Align Home layout with approved Nihongo Quest references.
- Reconfirm the assigned checkout's base locally. If newer work exists, preserve it and audit that actual baseline; do not reset to this historical SHA.
- This is a native ES-module browser app, not React/Vite. Primary implementation locations: src/app.js and src/styles.css; inspect related modules before changing integrations.
- Read AGENTS.md, README.md and docs/CURRENT_STATUS.md. v1.0 is shipped; this is post-v1/v1.1 refinement.
- Canonical engine/state APIs own reviews, mistakes, weakness, mastery, curriculum, prerequisites, persistence and recording. The Director is policy/orchestration. recommendNext() remains the primary Home/Journey entry point. Directed practice uses directLearning() → buildDirectedItems() → existing startSession()/question/recordAnswerResult() pipeline.

## Exact reference selection
PRIMARY: the image named **Nihongo Quest Sakura Dashboard.png**, WITHOUT a colon after Quest. It has a welcome hero showing Sakura and Kohaku, a right-hand Today's Journey recommendation card, a horizontal Your Journey strip, four pastel Review/Hiragana/Mistakes/Garden cards, and a narrow footer quote.

Reference identity: libfile_1e8babcca89c8191aac410c01663e844. This identifier is for source identification; it is not a filesystem path or an assurance a cloud task has Library access. The launch package includes a copy as references/home-welcome-dashboard.png. Inspect the pixels before auditing.

SECONDARY: **Nihongo Quest: Sakura Dashboard.png**, WITH the colon, copied as references/dashboard-hub-supporting.png. This is a four-panel Learn/Room/Shop/Sakura hub. Use it only to support shell, atmosphere, typography and art direction. Do not replace Home with that grid.

Approved runtime hero art already referenced by src/app.js: assets/characters/compositions-home-welcome.png. Locate all other runtime assets rather than inventing paths. Supporting mockups do not authorize replacing approved character identity or art.

If the primary image cannot be opened in the task, locate the equivalent approved reference in the repository or attached assets. If it remains missing, complete useful behavior checks but report visual fidelity BLOCKED; do not pretend the prose brief substitutes for the image.

## Visual target
At the reference's 1536×1024 viewport, preserve these relationships:
1. Scenic full-width header; deep navy left navigation with bilingual labels and visibly selected Home.
2. Wide welcome hero: greeting/copy on the left, Sakura/Kohaku prominent centrally, distinct dark recommendation panel on the right. The recommendation has a clear primary action and View Journey secondary action. Keep dynamic reason/commitment text readable.
3. Journey strip beneath the hero, with aligned nodes and visible state differences, balanced against scenic art. Node labels and statuses come from the real curriculum.
4. Four equal-width pastel shortcuts on desktop: pink Review, blue Hiragana, peach Mistakes, green Garden. Keep icon, heading, meaningful value/supporting text and action hierarchy consistent.
5. Narrow quote footer; coherent card radii, restrained borders/glow, scenic navy/pink atmosphere and legible text.

Reflow for mobile; do not shrink the entire desktop canvas. Artwork may crop differently to preserve controls and text. Keep meaningful text/actions in DOM rather than flattening the screen into an image. Never copy mockup names, streaks, counts, progress or unlocks as live data.

## First actions and finite ledger
Record base SHA, environment capabilities and baseline npm test result. Serve the app locally over HTTP; capture Home before changes at 1536×1024 and 390×844. Inspect the reference and current render side by side. Create docs/shifts/shift-01-home/LEDGER.md before implementing.

Limit the initial implementation queue to about 8–12 actionable groups, prioritizing structural mismatches, misleading data and broken behavior. New verified findings can be added, but must be triaged within the same goal. Do not continuously reopen minor polish.

Source-confirmed audit lead: src/app.js currently computes the displayed Hiragana "Overall mastery" percentage from the sum of correct answers modulo 100. This is not a defensible mastery display. Find and reuse the canonical kana/mastery signal and correct the label/value together, with a focused regression test. If no canonical percentage exists, present a truthful existing measure; do not invent a second mastery formula. Audit the "Mostly yesterday's vocabulary" and "Your garden is growing!" claims against the actual fresh/returning state rather than assuming they are accurate. These are inspection leads, not claims that browser regressions have already been reproduced.

## Scope
Allowed: Home composition, shell integration, responsive CSS, semantics/accessibility, truthful display of existing learning data, approved asset placement, preserving existing Home actions, and narrowly scoped repairs proven necessary for these gates. Consolidate overlapping Home CSS where it directly removes a mismatch; avoid broad stylesheet rewrites.

Deferred: Journey screen redesign, Practice redesign, Garden/Shop/Room redesign, new curriculum/audio, new economy/XP/energy, companion personality rewrite, new learning policy, save-schema migrations, framework migration, unrelated cleanup, merge/release/deploy. Verify navigation destinations without beginning their next visual milestone.

## Acceptance gates
1. Every high-priority structural Home mismatch is resolved or a justified responsive/product adaptation is evidenced. No in-scope functional blocker remains. Final desktop composition has the five relationships above; screenshot existence alone does not pass this gate.
2. Recommendation title/reason/action and Home values derive from canonical state. No hardcoded learner outcomes, second recommendation engine, fabricated progress or navigation-based rewards.
3. Home actions work: primary recommendation/resume, View Journey, Review, Kana, Mistakes, Garden, Focus Quest entry, navigation and Settings & backup. Preserve all existing Home entry points even if their presentation differs from the mockup. Zero-item cases are truthful and safe.
4. Responsive browser checks pass at 1536×1024, 768×1024, 390×844 and 360×800: no unintended horizontal overflow, occluded controls, unreadable overlay text or navigation trap. Keyboard operation has visible focus and sensible order; reduced motion remains usable. Verify the source hero asset loads and its crop remains intentional.
5. npm test passes on the final code, with meaningful targeted regression coverage for changed data logic. Existing failing tests are recorded at baseline; unresolved required failures prevent COMPLETE.
6. Explicit production gate for this shift: run npm run build and locally serve generated dist/. Confirm runtime Home images and modules resolve and the required Home flow works there. AGENTS.md skips builds during routine audits unless the goal explicitly requests them; this brief explicitly requests this build once per final candidate, and again only if repairs invalidate it. Do not run culture/audio reports for unrelated coverage.
7. Independent Auditor reviews the frozen candidate and verifies the final repaired result. Record exact SHAs, commands/results, state fixtures, screenshot paths, remaining findings and verdict. If no Auditor task ran, Builder completion is provisional and this gate is NOT RUN.

The brief's visual/behavior acceptance gates explicitly strengthen AGENTS.md's routine DOM-presence completion shortcut. Mere element presence plus unit tests does not complete this shift.

## Cloud build portability
The inspected package.json build script invokes powershell. Check the actual environment before assuming it works. If the executable is unavailable, a small portable Node build script is permitted solely to preserve the existing copy/filter semantics and enable this explicit production gate. Do not broaden asset inclusion or change deployment configuration. Verify recursive paths, approved Home PNG inclusion, existing character exclusions and optional hosting metadata behavior. Do not manually edit dist/ or claim a hand-copied output passed npm run build. If a safe repair is not possible within the shift, report the production gate BLOCKED.

## Behavior and regression matrix
Use isolated local test profiles/fixtures; never modify a real user's save.
- Fresh learner: truthful zeros/empty states; recommendation and short practice work; opening Home changes no learning progress.
- Returning learner with due reviews: displayed due count agrees with canonical state; Review enters the established session path.
- Learner with mistakes/weak kana: values are truthful; shortcuts target the existing appropriate mode.
- Unfinished session: reload Home → Continue → same checkpoint; prior recorded answers remain intact and are not duplicated.
- Focus Quest: 2/5/10-minute options still enter canonical practice; checkpoint/reload and safe interruption remain usable.
- Journey strip: compare shown labels/statuses to canonical curriculum; no premature unlocks or decorative fake completions.
- Settings & backup: disposable export/import round trip preserves relevant progress/checkpoint; no save schema change.
- Shared shell/style smoke checks: open Journey, Practice, Garden, Shop and Room; check for visible regressions from changed shared rules.
- Final source and built render: no broken required assets, failed runtime modules or new console exceptions; keyboard and reduced-motion checks recorded.

Do not require every state at every viewport. Run the full state/action checks on desktop, core actions on mobile, and layout checks at all four widths. Cite fixtures and any sampling explicitly.

## Four-hour plan and agent coordination
Approximately four hours is a planning budget for the whole shift, not a runtime guarantee. Suggested allocation: 0–30 min baseline/ledger; 30–145 min implementation/self-checks; 145–210 min independent audit/repairs; 210–240 min final checks/report. Finish early when gates pass. At 210 minutes, stop taking new polish work. If interrupted, save a coherent incomplete checkpoint rather than hiding unfinished gates.

Agent A owns writes initially. Agent B can independently prepare against the base. At handoff, Agent A freezes and provides candidate SHA/branch/evidence. Agent B checks out that candidate in its own environment, owns bounded repair commits and records final SHA. No concurrent writes to one checkout, no automatic merging of competing branches, no assumed cross-task memory. If candidate transfer cannot happen automatically, deliver a handoff for the next Auditor task.

## Deliverables and stop
Deliver LEDGER.md, HANDOFF.md and REPORT.md under docs/shifts/shift-01-home/ plus browser screenshots or an accessible evidence artifact. The packet includes base/candidate/final SHA, branch, reference paths, before/after images at matched viewports/states, commands, reproducible fixtures and unresolved findings.

Stop when all mandatory gates pass and remaining differences are minor polish or justified adaptations. Otherwise report INCOMPLETE/BLOCKED with the exact unfinished gates. Final report: Completed; Remaining; Found outside scope; Checks; Next candidate. Recommend Journey Convergence only after Home passes; do not start it.
