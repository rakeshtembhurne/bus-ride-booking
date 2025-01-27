import { NextRequest, NextResponse } from 'next/server'
import {getFareById, updateFare,deleteFare} from '@/lib/fare'
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const location = await getFareById(params.id);
    if (!location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }
    return NextResponse.json(location, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch location', details: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Extract the ID from the URL.
    const { routeId, fromLocation, toLocation, price } = await req.json(); // Parse the request body.

    if (!id || !routeId || !fromLocation || !toLocation || !price) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Call a service or database function to update the record.
    const updatedFare = await updateFare(id, { routeId, fromLocation, toLocation, price });

    return NextResponse.json(updatedFare, { status: 200 });
  } catch (error) {
    console.error("Error updating fare:", error);
    return NextResponse.json(
      { error: "Failed to update fare", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    
    try {
        const response = await deleteFare(params.id);
        

        if (response.error) {
            return NextResponse.json({ error: response.error, details: response.details }, { status: 400 });
        }

        return NextResponse.json({ message: response.message }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete location', details: error.message }, { status: 500 });
    }
}