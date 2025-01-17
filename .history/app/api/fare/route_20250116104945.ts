import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/db';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { routeId, fromLocationId, toLocationId, price, createdByUserId } = await req.json();

        const newFare = await prisma.fare.create({
            data: {
                routeId,
                fromLocationId,
                toLocationId,
                price,
                createdByUserId,
            },
        });

        return res.status(201).json(newFare);
    } catch (error) {
        console.error("Error creating fare:", error);
        return res.status(500).json({ error: 'Failed to add fare' });
    }
}

export async function OPTIONS(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(204).end();
}
