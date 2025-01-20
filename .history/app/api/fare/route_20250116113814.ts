import { NextApiRequest, NextApiResponse } from 'next';
import { addFare, getAllFares, getFareById } from "@/lib/fare"; // Import functions from lib/fare.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request Method:', req.method); // Log the method
  console.log('Request Path:', req.url); // Log the path

  switch (req.method) {
      case 'POST':
          try {
              console.log('Handling POST request');
              const result = await addFare(req.body);
              if ('error' in result) {
                  return res.status(400).json(result);
              }
              return res.status(201).json(result);
          } catch (error) {
              return res.status(500).json({ error: 'Internal Server Error' });
          }
      case 'GET':
          console.log('Handling GET request');
          const fares = await getAllFares();
          return res.status(200).json(fares);
      default:
          res.setHeader('Allow', ['POST', 'GET']);
          return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
