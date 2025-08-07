import express from "express";
import { jobController } from "../controller/job.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { createJobSchema, updateJobSchema } from "../zod/job.zod";
import { params } from "../zod/genetic.zod";
const jobRouter = express.Router();

jobRouter.route("/").get(jobController.getAllJobs);

jobRouter.use(authMiddleware.protectedRoute);
jobRouter.post(
  "/",
  validationMiddleware(createJobSchema),
  jobController.createJob
);
jobRouter.get("/me", jobController.getPostedJob);
jobRouter
  .route("/:id")
  .get(validationMiddleware(params), jobController.getJobDetails)
  .delete(validationMiddleware(params), jobController.deleteJob)
  .patch(validationMiddleware(updateJobSchema), jobController.updateJob);
export default jobRouter;
