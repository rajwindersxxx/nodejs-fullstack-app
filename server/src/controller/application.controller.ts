import { Application } from "../../generated/prisma";
import { APIFeatures } from "../utils/apiFeatures";
import { appError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { prisma } from "../utils/prismaClient";
import response from "../utils/response";

export class applicationController {
  static applyJob = catchAsync(async (req, res, next) => {
    const input = { ...req.body, jobId: Number(req.params.id) };
    let data: Application;
    try {
      data = await prisma.application.create({
        data: input,
      });
    } catch (error) {
      if (error.code === "P2002") {
        return next(
          new appError("Job already applied", 409, "DUPLICATE_ERROR")
        );
      }
    }

    response(res, data, 201);
  });
  static getJobApplications = catchAsync(async (req, res, _next) => {
    const { filterOptions, offset, limit } = new APIFeatures<
      typeof prisma.job.findMany
    >(req.query as Record<string, string>)
      .filter()
      .limitFields()
      .pagination()
      .sort();
    const data = await prisma.application.findMany({
      ...filterOptions,
      where: {
        jobId: Number(req.params.id),
      },

      take: limit,
      skip: offset,
    });
    response(res, data);
  });
}
