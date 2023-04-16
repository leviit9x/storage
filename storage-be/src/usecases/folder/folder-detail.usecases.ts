import { ILogger } from 'src/domain/logger/logger.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseFolderRepository } from 'src/infrastructure/repositories/folder.repository';
import { ERROR_MESSAGE } from 'src/domain/constants/message';

export class FolderDetailUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly folderRepository: DatabaseFolderRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(workspaceId: string, id: string) {
    try {
      const folder = await this.folderRepository.getFolderDetail(workspaceId, {
        id,
      });
      if (!folder) {
        this.exceptionsService.badRequestException({
          message: ERROR_MESSAGE.FOLDER_NOT_EXIT,
        });
      }
      return folder;
    } catch (_e) {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }
}
