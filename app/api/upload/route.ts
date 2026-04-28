import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "abone-products" }, (error, result) => {
          if (error || !result) {
            reject(error);
            return;
          }
          resolve({ secure_url: result.secure_url });
        })
        .end(buffer);
    });

    return NextResponse.json({ imageUrl: uploaded.secure_url });
  } catch {
    return NextResponse.json({ message: "Image upload failed" }, { status: 500 });
  }
}
