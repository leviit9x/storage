import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { FolderRepository } from 'src/domain/repositories/folderRepository.interface';
import {
  FolderCreateDto,
  FolderQueryDto,
  FolderUpdateDto,
} from 'src/infrastructure/controllers/folder/folder-dto.class';
import { NameUtils } from 'src/infrastructure/common/utils/name.utils';
import { IPaginationResponse } from 'src/@types/prisma-types';
import { Folder } from '@prisma/client';
import { ERROR_MESSAGE } from 'src/domain/constants/message';

@Injectable()
export class DatabaseFolderRepository implements FolderRepository {
  constructor(
    private prisma: PrismaService,
    private exceptionsService: ExceptionsService,
    private readonly logger: LoggerService,
  ) {}

  async createFolder(workspaceId: string, folderCreateDto: FolderCreateDto) {
    return this.prisma.folder.create({
      data: {
        ...folderCreateDto,
        path: NameUtils.toKeyBabCase(folderCreateDto.folderName),
        totalSize: 0,
        workspaceId,
      },
    });
  }

  async getFolderById(id: string) {
    return this.prisma.folder.findUnique({
      where: {
        id,
      },
    });
  }

  async getFolderDetail(
    workspaceId: string,
    folderDetailInput: Partial<Pick<Folder, 'id' | 'folderName'>>,
  ) {
    return this.prisma.folder.findFirst({
      where: {
        workspaceId,
        OR: [
          { id: folderDetailInput.id },
          { folderName: folderDetailInput.folderName },
        ],
      },
    });
  }

  async getFolderByNameAndWorkspaceId(workspaceId: string, folderName: string) {
    return this.prisma.folder.findFirst({
      where: {
        AND: [{ workspaceId }, { folderName }],
      },
    });
  }

  async deleteFolder(id: string) {
    return this.prisma.folder.delete({
      where: {
        id,
      },
    });
  }

  async updateFolder(id: string, folderUpdateDto: FolderUpdateDto) {
    return this.prisma.folder.update({
      data: {
        ...folderUpdateDto,
        path: NameUtils.toKeyBabCase(folderUpdateDto.folderName),
      },
      where: {
        id,
      },
    });
  }

  async getFolderList(
    workspaceId: string,
    folderQueryDto: FolderQueryDto,
  ): Promise<IPaginationResponse<Folder[]>> {
    const { page, pageSize, folderName, sort } = folderQueryDto;
    try {
      const total = await this.prisma.folder.count({
        where: {
          workspaceId,
        },
      });
      const results = await this.prisma.folder.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          folderName: {
            contains: folderName ?? '',
          },
          workspaceId: {
            equals: workspaceId,
          },
        },
        orderBy: {
          createdAt: sort ?? 'desc',
        },
      });

      return {
        page,
        pageSize,
        total,
        results,
      };
    } catch (_e) {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }
}
