"use client";

import { useEffect, useRef } from "react";
import { useState } from "react";

const testimonials = [
  {
    quote: "Beautiful quality and elegant eco packaging.",
    name: "Sravani Reddy",
    city: "Khammam, Telangana",
  },
  {
    quote: "The jute bags are premium and very durable.",
    name: "Karthikeya Chava",
    city: "Madhira, Telangana",
  },
  {
    quote: "A trusted partner for sustainable sourcing.",
    name: "Harika Yellanki",
    city: "Sattupalli, Telangana",
  },
  {
    quote: "Great finishing, quick support, and lovely design.",
    name: "Divya M",
    city: "Hyderabad, Telangana",
  },
  {
    quote: "Perfect eco gifts for family and friends.",
    name: "Praneeth K",
    city: "Vijayawada, Andhra Pradesh",
  },
  {
    quote: "Exactly what we needed for sustainable daily use.",
    name: "Niharika S",
    city: "Bengaluru, Karnataka",
  },
];

export function TestimonialsSection() {
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = mobileTrackRef.current;
    if (!track || window.matchMedia("(min-width: 768px)").matches) {
      return;
    }

    const getCards = () => Array.from(track.querySelectorAll<HTMLElement>("[data-testimonial-card='true']"));
    let currentIndex = 0;

    const timer = setInterval(() => {
      const cards = getCards();
      if (cards.length <= 1) {
        return;
      }

      currentIndex = (currentIndex + 1) % cards.length;
      setActiveIndex(currentIndex);
      const targetCard = cards[currentIndex];
      track.scrollTo({ left: targetCard.offsetLeft, behavior: "smooth" });
    }, 2600);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="animate-fade-up animate-stagger-3">
      <h2 className="section-title mb-6 text-center">Testimonials</h2>

      <div className="md:hidden">
        <div
          ref={mobileTrackRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.quote}
              data-testimonial-card="true"
              className="card-soft min-w-[84%] snap-start border border-[#A5D6A7]/40 p-5 text-[#4d5c4f]"
            >
              <p>“{testimonial.quote}”</p>
              <footer className="mt-4 text-sm text-[#5a6f5d]">
                <p className="font-semibold text-[#1B5E20]">{testimonial.name}</p>
                <p>{testimonial.city}</p>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              type="button"
              key={`dot-${testimonial.name}-${index}`}
              onClick={() => {
                const track = mobileTrackRef.current;
                const cards = track?.querySelectorAll<HTMLElement>("[data-testimonial-card='true']");
                const targetCard = cards?.[index];
                if (!track || !targetCard) {
                  return;
                }

                setActiveIndex(index);
                track.scrollTo({ left: targetCard.offsetLeft, behavior: "smooth" });
              }}
              className={`h-2.5 rounded-full transition ${
                activeIndex === index ? "w-7 bg-[#1B5E20]" : "w-2.5 bg-[#A5D6A7]"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden gap-5 md:grid md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <blockquote
            key={testimonial.quote}
            className="card-soft border border-[#A5D6A7]/40 p-5 text-[#4d5c4f]"
          >
            <p>“{testimonial.quote}”</p>
            <footer className="mt-4 text-sm text-[#5a6f5d]">
              <p className="font-semibold text-[#1B5E20]">{testimonial.name}</p>
              <p>{testimonial.city}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
