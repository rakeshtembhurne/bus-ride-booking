import { addRoute, getAllRoutes, getRouteById, updateRoute, deleteRoute } from "@/lib/route"; // Import the functions for database operations

// ----------------------------------------------------------------------------
// POST Request - To Add a Route
// ----------------------------------------------------------------------------
// Assuming `departureTime` and `arrivalTime` are coming in as full date strings
// Assuming you have this helper function for time format validation
export async function POST(req: Request) {
  try {
    const { originId, destinationId, vehicleId, departureTime, arrivalTime, userId, createdByUserId } = await req.json();

    // Basic validation (ensure all required fields are present)
    if (!originId || !destinationId || !vehicleId || !departureTime || !arrivalTime ) {
      return new Response(
        JSON.stringify({ error: "All fields (origin, destination, vehicle, departure time, arrival time, createdByUserId) are required" }),
        { status: 400 }
      );
    }

    // Ensure departureTime and arrivalTime are formatted as time strings (HH:mm:ss)
    const departureTimeFormatted = formatTime(departureTime);  // Custom function to format time
    const arrivalTimeFormatted = formatTime(arrivalTime);      // Custom function to format time

    // Create the new route object
    const newRoute = await addRoute({
      originId,
      destinationId,
      vehicleId,
      departureTime: departureTimeFormatted,  // Send the time as a string
      arrivalTime: arrivalTimeFormatted,      // Send the time as a string
      userId,
      createdByUserId
    });

    // If there's an error, return it
    if (newRoute.error) {
      return new Response(JSON.stringify(newRoute), { status: 400 });
    }

    return new Response(JSON.stringify(newRoute), { status: 201 });
  } catch (error) {
    console.error('Error in POST Route:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

// Function to ensure time is in HH:mm:ss format
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



// ----------------------------------------------------------------------------
// GET Request - To Get All Routes with Pagination
// ----------------------------------------------------------------------------
export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10); 
  const limit = parseInt(url.searchParams.get("limit") || "10", 10); 

  try {
    const routes = await getAllRoutes(); // Fetch all routes
    const paginatedRoutes = routes.slice((page - 1) * limit, page * limit); // Apply pagination logic

    return new Response(
      JSON.stringify({
        data: paginatedRoutes,
        total: routes.length, // Total routes for pagination
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

