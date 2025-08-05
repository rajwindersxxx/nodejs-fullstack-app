import { verify } from "jsonwebtoken";
import { appError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

import bcrypt from "bcrypt";
import { prisma } from "../utils/prismaClient";
import { clearCookie } from "../utils/cookies";

export class authMiddleware {
  static hashPassword = catchAsync(async (req, res, next) => {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return next(
        new appError(
          "Confirm Password don't match, try again!",
          400,
          "MATCH_ERROR"
        )
      );
    req.body.password = await bcrypt.hash(password, 12);
    delete req.body.confirmPassword;
    next();
  });
  static protectedRoute = catchAsync(async (req, res, next) => {
    const token = req.cookies.jwtToken;
    let decoded;

    if (!token?.trim())
      return next(
        new appError(
          "No token found, please Login to get access",
          401,
          "INVALID_TOKEN"
        )
      );
    try {
      decoded = verify(token, process.env.ACCESS_SECRET as string) as {
        id: number;
        iat: number;
      };
    } catch {
      return next(
        new appError("Invalid Token, Please Login again ", 401, "INVALID_TOKEN")
      );
    }
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (currentUser?.updatedAt && decoded?.iat) {
      const passwordChange = new Date(currentUser.updatedAt).getTime() / 1000;
      const issueDate = decoded.iat;
      if (passwordChange > issueDate) {
        clearCookie(res, "jwtToken");
        return next(
          new appError("Password has been changed, please login again ", 401)
        );
      }
    }
    if (!currentUser) return next(new appError("user not found", 401));

    req.user = { id: currentUser?.id };
    console.log(req.user);
    next();
  });
}
