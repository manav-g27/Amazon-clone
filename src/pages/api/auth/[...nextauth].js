import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
const dotenv = require('dotenv');
dotenv.config()
export const authOptions = {
  // Configure one or more authentication providers
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)