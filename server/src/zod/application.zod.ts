import z from "zod";
import { validId } from "./genetic.zod";

const name = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(100, "Name is too long");

const email = z
  .string()
  .trim()
  .email("Invalid email format");

const resumeUrl = z
  .string()
  .url("Invalid resume URL")
  .refine((url) => url.endsWith(".pdf"), {
    message: "Resume must be a PDF file",
  });

export const applicationSchema = {
  bodySchema: z
    .object({
      name,
      email,
      resumeUrl,
    })
    .strict(),

  paramsSchema: z
    .object({
      id: validId,
    })
    .strict(),
};
