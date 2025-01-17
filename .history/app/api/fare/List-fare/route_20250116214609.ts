import { getAllFares } from '@/lib/fare'; // Make sure to import Prisma client correctly

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch fares data from the database
      const fares = await prisma.fare.findMany({
        include: {
          createdByUser: true, // If you want to include user details
        },
      });
      res.status(200).json(fares);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
}
