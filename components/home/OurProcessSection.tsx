import { FaBoxesPacking, FaLeaf, FaRegCircleCheck, FaTruckFast } from "react-icons/fa6";

const processSteps = [
  {
    title: "Source Responsibly",
    description:
      "We work with trusted artisan communities and choose natural, low-impact materials like jute and cotton.",
    icon: FaLeaf,
  },
  {
    title: "Craft With Care",
    description:
      "Each product is handcrafted with close attention to quality, usability, and timeless design details.",
    icon: FaRegCircleCheck,
  },
  {
    title: "Quality Check",
    description:
      "Before dispatch, every piece is reviewed for finish, durability, and presentation standards.",
    icon: FaBoxesPacking,
  },
  {
    title: "Deliver To You",
    description:
      "We pack thoughtfully and ship to the EU and UK with a focus on safety, speed, and minimal waste.",
    icon: FaTruckFast,
  },
];

export function OurProcessSection() {
  return (
    <section className="animate-fade-up animate-stagger-3">
      <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.14em] text-[#5a635e]">How we work</p>
      <h2 className="section-title mb-3 text-center">Our process</h2>
      <p className="mx-auto mb-10 max-w-2xl text-center text-[15px] leading-relaxed text-[#4a524d] md:mb-12">
        From ethical sourcing to packing and dispatch to the EU and UK, every step keeps quality high and impact low.
      </p>

      <div className="mb-2 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article
              key={`mobile-${step.title}`}
              className="relative min-w-[85%] snap-start overflow-hidden rounded-xl border border-zinc-200/90 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1B5E20] text-white">
                  <Icon />
                </span>
                <span className="rounded-md border border-zinc-200 bg-[#f6f8f6] px-2.5 py-1 text-xs font-medium text-[#1a3f1d]">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-medium text-[#1a3f1d]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4a524d]">{step.description}</p>
              {index < processSteps.length - 1 ? (
                <span className="mt-3 inline-block text-xs font-medium text-[#6b736e]">Swipe for next step →</span>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article key={step.title} className="card-soft p-5">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f0e9] text-[#1B5E20]">
                  <Icon />
                </span>
                <span className="rounded-md border border-zinc-200 bg-[#f6f8f6] px-2.5 py-1 text-xs font-medium text-[#1a3f1d]">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-medium text-[#1a3f1d]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4a524d]">{step.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
