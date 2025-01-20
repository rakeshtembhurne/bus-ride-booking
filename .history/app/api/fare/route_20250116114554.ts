import { NextApiRequest, NextApiResponse } from 'next';
import { addFare } from "@/lib/fare"; // Import addFare from lib/fare.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
        // Get the data from the request body
        const { route, fromLocation, toLocation, price, userId } = req.body;

        // Call the addFare function to save the fare in the database
        const result = await addFare({
          route,
          fromLocation,
          toLocation,
          price,
          userId, // Add the userId if needed for tracking the user
        });

        // Return the result (fare data or error)
        if ('error' in result) {
          return res.status(400).json(result);
        }
        return res.status(201).json(result); // Successfully added fare
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
