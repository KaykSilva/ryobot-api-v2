import { handleGetAllBannerById } from "@/controller/bannerController"
import { requireAuth } from "@/lib/jwtVerifyer"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = requireAuth(req)
  if (auth instanceof Response) return auth
    const id = params.id 
  return await handleGetAllBannerById(req, id)
}