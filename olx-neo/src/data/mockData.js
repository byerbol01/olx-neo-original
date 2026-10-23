// src/data/mockData.js
// Mock database for OLX NEO — Complete Real-Life Marketplace Data
import {
  generateMockData,
  MOCK_PRODUCTS_300,
  formatPriceUZS,
  formatPriceUSD,
} from "./generateMockData";

export { generateMockData, formatPriceUZS, formatPriceUSD };

export const CATEGORIES = [
  { id: "auto", name: "Avto", icon: "Car", count: "128 450", color: "text-blue-600", bg: "bg-blue-50" },
  { id: "real-estate", name: "Ko'chmas mulk", icon: "Building2", count: "84 200", color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "electronics", name: "Elektronika", icon: "Laptop", count: "342 100", color: "text-purple-600", bg: "bg-purple-50" },
  { id: "jobs", name: "Ish o'rinlari", icon: "Briefcase", count: "42 900", color: "text-amber-600", bg: "bg-amber-50" },
  { id: "services", name: "Xizmatlar", icon: "Wrench", count: "65 800", color: "text-teal-600", bg: "bg-teal-50" },
  { id: "fashion", name: "Moda va stil", icon: "Shirt", count: "95 400", color: "text-pink-600", bg: "bg-pink-50" },
  { id: "kids", name: "Bolalar dunyosi", icon: "Baby", count: "38 200", color: "text-cyan-600", bg: "bg-cyan-50" },
  { id: "home-garden", name: "Uy va bog'", icon: "Armchair", count: "78 600", color: "text-orange-600", bg: "bg-orange-50" },
];

// Complete 300 Real-life Products dataset across 5 primary categories
export const ALL_PRODUCTS = MOCK_PRODUCTS_300;

// 4 Top VIP items for Homepage & Highlights
export const VIP_PRODUCTS = ALL_PRODUCTS.filter((p) => p.badge === "VIP" || p.isVIP).slice(0, 4);

// 24 Latest items for Homepage Feed
export const LATEST_PRODUCTS = ALL_PRODUCTS.slice(0, 24);

// Filtered items for Catalog Page (Electronics / Laptops)
export const CATALOG_LAPTOPS = ALL_PRODUCTS.filter(
  (p) => p.category === "Elektronika"
);

