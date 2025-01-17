import { NextApiRequest, NextApiResponse } from 'next';
import { addFare } from "@/lib/fare"; // Ensure this path is correct

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle POST request
    res.status(200).json({ message: 'POST request received' });
  } else {
    // Respond with 405 Method Not Allowed for other methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
