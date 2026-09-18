// ============ 共用工具 ============
const STORAGE_KEYS = {
  weeks: "nihongo12_completedWeeks",
  vocab: "nihongo12_learnedVocab"
};

function loadSet(key) {
  try {
    const raw = localStorage.getItem(key);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch (e) {
    return new Set();
  }
}

function saveSet(key, set) {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(set)));
  } catch (e) {
    /* localStorage 不可用時（例如隱私模式），安靜地忽略，不影響瀏覽 */
  }
}

function getCompletedWeeks() { return loadSet(STORAGE_KEYS.weeks); }
function toggleWeekDone(week) {
  const s = getCompletedWeeks();
  s.has(week) ? s.delete(week) : s.add(week);
  saveSet(STORAGE_KEYS.weeks, s);
  return s;
}

function getLearnedVocab() { return loadSet(STORAGE_KEYS.vocab); }
function toggleVocabLearned(id) {
  const s = getLearnedVocab();
  s.has(id) ? s.delete(id) : s.add(id);
  saveSet(STORAGE_KEYS.vocab, s);
  return s;
}

function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

// ============ 側邊書籤導覽 ============
function buildSpine(activePage, activeWeek) {
  const el = document.getElementById("spine");
  if (!el) return;
  const completed = getCompletedWeeks();

  const topLinks = [
    { href: "index.html", label: "首頁總覽", icon: "🏠", page: "home" },
    { href: "kana.html", label: "50音表", icon: "🈶", page: "kana" },
    { href: "plan.html", label: "12週計畫", icon: "📅", page: "plan" },
    { href: "vocab.html", label: "核心詞彙 200", icon: "📖", page: "vocab" },
    { href: "grammar.html", label: "文法課程", icon: "✍️", page: "grammar" }
  ];

  let html = `
    <div class="spine-brand">
      <span class="kanji">日本語ノート</span>
      <span class="sub">12週旅行・日常・N2 學習計畫</span>
    </div>
  `;

  topLinks.forEach((l) => {
    html += `<a class="spine-link ${l.page === activePage ? "active" : ""}" href="${l.href}">
      <span>${l.icon}</span><span>${l.label}</span>
    </a>`;
  });

  html += `<div class="spine-section-label">週次書籤</div><div class="spine-week-list">`;
  for (let w = 1; w <= 12; w++) {
    const done = completed.has(w);
    const isActive = w === activeWeek;
    const targetPage = activePage === "grammar" ? "grammar.html" : "plan.html";
    html += `<a class="spine-week-link ${done ? "done" : ""} ${isActive ? "active" : ""}" href="${targetPage}#week-${w}">
      <span class="num">${String(w).padStart(2, "0")}</span><span>第 ${w} 週</span>
    </a>`;
  }
  html += `</div>`;

  el.innerHTML = html;
}

