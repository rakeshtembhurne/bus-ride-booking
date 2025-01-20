import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("HTTP Method:", req.method); // Should log "POST"

    if (req.method === 'POST') {
        try {
            // Access the request body directly as req.body
            const { routeId, fromLocationId, toLocationId, price, createdByUserId } = req.body;

            // Insert into the database
            const newFare = await prisma.fare.create({
                data: {
                    routeId,
                    fromLocationId,
                    toLocationId,
                    price,
                    createdByUserId,
                },
            });

            res.status(201).json(newFare); // Respond with the created fare
        } catch (error) {
            console.error("Error creating fare:", error);
            res.status(500).json({ error: 'Failed to add fare' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
