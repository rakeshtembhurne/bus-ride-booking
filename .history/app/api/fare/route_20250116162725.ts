import { NextRequest, NextResponse } from 'next/server'
import { addFare } from '@/lib/fare'  // Import the addFare function

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const data = await req.json()

    // Call the addFare function to save the data
    const fare = await addFare(data)

    console.log(data)


    // If the fare is successfully added, return the fare data
    return NextResponse.json({ fare }, { status: 200 })
  } catch (error) {
    // Handle any unexpected errors
    return NextResponse.json(
      { error: 'Failed to add fare', details: error.message },
      { status: 500 }
    )
  }
}
