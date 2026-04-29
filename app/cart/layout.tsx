import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your selected eco-friendly products, adjust quantities, and checkout on WhatsApp for shipping and payment details.",
  alternates: {
    canonical: "/cart",
  },
  openGraph: {
    title: "Cart | Abone Eco Store",
    description:
      "Review your selected eco-friendly products and continue checkout with WhatsApp support for Europe and the UK.",
    url: "/cart",
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
