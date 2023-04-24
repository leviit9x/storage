import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { File, ManageAccess } from '@prisma/client';
import { Transform } from 'class-transformer';
import { PaginationDto } from 'src/infrastructure/common/dto/pagination.dto';
import { SortOrder } from 'src/@types/prisma-types';

export class FileCreateDto
  implements Pick<File, 'access' | 'fileName' | 'description'>
{
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  folderId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsNumber()
  size: number;

  @ApiProperty({
    required: true,
    enum: ManageAccess,
    default: ManageAccess.PUBLIC,
  })
  @IsNotEmpty()
  @IsString()
  access: ManageAccess;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;
}

export class FileQueryDto
  extends PaginationDto
  implements Pick<File, 'fileName' | 'access' | 'ext'>
{
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  fileName: string;

  @ApiProperty({
    required: false,
    default: ManageAccess.PUBLIC,
    type: ManageAccess,
    enum: ManageAccess,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  access: ManageAccess;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  ext: string;

  @ApiProperty({
    required: false,
    default: SortOrder.asc,
    type: SortOrder,
    enum: SortOrder,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  createdAt: SortOrder;
}

export class UpdateFileDto implements Pick<File, 'fileName' | 'access'> {
  @ApiProperty({ required: false })
  @IsString()
  fileName: string;

  @ApiProperty({
    required: false,
    default: ManageAccess.PUBLIC,
    type: ManageAccess,
    enum: ManageAccess,
  })
  @IsNotEmpty()
  @IsString()
  access: ManageAccess;
}
