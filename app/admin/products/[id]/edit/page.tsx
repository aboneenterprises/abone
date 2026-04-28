import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductForm } from "@/components/ProductForm";
import { getProductById } from "@/lib/products";

export const metadata: Metadata = {
  title: "Edit Product",
};

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container-padded py-10">
      <h1 className="section-title mb-6">Edit Product</h1>
      <ProductForm mode="edit" initialData={{ ...product, _id: String(product._id) }} />
    </div>
  );
}
