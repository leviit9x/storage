import { Module } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { DatabaseUserRepository } from './user.repository';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { DatabaseOtpRepository } from 'src/infrastructure/repositories/otp.repository';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { DatabaseWorkspaceRepository } from 'src/infrastructure/repositories/workspace.repository';

@Module({
  imports: [PrismaModule, ExceptionsModule, LoggerModule],
  providers: [
    DatabaseUserRepository,
    DatabaseOtpRepository,
    DatabaseWorkspaceRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseOtpRepository,
    DatabaseWorkspaceRepository,
  ],
})
export class RepositoriesModule {}
