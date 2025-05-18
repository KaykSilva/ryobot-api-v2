// app/api/users/route.ts
import { NextRequest } from 'next/server'
import { handleCreateUser, handleGetAllUsers } from '@/controller/userController'
import { requireAuth } from '@/lib/jwtVerifyer'

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth
  return await handleCreateUser(req)

}

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth
  return await handleGetAllUsers()
}
