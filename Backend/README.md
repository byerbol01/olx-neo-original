# OLX Neo — Backend va Convex API

Ushbu backend **OLX Neo** zamonaviy e'lonlar maydonchasi uchun maxsus yaratilgan.

## 🚀 Xususiyatlari:
1. **Convex integratsiyasi:**
   - `convex/schema.ts` — Products va Users ma'lumotlar bazasi sxemasi.
   - `convex/products.ts` — Mahsulotlarni olish, yaratish, o'chirish va yangilash mutation va querylari.
   - `convex/auth.ts` — Foydalanuvchi va Admin autentifikatsiyasi.
   - `convex/http.ts` — Convex HTTP Router API endpoints.

2. **Express & REST API:**
   - 10 ta realistik O'zbekiston bozoriga oid mahsulotlar (MacBook, iPhone 15 Pro, Cobalt, Gentra, Chilonzordagi kvartira, PS5 Slim, Dyson va h.k.).
   - Rasm yuklash (Multer orqali `/uploads` papkasiga yuklanadi va URL qaytariladi).
   - CRUD amallari (qo'shish, ko'rish, o'chirish, tahrirlash).
   - Admin statistikasi va foydalanuvchilar boshqaruvi.

## 🛠 Ishga tushirish:
```bash
# Backend papkasiga kiring:
cd Backend

# Bog'liqliklarni o'rnatish:
npm install

# Backend serverni ishga tushirish:
node server.js
# yoki:
npm start
```
Server `http://localhost:5000` da ishga tushadi.

## 📡 API Yo'llari:
- `GET /api/products` — Barcha mahsulotlar ro'yxati (kategoriya va qidiruv bilan).
- `GET /api/products/:id` — Bitta mahsulot tafsilotlari (Single Page).
- `POST /api/products` — Yangi mahsulot qo'shish.
- `POST /api/upload` — Kompyuterdan rasm yuklash.
- `DELETE /api/products/:id` — Mahsulotni o'chirish (Admin).
- `POST /api/auth/login` — Kirish (Admin uchun: `+998 90 999 99 99` yoki `admin`).
- `POST /api/auth/register` — Ro'yxatdan o'tish.
- `GET /api/admin/stats` — Admin panel statistikasi.
- `GET /api/admin/users` — Ro'yxatdan o'tgan foydalanuvchilar.
