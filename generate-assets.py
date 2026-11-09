from PIL import Image

NAVY = (11, 16, 32)  # #0B1020


def trim(img):
    """Crop away transparent padding."""
    box = img.getbbox()
    return img.crop(box) if box else img


def fit(img, max_w, max_h):
    """Shrink while keeping aspect ratio."""
    img = img.copy()
    img.thumbnail((max_w, max_h), Image.LANCZOS)
    return img


def paste_center(canvas, img):
    x = (canvas.width - img.width) // 2
    y = (canvas.height - img.height) // 2
    canvas.paste(img, (x, y), img)  # img's alpha is the mask
    return canvas


icon = trim(Image.open("assets/logo-icon.png").convert("RGBA"))
full = trim(Image.open("assets/logo-full.png").convert("RGBA"))

# 1) favicon-32.png (transparent background)
fav = Image.new("RGBA", (32, 32), (0, 0, 0, 0))
fav = paste_center(fav, fit(icon, 30, 30))
fav.save("assets/favicon-32.png")

# 2) apple-touch-icon.png (solid navy, no transparency)
apple = Image.new("RGB", (180, 180), NAVY).convert("RGBA")
apple = paste_center(apple, fit(icon, 124, 124))
apple.convert("RGB").save("assets/apple-touch-icon.png")

# 3) og-image.png (1200x630, solid navy)
og = Image.new("RGB", (1200, 630), NAVY).convert("RGBA")
og = paste_center(og, fit(full, 760, 360))
og.convert("RGB").save("assets/og-image.png", optimize=True)

print("Done: favicon-32.png, apple-touch-icon.png, og-image.png")
