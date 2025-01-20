import { UserRole } from "@prisma/client";
import * as z from "zod";

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
});

export const userRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});

// Validation for User email
export const userEmailSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
});

// Validation for User (combining all individual validations)
export const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(32, "Name must be at most 32 characters long").optional(),
  email: z
    .string()
    .email("Invalid email address"),
  role: z.nativeEnum(UserRole),
  image: z.string().url("Invalid image URL").optional(),
});
