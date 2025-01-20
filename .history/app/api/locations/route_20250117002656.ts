import { prisma } from "@/lib/db";

// Add a new location
export async function addLocation(data: { name: string }) {
  try {
    const location = await prisma.location.create({
      data: {
        name: data.name,
      },
    });
    return location;
  } catch (error) {
    throw new Error("Failed to add location");
  }
}

// Get all locations
export async function getAllLocations() {
  try {
    return await prisma.location.findMany();
  } catch (error) {
    throw new Error("Failed to fetch locations");
  }
}

// Edit a location (fetch by id)
export async function getLocationById(id: string) {
  try {
    return await prisma.location.findUnique({
      where: { id },
    });
  } catch (error) {
    throw new Error("Failed to fetch location");
  }
}

// Update a location
export async function updateLocation(id: string, data: { name: string }) {
  try {
    const location = await prisma.location.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
    return location;
  } catch (error) {
    throw new Error("Failed to update location");
  }
}

// Delete a location
export async function deleteLocation(id: string) {
  try {
    await prisma.location.delete({
      where: { id },
    });
    return { message: "Location deleted successfully" };
  } catch (error) {
    throw new Error("Failed to delete location");
  }
}
