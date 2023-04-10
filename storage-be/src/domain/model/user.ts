import { User } from '@prisma/client';

export class UserWithoutPassword implements Omit<User, 'password'> {
  createdAt: Date;
  displayName: string;
  email: string;
  hashRefreshToken: string | null;
  id: string;
  isLocked: boolean;
  lastLogin: Date;
  otp: string;
  updatedAt: Date;
  username: string;
}

export class UserM extends UserWithoutPassword {
  password: string;
}
