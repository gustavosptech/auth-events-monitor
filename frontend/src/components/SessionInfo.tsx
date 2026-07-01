import type { Session } from '../types'

interface Props {
    session: Session
}

export default function SessionInfo({ session }: Props) {
    return (
        <div>
            <h2>Sessão atual</h2>
            <p><strong>Email:</strong> {session.email}</p>
            <p><strong>Role:</strong> {session.role}</p>
        </div>
    )
}