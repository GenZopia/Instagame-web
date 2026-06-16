interface GamePageProps {
  params: {
    gameId: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      gap: '1rem'
    }}>
      <h1>Game: {params.gameId}</h1>
      <p>This page will redirect to the app if installed</p>
    </main>
  )
}
