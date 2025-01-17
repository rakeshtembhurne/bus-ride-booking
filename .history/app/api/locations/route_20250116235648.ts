import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'; // Import Prisma client
import { addLocation } from '@/lib/location';
import { getAllLocations } from '@/lib/location';
export async function POST(req: NextRequest) {
  console.log("inside the Post method ")
  try {
    // Parse the incoming request body
    const data = await req.json()

    // Call the addFare function to save the data
    const location = await addLocation(data)

    console.log("my data : ",location)

    // If the fare is successfully added, return the fare data
    return NextResponse.json({ location }, { status: 200 })
  } catch (error) {
    console.log("inside the Catch method ")

    // Handle any unexpected errors
    return NextResponse.json(
      { error: 'Failed to add fare', details: error.message },
      { status: 500 }
    )
  }
}


export async function GET(req: NextRequest) {
    try {
      // Fetch all locations from the database
      const locations = await getAllLocations(); // This should return an array of locations
  
      // Return the locations in the response
      return NextResponse.json(locations, { status: 200 });
    } catch (error) {
      console.error('Error fetching locations:', error);
      return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
    }
  }

