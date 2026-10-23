import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import LiveSupportChat from "@/components/LiveSupportChat";
import SmsNotificationBanner from "@/components/SmsNotificationBanner";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  metadataBase: new URL("https://olx-neo.uz"),
  title: {
    default: "OLX Neo — O'zbekiston bo'ylab 3 milliondan ortiq e'lonlar",
    template: "%s | OLX Neo O'zbekiston",
  },
  description:
    "O'zbekistondagi eng yirik zamonaviy e'lonlar va savdo maydonchasi. Avtomobillar, ko'chmas mulk, elektronika, noutbuklar, telefonlar va xizmatlar. Qulay, tez va xavfsiz.",
  keywords: [
    "olx uzbekistan",
    "olx neo",
    "elonlar toshkent",
    "noutbuklar toshkent",
    "macbook pro toshkent",
    "mashina sotib olish",
    "uy sotib olish toshkent",
    "ish o'rinlari uzbekiston",
    "iphone toshkent",
    "kvartira toshkent",
  ],
  authors: [{ name: "OLX Neo Uzbekistan" }],
  creator: "OLX Neo",
};

export const viewport = {
  themeColor: "#002f34",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="min-h-screen flex flex-col bg-[#f4f6f7] text-[#002f34] antialiased selection:bg-[#23e5db] selection:text-[#002f34]">
        <AuthProvider>
          <SmsNotificationBanner />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
          <LiveSupportChat />
        </AuthProvider>
      </body>
    </html>
  );
}
