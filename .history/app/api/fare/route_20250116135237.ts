import { NextApiRequest, NextApiResponse } from 'next';
import { addFare } from "@/lib/fare"; // Ensure this path is correct

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle the POST request (e.g., save fare data)
    const { routeId, fromLocationId, toLocationId, price, createdByUserId } = req.body;

    try {
      // Perform database operations or other logic here
      // Example: await saveFareToDatabase({ routeId, fromLocationId, toLocationId, price, createdByUserId });

      return res.status(200).json({ message: 'Fare added successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add fare' });
    }
  } else {
    // If the method is not POST, return 405 Method Not Allowed
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}