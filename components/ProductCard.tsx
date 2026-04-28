import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppProductMessage } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productUrl = `/products/${product._id}`;
  const whatsappUrl = buildWhatsAppProductMessage(
    product.name,
    product.price,
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}${productUrl}`,
  );

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
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-[#25D366]/30 transition hover:-translate-y-0.5 hover:bg-[#22c55e]"
          >
            <FaWhatsapp />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
