import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { catchAsync } from "../utils/catchAsync";
import { prisma } from "../utils/prismaClient";
import response from "../utils/response";
import { appError } from "../utils/appError";
import { clearCookie, responseCookie } from "../utils/cookies";
export class authController {
  static signupUser = catchAsync(async (req, res, _next) => {
    const data = await prisma.user.create({
      data: req.body,
    });
    response(res, data, 200, {
      hideFields: ["updatedAt", "password"],
      otherFields: { message: "Account Created Successfully" },
    });
  });
  static loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(
        new appError(
          "please provide email and password",
          400,
          "VALIDATION_ERROR"
        )
      );
    const userData = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userData)
      return next(new appError("User does not exists", 404, "NOT_FOUND"));
    const verify = await bcrypt.compare(password, userData?.password);
    if (!verify) return next(new appError("Invalid username or password", 401));
    if (process.env.ACCESS_SECRET) {
      const accessToken = jwt.sign(
        { id: userData.id },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "7d",
        }
      );
      responseCookie(res, "jwtToken", accessToken);
      return response(res, { message: "Logged in successfully" }, 200);
    }
  });
  static logoutUser = catchAsync(async (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (!token) {
      return next(
        new appError("No refresh token found", 400, "TOKEN_NOT_FOUND")
      );
    }
    clearCookie(res, "jwtToken");
    response(res, { message: "Logged out successfully" }, 200);
  });
  static changePassword = catchAsync(async (req, res, next) => {
    const { currentPassword, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return next(
        new appError(
          "confirm password do not match try again",
          400,
          "PASSWORD_MATCH_ERROR"
        )
      );
    const userData = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { password: true },
    });
    if (!userData)
      return next(new appError("User do not exist", 404, "NOT_FOUND"));
    const verify = await bcrypt.compare(currentPassword, userData.password);
    if (!verify)
      return next(
        new appError(
          "Current password is invalid, try again!",
          400,
          "INVALID_CREDENTIALS"
        )
      );

    const hash = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hash, updatedAt: new Date() },
    });
    // 3. Clear the  token cookie
    clearCookie(res, "jwtToken");
    response(
      res,
      { message: "Password Change Successfully , please Login again" },
      200
    );
  });
  static getAuthDetails = catchAsync(async (req, res, _next) => {
    const data = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        email: true,
        id: true,
      },
    });
    response(res, data)
  });
}
