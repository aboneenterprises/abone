"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/components/cart/CartProvider";
import { CART_MAX_QUANTITY } from "@/lib/constants";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productUrl = `/products/${product._id}`;
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.productId === product._id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article className="card-soft group overflow-hidden border border-[#A5D6A7]/40 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#1B5E20]/20">
      <div className="relative h-56 w-full overflow-hidden bg-[#eef5e9]">
        <div className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#1B5E20] shadow-sm">
          {product.category}
        </div>
        <div className="absolute right-3 top-3 z-10 rounded-full bg-[#1B5E20]/85 px-3 py-1 text-xs font-semibold text-white shadow-sm">
          Eco Choice
        </div>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="space-y-3 p-6">
        <h3 className="text-lg font-semibold tracking-tight text-[#1B5E20]">{product.name}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-[#4d5c4f]">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#8D6E63]">₹{product.price}</span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              product.stock === "inStock"
                ? "bg-[#A5D6A7]/60 text-[#1B5E20]"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock === "inStock" ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <div className="flex gap-3">
          <Link
            href={productUrl}
            className="flex-1 rounded-xl border border-[#1B5E20]/60 px-4 py-2 text-center text-sm font-medium text-[#1B5E20] transition hover:bg-[#f2f8ee]"
          >
            View Details
          </Link>
          {quantity > 0 ? (
            <div className="inline-flex h-10 items-stretch overflow-hidden rounded-xl border-2 border-[#1B5E20] bg-white text-[#1B5E20]">
              <button
                type="button"
                onClick={() => updateQuantity(product._id, quantity - 1)}
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
                onClick={() => updateQuantity(product._id, Math.min(quantity + 1, CART_MAX_QUANTITY))}
                className="flex w-9 items-center justify-center text-base font-bold hover:bg-[#eaf8ea]"
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
              className="btn-primary px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
