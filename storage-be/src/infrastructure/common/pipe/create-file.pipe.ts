import { Injectable, PipeTransform } from '@nestjs/common';
import { FileCreateDto } from 'src/infrastructure/controllers/file/file-dto.class';

@Injectable()
export class CreateFilePipe implements PipeTransform {
  transform(
    value: FileCreateDto /*metadata: ArgumentMetadata*/,
  ): FileCreateDto {
    return {
      ...value,
      size: Number(value.size),
    };
  }
}
