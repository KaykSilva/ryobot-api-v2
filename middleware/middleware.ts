import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export function middleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json({ error: 'Token ausente' }, { status: 401 })
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 401 })
  }

  // Adiciona o usuário ao request se quiser
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/private/:path*'], // Protege rotas que começam com /api/private/
}
