export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const location = await getLocationById(params.id);
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
    const updatedLocation = await updateLocation(params.id, data)
    return NextResponse.json(updatedLocation, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update location', details: error.message }, { status: 500 })
  }
}

// API handler to delete a location
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteLocation(params.id); // Make sure this function is defined and works properly
    return NextResponse.json({ message: 'Location deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete location' }, { status: 500 });
  }
}