// /app/api/fare/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { addFare } from '@/lib/fare'; // Your addFare function

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Getting the request body
    const result = await addFare(body);
    if ('error' in result) {
      return NextResponse.json(result, { status: 400 });
    }
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
