import * as z from "zod";

export const locationSchema = z.object({
    name: z.string().min(1, "Location name is required").max(50, "Location name is too long")
});