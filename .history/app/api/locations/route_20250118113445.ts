import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'; // Import Prisma client
import { addLocation } from '@/lib/location';
import { getAllLocations } from '@/lib/location';
export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const data = await req.json()

    // Call the addFare function to save the data
    const location = await addLocation(data)


    // If the fare is successfully added, return the fare data
    return NextResponse.json({ location }, { status: 200 })
  } catch (error) {

    // Handle any unexpected errors
    return NextResponse.json(
      { error: 'Failed to add fare', details: error.message },
      { status: 500 }
    )
  }
}


export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10); 
    const limit = parseInt(url.searchParams.get("limit") || "10", 10); 

    try {
      // Fetch all locations from the database
      const {locations, total} = await getAllLocations({ page, limit }); // This should return an array of locations
  
      // Return the locations in the response
      return NextResponse.json(locations, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
    }
  }

