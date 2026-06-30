import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { authEvents, EVENT_TYPES } from '../events/eventEmitter'
import { Session } from '../models/Session'

export interface AuthRequest extends Request {
    user?: {
        id: string
        email: string
        role: string
    }
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        authEvents.emit(EVENT_TYPES.UNAUTHORIZED_ACCESS_ATTEMPT, { path: req.path })
        return res.status(401).json({ message: 'Token não fornecido' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, email: string, role: string}

        const session = await Session.findOne({ token, active: true })

        if(!session) {
            authEvents.emit(EVENT_TYPES.UNAUTHORIZED_ACCESS_ATTEMPT, { email: decoded.email })
            return res.status(401).json({ message: 'Sessão inválida ou expirada' })
        }

        req.user = decoded
        next()
    } catch {
        authEvents.emit(EVENT_TYPES.UNAUTHORIZED_ACCESS_ATTEMPT, { path: req.path })
        return res.status(401).json({ message: 'Token inválido' })
    }
}