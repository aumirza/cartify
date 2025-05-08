import { UserRepository } from "@/db/repositories/userRepository";
import { hashPassword } from "@/lib/hash";

export async function createUser({
  name,
  email,
  password,
}: {
  name:string;
  email: string;
  password: string;
}) {
  try {
    const hashedPassword = await hashPassword(password)
    await UserRepository.createUser({ name,email, password:hashedPassword });

    // notify with email or confirm
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
}
