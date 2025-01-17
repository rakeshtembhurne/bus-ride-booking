import { NextRequest, NextResponse } from 'next/server'
import { addFare } from '@/lib/fareService'  // Import the addFare function

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const data = await req.json()

    // Call the addFare function to save the data
    const fare = await addFare(data)

    // If there's an error during the addFare function
    if (fare.error) {
      return NextResponse.json(
        { error: fare.error, details: fare.details },
        { status: 400 }
      )
    }

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
