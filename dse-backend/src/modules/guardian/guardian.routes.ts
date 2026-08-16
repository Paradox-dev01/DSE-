import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth';
import { getMyChildren, getDashboard, getSubjects, getHomeworkList, getResults, getMaterials, getSchoolAuthorities } from './guardian.controller';
const router = Router();

router.use(requireAuth, requireRole('guardian'));

router.get('/children', getMyChildren);
router.get('/children/:childId/dashboard', getDashboard);

router.get('/children/:childId/subjects', getSubjects);
router.get('/children/:childId/homework', getHomeworkList);
router.get('/children/:childId/results', getResults);
router.get('/children/:childId/materials', getMaterials);
router.get('/authorities', getSchoolAuthorities);

export default router;