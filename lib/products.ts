import { Product } from "@/models/Product";
import { connectToDatabase } from "@/lib/mongodb";
import { unstable_cache } from "next/cache";

const getAllProductsCached = unstable_cache(
  async () => {
    await connectToDatabase();
    return Product.find({}).sort({ createdAt: -1 }).lean();
  },
  ["products:all"],
  { revalidate: 300, tags: ["products"] },
);

const getFeaturedProductsCached = unstable_cache(
  async () => {
    await connectToDatabase();
    return Product.find({ stock: "inStock" }).sort({ createdAt: -1 }).limit(6).lean();
  },
  ["products:featured"],
  { revalidate: 300, tags: ["products"] },
);

const getProductByIdCached = unstable_cache(
  async (id: string) => {
    await connectToDatabase();
    return Product.findById(id).lean();
  },
  ["products:byId"],
  { revalidate: 300, tags: ["products"] },
);

export async function getAllProducts() {
  try {
    return await getAllProductsCached();
  } catch {
    return [];
  }
}

export async function getFeaturedProducts() {
  try {
    return await getFeaturedProductsCached();
  } catch {
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    return await getProductByIdCached(id);
  } catch {
    return null;
  }
}
