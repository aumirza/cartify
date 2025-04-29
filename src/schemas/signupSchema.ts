// import { UserRepository } from "@/db/repositories/userRepository";
import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z0-9]/, { message: "Password must be alphanumeric" }),
});

// export const signUpSchemaServer = signUpSchema.refine(
//   async (data) => {
//     const user = await UserRepository.getUserByEmail(data.email);
//     return !user;
//   },
//   { message: "Email already exists" }
// );

export const signUpFormSchema = signUpSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
