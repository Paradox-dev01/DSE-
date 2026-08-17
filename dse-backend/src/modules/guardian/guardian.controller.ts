import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DAY_NAMES = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

export async function getMyChildren(req: Request, res: Response) {
  try {
    const guardianId = req.user!.id;

    const students = await prisma.students.findMany({
      where: { guardian_id: guardianId },
      include: { classes: true },
      orderBy: { full_name: 'asc' },
    });

    const children = students.map((s) => ({
      id: s.id,
      name: s.full_name,
      class: s.classes ? `Grade ${s.classes.grade}-${s.classes.section}` : '',
      rollNumber: String(s.roll_number),
      photo: s.avatar_url ?? '',
      studentId: s.student_code ?? '',
    }));

    res.json({ children });
  } catch (err) {
    console.error('getMyChildren error:', err);
    res.status(500).json({ error: 'Failed to fetch children' });
  }
}

async function verifyChildOwnership(guardianId: string, childId: string) {
  return prisma.students.findFirst({
    where: { id: childId, guardian_id: guardianId },
    include: { classes: true },
  });
}

export async function getDashboard(req: Request, res: Response) {
  try {
    const guardianId = req.user!.id;
    const childId = String(req.params.childId);

    const student = await verifyChildOwnership(guardianId, childId);
    if (!student) return res.status(404).json({ error: 'Child not found' });

    const classId = student.class_id;

    const classSubjects = await prisma.class_subjects.findMany({
      where: { class_id: classId },
      include: { subjects: true },
    });
    const classSubjectIds = classSubjects.map((cs) => cs.id);
    const subjectNameByCS: Record<string, string> = {};
    classSubjects.forEach((cs) => { subjectNameByCS[cs.id] = cs.subjects?.name ?? ''; });

    // --- Attendance ---
    const attendanceRecords = await prisma.attendance_records.findMany({
      where: { student_id: childId },
      include: { attendance_sessions: true },
      orderBy: { attendance_sessions: { session_date: 'desc' } },
      take: 30,
    });
    const ATTENDANCE_STATUS_MAP: Record<string, 'present' | 'absent' | 'late'> = {
      P: 'present', A: 'absent', L: 'late', E: 'absent', // E = excused, closest frontend match is absent
    };
    const attendance = attendanceRecords.map((r) => ({
      date: r.attendance_sessions.session_date.toISOString().split('T')[0],
      status: ATTENDANCE_STATUS_MAP[r.status] ?? 'absent',
      reason: r.remark ?? undefined,
    }));

    // --- Homework ---
    const homeworks = await prisma.homeworks.findMany({
      where: { class_subject_id: { in: classSubjectIds } },
      orderBy: { due_date: 'asc' },
    });
    const submissions = await prisma.homework_submissions.findMany({
      where: { student_id: childId, homework_id: { in: homeworks.map((h) => h.id) } },
    });
    const submissionByHw: Record<string, typeof submissions[number]> = {};
    submissions.forEach((s) => { submissionByHw[s.homework_id] = s; });

    const homework = homeworks.map((h) => {
      const sub = submissionByHw[h.id];
      const status = sub ? ((sub.status as 'pending' | 'submitted' | 'late') ?? 'submitted') : 'pending';
      return {
        id: h.id,
        subject: subjectNameByCS[h.class_subject_id] ?? '',
        title: h.title,
        description: h.description ?? '',
        dueDate: h.due_date.toISOString().split('T')[0],
        status,
      };
    });

    // --- Exams ---
    const examsRaw = await prisma.exams.findMany({
      where: { class_subject_id: { in: classSubjectIds }, exam_date: { gte: new Date() } },
      orderBy: { exam_date: 'asc' },
      take: 5,
    });
    const exams = examsRaw.map((e) => ({
      id: e.id,
      subject: subjectNameByCS[e.class_subject_id] ?? '',
      date: e.exam_date.toISOString().split('T')[0],
      time: e.start_time ? e.start_time.toISOString().slice(11, 16) : '',
      syllabus: e.term ?? '',
    }));

    // --- Fees ---
    const feesRaw = await prisma.fees.findMany({
      where: { student_id: childId },
      include: { fee_categories: true, payments: true },
      orderBy: { due_date: 'asc' },
    });
    const fees = feesRaw.map((f) => {
      const isPastDue = f.due_date ? f.due_date < new Date() : false;
      let status: 'paid' | 'pending' | 'overdue' = 'pending';
      if (f.status === 'paid') status = 'paid';
      else if (f.status === 'unpaid' || f.status === 'partial') status = isPastDue ? 'overdue' : 'pending';

      return {
        id: f.id,
        type: f.fee_categories?.name ?? '',
        amount: Number(f.amount),
        dueDate: f.due_date ? f.due_date.toISOString().split('T')[0] : '',
        status,
        paidAmount: f.payments.reduce((sum: number, p: { amount_paid: any }) => sum + Number(p.amount_paid), 0) || undefined,
      };
    });

    // --- Notices (personal notifications) ---
    const notificationsRaw = await prisma.notifications.findMany({
      where: { user_id: guardianId },
      orderBy: { created_at: 'desc' },
      take: 10,
    });
    const NOTICE_CATEGORY_MAP: Record<string, 'academic' | 'event' | 'emergency' | 'general'> = {
      academic: 'academic', announcement: 'general', urgent: 'emergency', system: 'general',
    };
    const notices = notificationsRaw.map((n) => ({
      id: n.id,
      title: n.title,
      content: n.description ?? '',
      date: n.created_at ? n.created_at.toISOString().split('T')[0] : '',
      category: (n.type ? NOTICE_CATEGORY_MAP[n.type] : undefined) ?? 'general',
      isRead: n.is_read ?? false,
      isPinned: false,
    }));

    // --- Messages (guardian's own inbox, independent of selected child) ---
    const messagesRaw = await prisma.messages.findMany({
      where: { receiver_id: guardianId },
      orderBy: { created_at: 'desc' },
      take: 10,
    });

    const senderIds = [...new Set(messagesRaw.map((m) => m.sender_id).filter((id): id is string => typeof id === 'string'))];
    const senderTeachers = await prisma.teachers.findMany({
      where: { id: { in: senderIds } },
    });
    const senderById = new Map<string, typeof senderTeachers[number]>();
    senderTeachers.forEach((t) => { senderById.set(t.id, t); });

    const messages = messagesRaw.map((m) => {
      const sender = typeof m.sender_id === 'string' ? senderById.get(m.sender_id) : undefined;
      return {
        id: m.id,
        from: sender?.full_name ?? 'Unknown',
        role: 'Teacher',
        content: m.content ?? '',
        timestamp: m.created_at ? m.created_at.toISOString() : '',
        isRead: m.is_read ?? false,
        avatar: '',
      };
    });

    // --- Today's schedule (client picks "next" by local time) ---
    const todayName = DAY_NAMES[new Date().getDay()];
    const schedulesToday = await prisma.class_schedules.findMany({
      where: {
        class_subject_id: { in: classSubjectIds },
        day_of_week: { equals: todayName, mode: 'insensitive' },
      },
      include: { class_subjects: { include: { subjects: true } } },
      orderBy: { start_time: 'asc' },
    });
    const todaySchedule = schedulesToday.map((s) => ({
      subject: s.class_subjects.subjects?.name ?? '',
      startTime: s.start_time.toISOString().slice(11, 16),
      endTime: s.end_time.toISOString().slice(11, 16),
      room: s.room_number ?? '',
    }));

    res.json({ attendance, homework, exams, fees, notices, messages, todaySchedule });
  } catch (err) {
    console.error('getDashboard error:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard' });
  }
}



