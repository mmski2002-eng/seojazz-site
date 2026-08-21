import type { Metadata } from "next";
import { Manrope, Bricolage_Grotesque, Fraunces } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import ScrollReveal from "@/components/layout/ScrollReveal";
import CookieConsent from "@/components/layout/CookieConsent";
import YandexMetrika from "@/components/layout/YandexMetrika";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SEO Jazz — SEO-агентство",
  description:
    "SEO-агентство SEO Jazz: продвижение в поиске, AI-SEO/GEO, создание сайтов. Платите за заявки и выручку, а не за позиции.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${bricolage.variable} ${fraunces.variable}`}
    >
      <body>
        <YandexMetrika />
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileBar />
        <ScrollReveal />
        <CookieConsent />
      </body>
    </html>
  );
}
