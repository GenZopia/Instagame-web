export const runtime = 'edge'

import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import GameDeeplinkClient from './GameDeeplinkClient'

interface Props { params: Promise<{ gameId: string }> }

const FIREBASE_DB = 'https://instagame-452906-default-rtdb.firebaseio.com'
const R2_BASE = 'https://cdn.genzopia.com'
const FALLBACK_IMAGE = 'https://www.genzopia.com/genzopia-banner.png'

async function getGameImage(gameId: string): Promise<string> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const gameRes = await fetch(`${FIREBASE_DB}/games/${gameId}.json`, { signal: controller.signal })
    clearTimeout(timeout)

    if (!gameRes.ok) return FALLBACK_IMAGE
    const game = await gameRes.json()
    const photoId: string = game?.photo_id
    if (!photoId) return FALLBACK_IMAGE

    const controller2 = new AbortController()
    const timeout2 = setTimeout(() => controller2.abort(), 3000)
    const photoRes = await fetch(`${FIREBASE_DB}/photos/${photoId}.json`, { signal: controller2.signal })
    clearTimeout(timeout2)

    if (!photoRes.ok) return FALLBACK_IMAGE
    const photo = await photoRes.json()
    const fileExt: string = photo?.file_ext ?? photo?.file_name?.split('.').pop() ?? 'jpg'

    const url = `${R2_BASE}/photo/${photoId}.${fileExt}`
    return url || FALLBACK_IMAGE
  } catch {
    return FALLBACK_IMAGE
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gameId } = await params
  const image = await getGameImage(gameId)
  return {
    metadataBase: new URL('https://www.genzopia.com'),
    openGraph: {
      type: 'website',
      url: `https://www.genzopia.com/games/${gameId}`,
      images: image,
    },
    twitter: { card: 'summary', images: [image] },
  }
}

function isCrawler(ua: string) {
  return /facebookexternalhit|whatsapp|twitterbot|linkedinbot|slackbot|telegrambot|discordbot|googlebot|bingbot|crawler|spider|bot/i.test(ua)
}

function isMobile(ua: string) {
  return /android|iphone|ipad|ipod|mobile/i.test(ua)
}

export default async function GamePage({ params }: Props) {
  const { gameId } = await params
  const headersList = await headers()
  const ua = headersList.get('user-agent') ?? ''

  // Crawlers/bots: stay on page so they read OG tags
  // Desktop real users: redirect to home
  if (!isMobile(ua) && !isCrawler(ua)) redirect('/')

  return <GameDeeplinkClient gameId={gameId} />
}
