import { NextResponse } from "next/server";
import { createAdminToken, isAuthConfigured, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    if (!isAuthConfigured()) {
      return NextResponse.json(
        { message: "Server auth config missing. Set ADMIN_PASSWORD and JWT_SECRET in .env.local, then restart." },
        { status: 500 },
      );
    }

    const { username, password } = await request.json();
    const isValid = await verifyCredentials(username, password);

    if (!isValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = createAdminToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
