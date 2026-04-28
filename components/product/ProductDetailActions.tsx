"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";

type ProductDetailActionsProps = {
  product: Product;
};

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-[#1B5E20]">Quantity</p>
        <div className="inline-flex items-center rounded-xl border border-[#A5D6A7]/70 bg-white dark:bg-[#0f1711]">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 text-lg"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="min-w-10 px-3 text-center font-semibold">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.min(prev + 1, 20))}
            className="px-4 py-2 text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          disabled={product.stock !== "inStock"}
          onClick={handleAddToCart}
          className="btn-primary micro-hover w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          Add to Cart
        </button>
        <Link href="/cart" className="btn-secondary micro-hover w-full text-center">
          Go to Cart
        </Link>
      </div>
    </div>
  );
}
