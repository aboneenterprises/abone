import { Product } from "@/models/Product";
import { connectToDatabase } from "@/lib/mongodb";

export async function getAllProducts() {
  try {
    await connectToDatabase();
    return Product.find({}).sort({ createdAt: -1 }).lean();
  } catch {
    return [];
  }
}

export async function getFeaturedProducts() {
  try {
    await connectToDatabase();
    return Product.find({ stock: "inStock" }).sort({ createdAt: -1 }).limit(6).lean();
  } catch {
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    await connectToDatabase();
    return Product.findById(id).lean();
  } catch {
    return null;
  }
}
