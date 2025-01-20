export async function GET(req: Request) {
  try {
    const fares = await getAllFares();  // Ensure this is returning an array of fares
    console.log("Fetched fares:", fares);

    return NextResponse.json(fares, { status: 200 });
  } catch (error) {
    console.error("Error fetching fares:", error);
    return NextResponse.json({ error: "Failed to fetch fares" }, { status: 500 });
  }
}