import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import {
  FolderCreateDto,
  FolderQueryDto,
  FolderUpdateDto,
} from 'src/infrastructure/controllers/folder/folder-dto.class';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { CreateFolderUsecases } from 'src/usecases/folder/create-folder.usecases';
import { ListFolderUsecases } from 'src/usecases/folder/list-folder.usecases';
import { FolderDetailUsecases } from 'src/usecases/folder/folder-detail.usecases';
import { UpdateFolderUsecases } from 'src/usecases/folder/update-folder.usecases';
import { DeleteFolderUsecases } from 'src/usecases/folder/delete-folder.usecases';
import { ListFolderPipe } from 'src/infrastructure/common/pipe/list-folder.pipe';

@Controller('folder')
@ApiTags('folder')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class FolderController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_FOLDER_USECASE_PROXY)
    private readonly createFolderUsecases: UseCaseProxy<CreateFolderUsecases>,
    @Inject(UsecasesProxyModule.GET_FOLDER_USECASE_PROXY)
    private readonly listFolderUsecases: UseCaseProxy<ListFolderUsecases>,
    @Inject(UsecasesProxyModule.FOLDER_DETAIL_USECASE_PROXY)
    private readonly folderDetailUsecases: UseCaseProxy<FolderDetailUsecases>,
    @Inject(UsecasesProxyModule.UPDATE_FOLDER_USECASE_PROXY)
    private readonly updateFolderUsecases: UseCaseProxy<UpdateFolderUsecases>,
    @Inject(UsecasesProxyModule.DELETE_FOLDER_USECASE_PROXY)
    private readonly deleteFolderUsecases: UseCaseProxy<DeleteFolderUsecases>,
  ) {}

  @Post('create/:workspaceId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: FolderCreateDto })
  @ApiOperation({ description: 'create folder' })
  async createFolder(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Body() folderCreateDto: FolderCreateDto,
  ) {
    return this.createFolderUsecases
      .getInstance()
      .execute(workspaceId, folderCreateDto);
  }

  @Patch('update/:workspaceId/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: FolderUpdateDto })
  @ApiOperation({ description: 'update folder' })
  async updateFolder(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() folderUpdateDto: FolderUpdateDto,
  ) {
    return this.updateFolderUsecases
      .getInstance()
      .execute(id, folderUpdateDto, workspaceId);
  }

  @Get('folder-list/:workspaceId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'get list folder' })
  async folderList(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Query(ValidationPipe, new ListFolderPipe()) folderQueryDto: FolderQueryDto,
  ) {
    return this.listFolderUsecases
      .getInstance()
      .execute(workspaceId, folderQueryDto);
  }

  @Get(':workspaceId/:folderId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'get folder detail' })
  async folderDetail(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('folderId', ParseUUIDPipe) folderId: string,
  ) {
    return this.folderDetailUsecases
      .getInstance()
      .execute(workspaceId, folderId);
  }

  @Delete('delete/:workspaceId/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'delete folder' })
  async deleteWorkspace(
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.deleteFolderUsecases.getInstance().execute(workspaceId, id);
  }
}
