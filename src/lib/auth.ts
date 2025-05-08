import NextAuth, { CredentialsSignin, Session } from "next-auth";
import Google from "next-auth/providers/google";
import credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/db/drizzle";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/db/schemas/auth.sql";
import { loginSchema } from "@/schemas/loginSchema";
import { UserRepository } from "@/db/repositories/userRepository";
import { comparePassword } from "./hash";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

class UserNotFound extends CredentialsSignin {
  code = "User not found";
}

class InvalidCredentials extends CredentialsSignin {
  code = "Invalid credentials";
}

class InvalidLogin extends CredentialsSignin {
  code = "Invalid login method";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "abc@mail.com" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Super secure",
        },
      },
      async authorize(credentials) {
        const parsed = await loginSchema.parseAsync(credentials);
        if (!parsed) throw new InvalidLoginError();
        const user = await UserRepository.getUserByEmail(parsed.email);
        if (!user) throw new UserNotFound();
        if (!user.password)
          throw new InvalidLogin("Use another method for login.");
        const match = await comparePassword(parsed.password, user.password);
        if (!match) throw new InvalidCredentials();
        return user;
      },
    }),

    Google,
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const providersUsed = ["credentials", "google"] as const;
export type availableProviders = (typeof providersUsed)[number];
