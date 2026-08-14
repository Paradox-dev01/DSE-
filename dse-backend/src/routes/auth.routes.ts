import { Router } from 'express';
import { login, refresh, changePassword, me } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/refresh', refresh);
router.post('/change-password', requireAuth, changePassword);
router.get('/me', requireAuth, me);

export default router;