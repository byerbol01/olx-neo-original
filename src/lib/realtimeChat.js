"use client";

import { useState, useEffect, useCallback } from "react";
import { CHATS as INITIAL_CHATS } from "@/data/mockData";

const CHATS_STORAGE_KEY = "olx_neo_chats_v2";
const ACTIVE_CHAT_KEY = "olx_neo_active_chat";
const SYNC_CHANNEL_NAME = "olx_neo_realtime_broadcast";

export function useRealtimeChat() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState("chat-sardor");
  const [isReady, setIsReady] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Load chats from LocalStorage or seed with INITIAL_CHATS
  const loadChats = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(CHATS_STORAGE_KEY);
      if (saved) {
        setChats(JSON.parse(saved));
      } else {
        localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(INITIAL_CHATS));
        setChats(INITIAL_CHATS);
      }

      const savedActive = localStorage.getItem(ACTIVE_CHAT_KEY);
      if (savedActive) {
        setActiveChatId(savedActive);
      }

      setIsReady(true);
    } catch (e) {
      console.error("Local storage error:", e);
      setChats(INITIAL_CHATS);
      setIsReady(true);
    }
  }, []);

  // BroadcastChannel for cross-tab sync
  useEffect(() => {
    loadChats();

    let channel = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (event.data?.type === "CHAT_UPDATE") {
          loadChats();
        }
      };
    }

    const handleStorage = (e) => {
      if (e.key === CHATS_STORAGE_KEY) {
        loadChats();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      channel?.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, [loadChats]);

  const notifyUpdate = () => {
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      channel.postMessage({ type: "CHAT_UPDATE", timestamp: Date.now() });
      channel.close();
    }
  };

  // Select active conversation
  const selectChat = (chatId) => {
    setActiveChatId(chatId);
    if (typeof window !== "undefined") {
      localStorage.setItem(ACTIVE_CHAT_KEY, chatId);
    }

    // Mark as read
    setChats((prev) => {
      const updated = prev.map((c) =>
        c.id === chatId ? { ...c, unread: 0 } : c
      );
      if (typeof window !== "undefined") {
        localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updated));
      }
      notifyUpdate();
      return updated;
    });
  };

  // Send a message
  const sendMessage = (chatId, text, sender = "me") => {
    if (!text || !text.trim()) return;

    const timeString = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg = {
      id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      sender,
      text: text.trim(),
      time: timeString,
      status: sender === "me" ? "sent" : "received",
    };

    setChats((prev) => {
      const updated = prev.map((c) => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: text.trim(),
            lastTime: timeString,
            unread: sender === "them" ? (c.unread || 0) + 1 : 0,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      });

      if (typeof window !== "undefined") {
        localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updated));
      }
      notifyUpdate();
      return updated;
    });

    // Simulated instant reply from seller if user sent the message
    if (sender === "me") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const autoReplies = [
          "Assalomu alaykum! Ha, mahsulot hali sotuvda bor.",
          "Yetkazib berish xizmati Toshkent bo'ylab 2-3 soat ichida yetib boradi.",
          "Keling, bemalol ko'rib tekshirib olishingiz mumkin. Lokatsiya yuboraymi?",
          "Narxi oxirgisi, qutisi ochilmagan yangi variant.",
          "Rahmat, agar qiziqsangiz telefon orqali ham gaplashishimiz mumkin.",
        ];
        const randomReply =
          autoReplies[Math.floor(Math.random() * autoReplies.length)];

        sendMessage(chatId, randomReply, "them");
      }, 1600);
    }
  };

  // Start new conversation
  const startNewChat = (sellerName, productTitle, productPrice, productImage) => {
    const existing = chats.find(
      (c) => c.user.name.toLowerCase() === sellerName.toLowerCase()
    );

    if (existing) {
      selectChat(existing.id);
      return existing.id;
    }

    const newId = "chat-" + Date.now();
    const newChatObj = {
      id: newId,
      user: {
        name: sellerName,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        role: "SOTUVCHI",
        online: true,
        lastSeen: "Hozir onlayn",
      },
      item: {
        id: "prod-" + Date.now(),
        title: productTitle,
        shortTitle: productTitle.substring(0, 28) + "...",
        price: productPrice,
        image:
          productImage ||
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=200&q=80",
      },
      unread: 0,
      lastTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      lastMessage: "Suhbat boshlandi",
      messages: [
        {
          id: "m-welcome-" + Date.now(),
          sender: "them",
          text: `Assalomu alaykum! "${productTitle}" e'loni bo'yicha qiziqishingizdan mamnunmiz. Qanday savolingiz bor?`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
      quickReplies: [
        "Narxi kelishiladimi?",
        "Hozir olib ketsam bo'ladimi?",
        "Kafolati bormi?",
        "Dostavka bormi?",
      ],
    };

    const updated = [newChatObj, ...chats];
    setChats(updated);
    setActiveChatId(newId);

    if (typeof window !== "undefined") {
      localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(ACTIVE_CHAT_KEY, newId);
    }
    notifyUpdate();
    return newId;
  };

  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];
  const totalUnread = chats.reduce((acc, c) => acc + (c.unread || 0), 0);

  return {
    chats,
    activeChat,
    activeChatId,
    totalUnread,
    isReady,
    isTyping,
    selectChat,
    sendMessage,
    startNewChat,
  };
}
