import { OtpAttempts } from '@prisma/client';

export interface OtpRepositoryInterface {
  getOtpByUserId(userId: string): Promise<OtpAttempts>;
  getOrCreateOtpByUserId(userId: string, otp: string): Promise<OtpAttempts>;
  updateOtpByUserId(
    userId: string,
    data: Pick<OtpAttempts, 'otp' | 'attemptCount' | 'updatedAt'>,
  ): Promise<OtpAttempts>;
}
