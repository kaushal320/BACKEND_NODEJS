import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error("Local file path is required for upload.");
    }
    //upload the file on cloudinary
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // Automatically detect the resource type
    });
    console.log("File uploaded successfully:", result);
    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Error uploading file:", error);
  }
};

export default uploadOnCloudinary;