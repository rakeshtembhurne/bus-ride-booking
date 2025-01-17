// pages/api/locations/index.ts

import { NextApiRequest, NextApiResponse } from "next";
import { addLocation } from "@/lib/location";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const location = await addLocation(req.body);
      if ('error' in location) {
        return res.status(400).json(location);
      }
      return res.status(201).json(location);
    } catch (error) {
      return res.status(500).json({
        error: "Server Error",
        details: error.message,
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
