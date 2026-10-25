"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Phone,
  User,
  ArrowRight,
  ShieldCheck,
  Check,
  Camera,
  Upload,
  Sparkles,
  RefreshCw,
  Lock,
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

export default function AuthModal({ isOpen, onClose, initialTab = "login" }) {
  const { sendSmsCode, completeLogin, completeSignup } = useAuth();

  const [tab, setTab] = useState(initialTab);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [customAvatarPreview, setCustomAvatarPreview] = useState(null);

  const [otpSent, setOtpSent] = useState(false);
  const [activeCode, setActiveCode] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef(null);

  // Sync tab if initialTab changes
  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  // Listen for SMS autofill event
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

  if (!isOpen) return null;

  // Handle image upload from computer
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

  // Step 1: Send SMS
  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!phoneNumber || phoneNumber.length < 9) {
      setErrorMsg("Iltimos, to'liq telefon raqamingizni kiriting!");
      return;
    }

    if (tab === "signup" && !firstName.trim()) {
      setErrorMsg("Iltimos, ismingizni kiriting!");
      return;
    }

    // Trigger realistic SMS notification banner at the top
    const generated = sendSmsCode(phoneNumber);
    setActiveCode(generated);
    setOtpSent(true);
  };

  // Step 2: Verify OTP
  const handleVerify = (e) => {
    if (e) e.preventDefault();
    setErrorMsg("");

    // Accept exact SMS code or fallback if 4 digits entered
    if (otpCode === activeCode || (otpCode.length === 4 && /^\d+$/.test(otpCode))) {
      setIsSuccess(true);

      setTimeout(() => {
        if (tab === "signup") {
          completeSignup({
            firstName: firstName || "Foydalanuvchi",
            lastName: lastName || "",
            phone: phoneNumber,
            avatar: customAvatarPreview || avatar,
          });
        } else {
          completeLogin(phoneNumber, {
            name: firstName ? `${firstName} ${lastName}`.trim() : undefined,
          });
        }

        setIsSuccess(false);
        setOtpSent(false);
        setOtpCode("");
        onClose();
      }, 700);
    } else {
      setErrorMsg(`Noto'g'ri kod! Yuqorida ko'ringan kodni kiriting (${activeCode || "4 xonali kod"})`);
    }
  };

  // Fast Demo Login for stage presentations
  const handleQuickDemo = () => {
    setIsSuccess(true);
    setTimeout(() => {
      completeLogin("+998 90 777 00 11", {
        name: "Sardor Alimov",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        walletBalance: 450000,
        isVerified: true,
      });
      setIsSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative border border-gray-100 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand header */}
        <div className="text-center space-y-1 mb-5">
          <div className="inline-flex items-center gap-1.5 mb-1">
            <span className="text-2xl font-black text-[#002f34]">olx</span>
            <span className="bg-[#23e5db] text-[#002f34] text-[10px] font-black uppercase px-1.5 py-0.5 rounded-full tracking-wider">
              NEO
            </span>
          </div>
          <h2 className="text-xl font-black text-[#002f34]">
            {tab === "login" ? "Hisobga kirish" : "Ro'yxatdan o'tish"}
          </h2>
          <p className="text-xs text-gray-500">
            {tab === "login"
              ? "Telefon raqamingiz orqali xavfsiz SMS kod bilan kiring"
              : "OLX Neo-da yangi profil yarating va fotosuratingizni yuklang"}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-[#f2f4f5] p-1 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setOtpSent(false);
              setErrorMsg("");
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === "login"
                ? "bg-white text-[#002f34] shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Kirish
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("signup");
              setOtpSent(false);
              setErrorMsg("");
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              tab === "signup"
                ? "bg-white text-[#002f34] shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Ro&apos;yxatdan o&apos;tish
          </button>
        </div>

        {/* Success screen */}
        {isSuccess ? (
          <div className="py-10 text-center space-y-3 animate-in fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm ring-4 ring-emerald-50">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-black text-lg text-[#002f34]">
              Muvaffaqiyatli!
            </h3>
            <p className="text-xs text-gray-500">
              Profil tayyorlanmoqda, xush kelibsiz...
            </p>
          </div>
        ) : !otpSent ? (
          /* Step 1 Form */
          <form onSubmit={handleSendOtp} className="space-y-4">
            {/* If Signup: Profile Photo Upload and Names */}
            {tab === "signup" && (
              <div className="space-y-4 pt-1">
                {/* Photo upload section */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative group">
                    <div className="w-20 h-20 rounded-full border-3 border-[#23e5db] shadow-md overflow-hidden bg-gradient-to-tr from-[#002f34] to-[#008f87] text-[#23e5db] flex items-center justify-center">
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
                              : "")) || <User className="w-8 h-8 text-white/80" />}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 p-1.5 bg-[#002f34] text-[#23e5db] rounded-full shadow hover:bg-black transition-colors"
                      title="Fotosurat yuklash"
                    >
                      <Camera className="w-3.5 h-3.5" />
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
                      className="text-[11px] font-bold text-teal-700 hover:underline inline-flex items-center gap-1 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200 hover:bg-teal-100 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Kompyuterdan rasm tanlash</span>
                    </button>
                    {customAvatarPreview && (
                      <button
                        type="button"
                        onClick={() => {
                          setAvatar(null);
                          setCustomAvatarPreview(null);
                        }}
                        className="text-[10px] font-bold text-red-500 hover:underline block mt-1.5 mx-auto"
                      >
                        Rasmni o&apos;chirish (Initsialga qaytish)
                      </button>
                    )}
                  </div>
                </div>

                {/* Name & Surname */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#002f34]">
                      Ism *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Ismingiz"
                        required
                        className="w-full bg-[#f2f4f5] text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#002f34]">
                      Familiya
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Familiyangiz"
                      className="w-full bg-[#f2f4f5] text-xs font-medium px-3 py-2.5 rounded-xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Phone Number Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#002f34]">
                Telefon raqamingiz
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  required
                  className="w-full bg-[#f2f4f5] text-xs font-bold pl-10 pr-4 py-2.5 rounded-xl outline-none border border-transparent focus:bg-white focus:border-[#23e5db] tracking-wide"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-red-500 font-semibold bg-red-50 p-2 rounded-xl text-center">
                {errorMsg}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#ffce32] hover:bg-[#f3c220] active:scale-95 text-[#002f34] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>SMS kod olish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* OneID alternative */}
            <button
              type="button"
              onClick={() => {
                completeLogin(phoneNumber, {
                  name: "Sardor Alimov (OneID)",
                  isVerified: true,
                });
                onClose();
              }}
              className="w-full py-2.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center gap-2 border border-teal-200 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>OneID orqali xavfsiz tasdiqlash</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-2.5 text-[10px] text-gray-400 uppercase font-bold tracking-wider absolute">
                Yoki ijtimoiy tarmoqlar
              </span>
            </div>

            {/* OAuth Buttons (Google, VK, Facebook) */}
            <OAuthButtons onSuccess={onClose} />

            {/* Stage Presentation Quick Demo Pill */}
            <div className="pt-2 border-t border-gray-100 text-center">
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-[11px] text-gray-500 hover:text-[#002f34] font-semibold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Taqdimot uchun 1-bosishda tezkor kirish</span>
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: OTP Verification Form */
          <form onSubmit={handleVerify} className="space-y-4 animate-in fade-in">
            <div className="space-y-2 text-center">
              <label className="text-xs font-bold text-[#002f34] block">
                SMS tasdiqlash kodini kiriting
              </label>
              <p className="text-xs text-gray-500">
                <span className="font-bold text-[#002f34]">{phoneNumber}</span> raqamiga yuborilgan 4 xonali kod
              </p>

              {/* Notice to look at top of screen */}
              <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-2 text-xs flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Kod ekranning <strong>yuqori qismidagi SMS xabarnomada</strong> chiqdi!
                </span>
              </div>

              {/* 4 digit code inputs */}
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
              className="w-full py-3 rounded-2xl bg-[#23e5db] hover:bg-[#1cd1c7] active:scale-95 text-[#002f34] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>Tasdiqlash va kirish</span>
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
      </div>
    </div>
  );
}
