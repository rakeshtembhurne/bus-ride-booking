// pages/api/fare/add.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { addFare } from '@/lib/fare'  // Import your addFare function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await addFare(req.body); // Pass the request body to addFare function
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to add fare',
        details: error.message,
      });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
