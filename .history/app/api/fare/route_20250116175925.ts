import { NextRequest, NextResponse } from 'next/server'
import { addFare } from '@/lib/fare'  // Import the addFare function


export async function POST(req: NextRequest) {
  console.log("inside the Post method ")
  try {
    // Parse the incoming request body
    const data = await req.json()


    

    // Call the addFare function to save the data
    const fare = await addFare(data)

    console.log("my data : ",fare)


    // If the fare is successfully added, return the fare data
    return NextResponse.json({ fare }, { status: 200 })
  } catch (error) {
    console.log("inside the Catch method ")

    // Handle any unexpected errors
    return NextResponse.json(
      { error: 'Failed to add fare', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    // Fetch all routes from the database
    const routes = await prisma.route.findMany({
      select: {
        id: true, // Select only the route ID
        origin: {
          select: {
            name: true, // Select the name of the origin location
          },
        },
        destination: {
          select: {
            name: true, // Select the name of the destination location
          },
        },
      },
    });

    // Return the routes as JSON
    return NextResponse.json(routes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch routes', details: error.message },
      { status: 500 }
    );
  }
}
