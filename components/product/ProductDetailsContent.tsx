"use client";

import { FaWhatsapp } from "react-icons/fa";
import type { Product } from "@/lib/types";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetailActions } from "@/components/product/ProductDetailActions";

type ProductDetailsContentProps = {
  product: Product;
  whatsappUrl: string;
  extraImages?: string[];
};

export function ProductDetailsContent({ product, whatsappUrl, extraImages = [] }: ProductDetailsContentProps) {
  return (
    <article className="grid gap-8 lg:grid-cols-5">
      <div className="glass-panel animate-fade-up relative min-h-[440px] overflow-hidden border border-[#A5D6A7]/40 p-3 lg:col-span-3">
        <div className="absolute left-6 top-6 z-10 rounded-full bg-[#1B5E20]/85 px-3 py-1 text-xs font-semibold text-white">
          Eco-crafted
        </div>
        <ProductGallery name={product.name} image={product.image} images={extraImages} />
      </div>

      <div className="lg:col-span-2">
        <div className="card-soft animate-fade-up animate-stagger-1 space-y-6 border border-[#A5D6A7]/40 p-6 lg:sticky lg:top-24">
          <h1 className="display-heading text-4xl font-semibold leading-tight text-[#1B5E20]">
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

          <p className="leading-8 text-[#4d5c4f]">{product.description}</p>

          <div className="flex items-center justify-between rounded-2xl bg-[#f2f8ee] p-4">
            <p className="text-3xl font-bold text-[#8D6E63]">₹{product.price}</p>
            <p className="text-sm font-semibold text-[#1B5E20]">
              {product.stock === "inStock" ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <ProductDetailActions product={product} />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="micro-hover inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white shadow-lg shadow-[#25D366]/30"
          >
            <FaWhatsapp />
            Inquire on WhatsApp
          </a>

          <div className="rounded-2xl border border-[#A5D6A7]/40 bg-white/70 p-4 text-sm leading-7 text-[#4d5c4f] dark:bg-[#17231a]/70">
            <p className="font-semibold text-[#1B5E20]">Product Highlights</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Handcrafted finish with premium quality materials</li>
              <li>Eco-conscious sourcing and low-impact production</li>
              <li>Suitable for Europe shipping and daily use</li>
            </ul>
          </div>

          <p className="text-xs text-[#4d5c4f]">Fast response for Europe inquiries via WhatsApp.</p>
        </div>
      </div>
    </article>
  );
}
