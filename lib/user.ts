import { prisma } from "@/lib/db";
import { userEmailSchema, userNameSchema, userRoleSchema } from "./validations/user";
import * as z from "zod";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        name: true,
        emailVerified: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
}

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return null;
  }
};


export const addUser = async (data: any) => {
  try {
    // Validate data using individual schemas
    const nameValidation = userNameSchema.safeParse({ name: data.name });
    const emailValidation = userEmailSchema.safeParse({ email: data.email });
    const roleValidation = userRoleSchema.safeParse({ role: data.role });

    // Collect all errors from individual validations
    const validationErrors: z.ZodIssue[] = [];
    if (!nameValidation.success) validationErrors.push(...nameValidation.error.issues);
    if (!emailValidation.success) validationErrors.push(...emailValidation.error.issues);
    if (!roleValidation.success) validationErrors.push(...roleValidation.error.issues);

    // If there are any validation errors, return the errors
    if (validationErrors.length > 0) {
      return { error: "Validation failed", details: validationErrors };
    }
    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        image: data.image || null, // Optional
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Internal server error" };
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    // Validate data using individual schemas
    const nameValidation = userNameSchema.safeParse({ name: data.name });
    const emailValidation = userEmailSchema.safeParse({ email: data.email });
    const roleValidation = userRoleSchema.safeParse({ role: data.role });

    // Collect all errors from individual validations
    const validationErrors: z.ZodIssue[] = [];
    if (!nameValidation.success) validationErrors.push(...nameValidation.error.issues);
    if (!emailValidation.success) validationErrors.push(...emailValidation.error.issues);
    if (!roleValidation.success) validationErrors.push(...roleValidation.error.issues);

    // If there are any validation errors, return the errors
    if (validationErrors.length > 0) {
      return { error: "Validation failed", details: validationErrors };
    }

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        image: data.image || null, // Optional
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Internal server error" };
  }
};
