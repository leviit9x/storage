import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/domain/constants/message';
import { FolderQueryDto } from 'src/infrastructure/controllers/folder/folder-dto.class';

@Injectable()
export class ListFolderPipe implements PipeTransform {
  transform(value: FolderQueryDto, metadata: ArgumentMetadata): FolderQueryDto {
    if (!value.page && !value.pageSize) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_QUERY);
    }
    return {
      page: Number(value.page),
      pageSize: Number(value.pageSize),
      sort: value.sort ?? 'desc',
      folderName: value.folderName ?? '',
    };
  }
}
