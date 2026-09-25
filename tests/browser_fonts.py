"""เทสฟอนต์ Sarabun ที่โหลดจากไฟล์ของเราเอง (25/09/2026)
① ตัวอักษรที่วาดจริงต้องมาจากไฟล์ที่ดาวน์โหลด (CDP getPlatformFontsForNode, isCustomFont) ไม่ใช่ฟอนต์ที่เครื่องนั้นติดตั้งไว้
   ‼️ ห้ามเชื่อ document.fonts.check() ตอบ true แม้บล็อกไฟล์ฟอนต์อยู่ (วัดซ้ำ 25/09/2026 ตรงกับคลัง Proven)
② ทุกตัวอักษรบนจอทั้งสองภาษา (กางเคสเต็มแล้ว) ต้องมีในไฟล์ฟอนต์ ยกเว้นไอคอนที่ตั้งใจให้มาจากฟอนต์ระบบ
   ตัวไหนขาด ตัวนั้นไปใช้ฟอนต์ระบบ เห็นเป็นฟอนต์สองแบบปนกัน (FileKit เคยเจอ) เพิ่มเนื้อหาแล้วแดง = รัน tools/build-fonts.py
ใช้: python3 tests/browser_fonts.py              เปิดเซิร์ฟเวอร์ในเครื่องให้เอง
     PF_BASE=https://patcharasitp.github.io/portfolio/ python3 tests/browser_fonts.py   ยิงเว็บจริง
พิสูจน์ว่าแดงเป็น: ยิงเว็บจริงก่อนแก้ (ยังไม่โหลดฟอนต์) ต้องตกข้อ ① และบล็อกไฟล์ .woff2 ในเทสนี้เองต้องตกข้อ ①"""
import os, socket, subprocess, sys, time
from fontTools.ttLib import TTFont
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICONS = set("✉☀☾↗")                      # ไอคอนที่ Sarabun ไม่มี ตั้งใจให้มาจากฟอนต์ระบบ
SEL = ["h1", ".lead", ".btn", ".proj h3", ".about p"]
cmap = set(TTFont(os.path.join(ROOT, "assets/fonts/Sarabun-Regular.woff2")).getBestCmap())

base, srv = os.environ.get("PF_BASE"), None
if not base:
    s = socket.socket(); s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]; s.close()
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    base = f"http://127.0.0.1:{port}/"; time.sleep(0.8)

def rendered(ctx, pg):
    cdp = ctx.new_cdp_session(pg); cdp.send("DOM.enable"); cdp.send("CSS.enable")
    root = cdp.send("DOM.getDocument")["root"]["nodeId"]; out = {}
    for s in SEL:
        nid = cdp.send("DOM.querySelector", {"nodeId": root, "selector": s})["nodeId"]
        out[s] = [(f["familyName"], f["isCustomFont"], f["glyphCount"]) for f in cdp.send("CSS.getPlatformFontsForNode", {"nodeId": nid})["fonts"]] if nid else None
    return out

fails, seen = [], 0
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for lang in ("th", "en"):
            ctx = b.new_context(viewport={"width": 1280, "height": 900})
            ctx.add_init_script(f"try{{localStorage.setItem('pf-lang','{lang}')}}catch(e){{}}")
            pg = ctx.new_page(); pg.goto(base, wait_until="networkidle")
            pg.evaluate("() => { document.querySelectorAll('details').forEach(d => d.open = true); document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')); }")
            pg.wait_for_timeout(800)
            for s, fonts in rendered(ctx, pg).items():
                if not fonts: fails.append(f"{lang} {s}: ไม่เจอ element"); continue
                main = max(fonts, key=lambda f: f[2])
                if main[:2] != ("Sarabun", True): fails.append(f"{lang} {s}: วาดด้วย {fonts} ไม่ใช่ Sarabun จากไฟล์ของเรา")
            text = pg.evaluate("() => document.body.innerText + document.title")
            chars = {c for c in text if not c.isspace()}; seen += len(chars)
            miss = sorted(c for c in chars if ord(c) not in cmap and c not in ICONS)
            if miss: fails.append(f"{lang} ตัวอักษรบนจอที่ไม่มีในฟอนต์ (จะไปใช้ฟอนต์ระบบ): {''.join(miss)}")
            ctx.close()
        # ข้อพิสูจน์ในตัว: บล็อกไฟล์ฟอนต์แล้วข้อ ① ต้องจับได้ ไม่งั้นเทสนี้เชื่อไม่ได้
        ctx = b.new_context(viewport={"width": 1280, "height": 900}); ctx.route("**/*.woff2", lambda r: r.abort())
        pg = ctx.new_page(); pg.goto(base, wait_until="networkidle"); pg.wait_for_timeout(500)
        if max(rendered(ctx, pg)["h1"], key=lambda f: f[2])[:2] == ("Sarabun", True): fails.append("บล็อกไฟล์ฟอนต์แล้วยังรายงานว่าเป็น Sarabun ตัวตรวจเชื่อไม่ได้")
        ctx.close(); b.close()
finally:
    if srv: srv.terminate()
print(f"ตรวจ {base} ฟอนต์ที่วาดจริง {len(SEL)} จุด x 2 ภาษา, ตัวอักษรบนจอ {seen} ตัว, ฟอนต์มี {len(cmap)} ตัว")
for f in fails: print("  ❌", f)
print("✅ วาดด้วย Sarabun จากไฟล์ของเราครบ และตัวอักษรบนจอมีในฟอนต์ทุกตัว" if not fails else f"❌ เจอ {len(fails)} ข้อ")
sys.exit(1 if fails else 0)
