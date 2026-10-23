"use client";

import React, { useState } from "react";
import { Check, Loader2, Plus, User, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Pre-configured simulated Google accounts for quick demonstration
const PRESET_GOOGLE_ACCOUNTS = [
  {
    name: "Sardor Alimov",
    email: "sardor.alimov.dev@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Aziza Karimova",
    email: "aziza.karimova@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
];

export default function OAuthButtons({ onSuccess }) {
  const { loginWithOAuth } = useAuth();
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Handle Google account selection
  const handleSelectGoogleAccount = async (account) => {
    setLoadingProvider("google");
    try {
      await loginWithOAuth("google", {
        name: account.name,
        email: account.email,
        avatar: account.avatar,
        providerId: `google_${Date.now()}`,
      });
      setIsGoogleModalOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Google login failed", err);
    } finally {
      setLoadingProvider(null);
    }
  };

  // Handle custom Google account submission
  const handleCustomGoogleSubmit = async (e) => {
    e.preventDefault();
    if (!customEmail) return;
    const derivedName = customName.trim() || customEmail.split("@")[0];
    await handleSelectGoogleAccount({
      name: derivedName,
      email: customEmail,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    });
  };

  // Handle VK login
  const handleVkLogin = async () => {
    setLoadingProvider("vk");
    try {
      await loginWithOAuth("vk", {
        name: "VK Foydalanuvchisi",
        email: "vk_user@vk.com",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        providerId: `vk_${Date.now()}`,
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("VK login failed", err);
    } finally {
      setLoadingProvider(null);
    }
  };

  // Handle Facebook login
  const handleFacebookLogin = async () => {
    setLoadingProvider("facebook");
    try {
      await loginWithOAuth("facebook", {
        name: "Facebook Foydalanuvchisi",
        email: "fb_user@facebook.com",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        providerId: `fb_${Date.now()}`,
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Facebook login failed", err);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-3 w-full">
      {/* 1. PRIMARY PROMINENT GOOGLE BUTTON */}
      <button
        type="button"
        onClick={() => setIsGoogleModalOpen(true)}
        disabled={loadingProvider !== null}
        className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-[#002f34] text-[#002f34] font-bold text-xs sm:text-sm flex items-center justify-center gap-3 shadow-xs hover:shadow-md transition-all duration-200 group active:scale-[0.99] cursor-pointer"
      >
        {loadingProvider === "google" ? (
          <Loader2 className="w-5 h-5 animate-spin text-[#002f34]" />
        ) : (
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
        )}
        <span className="group-hover:text-black">Войти через Google</span>
      </button>

      {/* 2. SECONDARY OAUTH BUTTONS (VK & FACEBOOK) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* VK Button */}
        <button
          type="button"
          onClick={handleVkLogin}
          disabled={loadingProvider !== null}
          className="py-2.5 px-3 rounded-xl bg-[#0077FF]/10 hover:bg-[#0077FF]/20 text-[#0077FF] font-bold text-xs flex items-center justify-center gap-2 border border-[#0077FF]/30 transition-all active:scale-95 cursor-pointer"
        >
          {loadingProvider === "vk" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M15.684 0H8.316C2.992 0 0 2.992 0 8.316v7.368C0 21.008 2.992 24 8.316 24h7.368C21.008 24 24 21.008 24 15.684V8.316C24 2.992 21.008 0 15.684 0zm3.692 17.185h-1.744c-.66 0-.862-.525-2.05-1.714-1.034-1-1.493-1.13-1.75-1.13-.359 0-.462.102-.462.59v1.65c0 .41-.129.604-1.23.604-1.82 0-3.844-1.103-5.267-3.154-2.14-3.036-2.73-5.32-2.73-5.783 0-.256.103-.493.6-.493h1.745c.444 0 .61.205.78.683.856 2.478 2.29 4.647 2.88 4.647.222 0 .325-.102.325-.663v-2.573c-.068-1.18-.69-1.28-.69-1.7 0-.205.172-.41.445-.41h2.744c.376 0 .513.197.513.633v3.473c0 .376.162.504.273.504.223 0 .41-.128.82-.538 1.282-1.436 2.2-3.647 2.2-3.647.12-.256.325-.427.77-.427h1.743c.523 0 .637.265.523.633-.205.957-2.22 3.8-2.323 3.963-.256.393-.359.572 0 1.05.257.342 1.094 1.07 1.658 1.727.992 1.13 1.761 2.077 1.966 2.726.069.24-.1.496-.462.496z" />
            </svg>
          )}
          <span>Войти через VK</span>
        </button>

        {/* Facebook Button */}
        <button
          type="button"
          onClick={handleFacebookLogin}
          disabled={loadingProvider !== null}
          className="py-2.5 px-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] font-bold text-xs flex items-center justify-center gap-2 border border-[#1877F2]/30 transition-all active:scale-95 cursor-pointer"
        >
          {loadingProvider === "facebook" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          )}
          <span>Войти через Facebook</span>
        </button>
      </div>

      {/* 3. GOOGLE ACCOUNT CHOOSER MODAL (Authentic Google UI) */}
      {isGoogleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-gray-200 overflow-hidden text-left animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span className="font-bold text-gray-700 text-sm">Google orqali kirish</span>
                </div>
                <h3 className="text-lg font-black text-[#002f34]">
                  Akkauntni tanlang
                </h3>
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-teal-800">olx-neo.uz</span> ilovasiga kirish uchun
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Account List */}
            <div className="p-4 space-y-2">
              {PRESET_GOOGLE_ACCOUNTS.map((acc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectGoogleAccount(acc)}
                  disabled={loadingProvider !== null}
                  className="w-full p-3 rounded-2xl border border-gray-150 hover:border-[#23e5db] hover:bg-teal-50/50 flex items-center gap-3.5 transition-all text-left group"
                >
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-[#23e5db]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs sm:text-sm text-[#002f34] truncate">
                      {acc.name}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">{acc.email}</p>
                  </div>
                  {loadingProvider === "google" ? (
                    <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                  ) : (
                    <Check className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              ))}

              {/* Use another custom account option */}
              {!showCustomInput ? (
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  className="w-full p-3 rounded-2xl border border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 flex items-center gap-3.5 transition-all text-left text-gray-600 hover:text-gray-900"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold">
                    Boshqa hisobdan foydalanish
                  </div>
                </button>
              ) : (
                <form
                  onSubmit={handleCustomGoogleSubmit}
                  className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2.5 animate-in fade-in"
                >
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Google hisob emailingiz
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="misol@gmail.com"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      className="w-full text-xs font-bold px-3 py-2 bg-white rounded-xl border border-gray-300 outline-none focus:border-[#23e5db]"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-700 block mb-1">
                      Ism va familiyangiz (ixtiyoriy)
                    </label>
                    <input
                      type="text"
                      placeholder="Ismingiz"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full text-xs font-bold px-3 py-2 bg-white rounded-xl border border-gray-300 outline-none focus:border-[#23e5db]"
                    />
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(false)}
                      className="flex-1 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-100"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      disabled={loadingProvider !== null}
                      className="flex-1 py-2 text-xs font-bold text-[#002f34] bg-[#23e5db] hover:bg-[#1ed1c7] rounded-xl flex items-center justify-center gap-1.5"
                    >
                      {loadingProvider === "google" && (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      )}
                      <span>Kirish</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer privacy text */}
            <div className="p-4 bg-gray-50 text-[11px] text-gray-500 border-t border-gray-100 leading-relaxed">
              Google orqali davom etish bilan siz OLX Neo platformasining Foydalanish shartlari va Maxfiylik siyosatiga rozilik bildirasiz.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
