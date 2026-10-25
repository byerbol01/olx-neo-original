"use client";

import { useState, useEffect, useCallback } from "react";
import { CHATS as INITIAL_CHATS } from "@/data/mockData";

export const CHATS_STORAGE_KEY = "olx_neo_chat_history";
export const ACTIVE_CHAT_KEY = "olx_neo_active_chat_id";
export const SYNC_CHANNEL_NAME = "olx_neo_realtime_broadcast_unified";

// Advanced Contextual AI Seller Agent for OLX Neo strictly in natural, realistic Uzbek
export function getUzbekSellerReply(buyerMessage = "", chatContext = null) {
  const msg = buyerMessage.toLowerCase().trim();
  const prodTitle =
    chatContext?.item?.shortTitle ||
    chatContext?.item?.title ||
    "Chevrolet Cobalt 4-pozitsiya Style AT 2024";
  const prodPrice = chatContext?.item?.price || "178 000 000 so'm";

  // 1. Rozilik / Kelishuv / Rahmat (Agreement / Ok / Thanks)
  if (
    msg.includes("kelishdik") ||
    msg.includes("boldi") ||
    msg.includes("bo'ldi") ||
    msg.includes("rahmat") ||
    msg.includes("boraman") ||
    msg.includes("olaman") ||
    msg.includes("gap yo'q") ||
    msg.includes("gap yoq")
  ) {
    return `Kelishdik! Sizni kutaman. Yo'lga chiqishdan 15-20 daqiqa oldin xabar berib qo'ysangiz yetarli. Salomat bo'ling! 👍`;
  }

  // 2. To'lov turi / Click / Payme / Naqd / Dollar (Payment methods)
  if (
    msg.includes("click") ||
    msg.includes("payme") ||
    msg.includes("karta") ||
    msg.includes("naqd") ||
    msg.includes("dollar") ||
    msg.includes("perevod")
  ) {
    return `To'lovni istalgan usulda qilsangiz bo'ladi: naqd so'm, Click, Payme yoki bank kartasi orqali. Hech qanday foiz yoki qo'shimcha to'lovsiz.`;
  }

  // 3. Rasmlar / Video / Ko'rish so'ralganda (Photos / Video / Inspection)
  if (
    msg.includes("rasm") ||
    msg.includes("foto") ||
    msg.includes("video") ||
    msg.includes("korsat") ||
    msg.includes("ko'rsat")
  ) {
    return `E'londagi barcha fotosuratlar 100% o'ziniki, haqiqiy holati aks ettirilgan. Istasangiz Telegram orqali yana batafsil video va qo'shimcha rasmlarni tashlab beraman. Telegramingiz qaysi raqamda?`;
  }

  // 2. Qachon / Vaqt / Bugun uchrashish (Time / When / Today / Meeting)
  if (
    msg.includes("qachon") ||
    msg.includes("vaqt") ||
    msg.includes("soat") ||
    msg.includes("bugun") ||
    msg.includes("ertaga") ||
    msg.includes("hozir") ||
    msg.includes("kechqurun") ||
    msg.includes("kelsam")
  ) {
    return `Bugun soat 21:00 gacha bemalol kelib ko'rishingiz mumkin. Keling, oldinroq telefon qilib qo'ysangiz joyida kutib olaman. Qaysi vaqt sizga qulayroq?`;
  }

  // 3. Narx, chegirma, oxirgi narx, savdolashish (Price & Discount)
  if (
    msg.includes("narx") ||
    msg.includes("qancha") ||
    msg.includes("necha") ||
    msg.includes("nech pul") ||
    msg.includes("arzon") ||
    msg.includes("skidka") ||
    msg.includes("kelish") ||
    msg.includes("tush") ||
    msg.includes("oxiri") ||
    msg.includes("oxirgi") ||
    msg.includes("torg") ||
    msg.includes("berasiz")
  ) {
    return `${prodTitle} uchun ko'rsatilgan narx (${prodPrice}) juda qulay qilib qo'yilgan. Real xaridor bo'lsangiz joyida ozgina baraka uchun tushib beraman, xafa qilmaysiz. Qancha taklif qilasiz?`;
  }

  // 4. Yetkazib berish / Dostavka / Pochta (Delivery / Post)
  if (
    msg.includes("dostavka") ||
    msg.includes("yetkaz") ||
    msg.includes("bts") ||
    msg.includes("pochta") ||
    msg.includes("fargo") ||
    msg.includes("yandex") ||
    msg.includes("kuryer") ||
    msg.includes("viloyat")
  ) {
    return `Ha, yetkazib berish xizmati bor! Toshkent shahrida Yandex orqali 1 soatda, viloyatlarga esa BTS pochta orqali 24 soat ichida yetib boradi. To'lovni tovarni qo'lingizga olganda qilsangiz ham bo'ladi.`;
  }

  // 5. Lokatsiya, manzil, uchrashuv joyi (Location / Address)
  if (
    msg.includes("qayerda") ||
    msg.includes("qayer") ||
    msg.includes("manzil") ||
    msg.includes("adres") ||
    msg.includes("lokatsiya") ||
    msg.includes("joylashuv") ||
    msg.includes("uchrash") ||
    msg.includes("oriyentir")
  ) {
    return `Toshkent shahri, Chilonzor metro yaqinida yoki Mirobod tumanida uchrashishimiz mumkin. Yo'lga chiqqaningizda Telegramdan aniq nuqta (lokatsiya) tashlab beraman.`;
  }

  // 6. Holati, aybi, karobka, kafolat (Condition / Defects / Warranty)
  if (
    msg.includes("holat") ||
    msg.includes("karobka") ||
    msg.includes("kafolat") ||
    msg.includes("garantiya") ||
    msg.includes("aybi") ||
    msg.includes("yangi") ||
    msg.includes("remont") ||
    msg.includes("ochilgan") ||
    msg.includes("usta")
  ) {
    return `Holati a'lo darajada, hech qanday aybi, nuqsoni yoki yashirin muammosi yo'q! Ustaga tekshirtirib, xohlagancha sinab olishingiz mumkin. Ko'nglingiz to'liq to'lsa keyin olasiz.`;
  }

  // 7. Obmen / Barter (Trade / Exchange)
  if (
    msg.includes("obmen") ||
    msg.includes("barter") ||
    msg.includes("almashtir") ||
    msg.includes("variant")
  ) {
    return `Afsuski obmen ko'rib chiqilmaydi, faqat naqdga yoki karta orqali (Click/Payme) sotiladi. Naqdga olsangiz ozgina yaxshi narx qilib beraman.`;
  }

  // 8. To'lov turi / Click / Payme / Naqd / Dollar (Payment methods)
  if (
    msg.includes("click") ||
    msg.includes("payme") ||
    msg.includes("karta") ||
    msg.includes("naqd") ||
    msg.includes("dollar") ||
    msg.includes("perevod")
  ) {
    return `To'lovni istalgan usulda qilsangiz bo'ladi: naqd so'm, Click, Payme yoki bank kartasi orqali. Hech qanday foiz yoki qo'shimcha to'lovsiz.`;
  }

  // 9. Nomer, aloqa, telefon (Phone / Contact)
  if (
    msg.includes("nomer") ||
    msg.includes("raqam") ||
    msg.includes("telefon") ||
    msg.includes("tel") ||
    msg.includes("tg") ||
    msg.includes("telegram") ||
    msg.includes("bog'lan")
  ) {
    return `Mening raqamim: +998 90 123 45 67. Telegram ham shu raqamda ochilgan. Bemalol qo'ng'iroq qilishingiz yoki Telegramdan yozishingiz mumkin!`;
  }

  // 10. Rozilik / Kelishuv / Rahmat (Agreement / Ok / Thanks)
  if (
    msg.includes("rahmat") ||
    msg.includes("boldi") ||
    msg.includes("bo'ldi") ||
    msg.includes("kelishdik") ||
    msg.includes("yaxshi") ||
    msg.includes("ok") ||
    msg.includes("tushundim") ||
    msg.includes("boraman") ||
    msg.includes("olaman")
  ) {
    return `Kelishdik! Sizni kutaman. Yo'lga chiqishdan 15-20 daqiqa oldin xabar berib qo'ysangiz yetarli. Salomat bo'ling! 👍`;
  }

  // 11. Salomlashish (Greetings - specific response)
  if (
    msg.includes("assalom") ||
    msg.includes("salom") ||
    msg.includes("privet") ||
    msg.includes("qalesiz") ||
    msg.includes("salam") ||
    msg.includes("yaxshimisiz") ||
    msg.includes("hormang")
  ) {
    return `Vaalaykum assalom! Katta rahmat, yaxshimisiz? ${prodTitle} bo'yicha qiziqyapsizmi? Barcha savollarga javob berishga tayyorman, marhamat.`;
  }

  // 12. Mahsulot mavjudligi (Availability)
  if (
    msg.includes("bormi") ||
    msg.includes("sotildimi") ||
    msg.includes("mavjud") ||
    msg.includes("turibdimi") ||
    msg.includes("olib ketsam")
  ) {
    return `Ha, ${prodTitle} hali sotilmadi, o'zimizda tayyor turibdi. Kelib ko'rib, yoqsa bemalol olib ketishingiz mumkin.`;
  }

  // 13. Dynamic Contextual Human-like Response based on user input
  if (msg.length > 20) {
    return `Tushundim, savolingiz o'rinli. ${prodTitle} bo'yicha hammasi toza va ishonchli. Keling, batafsil uchrashuvda yoki telefon orqali gaplashamiz: +998 90 123 45 67.`;
  }

  return `Albatta! Sizga ${prodTitle} bo'yicha to'liq ma'lumot berishga tayyorman. Narxi yoki holati bo'yicha qanday savolingiz bor?`;
}

