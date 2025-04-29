import { UserRepository } from "@/db/repositories/userRepository";

export async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await UserRepository.createUser({ email, password });

    // notify with email or confirm
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
}
