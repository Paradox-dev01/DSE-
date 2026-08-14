import { Role } from '@prisma/client'; // remove this import if role isn't a Prisma enum — use `string` instead

export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        [key: string]: any;
      };
    }
  }
}