import type { Metadata } from "next";
import { PageBackNav } from "@/components/PageBackNav";
import { ProductForm } from "@/components/ProductForm";

export const metadata: Metadata = {
  title: "Add Product",
};

export default function NewProductPage() {
  return (
    <div className="container-padded py-10">
      <PageBackNav href="/admin" label="Back to admin" />
      <h1 className="section-title mb-6">Add Product</h1>
      <ProductForm mode="create" />
    </div>
  );
}
