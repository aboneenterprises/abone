"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { CART_MAX_QUANTITY } from "@/lib/constants";
import type { Product } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";

type ProductDetailActionsProps = {
  product: Product;
};

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = useMemo(
    () => items.find((item) => item.productId === product._id),
    [items, product._id],
  );

  useEffect(() => {
    setQuantity(cartItem?.quantity ?? 1);
  }, [cartItem?.quantity]);

  const changeQuantity = (nextQuantity: number) => {
    const clampedQuantity = Math.max(0, Math.min(nextQuantity, CART_MAX_QUANTITY));
    setQuantity(clampedQuantity);

    // Keep details page quantity synced with cart once item exists.
    if (cartItem) {
      updateQuantity(product._id, clampedQuantity);
    }
  };

  const handleAddToCart = () => {
    if (quantity === 0) {
      updateQuantity(product._id, 0);
      toast.success(`${product.name} removed from cart`);
      return;
    }

    if (cartItem) {
      updateQuantity(product._id, quantity);
      toast.success(`${product.name} quantity updated`);
      return;
    }

    addToCart(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-[#1B5E20]">Quantity</p>
        <div className="inline-flex h-11 items-stretch overflow-hidden rounded-xl border-2 border-[#1B5E20] bg-white text-[#1B5E20] shadow-sm">
          <button
            type="button"
            onClick={() => changeQuantity(quantity - 1)}
            className="flex w-11 items-center justify-center text-lg font-bold text-[#1B5E20] hover:bg-[#eaf8ea]"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="flex min-w-11 items-center justify-center border-x-2 border-[#1B5E20] bg-[#f2f8ee] px-3 text-center font-bold text-[#1B5E20]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => changeQuantity(quantity + 1)}
            className="flex w-11 items-center justify-center text-lg font-bold text-[#1B5E20] hover:bg-[#eaf8ea]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        disabled={product.stock !== "inStock"}
        onClick={handleAddToCart}
        className="btn-primary micro-hover w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {quantity === 0 ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
