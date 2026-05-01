# 🍴 MakanApa

> Pertanyaan Terbesar Umat Manusia: **makan apa ya?**

Web app vanilla (HTML/CSS/JS, **tanpa build step**) yang bantu kamu jawab pertanyaan itu lewat **dadu**, **roulette**, atau **spin wheel slot**, disesuaikan dengan profil & mode (Ahli Gizi / Nutritionist / Free-for-All).

---

## ⚡ Cara Menjalankan

**Opsi 1 — Buka langsung:**
```bash
open index.html       # macOS
xdg-open index.html   # Linux
start index.html      # Windows
```

**Opsi 2 — Local server:**
```bash
python3 -m http.server 8000
# atau
npx serve .
```
Lalu buka `http://localhost:8000`.

**Opsi 3 — Claude Code:**
```bash
cd makanapa
claude
```

---

## 📁 Struktur Project

```
makanapa/
├── index.html              # entry point (app shell)
├── css/
│   └── styles.css          # stylesheet, mobile-first, dadu/roulette animation
├── js/
│   ├── data.js             # 45 makanan + opsi onboarding + area Bandung
│   ├── recommender.js      # filter, scoring, lead URL builder
│   └── app.js              # state, onboarding, dadu, roulette, result modal
└── README.md
```

---

## 🎯 Fitur

### Onboarding 7 Langkah
1. **Nama + Lokasi** — pilih area Bandung (Dago, Riau, Cihampelas, Pasteur, dst.)
2. **Diet** — Halal, Vegetarian, Vegan, Pescatarian, No Pork, No Beef, Gluten-free, Low-carb
3. **Alergi** — Kacang, Seafood, Susu, Telur, Gluten, Kedelai
4. **Toleransi pedas** — level 0–5 (Tidak pedas → Apocalypse 💀)
5. **Budget** — Hemat (< 30rb) / Standar (30–75rb) / Premium (> 75rb)
6. **Cuisine + Vibes** — multi-select cuisine favorit & vibes makan
7. **Mode default** — Ahli Gizi / Nutritionist / Free-For-All

Profil disimpan di `localStorage`. Bisa di-edit / reset lewat tombol profil di header.

### 3 Mode

| Mode | Filter | Macros |
|---|---|---|
| 🩺 **Ahli Gizi** | Hanya healthScore ≥ 7 | ✓ tampil |
| 🥗 **Nutritionist** | healthScore ≥ 5 | ✓ tampil |
| 🎉 **Free-For-All** | Semua boleh | — |

Mode bisa diganti kapan saja di mode-switcher di main screen.

### Dadu 🎲 (Bisa Re-roll)
- Klik **"Roll Dadu"** → animasi dadu berputar 1.4 detik → reveal 1 makanan
- Tombol **"Roll Lagi (gak cocok)"** untuk reroll, dan tracker exclude `excludedIds` memastikan reroll dapat makanan **berbeda** dari yang sudah keluar
- Tombol **"Oke, ini aja"** untuk tutup dengan vibes positif

### Roulette 🎡
- Klik **"Spin Roulette"** → 8 makanan eligible diatur dalam wheel SVG (8 segment warna-warni)
- Klik **"Spin Sekarang"** → wheel berputar 6 putaran penuh dengan cubic-bezier easing → mendarat di pilihan
- Pemenang sudah dipilih dulu via weighted picker, lalu rotation dihitung supaya pointer tepat di segmen pemenang
- Tombol **"Spin Lagi"** untuk re-spin dengan 8 opsi baru

### Hasil Detail
Setiap result modal menampilkan:
- Foto emoji besar + nama + harga estimasi + cuisine pill
- Deskripsi singkat
- **Match badges**: "Sesuai diet", "Aman dari alergi", "Hype di {area}", "Pilihan sehat", dll
- **Macros breakdown** (kcal/protein/karbo/lemak) — tampil di mode Ahli Gizi & Nutritionist
- **Lead buttons keluar platform**:
  - 🛵 GoFood — search by nama makanan
  - 🟢 GrabFood — search
  - 🟠 ShopeeFood — search
  - 🗺️ Google Maps — cari resto/warung terdekat
  - 🛒 Tokopedia / e-Grocery — bahan masak sendiri
- Reroll / re-spin buttons

### Trending di Bandung 🔥
Section "Lagi Hype di {area}" menampilkan makanan trending khusus area user:
- **Dago**: salmon poke, croffle, smoothie bowl, KFC Korea
- **Pasteur**: salmon mentai, KFC Korea, tteokbokki, Korean corndog
- **BKR/Buah Batu**: baso aci, seblak, Korean corndog
- **Riau**: brunch trendy, dessert box, croffle
- Default trending kalau area = "Lainnya"

### Recommender Logic
**Hard filters** (exclude):
- Diet (vegetarian, halal, low-carb, gluten-free, etc.)
- Alergi (allergens harus tidak overlap)
- Pedas (food.spice ≤ profile.spice)
- Budget (priceTier ≤ profile.budget)
- Mode (healthScore ≥ minHealthScore)

**Soft preference** (weight boost untuk pickOne weighted random):
- Cuisine match: +3
- Vibe overlap: +2 per match
- Trending di area user: +2
- Trending umum: +1

Hasil: makanan favorit lebih sering keluar tapi tetap ada element kejutan.

---

## 🔌 Lead Handoff (Keluar Platform)

MakanApa **tidak** punya checkout/paywall sendiri. Semua pemesanan diarahkan ke platform eksternal lewat URL search:

```
GoFood:     https://gofood.co.id/bandung/search?keyword={nama}
GrabFood:   https://food.grab.com/id/id/restaurants?search={nama}
ShopeeFood: https://shopee.co.id/m/shopeefood?keyword={nama}
Maps:       https://www.google.com/maps/search/{nama}+{area}
Tokopedia:  https://www.tokopedia.com/search?q={nama}
```

Klik tombol → buka platform di tab baru. Selesai.

---

## 🛠️ Roadmap (di Claude Code)

1. **Real geolocation** — `navigator.geolocation` untuk auto-detect area
2. **Mood-based picker** — input "lagi sedih / pengen comfort food" → AI rekomendasi
3. **Group voting** — 1 link share, beberapa orang vote, sistem pilih
4. **Riwayat & no-repeat** — tidak menyarankan makanan yang sama 3 hari berturut-turut
5. **Resep kalau pilih masak sendiri** — link ke YouTube / Cookpad
6. **Rating personal** — user bisa kasih ⭐ ke makanan, mempengaruhi rekomendasi
7. **Push notification** — "Sudah jam makan siang nih, mau roll?"
8. **PWA installable**

---

## ⚠️ Catatan

- Estimasi harga & macros adalah representasi rata-rata — bukan medical/dietary advice
- Mode Ahli Gizi/Nutritionist bukan pengganti konsultasi dengan ahli gizi profesional
- Lead URL bersifat **search query** ke platform, bukan deep link ke resto spesifik. Resto/warung yang muncul tergantung lokasi user dan ketersediaan di platform tersebut
- Beberapa nama makanan mengandung istilah lokal (cuanki, tutug oncom, lotek, dst.) yang khas Bandung/Sunda

---

Made with 🍴 for the eternal "makan apa ya?" struggle.
