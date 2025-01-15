import * as z from "zod";

export const bookingSchema = z.object({
    routeId: z.string().min(1, "Route ID is required"),
    userId: z.string().min(1, "User ID is required"),
    fromLocationId: z.string().min(1, "From Locaiton ID is required"),
    toLocationId: z.string().min(1, "To Location ID is required"),
    date: z.date().refine((date) => date > new Date(), {
        message: "Booking date must be in the future",
    }),
    availableSeats: z.number().min(1, "Available Seats must be greater than 0").max(100, "Available seat cannot be greater than 100"),
    seatNumber: z.number().min(1, "Seat Number must be greater than 0"),
    status: z.enum(["Confirmed", "Cancelled"], {
        invalid_type_error: "Invalid booking status",
    }),
    paymentId: z.string().optional(),
    fareId: z.string().min(1, "Fare ID is required")
})