'use client'

import { ArrowLeftOnRectangleIcon, GoogleIcon } from '@/components/icons'
import { gridStyles } from '@/components/styles'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { FC } from 'react'

export const SignInClient: FC = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || undefined

  return (
    <Card className='m-auto w-full max-w-md'>
      <CardHeader>
        <ArrowLeftOnRectangleIcon className='mr-2' />
        ログイン
      </CardHeader>
      <CardBody>
        <div className={gridStyles()}>
          <div className='col-span-12 pt-2 text-center'>
            <Button variant='ghost' color='default' onPress={() => signIn('google', { callbackUrl })}>
              <GoogleIcon />
              Googleでログイン
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
