"use client";

import type { Product } from "@/lib/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetailActions } from "@/components/product/ProductDetailActions";

type ProductDetailsContentProps = {
  product: Product;
  extraImages?: string[];
};

export function ProductDetailsContent({ product, extraImages = [] }: ProductDetailsContentProps) {
  return (
    <article className="glass-panel space-y-6 border border-[#A5D6A7]/40 p-4 lg:p-6">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="animate-fade-up relative min-h-[440px] overflow-hidden rounded-2xl p-3 lg:col-span-7">
          <div className="absolute left-6 top-6 z-10 rounded-full bg-[#1B5E20]/85 px-3 py-1 text-xs font-semibold text-white">
            Eco-crafted
          </div>
          <ProductGallery name={product.name} image={product.image} images={extraImages} />
        </div>

        <div className="animate-fade-up animate-stagger-1 space-y-5 p-2 lg:col-span-5 lg:p-4">
          <h1 className="display-heading text-3xl font-semibold leading-tight text-[#1B5E20]">
            {product.name}
          </h1>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#A5D6A7]/60 px-3 py-1 text-xs font-semibold text-[#1B5E20]">
              {product.category}
            </span>
            <span className="rounded-full bg-[#f2f8ee] px-3 py-1 text-xs font-semibold text-[#1B5E20]">
              Natural & Sustainable
            </span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-[#f2f8ee] p-4">
            <p className="text-3xl font-bold text-[#8D6E63]">₹{product.price}</p>
            <p className="text-sm font-semibold text-[#1B5E20]">
              {product.stock === "inStock" ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <ProductDetailActions product={product} />
        </div>
      </div>

      <div className="border-t border-[#A5D6A7]/60 pt-5 text-sm leading-7 text-[#1f2b22]">
        <p className="text-base font-bold text-[#1B5E20]">Product Description</p>
        <p className="mt-2 text-[#1f2b22]">{product.description}</p>
      </div>
    </article>
  );
}
