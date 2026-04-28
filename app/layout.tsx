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

export const metadata: Metadata = {
  title: {
    default: "Abone Eco Store",
    template: "%s | Abone Eco Store",
  },
  description:
    "Premium eco-friendly products from India for Europe, including jute bags and handcrafted sustainable goods.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} min-h-screen bg-[#F9FBE7] text-[#1c2a1f]`}>
        <CartProvider>
          <ToastProvider />
          <RouteShell>{children}</RouteShell>
        </CartProvider>
      </body>
    </html>
  );
}
