export const runtime = 'edge'

import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

interface Props { params: Promise<{ gameId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { gameId } = await params
  return {
    alternates: {
      canonical: `https://www.genzopia.com/games/${gameId}`,
    },
  }
}

export default async function LegacyGamePage({ params }: Props) {
  const { gameId } = await params
  redirect(`/games/${gameId}`)
}