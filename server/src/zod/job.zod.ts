import z from "zod";
import { validId } from "./genetic.zod";
const password = z.string().min(4).max(15);
export const createJobSchema = {
  bodySchema: z
    .object({
      title: z.string(),
      company: z.string(),
      location: z.string(),
      description: z.string(),
    })
    .strict(),
};
export const updateJobSchema = {
  bodySchema: z
    .object({
      location: z.string(),
      description: z.string(),
    })
    .strict(),
  paramsSchema: z
    .object({
      id: validId,
    })
    .strict(),
};

export const signupSchema = {
  bodySchema: z
    .object({
      email: z.string().email(),
      password: password,
      confirmPassword: password,
    })
    .strict(),
};
export const changePasswordSchema = {
  bodySchema: z
    .object({
      currentPassword: z.string().min(4).max(15),
      password: z.string().min(4).max(15),
      confirmPassword: z.string().min(4).max(15),
    })
    .strict(),
};
