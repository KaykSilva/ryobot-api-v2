// services/userService.ts
import { prisma } from '@/lib/prisma'
import type { DiscordUser } from '@prisma/client'

interface CreateUserData {
  discordId: string
  username: string
  balance: number
}

interface UpdateUserData {
  username?: string
}

interface DiscordUserInfo {
  id: string
  username: string

}

export const createUser = (data: CreateUserData): Promise<DiscordUser> => {
  return prisma.discordUser.create({ data })
}


export const getAllUsers = (): Promise<DiscordUser[]> => {
  return prisma.discordUser.findMany()
}

export const getUserById = (id: number): Promise<DiscordUser | null> => {
  return prisma.discordUser.findUnique({ where: { id } })
}
export const getUserByDcId = (discordId: string): Promise<DiscordUser | null> => {
  return prisma.discordUser.findUnique({ where: { discordId } })
}


export const updateUser = (id: number, data: UpdateUserData): Promise<DiscordUser> => {
  return prisma.discordUser.update({ where: { id }, data })
}

export const deleteUser = (id: number): Promise<DiscordUser> => {
  return prisma.discordUser.delete({ where: { id } })
}


export const createOrFindDiscordUser = async (
  userInfo: DiscordUserInfo
): Promise<DiscordUser> => {
  const { id: discordId, username } = userInfo

  let user = await prisma.discordUser.findUnique({ where: { discordId } })

  if (!user) {
    user = await prisma.discordUser.create({
      data: {
        discordId,
        username,
        balance: 0,
      },
    })
  }

  return user
}
