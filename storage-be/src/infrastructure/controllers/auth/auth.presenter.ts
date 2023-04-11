import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class IsAuthPresenter
  implements Omit<User, 'id' | 'password' | 'hashRefreshToken'>
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
}
