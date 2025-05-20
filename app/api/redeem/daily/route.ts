import { NextRequest } from 'next/server'
import { handleRedeemDaily } from '@/controller/redeemController'
import { requireAuth } from '@/lib/jwtVerifyer'

export async function POST(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth
  return await handleRedeemDaily(req)

}

