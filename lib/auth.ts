import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

function getAuthConfig() {
  return {
    adminUser: process.env.ADMIN_USERNAME || "admin",
    adminPassword: process.env.ADMIN_PASSWORD || "",
    jwtSecret: process.env.JWT_SECRET || "",
  };
}

export function isAuthConfigured() {
  const { adminPassword, jwtSecret } = getAuthConfig();
  return Boolean(adminPassword && jwtSecret);
}

export async function verifyCredentials(username: string, password: string) {
  const { adminUser, adminPassword } = getAuthConfig();

  if (!adminPassword) {
    return false;
  }

  const normalizedUsername = username.trim();
  const normalizedPassword = password.trim();

  if (normalizedUsername !== adminUser) {
    return false;
  }

  return normalizedPassword === adminPassword;
}

export function createAdminToken() {
  const { jwtSecret } = getAuthConfig();

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing.");
  }

  return jwt.sign({ role: "admin" }, jwtSecret, { expiresIn: "1d" });
}

export function verifyAdminTokenFromRequest(request: NextRequest) {
  const { jwtSecret } = getAuthConfig();

  if (!jwtSecret) {
    return false;
  }

  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { role?: string };
    return decoded.role === "admin";
  } catch {
    return false;
  }
}
