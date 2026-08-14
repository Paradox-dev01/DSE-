import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMyChildren(req: Request, res: Response) {
  try {
    const guardianId = req.user!.id; // set by requireAuth middleware

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