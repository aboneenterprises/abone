"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Product, ProductStock } from "@/lib/types";
import { LoadingSpinner } from "@/components/LoadingSpinner";

type ProductFormProps = {
  mode: "create" | "edit";
  initialData?: Product;
};

export function ProductForm({ mode, initialData }: ProductFormProps) {
  const MAX_IMAGES = 6;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(() => {
    const initialImages = Array.isArray(initialData?.images) ? initialData.images : [];
    const merged = [initialData?.image || "", ...initialImages].filter(Boolean);
    return Array.from(new Set(merged)).slice(0, MAX_IMAGES);
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      return;
    }

    const availableSlots = MAX_IMAGES - images.length;
    if (availableSlots <= 0) {
      toast.error(`You can upload up to ${MAX_IMAGES} images`);
      return;
    }

    const filesToUpload = files.slice(0, availableSlots);

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of filesToUpload) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error("One or more image uploads failed");
        continue;
      }

      const data = await response.json();
      if (data.imageUrl) {
        uploadedUrls.push(String(data.imageUrl));
      }
    }

    if (uploadedUrls.length > 0) {
      setImages((prev) => Array.from(new Set([...prev, ...uploadedUrls])).slice(0, MAX_IMAGES));
      toast.success(`${uploadedUrls.length} image${uploadedUrls.length > 1 ? "s" : ""} uploaded`);
    }

    setUploading(false);
    event.target.value = "";
  };

  const handleRemoveImage = (imageUrl: string) => {
    setImages((prev) => prev.filter((img) => img !== imageUrl));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || ""),
      price: Number(formData.get("price") || 0),
      category: String(formData.get("category") || ""),
      stock: String(formData.get("stock") || "inStock") as ProductStock,
      image: images[0] || "",
      images,
    };

    if (!payload.image) {
      toast.error("Please upload at least one product image");
      setLoading(false);
      return;
    }

    const endpoint = mode === "create" ? "/api/products" : `/api/products/${initialData?._id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!response.ok) {
      toast.error("Failed to save product");
      return;
    }

    toast.success(mode === "create" ? "Product added" : "Product updated");
    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="card-soft space-y-4 border border-[#A5D6A7]/40 p-6 md:p-8">
      <input defaultValue={initialData?.name} name="name" required placeholder="Product name" className="input-premium" />
      <textarea defaultValue={initialData?.description} name="description" required rows={4} placeholder="Description" className="input-premium" />
      <input defaultValue={initialData?.price} name="price" type="number" min={0} required placeholder="Price" className="input-premium" />
      <input defaultValue={initialData?.category} name="category" required placeholder="Category" className="input-premium" />
      <select defaultValue={initialData?.stock || "inStock"} name="stock" className="input-premium">
        <option value="inStock">In Stock</option>
        <option value="outOfStock">Out of Stock</option>
      </select>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#1B5E20]">Upload Images (up to 6)</label>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="input-premium py-2" />
        {uploading ? <p className="text-sm text-[#4d5c4f]">Uploading image...</p> : null}
        {images.length > 0 ? (
          <div className="space-y-2 rounded-xl border border-[#A5D6A7]/40 bg-white/70 p-3">
            <p className="text-sm font-medium text-[#1B5E20]">
              Uploaded Images ({images.length}/{MAX_IMAGES}) - first image is used as product cover
            </p>
            <div className="space-y-2">
              {images.map((img, index) => (
                <div key={img} className="flex items-center justify-between gap-3 rounded-lg bg-[#f2f8ee] px-3 py-2">
                  <p className="min-w-0 flex-1 break-all text-xs text-[#4d5c4f]">
                    {index + 1}. {img}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img)}
                    className="rounded-md border border-[#1B5E20]/30 px-2 py-1 text-xs font-semibold text-[#1B5E20] hover:bg-[#e8f4e6]"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <button disabled={loading} className="btn-primary inline-flex min-h-11 items-center justify-center !text-white disabled:opacity-60">
        {loading ? <LoadingSpinner /> : mode === "create" ? "Add Product" : "Update Product"}
      </button>
    </form>
  );
}
