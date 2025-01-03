import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    email: string
  }
}

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string
      email: string
    }
  }
}