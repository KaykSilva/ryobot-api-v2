import { NextRequest } from 'next/server'
import { handleGetUser, handleUpdateUser, handleDeleteUser } from '@/controller/userController'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  // Converte id para número antes de passar pro controller
  const id = Number(params.id)
  return await handleGetUser(id)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  return await handleUpdateUser(req, id)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  return await handleDeleteUser(id)
}
