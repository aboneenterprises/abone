import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { connectToDatabase } from "@/lib/mongodb";

function normalizeImageList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function normalizePayload(body: Record<string, unknown>) {
  const images = normalizeImageList(body.images);
  const primaryImageFromBody = typeof body.image === "string" ? body.image.trim() : "";
  const primaryImage = primaryImageFromBody || images[0] || "";
  const mergedImages = Array.from(new Set([primaryImage, ...images].filter(Boolean))).slice(0, 6);

  return {
    ...body,
    image: primaryImage,
    images: mergedImages,
  };
}

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ message: "Failed to load products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = (await request.json()) as Record<string, unknown>;
    const payload = normalizePayload(body);

    if (!payload.image) {
      return NextResponse.json({ message: "At least one product image is required" }, { status: 400 });
    }

    const created = await Product.create(payload);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Failed to create product" }, { status: 500 });
  }
}
