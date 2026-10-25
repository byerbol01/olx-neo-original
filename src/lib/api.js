// src/lib/api.js
// Client API layer connecting OLX Neo frontend to Desktop Backend (Node/Express/Convex)
import SEED_FALLBACK from "@/data/backendProducts.json";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

// Fetch all products with filter support
export async function getProducts(params = {}) {
  try {
    const searchParams = new URLSearchParams();
    if (params.category && params.category !== "Barchasi") {
      searchParams.append("category", params.category);
    }
    if (params.q) searchParams.append("q", params.q);
    if (params.minPrice) searchParams.append("minPrice", params.minPrice);
    if (params.maxPrice) searchParams.append("maxPrice", params.maxPrice);

    const queryStr = searchParams.toString();
    const url = `${API_BASE_URL}/products${queryStr ? `?${queryStr}` : ""}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Backend response error");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn("Could not reach Backend API, using cached products:", err.message);
    let list = Array.isArray(SEED_FALLBACK) ? SEED_FALLBACK : [];
    if (params.category && params.category !== "Barchasi") {
      list = list.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase().includes(params.category.toLowerCase())
      );
    }
    if (params.q) {
      const q = params.q.toLowerCase();
      list = list.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (typeof p.location === "string" && p.location.toLowerCase().includes(q))
      );
    }
    return list;
  }
}

// Fetch single product by ID or Slug
export async function getProductById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Mahsulot topilmadi");
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn("Error fetching product by ID from backend:", err.message);
    const found = SEED_FALLBACK.find(
      (p) => String(p.id) === String(id) || p.slug === String(id)
    );
    return found || SEED_FALLBACK[0];
  }
}

// Create new product
export async function createProduct(productData) {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Mahsulot qo'shishda xatolik");
    return json;
  } catch (err) {
    console.error("Create product failed:", err);
    throw err;
  }
}

// Upload image file to backend
export async function uploadImageFile(file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Rasm yuklashda xatolik");
    return json.url;
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
}

// Delete product (Admin)
export async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "O'chirishda xatolik");
    return json;
  } catch (err) {
    console.error("Delete error:", err);
    throw err;
  }
}

// Update product (Admin)
export async function updateProduct(id, updateData) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Tahrirlashda xatolik");
    return json;
  } catch (err) {
    console.error("Update error:", err);
    throw err;
  }
}

// Admin stats
export async function getAdminStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, { cache: "no-store" });
    const json = await res.json();
    return json.stats || null;
  } catch (err) {
    console.error("Stats error:", err);
    return null;
  }
}

// Admin users
export async function getAdminUsers() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/users`, { cache: "no-store" });
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Users error:", err);
    return [];
  }
}

// Auth Login
export async function apiLogin(phone, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Kirishda xatolik");
  return json;
}

// Auth Register
export async function apiRegister(name, phone, password) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, password }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Ro'yxatdan o'tishda xatolik");
  return json;
}

// OAuth Login (Google, VK, Facebook)
export async function apiOAuthLogin({ provider, email, name, avatar, providerId }) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/oauth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, email, name, avatar, providerId }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || `${provider} orqali kirishda xatolik`);
    return json;
  } catch (err) {
    console.warn("Backend OAuth fallback:", err.message);
    // Offline / fallback mock user
    const fallbackUser = {
      id: "usr-" + Date.now(),
      name: name || "Google Foydalanuvchisi",
      email: email || `${provider}_user@gmail.com`,
      phone: "+998 90 123 45 67",
      role: "user",
      avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      avatarUrl: avatar,
      walletBalance: 150000,
      isVerified: true,
      provider: provider || "google",
    };
    return {
      success: true,
      user: fallbackUser,
      token: `oauth_${provider}_jwt_${fallbackUser.id}`,
    };
  }
}

// ================= MESSAGES API =================
export async function getBackendMessages() {
  try {
    const res = await fetch(`${API_BASE_URL}/messages`, { cache: "no-store" });
    if (!res.ok) throw new Error("Xabarlarni yuklab bo'lmadi");
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn("getBackendMessages fallback:", err.message);
    return [];
  }
}

export async function sendBackendMessage(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn("sendBackendMessage fallback:", err.message);
    return { success: false, error: err.message };
  }
}
