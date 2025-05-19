import { NextRequest } from 'next/server'
import { handleCreateUser, handleGetAllUsers } from '@/controller/userController'
import { requireAuth } from '@/lib/jwtVerifyer'

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth

  // Você pode acessar os dados do usuário autenticado com auth, se desejar
  return await handleCreateUser(req)
}

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth

  // console.log(auth) // auth contém os dados decodificados do token (caso útil)
  return await handleGetAllUsers()
}
