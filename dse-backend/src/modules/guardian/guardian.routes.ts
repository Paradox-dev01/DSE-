import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth';
import { getMyChildren, getDashboard } from './guardian.controller';

const router = Router();

router.use(requireAuth, requireRole('guardian'));

router.get('/children', getMyChildren);
router.get('/children/:childId/dashboard', getDashboard);

export default router;