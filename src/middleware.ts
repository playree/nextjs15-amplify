import { matchCondition } from '@/components/nextekit/auth/utils'

import { type NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { type NextFetchEvent, NextResponse } from 'next/server'

import { authProps } from './config/auth-props'

const middlewareWithAuth = withAuth(
  async (request) => {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-pathname', request.nextUrl.pathname)
    const response = NextResponse.next({ request: { headers: requestHeaders } })
    return response
  },
  {
    pages: { signIn: '/auth/signin' },
    callbacks: {
      authorized({ token }) {
        console.debug('mw:auth:token:', JSON.stringify(token))
        return !!token
      },
    },
  },
)

export const middleware = (request: NextRequestWithAuth, event: NextFetchEvent) => {
  console.debug('mw:start:', request.url, request.method)

  if (matchCondition(request.nextUrl.pathname, authProps.targetAuth)) {
    return middlewareWithAuth(request, event)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - xxx.xxx (file)
     */
    '/((?!_next/static|_next/image|_next/webpack-hmr|api/auth/|.*\\.).*)',
  ],
}
