"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight, ShieldCheck, Check, Sparkles, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import OAuthButtons from "@/components/OAuthButtons";

export default function LoginPage() {
  const router = useRouter();
  const { sendSmsCode, completeLogin, isLoggedIn } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState("+998 90 123 45 67");
  const [otpSent, setOtpSent] = useState(false);
  const [activeCode, setActiveCode] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    }
  }, [isLoggedIn, router]);

  // Listen for SMS autofill from top banner
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

  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg("");

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
        completeLogin(phoneNumber);
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
            Hisobga kirish
          </h1>
          <p className="text-xs text-gray-500">
            Telefon raqamingiz orqali xavfsiz SMS kod bilan tizimga kiring
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-50">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>
            <h3 className="font-bold text-base text-[#002f34]">
              Muvaffaqiyatli! Profilingizga o&apos;tilmoqda...
            </h3>
          </div>
        ) : !otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#002f34] block">
                Telefon raqamingiz
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
              <span>SMS kod olish</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative flex items-center justify-center pt-2">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] text-gray-400 uppercase font-bold absolute">
                Yoki
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                completeLogin(phoneNumber, { isVerified: true });
                router.push("/profile");
              }}
              className="w-full py-3 rounded-2xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#008f87]" />
              <span>OneID orqali xavfsiz kirish</span>
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

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Hisobingiz yo&apos;qmi?{" "}
          <Link href="/signup" className="font-bold text-teal-800 hover:underline">
            Ro&apos;yxatdan o&apos;tish
          </Link>
        </div>
      </div>
    </div>
  );
}