export function useRealtimeChat() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState("chat-sotuvchi");
  const [isReady, setIsReady] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Load chats from LocalStorage or seed with INITIAL_CHATS (only sellers)
  const loadChats = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(CHATS_STORAGE_KEY);
      let finalChats = INITIAL_CHATS;
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only keep seller chats (faqat sotuvchi qoladi)
        const onlySellers = Array.isArray(parsed)
          ? parsed.filter(
              (c) =>
                c.user?.role === "SOTUVCHI" ||
                !c.user?.role ||
                c.user?.name === "Sotuvchi" ||
                c.user?.name?.toLowerCase().includes("sotuvchi")
            )
          : [];
        finalChats = onlySellers.length > 0 ? onlySellers : INITIAL_CHATS;
      }
      setChats(finalChats);
      localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(finalChats));

      const savedActive = localStorage.getItem(ACTIVE_CHAT_KEY);
      const activeExists = finalChats.some((c) => c.id === savedActive);
      if (savedActive && activeExists) {
        setActiveChatId(savedActive);
      } else if (finalChats.length > 0) {
        setActiveChatId(finalChats[0].id);
        localStorage.setItem(ACTIVE_CHAT_KEY, finalChats[0].id);
      }

      setIsReady(true);
    } catch (e) {
      console.error("Local storage error:", e);
      setChats(INITIAL_CHATS);
      setActiveChatId(INITIAL_CHATS[0]?.id || "chat-sotuvchi");
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
  const sendMessage = (chatId, text, sender = "me", autoReply = true) => {
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
      const targetId = chatId || activeChatId || (prev.length > 0 ? prev[0].id : "chat-sotuvchi");
      const exists = prev.some((c) => c.id === targetId);

      let updated;
      if (exists) {
        updated = prev.map((c) => {
          if (c.id === targetId) {
            return {
              ...c,
              lastMessage: text.trim(),
              lastTime: timeString,
              unread: sender === "them" ? (c.unread || 0) + 1 : 0,
              messages: [...(c.messages || []), newMsg],
            };
          }
          return c;
        });
      } else if (prev.length > 0) {
        updated = prev.map((c, i) => {
          if (i === 0) {
            return {
              ...c,
              lastMessage: text.trim(),
              lastTime: timeString,
              unread: sender === "them" ? (c.unread || 0) + 1 : 0,
              messages: [...(c.messages || []), newMsg],
            };
          }
          return c;
        });
      } else {
        updated = [
          {
            ...INITIAL_CHATS[0],
            messages: [...(INITIAL_CHATS[0]?.messages || []), newMsg],
            lastMessage: text.trim(),
            lastTime: timeString,
          },
        ];
      }

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
      }
      return updated;
    });

    // Simulated instant reply from seller if user sent the message (Strictly natural Uzbek)
    if (sender === "me" && autoReply) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const uzbekReply = getUzbekSellerReply(text);
        sendMessage(chatId, uzbekReply, "them", false);
      }, 1200);
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
