// ============================================================
// MakanApa — Aplikasi Utama
// ============================================================

const App = {
  state: {
    profile: null,           // di-load dari localStorage
    mode: "free-for-all",    // default
    onbStep: 0,              // 0..6
    onbDraft: null,          // profil sementara saat onboarding
    rouletteOptions: [],
    rolledFood: null,
    excludedIds: [],         // food yg sudah di-roll, biar reroll dapet beda
  },

  // ============ INIT ============
  init() {
    this.loadProfile();
    if (!this.state.profile) {
      this.startOnboarding();
    } else {
      this.state.mode = this.state.profile.mode || "free-for-all";
      this.renderMain();
    }
  },

  // ============ STORAGE ============
  loadProfile() {
    try {
      const raw = localStorage.getItem("makanapa_profile");
      if (raw) this.state.profile = JSON.parse(raw);
    } catch {}
  },
  saveProfile() {
    try {
      localStorage.setItem("makanapa_profile", JSON.stringify(this.state.profile));
    } catch {}
  },
  clearProfile() {
    localStorage.removeItem("makanapa_profile");
    this.state.profile = null;
  },

  // ============================================================
  // ONBOARDING
  // ============================================================
  startOnboarding() {
    this.state.onbStep = 0;
    this.state.onbDraft = {
      name: "",
      area: "lainnya",
      diet: [],
      allergies: [],
      spice: 2,
      budget: "medium",
      cuisines: [],
      vibes: [],
      mode: "free-for-all"
    };
    this.renderOnboarding();
  },

  renderOnboarding() {
    const root = document.getElementById("app");
    const TOTAL = 7;
    const step = this.state.onbStep;
    const d = this.state.onbDraft;

    const dots = Array.from({ length: TOTAL }, (_, i) => {
      let cls = "onb-dot";
      if (i < step) cls += " done";
      else if (i === step) cls += " active";
      return `<div class="${cls}"></div>`;
    }).join("");

    let body = "";
    let canNext = true;

    if (step === 0) {
      body = `
        <div class="onb-title">Halo! Siapa namamu?</div>
        <div class="onb-subtitle">Biar MakanApa lebih personal nanggepin kamu.</div>
        <input class="onb-input" id="onb-name" placeholder="Nama panggilan" value="${d.name}" autofocus>
        <div style="margin-top:18px;">
          <div class="section-title">Lokasi default</div>
          <div class="card-options">
            ${BANDUNG_AREAS.map((a) => `
              <button class="card-opt ${d.area === a.id ? "active" : ""}" data-area="${a.id}">
                <span class="emoji">📍</span>
                <span class="info">
                  <span class="label">${a.label}</span>
                  <span class="desc">${a.vibe}</span>
                </span>
              </button>
            `).join("")}
          </div>
        </div>
      `;
      canNext = d.name.trim().length > 0;
    } else if (step === 1) {
      body = `
        <div class="onb-title">Diet & gaya makan?</div>
        <div class="onb-subtitle">Pilih semua yang relevan. Boleh skip kalau gak ada.</div>
        <div class="chips">
          ${DIET_OPTIONS.map((o) => `
            <button class="chip ${d.diet.includes(o.id) ? "active" : ""}" data-diet="${o.id}">
              ${o.emoji} ${o.label}
            </button>
          `).join("")}
        </div>
      `;
    } else if (step === 2) {
      body = `
        <div class="onb-title">Ada alergi?</div>
        <div class="onb-subtitle">Penting biar kami gak nyaranin yang bahaya buat kamu.</div>
        <div class="chips">
          ${ALLERGY_OPTIONS.map((o) => `
            <button class="chip ${d.allergies.includes(o.id) ? "active" : ""}" data-allergy="${o.id}">
              ${o.emoji} ${o.label}
            </button>
          `).join("")}
        </div>
      `;
    } else if (step === 3) {
      body = `
        <div class="onb-title">Toleransi pedas kamu?</div>
        <div class="onb-subtitle">Sampai level berapa kamu masih nikmat?</div>
        <div class="spice-row">
          ${SPICE_LEVELS.map((s) => `
            <button class="spice-cell ${d.spice === s.id ? "active" : ""}" data-spice="${s.id}">
              <span class="emoji">${s.emoji}</span>
              ${s.label}
            </button>
          `).join("")}
        </div>
      `;
    } else if (step === 4) {
      body = `
        <div class="onb-title">Budget per makan?</div>
        <div class="onb-subtitle">Kami akan filter berdasarkan range ini.</div>
        <div class="card-options">
          ${BUDGET_TIERS.map((b) => `
            <button class="card-opt ${d.budget === b.id ? "active" : ""}" data-budget="${b.id}">
              <span class="emoji">${b.emoji}</span>
              <span class="info">
                <span class="label">${b.label}</span>
                <span class="desc">${b.range} per orang</span>
              </span>
            </button>
          `).join("")}
        </div>
      `;
    } else if (step === 5) {
      body = `
        <div class="onb-title">Cuisine favoritmu?</div>
        <div class="onb-subtitle">Pilih bebas. Yang terpilih akan lebih sering muncul.</div>
        <div class="chips">
          ${CUISINE_OPTIONS.map((o) => `
            <button class="chip ${d.cuisines.includes(o.id) ? "active" : ""}" data-cuisine="${o.id}">
              ${o.emoji} ${o.label}
            </button>
          `).join("")}
        </div>
        <div style="margin-top:22px;">
          <div class="section-title">Vibes makan kamu</div>
          <div class="chips">
            ${VIBE_OPTIONS.map((o) => `
              <button class="chip ${d.vibes.includes(o.id) ? "active" : ""}" data-vibe="${o.id}">
                ${o.emoji} ${o.label}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    } else if (step === 6) {
      body = `
        <div class="onb-title">Mode default kamu?</div>
        <div class="onb-subtitle">Bisa diganti kapan aja di main screen.</div>
        <div class="card-options">
          ${Object.values(MODES).map((m) => `
            <button class="card-opt ${d.mode === m.id ? "active" : ""}" data-mode="${m.id}">
              <span class="emoji" style="background:${m.color}22;">${m.emoji}</span>
              <span class="info">
                <span class="label">${m.label}</span>
                <span class="desc">${m.tagline}</span>
              </span>
            </button>
          `).join("")}
        </div>
      `;
    }

    root.innerHTML = `
      <div class="onboard">
        <div class="onb-progress">${dots}</div>
        ${body}
        <div class="onb-actions">
          ${step > 0 ? `<button class="btn-ghost" id="onb-back">← Balik</button>` : ""}
          <button class="btn-primary" id="onb-next" ${canNext ? "" : "disabled"}>
            ${step === TOTAL - 1 ? "Selesai 🎉" : "Lanjut →"}
          </button>
        </div>
      </div>
    `;

    this.bindOnboarding();
  },

  bindOnboarding() {
    const d = this.state.onbDraft;

    // Name input
    const nameEl = document.getElementById("onb-name");
    if (nameEl) {
      nameEl.oninput = (e) => {
        d.name = e.target.value;
        const next = document.getElementById("onb-next");
        if (next) next.disabled = d.name.trim().length === 0;
      };
    }

    // Area select
    document.querySelectorAll("[data-area]").forEach((b) => {
      b.onclick = () => { d.area = b.dataset.area; this.renderOnboarding(); };
    });
    // Diet multi
    document.querySelectorAll("[data-diet]").forEach((b) => {
      b.onclick = () => {
        const id = b.dataset.diet;
        const i = d.diet.indexOf(id);
        if (i >= 0) d.diet.splice(i, 1); else d.diet.push(id);
        this.renderOnboarding();
      };
    });
    // Allergy multi
    document.querySelectorAll("[data-allergy]").forEach((b) => {
      b.onclick = () => {
        const id = b.dataset.allergy;
        const i = d.allergies.indexOf(id);
        if (i >= 0) d.allergies.splice(i, 1); else d.allergies.push(id);
        this.renderOnboarding();
      };
    });
    // Spice
    document.querySelectorAll("[data-spice]").forEach((b) => {
      b.onclick = () => { d.spice = parseInt(b.dataset.spice, 10); this.renderOnboarding(); };
    });
    // Budget
    document.querySelectorAll("[data-budget]").forEach((b) => {
      b.onclick = () => { d.budget = b.dataset.budget; this.renderOnboarding(); };
    });
    // Cuisines multi
    document.querySelectorAll("[data-cuisine]").forEach((b) => {
      b.onclick = () => {
        const id = b.dataset.cuisine;
        const i = d.cuisines.indexOf(id);
        if (i >= 0) d.cuisines.splice(i, 1); else d.cuisines.push(id);
        this.renderOnboarding();
      };
    });
    // Vibes multi
    document.querySelectorAll("[data-vibe]").forEach((b) => {
      b.onclick = () => {
        const id = b.dataset.vibe;
        const i = d.vibes.indexOf(id);
        if (i >= 0) d.vibes.splice(i, 1); else d.vibes.push(id);
        this.renderOnboarding();
      };
    });
    // Mode
    document.querySelectorAll("[data-mode]").forEach((b) => {
      b.onclick = () => { d.mode = b.dataset.mode; this.renderOnboarding(); };
    });

    // Nav
    document.getElementById("onb-back")?.addEventListener("click", () => {
      this.state.onbStep--;
      this.renderOnboarding();
    });
    document.getElementById("onb-next")?.addEventListener("click", () => {
      const TOTAL = 7;
      if (this.state.onbStep < TOTAL - 1) {
        this.state.onbStep++;
        this.renderOnboarding();
      } else {
        // selesai
        this.state.profile = { ...this.state.onbDraft };
        this.state.mode = this.state.profile.mode;
        this.saveProfile();
        this.renderMain();
        this.toast(`🎉 Halo ${this.state.profile.name}! Yuk roll dadu.`);
      }
    });
  },

  // ============================================================
  // MAIN SCREEN
  // ============================================================
  renderMain() {
    const root = document.getElementById("app");
    const p = this.state.profile;
    const mode = MODES[this.state.mode];
    const eligible = Recommender.filter(p, this.state.mode);

    const trending = Recommender.trendingForArea(p.area, 6);

    const greetingHour = new Date().getHours();
    const greeting =
      greetingHour < 11 ? "Selamat pagi"
      : greetingHour < 15 ? "Selamat siang"
      : greetingHour < 18 ? "Selamat sore"
      : "Selamat malam";

    const areaLabel = (BANDUNG_AREAS.find((a) => a.id === p.area) || {}).label || "Bandung";

    root.innerHTML = `
      <header class="app-header">
        <div class="row">
          <div>
            <h1>🍴 MakanApa</h1>
            <div class="tagline">Pertanyaan abadi, jawaban anti-mikir.</div>
          </div>
          <button id="btn-profile" class="btn-profile">
            👤 ${p.name}
          </button>
        </div>
      </header>

      <main class="main">
        <div class="greeting">${greeting}, ${p.name}! Lapar nih?</div>
        <div class="greeting-sub">📍 ${areaLabel} • ${eligible.length} pilihan match dengan profil kamu</div>

        <div class="mode-switcher">
          ${Object.values(MODES).map((m) => `
            <button class="mode-tab ${this.state.mode === m.id ? "active" : ""}" data-switch-mode="${m.id}">
              <span class="em">${m.emoji}</span>
              ${m.label.replace("Mode ","")}
            </button>
          `).join("")}
        </div>
        <div class="mode-tagline">${mode.tagline}</div>

        <div class="cta-row">
          <button class="cta-card dice" id="btn-dice">
            <span class="em">🎲</span>
            <span class="label">Roll Dadu</span>
            <span class="desc">Random 1 makanan, bisa re-roll</span>
          </button>
          <button class="cta-card roulette" id="btn-roulette">
            <span class="em">🎡</span>
            <span class="label">Spin Roulette</span>
            <span class="desc">8 pilihan, putar dan mendarat</span>
          </button>
        </div>

        ${trending.length > 0 ? `
          <div class="section-title">🔥 Lagi Hype di ${areaLabel}</div>
          <div class="trending-grid" id="trending-list">
            ${trending.map((f) => `
              <button class="trend-card" data-food="${f.id}">
                <span class="em">${f.emoji}</span>
                <span class="info">
                  <span class="name">${f.name}</span>
                  <span class="meta">${Recommender.rupiah(f.estPrice)} • <span class="trend-fire">trending</span></span>
                </span>
              </button>
            `).join("")}
          </div>
        ` : ""}
      </main>

      <footer class="app-footer">
        <strong>MakanApa</strong> • Prototype<br>
        Pemesanan dilakukan di platform eksternal. MakanApa hanya menyarankan.
      </footer>

      <div id="modal-root"></div>
    `;

    // Bind
    document.getElementById("btn-profile").onclick = () => this.openProfileMenu();
    document.querySelectorAll("[data-switch-mode]").forEach((b) => {
      b.onclick = () => { this.state.mode = b.dataset.switchMode; this.renderMain(); };
    });
    document.getElementById("btn-dice").onclick = () => this.startDice();
    document.getElementById("btn-roulette").onclick = () => this.startRoulette();
    document.querySelectorAll("[data-food]").forEach((b) => {
      b.onclick = () => {
        const food = FOODS.find((f) => f.id === b.dataset.food);
        if (food) this.openResult(food);
      };
    });
  },

  // ============================================================
  // PROFILE MENU
  // ============================================================
  openProfileMenu() {
    const p = this.state.profile;
    const html = `
      <div class="modal-backdrop" data-close>
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-handle"></div>
          <button class="modal-close" data-close>×</button>
          <div class="modal-body">
            <h2 style="font-size:22px; font-weight:800;">Profil Kamu</h2>
            <p style="color:var(--ink-soft); font-size:13px; margin-bottom:18px;">
              Atur preferensi MakanApa
            </p>
            <div style="background:var(--bg-card); border:1px solid var(--line); border-radius:var(--r-md); padding:14px;">
              <div style="display:grid; gap:8px; font-size:13px;">
                <div><strong>Nama:</strong> ${p.name}</div>
                <div><strong>Lokasi:</strong> ${(BANDUNG_AREAS.find(a=>a.id===p.area)||{}).label || "—"}</div>
                <div><strong>Diet:</strong> ${p.diet.length ? p.diet.join(", ") : "—"}</div>
                <div><strong>Alergi:</strong> ${p.allergies.length ? p.allergies.join(", ") : "—"}</div>
                <div><strong>Toleransi pedas:</strong> level ${p.spice}/5</div>
                <div><strong>Budget:</strong> ${(BUDGET_TIERS.find(b=>b.id===p.budget)||{}).label || "—"}</div>
                <div><strong>Cuisine fav:</strong> ${p.cuisines.length ? p.cuisines.join(", ") : "—"}</div>
                <div><strong>Vibes:</strong> ${p.vibes.length ? p.vibes.join(", ") : "—"}</div>
                <div><strong>Mode default:</strong> ${MODES[p.mode]?.label || "—"}</div>
              </div>
            </div>
            <div style="margin-top:18px; display:grid; gap:8px;">
              <button class="btn-reroll" id="profile-edit">📝 Edit Profil</button>
              <button class="btn-reroll ghost" id="profile-reset">🗑️ Reset Profil</button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.showModal(html, (root) => {
      root.querySelector("#profile-edit").onclick = () => {
        this.state.onbDraft = { ...p };
        this.state.onbStep = 0;
        this.closeModal();
        this.renderOnboarding();
      };
      root.querySelector("#profile-reset").onclick = () => {
        if (confirm("Yakin reset profil? Pengaturan akan hilang.")) {
          this.clearProfile();
          this.closeModal();
          this.startOnboarding();
        }
      };
    });
  },

  // ============================================================
  // DICE
  // ============================================================
  startDice() {
    const eligible = Recommender.filter(this.state.profile, this.state.mode);
    if (eligible.length === 0) {
      this.openEmpty();
      return;
    }
    this.state.excludedIds = [];
    this.rollDice();
  },

  rollDice() {
    const eligible = Recommender.filter(this.state.profile, this.state.mode);
    const food = Recommender.rerollExcluding(eligible, this.state.excludedIds, this.state.profile);
    if (!food) {
      this.openEmpty();
      return;
    }
    this.state.rolledFood = food;
    this.state.excludedIds.push(food.id);

    // Show rolling stage
    const html = `
      <div class="modal-backdrop" data-close>
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-handle"></div>
          <button class="modal-close" data-close>×</button>
          <div class="dice-stage">
            <div class="dice-cube rolling" id="dice-cube">🎲</div>
            <div class="dice-label">Lagi mikir...</div>
            <div class="dice-rolling-text">Otak random sedang bekerja</div>
          </div>
        </div>
      </div>
    `;
    this.showModal(html);

    // After animation, reveal result
    setTimeout(() => {
      const cube = document.getElementById("dice-cube");
      if (cube) {
        cube.classList.remove("rolling");
        cube.textContent = food.emoji;
      }
      setTimeout(() => this.openResult(food, "dice"), 500);
    }, 1400);
  },

  // ============================================================
  // ROULETTE
  // ============================================================
  startRoulette() {
    const eligible = Recommender.filter(this.state.profile, this.state.mode);
    if (eligible.length === 0) {
      this.openEmpty();
      return;
    }
    const N = Math.min(8, eligible.length);
    this.state.rouletteOptions = Recommender.pickN(eligible, N, this.state.profile);
    this.renderRoulette();
  },

  renderRoulette(landedIdx = null) {
    const opts = this.state.rouletteOptions;
    const N = opts.length;
    const colors = ["#F97316", "#14B8A6", "#8B5CF6", "#EC4899", "#0EA5E9", "#FBBF24", "#EF4444", "#10B981"];

    // SVG segments
    const segs = [];
    const labels = [];
    const cx = 150, cy = 150, r = 145;
    for (let i = 0; i < N; i++) {
      const startAngle = (i * 360) / N - 90;
      const endAngle = ((i + 1) * 360) / N - 90;
      const sa = (startAngle * Math.PI) / 180;
      const ea = (endAngle * Math.PI) / 180;
      const x1 = cx + r * Math.cos(sa);
      const y1 = cy + r * Math.sin(sa);
      const x2 = cx + r * Math.cos(ea);
      const y2 = cy + r * Math.sin(ea);
      const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
      const path = `M ${cx},${cy} L ${x1.toFixed(2)},${y1.toFixed(2)} A ${r},${r} 0 ${largeArc},1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`;
      segs.push(`<path d="${path}" fill="${colors[i % colors.length]}" stroke="#fff" stroke-width="2"/>`);

      const midAngle = (startAngle + endAngle) / 2;
      const ma = (midAngle * Math.PI) / 180;
      const lx = cx + (r * 0.62) * Math.cos(ma);
      const ly = cy + (r * 0.62) * Math.sin(ma);
      labels.push(`<text x="${lx.toFixed(2)}" y="${ly.toFixed(2)}" text-anchor="middle" dominant-baseline="middle" font-size="26">${opts[i].emoji}</text>`);
    }

    // Hitung target rotation
    let rotation = 0;
    if (landedIdx !== null) {
      // Segment i berpusat di sudut: (i*360/N + 180/N) - 90 (relatif ke 12 o'clock yang -90)
      // Pointer di top (-90 deg). Wheel harus dirotasi sehingga segment center berada di -90.
      // Jadi rotation = -90 - ((i*360/N) + 180/N - 90) = -((i*360/N) + 180/N)
      const target = -((landedIdx * 360) / N + 180 / N);
      rotation = 360 * 6 + target; // 6 putaran penuh
    }

    const html = `
      <div class="modal-backdrop" data-close>
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-handle"></div>
          <button class="modal-close" data-close>×</button>
          <div class="roulette-stage">
            <div style="font-size:18px; font-weight:800; margin-bottom:14px;">🎡 Spin the Wheel</div>
            <div class="wheel-wrap">
              <div class="wheel-pointer"></div>
              <svg class="wheel-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <g class="wheel-rotor" id="wheel-rotor" style="${landedIdx !== null ? `transform: rotate(${rotation}deg);` : ""}">
                  ${segs.join("")}
                  ${labels.join("")}
                </g>
              </svg>
              <div class="wheel-center">🎯</div>
            </div>
            <div style="margin-top:18px; display:grid; gap:8px;">
              ${landedIdx === null
                ? `<button class="btn-reroll" id="btn-spin">▶ Spin Sekarang!</button>`
                : `<div style="font-size:13px; color:var(--ink-soft);">Mendarat di...</div>`
              }
            </div>
          </div>
        </div>
      </div>
    `;
    this.showModal(html, (root) => {
      const spinBtn = root.querySelector("#btn-spin");
      if (spinBtn) {
        spinBtn.onclick = () => {
          // Pre-pick winner with weighted picker
          const winner = Recommender.pickOne(opts, this.state.profile);
          const winnerIdx = opts.indexOf(winner);
          this.renderRoulette(winnerIdx);
          // Setelah animasi selesai, buka result
          setTimeout(() => this.openResult(winner, "roulette"), 4400);
        };
      }
    });
  },

  // ============================================================
  // RESULT MODAL
  // ============================================================
  openResult(food, fromMode = null) {
    const p = this.state.profile;
    const m = MODES[this.state.mode];
    const badges = Recommender.matchExplain(food, p, this.state.mode);
    const cuisineLabel = (CUISINE_OPTIONS.find((c) => c.id === food.cuisine) || {}).label || food.cuisine;
    const areaLabel = (BANDUNG_AREAS.find((a) => a.id === p.area) || {}).label || "Bandung";
    const leads = Recommender.leads(food, areaLabel);

    const html = `
      <div class="modal-backdrop" data-close>
        <div class="modal" onclick="event.stopPropagation()">
          <button class="modal-close" data-close>×</button>
          <div class="result-hero">
            <span class="em">${food.emoji}</span>
            <h2>${food.name}</h2>
            <div class="price">${Recommender.rupiah(food.estPrice)} • estimasi</div>
            <span class="cuisine-pill">${cuisineLabel}</span>
          </div>

          <div class="modal-body">
            <div class="result-section">
              <p class="result-desc">${food.description}</p>
            </div>

            ${badges.length > 0 ? `
              <div class="result-section">
                <h3>Kenapa cocok</h3>
                <div class="match-badges">
                  ${badges.map((b) => `
                    <span class="match-badge" style="background:${b.color}18; color:${b.color};">
                      ${b.icon} ${b.label}
                    </span>
                  `).join("")}
                </div>
              </div>
            ` : ""}

            ${m.showMacros && food.macros ? `
              <div class="result-section">
                <h3>Estimasi nutrisi (per porsi)</h3>
                <div class="macros">
                  <div class="macro-cell">
                    <div class="v">${food.macros.kcal}</div>
                    <div class="l">kcal</div>
                  </div>
                  <div class="macro-cell">
                    <div class="v">${food.macros.p}g</div>
                    <div class="l">protein</div>
                  </div>
                  <div class="macro-cell">
                    <div class="v">${food.macros.c}g</div>
                    <div class="l">karbo</div>
                  </div>
                  <div class="macro-cell">
                    <div class="v">${food.macros.f}g</div>
                    <div class="l">lemak</div>
                  </div>
                </div>
                <div style="font-size:11px; color:var(--ink-soft); margin-top:6px;">
                  *Estimasi rata-rata. Aktual bisa beda tergantung porsi & resep.
                </div>
              </div>
            ` : ""}

            <div class="result-section">
              <h3>Pesan / cari di mana?</h3>
              <div class="lead-buttons">
                ${leads.map((l) => `
                  <a class="lead-btn" href="${l.url}" target="_blank" rel="noopener" data-lead="${l.id}">
                    <span class="em" style="background:${l.color}22;">${l.emoji}</span>
                    <span class="info">
                      <span class="name">${l.name}</span>
                      <span class="note">${l.note}</span>
                    </span>
                    <span class="arrow">↗</span>
                  </a>
                `).join("")}
              </div>
              <div style="font-size:11px; color:var(--ink-soft); margin-top:8px; text-align:center;">
                Tombol di atas akan membuka platform pihak ketiga di tab baru.
              </div>
            </div>

            ${fromMode === "dice" ? `
              <button class="btn-reroll" id="btn-reroll">🎲 Roll Lagi (gak cocok)</button>
              <button class="btn-reroll ghost" id="btn-finish">✓ Oke, ini aja</button>
            ` : fromMode === "roulette" ? `
              <button class="btn-reroll" id="btn-respin">🎡 Spin Lagi</button>
              <button class="btn-reroll ghost" id="btn-finish">✓ Oke, ini aja</button>
            ` : `
              <button class="btn-reroll ghost" id="btn-finish">Tutup</button>
            `}
          </div>
        </div>
      </div>
    `;

    this.showModal(html, (root) => {
      root.querySelectorAll("[data-lead]").forEach((a) => {
        a.addEventListener("click", () => {
          this.toast(`Membuka ${a.dataset.lead}…`);
        });
      });
      root.querySelector("#btn-reroll")?.addEventListener("click", () => {
        this.rollDice();
      });
      root.querySelector("#btn-respin")?.addEventListener("click", () => {
        this.startRoulette();
      });
      root.querySelector("#btn-finish")?.addEventListener("click", () => {
        this.closeModal();
        this.toast("Selamat makan! 🍽️");
      });
    });
  },

  // ============================================================
  // EMPTY STATE
  // ============================================================
  openEmpty() {
    const html = `
      <div class="modal-backdrop" data-close>
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-handle"></div>
          <button class="modal-close" data-close>×</button>
          <div class="modal-body">
            <div class="empty">
              <div class="em">🥲</div>
              <h2 style="font-size:18px; font-weight:800; margin-top:8px;">Gak ada match dengan filter sekarang</h2>
              <p>Coba ganti mode (misal Free-For-All) atau longgarkan profil lewat tombol profil di atas.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    this.showModal(html);
  },

  // ============================================================
  // MODAL HELPERS
  // ============================================================
  showModal(html, onMount) {
    this.closeModal();
    let root = document.getElementById("modal-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
    }
    root.innerHTML = html;
    root.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target === el) this.closeModal();
      });
    });
    if (onMount) onMount(root);
    document.body.style.overflow = "hidden";
  },

  closeModal() {
    const root = document.getElementById("modal-root");
    if (root) root.innerHTML = "";
    document.body.style.overflow = "";
  },

  // ============================================================
  // TOAST
  // ============================================================
  toast(msg) {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2000);
  }
};

// ============ BOOT ============
document.addEventListener("DOMContentLoaded", () => App.init());
