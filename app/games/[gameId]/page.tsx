export const runtime = 'edge'

import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import GameDeeplinkClient from './GameDeeplinkClient'

interface Props { params: Promise<{ gameId: string }> }

const FIREBASE_DB = 'https://instagame-452906-default-rtdb.firebaseio.com'
const R2_BASE = 'https://pub-0caba249d019456b9181ce1575ef825e.r2.dev'
const FALLBACK_IMAGE = 'https://www.genzopia.com/genzopia-banner.png'

async function getGameImage(gameId: string): Promise<string> {
  try {
    // Fetch game node to get photo_id
    const gameRes = await fetch(`${FIREBASE_DB}/games/${gameId}.json`, { cache: 'no-store' })
    if (!gameRes.ok) return FALLBACK_IMAGE
    const game = await gameRes.json()
    if (!game) return FALLBACK_IMAGE

    const photoId: string = game.photo_id
    if (!photoId) return FALLBACK_IMAGE

    // Fetch photo node to get file_ext
    const photoRes = await fetch(`${FIREBASE_DB}/photos/${photoId}.json`, { cache: 'no-store' })
    if (!photoRes.ok) return FALLBACK_IMAGE
    const photo = await photoRes.json()

    const fileExt: string = photo?.file_ext
      ?? photo?.file_name?.split('.').pop()
      ?? 'jpg'

    return `${R2_BASE}/photo/${photoId}.${fileExt}`
  } catch {
    return FALLBACK_IMAGE
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gameId } = await params
  const image = await getGameImage(gameId)
  return {
    openGraph: {
      images: [{ url: image, width: 1200, height: 630 }],
      url: `https://www.genzopia.com/games/${gameId}`,
    },
    twitter: { card: 'summary_large_image', images: [image] },
  }
}

function isMobile(ua: string) {
  return /android|iphone|ipad|ipod|mobile/i.test(ua)
}

export default async function GamePage({ params }: Props) {
  const { gameId } = await params
  const headersList = await headers()
  const ua = headersList.get('user-agent') ?? ''

  if (!isMobile(ua)) redirect('/')

  return <GameDeeplinkClient gameId={gameId} />
}
