import Image from "next/image";
import {
  BUSINESS_HOURS,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_EU,
  CONTACT_PHONE_PRIMARY,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#A5D6A7]/50 bg-white">
      <div className="container-padded grid gap-8 py-12 md:grid-cols-3">
        <div>
          <Image
            src="/nav-logo.png"
            alt="ABOne Enterprises logo"
            width={512}
            height={181}
            className="h-12 w-auto object-contain sm:h-14"
          />
          <p className="mt-2 max-w-xs text-sm leading-6 text-[#4d5c4f]">
            Premium sustainable Indian craft curated for Europe.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-[#1B5E20]">Contact</h4>
          <p className="mt-2 text-sm text-[#2d3b2f]">{CONTACT_PHONE_PRIMARY}</p>
          <p className="text-sm text-[#2d3b2f]">{CONTACT_PHONE_EU}</p>
          <p className="text-sm text-[#2d3b2f]">{CONTACT_EMAIL}</p>
          <p className="text-sm text-[#2d3b2f]">{CONTACT_ADDRESS}</p>
        </div>
        <div>
          <h4 className="font-semibold text-[#1B5E20]">Business Hours</h4>
          {BUSINESS_HOURS.map((hour) => (
            <p key={hour} className="mt-1 text-sm text-[#4d5c4f]">
              {hour}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
