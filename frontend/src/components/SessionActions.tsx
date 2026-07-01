import { useState } from 'react'
import type { Session } from '../types'
import { validate, revoke, audit } from '../services/api'

interface Props {
    session: Session
    onRevoke: () => void
}

export default function SessionActions({ session, onRevoke }: Props) {
    const [message, setMessage] = useState('')
    const [inputToken, setInputToken] = useState('')

    const handleValidate = async () => {
        try {
            await validate(session.token, inputToken)
            setMessage('Token válido')
        } catch (err: any) {
            setMessage(err.response?.data?.message ?? 'Erro inesperado.')
        }
    }

    const handleRevoke = async () => {
        try {
            const res = await revoke(session.token)
            setMessage(res.data.message ?? 'Sessão revogada com sucesso.')
            onRevoke()
        } catch (err: any) {
            setMessage(err.response?.data?.message ?? 'Erro inesperado.')
        }
    }

    const handleAudit = async () => {
        try {
            const res = await audit(session.token)
            setMessage(JSON.stringify(res.data.logs, null, 2))
        } catch (err: any) {
            setMessage(err.response?.data?.message ?? 'Erro inesperado.')
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '30rem' }}>
            <h2>Ações da Sessão</h2>
            <input
                type="text"
                placeholder="Token para validação"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
            />
            <button onClick={handleValidate}>Validar Sessão</button>
            <button onClick={handleRevoke}>Revogar Sessão</button>
            <button onClick={handleAudit}>Auditar</button>
            {message && <pre>{message}</pre>}
        </div>
    )
}