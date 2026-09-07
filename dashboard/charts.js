// ── กราฟทั้งหมดของหน้า วาดด้วย Vega-Lite ───────────────────────────────────
// โหลดไลบรารี Vega (รวมกันราว 800 KB) เมื่อผู้ใช้เลื่อนใกล้กราฟตัวแรกเท่านั้น
// หน้าจึงเปิดเร็วเหมือนหน้าเนื้อหาธรรมดา แล้วค่อยเติมกราฟทีหลัง

const $ = (s) => document.querySelector(s);
const fmt = (n) => Number(n).toLocaleString("th-TH");
const D = "data/";

const load = (f) => fetch(D + f).then((r) => r.json());
const state = {};

// ── ธีมของกราฟ ต้องเปลี่ยนตามโหมดสีของหน้า ────────────────────────────────
const isDark = () =>
  document.documentElement.dataset.theme === "dark" ||
  (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);

const themeConfig = () => {
  const dark = isDark();
  const text = dark ? "#b4b4ad" : "#4a4a46";
  const grid = dark ? "#2f2f2c" : "#e9e9e6";
  return {
    background: "transparent",
    font: "Sarabun, sans-serif",
    axis: { labelColor: text, titleColor: text, gridColor: grid, domainColor: grid,
            tickColor: grid, labelFontSize: 12, titleFontSize: 12.5, titleFontWeight: 600 },
    legend: { labelColor: text, titleColor: text, labelFontSize: 12, titleFontSize: 12 },
    view: { stroke: null },
    title: { color: text },
  };
};

const ACCENT = () => (isDark() ? "#93b4ff" : "#1d4ed8");
const WARN   = () => (isDark() ? "#fb923c" : "#c2410c");

