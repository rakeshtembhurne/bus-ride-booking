import { getRouteById, updateRoute, deleteRoute } from "@/lib/route"; // Import functions for database operations
import { NextResponse } from 'next/server';

// ----------------------------------------------------------------------------
// GET Request - To Get Route By ID
// ----------------------------------------------------------------------------

export async function GET(req: Request) {
  const url = new URL(req.url);
  const routeId = url.pathname.split("/").pop(); // Extract routeId from URL path

  if (!routeId) {
    return new NextResponse(
      JSON.stringify({ error: "Route ID is required" }),
      { status: 400 }
    );
  }

  try {
    const route = await getRouteById(routeId); // Your function to get route from DB

    if (!route) {
      return new NextResponse(
        JSON.stringify({ error: "Route not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify(route),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

// ----------------------------------------------------------------------------
// PUT Request - To Update Route by ID
// ----------------------------------------------------------------------------
export async function PUT(req: Request) {
  const routeId = req.url.split("/").pop(); // Get routeId from URL path
  const { originId, destinationId, vehicleId, departureTime, arrivalTime, userId } = await req.json();

  if (!routeId) {
    return new NextResponse(
      JSON.stringify({ error: "Route ID is required" }),
      { status: 400 }
    );
  }

  // Ensure at least one field is provided for updating the route
  if (!originId && !destinationId && !vehicleId && !departureTime && !arrivalTime && !userId) {
    return new NextResponse(
      JSON.stringify({ error: "At least one field is required for updating the route" }),
      { status: 400 }
    );
  }

  // Format times to ensure HH:mm:ss format (add seconds if missing)
  const formattedDepartureTime = formatTime(departureTime); // Ensure valid time format
  const formattedArrivalTime = formatTime(arrivalTime);     // Ensure valid time format

  // Update the route in the database
  try {
    const updatedRoute = await updateRoute(routeId, {
      originId,
      destinationId,
      vehicleId,
      departureTime: formattedDepartureTime,  // Apply formatted departure time
      arrivalTime: formattedArrivalTime,      // Apply formatted arrival time
      userId
    });

    if (updatedRoute.error) {
      return new NextResponse(JSON.stringify(updatedRoute), { status: 400 });
    }

    return new NextResponse(
      JSON.stringify(updatedRoute),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

// ----------------------------------------------------------------------------
// DELETE Request - To Delete Route by ID
// ----------------------------------------------------------------------------
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const routeId = url.pathname.split("/").pop(); // Extract routeId from URL path

  if (!routeId) {
    return new NextResponse(
      JSON.stringify({ error: "Route ID is required" }),
      { status: 400 }
    );
  }

  try {
    const deletionResult = await deleteRoute(routeId);

    if (deletionResult.error) {
      return new NextResponse(JSON.stringify(deletionResult), { status: 400 });
    }

    return new NextResponse(
      JSON.stringify(deletionResult),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

// Helper function to ensure time is in HH:mm:ss format
function formatTime(time: string): string {
  const timeParts = time.split(':');
  if (timeParts.length !== 2 && timeParts.length !== 3) {
    throw new Error('Invalid time format. Expected HH:mm or HH:mm:ss');
  }

  // If time is in HH:mm, add seconds as '00'
  if (timeParts.length === 2) {
    timeParts.push('00');
  }

  return timeParts.join(':');  // Return the formatted time as HH:mm:ss
}
