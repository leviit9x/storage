// defined full type of model

import { Setting, User, Workspace } from '@prisma/client';

export interface NestUser extends User {
  setting: MaybeNull<Setting>;
  workspaceList: MaybeNull<Workspace[]>;
}
