import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NestUser } from 'src/@types/prisma-types';

export class AuthLoginDto
  implements Pick<NestUser, 'username' | 'password' | 'email'>
{
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;
}

export class AuthRegisterDto extends AuthLoginDto {}

export class AuthUpdateUserDto
  implements Partial<Pick<NestUser, 'displayName' | 'email'>>
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
