import { Chunk, File } from '@prisma/client';
import { IPaginationResponse } from 'src/@types/prisma-types';
import {
  FileQueryDto,
  UpdateFileDto,
} from 'src/infrastructure/controllers/file/file-dto.class';

export interface FileRepository {
  createFile(data: File): Promise<File>;
  getFileById(id: string): Promise<File>;
  getFileByName(fileName: string): Promise<File>;
  getFileList(
    folderId: string,
    fileQueryDto: FileQueryDto,
  ): Promise<IPaginationResponse<File[]>>;
  deleteFile(id: string): Promise<File & { chunks: Chunk[] }>;
  updateFile(id: string, updateFileDto: UpdateFileDto): Promise<File>;
}
