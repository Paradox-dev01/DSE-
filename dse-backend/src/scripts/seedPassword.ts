import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const loginId = process.argv[2];
  if (!loginId) {
    console.error('Usage: npx ts-node src/scripts/seedPassword.ts <login_id>');
    process.exit(1);
  }
  const hash = await bcrypt.hash(loginId, 10);
  const user = await prisma.users.update({ where: { login_id: loginId }, data: { password_hash: hash } });
  console.log(`Password set for ${user.login_id} (password = their login_id)`);
}

main().finally(() => process.exit());