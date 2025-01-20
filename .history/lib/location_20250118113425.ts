import { prisma } from "@/lib/db";
import { locationSchema } from "./validations/location";

// -----------------------------------------------------------------------------
// To Get Location By ID - Function
// -----------------------------------------------------------------------------
export const getLocationById = async (id: string) => {
    try {
        const location = await prisma.location.findUnique({
            where: { id },
        });
        return location;
    }
    catch {
        return null;
    }
}

// -----------------------------------------------------------------------------
// To Get All Locations - Function
// -----------------------------------------------------------------------------
export const getAllLocations = async ({ page = 1, limit = 10 }: { page: number, limit: number }) => {
    try {
        const total = await prisma.location.count();
        const locations = await prisma.location.findMany({
            skip: (page - 1) * limit,
            take: limit,
        })

        return {locations, total};
    } catch {
        return { fares: [], total: 0 };
    }
}

// -----------------------------------------------------------------------------
// To Add Location - Function
// -----------------------------------------------------------------------------
export const addLocation = async (data: any) => {
    try {
        const validatedData = locationSchema.parse(data)

        const location = await prisma.location.create({
            data: validatedData,
        })

        return location
    } catch (error) {
        //Checking validation Error
        if (error instanceof Error && "issues" in error) {
            return {
                error: "Invalid Input",
                details: error.issues,
            }
        }

        return {
            error: "Failed to Add Location",
            details: error.message,
        }
    }
}

// -----------------------------------------------------------------------------
// To Update Location - Function
// -----------------------------------------------------------------------------
export const updateLocation = async (id: string, data: any) => {
    try {
        const validatedData = locationSchema.partial().parse(data)

        const updatedLocation = await prisma.location.update({
            where: { id },
            data: validatedData,
        })
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
// To Delete Location - Function
// -----------------------------------------------------------------------------
export const deleteLocation = async (id: string) => {
    try {
        // Check that if vehicle exist
        const locationToDelete = await prisma.location.findUnique({
            where: { id }
        })
        if (!locationToDelete) {
            return { error: "Location not found" }
        }

        // Delete the vehicle 
        await prisma.location.delete({ where: { id } })
        return { success: true, message: "Location delete successfully" };
    } catch (error) {
        return { error: "Failed to delete location", details: error.message }
    }
}