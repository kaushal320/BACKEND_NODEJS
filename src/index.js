import mongoose from "mongoose";
import connectDB from "./db/db.js";

import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
