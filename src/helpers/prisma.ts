import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient().$extends({
  model: {
    user: {
      async createUser(email: string) {
        return prisma.user.create({ data: { email } })
      },
    },
  },
})
