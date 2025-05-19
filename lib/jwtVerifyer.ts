import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './jwt'

export function requireAuth(req: NextRequest) {
  const token = getTokenFromRequest(req)

  if (!token) {
    return NextResponse.json({ error: 'Token não encontrado' }, { status: 401 })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }

  return decoded
}

  function getTokenFromRequest(req: NextRequest): string | null {
    const cookieToken = req.cookies.get('token')?.value
    const authHeader = req.headers.get('Authorization')
    const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

    return cookieToken || bearerToken || null
  }
