import { Metadata } from 'next'
import { FC } from 'react'

import { SignInClient } from './client'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'ログイン',
}

const SignIn: FC = async () => {
  return <SignInClient />
}
export default SignIn
