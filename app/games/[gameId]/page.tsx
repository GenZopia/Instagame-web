export const runtime = 'edge'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import GameDeeplinkClient from './GameDeeplinkClient'

interface Props { params: Promise<{ gameId: string }> }

function isMobile(ua: string) {
  return /android|iphone|ipad|ipod|mobile/i.test(ua)
}

export default async function GamePage({ params }: Props) {
  const { gameId } = await params
  const headersList = await headers()
  const ua = headersList.get('user-agent') ?? ''

  // Desktop → go to landing page
  if (!isMobile(ua)) {
    redirect('/')
  }

  // Mobile → render client component that tries deeplink then falls back to Play Store
  return <GameDeeplinkClient gameId={gameId} />
}
