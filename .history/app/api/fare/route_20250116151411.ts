// pages/api/fare/add.js

import { addFare } from '@/lib/fare';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const fare = await addFare(req.body);
      res.status(201).json(fare);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add fare' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
