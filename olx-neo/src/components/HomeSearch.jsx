"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown, ArrowRight } from "lucide-react";

export default function HomeSearch({ initialCity = "Toshkent shahri" }) {
  const router = useRouter();
  const [heroSearch, setHeroSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cities = [
    "Toshkent shahri",
    "Samarqand viloyati",
    "Farg'ona viloyati",
    "Andijon viloyati",
    "Buxoro viloyati",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      router.push("/catalog");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl sm:rounded-full p-2 shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-3xl mx-auto border border-gray-100"
    >
      {/* Search text input */}
      <div className="flex items-center gap-2.5 flex-1 w-full pl-3 sm:pl-4">
        <Search className="w-5 h-5 text-gray-400 shrink-0" />
        <input
          type="text"
          value={heroSearch}
          onChange={(e) => setHeroSearch(e.target.value)}
          placeholder="Mashina, kvartira, ish yoki telefon qidirish..."
          className="w-full text-xs sm:text-sm text-[#002f34] placeholder-gray-400 outline-none bg-transparent py-2"
        />
      </div>

      {/* Location selector */}
      <div className="relative w-full sm:w-auto">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-gray-200 px-3 py-2 w-full justify-between sm:justify-start text-xs text-[#002f34] font-medium"
        >
          <MapPin className="w-4 h-4 text-[#23e5db]" />
          <span>{selectedCity}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setSelectedCity(city);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#23e5db] hover:bg-[#1cd1c7] active:scale-95 text-[#002f34] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl sm:rounded-full shadow-md transition-all shrink-0"
      >
        <span>Qidirish</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
