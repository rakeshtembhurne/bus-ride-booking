import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers } from '@/lib/user'; // Import the function to fetch users

export async function GET(req: NextRequest) {
  try {
    const users = await getAllUsers(); // Fetch all users from the database.
    console.log("Fetched users:", users);

    // Format the fetched users into a desired structure
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,  // Assuming 'name' is a field you want to display
    }));

    console.log("Formatted users:", formattedUsers);  
    return NextResponse.json(formattedUsers, { status: 200 }); // Return formatted data
  } catch (error) {
    console.error("Error fetching users:", error);  
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
