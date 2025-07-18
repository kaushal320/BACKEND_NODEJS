import mongoose from "mongoose";
import connectDB from "./db/db.js";

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
