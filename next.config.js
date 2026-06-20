/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const { setupDevPlatform } = (() => {
  try { return require('@cloudflare/next-on-pages/next-dev') } catch { return {} }
})()

if (process.env.NODE_ENV === 'development' && setupDevPlatform) {
  setupDevPlatform()
}

module.exports = nextConfig
