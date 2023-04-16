import { ILogger } from 'src/domain/logger/logger.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseWorkspaceRepository } from 'src/infrastructure/repositories/workspace.repository';
import { ERROR_MESSAGE } from 'src/domain/constants/message';

export class DeleteWorkspaceUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly workspaceRepository: DatabaseWorkspaceRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(userId: string, id: string) {
    const workspace = await this.workspaceRepository.getWorkspaceFirst(userId, {
      id,
    });
    if (!workspace) {
      this.exceptionsService.badRequestException({
        message: ERROR_MESSAGE.WORKSPACE_NOT_EXIT,
      });
    }
    return this.workspaceRepository.deleteWorkspace(id);
  }
}
