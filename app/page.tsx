import Link from "next/link";
import Image from "next/image";
import { FaLeaf } from "react-icons/fa";
import { ProductCard } from "@/components/ProductCard";
import { OurProcessSection } from "@/components/home/OurProcessSection";
import { getFeaturedProducts } from "@/lib/products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const homeProducts = featuredProducts.slice(0, 4);

  return (
    <div className="container-padded py-10 md:py-14">
      <section className="glass-panel animate-fade-up mb-14 grid gap-8 overflow-hidden border border-[#A5D6A7]/40 bg-gradient-to-br from-white/75 via-[#f7fcf2]/70 to-[#eaf4e4]/85 p-8 md:grid-cols-2 md:p-12">
        <div className="animate-fade-up animate-stagger-1 space-y-5">
          <p className="inline-flex rounded-full border border-[#A5D6A7]/60 bg-white px-3 py-1 text-sm font-medium text-[#1B5E20]">
            Sustainable Indian Craft for Europe
          </p>
          <h1 className="display-heading text-4xl font-semibold leading-tight tracking-tight text-[#1B5E20] md:text-6xl">
            Premium eco-friendly products with timeless design.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-[#4d5c4f]">
            Discover handcrafted jute bags, natural lifestyle items, and sustainable home essentials.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary micro-hover">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="animate-fade-up animate-stagger-2 overflow-hidden p-3">
          <div className="relative h-[280px] w-full overflow-hidden rounded-2xl md:h-[360px]">
            <Image
              src="/hero-eco.jpg"
              alt="Eco-friendly handcrafted jute and natural products"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <div className="animate-fade-up mb-14 flex items-center justify-center gap-3 text-[#1B5E20]/70">
        <FaLeaf className="animate-float" />
        <span className="h-px w-20 bg-[#A5D6A7]" />
        <FaLeaf className="animate-float-delayed" />
        <span className="h-px w-20 bg-[#A5D6A7]" />
        <FaLeaf className="animate-float" />
      </div>

      <section className="animate-fade-up animate-stagger-1 mb-14">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <h2 className="section-title">Products</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {homeProducts.length > 0 ? (
            homeProducts.map((product) => <ProductCard key={String(product._id)} product={{ ...product, _id: String(product._id) }} />)
          ) : (
            <p className="text-[#4d5c4f]">No products yet. Add products from admin panel.</p>
          )}
        </div>
      </section>

      <section className="card-soft animate-fade-up animate-stagger-2 mb-14 border border-[#A5D6A7]/40 p-8">
        <h2 className="section-title text-center">About Us</h2>
        <p className="mx-auto mt-4 max-w-4xl text-center leading-8 text-[#4d5c4f]">
          We connect Indian artisans with conscious customers in Europe by curating elegant, durable and natural products.
          Our mission is to make sustainable choices beautiful and accessible.
        </p>
        <Link href="/about" className="mx-auto mt-4 block w-fit font-semibold text-[#1B5E20] underline-offset-4 hover:underline">
          Learn more about our mission
        </Link>
      </section>

      <div className="animate-fade-up mb-14 flex items-center justify-center gap-3 text-[#8D6E63]/80">
        <span className="h-px w-20 bg-[#d6c0b6]" />
        <FaLeaf className="animate-float-delayed" />
        <span className="h-px w-20 bg-[#d6c0b6]" />
      </div>

      <OurProcessSection />
    </div>
  );
}
