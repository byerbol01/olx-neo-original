"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, RefreshCw } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

export default function HomeLatestFeed({ initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);
  const [latestFilter, setLatestFilter] = useState("Barchasi");
  const [visibleCount, setVisibleCount] = useState(12);

  const filterTabs = [
    "Barchasi",
    "Avto",
    "Ko'chmas mulk",
    "Elektronika",
    "Moda va stil",
    "Uy va bog'",
    "Xizmatlar",
  ];

  // Load products from Backend API on mount
  useEffect(() => {
    async function loadBackendProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Backend ulanishida xatolik:", err);
      } finally {
        setLoading(false);
      }
    }

    loadBackendProducts();
  }, []);

  const filtered =
    latestFilter === "Barchasi"
      ? products
      : products.filter((p) => {
          if (latestFilter === "Avto")
            return p.category === "Avto" || p.category === "Transport";
          return p.category === latestFilter;
        });

  const displayedProducts = filtered.slice(0, visibleCount);

  const handleLoadMore = () => {
    if (visibleCount < filtered.length) {
      setVisibleCount((prev) => prev + 8);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#002f34] tracking-tight">
              Yangi E&apos;lonlar
            </h2>
            <span className="bg-[#23e5db]/20 text-[#008f87] text-xs font-bold px-2 py-0.5 rounded-full">
              Backend Ulandi ({products.length} ta)
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            O&apos;zbekiston bo&apos;ylab oxirgi soatlar ichida qo&apos;shilgan takliflar
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {filterTabs.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => {
                setLatestFilter(pill);
                setVisibleCount(12);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
                latestFilter === pill
                  ? "bg-[#23e5db] text-[#002f34] shadow-xs"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Loading indicator */}
      {loading && products.length === 0 ? (
        <div className="py-12 flex flex-col items-center justify-center text-gray-400 gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-[#008f87]" />
          <p className="text-sm font-medium">Backend ma&apos;lumotlari yuklanmoqda...</p>
        </div>
      ) : (
        /* Grid of Products */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((prod) => (
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

      {/* Load more button */}
      {visibleCount < filtered.length ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-xs sm:text-sm font-bold text-[#002f34] hover:border-gray-300 hover:shadow-md transition-all active:scale-95"
          >
            <span>Ko&apos;proq e&apos;lonlarni ko&apos;rish</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="mt-8 flex justify-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 text-xs sm:text-sm font-bold text-[#002f34] hover:border-gray-300 hover:shadow-md transition-all active:scale-95"
          >
            <span>Barcha e&apos;lonlarni ko&apos;rish</span>
            <ChevronDown className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
