import { Module } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { DatabaseUserRepository } from './user.repository';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { DatabaseOtpRepository } from 'src/infrastructure/repositories/otp.repository';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { DatabaseWorkspaceRepository } from 'src/infrastructure/repositories/workspace.repository';
import { DatabaseFolderRepository } from 'src/infrastructure/repositories/folder.repository';

@Module({
  imports: [PrismaModule, ExceptionsModule, LoggerModule],
  providers: [
    DatabaseUserRepository,
    DatabaseOtpRepository,
    DatabaseWorkspaceRepository,
    DatabaseFolderRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseOtpRepository,
    DatabaseWorkspaceRepository,
    DatabaseFolderRepository,
  ],
})
export class RepositoriesModule {}
