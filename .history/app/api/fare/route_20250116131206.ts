// /app/api/fare/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addFare } from '@/lib/fare'; // Your addFare function

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received data:', body); // Log the data received by the server
  
    const result = await addFare(body);
    if ('error' in result) {
      console.log('Error adding fare:', result); // Log any error in the `addFare` function
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Internal Server Error:', error);  // Log any unexpected errors
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