// ── สร้าง spec ของแต่ละกราฟ ────────────────────────────────────────────────
const specs = {
  hist: () => ({
    width: "container", height: 260,
    data: { values: state.hist },
    layer: [
      { mark: { type: "bar", color: ACCENT(), opacity: .85 },
        encoding: {
          x: { field: "h", type: "quantitative", bin: { binned: true, step: 15 },
               title: "เวลาที่ใช้ปิดเรื่อง (ชั่วโมง)", axis: { format: "d" } },
          x2: { field: "h2" },
          y: { field: "n", type: "quantitative", title: "จำนวนเรื่อง" },
          tooltip: [{ field: "h", title: "ตั้งแต่ (ชม.)" }, { field: "n", title: "จำนวนเรื่อง", format: "," }],
        } },
      { mark: { type: "rule", color: WARN(), strokeWidth: 2, strokeDash: [5, 4] },
        data: { values: [{ v: state.summary.median_h, l: "มัธยฐาน" }] },
        encoding: { x: { field: "v", type: "quantitative" } } },
      { mark: { type: "rule", color: WARN(), strokeWidth: 2, opacity: .5 },
        data: { values: [{ v: state.summary.mean_h, l: "ค่าเฉลี่ย" }] },
        encoding: { x: { field: "v", type: "quantitative" } } },
    ],
  }),

  map: () => ({
    width: "container", height: 460,
    data: { values: state.geo.features },
    transform: [{ lookup: "properties.district",
      from: { data: { values: state.districts }, key: "district",
              fields: ["median_h", "total", "pct_done", "open"] } }],
    projection: { type: "mercator" },
    mark: { type: "geoshape", stroke: isDark() ? "#141414" : "#ffffff", strokeWidth: .8 },
    encoding: {
      color: { field: "median_h", type: "quantitative", title: "ชั่วโมง (มัธยฐาน)",
               scale: { scheme: "yelloworangered" },
               legend: { orient: "top-right", direction: "horizontal", gradientLength: 130 } },
      tooltip: [
        { field: "properties.district", type: "nominal", title: "เขต" },
        { field: "median_h", type: "quantitative", title: "ปิดเรื่อง (ชม.)", format: ".0f" },
        { field: "total", type: "quantitative", title: "เรื่องทั้งหมด", format: "," },
        { field: "pct_done", type: "quantitative", title: "ปิดแล้ว (%)", format: ".1f" },
        { field: "open", type: "quantitative", title: "ยังค้าง", format: "," },
      ],
    },
  }),

  quad: () => ({
    width: "container", height: 380,
    data: { values: state.districts },
    layer: [
      { mark: { type: "circle", size: 130, opacity: .8, color: ACCENT() },
        encoding: {
          x: { field: "total", type: "quantitative", title: "จำนวนเรื่องที่รับแจ้ง" },
          y: { field: "median_h", type: "quantitative", title: "เวลาปิดเรื่อง มัธยฐาน (ชม.)" },
          size: { field: "open", type: "quantitative", title: "งานค้าง", scale: { range: [40, 700] } },
          tooltip: [
            { field: "district", title: "เขต" },
            { field: "total", title: "เรื่องทั้งหมด", format: "," },
            { field: "median_h", title: "ปิดเรื่อง (ชม.)", format: ".0f" },
            { field: "open", title: "ยังค้าง", format: "," },
            { field: "star", title: "ดาวเฉลี่ย", format: ".2f" },
          ],
        } },
      { mark: { type: "text", fontSize: 11.5, fontWeight: 500, color: isDark() ? "#e6e6e1" : "#1a1a18" },
        transform: [
          { filter: "datum.total > 1600 || datum.median_h > 140 || datum.median_h < 48" },
          { calculate: "datum.total > 2500 ? 'right' : 'left'", as: "al" },
          { calculate: "datum.total > 2500 ? -11 : 11", as: "ox" },
        ],
        encoding: {
          x: { field: "total", type: "quantitative" },
          y: { field: "median_h", type: "quantitative" },
          text: { field: "district" },
          xOffset: { field: "ox", type: "quantitative" },
          yOffset: { value: -13 },
        } },
    ],
  }),

  type: () => ({
    width: "container", height: 400,
    data: { values: state.types.slice(0, 20) },
    layer: [
      { mark: { type: "circle", opacity: .78, color: ACCENT() },
        encoding: {
          x: { field: "median_h", type: "quantitative", title: "เวลาปิดเรื่อง มัธยฐาน (ชม.)" },
          y: { field: "pct_done", type: "quantitative", title: "ปิดได้แล้ว (%)" },
          size: { field: "total", type: "quantitative", title: "จำนวนเรื่อง", scale: { range: [60, 1100] } },
          tooltip: [
            { field: "type", title: "ประเภท" },
            { field: "total", title: "จำนวนเรื่อง", format: "," },
            { field: "median_h", title: "ปิดเรื่อง (ชม.)", format: ".0f" },
            { field: "pct_done", title: "ปิดแล้ว (%)", format: ".1f" },
          ],
        } },
      { mark: { type: "text", align: "left", dx: 11, fontSize: 11.5, color: isDark() ? "#e6e6e1" : "#1a1a18" },
        transform: [{ filter: "datum.total > 1700 || datum.median_h > 130 || datum.pct_done > 82" }],
        encoding: {
          x: { field: "median_h", type: "quantitative" },
          y: { field: "pct_done", type: "quantitative" },
          text: { field: "type" },
        } },
    ],
  }),

  // กราฟแท่งต้องเริ่มจากศูนย์เสมอ ไม่งั้นความต่างถูกขยายเกินจริง แต่ช่วงคะแนนจริง
  // อยู่ระหว่าง 3.7-4.4 ซึ่งถ้าเริ่มจากศูนย์จะแทบไม่เห็นความต่าง จึงใช้แบบ lollipop
  // (เส้น + จุด) ที่ตัดแกนได้โดยไม่บิดเบือนการรับรู้ขนาด
  star: () => ({
    width: "container", height: 300,
    data: { values: state.star },
    encoding: {
      x: { field: "bucket", type: "nominal", title: "เวลาที่ใช้ปิดเรื่อง",
           sort: state.star.map((d) => d.bucket), axis: { labelAngle: 0, labelFontSize: 12.5 } },
      y: { field: "star", type: "quantitative", title: "คะแนนความพอใจเฉลี่ย (ดาว)",
           scale: { domain: [3.6, 4.45], nice: false, clamp: true } },
    },
    layer: [
      { mark: { type: "rule", color: ACCENT(), opacity: .35, strokeWidth: 2 },
        encoding: { y: { datum: 3.6 }, y2: { field: "star" } } },
      { mark: { type: "point", filled: true, size: 260, color: ACCENT(), opacity: .95 },
        encoding: { tooltip: [
          { field: "bucket", title: "กลุ่ม" },
          { field: "star", title: "ดาวเฉลี่ย", format: ".2f" },
          { field: "n", title: "จำนวนที่ให้คะแนน", format: "," }] } },
      { mark: { type: "text", dy: -18, fontSize: 13, fontWeight: 600,
                color: isDark() ? "#e6e6e1" : "#1a1a18" },
        encoding: { text: { field: "star", type: "quantitative", format: ".2f" } } },
    ],
  }),

  daily: () => ({
    width: "container", height: 300,
    data: { values: state.daily },
    transform: [{ fold: ["received", "closed"], as: ["k", "v"] },
                { calculate: "datum.k === 'received' ? 'รับแจ้งเข้ามา' : 'ปิดเรื่องได้'", as: "ประเภท" }],
    mark: { type: "line", strokeWidth: 2.2, point: false, interpolate: "monotone" },
    encoding: {
      x: { field: "ts", type: "temporal", title: null },
      y: { field: "v", type: "quantitative", title: "จำนวนเรื่องต่อวัน" },
      color: { field: "ประเภท", type: "nominal", title: null,
               scale: { range: [WARN(), ACCENT()] },
               legend: { orient: "top", direction: "horizontal" } },
      tooltip: [{ field: "ts", type: "temporal", title: "วันที่", format: "%d %b" },
                { field: "ประเภท" }, { field: "v", title: "จำนวน", format: "," }],
    },
  }),
};

