// /pages/api/fares/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAllFare, getAllFares } from "@/lib/fare";
import { NextRequest, NextResponse } from "next/server";

// Define the Fare type
interface Fare {
    origin: { id: string };
    destination: { id: string };
    // other properties...
}

// Define the response type from getAllFare
interface FareResponse {
    fares: Fare[];
}

export async function GET(req: NextRequest, res: Response) {
    try {
        const { searchParams } = req.nextUrl; // Access the URL's query parameters
        const origin = searchParams.get("origin");
        const destination = searchParams.get("destination");

        // Get all fares
        const allFares: FareResponse = await getAllFare();

        // Filter fares by origin and destination if provided
        if (origin && destination) {
            const filteredFares = allFares.fares.filter(
                (fare: Fare) => fare.origin.id === origin && fare.destination.id === destination
            );

            if (filteredFares.length === 0) {
                return NextResponse.json({ error: "No Bus found for the selected route" });
            }

            return NextResponse.json(filteredFares);
        }

        // Return all fares if no filters are applied
        return NextResponse.json(allFares.fares);
    } catch (error) {
        console.error("Error fetching fares:", error);
        return NextResponse.json({ error: "Internal server error" });
    }
}