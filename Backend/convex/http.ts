import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// GET /api/products
http.route({
  path: "/api/products",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") || undefined;
    const search = url.searchParams.get("q") || undefined;

    const products = await ctx.runQuery(api.products.getProducts, {
      category,
      search,
    });

    return new Response(JSON.stringify({ success: true, count: products.length, data: products }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }),
});

// POST /api/products
http.route({
  path: "/api/products",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    const result = await ctx.runMutation(api.products.createProduct, body);

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }),
});

export default http;
