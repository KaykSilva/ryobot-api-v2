import { NextRequest, NextResponse } from 'next/server'
import { createRedeemCode, getAllCodes, redeemCode } from '@/service/redeemService'
import { requireAuth } from '@/lib/jwtVerifyer'
import { JwtPayload } from 'jsonwebtoken'
import { IRedeemCode } from '@/models/reedemCode'


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
    console.log(err)
    return NextResponse.json({ error: 'Erro ao criar código' }, { status: 500 })
  }
}

export async function handleRedeemCode(req: NextRequest) {
  const body = await req.json()
  const { code } = body
  const user = requireAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
  }

  try {
    const result = await redeemCode(code, (user as JwtPayload).id)
    return NextResponse.json({ message: 'Código resgatado', result })
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