// Flagman Product Detailed Specification (Screen 3)
export const CURRENT_PRODUCT = {
  id: "84920412",
  slug: "macbook-pro-16",
  title: "Kuchli flagman noutbuk 16 dyuym, 32GB RAM / 1TB SSD",
  subTitle: "Apple MacBook Pro 16\" M3 Max (36GB / 1TB)",
  price: 58400000,
  priceFormatted: "58 400 000 so'm",
  priceUsd: "Taqriban $4 620 USD",
  negotiable: true,
  postedAt: "Bugun 10:45 da joylashtirildi",
  views: 456,
  favorites: 24,
  condition: "Yangi (Qadoqda, muhrlangan)",
  warrantyText: "KAFOLATLANGAN 12 OY",
  statusBadge: "YANGI QADOQDA",
  images: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=85",
  ],
  quickSpecs: [
    { label: "Tezkor xotira (RAM)", value: "32 GB" },
    { label: "Doimiy xotira (SSD)", value: "1 TB SSD" },
    { label: "Displey o'lchami", value: "16.2\" 120Hz" },
    { label: "Akkumulyator", value: "100% (2 sikl)" },
  ],
  specs: [
    { label: "Brend", value: "Apple" },
    { label: "Model", value: "MacBook Pro 16 (Late 2023)" },
    { label: "Protsessor", value: "Apple M3 Max (16-core CPU / 40-core GPU)" },
    { label: "Operativ xotira (RAM)", value: "36 GB Unified Memory" },
    { label: "Doimiy xotira turi", value: "1 TB PCIe 4.0 NVMe SSD" },
    { label: "Displey", value: "16.2\" Liquid Retina XDR (3456x2234), ProMotion 120Hz" },
    { label: "Holati", value: "Yangi (Qadoqda, muhrlangan)", isBadge: true },
    { label: "Rangi", value: "Space Black (Qora)", colorDot: "#1f2022" },
    { label: "Kafolat muddati", value: "1 yil rasmiy Apple Care kafolati", isBadge: true },
    { label: "Yetkazib berish", value: "Toshkent shahri bo'ylab bepul tezkor kuryer" },
  ],
  description: [
    "AQSH rasmiy Apple Store do'konidan keltirilgan, mutlaqo yangi flagman noutbuk. Qadoq plyonkasi ochilmagan, zavod muhrlari buzilmagan (sealed box). Og'ir 3D modellashtirish, 8K video montaj, dasturlash va yirik arxitektura loyihalari uchun mo'ljallangan qudratli ish stansiyasi.",
    "Akkumulyatori 100% zavod holatida (faqat tekshiruv uchun faollashtirilmagan, to'liq sikl 0-2 ta oralig'ida). Quvvatlagich original 140W USB-C quvvat bloki hamda matoli Space Black MagSafe 3 kabeli to'liq jamlanmada keladi.",
  ],
  warrantyBox: {
    title: "Rasmiy Kafolat va Sinov Muddatlari:",
    text: "Xaridor uchun 12 oylik xalqaro Apple Care kafolati beriladi. Tizimni o'rnatish va to'liq texnik ko'rikdan o'tkazish uchun 14 kunlik bepul sinov muddati kafolatlangan.",
  },
  deliveryBox: "Yetkazib berish va to'lov: Toshkent shahri ichida 2 soat ichida kuryer orqali xavfsiz yetkazib beriladi. Viloyatlarga BTS yoki Fargo orqali 24 soat ichida sug'urtalangan shaklda jo'natish imkoniyati mavjud. Xaridorni aldovdan himoya qilish uchun to'lov faqat mahsulot qo'lingizga yetib borgach va seriya raqami tekshirilgandan so'ng amalga oshiriladi.",
  features: [
    "O'zbekiston bo'ylab yetkazish",
    "Xavfsiz to'lov tizimi",
    "Obmen/Barter ko'rib chiqilmaydi",
  ],
  seller: {
    name: "Aziz Rahimov",
    avatar: "AR",
    verified: true,
    since: "OLX da 2021 yildan beri",
    isOnline: true,
    onlineStatus: "Hozir onlayn",
    oneIdVerified: true,
    oneIdText: "OneID orqali shaxsi tasdiqlangan",
    deals: "48 ta muvaffaqiyatli bitimlar (99% ijobiy)",
    responseTime: "Odatda 5 daqiqa ichida javob beradi",
    totalAds: 12,
    phone: "+998 90 123 45 67",
  },
  location: {
    city: "Toshkent shahri",
    district: "Yunusobod tumani, 11-mavze, Megaplanet yaqinida",
    metro: "Shahriston metro: 600m",
    courier: "Kuryer orqali yetkazish mavjud",
  },
  similarOffers: [
    {
      id: "macbook-pro-14-m3",
      title: "MacBook Pro 14 M3 Pro 18GB/512GB Space Black",
      price: "18 400 000 so'm",
      location: "Toshkent, Yunusobod",
      date: "Bugun, 15:40",
      badge: "VIP",
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "asus-rog-strix-g16",
      title: "ASUS ROG Strix G16 i7-13650HX / RTX 4060 / 16GB",
      price: "14 200 000 so'm",
      location: "Toshkent, Mirzo Ulug'bek",
      date: "Bugun, 14:22",
      badge: "VIP",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "lenovo-legion-pro-5",
      title: "Lenovo Legion Pro 5 16IRX8 Ryzen 7 / RTX 4070",
      price: "32 500 000 so'm",
      location: "Toshkent, Chilonzor",
      date: "Bugun, 13:10",
      badge: "TOP",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "dell-xps-15",
      title: "Dell XPS 15 9530 OLED i9 32GB 1TB RTX 4060",
      price: "28 900 000 so'm",
      location: "Toshkent, Mirobod",
      date: "Kecha, 19:40",
      badge: "KAFOLATLI",
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80",
    },
  ],
};

