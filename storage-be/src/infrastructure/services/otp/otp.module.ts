import { Module } from '@nestjs/common';
import { OtpService } from 'src/infrastructure/services/otp/otp.service';

@Module({
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
