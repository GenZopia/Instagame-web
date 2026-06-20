import { NextRequest, NextResponse } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge'

async function getINRAmount(amount: number, currency: string): Promise<number> {
  if (currency === 'INR') return amount
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${currency}`)
    const data = await res.json()
    const rate: number = data.rates?.INR ?? 1
    return Math.round(amount * rate)
  } catch {
    // Fallback static rates if API fails
    const fallback: Record<string, number> = { USD: 84, EUR: 91, GBP: 107 }
    return Math.round(amount * (fallback[currency] ?? 84))
  }
}

export async function POST(req: NextRequest) {
  const { amount, currency = 'INR' } = await req.json()

  let keyId: string | undefined
  let keySecret: string | undefined

  try {
    const ctx = getRequestContext()
    keyId = (ctx.env as Record<string, string>).RAZORPAY_KEY_ID
    keySecret = (ctx.env as Record<string, string>).RAZORPAY_KEY_SECRET
  } catch {
    keyId = process.env.RAZORPAY_KEY_ID
    keySecret = process.env.RAZORPAY_KEY_SECRET
  }

  if (!keyId || !keySecret) {
    return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 })
  }

  const inrAmount = await getINRAmount(Number(amount), currency)
  const auth = btoa(`${keyId}:${keySecret}`)

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
    body: JSON.stringify({ amount: inrAmount * 100, currency: 'INR', receipt: `rcpt_${Date.now()}` }),
  })

  if (!res.ok) return NextResponse.json({ error: await res.json() }, { status: 500 })

  const order = await res.json()
  return NextResponse.json({ orderId: order.id, amount: order.amount, keyId })
}