export const CHATS = [
  {
    id: "chat-aziz",
    user: {
      name: "Aziz Rahimov",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "SOTUVCHI",
      online: true,
      lastSeen: "Hozir onlayn",
    },
    item: {
      id: "macbook-pro-16",
      title: "Apple MacBook Pro 16\" M3 Max (36GB / 1TB)",
      shortTitle: "MacBook Pro 16 M3 Max",
      price: "58 400 000 so'm",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80",
    },
    unread: 2,
    lastTime: "15:42",
    lastMessage: "Ha, noutbuk hali sotuvda bor. Bugun ko'rishingiz mumkin.",
    messages: [
      {
        id: "m1",
        sender: "me",
        text: "Assalomu alaykum! Noutbuk hali ham sotuvdami? Qayerdan ko'rsam bo'ladi?",
        time: "15:35",
      },
      {
        id: "m2",
        sender: "them",
        text: "Va alaykum assalom! Ha, sotuvda bor. Yunusobod 11-mavzeda ko'rishingiz mumkin.",
        time: "15:38",
      },
      {
        id: "m3",
        sender: "me",
        text: "Holati rasmda ko'rsatilganidek yangimi? Zaryad sikli nechta?",
        time: "15:40",
      },
      {
        id: "m4",
        sender: "them",
        text: "Ha, yangi qutisida, 0 ta sikl. Amerikadan keltirilgan, kafolati bor.",
        time: "15:42",
      },
    ],
    quickReplies: ["Manzilni yuboring 📍", "Oxirgi narxi qancha? 💰", "Kafolati bormi? 🛡️", "Bugun olib ketaman 🤝"],
  },
  {
    id: "chat-jasur",
    user: {
      name: "Jasur T.",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      role: "XARIDOR",
      online: false,
      lastSeen: "Kecha, 19:40",
    },
    item: {
      id: "iphone-15-pro-max",
      title: "iPhone 15 Pro Max 256GB Natural Titanium",
      shortTitle: "iPhone 15 Pro Max 256GB",
      price: "14 200 000 so'm",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=200&q=80",
    },
    unread: 0,
    lastTime: "Kecha, 19:40",
    lastMessage: "Rahmat, bugun kelib ko'raman.",
    messages: [
      {
        id: "jm1",
        sender: "them",
        text: "Salom, telefon hali sotilmadimi?",
        time: "Kecha, 19:20",
      },
      {
        id: "jm2",
        sender: "me",
        text: "Salom, yo'q sotilmadi. Yangi qutida.",
        time: "Kecha, 19:30",
      },
      {
        id: "jm3",
        sender: "them",
        text: "Rahmat, bugun kelib ko'raman.",
        time: "Kecha, 19:40",
      },
    ],
    quickReplies: ["Kuting, manzil jo'nataman", "Keling, qaysi paytda?"],
  },
  {
    id: "chat-dilnoza",
    user: {
      name: "Dilnoza M.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      role: "XARIDOR",
      online: false,
      lastSeen: "2 oktabr",
    },
    item: {
      id: "herman-miller",
      title: "Ergonomik ofis kreslosi Herman Miller uslubida",
      shortTitle: "Ergonomik ofis kreslosi",
      price: "1 750 000 so'm",
      image: "https://images.unsplash.com/photo-1580481077195-c3f99581335b?auto=format&fit=crop&w=200&q=80",
    },
    unread: 0,
    lastTime: "2 oktabr",
    lastMessage: "Yetkazib berish xizmati qancha bo'ladi?",
    messages: [
      {
        id: "dm1",
        sender: "them",
        text: "Yetkazib berish xizmati qancha bo'ladi?",
        time: "2 oktabr",
      },
    ],
    quickReplies: ["Toshkent bo'ylab bepul", "Kuryer orqali 30 000 so'm"],
  },
  {
    id: "chat-temur",
    user: {
      name: "Temur Aliyev",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      role: "XARIDOR",
      online: false,
      lastSeen: "28 sentabr",
    },
    item: {
      id: "ps5-slim",
      title: "Sony PlayStation 5 Slim 1TB + 2 ta DualSense pult",
      shortTitle: "PlayStation 5 Slim 1TB",
      price: "6 400 000 so'm",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=200&q=80",
    },
    unread: 0,
    lastTime: "28 sentabr",
    lastMessage: "Pultlar ikkalasi ham originalmi?",
    messages: [
      {
        id: "tm1",
        sender: "them",
        text: "Pultlar ikkalasi ham originalmi?",
        time: "28 sentabr",
      },
    ],
    quickReplies: ["Ha, ikkalasi ham 100% original", "Kafolat qog'ozi bor"],
  },
];

