import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { OurProcessSection } from "@/components/home/OurProcessSection";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Eco-friendly products from India for Europe",
  description:
    "Shop unique eco-friendly products sourced from India across Europe: jute bags, handcrafted items, and natural sustainable goods.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Abone Eco Store",
    description:
      "Unique eco-friendly products sourced from India for Europe, including jute bags, handcrafted items, and natural products.",
    url: "/",
    images: [
      {
        url: "/hero-eco.jpg",
        alt: "Eco-friendly handcrafted products by Abone Eco Store",
      },
    ],
  },
};

export const revalidate = 300;

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const homeProducts = featuredProducts.slice(0, 4);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Abone Eco Store",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    description:
      "E-commerce store offering eco-friendly jute bags, handcrafted items, and natural products across Europe.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        areaServed: ["EU", "GB"],
      },
    ],
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Abone Eco Store",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/products`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="container-padded py-12 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <section className="glass-panel animate-fade-up mb-16 grid gap-10 overflow-hidden p-8 md:mb-20 md:grid-cols-2 md:gap-12 md:p-12">
        <div className="animate-fade-up animate-stagger-1 flex flex-col justify-center space-y-6">
          <p className="inline-flex w-fit rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-[#3d5240]">
            Europe & UK
          </p>
          <h1 className="display-heading max-w-2xl text-4xl font-medium leading-[1.12] tracking-tight text-[#1a3f1d] md:text-[2.75rem] md:leading-[1.1] lg:text-5xl">
            Unique eco-friendly products sourced from India for Europe.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-[#4a524d] md:text-xl md:leading-relaxed">
            We are an e-commerce business focused on jute bags, handcrafted items, natural products, and unique pieces
            sourced from different states of India.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link href="/products" className="btn-primary micro-hover">
              Shop now
            </Link>
          </div>
        </div>
        <div className="animate-fade-up animate-stagger-2 flex items-center p-1 md:p-0">
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl border border-black/[0.06] shadow-sm md:aspect-[4/3]">
            <Image
              src="/hero-eco.jpg"
              alt="Eco-friendly handcrafted jute and natural products"
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 42vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="animate-fade-up animate-stagger-1 mb-16 md:mb-20">
        <div className="mb-8 flex flex-col items-center gap-2 text-center md:mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#5a635e]">Featured</p>
          <h2 className="section-title">Products</h2>
        </div>
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {homeProducts.length > 0 ? (
            homeProducts.map((product) => <ProductCard key={String(product._id)} product={{ ...product, _id: String(product._id) }} />)
          ) : (
            <p className="text-[#4d5c4f]">No products yet. Add products from admin panel.</p>
          )}
        </div>
      </section>

      <OurProcessSection />

      <section className="card-soft animate-fade-up mt-16 border border-[#A5D6A7]/40 p-6 md:mt-20 md:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#5a635e]">About the business</p>
        <h2 className="section-title mt-2">Authentic sustainable products, thoughtfully curated</h2>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-[#4a524d] md:text-base">
          We carefully select high-quality, authentic products and offer them through our online platform to customers
          across Europe who value sustainability and craftsmanship.
        </p>
        <div className="mt-5 grid gap-3 text-sm text-[#2d3b2f] md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-[#A5D6A7]/45 bg-white/70 px-4 py-3">
            <p className="font-semibold text-[#1B5E20]">Jute bags</p>
            <p className="mt-1 text-[#4a524d]">Practical and stylish eco alternatives for daily use.</p>
          </div>
          <div className="rounded-lg border border-[#A5D6A7]/45 bg-white/70 px-4 py-3">
            <p className="font-semibold text-[#1B5E20]">Handcrafted items</p>
            <p className="mt-1 text-[#4a524d]">Made by skilled artisans with attention to detail and quality.</p>
          </div>
          <div className="rounded-lg border border-[#A5D6A7]/45 bg-white/70 px-4 py-3">
            <p className="font-semibold text-[#1B5E20]">Natural and sustainable</p>
            <p className="mt-1 text-[#4a524d]">Materials and products chosen to support conscious living.</p>
          </div>
          <div className="rounded-lg border border-[#A5D6A7]/45 bg-white/70 px-4 py-3">
            <p className="font-semibold text-[#1B5E20]">Unique state-sourced pieces</p>
            <p className="mt-1 text-[#4a524d]">Distinct products sourced from different states of India.</p>
          </div>
        </div>
        <div className="mt-5">
          <Link href="/about" className="btn-secondary">
            Learn more
          </Link>
        </div>
      </section>
    </div>
  );
}
