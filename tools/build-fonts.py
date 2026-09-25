#!/usr/bin/env python3
"""สร้างฟอนต์ Sarabun ฉบับย่อ (woff2) ให้มีเฉพาะตัวอักษรที่เว็บนี้ใช้จริง (25/09/2026)

ทำไมต้องมี: เดิมเว็บประกาศ font-family เป็น Sarabun แต่ไม่ได้โหลดไฟล์ คนเปิดบน Windows จึงเห็น Leelawadee UI
   ส่วนภาพที่ฟ้าตรวจในเครื่องทดสอบเป็น Sarabun เพราะเครื่องนั้นติดตั้งไว้ (วัดด้วย CDP getPlatformFontsForNode)
สูตรยกมาจาก FileKit/tools/build-fonts.py ที่ใช้จริงบน production:
   ‼️ กวาดตัวอักษรจากซอร์สจริง ไม่เดาช่วง unicode (ขาดตัวไหน ตัวนั้นตกไปฟอนต์ระบบ เห็นเป็นฟอนต์สองแบบปนกัน)
   ‼️ เก็บ GPOS/GSUB ไว้ ไม่งั้นสระและวรรณยุกต์ไทยลอยผิดตำแหน่ง

ใช้:  python3 tools/build-fonts.py <โฟลเดอร์ที่มี Sarabun-Regular.ttf Sarabun-SemiBold.ttf Sarabun-Bold.ttf>
      ไฟล์ต้นฉบับ: https://github.com/google/fonts/tree/main/ofl/sarabun (SIL Open Font License 1.1)
เพิ่มเนื้อหาที่มีตัวอักษรใหม่ ให้รันซ้ำ แล้วรัน tests/browser_fonts.py ยืนยันว่าตัวบนจอมีในฟอนต์ครบ
"""
import pathlib, sys
from fontTools.subset import Subsetter, Options
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SCAN = ["index.html", "src", "dashboard/index.html", "dashboard/charts.js", "dashboard/data"]   # ‼️ ทุกหน้าที่ใช้ฟอนต์นี้
WEIGHTS = ("Regular", "SemiBold", "Bold")      # 400 600 700 ตามที่ CSS ใช้ (650 ของปุ่มจะได้ตัว 700)


def used_chars():
    chars = set()
    for target in SCAN:
        p = ROOT / target
        for f in ([p] if p.is_file() else sorted(x for x in p.rglob("*") if x.suffix in (".js", ".json", ".html"))):
            chars |= set(f.read_text(encoding="utf-8"))
    chars |= {chr(c) for c in range(0x0E00, 0x0E80)}      # อักษรไทยทั้งบล็อก เผื่อเนื้อหาใหม่
    chars |= {chr(c) for c in range(0x20, 0x7F)}          # ASCII
    return {c for c in chars if ord(c) < 0x2500 and c.isprintable()}


def build(src, out, chars):
    font = TTFont(str(src))
    opt = Options(); opt.layout_features = ["*"]; opt.name_IDs = ["*"]; opt.notdef_outline = True
    sub = Subsetter(opt); sub.populate(text="".join(sorted(chars))); sub.subset(font)
    font.flavor = "woff2"; font.save(str(out))
    return out.stat().st_size


if __name__ == "__main__":
    src_dir = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else None
    if not src_dir or not all((src_dir / f"Sarabun-{w}.ttf").exists() for w in WEIGHTS):
        sys.exit(__doc__)
    chars = used_chars(); out_dir = ROOT / "assets/fonts"; out_dir.mkdir(parents=True, exist_ok=True)
    print(f"ตัวอักษรที่เว็บใช้จริง รวมที่เผื่อไว้ {len(chars)} ตัว")
    for w in WEIGHTS:
        print(f"  Sarabun-{w}.woff2  {build(src_dir / f'Sarabun-{w}.ttf', out_dir / f'Sarabun-{w}.woff2', chars):,} bytes")
