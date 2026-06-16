# Genzopia Website

A minimal Next.js TypeScript website for Genzopia gaming platform with Android App deeplink integration.

## Setup

1. Install dependencies:
```bash
cd genzopia-website
npm install
```

2. Run development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Deeplink Configuration

The Android App Links assetlinks.json file is located at:
`public/.well-known/assetlinks.json`

When deployed to www.genzopia.com, it will be automatically accessible at:
`https://www.genzopia.com/.well-known/assetlinks.json`

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add custom domain: www.genzopia.com
4. Deploy

The assetlinks.json will automatically be served at the correct path.

### Deploy to Other Platforms

Make sure the hosting platform serves static files from the `public` folder and that:
- `https://www.genzopia.com/.well-known/assetlinks.json` is publicly accessible
- Content-Type header is set to `application/json`

## Routes

- `/` - Home page (Hello World)
- `/{gameId}` - Dynamic game pages (e.g., /game123)

When a user visits www.genzopia.com/game123 on Android with the app installed, it will open the app instead of the website.
