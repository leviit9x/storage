import { FileRepository } from 'src/domain/repositories/fileRepository.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { ERROR_MESSAGE } from 'src/domain/constants/message';
import { UpdateFileDto } from 'src/infrastructure/controllers/file/file-dto.class';

export class UpdateFileUsecases {
  constructor(
    private readonly fileRepo: FileRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(id: string, updateFileDto: UpdateFileDto) {
    const file = await this.fileRepo.getFileById(id);

    if (!file) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.FILE_NOT_EXIST,
      });
    }

    const anotherFile = await this.fileRepo.getFileByName(
      updateFileDto.fileName,
    );

    if (id !== anotherFile.id) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.FILENAME_EXIST,
      });
    }

    try {
      return this.fileRepo.updateFile(id, updateFileDto);
    } catch {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }
}
