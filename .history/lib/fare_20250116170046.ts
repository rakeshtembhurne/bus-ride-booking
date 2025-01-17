import { prisma } from "@/lib/db";
import { fareSchema } from "./validations/fare";

export const getFareById = async (id: string) => {
    try {
        const fare = await prisma.fare.findUnique({
            where: { id },
            include: {
                route: true,
                origin: true,
                destination: true,
            }
        })
        return fare;
    } catch {
        return null;
    }
}

export const getAllFares = async () => {
    try {
        const fares = await prisma.fare.findMany({
            include: {
                route: true,
                origin: true,
                destination: true,
            }
        })
        return fares;
    } catch {
        return [];
    }
}

// -----------------------------------------------------------------------------
// To Add Fare - Function
// -----------------------------------------------------------------------------
export const addFare = async (data: any) => {
    console.log("json data :", data);

    try {
        // Destructure data from the incoming request
        const { routeId, fromLocationId, toLocationId, price, createdByUserId } = data;

        const fare = await prisma.fare.create({
            data: {
                routeId,            // routeId from the incoming data
                fromLocationId,     // fromLocationId from the incoming data
                toLocationId,       // toLocationId from the incoming data
                price,              // price from the incoming data
                createdByUserId,    // createdByUserId from the incoming data
            }
        });

        console.log("Added Fare:", fare); // Log the added fare

        return fare;
    } catch (error) {
        if (error instanceof Error && "issues" in error) {
            return {
                error: "Invalid Input",
                details: error.issues,
            };
        }

        console.error("Error adding fare:", error); // Log error details
        return {
            error: "Failed to Add Fare",
            details: error.message,
        };
    }
};


// -----------------------------------------------------------------------------
// To Update Fare - Function
// -----------------------------------------------------------------------------
export const updateFare = async (id: string, data: any) => {
    try {
        const validatedData = fareSchema.partial().parse(data)

        const updatedFare = await prisma.fare.update({
            where: { id },
            data: validatedData,
        })

        return updatedFare;
    } catch (error) {
        if (error instanceof Error && "issues" in error) {
            return {
                error: "Invalid Input",
                details: error.issues,
            }
        }

        return {
            error: "Failed to update data",
            details: error.message,
        }
    }
}

// -----------------------------------------------------------------------------
// To Delete Fare - Function
// -----------------------------------------------------------------------------
export const deleteFare = async (id: string) => {
    try {
        // Check that if Fare exist
        const fareToDelete = await prisma.fare.findUnique({
            where: { id }
        })
        if (!fareToDelete) {
            return { error: "Fare not found" }
        }

        // Delete the Fare 
        await prisma.fare.delete({ where: { id } })
        return { success: true, message: "Fare delete successfully" };
    } catch (error) {
        return { error: "Failed to Delete Fare", details: error.message }
    }
}