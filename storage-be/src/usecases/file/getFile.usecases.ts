import { FileRepository } from 'src/domain/repositories/fileRepository.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { ERROR_MESSAGE } from 'src/domain/constants/message';
import { ChunkRepository } from 'src/domain/repositories/chunkRepository.interface';
import { Chunk } from '@prisma/client';
import { Buffer } from 'buffer';

export class GetFileUsecases {
  constructor(
    private readonly fileRepo: FileRepository,
    private readonly chunkRepo: ChunkRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  private async validateFileAndChunks(fileId: string) {
    const file = await this.fileRepo.getFileById(fileId);
    if (!file) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.FILE_NOT_EXIST,
      });
    }
    const chunks = await this.chunkRepo.getChunksByFileId(fileId);
    return {
      chunks,
      file,
    };
  }

  private async reconstructChunks(chunks: Chunk[]) {
    return new Uint8Array(
      chunks.reduce((acc, chunk) => [...acc, ...chunk.buffer], []),
    );
  }

  async getFile(fileId: string) {
    const { chunks, file } = await this.validateFileAndChunks(fileId);
    const combinedData = await this.reconstructChunks(chunks);
    const blob = new Buffer(combinedData.buffer);
    return {
      blob,
      contentLength: combinedData.length.toString(),
      file,
    };
  }
}
