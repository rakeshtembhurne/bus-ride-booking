import { NextApiRequest, NextApiResponse } from "next";
import { getAllFares } from "@/lib/fare";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  console.log("Received request method:", req.method); // Log the request method
  if (req.method === "GET") {
    try {
      const fares = await getAllFares();
      console.log("Fetched fares:", fares); // Log the fetched fares
      return res.status(200).json(fares);
    } catch (error) {
      console.error("Error fetching fares:", error); // Log the error in case of failure
      return res.status(500).json({ error: "Failed to fetch fares" });
    }
  } else {
    console.log(`Method ${req.method} not allowed`); // Log the unsupported method
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}