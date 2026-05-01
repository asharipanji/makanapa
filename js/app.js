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
    terserahQueue: [],       // queue shuffled game IDs untuk Terserah
    lastTerserahGame: null,  // tracker anti-repeat antar cycle
  },

  // ============ INIT ============
  init() {
    this.loadProfile();
    if (!this.state.profile) {
      this.renderLanding();
    } else {
      this.state.mode = this.state.profile.mode || "free-for-all";
      this.renderMain();
    }
  },

  // ============================================================
  // LANDING PAGE — entry point sebelum onboarding
  // ============================================================
  renderLanding() {
    const root = document.getElementById("app");
    root.innerHTML = `
      <section class="landing" aria-labelledby="landing-title">
        <div class="landing-hero">
          <div class="landing-emoji" aria-hidden="true">🍴</div>
          <h1 id="landing-title" class="landing-title">MakanApa</h1>
          <p class="landing-tagline">Pertanyaan Terbesar Umat Manusia.</p>
          <p class="landing-sub">
            Bingung mau makan apa? Pilih cara mulai di bawah.
          </p>
        </div>

        <div class="landing-cta" role="group" aria-label="Pilih cara mulai">
          <button class="landing-btn primary" id="btn-quick" type="button" aria-label="Mulai cepat tanpa isi detail">
            <span class="em" aria-hidden="true">🎲</span>
            <span class="info">
              <span class="label">Terserah</span>
              <span class="desc">Skip detail. Langsung roll dadu sekarang.</span>
            </span>
            <span class="arrow" aria-hidden="true">→</span>
          </button>

          <button class="landing-btn secondary" id="btn-personal" type="button" aria-label="Isi detail personal untuk rekomendasi lebih akurat">
            <span class="em" aria-hidden="true">✨</span>
            <span class="info">
              <span class="label">Isi Detail Personal</span>
              <span class="desc">Diet, alergi, budget — rekomendasi lebih akurat.</span>
            </span>
            <span class="arrow" aria-hidden="true">→</span>
          </button>
        </div>

        <ul class="landing-features" aria-label="Fitur MakanApa">
          <li><span aria-hidden="true">🎲</span><span>Roll dadu acak — re-roll kalau gak cocok</span></li>
          <li><span aria-hidden="true">🎡</span><span>Spin roulette dari 8 pilihan kurasi</span></li>
          <li><span aria-hidden="true">📍</span><span>Khusus Bandung — area sekitar kamu</span></li>
          <li><span aria-hidden="true">🔒</span><span>Data tersimpan di browser. Privat.</span></li>
        </ul>

        <p class="landing-foot">Gratis. Tanpa login. Tanpa pesta data.</p>
      </section>
    `;

    document.getElementById("btn-quick").onclick = () => this.startQuick();
    document.getElementById("btn-personal").onclick = () => this.startOnboarding();
  },

  // Quick start — pakai default profile + langsung mainin random game
  startQuick() {
    this.state.profile = {
      name: "Kamu",
      area: "lainnya",
      diet: [],
      allergies: [],
      spice: 2,
      budget: "medium",
      cuisines: [],
      vibes: [],
      mode: "free-for-all"
    };
    this.state.mode = "free-for-all";
    this.saveProfile();

    // Render main dulu biar di belakang modal udah ada UI
    this.renderMain();
    this.playRandomGame();
  },

  // Definisi 3 game yang dipakai Terserah
  terserahGames() {
    return [
      { id: "dice",     emoji: "🎲", label: "Roll Dadu",   fn: () => this.startDice() },
      { id: "roulette", emoji: "🎡", label: "Spin Wheels", fn: () => this.startRoulette() },
      { id: "slot",     emoji: "🎰", label: "Jackpot",     fn: () => this.startSlot() }
    ];
  },

  // Play random game pakai shuffle-queue: tiap 3x klik pasti kena 3 game beda,
  // dan boundary antar cycle anti-repeat.
  playRandomGame() {
    const all = this.terserahGames();

    // Refill queue kalau kosong
    if (!this.state.terserahQueue || this.state.terserahQueue.length === 0) {
      let queue = all.map((g) => g.id).sort(() => Math.random() - 0.5);
      // Hindari pengulangan di boundary (game terakhir yg dimainkan != game pertama queue baru)
      if (queue[0] === this.state.lastTerserahGame && queue.length > 1) {
        const tmp = queue[0]; queue[0] = queue[1]; queue[1] = tmp;
      }
      this.state.terserahQueue = queue;
    }

    const pickedId = this.state.terserahQueue.shift();
    this.state.lastTerserahGame = pickedId;
    const winner = all.find((g) => g.id === pickedId);

    this.renderTerserahPicker(winner);
  },

  // Modal animasi cycling 3 game emoji, settle di winner, baru jalankan game-nya
  renderTerserahPicker(winner) {
    const all = this.terserahGames();
    const html = `
      <div class="modal-backdrop" data-close>
        <div class="modal" onclick="event.stopPropagation()">
          <button class="modal-close" data-close>×</button>
          <div class="terserah-stage">
            <div class="terserah-title">🎰 Mode Terserah</div>
            <div class="terserah-sub" id="t-sub">Lagi diundi dari 3 game…</div>
            <div class="terserah-emoji shaking" id="t-emoji">🎲</div>
            <div class="terserah-label" id="t-label">Roll Dadu</div>
            <div class="terserah-dots">
              <span class="dot" id="dot-dice">🎲</span>
              <span class="dot" id="dot-roulette">🎡</span>
              <span class="dot" id="dot-slot">🎰</span>
            </div>
          </div>
        </div>
      </div>
    `;

    this.showModal(html, (root) => {
      const emEl = root.querySelector("#t-emoji");
      const labEl = root.querySelector("#t-label");
      const subEl = root.querySelector("#t-sub");
      const dots = {
        dice: root.querySelector("#dot-dice"),
        roulette: root.querySelector("#dot-roulette"),
        slot: root.querySelector("#dot-slot"),
      };

      // Cycle cepat dulu (1.2s @ 85ms = ~14 cycle)
      let i = 0;
      const fastInterval = setInterval(() => {
        i = (i + 1) % all.length;
        emEl.textContent = all[i].emoji;
        labEl.textContent = all[i].label;
        Object.values(dots).forEach((d) => d.classList.remove("active"));
        dots[all[i].id].classList.add("active");
      }, 85);

      // Setelah 1.2s, slow down dan settle ke winner
      setTimeout(() => {
        clearInterval(fastInterval);

        // Slow phase: 4 tick deceleration, ending on winner
        const winnerIdx = all.findIndex((g) => g.id === winner.id);
        const ticks = [
          { idx: (winnerIdx + 2) % all.length, gap: 130 },
          { idx: (winnerIdx + 1) % all.length, gap: 200 },
          { idx: (winnerIdx + 2) % all.length, gap: 280 },
          { idx: winnerIdx,                    gap: 380 }
        ];

        let elapsed = 0;
        ticks.forEach((t, k) => {
          elapsed += t.gap;
          setTimeout(() => {
            const g = all[t.idx];
            emEl.textContent = g.emoji;
            labEl.textContent = g.label;
            Object.values(dots).forEach((d) => d.classList.remove("active"));
            dots[g.id].classList.add("active");
            if (k === ticks.length - 1) {
              emEl.classList.remove("shaking");
              emEl.classList.add("settled");
              subEl.innerHTML = `Yap, kamu kebagian <strong>${winner.label}</strong>!`;
            }
          }, elapsed);
        });

        // Trigger game 700ms setelah tick terakhir
        setTimeout(() => winner.fn(), elapsed + 700);
      }, 1200);
    });
  },

  // ============ STORAGE ============
  loadProfile() {
    try {
      const raw = localStorage.getItem("makanapa_profile");
      if (raw) this.state.profile = JSON.parse(raw);
    } catch {}
    // Migration: drop deprecated diet IDs (no-pork, no-beef)
    if (this.state.profile?.diet) {
      const validIds = new Set(DIET_OPTIONS.map((o) => o.id));
      this.state.profile.diet = this.state.profile.diet.filter((d) => validIds.has(d));
    }
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
            <div class="tagline">Pertanyaan Terbesar Umat Manusia.</div>
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

        <div class="cta-row triple">
          <button class="cta-card dice" id="btn-dice">
            <span class="em">🎲</span>
            <span class="label">Roll Dadu</span>
            <span class="desc">Random 1, bisa re-roll</span>
          </button>
          <button class="cta-card roulette" id="btn-roulette">
            <span class="em">🎡</span>
            <span class="label">Spin Wheels</span>
            <span class="desc">8 pilihan, putar mendarat</span>
          </button>
          <button class="cta-card slot" id="btn-slot">
            <span class="em">🎰</span>
            <span class="label">Jackpot</span>
            <span class="desc">Slot scroll cepat</span>
          </button>
        </div>

        <button class="cta-wide terserah" id="btn-terserah" type="button">
          <span class="em">🎰</span>
          <span class="info">
            <span class="label">Terserah!</span>
            <span class="desc">Random pilih salah satu game di atas — anti mikir total.</span>
          </span>
          <span class="arrow">→</span>
        </button>

        ${trending.length > 0 ? `
          <div class="section-title">🔥 Lagi Hype di ${areaLabel}</div>
          <div class="trending-grid">
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

        ${(() => {
          const viral = Recommender.byTag("viral", 6, p, this.state.mode);
          if (!viral.length) return "";
          return `
            <div class="section-title">🌟 Lagi Viral / FYP</div>
            <div class="trending-grid">
              ${viral.map((f) => `
                <button class="trend-card viral" data-food="${f.id}">
                  <span class="em">${f.emoji}</span>
                  <span class="info">
                    <span class="name">${f.name}</span>
                    <span class="meta">${Recommender.rupiah(f.estPrice)} • <span class="tag-viral">viral</span></span>
                  </span>
                </button>
              `).join("")}
            </div>
          `;
        })()}

        ${(() => {
          const gems = Recommender.byTag("hidden-gem", 6, p, this.state.mode);
          if (!gems.length) return "";
          return `
            <div class="section-title">💎 Hidden Gems Bandung</div>
            <div class="trending-grid">
              ${gems.map((f) => `
                <button class="trend-card gem" data-food="${f.id}">
                  <span class="em">${f.emoji}</span>
                  <span class="info">
                    <span class="name">${f.name}</span>
                    <span class="meta">${Recommender.rupiah(f.estPrice)} • <span class="tag-gem">hidden gem</span></span>
                  </span>
                </button>
              `).join("")}
            </div>
          `;
        })()}

        <section class="ads-slot" aria-label="Slot iklan">
          <div class="ads-slot-inner">
            <div class="ads-icon" aria-hidden="true">📢</div>
            <div class="ads-info">
              <div class="ads-title">Slot Iklan Tersedia</div>
              <div class="ads-desc">
                Promosikan resto, brand kuliner, atau produk kamu ke foodies Bandung.
                Reach audience yang lapar &amp; siap order.
              </div>
              <a href="mailto:ads@makanapa.lol?subject=Iklan%20MakanApa" class="ads-cta">
                📧 ads@makanapa.lol
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer class="app-footer">
        <div class="visitor-counter">
          <a href="https://hits.sh/makanapa.lol/" target="_blank" rel="noopener" aria-label="Total pengunjung MakanApa">
            <img src="https://hits.sh/makanapa.lol.svg?view=total&color=F97316&label=Pengunjung&style=flat-square" alt="Total Pengunjung" loading="lazy">
            <img src="https://hits.sh/makanapa.lol.svg?view=today&color=8B5CF6&label=Hari+ini&style=flat-square" alt="Pengunjung hari ini" loading="lazy">
          </a>
        </div>
        <strong>MakanApa</strong><br>
        Pemesanan dilakukan di platform eksternal. MakanApa hanya menyarankan.<br>
        <span class="footer-ads">
          Mau pasang iklan?
          <a href="mailto:ads@makanapa.lol?subject=Iklan%20MakanApa">ads@makanapa.lol</a>
        </span>
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
    document.getElementById("btn-slot").onclick = () => this.startSlot();
    document.getElementById("btn-terserah").onclick = () => this.playRandomGame();
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
          this.renderLanding();
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
  // ROULETTE — fortune wheel (fixed animation)
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

  renderRoulette() {
    const opts = this.state.rouletteOptions;
    const N = opts.length;
    const colors = ["#F97316", "#14B8A6", "#8B5CF6", "#EC4899", "#0EA5E9", "#FBBF24", "#EF4444", "#10B981"];

    // Build SVG segments + labels
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
      labels.push(`<text x="${lx.toFixed(2)}" y="${ly.toFixed(2)}" text-anchor="middle" dominant-baseline="middle" font-size="28">${opts[i].emoji}</text>`);
    }

    const html = `
      <div class="modal-backdrop" data-close>
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-handle"></div>
          <button class="modal-close" data-close>×</button>
          <div class="roulette-stage">
            <div class="roulette-title">🎡 Spin Wheels</div>
            <div class="roulette-sub" id="roulette-sub">${N} pilihan siap diputar</div>
            <div class="wheel-wrap">
              <div class="wheel-pointer" aria-hidden="true"></div>
              <svg class="wheel-svg" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <g class="wheel-rotor" id="wheel-rotor">
                  ${segs.join("")}
                  ${labels.join("")}
                </g>
              </svg>
              <div class="wheel-center">🎯</div>
            </div>
            <ul class="roulette-list" id="roulette-list">
              ${opts.map((f, i) => `
                <li data-i="${i}">
                  <span class="dot" style="background:${colors[i % colors.length]}"></span>
                  <span class="em">${f.emoji}</span>
                  <span class="nm">${f.name}</span>
                </li>
              `).join("")}
            </ul>
            <div class="roulette-actions">
              <button class="btn-reroll" id="btn-spin">▶ Spin Sekarang!</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.showModal(html, (root) => {
      const rotor = root.querySelector("#wheel-rotor");
      const spinBtn = root.querySelector("#btn-spin");
      const subEl = root.querySelector("#roulette-sub");
      const listEl = root.querySelector("#roulette-list");
      let spinning = false;

      const doSpin = () => {
        if (spinning) return;
        spinning = true;

        // Pick winner via weighted RNG
        const winner = Recommender.pickOne(opts, this.state.profile);
        const winnerIdx = opts.indexOf(winner);

        // Compute target rotation
        // Segment center sudut absolut: (i*360/N) + (180/N) - 90 (dari -y axis = top)
        // Pointer di -90 (top). Mau segment center @ -90 → rotor harus dirotasi: -((i*360/N) + 180/N)
        // Jitter random ±(180/N/2) supaya enggak selalu landing pas center
        const baseTarget = -((winnerIdx * 360) / N + 180 / N);
        const jitter = (Math.random() - 0.5) * (180 / N) * 0.7;
        const rotation = 360 * 6 + baseTarget + jitter;

        // Trigger CSS transition: set transform on existing element so transition fires
        // Use rAF to ensure browser paints initial state before applying target
        requestAnimationFrame(() => {
          rotor.style.transform = `rotate(${rotation}deg)`;
        });

        spinBtn.disabled = true;
        spinBtn.textContent = "⏳ Sedang berputar...";
        subEl.textContent = "Tahan napas...";

        // Highlight winner item in list
        setTimeout(() => {
          listEl.querySelectorAll("li").forEach((li) => li.classList.remove("win"));
          const winLi = listEl.querySelector(`li[data-i="${winnerIdx}"]`);
          if (winLi) winLi.classList.add("win");
          subEl.innerHTML = `🎯 Mendarat di <strong>${winner.name}</strong>`;
        }, 4000);

        setTimeout(() => this.openResult(winner, "roulette"), 4600);
      };

      spinBtn.onclick = doSpin;
    });
  },

  // ============================================================
  // SPIN WHEEL — slot machine style
  // ============================================================
  startSlot() {
    const eligible = Recommender.filter(this.state.profile, this.state.mode);
    if (eligible.length === 0) {
      this.openEmpty();
      return;
    }
    this.renderSlot(eligible);
  },

  renderSlot(eligible) {
    const winner = Recommender.pickOne(eligible, this.state.profile);
    const STRIP_LEN = 28;        // total kartu di strip
    const WINNER_AT = 24;        // posisi winner (0-indexed)
    const CARD_H = 84;           // tinggi kartu px (sinkron CSS)

    // Build strip: random foods, masukkan winner di posisi WINNER_AT
    const strip = [];
    for (let i = 0; i < STRIP_LEN; i++) {
      if (i === WINNER_AT) {
        strip.push(winner);
      } else {
        // shuffle, jangan sampai winner duplikat persis sebelum winner-position
        let pick;
        do {
          pick = eligible[Math.floor(Math.random() * eligible.length)];
        } while (i === WINNER_AT - 1 && pick.id === winner.id);
        strip.push(pick);
      }
    }

    const cuisineLabel = (id) => (CUISINE_OPTIONS.find((c) => c.id === id) || {}).label || id;

    const cardsHtml = strip.map((f) => `
      <div class="slot-card">
        <span class="em">${f.emoji}</span>
        <span class="info">
          <span class="nm">${f.name}</span>
          <span class="meta">${cuisineLabel(f.cuisine)} • ${Recommender.rupiah(f.estPrice)}</span>
        </span>
      </div>
    `).join("");

    const html = `
      <div class="modal-backdrop" data-close>
        <div class="modal" onclick="event.stopPropagation()">
          <div class="modal-handle"></div>
          <button class="modal-close" data-close>×</button>
          <div class="slot-stage">
            <div class="slot-title">🎰 Jackpot</div>
            <div class="slot-sub" id="slot-sub">Tarik tuasnya. Stop di mana, di situlah kamu makan.</div>
            <div class="slot-machine">
              <div class="slot-window" aria-hidden="true">
                <div class="slot-strip" id="slot-strip" style="transform: translateY(0px);">
                  ${cardsHtml}
                </div>
                <div class="slot-frame top"></div>
                <div class="slot-frame bottom"></div>
                <div class="slot-marker"></div>
              </div>
            </div>
            <div class="slot-actions">
              <button class="btn-reroll" id="btn-slot-spin">⬇ Tarik Tuas</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.showModal(html, (root) => {
      const stripEl = root.querySelector("#slot-strip");
      const subEl = root.querySelector("#slot-sub");
      const btn = root.querySelector("#btn-slot-spin");
      let spinning = false;

      btn.onclick = () => {
        if (spinning) return;
        spinning = true;

        // Calculate target offset: window shows 1 card at a time, marker at center.
        // Strip starts at translateY(0). Card at index `WINNER_AT` should land at center.
        // window height = CARD_H, so to center card i, translateY = -(i * CARD_H)
        // Add small jitter so not pixel-perfect (but still inside winner card).
        const jitter = (Math.random() - 0.5) * (CARD_H * 0.4);
        const offset = -(WINNER_AT * CARD_H) + jitter;

        requestAnimationFrame(() => {
          stripEl.style.transform = `translateY(${offset}px)`;
        });

        btn.disabled = true;
        btn.textContent = "⏳ Berputar...";
        subEl.textContent = "Lagi mikir keras...";

        setTimeout(() => {
          subEl.innerHTML = `🎯 <strong>${winner.name}</strong>! Yuk pesan.`;
        }, 3400);

        setTimeout(() => this.openResult(winner, "slot"), 3700);
      };
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
              <button class="btn-reroll" id="btn-respin">🎡 Spin Wheels Lagi</button>
              <button class="btn-reroll ghost" id="btn-finish">✓ Oke, ini aja</button>
            ` : fromMode === "slot" ? `
              <button class="btn-reroll" id="btn-reslot">🎰 Tarik Tuas Lagi</button>
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
      root.querySelector("#btn-reslot")?.addEventListener("click", () => {
        this.startSlot();
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
