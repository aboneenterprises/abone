import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppGeneralMessage } from "@/lib/whatsapp";

export function WhatsAppFloatButton() {
  return (
    <a
      href={buildWhatsAppGeneralMessage()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#25D366] text-white shadow-lg shadow-black/15 transition-shadow duration-200 hover:shadow-xl md:bottom-6 md:right-6"
      aria-label="Contact us on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition group-hover:opacity-100" />
      <FaWhatsapp size={28} className="relative z-10" />
    </a>
  );
}
