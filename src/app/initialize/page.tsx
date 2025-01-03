import { RedirectComponent } from '@/components/nextekit/ui/redirect'
import { parseAction } from '@/helpers/action'
import { Metadata } from 'next'
import { FC } from 'react'
import { InitializeClient } from './client'
import { isInitialized } from './server-actions'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: '初期ユーザー登録',
}

const InitializePage: FC = async () => {
  if (await parseAction(isInitialized())) {
    return <RedirectComponent redirectUrl='/' />
  }

  return <InitializeClient />
}
export default InitializePage
