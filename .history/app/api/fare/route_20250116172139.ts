// pages/api/routes.ts

import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const routes = await prisma.route.findMany({
      select: {
        id: true,
        origin: {
          select: {
            name: true,
          },
        },
        destination: {
          select: {
            name: true,
          },
        },
      },
    })
    res.status(200).json(routes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
