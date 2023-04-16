import { Folder, ManageAccess, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/infrastructure/common/dto/pagination.dto';

export class FolderCreateDto
  implements Pick<Folder, 'folderName' | 'access' | 'description'>
{
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  folderName: string;

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

export class FolderUpdateDto extends FolderCreateDto {}

export class FolderQueryDto
  extends PaginationDto
  implements Pick<Folder, 'folderName'>
{
  @ApiProperty({
    required: false,
    default: Prisma.SortOrder.desc,
    type: Prisma.SortOrder,
    enum: Prisma.SortOrder,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  sort: Prisma.SortOrder;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  folderName: string;
}
