import mongoose from "mongoose";
import { db } from "./mongoose";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ems";
const m = db();

type Cache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongo = globalThis as typeof globalThis & { _mongoose?: Cache };

const cached: Cache = globalWithMongo._mongoose || { conn: null, promise: null };
globalWithMongo._mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = m.connect(uri, { bufferCommands: false });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