// ── วาด/วาดใหม่ทุกกราฟ (เรียกซ้ำได้เมื่อสลับโหมดสี) ────────────────────────
const MOUNTS = { hist: "#c-hist", map: "#c-map", quad: "#c-quad", type: "#c-type", star: "#c-star", daily: "#c-daily" };

async function drawAll() {
  const cfg = themeConfig();
  for (const [key, sel] of Object.entries(MOUNTS)) {
    const node = $(sel);
    if (!node) continue;
    try {
      node.textContent = "";
      node.classList.remove("chart-skeleton");
      node.style.display = "block";
      node.style.width = "100%";
      await vegaEmbed(node, { ...specs[key](), config: cfg, autosize: { type: "fit-x", contains: "padding" } },
        { actions: false, renderer: "canvas" });
    } catch (e) {
      node.textContent = "แสดงกราฟไม่สำเร็จ: " + e.message;
      console.error(key, e);
    }
  }
}

// ── ข้อความสรุปที่ผูกกับตัวเลขจริง ไม่ hardcode ───────────────────────────
function fillText() {
  const s = state.summary, d = state.districts, t = state.types;
  const days = (h) => (h / 24).toFixed(1);

  $("#src").innerHTML =
    `ข้อมูล: <a href="https://data.bangkok.go.th/en/dataset/traffy-fondue" target="_blank" rel="noopener">Traffy Fondue ของกรุงเทพมหานคร</a> ` +
    `· ช่วง ${s.range[0]} ถึง ${s.range[1]} · ${fmt(s.total)} เรื่อง · วิเคราะห์ด้วย Python (pandas) แสดงผลด้วย Vega-Lite`;

  $("#kpis").innerHTML = [
    [`${fmt(s.total)}`, "เรื่องร้องเรียนที่วิเคราะห์", `${s.districts} เขต · ${s.types} ประเภท`],
    [`${s.pct_done}%`, "ปิดเรื่องได้แล้ว", `ยังค้างอีก ${fmt(s.open)} เรื่อง`],
    [`${days(s.median_h)} วัน`, "เวลาปิดเรื่อง (มัธยฐาน)", `ค่าเฉลี่ย ${days(s.mean_h)} วัน`],
    [`${s.star_avg}`, "คะแนนความพอใจเฉลี่ย", `จาก ${fmt(s.star_n)} คนที่ให้คะแนน`],
  ].map(([b, sp, sm]) => `<div class="kpi"><b>${b}</b><span>${sp}</span><small>${sm}</small></div>`).join("");

  const fast = [...d].filter((x) => x.total >= 300).sort((a, b) => a.median_h - b.median_h);
  const slow = fast[fast.length - 1], quick = fast[0];

  $("#n-hist").innerHTML =
    `<b>ครึ่งหนึ่งของเรื่องปิดได้ภายใน ${days(s.median_h)} วัน</b> แต่ค่าเฉลี่ยอยู่ที่ ${days(s.mean_h)} วัน ` +
    `เพราะ 10% ที่ช้าที่สุดใช้เวลาเกิน ${days(s.p90_h)} วัน · ` +
    `ถ้าตั้งเป้าหมายจากค่าเฉลี่ย ทีมที่ทำงานปกติจะดูเหมือนทำได้ตามเป้าทั้งที่ยังมีงานค้างจริงอยู่มาก`;

  $("#n-map").innerHTML =
    `เร็วที่สุดคือ<b>${quick.district}</b> ที่ ${quick.median_h.toFixed(0)} ชั่วโมง ` +
    `ส่วนช้าที่สุดคือ<b>${slow.district}</b> ที่ ${slow.median_h.toFixed(0)} ชั่วโมง ` +
    `— ต่างกัน ${(slow.median_h / quick.median_h).toFixed(1)} เท่า (นับเฉพาะเขตที่มีอย่างน้อย 300 เรื่อง)`;

  const top = [...d].sort((a, b) => b.total - a.total)[0];
  const heavySlow = [...d].filter((x) => x.total >= 1000 && x.median_h >= 120)
    .sort((a, b) => b.total - a.total).slice(0, 3).map((x) => x.district);
  $("#n-quad").innerHTML =
    `<b>${top.district}</b> รับเรื่องมากที่สุด ${fmt(top.total)} เรื่อง (ค้าง ${fmt(top.open)}) · ` +
    (heavySlow.length ? `กลุ่มที่ทั้งเรื่องเยอะและปิดช้าคือ ${heavySlow.join(" · ")} ` : "") +
    `— เขตกลุ่มนี้คือที่ที่กำลังคนเพิ่มขึ้นหนึ่งทีมน่าจะเห็นผลเร็วที่สุด`;

  const slowT = [...t].sort((a, b) => b.median_h - a.median_h)[0];
  const fastT = [...t].sort((a, b) => a.median_h - b.median_h)[0];
  const bigT = [...t].sort((a, b) => b.total - a.total)[0];
  $("#n-type").innerHTML =
    `แจ้งบ่อยที่สุดคือ<b>${bigT.type}</b> (${fmt(bigT.total)} เรื่อง) แต่ประเภทที่ใช้เวลานานที่สุดคือ` +
    `<b>${slowT.type}</b> ที่ ${slowT.median_h.toFixed(0)} ชั่วโมง และปิดได้เพียง ${slowT.pct_done}% ` +
    `ขณะที่<b>${fastT.type}</b> ปิดได้ภายใน ${fastT.median_h.toFixed(0)} ชั่วโมง`;

  const st = state.star;
  const first = st[0], last = st[st.length - 1];
  $("#n-star").innerHTML =
    `เรื่องที่ปิดได้ ${first.bucket} ได้คะแนนเฉลี่ย ${first.star} ดาว ส่วนเรื่องที่ใช้เวลา${last.bucket} ` +
    `เหลือ ${last.star} ดาว — ต่างกัน ${(first.star - last.star).toFixed(2)} ดาว ` +
    `<b>ความเร็วในการปิดเรื่องจึงเป็นตัวแปรที่จับต้องได้ที่สุดต่อความพอใจ</b>`;

  const inSum = state.daily.reduce((a, x) => a + x.received, 0);
  const outSum = state.daily.reduce((a, x) => a + x.closed, 0);
  const gapDays = state.daily.filter((x) => x.received > x.closed).length;
  $("#n-daily").innerHTML =
    `ในช่วงที่วิเคราะห์ รับเข้า ${fmt(inSum)} เรื่อง ปิดได้ ${fmt(outSum)} เรื่อง ` +
    `และมี ${gapDays} วันจาก ${state.daily.length} วันที่รับเข้ามากกว่าปิดได้ ` +
    `· งานค้างที่เกิน 30 วันตอนนี้อยู่ที่ ${fmt(s.open_over_30d)} เรื่อง`;

  $("#cleaning").innerHTML = [
    ...(s.cleaning || []).map((c) => `<li>ตัดออก <code>${fmt(c.rows)}</code> แถว — ${c.why}</li>`),
    `<li>แก้ชื่อเขตให้ตรงกับแผนที่ราชการ (ข้อมูลสะกด “ราษฎร์บูรณะ” แต่แผนที่ใช้ “ราษฏร์บูรณะ”) จึงจับคู่ได้ครบ <code>50/50</code> เขต</li>`,
    `<li>ลดจำนวนจุดของขอบเขตแผนที่จาก <code>81,451</code> เหลือ <code>1,375</code> จุด ทำให้ไฟล์เล็กลงจาก 3.2 MB เหลือ 31 KB โดยรูปทรงยังอ่านออกเหมือนเดิม</li>`,
  ].join("");

  $("#foot").innerHTML =
    `จัดทำโดย Patcharasit Pongudom · ข้อมูลเปิดจากกรุงเทพมหานคร (Traffy Fondue) ` +
    `· ตัวเลขทั้งหมดคำนวณจากชุดข้อมูล ณ ${s.asof}`;
}

