import React from "react";
import { Shield } from "lucide-react";

export default function SafeDealBanner() {
  return (
    <div className="bg-[#00383b] rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-[#23e5db] text-[#002f34] flex items-center justify-center shrink-0">
          <Shield className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white">
            OLX Neo Xavfsiz Savdo
          </h4>
          <p className="text-xs text-gray-300 mt-0.5 max-w-xl">
            Mablag&apos;ingiz faqat mahsulotni qabul qilib olganingizdan keyin
            sotuvchiga o&apos;tkaziladi.
          </p>
        </div>
      </div>

      <button className="whitespace-nowrap px-4 py-2 rounded-full bg-white text-[#002f34] text-xs font-bold hover:bg-gray-100 transition-colors shrink-0">
        Batafsil qoidalar
      </button>
    </div>
  );
}
