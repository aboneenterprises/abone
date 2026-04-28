import { NextResponse } from "next/server";

function clearAdminCookie(response: NextResponse) {
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearAdminCookie(response);
  return response;
}

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  clearAdminCookie(response);
  return response;
}
