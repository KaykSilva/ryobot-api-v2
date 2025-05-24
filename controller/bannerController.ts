import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/jwtVerifyer'
import { addBanner, getAllBanners, getAllUserBanners, setActiveBanner } from '@/service/bannerService'
import { getUserByDcId } from '@/service/userService'


export async function handleCreateBanners(req: NextRequest) {
    const body = await req.json()
    const { userId, imageUrl } = body
    const user = requireAuth(req);
    if (!user) {
        return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    if (!userId || !imageUrl) {
        return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    try {
        const newCode = await addBanner(userId, imageUrl)
        return NextResponse.json(newCode)
    } catch (err) {
        return NextResponse.json({ error: 'Erro ao guardar banner', err }, { status: 500 })
    }
}


export async function handleSetActiveBanner(req: NextRequest) {
    const body = await req.json()
    const { userId, imageUrl } = body
    const user = requireAuth(req);
    if (!user) {
        return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    try {
        const dcId = await getUserByDcId(userId)
        const id = Number(dcId?.id) 
        const result = await setActiveBanner(id, imageUrl)
        return NextResponse.json({ message: 'Banner ativado com sucesso', result })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}


export async function handleGetAllBanner(req: NextRequest) {
    const user = requireAuth(req);
    if (!user) {
        return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    try {
        const codes = await getAllBanners()
        return NextResponse.json(codes)
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }

}
export async function handleGetAllBannerById(req: NextRequest, id: string) {
    const user = requireAuth(req);
    if (!user) {
        return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }
    try {
        const dcId = await getUserByDcId(id)
        const userId = dcId?.id ?? id
        console.log(userId)
        if (!userId) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }
        const banner = await getAllUserBanners(Number(userId))
        return NextResponse.json(banner)
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }

}

