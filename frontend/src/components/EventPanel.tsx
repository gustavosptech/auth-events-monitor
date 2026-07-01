import type { AuthEvent } from '../types'

interface Props {
    events: AuthEvent[]
}

export default function EventPanel({ events }: Props) {
    return (
        <div>
            <h2>Eventos em tempo real</h2>
            {events.length === 0
                ? <p>Nenhum evento recebido ainda.</p>
                : events.map((event, index) => (
                    <p key={index}>
                        - {event.type} - {event.email ?? 'desconhecido'} - {new Date(event.timestamp).toLocaleString()}
                    </p>
                ))
            }
        </div>
    )
}