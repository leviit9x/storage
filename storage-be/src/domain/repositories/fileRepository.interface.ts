import { File } from '@prisma/client';

export interface FileRepository {
  createFile(data: File): Promise<File>;
  getFileById(id: string): Promise<File>;
}
