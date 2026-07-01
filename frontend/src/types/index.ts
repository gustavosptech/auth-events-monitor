export interface Session {
    token: string
    email: string
    role: string
}

export interface AuthEvent {
    type: string
    email?: string
    timestamp: string
}