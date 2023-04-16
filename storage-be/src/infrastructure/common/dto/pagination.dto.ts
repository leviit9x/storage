import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
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
}
