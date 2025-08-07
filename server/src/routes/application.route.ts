import express from "express";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { applicationSchema } from "../zod/application.zod";
import { applicationController } from "../controller/application.controller";
import { processUploadsMiddleware, upload } from "../middleware/processUploads";
import { params } from "../zod/genetic.zod";
const applicationRouter = express.Router();
applicationRouter
  .route("/:id")
  .post(
    upload.single("resume"),
    processUploadsMiddleware(true),
    validationMiddleware(applicationSchema),
    applicationController.applyJob
  )
  .get(validationMiddleware(params), applicationController.getJobApplications);

export default applicationRouter;
