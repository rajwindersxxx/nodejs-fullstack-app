import z from "zod";
import { params } from "./genetic.zod";

export const applicationSchema = {
  bodySchema: z
    .object({
      name: z.string(),
      email: z.string().email(),
      resumeUrl: z.string().url(),
    })
    .strict(),
  params,
};
