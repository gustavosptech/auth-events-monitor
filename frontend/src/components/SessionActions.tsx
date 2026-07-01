import { useState } from 'react'
import type { Session } from '../types'
import { validate, revoke, audit } from '../services/api'

interface Props {
    session: Session
    onRevoke: () => void
}

export default function SessionActions({ session, onRevoke }: Props) {
    const [message, setMessage] = useState('')

    const handleValidate = async () => {
        try {
            await validate(session.token)
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
            setMessage(`Auditoria: ${res.data.logs.length} logs retornados.`)
        } catch (err: any) {
            setMessage(err.response?.data?.message ?? 'Erro inesperado.')
        }
    }

    return (
        <div>
            <h2>Ações da Sessão</h2>
            <button onClick={handleValidate}>Validar Sessão</button>
            <button onClick={handleRevoke}>Revogar Sessão</button>
            <button onClick={handleAudit}>Auditar</button>
            {message && <p>{message}</p>}
        </div>
    )
}