import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminTokenFromRequest } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute = pathname.startsWith("/admin/login");
  const isAdmin = verifyAdminTokenFromRequest(request);

  if (isAdminRoute && !isAdminLoginRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isAdminRoute && isAdminLoginRoute && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isAdminRoute && isAdmin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
