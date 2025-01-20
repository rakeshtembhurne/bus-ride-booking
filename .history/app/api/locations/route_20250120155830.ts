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
  try {
    // Fetch all locations from the database
    const locations = await getAllLocations();
    
    // Return the locations in the response
    if (locations.length > 0) {
      return NextResponse.json(locations, { status: 200 });
    } else {
      return NextResponse.json({ message: 'No locations found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch locations', details: error.message }, { status: 500 });
  }
}

