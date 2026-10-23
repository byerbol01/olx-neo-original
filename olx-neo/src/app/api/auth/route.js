import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { action, phone, email, password, name } = await request.json();

    if (action === "send_otp") {
      return NextResponse.json({
        success: true,
        message: "SMS kod yuborildi (Test kodi: 1234)",
        code: "1234",
      });
    }

    if (action === "login") {
      const user = {
        id: "usr-" + Date.now(),
        name: name || "Anvar N.",
        phone: phone || "+998 90 123 45 67",
        email: email || "anvar@example.com",
        avatar: "AN",
        verified: true,
        oneIdVerified: true,
        walletBalance: 85000,
        token: "jwt_token_" + Date.now(),
      };

      return NextResponse.json({
        success: true,
        message: "Muvaffaqiyatli tizimga kirildi",
        user,
      });
    }

    if (action === "signup") {
      const user = {
        id: "usr-" + Date.now(),
        name: name || "Yangi Foydalanuvchi",
        phone: phone || "+998 90 000 00 00",
        email: email || "user@example.com",
        avatar: (name || "YF").substring(0, 2).toUpperCase(),
        verified: false,
        oneIdVerified: false,
        walletBalance: 0,
        token: "jwt_token_" + Date.now(),
      };

      return NextResponse.json({
        success: true,
        message: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi",
        user,
      });
    }

    return NextResponse.json({ success: false, error: "Noma'lum harakat" }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, error: "Server xatosi" }, { status: 500 });
  }
}
