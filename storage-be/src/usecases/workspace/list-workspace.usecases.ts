import { ILogger } from 'src/domain/logger/logger.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseWorkspaceRepository } from 'src/infrastructure/repositories/workspace.repository';
import { WorkspaceQueryDto } from 'src/infrastructure/controllers/workspace/workspace-dto.class';

export class ListWorkspaceUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly workspaceRepository: DatabaseWorkspaceRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(userId: string, workspaceQueryDto: WorkspaceQueryDto) {
    return this.workspaceRepository.getWorkspaceList(userId, workspaceQueryDto);
  }
}
