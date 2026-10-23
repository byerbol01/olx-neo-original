"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, Camera, Globe, Play, Apple, Smartphone } from "lucide-react";

export default function Footer() {
  const [currentLang, setCurrentLang] = useState("uz");

  return (
    <footer className="bg-[#0b2628] text-white pt-12 pb-24 md:pb-8 border-t border-[#12383b]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-10 border-b border-[#164043]">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-1.5 group">
              <span className="text-3xl font-black tracking-tight text-white leading-none">
                olx
              </span>
              <span className="bg-[#23e5db] text-[#002f34] text-[11px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider group-hover:bg-[#1cd1c7] transition-colors">
                NEO
              </span>
            </Link>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              O&apos;zbekistondagi eng yirik zamonaviy e&apos;lonlar va savdo
              maydonchasi. Qulay, tez va xavfsiz.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#14373a] hover:bg-[#23e5db] hover:text-[#002f34] text-gray-300 flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#14373a] hover:bg-[#23e5db] hover:text-[#002f34] text-gray-300 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#14373a] hover:bg-[#23e5db] hover:text-[#002f34] text-gray-300 flex items-center justify-center transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-[#14373a] hover:bg-[#23e5db] hover:text-[#002f34] text-gray-300 flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Play className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Column: Xizmatlar */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3.5">
              XIZMATLAR
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  VIP e&apos;lonlar
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-white transition-colors">
                  Reklama berish
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  Yetkazib berish xizmati
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  Xavfsiz to&apos;lov
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  Trade-In dasturi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Kompaniya */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3.5">
              KOMPANIYA
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Biz haqimizda
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Qoidalar va xavfsizlik
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Yordam markazi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Karyera
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Aloqa
                </a>
              </li>
            </ul>
          </div>

          {/* Column: Til va Ilovalar */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-3">
                TIL VA MINTAQA
              </h3>
              <div className="inline-flex bg-[#123639] p-0.5 rounded-full border border-[#1d4d51]">
                <button
                  type="button"
                  onClick={() => setCurrentLang("uz")}
                  className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${
                    currentLang === "uz"
                      ? "bg-[#23e5db] text-[#002f34]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  O&apos;zbekcha
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentLang("ru")}
                  className={`text-xs px-3 py-1 rounded-full font-bold transition-colors ${
                    currentLang === "ru"
                      ? "bg-[#23e5db] text-[#002f34]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Русский
                </button>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                ILOVALARNI YUKLAB OLING
              </h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center gap-3 bg-[#13383b] hover:bg-[#1a474b] border border-[#1d4d51] px-3.5 py-2 rounded-xl transition-colors group"
                >
                  <Apple className="w-5 h-5 text-gray-200 group-hover:text-white" />
                  <div className="text-left leading-tight">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400">
                      YUKLAB OLING
                    </span>
                    <span className="block text-xs font-bold text-white">
                      App Store
                    </span>
                  </div>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 bg-[#13383b] hover:bg-[#1a474b] border border-[#1d4d51] px-3.5 py-2 rounded-xl transition-colors group"
                >
                  <Smartphone className="w-5 h-5 text-[#23e5db]" />
                  <div className="text-left leading-tight">
                    <span className="block text-[9px] uppercase tracking-wider text-gray-400">
                      YUKLAB OLING
                    </span>
                    <span className="block text-xs font-bold text-white">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <p>© 2026 OLX Neo O&apos;zbekiston. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white transition-colors">
              Maxfiylik siyosati
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Foydalanish shartlari
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sayt xaritasi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
