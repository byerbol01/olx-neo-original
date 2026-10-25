"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Share2,
  Heart,
  Maximize2,
  Camera,
  Clock,
  Eye,
  Sliders,
  FileText,
  ShieldCheck,
  Truck,
  RotateCw,
  Phone,
  MessageSquare,
  Flag,
  CheckCircle,
  MapPin,
  Compass,
  ArrowRight,
  X,
  Navigation,
  Loader2,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import SafeDealBanner from "@/components/SafeDealBanner";
import { getProductById, getProducts, sendBackendMessage } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/Toast";
import { CHATS_STORAGE_KEY, ACTIVE_CHAT_KEY } from "@/lib/realtimeChat";

const CATEGORY_DEFAULT_IMAGES = {
  avto: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
  transport: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
  "ko'chmas mulk": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  re: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  elektronika: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
  noutbuklar: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
  "ish o'rinlari": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  xizmatlar: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  "moda va stil": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  "bolalar dunyosi": "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
  "uy va bog'": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
};

const getCategoryFallback = (cat) => {
  const clean = (cat || "").toLowerCase().replace(/['`ʻ’‘]/g, "'").trim();
  for (const [key, url] of Object.entries(CATEGORY_DEFAULT_IMAGES)) {
    if (clean.includes(key) || key.includes(clean)) return url;
  }
  return "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80";
};

const formatLocation = (loc) => {
  if (!loc) return "Toshkent shahri";
  if (typeof loc === "string") return loc;
  if (typeof loc === "object") {
    return [loc.city, loc.district, loc.metro].filter(Boolean).join(", ") || "Toshkent shahri";
  }
  return String(loc);
};

const renderSpecValue = (val) => {
  if (typeof val === "object" && val !== null) {
    return [val.city, val.district, val.metro].filter(Boolean).join(", ") || JSON.stringify(val);
  }
  return String(val ?? "");
};

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id || "1";
  const { user } = useAuth() || {};

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [fullscreenModal, setFullscreenModal] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  const handleStartChat = async () => {
    if (!product) return;
    try {
      const chatId = `chat-prod-${product.id}`;
      const sellerName = product.seller?.name || "Sotuvchi";
      const sellerPhone = product.seller?.phone || "+998 90 123 45 67";
      const prodTitle = product.title;
      const prodPrice = product.priceFormatted || `${product.price} so'm`;
      const prodImage = product.images?.[0] || product.image;

      // 1. Customer sends: "Assalomu alaykum"
      await sendBackendMessage({
        chatId,
        productId: product.id,
        productTitle: prodTitle,
        sender: "user",
        text: "Assalomu alaykum",
        user: { name: user?.name || "Mijoz", phone: user?.phone || "+998 90 123 45 67" },
        seller: { name: sellerName, phone: sellerPhone },
      });

      // 2. Admin / Seller auto responds: "Vaalaykum assalom, nima xizmat?"
      await sendBackendMessage({
        chatId,
        productId: product.id,
        productTitle: prodTitle,
        sender: "seller",
        text: "Vaalaykum assalom, nima xizmat?",
        user: { name: user?.name || "Mijoz", phone: user?.phone || "+998 90 123 45 67" },
        seller: { name: sellerName, phone: sellerPhone },
      });

      // 3. Local sync for instant responsive feel
      if (typeof window !== "undefined") {
        const existingRaw = localStorage.getItem(CHATS_STORAGE_KEY);
        let allChats = existingRaw ? JSON.parse(existingRaw) : [];

        const newChatObj = {
          id: chatId,
          user: {
            name: sellerName,
            phone: sellerPhone,
            avatar:
              product.seller?.avatar && product.seller.avatar.startsWith("http")
                ? product.seller.avatar
                : null,
            role: "SOTUVCHI",
            online: true,
            lastSeen: "Hozir onlayn",
          },
          item: {
            id: String(product.id),
            title: prodTitle,
            shortTitle: prodTitle.substring(0, 32) + "...",
            price: prodPrice,
            image: prodImage,
          },
          unread: 0,
          lastTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          lastMessage: "Vaalaykum assalom, nima xizmat?",
          messages: [
            {
              id: "msg-cust-" + Date.now(),
              sender: "me",
              text: "Assalomu alaykum",
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              status: "sent",
            },
            {
              id: "msg-adm-" + (Date.now() + 1),
              sender: "them",
              text: "Vaalaykum assalom, nima xizmat?",
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              status: "received",
            },
          ],
          quickReplies: [
            "Narxi kelishiladimi?",
            "Hozir olib ketsam bo'ladimi?",
            "Dostavka bormi?",
            "Manzil qayerda?",
          ],
        };

        allChats = [newChatObj, ...allChats.filter((c) => c.id !== chatId)];
        localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(allChats));
        localStorage.setItem(ACTIVE_CHAT_KEY, chatId);
      }

      router.push(`/messages?chatId=${chatId}`);
    } catch (err) {
      console.warn("handleStartChat error:", err);
      router.push("/messages");
    }
  };

  // Fetch product from backend
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        if (data && isMounted) {
          const locStr = formatLocation(data.location);
          const fallbackImg = getCategoryFallback(data.category);
          const rawImages =
            Array.isArray(data.images) && data.images.length > 0
              ? data.images
              : data.image
              ? [data.image]
              : [fallbackImg];

          const validImages = rawImages.map((img) =>
            img && !img.includes("loremflickr.com") ? img : fallbackImg
          );

          const normalized = {
            id: String(data.id || productId),
            title: data.title || "E'lon",
            subTitle: data.subTitle || data.title,
            category: data.category || "Umumiy",
            price: Number(data.price) || 0,
            priceFormatted:
              data.priceFormatted ||
              `${Number(data.price || 0).toLocaleString("ru-RU").replace(/,/g, " ")} so'm`,
            priceUsd:
              data.priceUsd ||
              `Taqriban $${Math.round((Number(data.price) || 0) / 12700)} USD`,
            location: locStr,
            date: data.date || "Bugun",
            badge: data.badge || data.tags || null,
            negotiable: data.negotiable !== false,
            condition: data.condition || "A'lo holatda",
            views: data.views || 45,
            favorites: data.favorites || 12,
            images: validImages,
            specs:
              Array.isArray(data.specs) && data.specs.length > 0
                ? data.specs.map((s) => ({ ...s, value: renderSpecValue(s.value) }))
                : [
                    { label: "Holati", value: data.condition || "A'lo holatda" },
                    { label: "Kategoriya", value: data.category || "Umumiy" },
                    { label: "Joylashuv", value: locStr },
                  ],
            description: Array.isArray(data.description)
              ? data.description
              : [
                  data.description ||
                    `${data.title}. Mahsulot ideal holatda, batafsil ma'lumot telefon orqali.`,
                ],
            seller: {
              phone: data.seller?.phone || data.phoneNumber || "+998 90 123 45 67",
              name: data.seller?.name || data.sellerName || "Sotuvchi",
              avatar: data.seller?.avatar || "ST",
              verified: true,
              rating: data.seller?.rating || 4.9,
              deals: data.seller?.deals || "30+ bitim",
            },
          };
          setProduct(normalized);
        }

        // Similar products from same category
        const all = await getProducts();
        if (all && isMounted) {
          let others = all.filter(
            (p) => String(p.id) !== String(productId) && p.category === data?.category
          );
          if (others.length === 0) {
            others = all.filter((p) => String(p.id) !== String(productId));
          }
          setSimilarProducts(others.slice(0, 4));
        }
      } catch (err) {
        console.error("Single product yuklashda xatolik:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator?.share) {
        navigator.share({
          title: product?.title || "OLX Neo",
          url: window.location.href,
        });
      } else if (navigator?.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        toast.success("E'lon havolasi muvaffaqiyatli nusxalandi!", "Nusxalandi");
      }
    }
  };

  const fallbackImg = getCategoryFallback(product?.category);
  const imagesList =
    Array.isArray(product?.images) && product.images.length > 0
      ? product.images
      : [product?.image || fallbackImg];

  if (loading && !product) {
    return (
      <div className="max-w-[1360px] mx-auto px-4 py-24 flex flex-col items-center justify-center gap-4 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#008f87]" />
        <p className="text-sm font-bold text-[#002f34]">
          E&apos;lon ma&apos;lumotlari yuklanmoqda...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1360px] mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-[#002f34]">E&apos;lon topilmadi</h2>
        <p className="text-xs text-gray-500">Ushbu e&apos;lon o&apos;chirilgan yoki mavjud emas.</p>
        <Link
          href="/catalog"
          className="inline-block px-5 py-2.5 bg-[#23e5db] text-[#002f34] font-bold text-xs rounded-xl hover:bg-[#1cd1c7] transition-all"
        >
          Katalogga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6">
      {/* 1. Breadcrumbs & Meta header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-[#002f34] transition-colors">
            Bosh sahifa
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/catalog" className="hover:text-[#002f34] transition-colors">
            {product.category || "Katalog"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#002f34] truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <span className="bg-[#23e5db]/20 text-[#008f87] px-2.5 py-1 rounded-md font-mono text-[11px] font-bold">
            ID: {product.id}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md border border-gray-200 hover:border-gray-300 text-[#002f34] font-semibold text-xs transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Ulashish</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="py-2 flex items-center justify-center gap-2 text-xs font-semibold text-[#008f87]">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Ma&apos;lumotlar yangilanmoqda...</span>
        </div>
      )}

      {/* 2. Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* A. Gallery */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-4 sm:p-5 shadow-sm space-y-3">
            {/* Main large photo */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100 group">
              <img
                src={imagesList[selectedImageIndex] || imagesList[0] || fallbackImg}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = fallbackImg;
                }}
              />

              {/* Top Badges */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                <span className="flex items-center gap-1 bg-[#23e5db] text-[#002f34] text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-sm">
                  <CheckCircle className="w-3 h-3" />
                  {product.badge || "YANGI"}
                </span>
                {product.negotiable && (
                  <span className="flex items-center gap-1 bg-[#ffce32] text-[#002f34] text-xs font-black uppercase px-2.5 py-1 rounded-lg shadow-sm">
                    Kelishiladi
                  </span>
                )}
              </div>

              {/* Action buttons top-right */}
              <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-all active:scale-90"
                  aria-label="Sevimlilarga qo'shish"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFavorite ? "fill-[#ff5636] text-[#ff5636]" : "text-gray-700 hover:text-[#ff5636]"
                    }`}
                  />
                </button>
                <button
                  onClick={() => setFullscreenModal(true)}
                  className="w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-all text-gray-700 hover:text-[#002f34]"
                  aria-label="To'liq ekranda ko'rish"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Photos count pill */}
              <div className="absolute bottom-3.5 left-3.5 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium">
                <Camera className="w-3.5 h-3.5" />
                <span>
                  {selectedImageIndex + 1} / {imagesList.length} fotosurat
                </span>
              </div>
            </div>

            {/* Thumbnails row */}
            {imagesList.length > 1 && (
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-[#23e5db] ring-2 ring-[#23e5db]/30 shadow-xs"
                        : "border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Rasm ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = fallbackImg;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* B. Title & Meta banner */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-gray-400">
                {product.category || "Umumiy"}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#002f34] tracking-tight leading-snug">
                {product.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {product.date || "Bugun"}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-gray-400" />
                {product.views || 1} ko&apos;rishlar
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                {formatLocation(product.location)}
              </span>
            </div>
          </div>

          {/* C. Specs Grid */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <Sliders className="w-4 h-4 text-[#002f34]" />
              <h2 className="text-base font-black text-[#002f34]">
                Xususiyatlari va parametrlari
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {product.specs?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-xs sm:text-sm p-3 rounded-xl bg-gray-50/70 border border-gray-100"
                >
                  <span className="text-gray-500 font-medium">{item.label}</span>
                  <span className="font-bold text-[#002f34] text-right">
                    {renderSpecValue(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* D. Description */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <FileText className="w-4 h-4 text-[#002f34]" />
              <h2 className="text-base font-black text-[#002f34]">
                Tavsif va shartlar
              </h2>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
              {product.description?.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <div className="flex flex-wrap items-center gap-3 pt-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Truck className="w-3.5 h-3.5 text-[#23e5db]" />
                  <span>O&apos;zbekiston bo&apos;ylab yetkazish</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008f87]" />
                  <span>Xavfsiz to&apos;lov tizimi</span>
                </div>
              </div>
            </div>
          </div>

          {/* E. Similar Offers */}
          {similarProducts.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-[#002f34] tracking-tight">
                    Boshqa tavsiya etilgan takliflar
                  </h2>
                  <p className="text-xs text-gray-500">
                    O&apos;xshash narxdagi sifatli e&apos;lonlar
                  </p>
                </div>
                <Link
                  href="/catalog"
                  className="flex items-center gap-1 text-xs font-bold text-[#002f34] hover:text-[#008f87] transition-colors"
                >
                  <span>Barchasini ko&apos;rish</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {similarProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    priceFormatted={item.priceFormatted}
                    location={item.location}
                    date={item.date}
                    badge={item.badge}
                    image={item.images?.[0] || item.image}
                    href={`/product/${item.id}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT STICKY SIDEBAR ================= */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-20">
          {/* 1. Price Card */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                NARXI
              </span>
              <span className="bg-teal-50 text-teal-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                {product.negotiable ? "Narx kelishiladi" : "Qat'iy narx"}
              </span>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#002f34] tracking-tight">
                {product.priceFormatted}
              </div>
              <div className="text-xs text-gray-400 font-medium mt-0.5">
                {product.priceUsd}
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => setShowPhone(!showPhone)}
                className="w-full flex items-center justify-center gap-2 bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-black text-sm sm:text-base py-3.5 rounded-2xl shadow-sm transition-all"
              >
                <Phone className="w-5 h-5 stroke-[2.5]" />
                <span>
                  {showPhone ? product.seller?.phone || "+998 90 123 45 67" : "Telefon raqamini ko'rish"}
                </span>
              </button>

              <button
                onClick={handleStartChat}
                className="w-full flex items-center justify-center gap-2 bg-[#23e5db] hover:bg-[#1cd1c7] active:scale-95 text-[#002f34] font-black text-sm sm:text-base py-3.5 rounded-2xl shadow-sm transition-all"
              >
                <MessageSquare className="w-5 h-5 stroke-[2.5]" />
                <span>Xabar yozish</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-600">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center gap-1.5 hover:text-[#ff5636] font-medium transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite ? "fill-[#ff5636] text-[#ff5636]" : "text-gray-400"
                  }`}
                />
                <span>Sevimlilarga qo&apos;shish</span>
              </button>

              <button className="flex items-center gap-1.5 hover:text-red-500 font-medium transition-colors">
                <Flag className="w-4 h-4 text-gray-400" />
                <span>Shikoyat qilish</span>
              </button>
            </div>
          </div>

          {/* 2. Seller Card */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                {product.seller?.avatar &&
                (product.seller.avatar.startsWith("http") ||
                  product.seller.avatar.startsWith("/") ||
                  product.seller.avatar.startsWith("data:image")) ? (
                  <img
                    src={product.seller.avatar}
                    alt={product.seller?.name || "Sotuvchi"}
                    className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-gray-100"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#002f34] to-[#008f87] text-white flex items-center justify-center text-lg font-black shrink-0 shadow-xs">
                    {product.seller?.avatar ||
                      (product.seller?.name
                        ? product.seller.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : "SO")}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-black text-[#002f34]">
                    {product.seller?.name || "Sotuvchi"}
                  </h3>
                  <CheckCircle className="w-4 h-4 text-[#23e5db]" />
                </div>
                <div className="text-[11px] text-gray-400">
                  {product.seller?.since || "OLX faol foydalanuvchisi"}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-2">
              <div className="flex items-center justify-between">
                <span>Muvaffaqiyatli bitimlar:</span>
                <span className="font-bold text-[#002f34]">
                  {product.seller?.deals || "30+ bitim"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Reyting:</span>
                <span className="font-bold text-amber-500">★ 4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
