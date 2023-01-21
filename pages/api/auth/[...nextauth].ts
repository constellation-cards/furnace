import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from 'next-auth'
import DiscordProvider from "next-auth/providers/discord";

import prisma from "../../../components/prisma-client"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
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