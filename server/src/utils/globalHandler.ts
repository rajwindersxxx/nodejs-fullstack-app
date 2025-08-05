import { NextFunction, Request, Response } from "express";
import { appError } from "./appError";
export function globalHandler(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(error)
  if (error.name === "PrismaClientValidationError") {
    error = new appError("Invalid Input , please check your query", 400, "DB_VALIDATION_ERROR");
  }
  if (error.code === "P2002") {
    error = new appError("Record already exist in database ", 409, "DUPLICATE_ERROR");
  }
  if (error.code === "P2025") {
    error = new appError("Record not found ", 404, "NOT_FOUND");
  }
  if (error.code === "P2003") {
    error = new appError("Record with given id  do not exist ", 404, "NOT_FOUND");
  }

  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message,
    code: error.code,
    ...(error.data && { error: error.data }),
  });
}

