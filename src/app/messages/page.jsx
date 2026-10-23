"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  Phone,
  MoreVertical,
  ExternalLink,
  ShieldAlert,
  Send,
  Paperclip,
  CheckCheck,
  Truck,
  Headphones,
  Lock,
  ShieldCheck,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { useRealtimeChat } from "@/lib/realtimeChat";

export default function MessagesPage() {
  const {
    chats,
    activeChat,
    activeChatId,
    totalUnread,
    isTyping,
    selectChat,
    sendMessage,
  } = useRealtimeChat();

  const [chatFilter, setChatFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");

  const handleSend = (e) => {
    e?.preventDefault();
    if (inputText.trim()) {
      sendMessage(activeChatId, inputText.trim(), "me");
      setInputText("");
    }
  };

  const handleQuickReply = (text) => {
    sendMessage(activeChatId, text, "me");
  };

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.item.shortTitle.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (chatFilter === "unread") return chat.unread > 0;
    if (chatFilter === "buy") return chat.user.role === "SOTUVCHI";
    if (chatFilter === "sell") return chat.user.role === "XARIDOR";
    return true;
  });

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6">
      {/* 1. Breadcrumbs & Security Badge */}
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

      {/* 2. Chat Layout (Split Grid) */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[640px]">
        {/* ================= LEFT SIDEBAR (Chats List) ================= */}
        <div className="md:col-span-5 lg:col-span-4 border-r border-gray-100 flex flex-col">
          {/* Search bar */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Xabarlarni qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f2f4f5] text-xs font-medium pl-10 pr-4 py-2.5 rounded-2xl outline-none focus:bg-white focus:border focus:border-[#23e5db] text-[#002f34]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 mt-3 text-[11px] overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "Barchasi" },
                { id: "buy", label: "Xaridlar" },
                { id: "sell", label: "Sotuvlar" },
                { id: "unread", label: "O'qilmagan" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setChatFilter(f.id)}
                  className={`px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
                    chatFilter === f.id
                      ? "bg-[#002f34] text-white"
                      : "bg-[#f2f4f5] text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => selectChat(chat.id)}
                className={`p-3.5 sm:p-4 cursor-pointer transition-colors flex items-start gap-3 relative ${
                  activeChatId === chat.id
                    ? "bg-teal-50/60 border-l-4 border-[#23e5db]"
                    : "hover:bg-[#f8fafc]"
                }`}
              >
                {/* User avatar */}
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={chat.user.avatar}
                      alt={chat.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {chat.user.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#002f34] truncate">
                      {chat.user.name}
                    </h4>
                    <span className="text-[10px] text-gray-400">
                      {chat.lastTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-teal-800 font-semibold truncate mt-0.5">
                    <span>📦</span>
                    <span className="truncate">{chat.item.shortTitle}</span>
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
          {activeChat ? (
            <>
              {/* Chat Top Bar */}
              <div className="p-3.5 sm:p-4 bg-white border-b border-gray-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <img
                      src={activeChat.user.avatar}
                      alt={activeChat.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-xs sm:text-sm text-[#002f34] truncate">
                        {activeChat.user.name}
                      </h3>
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{activeChat.user.lastSeen}</span>
                    </span>
                  </div>
                </div>

                {/* Mini product preview bar */}
                <div className="flex items-center gap-3 bg-[#f2f4f5] px-3 py-1.5 rounded-2xl max-w-sm">
                  <img
                    src={activeChat.item.image}
                    alt={activeChat.item.title}
                    className="w-9 h-9 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 hidden sm:block">
                    <p className="text-[11px] font-bold text-[#002f34] truncate">
                      {activeChat.item.title}
                    </p>
                    <p className="text-[11px] font-black text-teal-800">
                      {activeChat.item.price}
                    </p>
                  </div>
                  <Link
                    href={`/product/macbook-pro-16`}
                    className="px-2.5 py-1 bg-white hover:bg-gray-100 rounded-lg text-[10px] font-bold text-[#002f34] shrink-0 border border-gray-200 transition-colors"
                  >
                    E&apos;lonni ko&apos;rish
                  </Link>
                </div>
              </div>

              {/* Chat Messages Feed */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* Security warning banner inside chat */}
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
                {activeChat.messages.map((msg) => (
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
                      <p className="leading-relaxed">{msg.text}</p>
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

                {/* Safe Deal offer card in chat */}
                <div className="bg-white rounded-2xl border-2 border-[#23e5db] p-4 max-w-sm mx-auto shadow-md space-y-2.5 text-center">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>Xavfsiz bitim taklifi</span>
                  </div>
                  <div className="text-base font-black text-[#002f34]">
                    {activeChat.item.price}
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Mablag&apos; xavfsiz hisobda muzlatiladi va tovar yetib borganidan so&apos;ng sotuvchiga o&apos;tkaziladi.
                  </p>
                  <button
                    onClick={() => alert("Xavfsiz bitim rasmiylashtirilmoqda...")}
                    className="w-full py-2.5 rounded-xl bg-[#ffce32] hover:bg-[#f3c220] text-[#002f34] font-black text-xs shadow-xs transition-colors"
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
                      key={i}
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
                className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
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
                  className="flex-1 bg-[#f2f4f5] text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl outline-none focus:bg-white focus:border focus:border-[#23e5db] text-[#002f34]"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className={`p-2.5 rounded-2xl transition-all ${
                    inputText.trim()
                      ? "bg-[#23e5db] text-[#002f34] shadow-sm active:scale-95"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <MessageSquare className="w-12 h-12 stroke-[1.5] mb-2 text-gray-300" />
              <p className="text-sm font-semibold">Suhbatni tanlang</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
