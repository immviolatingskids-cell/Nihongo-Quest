"""Create non-destructive alpha/WebP candidates from generated checkerboard drafts."""
from collections import deque
from pathlib import Path
from PIL import Image
import gc

ROOT = Path(__file__).resolve().parents[1] / "assets" / "characters"
OUT = ROOT / "processed"

def clean(source: Path) -> None:
    image = Image.open(source).convert("RGBA")
    pixels = image.load()
    width, height = image.size
    queue = deque()
    seen = set()
    for x in range(width):
        queue.extend(((x, 0), (x, height - 1)))
    for y in range(height):
        queue.extend(((0, y), (width - 1, y)))
    while queue:
        x, y = queue.popleft()
        if (x, y) in seen or not (0 <= x < width and 0 <= y < height):
            continue
        seen.add((x, y))
        red, green, blue, _ = pixels[x, y]
        if max(red, green, blue) - min(red, green, blue) > 12 or not 90 <= red <= 230:
            continue
        pixels[x, y] = (red, green, blue, 0)
        queue.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
    destination = OUT / source.parent.name / source.name
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination)
    image.thumbnail((1600, 1600))
    image.save(destination.with_suffix(".webp"), "WEBP", quality=88, method=6)
    alpha_min, alpha_max = image.getchannel("A").getextrema()
    print(f"{source.relative_to(ROOT)}: RGBA, alpha range={alpha_min}-{alpha_max}")
    image.close()
    gc.collect()

if __name__ == "__main__":
    for folder in (ROOT / "sakura", ROOT / "kohaku"):
        for draft in sorted(folder.glob("*.png")):
            if "reference" not in draft.name:
                clean(draft)
