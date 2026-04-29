"use client";

import type { Product } from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/formatText";
import { PageBackNav } from "@/components/PageBackNav";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetailActions } from "@/components/product/ProductDetailActions";

type ProductDetailsContentProps = {
  product: Product;
  extraImages?: string[];
};

export function ProductDetailsContent({ product, extraImages = [] }: ProductDetailsContentProps) {
  const displayName = capitalizeFirstLetter(product.name);
  const displayCategory = capitalizeFirstLetter(product.category);
  const displayDescription = capitalizeFirstLetter(product.description);

  return (
    <>
      <PageBackNav href="/products" label="Back to products" />
      <article className="glass-panel space-y-8 p-5 md:p-8 lg:space-y-10">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="animate-fade-up relative mx-auto w-3/4 overflow-hidden rounded-xl lg:col-span-7">
          <div className="absolute left-4 top-4 z-10 rounded-md border border-white/30 bg-[#1B5E20]/92 px-2.5 py-1 text-xs font-medium text-white">
            Hand-crafted
          </div>
          <ProductGallery name={displayName} image={product.image} images={extraImages} />
        </div>

        <div className="animate-fade-up animate-stagger-1 flex flex-col space-y-6 lg:col-span-5 lg:justify-center lg:pl-2">
          <h1 className="display-heading text-3xl font-medium leading-snug tracking-tight text-[#1a3f1d] md:text-4xl">
            {displayName}
          </h1>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-[#1a3f1d]">
              {displayCategory}
            </span>
            <span className="rounded-md border border-zinc-200/80 bg-[#f4f6f4] px-2.5 py-1 text-xs font-medium text-[#3d5240]">
              Natural materials
            </span>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-[#f6f8f6] p-4 md:p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-3xl font-semibold tabular-nums text-[#5c4f46]">₹{product.price}</p>
              <p className="shrink-0 text-sm font-medium text-[#1a3f1d]">
                {product.stock === "inStock" ? "In stock" : "Out of stock"}
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#4a524d]">
              Price in INR. Shipping to the EU or UK and payment are agreed with you on WhatsApp before we dispatch.
            </p>
          </div>

          <ProductDetailActions product={product} />
        </div>
      </div>

      <div className="border-t border-zinc-200/90 pt-8 text-[15px] leading-relaxed text-[#2a302c]">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a635e]">Description</h2>
        <p className="mt-3 max-w-prose">{displayDescription}</p>
      </div>
    </article>
    </>
  );
}
