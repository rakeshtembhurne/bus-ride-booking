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
    const data = await req.json()
    const updatedLocation = await updateFare(params.id, data)
    return NextResponse.json(updatedLocation, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update location', details: error.message }, { status: 500 })
  }
}



export default async function handler(req, res) {
    const { id } = req.query; // Get the dynamic `id` from the URL
    
    if (req.method === "DELETE") {
      // Perform delete logic using `id`
      // If the fare with the provided `id` is not found or there's a mismatch, respond with a 400 or another relevant status.
      
      try {
        // Example delete logic
        const result = await deleteFare(id);
        if (!result) {
          return res.status(400).json({ message: "Fare not found" });
        }
        return res.status(200).json({ message: "Fare deleted successfully" });
      } catch (error) {
        console.error("Error deleting fare:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    return res.status(405).json({ message: "Method Not Allowed" });
  }