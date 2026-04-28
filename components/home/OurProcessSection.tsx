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
      "We pack thoughtfully and deliver across Europe with a focus on safety, speed, and minimal waste.",
    icon: FaTruckFast,
  },
];

export function OurProcessSection() {
  return (
    <section className="animate-fade-up animate-stagger-3">
      <h2 className="section-title mb-2 text-center">Our Process</h2>
      <p className="mx-auto mb-8 max-w-2xl text-center text-[#4d5c4f]">
        From ethical sourcing to final delivery, every step is designed to keep quality high and impact low.
      </p>

      <div className="mb-2 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article
              key={`mobile-${step.title}`}
              className="relative min-w-[85%] snap-start overflow-hidden rounded-2xl border border-[#A5D6A7]/40 bg-gradient-to-br from-white via-[#f7fcf2] to-[#edf7e9] p-5 shadow-lg shadow-[#1b5e20]/10"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1B5E20] text-white shadow-md shadow-[#1B5E20]/25">
                  <Icon />
                </span>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#1B5E20] ring-1 ring-[#A5D6A7]/60">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#1B5E20]">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#4d5c4f]">{step.description}</p>
              {index < processSteps.length - 1 ? <span className="mt-3 inline-block text-xs font-medium text-[#6ea772]">Swipe for next step -&gt;</span> : null}
            </article>
          );
        })}
      </div>

      <div className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article key={step.title} className="card-soft border border-[#A5D6A7]/40 p-5">
              <div className="mb-4 inline-flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f4e6] text-[#1B5E20]">
                  <Icon />
                </span>
                <span className="rounded-full bg-[#f2f8ee] px-2.5 py-1 text-xs font-semibold text-[#1B5E20]">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#1B5E20]">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#4d5c4f]">{step.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
