import { NextRequest, NextResponse } from 'next/server'
import { addFare } from '@/lib/fare'  // Import the addFare function

import { prisma } from '@/lib/db'; // Import Prisma client
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllRoutes } from '@/lib/route';

export async function POST(req: NextRequest) {
  console.log("inside the Post method ")
  try {
    // Parse the incoming request body
    const data = await req.json()


    

    // Call the addFare function to save the data
    const fare = await addFare(data)

    console.log("my data : ",fare)


    // If the fare is successfully added, return the fare data
    return NextResponse.json({ fare }, { status: 200 })
  } catch (error) {
    console.log("inside the Catch method ")

    // Handle any unexpected errors
    return NextResponse.json(
      { error: 'Failed to add fare', details: error.message },
      { status: 500 }
    )
  }
}
export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const routes = await getAllRoutes(); // Fetch all routes from the database.
    console.log("Fetched routes:", routes);  

    // Format the fetched routes into desired structure
    const formattedRoutes = routes.map((route) => ({
      id: route.id,
      name: `${route.origin.name} to ${route.destination.name}`, // For dropdown display
    }));

    console.log("Formatted routes:", formattedRoutes);  
    res.status(200).json(formattedRoutes); // Return formatted data
  } catch (error) {
    console.error("Error fetching routes:", error);  
    res.status(500).json({ error: "Failed to fetch routes" });
  }
}