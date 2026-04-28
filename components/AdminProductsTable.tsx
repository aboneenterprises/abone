"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Product } from "@/lib/types";

type AdminProductsTableProps = {
  products: Product[];
};

export function AdminProductsTable({ products }: AdminProductsTableProps) {
  const router = useRouter();

  const updateStock = async (id: string, stock: "inStock" | "outOfStock") => {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock }),
    });

    if (!response.ok) {
      toast.error("Failed to update stock");
      return;
    }

    toast.success("Stock updated");
    router.refresh();
  };

  const deleteProduct = async (id: string) => {
    const ok = window.confirm("Delete this product?");
    if (!ok) {
      return;
    }

    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Failed to delete product");
      return;
    }

    toast.success("Product deleted");
    router.refresh();
  };

  return (
    <div className="overflow-x-auto rounded-3xl border border-[#A5D6A7]/40 bg-white/95 shadow-xl shadow-[#1b5e20]/10">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[#eef7ea] text-[#1B5E20]">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t border-[#A5D6A7]/20 transition hover:bg-[#f6faef]">
              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3 font-semibold text-[#8D6E63]">₹{product.price}</td>
              <td className="px-4 py-3">{product.category}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-[#A5D6A7]/40 px-3 py-1 text-xs font-semibold text-[#1B5E20]">
                  {product.stock}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Link href={`/admin/products/${product._id}/edit`} className="rounded-lg border border-[#1B5E20]/60 px-3 py-1 text-[#1B5E20] transition hover:bg-[#f2f8ee]">
                    Edit
                  </Link>
                  <button onClick={() => updateStock(product._id, product.stock === "inStock" ? "outOfStock" : "inStock")} className="rounded-lg bg-[#8D6E63] px-3 py-1 text-white transition hover:bg-[#77584d]">
                    Toggle Stock
                  </button>
                  <button onClick={() => deleteProduct(product._id)} className="rounded-lg bg-red-600 px-3 py-1 text-white transition hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 ? <p className="p-4 text-[#4d5c4f]">No products found.</p> : null}
    </div>
  );
}
