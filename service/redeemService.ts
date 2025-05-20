import { prisma } from '@/lib/prisma'
import { RedeemCode } from '@prisma/client'

export async function createRedeemCode(code: string, amount: number, expiresAt?: Date): Promise<RedeemCode> {
  return await prisma.redeemCode.create({
    data: {
      code,
      amount,
      expiresAt: expiresAt ?? null,
    },
  })
}

export async function getRedeemCode(code: string): Promise<RedeemCode | null> {
  return await prisma.redeemCode.findUnique({ where: { code } })
}

export async function getAllCodes(): Promise<RedeemCode[]> {
  return await prisma.redeemCode.findMany()
}

export async function redeemCode(code: string, userId: number): Promise<RedeemCode> {
  const redeem = await prisma.redeemCode.findUnique({ where: { code } })

  if (!redeem) throw new Error('Código inválido')
  if (redeem.used) throw new Error('Código já utilizado')
  if (redeem.expiresAt && redeem.expiresAt < new Date()) {
    throw new Error('Código expirado')
  }

  await prisma.$transaction([
    prisma.redeemCode.update({
      where: { code },
      data: {
        used: true,
        usedAt: new Date(),
        userId,
      },
    }),
    prisma.discordUser.update({
      where: { id: userId },
      data: {
        balance: {
          increment: redeem.amount,
        },
      },
    }),
  ])

  return redeem
}

export async function redeemDaily(value: number, userId: number) {
  return await prisma.$transaction([
    prisma.discordUser.update({
      where: { id: userId },
      data: {
        balance: {
          increment: value,
        },
        redeemAt: new Date(Date.now())
      },
    }),
  ])

}