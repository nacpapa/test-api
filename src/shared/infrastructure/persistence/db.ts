import mongoose, { Mongoose } from "mongoose";
import "dotenv/config";
import { Environment } from "../config";

const globalForMongoose = globalThis as unknown as {
  mongoose: Mongoose | undefined;
};

const MONGO_URI = Environment.DATABASE_URL as string;

export const connectToDatabase = async (): Promise<Mongoose | null> => {
  try {
    if (globalForMongoose.mongoose) {
      return globalForMongoose.mongoose;
    }

    const mongooseInstance = await mongoose.connect(MONGO_URI);

    globalForMongoose.mongoose = mongooseInstance;
    console.log("Connected to MongoDB");
    return mongooseInstance;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    return null;
  }
};

export const checkMongoConnection = async (): Promise<boolean> => {
  try {
    await connectToDatabase();
    return mongoose.connection.readyState === 1;
  } catch (error) {
    console.error("Error verifying MongoDB connection:", error);
    return false;
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    if (globalForMongoose.mongoose) {
      await mongoose.disconnect();
      globalForMongoose.mongoose = undefined;
      console.log("Disconnected from MongoDB");
    }
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};