// ============ 首頁 ============
function renderHome() {
  const completed = getCompletedWeeks();
  const learnedVocab = getLearnedVocab();
  const totalVocab = typeof VOCAB_DATA !== "undefined" ? VOCAB_DATA.length : 200;

  const weekPct = Math.round((completed.size / 12) * 100);
  const vocabPct = Math.round((learnedVocab.size / totalVocab) * 100);

  const statsEl = document.getElementById("home-stats");
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="stat-box">
        <span class="num">${completed.size} / 12</span>
        <span class="label">已完成週次</span>
        <div class="progress-track" style="margin-top:8px;"><div class="progress-fill" style="width:${weekPct}%"></div></div>
      </div>
      <div class="stat-box">
        <span class="num">${learnedVocab.size} / ${totalVocab}</span>
        <span class="label">已標記學會的單字</span>
        <div class="progress-track" style="margin-top:8px;"><div class="progress-fill" style="width:${vocabPct}%"></div></div>
      </div>
      <div class="stat-box">
        <span class="num">${nextWeekLabel(completed)}</span>
        <span class="label">建議下一步</span>
      </div>
    `;
  }
}

function nextWeekLabel(completed) {
  for (let w = 1; w <= 12; w++) {
    if (!completed.has(w)) return `第 ${w} 週`;
  }
  return "已全部完成 🎉";
}

// ============ 12 週計畫頁 ============
function renderPlan() {
  const container = document.getElementById("plan-list");
  if (!container) return;
  const completed = getCompletedWeeks();

  container.innerHTML = PLAN_DATA.map((w) => {
    const done = completed.has(w.week);
    const breakdown = w.breakdown.map(b => `<span class="breakdown-chip">${esc(b.label)}・${b.minutes}分</span>`).join("");
    const goals = w.goals.map(g => `<li>${esc(g)}</li>`).join("");
    const tasks = w.tasks.map(t => `<li>${esc(t)}</li>`).join("");

    return `
      <article class="week-card" id="week-${w.week}">
        <div class="week-card-head">
          <span class="week-badge">第 ${w.week} 週</span>
          <span class="week-icon">${w.icon}</span>
          <h3 style="margin:0;">${esc(w.theme)}</h3>
        </div>
        <div>
          <span class="week-grammar-tag">✍️ 文法重點：${esc(w.grammarTitle)}（<a href="grammar.html#grammar-${w.grammarRef}">看詳細說明 →</a>）</span>
          <span class="week-vocab-tag">📖 詞彙範圍：${esc(w.vocabScenario)}（<a href="vocab.html?week=${w.week}">看單字 →</a>）</span>
        </div>
        <div class="breakdown-row">
          <span class="breakdown-chip" style="border-style:solid;color:var(--ink);border-color:var(--ink);">⏱ 每日建議 ${w.dailyMinutes} 分鐘</span>
          ${breakdown}
        </div>
        <h4 style="margin:14px 0 4px 0;font-family:var(--sans);font-size:14px;color:var(--text-soft);">🎯 這週的目標</h4>
        <ul class="goal-list">${goals}</ul>
        <h4 style="margin:14px 0 4px 0;font-family:var(--sans);font-size:14px;color:var(--text-soft);">📝 具體練習</h4>
        <ul class="task-list">${tasks}</ul>
        <div class="milestone-box">${esc(w.milestone)}</div>
        <label class="complete-toggle ${done ? "done" : ""}" data-week="${w.week}">
          <input type="checkbox" ${done ? "checked" : ""} />
          <span>${done ? "已完成這一週 🎉" : "標記這週完成"}</span>
        </label>
      </article>
    `;
  }).join("");

  container.querySelectorAll(".complete-toggle").forEach((label) => {
    label.addEventListener("click", (e) => {
      e.preventDefault();
      const week = Number(label.dataset.week);
      const set = toggleWeekDone(week);
      const done = set.has(week);
      label.classList.toggle("done", done);
      label.querySelector("input").checked = done;
      label.querySelector("span").textContent = done ? "已完成這一週 🎉" : "標記這週完成";
      buildSpine("plan", null);
    });
  });
}

// ============ 文法頁 ============
function renderGrammar() {
  const container = document.getElementById("grammar-list");
  if (!container) return;

  container.innerHTML = GRAMMAR_DATA.map((g, idx) => {
    const examples = g.examples.map(ex => `
      <div class="example-row">
        <span class="ex-jp">${esc(ex.jp)}</span>
        <span class="ex-reading">${esc(ex.reading)}</span>
        <span class="ex-zh">${esc(ex.zh)}</span>
      </div>
    `).join("");

    return `
      <details class="grammar-card" id="grammar-${g.id}" ${idx === 0 ? "open" : ""}>
        <summary>
          <span class="grammar-level">${esc(g.level)}</span>
          <span class="title-block">
            <span class="title">第${g.week}週 ・ ${esc(g.title)}</span>
            <span class="subtitle">${esc(g.subtitle)}</span>
          </span>
          <span class="arrow">▶</span>
        </summary>
        <div class="grammar-body">
          <p>${esc(g.explanation)}</p>
          <h4 style="margin:14px 0 4px 0;font-family:var(--sans);font-size:14px;color:var(--text-soft);">📘 例句</h4>
          ${examples}
          <div class="mistake-box">
            <div class="label">⚠️ 常見錯誤</div>
            <div class="wrong">${esc(g.mistake.wrong)}</div>
            <div class="why">${esc(g.mistake.why)}</div>
            <div class="correct">${esc(g.mistake.correct)}</div>
          </div>
        </div>
      </details>
    `;
  }).join("");
}

// ============ 詞彙頁 ============
let vocabFilterState = { category: "all", tier: "all", search: "", onlyUnlearned: false };

function renderVocab() {
  const grid = document.getElementById("vocab-grid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const weekParam = params.get("week");
  if (weekParam) {
    vocabFilterState.category = "all";
    vocabFilterState.week = Number(weekParam);
  }

  const categories = [...new Set(VOCAB_DATA.map(v => v.category))];
  const categorySelect = document.getElementById("filter-category");
  categorySelect.innerHTML = `<option value="all">全部場景</option>` +
    categories.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join("");

  document.getElementById("filter-tier").addEventListener("change", (e) => {
    vocabFilterState.tier = e.target.value;
    drawVocabGrid();
  });
  categorySelect.addEventListener("change", (e) => {
    vocabFilterState.category = e.target.value;
    vocabFilterState.week = null;
    drawVocabGrid();
  });
  document.getElementById("filter-search").addEventListener("input", (e) => {
    vocabFilterState.search = e.target.value.trim();
    drawVocabGrid();
  });
  document.getElementById("filter-unlearned").addEventListener("change", (e) => {
    vocabFilterState.onlyUnlearned = e.target.checked;
    drawVocabGrid();
  });

  drawVocabGrid();
}

function drawVocabGrid() {
  const grid = document.getElementById("vocab-grid");
  const learned = getLearnedVocab();
  const s = vocabFilterState;

  let list = VOCAB_DATA.filter(v => {
    if (s.week && v.week !== s.week) return false;
    if (s.category !== "all" && v.category !== s.category) return false;
    if (s.tier !== "all" && String(v.tier) !== s.tier) return false;
    if (s.onlyUnlearned && learned.has(v.id)) return false;
    if (s.search) {
      const hay = (v.jp + v.reading + v.zh + v.ex + v.exZh).toLowerCase();
      if (!hay.includes(s.search.toLowerCase())) return false;
    }
    return true;
  });

  document.getElementById("vocab-count").textContent =
    `顯示 ${list.length} / ${VOCAB_DATA.length} 個單字・已學會 ${learned.size} 個`;

  // 依場景分組顯示，讓瀏覽更有脈絡
  const groups = {};
  list.forEach(v => {
    if (!groups[v.category]) groups[v.category] = [];
    groups[v.category].push(v);
  });

  let html = "";
  Object.keys(groups).forEach(cat => {
    html += `<h3 class="category-heading">${esc(cat)}</h3><div class="vocab-grid">`;
    html += groups[cat].map(v => {
      const isLearned = learned.has(v.id);
      return `
        <div class="vocab-card tier-${v.tier} ${isLearned ? "learned" : ""}" data-id="${v.id}">
          <span class="tier-dot" title="第${v.week}週・tier${v.tier}"></span>
          <span class="jp-word">${esc(v.jp)}</span>
          <span class="reading">${esc(v.reading)}</span>
          <div class="zh">${esc(v.zh)}</div>
          <div class="example">
            <span class="ex-jp">${esc(v.ex)}</span>
            ${esc(v.exZh)}
          </div>
          <input type="checkbox" class="learned-toggle" ${isLearned ? "checked" : ""} title="標記已學會" />
        </div>
      `;
    }).join("");
    html += `</div>`;
  });

  grid.innerHTML = html || `<p class="lede">找不到符合條件的單字，換個關鍵字或篩選條件試試看。</p>`;

  grid.querySelectorAll(".learned-toggle").forEach(cb => {
    cb.addEventListener("change", (e) => {
      const id = Number(e.target.closest(".vocab-card").dataset.id);
      toggleVocabLearned(id);
      e.target.closest(".vocab-card").classList.toggle("learned", e.target.checked);
      document.getElementById("vocab-count").textContent =
        `顯示 ${list.length} / ${VOCAB_DATA.length} 個單字・已學會 ${getLearnedVocab().size} 個`;
    });
  });
}

// ============ 50音表 ============
let kanaState = { script: "h", hideRomaji: false };

function speakKana(char) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(char);
    utter.lang = "ja-JP";
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
  } catch (e) {
    /* 部分瀏覽器或裝置可能不支援語音合成，安靜地忽略即可 */
  }
}

function buildKanaCell(cell) {
  if (!cell) return `<div class="kana-cell empty"></div>`;
  const char = kanaState.script === "h" ? cell.h : cell.k;
  return `<button type="button" class="kana-cell ${kanaState.hideRomaji ? "hide-romaji" : ""}" data-char="${esc(char)}">
    <span class="char">${esc(char)}</span>
    <span class="romaji">${esc(cell.r)}</span>
  </button>`;
}

function buildKanaGroup(title, rows, isYouon) {
  const rowsHtml = rows.map(row => `
    <div class="kana-row ${isYouon ? "youon-row" : ""}">
      <div class="kana-row-label">${esc(row.label)}</div>
      ${row.cells.map(buildKanaCell).join("")}
    </div>
  `).join("");
  return `<h3 class="kana-section-title">${title}</h3><div class="kana-table">${rowsHtml}</div>`;
}

function renderKanaTable() {
  const el = document.getElementById("kana-table-wrap");
  if (!el) return;
  el.innerHTML =
    buildKanaGroup("清音", KANA_DATA.seion, false) +
    buildKanaGroup("濁音", KANA_DATA.dakuon, false) +
    buildKanaGroup("半濁音", KANA_DATA.handakuon, false) +
    buildKanaGroup("拗音", KANA_DATA.youon, true);

  el.querySelectorAll(".kana-cell:not(.empty)").forEach(btn => {
    btn.addEventListener("click", () => {
      const char = btn.dataset.char;
      btn.classList.add("speaking");
      speakKana(char);
      setTimeout(() => btn.classList.remove("speaking"), 400);
    });
  });
}

function renderKana() {
  const el = document.getElementById("kana-table-wrap");
  if (!el) return;

  const btnH = document.getElementById("kana-script-h");
  const btnK = document.getElementById("kana-script-k");
  const practiceToggle = document.getElementById("kana-practice-mode");

  btnH.addEventListener("click", () => {
    kanaState.script = "h";
    btnH.classList.add("active");
    btnK.classList.remove("active");
    renderKanaTable();
  });
  btnK.addEventListener("click", () => {
    kanaState.script = "k";
    btnK.classList.add("active");
    btnH.classList.remove("active");
    renderKanaTable();
  });
  practiceToggle.addEventListener("change", (e) => {
    kanaState.hideRomaji = e.target.checked;
    renderKanaTable();
  });

  renderKanaTable();
}

// ============ 初始化 ============
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  buildSpine(page, null);
  if (page === "home") renderHome();
  if (page === "plan") renderPlan();
  if (page === "grammar") renderGrammar();
  if (page === "vocab") renderVocab();
  if (page === "kana") renderKana();
});
