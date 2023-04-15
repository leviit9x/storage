import { ILogger } from 'src/domain/logger/logger.interface';
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { OtpService } from 'src/infrastructure/services/otp/otp.service';
import { NestMailerService } from 'src/infrastructure/config/NestMailer/nest-mailer.service';
import {
  AuthForgotPasswordDto,
  AuthResendOtpForgotPasswordDto,
  AuthVerifyOtpDto,
} from 'src/infrastructure/controllers/auth/otp-dto.class';
import { DatabaseOtpRepository } from 'src/infrastructure/repositories/otp.repository';
import { ERROR_MESSAGE, RES_MESSAGE } from 'src/domain/constants/message';
import { MAX_LIMIT_VERIFY_OTP } from 'src/domain/constants/config';
import { TimeUtils } from 'src/infrastructure/common/utils/time.utils';

export class ForgotPasswordUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly otpRepository: DatabaseOtpRepository,
    private readonly userRepository: UserRepository,
    private readonly exceptionsService: ExceptionsService,
    private readonly otpService: OtpService,
    private readonly nestMailerService: NestMailerService,
  ) {}

  async execute(forgotPasswordDto: AuthForgotPasswordDto) {
    try {
      const user = await this.userRepository.getUserByIdentity({
        email: forgotPasswordDto.email,
      });
      if (user) {
        const otp = this.otpService.generateOtp();
        await Promise.all([
          await this.nestMailerService.sendOtpVerifyAccount({
            email: user.email,
            otp,
          }),
          await this.otpRepository.getOrCreateOtpByUserId(user.id, otp),
        ]);
        return RES_MESSAGE.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS;
      }
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.USER_NOTFOUND,
      });
    } catch (e) {
      this.logger.error('ForgotPasswordUsecases.execute', e);
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }

  async verifyOtp(authVerifyOtpDto: AuthVerifyOtpDto) {
    try {
      const user = await this.userRepository.getUserByIdentity({
        email: authVerifyOtpDto.email,
      });
      if (user) {
        const currentOtp = await this.otpRepository.getOtpByUserId(user.id);
        if (!currentOtp) {
          this.exceptionsService.internalServerErrorException({
            message: ERROR_MESSAGE.SERVER_ERR,
          });
        }
        if (currentOtp.attemptCount === MAX_LIMIT_VERIFY_OTP) {
          this.exceptionsService.badRequestException({
            message: ERROR_MESSAGE.MAX_REQUEST_OTP,
          });
        }

        if (TimeUtils.isTimeDiffMinutes(currentOtp.updatedAt)) {
          this.exceptionsService.badRequestException({
            message: ERROR_MESSAGE.OTP_HAS_EXPIRED,
          });
        }

        if (currentOtp.otp !== authVerifyOtpDto.otp) {
          await this.otpRepository.updateOtpByUserId(user.id, {
            attemptCount: currentOtp.attemptCount + 1,
            updatedAt: new Date(),
          });
          this.exceptionsService.badRequestException({
            message: `Otp invalid, you have ${
              MAX_LIMIT_VERIFY_OTP - currentOtp.attemptCount
            } turns left!`,
          });
        }
        if (currentOtp.otp === authVerifyOtpDto.otp) {
          return RES_MESSAGE.VERIFY_OTP_SUCCESS;
        }
        this.exceptionsService.internalServerErrorException({
          message: ERROR_MESSAGE.SERVER_ERR,
        });
      }
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.USER_NOTFOUND,
      });
    } catch (e) {
      this.logger.error('ForgotPasswordUsecases.verifyOtp', e);
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }

  async resendOtp(
    authResendOtpForgotPasswordDto: AuthResendOtpForgotPasswordDto,
  ) {
    try {
      const user = await this.userRepository.getUserByIdentity({
        email: authResendOtpForgotPasswordDto.email,
      });
      if (user) {
        const currentOtp = await this.otpRepository.getOtpByUserId(user.id);

        if (!currentOtp) {
          this.exceptionsService.internalServerErrorException({
            message: ERROR_MESSAGE.SERVER_ERR,
          });
        }
        if (currentOtp.attemptCount === MAX_LIMIT_VERIFY_OTP) {
          this.exceptionsService.badRequestException({
            message: ERROR_MESSAGE.MAX_REQUEST_OTP,
          });
        }

        const otp = this.otpService.generateOtp();
        await Promise.all([
          await this.nestMailerService.sendOtpVerifyAccount({
            email: user.email,
            otp,
          }),
          await this.otpRepository.updateOtpByUserId(user.id, {
            otp,
            updatedAt: new Date(),
            attemptCount: 1,
          }),
        ]);
        return RES_MESSAGE.RESEND_OTP_SUCCESS;
      }
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.USER_NOTFOUND,
      });
    } catch (e) {
      this.logger.error('ForgotPasswordUsecases.resendOtp', e);
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }
}
