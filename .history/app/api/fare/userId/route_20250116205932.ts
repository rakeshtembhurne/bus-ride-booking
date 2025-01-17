import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers } from '@/lib/user'; // Import the function to fetch users

export async function GET(req: NextRequest) {
  try {
    const users = await getAllUsers(); // Fetch all users from the database.
    if (!users) {
      return NextResponse.json({ error: "No users found" }, { status: 404 });
    }

    // Format the fetched users into a desired structure
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,  // Assuming 'name' is a field you want to display
    }));

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
