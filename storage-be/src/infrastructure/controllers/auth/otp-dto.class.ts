import { NestUser } from 'src/@types/prisma-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { OtpAttempts } from '@prisma/client';

export class AuthForgotPasswordDto implements Pick<NestUser, 'email'> {
  @ApiProperty({ required: false })
  @IsString()
  @IsEmail()
  readonly email: string;
}

export class AuthResendOtpForgotPasswordDto extends AuthForgotPasswordDto {}

export class AuthVerifyOtpDto implements Pick<OtpAttempts, 'otp'> {
  @ApiProperty({ required: true })
  @IsString()
  otp: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  readonly email: string;
}
