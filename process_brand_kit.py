#!/usr/bin/env python3
"""Process NextCore-Brand-Kit.zip into a small set of web lockups.

Does not copy the kit wholesale. The master board PNG is cropped and matted
into transparent mark / lockup / dark-nav derivatives for GitHub and Pages.
"""

from __future__ import annotations

import hashlib
import zipfile
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageFilter

KIT = Path(r"C:\Users\Admin\Documents\ChatGPT\26x86darwin\NextCore-Brand-Kit.zip")
BOARD_MEMBER = "NextCore-Brand-Kit/profile/assets/nextcore-brand-board.png"
OUT = Path(__file__).resolve().parent / "assets"

LOCKUP = (64, 271, 64 + 1320, 271 + 310)
COMPACT = (50, 790, 455, 950)
NAV = (510, 794, 1412, 920)
INK = (19, 26, 36, 255)
PAPER = (246, 247, 249, 255)


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def load_board() -> tuple[Image.Image, bytes]:
    with zipfile.ZipFile(KIT) as archive:
        data = archive.read(BOARD_MEMBER)
    return Image.open(BytesIO(data)).convert("RGBA"), data


def strip_paper(img: Image.Image, threshold: int = 248) -> Image.Image:
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if alpha and red >= threshold and green >= threshold and blue >= threshold:
                pixels[x, y] = (red, green, blue, 0)
    return rgba


def trim(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    return img.crop(bbox) if bbox else img


def ink_to_paper(img: Image.Image) -> Image.Image:
    """Recolor Core Ink glyphs to Paper while keeping pink and anti-alias."""
    rgba = img.convert("RGBA")
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if not alpha:
                continue
            if red > 160 and green < 140 and blue > 60 and red > green + 20:
                continue
            luminance = 0.299 * red + 0.587 * green + 0.114 * blue
            strength = (255.0 - luminance) / 255.0
            pixels[x, y] = (246, 247, 249, max(0, min(255, int(alpha * strength))))
    return rgba


def pink_bounds(img: Image.Image) -> tuple[int, int, int, int]:
    pixels = img.load()
    width, height = img.size
    min_x, min_y, max_x, max_y = width, height, 0, 0
    for y in range(height):
        for x in range(width):
            red, green, blue, alpha = pixels[x, y]
            if not alpha:
                continue
            if red > 160 and green < 140 and blue > 60 and red > green + 20:
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    if max_x < min_x:
        raise SystemExit("pink mark not found in lockup")
    return min_x, min_y, max_x + 1, max_y + 1


def square_pad(img: Image.Image, pad_ratio: float = 0.16) -> Image.Image:
    trimmed = trim(img)
    side = max(trimmed.size)
    pad = int(round(side * pad_ratio))
    canvas_side = side + pad * 2
    canvas = Image.new("RGBA", (canvas_side, canvas_side), (0, 0, 0, 0))
    ox = (canvas_side - trimmed.width) // 2
    oy = (canvas_side - trimmed.height) // 2
    canvas.paste(trimmed, (ox, oy), trimmed)
    return canvas


def fit_on(img: Image.Image, size: tuple[int, int], fill: tuple[int, int, int, int], scale: float = 0.72) -> Image.Image:
    canvas = Image.new("RGBA", size, fill)
    ratio = min((size[0] * scale) / img.width, (size[1] * scale) / img.height)
    new_size = (max(1, int(img.width * ratio)), max(1, int(img.height * ratio)))
    fitted = img.resize(new_size, Image.LANCZOS)
    ox = (size[0] - fitted.width) // 2
    oy = (size[1] - fitted.height) // 2
    canvas.paste(fitted, (ox, oy), fitted)
    return canvas


def save(img: Image.Image, name: str) -> None:
    path = OUT / name
    img.save(path, "PNG", optimize=True)
    print(f"wrote {path.name} {path.stat().st_size} {img.size}")


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    board, raw = load_board()
    print("board", sha256(raw), board.size)

    (OUT / "nextcore-brand-board.png").write_bytes(raw)

    lockup = strip_paper(board.crop(LOCKUP))
    lockup = trim(lockup)
    save(lockup, "lockup-ink.png")
    lockup_white = ink_to_paper(lockup)
    save(lockup_white, "lockup-white.png")

    mx0, my0, mx1, my1 = pink_bounds(lockup)
    mark = square_pad(lockup.crop((mx0, my0, mx1, my1)))
    save(mark.resize((512, 512), Image.LANCZOS), "mark.png")
    save(mark.resize((64, 64), Image.LANCZOS), "favicon.png")
    save(fit_on(mark, (512, 512), INK, 0.78), "mark-on-ink.png")
    save(fit_on(mark, (512, 512), PAPER, 0.78), "mark-on-paper.png")

    compact = strip_paper(board.crop(COMPACT))
    compact = trim(compact)
    save(compact, "lockup-compact-ink.png")
    save(ink_to_paper(compact), "lockup-compact-white.png")

    nav = board.crop(NAV)
    save(nav, "nav-dark.png")

    save(fit_on(lockup_white, (1600, 900), INK, 0.78), "hero.png")
    save(fit_on(lockup_white, (1200, 630), INK, 0.82), "og.png")
    save(fit_on(compact, (1200, 675), PAPER, 0.78), "card-lockup.png")
    save(fit_on(mark, (1200, 675), INK, 0.62), "card-mark.png")
    nav_card = Image.new("RGBA", (1200, 675), INK)
    nav_scaled = nav.copy()
    ratio = min(1100 / nav_scaled.width, 420 / nav_scaled.height)
    nav_scaled = nav_scaled.resize(
        (max(1, int(nav_scaled.width * ratio)), max(1, int(nav_scaled.height * ratio))),
        Image.LANCZOS,
    )
    nav_card.paste(
        nav_scaled,
        ((1200 - nav_scaled.width) // 2, (675 - nav_scaled.height) // 2),
        nav_scaled,
    )
    save(nav_card.filter(ImageFilter.SMOOTH), "card-nav.png")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
