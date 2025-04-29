import { z } from "zod";
import { signUpSchema } from "./signupSchema";

export const signUpFormSchema = signUpSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
