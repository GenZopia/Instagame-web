'use client'
import { useState } from 'react'

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void }
  }
}

const CURRENCIES: Record<string, { symbol: string; amounts: number[] }> = {
  USD: { symbol: '$', amounts: [1, 5, 10, 25] },
  INR: { symbol: '₹', amounts: [99, 299, 499, 999] },
  EUR: { symbol: '€', amounts: [1, 5, 10, 25] },
  GBP: { symbol: '£', amounts: [1, 5, 10, 20] },
}

export default function DonateButton() {
  const [loading, setLoading] = useState(false)
  const [custom, setCustom] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [selected, setSelected] = useState(5)

  const { symbol, amounts } = CURRENCIES[currency]

  function handleCurrencyChange(c: string) {
    setCurrency(c)
    setSelected(CURRENCIES[c].amounts[1])
    setCustom('')
  }

  async function handleDonate() {
    const amount = Number(custom) || selected
    if (!amount || amount < 1) return alert('Please select or enter an amount')

    setLoading(true)
    try {
      const res = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency }),
      })
      const data = await res.json()
      if (data.error) throw new Error(JSON.stringify(data.error))

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: 'INR',
        order_id: data.orderId,
        name: 'Genzopia',
        description: `Support Genzopia 🎮 (${symbol}${amount} ${currency})`,
        image: '/logo.png',
        theme: { color: '#ff6a00' },
        handler: () => alert('🎉 Thank you for supporting Genzopia! You\'re a legend.'),
        prefill: { contact: '+918767082265', email: 'genzopia@gmail.com' },
      })
      rzp.open()
    } catch (e) {
      alert('Payment failed. Please try again or contact genzopia@gmail.com')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>

      {/* Currency selector */}
      <div style={{ display: 'flex', gap: 8 }}>
        {Object.keys(CURRENCIES).map(c => (
          <button key={c} onClick={() => handleCurrencyChange(c)} style={{
            padding: '7px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
            border: currency === c ? '2px solid #ff6a00' : '2px solid #ff6a0033',
            background: currency === c ? '#ff6a0022' : 'transparent',
            color: currency === c ? '#ff8c00' : '#ffffff88',
            transition: 'all 0.2s',
          }}>{c}</button>
        ))}
      </div>

      {/* Amount pills */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {amounts.map(a => (
          <button key={a} onClick={() => { setSelected(a); setCustom('') }} style={{
            padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontSize: '1rem', fontWeight: 600,
            border: selected === a && !custom ? '2px solid #ff6a00' : '2px solid #ff6a0044',
            background: selected === a && !custom ? '#ff6a0022' : 'transparent',
            color: '#fff', transition: 'all 0.2s',
          }}>{symbol}{a}</button>
        ))}
      </div>

      {/* Custom amount */}
      <input
        type="number"
        placeholder={`Custom amount (${symbol})`}
        value={custom}
        onChange={e => setCustom(e.target.value)}
        style={{
          padding: '12px 20px', borderRadius: 8, border: '2px solid #ff6a0055',
          background: '#12121a', color: '#fff', fontSize: '1rem',
          textAlign: 'center', width: '220px', outline: 'none',
        }}
      />

      {/* Donate button */}
      <button className="btn-neon pulse" onClick={handleDonate} disabled={loading}
        style={{ fontSize: '1.1rem', padding: '16px 48px', opacity: loading ? 0.7 : 1 }}>
        {loading ? '⏳ Processing...' : '❤️ Donate & Support Genzopia'}
      </button>

      <p style={{ fontSize: '0.8rem', color: '#ffffff66', textAlign: 'center' }}>
        Charged in INR · Powered by Razorpay · UPI, Cards, Net Banking accepted
      </p>
    </div>
  )
}
