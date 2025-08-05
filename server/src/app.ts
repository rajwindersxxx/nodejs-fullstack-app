import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import { globalHandler } from "./utils/globalHandler";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import { appError } from "./utils/appError";
import jobRouter from "./routes/job.route";
import applicationRouter from "./routes/application.route";
dotenv.config({ path: "./.env" });
const app = express();
app.use(morgan("dev"));

app.use(helmet());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/apply", applicationRouter);

app.all(/(.*)/, (req, res, next) => {
  next(
    new appError(
      `Can't find ${req.originalUrl} on this server!`,
      404,
      "INVALID_ROUTE"
    )
  );
});

app.use(globalHandler);
export default app;
