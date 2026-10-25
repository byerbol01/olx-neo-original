"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Package,
  Users,
  DollarSign,
  Trash2,
  ExternalLink,
  Plus,
  RefreshCw,
  Search,
  CheckCircle,
  AlertCircle,
  Tag,
  MapPin,
  Clock,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { getProducts, deleteProduct, getAdminStats, getAdminUsers, getBackendMessages } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const { user, completeLogin } = useAuth();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [adminTab, setAdminTab] = useState("products"); // "products" | "messages"
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const [actionMessage, setActionMessage] = useState(null);

  const isAdmin = user?.role === "admin" || user?.phone === "admin" || user?.phone === "+998 90 999 99 99";

  const loadData = async () => {
    try {
      setLoading(true);
      const [prodsData, statsData, usersData, msgsData] = await Promise.all([
        getProducts(),
        getAdminStats(),
        getAdminUsers(),
        getBackendMessages(),
      ]);
      setProducts(prodsData || []);
      setStats(statsData);
      setUsers(usersData || []);
      setMessages(msgsData || []);
    } catch (err) {
      console.error("Admin ma'lumotlarini yuklashda xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Haqiqatan ham "${title}" e'lonini o'chirmoqchimisiz?`)) {
      return;
    }
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
      setActionMessage({ type: "success", text: "E'lon muvaffaqiyatli o'chirildi!" });
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      setActionMessage({ type: "error", text: "O'chirishda xatolik: " + err.message });
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const handleAdminQuickLogin = () => {
    completeLogin("+998 90 999 99 99", {
      name: "Bosh Admin",
      role: "admin",
      phone: "+998 90 999 99 99",
    });
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      (p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.id && String(p.id).includes(searchQuery)) ||
      (p.location && p.location.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === "Barchasi" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSum = products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#002f34] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-[#002f34] tracking-tight">
              OLX Neo — Admin Boshqaruv Paneli
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Backend API bilan real vaqtda bog&apos;langan boshqaruv markazi
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-[#002f34] transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Yangilash</span>
          </button>

          <Link
            href="/create"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#23e5db] hover:bg-[#1cd1c7] text-[#002f34] text-xs font-black shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi E&apos;lon Qo&apos;shish</span>
          </Link>
        </div>
      </div>

      {/* Admin Status Banner */}
      {!isAdmin ? (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-amber-900">
                Siz hozir mehmon / oddiy foydalanuvchi sifatida ko&apos;ryapsiz.
              </span>
              <p className="text-amber-700">
                To&apos;liq admin huquqlari (o&apos;chirish, statistika) uchun admin sifatida kiring.
              </p>
            </div>
          </div>
          <button
            onClick={handleAdminQuickLogin}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shrink-0 transition-colors shadow-sm"
          >
            Admin sifatida kirish
          </button>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs text-emerald-800 font-bold">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Admin rejimi faol: {user?.name || "Bosh Admin"} ({user?.phone})</span>
          </div>
          <span className="text-[11px] bg-emerald-200 text-emerald-900 font-mono px-2.5 py-0.5 rounded-md font-bold">
            SUPER ADMIN
          </span>
        </div>
      )}

      {actionMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold transition-all ${
            actionMessage.type === "success"
              ? "bg-teal-50 text-teal-800 border border-teal-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {actionMessage.text}
        </div>
      )}

      {/* 1. STATS METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase">Jami E&apos;lonlar</span>
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#008f87] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#002f34]">
            {products.length} ta
          </div>
          <p className="text-[11px] text-gray-400">Backend bazasida saqlangan</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase">Umumiy Qiymat</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#002f34] truncate">
            {totalSum.toLocaleString("ru-RU").replace(/,/g, " ")} so&apos;m
          </div>
          <p className="text-[11px] text-gray-400">E&apos;lonlarning umumiy bahosi</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase">Foydalanuvchilar</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#002f34]">
            {users.length > 0 ? users.length : 2} nafar
          </div>
          <p className="text-[11px] text-gray-400">Tizimda ro&apos;yxatdan o&apos;tgan</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase">Backend Holati</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="text-lg sm:text-xl font-black text-emerald-600 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Faol (Port 5000)</span>
          </div>
          <p className="text-[11px] text-gray-400">Convex & Express REST API</p>
        </div>
      </div>

      {/* TAB SWITCHER */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
        <button
          onClick={() => setAdminTab("products")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
            adminTab === "products"
              ? "bg-[#002f34] text-white shadow-sm"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>E&apos;lonlar boshqaruvi ({products.length})</span>
        </button>

        <button
          onClick={() => setAdminTab("messages")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all ${
            adminTab === "messages"
              ? "bg-[#002f34] text-white shadow-sm"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <MessageSquare className="w-4 h-4 text-[#23e5db]" />
          <span>Mijozlar xabarlari ({messages.length})</span>
        </button>
      </div>

      {adminTab === "messages" ? (
        /* MESSAGES SECTION */
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-black text-[#002f34]">
                Mijozlar tomonidan yuborilgan xabarlar ({messages.length})
              </h2>
              <p className="text-xs text-gray-500">
                Foydalanuvchilar e&apos;lonlar bo&apos;yicha yozgan barcha suhbatlar tarixi
              </p>
            </div>
            <Link
              href="/messages"
              className="text-xs font-bold text-[#008f87] hover:underline flex items-center gap-1"
            >
              <span>Chat markaziga o&apos;tish</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-16 text-gray-400 space-y-2">
              <MessageSquare className="w-12 h-12 mx-auto text-gray-300" />
              <p className="font-bold text-sm text-gray-600">Hozircha xabarlar kelmagan</p>
              <p className="text-xs text-gray-400">
                Foydalanuvchi mahsulot sahifasida &quot;Xabar yozish&quot; tugmasini bossa, xabar bu yerda paydo bo&apos;ladi
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((conv) => (
                <div
                  key={conv.id}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#23e5db] transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/70 pb-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#002f34] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {conv.user?.name ? conv.user.name.slice(0, 2).toUpperCase() : "MJ"}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#002f34]">
                          {conv.user?.name || "Mijoz"} {conv.user?.phone && `(${conv.user.phone})`}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          E&apos;lon: <strong className="text-teal-700">{conv.productTitle}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium">
                      Oxirgi xabar: {conv.lastTime || "Yangi"}
                    </div>
                  </div>

                  <div className="space-y-2 pl-2">
                    {conv.messages?.map((m, idx) => (
                      <div
                        key={idx}
                        className={`text-xs p-2.5 rounded-xl max-w-lg ${
                          m.sender === "user" || m.sender === "me"
                            ? "bg-white border border-gray-200 text-[#002f34]"
                            : "bg-[#23e5db]/15 border border-teal-200 text-[#002f34] font-medium ml-auto"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                          <span className="font-bold">
                            {m.sender === "user" || m.sender === "me" ? "Mijoz" : "Sotuvchi / Admin"}
                          </span>
                          <span>{m.time}</span>
                        </div>
                        <p>{m.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* 2. PRODUCTS MANAGEMENT TABLE */
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#002f34]">
              Barcha E&apos;lonlar Ro&apos;yxati ({filteredProducts.length})
            </h2>
            <p className="text-xs text-gray-500">
              Mahsulotlarni ko&apos;rish, tahrirlash va o&apos;chirish
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ID, nom yoki shahar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-60 bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-[#002f34] outline-none focus:border-[#23e5db]"
              />
            </div>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-[#002f34] outline-none focus:border-[#23e5db]"
            >
              <option value="Barchasi">Barcha ruknlar</option>
              <option value="Elektronika">Elektronika</option>
              <option value="Avto">Avto</option>
              <option value="Ko'chmas mulk">Ko&apos;chmas mulk</option>
              <option value="Moda va stil">Moda va stil</option>
              <option value="Uy va bog'">Uy va bog&apos;</option>
              <option value="Xizmatlar">Xizmatlar</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 uppercase text-[10px] font-black tracking-wider">
                <th className="py-3 px-4">Mahsulot</th>
                <th className="py-3 px-4">Kategoriya</th>
                <th className="py-3 px-4">Narxi</th>
                <th className="py-3 px-4">Joylashuv</th>
                <th className="py-3 px-4">Holati / Badge</th>
                <th className="py-3 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((p) => {
                const img =
                  p.images && p.images.length > 0 ? p.images[0] : p.image;
                return (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* Title & Image */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={img}
                          alt={p.title}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0"
                        />
                        <div className="max-w-[280px]">
                          <span className="font-mono text-[10px] text-gray-400 block">
                            ID: {p.id}
                          </span>
                          <span className="font-bold text-[#002f34] line-clamp-1">
                            {p.title}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="bg-gray-100 text-gray-700 font-semibold px-2 py-0.5 rounded-md">
                        {p.category || "Umumiy"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-black text-[#002f34]">
                      {p.priceFormatted ||
                        `${Number(p.price).toLocaleString()} so'm`}
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {typeof p.location === "object" && p.location !== null
                          ? [p.location.city, p.location.district].filter(Boolean).join(", ") || "Toshkent"
                          : String(p.location || "Toshkent")}
                      </span>
                    </td>

                    {/* Badge */}
                    <td className="py-3.5 px-4">
                      {p.badge === "VIP" ? (
                        <span className="bg-[#ffce32] text-[#002f34] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                          VIP
                        </span>
                      ) : p.badge === "TOP" ? (
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md">
                          TOP
                        </span>
                      ) : (
                        <span className="bg-[#23e5db]/20 text-[#008f87] text-[10px] font-bold uppercase px-2 py-0.5 rounded-md">
                          YANGI
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/product/${p.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-[#002f34] transition-colors"
                          title="Sahifani ko'rish"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Mahsulotlar topilmadi
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
