import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailsContent } from "@/components/product/ProductDetailsContent";
import type { Product } from "@/lib/types";
import { getProductById } from "@/lib/products";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: `/products/${id}`,
    },
    openGraph: {
      title: `${product.name} | Abone Eco Store`,
      description: product.description,
      url: `/products/${id}`,
      images: product.image
        ? [
            {
              url: product.image,
              alt: product.name,
            },
          ]
        : undefined,
    },
  };
}

export const revalidate = 300;

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [product.image, ...extraImages].filter(Boolean),
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: product.price,
      availability: product.stock === "inStock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${siteUrl}/products/${id}`,
    },
  };

  return (
    <div className="container-padded py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <ProductDetailsContent product={serializedProduct} extraImages={extraImages} />
    </div>
  );
}
