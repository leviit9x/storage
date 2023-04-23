import {
  FolderCreateDto,
  FolderQueryDto,
  FolderUpdateDto,
} from 'src/infrastructure/controllers/folder/folder-dto.class';
import { Folder } from '@prisma/client';
import { IPaginationResponse } from 'src/@types/prisma-types';

export interface FolderRepository {
  createFolder(
    workspaceId: string,
    folderCreateDto: FolderCreateDto,
  ): Promise<Folder>;
  getFolderByNameAndWorkspaceId(
    workspaceId: string,
    folderName: string,
  ): Promise<Folder>;
  getFolderDetail(
    workspaceId: string,
    folderDetailInput: Partial<Pick<Folder, 'id' | 'folderName'>>,
  ): Promise<Folder>;
  deleteFolder(id: string): Promise<Folder>;
  updateFolder(id: string, folderUpdateDto: FolderUpdateDto): Promise<Folder>;
  getFolderList(
    workspaceId: string,
    folderQueryDto: FolderQueryDto,
  ): Promise<IPaginationResponse<Folder[]>>;
  getFolderById(id: string): Promise<Folder>;
}
