import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json(); // Get the body as JSON
    // Process the data here (e.g., save to database)

    return NextResponse.json({ message: 'Fare added successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to add fare' }, { status: 500 });
  }
}
