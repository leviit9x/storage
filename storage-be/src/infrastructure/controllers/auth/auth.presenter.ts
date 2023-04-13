import { ApiProperty } from '@nestjs/swagger';
import { NestUser } from 'src/@types/prisma-types';
import { Role, Setting } from '@prisma/client';

export class IsSettingPresenter implements Omit<Setting, 'id' | 'userId'> {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  maxSizeStorage: number;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  updatedAt: Date;
}

export class IsAuthPresenter
  implements
    Omit<NestUser, 'id' | 'password' | 'hashRefreshToken' | 'workspaceList'>
{
  @ApiProperty()
  username: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isLocked: boolean;

  @ApiProperty()
  lastLogin: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: IsSettingPresenter })
  setting: MaybeNull<Setting>;
}
