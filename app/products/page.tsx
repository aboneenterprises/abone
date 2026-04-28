import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse sustainable jute bags, handcrafted and natural products.",
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container-padded py-10 md:py-14">
      <div className="animate-fade-up mb-8">
        <h1 className="section-title display-heading">Our Products</h1>
        <p className="mt-2 max-w-2xl text-[#4d5c4f]">
          Curated eco-friendly essentials designed for conscious living.
        </p>
      </div>
      <div className="animate-fade-up animate-stagger-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={String(product._id)} product={{ ...product, _id: String(product._id) }} />
        ))}
      </div>
      {products.length === 0 ? <p className="mt-8 text-[#4d5c4f]">No products available yet.</p> : null}
    </div>
  );
}
