'use client'
import { useEffect } from 'react'
import Image from 'next/image'

const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.genzopia.instagame'

export default function GameDeeplinkClient({ gameId }: { gameId: string }) {
  useEffect(() => {
    // Try to open app via deep link
    const appLink = `genzopia://games/${gameId}`
    window.location.href = appLink

    // If app not installed, redirect to Play Store after 2s
    const timer = setTimeout(() => {
      window.location.href = PLAY_STORE
    }, 2000)

    // Cleanup if app opens (page becomes hidden)
    const handleVisibilityChange = () => {
      if (document.hidden) clearTimeout(timer)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [gameId])

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 24, textAlign: 'center',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)',
    }}>
      {/* Spinner ring */}
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        border: '4px solid #ff6a0033',
        borderTop: '4px solid #ff6a00',
        animation: 'spin 1s linear infinite',
        marginBottom: 32,
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <Image src="/logo.png" alt="Genzopia" width={64} height={64} style={{ borderRadius: 14, marginBottom: 20, boxShadow: '0 0 30px #ff6a0066' }} />
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12 }}>
        Opening <span style={{ background: 'linear-gradient(135deg,#ff6a00,#ffd700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Genzopia</span>...
      </h1>
      <p style={{ color: '#ffffff88', fontSize: '0.95rem', marginBottom: 32, maxWidth: 320 }}>
        If the app doesn&apos;t open, we&apos;ll take you to the Play Store to install it.
      </p>
      <a
        href={PLAY_STORE}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '14px 28px',
          background: 'linear-gradient(135deg, #ff6a00, #ff3c00)',
          borderRadius: 10, color: '#fff', fontWeight: 700,
          textDecoration: 'none', fontSize: '1rem',
          boxShadow: '0 0 24px #ff6a0055',
        }}
      >
        ↗ Get on Play Store
      </a>
    </main>
  )
}
