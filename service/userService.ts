// services/userService.ts
import { prisma } from '@/lib/prisma'

export const createUser = (data: { discordId: string; username: string, balance: number }) => {
  return prisma.discordUser.create({ data })
}

export const getAllUsers = () => {
  return prisma.discordUser.findMany()
}

export const getUserById = (id: number) => {
  return prisma.discordUser.findUnique({ where: { id } })
}

export const updateUser = (id: number, data: { username?: string }) => {
  return prisma.discordUser.update({ where: { id }, data })
}

export const deleteUser = (id: number) => {
  return prisma.discordUser.delete({ where: { id } })
}
