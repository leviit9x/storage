import { Module } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { DatabaseUserRepository } from './user.repository';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { DatabaseOtpRepository } from 'src/infrastructure/repositories/otp.repository';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { DatabaseWorkspaceRepository } from 'src/infrastructure/repositories/workspace.repository';
import { DatabaseFolderRepository } from 'src/infrastructure/repositories/folder.repository';
import { DatabaseFileRepository } from 'src/infrastructure/repositories/file.repository';
import { DatabaseChunkRepository } from 'src/infrastructure/repositories/chunk.repository';

@Module({
  imports: [PrismaModule, ExceptionsModule, LoggerModule],
  providers: [
    DatabaseUserRepository,
    DatabaseOtpRepository,
    DatabaseWorkspaceRepository,
    DatabaseFolderRepository,
    DatabaseFileRepository,
    DatabaseChunkRepository,
  ],
  exports: [
    DatabaseUserRepository,
    DatabaseOtpRepository,
    DatabaseWorkspaceRepository,
    DatabaseFolderRepository,
    DatabaseFileRepository,
    DatabaseChunkRepository,
  ],
})
export class RepositoriesModule {}
