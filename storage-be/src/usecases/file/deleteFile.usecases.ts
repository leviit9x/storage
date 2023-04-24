import { FileRepository } from 'src/domain/repositories/fileRepository.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { ERROR_MESSAGE } from 'src/domain/constants/message';
import { ChunkRepository } from 'src/domain/repositories/chunkRepository.interface';

export class DeleteFileUsecases {
  constructor(
    private readonly chunkRepo: ChunkRepository,
    private readonly fileRepo: FileRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(id: string) {
    const file = await this.fileRepo.getFileById(id);
    if (!file) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.FILE_NOT_EXIST,
      });
    }

    try {
      return await this.fileRepo.deleteFile(id);
    } catch {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }
}
