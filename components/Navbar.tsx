"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "@/components/cart/CartProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const shouldPrioritizeLogo = pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-[#A5D6A7]/45 bg-white backdrop-blur-xl">
      <nav className="container-padded flex h-18 items-center justify-between gap-3 py-2">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl"
          aria-label="ABOne Enterprises Home"
        >
          <Image
            src="/nav-logo.png"
            alt="ABOne Enterprises logo"
            width={512}
            height={181}
            className="h-12 w-auto object-contain sm:h-16"
            priority={shouldPrioritizeLogo}
          />
        </Link>
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/cart"
            className="relative inline-flex h-10 items-center gap-1 rounded-xl border border-[#A5D6A7]/60 bg-white/80 px-3 text-sm font-semibold text-[#1B5E20]"
            aria-label="Open cart"
          >
            <span className="relative inline-flex">
              <HiOutlineShoppingBag size={18} />
              {totalItems > 0 ? (
                <span className="absolute -right-2 -top-2 inline-flex min-w-4 items-center justify-center rounded-full bg-[#1B5E20] px-1 text-[10px] font-bold leading-4 text-white">
                  {totalItems}
                </span>
              ) : null}
            </span>
            <span>Cart</span>
          </Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
            <div className="flex items-center gap-2 text-base font-semibold text-[#1B5E20]">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 transition ${
                  pathname === link.href
                    ? "text-[#1B5E20] underline decoration-[#A5D6A7] underline-offset-4"
                    : "text-[#2d3b2f] hover:text-[#1B5E20]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            </div>
          <Link
            href="/cart"
            className="relative inline-flex h-12 items-center gap-2 rounded-xl px-4 text-base font-semibold text-[#1B5E20] transition hover:text-[#144919]"
          >
            <span className="relative inline-flex">
              <HiOutlineShoppingBag size={22} />
              {totalItems > 0 ? (
                <span className="absolute -right-2.5 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#1B5E20] px-1.5 text-xs font-bold leading-4 text-white">
                  {totalItems}
                </span>
              ) : null}
            </span>
            Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}
