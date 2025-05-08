"use server";
import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/loginSchema";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { inferFlattenedErrors, ZodError } from "zod";

type Res =
  | { success: true }
  | {
      success: false;
      errors: inferFlattenedErrors<typeof loginSchema>;
      statusCode: 400;
    }
  | {
      success: false;
      error: string;
      statusCode: 401;
    }
  | { success: false; statusCode: 500 };

export async function loginUserAction(values: {
  email: string;
  password: string;
}): Promise<Res> {
  try {
    const parsed = await loginSchema.parseAsync(values);

    await signIn("credentials", {
      email: parsed.email,
      password: parsed.password,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof ZodError) {
      return {
        success: false,
        errors: error.flatten(),
        statusCode: 400,
      };
    }

    if (error instanceof AuthError) {
      return {
        success: false,
        error: "Invalid Credentials",
        statusCode: 401,
      };
    }

    return {
      success: false,
      statusCode: 500,
    };
  }
}
