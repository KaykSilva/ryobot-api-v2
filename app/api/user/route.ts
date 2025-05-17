// app/api/users/route.ts
import { NextRequest } from 'next/server'
import { handleCreateUser, handleGetAllUsers } from '@/controller/userController'

export async function POST(req: NextRequest) {
  return await handleCreateUser(req)
}

export async function GET() {
  return await handleGetAllUsers()
}
