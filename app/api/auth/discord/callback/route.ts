import { NextRequest, NextResponse } from 'next/server'
import { generateToken } from '@/lib/jwt'
import { createOrFindDiscordUser } from '@/service/userService'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Código não informado' }, { status: 400 })

  const data = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID!,
    client_secret: process.env.DISCORD_CLIENT_SECRET!,
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    scope: 'identify email',
  })

  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: data.toString(),
  })

  const tokenData = await response.json()
  if (!tokenData.access_token) {
    return NextResponse.json({ error: 'Erro ao obter token do Discord' }, { status: 400 })
  }

  const userInfo = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  }).then(res => res.json())

  const user = await createOrFindDiscordUser(userInfo) 
  const jwt = generateToken({ id: user.id, username: user.username, discordId: user.discordId })

  return NextResponse.redirect(`http://localhost:3000/auth/callback?d=${tokenData.access_token}?j=${jwt}`)
}
