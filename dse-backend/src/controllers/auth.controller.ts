import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';

export async function login(req: Request, res: Response) {
  const { login_id, password } = req.body;
  if (!login_id || !password) {
    return res.status(400).json({ error: 'login_id and password are required' });
  }

  const user = await prisma.users.findUnique({ where: { login_id } });
  if (!user || !user.password_hash) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const payload = { sub: user.id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res.json({
    accessToken,
    refreshToken,
    user: { id: user.id, role: user.role, must_change_password: user.must_change_password },
  });
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: 'refreshToken is required' });
  }
  try {
    const payload = verifyRefreshToken(refreshToken);
    const accessToken = signAccessToken({ sub: payload.sub, role: payload.role });
    res.json({ accessToken });
  } catch {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
}

export async function changePassword(req: AuthRequest, res: Response) {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'oldPassword and newPassword are required' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'newPassword must be at least 6 characters' });
  }

  const user = await prisma.users.findUnique({ where: { id: req.user!.id } });
  if (!user || !user.password_hash) {
    return res.status(404).json({ error: 'User not found' });
  }

  const valid = await bcrypt.compare(oldPassword, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'Old password is incorrect' });
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await prisma.users.update({
    where: { id: user.id },
    data: { password_hash: newHash, must_change_password: false },
  });

  res.json({ message: 'Password updated successfully' });
}

export async function me(req: AuthRequest, res: Response) {
  const user = await prisma.users.findUnique({
    where: { id: req.user!.id },
    include: { guardians: true, students: true, teachers: true, admins: true },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({
    id: user.id,
    role: user.role,
    login_id: user.login_id,
    email: user.email,
    avatar_url: user.avatar_url,
    must_change_password: user.must_change_password,
    profile: user.guardians ?? user.students ?? user.teachers ?? user.admins ?? null,
  });
}