import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, _req) {
        if (credentials?.password === process.env.NEXTAUTH_PASSWORD) {
          const user = {
            id: 1,
            name: credentials?.username,
            email: ""
          }
          return user
        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' // or 'database'
  },
  // pages: {} - see https://next-auth.js.org/configuration/options
})