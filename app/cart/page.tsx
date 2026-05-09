"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { CART_MAX_QUANTITY } from "@/lib/constants";
import { formatEur } from "@/lib/currency";
import { buildWhatsAppCartMessage } from "@/lib/whatsapp";

export default function CartPage() {
  const { items, subtotal, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [customerNote, setCustomerNote] = useState("");

  const checkoutUrl = useMemo(
    () =>
      buildWhatsAppCartMessage(
        items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
        customerNote.trim() || undefined,
      ),
    [items, subtotal, customerNote],
  );

  const handleCheckoutOnWhatsApp = () => {
    window.open(checkoutUrl, "_blank", "noopener,noreferrer");
    const shouldClear = window.confirm(
      "Did you send the WhatsApp order message? Click OK to clear your cart.",
    );
    if (shouldClear) {
      clearCart();
      setCustomerNote("");
    }
  };

  return (
    <div className="container-padded min-w-0 max-w-full py-10 pb-28 md:py-14 md:pb-14">
      <div className="mb-6 flex min-w-0 flex-wrap items-center justify-between gap-3">
        <h1 className="section-title min-w-0">Your Cart</h1>
        {items.length > 0 ? (
          <button
            type="button"
            onClick={clearCart}
            className="rounded-xl border border-red-300 px-4 py-2 text-sm font-semibold text-red-700"
          >
            Clear Cart
          </button>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="card-soft p-8 text-center">
          <p className="text-[#4d5c4f]">Your cart is empty.</p>
          <Link href="/products" className="btn-primary mt-4 inline-block">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid min-w-0 gap-6 lg:grid-cols-3">
          <div className="min-w-0 space-y-4 lg:col-span-2">
            {items.map((item) => (
              <article key={item.productId} className="card-soft flex min-w-0 gap-4 p-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#eef5e9]">
                  <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2 gap-y-1">
                    <h2 className="min-w-0 max-w-full break-words font-semibold text-[#1B5E20]">{item.name}</h2>
                    <p className="shrink-0 font-semibold text-[#1B5E20]">{formatEur(item.price * item.quantity)}</p>
                  </div>
                  <p className="text-sm text-[#8D6E63]">{formatEur(item.price)}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
                    <button type="button" onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="rounded-lg border border-[#A5D6A7] px-2">-</button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.productId, Math.min(item.quantity + 1, CART_MAX_QUANTITY))} className="rounded-lg border border-[#A5D6A7] px-2">+</button>
                    <button type="button" onClick={() => removeFromCart(item.productId)} className="text-sm font-semibold text-red-600 sm:ml-1">Remove</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="card-soft h-fit min-w-0 space-y-3 p-6 lg:sticky lg:top-24">
            <h3 className="text-xl font-semibold text-[#1B5E20]">Order Summary</h3>
            <div className="flex justify-between text-sm text-[#4d5c4f]">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between gap-3 text-sm text-[#4d5c4f]">
              <span className="shrink-0">Shipping</span>
              <span className="break-words text-right">EU / UK rates on WhatsApp</span>
            </div>
            <div className="border-t border-[#A5D6A7]/50 pt-3">
              <div className="flex justify-between font-semibold text-[#1B5E20]">
                <span>Subtotal</span>
                <span>{formatEur(subtotal)}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="customer-note" className="text-sm font-semibold text-[#1B5E20]">
                Note (optional)
              </label>
              <textarea
                id="customer-note"
                value={customerNote}
                onChange={(event) => setCustomerNote(event.target.value)}
                placeholder="Add delivery note, preferred time, etc."
                rows={3}
                className="input-premium"
              />
            </div>
            <button
              type="button"
              onClick={handleCheckoutOnWhatsApp}
              className="btn-primary micro-hover inline-flex w-full items-center justify-center"
            >
              Checkout on WhatsApp
            </button>
            <p className="text-xs text-[#4d5c4f]">Proceed via WhatsApp for final shipping and payment details.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
