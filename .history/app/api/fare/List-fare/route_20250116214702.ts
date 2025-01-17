import { prisma } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch fares data from the database
      const fares = await prisma.fare.findMany({
        include: {
          route: true,
          origin: true,
          destination: true,
        },
      });
      res.status(200).json(fares); // Return the fetched fares
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
}
