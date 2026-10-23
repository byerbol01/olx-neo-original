"use client";

import React, { useState } from "react";
import { MessageCircle, X, Send, User, ShieldCheck } from "lucide-react";
import { useRealtimeChat } from "@/lib/realtimeChat";

export default function LiveSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const { sendMessage, chats, activeChatId } = useRealtimeChat();

  const handleSend = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      sendMessage(activeChatId, inputText.trim(), "me");
      setInputText("");
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40">
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 bg-[#002f34] text-white hover:bg-[#002226] px-4 py-3 rounded-full shadow-2xl active:scale-95 transition-all group border-2 border-[#23e5db]"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 text-[#23e5db]" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-ping"></span>
          </div>
          <span className="text-xs font-bold hidden sm:inline">
            Jonli Support
          </span>
        </button>
      )}

      {/* Floating chat box */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[480px]">
          {/* Header */}
          <div className="bg-[#002f34] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#23e5db] text-[#002f34] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black">OLX Neo Support</h4>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Hozir onlayn
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick info note */}
          <div className="bg-teal-50 px-3.5 py-2 text-[11px] text-teal-800 border-b border-teal-100 flex items-center gap-1.5">
            <span>⚡ Real-time chat (BroadcastChannel orqali)</span>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 bg-gray-50/50 text-xs">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-gray-700 leading-relaxed">
              Assalomu alaykum! OLX Neo qo&apos;llab-quvvatlash xizmatiga xush kelibsiz. Savolingiz bo&apos;lsa, bemalol yozing!
            </div>

            {chats[0]?.messages?.slice(-4).map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-2.5 rounded-2xl text-xs ${
                    m.sender === "me"
                      ? "bg-[#002f34] text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[9px] text-gray-400 block text-right mt-0.5">
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Xabar yozing..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-[#f2f4f5] text-xs px-3.5 py-2.5 rounded-full outline-none focus:bg-white border border-transparent focus:border-[#23e5db]"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-[#23e5db] hover:bg-[#1cd1c7] text-[#002f34] flex items-center justify-center shrink-0 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
