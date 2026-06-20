export const runtime = 'edge'

import { redirect } from 'next/navigation'

interface Props { params: Promise<{ gameId: string }> }

export default async function LegacyGamePage({ params }: Props) {
  const { gameId } = await params
  redirect(`/games/${gameId}`)
}
