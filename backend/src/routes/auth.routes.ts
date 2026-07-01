import { Router } from 'express'
import { login, validate, revoke } from '../controllers/auth.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.post('/login', login)
router.post('/validate', authMiddleware, validate)
router.post('/revoke', authMiddleware, revoke)

export default router