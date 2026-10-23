"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Plus,
  ShieldCheck,
  Star,
  Phone,
  Wallet,
  LayoutGrid,
  MessageSquare,
  Heart,
  CreditCard,
  Settings,
  LogOut,
  Eye,
  ShoppingBag,
  RotateCcw,
  Edit3,
  Trash2,
  AlertCircle,
  Clock,
  Search,
  ExternalLink,
  ChevronLeft,
  Camera,
  Upload,
  User,
  Sparkles,
} from "lucide-react";
import { USER_PROFILE } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";

export default function ProfilePage() {
  const { user, isLoggedIn, updateProfile, logout, completeLogin } = useAuth();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // If user is logged in via AuthContext, use dynamic info; fallback to USER_PROFILE
  const displayName = user?.name || USER_PROFILE.name;
  const displayPhone = user?.phone || USER_PROFILE.phone;
  const displayAvatar = user?.avatar || USER_PROFILE.avatar;
  const displayInitials = user?.avatarInitials || USER_PROFILE.avatarInitials;
  const currentBalance = user?.walletBalance ?? USER_PROFILE.walletBalance;

  const handleTopUp = () => {
    const amount = prompt("To'ldirish summasini kiriting (so'm):", "100000");
    if (amount && !isNaN(amount) && Number(amount) > 0) {
      const added = Number(amount);
      const newBal = currentBalance + added;
      updateProfile({ walletBalance: newBal });
      alert(`Hisobingiz ${added.toLocaleString()} so'mga muvaffaqiyatli to'ldirildi!`);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Rasm hajmi 5MB dan oshmasligi kerak!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredAds = USER_PROFILE.ads.filter((ad) => {
    if (activeTab === "active" && ad.status !== "active") return false;
    if (activeTab === "pending" && ad.status !== "pending") return false;
    if (activeTab === "rejected" && ad.status !== "rejected") return false;
    if (
      searchQuery &&
      !ad.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
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
        <span className="text-gray-400">Shaxsiy kabinet</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#002f34]">Mening e&apos;lonlarim</span>
      </nav>

      {/* 2. Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="lg:col-span-4 space-y-5">
          {/* A. User Profile Card */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-sm text-center space-y-4 relative overflow-hidden">
            <div className="relative inline-block group">
              <div className="w-22 h-22 rounded-full overflow-hidden bg-[#002f34] text-white flex items-center justify-center text-2xl font-black mx-auto border-3 border-[#23e5db] shadow-md">
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{displayInitials}</span>
                )}
              </div>

              {/* Upload photo trigger */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 p-2 rounded-full bg-[#002f34] text-[#23e5db] hover:bg-black border-2 border-white shadow-md transition-all active:scale-90"
                title="Fotosuratni yangilash"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />

              <span className="absolute top-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <h2 className="text-xl font-black text-[#002f34]">
                {displayName}
              </h2>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-bold text-teal-700 hover:underline block mx-auto mt-0.5"
              >
                Fotosuratni o&apos;zgartirish
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#008f87]" />
                <span>OneID orqali tasdiqlangan</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#002f34]">
              <Star className="w-4 h-4 fill-[#ffce32] text-[#ffce32]" />
              <span>{USER_PROFILE.rating.toFixed(1)}</span>
              <span className="text-gray-400 font-normal">
                ({USER_PROFILE.reviewsCount} ta baho)
              </span>
            </div>

            {/* Phone button */}
            <div className="w-full py-2.5 rounded-2xl bg-[#f2f4f5] text-xs font-bold text-[#002f34] flex items-center justify-center gap-2">
              <Phone className="w-3.5 h-3.5 text-teal-600" />
              <span>{displayPhone}</span>
            </div>
          </div>

          {/* B. Wallet Balance Card (Exact styling from Screen 7) */}
          <div className="bg-[#002f34] text-white rounded-3xl p-5 sm:p-6 shadow-md space-y-3.5">
            <div className="flex items-center justify-between text-xs text-gray-300 font-bold uppercase tracking-wider">
              <span>HAMYON BALANSI</span>
              <Wallet className="w-4 h-4 text-[#23e5db]" />
            </div>

            <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {currentBalance.toLocaleString()} so&apos;m
            </div>

            <button
              onClick={handleTopUp}
              className="w-full py-3 rounded-2xl bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>To&apos;ldirish</span>
            </button>
          </div>

          {/* C. Sidebar Navigation Menu */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-3 shadow-sm space-y-1 text-xs font-semibold">
            <Link
              href="/profile"
              className="flex items-center justify-between px-3.5 py-3 rounded-2xl bg-[#002f34] text-white font-bold"
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-4 h-4 text-[#23e5db]" />
                <span>Mening e&apos;lonlarim</span>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                {USER_PROFILE.stats.activeAds}
              </span>
            </Link>

            <Link
              href="/messages"
              className="flex items-center justify-between px-3.5 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span>Xabarlar</span>
              </div>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                2
              </span>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center justify-between px-3.5 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-gray-400" />
                <span>Sevimlilar</span>
              </div>
              <span className="text-xs text-gray-400 font-bold">12</span>
            </Link>

            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span>To&apos;lovlar va hisob</span>
            </a>

            <a
              href="#"
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-400" />
              <span>Sozlamalar</span>
            </a>

            <div className="pt-2 border-t border-gray-100 mt-2">
              <button
                type="button"
                onClick={() => {
                  logout();
                  alert("Tizimdan muvaffaqiyatli chiqildi");
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-red-600 hover:bg-red-50 transition-colors text-left font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Chiqish</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ================= RIGHT MAIN CONTENT ================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header & New Ad Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#002f34] tracking-tight">
                Mening e&apos;lonlarim
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                E&apos;lonlaringiz holati, ko&apos;rishlar dinamikasi va sotuv jarayonlarini boshqaring
              </p>
            </div>

            <Link
              href="/create"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-black text-xs sm:text-sm shadow-sm transition-all shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Yangi e&apos;lon</span>
            </Link>
          </div>

          {/* 4 Stats Cards (Exact metrics from Screen 7) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* 1. Active Ads */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex items-start justify-between">
              <div>
                <span className="text-[11px] text-gray-500 font-medium block">
                  Faol e&apos;lonlar
                </span>
                <span className="text-2xl font-black text-[#002f34] block mt-1">
                  {USER_PROFILE.stats.activeAds}
                </span>
                <span className="text-[10px] text-gray-400">ta e&apos;lon</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            {/* 2. Views with Growth Badge */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex items-start justify-between">
              <div>
                <span className="text-[11px] text-gray-500 font-medium block">
                  Ko&apos;rishlar
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-2xl font-black text-[#002f34]">
                    {USER_PROFILE.stats.views.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {USER_PROFILE.stats.viewsGrowth}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">Oxirgi 30 kun</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>

            {/* 3. Calls */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex items-start justify-between">
              <div>
                <span className="text-[11px] text-gray-500 font-medium block">
                  Qo&apos;ng&apos;iroqlar
                </span>
                <span className="text-2xl font-black text-[#002f34] block mt-1">
                  {USER_PROFILE.stats.calls}
                </span>
                <span className="text-[10px] text-gray-400">ta aloqa</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
            </div>

            {/* 4. Sales */}
            <div className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex items-start justify-between">
              <div>
                <span className="text-[11px] text-gray-500 font-medium block">
                  Sotuvlar
                </span>
                <span className="text-2xl font-black text-[#002f34] block mt-1">
                  {USER_PROFILE.stats.sales}
                </span>
                <span className="text-[10px] text-gray-400">muvaffaqiyatli</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Tabs & Search Row */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                  activeTab === "all"
                    ? "bg-[#002f34] text-white"
                    : "bg-[#f2f4f5] text-gray-600 hover:bg-gray-200"
                }`}
              >
                Barchasi ({USER_PROFILE.ads.length})
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  activeTab === "active"
                    ? "bg-[#002f34] text-white font-bold"
                    : "bg-[#f2f4f5] text-gray-600 hover:bg-gray-200"
                }`}
              >
                Faol ({USER_PROFILE.tabsCounts.active})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  activeTab === "pending"
                    ? "bg-[#002f34] text-white font-bold"
                    : "bg-[#f2f4f5] text-gray-600 hover:bg-gray-200"
                }`}
              >
                Kutilmoqda ({USER_PROFILE.tabsCounts.pending})
              </button>
              <button
                onClick={() => setActiveTab("rejected")}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                  activeTab === "rejected"
                    ? "bg-[#002f34] text-white font-bold"
                    : "bg-[#f2f4f5] text-gray-600 hover:bg-gray-200"
                }`}
              >
                Rad etilgan ({USER_PROFILE.tabsCounts.rejected})
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-56">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="E'lonlar ichidan izlash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f2f4f5] text-xs pl-8 pr-3 py-2 rounded-xl outline-none text-[#002f34]"
              />
            </div>
          </div>

          {/* Ads List */}
          <div className="space-y-4">
            {filteredAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-white rounded-3xl border border-gray-200/80 p-4 sm:p-5 shadow-sm space-y-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Photo thumbnail */}
                  <div className="relative w-full sm:w-44 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                    {ad.badge && (
                      <span
                        className={`absolute top-2 left-2 text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          ad.badge === "TOP E'LON"
                            ? "bg-[#ffce32] text-[#002f34]"
                            : ad.badge === "YANGI"
                            ? "bg-[#23e5db] text-[#002f34]"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {ad.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
                      📷 {ad.photosCount}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          ad.status === "active"
                            ? "bg-emerald-500"
                            : ad.status === "pending"
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span
                        className={
                          ad.status === "active"
                            ? "text-emerald-700"
                            : ad.status === "pending"
                            ? "text-amber-700"
                            : "text-red-600"
                        }
                      >
                        {ad.statusText}
                      </span>
                    </div>

                    <Link
                      href="/product/macbook-pro-16"
                      className="text-sm sm:text-base font-bold text-[#002f34] hover:text-[#008f87] transition-colors block line-clamp-2"
                    >
                      {ad.title}
                    </Link>

                    <div className="text-base sm:text-lg font-black text-[#002f34]">
                      {ad.price}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                      <span>📍 {ad.location}</span>
                      {ad.views && <span>👁️ {ad.views} ko&apos;rish</span>}
                      {ad.saves && <span>❤️ {ad.saves} saqlangan</span>}
                    </div>
                  </div>

                  {/* Actions right buttons */}
                  <div className="flex sm:flex-col items-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {ad.status === "active" && (
                      <>
                        <button
                          onClick={() => alert("E'lon muvaffaqiyatli yangilandi!")}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#002f34] transition-colors w-full"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Yangilash</span>
                        </button>
                        <Link
                          href="/create"
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#002f34] transition-colors w-full"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Tahrirlash</span>
                        </Link>
                        <button
                          onClick={() => alert("VIP xizmati faollashtirildi!")}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ffce32] hover:bg-[#f3c220] text-xs font-bold text-[#002f34] transition-colors w-full shadow-sm"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>VIP qilish</span>
                        </button>
                      </>
                    )}

                    {ad.status === "pending" && (
                      <>
                        <Link
                          href="/product/macbook-pro-16"
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#002f34] transition-colors w-full"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ko&apos;rish</span>
                        </Link>
                        <Link
                          href="/create"
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#002f34] transition-colors w-full"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Tahrirlash</span>
                        </Link>
                        <span className="text-[10px] text-gray-400 mt-1">
                          {ad.sentAt}
                        </span>
                      </>
                    )}

                    {ad.status === "rejected" && (
                      <>
                        <Link
                          href="/create"
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#002f34] hover:bg-gray-800 text-xs font-bold text-white transition-colors w-full"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Qayta tahrirlash</span>
                        </Link>
                        <button
                          onClick={() => alert("E'lon o'chirildi")}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 hover:border-red-300 hover:text-red-600 text-xs font-bold text-gray-600 transition-colors w-full"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>O&apos;chirish</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Warning notice box for pending */}
                {ad.warningNotice && (
                  <div className="bg-[#fff9e6] border border-[#ffce32]/40 rounded-2xl p-3 text-xs text-[#7a5200] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#ffce32] shrink-0" />
                    <span>{ad.warningNotice}</span>
                  </div>
                )}

                {/* Error alert box for rejected */}
                {ad.errorReason && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 text-xs text-red-800 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-red-700">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{ad.errorReason}</span>
                    </div>
                    <p className="text-[11px] text-red-600 pl-5 leading-relaxed">
                      {ad.errorDetails}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              Jami {USER_PROFILE.ads.length} ta e&apos;londan 1 - {filteredAds.length} ko&apos;rsatilmoqda
            </span>

            <div className="flex items-center gap-1.5">
              <button
                className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-400"
                disabled
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#002f34] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                1
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs flex items-center justify-center">
                2
              </button>
              <button
                className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab="login"
      />
    </div>
  );
}
