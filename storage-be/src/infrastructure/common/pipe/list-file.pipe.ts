import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/domain/constants/message';
import { FileQueryDto } from 'src/infrastructure/controllers/file/file-dto.class';

@Injectable()
export class ListFilePipe implements PipeTransform {
  transform(value: FileQueryDto, metadata: ArgumentMetadata): FileQueryDto {
    if (!value.page && !value.pageSize) {
      throw new BadRequestException(ERROR_MESSAGE.INVALID_QUERY);
    }
    return {
      ...value,
      page: Number(value.page),
      pageSize: Number(value.pageSize),
    };
  }
}
