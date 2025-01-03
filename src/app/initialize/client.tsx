'use client'

import { CheckIcon, Cog6ToothIcon } from '@/components/icons'
import { ExButton } from '@/components/nextekit/ui/button'
import { InputCtrl } from '@/components/nextekit/ui/input'
import { gridStyles } from '@/components/styles'
import { ThemeSwitchList } from '@/components/theme-switch'
import { parseAction } from '@/helpers/action'
import { Initialize, scInitialize } from '@/helpers/schema'
import { intervalOperation } from '@/helpers/sleep'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { registInitialUser } from './server-actions'

export const InitializeClient: FC = () => {
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Initialize>({
    resolver: zodResolver(scInitialize),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  return (
    <div className='mx-auto mt-4 w-full max-w-xl'>
      <div className='mb-4 flex items-center pl-8 lg:pl-0'>
        <Cog6ToothIcon className='mr-2' />
        <span className='mr-8 text-lg'>初期ユーザー登録</span>
        <div className='right-0 flex flex-auto justify-end'>
          <ThemeSwitchList size='sm' className='mr-2' />
        </div>
      </div>

      <form
        onSubmit={handleSubmit(async (req) => {
          console.debug('create:submit:', req)
          setLoading(true)

          await parseAction(registInitialUser(req))
          await intervalOperation()
          router.refresh()
        })}
      >
        <div className={gridStyles()}>
          <div className='col-span-12 mb-2'>初期ユーザーとして登録するGoogleアカウントを入力してください</div>
          <div className='col-span-12'>
            <InputCtrl
              control={control}
              name='email'
              label='Eメール'
              autoComplete='username'
              errorMessage={errors.email?.message}
              isRequired
            />
          </div>

          <div className='col-span-12 mt-4 text-center'>
            <ExButton type='submit' variant='solid' startContent={<CheckIcon />} isLoading={isLoading}>
              登録
            </ExButton>
          </div>
        </div>
      </form>
    </div>
  )
}
