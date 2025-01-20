// app/api/fare/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const fareData = await req.json()
    
    // Process your data (e.g., save to database)
    // Example: Assume you save the data in the database here
    
    console.log("Received Fare Data:", fareData)

    // Send a success response
    return NextResponse.json({ message: 'Fare added successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ message: 'Error adding fare' }, { status: 500 })
  }
}
