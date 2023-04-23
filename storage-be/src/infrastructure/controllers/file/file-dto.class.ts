import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { File, ManageAccess } from '@prisma/client';
import { Transform } from 'class-transformer';
// fieldname:
//   originalname:
//     encoding:
//       mimetype:
//         buffer:
//           size:
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
