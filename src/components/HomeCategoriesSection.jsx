"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Car,
  Building2,
  Laptop,
  Briefcase,
  Wrench,
  Shirt,
  Baby,
  Armchair,
  ArrowRight,
  Plus,
  Sparkles,
  RefreshCw,
  FolderOpen,
  Search,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export const CATEGORIES_LIST = [
  { name: "Avto", icon: Car, count: "128 ming", color: "text-blue-600", bg: "hover:bg-blue-50" },
  { name: "Ko'chmas mulk", icon: Building2, count: "84 ming", color: "text-emerald-600", bg: "hover:bg-emerald-50" },
  { name: "Elektronika", icon: Laptop, count: "342 ming", color: "text-purple-600", bg: "hover:bg-purple-50" },
  { name: "Ish o'rinlari", icon: Briefcase, count: "42 ming", color: "text-amber-600", bg: "hover:bg-amber-50" },
  { name: "Xizmatlar", icon: Wrench, count: "65 ming", color: "text-teal-600", bg: "hover:bg-teal-50" },
  { name: "Moda va stil", icon: Shirt, count: "95 ming", color: "text-pink-600", bg: "hover:bg-pink-50" },
  { name: "Bolalar dunyosi", icon: Baby, count: "38 ming", color: "text-cyan-600", bg: "hover:bg-cyan-50" },
  { name: "Uy va bog'", icon: Armchair, count: "78 ming", color: "text-orange-600", bg: "hover:bg-orange-50" },
];

export default function HomeCategoriesSection() {
  const [activeCategory, setActiveCategory] = useState("Avto");
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCategorySearch("");
  }, [activeCategory]);

  useEffect(() => {
    let isMounted = true;
    async function loadCategoryData() {
      try {
        setLoading(true);
        const data = await getProducts({ category: activeCategory });
        if (isMounted) {
          setCategoryProducts(data || []);
        }
      } catch (err) {
        console.error("Kategoriya mahsulotlarini yuklashda xatolik:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCategoryData();
    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  return (
    <div className="space-y-6">
      {/* 1. Header with title & full catalog link */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#002f34] tracking-tight">
            Barcha ruknlar
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Kerakli bo&apos;limni tanlang va saralangan takliflarni ko&apos;ring
          </p>
        </div>

        <Link
          href={`/catalog?category=${encodeURIComponent(activeCategory)}`}
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#008f87] hover:underline"
        >
          <span>Barcha 12 ta rukn</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 2. 8 Categories Icons Grid (Screenshot dagi kabi) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {CATEGORIES_LIST.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.name;

          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => setActiveCategory(cat.name)}
              className={`group flex flex-col items-center p-4 rounded-2xl border transition-all text-center relative ${
                isActive
                  ? "bg-[#23e5db]/15 border-[#008f87] shadow-md ring-2 ring-[#23e5db]/40 scale-[1.02]"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
              }`}
            >
              {isActive && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#008f87] rounded-full border-2 border-white shadow-xs"></span>
              )}

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors mb-2.5 ${
                  isActive
                    ? "bg-[#002f34] text-[#23e5db]"
                    : "bg-[#f2f4f5] group-hover:bg-[#23e5db]/20 text-[#002f34] group-hover:text-[#008f87]"
                }`}
              >
                <Icon className="w-6 h-6 stroke-[1.75]" />
              </div>

              <span
                className={`text-xs font-bold transition-colors line-clamp-1 ${
                  isActive
                    ? "text-[#002f34]"
                    : "text-[#002f34] group-hover:text-[#008f87]"
                }`}
              >
                {cat.name}
              </span>

              <span className="text-[10px] text-gray-400 mt-0.5">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Selected Category Dynamic Sub-section */}
      <div className="bg-gradient-to-br from-teal-50/60 via-white to-gray-50/60 rounded-3xl border border-teal-100/80 p-5 sm:p-7 shadow-xs space-y-6">
        {/* Banner with Active Category Name and Add Product Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-100/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#002f34] text-[#23e5db] flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-[#002f34]">
                  {activeCategory} bo&apos;limi takliflari
                </h3>
                <span className="bg-[#23e5db] text-[#002f34] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  {categoryProducts.length} ta e&apos;lon
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Ushbu bo&apos;lim bo&apos;yicha yangi va dolzarb takliflar
              </p>
            </div>
          </div>

          {/* SEARCH BAR IN THIS CATEGORY INSTEAD OF POST AD BUTTON */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder={`${activeCategory} bo'yicha qidirish...`}
                className="w-full bg-white text-[#002f34] placeholder-gray-400 text-xs pl-9 pr-7 py-2.5 rounded-2xl border border-gray-200 focus:border-[#23e5db] focus:ring-2 focus:ring-[#23e5db]/20 outline-none transition-all shadow-xs font-medium"
              />
              {categorySearch && (
                <button
                  type="button"
                  onClick={() => setCategorySearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <Link
              href={`/catalog?category=${encodeURIComponent(activeCategory)}${
                categorySearch ? `&q=${encodeURIComponent(categorySearch)}` : ""
              }`}
              className="flex items-center gap-1.5 bg-[#002f34] hover:bg-[#001f22] text-[#23e5db] text-xs font-bold px-3.5 py-2.5 rounded-2xl transition-all shadow-xs shrink-0"
            >
              <span>Katalogda ko&apos;rish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-gray-400 gap-3">
            <RefreshCw className="w-7 h-7 animate-spin text-[#008f87]" />
            <p className="text-xs font-semibold text-gray-500">
              {activeCategory} bo&apos;yicha e&apos;lonlar yuklanmoqda...
            </p>
          </div>
        ) : categoryProducts.filter((p) => {
            if (!categorySearch.trim()) return true;
            return (
              p.title?.toLowerCase().includes(categorySearch.toLowerCase()) ||
              p.location?.toLowerCase().includes(categorySearch.toLowerCase())
            );
          }).length === 0 ? (
          /* Empty state */
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
              <FolderOpen className="w-7 h-7" />
            </div>
            <div>
              <p className="font-bold text-sm text-[#002f34]">
                {categorySearch
                  ? `"${categorySearch}" bo'yicha e'lon topilmadi`
                  : `Hozircha ${activeCategory} bo'limida e'lonlar yo'q`}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {categorySearch
                  ? "Boshqa so'z bilan qidirib ko'ring yoki barcha e'lonlarni ko'ring"
                  : "Birinchi bo'lib ushbu bo'limga e'lon joylashtiring!"}
              </p>
            </div>
          </div>
        ) : (
          /* Products Grid for Active Category */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categoryProducts
              .filter((p) => {
                if (!categorySearch.trim()) return true;
                return (
                  p.title?.toLowerCase().includes(categorySearch.toLowerCase()) ||
                  p.location?.toLowerCase().includes(categorySearch.toLowerCase())
                );
              })
              .map((prod) => (
              <ProductCard
                key={prod.id}
                id={prod.id}
                title={prod.title}
                price={prod.price}
                priceFormatted={prod.priceFormatted}
                location={prod.location}
                date={prod.date}
                badge={prod.badge}
                image={
                  prod.images && prod.images.length > 0
                    ? prod.images[0]
                    : prod.image
                }
                href={`/product/${prod.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
