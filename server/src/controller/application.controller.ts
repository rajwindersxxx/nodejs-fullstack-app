import { catchAsync } from "../utils/catchAsync";
import { prisma } from "../utils/prismaClient";
import response from "../utils/response";

export class applicationController {
  static applyJob = catchAsync(async (req, res, _next) => {
    const input = { ...req.body, id: req.params.id };
    const data = await prisma.application.create({
      data: input,
    });
    response(res, data, 201);
  });
  
}
