import { addBooking, getAllBookings } from "@/lib/booking";
import { prisma } from "@/lib/db";
import { getFareById } from "@/lib/fare";
import { getUserById } from "@/lib/user";
import { NextApiRequest, NextApiResponse } from "next";
import { useParams, useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Parse the request body
        const { userId, fareId, seatNo, date } = await req.json();

        // Validate required inputs
        if (!userId || !fareId) {
            return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
        }

        const bus = await getFareById(fareId)

        const user = await getUserById(userId)


        const bookingData = {
            routeId: bus?.routeId,
            userId: userId,
            fromLocationId: bus?.fromLocationId,
            toLocationId: bus?.toLocationId,
            date: new Date(date).toISOString(),
            seatNumber: seatNo,
            bookingStatus: "Payment Pending",
            fareId: fareId,
        }
        const result = await addBooking(bookingData);


        // Check if the booking was successful
        return NextResponse.json(result, { status: 201 });
        // return NextResponse.json({ success: true, booking: result }, { status: 200 });
    } catch (error: any) {
        console.error("Error creating booking:", error.message);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

