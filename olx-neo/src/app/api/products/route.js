import { NextResponse } from "next/server";
import { CATALOG_LAPTOPS, VIP_PRODUCTS, LATEST_PRODUCTS } from "@/data/mockData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  let allProducts = [...VIP_PRODUCTS, ...CATALOG_LAPTOPS, ...LATEST_PRODUCTS];

  // Remove duplicates by ID
  const uniqueProducts = Array.from(
    new Map(allProducts.map((p) => [p.id, p])).values()
  );

  let filtered = uniqueProducts;

  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        (p.brand && p.brand.toLowerCase().includes(query)) ||
        (p.location && p.location.toLowerCase().includes(query))
    );
  }

  if (category) {
    filtered = filtered.filter(
      (p) => p.category?.toLowerCase() === category.toLowerCase()
    );
  }

  if (brand) {
    filtered = filtered.filter(
      (p) => p.brand?.toLowerCase() === brand.toLowerCase()
    );
  }

  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newProduct = {
      id: "prod-" + Date.now(),
      title: body.title,
      price: Number(body.price) || 0,
      priceFormatted: `${Number(body.price || 0).toLocaleString()} so'm`,
      location: body.location || "Toshkent shahri",
      date: "Hozirgina",
      badge: "YANGI",
      image:
        body.image ||
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      category: body.category || "Elektronika",
    };

    return NextResponse.json(
      { success: true, message: "E'lon qabul qilindi", data: newProduct },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Noto'g'ri ma'lumotlar" },
      { status: 400 }
    );
  }
}
