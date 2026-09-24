"""เทสหน้าเว็บจริงทั้งหน้า (24/09/2026): ภาพเส้นบางครบทุกการ์ดบนจอกว้างและซ่อนบนมือถือ, ตัวเลขหัวเว็บนับขึ้นแล้วจบที่ค่าจริง,
ลดการเคลื่อนไหวแล้วนิ่ง, ไม่มี error ในคอนโซล, ไม่มีเลื่อนข้าง ทั้งสองภาษา สองจอ สองธีม
ใช้: python3 tests/browser_page.py              เปิดเซิร์ฟเวอร์ในเครื่องให้เอง
     PF_BASE=https://patcharasitp.github.io/portfolio/ python3 tests/browser_page.py   ยิงเว็บจริง
พิสูจน์ว่าแดงเป็น (24/09): เปลี่ยนชื่อภาพ automation ใน src/art.js แล้วเทสแดง ภาพไม่ครบ ทุกจอ"""
import os, re, subprocess, sys, time, socket
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(ROOT, "src/content.js"), encoding="utf-8").read()
IDS = re.findall(r'^\s{6}id: "([^"]+)"', src, re.M)                      # ทุกผลงานต้องมีภาพ
EXPECT = re.findall(r'\{ n: "([^"]+)"', src)                             # ตัวเลขหัวเว็บตามเนื้อหาจริง
assert len(IDS) >= 5 and len(EXPECT) == 4, (IDS, EXPECT)
base, srv = os.environ.get("PF_BASE"), None
if not base:
    s = socket.socket(); s.bind(("127.0.0.1", 0)); port = s.getsockname()[1]; s.close()
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(.8)
    base = f"http://127.0.0.1:{port}/"
bad = []
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for lang in ("th", "en"):
            for w in (1440, 390):
                for dark in (False, True):
                    k = f"{lang} {w}px {'มืด' if dark else 'สว่าง'}"
                    ctx = b.new_context(viewport={"width": w, "height": 900}, color_scheme="dark" if dark else "light")
                    ctx.add_init_script(f"try{{localStorage.setItem('pf-lang','{lang}');localStorage.removeItem('pf-theme')}}catch(e){{}}")
                    pg = ctx.new_page(); errs = []
                    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None); pg.on("pageerror", lambda e: errs.append(str(e)))
                    pg.goto(base, wait_until="networkidle"); pg.wait_for_timeout(1500)
                    r = pg.evaluate("""() => ({lang: document.documentElement.lang, stats: [...document.querySelectorAll('.stat b')].map(b => b.textContent),
                        art: [...document.querySelectorAll('.proj-art')].map(e => e.closest('.proj').dataset.id),
                        seen: [...document.querySelectorAll('.proj-art')].filter(e => e.getBoundingClientRect().width > 0).length,
                        h: document.documentElement.scrollWidth - document.documentElement.clientWidth})""")
                    if r["lang"] != lang: bad.append(f"{k}: ภาษา {r['lang']}")
                    if errs: bad.append(f"{k}: error {errs[:2]}")
                    if r["h"]: bad.append(f"{k}: เลื่อนข้าง {r['h']} px")
                    if r["stats"] != EXPECT: bad.append(f"{k}: ตัวเลข {r['stats']} ไม่ใช่ {EXPECT}")
                    if sorted(r["art"]) != sorted(IDS): bad.append(f"{k}: ภาพไม่ครบ {r['art']}")
                    if r["seen"] != (len(IDS) if w > 720 else 0): bad.append(f"{k}: มองเห็นภาพ {r['seen']}")
                    ctx.close()
        ctx = b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce"); pg = ctx.new_page()
        pg.goto(base, wait_until="networkidle")
        r = pg.evaluate("""() => ({stats: [...document.querySelectorAll('.stat b')].map(b => b.textContent),
            anim: [...document.querySelectorAll('.proj-art *')].map(e => getComputedStyle(e).animationName).filter(a => a !== 'none'),
            pulse: getComputedStyle(document.querySelector('.proj-meta .live'), '::before').animationName})""")
        if r["stats"] != EXPECT or r["anim"] or r["pulse"] != "none": bad.append(f"ลดการเคลื่อนไหวแล้วยังขยับ {r}")
        ctx.close()
        ctx = b.new_context(viewport={"width": 1440, "height": 900}); pg = ctx.new_page(); pg.goto(base, wait_until="domcontentloaded")
        pg.wait_for_function("document.querySelectorAll('.stat b').length === 4")
        mid = pg.evaluate("[...document.querySelectorAll('.stat b')].map(b => b.textContent)"); pg.wait_for_timeout(1600)
        end = pg.evaluate("[...document.querySelectorAll('.stat b')].map(b => b.textContent)")
        if mid == EXPECT: bad.append("ตัวเลขไม่ได้นับขึ้น (ค่าสุดท้ายตั้งแต่แรก)")
        if end != EXPECT: bad.append(f"นับแล้วไม่จบที่ค่าจริง {end}")
        ctx.close(); b.close()
finally:
    if srv: srv.terminate()
print(f"ตรวจ {base} ผลงาน {len(IDS)} ชิ้น 8 จอ + ลดการเคลื่อนไหว + นับเลข")
for x in bad: print("  ❌", x)
print("✅ ผ่านทุกข้อ" if not bad else f"❌ เจอ {len(bad)} ข้อ"); sys.exit(1 if bad else 0)
