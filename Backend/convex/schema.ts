import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    id: v.string(),
    slug: v.string(),
    title: v.string(),
    subTitle: v.optional(v.string()),
    price: v.number(),
    priceFormatted: v.string(),
    priceUsd: v.optional(v.string()),
    category: v.string(),
    location: v.string(),
    date: v.string(),
    badge: v.optional(v.string()),
    negotiable: v.boolean(),
    condition: v.optional(v.string()),
    views: v.number(),
    favorites: v.number(),
    images: v.array(v.string()),
    specs: v.optional(
      v.array(
        v.object({
          label: v.string(),
          value: v.string(),
        })
      )
    ),
    description: v.string(),
    seller: v.object({
      name: v.string(),
      phone: v.string(),
      avatar: v.string(),
      verified: v.boolean(),
      rating: v.number(),
      deals: v.string(),
    }),
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_createdAt", ["createdAt"]),

  users: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    passwordHash: v.string(),
    role: v.string(), // "admin" or "user"
    avatar: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_phone", ["phone"]),
});
