import type { Metadata } from "next";
import { PageBackNav } from "@/components/PageBackNav";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse sustainable jute bags and natural products for delivery across Europe and the UK.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Products | Abone Eco Store",
    description:
      "Browse sustainable jute bags, handcrafted items, and natural products for customers across Europe and the UK.",
    url: "/products",
  },
};

export const revalidate = 300;

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container-padded py-12 md:py-20">
      <PageBackNav href="/" label="Back to home" />
      <div className="animate-fade-up mb-10 md:mb-12">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#5a635e]">Catalogue</p>
        <h1 className="section-title display-heading mt-2">Our products</h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#4a524d] md:text-base">
          Eco-friendly essentials for Europe and the UK — natural materials, fair craft, and delivery arranged with you
          directly.
        </p>
      </div>
      <div className="animate-fade-up animate-stagger-1 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={String(product._id)} product={{ ...product, _id: String(product._id) }} />
        ))}
      </div>
      {products.length === 0 ? <p className="mt-8 text-[#4d5c4f]">No products available yet.</p> : null}
    </div>
  );
}
