import { useState } from "react";
import type { Session } from "../types";
import { login } from "../services/api"

interface Props {
    onLogin: (session: Session) => void;
}

export default function LoginForm({ onLogin }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        try {
            setError('')
            const res = await login(email, password)
            onLogin({ token: res.data.token, email: res.data.email, role: res.data.role })
        }catch {
            setError('Credenciais inválidas')
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '20rem' }}>
            <h2>Login</h2>
            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}