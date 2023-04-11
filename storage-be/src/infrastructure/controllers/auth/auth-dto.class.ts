import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '@prisma/client';
//
// id: string
// username: string
// email: string
// displayName: string
// hashRefreshToken: string | null
// otp: string
// isLocked: boolean
// password: string
// lastLogin: Date
// createdAt: Date
// updatedAt: Date

export class AuthLoginDto implements Pick<User, 'username' | 'password'> {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class AuthRegisterDto extends AuthLoginDto {}

export class AuthUpdateUserDto
  implements Partial<Pick<User, 'displayName' | 'email'>>
{
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly displayName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email: string;
}
