import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { routeId, fromLocationId, toLocationId, price, createdByUserId } = req.body;

            const newFare = await prisma.fare.create({
                data: {
                    routeId,
                    fromLocationId,
                    toLocationId,
                    price,
                    createdByUserId,
                },
            });

            res.status(201).json(newFare);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to add fare' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
