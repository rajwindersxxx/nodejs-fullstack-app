import z from "zod";
import { validId } from "./genetic.zod";
const password = z.string().min(4).max(15);
export const createJobSchema = {
  bodySchema: z
    .object({
      title: z.string().min(3, "Title is too short"),
      company: z.string().min(2, "Company name is required"),
      location: z.string().min(2, "Location is required"),
      salary: z.string().regex(/^\d+$/, "Salary must be numeric").transform((val) => Number(val)), // optional: ensure only digits
      description: z
        .string()
        .min(10, "Description is too short")
        .max(1000, "Description is too long"),
    })
    .strict(),
};

export const updateJobSchema = {
  bodySchema: z
    .object({
      location: z.string().min(2, "Location is required"),
      salary: z.string().regex(/^\d+$/, "Salary must be numeric").transform((val) => Number(val)),
      description: z
        .string()
        .min(10, "Description is too short")
        .max(1000, "Description is too long"),
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
      email: z.string().email("Invalid email"),
      password,
      confirmPassword: password,
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
};

export const changePasswordSchema = {
  bodySchema: z
    .object({
      currentPassword: password,
      password: password,
      confirmPassword: password,
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
    .refine((data) => data.currentPassword !== data.password, {
      message: "New password must be different from current password",
      path: ["password"],
    }),
};
