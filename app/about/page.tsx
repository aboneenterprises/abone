import type { Metadata } from "next";
import { PageBackNav } from "@/components/PageBackNav";

export const metadata: Metadata = {
  title: "About",
  description:
    "About our e-commerce business sourcing unique eco-friendly products from India for customers across Europe.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Abone Eco Store",
    description:
      "Learn about Abone Eco Store, our sourcing approach, and our eco-friendly handcrafted product focus for Europe.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="container-padded py-10">
      <PageBackNav href="/" label="Back to home" />
      <h1 className="section-title mb-6">About Abone Eco Store</h1>
      <div className="card-soft space-y-8 border border-[#A5D6A7]/40 p-8 text-[#4d5c4f]">
        <p>
          We are an e-commerce-based business focused on sourcing and selling unique, eco-friendly products from India
          across Europe.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#1B5E20]">Our specialty</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Jute bags</li>
            <li>Handcrafted items</li>
            <li>Natural and sustainable products</li>
            <li>Unique items sourced from different states of India</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#1B5E20]">How we curate products</h2>
          <p>
            We carefully select high-quality, authentic products and offer them through our online platform to customers
            across Europe who value sustainability and craftsmanship.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#1B5E20]">Our mission</h2>
          <p>
            Make sustainable living easier by bringing authentic craftsmanship and responsibly sourced products from
            India to homes across Europe.
          </p>
        </section>
      </div>
    </div>
  );
}
