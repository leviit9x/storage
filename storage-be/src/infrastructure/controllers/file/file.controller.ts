import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileCreateDto } from 'src/infrastructure/controllers/file/file-dto.class';
import { CreateFilePipe } from 'src/infrastructure/common/pipe/create-file.pipe';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { CreateFileUsecases } from 'src/usecases/file/createFile.usecases';
import { CreateChunkUsecases } from 'src/usecases/file/createChunk.usecases';
import { GetFileUsecases } from 'src/usecases/file/getFile.usecases';
import { Readable } from 'stream';

@Controller('file')
@ApiTags('file')
@ApiResponse({ status: HttpStatus.OK, description: 'Success' })
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'No authorization token was found',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Internal error',
})
export class FileController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_FILE_USECASE_PROXY)
    private readonly createFileUsecases: UseCaseProxy<CreateFileUsecases>,
    @Inject(UsecasesProxyModule.CREATE_CHUNK_USECASE_PROXY)
    private readonly createChunkUsecases: UseCaseProxy<CreateChunkUsecases>,
    @Inject(UsecasesProxyModule.GET_FILE_USECASE_PROXY)
    private readonly getFileUsecases: UseCaseProxy<GetFileUsecases>,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe(), new CreateFilePipe())
  @UseInterceptors(FileInterceptor('file'))
  async createFile(
    @Body()
    fileCreateDto: FileCreateDto,
  ) {
    return this.createFileUsecases.getInstance().createFile(fileCreateDto);
  }

  @Post('chunks/:fileId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadChunks(
    @UploadedFile() file: Express.Multer.File,
    @Param('fileId', ParseUUIDPipe) fileId: string,
  ) {
    return this.createChunkUsecases.getInstance().createChunk(fileId, file);
  }

  @Get(':id')
  async getFile(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    const { blob, contentLength, file } = await this.getFileUsecases
      .getInstance()
      .getFile(id);
    const stream = new Readable();
    stream.push(blob);
    stream.push(null);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${file.fileName}`,
      'Content-Length': contentLength,
    });
    stream.pipe(res);
  }
}
