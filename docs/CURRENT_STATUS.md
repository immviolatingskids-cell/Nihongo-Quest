# Nihongo Quest — current status

Nihongo Quest v1.0 has shipped. The current `main` branch is the post-v1 baseline and includes the adaptive-learning work from commits `2b12576` and `e43e7ba`.

The existing learning engine and state APIs remain authoritative for due reviews, weakness, mistakes, mastery, curriculum completion, prerequisites, Journey recommendations, session composition, progress recording, and persistence. The Learning Director is a small explainable policy layer: it prioritizes those canonical signals, selects a reason, and provides a safe target set for the Home recommendation. Its delivery path is `directLearning()` → `buildDirectedItems()` → the same `startSession()` / question / `recordAnswerResult()` pipeline used by normal practice. `recommendNext()` remains the single entry point for the primary Home/Journey recommendation; the Director supplies adaptive support for that entry point.

Historical milestone files retain the decisions and verification records of their original releases. New milestones should be versioned from this shipped v1.0/post-v1 baseline rather than treating v1.0 as an upcoming target.

The static build copies `index.html`, all runtime source modules/styles, and the approved asset tree recursively into `dist/`. Generated `dist/` output is disposable and should not be edited manually.
