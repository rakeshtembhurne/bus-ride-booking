// pages/api/locations.ts

// import { getAllLocation } from "@/lib/location"; // Adjust the import path based on your project structure
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {

    try {
        const locations = await prisma.location.findMany(); // Fetch locations from your library function
        return NextResponse.json(locations); // Return the locations as JSON
    } catch (error) {
        console.error("Error fetching locations:", error);
        return NextResponse.json({ error: "Failed to fetch locations" });
    }
}