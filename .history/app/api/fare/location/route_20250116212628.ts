import { prisma } from '@/lib/db'; // Import Prisma client
import { NextRequest, NextResponse } from 'next/server';
import { getAllLocations } from '@/lib/location';


export async function GET(req: NextRequest) {
  try {
    const locations = await getAllLocations(); // Fetch all routes from the database.
    console.log("Fetched routes:", locations);  

    // Format the fetched routes into desired structure
    const formattedRoutes = locations.map((route) => ({
      id: route.id,
      name: route.id, // Use `id` directly
    }));

    console.log("Formatted routes:", formattedRoutes);  
    return NextResponse.json(formattedRoutes, { status: 200 }); // Return formatted data
  } catch (error) {
    console.error("Error fetching routes:", error);  
    return NextResponse.json({ error: "Failed to fetch routes" }, { status: 500 });
  }
}
