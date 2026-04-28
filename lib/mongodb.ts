import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type GlobalMongoose = typeof globalThis & {
  mongooseCache?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

const globalMongoose = globalThis as GlobalMongoose;

const cache = globalMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

globalMongoose.mongooseCache = cache;

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI, {
      dbName: "abone-store",
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
