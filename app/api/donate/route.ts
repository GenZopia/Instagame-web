import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { amount } = await req.json()

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 })
  }

  const auth = btoa(`${keyId}:${keySecret}`)

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
    body: JSON.stringify({ amount: amount * 100, currency: 'INR', receipt: `rcpt_${Date.now()}` }),
  })

  if (!res.ok) return NextResponse.json({ error: await res.json() }, { status: 500 })

  const order = await res.json()
  return NextResponse.json({ orderId: order.id, amount: order.amount, keyId })
}
