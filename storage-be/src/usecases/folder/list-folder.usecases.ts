import { ILogger } from 'src/domain/logger/logger.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseFolderRepository } from 'src/infrastructure/repositories/folder.repository';
import { FolderQueryDto } from 'src/infrastructure/controllers/folder/folder-dto.class';

export class ListFolderUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly folderRepository: DatabaseFolderRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(workspaceId: string, folderQueryDto: FolderQueryDto) {
    return this.folderRepository.getFolderList(workspaceId, folderQueryDto);
  }
}
