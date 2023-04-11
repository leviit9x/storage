import { Injectable } from '@nestjs/common';
import { IOtpService } from 'src/domain/adapters/otp.interface';
import * as crypto from 'crypto';

@Injectable()
export class OtpService implements IOtpService {
  generateOtp(): string {
    return crypto.randomInt(1_000_000).toString().padStart(6, '0');
  }
}
