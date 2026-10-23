import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Car,
  Building2,
  Laptop,
  Briefcase,
  Wrench,
  Shirt,
  Baby,
  Armchair,
  Sparkles,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import TrustBanner from "@/components/TrustBanner";
import HomeSearch from "@/components/HomeSearch";
import HomeLatestFeed from "@/components/HomeLatestFeed";
import HomeCategoriesSection from "@/components/HomeCategoriesSection";
import { VIP_PRODUCTS, ALL_PRODUCTS } from "@/data/mockData";

export const metadata = {
  title: "Bosh sahifa | O'zbekiston bo'ylab 3 milliondan ortiq e'lonlar",
  description:
    "O'zbekistondagi eng yirik zamonaviy savdo maydonchasi. Avto, noutbuklar, ko'chmas mulk va ish o'rinlari.",
};

export default function HomePage() {
  const categoryIcons = [
    { name: "Avto", icon: Car, href: "/catalog?cat=avto", count: "128 ming" },
    { name: "Ko'chmas mulk", icon: Building2, href: "/catalog?cat=re", count: "84 ming" },
    { name: "Elektronika", icon: Laptop, href: "/catalog", count: "342 ming" },
    { name: "Ish o'rinlari", icon: Briefcase, href: "/catalog?cat=jobs", count: "42 ming" },
    { name: "Xizmatlar", icon: Wrench, href: "/catalog?cat=services", count: "65 ming" },
    { name: "Moda va stil", icon: Shirt, href: "/catalog?cat=fashion", count: "95 ming" },
    { name: "Bolalar dunyosi", icon: Baby, href: "/catalog?cat=kids", count: "38 ming" },
    { name: "Uy va bog'", icon: Armchair, href: "/catalog?cat=home", count: "78 ming" },
  ];

  const popularSearches = [
    "iPhone 15 Pro",
    "Chevrolet Cobalt",
    "2-xonalik kvartira",
    "Noutbuklar",
    "Vakansiyalar",
  ];

  return (
    <div className="space-y-10 sm:space-y-12 pb-16 pt-4 sm:pt-6">
      {/* 1. HERO SECTION (Server Rendered HTML with Client Search Island) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#113d39] via-[#0d3431] to-[#072422] text-white p-6 sm:p-10 md:p-14 overflow-hidden shadow-xl text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#23e5db]/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#23e5db]">
              <span className="w-2 h-2 rounded-full bg-[#23e5db] animate-pulse"></span>
              <span>YANGI AVLOD SAVDO MAYDONCHASI</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-tight">
              O&apos;zbekiston bo&apos;ylab 3 milliondan ortiq <br className="hidden sm:block" />
              e&apos;lonlar
            </h1>

            <p className="text-xs sm:text-base text-gray-300 max-w-xl mx-auto">
              Kerakli narsani osongina toping, soting yoki xarid qiling
            </p>

            {/* Client Search Island */}
            <HomeSearch />

            {/* Popular tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-gray-300">
              <span className="font-semibold text-gray-400">Ommabop:</span>
              {popularSearches.map((item) => (
                <Link
                  key={item}
                  href={`/catalog?q=${encodeURIComponent(item)}`}
                  className="bg-white/10 hover:bg-white/20 text-gray-200 px-3 py-1 rounded-full text-[11px] sm:text-xs transition-colors backdrop-blur-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION (Interaktiv bo'lim va har bir ruknga e'lon qo'shish) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <HomeCategoriesSection />
      </section>

      {/* 3. VIP E'LONLAR SECTION */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#002f34] tracking-tight">
              VIP E&apos;lonlar
            </h2>
            <span className="bg-[#ffce32] text-[#002f34] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
              VIP
            </span>
          </div>
          <Link
            href="/catalog"
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#008f87] hover:underline"
          >
            <span>Barchasi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VIP_PRODUCTS.map((prod) => (
            <ProductCard
              key={prod.id}
              {...prod}
              image={prod.images?.[0] || prod.image}
              href={`/product/${prod.id}`}
            />
          ))}
        </div>
      </section>

      {/* 4. LATEST ADS SECTION */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <HomeLatestFeed initialProducts={ALL_PRODUCTS} />
      </section>

      {/* 5. TRUST BANNER WITH METRICS */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <TrustBanner />
      </section>
    </div>
  );
}
