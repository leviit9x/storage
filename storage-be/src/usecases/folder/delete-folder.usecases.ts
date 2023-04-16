import { ILogger } from 'src/domain/logger/logger.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { ERROR_MESSAGE } from 'src/domain/constants/message';
import { DatabaseFolderRepository } from 'src/infrastructure/repositories/folder.repository';

export class DeleteFolderUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly folderRepository: DatabaseFolderRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(workspaceId: string, id: string) {
    const workspace = await this.folderRepository.getFolderDetail(workspaceId, {
      id,
    });
    if (!workspace) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.FOLDER_NOT_EXIT,
      });
    }
    return this.folderRepository.deleteFolder(id);
  }
}
