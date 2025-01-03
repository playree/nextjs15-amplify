import { ERR_MSG } from '@/config/messages'
import { z } from 'zod'

export const zEmail = z.string().email(ERR_MSG.invalid_email)

export const scInitialize = z.object({
  email: zEmail,
})
export type Initialize = z.infer<typeof scInitialize>
