import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { Chunk } from '@prisma/client';
import { ChunkRepository } from 'src/domain/repositories/chunkRepository.interface';

@Injectable()
export class DatabaseChunkRepository implements ChunkRepository {
  constructor(
    private prisma: PrismaService,
    private readonly logger: LoggerService,
  ) {}

  async createChunk(data: Chunk) {
    return this.prisma.chunk.create({
      data,
    });
  }

  async getChunkById(id: string) {
    return this.prisma.chunk.findUnique({
      where: { id },
    });
  }

  async getFirstByFileId(fileId: string) {
    return this.prisma.chunk.findFirst({
      where: {
        fileId,
      },
    });
  }
  async getChunksByFileId(fileId: string) {
    return this.prisma.chunk.findMany({
      where: {
        fileId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }
}
