// ============================================================
// MakanApa — Recommender Engine
// ============================================================

const Recommender = {
  /**
   * Filter list makanan berdasarkan profile + mode.
   * Hard filter: diet, alergi, mode minHealthScore.
   * Soft preference: cuisine, vibes, spice, budget (boost score, bukan exclude).
   */
  filter(profile, mode, foods = FOODS) {
    return foods.filter((f) => {
      // Hard filter 1: diet
      if (profile.diet?.length > 0) {
        // Misal user vegetarian, makanan harus include 'vegetarian' atau 'vegan'.
        // Kecuali pengguna pilih lebih dari 1 (mis. halal+no-pork), semuanya harus matched.
        for (const d of profile.diet) {
          if (!this.foodMatchesDiet(f, d)) return false;
        }
      }
      // Hard filter 2: allergies (apapun yg user alergi, tidak boleh ada di makanan)
      if (profile.allergies?.length > 0) {
        for (const a of profile.allergies) {
          if (f.allergies?.includes(a)) return false;
        }
      }
      // Hard filter 3: spice tolerance
      if (typeof profile.spice === "number") {
        if (f.spice > profile.spice) return false;
      }
      // Hard filter 4: budget
      if (profile.budget) {
        const tierRank = { low: 1, medium: 2, high: 3 };
        if (tierRank[f.priceTier] > tierRank[profile.budget]) return false;
      }
      // Hard filter 5: mode minHealthScore
      const m = MODES[mode];
      if (m && f.healthScore < m.minHealthScore) return false;

      return true;
    });
  },

  /**
   * Apakah makanan match dengan diet tertentu.
   * Implementasi konservatif: kalau diet user = 'vegan', makanan harus include 'vegan'.
   * Kalau diet user = 'halal', makanan harus include 'halal'.
   */
  foodMatchesDiet(food, dietId) {
    const fd = food.diet || [];
    switch (dietId) {
      case "halal":       return fd.includes("halal");
      case "vegetarian":  return fd.includes("vegetarian") || fd.includes("vegan");
      case "vegan":       return fd.includes("vegan");
      case "pescatarian": return fd.includes("pescatarian") || fd.includes("vegetarian") || fd.includes("vegan");
      // Pork & Beef = positive preference (boost via scoreFood), bukan exclusion
      case "pork":        return true;
      case "beef":        return true;
      case "gluten-free": return !(food.allergies || []).includes("gluten");
      case "low-carb":    return (food.macros?.c ?? 0) <= 40;
      default: return true;
    }
  },

  /**
   * Skor preference untuk soft-ranking (cuisine match, vibes match, dst).
   */
  scoreFood(food, profile) {
    let s = 0;
    const tags = food.tags || [];

    if (profile.cuisines?.length) {
      // Cuisine real (indonesian/japanese/dst.)
      if (profile.cuisines.includes(food.cuisine)) s += 3;
      // Pseudo-cuisine: "fyp" = boost makanan tag fyp+viral
      if (profile.cuisines.includes("fyp") && (tags.includes("fyp") || tags.includes("viral"))) {
        s += 3;
      }
      // Pseudo-cuisine: "trending" = boost makanan isTrending atau hype umum
      if (profile.cuisines.includes("trending") && (food.isTrending || tags.includes("viral"))) {
        s += 3;
      }
    }
    if (profile.vibes?.length) {
      const overlap = (food.vibes || []).filter((v) => profile.vibes.includes(v)).length;
      s += overlap * 2;
    }
    // Diet preferences (positive boost, bukan exclusion)
    if (profile.diet?.includes("pork") && /pork|babi|bacon|ham/i.test(food.name)) s += 2;
    if (profile.diet?.includes("beef") && /beef|sapi|rendang|steak|burger|kwetiau|kebab|bibimbap|yakiniku|smashed/i.test(food.name)) s += 2;
    // Lokasi: kalau makanan trending di area user, boost
    if (profile.area && (food.trendingAreas || []).includes(profile.area)) {
      s += 2;
    }
    if (food.isTrending) s += 1;
    // Tag-based boost
    if (tags.includes("viral")) s += 2;
    if (tags.includes("fyp")) s += 1.5;
    if (tags.includes("hidden-gem")) s += 1;
    return s;
  },

  /**
   * Pick 1 random secara weighted: makanan dengan score lebih tinggi lebih sering muncul.
   * Tetap stochastic untuk fun.
   */
  pickOne(eligible, profile) {
    if (eligible.length === 0) return null;
    // weighted: minimal weight 1, plus bonus dari scoreFood
    const weights = eligible.map((f) => 1 + this.scoreFood(f, profile));
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < eligible.length; i++) {
      r -= weights[i];
      if (r <= 0) return eligible[i];
    }
    return eligible[eligible.length - 1];
  },

  /**
   * Pick N tanpa duplikat untuk roulette.
   */
  pickN(eligible, n, profile) {
    const result = [];
    const pool = [...eligible];
    while (result.length < n && pool.length > 0) {
      const pick = this.pickOne(pool, profile);
      if (!pick) break;
      result.push(pick);
      const idx = pool.indexOf(pick);
      pool.splice(idx, 1);
    }
    return result;
  },

  /**
   * Re-roll: dapat makanan berbeda dari yang sebelumnya.
   */
  rerollExcluding(eligible, excludeIds, profile) {
    const pool = eligible.filter((f) => !excludeIds.includes(f.id));
    if (pool.length === 0) return this.pickOne(eligible, profile); // fallback kalau exhausted
    return this.pickOne(pool, profile);
  },

  /**
   * Generate badges yang menjelaskan kenapa makanan ini cocok untuk user.
   */
  matchExplain(food, profile, mode) {
    const badges = [];
    const m = MODES[mode];

    if (profile.diet?.length) {
      const allMatch = profile.diet.every((d) => this.foodMatchesDiet(food, d));
      if (allMatch) badges.push({ icon: "✓", label: "Sesuai diet kamu", color: "#16A34A" });
    }
    if (profile.allergies?.length) {
      const safe = !profile.allergies.some((a) => (food.allergies || []).includes(a));
      if (safe) badges.push({ icon: "🛡️", label: "Aman dari alergi", color: "#0EA5E9" });
    }
    if (food.spice <= (profile.spice ?? 5)) {
      badges.push({ icon: "🌶️", label: `Pedas lvl ${food.spice}`, color: "#F97316" });
    }
    if (profile.cuisines?.includes(food.cuisine)) {
      const cm = CUISINE_OPTIONS.find((c) => c.id === food.cuisine);
      if (cm) badges.push({ icon: cm.emoji, label: `Cuisine fav`, color: "#8B5CF6" });
    }
    if (food.isTrending && profile.area && (food.trendingAreas || []).includes(profile.area)) {
      const am = BANDUNG_AREAS.find((a) => a.id === profile.area);
      if (am) badges.push({ icon: "🔥", label: `Hype di ${am.label}`, color: "#EF4444" });
    } else if (food.isTrending) {
      badges.push({ icon: "🔥", label: "Trending", color: "#EF4444" });
    }
    const tags = food.tags || [];
    if (tags.includes("viral")) badges.push({ icon: "🌟", label: "Viral", color: "#EC4899" });
    if (tags.includes("fyp")) badges.push({ icon: "📱", label: "FYP", color: "#0EA5E9" });
    if (tags.includes("hidden-gem")) badges.push({ icon: "💎", label: "Hidden gem", color: "#8B5CF6" });
    if (m?.minHealthScore >= 7 && food.healthScore >= 8) {
      badges.push({ icon: "💚", label: "Pilihan sehat", color: "#16A34A" });
    }
    return badges;
  },

  /**
   * Items dengan tag tertentu untuk section khusus.
   */
  byTag(tag, limit = 6, profile = null, mode = null) {
    let pool = FOODS.filter((f) => (f.tags || []).includes(tag));
    if (profile && mode) {
      pool = this.filter(profile, mode, pool);
    }
    // Sort by score (kalau ada profile) atau acak
    if (profile) {
      pool.sort((a, b) => this.scoreFood(b, profile) - this.scoreFood(a, profile));
    } else {
      pool.sort(() => Math.random() - 0.5);
    }
    return pool.slice(0, limit);
  },

  /**
   * Format Rupiah.
   */
  rupiah(n) {
    return "Rp " + Math.round(n).toLocaleString("id-ID");
  },

  /**
   * Generate lead URLs: untuk pesan/cari, semua ke platform eksternal.
   */
  leads(food, areaLabel = "Bandung") {
    const q = encodeURIComponent(food.name);
    const qLoc = encodeURIComponent(`${food.name} ${areaLabel}`);
    return [
      {
        id: "gofood",
        name: "GoFood",
        emoji: "🛵",
        color: "#00AA13",
        url: `https://gofood.co.id/bandung/search?keyword=${q}`,
        note: "Cari di GoFood Bandung"
      },
      {
        id: "grabfood",
        name: "GrabFood",
        emoji: "🟢",
        color: "#00B14F",
        url: `https://food.grab.com/id/id/restaurants?search=${q}`,
        note: "Cari di GrabFood"
      },
      {
        id: "shopeefood",
        name: "ShopeeFood",
        emoji: "🟠",
        color: "#EE4D2D",
        url: `https://shopee.co.id/m/shopeefood?keyword=${q}`,
        note: "Cari di ShopeeFood"
      },
      {
        id: "maps",
        name: "Google Maps",
        emoji: "🗺️",
        color: "#4285F4",
        url: `https://www.google.com/maps/search/${qLoc}`,
        note: "Resto/warung terdekat"
      },
      {
        id: "tokopedia",
        name: "Tokopedia / e-Grocery",
        emoji: "🛒",
        color: "#03AC0E",
        url: `https://www.tokopedia.com/search?q=${q}`,
        note: "Bahan masak sendiri"
      }
    ];
  },

  /**
   * Top trending foods untuk area user.
   */
  trendingForArea(areaId, limit = 6) {
    const trending = FOODS.filter((f) => f.isTrending);
    if (!areaId || areaId === "lainnya") {
      return trending.slice(0, limit);
    }
    const inArea = trending.filter((f) => (f.trendingAreas || []).includes(areaId));
    if (inArea.length >= limit) return inArea.slice(0, limit);
    // mix: area-specific dulu, sisanya general trending
    const others = trending.filter((f) => !inArea.includes(f));
    return [...inArea, ...others].slice(0, limit);
  }
};
