// app/api/fare/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { addFare } from "@/lib/fare"; // Import your service function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
        const result = await addFare(req.body);
        if ('error' in result) {
          return res.status(400).json(result);
        }
        return res.status(201).json(result);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
