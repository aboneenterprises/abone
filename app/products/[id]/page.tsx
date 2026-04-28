import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailsContent } from "@/components/product/ProductDetailsContent";
import type { Product } from "@/lib/types";
import { getProductById } from "@/lib/products";
import { buildWhatsAppProductMessage } from "@/lib/whatsapp";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const productPath = `/products/${String(product._id)}`;
  const fullProductUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}${productPath}`;
  const whatsappUrl = buildWhatsAppProductMessage(product.name, product.price, fullProductUrl);
  const extraImages = Array.isArray((product as Record<string, unknown>).images)
    ? ((product as Record<string, unknown>).images as string[])
    : [];

  const serializedProduct: Product = {
    _id: String(product._id),
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    category: product.category,
    stock: product.stock,
  };

  return (
    <div className="container-padded py-10 md:py-14">
      <ProductDetailsContent product={serializedProduct} whatsappUrl={whatsappUrl} extraImages={extraImages} />
    </div>
  );
}
