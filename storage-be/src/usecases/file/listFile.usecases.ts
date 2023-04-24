import { FileRepository } from 'src/domain/repositories/fileRepository.interface';
import { FolderRepository } from 'src/domain/repositories/folderRepository.interface';
import { FileQueryDto } from 'src/infrastructure/controllers/file/file-dto.class';

export class ListFileUsecases {
  constructor(
    private readonly folderRepo: FolderRepository,
    private readonly fileRepo: FileRepository,
  ) {}

  async execute(folderId: string, fileQueryDto: FileQueryDto) {
    return this.fileRepo.getFileList(folderId, fileQueryDto);
  }
}
