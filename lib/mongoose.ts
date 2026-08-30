import mongoose from "mongoose";

export function db() {
  return (mongoose as unknown as { default?: typeof mongoose }).default ?? mongoose;
}