// ---------- ACADEMICS: SUBJECTS ----------
export async function getSubjects(req: Request, res: Response) {
  try {
    const guardianId = req.user!.id;
    const childId = String(req.params.childId);
    const student = await verifyChildOwnership(guardianId, childId);
    if (!student) return res.status(404).json({ error: 'Child not found' });

    const classSubjects = await prisma.class_subjects.findMany({
      where: { class_id: student.class_id },
      include: { subjects: true, teachers: true },
    });

    const subjects = classSubjects.map((cs) => {
      const teacher = cs.teachers;
      return {
        id: cs.id,
        name: cs.subjects?.name ?? '',
        teacher: teacher?.full_name ?? '',
        email: '', // users.email not linked yet — see note below
        phone: teacher?.phone ?? '',
        avatar: '',
      };
    });

    res.json({ subjects });
  } catch (err) {
    console.error('getSubjects error:', err);
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
}

// ---------- ACADEMICS: HOMEWORK (full list) ----------
export async function getHomeworkList(req: Request, res: Response) {
  try {
    const guardianId = req.user!.id;
    const childId = String(req.params.childId);
    const student = await verifyChildOwnership(guardianId, childId);
    if (!student) return res.status(404).json({ error: 'Child not found' });

    const classSubjects = await prisma.class_subjects.findMany({
      where: { class_id: student.class_id },
      include: { subjects: true },
    });
    const classSubjectIds = classSubjects.map((cs) => cs.id);
    const subjectNameByCS = new Map<string, string>();
    classSubjects.forEach((cs) => { subjectNameByCS.set(cs.id, cs.subjects?.name ?? ''); });

    const homeworks = await prisma.homeworks.findMany({
      where: { class_subject_id: { in: classSubjectIds } },
      orderBy: { due_date: 'desc' },
    });
    const submissions = await prisma.homework_submissions.findMany({
      where: { student_id: childId, homework_id: { in: homeworks.map((h) => h.id) } },
    });
    const submissionByHw = new Map(submissions.map((s) => [s.homework_id, s]));

    const HW_STATUS_MAP: Record<string, 'submitted' | 'late'> = { submitted: 'submitted', late: 'late', graded: 'submitted' };

    const homework = homeworks.map((h) => {
      const sub = submissionByHw.get(h.id);
      const status: 'pending' | 'submitted' | 'late' = sub ? (HW_STATUS_MAP[sub.status ?? ''] ?? 'submitted') : 'pending';
      return {
        id: h.id,
        subject: subjectNameByCS.get(h.class_subject_id) ?? '',
        title: h.title,
        description: h.description ?? '',
        dueDate: h.due_date.toISOString().split('T')[0],
        status,
      };
    });

    res.json({ homework });
  } catch (err) {
    console.error('getHomeworkList error:', err);
    res.status(500).json({ error: 'Failed to fetch homework' });
  }
}

// ---------- ACADEMICS: RESULTS ----------
export async function getResults(req: Request, res: Response) {
  try {
    const guardianId = req.user!.id;
    const childId = String(req.params.childId);
    const student = await verifyChildOwnership(guardianId, childId);
    if (!student) return res.status(404).json({ error: 'Child not found' });

    const resultsRaw = await prisma.results.findMany({
      where: { student_id: childId },
      include: { exams: { include: { class_subjects: { include: { subjects: true } } } } },
      orderBy: { exams: { exam_date: 'desc' } },
    });

    const results = resultsRaw.map((r) => ({
      subject: r.exams?.class_subjects?.subjects?.name ?? '',
      test: r.exams?.title ?? '',
      score: r.marks_obtained,
      totalMarks: r.exams?.total_marks ?? undefined,
      grade: r.grade ?? '',
      date: r.exams?.exam_date ? r.exams.exam_date.toISOString().split('T')[0] : '',
    }));

    res.json({ results });
  } catch (err) {
    console.error('getResults error:', err);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
}

// ---------- ACADEMICS: STUDY MATERIALS ----------
export async function getMaterials(req: Request, res: Response) {
  try {
    const guardianId = req.user!.id;
    const childId = String(req.params.childId);
    const student = await verifyChildOwnership(guardianId, childId);
    if (!student) return res.status(404).json({ error: 'Child not found' });

    const classSubjects = await prisma.class_subjects.findMany({
      where: { class_id: student.class_id },
      include: { subjects: true },
    });
    const classSubjectIds = classSubjects.map((cs) => cs.id);
    const subjectNameByCS = new Map<string, string>();
    classSubjects.forEach((cs) => { subjectNameByCS.set(cs.id, cs.subjects?.name ?? ''); });

    const resources = await prisma.resources.findMany({
      where: { class_subject_id: { in: classSubjectIds }, visibility: { in: ['class', 'public'] } },
      orderBy: { uploaded_at: 'desc' },
    });

    const materials = resources.map((r) => ({
      id: r.id,
      subject: subjectNameByCS.get(r.class_subject_id) ?? '',
      title: r.title,
      type: (r.file_type ?? 'FILE').toUpperCase(),
      date: r.uploaded_at ? r.uploaded_at.toISOString().split('T')[0] : '',
      url: r.file_url ?? '',
    }));

    res.json({ materials });
  } catch (err) {
    console.error('getMaterials error:', err);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
}

// ---------- SCHOOL AUTHORITIES (institution-wide, not child-scoped) ----------
export async function getSchoolAuthorities(req: Request, res: Response) {
  try {
    const [teachers, management, staff] = await Promise.all([
      prisma.teachers.findMany(),
      prisma.management.findMany(),
      prisma.staff.findMany(),
    ]);

    const userIds = [...teachers.map((t) => t.id), ...management.map((m) => m.id)];
    const users = await prisma.users.findMany({ where: { id: { in: userIds } } });
    const userById = new Map(users.map((u) => [u.id, u]));

    const yearsSince = (date: Date | null): string => {
      if (!date) return '';
      const years = Math.floor((Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      return `${years} year${years === 1 ? '' : 's'}`;
    };

    const teacherAuthorities = teachers.map((t: typeof teachers[number]) => {
      const user = userById.get(t.id);
      return {
        id: t.id,
        name: t.full_name,
        position: t.specialization ? `${t.specialization} Teacher` : 'Teacher',
        department: 'Academic Staff',
        avatar: user?.avatar_url ?? '',
        email: user?.email ?? '',
        phone: t.phone ?? '',
        experience: yearsSince(t.joining_date),
        qualifications: t.qualification ?? '',
        office: '',
      };
    });

    const managementAuthorities = management.map((m: typeof management[number]) => {
      const user = userById.get(m.id);
      return {
        id: m.id,
        name: m.full_name,
        position: m.position ?? 'Management',
        department: 'Administration',
        avatar: user?.avatar_url ?? m.avatar_url ?? '',
        email: user?.email ?? '',
        phone: '',
        experience: yearsSince(m.joining_date),
        qualifications: m.qualifications ?? '',
        office: m.office ?? '',
      };
    });

    const staffAuthorities = staff.map((s: typeof staff[number]) => ({
      id: s.id,
      name: s.full_name,
      position: s.designation ?? 'Staff',
      department: s.department ?? 'Support Staff',
      avatar: '',
      email: s.email ?? '',
      phone: s.phone ?? '',
      experience: s.experience_years != null ? `${s.experience_years} years` : '',
      qualifications: '',
      office: '',
    }));

    const authorities = [...teacherAuthorities, ...managementAuthorities, ...staffAuthorities]
      .sort((a, b) => a.name.localeCompare(b.name));

    res.json({ authorities });
  } catch (err) {
    console.error('getSchoolAuthorities error:', err);
    res.status(500).json({ error: 'Failed to fetch school authorities' });
  }
}



// ---------- ATTENDANCE (full history) ----------
export async function getAttendanceList(req: Request, res: Response) {
  try {
    const guardianId = req.user!.id;
    const childId = String(req.params.childId);
    const student = await verifyChildOwnership(guardianId, childId);
    if (!student) return res.status(404).json({ error: 'Child not found' });

    const attendanceRecords = await prisma.attendance_records.findMany({
      where: { student_id: childId },
      include: { attendance_sessions: true },
      orderBy: { attendance_sessions: { session_date: 'asc' } },
    });

    const ATTENDANCE_STATUS_MAP: Record<string, 'present' | 'absent' | 'late'> = {
      P: 'present', A: 'absent', L: 'late', E: 'absent',
    };

    const attendance = attendanceRecords.map((r) => ({
      date: r.attendance_sessions.session_date.toISOString().split('T')[0],
      status: ATTENDANCE_STATUS_MAP[r.status] ?? 'absent',
      reason: r.remark ?? undefined,
    }));

    res.json({ attendance });
  } catch (err) {
    console.error('getAttendanceList error:', err);
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
}

// ---------- FEES (full history) ----------
export async function getFeesList(req: Request, res: Response) {
  try {
    const guardianId = req.user!.id;
    const childId = String(req.params.childId);
    const student = await verifyChildOwnership(guardianId, childId);
    if (!student) return res.status(404).json({ error: 'Child not found' });

    const feesRaw = await prisma.fees.findMany({
      where: { student_id: childId },
      include: { fee_categories: true, payments: true },
      orderBy: { due_date: 'asc' },
    });

    const fees = feesRaw.map((f) => {
      const isPastDue = f.due_date ? f.due_date < new Date() : false;
      let status: 'paid' | 'pending' | 'overdue' = 'pending';
      if (f.status === 'paid') status = 'paid';
      else if (f.status === 'unpaid' || f.status === 'partial') status = isPastDue ? 'overdue' : 'pending';

      return {
        id: f.id,
        type: f.fee_categories?.name ?? '',
        amount: Number(f.amount),
        dueDate: f.due_date ? f.due_date.toISOString().split('T')[0] : '',
        status,
        paidAmount: f.payments.reduce((sum: number, p: { amount_paid: any }) => sum + Number(p.amount_paid), 0) || undefined,
      };
    });

    res.json({ fees });
  } catch (err) {
    console.error('getFeesList error:', err);
    res.status(500).json({ error: 'Failed to fetch fees' });
  }
}