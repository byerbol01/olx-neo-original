"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronRight,
  Upload,
  CheckCircle,
  Truck,
  MapPin,
  Phone,
  MessageSquare,
  ArrowRight,
  X,
  Eye,
  Sparkles,
  Info,
  ShieldCheck,
  Star,
  Check,
  Loader2,
} from "lucide-react";
import { createProduct, uploadImageFile } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/Toast";

const ALL_CATEGORIES = [
  "Avto",
  "Ko'chmas mulk",
  "Elektronika",
  "Ish o'rinlari",
  "Xizmatlar",
  "Moda va stil",
  "Bolalar dunyosi",
  "Uy va bog'",
];

const CATEGORY_DEFAULT_IMAGES = {
  Avto: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
  "Ko'chmas mulk": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  Elektronika: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  "Ish o'rinlari": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  Xizmatlar: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  "Moda va stil": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  "Bolalar dunyosi": "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
  "Uy va bog'": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
};

export default function CreateAdPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth() || {};

  const initialCategory = searchParams.get("category") || searchParams.get("cat") || "Avto";

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    const catFromUrl = searchParams.get("category") || searchParams.get("cat");
    if (catFromUrl) {
      setCategory(catFromUrl);
    }
  }, [searchParams]);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [safeDeal, setSafeDeal] = useState(true);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [location, setLocation] = useState("");
  const [contactMethod, setContactMethod] = useState("both");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [contactPerson, setContactPerson] = useState(user?.name || "");
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]);

  // Sync user details when logged in
  useEffect(() => {
    if (user) {
      if (user.phone) setPhoneNumber((prev) => prev || user.phone);
      if (user.name) setContactPerson((prev) => prev || user.name);
    }
  }, [user]);

  const handleImageUpload = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        setIsUploading(true);
        const uploadedUrl = await uploadImageFile(file);
        if (uploadedUrl && images.length < 8) {
          setImages((prev) => [...prev, uploadedUrl]);
        }
      } catch (err) {
        console.warn("Backend yuklashda xatolik, lokal preview qo'llaniladi:", err);
        const localUrl = URL.createObjectURL(file);
        setImages((prev) => [...prev, localUrl]);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const getCategoryTitlePlaceholder = (cat) => {
    switch (cat) {
      case "Avto":
        return "Masalan: Chevrolet Cobalt 4-pozitsiya Style AT 2024";
      case "Ko'chmas mulk":
        return "Masalan: 3-xonali shinam kvartira, Chilonzor";
      case "Elektronika":
        return "Masalan: iPhone 15 Pro Max 256GB";
      case "Ish o'rinlari":
        return "Masalan: Sotuv bo'yicha yetakchi mutaxassis";
      case "Xizmatlar":
        return "Masalan: Konditsioner o'rnatish va ta'mirlash";
      case "Moda va stil":
        return "Masalan: Erkaklar qishki kurtkasi (ZARA original)";
      case "Bolalar dunyosi":
        return "Masalan: Bolalar kolyaskasi 3 in 1 (yangi)";
      case "Uy va bog'":
        return "Masalan: Qulay yumshoq mebel to'plami";
      default:
        return "Masalan: Mahsulot yoki xizmat nomi...";
    }
  };

  const getCategoryPricePlaceholder = (cat) => {
    switch (cat) {
      case "Avto":
        return "Masalan: 145 000 000";
      case "Ko'chmas mulk":
        return "Masalan: 650 000 000";
      case "Elektronika":
        return "Masalan: 12 500 000";
      case "Ish o'rinlari":
        return "Masalan: 6 000 000";
      case "Xizmatlar":
        return "Masalan: 350 000";
      case "Moda va stil":
        return "Masalan: 450 000";
      case "Bolalar dunyosi":
        return "Masalan: 850 000";
      case "Uy va bog'":
        return "Masalan: 3 200 000";
      default:
        return "Masalan: 500 000";
    }
  };

  const handleAiTitle = () => {
    if (category === "Avto") {
      setTitle("Chevrolet Cobalt 4-pozitsiya Style AT 2024 (Ideal holatda)");
    } else if (category === "Ko'chmas mulk") {
      setTitle("3-xonali shinam xonadon novostroyka, barcha jihozlari bilan");
    } else if (category === "Ish o'rinlari") {
      setTitle("Katta sotuv menejeri (B2B, oylik + bonuslar)");
    } else if (category === "Xizmatlar") {
      setTitle("Kvartira va uylarni kalit topshirishgacha sifatli ta'mirlash");
    } else {
      setTitle("iPhone 15 Pro Max 256GB Natural Titanium (Yangi qadoqda)");
    }
  };

  const handleAiDescription = () => {
    if (category === "Avto") {
      setDescription(
        "Avtomobil a'lo holatda, urilmagan, kraska toza. Zavod holatida, to'liq texnik ko'rikdan o'tgan. Yoqilg'i tejamkor, salon toza va chekilmagan. Hujjatlari joyida, sotuvga tayyor."
      );
    } else if (category === "Ko'chmas mulk") {
      setDescription(
        "Shinam va yorug' xonadon, sifatli yevroremont qilingan. Barcha qulayliklar mavjud, yaqin atrofda maktab, bog'cha, bekat va do'konlar joylashgan. Hujjatlari toza, ipotekaga ham beriladi."
      );
    } else {
      setDescription(
        "Mahsulot ideal holatda, to'liq komplektatsiyada. Barcha funksiyalari nuqsonsiz ishlaydi, hech qanday tirnalish yoki nosozligi yo'q. Qolgan barcha savollar bo'yicha telefon orqali bog'lanishingiz mumkin."
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !price) {
      toast.warning(
        "Iltimos, sarlavha va narxni to'liq kiriting!",
        "Ma'lumot yetarli emas"
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const cleanPrice = String(price).replace(/\s/g, "");
      const cleanCategory = category.split(" > ")[0] || "Avto";
      const defaultImg =
        CATEGORY_DEFAULT_IMAGES[cleanCategory] ||
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80";

      const finalImages = images.length > 0 ? images : [defaultImg];

      const productPayload = {
        title: title.trim(),
        price: Number(cleanPrice) || 0,
        category: cleanCategory,
        location: location.trim() || "Toshkent shahri",
        description:
          description.trim() ||
          `${title.trim()}. Mahsulot a'lo holatda, batafsil ma'lumot olish uchun bog'laning.`,
        images: finalImages,
        image: finalImages[0],
        negotiable: isNegotiable,
        badge: selectedPlan === "vip" ? "VIP" : selectedPlan === "top" ? "TOP" : "YANGI",
        sellerName: contactPerson.trim() || "Foydalanuvchi",
        phoneNumber: phoneNumber.trim() || "+998 90 123 45 67",
        seller: {
          name: contactPerson.trim() || "Foydalanuvchi",
          phone: phoneNumber.trim() || "+998 90 123 45 67",
          avatar: (contactPerson.trim() || "FO").slice(0, 2).toUpperCase(),
          verified: true,
          rating: 5.0,
          deals: "1 ta yangi e'lon",
        },
      };

      const res = await createProduct(productPayload);
      toast.success(
        "E'loningiz backend bazasiga muvaffaqiyatli saqlandi!",
        "E'lon yaratildi"
      );

      if (res?.data?.id) {
        router.push(`/product/${res.data.id}`);
      } else {
        router.push("/catalog");
      }
    } catch (err) {
      toast.error("E'lon qo'shishda xatolik: " + err.message, "Xatolik");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#002f34] transition-colors">
          Bosh sahifa
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#002f34]">E&apos;lon berish</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#002f34] tracking-tight">
          E&apos;lon berish
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          E&apos;loningizni joylashtiring va tez fursatda xaridor toping
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ================= 1. ASOSIY MA'LUMOTLAR ================= */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-4">
          <h2 className="text-base font-black text-[#002f34] pb-2 border-b border-gray-100">
            1. Asosiy ma&apos;lumotlar
          </h2>

          {/* Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#002f34]">
                E&apos;lon sarlavhasi *
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAiTitle}
                  className="text-teal-700 hover:underline font-bold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  <span>AI taklifi</span>
                </button>
                <span className="text-gray-400 font-mono text-[11px]">
                  {title.length}/70
                </span>
              </div>
            </div>
            <input
              type="text"
              maxLength={70}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={getCategoryTitlePlaceholder(category)}
              required
              className="w-full bg-[#f2f4f5] text-xs sm:text-sm font-medium px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border focus:border-[#23e5db] text-[#002f34]"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#002f34] block">
              Rukn (Kategoriya) *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full bg-[#f2f4f5] text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border focus:border-[#23e5db] text-[#002f34] cursor-pointer"
            >
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ================= 2. FOTOSURATLAR ================= */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h2 className="text-base font-black text-[#002f34]">
              2. Fotosuratlar ({images.length}/8)
            </h2>
            <span className="text-xs text-gray-400 font-medium">
              Birinchi rasm asosiy bo&apos;ladi
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 group"
              >
                <img
                  src={img}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 0 && (
                  <span className="absolute top-2 left-2 bg-[#002f34] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
                    Asosiy rasm
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {images.length < 8 && (
              <label className="aspect-[4/3] rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#23e5db] hover:bg-teal-50/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors text-center p-3">
                {isUploading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin text-[#008f87]" />
                    <span className="text-[11px] font-bold text-[#008f87]">
                      Yuklanmoqda...
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs font-bold text-[#002f34]">
                      + Rasm qo&apos;shish
                    </span>
                    <span className="text-[10px] text-gray-400">JPG, PNG (5MB gacha)</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* ================= 3. TAVSIF ================= */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h2 className="text-base font-black text-[#002f34]">
              3. Tavsif
            </h2>
            <button
              type="button"
              onClick={handleAiDescription}
              className="text-teal-700 hover:underline font-bold text-xs flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span>AI yordamida yozish</span>
            </button>
          </div>

          <div className="space-y-1">
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mahsulot haqida batafsil ma'lumot bering..."
              required
              className="w-full bg-[#f2f4f5] text-xs sm:text-sm font-medium p-4 rounded-2xl outline-none focus:bg-white focus:border focus:border-[#23e5db] text-[#002f34] resize-none"
            ></textarea>
            <div className="text-right text-[11px] text-gray-400 font-mono">
              {description.length}/4000
            </div>
          </div>
        </div>

        {/* ================= 4. NARX VA TO'LOV ================= */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-4">
          <h2 className="text-base font-black text-[#002f34] pb-2 border-b border-gray-100">
            4. Narx va parametrlar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#002f34] block">
                Narxi (so&apos;m) *
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={getCategoryPricePlaceholder(category)}
                required
                className="w-full bg-[#f2f4f5] text-sm font-bold px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border focus:border-[#23e5db] text-[#002f34]"
              />
            </div>

            <div className="flex items-center sm:pt-6">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold text-[#002f34]">
                <input
                  type="checkbox"
                  checked={isNegotiable}
                  onChange={(e) => setIsNegotiable(e.target.checked)}
                  className="w-4 h-4 rounded text-[#002f34] accent-[#002f34]"
                />
                <span>Kelishiladi (Torg bor)</span>
              </label>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-teal-50/50 border border-teal-100">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                <div>
                  <span className="text-xs font-bold text-[#002f34] block">
                    OLX Xavfsiz bitimni yoqish
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Xaridor tovar olguncha mablag&apos; xavfsiz saqlanadi
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSafeDeal(!safeDeal)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  safeDeal ? "bg-[#23e5db]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    safeDeal ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-500" />
                <div>
                  <span className="text-xs font-bold text-[#002f34] block">
                    Bepul yetkazib berish mavjud
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Kuryer orqali xaridor manziliga yetkazish
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFreeDelivery(!freeDelivery)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  freeDelivery ? "bg-[#23e5db]" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                    freeDelivery ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>

        {/* ================= 5. ALOQA VA JOYLASHUV ================= */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-4">
          <h2 className="text-base font-black text-[#002f34] pb-2 border-b border-gray-100">
            5. Aloqa ma&apos;lumotlari va joylashuv
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#002f34] block">
                Joylashuv *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full bg-[#f2f4f5] text-xs font-medium pl-10 pr-4 py-3 rounded-2xl outline-none focus:bg-white focus:border focus:border-[#23e5db]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#002f34] block">
                Telefon raqamingiz *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full bg-[#f2f4f5] text-xs font-bold pl-10 pr-4 py-3 rounded-2xl outline-none focus:bg-white focus:border focus:border-[#23e5db]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#002f34] block">
                Muloqot uchun ism
              </label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full bg-[#f2f4f5] text-xs font-medium px-4 py-3 rounded-2xl outline-none focus:bg-white focus:border focus:border-[#23e5db]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#002f34] block">
                Aloqa usuli
              </label>
              <div className="flex gap-2">
                {[
                  { id: "both", label: "Ikkalasi ham" },
                  { id: "phone", label: "Faqat qo'ng'iroq" },
                  { id: "chat", label: "Faqat xabar" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setContactMethod(m.id)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      contactMethod === m.id
                        ? "bg-[#002f34] text-white border-[#002f34]"
                        : "bg-[#f2f4f5] text-gray-700 border-transparent hover:bg-gray-200"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= 6. TARIFLAR / PROMOTION ================= */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h2 className="text-base font-black text-[#002f34]">
              6. E&apos;lonni tezroq sotish (Tariflar)
            </h2>
            <span className="text-xs text-teal-700 font-bold">5x ko&apos;proq xaridor</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Standart */}
            <div
              onClick={() => setSelectedPlan("standard")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPlan === "standard"
                  ? "border-[#002f34] bg-gray-50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#002f34]">Oddiy</span>
                <span className="font-bold text-xs text-gray-500">Bepul</span>
              </div>
              <p className="text-[11px] text-gray-500">
                30 kun davomida standart ro&apos;yxatda joylashadi.
              </p>
            </div>

            {/* TOP */}
            <div
              onClick={() => setSelectedPlan("top")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                selectedPlan === "top"
                  ? "border-[#23e5db] bg-teal-50/40 shadow-sm"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-[#002f34]">TOP E&apos;lon</span>
                <span className="font-bold text-xs text-[#008f87]">25 000 so&apos;m</span>
              </div>
              <p className="text-[11px] text-gray-500">
                7 kun davomida qidiruv natijalarining yuqori qismida ko&apos;rsatiladi.
              </p>
            </div>

            {/* VIP */}
            <div
              onClick={() => setSelectedPlan("vip")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden ${
                selectedPlan === "vip"
                  ? "border-[#ffce32] bg-[#fff9e6] shadow-sm ring-2 ring-[#ffce32]/30"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-black text-xs text-[#002f34] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-[#ffce32] text-[#ffce32]" />
                  <span>VIP E&apos;lon</span>
                </span>
                <span className="font-black text-xs text-[#002f34]">55 000 so&apos;m</span>
              </div>
              <p className="text-[11px] text-gray-600">
                Bosh sahifada va VIP blokda chiqadi. Maksimal ko&apos;rishlar soni kafolatlanadi.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <Link
            href="/product/macbook-pro-16"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-gray-300 hover:bg-gray-100 text-xs font-bold text-[#002f34] text-center transition-colors"
          >
            Oldindan ko&apos;rish
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Backendga saqlanmoqda...</span>
              </>
            ) : (
              <>
                <span>E&apos;lonni joylashtirish</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
