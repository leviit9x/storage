import { ILogger } from 'src/domain/logger/logger.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseFolderRepository } from 'src/infrastructure/repositories/folder.repository';
import { FolderCreateDto } from 'src/infrastructure/controllers/folder/folder-dto.class';
import { ERROR_MESSAGE } from 'src/domain/constants/message';

export class CreateFolderUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly folderRepository: DatabaseFolderRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(workspaceId: string, folderCreateDto: FolderCreateDto) {
    const folder = await this.folderRepository.getFolderByNameAndWorkspaceId(
      workspaceId,
      folderCreateDto.folderName,
    );

    if (folder) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.FOLDER_EXIST,
      });
    }
    return this.folderRepository.createFolder(workspaceId, folderCreateDto);
  }
}
