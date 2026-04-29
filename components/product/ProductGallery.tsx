"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

type ProductGalleryProps = {
  name: string;
  image: string;
  images?: string[];
};

export function ProductGallery({ name, image, images = [] }: ProductGalleryProps) {
  const gallery = useMemo(() => {
    const merged = [image, ...images].filter(Boolean);
    return Array.from(new Set(merged));
  }, [image, images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultiple = gallery.length > 1;

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#eef5e9]">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {gallery.map((img, index) => (
            <div key={`${img}-${index}`} className="relative h-full w-full shrink-0">
                <Image
                  src={img}
                  alt={`${name} image ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                />
              </div>
            ))}
          </div>

          {hasMultiple ? (
            <>
              <button
                type="button"
                onClick={goToPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-[#1B5E20] shadow-md transition hover:bg-white"
                aria-label="Previous image"
              >
                <HiChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-[#1B5E20] shadow-md transition hover:bg-white"
                aria-label="Next image"
              >
                <HiChevronRight size={20} />
              </button>
            </>
          ) : null}
        </div>

        {hasMultiple ? (
          <div className="flex items-center justify-center gap-2">
            {gallery.map((img, index) => (
              <button
                type="button"
                key={`dot-${img}-${index}`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  index === activeIndex
                    ? "w-7 bg-[#1B5E20]"
                    : "w-2.5 bg-[#A5D6A7] hover:bg-[#7fb883]"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        ) : null}
    </div>
  );
}
