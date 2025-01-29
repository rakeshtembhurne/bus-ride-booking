import { NextRequest, NextResponse } from 'next/server'
import { addFare } from '@/lib/fare' 
import { prisma } from '@/lib/db'; 
import { getAllRoutes } from '@/lib/route';

export async function POST(req: NextRequest) {
  console.log("inside the Post method ")
  try {
    const data = await req.json()
    const fare = await addFare(data)
    return NextResponse.json({ fare }, { status: 200 })
  } catch (error) {
    console.log("inside the Catch method ")

    return NextResponse.json(
      { error: 'Failed to add fare', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const routes = await getAllRoutes(); 
    console.log("Fetched routes:", routes);  

    return NextResponse.json(routes, { status: 200 }); 
  } catch (error) {
    console.error("Error fetching routes:", error);  
    return NextResponse.json({ error: "Failed to fetch routes" }, { status: 500 });
  }
}
