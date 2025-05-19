import { NextRequest } from 'next/server'
import { handleGetAllCodes, handleRedeemCode } from '@/controller/redeemController'
import { requireAuth } from '@/lib/jwtVerifyer'

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth
  return await handleRedeemCode(req)

}
export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth
  return await handleGetAllCodes(req)

}
