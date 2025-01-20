import { NextResponse } from "next/server";
import { getAllFares } from "@/lib/fare";

export async function GET(req: Request) {
  try {
    const fares = await getAllFares();
    console.log("Fetched fares:", JSON.stringify(fares, null, 2));

    return NextResponse.json(fares, { status: 200 });
  } catch (error) {
    console.error("Error fetching fares:", error);
    return NextResponse.json({ error: "Failed to fetch fares" }, { status: 500 });
  }
}
