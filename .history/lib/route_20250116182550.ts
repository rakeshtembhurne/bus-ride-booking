import { prisma } from "@/lib/db";
import { routeSchema } from "./validations/route";

// -----------------------------------------------------------------------------
// To Get Route By ID - Function
// -----------------------------------------------------------------------------
export const getRouteById = async (id: string) => {
    try {
        const route = await prisma.route.findUnique({
            where: { id },
            include: {
                vehicle: true,
                origin: true,
                destination: true,
            }
        })
        return route;
    } catch {
        return null;
    }
}

// -----------------------------------------------------------------------------
// To Get All Routes - Function
// -----------------------------------------------------------------------------
export const getAllRoutes = async () => {
    try {
        const routes = await prisma.route.findMany({
            include: {
                origin: true,
                destination: true,
                vehicle: true,
            }
        }
        );
        console.log("routes :", routes)
        return routes;
    } catch {
        return [];
    }
}

// -----------------------------------------------------------------------------
// To Add Route - Function
// -----------------------------------------------------------------------------
export const addRoute = async (data: any) => {
    try {
        const validatedData = routeSchema.parse(data)

        const route = await prisma.route.create({
            data: validatedData,
        })

        return route

    } catch (error) {
        //Checking validation Error
        if (error instanceof Error && "issues" in error) {
            return {
                error: "Invalid Input",
                details: error.issues,
            }
        }

        return {
            error: "Failed to Add Route",
            details: error.message,
        }
    }
}

// -----------------------------------------------------------------------------
// To Update Route - Function
// -----------------------------------------------------------------------------
export const updateRoute = async (id: string, data: any) => {
    try {
        const validatedData = routeSchema.partial().parse(data)

        const updatedRoute = await prisma.location.update({
            where: { id },
            data: validatedData,
        })

        return updatedRoute;
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
// To Delete Route - Function
// -----------------------------------------------------------------------------
export const deleteRoute = async (id: string) => {
    try {
        // Check that if Route exist
        const routeToDelete = await prisma.route.findUnique({
            where: { id }
        })
        if (!routeToDelete) {
            return { error: "Route not found" }
        }

        // Delete the Route 
        await prisma.route.delete({ where: { id } })
        return { success: true, message: "Route delete successfully" };

    } catch (error) {
        return { error: "Failed to Delete Route", details: error.message }
    }
}