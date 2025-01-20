import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Use Prisma to save the data in the fare table
    const newFare = await prisma.fare.create({
      data: {
        routeId: data.routeId,
        fromLocationId: data.fromLocationId,
        toLocationId: data.toLocationId,
        price: data.price,
      },
    })

    return NextResponse.json({ message: 'Fare added successfully', fare: newFare })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to add fare' }, { status: 500 })
  }
}
