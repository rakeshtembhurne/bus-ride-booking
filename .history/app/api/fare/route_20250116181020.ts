import { NextRequest, NextResponse } from 'next/server'
import { addFare } from '@/lib/fare'  // Import the addFare function

import { prisma } from '@/lib/db'; // Import Prisma client
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllRoutes } from '@/lib/route';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
      try {
          const routes = await getAllRoutes();
          return res.status(200).json(routes);
      } catch (error) {
          return res.status(500).json({ error: "Failed to fetch routes" });
      }
  } else {
      return res.status(405).json({ error: "Method Not Allowed" });
  }
}