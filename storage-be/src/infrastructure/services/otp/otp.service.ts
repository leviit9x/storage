import { Injectable } from '@nestjs/common';
import { IOtpService } from 'src/domain/adapters/otp.interface';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import * as crypto from 'crypto';

@Injectable()
export class OtpService implements IOtpService {
  private readonly logger = new LoggerService(OtpService.name);
  private _cache: Record<string, string>;

  generateOtp(): string {
    const otp = crypto.randomInt(1_000_000).toString().padStart(6, '0');
    this.logger.log('generateOtp ===>', otp);
    return otp;
  }
}
