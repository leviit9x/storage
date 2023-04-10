import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import {
  INestMailerService,
  IOtpVerifyAccountPayload,
} from 'src/domain/adapters/nest-mailer.interface';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';

@Injectable()
export class NestMailerService implements INestMailerService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  async sendOtpVerifyAccount(payload: IOtpVerifyAccountPayload): Promise<void> {
    await this.mailerService.sendMail({
      to: payload.email,
      from: this.environmentConfigService.getSmtpFromEmail(),
      subject: 'Verify OTP account Storage',
      template: 'verify-account',
      context: {
        otp: payload.otp,
      },
    });
  }
}
