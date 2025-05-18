import { NextResponse } from 'next/server'

export async function GET() {
  const discordAuthUrl = new URL('https://discord.com/api/oauth2/authorize')
  discordAuthUrl.searchParams.set('client_id', process.env.DISCORD_CLIENT_ID!)
  discordAuthUrl.searchParams.set('redirect_uri', process.env.DISCORD_REDIRECT_URI!)
  discordAuthUrl.searchParams.set('response_type', 'code')
  discordAuthUrl.searchParams.set('scope', 'identify email')

  return NextResponse.redirect(discordAuthUrl.toString())
}
