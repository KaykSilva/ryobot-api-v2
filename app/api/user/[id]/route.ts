import { NextRequest } from 'next/server'
import { handleGetUser, handleUpdateUser, handleDeleteUser } from '@/controller/userController'
import { requireAuth } from '@/lib/jwtVerifyer'


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth

  const id = params.id 
  return await handleGetUser(id)
}
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth

  const id = Number(params.id)
  return await handleUpdateUser(req, id)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth

  const id = Number(params.id)
  return await handleDeleteUser(id)
}

