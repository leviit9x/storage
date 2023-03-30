import { Module } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { DatabaseUserRepository } from './user.repository';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';

@Module({
  imports: [PrismaModule, ExceptionsModule],
  providers: [DatabaseUserRepository],
  exports: [DatabaseUserRepository],
})
export class RepositoriesModule {}
