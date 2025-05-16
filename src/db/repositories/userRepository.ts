import db from "../drizzle";
import { users } from "../schemas/auth.sql";
import { eq } from "drizzle-orm";

export class UserRepository {
  static async getUserById(id: string) {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .limit(1);
      return user ?? null;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch user by id");
    }
  }
  static async getUserByEmail(email: string) {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      return user ?? null;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch user by email");
    }
  }

  static async createUser(data: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const [user] = await db
        .insert(users)
        .values({ ...data })
        .returning();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create user");
    }
  }

  static async updateUserPassword(userId: string, newPassword: string) {
    try {
      await db
        .update(users)
        .set({ password: newPassword })
        .where(eq(users.id, userId));
    } catch (error) {
      console.log(error);
      throw new Error("Failed to update password");
    }
  }
}
