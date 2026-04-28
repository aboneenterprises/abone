import type { Metadata } from "next";
import Link from "next/link";
import { AdminProductsTable } from "@/components/AdminProductsTable";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const products = await getAllProducts();

  return (
    <div className="container-padded py-10">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="section-title">Admin Dashboard</h1>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1B5E20] px-5 py-3 font-semibold !text-white shadow-md shadow-[#1B5E20]/20"
          >
            Add Product
          </Link>
          <a
            href="/api/auth/logout"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1B5E20]/50 px-5 py-3 font-semibold text-[#1B5E20]"
          >
            Logout
          </a>
        </div>
      </div>
      <AdminProductsTable
        products={products.map((product) => ({
          ...product,
          _id: String(product._id),
        }))}
      />
    </div>
  );
}
