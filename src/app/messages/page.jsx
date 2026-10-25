"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronRight,
  Search,
  Phone,
  ShieldAlert,
  Send,
  Paperclip,
  CheckCheck,
  ShieldCheck,
  MessageSquare,
  X,
  Sparkles,
} from "lucide-react";
import { sendBackendMessage } from "@/lib/api";
import { toast } from "@/components/Toast";
import { getUzbekSellerReply } from "@/lib/realtimeChat";

const CHAT_STORAGE_KEY = "olx_neo_chat_history";
const ACTIVE_CHAT_KEY = "olx_neo_active_chat_id";

// Default Initial Chat (Seller with Cobalt)
const DEFAULT_CHAT = {
  id: "chat-sotuvchi",
  user: {
    name: "Sotuvchi",
    avatar: null,
    role: "SOTUVCHI",
    online: true,
    lastSeen: "Hozir onlayn",
    verified: true,
  },
  item: {
    id: "prod-1",
    title: "Chevrolet Cobalt 4-pozitsiya Style AT 2024",
    shortTitle: "Chevrolet Cobalt 4-pozitsiya",
    price: "178 000 000 so'm",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80",
  },
  unread: 0,
  lastTime: "15:42",
  lastMessage: "Vaalaykum assalom, nima xizmat?",
  messages: [
    {
      id: "m1",
      sender: "me",
      text: "Assalomu alaykum",
      time: "15:35",
      status: "sent",
    },
    {
      id: "m2",
      sender: "them",
      text: "Vaalaykum assalom, nima xizmat?",
      time: "15:38",
      status: "received",
    },
  ],
  quickReplies: [
    "Narxi kelishiladimi? 💰",
    "Hozir olib ketsam bo'ladimi? 🤝",
    "Kafolati bormi? 🛡️",
    "Dostavka bormi? 🚚",
    "Manzil qayerda? 📍",
  ],
};

