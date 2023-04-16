import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { WorkspaceQueryDto } from 'src/infrastructure/controllers/workspace/workspace-dto.class';
import { ERROR_MESSAGE } from 'src/domain/constants/message';

@Injectable()
export class ListWorkspacePipe implements PipeTransform {
  transform(
    value: WorkspaceQueryDto,
    metadata: ArgumentMetadata,
  ): WorkspaceQueryDto {
    if (!value.page && !value.pageSize) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_QUERY);
    }
    return {
      page: Number(value.page),
      pageSize: Number(value.pageSize),
      sort: value.sort ?? 'desc',
      workspaceName: value.workspaceName ?? '',
    };
  }
}
