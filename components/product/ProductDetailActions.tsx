"use client";

import { useMemo } from "react";
import toast from "react-hot-toast";
import { CART_MAX_QUANTITY } from "@/lib/constants";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";

type ProductDetailActionsProps = {
  product: Product;
};

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = useMemo(
    () => items.find((item) => item.productId === product._id),
    [items, product._id],
  );
  const quantity = cartItem?.quantity ?? 0;

  const changeQuantity = (nextQuantity: number) => {
    const clampedQuantity = Math.max(0, Math.min(nextQuantity, CART_MAX_QUANTITY));
    updateQuantity(product._id, clampedQuantity);
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="space-y-2">
      {cartItem ? (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#5a635e]">Quantity</p>
          <div className="inline-flex h-10 items-stretch overflow-hidden rounded-xl border-2 border-[#1B5E20] bg-white text-[#1B5E20]">
            <button
              type="button"
              onClick={() => changeQuantity(quantity - 1)}
              className="flex w-9 items-center justify-center text-base font-bold hover:bg-[#eaf8ea]"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="flex min-w-9 items-center justify-center border-x-2 border-[#1B5E20] bg-[#f2f8ee] px-2 text-center text-sm font-bold">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => changeQuantity(Math.min(quantity + 1, CART_MAX_QUANTITY))}
              className="flex w-9 items-center justify-center text-base font-bold hover:bg-[#eaf8ea]"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock !== "inStock"}
          className="btn-primary px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          Add to cart
        </button>
      )}
    </div>
  );
}
