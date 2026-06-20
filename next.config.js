/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/.well-known/assetlinks.json',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ]
  },
}

const { setupDevPlatform } = (() => {
  try { return require('@cloudflare/next-on-pages/next-dev') } catch { return {} }
})()

if (process.env.NODE_ENV === 'development' && setupDevPlatform) {
  setupDevPlatform()
}

module.exports = nextConfig
