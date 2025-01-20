import { getAllVehicles,addVehicle } from "@/lib/vehicle"; // Importing the vehicle service functions

// GET method to fetch paginated vehicles
// -----------------------------------------------------------------------------
export async function GET(req: Request) {
  const url = new URL(req.url);

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  try {
    const { vehicles, total } = await getAllVehicles(page, limit);
    return new Response(
      JSON.stringify({
        data: vehicles,
        total,
        page,
        limit,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}


// POST method to add a new vehicle
// -----------------------------------------------------------------------------export async function POST(req: Request) {
  export async function POST(req: Request) {
    const { name, number, seats, type } = await req.json();
  
    if (!name || !number || seats <= 0 || !type) {
      return new Response(
        JSON.stringify({ error: "All vehicle details are required" }),
        { status: 400 }
      );
    }
  
    try {
      const newVehicle = await addVehicle({ name, number, seats, type });
      return new Response(JSON.stringify(newVehicle), { status: 201 });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }
  }
  