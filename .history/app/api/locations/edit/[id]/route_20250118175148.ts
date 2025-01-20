import { NextRequest, NextResponse } from 'next/server';
import { updateLocation } from '@/lib/location';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

  console.log('Location ID:', params.id); // Debugging the location ID
  
  try {
    const { name } = await req.json();
    const updatedLocation = await updateLocation(params.id, name);
    return NextResponse.json(updatedLocation, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error to check details
    return NextResponse.json({ error: 'Failed to update location', details: error.message }, { status: 500 });
  }
}
