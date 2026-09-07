// ── เนื้อหาทั้งเว็บ อยู่ไฟล์เดียว แก้ที่นี่ที่เดียวได้ทั้งสองภาษา ─────────────
// แยกเนื้อหาออกจากโครงหน้า เพราะ portfolio ต้องแก้บ่อย (เพิ่มผลงาน เปลี่ยนตำแหน่ง)
// และการมีสองภาษาในไฟล์เดียวทำให้เห็นทันทีว่าข้อความไหนยังแปลไม่ครบ

export const CONTENT = {
  meta: {
    name: "Patcharasit Pongudom",
    nickname: { th: "ปอนด์", en: "Pond" },
    email: "patcharasit20092545@gmail.com",
    github: "https://github.com/PatcharasitP",
    githubAlt: "https://github.com/Pai-Dec-13",
    location: { th: "กรุงเทพมหานคร ประเทศไทย", en: "Bangkok, Thailand" },
    resume: "assets/Patcharasit_Pongudom_Resume.pdf",
    photo: "assets/photo.png",
  },

  ui: {
    th: { langBtn: "EN", themeLight: "โหมดสว่าง", themeDark: "โหมดมืด",
          viewProjects: "ดูผลงาน", downloadCv: "ดาวน์โหลด CV", contact: "ติดต่อ",
          visit: "เปิดเว็บจริง", code: "ซอร์สโค้ด", copied: "คัดลอกแล้ว",
          readCase: "อ่านที่มาที่ไปแบบเต็ม" },
    en: { langBtn: "ไทย", themeLight: "Light mode", themeDark: "Dark mode",
          viewProjects: "View projects", downloadCv: "Download CV", contact: "Contact",
          visit: "Live site", code: "Source code", copied: "Copied",
          readCase: "Read the full case" },
  },

  hero: {
    th: {
      kicker: "DATA ANALYST · POWER BI · AUTOMATION",
      title: "Patcharasit Pongudom",
      lead: "สวัสดีครับ ผมปอนด์ — นักวิเคราะห์ข้อมูลที่ชอบเปลี่ยนงานซ้ำ ๆ ให้เป็นระบบที่ทำงานเองได้ทุกวัน " +
            "ตั้งแต่ทำ dashboard ไปจนถึงเขียนเว็บและระบบอัตโนมัติเต็มรูปแบบ",
    },
    en: {
      kicker: "DATA ANALYST · POWER BI · AUTOMATION",
      title: "Patcharasit Pongudom",
      lead: "Hi, I'm Pond — a data analyst who turns repetitive work into systems that run themselves. " +
            "From dashboards to full-stack web apps and end-to-end automation.",
    },
  },

  // ตัวเลขต้องพิสูจน์ได้จริงทุกตัว ไม่ใส่เลขที่อ้างอิงไม่ได้
  stats: [
    { n: "3", label: { th: "ระบบที่ใช้งานจริงบนอินเทอร์เน็ต", en: "Systems live in production" } },
    { n: "2+", label: { th: "ปีในสายวิเคราะห์ข้อมูล", en: "Years in data analytics" } },
    { n: "54,056", label: { th: "เรื่องร้องเรียนที่วิเคราะห์ในงานล่าสุด", en: "Records analysed in the latest project" } },
    { n: "15.7×", label: { th: "ความเร็วที่ปรับปรุงได้ (วัดจริง)", en: "Measured speed improvement" } },
  ],

  about: {
    th: {
      head: "เกี่ยวกับผม",
      body: [
        "ผมจบคณิตศาสตร์ประยุกต์จากสถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง และทำงานสายวิเคราะห์ข้อมูลมาตั้งแต่ช่วงฝึกงานสหกิจ จนปัจจุบันเป็น Data Analyst ที่ True Corporation",
        "งานที่ผมถนัดคือการต่อภาพตั้งแต่ต้นทางถึงปลายทาง — ดึงข้อมูลจากแหล่งที่ยุ่งเหยิง จัดโครงสร้างด้วย Power Query และ SQL สร้างโมเดลกับ DAX แล้วส่งออกเป็น dashboard หรือรายงานที่ส่งเองอัตโนมัติทุกเช้า",
        "นอกเวลางานผมชอบสร้างของใช้เอง เช่น dashboard วิเคราะห์รายได้ร้านซักอบที่เก็บข้อมูลเองทุก 3 ชั่วโมง และเว็บเครื่องมือแปลงไฟล์ที่ทำงานในเบราว์เซอร์ล้วนโดยไม่ส่งไฟล์ขึ้นเซิร์ฟเวอร์ ทุกอย่างที่ทำผมยึดหลักเดียวกันคือ วัดผลจริงก่อนเชื่อ",
      ],
    },
    en: {
      head: "About",
      body: [
        "I hold a B.Sc. in Applied Mathematics from King Mongkut's Institute of Technology Ladkrabang, and I have worked in data analytics since my co-operative internship. I am currently a Data Analyst at True Corporation.",
        "What I do best is connecting the whole pipeline — pulling data from messy sources, shaping it with Power Query and SQL, modelling it with DAX, then delivering dashboards or reports that send themselves every morning.",
        "Outside work I build tools I actually use: a revenue dashboard for a laundromat that collects its own data every three hours, and a browser-only file toolkit that never uploads your files anywhere. Everything I build follows one rule — measure it before believing it.",
      ],
    },
  },

  projectsHead: { th: "ผลงานที่เลือกมา", en: "Selected projects" },
  projectsNote: {
    th: "ทั้งหมดนี้เป็นโปรเจกต์ส่วนตัวที่ผมทำเองนอกเวลางาน เปิดดูซอร์สโค้ดและใช้งานจริงได้ทุกตัว",
    en: "All personal projects built outside of work — every one is live and open source.",
  },

  // โครง CARL: Context → Action → Result → Learning (ตามงานวิจัยเรื่อง case study)
  projects: [
    {
      id: "bkk-complaints",
      tag: { th: "วิเคราะห์ข้อมูล · Dashboard", en: "Data analysis · Dashboard" },
      title: { th: "กรุงเทพฯ ร้องเรียนอะไร แล้วแก้ช้าตรงไหน — วิเคราะห์ข้อมูลเปิด 54,056 เรื่อง",
               en: "What Bangkok complains about, and where fixes stall — 54,056 open-data records" },
      impact: { th: "พบว่าเขตที่ช้าที่สุดใช้เวลามากกว่าเขตที่เร็วที่สุด 3.4 เท่า และยิ่งปิดเรื่องช้า คะแนนความพอใจยิ่งลดลงเป็นระบบ",
                en: "Found a 3.4× gap between the slowest and fastest districts, and that satisfaction drops systematically as resolution time grows" },
      live: "dashboard/",
      stack: ["Python", "pandas", "Vega-Lite", "GeoJSON", "Data cleaning", "Open data"],
      carl: {
        th: [
          ["โจทย์", "งานวิเคราะห์ที่ทำในบริษัทเปิดเผยไม่ได้ ผมจึงตั้งโจทย์ใหม่จากข้อมูลเปิดของกรุงเทพมหานคร เพื่อตอบคำถามแบบเดียวกับที่ผู้บริหารถามจริง — ถ้าเพิ่มกำลังคนได้อีกหนึ่งทีม ควรส่งไปที่ไหน"],
          ["สิ่งที่ทำ", "ดึงข้อมูลเรื่องร้องเรียน 54,068 รายการมาทำความสะอาดด้วย pandas จัดการชื่อเขตที่สะกดไม่ตรงกับแผนที่ราชการ แล้วสร้าง dashboard เล่าเรื่อง 6 ตอนพร้อมแผนที่ 50 เขต ทั้งหมดทำงานในเบราว์เซอร์โดยไม่ต้องใช้เซิร์ฟเวอร์"],
          ["ผลลัพธ์", "ได้ข้อค้นพบที่ชี้เป้าได้จริง: เขตที่ช้าที่สุดใช้เวลา 149 ชั่วโมงเทียบกับเขตที่เร็วที่สุด 43 ชั่วโมง · งานค้างเกิน 30 วันมี 7,779 เรื่อง · และเรื่องที่ปิดภายในวันเดียวได้ 4.34 ดาว ขณะที่เรื่องที่เกิน 14 วันเหลือ 3.78 ดาว"],
          ["ได้เรียนรู้", "ค่าเฉลี่ยหลอกได้ง่ายมากกับข้อมูลแบบนี้ — เวลาปิดเรื่องเฉลี่ย 6.9 วัน แต่มัธยฐานจริงคือ 3.7 วัน ถ้าตั้งเป้าหมายจากค่าเฉลี่ยจะได้ภาพที่ผิด และอีกบทเรียนคือแผนที่ราชการสะกด “ราษฏร์บูรณะ” ต่างจากข้อมูลที่ใช้ “ราษฎร์บูรณะ” ทำให้เชื่อมข้อมูลขาดไปหนึ่งเขตโดยไม่มีอะไรฟ้อง"],
        ],
        en: [
          ["Context", "My analytical work at the company cannot be published, so I set the same kind of question against Bangkok's open data — if one more field team became available, where should it go?"],
          ["Action", "Pulled 54,068 citizen complaint records, cleaned them with pandas, reconciled district names against the official map, and built a six-part narrative dashboard with a 50-district choropleth — all running client-side with no server."],
          ["Result", "Actionable findings: the slowest district takes 149 hours versus 43 hours for the fastest; 7,779 cases have been open for more than 30 days; and cases closed within a day score 4.34 stars against 3.78 for those past two weeks."],
          ["Learning", "Averages mislead badly on this shape of data — mean resolution is 6.9 days while the median is 3.7. Targets set from the mean would paint the wrong picture. Also, the official map spells one district differently from the dataset, silently dropping it from the join until I checked the match count."],
        ],
      },
    },

    {
      id: "filekit",
      impact: { th: "เร็วขึ้น 15.7 เท่าบนมือถือ · โหลดหน้าแรกลดจาก 831 KB เหลือ 11 KB · ทดสอบอัตโนมัติ 44 เคสผ่าน",
                en: "15.7× faster on mobile · initial payload 831 KB → 11 KB · 44 automated tests passing" },
      tag: { th: "เว็บแอป · Performance", en: "Web app · Performance" },
      title: { th: "FileKit — ชุดเครื่องมือจัดการไฟล์ที่ไม่ส่งไฟล์ขึ้นเซิร์ฟเวอร์", en: "FileKit — a file toolkit that never uploads your files" },
      live: "https://patcharasitp.github.io/filekit/",
      code: "https://github.com/PatcharasitP/filekit",
      stack: ["JavaScript", "Web Workers", "PWA", "pdf.js", "SheetJS", "Tesseract.js"],
      carl: {
        th: [
          ["โจทย์", "เว็บแปลงไฟล์ที่คนใช้กันต้องอัปโหลดเอกสารขึ้นเซิร์ฟเวอร์คนอื่น ซึ่งเป็นปัญหาเมื่อไฟล์เป็นเอกสารภายใน และเว็บตัวอย่างที่ผมศึกษาโหลดไลบรารีทั้ง 9 ตัวตั้งแต่หน้าแรก"],
          ["สิ่งที่ทำ", "เขียนใหม่ทั้งหมดเป็น 18 เครื่องมือที่ประมวลผลในเบราว์เซอร์ล้วน ออกแบบให้หน้าแรกไม่โหลดไลบรารีเลยสักตัว ดึงเฉพาะตอนเปิดเครื่องมือนั้นจริง เริ่มโหลดล่วงหน้าตั้งแต่ผู้ใช้เอาเมาส์ชี้ ตัดฟอนต์ไทยเหลือเฉพาะอักขระที่ใช้ และทำ Service Worker ให้ใช้งานออฟไลน์ได้"],
          ["ผลลัพธ์", "หน้าแรกเร็วขึ้น 15.7 เท่าบนมือถือเน็ตช้า (5,152 → 328 มิลลิวินาที) ข้อมูลที่ต้องโหลดลดจาก 831 KB เหลือ 11 KB · ทดสอบอัตโนมัติ 44 เคสผ่านทั้งหมด รวมไฟล์สแกน ไฟล์ล็อกรหัสผ่าน และเอกสารภาษาไทย"],
          ["ได้เรียนรู้", "ครั้งแรกที่ผมทดสอบเรื่องออฟไลน์ เครื่องมือทดสอบรายงานว่า 'ผ่าน' ทั้งที่จริงยังใช้ไม่ได้ พอไปวัดแบบตัดเน็ตจริงถึงเห็นว่าไลบรารีถูกเก็บไว้ 0 ไฟล์ — บทเรียนคือต้องพิสูจน์เครื่องมือวัดก่อนเชื่อผลของมัน"],
        ],
        en: [
          ["Context", "Popular file converters require uploading documents to someone else's server, which rules them out for internal files. The reference site I studied also loaded all nine libraries on the landing page."],
          ["Action", "Rebuilt it from scratch: 18 tools running entirely in the browser, with a landing page that loads zero libraries. Each tool fetches only what it needs, prefetching the moment a user hovers a card. Thai fonts subset to used glyphs, plus a Service Worker for offline use."],
          ["Result", "15.7× faster first paint on a throttled mobile connection (5,152 → 328 ms); initial payload cut from 831 KB to 11 KB. 44 automated end-to-end cases pass, covering scanned PDFs, password-locked files and Thai documents."],
          ["Learning", "My first offline test reported a pass while the feature was actually broken — the test harness could not block service-worker requests. Cutting the network at the OS level revealed zero cached libraries. Always validate the measuring tool before trusting its result."],
        ],
      },
    },
    {
      id: "laundromat",
      impact: { th: "เก็บข้อมูลเองทุก 3 ชั่วโมง ครอบคลุมเครื่องซัก 10 เครื่อง ย้อนหลังราว 45 วัน",
                en: "Collects its own data every 3 hours across 10 machines, ~45 days of history" },
      tag: { th: "Full-stack · Data pipeline", en: "Full-stack · Data pipeline" },
      title: { th: "Laundromat Revenue Analytics — dashboard ที่เก็บข้อมูลเองทุก 3 ชั่วโมง", en: "Laundromat Revenue Analytics — a dashboard that collects its own data" },
      live: "https://ec-laundromat-dashboard.onrender.com",
      stack: ["Python", "Flask", "GitHub Actions", "Web scraping", "Render"],
      carl: {
        th: [
          ["โจทย์", "ร้านซักอบหยอดเหรียญ 10 เครื่องมีระบบสั่งงานผ่านเว็บ แต่ไม่มีหน้าสรุปรายได้ ต้องเปิดดูทีละเครื่องและไม่มีประวัติย้อนหลัง"],
          ["สิ่งที่ทำ", "เขียนตัวเก็บข้อมูลด้วย Python ที่ดึงบันทึกการทำงานของเครื่องอัตโนมัติทุก 3 ชั่วโมงผ่าน GitHub Actions เก็บเป็นคลังข้อมูลย้อนหลัง แล้วทำเว็บ Flask ที่มีระบบล็อกอิน แสดงรายได้รายวันและแยกรายเครื่อง deploy บน Render"],
          ["ผลลัพธ์", "เห็นรายได้ประมาณการรายวันย้อนหลังราว 45 วันจากเครื่องทั้ง 10 ตัว เลือกดูรายวัน/รายเครื่องได้ และข้อมูลอัปเดตเองโดยไม่ต้องเปิดคอมพิวเตอร์ทิ้งไว้"],
          ["ได้เรียนรู้", "งานที่รันอัตโนมัติทำให้เจอปัญหาที่ไม่เจอตอนรันมือ เช่นเวลาบนเซิร์ฟเวอร์เป็น UTC ทำให้วันที่เพี้ยนไป 7 ชั่วโมง ต้องกำหนดเขตเวลาให้ชัดทุกจุดที่คำนวณวัน"],
        ],
        en: [
          ["Context", "A coin laundry with 10 machines had a remote-control web system but no revenue view — you had to open each machine one by one, with no history kept."],
          ["Action", "Built a Python collector that scrapes machine logs every three hours via GitHub Actions into a growing archive, plus a Flask dashboard with login showing daily and per-machine revenue, deployed on Render."],
          ["Result", "Roughly 45 days of estimated daily revenue across all 10 machines, filterable by day and machine, updating on its own without leaving a computer running."],
          ["Learning", "Scheduled jobs surface bugs manual runs never do — the server ran on UTC, shifting every date by seven hours. Timezone has to be explicit at every point a date is computed."],
        ],
      },
    },
    {
      id: "pqframework",
      impact: { th: "รวมตรรกะที่เคยกระจายในหลายรายงานให้เหลือฟังก์ชันกลาง แก้ครั้งเดียวมีผลทุกที่",
                en: "Consolidated logic scattered across reports into shared functions — fix once, applies everywhere" },
      tag: { th: "Power Query · ไลบรารีที่ใช้ซ้ำได้", en: "Power Query · Reusable library" },
      title: { th: "Power Query Function Library — ชุดฟังก์ชันจัดการข้อมูลสกปรก", en: "Power Query Function Library — reusable data-cleaning functions" },
      code: "https://github.com/PatcharasitP/PQ-FRAMEWORK",
      stack: ["Power Query (M)", "Data quality", "Excel", "Power BI"],
      carl: {
        th: [
          ["โจทย์", "งานเตรียมข้อมูลเจอปัญหาเดิมซ้ำ ๆ ทุกรายงาน — คีย์ซ้ำที่ต้องเลือกแถวล่าสุด ตารางอ้างอิงที่ต้องค้นหลายชั้น และข้อมูลที่ต้องเลือกค่าที่น่าเชื่อถือที่สุดจากหลายแหล่ง"],
          ["สิ่งที่ทำ", "เขียนเป็นฟังก์ชัน M ที่ใช้ซ้ำได้ เช่น ยุบให้เหลือแถวล่าสุดต่อคีย์ ค้นข้อมูลแบบมีคีย์สำรอง ค้นหลายคีย์พร้อมกัน และเลือกค่าที่ดีที่สุดจากหลายแหล่ง ทุกตัวเขียนคอมเมนต์อธิบายพฤติกรรมและกับดักไว้ในไฟล์"],
          ["ผลลัพธ์", "ย้ายตรรกะที่เคยกระจายอยู่ในหลายรายงานมารวมเป็นฟังก์ชันกลาง แก้ครั้งเดียวมีผลทุกที่ และคนอื่นหยิบไปใช้ต่อได้โดยไม่ต้องอ่านโค้ดทั้งหมด"],
          ["ได้เรียนรู้", "รายละเอียดเล็ก ๆ มีผลมาก เช่นต้อง buffer ตารางก่อนตัดข้อมูลซ้ำ ไม่งั้นลำดับที่จัดเรียงไว้อาจไม่ถูกเคารพ และการปนปฏิทิน พ.ศ. กับ ค.ศ. ในคอลัมน์เดียวทำให้การเรียงพังเงียบ ๆ"],
        ],
        en: [
          ["Context", "Data preparation kept hitting the same problems in every report — duplicate keys needing the latest row, lookup tables requiring multi-level fallback, and conflicting values across sources."],
          ["Action", "Wrote them as reusable M functions: collapse to the newest row per key, lookup with a fallback key, multi-key lookup, and survivorship selection across sources — each documented inline with its behaviour and traps."],
          ["Result", "Logic that used to be copy-pasted across reports now lives in one place: fix once, applies everywhere, and teammates can reuse it without reading the whole query."],
          ["Learning", "Small details matter disproportionately — a table must be buffered before de-duplication or the sort order may not be respected, and mixing Buddhist and Gregorian years in one column breaks sorting silently."],
        ],
      },
    },
    {
      id: "automation",
      impact: { th: "5 รูปแบบงานอัตโนมัติที่หยิบไปใช้กับงานจริงได้ทันที ตั้งแต่ดึงเว็บถึงอ่าน PDF ด้วย AI",
                en: "Five reusable automation patterns, from web extraction to AI-powered PDF reading" },
      tag: { th: "Power Automate · การทำงานอัตโนมัติ", en: "Power Automate · Automation" },
      title: { th: "ชุดงานอัตโนมัติที่ทดลองสร้างเอง", en: "Self-directed automation experiments" },
      code: "https://github.com/Pai-Dec-13",
      stack: ["Power Automate Cloud", "Power Automate Desktop", "AI Builder", "REST API"],
      carl: {
        th: [
          ["โจทย์", "อยากเข้าใจว่างานเก็บและแปลงข้อมูลแบบไหนบ้างที่ยกให้ระบบทำแทนคนได้จริง จึงตั้งโจทย์ให้ตัวเองแล้วลงมือทำทีละแบบ"],
          ["สิ่งที่ทำ", "สร้างงานอัตโนมัติหลายรูปแบบ ตั้งแต่ดึงข้อมูลจากเว็บฐานข้อมูลลง Excel, ส่งออกชุดข้อมูลที่เกินขีดจำกัดแถวของ Excel ไปเป็นไฟล์ข้อความ, อ่านข้อมูลจากไฟล์ PDF ด้วยโมเดล AI Builder ที่เทรนเอง, แปลงรายงานรูปแบบยุ่งเหยิงให้เป็นตารางฐานข้อมูล และดึงข้อมูล API แบบไล่ทีละหน้า"],
          ["ผลลัพธ์", "ได้ชุดแพตเทิร์นที่หยิบมาใช้กับงานจริงได้ทันที และเข้าใจข้อจำกัดของแต่ละเครื่องมือ เช่นงานแบบไหนควรใช้ flow บนคลาวด์ กับงานแบบไหนต้องใช้ตัวรันบนเครื่อง"],
          ["ได้เรียนรู้", "การทำอัตโนมัติที่ดีไม่ใช่การทำให้ทุกอย่างเป็นอัตโนมัติ แต่คือการเลือกจุดที่คนทำแล้วผิดพลาดบ่อยหรือเสียเวลาซ้ำ ๆ มาทำก่อน"],
        ],
        en: [
          ["Context", "I wanted to understand which data collection and transformation tasks can genuinely be handed to a machine, so I set myself a series of problems and built each one."],
          ["Action", "Built a range of automations: extracting data from a web-based database into Excel, exporting datasets beyond Excel's row limit to text files, reading PDFs with a custom-trained AI Builder model, restructuring messy reports into database tables, and paging through REST APIs."],
          ["Result", "A set of patterns I can now apply directly to real work, plus a clear sense of each tool's limits — which jobs belong in a cloud flow and which need a desktop runner."],
          ["Learning", "Good automation is not automating everything. It is picking the steps where humans repeatedly make mistakes or burn time, and starting there."],
        ],
      },
    },
  ],

  skillsHead: { th: "ทักษะและเครื่องมือ", en: "Skills & tools" },
  skills: [
    { group: { th: "วิเคราะห์และทำรายงาน", en: "Analytics & reporting" },
      items: ["Power BI Desktop", "DAX", "Power Query (M)", "Deneb / Vega-Lite", "Excel (Pivot, Power Query)", "DAX Studio"] },
    { group: { th: "ข้อมูลและฐานข้อมูล", en: "Data & databases" },
      items: ["SQL Server", "Dataverse", "Data modelling", "Data cleaning"] },
    { group: { th: "ทำงานอัตโนมัติ", en: "Automation" },
      items: ["Power Automate Cloud", "Power Automate Desktop", "AI Builder", "GitHub Actions"] },
    { group: { th: "พัฒนาแอปและเว็บ", en: "Apps & web" },
      items: ["Python (Flask)", "JavaScript", "React", "Power Apps", "Power Pages", "HTML / CSS"] },
  ],

  expHead: { th: "ประสบการณ์ทำงาน", en: "Experience" },
  experience: [
    {
      period: { th: "มี.ค. 2026 – ปัจจุบัน", en: "Mar 2026 – Present" },
      role: { th: "Data Analyst", en: "Data Analyst" },
      org: "True Corporation",
      place: { th: "กรุงเทพมหานคร", en: "Bangkok" },
      points: {
        th: ["สร้างและดูแล dashboard บน Power BI สำหรับติดตามตัวชี้วัดและรายงานเชิงธุรกิจ",
             "พัฒนาระบบเก็บข้อมูลอัตโนมัติและกระบวนการดึงข้อมูลด้วย Power Automate",
             "เขียน SQL และออกแบบโมเดลข้อมูลเพื่อรองรับการวิเคราะห์และการรายงาน",
             "ทำความสะอาดและแปลงข้อมูลดิบให้เป็นชุดข้อมูลพร้อมใช้ ส่งรายงานรายวันและรายสัปดาห์"],
        en: ["Built and maintained Power BI dashboards for KPI monitoring and business reporting",
             "Developed automated data pipelines and collection flows with Power Automate",
             "Wrote SQL queries and designed data models to support analysis and reporting",
             "Cleaned and transformed raw data into structured datasets; delivered daily and weekly reports"],
      },
    },
    {
      period: { th: "ธ.ค. 2024 – มี.ค. 2025", en: "Dec 2024 – Mar 2025" },
      role: { th: "Data Analyst (ฝึกงานสหกิจศึกษา)", en: "Data Analyst (Co-operative internship)" },
      org: "Phillip Life Assurance",
      place: { th: "กรุงเทพมหานคร", en: "Bangkok" },
      points: {
        th: ["ทำความสะอาดข้อมูลและอัปเดตรายงานประจำสัปดาห์",
             "เก็บความต้องการจากผู้ใช้ ออกแบบและพัฒนา dashboard ตามโจทย์ที่ได้รับ"],
        en: ["Cleaned data and maintained weekly reports",
             "Gathered user requirements, then designed and built dashboards to match"],
      },
    },
  ],

  eduHead: { th: "การศึกษา", en: "Education" },
  education: [
    { period: "2021 – 2025",
      degree: { th: "วิทยาศาสตรบัณฑิต สาขาคณิตศาสตร์ประยุกต์", en: "B.Sc. in Applied Mathematics" },
      org: { th: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL)", en: "King Mongkut's Institute of Technology Ladkrabang (KMITL)" },
      note: { th: "เกรดเฉลี่ยสะสม 3.33", en: "GPA 3.33" } },
    { period: "2018 – 2021",
      degree: { th: "มัธยมศึกษาตอนปลาย แผนการเรียนวิทยาศาสตร์–คณิตศาสตร์", en: "High School, Science–Mathematics Program" },
      org: { th: "โรงเรียนเตรียมอุดมศึกษาพัฒนาการ รัชดา", en: "Triam Udom Suksa Pattanakarn Ratchada" },
      note: { th: "เกรดเฉลี่ยสะสม 3.77", en: "GPA 3.77" } },
  ],

  contact: {
    th: { head: "สนใจร่วมงานกันไหมครับ",
          body: "ผมกำลังมองหาโอกาสใหม่ในสายวิเคราะห์ข้อมูลและ Business Intelligence ถ้ามีตำแหน่งที่คิดว่าเหมาะ ทักมาคุยกันได้เลยครับ" },
    en: { head: "Let's work together",
          body: "I'm open to new opportunities in data analytics and business intelligence. If you have a role in mind, I'd be glad to hear from you." },
  },
};
