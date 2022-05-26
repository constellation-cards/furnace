// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.sessions_v1.findMany();
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({err})
  } finally {
    await prisma.$disconnect()
  }
}
