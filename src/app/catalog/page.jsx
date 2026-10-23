"use client";

import React, { useState, useEffect } from "react";
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

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const rawCat = searchParams.get("category") || searchParams.get("cat") || "Barchasi";
  const searchParamQuery = searchParams.get("q") || "";

  // Normalize category name
  const catMap = {
    avto: "Avto",
    re: "Ko'chmas mulk",
    jobs: "Ish o'rinlari",
    services: "Xizmatlar",
    fashion: "Moda va stil",
    kids: "Bolalar dunyosi",
    home: "Uy va bog'",
    electronics: "Elektronika",
  };
  const initialCategory = catMap[rawCat?.toLowerCase()] || rawCat || "Barchasi";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState(["Barchasi"]);
  const [warrantyToggle, setWarrantyToggle] = useState(false);
  const [deliveryToggle, setDeliveryToggle] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Toshkent shahri");
  const [sortBy, setSortBy] = useState("Eng ommabop");
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const mainCategoryTabs = [
    "Barchasi",
    "Avto",
    "Ko'chmas mulk",
    "Elektronika",
    "Ish o'rinlari",
    "Xizmatlar",
    "Moda va stil",
    "Bolalar dunyosi",
    "Uy va bog'",
  ];

  // Sync category if URL parameter changes
  useEffect(() => {
    const fromUrl = searchParams.get("category") || searchParams.get("cat");
    if (fromUrl) {
      const normalized = catMap[fromUrl.toLowerCase()] || fromUrl;
      setSelectedCategory(normalized);
    }
  }, [searchParams]);

  // Fetch products from Backend API
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const data = await getProducts({
          category: selectedCategory !== "Barchasi" ? selectedCategory : undefined,
          q: searchParamQuery || undefined,
        });
        if (isMounted) {
          setProducts(data || []);
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
  }, [selectedCategory, searchParamQuery]);

  const categories = [
    { id: "noutbuklar", label: "Noutbuklar", count: 1452 },
    { id: "pc", label: "Kompyuterlar & monoblok", count: 840 },
    { id: "gaming", label: "O'yin noutbuklari", count: 524 },
    { id: "accessories", label: "Aksessuarlar", count: 1120 },
    { id: "bags", label: "Sumka va g'iloflar", count: 315 },
  ];

  const brandOptions = [
    { name: "Apple", count: 342 },
    { name: "ASUS", count: 290 },
    { name: "Lenovo", count: 245 },
    { name: "HP", count: 188 },
    { name: "Acer", count: 112 },
  ];

  const conditionOptions = [
    { name: "Barchasi", count: 1452 },
    { name: "Yangi (qadoqda)", count: 618 },
    { name: "Ishlatilgan (ideal)", count: 580 },
    { name: "Ishlatilgan (yaxshi)", count: 254 },
  ];

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const toggleCondition = (cond) => {
    if (selectedConditions.includes(cond)) {
      setSelectedConditions(selectedConditions.filter((c) => c !== cond));
    } else {
      setSelectedConditions([...selectedConditions, cond]);
    }
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedConditions([]);
    setSelectedRange("");
    setMinPrice("");
    setMaxPrice("");
    setWarrantyToggle(false);
    setDeliveryToggle(false);
  };

  // Filter products based on state
  const filteredProducts = products.filter((prod) => {
    if (minPrice && Number(prod.price) < Number(minPrice)) return false;
    if (maxPrice && Number(prod.price) > Number(maxPrice)) return false;
    return true;
  });

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
            {mainCategoryTabs.map((tab) => (
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
                {tab}
              </button>
            ))}
          </div>

          <Link
            href={`/create?category=${encodeURIComponent(selectedCategory === "Barchasi" ? "Elektronika" : selectedCategory)}`}
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
              {filteredProducts.length} ta e&apos;lon topildi
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
          <span>Filtrlar</span>
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

            {/* Rukn (Category) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#002f34] block">
                Rukn
              </label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-[#002f34] text-white font-bold"
                        : "hover:bg-[#f2f4f5] text-gray-700"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] ${
                        selectedCategory === cat.id
                          ? "text-teal-200"
                          : "text-gray-400"
                      }`}
                    >
                      {cat.count}
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
                    placeholder="5 000 000"
                    className="w-full bg-[#f2f4f5] text-xs font-medium px-3 py-2 rounded-xl outline-none focus:bg-white focus:border focus:border-[#23e5db]"
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
                    placeholder="25 000 000"
                    className="w-full bg-[#f2f4f5] text-xs font-medium px-3 py-2 rounded-xl outline-none focus:bg-white focus:border focus:border-[#23e5db]"
                  />
                </div>
              </div>

              {/* Quick range pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["1M - 5M", "5M - 10M", "10M - 20M", "20M+"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      selectedRange === range
                        ? "bg-[#23e5db]/20 border-[#23e5db] text-[#002f34] font-bold"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Brend (Brand checkboxes) */}
            <div className="space-y-2.5 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-[#002f34] block">
                Brend
              </label>
              <div className="space-y-2">
                {brandOptions.map((brand) => (
                  <label
                    key={brand.name}
                    className="flex items-center justify-between text-xs cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        onClick={() => toggleBrand(brand.name)}
                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                          selectedBrands.includes(brand.name)
                            ? "bg-[#002f34] border-[#002f34] text-white"
                            : "border-gray-300 group-hover:border-gray-400 bg-white"
                        }`}
                      >
                        {selectedBrands.includes(brand.name) && (
                          <Check className="w-3 h-3 stroke-[3]" />
                        )}
                      </div>
                      <span className="text-gray-700 group-hover:text-black font-medium">
                        {brand.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {brand.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Holati (Condition) */}
            <div className="space-y-2.5 pt-2 border-t border-gray-100">
              <label className="text-xs font-bold text-[#002f34] block">
                Holati
              </label>
              <div className="space-y-2">
                {conditionOptions.map((cond) => (
                  <label
                    key={cond.name}
                    className="flex items-center justify-between text-xs cursor-pointer group select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        onClick={() => toggleCondition(cond.name)}
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          selectedConditions.includes(cond.name)
                            ? "border-[#002f34] bg-[#002f34]"
                            : "border-gray-300 group-hover:border-gray-400 bg-white"
                        }`}
                      >
                        {selectedConditions.includes(cond.name) && (
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
                ))}
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
                <option value="Toshkent shahri">Toshkent shahri</option>
                <option value="Samarqand viloyati">Samarqand viloyati</option>
                <option value="Farg'ona viloyati">Farg&apos;ona viloyati</option>
                <option value="Andijon viloyati">Andijon viloyati</option>
                <option value="Buxoro viloyati">Buxoro viloyati</option>
              </select>
            </div>

            {/* Apply button */}
            <button
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
              {selectedBrands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 bg-gray-100 text-[#002f34] text-xs font-semibold px-2.5 py-1 rounded-lg"
                >
                  <span>{b}</span>
                  <button
                    onClick={() => toggleBrand(b)}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedRange && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-[#002f34] text-xs font-semibold px-2.5 py-1 rounded-lg">
                  <span>{selectedRange}</span>
                  <button
                    onClick={() => setSelectedRange("")}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(selectedBrands.length > 0 || selectedRange) && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-red-500 hover:underline font-semibold ml-2"
                >
                  Tozalash
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
                href={`/create?category=${encodeURIComponent(selectedCategory === "Barchasi" ? "Elektronika" : selectedCategory)}`}
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
              {filteredProducts.map((prod) => (
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

          {/* Trade-In Banner (As in Reference Screen 2) */}
          <div className="pt-2">
            <TradeInBanner />
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors"
              aria-label="Oldingi sahifa"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-[#002f34] text-white font-bold text-xs flex items-center justify-center shadow-sm">
              1
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center transition-colors">
              3
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center transition-colors">
              4
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center transition-colors">
              5
            </button>
            <button
              className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors"
              aria-label="Keyingi sahifa"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
