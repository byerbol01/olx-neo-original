const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Uploads directory
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// Products JSON file storage
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const productsFile = path.join(dataDir, "products.json");
const seedFile = path.join(dataDir, "seedProducts.json");

// Ensure products data exists
function getProducts() {
  if (!fs.existsSync(productsFile)) {
    if (fs.existsSync(seedFile)) {
      const seedData = fs.readFileSync(seedFile, "utf-8");
      fs.writeFileSync(productsFile, seedData, "utf-8");
      return JSON.parse(seedData);
    }
    fs.writeFileSync(productsFile, "[]", "utf-8");
    return [];
  }
  try {
    const data = fs.readFileSync(productsFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading products:", err);
    return [];
  }
}

function saveProducts(products) {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), "utf-8");
}

// Multer storage for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || ".jpg";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "img-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage: storage });

// ======================== API ROUTES ========================

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "OLX Neo Backend & API is running!",
    endpoints: {
      products: "/api/products",
      singleProduct: "/api/products/:id",
      upload: "POST /api/upload",
      auth: "/api/auth/login, /api/auth/register",
      admin: "/api/admin/stats, /api/admin/products",
    },
  });
});

// 1. GET ALL PRODUCTS (with search, category, filter)
app.get("/api/products", (req, res) => {
  try {
    let products = getProducts();
    const { q, category, minPrice, maxPrice } = req.query;

    if (category && category !== "Barchasi") {
      products = products.filter(
        (p) => p.category && p.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (q) {
      const search = q.toLowerCase();
      products = products.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(search)) ||
          (p.location && p.location.toLowerCase().includes(search)) ||
          (p.description && p.description.toLowerCase().includes(search)) ||
          (p.category && p.category.toLowerCase().includes(search))
      );
    }

    if (minPrice) {
      products = products.filter((p) => Number(p.price) >= Number(minPrice));
    }

    if (maxPrice) {
      products = products.filter((p) => Number(p.price) <= Number(maxPrice));
    }

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. GET SINGLE PRODUCT (by ID or Slug)
app.get("/api/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    const products = getProducts();
    const product = products.find(
      (p) => String(p.id) === String(id) || p.slug === String(id)
    );

    if (!product) {
      return res.status(404).json({ success: false, error: "Mahsulot topilmadi" });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. POST NEW PRODUCT (Create with images)
app.post("/api/products", (req, res) => {
  try {
    const body = req.body;
    if (!body.title || !body.price) {
      return res
        .status(400)
        .json({ success: false, error: "Sarlavha va narx majburiy!" });
    }

    const products = getProducts();
    const newId = String(Date.now());
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProduct = {
      id: newId,
      slug: slug || newId,
      title: body.title,
      subTitle: body.subTitle || body.title,
      price: Number(body.price) || 0,
      priceFormatted: `${Number(body.price || 0).toLocaleString("ru-RU").replace(/,/g, " ")} so'm`,
      priceUsd: `Taqriban $${Math.round((Number(body.price) || 0) / 12700)} USD`,
      category: body.category || "Elektronika",
      location: body.location || "Toshkent shahri",
      date: "Bugun " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      badge: body.badge || "YANGI",
      negotiable: body.negotiable ?? true,
      condition: body.condition || "Yangi",
      views: 1,
      favorites: 0,
      images: Array.isArray(body.images) && body.images.length > 0
        ? body.images
        : [
            body.image ||
              "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
          ],
      specs: body.specs || [
        { label: "Holati", value: body.condition || "Yangi" },
        { label: "Kategoriya", value: body.category || "Umumiy" },
        { label: "Joylashuv", value: body.location || "Toshkent shahri" },
      ],
      description: body.description || "Mahsulot bo'yicha batafsil ma'lumot berilmagan.",
      seller: body.seller || {
        name: body.sellerName || "Anvar N.",
        phone: body.sellerPhone || body.phoneNumber || "+998 90 123 45 67",
        avatar: (body.sellerName || "AN").slice(0, 2).toUpperCase(),
        verified: true,
        rating: 5.0,
        deals: "1 ta e'lon",
      },
      createdAt: Date.now(),
    };

    products.unshift(newProduct);
    saveProducts(products);

    res.status(201).json({
      success: true,
      message: "Mahsulot muvaffaqiyatli qo'shildi",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. IMAGE UPLOAD (Multipart file or Base64)
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    if (req.file) {
      const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
      return res.json({
        success: true,
        url: imageUrl,
        filename: req.file.filename,
      });
    }

    // Agar base64 yuborilgan bo'lsa
    if (req.body && req.body.base64) {
      const matches = req.body.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const ext = matches[1].split("/")[1] || "png";
        const buffer = Buffer.from(matches[2], "base64");
        const filename = "img-" + Date.now() + "." + ext;
        const filePath = path.join(uploadsDir, filename);
        fs.writeFileSync(filePath, buffer);
        const imageUrl = `http://localhost:${PORT}/uploads/${filename}`;
        return res.json({ success: true, url: imageUrl });
      }
    }

    return res
      .status(400)
      .json({ success: false, error: "Rasm yuklanmadi yoki noto'g'ri format" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. UPDATE PRODUCT (PUT /api/products/:id)
app.put("/api/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    const products = getProducts();
    const index = products.findIndex((p) => String(p.id) === String(id));

    if (index === -1) {
      return res.status(404).json({ success: false, error: "Mahsulot topilmadi" });
    }

    const updated = { ...products[index], ...req.body };
    if (req.body.price) {
      updated.price = Number(req.body.price);
      updated.priceFormatted = `${Number(req.body.price).toLocaleString("ru-RU").replace(/,/g, " ")} so'm`;
    }

    products[index] = updated;
    saveProducts(products);

    res.json({ success: true, message: "Yangilandi", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. DELETE PRODUCT (DELETE /api/products/:id)
app.delete("/api/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    let products = getProducts();
    const beforeCount = products.length;
    products = products.filter((p) => String(p.id) !== String(id));

    if (products.length === beforeCount) {
      return res.status(404).json({ success: false, error: "Mahsulot topilmadi" });
    }

    saveProducts(products);
    res.json({ success: true, message: "Mahsulot o'chirildi" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. AUTH ROUTES (Register, Login, Me)
const usersFile = path.join(dataDir, "users.json");
function getUsers() {
  if (!fs.existsSync(usersFile)) {
    const defaultUsers = [
      {
        id: "usr-admin",
        name: "Bosh Admin",
        phone: "+998 90 999 99 99",
        password: "admin",
        role: "admin",
        avatar: "BA",
        walletBalance: 1500000,
      },
      {
        id: "usr-1",
        name: "Sardor Alimov",
        phone: "+998 90 123 45 67",
        password: "1234",
        role: "user",
        avatar: "SA",
        walletBalance: 350000,
      },
    ];
    fs.writeFileSync(usersFile, JSON.stringify(defaultUsers, null, 2), "utf-8");
    return defaultUsers;
  }
  return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
}

app.post("/api/auth/register", (req, res) => {
  try {
    const { name, phone, password, role } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, error: "Telefon raqami kiritilishi shart" });
    }

    const users = getUsers();
    const existing = users.find((u) => u.phone === phone);
    if (existing) {
      return res.status(400).json({ success: false, error: "Bu telefon raqam allaqachon ro'yxatdan o'tgan" });
    }

    const newUser = {
      id: "usr-" + Date.now(),
      name: name || "Foydalanuvchi",
      phone,
      password: password || "1234",
      role: role || (phone === "+998 90 999 99 99" ? "admin" : "user"),
      avatar: (name || "FO").slice(0, 2).toUpperCase(),
      walletBalance: 100000,
      createdAt: Date.now(),
    };

    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf-8");

    res.status(201).json({
      success: true,
      message: "Muvaffaqiyatli ro'yxatdan o'tildi",
      user: {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        role: newUser.role,
        avatar: newUser.avatar,
        walletBalance: newUser.walletBalance,
      },
      token: "jwt_token_" + newUser.id,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/auth/login", (req, res) => {
  try {
    const { phone, password } = req.body;
    const users = getUsers();

    // Maxsus admin login
    if (phone === "admin" || phone === "+998 90 999 99 99") {
      const adminUser = users.find((u) => u.role === "admin") || {
        id: "usr-admin",
        name: "Bosh Admin",
        phone: "+998 90 999 99 99",
        role: "admin",
        avatar: "BA",
        walletBalance: 1500000,
      };
      return res.json({
        success: true,
        message: "Admin sifatida muvaffaqiyatli kirdingiz",
        user: adminUser,
        token: "admin_token_" + adminUser.id,
      });
    }

    const user = users.find((u) => u.phone === phone);
    if (!user) {
      return res.status(401).json({ success: false, error: "Foydalanuvchi topilmadi" });
    }

    if (password && user.password && user.password !== password) {
      return res.status(401).json({ success: false, error: "Parol noto'g'ri" });
    }

    res.json({
      success: true,
      message: "Kirish muvaffaqiyatli",
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        walletBalance: user.walletBalance,
      },
      token: "jwt_token_" + user.id,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7.1 OAUTH LOGIN & REGISTRATION (Google, VK, Facebook)
app.post("/api/auth/oauth", (req, res) => {
  try {
    const { provider = "google", email, name, avatar, providerId } = req.body;
    if (!email && !name) {
      return res.status(400).json({
        success: false,
        error: "OAuth foydalanuvchi ma'lumotlari yetarli emas",
      });
    }

    const users = getUsers();
    let user = users.find(
      (u) =>
        (email && u.email && u.email.toLowerCase() === email.toLowerCase()) ||
        (providerId && u.providerId === providerId) ||
        (u.oauthProvider === provider && email && u.phone === email)
    );

    if (!user) {
      const cleanName = name || (email ? email.split("@")[0] : "OAuth Foydalanuvchi");
      const initials =
        cleanName
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase() || "US";

      user = {
        id: "usr-" + Date.now(),
        name: cleanName,
        email: email || `${provider}_${Date.now()}@example.com`,
        phone: req.body.phone || `+998 90 ${Math.floor(1000000 + Math.random() * 9000000)}`,
        password: "oauth_authenticated",
        role: "user",
        avatar: avatar || initials,
        avatarUrl: avatar || null,
        oauthProvider: provider,
        providerId: providerId || "oauth_" + Date.now(),
        walletBalance: 150000,
        isVerified: true,
        createdAt: Date.now(),
      };
      users.push(user);
      fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf-8");
    } else {
      if (avatar && !user.avatarUrl) user.avatarUrl = avatar;
      if (name && !user.name) user.name = name;
      user.lastLogin = Date.now();
      fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf-8");
    }

    res.json({
      success: true,
      message: `${provider.toUpperCase()} orqali tizimga muvaffaqiyatli kirildi`,
      provider,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatarUrl || user.avatar,
        avatarUrl: user.avatarUrl || null,
        walletBalance: user.walletBalance,
        isVerified: true,
        provider,
      },
      token: `oauth_${provider}_jwt_${user.id}`,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. ADMIN STATS & MANAGEMENT
app.get("/api/admin/stats", (req, res) => {
  try {
    const products = getProducts();
    const users = getUsers();

    const totalValue = products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
    const categoriesCount = {};
    products.forEach((p) => {
      const cat = p.category || "Boshqa";
      categoriesCount[cat] = (categoriesCount[cat] || 0) + 1;
    });

    res.json({
      success: true,
      stats: {
        totalProducts: products.length,
        totalUsers: users.length,
        totalValueUZS: totalValue,
        totalValueFormatted: `${totalValue.toLocaleString("ru-RU").replace(/,/g, " ")} so'm`,
        categoriesCount,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/admin/users", (req, res) => {
  try {
    const users = getUsers().map(({ password, ...u }) => u);
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server with safe error handling
const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 OLX NEO Backend is running on http://localhost:${PORT}`);
  console.log(`📡 Products API: http://localhost:${PORT}/api/products`);
  console.log(`👤 Auth API:     http://localhost:${PORT}/api/auth/login`);
  console.log(`⚙️ Admin API:    http://localhost:${PORT}/api/admin/stats`);
  console.log(`===============================================`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n❌ XATOLIK: ${PORT}-port allaqachon band!`);
    console.error(`Yechim: Avval ochilgan terminaldagi serverni Ctrl+C bilan to'xtating yoki Task Managerdan node.exe ni yoping.\n`);
  } else {
    console.error("Server xatosi:", err);
  }
});
