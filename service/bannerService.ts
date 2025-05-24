import { prisma } from "@/lib/prisma"

export async function addBanner(userId: number, imageUrl: string) {
    return await prisma.banner.create({
        data: { userId, imageUrl },
    })
}

export async function getAllUserBanners(userId: number) {
    const id = Number(userId);
    return await prisma.banner.findMany({
        where: { userId: id }
    });
}
export async function getAllBanners() {
    return await prisma.banner.findMany();
}

export async function setActiveBanner(userId: number, bannerUrl: string) {
    return await prisma.discordUser.update({
        where: { id: userId },
        data: { activeBanner: bannerUrl },
    })
}
