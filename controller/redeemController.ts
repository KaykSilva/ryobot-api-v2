import { NextRequest, NextResponse } from 'next/server'
import { createRedeemCode, getAllCodes, redeemCode, redeemDaily } from '@/service/redeemService'
import { requireAuth } from '@/lib/jwtVerifyer'
import { getUserByDcId } from '@/service/userService'


export async function handleCreateCode(req: NextRequest) {
  const body = await req.json()
  const { code, amount } = body

  if (!code || !amount) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }

  try {
    const newCode = await createRedeemCode(code, amount)
    return NextResponse.json(newCode)
  } catch (err) {
    return NextResponse.json({ error: 'Erro ao criar código' }, { status: 500 })
  }
}

export async function handleRedeemCode(req: NextRequest) {
  const body = await req.json()
  const { code, discordId } = body
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
  }

  try {
    const dcId = await getUserByDcId(discordId)
    const userId = dcId?.id
    if (!userId) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    const result = await redeemCode(code, userId)
    return NextResponse.json({ message: 'Código resgatado', result })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
export async function handleRedeemDaily(req: NextRequest) {
  const body = await req.json()
  const { value, discordId } = body
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
  }

  try {
    const dcId = await getUserByDcId(discordId)
    const userId = dcId?.id
    if (!userId) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    const result = await redeemDaily(value, userId)
    return NextResponse.json({ message: 'recompensa diária resgatada', result })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}

export async function handleGetAllCodes(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
  }
  try {
    const codes = await getAllCodes()
    return NextResponse.json(codes)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }

}

