import { Workspace } from '@prisma/client';
import {
  WorkspaceCreateDto,
  WorkspaceQueryDto,
  WorkspaceUpdateDto,
} from 'src/infrastructure/controllers/workspace/workspace-dto.class';
import { IPaginationResponse } from 'src/@types/prisma-types';

export interface WorkspaceInterface {
  createWorkspace(
    userId: string,
    workspaceCreateDto: WorkspaceCreateDto,
  ): Promise<Workspace>;
  getWorkspaceById(workspaceId: string): Promise<Workspace>;
  getWorkspaceByUserIdAndWorkspaceName(
    userId: string,
    workspaceName: string,
  ): Promise<Workspace[]>;
  getWorkspaceByName(workspaceName: string): Promise<Workspace>;
  updateWorkspace(
    workspaceId: string,
    workspaceUpdateDto: WorkspaceUpdateDto,
  ): Promise<Workspace>;
  deleteWorkspace(id: string): Promise<Workspace>;
  getWorkspaceList(
    userId: string,
    workspaceQueryDto: WorkspaceQueryDto,
  ): Promise<IPaginationResponse<Workspace[]>>;
  getWorkspaceFirst(
    userId: string,
    workspaceInput: Partial<Pick<Workspace, 'id' | 'workspaceName'>>,
  ): Promise<Workspace>;
}
