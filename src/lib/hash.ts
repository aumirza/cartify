// src/lib/auth/hash.ts

import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compare(plainPassword, hashedPassword);
}
