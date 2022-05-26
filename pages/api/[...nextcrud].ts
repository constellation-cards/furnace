import NextCrud, { PrismaAdapter } from '@premieroctet/next-crud'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = NextCrud({
    adapter: new PrismaAdapter({
      prismaClient: prisma,
    }),
  })
  export default handler