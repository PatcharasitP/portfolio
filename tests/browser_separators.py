"""เทสกฎพี่ปอนด์ 09/09/2026: ข้อความที่คนเห็นห้ามใช้จุดกลาง · ขีดยาว — และขีดสั้น – (24/09/2026)
อ่านจากหน้าจริงทั้งสองภาษา: ข้อความบนจอ (innerText รวมเคสเต็มที่พับไว้), ชื่อแท็บ, คำอธิบายตอนแชร์ลิงก์
ใช้: python3 tests/browser_separators.py              เปิดเซิร์ฟเวอร์ในเครื่องให้เอง
     PF_BASE=https://patcharasitp.github.io/portfolio/ python3 tests/browser_separators.py   ยิงเว็บจริง
พิสูจน์ว่าแดงเป็น: ยิงเว็บจริงก่อนแก้ 24/09 ต้องตก (เว็บจริงตอนนั้นยังมี · กับ —)
25/09/2026 เพิ่มตัวที่ CSS วาด (::before ::after) เพราะ innerText มองไม่เห็น ปุ่มพับเคสเต็มตอนกางวาด "–" ด้วยฟอนต์ตัวพิมพ์ดีด
   ดูเป็นขีดยาวบนเว็บจริงมาตลอดโดยเทสนี้ผ่าน พิสูจน์: ยิงเว็บจริงก่อนแก้ต้องตกที่ ตัวที่ CSS วาด"""
import os, subprocess, sys, time, socket
from playwright.sync_api import sync_playwright
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# ตัวอักษรที่ CSS วาดเอง (content ของ ::before ::after) ไม่อยู่ใน innerText ต้องอ่านจาก computed style
PSEUDO = "[...document.querySelectorAll('*')].flatMap(e=>['::before','::after'].map(p=>{const c=getComputedStyle(e,p).content;return c&&c!=='none'&&c!=='normal'?c:''})).filter(Boolean).join('\\n')"
BAD = ("·", "—", "–")   # – ขีดสั้นก็ห้าม: ช่วงเวลาเขียนด้วยฟอนต์ตัวพิมพ์ดีด ขีดสั้นกว้างเต็มช่องดูเป็นขีดยาว (เห็นในภาพ 24/09)

def free_port():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p

base, srv = os.environ.get("PF_BASE"), None
if not base:
    port = free_port()
    srv = subprocess.Popen([sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"], cwd=ROOT,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    base = f"http://127.0.0.1:{port}/"; time.sleep(0.8)
fails, checked = [], 0
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for lang in ("th", "en"):
            ctx = b.new_context(viewport={"width": 1280, "height": 900})
            ctx.add_init_script(f"try{{localStorage.setItem('pf-lang','{lang}')}}catch(e){{}}")
            pg = ctx.new_page(); pg.goto(base, wait_until="networkidle")
            got = pg.evaluate("document.documentElement.lang")
            assert got == lang, f"ตั้งภาษา {lang} แต่หน้าขึ้น {got} เทสจะตรวจภาษาเดียวซ้ำสองรอบ"
            pg.evaluate("document.querySelectorAll('details').forEach(d=>d.open=true)")
            texts = {
                "จอ": pg.evaluate("document.body.innerText"),
                "ชื่อแท็บ": pg.title(),
                "คำอธิบาย": pg.evaluate("[...document.querySelectorAll('meta[name=description],meta[property^=\"og:\"],meta[name^=\"twitter:\"]')].map(m=>m.content).join('\\n')"),
                "ตัวที่ CSS วาด": pg.evaluate(PSEUDO),
            }
            assert len(texts["จอ"]) > 2000, f"หน้า {lang} มีข้อความแค่ {len(texts['จอ'])} ตัว วาดไม่ครบ ตรวจอะไรไม่ได้"
            for where, s in texts.items():
                checked += len(s)
                for line in s.split("\n"):
                    if any(c in line for c in BAD): fails.append(f"{lang} {where}: {line.strip()[:80]}")
            ctx.close()
        # หน้าแดชบอร์ด กทม. (ภาษาไทยอย่างเดียว) รอบ refresh 24/09 หลุดไป 18 จุด เพิ่มเข้าเทส 24/09/2026 สาย
        ctx = b.new_context(viewport={"width": 1280, "height": 900})
        pg = ctx.new_page(); pg.goto(base + "dashboard/", wait_until="networkidle")
        pg.wait_for_function("document.querySelector('#n-map') && document.querySelector('#n-map').innerText.length > 20", timeout=15000)
        texts = {
            "แดชบอร์ด จอ": pg.evaluate("document.body.innerText"),
            "แดชบอร์ด ชื่อแท็บ": pg.title(),
            "แดชบอร์ด คำอธิบาย": pg.evaluate("[...document.querySelectorAll('meta[name=description],meta[property^=\"og:\"],meta[name^=\"twitter:\"]')].map(m=>m.content).join('\\n')"),
            "แดชบอร์ด ป้ายในกราฟ": pg.evaluate("[...document.querySelectorAll('svg text')].map(t=>t.textContent).join('\\n')"),
            "แดชบอร์ด ตัวที่ CSS วาด": pg.evaluate(PSEUDO),
        }
        assert len(texts["แดชบอร์ด จอ"]) > 2000, f"แดชบอร์ดมีข้อความแค่ {len(texts['แดชบอร์ด จอ'])} ตัว วาดไม่ครบ"
        for where, s in texts.items():
            checked += len(s)
            for line in s.split("\n"):
                if any(c in line for c in BAD): fails.append(f"{where}: {line.strip()[:80]}")
        ctx.close()
        b.close()
finally:
    if srv: srv.terminate()
# กราฟแดชบอร์ดวาดบน canvas ป้ายแกนไม่อยู่ใน DOM จึงตรวจที่ข้อมูลที่ป้อนกราฟแทน (เคย "1–3 วัน")
import glob, json
for jf in sorted(glob.glob(os.path.join(ROOT, "dashboard", "data", "*.json"))):
    js = json.dumps(json.load(open(jf, encoding="utf-8")), ensure_ascii=False); checked += len(js)
    fails += [f"ข้อมูลกราฟ {os.path.basename(jf)}: {c}" for c in BAD if c in js]
readme = open(os.path.join(ROOT, "README.md"), encoding="utf-8").read()   # หน้ารีโปบน GitHub คนก็เห็น
checked += len(readme)
fails += [f"README: {l.strip()[:80]}" for l in readme.split("\n") if any(c in l for c in BAD)]
print(f"ตรวจ {checked:,} ตัวอักษร ที่ {base} กับ README.md")
for f in fails: print("  ❌", f)
print("✅ ไม่มีจุดกลางหรือขีดยาวในข้อความที่คนเห็น" if not fails else f"❌ เจอ {len(fails)} จุด")
sys.exit(1 if fails else 0)
