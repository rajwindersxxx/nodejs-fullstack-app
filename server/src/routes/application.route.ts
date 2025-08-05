import express from "express";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { applicationSchema } from "../zod/application.zod";
import { applicationController } from "../controller/application.controller";
import { processUploadsMiddleware, upload } from "../middleware/processUploads";
const applicationRouter = express.Router();
applicationRouter.post(
  "/:id",
  upload.single("resume"),
  processUploadsMiddleware(true),
  validationMiddleware(applicationSchema),
  applicationController.applyJob
);

export default applicationRouter;
