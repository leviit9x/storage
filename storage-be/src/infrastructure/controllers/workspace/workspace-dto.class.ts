import { Prisma, Workspace } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class WorkspaceCreateDto
  implements Pick<Workspace, 'workspaceName' | 'description'>
{
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  workspaceName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description: string;
}

export class WorkspaceUpdateDto extends WorkspaceCreateDto {}

export class WorkspaceQueryDto {
  @ApiProperty({ required: true, default: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty({ required: true, default: 10 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  pageSize: number;

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
  workspaceName: string;
}
