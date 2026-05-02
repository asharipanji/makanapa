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
  { id: "fusion",         label: "Fusion/Trendy",  emoji: "✨" },
  { id: "cafe",           label: "Kopi & Kafe",    emoji: "☕" },
  { id: "bakery",         label: "Bakery",         emoji: "🥐" },
  { id: "seafood",        label: "Seafood",        emoji: "🦐" },
  { id: "steakhouse",     label: "Steakhouse",     emoji: "🥩" }
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
  },

  // ============================================================
  // 💎 HIDDEN GEMS BANDUNG — diimport dari Google Maps lists
  // (Ramz Kulineran Top Rated + Ramz Kulineran BDG)
  // Tiap entry = real resto dengan rating + jumlah ulasan
  // ============================================================
  {
    id: "lazy-jennie", name: "Lazy Jennie", emoji: "🍽",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.8 (652 ulasan). Hidden gem Bandung — restoran modern.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.8, reviews: 652
  },
  {
    id: "natta-terrace", name: "Natta Terrace", emoji: "🍽",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.9 (219 ulasan). Hidden gem Bandung — restoran rooftop.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.9, reviews: 219
  },
  {
    id: "kabin-binjai", name: "KABIN (Kedai Anak Binjai)", emoji: "🍽",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort", "hearty"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.9 (6,521 ulasan). Family-friendly. Masakan Sumut, hidden gem Bandung.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.9, reviews: 6521
  },
  {
    id: "rm-wangi-seruni", name: "Rumah Makan Wangi Seruni", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort", "hearty"], diet: ["halal"], allergies: [], spice: 2,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "4.2★ (1,351 ulasan). Masakan Indonesia rumahan klasik di Bandung.",
    isTrending: false, trendingAreas: [], rating: 4.2, reviews: 1351
  },
  {
    id: "sate-pak-ali-kebumen", name: "Sate Pak Ali Wong Kebumen", emoji: "🍢",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort", "hearty"], diet: ["halal"], allergies: ["nuts"], spice: 2,
    priceTier: "medium", estPrice: 62000, healthScore: 6, macros: null,
    description: "4.4★ (497 ulasan). Sate kambing/ayam khas Kebumen di Bandung.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 497
  },
  {
    id: "bakso-samrat-burangrang", name: "Bakso Solo Samrat Burangrang", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: ["gluten"], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "3.6★ (882 ulasan). Bakso Solo legend di area Burangrang.",
    isTrending: false, trendingAreas: ["bkr"], rating: 3.6, reviews: 882
  },
  {
    id: "cafe-bali", name: "Cafe Bali", emoji: "🍳",
    cuisine: "cafe", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 50000, healthScore: 5, macros: null,
    description: "4.4★ (5,163 ulasan). Cafe nuansa Bali, all-day breakfast & ngopi.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 5163
  },
  {
    id: "byasa-dianti", name: "BYASA.DIANTI", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 2,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (881 ulasan). Masakan Indonesia kontemporer dengan plating cantik.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 881
  },
  {
    id: "tji-laki-bolu-kue", name: "Tji Laki 9 — Toko Bolu & Kue", emoji: "🥐",
    cuisine: "bakery", type: "snack", tags: ["hidden-gem"],
    vibes: ["sweet", "comfort"], diet: ["halal", "vegetarian"], allergies: ["gluten", "eggs", "dairy"], spice: 0,
    priceTier: "low", estPrice: 35000, healthScore: 4, macros: null,
    description: "⭐ 4.5 (1,666 ulasan). Toko bolu & kue legendaris Bandung sejak puluhan tahun.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 1666
  },
  {
    id: "aom-steakhouse", name: "AOM Steakhouse", emoji: "🥩",
    cuisine: "steakhouse", type: "food", tags: ["hidden-gem"],
    vibes: ["indulgent", "hearty"], diet: ["halal"], allergies: [], spice: 0,
    priceTier: "high", estPrice: 280000, healthScore: 6, macros: null,
    description: "⭐ 4.5 (936 ulasan). Steak premium Bandung — date night/special occasion.",
    isTrending: false, trendingAreas: ["dago", "sukajadi"], rating: 4.5, reviews: 936
  },
  {
    id: "gormeteria", name: "Gormeteria", emoji: "🍕",
    cuisine: "western", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["indulgent"], diet: ["halal"], allergies: ["gluten", "dairy"], spice: 0,
    priceTier: "high", estPrice: 120000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (8,001 ulasan). Western premium — favorit foodies Bandung.",
    isTrending: true, trendingAreas: ["dago", "riau"], rating: 4.6, reviews: 8001
  },
  {
    id: "rm-padang-malah-dicubo", name: "RM Padang Malah Dicubo", emoji: "🌶",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["spicy", "hearty"], diet: ["halal"], allergies: [], spice: 3,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (3,691 ulasan). Padang authentic dengan menu kompleks. Pedasnya nampar.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 3691
  },
  {
    id: "the-pleasant-service", name: "The Pleasant Service", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: ["dairy"], spice: 0,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (140 ulasan). Specialty coffee shop dengan service yang ramah.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 140
  },
  {
    id: "moms-artisan-bakery", name: "Mom's Artisan Bakery", emoji: "🥐",
    cuisine: "bakery", type: "snack", tags: ["hidden-gem"],
    vibes: ["sweet", "comfort"], diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy", "eggs"], spice: 0,
    priceTier: "medium", estPrice: 62000, healthScore: 4, macros: null,
    description: "⭐ 4.6 (1,495 ulasan). Artisan bakery — sourdough, croissant fresh dari oven.",
    isTrending: false, trendingAreas: ["dago", "riau"], rating: 4.6, reviews: 1495
  },
  {
    id: "dapur-indung", name: "Dapur Indung", emoji: "🍚",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort", "hearty"], diet: ["halal"], allergies: [], spice: 2,
    priceTier: "low", estPrice: 38000, healthScore: 7, macros: null,
    description: "4.3★ (852 ulasan). Masakan Sunda autentik, ada nasi tutug oncom & ikan bakar.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 852
  },
  {
    id: "toko-you", name: "Toko You", emoji: "☕",
    cuisine: "cafe", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: ["gluten", "dairy"], spice: 0,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "4.4★ (4,151 ulasan). Cafe klasik Bandung sejak lama — menu Indonesian + western.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 4151
  },
  {
    id: "parit-9-seafood", name: "Parit 9 Seafood", emoji: "🦐",
    cuisine: "seafood", type: "food", tags: ["hidden-gem"],
    vibes: ["hearty"], diet: ["halal", "pescatarian"], allergies: ["seafood"], spice: 2,
    priceTier: "medium", estPrice: 50000, healthScore: 7, macros: null,
    description: "4.3★ (7,340 ulasan). Seafood paling rame — udang, kerang, kepiting saus padang.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 7340
  },
  {
    id: "batagor-cuanki-serayu", name: "Batagor & Baso Cuankie Serayu", emoji: "🥟",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: ["nuts", "gluten"], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 6, macros: null,
    description: "⭐ 4.5 (14,541 ulasan). Batagor & cuanki legend Bandung — selalu rame.",
    isTrending: true, trendingAreas: ["cibadak"], rating: 4.5, reviews: 14541
  },
  {
    id: "mie-baso-raos-pardi", name: "Mie Baso Raos Mas Pardi", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: ["gluten"], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (784 ulasan). Mie baso urat dengan kuah kaldu sapi pekat.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 784
  },
  {
    id: "kilogram-gatsu", name: "Kilogram Space Gatot Subroto", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: ["dairy"], spice: 0,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "4.0★ (221 ulasan). Cafe co-working area Gatsu — cocok buat kerja sambil ngopi.",
    isTrending: false, trendingAreas: [], rating: 4.0, reviews: 221
  },
  {
    id: "blow-listening-coffee", name: "B.LOW Listening Coffee", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: ["dairy"], spice: 0,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "4.4★ (84 ulasan). Listening bar — kopi specialty + vinyl music vibes.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 84
  },
  {
    id: "chime-in-coffee", name: "Chime In Coffee", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: ["dairy"], spice: 0,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.9 (57 ulasan). Specialty coffee + cozy vibe.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.9, reviews: 57
  },
  {
    id: "warung-bakmi-dago", name: "Warung Bakmi Dago", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: ["gluten", "soy"], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (152 ulasan). Bakmi otentik di area Dago — kuah dan bumbunya juara.",
    isTrending: true, trendingAreas: ["dago"], rating: 4.7, reviews: 152
  },
  {
    id: "sate-maranggi-naripan-bdg", name: "Sate Maranggi Naripan", emoji: "🍢",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["hearty"], diet: ["halal"], allergies: [], spice: 2,
    priceTier: "medium", estPrice: 62000, healthScore: 6, macros: null,
    description: "⭐ Top-rated 4.8 (150 ulasan). Sate maranggi sapi authentic Sunda.",
    isTrending: true, trendingAreas: ["cibadak"], rating: 4.8, reviews: 150
  },
  {
    id: "jiku-wagyu-yakiniku", name: "Jiku Wagyu Yakiniku", emoji: "🥩",
    cuisine: "japanese", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["indulgent", "hearty"], diet: ["halal"], allergies: ["soy"], spice: 1,
    priceTier: "high", estPrice: 180000, healthScore: 6, macros: null,
    description: "⭐ Top-rated 4.9 (1,195 ulasan). Wagyu yakiniku — premium Jepang grilled.",
    isTrending: true, trendingAreas: ["pasteur", "sukajadi"], rating: 4.9, reviews: 1195
  },
  {
    id: "modular-coffee-space", name: "Modular Coffee & Space", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort", "light"], diet: ["halal"], allergies: ["dairy"], spice: 0,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 5.0 (8 ulasan). Coffee & co-working space dengan ruang terbuka.",
    isTrending: false, trendingAreas: [], rating: 5.0, reviews: 8
  },
  {
    id: "soto-jopankar", name: "Soto Jopankar", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort", "healthy"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 7, macros: null,
    description: "⭐ Top-rated 4.9 (35 ulasan). Soto kuah bening segar — comfort food.",
    isTrending: false, trendingAreas: [], rating: 4.9, reviews: 35
  },
  {
    id: "gekato-pizza-laswi", name: "Gekato Pizza Laswi", emoji: "🍕",
    cuisine: "western", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["indulgent"], diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy"], spice: 0,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.9 (114 ulasan). Pizza thin-crust di Laswi — viral di IG.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.9, reviews: 114
  },
  {
    id: "bubur-ayam-kang-wahyu", name: "Bubur Ayam Kang Wahyu", emoji: "🍳",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort", "light"], diet: ["halal"], allergies: ["eggs"], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 6, macros: null,
    description: "⭐ 4.6 (60 ulasan). Bubur ayam sederhana — sarapan klasik anak Bandung.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 60
  },
  {
    id: "raffels-sandwich-pvj", name: "Raffel's Sandwich PVJ", emoji: "🥪",
    cuisine: "western", type: "food", tags: ["hidden-gem"],
    vibes: ["indulgent", "comfort"], diet: ["halal"], allergies: ["gluten", "dairy"], spice: 0,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (116 ulasan). Sandwich generous di mall PVJ — quick bite favorite.",
    isTrending: false, trendingAreas: ["sukajadi"], rating: 4.5, reviews: 116
  },
  {
    id: "kisah-manis-huis", name: "Kisah Manis Huis", emoji: "🍰",
    cuisine: "fusion", type: "dessert", tags: ["hidden-gem"],
    vibes: ["sweet", "comfort"], diet: ["halal", "vegetarian"], allergies: ["gluten", "dairy", "eggs"], spice: 0,
    priceTier: "low", estPrice: 35000, healthScore: 3, macros: null,
    description: "⭐ 4.7 (706 ulasan). Dessert house — cake, pastry, tea time vibes.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 706
  },
  {
    id: "nasi-sop-halimun", name: "Nasi Sop Halimun", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort", "hearty"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 7, macros: null,
    description: "⭐ 4.6 (98 ulasan). Nasi sop daging legend di Jl. Halimun.",
    isTrending: false, trendingAreas: ["cibadak"], rating: 4.6, reviews: 98
  },
  {
    id: "batagor-haji-yunus", name: "Batagor Haji Yunus", emoji: "🥟",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: ["nuts", "gluten"], spice: 2,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (4,042 ulasan). Batagor legend Bandung — bumbu kacangnya ikonik.",
    isTrending: false, trendingAreas: ["cibadak"], rating: 4.5, reviews: 4042
  },
  {
    id: "nasi-pecel-mbak-naning", name: "Nasi Pecel Madiun Mbak Naning", emoji: "🥗",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort", "healthy"], diet: ["halal", "vegetarian"], allergies: ["nuts"], spice: 2,
    priceTier: "low", estPrice: 18000, healthScore: 8, macros: null,
    description: "⭐ Top-rated 4.8 (72 ulasan). Pecel Madiun authentic — sayur + bumbu kacang.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.8, reviews: 72
  },
  {
    id: "lotek-rujak-mustikasari", name: "Lotek & Rujak Mustikasari", emoji: "🥗",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["healthy", "spicy"], diet: ["halal", "vegetarian"], allergies: ["nuts"], spice: 3,
    priceTier: "low", estPrice: 18000, healthScore: 8, macros: null,
    description: "4.4★ (116 ulasan). Lotek + rujak Sunda autentik — fresh & pedas.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 116
  },
  {
    id: "bakso-kd-durian-cendol", name: "Bakso KD Durian & Cendol Bar Bar", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort", "indulgent"], diet: ["halal"], allergies: ["gluten", "dairy"], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 4, macros: null,
    description: "4.4★ (318 ulasan). Bakso bar-bar dengan menu durian + cendol — unik!",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 318
  },

  // ============================================================
  // 💎 MORE HIDDEN GEMS — diimport dari Semantics Research lists
  // (Top Rated BDG + Kulineran BDG, ~317 tempat. 130 unik baru)
  // ============================================================
  {
    id: "blue-doors", name: "Blue Doors", emoji: "☕",
    cuisine: "cafe", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (2,696 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 2696
  },
  {
    id: "cafe-halaman", name: "Cafe Halaman", emoji: "🍳",
    cuisine: "cafe", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "4.3★ (3,430 ulasan). Hidden gem Bandung — kategori kafe.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 3430
  },
  {
    id: "sajian-sunda-sambara", name: "Sajian Sunda Sambara", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "4.4★ (4,117 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 4117
  },
  {
    id: "ambrogio-patisserie", name: "Ambrogio Patisserie", emoji: "🥐",
    cuisine: "bakery", type: "snack", tags: ["hidden-gem", "viral"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (13,276 ulasan). Hidden gem Bandung — kategori pastri.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 13276
  },
  {
    id: "bellamie-boulangerie", name: "Bellamie Boulangerie", emoji: "🍳",
    cuisine: "cafe", type: "food", tags: ["hidden-gem", "viral"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (8,245 ulasan). Hidden gem Bandung — kategori kafe.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 8245
  },
  {
    id: "dakken-restaurant", name: "Dakken Restaurant", emoji: "🍕",
    cuisine: "western", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (4,946 ulasan). Hidden gem Bandung — kategori masakan barat.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 4946
  },
  {
    id: "dailah-sajian-nusantara-bandung", name: "Dailah Sajian Nusantara - Bandung", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (819 ulasan). Hidden gem Bandung — kategori indonesia.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 819
  },
  {
    id: "salt-saltbread", name: "Salt Saltbread", emoji: "🥐",
    cuisine: "bakery", type: "snack", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.0★ (403 ulasan). Hidden gem Bandung — kategori toko roti.",
    isTrending: false, trendingAreas: [], rating: 4.0, reviews: 403
  },
  {
    id: "rumah-kopi-abdul", name: "Rumah Kopi Abdul", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.8 (138 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: false, trendingAreas: [], rating: 4.8, reviews: 138
  },
  {
    id: "mangkok-manis", name: "Mangkok Manis", emoji: "✨",
    cuisine: "fusion", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (3,846 ulasan). Hidden gem Bandung — kategori kedai hidangan penutup.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 3846
  },
  {
    id: "dapur-aero", name: "Dapur Aero", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.8 (23 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.8, reviews: 23
  },
  {
    id: "nhame-asia-afrika", name: "Nhame Asia Afrika", emoji: "✨",
    cuisine: "fusion", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (91 ulasan). Hidden gem Bandung — kategori masakan asia.",
    isTrending: false, trendingAreas: [], rating: 4.7, reviews: 91
  },
  {
    id: "rasa-bakery-cafe", name: "Rasa Bakery & Cafe", emoji: "🥐",
    cuisine: "bakery", type: "snack", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (4,848 ulasan). Hidden gem Bandung — kategori toko roti.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 4848
  },
  {
    id: "gepuk-nyonya-yong", name: "Gepuk Nyonya Yong", emoji: "🍚",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (660 ulasan). Hidden gem Bandung — kategori sunda.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 660
  },
  {
    id: "kebon-ayam", name: "Kebon ayam", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.3★ (66 ulasan). Hidden gem Bandung — kategori nasi.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 66
  },
  {
    id: "mie-ayam-jemari", name: "Mie Ayam Jemari", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.3★ (91 ulasan). Hidden gem Bandung — kategori mi.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 91
  },
  {
    id: "roadrunner-burger-by-ethereal", name: "Roadrunner Burger by EthereaL", emoji: "🍔",
    cuisine: "western", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 88000, healthScore: 5, macros: null,
    description: "⭐ 4.9 (160 ulasan). Hidden gem Bandung — kategori hamburger.",
    isTrending: false, trendingAreas: [], rating: 4.9, reviews: 160
  },
  {
    id: "soto-tangkar-gepuk-haji-jayadi", name: "Soto Tangkar & Gepuk Haji Jayadi", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (468 ulasan). Hidden gem Bandung — kategori soto.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 468
  },
  {
    id: "burgerman", name: "BurgerMan", emoji: "🍔",
    cuisine: "western", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 88000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (282 ulasan). Hidden gem Bandung — kategori hamburger.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 282
  },
  {
    id: "baso-bawean", name: "Baso Bawean", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (203 ulasan). Hidden gem Bandung — kategori bakso.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 203
  },
  {
    id: "lumiko38", name: "LumikO38", emoji: "☕",
    cuisine: "cafe", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.3★ (289 ulasan). Hidden gem Bandung — kategori brunch.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 289
  },
  {
    id: "mimadre-brisket-sandwich", name: "MIMADRE Brisket & Sandwich", emoji: "🥪",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "4.4★ (69 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 69
  },
  {
    id: "mangloong", name: "Mangloong", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (275 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 275
  },
  {
    id: "golden-chicken-rice", name: "Golden Chicken Rice", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.9 (16 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.9, reviews: 16
  },
  {
    id: "sun-claypot-and-dimsum", name: "Sun Claypot and Dimsum", emoji: "🥟",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (480 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 480
  },
  {
    id: "wongkie-kopitiam-malabar", name: "Wongkie Kopitiam - Malabar", emoji: "☕",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.9 (1,162 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.9, reviews: 1162
  },
  {
    id: "mie-kocok-bpjs", name: "Mie Kocok BPJS", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (414 ulasan). Hidden gem Bandung — kategori mi.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 414
  },
  {
    id: "ayam-goreng-kurnia", name: "Ayam Goreng Kurnia", emoji: "🍗",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (468 ulasan). Hidden gem Bandung — kategori ayam.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 468
  },
  {
    id: "yaowarat-thai-street-food", name: "Yaowarat Thai Street food", emoji: "🌶",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (34 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.7, reviews: 34
  },
  {
    id: "nasi-bali-semeton-kalipah-apo", name: "Nasi Bali SEMETON - Kalipah Apo", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.9 (718 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: true, trendingAreas: ["cibadak"], rating: 4.9, reviews: 718
  },
  {
    id: "kedai-wanfang", name: "Kedai Wanfang", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (528 ulasan). Hidden gem Bandung — kategori china.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 528
  },
  {
    id: "duwatiga", name: "Duwatiga", emoji: "☕",
    cuisine: "cafe", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.8 (1,318 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.8, reviews: 1318
  },
  {
    id: "rm-abah-harja-bandung", name: "RM ABAH HARJA BANDUNG", emoji: "🍚",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (1,783 ulasan). Hidden gem Bandung — kategori sunda.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 1783
  },
  {
    id: "ayam-pedas-banyuwangi-hj-supiyah", name: "Ayam Pedas Banyuwangi Hj. Supiyah", emoji: "✨",
    cuisine: "fusion", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 3,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (189 ulasan). Hidden gem Bandung — kategori masakan asia.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 189
  },
  {
    id: "spill-bites-purnawarman", name: "Spill & Bites Purnawarman", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (267 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 267
  },
  {
    id: "warung-sate-mang-zebul", name: "Warung Sate Mang Zebul", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (45 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.7, reviews: 45
  },
  {
    id: "goodwheel-companion", name: "Goodwheel Companion", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 5.0 (4,166 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 5.0, reviews: 4166
  },
  {
    id: "roemah-haji-daging", name: "Roemah Haji Daging", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.8 (507 ulasan). Hidden gem Bandung — kategori rumah makan.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.8, reviews: 507
  },
  {
    id: "iga-siliwangi", name: "Iga Siliwangi", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "4.3★ (542 ulasan). Hidden gem Bandung — kategori indonesia.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 542
  },
  {
    id: "halaman-dapur-geeyaa", name: "Halaman Dapur Geeyaa", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.8 (55 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.8, reviews: 55
  },
  {
    id: "mr-raffles-bistro-bar", name: "Mr. Raffles Bistro & Bar", emoji: "🍽",
    cuisine: "cafe", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.8 (1,465 ulasan). Hidden gem Bandung — kategori bistro.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.8, reviews: 1465
  },
  {
    id: "homu-kanpai", name: "Homu Kanpai", emoji: "🍣",
    cuisine: "japanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (113 ulasan). Hidden gem Bandung — kategori jepang.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 113
  },
  {
    id: "sate-madas-asin-pedas", name: "Sate Madas Asin Pedas", emoji: "🍢",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 3,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (443 ulasan). Hidden gem Bandung — kategori sate.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 443
  },
  {
    id: "warung-sate-bu-ngantuk", name: "Warung Sate Bu Ngantuk", emoji: "🍢",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (1,077 ulasan). Hidden gem Bandung — kategori sate.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 1077
  },
  {
    id: "sate-madura-cak-nur-maskumambang", name: "SATE MADURA CAK NUR, MASKUMAMBANG", emoji: "🍢",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (237 ulasan). Hidden gem Bandung — kategori sate.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 237
  },
  {
    id: "siomay-baso-tahu-bung-fahri", name: "siomay baso tahu BUNG fahri", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.9 (44 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.9, reviews: 44
  },
  {
    id: "bbq-mountain-boys-burger", name: "BBQ Mountain Boys Burger", emoji: "🍔",
    cuisine: "western", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 88000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (4,317 ulasan). Hidden gem Bandung — kategori hamburger.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 4317
  },
  {
    id: "fransis-pizza", name: "Fransis Pizza", emoji: "🍕",
    cuisine: "western", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (545 ulasan). Hidden gem Bandung — kategori pizza.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 545
  },
  {
    id: "chorus-coffee", name: "Chorus Coffee", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (450 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 450
  },
  {
    id: "m-laga-resto", name: "Málaga Resto", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.9 (1,136 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.9, reviews: 1136
  },
  {
    id: "altero-bistronomie", name: "Altero Bistronomie", emoji: "🍽",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "high", estPrice: 280000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.8 (1,098 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.8, reviews: 1098
  },
  {
    id: "san-da-http-san-da-ran-coffee", name: "[San.Da](http://San.Da).Ran Coffee", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (879 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 879
  },
  {
    id: "nasi-kuning-dan-uduk-pandu-ny-shelvy", name: "Nasi Kuning dan Uduk Pandu Ny. Shelvy", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (424 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 424
  },
  {
    id: "warung-nasi-pecel-kediri-pak-tono", name: "Warung Nasi Pecel Kediri Pak Tono", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (207 ulasan). Hidden gem Bandung — kategori jawa timur.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 207
  },
  {
    id: "nasi-kuning-roemah-naskoen", name: "Nasi Kuning Roemah Naskoen", emoji: "🍛",
    cuisine: "western", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (51 ulasan). Hidden gem Bandung — kategori makanan siap saji.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 51
  },
  {
    id: "waroeng-ethnic", name: "Waroeng Ethnic", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 88000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (2,292 ulasan). Hidden gem Bandung — kategori sesuai untuk keluarga.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 2292
  },
  {
    id: "lamansua-coffee-eatery", name: "LAMANSUA Coffee & Eatery", emoji: "☕",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.8 (677 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.8, reviews: 677
  },
  {
    id: "the-deli-bakes-cafe-pudak", name: "The Deli Bakes Cafe (Pudak)", emoji: "🍳",
    cuisine: "cafe", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (1,990 ulasan). Hidden gem Bandung — kategori kafe.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 1990
  },
  {
    id: "kedai-makan-tiga-paman", name: "Kedai Makan Tiga Paman", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.9 (2,535 ulasan). Hidden gem Bandung — kategori china.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.9, reviews: 2535
  },
  {
    id: "bakmie-ayam-58-teuku-umar", name: "Bakmie Ayam 58 - Teuku Umar", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (565 ulasan). Hidden gem Bandung — kategori mie china.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 565
  },
  {
    id: "legenda-tiga-ayam", name: "Legenda Tiga Ayam", emoji: "🍗",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.8 (1,012 ulasan). Hidden gem Bandung — kategori ayam.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.8, reviews: 1012
  },
  {
    id: "abon-gulung-siliwangi", name: "Abon Gulung Siliwangi", emoji: "🥐",
    cuisine: "bakery", type: "snack", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 88000, healthScore: 5, macros: null,
    description: "4.2★ (137 ulasan). Hidden gem Bandung — kategori toko roti.",
    isTrending: false, trendingAreas: [], rating: 4.2, reviews: 137
  },
  {
    id: "bungkushin-cihapit", name: "Bungkushin Cihapit", emoji: "🍣",
    cuisine: "japanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (100 ulasan). Hidden gem Bandung — kategori jepang.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 100
  },
  {
    id: "warung-rujak-cingur-pecel-jombang-bu-suji", name: "Warung Rujak Cingur & Pecel Jombang Bu Suji", emoji: "🥗",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (470 ulasan). Hidden gem Bandung — kategori jawa timur.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 470
  },
  {
    id: "yurin-rumah-makan", name: "Yurin Rumah Makan", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (2,240 ulasan). Hidden gem Bandung — kategori prasmanan.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 2240
  },
  {
    id: "batagor-mas-godeg", name: "batagor mas godeg", emoji: "🥟",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (47 ulasan). Hidden gem Bandung — kategori sunda.",
    isTrending: false, trendingAreas: [], rating: 4.7, reviews: 47
  },
  {
    id: "soto-ahri", name: "Soto AHRI", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (490 ulasan). Hidden gem Bandung — kategori soto.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 490
  },
  {
    id: "luca-pasta-steak", name: "Luca Pasta & Steak", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "4.4★ (692 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 692
  },
  {
    id: "kuah-dua-pulau", name: "Kuah Dua Pulau", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.3★ (131 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 131
  },
  {
    id: "mie-abud-mie-yamin-bakso-pangsit", name: "Mie Abud (Mie Yamin Bakso Pangsit)", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (166 ulasan). Hidden gem Bandung — kategori indonesia.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 166
  },
  {
    id: "ponyo-resto-wedding-malabar-bandung", name: "Ponyo Resto & Wedding - Malabar Bandung", emoji: "🍚",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (4,706 ulasan). Hidden gem Bandung — kategori sunda.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 4706
  },
  {
    id: "lotek-dan-es-cendol-alkateri", name: "Lotek dan Es Cendol Alkateri", emoji: "🥗",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 8, macros: null,
    description: "⭐ 4.5 (404 ulasan). Hidden gem Bandung — kategori salad.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 404
  },
  {
    id: "baso-laswi", name: "Baso Laswi", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (1,225 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 1225
  },
  {
    id: "third-space-coffee-dimsum-noodle", name: "Third Space | Coffee Dimsum Noodle", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (2,142 ulasan). Hidden gem Bandung — kategori kafe.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 2142
  },
  {
    id: "kopi-moyan", name: "Kopi Moyan", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (1,449 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 1449
  },
  {
    id: "khoe-pek-goan-bloemenstad-bandung", name: "Khoe Pek Goan Bloemenstad Bandung", emoji: "🥐",
    cuisine: "bakery", type: "snack", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (2,587 ulasan). Hidden gem Bandung — kategori toko roti.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 2587
  },
  {
    id: "dough-deli", name: "Dough Deli", emoji: "🍩",
    cuisine: "fusion", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (584 ulasan). Hidden gem Bandung — kategori donat.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 584
  },
  {
    id: "goda-nusantara", name: "Goda Nusantara", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.8 (326 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.8, reviews: 326
  },
  {
    id: "my-kopi-o-trunojoyo", name: "My Kopi-O\! Trunojoyo", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 88000, healthScore: 5, macros: null,
    description: "4.4★ (3,023 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 3023
  },
  {
    id: "kartika-sari-dago", name: "Kartika Sari Dago", emoji: "🥐",
    cuisine: "bakery", type: "snack", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (3,960 ulasan). Hidden gem Bandung — kategori toko roti.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 3960
  },
  {
    id: "kedai-timbel-dago", name: "Kedai Timbel Dago", emoji: "🍚",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (966 ulasan). Hidden gem Bandung — kategori sunda.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 966
  },
  {
    id: "lontong-sayur-padang-uda-pero", name: "Lontong Sayur Padang Uda Pero", emoji: "🌶",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 3,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (105 ulasan). Hidden gem Bandung — kategori padang.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 105
  },
  {
    id: "noah-s-barn", name: "Noah's Barn", emoji: "🍳",
    cuisine: "cafe", type: "food", tags: ["hidden-gem", "viral"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "high", estPrice: 150000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (6,100 ulasan). Hidden gem Bandung — kategori kafe.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 6100
  },
  {
    id: "kapulaga-indonesian-bistro", name: "Kapulaga Indonesian Bistro", emoji: "🍽",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "4.4★ (3,583 ulasan). Hidden gem Bandung — kategori sunda.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 3583
  },
  {
    id: "sop-buntut-tjap-tango", name: "SOP Buntut Tjap Tango", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (185 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 185
  },
  {
    id: "tones-no-6", name: "TONES NO.6", emoji: "🍳",
    cuisine: "cafe", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (494 ulasan). Hidden gem Bandung — kategori kafe.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 494
  },
  {
    id: "rumamenak", name: "Rumamenak", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem", "fyp"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ Top-rated 4.9 (950 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.9, reviews: 950
  },
  {
    id: "ten-to-ten-cafe-mangga", name: "Ten To Ten Cafe Mangga", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "4.4★ (276 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 276
  },
  {
    id: "la-basil-koffie-resto", name: "La Basil Koffie & Resto", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (860 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 860
  },
  {
    id: "rm-agam-sakato", name: "Rm Agam Sakato", emoji: "🌶",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 3,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (461 ulasan). Hidden gem Bandung — kategori padang.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 461
  },
  {
    id: "mi-upami-by-badami", name: "Mi Upami by Badami", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (190 ulasan). Hidden gem Bandung — kategori mi.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 190
  },
  {
    id: "sop-kaki-kambing-sapi-999-mas-udin-jalan-jawa", name: "Sop kaki Kambing & Sapi 999 Mas Udin Jalan Jawa", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (316 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 316
  },
  {
    id: "sop-buntut-ma-emun-bandung", name: "Sop Buntut Ma Emun Bandung", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (91 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 91
  },
  {
    id: "omamie-masakan-manado", name: "OmaMIE - Masakan Manado", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.3★ (364 ulasan). Hidden gem Bandung — kategori manado.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 364
  },
  {
    id: "rm-hj-ine-masakan-indonesia", name: "RM. Hj.Ine Masakan Indonesia", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (819 ulasan). Hidden gem Bandung — kategori rumah makan.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 819
  },
  {
    id: "dapur-dahapati", name: "dapur Dahapati", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 88000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (1,445 ulasan). Hidden gem Bandung — kategori indonesia.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 1445
  },
  {
    id: "soto-lamongan-7-kismuji", name: "Soto Lamongan 7 Kismuji", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.8 (51 ulasan). Hidden gem Bandung — kategori soto ayam.",
    isTrending: false, trendingAreas: [], rating: 4.8, reviews: 51
  },
  {
    id: "cwie-mie-87-bunderan-lombok", name: "Cwie Mie 87 (Bunderan Lombok)", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (433 ulasan). Hidden gem Bandung — kategori mi.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 433
  },
  {
    id: "toko-kopi-lajeng", name: "Toko Kopi Lajeng", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (188 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: false, trendingAreas: [], rating: 4.7, reviews: 188
  },
  {
    id: "kozi-coffee-x-marawa", name: "Kozi Coffee X Marawa", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (325 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 325
  },
  {
    id: "batagor-h-darto", name: "Batagor H. Darto", emoji: "🥟",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "4.3★ (1,087 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 1087
  },
  {
    id: "warung-nasi-talago-biru", name: "Warung Nasi Talago Biru", emoji: "🌶",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 3,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (78 ulasan). Hidden gem Bandung — kategori padang.",
    isTrending: false, trendingAreas: [], rating: 4.7, reviews: 78
  },
  {
    id: "fore-coffee-dipatiukur", name: "Fore Coffee - Dipatiukur", emoji: "☕",
    cuisine: "cafe", type: "drink", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (1,509 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 1509
  },
  {
    id: "aji-anom", name: "Aji Anom", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (1,121 ulasan). Hidden gem Bandung — kategori bali.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 1121
  },
  {
    id: "kafe-kebon", name: "Kafe Kebon", emoji: "🍕",
    cuisine: "western", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (1,094 ulasan). Hidden gem Bandung — kategori pizza.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 1094
  },
  {
    id: "shigeru-trans-studio-bandung", name: "Shigeru Trans Studio Bandung", emoji: "🍣",
    cuisine: "japanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "4.3★ (457 ulasan). Hidden gem Bandung — kategori jepang.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 457
  },
  {
    id: "mie-baso-rudal-anggrek", name: "Mie Baso Rudal Anggrek", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (1,843 ulasan). Hidden gem Bandung — kategori bakso.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 1843
  },
  {
    id: "prima-rasa-pasirkaliki", name: "Prima Rasa Pasirkaliki", emoji: "🥐",
    cuisine: "bakery", type: "snack", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (4,047 ulasan). Hidden gem Bandung — kategori toko roti.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 4047
  },
  {
    id: "nasi-uduk-ayam-goreng-cinta-97", name: "Nasi Uduk Ayam Goreng Cinta 97", emoji: "🍚",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.3★ (1,622 ulasan). Hidden gem Bandung — kategori nasi uduk.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 1622
  },
  {
    id: "mie-rajiman", name: "Mie Rajiman", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.9 (60 ulasan). Hidden gem Bandung — kategori mi.",
    isTrending: false, trendingAreas: [], rating: 4.9, reviews: 60
  },
  {
    id: "bakmi-tasik-gardu-jati", name: "Bakmi Tasik Gardu Jati", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.3★ (479 ulasan). Hidden gem Bandung — kategori mi.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 479
  },
  {
    id: "bakmie-maman-3-gardujati", name: "Bakmie Maman 3 Gardujati", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.3★ (894 ulasan). Hidden gem Bandung — kategori mi.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 894
  },
  {
    id: "duti-roti-bakar-dan-bubur", name: "DUTI Roti Bakar dan Bubur", emoji: "🥐",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (1,053 ulasan). Hidden gem Bandung — kategori roti bakar.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 1053
  },
  {
    id: "aa-bistik-selain-pesan-online", name: "AA Bistik (SELAIN PESAN ONLINE)", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.4★ (374 ulasan). Hidden gem Bandung — kategori pujasera.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 374
  },
  {
    id: "warung-nasi-ibu-imas", name: "Warung Nasi Ibu Imas", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.2★ (850 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.2, reviews: 850
  },
  {
    id: "warung-nasi-ampera-kebon-kalapa", name: "Warung Nasi Ampera Kebon Kalapa", emoji: "🍚",
    cuisine: "sundanese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.3★ (1,302 ulasan). Hidden gem Bandung — kategori sunda.",
    isTrending: false, trendingAreas: [], rating: 4.3, reviews: 1302
  },
  {
    id: "nasi-kuning-pungkur-216", name: "Nasi Kuning Pungkur 216", emoji: "🍛",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (1,375 ulasan). Hidden gem Bandung — kategori indonesia.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 1375
  },
  {
    id: "mie-127", name: "Mie 127", emoji: "🍜",
    cuisine: "chinese", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (516 ulasan). Hidden gem Bandung — kategori mi.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 516
  },
  {
    id: "baso-balowo", name: "Baso Balowo", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (711 ulasan). Hidden gem Bandung — kategori bakso.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 711
  },
  {
    id: "bijikopling", name: "Bijikopling", emoji: "☕",
    cuisine: "cafe", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (734 ulasan). Hidden gem Bandung — kategori kedai kopi.",
    isTrending: true, trendingAreas: ["lainnya"], rating: 4.7, reviews: 734
  },
  {
    id: "tizi", name: "Tizi", emoji: "🍕",
    cuisine: "western", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "high", estPrice: 150000, healthScore: 5, macros: null,
    description: "⭐ 4.5 (4,088 ulasan). Hidden gem Bandung — kategori belanda.",
    isTrending: false, trendingAreas: [], rating: 4.5, reviews: 4088
  },
  {
    id: "bebek-ngarasan", name: "Bebek Ngarasan", emoji: "🦆",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.4★ (1,018 ulasan). Hidden gem Bandung — kategori restoran.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 1018
  },
  {
    id: "nasi-soto-ayam-cak-pardi", name: "Nasi Soto Ayam Cak Pardi", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.7 (171 ulasan). Hidden gem Bandung — kategori soto ayam.",
    isTrending: false, trendingAreas: [], rating: 4.7, reviews: 171
  },
  {
    id: "rumah-makan-padang-sari-banua", name: "Rumah Makan Padang Sari Banua", emoji: "🌶",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 3,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.4★ (534 ulasan). Hidden gem Bandung — kategori padang.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 534
  },
  {
    id: "baso-tri-lanang-s", name: "Baso Tri Lanang's", emoji: "🍲",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 18000, healthScore: 5, macros: null,
    description: "⭐ 4.8 (63 ulasan). Hidden gem Bandung — kategori bakso.",
    isTrending: false, trendingAreas: [], rating: 4.8, reviews: 63
  },
  {
    id: "ayam-goreng-hawaii", name: "Ayam Goreng Hawaii", emoji: "🍗",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.4★ (536 ulasan). Hidden gem Bandung — kategori ayam goreng.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 536
  },
  {
    id: "chicken-run", name: "Chicken Run", emoji: "🍗",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 35000, healthScore: 5, macros: null,
    description: "⭐ 5.0 (1 ulasan). Hidden gem Bandung — kategori ayam.",
    isTrending: false, trendingAreas: [], rating: 5.0, reviews: 1
  },
  {
    id: "ayam-bakar-taliwang-bersaudara", name: "Ayam Bakar Taliwang Bersaudara", emoji: "🍗",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 75000, healthScore: 5, macros: null,
    description: "4.4★ (2,480 ulasan). Hidden gem Bandung — kategori ayam.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 2480
  },
  {
    id: "bebek-bakar-ayayo", name: "Bebek Bakar Ayayo", emoji: "🦆",
    cuisine: "fusion", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "medium", estPrice: 62000, healthScore: 5, macros: null,
    description: "⭐ 4.6 (946 ulasan). Hidden gem Bandung — kategori masakan asia.",
    isTrending: false, trendingAreas: [], rating: 4.6, reviews: 946
  },
  {
    id: "roasted-bar-tirtayasa", name: "Roasted Bar Tirtayasa", emoji: "🍗",
    cuisine: "indonesian", type: "food", tags: ["hidden-gem"],
    vibes: ["comfort"], diet: ["halal"], allergies: [], spice: 1,
    priceTier: "low", estPrice: 38000, healthScore: 5, macros: null,
    description: "4.4★ (186 ulasan). Hidden gem Bandung — kategori ayam.",
    isTrending: false, trendingAreas: [], rating: 4.4, reviews: 186
  },
];
