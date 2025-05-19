// controllers/userController.ts
import { NextRequest, NextResponse } from 'next/server'
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByDcId
} from '@/service/userService'

export async function handleCreateUser(req: NextRequest) {
    try {
        const body = await req.json()
        const { balance, discordId, username } = body
        const user = await createUser({ balance, discordId, username })
        return NextResponse.json(201);
    } catch (error) {
        console.error('Erro em handleCreateUser:', error)
        return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 })
    }
}


export async function handleGetAllUsers() {
    const users = await getAllUsers()
    return NextResponse.json(users)
}

export async function handleGetUser(id: string) {
    const isNumericId = /^\d+$/.test(id) && Number(id) <= Number.MAX_SAFE_INTEGER

    let user
    if (isNumericId) {
        user = await getUserById(Number(id))
    } else {
        user = await getUserByDcId(id)
    }

    if (!user) {
        return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
    }

    return NextResponse.json(user)
}

export async function handleUpdateUser(req: NextRequest, id: number) {
    const body = await req.json()
    try {
        const user = await updateUser(id, body)
        return NextResponse.json(user)
    } catch (e) {
        return NextResponse.json({ error: 'Erro ao atualizar usuário' }, { status: 500 })
    }
}

export async function handleDeleteUser(id: number) {
    try {
        await deleteUser(id)
        return NextResponse.json({ message: 'Usuário excluído com sucesso' })
    } catch (e) {
        return NextResponse.json({ error: 'Erro ao excluir usuário' }, { status: 500 })
    }
}
