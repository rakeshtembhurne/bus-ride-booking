// pages/api/fare/add.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body; // Data sent in the request

      // Here, you would typically add the logic to interact with your database using Prisma, etc.
      // For example:
      // const fare = await prisma.fare.create({
      //   data: {
      //     routeId: data.routeId,
      //     fromLocationId: data.fromLocationId,
      //     toLocationId: data.toLocationId,
      //     price: data.price,
      //     createdByUserId: data.createdByUserId,
      //   },
      // });

      // Respond with success
      res.status(200).json({ message: 'Fare added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add fare' });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
