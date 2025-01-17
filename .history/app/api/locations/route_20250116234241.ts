import { NextApiRequest, NextApiResponse } from "next";
import { addLocation } from "@/lib/location";

// Handle POST request to add a location
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Call the addLocation function and pass the request body as the data
      const location = await addLocation(req.body);

      // Check if location has an 'error' property
      if ('error' in location) {
        return res.status(400).json(location); // Send error response if present
      }

      // Otherwise, return the created location
      return res.status(201).json(location);
    } catch (error) {
      // Handle any unforeseen errors
      return res.status(500).json({
        error: "Server Error",
        details: error.message,
      });
    }
  } else {
    // Handle unsupported request methods
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
