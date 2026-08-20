import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

// Шрифт — гипотеза дизайн-системы (dizajn-sistema.md §5, решение блокера №1 в ПЛАН.md)
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SEO Jazz — SEO-агентство",
  description: "SEO-агентство SEO Jazz: продвижение в поиске, AI-SEO/GEO, создание сайтов. Платите за заявки и выручку, а не за позиции.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={manrope.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
