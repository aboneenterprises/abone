"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiMagnifyingGlassPlus,
  HiXMark,
} from "react-icons/hi2";

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
  const [zoomOpen, setZoomOpen] = useState(false);

  const activeImage = gallery[activeIndex] || image;
  const hasMultiple = gallery.length > 1;

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="space-y-4">
        <div className="group relative h-full min-h-[420px] overflow-hidden rounded-2xl bg-[#eef5e9]">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {gallery.map((img, index) => (
              <div key={`${img}-${index}`} className="relative h-full min-h-[420px] w-full shrink-0">
                <Image
                  src={img}
                  alt={`${name} image ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-contain p-2"
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

          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-sm font-semibold text-[#1B5E20] shadow-md transition hover:bg-white"
          >
            <HiMagnifyingGlassPlus />
            Zoom
          </button>
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

      {zoomOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-[#1B5E20]"
            aria-label="Close zoom"
          >
            <HiXMark size={22} />
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-[#102112]">
            <Image src={activeImage} alt={name} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      ) : null}
    </>
  );
}
