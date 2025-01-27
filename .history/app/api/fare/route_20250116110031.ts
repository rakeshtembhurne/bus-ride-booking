// app/api/fare/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { addFare, getAllFares, getFareById, updateFare, deleteFare } from "@/lib/fare"; // Import functions from lib/fare.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            try {
                const result = await addFare(req.body);
                if (result.error) {
                    return res.status(400).json(result);
                }
                return res.status(201).json(result);
            } catch (error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        case 'GET':
            const fares = await getAllFares();
            return res.status(200).json(fares);
        // Handle other methods like PUT, DELETE if needed
        default:
            res.setHeader('Allow', ['POST', 'GET']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
