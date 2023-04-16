import { ILogger } from 'src/domain/logger/logger.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseWorkspaceRepository } from 'src/infrastructure/repositories/workspace.repository';
import { WorkspaceCreateDto } from 'src/infrastructure/controllers/workspace/workspace-dto.class';
import { ERROR_MESSAGE } from 'src/domain/constants/message';

export class UpdateWorkspaceUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly workspaceRepository: DatabaseWorkspaceRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(
    id: string,
    workspaceCreateDto: WorkspaceCreateDto,
    userId: string,
  ) {
    const workspaceExist = await this.workspaceRepository.getWorkspaceFirst(
      userId,
      workspaceCreateDto,
    );
    if (workspaceExist && workspaceExist.id !== id) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.WORKSPACE_EXIT,
      });
    }
    return this.workspaceRepository.updateWorkspace(id, workspaceCreateDto);
  }
}
