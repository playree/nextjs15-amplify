import { getGoogleAuthConfig, OAUTH_TYPE_GOOGLE } from '@/config/env'
import { prisma } from '@/helpers/prisma'
import { NextAuthOptions, Profile, Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
  providers: [GoogleProvider(getGoogleAuthConfig())],
  session: {
    maxAge: 86400,
  },
  jwt: {
    maxAge: 86400,
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user, account }) {
      console.debug('callbacks:signIn:', { provider: account?.provider, id: user.id })
      return true
    },
    async jwt(param) {
      const { token, account } = param

      let user
      if (account?.provider === OAUTH_TYPE_GOOGLE) {
        if (param.profile) {
          const profile: Profile & { email_verified?: boolean } = param.profile
          if (token.sub && profile.email_verified && profile.email) {
            user = await prisma.user.findUnique({ where: { email: profile.email } })
          }
        }
      } else {
        if (token.sub) {
          user = await prisma.user.findUnique({ where: { id: token.sub } })
        }
      }

      if (user) {
        token.sub = user.id
        token.email = user.email
        console.debug('set token:', token.sub)
      } else {
        console.debug('user not found')
        token.sub = undefined
      }

      return token
    },
    async session(param) {
      const { token, session } = param
      if (token.sub) {
        if (session.user) {
          session.user.id = token.sub
          session.user.email = token.email
        }
        console.debug('set session:', JSON.stringify(session.user))
      } else {
        return {} as Session
      }
      return session
    },
  },
}
export { authOptions }

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions)
  return session?.user
}
