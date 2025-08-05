import z from "zod";
const password = z.string().min(4).max(15);
export const loginSchema = {
  bodySchema: z
    .object({
      email: z.string().email(),
      password: password,
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
