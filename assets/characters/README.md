# Character asset handoff

The attached concept sheet is the canonical visual reference for the Mature Sakura-sensei + Kohaku redesign. Generated masters and state drafts are grouped by character; combined artwork is limited to the two UI compositions at the directory root.

## Current inventory

- `sakura/`: reference, Neutral, Encouraging, Celebrating, Thoughtful.
- `kohaku/`: reference, Neutral/sitting, Happy, Curious, Sleepy, Celebrating, Thoughtful.
- `compositions-home-welcome.png`: Home/welcome pair composition.
- `compositions-learning-return.png`: learning/return pair composition.

## Acceptance gate

PNG files remain the canonical sources. Runtime WebP derivatives must be generated only from approved PNGs after confirming `RGBA` mode and a real alpha channel; a visually simulated checkerboard is not acceptable. The current generated state drafts are intentionally not wired into runtime until that check passes. Existing Sakura runtime assets remain unchanged during this handoff.
