import { NextApiRequest, NextApiResponse } from "next";
import { getAllFares } from "@/lib/fare";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const fares = await getAllFares();
      return res.status(200).json(fares);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch fares" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
