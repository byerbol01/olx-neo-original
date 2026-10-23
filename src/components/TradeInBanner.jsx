import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function TradeInBanner() {
  return (
    <div className="bg-[#0b2f32] rounded-2xl p-5 sm:p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm border border-[#164448]">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 bg-[#23e5db] text-[#002f34] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
          <Sparkles className="w-3 h-3" />
          <span>YANGI SERVIS</span>
        </div>
        <h4 className="text-base sm:text-lg font-bold text-white">
          Eski noutbukingizni yangisiga almashtiring (Trade-in)
        </h4>
        <p className="text-xs text-gray-300">
          Rasmiy do&apos;konlar orqali 30 daqiqada baholash va qulay shartlar bilan xarid qiling.
        </p>
      </div>

      <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#002f34] text-xs font-bold hover:bg-gray-100 transition-colors shrink-0">
        <span>Batafsil bilish</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
