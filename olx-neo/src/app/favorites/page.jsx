"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  TrendingDown,
  Trash2,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState("ads");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // 8 Exact items from reference design Screen 1
  const [favoriteItems, setFavoriteItems] = useState([
    {
      id: "iphone-15-pro-max",
      title: "iPhone 15 Pro Max 256GB Natural Titanium (Yangi, qutilgan)",
      price: 14200000,
      priceFormatted: "14 200 000 so'm",
      location: "Toshkent, Yunusobod",
      date: "Bugun, 14:10",
      badge: "YANGI",
      tag: "Yetkazish bor",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      category: "Elektronika",
    },
    {
      id: "tahoe-2023",
      title: "Chevrolet Tahoe Premier 2023, ideal holatda, yangi",
      price: 850000000,
      priceFormatted: "850 000 000 so'm",
      location: "Toshkent, Chilonzor",
      date: "Bugun, 15:45",
      badge: "VIP",
      tag: "Kafolat",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
      category: "Transport",
    },
    {
      id: "apartment-2-room",
      title: "2-xonalik yangi ta'mirlangan shinam kvartira, 68 m²",
      price: 920000000,
      priceFormatted: "920 000 000 so'm",
      location: "Toshkent, Mirobod",
      date: "Bugun, 12:30",
      badge: null,
      tag: "Ipoteka bor",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      category: "Ko'chmas mulk",
    },
    {
      id: "macbook-pro-16",
      title: "MacBook Pro 16 M3 Max 36GB / 1TB Space Black",
      price: 36500000,
      priceFormatted: "36 500 000 so'm",
      location: "Samarqand, Markaz",
      date: "Bugun, 10:15",
      badge: "YANGI",
      tag: "Torg bor",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      category: "Elektronika",
    },
    {
      id: "ps5-slim",
      title: "Sony PlayStation 5 Slim 1TB + 2 ta DualSense pult",
      price: 6400000,
      priceFormatted: "6 400 000 so'm",
      location: "Toshkent, Yashnobod",
      date: "Bugun, 16:30",
      badge: null,
      tag: "Original",
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
      category: "Elektronika",
    },
    {
      id: "trek-marlin-7",
      title: "Trek Marlin 7 tog' velosipedi, ideal holatda",
      price: 3900000,
      priceFormatted: "3 900 000 so'm",
      location: "Toshkent, Shayxontohur",
      date: "Bugun, 15:50",
      badge: null,
      tag: "A'lo holatda",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
      category: "Transport",
    },
    {
      id: "dyson-v15",
      title: "Dyson V15 Detect simsiz changyutgich (Original)",
      price: 7600000,
      priceFormatted: "7 600 000 so'm",
      location: "Samarqand, Registon",
      date: "Bugun, 13:50",
      badge: "YANGI",
      tag: "1 yil garantiya",
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
      category: "Elektronika",
    },
    {
      id: "herman-miller",
      title: "Ergonomik ofis kreslosi Herman Miller uslubida",
      price: 1750000,
      priceFormatted: "1 750 000 so'm",
      location: "Toshkent, Sergeli",
      date: "Bugun, 14:05",
      badge: null,
      tag: "Yetkazish tekin",
      image: "https://images.unsplash.com/photo-1580481077195-c3f99581335b?auto=format&fit=crop&w=800&q=80",
      category: "Uy va bog'",
    },
  ]);

  const clearAllFavorites = () => {
    if (confirm("Haqiqatan ham barcha sevimlilarni o'chirmoqchimisiz?")) {
      setFavoriteItems([]);
    }
  };

  const filteredItems = favoriteItems.filter((item) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "electronics") return item.category === "Elektronika";
    if (selectedCategory === "transport") return item.category === "Transport";
    if (selectedCategory === "real-estate") return item.category === "Ko'chmas mulk";
    if (selectedCategory === "home") return item.category === "Uy va bog'";
    return true;
  });

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6">
      {/* 1. Header & Price Drop Alert */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#002f34] tracking-tight">
              Sevimlilar
            </h1>
            <Heart className="w-6 h-6 fill-[#ff5636] text-[#ff5636]" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Siz saqlab qo&apos;ygan va kuzatayotgan barcha qiziqarli e&apos;lonlar bir joyda.
          </p>
        </div>

        {/* Price dropped notification badge */}
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-2xl text-xs font-semibold shrink-0">
          <TrendingDown className="w-4 h-4 text-emerald-600" />
          <span>3 ta e&apos;londa narx pasaydi</span>
        </div>
      </div>

      {/* 2. Tabs Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-1">
        <div className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab("ads")}
            className={`pb-3 font-bold transition-all relative ${
              activeTab === "ads"
                ? "text-[#002f34] border-b-2 border-[#23e5db]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            E&apos;lonlar <span className="text-gray-400 font-normal">12</span>
          </button>
          <button
            onClick={() => setActiveTab("searches")}
            className={`pb-3 font-semibold transition-all relative ${
              activeTab === "searches"
                ? "text-[#002f34] border-b-2 border-[#23e5db]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Qidiruvlar <span className="text-gray-400 font-normal">3</span>
          </button>
          <button
            onClick={() => setActiveTab("sellers")}
            className={`pb-3 font-semibold transition-all relative ${
              activeTab === "sellers"
                ? "text-[#002f34] border-b-2 border-[#23e5db]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Kuzatilayotgan sotuvchilar <span className="text-gray-400 font-normal">2</span>
          </button>
        </div>

        <button
          onClick={clearAllFavorites}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 font-medium pb-2 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Hammasini tozalash</span>
        </button>
      </div>

      {/* 3. Category Filter & Sorting Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar text-xs">
          <span className="text-gray-400 font-medium mr-1">Kategoriya:</span>
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-full font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-[#002f34] text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-100"
            }`}
          >
            Barchasi (12)
          </button>
          <button
            onClick={() => setSelectedCategory("electronics")}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              selectedCategory === "electronics"
                ? "bg-[#002f34] text-white font-bold"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-100"
            }`}
          >
            Elektronika (4)
          </button>
          <button
            onClick={() => setSelectedCategory("transport")}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              selectedCategory === "transport"
                ? "bg-[#002f34] text-white font-bold"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-100"
            }`}
          >
            Transport (2)
          </button>
          <button
            onClick={() => setSelectedCategory("real-estate")}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              selectedCategory === "real-estate"
                ? "bg-[#002f34] text-white font-bold"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-100"
            }`}
          >
            Ko&apos;chmas mulk (3)
          </button>
          <button
            onClick={() => setSelectedCategory("home")}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
              selectedCategory === "home"
                ? "bg-[#002f34] text-white font-bold"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-100"
            }`}
          >
            Uy va bog&apos; (3)
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 ml-auto">
          <span>Saralash:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent font-bold text-[#002f34] outline-none cursor-pointer"
          >
            <option value="latest">Eng so&apos;nggi qo&apos;shilganlar</option>
            <option value="price-asc">Narx: arzonroq</option>
            <option value="price-desc">Narx: qimmatroq</option>
          </select>
        </div>
      </div>

      {/* 4. Favorites Grid (4 columns x 2 rows = 8 items) */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-gray-100">
          <Heart className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-[#002f34]">
            Hozircha sevimlilar ro&apos;yxati bo&apos;sh
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Yoqtirgan e&apos;lonlaringizdagi yurakcha belgisini bosib, ularni bu yerda saqlab qo&apos;ying.
          </p>
          <Link
            href="/catalog"
            className="inline-block px-5 py-2.5 rounded-full bg-[#23e5db] text-[#002f34] font-bold text-xs mt-2"
          >
            E&apos;lonlarni ko&apos;rish
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((prod) => (
            <ProductCard
              key={prod.id}
              {...prod}
              initialFavorite={true}
              href="/product/macbook-pro-16"
            />
          ))}
        </div>
      )}

      {/* 5. Pagination */}
      <div className="flex items-center justify-center gap-2 pt-6">
        <button
          className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors"
          aria-label="Oldingi"
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
        <button
          className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-colors"
          aria-label="Keyingi"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6. Price Drop Alert Subscription Banner */}
      <div className="bg-[#d4f8f5] rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#b2ece7]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#23e5db] text-[#002f34] flex items-center justify-center shrink-0 shadow-sm">
            <TrendingDown className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-[#002f34]">
              Narxlar tushishini o&apos;tkazib yubormang!
            </h4>
            <p className="text-xs text-gray-600 mt-0.5 max-w-xl">
              Sevimlilar ro&apos;yxatidagi e&apos;lonlar narxi arzonlashganda Telegram yoki email orqali tezkor bildirishnoma oling.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setNotificationsEnabled(!notificationsEnabled);
            alert(
              notificationsEnabled
                ? "Bildirishnomalar o'chirildi"
                : "Bildirishnomalar muvaffaqiyatli yoqildi!"
            );
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0"
        >
          <Bell className="w-4 h-4 stroke-[2.5]" />
          <span>
            {notificationsEnabled
              ? "Bildirishnomalar yoqilgan"
              : "Bildirishnomalarni yoqish"}
          </span>
        </button>
      </div>
    </div>
  );
}
