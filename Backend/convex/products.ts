import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get list of products with optional category and search filters
export const getProducts = query({
  args: {
    category: v.optional(v.string()),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let products = await ctx.db.query("products").order("desc").collect();

    if (args.category && args.category !== "Barchasi") {
      products = products.filter(
        (p) => p.category.toLowerCase() === args.category?.toLowerCase()
      );
    }

    if (args.search) {
      const q = args.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    return products;
  },
});

// Get a single product by ID or Slug
export const getProductById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .filter((q) => q.or(q.eq(q.field("id"), args.id), q.eq(q.field("slug"), args.id)))
      .first();
    return product;
  },
});

// Create / Add new product
export const createProduct = mutation({
  args: {
    title: v.string(),
    price: v.number(),
    category: v.string(),
    location: v.string(),
    description: v.string(),
    images: v.array(v.string()),
    negotiable: v.optional(v.boolean()),
    condition: v.optional(v.string()),
    sellerName: v.optional(v.string()),
    sellerPhone: v.optional(v.string()),
    badge: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = "prod-" + Date.now();
    const slug = args.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProd = {
      id,
      slug: slug || id,
      title: args.title,
      subTitle: args.title,
      price: args.price,
      priceFormatted: `${Number(args.price).toLocaleString("ru-RU").replace(/,/g, " ")} so'm`,
      priceUsd: `Taqriban $${Math.round(args.price / 12700)} USD`,
      category: args.category || "Boshqa",
      location: args.location || "Toshkent shahri",
      date: "Bugun " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      badge: args.badge || "YANGI",
      negotiable: args.negotiable ?? true,
      condition: args.condition || "Yangi",
      views: 1,
      favorites: 0,
      images: args.images.length > 0 ? args.images : [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
      ],
      specs: [
        { label: "Holati", value: args.condition || "Yangi" },
        { label: "Kategoriya", value: args.category || "Umumiy" },
        { label: "Joylashuv", value: args.location || "Toshkent" },
      ],
      description: args.description,
      seller: {
        name: args.sellerName || "Foydalanuvchi",
        phone: args.sellerPhone || "+998 90 123 45 67",
        avatar: (args.sellerName || "FO").slice(0, 2).toUpperCase(),
        verified: true,
        rating: 5.0,
        deals: "1 ta yangi e'lon",
      },
      createdAt: Date.now(),
    };

    const docId = await ctx.db.insert("products", newProd);
    return { ...newProd, _id: docId };
  },
});

// Update product (Admin or Owner)
export const updateProduct = mutation({
  args: {
    id: v.string(),
    title: v.optional(v.string()),
    price: v.optional(v.number()),
    category: v.optional(v.string()),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
    badge: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    if (!existing) {
      throw new Error("Mahsulot topilmadi");
    }

    const updates: Record<string, any> = {};
    if (args.title) {
      updates.title = args.title;
      updates.subTitle = args.title;
    }
    if (args.price !== undefined) {
      updates.price = args.price;
      updates.priceFormatted = `${Number(args.price).toLocaleString("ru-RU").replace(/,/g, " ")} so'm`;
      updates.priceUsd = `Taqriban $${Math.round(args.price / 12700)} USD`;
    }
    if (args.category) updates.category = args.category;
    if (args.location) updates.location = args.location;
    if (args.description) updates.description = args.description;
    if (args.images) updates.images = args.images;
    if (args.badge !== undefined) updates.badge = args.badge;

    await ctx.db.patch(existing._id, updates);
    return { success: true, id: args.id };
  },
});

// Delete product (Admin)
export const deleteProduct = mutation({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();

    if (!existing) {
      throw new Error("Mahsulot topilmadi");
    }

    await ctx.db.delete(existing._id);
    return { success: true, message: "Mahsulot o'chirildi" };
  },
});
