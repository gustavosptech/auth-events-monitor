import { useState, useEffect } from 'react'
import { socket } from './socket'
import type { Session, AuthEvent } from './types'
import LoginForm from './components/LoginForm'
import SessionInfo from './components/SessionInfo'
import SessionActions from './components/SessionActions'
import EventPanel from './components/EventPanel'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [events, setEvents] = useState<AuthEvent[]>([])

  useEffect(() => {
    socket.on('auth_event', (event: AuthEvent) => {
      setEvents(prev => [event, ...prev])
    })

    return () => { socket.off('auth_event') }
  }, [])

  return (
    <div style={{ padding: '2rem', 
                  maxWidth: '80rem', 
                  margin: '0 auto', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center' }}>
      <h1>Auth Events Monitor</h1>

      {!session 
        ? <LoginForm onLogin={setSession} />
        : (
          <>
            <SessionInfo session={session!} />
            <SessionActions session={session!} onRevoke={() => setSession(null)} />
          </>
        ) 
      }

      <EventPanel events={events} />
    </div>
  )
}

export default App
