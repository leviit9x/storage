import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
import { File } from '@prisma/client';
import { FileRepository } from 'src/domain/repositories/fileRepository.interface';
import {
  FileQueryDto,
  UpdateFileDto,
} from 'src/infrastructure/controllers/file/file-dto.class';
import { ERROR_MESSAGE } from 'src/domain/constants/message';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

@Injectable()
export class DatabaseFileRepository implements FileRepository {
  constructor(
    private prisma: PrismaService,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async createFile(data: File) {
    return this.prisma.file.create({
      data,
    });
  }

  async getFileByName(fileName: string) {
    return this.prisma.file.findUnique({
      where: {
        fileName,
      },
    });
  }

  async getFileById(id: string) {
    return this.prisma.file.findUnique({
      where: { id },
    });
  }

  async getFileList(folderId: string, fileQueryDto: FileQueryDto) {
    const { page, pageSize, fileName, access, ext, createdAt } = fileQueryDto;
    try {
      const total = await this.prisma.file.count({
        where: {
          folderId,
        },
      });
      const results = await this.prisma.file.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          fileName: {
            contains: fileName ?? '',
          },
          folderId: {
            equals: folderId,
          },
          access: {
            equals: access,
          },
          ext: {
            equals: ext,
          },
        },
        orderBy: {
          createdAt,
        },
      });

      return {
        page,
        pageSize,
        total,
        results,
      };
    } catch (e) {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }

  async deleteFile(id) {
    return this.prisma.file.delete({
      where: {
        id,
      },
      include: {
        chunks: true,
      },
    });
  }

  async updateFile(id: string, updateFileDto: UpdateFileDto) {
    return this.prisma.file.update({
      data: updateFileDto,
      where: {
        id,
      },
    });
  }
}
