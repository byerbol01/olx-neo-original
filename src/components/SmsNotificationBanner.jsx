"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Copy, Check, X, Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SmsNotificationBanner() {
  const { smsBanner, closeSmsBanner } = useAuth();
  const [copied, setCopied] = useState(false);

  // Play subtle ding sound on SMS arrival
  useEffect(() => {
    if (smsBanner.isOpen) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.4);
        }
      } catch (e) {
        // Audio might be blocked if user hasn't interacted yet
      }
    }
  }, [smsBanner.isOpen, smsBanner.code]);

  if (!smsBanner.isOpen) return null;

  const handleCopy = () => {
    if (navigator?.clipboard && smsBanner.code) {
      navigator.clipboard.writeText(smsBanner.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAutoFill = () => {
    // Dispatch a custom event so any active OTP input catches it immediately
    window.dispatchEvent(
      new CustomEvent("olx_autofill_otp", {
        detail: { code: smsBanner.code },
      })
    );
  };

  return (
    <aside
      aria-label="SMS Xabarnoma"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[92%] sm:w-[460px] animate-in fade-in slide-in-from-top-6 duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,47,52,0.25)] border-2 border-[#23e5db] relative overflow-hidden ring-4 ring-[#23e5db]/20">
        {/* Glow accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#23e5db] via-[#ffce32] to-[#23e5db]"></div>

        <div className="flex items-start gap-3">
          {/* SMS App icon */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#002f34] to-[#004e57] text-[#23e5db] flex items-center justify-center shrink-0 shadow-md">
            <MessageSquare className="w-5 h-5" />
          </div>

          {/* SMS Body */}
          <div className="flex-1 min-w-0 pr-6">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#002f34]">
                SMS • OLX NEO
              </span>
              <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-gray-400">
                {smsBanner.timestamp || "Hozir"}
              </span>
            </div>

            <p className="text-xs text-gray-600 mt-0.5">
              Telefon: <strong className="text-gray-800">{smsBanner.phone}</strong>
            </p>

            <div className="mt-2 p-2.5 bg-[#f4f7f8] rounded-xl flex items-center justify-between border border-gray-100">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wide">
                  Tasdiqlash kodi
                </span>
                <span className="font-mono text-xl font-black text-[#002f34] tracking-[4px]">
                  {smsBanner.code}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-[#002f34] text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                  title="Nusxalash"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Nusxalandi</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                      <span>Nusxalash</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleAutoFill}
                  className="px-3 py-1.5 rounded-lg bg-[#23e5db] hover:bg-[#1cd1c7] active:scale-95 text-[#002f34] text-xs font-black flex items-center gap-1 shadow-sm transition-all"
                  title="Kodni avtomatik kiritish"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Avto kiritish</span>
                </button>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 mt-1.5">
              ⚠️ Xavfsizlik uchun ushbu kodni hech kimga, hatto OLX xodimlariga ham bermang.
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={closeSmsBanner}
            aria-label="Xabarnomani yopish"
            className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
