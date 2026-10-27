# python3 tests/compare-sheet.py /tmp/cmp tests/evidence/compare — side-by-side sheets (left = Next.js original, right = WordPress)
import glob, os, sys
from PIL import Image, ImageDraw
src, dst = sys.argv[1], sys.argv[2]; os.makedirs(dst, exist_ok=True)
for f in sorted(glob.glob(f"{src}/*_next.png")):
    key = os.path.basename(f)[:-9]; w = int(key.rsplit('_', 1)[1])
    a = Image.open(f).convert('RGB'); b = Image.open(f.replace('_next', '_wp')).convert('RGB')
    s = 700 / w if w >= 768 else 1.0
    H = min(max(a.height, b.height), 7000)
    a = a.crop((0, 0, w, min(a.height, H))); b = b.crop((0, 0, w, min(b.height, H)))
    a = a.resize((int(w * s), int(a.height * s))); b = b.resize((int(w * s), int(b.height * s)))
    m = Image.new('RGB', (a.width + b.width + 12, max(a.height, b.height) + 22), (200, 30, 30)); m.paste(a, (0, 22)); m.paste(b, (a.width + 12, 22))
    d = ImageDraw.Draw(m); d.text((6, 5), f"{key}  |  LEFT: Next.js original ({Image.open(f).height}px)", fill='white'); d.text((a.width + 18, 5), f"RIGHT: WordPress ({Image.open(f.replace('_next','_wp')).height}px)", fill='white')
    m.save(f"{dst}/{key}.jpg", quality=42, optimize=True)
print(len(glob.glob(f"{dst}/*.jpg")), "sheets")
