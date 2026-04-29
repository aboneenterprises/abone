"use client";

import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

type PageBackNavProps = {
  href: string;
  label?: string;
  className?: string;
};

export function PageBackNav({ href, label = "Back", className }: PageBackNavProps) {
  return (
    <Link
      href={href}
      className={[
        "mb-6 inline-flex items-center gap-2 rounded-lg py-2 text-sm font-medium text-[#3d5240] transition-colors hover:text-[#1B5E20]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <HiArrowLeft className="size-5 shrink-0" aria-hidden />
      {label}
    </Link>
  );
}
