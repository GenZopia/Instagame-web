export const runtime = 'edge'

import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import GameDeeplinkClient from './GameDeeplinkClient'

interface Props {
  params: Promise<{ gameId: string }>
  searchParams: Promise<{ img?: string; name?: string }>
}

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
    return `${R2_BASE}/photo/${photoId}.${fileExt}` || FALLBACK_IMAGE
  } catch {
    return FALLBACK_IMAGE
  }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { gameId } = await params
  const { img, name } = await searchParams
  const rawImage = img ? decodeURIComponent(img) : await getGameImage(gameId)
  // Upscale small thumbnails via Cloudflare Image Resizing for better OG preview
  const image = rawImage && rawImage !== FALLBACK_IMAGE
    ? `https://www.genzopia.com/cdn-cgi/image/width=600,height=600,fit=cover,format=jpeg/${rawImage}`
    : rawImage
  const title = name ? `${decodeURIComponent(name)} – Play Free on Genzopia 🎮` : 'Play Free on Genzopia 🎮'
  const description = name ? `Play ${decodeURIComponent(name)} free on Genzopia – 100+ games, no download needed!` : 'Play free games on Genzopia – 100+ games, no download needed!'

  return {
    metadataBase: new URL('https://www.genzopia.com'),
    openGraph: {
      type: 'website',
      title,
      description,
      url: `https://www.genzopia.com/games/${gameId}`,
      images: [{ url: image, width: 600, height: 600 }],
    },
    twitter: { card: 'summary', title, images: [image] },
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

  if (!isMobile(ua) && !isCrawler(ua)) redirect('/')

  return <GameDeeplinkClient gameId={gameId} />
}
