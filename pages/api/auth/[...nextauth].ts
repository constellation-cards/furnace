import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth from 'next-auth'
import DiscordProvider from "next-auth/providers/discord";

const client = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(client),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || ""
    })
  ],
  session: {
    strategy: 'database'
  },
  // pages: {} - see https://next-auth.js.org/configuration/options
})