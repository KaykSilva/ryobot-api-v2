// lib/auth.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './jwt'

export function requireAuth(req: NextRequest) {
  const token =
    req.cookies.get('token')?.value ||
    req.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'Token não encontrado' }, { status: 401 })
  }

  try {
    const decoded = verifyToken(token)
    return decoded

  } catch (err) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }
}
