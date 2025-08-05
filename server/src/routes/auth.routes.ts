import express from "express";
import { authController } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { loginSchema } from "../zod/auth.zod";
const authRouter = express.Router();

authRouter.post(
  "/login",
  validationMiddleware(loginSchema),
  authController.loginUser
);
authRouter.post(
  "/signup",
  authMiddleware.hashPassword,
  authController.signupUser
);
authRouter.use(authMiddleware.protectedRoute);
authRouter.post("/logout", authController.logoutUser);
authRouter.patch("/changePassword", authController.changePassword);

export default authRouter;
