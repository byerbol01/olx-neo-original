"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  ChevronRight,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  Check,
  X,
  ChevronLeft,
  Truck,
  Sparkles,
  Plus,
  RefreshCw,
  FolderOpen,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import TradeInBanner from "@/components/TradeInBanner";
import { getProducts } from "@/lib/api";

const REAL_CATEGORIES = [
  "Avto",
  "Ko'chmas mulk",
  "Elektronika",
  "Ish o'rinlari",
  "Xizmatlar",
  "Moda va stil",
  "Bolalar dunyosi",
  "Uy va bog'",
];

const MAIN_TABS = ["Barchasi", ...REAL_CATEGORIES];
const PAGE_SIZE = 10;

// Normalize category name mapping
const CAT_MAP = {
  avto: "Avto",
  re: "Ko'chmas mulk",
  "ko'chmas mulk": "Ko'chmas mulk",
  jobs: "Ish o'rinlari",
  "ish o'rinlari": "Ish o'rinlari",
  services: "Xizmatlar",
  xizmatlar: "Xizmatlar",
  fashion: "Moda va stil",
  "moda va stil": "Moda va stil",
  kids: "Bolalar dunyosi",
  "bolalar dunyosi": "Bolalar dunyosi",
  home: "Uy va bog'",
  "uy va bog'": "Uy va bog'",
  electronics: "Elektronika",
  elektronika: "Elektronika",
};

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const rawCat = searchParams.get("category") || searchParams.get("cat") || "Barchasi";
  const searchParamQuery = searchParams.get("q") || "";

  const initialCategory = CAT_MAP[rawCat?.toLowerCase()] || rawCat || "Barchasi";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("Barchasi");
  const [warrantyToggle, setWarrantyToggle] = useState(false);
  const [deliveryToggle, setDeliveryToggle] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Barchasi");
  const [sortBy, setSortBy] = useState("Eng ommabop");
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Sync category if URL parameter changes
  useEffect(() => {
    const fromUrl = searchParams.get("category") || searchParams.get("cat");
    if (fromUrl) {
      const normalized = CAT_MAP[fromUrl.toLowerCase()] || fromUrl;
      setSelectedCategory(normalized);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Load all products from Backend API
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const data = await getProducts();
        if (isMounted) {
          setAllProducts(data || []);
        }
      } catch (err) {
        console.error("Katalog mahsulotlarini yuklashda xatolik:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, minPrice, maxPrice, selectedRange, selectedCondition, selectedLocation, sortBy, searchParamQuery]);

  // Dynamic counts per category
  const categoryCounts = useMemo(() => {
    const counts = { Barchasi: allProducts.length };
    REAL_CATEGORIES.forEach((cat) => {
      counts[cat] = allProducts.filter((p) => p.category === cat).length;
    });
    return counts;
  }, [allProducts]);

  // Condition options and their dynamic counts
  const conditionOptions = useMemo(() => {
    const yangi = allProducts.filter((p) =>
      p.condition?.toLowerCase().includes("yangi")
    ).length;
    const alo = allProducts.filter(
      (p) =>
        p.condition?.toLowerCase().includes("a'lo") ||
        p.condition?.toLowerCase().includes("ideal")
    ).length;
    const ishl = allProducts.filter(
      (p) =>
        p.condition?.toLowerCase().includes("ishlatilgan") ||
        p.condition?.toLowerCase().includes("yaxshi")
    ).length;

    return [
      { name: "Barchasi", count: allProducts.length },
      { name: "Yangi (qadoqda)", count: yangi },
      { name: "Ishlatilgan (ideal)", count: alo },
      { name: "Ishlatilgan (yaxshi)", count: ishl },
    ];
  }, [allProducts]);

  const handleRangeClick = (range) => {
    if (selectedRange === range) {
      setSelectedRange("");
      setMinPrice("");
      setMaxPrice("");
      return;
    }
    setSelectedRange(range);
    if (range === "1M - 5M") {
      setMinPrice("1000000");
      setMaxPrice("5000000");
    } else if (range === "5M - 10M") {
      setMinPrice("5000000");
      setMaxPrice("10000000");
    } else if (range === "10M - 20M") {
      setMinPrice("10000000");
      setMaxPrice("20000000");
    } else if (range === "20M+") {
      setMinPrice("20000000");
      setMaxPrice("");
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory("Barchasi");
    setSelectedRange("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCondition("Barchasi");
    setSelectedLocation("Barchasi");
    setWarrantyToggle(false);
    setDeliveryToggle(false);
    setCurrentPage(1);
  };

  // Filter & Sort Engine
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Category
    if (selectedCategory !== "Barchasi") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Search Query (from URL)
    if (searchParamQuery.trim()) {
      const q = searchParamQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q) ||
          (typeof p.description === "string" && p.description.toLowerCase().includes(q))
      );
    }

    // 3. Price min / max
    const cleanMin = minPrice ? Number(String(minPrice).replace(/\s/g, "")) : null;
    const cleanMax = maxPrice ? Number(String(maxPrice).replace(/\s/g, "")) : null;
    if (cleanMin !== null && !isNaN(cleanMin)) {
      result = result.filter((p) => Number(p.price || 0) >= cleanMin);
    }
    if (cleanMax !== null && !isNaN(cleanMax)) {
      result = result.filter((p) => Number(p.price || 0) <= cleanMax);
    }

    // 4. Condition
    if (selectedCondition && selectedCondition !== "Barchasi") {
      if (selectedCondition.includes("Yangi")) {
        result = result.filter((p) => p.condition?.toLowerCase().includes("yangi"));
      } else if (selectedCondition.includes("ideal")) {
        result = result.filter(
          (p) =>
            p.condition?.toLowerCase().includes("a'lo") ||
            p.condition?.toLowerCase().includes("ideal")
        );
      } else if (selectedCondition.includes("yaxshi")) {
        result = result.filter(
          (p) =>
            p.condition?.toLowerCase().includes("ishlatilgan") ||
            p.condition?.toLowerCase().includes("yaxshi")
        );
      }
    }

    // 5. Location
    if (selectedLocation && selectedLocation !== "Barchasi") {
      result = result.filter((p) =>
        p.location?.toLowerCase().includes(selectedLocation.toLowerCase().split(" ")[0])
      );
    }

    // 6. Sort
    if (sortBy === "Arzonroq") {
      result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortBy === "Qimmatroq") {
      result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (sortBy === "Eng yangi") {
      result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else {
      // Eng ommabop
      result.sort((a, b) => (Number(b.views) || 0) - (Number(a.views) || 0));
    }

    return result;
  }, [allProducts, selectedCategory, searchParamQuery, minPrice, maxPrice, selectedCondition, selectedLocation, sortBy]);

  // Pagination calculation: exactly 10 products per page
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 120, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#002f34] transition-colors">
          Bosh sahifa
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#002f34]">Katalog</span>
        {selectedCategory !== "Barchasi" && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-bold text-[#008f87]">{selectedCategory}</span>
          </>
        )}
      </nav>

      {/* 2. CATEGORY SELECTOR TABS & ADD AD BUTTON */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
            {MAIN_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedCategory(tab)}
                className={`text-xs px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === tab
                    ? "bg-[#23e5db] text-[#002f34] shadow-xs"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                <span>{tab}</span>
                <span className="ml-1 text-[10px] opacity-70">
                  ({categoryCounts[tab] || 0})
                </span>
              </button>
            ))}
          </div>

          <Link
            href={`/create?category=${encodeURIComponent(selectedCategory === "Barchasi" ? "Avto" : selectedCategory)}`}
            className="flex items-center justify-center gap-1.5 bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-black text-xs px-4 py-2.5 rounded-xl shrink-0 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+{selectedCategory === "Barchasi" ? "E'lon berish" : `${selectedCategory}ga e'lon qo'shish`}</span>
          </Link>
        </div>
      </div>

      {/* 2. Header & Guarantee badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-gray-100">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#002f34] tracking-tight">
            {selectedCategory === "Barchasi" ? "Barcha e'lonlar" : `${selectedCategory} bo'yicha e'lonlar`}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Faol bozor
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Jami {filteredProducts.length} ta e&apos;lon (Sahifa {currentPage} / {totalPages})
            </span>
          </div>
        </div>

        {/* Right Safe deal guarantee badge */}
        <div className="flex items-center gap-3 bg-white border border-gray-200/80 rounded-2xl px-4 py-2.5 shadow-sm">
          <div className="w-9 h-9 rounded-full bg-[#23e5db]/20 text-[#008f87] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#008f87]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#002f34]">
              Xavfsiz xarid kafolati
            </div>
            <div className="text-[11px] text-gray-500">
              OLX Dostavka orqali tekshirib to&apos;lang
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter toggle button */}
      <div className="lg:hidden flex items-center justify-between gap-2">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-2.5 text-xs font-bold text-[#002f34] shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#23e5db]" />
          <span>Filtrlar ({filteredProducts.length})</span>
        </button>

        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === "grid" ? "bg-gray-100 text-[#002f34]" : "text-gray-400"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === "list" ? "bg-gray-100 text-[#002f34]" : "text-gray-400"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT SIDEBAR (FILTERS) ================= */}
        <aside
          className={`lg:col-span-4 xl:col-span-3 space-y-5 ${
            mobileFilterOpen
              ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto block"
              : "hidden lg:block"
          }`}
        >
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
              <h3 className="font-bold text-base text-[#002f34]">Filtrlar</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-sm space-y-6">
            {/* Header: Filtrlar & Tozalash */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#002f34]" />
                <h3 className="font-bold text-sm text-[#002f34]">Filtrlar</h3>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#008f87] hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Tozalash</span>
              </button>
            </div>

            {/* Rukn (Category list from real DB) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#002f34] block">
                Rukn (Kategoriya)
              </label>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("Barchasi")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                    selectedCategory === "Barchasi"
                      ? "bg-[#002f34] text-white font-bold"
                      : "hover:bg-[#f2f4f5] text-gray-700 font-medium"
                  }`}
                >
                  <span>Barcha ruknlar</span>
                  <span
                    className={`text-[11px] ${
                      selectedCategory === "Barchasi" ? "text-teal-200 font-bold" : "text-gray-400"
                    }`}
                  >
                    {allProducts.length}
                  </span>
                </button>

                {REAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#002f34] text-white font-bold"
                        : "hover:bg-[#f2f4f5] text-gray-700 font-medium"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[11px] ${
                        selectedCategory === cat ? "text-teal-200 font-bold" : "text-gray-400"
                      }`}
                    >
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Narxi (Price min-max + quick chips) */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-[#002f34] block">
                Narxi (so&apos;m)
              </label>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-gray-400 block mb-0.5">
                    Dan
                  </span>
                  <input
                    type="text"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="1 000 000"
                    className="w-full bg-[#f2f4f5] text-xs font-medium px-3 py-2 rounded-xl outline-none focus:bg-white focus:border focus:border-[#23e5db] text-[#002f34]"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block mb-0.5">
                    Gacha
                  </span>
                  <input
                    type="text"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="50 000 000"
                    className="w-full bg-[#f2f4f5] text-xs font-medium px-3 py-2 rounded-xl outline-none focus:bg-white focus:border focus:border-[#23e5db] text-[#002f34]"
                  />
                </div>
              </div>

              {/* Quick range pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["1M - 5M", "5M - 10M", "10M - 20M", "20M+"].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => handleRangeClick(range)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      selectedRange === range
                        ? "bg-[#23e5db]/25 border-[#23e5db] text-[#002f34] font-bold shadow-2xs"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Holati (Condition) */}
            <div className="space-y-2.5 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-[#002f34] block">
                Holati
              </label>
              <div className="space-y-2">
                {conditionOptions.map((cond) => {
                  const isSelected = selectedCondition === cond.name;
                  return (
                    <label
                      key={cond.name}
                      onClick={() => setSelectedCondition(cond.name)}
                      className="flex items-center justify-between text-xs cursor-pointer group select-none"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-[#002f34] bg-[#002f34]"
                              : "border-gray-300 group-hover:border-gray-400 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span className="text-gray-700 group-hover:text-black font-medium">
                          {cond.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        {cond.count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Toggle 1: Kafolat bor */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#002f34] block">
                  Kafolat bor
                </span>
                <span className="text-[10px] text-gray-400">
                  Kamida 1 oylik kafolat
                </span>
              </div>
              <button
                type="button"
                onClick={() => setWarrantyToggle(!warrantyToggle)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  warrantyToggle ? "bg-[#23e5db]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    warrantyToggle ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>

            {/* Toggle 2: Yetkazib berish mavjud */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#002f34] block">
                  Yetkazib berish mavjud
                </span>
                <span className="text-[10px] text-gray-400">
                  Kuryer orqali yetkazish
                </span>
              </div>
              <button
                type="button"
                onClick={() => setDeliveryToggle(!deliveryToggle)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  deliveryToggle ? "bg-[#23e5db]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    deliveryToggle ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>

            {/* Location selector */}
            <div className="pt-2 border-t border-gray-100 space-y-1.5">
              <label className="text-xs font-bold text-[#002f34] block">
                Joylashuv
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-[#f2f4f5] text-xs font-medium px-3 py-2 rounded-xl outline-none text-[#002f34]"
              >
                <option value="Barchasi">Barcha hududlar</option>
                <option value="Toshkent">Toshkent shahri</option>
                <option value="Samarqand">Samarqand viloyati</option>
                <option value="Farg'ona">Farg&apos;ona viloyati</option>
                <option value="Andijon">Andijon viloyati</option>
                <option value="Buxoro">Buxoro viloyati</option>
              </select>
            </div>

            {/* Apply button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-2xl bg-[#002f34] hover:bg-black active:scale-95 text-white font-bold text-xs shadow-sm transition-all"
            >
              Filtrlarni qo&apos;llash ({filteredProducts.length})
            </button>
          </div>
        </aside>

        {/* ================= RIGHT MAIN AREA ================= */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          {/* Active filter chips & Sort Row */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-gray-400 mr-1 hidden sm:inline">
                Tanlangan:
              </span>
              {selectedCategory !== "Barchasi" && (
                <span className="inline-flex items-center gap-1.5 bg-teal-50 text-[#008f87] text-xs font-bold px-2.5 py-1 rounded-lg border border-teal-200">
                  <span>{selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("Barchasi")}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedRange && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-[#002f34] text-xs font-semibold px-2.5 py-1 rounded-lg">
                  <span>{selectedRange}</span>
                  <button
                    onClick={() => {
                      setSelectedRange("");
                      setMinPrice("");
                      setMaxPrice("");
                    }}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(selectedCategory !== "Barchasi" || selectedRange || minPrice || maxPrice || selectedCondition !== "Barchasi") && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-red-500 hover:underline font-semibold ml-2"
                >
                  Barchasini tozalash
                </button>
              )}
            </div>

            {/* Sort & View toggles */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="hidden sm:inline">Saralash:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-bold text-[#002f34] outline-none cursor-pointer"
                >
                  <option value="Eng ommabop">Eng ommabop</option>
                  <option value="Eng yangi">Eng yangi</option>
                  <option value="Arzonroq">Narx: arzonroq</option>
                  <option value="Qimmatroq">Narx: qimmatroq</option>
                </select>
              </div>

              <div className="hidden sm:flex items-center gap-1 border-l border-gray-200 pl-3">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-100 text-[#002f34]"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                  aria-label="Grid ko'rinishi"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-100 text-[#002f34]"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                  aria-label="List ko'rinishi"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid of Products from Backend */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-[#008f87]" />
              <p className="text-xs font-semibold text-gray-500">
                {selectedCategory} e&apos;lonlari yuklanmoqda...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[#008f87] flex items-center justify-center">
                <FolderOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#002f34]">
                  {selectedCategory} bo&apos;limida hali e&apos;lonlar yo&apos;q
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Ushbu bo&apos;limga birinchi bo&apos;lib yangi e&apos;lon qo&apos;shishingiz mumkin!
                </p>
              </div>
              <Link
                href={`/create?category=${encodeURIComponent(selectedCategory === "Barchasi" ? "Avto" : selectedCategory)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-black text-xs shadow-xs transition-all"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Shu ruknga e&apos;lon qo&apos;shish</span>
              </Link>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
                  : "space-y-4"
              }
            >
              {paginatedProducts.map((prod) => (
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

          {/* Trade-In Banner */}
          <div className="pt-2">
            <TradeInBanner />
          </div>

          {/* Real Dynamic Pagination (10 products per page) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-6">
              {/* Previous page button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-all ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed text-gray-300"
                    : "hover:bg-gray-100 text-gray-700 shadow-2xs"
                }`}
                aria-label="Oldingi sahifa"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dynamic Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                // Show first, last, current, and adjacent pages
                if (
                  totalPages > 7 &&
                  pageNum !== 1 &&
                  pageNum !== totalPages &&
                  Math.abs(pageNum - currentPage) > 2
                ) {
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return (
                      <span key={`page-ellipsis-${pageNum}`} className="text-gray-400 px-1 text-xs">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#002f34] text-white shadow-sm scale-105"
                        : "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next page button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-all ${
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed text-gray-300"
                    : "hover:bg-gray-100 text-gray-700 shadow-2xs"
                }`}
                aria-label="Keyingi sahifa"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
