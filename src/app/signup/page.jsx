"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Check,
  Camera,
  Upload,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import OAuthButtons from "@/components/OAuthButtons";
import { toast } from "@/components/Toast";

const PRESET_AVATARS = [
  { id: "avatar-1", label: "Biznes", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" },
  { id: "avatar-2", label: "Smart", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
  { id: "avatar-3", label: "Lider", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" },
  { id: "avatar-4", label: "Neo", url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80" },
];

export default function SignupPage() {
  const router = useRouter();
  const { sendSmsCode, completeSignup, isLoggedIn } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [customAvatarPreview, setCustomAvatarPreview] = useState(null);

  const [otpSent, setOtpSent] = useState(false);
  const [activeCode, setActiveCode] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const handleAutoFill = (e) => {
      if (e.detail?.code) {
        setOtpCode(e.detail.code);
        setErrorMsg("");
      }
    };
    window.addEventListener("olx_autofill_otp", handleAutoFill);
    return () => window.removeEventListener("olx_autofill_otp", handleAutoFill);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Rasm hajmi 5MB dan oshmasligi kerak!", "Hajm cheklovi");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomAvatarPreview(reader.result);
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!firstName.trim()) {
      setErrorMsg("Iltimos, ismingizni kiriting!");
      return;
    }
    if (!phoneNumber || phoneNumber.length < 9) {
      setErrorMsg("Iltimos, to'liq telefon raqamingizni kiriting!");
      return;
    }

    const gen = sendSmsCode(phoneNumber);
    setActiveCode(gen);
    setOtpSent(true);
  };

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    if (otpCode === activeCode || (otpCode.length === 4 && /^\d+$/.test(otpCode))) {
      setIsSuccess(true);
      setTimeout(() => {
        completeSignup({
          firstName,
          lastName,
          phone: phoneNumber,
          avatar: customAvatarPreview || avatar,
        });
        router.push("/profile");
      }, 700);
    } else {
      setErrorMsg(`Noto'g'ri kod! Yuqoridagi SMS kodi: ${activeCode || "4 ta raqam"}`);
    }
  };

  return (
    <div className="max-w-[480px] mx-auto px-4 py-10 sm:py-16">
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <Link href="/" className="inline-flex items-center gap-1.5 mb-2">
            <span className="text-3xl font-black text-[#002f34]">olx</span>
            <span className="bg-[#23e5db] text-[#002f34] text-xs font-black uppercase px-2 py-0.5 rounded-full">
              NEO
            </span>
          </Link>
          <h1 className="text-2xl font-black text-[#002f34]">
            Ro&apos;yxatdan o&apos;tish
          </h1>
          <p className="text-xs text-gray-500">
            Profil yarating, fotosuratingizni yuklang va e&apos;lon berishni boshlang
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-50">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <h3 className="font-bold text-base text-[#002f34]">
              Tabriklaymiz! Hisobingiz yaratildi...
            </h3>
          </div>
        ) : !otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            {/* Avatar upload section */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative group">
                <div className="w-22 h-22 rounded-full border-3 border-[#23e5db] shadow-md overflow-hidden bg-gradient-to-tr from-[#002f34] to-[#008f87] text-[#23e5db] flex items-center justify-center">
                  {customAvatarPreview || avatar ? (
                    <img
                      src={customAvatarPreview || avatar}
                      alt="Profil rasmi"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-black uppercase tracking-wider text-white">
                      {((firstName.trim() ? firstName.trim()[0] : "") +
                        (lastName.trim()
                          ? lastName.trim()[0]
                          : firstName.trim().length > 1
                          ? firstName.trim()[1]
                          : "")) || <User className="w-9 h-9 text-white/80" />}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-[#002f34] text-[#23e5db] rounded-full shadow hover:bg-black transition-colors"
                  title="Fotosurat yuklash"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1.5 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200 hover:bg-teal-100 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Kompyuterdan rasm yuklash</span>
                </button>
                {customAvatarPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setAvatar(null);
                      setCustomAvatarPreview(null);
                    }}
                    className="text-[11px] font-bold text-red-500 hover:underline block mt-1.5 mx-auto"
                  >
                    Rasmni o&apos;chirish (Initsialga qaytish)
                  </button>
                )}
              </div>
            </div>

            {/* Name and Surname */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#002f34] block">
                  Ism *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full bg-[#f2f4f5] text-xs font-medium pl-9 pr-3 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#002f34] block">
                  Familiya
                </label>
                <input
                  type="text"
                  placeholder="Familiyangiz"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#f2f4f5] text-xs font-medium px-3.5 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#002f34] block">
                Telefon raqamingiz *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full bg-[#f2f4f5] text-xs font-bold pl-10 pr-4 py-3 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] text-[#002f34]"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 font-semibold bg-red-50 p-2 rounded-xl text-center">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <span>SMS kod olish va davom etish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                completeSignup({
                  firstName: firstName || "Sardor",
                  lastName: lastName || "Alimov",
                  phone: phoneNumber,
                  avatar: customAvatarPreview || avatar,
                });
                router.push("/profile");
              }}
              className="w-full py-3 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors mt-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#008f87]" />
              <span>OneID orqali tezkor ro&apos;yxatdan o&apos;tish</span>
            </button>

            <div className="relative flex items-center justify-center pt-2">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] text-gray-400 uppercase font-bold absolute">
                Ijtimoiy tarmoqlar
              </span>
            </div>

            <OAuthButtons onSuccess={() => router.push("/profile")} />
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2 text-center">
              <label className="text-xs font-bold text-[#002f34] block">
                SMS tasdiqlash kodini kiriting
              </label>
              <p className="text-xs text-gray-500">
                <span className="font-bold text-[#002f34]">{phoneNumber}</span> raqamiga yuborilgan 4 xonali kod
              </p>

              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-2 text-xs flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Ekranning yuqori qismidagi SMS xabarnomadagi kodni kiriting</span>
              </div>

              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => {
                  setOtpCode(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="____"
                autoFocus
                required
                className="w-44 mx-auto text-center tracking-[12px] font-mono font-black text-2xl bg-[#f2f4f5] py-2.5 rounded-2xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] shadow-inner text-[#002f34]"
              />

              {activeCode && (
                <button
                  type="button"
                  onClick={() => setOtpCode(activeCode)}
                  className="text-[11px] text-teal-700 font-bold hover:underline block mx-auto"
                >
                  Kodni avtomatik to&apos;ldirish ({activeCode})
                </button>
              )}
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 font-semibold bg-red-50 p-2 rounded-xl text-center">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#23e5db] hover:bg-[#1cd1c7] active:scale-95 text-[#002f34] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <span>Tasdiqlash va profilni yaratish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                Raqamni o&apos;zgartirish
              </button>

              <button
                type="button"
                onClick={() => {
                  const gen = sendSmsCode(phoneNumber);
                  setActiveCode(gen);
                }}
                className="text-teal-700 font-bold hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Qayta yuborish</span>
              </button>
            </div>
          </form>
        )}

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Hisobingiz bormi?{" "}
          <Link href="/login" className="font-bold text-teal-800 hover:underline">
            Kirish
          </Link>
        </div>
      </div>
    </div>
  );
}
