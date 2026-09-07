// ── วาดหน้าเว็บจากเนื้อหาใน content.js ─────────────────────────────────────
// ทั้งเว็บเป็นไฟล์ static ไม่มีไลบรารีภายนอกสักตัว โหลดเสร็จภายในไม่กี่สิบ KB
// การสลับภาษาวาดใหม่ทั้งหน้าแทนการซ่อน/แสดงสองชุด เพื่อไม่ให้ผู้ใช้ต้องโหลด
// ข้อความสองภาษาซ้อนกันใน DOM และเพื่อให้โปรแกรมอ่านหน้าจอเห็นภาษาเดียว

import { CONTENT as C } from "./content.js";

const $ = (s) => document.querySelector(s);
const app = $("#app"), foot = $("#foot");

const el = (tag, attrs = {}, kids = []) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k === "text") n.textContent = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const c of [].concat(kids)) {
    if (c === null || c === undefined || c === false) continue;
    n.appendChild(typeof c === "object" ? c : document.createTextNode(String(c)));
  }
  return n;
};

// ── สถานะ: ภาษาและโหมดสี จำไว้ในเครื่องผู้ใช้ ─────────────────────────────
const store = {
  get(k, d) { try { return localStorage.getItem(k) || d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} },
};
let lang = store.get("pf-lang", (navigator.language || "th").startsWith("th") ? "th" : "en");
let theme = store.get("pf-theme", "");   // ว่าง = ตามการตั้งค่าเครื่อง

const t = (o) => (o && typeof o === "object" && (o.th || o.en)) ? (o[lang] ?? o.th) : o;

// ── ส่วนประกอบของหน้า ─────────────────────────────────────────────────────
const section = (id, kids) => el("section", { id }, kids);

const secHead = (title, note) =>
  el("div", { class: "sec-head" }, [el("h2", { text: title }), note ? el("p", { class: "sec-note", text: note }) : null]);

function hero() {
  const h = t(C.hero), ui = C.ui[lang];
  return el("header", { class: "hero" }, [
    el("div", { class: "hero-grid" }, [
      el("div", { class: "hero-main" }, [
        el("p", { class: "kicker", text: h.kicker }),
        el("h1", { text: h.title }),
        el("p", { class: "lead", text: h.lead }),
        el("div", { class: "cta" }, [
          el("a", { class: "btn", href: "#projects" }, ui.viewProjects),
          el("a", { class: "btn alt", href: C.meta.resume, download: true }, ui.downloadCv),
          el("a", { class: "btn alt", href: "#contact" }, ui.contact),
        ]),
      ]),
      el("img", { class: "hero-photo", src: C.meta.photo, alt: C.meta.name, width: "284", height: "351" }),
    ]),
    el("div", { class: "stats" }, C.stats.map((s) =>
      el("div", { class: "stat" }, [el("b", { text: s.n }), el("span", { text: t(s.label) })]))),
  ]);
}

const about = () => {
  const a = t(C.about);
  return section("about", [secHead(a.head), el("div", { class: "about reveal" }, a.body.map((p) => el("p", { text: p })))]);
};

// การ์ดผลงาน: ผลลัพธ์ต้องอ่านได้ทันทีโดยไม่ต้องกด เพราะงานวิจัยพบว่า recruiter
// ใช้เวลาสแกนหน้าแรกเพียง 6-7 วินาที ส่วนเคสเต็มพับไว้ให้คนที่สนใจกดอ่านต่อ
function projectCard(p) {
  const ui = C.ui[lang];
  return el("article", { class: "proj reveal" }, [
    el("p", { class: "proj-tag", text: t(p.tag) }),
    el("h3", { text: t(p.title) }),
    p.impact ? el("p", { class: "impact", text: t(p.impact) }) : null,
    el("div", { class: "proj-links" }, [
      p.live ? el("a", { class: "chip", href: p.live, target: "_blank", rel: "noopener" }, `↗ ${ui.visit}`) : null,
      p.code ? el("a", { class: "chip", href: p.code, target: "_blank", rel: "noopener" }, `< > ${ui.code}`) : null,
    ]),
    el("div", { class: "stack" }, p.stack.map((s) => el("span", { text: s }))),
    el("details", { class: "carl" }, [
      el("summary", { text: ui.readCase }),
      el("dl", {}, t(p.carl).flatMap(([k, v]) => [el("dt", { text: k }), el("dd", { text: v })])),
    ]),
  ]);
}

