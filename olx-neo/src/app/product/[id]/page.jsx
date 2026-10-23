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
import { getProductById, getProducts } from "@/lib/api";
import { CURRENT_PRODUCT } from "@/data/mockData";

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

  const [product, setProduct] = useState(() => ({
    ...CURRENT_PRODUCT,
    location: formatLocation(CURRENT_PRODUCT.location),
  }));
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [fullscreenModal, setFullscreenModal] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  // Fetch product from backend
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        if (data && isMounted) {
          const locStr = formatLocation(data.location || CURRENT_PRODUCT.location);
          const normalized = {
            ...CURRENT_PRODUCT,
            ...data,
            location: locStr,
            images:
              Array.isArray(data.images) && data.images.length > 0
                ? data.images
                : [data.image || CURRENT_PRODUCT.images[0]],
            specs:
              Array.isArray(data.specs) && data.specs.length > 0
                ? data.specs.map((s) => ({ ...s, value: renderSpecValue(s.value) }))
                : [
                    { label: "Holati", value: data.condition || "Yangi" },
                    { label: "Kategoriya", value: data.category || "Umumiy" },
                    { label: "Joylashuv", value: locStr },
                  ],
            description: Array.isArray(data.description)
              ? data.description
              : [data.description || "Batafsil ma'lumot berilmagan."],
            seller: {
              ...CURRENT_PRODUCT.seller,
              ...(data.seller || {}),
              phone: data.seller?.phone || data.phoneNumber || "+998 90 123 45 67",
              name: data.seller?.name || data.sellerName || "Aziz Rahimov",
            },
          };
          setProduct(normalized);
        }

        // Similar products
        const all = await getProducts();
        if (all && isMounted) {
          const others = all.filter((p) => String(p.id) !== String(productId)).slice(0, 4);
          setSimilarProducts(others);
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
          title: product.title,
          url: window.location.href,
        });
      } else if (navigator?.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        alert("Havola nusxalandi!");
      }
    }
  };

  const imagesList = product.images && product.images.length > 0
    ? product.images
    : [product.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85"];

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
        <div className="py-6 flex items-center justify-center gap-2 text-xs font-semibold text-[#008f87]">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Backend ma&apos;lumotlari yangilanmoqda...</span>
        </div>
      )}

      {/* 2. Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* A. Gallery */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-4 sm:p-5 shadow-sm space-y-3">
            {/* Main large photo */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-900 group">
              <img
                src={imagesList[selectedImageIndex] || imagesList[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-300"
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
                onClick={() => router.push("/messages")}
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
                <div className="w-12 h-12 rounded-2xl bg-[#002f34] text-white flex items-center justify-center text-lg font-black shrink-0">
                  {product.seller?.avatar || "SO"}
                </div>
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
