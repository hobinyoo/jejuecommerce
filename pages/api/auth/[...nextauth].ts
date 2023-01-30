import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prismadb'
import { CLIENT_ID, CLIENT_SECRET } from 'constants/googleAuth'

export const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    }),
  ],
  //쿠키 하루 연장
  session: {
    strategy: 'database',
    maxAge: 1 * 24 * 60 * 60,
  },
}

export default NextAuth(authOption)
