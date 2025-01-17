import { NextRequest, NextResponse } from 'next/server'
import { getLocationById, updateLocation, deleteLocation } from '@/lib/location'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const location = await getLocationById(params.id)
    if (!location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 })
    }
    return NextResponse.json(location, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch location', details: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const updatedLocation = await updateLocation(params.id, data)
    return NextResponse.json(updatedLocation, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update location', details: error.message }, { status: 500 })
  }
}

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await deleteLocation(id); // Call your function to delete the location from the database
      res.status(200).json({ message: 'Location deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete location' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}