export const USER_PROFILE = {
  name: "Anvar N.",
  avatarInitials: "AN",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  verified: true,
  rating: 5.0,
  reviewsCount: 48,
  phone: "+998 90 123 45 67",
  walletBalance: 85000,
  walletBalanceFormatted: "85 000 so'm",
  stats: {
    activeAds: 6,
    views: 4820,
    viewsGrowth: "+14%",
    calls: 148,
    sales: 8,
  },
  tabsCounts: {
    active: 6,
    pending: 1,
    closed: 7,
    rejected: 1,
  },
  ads: [
    {
      id: "ad-1",
      title: "Kuchli flagman noutbuk 16 dyuym (M3 Max / 32GB / 1TB SSD)",
      price: "58 400 000 so'm",
      location: "Toshkent, Mirobod tumani",
      views: 1420,
      saves: 39,
      status: "active",
      statusText: "Faol • 28 kun qoldi",
      badge: "TOP E'LON",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      photosCount: 12,
    },
    {
      id: "ad-2",
      title: "Smartfon 256GB Titanium (Yangi qadoqda, kafolat bilan)",
      price: "14 200 000 so'm",
      location: "Toshkent, Yunusobod tumani",
      status: "pending",
      statusText: "Moderatsiyada • 15 daqiqa ichida tekshiriladi",
      warningNotice: "E'lon mutaxassislarimiz tomonidan xavfsizlik va sifat talablariga muvofiq tekshirilmoqda. Tez orada barchaga ko'rinadi.",
      sentAt: "Bugun, 14:20 da yuborildi",
      badge: "YANGI",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80",
      photosCount: 6,
    },
    {
      id: "ad-3",
      title: "Avtomobil ehtiyot qismlari (Original disk va kalodkalar to'plami)",
      price: "145 000 000 so'm",
      location: "Toshkent, Sergeli tumani",
      status: "rejected",
      statusText: "Rad etildi • Tuzatish kiritilishi talab etiladi",
      badge: "TO'XTATILGAN",
      errorReason: "Sabab: Telefon raqam rasmda ko'rsatilgan.",
      errorDetails: "Xavfsizlik qoidalariga binoan fotosuratlarda telefon raqam yoki tashqi havolalar bo'lmasligi kerak. Iltimos, raqamni faqat shaxsiy kabinetda qoldiring va rasmni almashtiring.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&q=80",
      photosCount: 4,
    },
    {
      id: "ad-4",
      title: "Chevrolet Malibu 2 Premier Turbo 2.0 (Toza, 2022)",
      price: "330 000 000 so'm",
      location: "Toshkent, Shayxontohur tumani",
      views: 3120,
      saves: 85,
      status: "active",
      statusText: "Faol • 18 kun qoldi",
      badge: "VIP",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80",
      photosCount: 10,
    },
    {
      id: "ad-5",
      title: "Ergonomik ofis kreslosi Herman Miller uslubida",
      price: "1 750 000 so'm",
      location: "Toshkent, Sergeli tumani",
      views: 890,
      saves: 27,
      status: "active",
      statusText: "Faol • 14 kun qoldi",
      badge: "TOP E'LON",
      image: "https://images.unsplash.com/photo-1580481077195-c3f99581335b?auto=format&fit=crop&w=400&q=80",
      photosCount: 5,
    },
    {
      id: "ad-6",
      title: "Sony PlayStation 5 Slim 1TB + 2 ta DualSense pult",
      price: "6 400 000 so'm",
      location: "Toshkent, Yashnobod tumani",
      views: 1100,
      saves: 49,
      status: "active",
      statusText: "Faol • 9 kun qoldi",
      badge: "YANGI",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80",
      photosCount: 8,
    },
  ],
};
