import { NextRequest } from 'next/server'
import { handleCreateCode } from '@/controller/redeemController'

export async function POST(req: NextRequest) {
  return handleCreateCode(req)
}
