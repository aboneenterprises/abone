import type { Metadata } from "next";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_EU,
  CONTACT_PHONE_PRIMARY,
} from "@/lib/constants";
import { ContactForm } from "./ContactForm";
import { buildWhatsAppGeneralMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Abone Eco Store for sustainable products.",
};

export default function ContactPage() {
  return (
    <div className="container-padded py-10 md:py-14">
      <h1 className="section-title mb-6">Contact Us</h1>
      <div className="card-soft mb-8 border border-[#A5D6A7]/40 p-6 text-[#4d5c4f] md:p-8">
        <p className="text-base leading-7">Phone: {CONTACT_PHONE_PRIMARY} | {CONTACT_PHONE_EU}</p>
        <p className="text-base leading-7">Email: {CONTACT_EMAIL}</p>
        <p className="text-base leading-7">Address: {CONTACT_ADDRESS}</p>
        <a
          href={buildWhatsAppGeneralMessage()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white shadow-md shadow-[#25D366]/30 transition hover:-translate-y-0.5"
        >
          Quick Contact on WhatsApp
        </a>
      </div>
      <ContactForm />
    </div>
  );
}
