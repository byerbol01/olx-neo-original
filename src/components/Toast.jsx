"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(null);

// Event emitter for toast calls outside React components or deeply nested functions
const TOAST_EVENT = "olx_neo_toast_event";

export const toast = {
  success: (message, title = "Muvaffaqiyatli!") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(TOAST_EVENT, {
          detail: { type: "success", message, title },
        })
      );
    }
  },
  error: (message, title = "Xatolik yuz berdi!") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(TOAST_EVENT, {
          detail: { type: "error", message, title },
        })
      );
    }
  },
  info: (message, title = "Ma'lumot") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(TOAST_EVENT, {
          detail: { type: "info", message, title },
        })
      );
    }
  },
  warning: (message, title = "Diqqat!") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(TOAST_EVENT, {
          detail: { type: "warning", message, title },
        })
      );
    }
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = "info", message = "", title = "" }) => {
      const id = Date.now() + "-" + Math.random().toString(36).substring(2, 7);
      const newToast = { id, type, message, title };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  useEffect(() => {
    const handleCustomToast = (e) => {
      if (e?.detail) {
        addToast(e.detail);
      }
    };
    window.addEventListener(TOAST_EVENT, handleCustomToast);
    return () => window.removeEventListener(TOAST_EVENT, handleCustomToast);
  }, [addToast]);

  const value = {
    showToast: addToast,
    success: (msg, ttl) => addToast({ type: "success", message: msg, title: ttl || "Muvaffaqiyatli!" }),
    error: (msg, ttl) => addToast({ type: "error", message: msg, title: ttl || "Xatolik yuz berdi!" }),
    info: (msg, ttl) => addToast({ type: "info", message: msg, title: ttl || "Ma'lumot" }),
    warning: (msg, ttl) => addToast({ type: "warning", message: msg, title: ttl || "Diqqat!" }),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Notification Container */}
      <div
        aria-live="polite"
        className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-[90%] sm:w-auto pointer-events-none"
      >
        {toasts.map((t) => {
          const isSuccess = t.type === "success";
          const isError = t.type === "error";
          const isWarning = t.type === "warning";

          return (
            <div
              key={t.id}
              className={`pointer-events-auto transform transition-all duration-300 ease-out translate-y-0 opacity-100 flex items-start gap-3 p-4 rounded-2xl shadow-xl border bg-white ${
                isSuccess
                  ? "border-emerald-300 ring-2 ring-emerald-100 shadow-emerald-500/10"
                  : isError
                  ? "border-red-300 ring-2 ring-red-100 shadow-red-500/10"
                  : isWarning
                  ? "border-amber-300 ring-2 ring-amber-100 shadow-amber-500/10"
                  : "border-[#23e5db] ring-2 ring-[#23e5db]/20 shadow-teal-500/10"
              }`}
            >
              {/* Icon */}
              <div className="shrink-0 pt-0.5">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {isError && <AlertCircle className="w-5 h-5 text-red-600" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                {!isSuccess && !isError && !isWarning && (
                  <Info className="w-5 h-5 text-[#008f87]" />
                )}
              </div>

              {/* Message text */}
              <div className="flex-1 min-w-0 pr-1">
                {t.title && (
                  <h4 className="text-xs font-bold text-[#002f34] mb-0.5">
                    {t.title}
                  </h4>
                )}
                <p className="text-xs text-gray-600 leading-relaxed break-words">
                  {t.message}
                </p>
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="shrink-0 p-1 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Yopish"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return toast;
  }
  return context;
}
