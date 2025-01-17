import { NextApiRequest, NextApiResponse } from 'next';
import { addFare } from "@/lib/fare"; // Ensure this path is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const result = await addFare(req.body);
      if ('error' in result) {
        return res.status(400).json(result);
      }
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

