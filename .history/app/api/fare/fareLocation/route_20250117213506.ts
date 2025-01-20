import { NextApiRequest, NextApiResponse } from "next";
import { getAllLocations } from "@/lib/location";  // Import your location function
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const locations = await getAllLocations(); // Fetch all locations from the database.

    // Format the fetched locations into desired structure
    const formattedLocations = locations.map((location) => ({
      id: location.id,
      name: location.name, // Use location name as the display value
    }));

    return NextResponse.json(formattedLocations, { status: 200 }); // Return formatted data
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch locations" }, { status: 500 });
  }
}
