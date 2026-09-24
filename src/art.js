// ── ภาพเส้นบางประจำผลงาน (พี่ปอนด์ให้ทำต่อ 24/09/2026 จากทางเลือก Q2) ─────────────
// แต่ละภาพเล่าแก่นของผลงานนั้นในกรอบ 150x96 ใช้สีเส้นจาง + สีเน้นของเว็บสีเดียว วนทุก 8 วินาที
// ท่าขยับอยู่ใน CSS ของ index.html ใต้ prefers-reduced-motion: no-preference เท่านั้น
// คนที่ตั้งลดการเคลื่อนไหวจะเห็นภาพสุดท้ายนิ่ง ๆ (เส้นวาดครบ แท่งเต็ม) และจอแคบกว่า 720 px ไม่แสดงภาพ
const dots = (pts, cls = "dot") =>
  pts.map(([x, y], i) => `<circle class="${cls}" cx="${x}" cy="${y}" r="2.6" style="animation-delay:${(i * .16).toFixed(2)}s"/>`).join("");

export const ART = {
  // จุดความพึงพอใจเรียงลงเมื่อแก้ช้าลง แล้วเส้นแนวโน้มวาดตาม
  "bkk-complaints": `<path class="ax" d="M14 8V82H142"/>
    ${dots([[26, 22], [42, 29], [58, 36], [76, 45], [94, 53], [112, 61], [130, 70]])}
    <path class="acc draw" pathLength="1" d="M22 18C58 30 92 48 136 74"/>`,
  // สองหน้าต่างในกรอบประ ไฟล์ขยับอยู่ในเครื่องไม่ออกนอกกรอบ กับผังเล็กที่วาดตัวเอง
  "kit-family": `<rect class="ax" x="4" y="4" width="142" height="88" rx="9" stroke-dasharray="3 4"/>
    <rect class="win" x="14" y="16" width="56" height="64" rx="5"/><path class="win" d="M14 27H70"/>
    <g class="file"><path class="acc" d="M34 36h11l7 7v17H34z"/><path class="acc" d="M45 36v7h7"/></g>
    <rect class="win" x="80" y="16" width="56" height="64" rx="5"/><path class="win" d="M80 27H136"/>
    <path class="acc draw" pathLength="1" d="M90 36h16v9H90zM98 45v7M90 52h16v9H90zM106 56.5h6M112 52h16v9h-16z"/>`,
  // เครื่องซักถังหมุน กับแท่งรายได้รายวันที่โตขึ้นทีละแท่ง
  "laundromat": `<rect class="win" x="14" y="12" width="52" height="70" rx="6"/><path class="win" d="M14 26H66"/>
    <circle class="win" cx="56" cy="19" r="2.5"/><circle class="win" cx="40" cy="54" r="17"/>
    <circle class="acc spin" cx="40" cy="54" r="11" stroke-dasharray="4 5"/>
    <path class="ax" d="M80 82H142"/>
    ${[[84, 18], [98, 30], [112, 24], [126, 40]].map(([x, h], i) =>
      `<rect class="bar" x="${x}" y="${82 - h}" width="9" height="${h}" rx="1.5" style="animation-delay:${(i * .16).toFixed(2)}s"/>`).join("")}`,
  // ตารางที่มีแถวซ้ำ แถวซ้ำจางหาย ผ่านฟังก์ชัน ได้ตารางสะอาด
  "pqframework": `<rect class="win" x="8" y="14" width="56" height="68" rx="4"/><path class="win" d="M8 25H64"/>
    <path class="ax" d="M14 35H58M14 55H58M14 75H58"/><path class="acc dup" d="M14 45H58M14 65H58"/>
    <path class="acc" d="M69 48H82M78 44L82 48L78 52"/>
    <rect class="win" x="88" y="24" width="54" height="48" rx="4"/><path class="win" d="M88 35H142"/>
    <path class="acc draw" pathLength="1" d="M94 45H136M94 55H136M94 65H136"/>`,
  // สามขั้นของงานอัตโนมัติ (ดึงเว็บ เงื่อนไข เอกสาร) มีจุดข้อมูลวิ่งผ่านทีละขั้น
  "automation": `<rect class="win" x="10" y="36" width="30" height="24" rx="5"/><rect class="win" x="60" y="36" width="30" height="24" rx="5"/>
    <rect class="win" x="110" y="36" width="30" height="24" rx="5"/><path class="ax" d="M40 48H60M90 48H110"/>
    <circle class="acc" cx="25" cy="48" r="5"/><path class="acc" d="M20 48H30M25 43C22 46 22 50 25 53C28 50 28 46 25 43"/>
    <path class="acc" d="M75 42L81 48L75 54L69 48Z"/><path class="acc" d="M120 41h7l4 4v10h-11z"/>
    <circle class="dot pkt" cx="40" cy="48" r="3"/>`,
};

export const artSvg = (id) => ART[id] ? `<svg viewBox="0 0 150 96" aria-hidden="true" focusable="false">${ART[id]}</svg>` : "";
