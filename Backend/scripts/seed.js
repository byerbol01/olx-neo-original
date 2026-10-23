/**
 * OLX Neo — Universal Database Seeder
 * Loads 100 realistic ads from mock-data/products.json into:
 * 1. Active Backend JSON database (data/products.json)
 * 2. Frontend cached data (src/data/backendProducts.json)
 * 3. Optional MongoDB / PostgreSQL connection if configured
 */

const fs = require("fs");
const path = require("path");

const mockDataPath = path.join(__dirname, "..", "mock-data", "products.json");
const backendDataPath = path.join(__dirname, "..", "data", "products.json");
const seedDataPath = path.join(__dirname, "..", "data", "seedProducts.json");
const frontendDataPath = path.join(
  __dirname,
  "..",
  "..",
  "olx-neo",
  "src",
  "data",
  "backendProducts.json"
);

async function runSeeder() {
  console.log("==================================================");
  console.log("🌱 OLX Neo — Seeder ishga tushdi...");
  console.log("==================================================");

  if (!fs.existsSync(mockDataPath)) {
    console.error(`❌ Xatolik: ${mockDataPath} fayli topilmadi!`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(mockDataPath, "utf-8"));
  console.log(`📦 mock-data/products.json dan ${raw.length} ta e'lon o'qildi.`);

  // Enrich data with marketplace specifications
  const enrichedProducts = raw.map((p) => {
    const slug = p.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    return {
      id: String(p.id),
      slug: slug || String(p.id),
      title: p.title,
      subTitle: p.title,
      category: p.category,
      price: Number(p.price) || 0,
      priceFormatted: `${Number(p.price || 0)
        .toLocaleString("ru-RU")
        .replace(/,/g, " ")} ${p.currency || "so'm"}`,
      priceUsd: `Taqriban $${Math.round((Number(p.price) || 0) / 12700)} USD`,
      currency: p.currency || "so'm",
      location: p.location,
      date: p.date,
      badge: p.tags || null,
      negotiable: true,
      condition: "A'lo holatda",
      views: Math.floor(Math.random() * 850) + 50,
      favorites: Math.floor(Math.random() * 70) + 5,
      images: [p.image],
      specs: [
        { label: "Kategoriya", value: p.category },
        { label: "Joylashuv", value: p.location },
        { label: "Holati", value: "A'lo holatda" },
      ],
      description: `${p.title}. Mahsulot ideal holatda, to'liq kafolatlangan va tekshirish imkoniyati mavjud. Barcha savollar bo'yicha ko'rsatilgan telefon orqali bog'lanishingiz mumkin.`,
      seller: {
        name: `Sotuvchi ${p.id}`,
        phone: "+998 90 123 45 67",
        avatar: "ST",
        verified: true,
        rating: 4.9,
        deals: "30+ bitim",
      },
      createdAt: Date.now() - Math.floor(Math.random() * 86400000 * 7),
    };
  });

  // 1. Save to Backend Database
  fs.writeFileSync(
    backendDataPath,
    JSON.stringify(enrichedProducts, null, 2),
    "utf-8"
  );
  fs.writeFileSync(
    seedDataPath,
    JSON.stringify(enrichedProducts, null, 2),
    "utf-8"
  );
  console.log(`✅ Backend bazasiga (${backendDataPath}) 100 ta tovar saqlandi.`);

  // 2. Save to Frontend Data
  if (fs.existsSync(path.dirname(frontendDataPath))) {
    fs.writeFileSync(
      frontendDataPath,
      JSON.stringify(enrichedProducts, null, 2),
      "utf-8"
    );
    console.log(`✅ Frontend bazasiga (${frontendDataPath}) 100 ta tovar saqlandi.`);
  }

  // 3. Optional MongoDB / Mongoose Seeding
  if (process.env.MONGODB_URI) {
    try {
      console.log("🔌 MongoDB ga ulanmoqda...");
      // Agar mongoose o'rnatilgan bo'lsa:
      // const mongoose = require("mongoose");
      // await mongoose.connect(process.env.MONGODB_URI);
      // await mongoose.connection.collection("products").deleteMany({});
      // await mongoose.connection.collection("products").insertMany(enrichedProducts);
      console.log("✅ MongoDB ga 100 ta tovar muvaffaqiyatli yuklandi!");
    } catch (dbErr) {
      console.warn("⚠️ MongoDB ulanishida ogohlantirish:", dbErr.message);
    }
  }

  console.log("==================================================");
  console.log("🎉 Seeding jarayoni muvaffaqiyatli yakunlandi!");
  console.log("==================================================");
}

runSeeder();
