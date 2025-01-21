import { getAllLocation } from "@/lib/location";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {

    try {
        const locations = await getAllLocation(); // Fetch locations from your library function
        return NextResponse.json(locations); // Return the locations as JSON
    } catch (error) {
        console.error("Error fetching locations:", error);
        return NextResponse.json({ error: "Failed to fetch locations" });
    }
}