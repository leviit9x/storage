import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { File } from '@prisma/client';
import { FileRepository } from 'src/domain/repositories/fileRepository.interface';

@Injectable()
export class DatabaseFileRepository implements FileRepository {
  constructor(
    private prisma: PrismaService,
    private readonly logger: LoggerService,
  ) {}

  async createFile(data: File) {
    return this.prisma.file.create({
      data,
    });
  }

  async getFileById(id: string) {
    return this.prisma.file.findUnique({
      where: { id },
    });
  }
}
