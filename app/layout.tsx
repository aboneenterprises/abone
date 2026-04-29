import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { RouteShell } from "@/components/RouteShell";
import { CartProvider } from "@/components/cart/CartProvider";
import { ToastProvider } from "@/components/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export const metadata: Metadata = {
  title: {
    default: "Abone Eco Store",
    template: "%s | Abone Eco Store",
  },
  description:
    "Eco-friendly jute bags and sustainable home goods for customers in Europe and the UK. Handcrafted quality with EU-friendly ordering and delivery.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "eco-friendly products Europe",
    "jute bags",
    "handcrafted products India",
    "sustainable home goods",
    "natural products",
    "Abone Eco Store",
  ],
  category: "shopping",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Abone Eco Store",
    title: "Abone Eco Store",
    description:
      "Sustainable home goods for customers in Europe and the UK. Order via WhatsApp with clear EU-friendly delivery.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abone Eco Store",
    description:
      "Sustainable home goods for customers in Europe and the UK. Discover jute bags, handcrafted items, and natural products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${inter.variable} ${playfair.variable} min-h-screen text-[var(--text)]`}>
        <CartProvider>
          <ToastProvider />
          <RouteShell>{children}</RouteShell>
        </CartProvider>
      </body>
    </html>
  );
}
