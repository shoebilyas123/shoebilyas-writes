import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI?.replace(
  "<USERNAME>",
  process.env?.MONGO_USERNAME || ""
)
  .replace("<PASSWORD>", process.env?.MONGO_PASSWORD || "")
  .replace("<DB_NAME>", process.env?.DB_NAME || "");

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local: " +
      MONGODB_URI
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore-next-line
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore-next-line
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI || "", opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
