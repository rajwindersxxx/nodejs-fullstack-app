import express from "express";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { applicationSchema } from "../zod/application.zod";
import { applicationController } from "../controller/application.controller";
const applicationRouter = express.Router();
applicationRouter
  .route("/")
  .post(
    validationMiddleware(applicationSchema),
    applicationController.applyJob
  );
  
