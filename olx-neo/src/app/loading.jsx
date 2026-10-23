import React from "react";

export default function Loading() {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-8 space-y-8 animate-pulse">
      {/* Hero skeleton */}
      <div className="h-64 sm:h-80 w-full rounded-3xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>

      {/* Category icons skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-2xl bg-white border border-gray-100 p-4 flex flex-col items-center justify-center space-y-2"
          >
            <div className="w-10 h-10 rounded-2xl bg-gray-200"></div>
            <div className="w-16 h-3 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Product cards skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-48 h-6 bg-gray-200 rounded-lg"></div>
          <div className="w-24 h-4 bg-gray-200 rounded-lg"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col space-y-3 p-3.5"
            >
              <div className="aspect-[4/3] rounded-xl bg-gray-200 w-full"></div>
              <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
              <div className="w-full h-3.5 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-3 bg-gray-100 rounded"></div>
              <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                <div className="w-20 h-3 bg-gray-100 rounded"></div>
                <div className="w-12 h-3 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
