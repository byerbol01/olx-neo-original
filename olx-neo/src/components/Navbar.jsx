"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  LayoutGrid,
  Heart,
  MessageSquare,
  Plus,
  ChevronDown,
  Menu,
  X,
  LogIn,
  UserPlus,
  User,
  LogOut,
  Wallet,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Butun O'zbekiston");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    router.push("/");
  };

  const openAuthModal = (tab) => {
    setAuthTab(tab);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const cities = [
    "Butun O'zbekiston",
    "Toshkent shahri",
    "Samarqand viloyati",
    "Farg'ona viloyati",
    "Andijon viloyati",
    "Namangan viloyati",
    "Buxoro viloyati",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/catalog");
    }
  };

  // Get user display names
  const displayName = user?.name || "Foydalanuvchi";
  const displayShortName =
    user?.firstName ||
    displayName.split(" ")[0] ||
    "Profil";

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#e5eaed] shadow-xs">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-2.5">
          <div className="flex items-center justify-between gap-3 md:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
              <span className="text-[28px] font-black tracking-tight text-[#002f34] leading-none">
                olx
              </span>
              <span className="bg-[#23e5db] text-[#002f34] text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider group-hover:bg-[#1cd1c7] transition-colors shadow-xs">
                NEO
              </span>
            </Link>

            {/* Location button */}
            <div className="relative hidden xl:block">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 hover:border-gray-300 text-xs font-medium text-[#002f34] bg-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#008f87]" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              {cityDropdownOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs hover:bg-[#f2f4f5] transition-colors ${
                        selectedCity === city
                          ? "font-bold text-[#002f34] bg-teal-50"
                          : "text-gray-700"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Categories button */}
            <Link
              href="/catalog"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 hover:border-gray-300 text-xs font-bold text-[#002f34] bg-white transition-colors shrink-0"
            >
              <LayoutGrid className="w-4 h-4 text-[#002f34]" />
              <span>Barcha ruknlar</span>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-[440px] hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nima qidiryapsiz? (Masalan: iPhone 15, Cobalt, kvartira)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f2f4f5] text-[#002f34] placeholder-gray-500 text-xs md:text-sm pl-4 pr-10 py-2.5 rounded-full border border-transparent focus:bg-white focus:border-[#23e5db] focus:ring-2 focus:ring-[#23e5db]/20 outline-none transition-all font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#002f34] transition-colors"
                  aria-label="Qidirish"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Favorites */}
              <Link
                href="/favorites"
                className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2 py-1.5 rounded-xl transition-colors ${
                  pathname === "/favorites"
                    ? "text-[#002f34] bg-gray-100"
                    : "text-gray-600 hover:text-[#002f34] hover:bg-gray-50"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    pathname === "/favorites"
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                />
                <span className="hidden lg:inline">Sevimlilar</span>
              </Link>

              {/* Admin Panel Link */}
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-all ${
                  pathname === "/admin"
                    ? "bg-[#002f34] text-white"
                    : "text-[#008f87] bg-[#23e5db]/15 hover:bg-[#23e5db]/30"
                }`}
                title="Admin boshqaruv paneli"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden md:inline">Admin</span>
              </Link>

              {/* Messages */}
              <Link
                href="/messages"
                className={`hidden sm:flex relative items-center gap-1.5 text-xs font-semibold px-2 py-1.5 rounded-xl transition-colors ${
                  pathname === "/messages"
                    ? "text-[#002f34] bg-gray-100"
                    : "text-gray-600 hover:text-[#002f34] hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                </div>
                <span className="hidden lg:inline">Xabarlar</span>
              </Link>

              {/* Auth Area: Logged In vs Logged Out */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 text-xs font-bold pl-1.5 pr-2.5 py-1 rounded-full border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all shadow-xs"
                  >
                    {/* User Avatar (Photo or Initials) */}
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-[#002f34] text-white flex items-center justify-center text-[11px] font-black shrink-0 border border-teal-300">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{user?.avatarInitials || "OL"}</span>
                      )}
                    </div>
                    <span className="hidden md:inline text-[#002f34]">
                      {displayShortName}
                    </span>
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95">
                      {/* User Header */}
                      <div className="p-3 bg-gradient-to-br from-teal-50 to-[#f4f7f8] rounded-xl mb-2 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full overflow-hidden bg-[#002f34] text-white flex items-center justify-center text-sm font-black shrink-0 border-2 border-white shadow-xs">
                          {user?.avatar ? (
                            <img
                              src={user.avatar}
                              alt={displayName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>{user?.avatarInitials || "OL"}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <h4 className="font-bold text-xs text-[#002f34] truncate">
                              {displayName}
                            </h4>
                            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          </div>
                          <p className="text-[11px] text-gray-500 truncate">
                            {user?.phone || "+998 90 123 45 67"}
                          </p>
                        </div>
                      </div>

                      {/* Wallet Balance Widget */}
                      <div className="px-3 py-2 bg-amber-50/70 border border-amber-200/60 rounded-xl mb-1 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold">
                          <Wallet className="w-3.5 h-3.5 text-amber-600" />
                          <span>Hamyon:</span>
                        </div>
                        <span className="text-xs font-black text-[#002f34]">
                          {(user?.walletBalance ?? 250000).toLocaleString()} so&apos;m
                        </span>
                      </div>

                      {/* Links */}
                      <div className="space-y-0.5">
                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-[#f2f4f5] text-gray-800 rounded-xl font-medium transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-gray-500" />
                          <span>Mening kabinetim</span>
                        </Link>
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs bg-teal-50 hover:bg-teal-100 text-[#008f87] rounded-xl font-bold transition-colors"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-[#008f87]" />
                          <span>Admin Panel</span>
                        </Link>
                        <Link
                          href="/favorites"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-[#f2f4f5] text-gray-800 rounded-xl font-medium transition-colors"
                        >
                          <Heart className="w-3.5 h-3.5 text-gray-500" />
                          <span>Sevimlilar ro&apos;yxati</span>
                        </Link>
                        <Link
                          href="/messages"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-[#f2f4f5] text-gray-800 rounded-xl font-medium transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                          <span>Xabarlarim</span>
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 my-1 pt-1">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-red-50 text-red-600 rounded-xl font-semibold w-full text-left transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Chiqish</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => openAuthModal("login")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 hover:border-gray-300 text-xs font-bold text-[#002f34] transition-colors"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Kirish</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal("signup")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-[#f2f4f5] hover:bg-gray-200 text-xs font-bold text-[#002f34] transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Ro&apos;yxat</span>
                  </button>
                </div>
              )}

              {/* Post Ad Button */}
              <Link
                href="/create"
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] text-xs font-black shadow-xs transition-all shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">E&apos;lon joylashtirish</span>
                <span className="sm:hidden">E&apos;lon</span>
              </Link>

              {/* Mobile menu hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-[#002f34] md:hidden"
                aria-label="Menyu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3 animate-in slide-in-from-top-4">
            {/* Mobile search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nima qidiryapsiz?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f2f4f5] text-xs pl-3.5 pr-9 py-2.5 rounded-full outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            {isLoggedIn ? (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-3 p-2 bg-[#f4f7f8] rounded-xl">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#002f34] text-white flex items-center justify-center font-bold">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <span>{user?.avatarInitials || "OL"}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#002f34]">{displayName}</p>
                    <p className="text-[11px] text-gray-500">{user?.phone}</p>
                  </div>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-bold text-gray-700 py-1.5"
                >
                  Mening kabinetim
                </Link>
                <Link
                  href="/favorites"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-bold text-gray-700 py-1.5"
                >
                  Sevimlilar
                </Link>
                <Link
                  href="/messages"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-bold text-gray-700 py-1.5"
                >
                  Xabarlar
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-xs font-bold text-red-600 py-1.5"
                >
                  Chiqish
                </button>
              </div>
            ) : (
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => openAuthModal("login")}
                  className="flex-1 py-2 text-xs font-bold text-center bg-[#f2f4f5] rounded-xl"
                >
                  Kirish
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="flex-1 py-2 text-xs font-bold text-center bg-[#ffce32] rounded-xl"
                >
                  Ro&apos;yxatdan o&apos;tish
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authTab}
      />
    </>
  );
}
