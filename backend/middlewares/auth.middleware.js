import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "please login to access this resource");
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Role: ${req.user.role} is not authorized to access this resource`
      );
    }
    next();
  };
};
