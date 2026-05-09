"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const WhatsAppFloatButton = dynamic(
  () => import("@/components/WhatsAppFloatButton").then((module) => module.WhatsAppFloatButton),
  { ssr: false },
);

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
