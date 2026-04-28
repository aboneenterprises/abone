import type { Metadata } from "next";
import Link from "next/link";
import { ProductForm } from "@/components/ProductForm";

export const metadata: Metadata = {
  title: "Add Product",
};

export default function NewProductPage() {
  return (
    <div className="container-padded py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="section-title">Add Product</h1>
        <Link href="/admin" className="rounded-xl border border-[#1B5E20]/40 px-4 py-2 font-semibold text-[#1B5E20]">
          Back
        </Link>
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
