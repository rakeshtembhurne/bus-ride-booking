import { NextResponse } from "next/server";
import { getAllFares } from "@/lib/fare";  // Make sure this is properly defined

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  try {
    const fares = await getAllFares(page, limit);  // Ensure your function handles pagination properly
    const totalRecords = await getTotalFares();   // Add a function to fetch the total count of fares

    return NextResponse.json({ data: fares, total: totalRecords }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch fares" }, { status: 500 });
  }
}
