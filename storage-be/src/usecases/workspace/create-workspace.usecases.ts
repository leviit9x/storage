import { ILogger } from 'src/domain/logger/logger.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseWorkspaceRepository } from 'src/infrastructure/repositories/workspace.repository';
import { WorkspaceCreateDto } from 'src/infrastructure/controllers/workspace/workspace-dto.class';
import { ERROR_MESSAGE } from 'src/domain/constants/message';

export class CreateWorkspaceUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly workspaceRepository: DatabaseWorkspaceRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(userId: string, workspaceCreateDto: WorkspaceCreateDto) {
    const workspaceList =
      await this.workspaceRepository.getWorkspaceByUserIdAndWorkspaceName(
        userId,
        workspaceCreateDto.workspaceName,
      );
    if (workspaceList.length) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.WORKSPACE_EXIST,
      });
    }
    return this.workspaceRepository.createWorkspace(userId, workspaceCreateDto);
  }
}