export default function MessagesPage() {
  const searchParams = useSearchParams();

  // State
  const [chats, setChats] = useState([DEFAULT_CHAT]);
  const [activeChatId, setActiveChatId] = useState("chat-sotuvchi");
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatFilter, setChatFilter] = useState("all");
  const [isTyping, setIsTyping] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const chatFeedRef = useRef(null);

  // Load chats on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      let list = [DEFAULT_CHAT];
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      }

      setChats(list);

      // Check URL param or saved active chat
      const urlChatId = searchParams.get("chatId");
      const savedActive = localStorage.getItem(ACTIVE_CHAT_KEY);
      const targetId =
        urlChatId ||
        (list.some((c) => c.id === savedActive) ? savedActive : list[0].id);

      setActiveChatId(targetId);
    } catch (err) {
      console.warn("Storage load error:", err);
    }
  }, [searchParams]);

  // Active chat object (Guaranteed non-null)
  const activeChat =
    chats.find((c) => c.id === activeChatId) || chats[0] || DEFAULT_CHAT;

  // Auto-scroll ONLY inside chat box (never scrolls the main webpage down)
  useEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [activeChat?.messages?.length, isTyping]);

  // Select a conversation from sidebar
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(ACTIVE_CHAT_KEY, chatId);
      } catch (e) {}
    }

    // Mark unread as 0
    setChats((prev) => {
      const next = prev.map((c) =>
        c.id === chatId ? { ...c, unread: 0 } : c
      );
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });
  };

  // Core message dispatcher
  const dispatchMessage = (text) => {
    if (!text || !text.trim()) return;

    const trimmed = text.trim();
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg = {
      id: "msg-user-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      sender: "me",
      text: trimmed,
      time: timeStr,
      status: "sent",
    };

    const targetId = activeChat.id;

    // 1. Immediately append user message to chat state
    setChats((prev) => {
      const next = prev.map((c) => {
        if (c.id === targetId) {
          return {
            ...c,
            lastMessage: trimmed,
            lastTime: timeStr,
            messages: [...(c.messages || []), userMsg],
          };
        }
        return c;
      });

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(next));
        } catch (e) {}
      }
      return next;
    });

    // 2. Forward to Backend for Admin panel
    sendBackendMessage({
      chatId: targetId,
      productId: activeChat.item?.id || null,
      productTitle: activeChat.item?.title || "E'lon",
      sender: "user",
      text: trimmed,
      user: { name: "Mijoz" },
      seller: { name: activeChat.user?.name || "Sotuvchi" },
    }).catch(() => {});

    // 3. Fast intelligent AI Agent response in Uzbek (500ms for snappy feel)
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyText = getUzbekSellerReply(trimmed, activeChat);
      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const botMsg = {
        id: "msg-bot-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
        sender: "them",
        text: replyText,
        time: botTime,
        status: "received",
      };

      setChats((prev) => {
        const next = prev.map((c) => {
          if (c.id === targetId) {
            return {
              ...c,
              lastMessage: replyText,
              lastTime: botTime,
              messages: [...(c.messages || []), botMsg],
            };
          }
          return c;
        });

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(next));
          } catch (e) {}
        }
        return next;
      });

      sendBackendMessage({
        chatId: targetId,
        productId: activeChat.item?.id || null,
        productTitle: activeChat.item?.title || "E'lon",
        sender: "seller",
        text: replyText,
        user: { name: "Mijoz" },
        seller: { name: activeChat.user?.name || "Sotuvchi" },
      }).catch(() => {});
    }, 500);
  };

  // Submit form handler
  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    dispatchMessage(inputText);
    setInputText("");
  };

  // Quick reply pill handler
  const handleQuickReply = (pillText) => {
    dispatchMessage(pillText);
  };

  // Filtered conversation list
  const filteredChats = chats.filter((c) => {
    if (chatFilter === "unread" && (!c.unread || c.unread === 0)) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.user?.name?.toLowerCase().includes(q) ||
      c.item?.title?.toLowerCase().includes(q) ||
      c.item?.shortTitle?.toLowerCase().includes(q) ||
      c.lastMessage?.toLowerCase().includes(q)
    );
  });

  const totalUnread = chats.reduce((acc, c) => acc + (c.unread || 0), 0);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6">
      {/* 1. Breadcrumbs & Security status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#002f34] transition-colors">
            Bosh sahifa
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#002f34]">Xabarlar markazi</span>
        </nav>

        <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 text-teal-800 px-3 py-1 rounded-full font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#23e5db] animate-pulse"></span>
          <span>Xavfsiz chat tizimi faol (Kriptolangan)</span>
        </div>
      </div>

      {/* 2. Main Chat Container */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
        {/* ================= LEFT SIDEBAR (Chats List) ================= */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-gray-100 flex flex-col">
          {/* Search bar */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Yozishmalardan qidirish..."
                className="w-full pl-9 pr-4 py-2 bg-[#f2f4f5] text-xs font-medium rounded-xl outline-none focus:bg-white focus:border focus:border-[#23e5db] transition-all text-[#002f34]"
              />
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={() => setChatFilter("all")}
                className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${
                  chatFilter === "all"
                    ? "bg-[#002f34] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Barchasi
              </button>
              <button
                type="button"
                onClick={() => setChatFilter("unread")}
                className={`text-xs px-3 py-1 rounded-full font-bold transition-colors flex items-center gap-1 ${
                  chatFilter === "unread"
                    ? "bg-[#002f34] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>O&apos;qilmagan</span>
                {totalUnread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {totalUnread}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`p-3.5 sm:p-4 cursor-pointer transition-colors flex items-start gap-3 relative ${
                  activeChatId === chat.id
                    ? "bg-teal-50/60 border-l-4 border-[#23e5db]"
                    : "hover:bg-[#f8fafc]"
                }`}
              >
                {/* User avatar */}
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-tr from-[#002f34] to-[#008f87] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {chat.user?.avatar && chat.user.avatar.startsWith("http") ? (
                      <img
                        src={chat.user.avatar}
                        alt={chat.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{(chat.user?.name || "SO").slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  {chat.user?.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#002f34] truncate">
                      {chat.user?.name || "Sotuvchi"}
                    </h4>
                    <span className="text-[10px] text-gray-400">
                      {chat.lastTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-teal-800 font-semibold truncate mt-0.5">
                    <span>📦</span>
                    <span className="truncate">{chat.item?.shortTitle || chat.item?.title}</span>
                  </div>

                  <p className="text-xs text-gray-500 truncate mt-1">
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Unread badge */}
                {chat.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT CHAT WINDOW ================= */}
        <div className="md:col-span-7 lg:col-span-8 flex flex-col h-[640px] bg-slate-50/40">
          {/* Top Bar */}
          <div className="p-3.5 sm:p-4 bg-white border-b border-gray-100 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-[#002f34] to-[#008f87] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {activeChat.user?.avatar && activeChat.user.avatar.startsWith("http") ? (
                  <img
                    src={activeChat.user.avatar}
                    alt={activeChat.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{(activeChat.user?.name || "SO").slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs sm:text-sm text-[#002f34] truncate">
                    {activeChat.user?.name || "Sotuvchi"}
                  </h3>
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{activeChat.user?.lastSeen || "Hozir onlayn"}</span>
                </span>
              </div>
            </div>

            {/* Mini Product Preview */}
            <div className="flex items-center gap-3 bg-[#f2f4f5] px-3 py-1.5 rounded-2xl max-w-sm">
              {activeChat.item?.image && (
                <img
                  src={activeChat.item.image}
                  alt={activeChat.item.title}
                  className="w-9 h-9 rounded-xl object-cover shrink-0"
                />
              )}
              <div className="min-w-0 hidden sm:block">
                <h5 className="text-[11px] font-bold text-[#002f34] truncate">
                  {activeChat.item?.shortTitle || activeChat.item?.title}
                </h5>
                <p className="text-[10px] font-extrabold text-[#008f87]">
                  {activeChat.item?.price}
                </p>
              </div>
              <Link
                href={`/product/${activeChat.item?.id || 1}`}
                className="px-2.5 py-1 bg-white hover:bg-gray-100 rounded-lg text-[10px] font-bold text-[#002f34] shrink-0 border border-gray-200 transition-colors"
              >
                E&apos;lonni ko&apos;rish
              </Link>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div ref={chatFeedRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Safety banner */}
            <div className="bg-[#fff9e6] border border-[#ffce32]/40 rounded-2xl p-3 text-xs text-[#7a5200] flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-[#ffce32] shrink-0" />
              <span>
                Xavfsizlik eslatmasi: Begona to&apos;lov havolalariga o&apos;tmang va mablag&apos;ni faqat OLX Xavfsiz bitim orqali to&apos;lang.
              </span>
            </div>

            {/* Date separator */}
            <div className="text-center">
              <span className="bg-white border border-gray-200/80 px-3 py-1 rounded-full text-[10px] text-gray-500 font-medium shadow-xs">
                Bugun
              </span>
            </div>

            {/* Messages list */}
            {activeChat.messages?.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[78%] sm:max-w-[65%] rounded-2xl px-4 py-2.5 shadow-xs text-xs sm:text-sm ${
                    msg.sender === "me"
                      ? "bg-[#002f34] text-white rounded-br-xs"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-xs"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${
                      msg.sender === "me" ? "text-teal-200" : "text-gray-400"
                    }`}
                  >
                    <span>{msg.time}</span>
                    {msg.sender === "me" && (
                      <CheckCheck className="w-3.5 h-3.5 text-[#23e5db]" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Seller Bot Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-200">
                <div className="bg-white text-gray-500 border border-gray-100 rounded-2xl rounded-bl-xs px-4 py-2.5 shadow-xs flex items-center gap-1.5 text-xs font-semibold">
                  <span>Sotuvchi yozmoqda</span>
                  <span className="flex items-center gap-1 ml-1">
                    <span className="w-1.5 h-1.5 bg-[#23e5db] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#23e5db] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#23e5db] rounded-full animate-bounce"></span>
                  </span>
                </div>
              </div>
            )}

            {/* Safe Deal Offer Card */}
            <div className="bg-white rounded-2xl border-2 border-[#23e5db] p-4 max-w-sm mx-auto shadow-md space-y-2.5 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Xavfsiz bitim taklifi</span>
              </div>
              <div className="text-base font-black text-[#002f34]">
                {activeChat.item?.price}
              </div>
              <p className="text-[11px] text-gray-500">
                Mablag&apos; xavfsiz hisobda muzlatiladi va tovar yetib borganidan so&apos;ng sotuvchiga o&apos;tkaziladi.
              </p>
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-black text-xs shadow-xs transition-all"
              >
                Qabul qilish va to&apos;lash
              </button>
            </div>
          </div>

          {/* Quick Reply Suggestions */}
          {activeChat.quickReplies && (
            <div className="px-4 py-2 bg-white/70 border-t border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {activeChat.quickReplies.map((r, i) => (
                <button
                  key={`qr-${r}-${i}`}
                  type="button"
                  onClick={() => handleQuickReply(r)}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-xs text-gray-700 font-medium whitespace-nowrap shadow-xs transition-colors shrink-0"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0"
          >
            <button
              type="button"
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="Fayl biriktirish"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Xabar yozing..."
              className="flex-1 bg-[#f2f4f5] text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl outline-none focus:bg-white focus:border focus:border-[#23e5db] text-[#002f34] transition-all"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-2.5 rounded-2xl transition-all ${
                inputText.trim()
                  ? "bg-[#23e5db] hover:bg-[#1cd1c7] text-[#002f34] shadow-sm active:scale-95 cursor-pointer"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ================= MODAL: Safe Deal Confirmation ================= */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative space-y-5 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#008f87] flex items-center justify-center shrink-0 shadow-xs border border-teal-100">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#002f34]">
                    Xavfsiz bitimni tasdiqlash
                  </h3>
                  <p className="text-xs text-gray-500">
                    {activeChat.item?.title || "Tovarni tasdiqlash"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Question */}
            <div className="p-4 bg-[#f8fafc] rounded-2xl border border-gray-100 space-y-2">
              <p className="text-sm font-semibold text-[#002f34] leading-relaxed text-center">
                Siz haqiqatdan ham tovarni oldingizmi va to&apos;lovni tasdiqlaysizmi?
              </p>
              <div className="text-center text-xs text-gray-500 pt-1 border-t border-gray-200/60">
                To&apos;lov summasi:{" "}
                <span className="text-[#002f34] font-black text-sm">
                  {activeChat.item?.price}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 text-center leading-normal">
              ⚠️ Tasdiqlaganingizdan so&apos;ng mablag&apos; xavfsiz hisobdan sotuvchiga o&apos;tkaziladi va operatsiyani bekor qilib bo&apos;lmaydi.
            </p>

            {/* Two Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="w-full py-3 rounded-xl border border-gray-200 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsConfirmModalOpen(false);
                  toast.info(
                    "Xavfsiz bitim rasmiylashtirilmoqda. Mablag' tovar qabul qilingandan so'ng o'tkaziladi.",
                    "Xavfsiz bitim"
                  );
                }}
                className="w-full py-3 rounded-xl bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] text-xs font-black shadow-md transition-all"
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