const projects = () =>
  section("projects", [secHead(t(C.projectsHead), t(C.projectsNote)), ...C.projects.map(projectCard)]);

const skills = () =>
  section("skills", [
    secHead(t(C.skillsHead)),
    el("div", { class: "skill-grid" }, C.skills.map((g) =>
      el("div", { class: "skill-card reveal" }, [
        el("h3", { text: t(g.group) }),
        el("ul", {}, g.items.map((i) => el("li", { text: i }))),
      ]))),
  ]);

const experience = () =>
  section("experience", [
    secHead(t(C.expHead)),
    ...C.experience.map((e) =>
      el("div", { class: "item reveal" }, [
        el("div", { class: "item-when", text: t(e.period) }),
        el("div", {}, [
          el("h3", { text: t(e.role) }),
          el("p", { class: "org", text: `${e.org} · ${t(e.place)}` }),
          el("ul", {}, t(e.points).map((p) => el("li", { text: p }))),
        ]),
      ])),
  ]);

const education = () =>
  section("education", [
    secHead(t(C.eduHead)),
    ...C.education.map((e) =>
      el("div", { class: "item reveal" }, [
        el("div", { class: "item-when", text: e.period }),
        el("div", {}, [
          el("h3", { text: t(e.degree) }),
          el("p", { class: "org", text: t(e.org) }),
          el("p", { class: "note", text: t(e.note) }),
        ]),
      ])),
  ]);

function contact() {
  const c = t(C.contact);
  const mail = `mailto:${C.meta.email}`;
  return section("contact", [
    el("div", { class: "contact-box reveal" }, [
      el("h2", { text: c.head }),
      el("p", { text: c.body }),
      el("div", { class: "contact-links" }, [
        el("a", { class: "btn", href: mail }, `✉ ${C.meta.email}`),
        el("a", { class: "btn alt", href: C.meta.github, target: "_blank", rel: "noopener" }, "GitHub"),
        el("a", { class: "btn alt", href: C.meta.resume, download: true }, C.ui[lang].downloadCv),
      ]),
    ]),
  ]);
}

// ── วาดใหม่ทั้งหน้า ────────────────────────────────────────────────────────
function render() {
  document.documentElement.lang = lang;
  app.replaceChildren(hero(), about(), projects(), skills(), experience(), education(), contact());
  foot.replaceChildren(
    el("p", { text: `© ${new Date().getFullYear()} ${C.meta.name} · ${t(C.meta.location)}` })
  );
  $("#lang").textContent = C.ui[lang].langBtn;
  syncThemeBtn();
  observeReveal();
}

function syncThemeBtn() {
  const dark = theme === "dark" ||
    (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  $("#theme").textContent = dark ? "☀" : "☾";
  $("#theme").title = dark ? C.ui[lang].themeLight : C.ui[lang].themeDark;
}

// เผยเนื้อหาเมื่อเลื่อนถึง — ถ้าเบราว์เซอร์ไม่รองรับหรือผู้ใช้ปิดการเคลื่อนไหว
// ให้แสดงทุกอย่างทันที ไม่ให้มีกรณีที่เนื้อหาหายไปเลย
function observeReveal() {
  const items = document.querySelectorAll(".reveal");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((n) => n.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
  items.forEach((n) => io.observe(n));
}

$("#lang").addEventListener("click", () => {
  lang = lang === "th" ? "en" : "th";
  store.set("pf-lang", lang);
  render();
});

$("#theme").addEventListener("click", () => {
  const dark = theme === "dark" ||
    (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  theme = dark ? "light" : "dark";
  store.set("pf-theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
  syncThemeBtn();
});

if (theme) document.documentElement.setAttribute("data-theme", theme);
render();
