import { Injectable } from '@nestjs/common';
import { OtpAttempts } from '@prisma/client';
import { OtpRepositoryInterface } from 'src/domain/repositories/otpRepository.interface';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

@Injectable()
export class DatabaseOtpRepository implements OtpRepositoryInterface {
  constructor(
    private prisma: PrismaService,
    private exceptionsService: ExceptionsService,
    private readonly logger: LoggerService,
  ) {}

  async getOrCreateOtpByUserId(
    userId: string,
    otp: string,
  ): Promise<OtpAttempts> {
    try {
      const currentOtp = await this.prisma.otpAttempts.findUnique({
        where: {
          userId,
        },
      });
      if (!currentOtp) {
        return await this.prisma.otpAttempts.create({
          data: {
            otp,
            userId,
            attemptCount: 1,
          },
        });
      }
      return currentOtp;
    } catch (_e) {
      this.logger.error('getOrCreateOtpByUserId', _e);
    }
  }

  async getOtpByUserId(userId: string): Promise<OtpAttempts> {
    try {
      const otp = await this.prisma.otpAttempts.findUnique({
        where: {
          userId,
        },
      });

      if (!otp) {
        return null;
      }

      return otp;
    } catch (_e) {
      this.logger.error('getOtpByUserId', _e);
      return null;
    }
  }
  updateOtpByUserId(
    userId: string,
    data: Partial<OtpAttempts>,
  ): Promise<OtpAttempts> {
    return this.prisma.otpAttempts.update({
      data,
      where: {
        userId,
      },
    });
  }
}
