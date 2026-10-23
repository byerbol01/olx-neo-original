"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, PlusCircle, MessageSquare, User } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Bosh sahifa", href: "/", icon: Home },
    { label: "Sevimlilar", href: "/favorites", icon: Heart },
    { label: "E'lon berish", href: "/create", icon: PlusCircle, isCta: true },
    { label: "Xabarlar", href: "/messages", icon: MessageSquare, badge: 2 },
    { label: "Kabinet", href: "/profile", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg px-2 py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isCta) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-[#ffce32] shadow-md flex items-center justify-center text-[#002f34] group-active:scale-95 transition-transform">
                  <PlusCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold text-[#002f34] mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 relative transition-colors ${
                isActive ? "text-[#002f34]" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? item.href === "/favorites"
                        ? "fill-red-500 text-red-500"
                        : "text-[#002f34] stroke-[2.5]"
                      : "text-gray-500"
                  }`}
                />
                {item.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-0.5 ${
                  isActive ? "font-bold text-[#002f34]" : "font-medium text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
