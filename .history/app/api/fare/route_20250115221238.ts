// pages/api/fare/add.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const data = req.body; 
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
