import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { Session } from '../models/Session'
import { authEvents, EVENT_TYPES } from '../events/eventEmitter'
import { AuthRequest } from '../middlewares/auth.middleware'

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email, password })

    if(!user) {
        authEvents.emit(EVENT_TYPES.FAILED_LOGIN_ATTEMPT, { email })
        return res.status(401).json({ message: 'Credenciais inválidas' })
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    )

    await Session.create({ token, userId: user._id })

    authEvents.emit(EVENT_TYPES.USER_LOGGED_IN, { email: user.email, role: user.role })

    return res.json({ token, email: user.email, role: user.role })
}

export const validate = async (req: AuthRequest, res: Response) => {
    const { token } = req.body
    
    const session = await Session.findOne({ token, active: true })

    if(!session) {
        return res.status(401).json({ valid: false, message: 'Sessão inválida ou expirada' })
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET as string)
        authEvents.emit(EVENT_TYPES.SESSION_VALIDATED, { token, email: req.user?.email })
        return res.json({ valid: true })
    } catch {
        return res.status(401).json({ valid: false, message: 'Token inválido' })
    }
}

export const revoke = async (req: AuthRequest, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1]

    await Session.findOneAndUpdate({ token }, { active: false })
    
    authEvents.emit(EVENT_TYPES.SESSION_REVOKED, { token, email: req.user?.email })

    return res.json({ message: 'Sessão revogada com sucesso'})
}
