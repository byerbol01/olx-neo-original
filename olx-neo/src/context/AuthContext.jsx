"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { apiLogin, apiRegister, apiOAuthLogin } from "@/lib/api";

const AuthContext = createContext(null);

const DEFAULT_USER = {
  name: "Sardor Alimov",
  firstName: "Sardor",
  lastName: "Alimov",
  phone: "+998 90 123 45 67",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  avatarInitials: "SA",
  walletBalance: 350000,
  isVerified: true,
  rating: 4.9,
  reviewsCount: 38,
  joinedDate: "Oktyabr 2024",
  adsCount: 4,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // SMS Notification State for floating top push banner
  const [smsBanner, setSmsBanner] = useState({
    isOpen: false,
    code: "",
    phone: "",
    timestamp: "",
  });

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedLoggedIn = localStorage.getItem("olx_neo_logged_in") === "true";
      const storedUser = localStorage.getItem("olx_neo_user");

      if (storedLoggedIn && storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } else if (storedLoggedIn) {
        setUser(DEFAULT_USER);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Failed to load user from localStorage", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Send realistic SMS with random 4-digit code
  const sendSmsCode = (phone) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setSmsBanner({
      isOpen: true,
      code: randomCode,
      phone: phone || "+998 90 123 45 67",
      timestamp: timeStr,
    });

    return randomCode;
  };

  const closeSmsBanner = () => {
    setSmsBanner((prev) => ({ ...prev, isOpen: false }));
  };

  // Complete login (Sync with Backend API)
  const completeLogin = async (phone, customData = {}) => {
    let backendUser = null;
    try {
      const res = await apiLogin(phone, customData.password || "1234");
      if (res?.user) {
        backendUser = res.user;
      }
    } catch (e) {
      console.warn("Backend auth fallback:", e.message);
    }

    const existing = user || DEFAULT_USER;
    const name = backendUser?.name || customData.name || existing.name || "Foydalanuvchi";
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const role = (phone === "admin" || phone === "+998 90 999 99 99" || backendUser?.role === "admin")
      ? "admin"
      : (customData.role || "user");

    const updatedUser = {
      ...existing,
      ...backendUser,
      ...customData,
      role,
      phone: phone || existing.phone,
      avatarInitials: initials || "OL",
    };

    try {
      localStorage.setItem("olx_neo_logged_in", "true");
      localStorage.setItem("olx_neo_user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Storage error:", err);
    }

    setUser(updatedUser);
    setIsLoggedIn(true);
    closeSmsBanner();
    return updatedUser;
  };

  // Complete registration (Sync with Backend API)
  const completeSignup = async ({ firstName, lastName, phone, avatar, password }) => {
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || "Foydalanuvchi";
    let backendUser = null;
    try {
      const res = await apiRegister(fullName, phone, password || "1234");
      if (res?.user) backendUser = res.user;
    } catch (e) {
      console.warn("Backend signup fallback:", e.message);
    }

    const initials = (
      (firstName[0] || "") + (lastName[0] || firstName[1] || "U")
    ).toUpperCase();

    const role = (phone === "+998 90 999 99 99" || backendUser?.role === "admin") ? "admin" : "user";

    const newUser = {
      name: fullName,
      firstName: firstName.trim() || "Foydalanuvchi",
      lastName: lastName.trim() || "",
      phone: phone || "+998 90 123 45 67",
      role,
      avatar:
        avatar ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      avatarInitials: initials,
      walletBalance: 100000,
      isVerified: true,
      rating: 5.0,
      reviewsCount: 1,
      joinedDate: "Hozirgina",
      adsCount: 0,
      ...(backendUser || {}),
    };

    try {
      localStorage.setItem("olx_neo_logged_in", "true");
      localStorage.setItem("olx_neo_user", JSON.stringify(newUser));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Storage error:", err);
    }

    setUser(newUser);
    setIsLoggedIn(true);
    closeSmsBanner();
    return newUser;
  };

  // Complete OAuth login (Google, VK, Facebook)
  const loginWithOAuth = async (provider, profile = {}) => {
    let oauthUser = null;
    let token = null;
    try {
      const res = await apiOAuthLogin({
        provider,
        email: profile.email,
        name: profile.name,
        avatar: profile.avatar,
        providerId: profile.providerId,
      });
      if (res?.user) {
        oauthUser = res.user;
        token = res.token;
      }
    } catch (e) {
      console.warn("Backend OAuth error:", e.message);
    }

    const name =
      oauthUser?.name ||
      profile.name ||
      (provider === "google"
        ? "Google Foydalanuvchisi"
        : `${provider.toUpperCase()} Foydalanuvchisi`);
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const loggedUser = {
      ...DEFAULT_USER,
      ...oauthUser,
      ...profile,
      name,
      avatar:
        profile.avatar ||
        oauthUser?.avatar ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      avatarInitials: initials,
      provider,
      isVerified: true,
    };

    try {
      localStorage.setItem("olx_neo_logged_in", "true");
      localStorage.setItem("olx_neo_user", JSON.stringify(loggedUser));
      if (token) localStorage.setItem("olx_neo_token", token);
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error("Storage error:", err);
    }

    setUser(loggedUser);
    setIsLoggedIn(true);
    closeSmsBanner();
    return loggedUser;
  };

  // Update profile data (e.g. avatar, name, balance)
  const updateProfile = (data) => {
    setUser((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem("olx_neo_user", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error(err);
      }
      return updated;
    });
  };

  // Logout
  const logout = () => {
    try {
      localStorage.removeItem("olx_neo_logged_in");
      localStorage.removeItem("olx_neo_user");
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoaded,
        smsBanner,
        sendSmsCode,
        closeSmsBanner,
        completeLogin,
        completeSignup,
        loginWithOAuth,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
