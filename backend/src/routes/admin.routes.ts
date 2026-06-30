import { Router } from 'express'
import { audit } from '../controllers/admin.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = Router()

router.get('/audit', authMiddleware, audit)

export default router