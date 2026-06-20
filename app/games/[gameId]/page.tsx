export const runtime = 'edge'

import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import GameDeeplinkClient from './GameDeeplinkClient'

interface Props { params: Promise<{ gameId: string }> }

// TODO: replace with your actual game API to get title + thumbnail per gameId
async function getGameMeta(gameId: string) {
  try {
    const res = await fetch(`https://api.genzopia.com/games/${gameId}`, { next: { revalidate: 3600 } })
    if (res.ok) {
      const data = await res.json()
      return { title: data.title, image: data.thumbnail }
    }
  } catch { /* fallback below */ }
  return {
    title: `Play on Genzopia`,
    image: 'https://www.genzopia.com/genzopia-banner.png',
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gameId } = await params
  const { title, image } = await getGameMeta(gameId)
  return {
    title: `${title} – Genzopia`,
    description: 'Play this game free on Genzopia – 100+ games, no download needed!',
    openGraph: {
      title: `${title} – Play Free on Genzopia 🎮`,
      description: 'Tap to play instantly. 100+ free games on Genzopia.',
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
