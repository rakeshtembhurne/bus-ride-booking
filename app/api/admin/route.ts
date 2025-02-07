import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const vehicleIdParam = searchParams.get('vehicleId');
    const dateParam = searchParams.get('date');

    // Construct filter conditions
    const filters: any = {};
    if (vehicleIdParam) {
      filters['route.vehicleId'] = vehicleIdParam;
    }
    if (dateParam) {
      const dateStart = new Date(dateParam);
      const dateEnd = new Date(dateParam);
      dateEnd.setDate(dateStart.getDate() + 1); // Covers full day

      filters['date'] = {
        gte: dateStart,
        lt: dateEnd,
      };
    }

    // Fetch filtered bookings
    const bookings = await prisma.booking.findMany({
      where: filters,
      include: {
        route: {
          include: {
            vehicle: true,
          },
        },
        fare: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    // Organizing data by vehicle
    const vehicleStats: Record<string, any> = {};

    bookings.forEach((booking) => {
      const vehicleId = booking.route.vehicleId;

      if (!vehicleStats[vehicleId]) {
        vehicleStats[vehicleId] = {
          vehicleId,
          vehicleName: booking.route.vehicle.name,
          totalSeats: booking.route.vehicle.seats,
          bookedSeats: 0,
          availableSeats: booking.route.vehicle.seats,
          totalEarnings: 0,
          bookings: [],
        };
      }

      // Only count bookings that are successful
      if (booking.bookingStatus === 'successful') {
        vehicleStats[vehicleId].bookedSeats += 1;
        vehicleStats[vehicleId].availableSeats -= 1;
        vehicleStats[vehicleId].totalEarnings += booking.fare.price;
      }

      vehicleStats[vehicleId].bookings.push({
        bookingId: booking.id,
        date: booking.date,
        seatNumber: booking.seatNumber,
        status: booking.bookingStatus,
        from: booking.route.originId,
        to: booking.route.destinationId,
        price: booking.fare.price,
      });
    });

    return NextResponse.json({ success: true, data: Object.values(vehicleStats) }, { status: 200 });
  } catch (error) {
    console.error('Error fetching admin booking stats:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
