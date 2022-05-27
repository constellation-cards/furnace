import NextCrud, { PrismaAdapter } from '@premieroctet/next-crud'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"

const prisma = new PrismaClient()

/**
 * options.routeType can be one of: READ_ALL, READ_ONE, CREATE, UPDATE, DELETE
 */

const handler = NextCrud({
    adapter: new PrismaAdapter({
      prismaClient: prisma,
    }),
    onRequest: async (req: NextApiRequest, res: NextApiResponse, options: any) => {
      const session = await getSession({ req })

      switch (options.routeType) {
        case 'READ_ONE':
        case 'READ_ALL':
          break;
        default:
          if (!session) {
            res.status(401).send('Unauthorized')
            throw new Error('UnauthorizedError')
          }
      }
    }
  })
  export default handler