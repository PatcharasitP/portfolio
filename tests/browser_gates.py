"""ด่านหน้าตาเว็บจากหน้าจริง 16 ด่าน ด้วยตัววัดกลาง Scripts/ui_gates (25/09/2026)
เลื่อนแนวนอน, คอนทราสต์, ปุ่มตกบรรทัด, ปุ่มสูงไม่เท่ากัน, ตัวคั่น · — – ทั้งตัวหนังสือและตัวที่ CSS วาด, ไทยถ่างเกิน
ไทย line-height ต่ำ, โฟกัสมองไม่เห็น และอื่น ๆ วัด 8 ความกว้าง x 2 ภาษา x 2 ธีม
ใช้: python3 tests/browser_gates.py              เปิดเซิร์ฟเวอร์ในเครื่องให้เอง
     PF_BASE=https://patcharasitp.github.io/portfolio/ python3 tests/browser_gates.py   ยิงเว็บจริง
พิสูจน์ว่าแดงเป็น (25/09/2026): ยิงเว็บจริงก่อนแก้ ต้องแดงที่ปุ่มอีเมลจอ 320, ไทยถ่าง 0.08em และขีดที่ CSS วาดตอนกางเคสเต็ม
‼️ ตัววัดอยู่นอกรีโปนี้ (Scripts/ui_gates ใน workspace) ไม่เจอ = ตก ไม่ข้ามเงียบ"""
import os, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GATES = os.path.join(os.path.dirname(ROOT), "Scripts", "ui_gates", "gates.py")
if not os.path.exists(GATES):
    sys.exit(f"❌ ไม่พบตัววัดกลางที่ {GATES} เทสนี้ต้องรันใน workspace ที่มี Scripts/ui_gates")
target = [os.environ["PF_BASE"]] if os.environ.get("PF_BASE") else ["--root", ROOT]
cmd = [sys.executable, GATES, "site", *target, "--lang-key", "pf-lang", "--langs", "th,en", "--theme-key", "pf-theme"]
sys.exit(subprocess.run(cmd).returncode)
