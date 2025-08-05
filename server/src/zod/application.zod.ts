import z from "zod";
import {  validId } from "./genetic.zod";

export const applicationSchema = {
  bodySchema: z
    .object({
      name: z.string(),
      email: z.string().email(),
      resumeUrl: z.string().url(),
    })
    .strict(),
  paramsSchema: z
    .object({
      id: validId,
    })
    .strict(),
};
