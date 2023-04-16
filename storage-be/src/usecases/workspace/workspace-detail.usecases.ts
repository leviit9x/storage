import { ILogger } from 'src/domain/logger/logger.interface';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { DatabaseWorkspaceRepository } from 'src/infrastructure/repositories/workspace.repository';

export class WorkspaceDetailUsecases {
  constructor(
    private readonly logger: ILogger,
    private readonly workspaceRepository: DatabaseWorkspaceRepository,
    private readonly exceptionsService: ExceptionsService,
  ) {}

  async execute(userId: string, id: string) {
    return this.workspaceRepository.getWorkspaceFirst(userId, {
      id,
    });
  }
}
