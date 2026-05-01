// ============================================================
// MakanApa — Database Makanan & Konfigurasi Onboarding
// ============================================================

// --------- OPSI ONBOARDING ---------
const DIET_OPTIONS = [
  { id: "halal",        label: "Halal",        emoji: "🕌" },
  { id: "vegetarian",   label: "Vegetarian",   emoji: "🥗" },
  { id: "vegan",        label: "Vegan",        emoji: "🌱" },
  { id: "pescatarian",  label: "Pescatarian",  emoji: "🐟" },
  { id: "pork",         label: "Pork",         emoji: "🐷" },
  { id: "beef",         label: "Beef",         emoji: "🐄" },
  { id: "gluten-free",  label: "Gluten-free",  emoji: "🌾" },
  { id: "low-carb",     label: "Low-carb",     emoji: "🥑" }
];

const ALLERGY_OPTIONS = [
  { id: "nuts",     label: "Kacang",   emoji: "🥜" },
  { id: "seafood",  label: "Seafood",  emoji: "🦐" },
  { id: "dairy",    label: "Susu",     emoji: "🥛" },
  { id: "eggs",     label: "Telur",    emoji: "🥚" },
  { id: "gluten",   label: "Gluten",   emoji: "🍞" },
  { id: "soy",      label: "Kedelai",  emoji: "🫘" }
];

const CUISINE_OPTIONS = [
  { id: "trending",       label: "Trending",       emoji: "🔥" },
  { id: "fyp",            label: "FYP / Viral",    emoji: "📱" },
  { id: "indonesian",     label: "Indonesia",      emoji: "🇮🇩" },
  { id: "sundanese",      label: "Sunda/Bandung",  emoji: "🌾" },
  { id: "japanese",       label: "Jepang",         emoji: "🇯🇵" },
  { id: "korean",         label: "Korea",          emoji: "🇰🇷" },
  { id: "chinese",        label: "Chinese",        emoji: "🥡" },
  { id: "western",        label: "Western",        emoji: "🍕" },
  { id: "middle-eastern", label: "Timur Tengah",   emoji: "🥙" },
  { id: "fusion",         label: "Fusion/Trendy",  emoji: "✨" }
];

const VIBE_OPTIONS = [
  { id: "comfort",   label: "Comfort food",  emoji: "🤗" },
  { id: "healthy",   label: "Sehat & ringan", emoji: "🥗" },
  { id: "indulgent", label: "Indulgent",     emoji: "🍔" },
  { id: "hearty",    label: "Mengenyangkan", emoji: "🍖" },
  { id: "spicy",     label: "Pedas-pedas",   emoji: "🌶️" },
  { id: "sweet",     label: "Manis",         emoji: "🍰" }
];

const BUDGET_TIERS = [
  { id: "low",    label: "Hemat",     range: "< Rp 30rb",       emoji: "🪙" },
  { id: "medium", label: "Standar",   range: "Rp 30-75rb",     emoji: "💵" },
  { id: "high",   label: "Premium",   range: "> Rp 75rb",      emoji: "💎" }
];

const SPICE_LEVELS = [
  { id: 0, label: "Tidak pedas",   emoji: "🥛" },
  { id: 1, label: "Sedikit",       emoji: "🌶" },
  { id: 2, label: "Sedang",        emoji: "🌶🌶" },
  { id: 3, label: "Pedas",         emoji: "🌶🌶🌶" },
  { id: 4, label: "Pedas banget",  emoji: "🔥" },
  { id: 5, label: "Apocalypse",    emoji: "💀" }
];

const MODES = {
  "ahli-gizi": {
    id: "ahli-gizi",
    label: "Mode Ahli Gizi",
    emoji: "🩺",
    color: "#16A34A",
    tagline: "Strict mode. Cuma yang seimbang & bergizi.",
    minHealthScore: 7,
    showMacros: true
  },
  "nutritionist": {
    id: "nutritionist",
    label: "Mode Nutritionist",
    emoji: "🥗",
    color: "#0EA5E9",
    tagline: "Sehat tapi tetap enak. Balance is key.",
    minHealthScore: 5,
    showMacros: true
  },
  "free-for-all": {
    id: "free-for-all",
    label: "Free-For-All",
    emoji: "🎉",
    color: "#F97316",
    tagline: "YOLO. Apa aja boleh, yang penting kenyang.",
    minHealthScore: 0,
    showMacros: false
  }
};

// --------- AREA & TRENDING BANDUNG ---------
const BANDUNG_AREAS = [
  { id: "dago",        label: "Dago",                    vibe: "kafe specialty + brunch" },
  { id: "riau",        label: "Riau / Martadinata",      vibe: "brunch & cafe modern" },
  { id: "cihampelas",  label: "Cihampelas",              vibe: "street food & mall food" },
  { id: "buah-batu",   label: "Buah Batu",               vibe: "street food anak muda" },
  { id: "pasteur",     label: "Pasteur",                 vibe: "kuliner trending Korea/Jepang" },
  { id: "sukajadi",    label: "Sukajadi / Setiabudi",    vibe: "resto premium & cafe" },
  { id: "antapani",    label: "Antapani",                vibe: "warung community" },
  { id: "cibadak",     label: "Cibadak",                 vibe: "kuliner legendaris" },
  { id: "bkr",         label: "BKR / Buah Batu Selatan", vibe: "seblak & street snack" },
  { id: "lainnya",     label: "Area lain Bandung",       vibe: "campur" }
];

