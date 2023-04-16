import { ILogger } from 'src/domain/logger/logger.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { ERROR_MESSAGE } from 'src/domain/constants/message';
import { DatabaseFolderRepository } from 'src/infrastructure/repositories/folder.repository';
import { FolderUpdateDto } from 'src/infrastructure/controllers/folder/folder-dto.class';

export class UpdateFolderUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly folderRepository: DatabaseFolderRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(
    id: string,
    folderUpdateDto: FolderUpdateDto,
    workspaceId: string,
  ) {
    const folder = await this.folderRepository.getFolderDetail(workspaceId, {
      id,
      folderName: folderUpdateDto.folderName,
    });
    if (!folder) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.FOLDER_NOT_EXIT,
      });
    }

    return this.folderRepository.updateFolder(id, folderUpdateDto);
  }
}
