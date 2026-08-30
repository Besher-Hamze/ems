import type { Metadata } from "next";
import { Cairo, Outfit, Great_Vibes, Changa } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/content";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const changa = Changa({
  subsets: ["arabic", "latin"],
  variable: "--font-changa",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: {
      default: `${settings.companyName} — ${settings.slogan || "صناعات كيميائية"}`,
      template: `%s | ${settings.companyName}`,
    },
    description: settings.slogan || "لاصق سيراميك وحلول بناء احترافية",
    icons: { icon: "/brand/logo.png" },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${outfit.variable} ${changa.variable} ${script.variable}`}>
      <body className="font-cairo antialiased">{children}</body>
    </html>
  );
}
