export const runtime = 'edge'

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

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
    const gameRes = await fetch(`${FIREBASE_DB}/games/${gameId}.json`, { signal: controller.signal, cache: 'no-store' })
    clearTimeout(timeout)
    if (!gameRes.ok) return FALLBACK_IMAGE
    const game = await gameRes.json()
    const photoId: string = game?.photo_id
    if (!photoId) return FALLBACK_IMAGE

    const controller2 = new AbortController()
    const timeout2 = setTimeout(() => controller2.abort(), 3000)
    const photoRes = await fetch(`${FIREBASE_DB}/photos/${photoId}.json`, { signal: controller2.signal, cache: 'no-store' })
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
  const image = rawImage && rawImage !== FALLBACK_IMAGE
    ? `https://www.genzopia.com/cdn-cgi/image/width=600,height=600,fit=cover,format=jpeg/${rawImage}`
    : rawImage
  const title = name ? `${decodeURIComponent(name)} – Play Free on Genzopia 🎮` : 'Play Free on Genzopia 🎮'
  const description = name
    ? `Play ${decodeURIComponent(name)} free on Genzopia – 100+ games, no download needed!`
    : 'Play free games on Genzopia – 100+ games, no download needed!'

  return {
    metadataBase: new URL('https://www.genzopia.com'),
    alternates: { canonical: `https://www.genzopia.com/games/${gameId}` },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `https://www.genzopia.com/games/${gameId}`,
      images: [{ url: image, width: 600, height: 600, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}

export default async function LegacyGamePage({ params }: Props) {
  const { gameId } = await params
  redirect(`/games/${gameId}`)
}