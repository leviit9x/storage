import { Setting, Workspace } from '@prisma/client';
import { NestUser } from 'src/@types/prisma-types';

export class UserWithoutPassword implements Omit<NestUser, 'password'> {
  username: string;
  displayName: string;
  email: string;
  hashRefreshToken: string | null;
  id: string;
  isLocked: boolean;
  lastLogin: Date;
  updatedAt: Date;
  createdAt: Date;
  setting: MaybeNull<Setting>;
  workspaceList: MaybeNull<Workspace[]>;
}
