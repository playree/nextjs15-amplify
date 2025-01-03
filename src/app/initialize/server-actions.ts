'use server'

import { prisma } from '@/helpers/prisma'
import { scInitialize } from '@/helpers/schema'
import { validAction } from '@/helpers/server'

export const isInitialized = validAction('isInitialized', {
  next: async () => {
    const count = await prisma.user.count()
    return count > 0
  },
})

export const registInitialUser = validAction('registInitialUser', {
  schema: scInitialize,
  next: async ({ req }) => {
    return prisma.user.createUser(req.email)
  },
})
