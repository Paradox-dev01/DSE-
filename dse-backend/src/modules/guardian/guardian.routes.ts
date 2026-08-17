import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/auth';
import { getMyChildren, getDashboard, getSubjects, getHomeworkList, getResults, getMaterials, getSchoolAuthorities, getAttendanceList, getFeesList, getNoticesList, getMessagesList } from './guardian.controller';
const router = Router();

router.use(requireAuth, requireRole('guardian'));

router.get('/children', getMyChildren);
router.get('/children/:childId/dashboard', getDashboard);

router.get('/children/:childId/subjects', getSubjects);
router.get('/children/:childId/homework', getHomeworkList);
router.get('/children/:childId/results', getResults);
router.get('/children/:childId/materials', getMaterials);
router.get('/authorities', getSchoolAuthorities);

router.get('/children/:childId/attendance', requireAuth, requireRole('guardian'), getAttendanceList);
router.get('/children/:childId/fees', requireAuth, requireRole('guardian'), getFeesList);

router.get('/notices', requireAuth, requireRole('guardian'), getNoticesList);
router.get('/messages', requireAuth, requireRole('guardian'), getMessagesList);

export default router;