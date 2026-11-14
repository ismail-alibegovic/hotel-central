"""Compose images side by side with a caption per column: qa-sheet.py out.jpg img1 img2 [img3]."""
import os
import sys
from PIL import Image, ImageDraw

out, files = sys.argv[1], sys.argv[2:]
ims = [Image.open(f).convert("RGB") for f in files]
w = min(720, max(i.width for i in ims))
ims = [i.resize((w, round(i.height * w / i.width))) for i in ims]
h = min(max(i.height for i in ims), 2600)
sheet = Image.new("RGB", (len(ims) * w + (len(ims) - 1) * 12, h + 34), "#e6e2dc")
d = ImageDraw.Draw(sheet)
for k, (f, im) in enumerate(zip(files, ims)):
    x = k * (w + 12)
    sheet.paste(im.crop((0, 0, w, min(h, im.height))), (x, 34))
    d.text((x + 8, 10), os.path.basename(f).split("__")[-1].replace(".png", ""), fill="#020d10")
out = os.path.splitext(out)[0] + ".jpg"
sheet.save(out, quality=86, optimize=True)
for f in files:
    os.remove(f)
