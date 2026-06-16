interface GamePageProps {
  params: Promise<{
    gameId: string
  }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params
  
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
      <h1>Game: {gameId}</h1>
      <p>This page will redirect to the app if installed</p>
    </main>
  )
}
