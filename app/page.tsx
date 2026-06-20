import Image from 'next/image'
import type { Metadata } from 'next'
import DonateButton from './components/DonateButton'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.genzopia.com' },
}

export default function Home() {
  return (
    <main>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: '#0a0a0fdd', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #ff6a0022',
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Image src="/logo.png" alt="Genzopia Logo" width={40} height={40} style={{ borderRadius: 8 }} />
          <span style={{ fontSize: '1.3rem', fontWeight: 800 }} className="grad">Genzopia</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a href="#about" style={{ color: '#ffffff99', textDecoration: 'none', fontSize: '0.9rem' }}>About</a>
          <a href="#products" style={{ color: '#ffffff99', textDecoration: 'none', fontSize: '0.9rem' }}>Products</a>
          <a href="#donate" className="btn-neon" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Support Us ❤️</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" style={{ padding: '100px 20px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* BG gradient orb */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, #ff6a0022 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <Image src="/logo.png" alt="Genzopia" width={90} height={90} style={{ borderRadius: 18, boxShadow: '0 0 40px #ff6a0066' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
            The Gaming Platform<br />
            <span className="grad">Built for Everyone.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#ffffffcc', maxWidth: 680, margin: '0 auto 16px' }}>
            Genzopia is like Poki — but built by passionate indie developers for the next generation.
            Play <strong style={{ color: '#ff6a00' }}>100+ WebGL games</strong> instantly in your browser.
            Arcade, Racing, Puzzle, Multiplayer — no download, no waiting.
          </p>
          <p style={{ color: '#ffffff66', fontSize: '0.95rem', marginBottom: 36 }}>
            🎮 Free to play &nbsp;·&nbsp; 🏆 Leaderboards &nbsp;·&nbsp; 🕹️ Reel-style discovery &nbsp;·&nbsp; 💰 Developers earn
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://play.google.com/store/apps/details?id=com.genzopia.Instagame"
              target="_blank" rel="noopener"
              className="btn-neon"
            >
              ▶ Play on Android
            </a>
            <a href="#donate" className="btn-outline">Support the Dream ❤️</a>
          </div>
        </div>
      </section>

      {/* ── BANNER IMAGE ── */}
      <section style={{ padding: '0 20px 60px' }}>
        <div className="container">
          <div className="card" style={{ overflow: 'hidden', borderRadius: 20 }}>
            <Image
              src="/genzopia-banner.png"
              alt="Genzopia – Play Unlimited Games. Arcade, Racing, Puzzle, Multiplayer"
              width={1200} height={630}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '20px 20px 80px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 48 }}>
            Why <span className="grad">Genzopia</span>?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              { icon: '⚡', title: 'Instant Play', desc: 'No downloads. Open browser, pick a game, play now.' },
              { icon: '🎮', title: '100+ Games', desc: 'Arcade, Racing, Puzzle, Multiplayer — growing every week.' },
              { icon: '📱', title: 'Reel Discovery', desc: 'Scroll through games like a social feed. Find your next obsession in seconds.' },
              { icon: '💸', title: 'Dev Earnings', desc: 'Publish your WebGL game & earn. We believe creators deserve to get paid.' },
            ].map(f => (
              <div key={f.title} className="card" style={{ padding: 28 }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8, color: '#ff8c00' }}>{f.title}</h3>
                <p style={{ color: '#ffffffaa', fontSize: '0.95rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GAMES SCREENSHOT ── */}
      <section style={{ padding: '0 20px 80px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', fontWeight: 800, marginBottom: 16 }}>
              <span className="grad">One App.</span> Endless Fun.
            </h2>
            <p style={{ color: '#ffffffbb', lineHeight: 1.8, marginBottom: 20 }}>
              130+ games and counting. Action, Puzzle, Adventure — all in your pocket.
              Lightweight. No buffering. 100% trusted.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['⚡ Instant Play – No Download', '📱 Play Anytime, Anywhere', '🎮 130+ Games & More', '🛡️ Safe & Secure – 100% Trusted'].map(i => (
                <li key={i} style={{ color: '#ffffffcc', fontSize: '0.95rem', display: 'flex', gap: 8 }}>{i}</li>
              ))}
            </ul>
          </div>
          <div className="card" style={{ borderRadius: 20 }}>
            <Image
              src="/genzopia-games.png"
              alt="Play 100+ Games on Genzopia – All in One App"
              width={600} height={600}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* ── APP SCREENSHOT ── */}
      <section style={{ padding: '0 20px 80px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, alignItems: 'center' }}>
          <div className="card" style={{ borderRadius: 20, maxWidth: 340, margin: '0 auto' }}>
            <Image
              src="/genzopia-app.jpg"
              alt="Genzopia App – Browse and Play Games"
              width={400} height={700}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', fontWeight: 800, marginBottom: 16 }}>
              Browse Games Like a <span className="grad">Social Feed</span>
            </h2>
            <p style={{ color: '#ffffffbb', lineHeight: 1.8, marginBottom: 24 }}>
              Scroll through games the way you scroll through reels.
              Follow creators, discover new titles, and jump into action instantly.
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.genzopia.Instagame"
              target="_blank" rel="noopener"
              className="btn-neon"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.83 1-.83 1.37-.37l13 8.5c.34.22.34.72 0 .94l-13 8.5C3 21.33 3 21.33 3 20.5z"/></svg>
              Get it on Google Play
            </a>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={{ padding: '60px 20px 80px', background: '#0d0d15' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: 12 }}>
            Our <span className="grad">Products</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#ffffff66', marginBottom: 48, fontSize: '0.95rem' }}>
            Beyond games — we build AI tools too.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>

            {/* Genzopia App */}
            <div className="card" style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <Image src="/logo.png" alt="Genzopia" width={52} height={52} style={{ borderRadius: 12 }} />
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem' }}>Genzopia Games</h3>
                  <span style={{ fontSize: '0.8rem', color: '#ff6a00', background: '#ff6a0022', padding: '2px 10px', borderRadius: 20 }}>🎮 Gaming Platform</span>
                </div>
              </div>
              <p style={{ color: '#ffffffaa', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: 20 }}>
                100+ free WebGL games in one app. Arcade, Racing, Puzzle, Multiplayer — play instantly, no download needed. Reel-style discovery, leaderboards, and creator earnings.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {['Arcade', 'Racing', 'Puzzle', 'Multiplayer', 'Free'].map(t => (
                  <span key={t} style={{ fontSize: '0.78rem', padding: '4px 12px', borderRadius: 20, border: '1px solid #ff6a0044', color: '#ff8c00' }}>{t}</span>
                ))}
              </div>
              <a href="https://play.google.com/store/apps/details?id=com.genzopia.Instagame" target="_blank" rel="noopener" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                ▶ Play Store
              </a>
            </div>

            {/* Offline AI */}
            <div className="card" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 12, right: 12,
                background: 'linear-gradient(135deg, #ff6a00, #ffd700)',
                color: '#000', fontSize: '0.7rem', fontWeight: 800,
                padding: '3px 10px', borderRadius: 20,
              }}>NEW</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: 'linear-gradient(135deg, #ff6a00, #ff3c00)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.6rem',
                }}>🤖</div>
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem' }}>Offline AI</h3>
                  <span style={{ fontSize: '0.8rem', color: '#ffd700', background: '#ffd70022', padding: '2px 10px', borderRadius: 20 }}>🧠 AI Assistant</span>
                </div>
              </div>
              <p style={{ color: '#ffffffaa', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: 20 }}>
                A powerful AI assistant that works <strong style={{ color: '#ffd700' }}>without internet</strong>.
                Ask questions, get help with tasks, and use AI anywhere — even in airplane mode.
                Lightweight, private, and runs entirely on your device.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                {['No Internet', 'Private', 'Lightweight', 'On-Device AI'].map(t => (
                  <span key={t} style={{ fontSize: '0.78rem', padding: '4px 12px', borderRadius: 20, border: '1px solid #ffd70044', color: '#ffd700' }}>{t}</span>
                ))}
              </div>
              <a
                href="https://play.google.com/store/apps/details?id=com.genzopia.offlineai&hl=en_IN"
                target="_blank" rel="noopener"
                className="btn-neon"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                ↗ Download Offline AI
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── DONATE ── */}
      <section id="donate" style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #0d0d15 0%, #0a0a0f 100%)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          {/* Dev badge */}
          <div style={{
            display: 'inline-block',
            background: '#ff6a0022', border: '1px solid #ff6a0055',
            borderRadius: 30, padding: '6px 20px', marginBottom: 28,
            fontSize: '0.85rem', color: '#ff8c00', fontWeight: 600,
          }}>
            🚧 Platform Under Development
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, lineHeight: 1.15, marginBottom: 24 }}>
            We&apos;re Just Getting Started.<br />
            <span className="grad">Will You Believe in Us?</span>
          </h2>

          <p style={{ fontSize: '1.1rem', color: '#ffffffcc', lineHeight: 1.9, marginBottom: 16 }}>
            Genzopia started as a dream — a world where <strong style={{ color: '#ff8c00' }}>any developer</strong> can publish a game,
            and <strong style={{ color: '#ff8c00' }}>any player</strong> can find joy without paywalls.
          </p>
          <p style={{ fontSize: '1.05rem', color: '#ffffffaa', lineHeight: 1.9, marginBottom: 16 }}>
            We&apos;re a small team building something big. The platform is live, games are growing,
            and thousands of players are already having fun. But <strong style={{ color: '#ffd700' }}>we need your support</strong> to
            scale the servers, improve the engine, and pay the developers who are building this with love.
          </p>
          <p style={{ fontSize: '1.05rem', color: '#ffffffaa', lineHeight: 1.9, marginBottom: 40 }}>
            Every rupee you donate goes directly into making Genzopia better.
            Not into salaries. Not into offices. <strong style={{ color: '#ff6a00' }}>Into the product. Into the dream.</strong>
          </p>

          <DonateButton />

          {/* Contact for investors */}
          <div style={{
            marginTop: 48, padding: 28,
            background: '#12121a', border: '1px solid #ff6a0033',
            borderRadius: 16,
          }}>
            <p style={{ fontWeight: 700, fontSize: '1rem', color: '#ff8c00', marginBottom: 12 }}>
              💼 For Investors & Partnerships
            </p>
            <p style={{ color: '#ffffffaa', fontSize: '0.95rem', lineHeight: 1.7 }}>
              If you see the potential in what we&apos;re building, we&apos;d love to talk.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 }}>
              <a href="mailto:genzopia@gmail.com" className="btn-outline" style={{ fontSize: '0.9rem' }}>
                ✉️ genzopia@gmail.com
              </a>
              <a href="tel:+918767082265" className="btn-outline" style={{ fontSize: '0.9rem' }}>
                📞 +91 87670 82265
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid #ff6a0022',
        padding: '40px 20px',
        textAlign: 'center',
        color: '#ffffff44',
        fontSize: '0.85rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Image src="/logo.png" alt="Genzopia" width={28} height={28} style={{ borderRadius: 6 }} />
          <span style={{ fontWeight: 700, color: '#ffffff88' }}>Genzopia</span>
        </div>
        <p style={{ marginBottom: 8 }}>Free online gaming platform · 100+ games · WebGL · Android</p>
        <p>
          <a href="mailto:genzopia@gmail.com" style={{ color: '#ff6a00', textDecoration: 'none' }}>genzopia@gmail.com</a>
          &nbsp;·&nbsp;
          <a href="tel:+918767082265" style={{ color: '#ff6a00', textDecoration: 'none' }}>+91 87670 82265</a>
          &nbsp;·&nbsp;
          <a href="https://play.google.com/store/apps/details?id=com.genzopia.Instagame" target="_blank" rel="noopener" style={{ color: '#ff6a00', textDecoration: 'none' }}>Play Store ↗</a>
        </p>
        <p style={{ marginTop: 16 }}>© {new Date().getFullYear()} Genzopia. All rights reserved.</p>
      </footer>

      {/* ── JSON-LD STRUCTURED DATA ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Genzopia',
          url: 'https://www.genzopia.com',
          description: 'Free online gaming platform with 100+ WebGL games. Arcade, Racing, Puzzle, Multiplayer – no download needed.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.genzopia.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }) }}
      />
    </main>
  )
}
