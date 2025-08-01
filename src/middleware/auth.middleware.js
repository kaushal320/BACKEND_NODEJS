import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      req.cookies?.accessToken ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.replace("Bearer ", "")
        : null);

    if (!token) {
      throw new ApiError(401, "Unauthorized request: No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export default verifyJWT;
