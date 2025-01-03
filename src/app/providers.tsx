'use client'

import { AuthProvider } from '@/components/nextekit/auth'
import { authProps } from '@/config/auth-props'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute='class'>
        <AuthProvider authProps={authProps}>{children}</AuthProvider>
      </ThemeProvider>
    </NextUIProvider>
  )
}
