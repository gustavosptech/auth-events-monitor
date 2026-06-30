import { Response } from 'express'
import { authEvents, EVENT_TYPES } from '../events/eventEmitter'
import { AuthRequest } from '../middlewares/auth.middleware'

export const audit = async (req: AuthRequest, res: Response) => {

    if (req.user?.role !== 'admin') {
        authEvents.emit(EVENT_TYPES.FORBIDDEN_ACCESS_ATTEMPT, { email: req.user?.email })
        return res.status(403).json({ message: 'Acesso negado' })
    }

    return res.json({
        logs: [
        { event: 'USER_LOGGED_IN', email: 'usuario@55pbx.com', timestamp: new Date() },
        { event: 'SESSION_VALIDATED', email: 'usuario@55pbx.com', timestamp: new Date() },
        { event: 'SESSION_REVOKED', email: 'usuario@55pbx.com', timestamp: new Date() },
        { event: 'UNAUTHORIZED_ACCESS_ATTEMPT', email: 'usuario@55pbx.com', timestamp: new Date() },
        { event: 'FORBIDDEN_ACCESS_ATTEMPT', email: 'usuario@55pbx.com', timestamp: new Date() },
        { event: 'FAILED_LOGIN_ATTEMPT', email: 'usuario@55pbx.com', timestamp: new Date() }
        ]
    })
}