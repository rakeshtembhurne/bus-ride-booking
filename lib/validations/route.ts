import * as z from "zod";

export const routeSchema = z.object({
    originId: z.string().min(1, "Origin ID is required"),
    destinationId: z.string().min(1, "Destination ID is required"),
    vehicleId: z.string().min(1, "Vehicle ID is required"),
    departureTime: z.date(),
    arrivalTime: z.date(),
    createdByUserId: z.string().min(1, "Created by User ID is required"),
});