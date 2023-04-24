import { Chunk } from '@prisma/client';

export interface ChunkRepository {
  createChunk(data: Chunk): Promise<Chunk>;
  getChunkById(id: string): Promise<Chunk>;
  getFirstByFileId(fileId: string): Promise<Chunk>;
  getChunksByFileId(fileId: string): Promise<Chunk[]>;
}
