import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const dbHost = process.env.MONGO_URL || "mongodb://localhost:27017";
    const dbURI = `${dbHost}/${DB_NAME}`; 

    await mongoose.connect(dbURI, {
    
    });

    console.log(`✅ Database "${DB_NAME}" connected successfully`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
