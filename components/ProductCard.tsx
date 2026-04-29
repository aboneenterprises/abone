"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/components/cart/CartProvider";
import { CART_MAX_QUANTITY } from "@/lib/constants";
import type { Product } from "@/lib/types";
import { capitalizeFirstLetter } from "@/lib/formatText";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productUrl = `/products/${product._id}`;
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.productId === product._id);
  const quantity = cartItem?.quantity ?? 0;

  const displayName = capitalizeFirstLetter(product.name);
  const displayCategory = capitalizeFirstLetter(product.category);
  const displayDescription = capitalizeFirstLetter(product.description);

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${displayName} added to cart`);
  };

  return (
    <article className="card-soft group overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#eceee9]">
        <div className="absolute left-3 top-3 z-10 rounded-md border border-zinc-200/90 bg-white/95 px-2.5 py-1 text-xs font-medium text-[#1a3f1d]">
          {displayCategory}
        </div>
        <div className="absolute right-3 top-3 z-10 rounded-md border border-[#1B5E20]/25 bg-white/95 px-2.5 py-1 text-xs font-medium text-[#1B5E20]">
          Eco choice
        </div>
        <Image
          src={product.image}
          alt={displayName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="space-y-4 p-5 md:p-6">
        <h3 className="text-lg font-medium leading-snug tracking-tight text-[#1a3f1d]">{displayName}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-[#4a524d]">{displayDescription}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold tabular-nums text-[#5c4f46]">₹{product.price}</span>
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-medium ${
              product.stock === "inStock"
                ? "bg-[#e3ebe4] text-[#1a3f1d]"
                : "bg-red-50 text-red-800"
            }`}
          >
            {product.stock === "inStock" ? "In stock" : "Out of stock"}
          </span>
        </div>
        <div className="flex gap-2">
          <Link
            href={productUrl}
            className="flex-1 rounded-lg border border-black/12 px-4 py-2.5 text-center text-sm font-medium text-[#1B5E20] transition-colors hover:bg-[#f4f6f4]"
          >
            View details
          </Link>
          {quantity > 0 ? (
            <div className="inline-flex h-11 min-h-11 items-stretch overflow-hidden rounded-lg border border-[#1B5E20]/35 bg-white text-[#1B5E20]">
              <button
                type="button"
                onClick={() => updateQuantity(product._id, quantity - 1)}
                className="flex w-10 min-w-10 items-center justify-center text-lg font-medium hover:bg-[#f0f4f0]"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="flex min-w-10 items-center justify-center border-x border-[#1B5E20]/25 bg-[#f6f8f6] px-2 text-center text-sm font-medium tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(product._id, Math.min(quantity + 1, CART_MAX_QUANTITY))}
                className="flex w-10 min-w-10 items-center justify-center text-lg font-medium hover:bg-[#f0f4f0]"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock !== "inStock"}
              className="btn-primary px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
