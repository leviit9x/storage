import { FileRepository } from 'src/domain/repositories/fileRepository.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { ERROR_MESSAGE } from 'src/domain/constants/message';
import { ChunkRepository } from 'src/domain/repositories/chunkRepository.interface';
import { Chunk } from '@prisma/client';
import { NameUtils } from 'src/infrastructure/common/utils/name.utils';

export class CreateChunkUsecases {
  constructor(
    private readonly fileRepo: FileRepository,
    private readonly chunkRepo: ChunkRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async createChunk(fileId: string, chunk: Express.Multer.File) {
    const file = await this.fileRepo.getFileById(fileId);
    if (!file) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.FILE_NOT_EXIST,
      });
    }

    const chunkExits = await this.chunkRepo.getFirstByFileId(fileId);
    if (chunkExits) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.FILE_EXIST,
      });
    }

    try {
      const { order } = NameUtils.getFileNameAndOrder(chunk.originalname);
      const chunkInput = {
        buffer: chunk.buffer,
        size: chunk.size,
        order,
        fileId,
      } as Chunk;
      return await this.chunkRepo.createChunk(chunkInput);
    } catch (e) {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }
}
