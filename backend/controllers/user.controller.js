import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { sendtoken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// register a user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exist with this email");
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample_id",
      url: "sampleurl",
    },
  });

  sendtoken(200, user, res);
});

// login User
const logiUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if password and email is given or not
  if (!email || !password) {
    throw new ApiError(400, "Email & Password required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid Email or Password");
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invaliid Email or Pssword");
  }

  sendtoken(200, user, res);
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(200).json(new ApiResponse(200, {}, "User Logged out"));
});

// forgot password
const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // get resetPassword Token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Qivee password recovery",
      message,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, `Recovery mail sent to ${user.email}`));
  } catch (error) {
    (user.resetPasswordToken = undefined),
      (user.resetPasswordExpire = undefined);

    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, error.message);
  }
});

// reset password
const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(
      400,
      "Reset password token is invalid or has been expired"
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    throw new ApiError(400, "Password does not match");
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendtoken(200, user, res);
});

// get user details
const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user detail fetched"));
});

// update user password
const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldpassword);

  if (!isPasswordMatched) {
    throw new ApiError(400, "old password is incorrect");
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    throw new ApiError(400, "password does not match");
  }

  user.password = req.body.newPassword;

  await user.save();

  sendtoken(200, user, res);
});

// update user profile
const updateProfile = asyncHandler(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // we will add cloudinary latter

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User profile updated successfully"));
});

// get all users (ADMIN)
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find();

  return res
    .status(200)
    .json(new ApiResponse(200, users, "users fetched successfully"));
});

// get single user (ADMIN)
const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(401, `User does not exist with Id : ${req.params.id}`);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user detail fetched"));
});

// update user role (ADMIN)
const updateUserRole = asyncHandler(async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User Role updated successfully"));
});

// delete user (ADMIN)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // we will remoe cloudinary latter

  if (!user) {
    throw new ApiError(400, `User does not exist with Id: ${req.params.id}`);
  }

  await user.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

export {
  registerUser,
  logiUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