// ── โหลดข้อมูลก่อน แล้วค่อยดึงไลบรารีกราฟเมื่อใกล้ถึงกราฟตัวแรก ───────────
async function boot() {
  const [summary, districts, types, daily, star, hist, geo] = await Promise.all(
    ["summary.json", "districts.json", "types.json", "daily.json", "speed_star.json",
     "duration_hist.json", "bangkok.geojson"].map(load)
  );
  Object.assign(state, { summary, districts, types, daily, star, geo,
    hist: hist.map((d, i, a) => ({ ...d, h2: i + 1 < a.length ? a[i + 1].h : d.h + 15 })) });
  fillText();

  const inject = (src) => new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src; s.onload = res; s.onerror = () => rej(new Error("โหลดไม่สำเร็จ: " + src));
    document.head.appendChild(s);
  });
  // Vega ต้องโหลดตามลำดับ เพราะแต่ละตัวพึ่งตัวก่อนหน้า
  const libs = async () => {
    await inject("vendor/vega.min.js");
    await inject("vendor/vega-lite.min.js");
    await inject("vendor/vega-embed.min.js");
    await drawAll();
  };

  const first = $("#c-hist");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { io.disconnect(); libs(); }
    }, { rootMargin: "400px" });
    io.observe(first);
  } else libs();
}

// จอเปลี่ยนขนาด (หมุนมือถือ/ย่อหน้าต่าง) ต้องวาดใหม่ ไม่งั้นกราฟค้างความกว้างเดิม
let rz;
addEventListener("resize", () => {
  if (!window.vegaEmbed) return;
  clearTimeout(rz);
  rz = setTimeout(drawAll, 250);
});

$("#theme").addEventListener("click", () => {
  const dark = isDark();
  document.documentElement.dataset.theme = dark ? "light" : "dark";
  $("#theme").textContent = dark ? "☾" : "☀";
  try { localStorage.setItem("pf-theme", dark ? "light" : "dark"); } catch {}
  if (window.vegaEmbed) drawAll();
});

try {
  const saved = localStorage.getItem("pf-theme");
  if (saved) document.documentElement.dataset.theme = saved;
} catch {}
$("#theme").textContent = isDark() ? "☀" : "☾";

boot().catch((e) => {
  console.error(e);
  document.querySelectorAll(".chart-skeleton").forEach((n) => { n.textContent = "โหลดข้อมูลไม่สำเร็จ: " + e.message; });
});
