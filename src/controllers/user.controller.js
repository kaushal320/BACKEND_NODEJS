import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js"; // Assuming you have a User model defined
import uploadOnCloudinary from "../utils/Cloudinary.js"; // Assuming you have a cloudinary utility for image uploads
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user detail from frontend
  //validation of user data
  ///checkif user already exists
  //check if files are uploaded
  //create user object-create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //return response
  const { username, email, fullname, password } = req.body;
  console.log("body", req.body);
  if (!username || !email || !fullname || !password) {
    throw new ApiError("Please provide all required fields", 400);
  }
  // Here you would typically check if the user already exists in the database
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError("User already exists", 409);
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.cover[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError("Avatar image is required", 400);
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError("Failed to upload avatar image", 500);
  }
  const newUser = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage ? coverImage.url : null,
    email,
    username: username.toLowerCase(),
    password,
  });
  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError("Failed to retrieve created user", 500);
  }
  res
    .status(201)
    .json(new ApiResponse(200,"User created successfully", createdUser));
});
export { registerUser };
