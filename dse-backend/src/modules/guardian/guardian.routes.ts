import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth'; // adjust path to your actual middleware location
import { getMyChildren } from './guardian.controller';

const router = Router();

router.use(requireAuth, requireRole('guardian'));

router.get('/children', getMyChildren);

export default router;