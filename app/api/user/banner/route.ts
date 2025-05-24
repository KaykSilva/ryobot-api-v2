import { NextRequest } from 'next/server'
import { requireAuth } from '@/lib/jwtVerifyer'
import { handleCreateBanners, handleGetAllBanner, handleSetActiveBanner } from '@/controller/bannerController'

export async function POST(req: NextRequest) {
    const auth = requireAuth(req)
    if (auth instanceof Response) return auth

    return await handleCreateBanners(req)
}

export async function GET(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth
  return await handleGetAllBanner(req)
}
export async function PUT(req: NextRequest) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth
  return await handleSetActiveBanner(req)
}