// --------- DATABASE MAKANAN ---------
// healthScore: 1 (tidak sehat) – 10 (sangat sehat)
// macros estimasi per porsi standar
const FOODS = [
  // ============ INDONESIAN MAINSTREAM ============
  {
    id: "nasi-goreng", name: "Nasi Goreng", emoji: "🍛",
    cuisine: "indonesian", vibes: ["comfort", "savory"],
    diet: ["halal"], allergies: ["eggs"], spice: 2,
    priceTier: "low", estPrice: 25000,
    healthScore: 4, macros: { kcal: 580, p: 18, c: 75, f: 22 },
    description: "Nasi goreng kampung dengan telur ceplok. Klasik abadi.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "mie-ayam", name: "Mie Ayam Bakso", emoji: "🍜",
    cuisine: "indonesian", vibes: ["comfort"],
    diet: ["halal"], allergies: ["gluten"], spice: 1,
    priceTier: "low", estPrice: 22000,
    healthScore: 5, macros: { kcal: 520, p: 22, c: 70, f: 14 },
    description: "Mie ayam jamur ditambah baso dan pangsit. Hangat di hati.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "soto-ayam", name: "Soto Ayam", emoji: "🍲",
    cuisine: "indonesian", vibes: ["comfort", "healthy"],
    diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 25000,
    healthScore: 7, macros: { kcal: 380, p: 28, c: 35, f: 12 },
    description: "Kuah kuning bening, ayam suwir, taburan bawang goreng. Comfort tapi tetap ringan.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "ayam-geprek", name: "Ayam Geprek Sambal Bawang", emoji: "🍗",
    cuisine: "indonesian", vibes: ["spicy", "comfort"],
    diet: ["halal"], allergies: ["gluten"], spice: 4,
    priceTier: "low", estPrice: 25000,
    healthScore: 4, macros: { kcal: 720, p: 38, c: 55, f: 38 },
    description: "Ayam crispy digeprek bareng sambal bawang. Pedasnya nampar.",
    isTrending: false, trendingAreas: ["antapani", "buah-batu"]
  },
  {
    id: "sate-ayam", name: "Sate Ayam Madura", emoji: "🍢",
    cuisine: "indonesian", vibes: ["hearty"],
    diet: ["halal"], allergies: ["nuts"], spice: 1,
    priceTier: "medium", estPrice: 35000,
    healthScore: 6, macros: { kcal: 480, p: 35, c: 28, f: 22 },
    description: "10 tusuk sate ayam saus kacang + lontong. Klasik yang gak pernah salah.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "rendang", name: "Nasi Padang Rendang", emoji: "🍛",
    cuisine: "indonesian", vibes: ["hearty", "indulgent"],
    diet: ["halal"], allergies: [], spice: 3,
    priceTier: "medium", estPrice: 38000,
    healthScore: 5, macros: { kcal: 720, p: 32, c: 65, f: 38 },
    description: "Rendang yang kelam, dalam, dan penuh rempah. Komplit nasi + sayur singkong.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "bakso", name: "Bakso Urat Komplit", emoji: "🍲",
    cuisine: "indonesian", vibes: ["comfort"],
    diet: ["halal"], allergies: ["gluten"], spice: 1,
    priceTier: "low", estPrice: 28000,
    healthScore: 5, macros: { kcal: 480, p: 25, c: 50, f: 18 },
    description: "Bakso urat kenyal, kuah kaldu sapi, mie + bihun. Bandung approved.",
    isTrending: false, trendingAreas: ["cihampelas"]
  },
  {
    id: "indomie-goreng", name: "Indomie Goreng Telor", emoji: "🍳",
    cuisine: "indonesian", vibes: ["comfort", "indulgent"],
    diet: ["halal"], allergies: ["gluten", "eggs"], spice: 1,
    priceTier: "low", estPrice: 12000,
    healthScore: 2, macros: { kcal: 580, p: 14, c: 75, f: 24 },
    description: "Mie instan + telur ceplok + cabe rawit. Ekonomis tapi nampol.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "pecel-lele", name: "Pecel Lele Sambal Terasi", emoji: "🐟",
    cuisine: "indonesian", vibes: ["comfort", "spicy"],
    diet: ["halal"], allergies: ["seafood"], spice: 3,
    priceTier: "low", estPrice: 22000,
    healthScore: 5, macros: { kcal: 540, p: 30, c: 55, f: 22 },
    description: "Lele goreng crispy + sambal terasi + lalapan. Warkop vibes.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "ayam-kremes", name: "Ayam Goreng Kremes", emoji: "🍗",
    cuisine: "indonesian", vibes: ["indulgent", "hearty"],
    diet: ["halal"], allergies: ["gluten"], spice: 0,
    priceTier: "medium", estPrice: 32000,
    healthScore: 4, macros: { kcal: 680, p: 36, c: 50, f: 36 },
    description: "Ayam goreng dengan taburan kremesan crispy. Childhood unlocked.",
    isTrending: false, trendingAreas: []
  },

  // ============ SUNDANESE / BANDUNG ============
  {
    id: "lotek", name: "Lotek Khas Sunda", emoji: "🥬",
    cuisine: "sundanese", vibes: ["healthy", "light"],
    diet: ["halal", "vegetarian"], allergies: ["nuts"], spice: 2,
    priceTier: "low", estPrice: 22000,
    healthScore: 8, macros: { kcal: 380, p: 14, c: 50, f: 14 },
    description: "Sayuran rebus + bumbu kacang pedas manis + lontong. Versi Sunda dari gado-gado.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "karedok", name: "Karedok", emoji: "🥗",
    cuisine: "sundanese", vibes: ["healthy", "light"],
    diet: ["halal", "vegetarian", "vegan"], allergies: ["nuts"], spice: 2,
    priceTier: "low", estPrice: 20000,
    healthScore: 9, macros: { kcal: 320, p: 12, c: 38, f: 14 },
    description: "Sayuran mentah segar dengan bumbu kacang oncom. Bandung native dish.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "nasi-timbel", name: "Nasi Timbel Komplit", emoji: "🍱",
    cuisine: "sundanese", vibes: ["hearty"],
    diet: ["halal"], allergies: [], spice: 2,
    priceTier: "medium", estPrice: 42000,
    healthScore: 7, macros: { kcal: 680, p: 38, c: 75, f: 22 },
    description: "Nasi dibungkus daun pisang + ayam bakar + tahu tempe + lalapan + sambal.",
    isTrending: false, trendingAreas: ["sukajadi", "dago"]
  },
  {
    id: "tutug-oncom", name: "Nasi Tutug Oncom", emoji: "🍚",
    cuisine: "sundanese", vibes: ["comfort"],
    diet: ["halal"], allergies: [], spice: 2,
    priceTier: "low", estPrice: 28000,
    healthScore: 6, macros: { kcal: 540, p: 22, c: 75, f: 16 },
    description: "Nasi diaduk dengan oncom bakar. Khas Tasik tapi populer di Bandung.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "cuanki", name: "Cuanki Bandung", emoji: "🥟",
    cuisine: "sundanese", vibes: ["comfort"],
    diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 22000,
    healthScore: 6, macros: { kcal: 360, p: 18, c: 42, f: 12 },
    description: "Bakso tahu, siomay, dan baso aci dalam kuah kaldu jernih. Native Bandung.",
    isTrending: false, trendingAreas: ["cibadak"]
  },
  {
    id: "batagor", name: "Batagor Kuah & Saus Kacang", emoji: "🥟",
    cuisine: "sundanese", vibes: ["comfort"],
    diet: ["halal"], allergies: ["nuts", "gluten"], spice: 2,
    priceTier: "low", estPrice: 22000,
    healthScore: 5, macros: { kcal: 480, p: 18, c: 55, f: 22 },
    description: "Bakso tahu goreng + bumbu kacang. Bandung specialty.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "siomay", name: "Siomay Bandung", emoji: "🥟",
    cuisine: "sundanese", vibes: ["comfort"],
    diet: ["halal"], allergies: ["nuts", "seafood"], spice: 1,
    priceTier: "low", estPrice: 22000,
    healthScore: 6, macros: { kcal: 420, p: 22, c: 45, f: 18 },
    description: "Siomay ikan + tahu + kentang + telur dengan bumbu kacang. Klasik kaki lima.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "baso-aci", name: "Baso Aci Pedas", emoji: "⚪",
    cuisine: "sundanese", vibes: ["comfort", "spicy"],
    diet: ["halal"], allergies: ["gluten"], spice: 3,
    priceTier: "low", estPrice: 18000,
    healthScore: 4, macros: { kcal: 380, p: 10, c: 60, f: 12 },
    description: "Baso aci kenyal + ceuk + cuanki + kuah pedas asem. Anak Bandung's first love.",
    isTrending: true, trendingAreas: ["bkr", "buah-batu", "antapani"]
  },
  {
    id: "seblak", name: "Seblak Original", emoji: "🍝",
    cuisine: "sundanese", vibes: ["spicy", "comfort"],
    diet: ["halal"], allergies: ["gluten", "eggs", "seafood"], spice: 4,
    priceTier: "low", estPrice: 22000,
    healthScore: 3, macros: { kcal: 520, p: 16, c: 70, f: 18 },
    description: "Kerupuk basah, mie, telur, ceker, dengan kuah pedas kencur. Iconic.",
    isTrending: true, trendingAreas: ["bkr", "antapani", "buah-batu"]
  },
  {
    id: "surabi", name: "Surabi Oncom / Manis", emoji: "🥞",
    cuisine: "sundanese", vibes: ["comfort", "sweet"],
    diet: ["halal", "vegetarian"], allergies: ["gluten"], spice: 0,
    priceTier: "low", estPrice: 18000,
    healthScore: 5, macros: { kcal: 320, p: 8, c: 48, f: 12 },
    description: "Pancake tradisional dari tepung beras. Topping oncom (gurih) atau kinca (manis).",
    isTrending: false, trendingAreas: []
  },

  // ============ JAPANESE ============
  {
    id: "ramen-shoyu", name: "Ramen Shoyu", emoji: "🍜",
    cuisine: "japanese", vibes: ["comfort", "indulgent"],
    diet: ["halal"], allergies: ["gluten", "eggs", "soy"], spice: 1,
    priceTier: "medium", estPrice: 65000,
    healthScore: 4, macros: { kcal: 720, p: 32, c: 85, f: 28 },
    description: "Mie ramen + chashu + telur ajitsuke + nori. Comfort tier bos.",
    isTrending: false, trendingAreas: ["pasteur", "riau"]
  },
  {
    id: "sushi", name: "Sushi Set (12pc)", emoji: "🍣",
    cuisine: "japanese", vibes: ["light", "healthy"],
    diet: ["pescatarian", "halal"], allergies: ["seafood", "soy", "gluten"], spice: 0,
    priceTier: "high", estPrice: 95000,
    healthScore: 7, macros: { kcal: 540, p: 32, c: 80, f: 8 },
    description: "Mix nigiri & maki dengan salmon, tuna, ebi. Cocok kalau pengen ringan tapi puas.",
    isTrending: false, trendingAreas: ["riau", "sukajadi"]
  },
  {
    id: "katsu-don", name: "Chicken Katsu Don", emoji: "🍱",
    cuisine: "japanese", vibes: ["comfort", "hearty"],
    diet: ["halal"], allergies: ["gluten", "eggs", "soy"], spice: 0,
    priceTier: "medium", estPrice: 58000,
    healthScore: 5, macros: { kcal: 720, p: 38, c: 85, f: 24 },
    description: "Ayam katsu di atas nasi dengan kuah dashi & telur. Donburi klasik.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "salmon-mentai", name: "Salmon Mentai Rice Bowl", emoji: "🍣",
    cuisine: "japanese", vibes: ["indulgent"],
    diet: ["pescatarian"], allergies: ["seafood", "eggs", "dairy", "soy"], spice: 1,
    priceTier: "medium", estPrice: 68000,
    healthScore: 6, macros: { kcal: 620, p: 32, c: 65, f: 26 },
    description: "Nasi + salmon + saus mentai panggang. Trending sejak 2020 tapi gak pernah turun.",
    isTrending: true, trendingAreas: ["pasteur", "sukajadi", "riau"]
  },

  // ============ KOREAN ============
  {
    id: "bibimbap", name: "Bibimbap", emoji: "🍲",
    cuisine: "korean", vibes: ["healthy", "hearty"],
    diet: ["halal"], allergies: ["eggs", "soy"], spice: 2,
    priceTier: "medium", estPrice: 62000,
    healthScore: 8, macros: { kcal: 580, p: 28, c: 70, f: 18 },
    description: "Nasi + mix sayuran + protein + telur + gochujang. Sehat & fotogenik.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "korean-fried-chicken", name: "Korean Fried Chicken", emoji: "🍗",
    cuisine: "korean", vibes: ["indulgent", "spicy"],
    diet: ["halal"], allergies: ["gluten", "soy"], spice: 3,
    priceTier: "medium", estPrice: 72000,
    healthScore: 3, macros: { kcal: 820, p: 38, c: 65, f: 42 },
    description: "Ayam tepung crispy double-fried, glazed yangnyeom atau soy garlic. Wajib sambal aci.",
    isTrending: true, trendingAreas: ["pasteur", "dago", "riau"]
  },
  {
    id: "tteokbokki", name: "Tteokbokki", emoji: "🌶️",
    cuisine: "korean", vibes: ["spicy", "comfort"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "soy"], spice: 4,
    priceTier: "medium", estPrice: 48000,
    healthScore: 4, macros: { kcal: 520, p: 12, c: 95, f: 8 },
    description: "Kue beras kenyal dengan saus gochujang pedas manis. Pengen K-drama vibes.",
    isTrending: true, trendingAreas: ["pasteur"]
  },
  {
    id: "korean-corndog", name: "Korean Corndog Mozza", emoji: "🌭",
    cuisine: "korean", vibes: ["indulgent", "sweet"],
    diet: ["halal"], allergies: ["gluten", "dairy", "eggs"], spice: 0,
    priceTier: "low", estPrice: 25000,
    healthScore: 2, macros: { kcal: 480, p: 14, c: 55, f: 22 },
    description: "Sosis + mozzarella dilapis tepung, digoreng, lalu dilumuri gula & saus.",
    isTrending: true, trendingAreas: ["pasteur", "buah-batu"]
  },

  // ============ CHINESE ============
  {
    id: "kwetiau", name: "Kwetiau Goreng Sapi", emoji: "🍝",
    cuisine: "chinese", vibes: ["comfort", "hearty"],
    diet: ["halal"], allergies: ["gluten", "eggs", "soy", "seafood"], spice: 1,
    priceTier: "medium", estPrice: 38000,
    healthScore: 5, macros: { kcal: 680, p: 28, c: 80, f: 26 },
    description: "Kwetiau goreng kering daging sapi + bakso + sayur. Wok hei mantap.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "dimsum", name: "Dim Sum Set (Mix 6)", emoji: "🥟",
    cuisine: "chinese", vibes: ["comfort", "light"],
    diet: ["halal"], allergies: ["gluten", "seafood", "soy"], spice: 0,
    priceTier: "medium", estPrice: 65000,
    healthScore: 6, macros: { kcal: 480, p: 22, c: 60, f: 16 },
    description: "Hakau, siomay, lumpia kulit tahu, dll. Cocok buat brunch sosial.",
    isTrending: false, trendingAreas: ["dago", "sukajadi"]
  },
  {
    id: "fuyunghai", name: "Fuyunghai", emoji: "🍳",
    cuisine: "chinese", vibes: ["comfort"],
    diet: ["halal"], allergies: ["eggs", "seafood"], spice: 0,
    priceTier: "medium", estPrice: 35000,
    healthScore: 5, macros: { kcal: 480, p: 26, c: 35, f: 24 },
    description: "Telur dadar isi udang & sayur, disiram saus asam manis. Childhood food.",
    isTrending: false, trendingAreas: []
  },

  // ============ WESTERN ============
  {
    id: "pizza-margherita", name: "Pizza Margherita", emoji: "🍕",
    cuisine: "western", vibes: ["indulgent"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy"], spice: 0,
    priceTier: "high", estPrice: 95000,
    healthScore: 4, macros: { kcal: 820, p: 28, c: 95, f: 32 },
    description: "Pizza sederhana: tomat, mozzarella, basil. Less is more.",
    isTrending: false, trendingAreas: ["dago", "riau"]
  },
  {
    id: "pasta-carbonara", name: "Pasta Carbonara", emoji: "🍝",
    cuisine: "western", vibes: ["indulgent", "hearty"],
    diet: ["halal"], allergies: ["gluten", "dairy", "eggs"], spice: 0,
    priceTier: "medium", estPrice: 75000,
    healthScore: 3, macros: { kcal: 780, p: 26, c: 75, f: 38 },
    description: "Spaghetti + telur + keju parmesan + smoked beef. Creamy heaven.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "burger-beef", name: "Beef Burger Cheese", emoji: "🍔",
    cuisine: "western", vibes: ["indulgent", "comfort"],
    diet: ["halal"], allergies: ["gluten", "dairy"], spice: 0,
    priceTier: "medium", estPrice: 65000,
    healthScore: 3, macros: { kcal: 880, p: 38, c: 60, f: 48 },
    description: "Beef patty juicy + keju leleh + lettuce + tomat. Comfort trier yes.",
    isTrending: false, trendingAreas: ["dago", "riau"]
  },
  {
    id: "caesar-salad", name: "Grilled Chicken Caesar Salad", emoji: "🥗",
    cuisine: "western", vibes: ["healthy", "light"],
    diet: ["halal"], allergies: ["dairy", "eggs", "gluten"], spice: 0,
    priceTier: "medium", estPrice: 65000,
    healthScore: 8, macros: { kcal: 420, p: 32, c: 18, f: 24 },
    description: "Romaine + grilled chicken + parmesan + crouton + caesar dressing. Light tapi puas.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "steak", name: "Tenderloin Steak Set", emoji: "🥩",
    cuisine: "western", vibes: ["hearty", "indulgent"],
    diet: ["halal"], allergies: ["dairy"], spice: 0,
    priceTier: "high", estPrice: 195000,
    healthScore: 6, macros: { kcal: 680, p: 52, c: 32, f: 36 },
    description: "Tenderloin medium + mashed potato + sayur panggang. Date night unlocked.",
    isTrending: false, trendingAreas: ["dago", "sukajadi"]
  },

  // ============ MIDDLE EASTERN ============
  {
    id: "kebab", name: "Kebab Beef Wrap", emoji: "🌯",
    cuisine: "middle-eastern", vibes: ["comfort", "hearty"],
    diet: ["halal"], allergies: ["gluten", "dairy"], spice: 1,
    priceTier: "low", estPrice: 32000,
    healthScore: 6, macros: { kcal: 520, p: 28, c: 50, f: 22 },
    description: "Daging kebab + tortilla + sayur + saus. Cocok buat makan jalan.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "shawarma", name: "Chicken Shawarma Plate", emoji: "🥙",
    cuisine: "middle-eastern", vibes: ["hearty"],
    diet: ["halal"], allergies: ["gluten", "dairy"], spice: 1,
    priceTier: "medium", estPrice: 45000,
    healthScore: 7, macros: { kcal: 560, p: 38, c: 55, f: 18 },
    description: "Ayam shawarma + nasi/pita + hummus + acar. Protein-forward.",
    isTrending: false, trendingAreas: []
  },

  // ============ TRENDING / FUSION ============
  {
    id: "salmon-poke", name: "Salmon Poke Bowl", emoji: "🥗",
    cuisine: "fusion", vibes: ["healthy", "light"],
    diet: ["pescatarian"], allergies: ["seafood", "soy"], spice: 0,
    priceTier: "medium", estPrice: 75000,
    healthScore: 9, macros: { kcal: 480, p: 32, c: 55, f: 14 },
    description: "Bowl nasi + salmon mentah + alpukat + edamame + saus shoyu. Aesthetic & sehat.",
    isTrending: true, trendingAreas: ["dago", "riau", "sukajadi"]
  },
  {
    id: "smoothie-bowl", name: "Acai Smoothie Bowl", emoji: "🍓",
    cuisine: "fusion", vibes: ["healthy", "sweet"],
    diet: ["halal", "vegetarian", "vegan"], allergies: ["nuts"], spice: 0,
    priceTier: "medium", estPrice: 55000,
    healthScore: 9, macros: { kcal: 380, p: 8, c: 68, f: 10 },
    description: "Smoothie bowl topping granola + buah segar + chia. Breakfast goal.",
    isTrending: true, trendingAreas: ["dago", "riau"]
  },
  {
    id: "croffle", name: "Croffle Original / Mix", emoji: "🥐",
    cuisine: "fusion", vibes: ["sweet", "indulgent"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy", "eggs"], spice: 0,
    priceTier: "low", estPrice: 28000,
    healthScore: 3, macros: { kcal: 420, p: 7, c: 50, f: 22 },
    description: "Croissant dipress jadi waffle. Topping ice cream / nutella / matcha.",
    isTrending: true, trendingAreas: ["dago", "riau", "pasteur"]
  },
  {
    id: "dessert-box", name: "Tiramisu Dessert Box", emoji: "🍰",
    cuisine: "fusion", vibes: ["sweet", "indulgent"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy", "eggs"], spice: 0,
    priceTier: "medium", estPrice: 45000,
    healthScore: 2, macros: { kcal: 580, p: 8, c: 65, f: 30 },
    description: "Box layer dessert: tiramisu, cheesecake, choco lava. Manis berbahaya.",
    isTrending: true, trendingAreas: ["riau", "antapani"]
  },
  {
    id: "boba", name: "Brown Sugar Boba Milk", emoji: "🧋",
    cuisine: "fusion", vibes: ["sweet"],
    diet: ["halal", "vegetarian"], allergies: ["dairy", "gluten"], spice: 0,
    priceTier: "low", estPrice: 25000,
    healthScore: 2, macros: { kcal: 420, p: 6, c: 78, f: 8 },
    description: "Susu segar + boba pearl + brown sugar syrup. Bukan makan, tapi life support.",
    isTrending: true, trendingAreas: ["dago", "riau", "pasteur", "buah-batu"]
  },
  {
    id: "oatmeal-bowl", name: "Overnight Oats Bowl", emoji: "🥣",
    cuisine: "fusion", vibes: ["healthy", "light"],
    diet: ["halal", "vegetarian"], allergies: ["dairy", "nuts"], spice: 0,
    priceTier: "low", estPrice: 35000,
    healthScore: 9, macros: { kcal: 320, p: 14, c: 50, f: 8 },
    description: "Oats rendam susu + buah segar + chia + madu. Sarapan goal serius.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "quinoa-bowl", name: "Quinoa Power Bowl", emoji: "🥗",
    cuisine: "fusion", vibes: ["healthy"],
    diet: ["halal", "vegetarian"], allergies: ["nuts"], spice: 0,
    priceTier: "high", estPrice: 78000,
    healthScore: 10, macros: { kcal: 460, p: 22, c: 55, f: 16 },
    description: "Quinoa + roasted veggies + alpukat + chickpea + lemon vinaigrette. Clean eating.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "grilled-chicken", name: "Grilled Chicken Breast + Veggies", emoji: "🍗",
    cuisine: "fusion", vibes: ["healthy"],
    diet: ["halal"], allergies: [], spice: 0,
    priceTier: "medium", estPrice: 58000,
    healthScore: 10, macros: { kcal: 380, p: 42, c: 22, f: 12 },
    description: "Dada ayam panggang + sayur kukus + nasi merah. Bulking-cutting friendly.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "martabak-manis", name: "Martabak Manis Coklat Keju", emoji: "🥞",
    cuisine: "indonesian", vibes: ["sweet", "indulgent"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy", "eggs"], spice: 0,
    priceTier: "medium", estPrice: 55000,
    healthScore: 2, macros: { kcal: 980, p: 16, c: 110, f: 52 },
    description: "Martabak manis tebal isi coklat, keju, kacang. Untuk dimakan rame-rame (atau sendiri).",
    isTrending: false, trendingAreas: []
  },
  {
    id: "gado-gado", name: "Gado-gado Jakarta", emoji: "🥗",
    cuisine: "indonesian", vibes: ["healthy", "light"],
    diet: ["halal", "vegetarian"], allergies: ["nuts", "eggs"], spice: 2,
    priceTier: "low", estPrice: 22000,
    healthScore: 8, macros: { kcal: 420, p: 18, c: 45, f: 18 },
    description: "Sayuran rebus + telur + lontong + kerupuk + bumbu kacang. Salad versi Indo.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "tofu-veggie-bowl", name: "Tofu Veggie Stir-Fry Bowl", emoji: "🥘",
    cuisine: "fusion", vibes: ["healthy", "light"],
    diet: ["halal", "vegetarian", "vegan"], allergies: ["soy"], spice: 1,
    priceTier: "medium", estPrice: 48000,
    healthScore: 9, macros: { kcal: 380, p: 22, c: 32, f: 14 },
    description: "Tahu pan-fried + tumis brokoli + paprika + kembang kol + saus jahe. Vegan-friendly tanpa kacang.",
    isTrending: false, trendingAreas: []
  },
  {
    id: "sayur-asem", name: "Sayur Asem + Tempe Bacem", emoji: "🥬",
    cuisine: "indonesian", vibes: ["healthy", "comfort"],
    diet: ["halal", "vegetarian", "vegan"], allergies: ["soy"], spice: 1,
    priceTier: "low", estPrice: 25000,
    healthScore: 8, macros: { kcal: 360, p: 16, c: 48, f: 10 },
    description: "Kuah asem segar + nangka muda + jagung + melinjo + tempe bacem manis. Native vegan Indonesia.",
    isTrending: false, trendingAreas: []
  },

  // ============================================================
  // 🔥 VIRAL / FYP 2024-2026
  // ============================================================
  {
    id: "cromboloni", name: "Cromboloni Pistachio", emoji: "🥐",
    cuisine: "fusion", type: "dessert", tags: ["viral", "fyp"],
    vibes: ["sweet", "indulgent"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy", "eggs", "nuts"], spice: 0,
    priceTier: "medium", estPrice: 55000,
    healthScore: 2, macros: { kcal: 540, p: 9, c: 58, f: 30 },
    description: "Hibrida croissant x bomboloni isi krim pistachio. Layer-nya nge-snap, isinya banjir krim. Wajib coba minimal sekali.",
    isTrending: true, trendingAreas: ["dago", "riau", "sukajadi"]
  },
  {
    id: "knafeh-croissant", name: "Knafeh Croissant Pistachio", emoji: "🥐",
    cuisine: "fusion", type: "dessert", tags: ["viral", "fyp"],
    vibes: ["sweet", "indulgent"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy", "eggs", "nuts"], spice: 0,
    priceTier: "high", estPrice: 78000,
    healthScore: 2, macros: { kcal: 620, p: 11, c: 55, f: 38 },
    description: "Croissant isi kataifi crispy + cream cheese + pistachio cream + drizzle madu. Versi croissant dari Dubai chocolate.",
    isTrending: true, trendingAreas: ["dago", "riau"]
  },
  {
    id: "dubai-chocolate", name: "Dubai Chocolate Strawberry", emoji: "🍫",
    cuisine: "fusion", type: "dessert", tags: ["viral", "fyp"],
    vibes: ["sweet", "indulgent"],
    diet: ["halal", "vegetarian"], allergies: ["dairy", "nuts"], spice: 0,
    priceTier: "high", estPrice: 95000,
    healthScore: 2, macros: { kcal: 480, p: 8, c: 52, f: 26 },
    description: "Bar coklat Dubai filling pistachio + kataifi crispy, dipasangkan stroberi segar. Trend yang gak mau berhenti.",
    isTrending: true, trendingAreas: ["dago", "riau", "sukajadi"]
  },
  {
    id: "korean-garlic-bread", name: "Korean Garlic Cream Cheese Bread", emoji: "🧄",
    cuisine: "korean", type: "snack", tags: ["viral"],
    vibes: ["indulgent", "comfort"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy", "eggs"], spice: 0,
    priceTier: "low", estPrice: 25000,
    healthScore: 3, macros: { kcal: 480, p: 12, c: 50, f: 24 },
    description: "Roti bulat dipotong 6, dicelup butter bawang putih, isian cream cheese manis-asin. Crispy luar, lumer dalam.",
    isTrending: true, trendingAreas: ["pasteur", "riau"]
  },
  {
    id: "salted-egg-chicken", name: "Salted Egg Chicken Rice", emoji: "🍳",
    cuisine: "fusion", type: "food", tags: ["viral"],
    vibes: ["indulgent", "comfort"],
    diet: ["halal"], allergies: ["eggs", "dairy", "gluten"], spice: 1,
    priceTier: "medium", estPrice: 52000,
    healthScore: 4, macros: { kcal: 720, p: 36, c: 65, f: 32 },
    description: "Ayam crispy disiram saus telur asin creamy gurih + nasi + sayur. Comfort food era 2020-an yang ga turun-turun.",
    isTrending: true, trendingAreas: ["pasteur", "buah-batu"]
  },
  {
    id: "mochi-donut", name: "Mochi Donut Mix", emoji: "🍩",
    cuisine: "korean", type: "dessert", tags: ["viral", "fyp"],
    vibes: ["sweet", "indulgent"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy", "eggs"], spice: 0,
    priceTier: "low", estPrice: 32000,
    healthScore: 3, macros: { kcal: 380, p: 6, c: 52, f: 16 },
    description: "Donat ala Korea, tekstur kenyal mochi + glaze warna-warni. Bentuk rantai bola yang Instagrammable.",
    isTrending: true, trendingAreas: ["dago", "pasteur"]
  },
  {
    id: "smashed-burger", name: "Smashed Beef Burger Double", emoji: "🍔",
    cuisine: "western", type: "food", tags: ["viral", "fyp"],
    vibes: ["indulgent", "hearty"],
    diet: ["halal"], allergies: ["gluten", "dairy"], spice: 0,
    priceTier: "high", estPrice: 88000,
    healthScore: 3, macros: { kcal: 920, p: 44, c: 55, f: 56 },
    description: "Dua patty digepuk tipis di atas hot plate, edge crispy, double cheese leleh, saus signature. Burger paradigma 2024-2026.",
    isTrending: true, trendingAreas: ["dago", "riau"]
  },
  {
    id: "birria-tacos", name: "Birria Tacos + Consomé", emoji: "🌮",
    cuisine: "fusion", type: "food", tags: ["viral", "fyp"],
    vibes: ["hearty", "spicy"],
    diet: ["halal"], allergies: ["gluten", "dairy"], spice: 3,
    priceTier: "high", estPrice: 92000,
    healthScore: 5, macros: { kcal: 760, p: 42, c: 52, f: 38 },
    description: "Taco isi short rib slow-cook, di-celup consomé kaldu rempah pedas. Aesthetic dipping ala TikTok.",
    isTrending: true, trendingAreas: ["dago", "riau"]
  },
  {
    id: "cheese-tea", name: "Cheese Foam Oolong Tea", emoji: "🧀",
    cuisine: "chinese", type: "drink", tags: ["fyp"],
    vibes: ["sweet"],
    diet: ["halal", "vegetarian"], allergies: ["dairy"], spice: 0,
    priceTier: "low", estPrice: 28000,
    healthScore: 4, macros: { kcal: 220, p: 5, c: 32, f: 8 },
    description: "Teh oolong dingin di-topping cheese foam asin manis. Aturan main: minum miring biar cheese dan teh nyatu.",
    isTrending: true, trendingAreas: ["dago", "pasteur"]
  },
  {
    id: "buldak-mukbang", name: "Buldak Carbonara Mukbang", emoji: "🍝",
    cuisine: "korean", type: "food", tags: ["viral", "fyp"],
    vibes: ["spicy", "indulgent"],
    diet: ["halal"], allergies: ["gluten", "dairy", "eggs", "soy"], spice: 5,
    priceTier: "low", estPrice: 32000,
    healthScore: 2, macros: { kcal: 680, p: 18, c: 78, f: 30 },
    description: "Buldak (mie ayam pedas) campur saus carbonara creamy + telur + keju + sosis. Pedasnya nyiksa, tapi addictif.",
    isTrending: true, trendingAreas: ["pasteur", "buah-batu"]
  },
  {
    id: "basque-cheesecake", name: "Basque Burnt Cheesecake", emoji: "🍰",
    cuisine: "western", type: "dessert", tags: ["viral"],
    vibes: ["sweet", "indulgent"],
    diet: ["halal", "vegetarian"], allergies: ["dairy", "eggs", "gluten"], spice: 0,
    priceTier: "medium", estPrice: 48000,
    healthScore: 3, macros: { kcal: 460, p: 9, c: 32, f: 32 },
    description: "Cheesecake ala Spanyol, atasnya gosong sengaja, dalemnya mulus creamy. Kontras pahit & manis.",
    isTrending: true, trendingAreas: ["dago", "riau"]
  },
  {
    id: "strawberry-matcha", name: "Strawberry Matcha Latte", emoji: "🍓",
    cuisine: "japanese", type: "drink", tags: ["viral", "fyp"],
    vibes: ["sweet"],
    diet: ["halal", "vegetarian"], allergies: ["dairy"], spice: 0,
    priceTier: "low", estPrice: 35000,
    healthScore: 5, macros: { kcal: 240, p: 6, c: 32, f: 10 },
    description: "Layer pink strawberry compote + susu + matcha hijau pekat. Aesthetic banget di IG, rasanya seimbang.",
    isTrending: true, trendingAreas: ["dago", "riau", "sukajadi"]
  },
  {
    id: "dirty-matcha", name: "Dirty Matcha Latte", emoji: "🍵",
    cuisine: "japanese", type: "drink", tags: ["viral", "fyp"],
    vibes: ["indulgent"],
    diet: ["halal", "vegetarian"], allergies: ["dairy"], spice: 0,
    priceTier: "medium", estPrice: 42000,
    healthScore: 5, macros: { kcal: 220, p: 5, c: 24, f: 10 },
    description: "Matcha latte di-shot espresso. Kombinasi pahit-manis-earthy yang viral di kafe specialty.",
    isTrending: true, trendingAreas: ["dago", "riau", "sukajadi"]
  },

  // ============================================================
  // 💎 HIDDEN GEMS BANDUNG
  // ============================================================
  {
    id: "mie-kocok", name: "Mie Kocok Mang Dadeng", emoji: "🍜",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort", "hearty"],
    diet: ["halal"], allergies: ["gluten"], spice: 1,
    priceTier: "low", estPrice: 28000,
    healthScore: 6, macros: { kcal: 480, p: 26, c: 55, f: 16 },
    description: "Mie kuning + kuah kaldu sapi + kikil + tauge + bawang goreng. Legendaris dari Cibadak, kuahnya gak ada lawan.",
    isTrending: false, trendingAreas: ["cibadak"]
  },
  {
    id: "cireng-cipaganti", name: "Cireng Rujak Cipaganti", emoji: "🥟",
    cuisine: "sundanese", type: "snack", tags: ["hidden-gem", "viral"],
    vibes: ["comfort", "spicy"],
    diet: ["halal", "vegetarian"], allergies: ["gluten"], spice: 3,
    priceTier: "low", estPrice: 18000,
    healthScore: 4, macros: { kcal: 340, p: 6, c: 55, f: 12 },
    description: "Cireng goreng dicocol bumbu rujak pedes manis. Hidden gem viral karena anti-mainstream.",
    isTrending: true, trendingAreas: ["sukajadi", "cibadak"]
  },
  {
    id: "surabi-imut", name: "Surabi Imut Setiabudi", emoji: "🥞",
    cuisine: "sundanese", type: "snack", tags: ["hidden-gem"],
    vibes: ["sweet", "comfort"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy"], spice: 0,
    priceTier: "low", estPrice: 22000,
    healthScore: 4, macros: { kcal: 340, p: 7, c: 50, f: 12 },
    description: "Surabi mini topping macem-macem: keju, oreo, mayo, sosis, kinca. Open until midnight, anti-galau.",
    isTrending: false, trendingAreas: ["sukajadi"]
  },
  {
    id: "yoghurt-cisangkuy", name: "Yoghurt Cisangkuy", emoji: "🥛",
    cuisine: "indonesian", type: "drink", tags: ["hidden-gem"],
    vibes: ["sweet", "healthy"],
    diet: ["halal", "vegetarian"], allergies: ["dairy"], spice: 0,
    priceTier: "low", estPrice: 18000,
    healthScore: 7, macros: { kcal: 180, p: 6, c: 28, f: 4 },
    description: "Yoghurt segar topping buah, granola, atau strawberry sirup. Legendaris sejak 1972, cuma di Bandung.",
    isTrending: false, trendingAreas: ["sukajadi"]
  },
  {
    id: "es-cendol-elizabeth", name: "Es Cendol Elizabeth", emoji: "🥤",
    cuisine: "sundanese", type: "drink", tags: ["hidden-gem"],
    vibes: ["sweet", "comfort"],
    diet: ["halal", "vegetarian", "vegan"], allergies: [], spice: 0,
    priceTier: "low", estPrice: 15000,
    healthScore: 4, macros: { kcal: 220, p: 2, c: 48, f: 4 },
    description: "Cendol hijau pandan + santan + gula merah + es serut. Legendaris Bandung, segarnya juara.",
    isTrending: false, trendingAreas: ["cibadak"]
  },
  {
    id: "lotek-kalipah", name: "Lotek Kalipah Apo", emoji: "🥗",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["healthy", "comfort"],
    diet: ["halal", "vegetarian"], allergies: ["nuts"], spice: 2,
    priceTier: "low", estPrice: 22000,
    healthScore: 8, macros: { kcal: 380, p: 14, c: 50, f: 14 },
    description: "Sayuran rebus + bumbu kacang ulekan tangan + kerupuk. Tempat legenda di gang Kalipah Apo.",
    isTrending: false, trendingAreas: ["cibadak"]
  },
  {
    id: "lumpia-basah-gang-aut", name: "Lumpia Basah Gang Aut", emoji: "🥬",
    cuisine: "sundanese", type: "snack", tags: ["hidden-gem"],
    vibes: ["comfort"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "eggs"], spice: 1,
    priceTier: "low", estPrice: 18000,
    healthScore: 6, macros: { kcal: 320, p: 10, c: 50, f: 8 },
    description: "Lumpia basah isi bengkuang + telur + saus tauco. Gak digoreng — hangat, lembut, manis-asin balance.",
    isTrending: false, trendingAreas: ["cibadak"]
  },
  {
    id: "soto-bandung-iga", name: "Soto Bandung Iga", emoji: "🍲",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort", "healthy"],
    diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 38000,
    healthScore: 7, macros: { kcal: 460, p: 32, c: 32, f: 18 },
    description: "Kuah bening rempah + iga sapi + lobak + kedelai goreng. Khas Bandung yang under-the-radar.",
    isTrending: false, trendingAreas: ["sukajadi", "cibadak"]
  },
  {
    id: "roti-gempol", name: "Roti Gempol Bakar Coklat Keju", emoji: "🍞",
    cuisine: "indonesian", type: "snack", tags: ["hidden-gem"],
    vibes: ["sweet", "comfort"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy"], spice: 0,
    priceTier: "low", estPrice: 18000,
    healthScore: 3, macros: { kcal: 380, p: 8, c: 48, f: 16 },
    description: "Roti panggang legend Bandung sejak 1958. Mentega gemporrr, isi coklat-keju, nostalgia maksimal.",
    isTrending: false, trendingAreas: ["cibadak", "sukajadi"]
  },
  {
    id: "sate-maranggi", name: "Sate Maranggi Kalipah", emoji: "🍢",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["hearty"],
    diet: ["halal"], allergies: [], spice: 2,
    priceTier: "medium", estPrice: 45000,
    healthScore: 6, macros: { kcal: 540, p: 38, c: 35, f: 24 },
    description: "Sate sapi marinasi kecap + ketumbar, dibakar pas. Pakai sambel oncom + nasi/lontong. Khas Sunda.",
    isTrending: false, trendingAreas: ["cibadak"]
  },

  // ============================================================
  // ☕ DRINKS — KEKINIAN & TRADISIONAL
  // ============================================================
  {
    id: "kopi-susu-gula-aren", name: "Es Kopi Susu Gula Aren", emoji: "☕",
    cuisine: "indonesian", type: "drink", tags: ["fyp"],
    vibes: ["comfort", "sweet"],
    diet: ["halal", "vegetarian"], allergies: ["dairy"], spice: 0,
    priceTier: "low", estPrice: 22000,
    healthScore: 4, macros: { kcal: 180, p: 4, c: 28, f: 6 },
    description: "Espresso + susu segar + gula aren cair. Sederhana tapi addictif. Standar kopi kekinian Indonesia.",
    isTrending: true, trendingAreas: ["dago", "riau", "antapani", "buah-batu"]
  },
  {
    id: "matcha-latte", name: "Matcha Latte Original", emoji: "🍵",
    cuisine: "japanese", type: "drink", tags: ["fyp"],
    vibes: ["healthy"],
    diet: ["halal", "vegetarian"], allergies: ["dairy"], spice: 0,
    priceTier: "medium", estPrice: 38000,
    healthScore: 6, macros: { kcal: 200, p: 5, c: 22, f: 9 },
    description: "Bubuk matcha grade upacara + susu fresh. Pahit-earthy yang seimbang. Anti-jet-lag option.",
    isTrending: true, trendingAreas: ["dago", "riau"]
  },
  {
    id: "thai-tea", name: "Thai Tea Boba Original", emoji: "🧋",
    cuisine: "fusion", type: "drink", tags: ["fyp"],
    vibes: ["sweet"],
    diet: ["halal", "vegetarian"], allergies: ["dairy", "gluten"], spice: 0,
    priceTier: "low", estPrice: 22000,
    healthScore: 3, macros: { kcal: 380, p: 4, c: 68, f: 8 },
    description: "Teh thai oranye creamy + boba kenyal. Sweet but balanced. Cocok buat afternoon slump.",
    isTrending: true, trendingAreas: ["pasteur", "buah-batu"]
  },
  {
    id: "yuzu-citron", name: "Yuzu Citron Tea", emoji: "🍋",
    cuisine: "korean", type: "drink", tags: ["viral"],
    vibes: ["healthy", "light"],
    diet: ["halal", "vegetarian", "vegan"], allergies: [], spice: 0,
    priceTier: "low", estPrice: 28000,
    healthScore: 7, macros: { kcal: 140, p: 1, c: 34, f: 0 },
    description: "Selai yuzu Korea diseduh air panas/dingin. Citrus segar, vitamin C tinggi, viral karena trend Korea.",
    isTrending: true, trendingAreas: ["pasteur"]
  },
  {
    id: "butterfly-pea-lemon", name: "Butterfly Pea Lemonade", emoji: "💜",
    cuisine: "fusion", type: "drink", tags: ["fyp"],
    vibes: ["light"],
    diet: ["halal", "vegetarian", "vegan"], allergies: [], spice: 0,
    priceTier: "low", estPrice: 25000,
    healthScore: 7, macros: { kcal: 90, p: 0, c: 22, f: 0 },
    description: "Bunga telang + lemonade. Berubah dari ungu jadi pink saat lemon dimasukkin. Magic & antioksidan tinggi.",
    isTrending: true, trendingAreas: ["dago", "riau"]
  },
  {
    id: "es-bandrek", name: "Es Bandrek Aci Bandung", emoji: "🌶️",
    cuisine: "sundanese", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort", "sweet"],
    diet: ["halal", "vegetarian", "vegan"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 15000,
    healthScore: 5, macros: { kcal: 160, p: 1, c: 36, f: 2 },
    description: "Bandrek dingin: jahe + gula aren + serai + kayu manis + kelapa muda. Hangat-segar paradoks Sunda.",
    isTrending: false, trendingAreas: ["cibadak", "sukajadi"]
  },
  {
    id: "es-goyobod", name: "Es Goyobod Bandung", emoji: "🥥",
    cuisine: "sundanese", type: "drink", tags: ["hidden-gem"],
    vibes: ["sweet", "comfort"],
    diet: ["halal", "vegetarian", "vegan"], allergies: [], spice: 0,
    priceTier: "low", estPrice: 18000,
    healthScore: 4, macros: { kcal: 240, p: 2, c: 48, f: 4 },
    description: "Goyobod (jelly hunkwe) + roti tawar + alpukat + kelapa muda + santan + gula aren. Dessert drink legendaris.",
    isTrending: false, trendingAreas: ["cibadak"]
  },
  {
    id: "wedang-jahe-susu", name: "Wedang Jahe Susu Hangat", emoji: "🫖",
    cuisine: "indonesian", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort", "healthy"],
    diet: ["halal", "vegetarian"], allergies: ["dairy"], spice: 1,
    priceTier: "low", estPrice: 12000,
    healthScore: 7, macros: { kcal: 140, p: 4, c: 22, f: 4 },
    description: "Jahe geprek + susu segar + gula aren + sereh. Hangat di tenggorokan, malam atau hujan deres.",
    isTrending: false, trendingAreas: []
  },

  // ============================================================
  // 🍱 BOWLS / HEALTHY (extra)
  // ============================================================
  {
    id: "chicken-pesto-bowl", name: "Chicken Pesto Quinoa Bowl", emoji: "🥗",
    cuisine: "fusion", type: "food", tags: ["fyp"],
    vibes: ["healthy", "hearty"],
    diet: ["halal"], allergies: ["nuts", "dairy"], spice: 0,
    priceTier: "high", estPrice: 78000,
    healthScore: 9, macros: { kcal: 540, p: 38, c: 42, f: 22 },
    description: "Grilled chicken + pesto basil + quinoa + sayur panggang + parmesan. Healthy aesthetic 100%.",
    isTrending: true, trendingAreas: ["dago", "riau"]
  },
  {
    id: "yakiniku-don", name: "Beef Yakiniku Don", emoji: "🥩",
    cuisine: "japanese", type: "food", tags: ["fyp"],
    vibes: ["hearty", "indulgent"],
    diet: ["halal"], allergies: ["soy", "gluten"], spice: 1,
    priceTier: "medium", estPrice: 68000,
    healthScore: 6, macros: { kcal: 720, p: 38, c: 78, f: 26 },
    description: "Slice beef yakiniku + nasi + onsen egg + bawang panggang + saus shoyu manis. Comfort don bowl.",
    isTrending: true, trendingAreas: ["pasteur", "sukajadi"]
  },
  {
    id: "sambel-matah-chicken", name: "Sambel Matah Chicken Bowl", emoji: "🌶️",
    cuisine: "indonesian", type: "food", tags: ["fyp"],
    vibes: ["spicy", "healthy"],
    diet: ["halal"], allergies: [], spice: 4,
    priceTier: "medium", estPrice: 48000,
    healthScore: 7, macros: { kcal: 480, p: 36, c: 42, f: 18 },
    description: "Ayam suwir bumbu + sambel matah Bali (bawang merah, sereh, jeruk limau, cabe) + nasi. Pedas segar.",
    isTrending: true, trendingAreas: ["riau", "antapani"]
  },
  {
    id: "egg-sandwich", name: "Japanese Tamago Sando", emoji: "🥪",
    cuisine: "japanese", type: "snack", tags: ["fyp"],
    vibes: ["comfort", "light"],
    diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy", "eggs"], spice: 0,
    priceTier: "low", estPrice: 32000,
    healthScore: 5, macros: { kcal: 380, p: 14, c: 38, f: 18 },
    description: "Sandwich roti shokupan tebal + telur cincang creamy + mayo Jepang. Pillowy & rich. Konbini vibes.",
    isTrending: true, trendingAreas: ["riau", "dago"]
  }
];
