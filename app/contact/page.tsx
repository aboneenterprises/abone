import type { Metadata } from "next";
import { PageBackNav } from "@/components/PageBackNav";
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
  description: "Contact Abone Eco Store — European and UK customers welcome. Product questions, orders, and delivery.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Abone Eco Store",
    description:
      "Contact Abone Eco Store for product enquiries, order support, and delivery information across Europe and the UK.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="container-padded py-10 md:py-14">
      <PageBackNav href="/" label="Back to home" />
      <h1 className="section-title mb-6">Contact us</h1>
      <div className="card-soft mb-8 border border-[#A5D6A7]/40 p-6 text-[#4d5c4f] md:p-8">
        <p className="text-base leading-7">
          We welcome customers across Europe and the UK. For the fastest reply on orders and delivery, use WhatsApp or
          the EU number below.
        </p>
        <p className="mt-4 text-base leading-7">
          <span className="font-semibold text-[#1B5E20]">EU / UK:</span> {CONTACT_PHONE_EU}
        </p>
        <p className="text-base leading-7">
          <span className="font-semibold text-[#1B5E20]">India:</span> {CONTACT_PHONE_PRIMARY}
        </p>
        <p className="mt-3 text-base leading-7">Email: {CONTACT_EMAIL}</p>
        <p className="text-base leading-7">Registered address: {CONTACT_ADDRESS}</p>
        <a
          href={buildWhatsAppGeneralMessage()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex rounded-xl bg-[#25D366] px-5 py-3 font-semibold text-white shadow-md shadow-[#25D366]/30 transition hover:-translate-y-0.5"
        >
          Contact on WhatsApp
        </a>
      </div>
      <ContactForm />
    </div>
  );
}
