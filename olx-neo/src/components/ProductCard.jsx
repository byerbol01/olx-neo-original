"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, MapPin, Sparkles, Star } from "lucide-react";

export default function ProductCard({
  id = "",
  title = "E'lon",
  price = null,
  priceFormatted = null,
  location = "Toshkent",
  date = "Bugun",
  badge = null,
  tag = null,
  image = null,
  images = null,
  img = null,
  photo = null,
  initialFavorite = false,
  href = null,
}) {
  // Dynamically resolve image from any format provided in product object
  const dynamicImage =
    image ||
    (Array.isArray(images) && images.length > 0 ? images[0] : null) ||
    img ||
    photo ||
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80";

  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [imgSrc, setImgSrc] = useState(dynamicImage);

  React.useEffect(() => {
    if (dynamicImage) {
      setImgSrc(dynamicImage);
    }
  }, [dynamicImage]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Format price realistically with spaces if a number is passed
  const displayPrice = priceFormatted
    ? priceFormatted
    : price
    ? `${Number(price).toLocaleString("ru-RU").replace(/,/g, " ")} so'm`
    : "Kelishiladi";

  const displayLocation =
    typeof location === "object" && location !== null
      ? [location.city, location.district].filter(Boolean).join(", ") || "Toshkent"
      : String(location || "Toshkent");

  const targetHref = href || (id ? `/product/${id}` : "/catalog");

  return (
    <Link
      href={targetHref}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Image container with strict aspect ratio and object-cover to prevent distortion */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80"
            )
          }
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          {badge === "VIP" && (
            <span className="flex items-center gap-1 bg-[#ffce32] text-[#002f34] text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
              <Star className="w-2.5 h-2.5 fill-current" />
              VIP
            </span>
          )}
          {badge === "YANGI" && (
            <span className="flex items-center gap-1 bg-[#23e5db] text-[#002f34] text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              YANGI
            </span>
          )}
          {badge === "TOP" && (
            <span className="bg-[#ffce32] text-[#002f34] text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-xs">
              TOP
            </span>
          )}
          {badge === "KAFOLATLI" && (
            <span className="bg-[#23e5db] text-[#002f34] text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shadow-xs">
              KAFOLATLI
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={toggleFavorite}
          aria-label="Sevimlilarga qo'shish"
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 hover:bg-white active:scale-90 shadow-md flex items-center justify-center transition-all z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite
                ? "fill-[#ff5636] text-[#ff5636]"
                : "text-gray-600 hover:text-[#ff5636]"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Price */}
          <div className="text-base sm:text-lg font-bold text-[#002f34] leading-snug">
            {displayPrice}
          </div>

          {/* Title */}
          <h3 className="mt-1 text-xs sm:text-sm font-normal text-gray-800 line-clamp-2 leading-snug group-hover:text-[#002f34] transition-colors">
            {title}
          </h3>
        </div>

        {/* Footer info: Location & Date & Tag */}
        <div className="mt-3 pt-2 border-t border-gray-50 flex items-end justify-between gap-1 text-[11px] text-gray-500">
          <div className="flex flex-col gap-0.5 truncate">
            <span className="truncate flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {displayLocation}
            </span>
            <span className="text-[10px] text-gray-400">{date}</span>
          </div>

          {tag && (
            <span className="shrink-0 bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-medium">
              {tag}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
