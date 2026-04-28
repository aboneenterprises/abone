import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Our eco-friendly mission and Indian craftsmanship story.",
};

export default function AboutPage() {
  return (
    <div className="container-padded py-10">
      <h1 className="section-title mb-6">About Abone Eco Store</h1>
      <div className="card-soft space-y-8 border border-[#A5D6A7]/40 p-8 text-[#4d5c4f]">
        <p>
          Abone Eco Store brings premium, eco-friendly Indian craftsmanship to customers across Europe.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#1B5E20]">Our Story</h2>
          <p>
            We started Abone to connect skilled Indian artisan communities with conscious customers looking for
            beautiful alternatives to mass-produced products. Many of these craft techniques are passed down through
            generations, and every purchase helps keep that heritage alive.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#1B5E20]">Our Mission</h2>
          <p>
            Our mission is simple: make sustainable living easier without compromising quality or aesthetics. We curate
            pieces that are functional, timeless, and made with respect for people and the planet.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#1B5E20]">How We Work</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Partner with artisan groups that prioritize ethical and safe working conditions.</li>
            <li>Prefer natural materials like jute, cotton, and responsibly sourced fibers.</li>
            <li>Focus on durable construction so products stay useful for years, not months.</li>
            <li>Use mindful packaging to reduce unnecessary waste in delivery.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-[#1B5E20]">Our Promise</h2>
          <p>
            We are committed to transparent sourcing, consistent quality, and long-term trust. When you choose Abone,
            you support thoughtful craftsmanship and a cleaner, more responsible way of shopping.
          </p>
        </section>
      </div>
    </div>
  );
}
