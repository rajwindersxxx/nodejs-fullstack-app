import { APIFeatures } from "../utils/apiFeatures";
import { catchAsync } from "../utils/catchAsync";
import { prisma } from "../utils/prismaClient";
import response from "../utils/response";

export class jobController {
  static createJob = catchAsync(async (req, res, _next) => {
    const input = { ...req.body, userId: req.user.id };
    const data = await prisma.job.create({
      data: input,
    });
    response(res, data, 201);
  });
  static updateJob = catchAsync(async (req, res, _next) => {
    const data = await prisma.job.update({
      where: {
        id: Number(req.params.id),
        userId: req.user.id,
      },
      data: req.body,
    });
    response(res, data);
  });
  static getPostedJob = catchAsync(async (req, res, _next) => {
    const { filterOptions, offset, limit } = new APIFeatures<
      typeof prisma.job.findMany
    >(req.query as Record<string, string>)
      .filter()
      .limitFields()
      .pagination()
      .sort();
    const data = await prisma.job.findMany({
      ...filterOptions,
      where: {
        active: true,
        userId: req.user.id,
      },
      take: limit,
      skip: offset,
    });
    const total = await prisma.job.count({
      ...filterOptions,
      where: {
        active: true,
        userId: req.user.id,
      },
    });
    response(res, data, 200, {
      otherFields: { offset, limit, total },
    });
  });
  static getAllJobs = catchAsync(async (req, res, _next) => {
    const { filterOptions, offset, limit } = new APIFeatures<
      typeof prisma.job.findMany
    >(req.query as Record<string, string>)
      .filter()
      .limitFields()
      .pagination()
      .sort();
    const data = await prisma.job.findMany({
      ...filterOptions,
      where: {
        active: true,
      },
      take: limit,
      skip: offset,
    });
    const total = await prisma.job.count({
      where: {
        active: true,
      },
    });
    response(res, data, 200, {
      otherFields: { offset, limit, total },
    });
  });
  static deleteJob = catchAsync(async (req, res, _next) => {
    await prisma.job.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        active: true,
      },
    });
    response(res, null);
  });

}
