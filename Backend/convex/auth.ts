import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Register user
export const register = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    password: v.string(),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (existing) {
      throw new Error("Bu telefon raqam bilan foydalanuvchi mavjud");
    }

    const role = args.role || "user";
    const userDoc = {
      name: args.name,
      phone: args.phone,
      passwordHash: args.password, // soddalashtirilgan demo hash
      role,
      avatar: (args.name || "OL").slice(0, 2).toUpperCase(),
      createdAt: Date.now(),
    };

    const id = await ctx.db.insert("users", userDoc);
    return {
      success: true,
      user: {
        id,
        name: args.name,
        phone: args.phone,
        role,
      },
      token: `convex_jwt_${id}_${Date.now()}`,
    };
  },
});

// Login
export const login = mutation({
  args: {
    phone: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Admin backdoors for demo testing:
    if (args.phone === "+998 90 999 99 99" || args.phone === "admin") {
      return {
        success: true,
        user: {
          id: "admin-master",
          name: "Bosh Admin",
          phone: "+998 90 999 99 99",
          role: "admin",
          avatar: "BA",
        },
        token: "admin_super_token_" + Date.now(),
      };
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("phone"), args.phone))
      .first();

    if (!user || user.passwordHash !== args.password) {
      throw new Error("Telefon raqami yoki parol noto'g'ri");
    }

    return {
      success: true,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
      },
      token: `convex_jwt_${user._id}_${Date.now()}`,
    };
  },
});
