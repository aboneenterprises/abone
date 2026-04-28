import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppGeneralMessage } from "@/lib/whatsapp";

export function WhatsAppFloatButton() {
  return (
    <a
      href={buildWhatsAppGeneralMessage()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 transition duration-300 hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition group-hover:opacity-100" />
      <FaWhatsapp size={28} className="relative z-10" />
    </a>
  );
}
