"use server";
import { signUpSchema } from "@/schemas/signupSchema";
import { createUser } from "@/services/createUser";
import { inferFlattenedErrors, ZodError } from "zod";

type Res =
  | { success: true }
  | {
      success: false;
      errors: inferFlattenedErrors<typeof signUpSchema>;
      statusCode: 400;
    }
  | { success: false; statusCode: 500 };

export async function signupUserAction(values: {
  name: string;
  email: string;
  password: string;
}): Promise<Res> {
  try {
    const parsed = await signUpSchema.parseAsync(values);

    await createUser(parsed);
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    if (error instanceof ZodError) {
      return {
        success: false,
        errors: error.flatten(),
        statusCode: 400,
      };
    }

    return {
      success: false,
      statusCode: 500,
    };
  }
}
