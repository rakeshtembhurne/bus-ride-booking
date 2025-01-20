import { prisma } from "@/lib/db";
import { locationSchema } from "@/lib/validations/location";

// -----------------------------------------------------------------------------
// To Add Location - Function
// -----------------------------------------------------------------------------
export const addLocation = async (data: any) => {
  try {
    // Validate data using schema
    const validatedData = locationSchema.parse(data)

    // Add location to database
    const location = await prisma.location.create({
      data: validatedData,
    })

    return location
  } catch (error) {
    // Checking validation error
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
