# Living World visual contract

This is the canonical presentation contract for illustrated Nihongo Quest locations from v0.9.2 onward. Scene presentation supports learning; it never becomes a second game engine.

## Identity and composition

- Use sakura pink/red for warmth and emphasis, indigo/navy for structure and depth, cream for readable highlights, warm wood for interiors, and restrained gold for special detail.
- Light should feel warm and atmospheric, with one legible focal region and calm negative space. Japanese-inspired details should feel specific but uncluttered.
- Backgrounds establish place and perspective. Optional atmosphere adds only a light colour or depth treatment. Optional foreground elements frame the scene without covering controls. Characters occupy a registered slot above the environment and below HTML UI.
- Essential text, dialogue, buttons, progress, labels, cultural objects, and interaction targets remain HTML or independent sprites. Never bake them into scene artwork.

## Artwork delivery

- Register approved production artwork in `src/scenes.js`; do not scatter new asset paths through view code or CSS.
- Keep a lossless source where available and serve an optimized WebP derivative at runtime. Load a scene only when its view is rendered; do not preload the registry.
- Every scene declares a focal region, text-safe region, meaningful description, fallback treatment, and desktop/tablet/mobile framing. Crops must preserve the focal subject at roughly 1440px, 768px, and 390px viewport widths.
- Decorative layers are pointer-inert and hidden from assistive technology. Independent objects need their own text equivalent. Progress may never be conveyed by artwork alone.

## Characters, depth, and motion

- A scene character slot declares identity, expression/state, anchor, scale, description, and responsive adjustment. Sakura and Aoi retain separate canonical identity/state modules even when they share rendering primitives.
- Parallax is eligible only for a clearly separated decorative foreground at very small displacement. No pointer-following motion in study flows.
- Ambient motion is CSS-first, subtle, nonessential, and limited to details such as petals, lantern sway, foliage, or light. It must be disabled by both the in-app reduced-motion class and `prefers-reduced-motion`.
- Missing artwork falls back to the registered colour treatment while leaving all HTML content usable.

## Responsive rules

- Desktop may use broad cinematic framing. Tablet tightens the focal crop and keeps controls outside high-detail regions. Mobile uses an intentionally recomposed crop, not a uniformly scaled desktop scene.
- Character scale and anchor may change by breakpoint. Text remains outside scene art unless the registered text-safe region explicitly allows an overlay.
- Interactive targets remain reachable by keyboard and touch and must not depend on visual coordinates alone; provide equivalent controls below coordinate-based scenes.
