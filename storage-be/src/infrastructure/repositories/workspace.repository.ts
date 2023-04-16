import { Injectable } from '@nestjs/common';
import { WorkspaceInterface } from 'src/domain/repositories/workspace.interface';
import {
  WorkspaceCreateDto,
  WorkspaceQueryDto,
  WorkspaceUpdateDto,
} from 'src/infrastructure/controllers/workspace/workspace-dto.class';
import { Workspace } from '@prisma/client';
import { IPaginationResponse } from 'src/@types/prisma-types';
import { PrismaService } from 'src/infrastructure/config/prisma/prisma.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { ERROR_MESSAGE } from 'src/domain/constants/message';

@Injectable()
export class DatabaseWorkspaceRepository implements WorkspaceInterface {
  constructor(
    private prisma: PrismaService,
    private exceptionsService: ExceptionsService,
    private readonly logger: LoggerService,
  ) {}
  createWorkspace(
    userId: string,
    workspaceCreateDto: WorkspaceCreateDto,
  ): Promise<Workspace> {
    return this.prisma.workspace.create({
      data: {
        ...workspaceCreateDto,
        userId,
      },
    });
  }

  deleteWorkspace(id: string): Promise<Workspace> {
    return this.prisma.workspace.delete({
      where: {
        id,
      },
    });
  }

  async getWorkspaceList(
    userId: string,
    workspaceQueryDto: WorkspaceQueryDto,
  ): Promise<IPaginationResponse<Workspace[]>> {
    const { page, pageSize, workspaceName, sort } = workspaceQueryDto;
    try {
      const total = await this.prisma.workspace.count();
      const results = await this.prisma.workspace.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        where: {
          workspaceName: {
            contains: workspaceName ?? '',
          },
          userId: {
            equals: userId,
          },
        },
        orderBy: {
          updatedAt: sort ?? 'desc',
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

  updateWorkspace(
    id: string,
    workspaceUpdateDto: WorkspaceUpdateDto,
  ): Promise<Workspace> {
    return this.prisma.workspace.update({
      data: workspaceUpdateDto,
      where: { id },
    });
  }

  async getWorkspaceById(id: string): Promise<Workspace> {
    try {
      const workspace = await this.prisma.workspace.findUnique({
        where: { id },
      });
      if (!workspace) {
        return null;
      }
      return workspace;
    } catch (_e) {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }

  async getWorkspaceByName(workspaceName: string): Promise<Workspace> {
    try {
      const workspace = await this.prisma.workspace.findUnique({
        where: { workspaceName },
      });
      if (!workspace) {
        return null;
      }
      return workspace;
    } catch (_e) {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }

  async getWorkspaceByUserIdAndWorkspaceName(
    userId: string,
    workspaceName: string,
  ): Promise<Workspace[]> {
    try {
      return await this.prisma.workspace.findMany({
        where: {
          AND: [{ workspaceName }, { userId }],
        },
      });
    } catch (_e) {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }
  async getWorkspaceFirst(
    userId: string,
    workspaceInput: Partial<Pick<Workspace, 'id' | 'workspaceName'>>,
  ) {
    try {
      return await this.prisma.workspace.findFirst({
        where: {
          AND: {
            userId,
            ...workspaceInput,
          },
        },
      });
    } catch (_e) {
      this.exceptionsService.internalServerErrorException({
        message: ERROR_MESSAGE.SERVER_ERR,
      });
    }
  }
}
