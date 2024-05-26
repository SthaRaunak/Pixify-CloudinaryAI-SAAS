import mongoose, { type Mongoose } from "mongoose";

const MOGODB_URI = process.env.MONGODB_URI;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectDB = async () => {
  // check if cached connection already exists
  if (cached.conn) return cached.conn;

  if (!MOGODB_URI) throw new Error("MONGODB_URI not defined");

  // if cached connection doesnt exist we create new connection to mongodb
  cached.promise =
    cached.promise ||
    mongoose.connect(MOGODB_URI, { dbName: "pixify", bufferCommands: false });

  // resolve the promise to get the connection
  cached.conn = await cached.promise;

  return cached.conn;
};
