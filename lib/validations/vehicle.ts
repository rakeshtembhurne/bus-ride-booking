import * as z from "zod";
export const vehicleSchema = z.object({
    name: z.string().min(1, "Vehicle name is required").max(50, "Vehicle name is too long"),
    number: z
      .string()
      .regex(/^[A-Z0-9-]+$/, "Invalid vehicle number format")
      .min(1, "Vehicle number is required"),
    seats: z.number().min(1, "Seats must be at least 1").max(100, "Seats cannot exceed 100"),
    type: z.string().min(1, "Vehicle type is required").max(50, "Vehicle type is too long"),
  });
  