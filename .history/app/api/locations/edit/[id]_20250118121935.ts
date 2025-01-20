import { NextRequest, NextResponse } from 'next/server'
import { getLocationById, updateLocation, deleteLocation } from '@/lib/location'


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const data = await req.json();
      const updatedLocation = await updateLocation(params.id, data);
      return NextResponse.json(updatedLocation, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update location', details: error.message }, { status: 500 });
    }
  }