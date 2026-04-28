"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppFloatButton } from "@/components/WhatsAppFloatButton";

type RouteShellProps = {
  children: React.ReactNode;
};

export function RouteShell({ children }: RouteShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-180px)]">{children}</main>
      <Footer />
      <WhatsAppFloatButton />
    </>
  );
}
