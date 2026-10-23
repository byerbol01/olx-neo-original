import React from "react";
import { ShieldCheck } from "lucide-react";

export default function TrustBanner() {
  return (
    <section className="bg-gradient-to-r from-[#0d3437] to-[#072426] rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
      {/* Background soft glow decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#23e5db]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left text */}
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-wider uppercase text-[#23e5db]">
            <ShieldCheck className="w-4 h-4" />
            <span>XAVFSIZ BITIMLAR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
            Har bir xarid va sotuv ishonchli qo&apos;llarda
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
            Tekshirilgan sotuvchilar, qulay yetkazib berish va 24/7 mijozlarni
            qo&apos;llab-quvvatlash xizmati.
          </p>
        </div>

        {/* Right metrics */}
        <div className="lg:col-span-5 grid grid-cols-3 gap-3 sm:gap-6 text-center sm:text-left">
          <div className="border-l-2 border-[#23e5db]/30 pl-3 sm:pl-4">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#23e5db] tracking-tight">
              3M+
            </div>
            <div className="text-[11px] sm:text-xs text-gray-300 mt-1 font-medium">
              Faol e&apos;lonlar
            </div>
          </div>

          <div className="border-l-2 border-[#ffce32]/40 pl-3 sm:pl-4">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#ffce32] tracking-tight">
              99.4%
            </div>
            <div className="text-[11px] sm:text-xs text-gray-300 mt-1 font-medium">
              Ijobiy sharhlar
            </div>
          </div>

          <div className="border-l-2 border-white/30 pl-3 sm:pl-4">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              14
            </div>
            <div className="text-[11px] sm:text-xs text-gray-300 mt-1 font-medium">
              Viloyat qamrovi
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
