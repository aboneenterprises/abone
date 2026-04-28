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

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ message: "Failed to load product" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = (await request.json()) as Record<string, unknown>;
    const payload = normalizePayload(body);

    if (!payload.image) {
      return NextResponse.json({ message: "At least one product image is required" }, { status: 400 });
    }

    const updated = await Product.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
