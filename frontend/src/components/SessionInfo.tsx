import type { Session } from '../types'

interface Props {
    session: Session
}

export default function SessionInfo({ session }: Props) {
    return (
        <div style={{ width: '30rem' }}>
            <h2>Sessão atual</h2>
            <p><strong>Email:</strong> {session.email}</p>
            <p><strong>Role:</strong> {session.role}</p>
            <p style={{ wordBreak: 'break-all' }}>
                <strong>Token:</strong> {session.token}
            </p>
        </div>
    )
}