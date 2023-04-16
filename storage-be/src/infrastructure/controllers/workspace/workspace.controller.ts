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
  Request,
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
  WorkspaceCreateDto,
  WorkspaceQueryDto,
  WorkspaceUpdateDto,
} from 'src/infrastructure/controllers/workspace/workspace-dto.class';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { CreateWorkspaceUsecases } from 'src/usecases/workspace/create-workspace.usecases';
import { ListWorkspaceUsecases } from 'src/usecases/workspace/list-workspace.usecases';
import { UpdateWorkspaceUsecases } from 'src/usecases/workspace/update-workspace.usecases';
import { DeleteWorkspaceUsecases } from 'src/usecases/workspace/delete-workspace.usecases';
import { Request as RequesstExpress } from 'express';
import { ListWorkspacePipe } from 'src/infrastructure/common/pipe/list-workspace.pipe';
import { WorkspaceDetailUsecases } from 'src/usecases/workspace/workspace-detail.usecases';

@Controller('workspace')
@ApiTags('workspace')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class WorkspaceController {
  constructor(
    @Inject(UsecasesProxyModule.CREATE_WORKSPACE_USECASE_PROXY)
    private readonly createWorkspaceUsecases: UseCaseProxy<CreateWorkspaceUsecases>,
    @Inject(UsecasesProxyModule.GET_WORKSPACE_USECASE_PROXY)
    private readonly listWorkspaceUsecases: UseCaseProxy<ListWorkspaceUsecases>,
    @Inject(UsecasesProxyModule.UPDATE_WORKSPACE_USECASE_PROXY)
    private readonly updateWorkspaceUsecases: UseCaseProxy<UpdateWorkspaceUsecases>,
    @Inject(UsecasesProxyModule.DELETE_WORKSPACE_USECASE_PROXY)
    private readonly deleteWorkspaceUsecases: UseCaseProxy<DeleteWorkspaceUsecases>,
    @Inject(UsecasesProxyModule.WORKSPACE_DETAIL_USECASE_PROXY)
    private readonly workspaceDetailUsecases: UseCaseProxy<WorkspaceDetailUsecases>,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: WorkspaceCreateDto })
  @ApiOperation({ description: 'create workspace' })
  async createWorkspace(
    @Body() workspaceCreateDto: WorkspaceCreateDto,
    @Request() request: RequesstExpress,
  ) {
    return this.createWorkspaceUsecases
      .getInstance()
      .execute(request.user.id, workspaceCreateDto);
  }

  @Get('workspace-list')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'get workspace list' })
  async getWorkspaceList(
    @Query(ValidationPipe, new ListWorkspacePipe())
    workspaceQueryDto: WorkspaceQueryDto,
    @Request() request: RequesstExpress,
  ) {
    return this.listWorkspaceUsecases
      .getInstance()
      .execute(request.user.id, workspaceQueryDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'workspace detail' })
  async workspaceDetail(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() request: RequesstExpress,
  ) {
    return this.workspaceDetailUsecases
      .getInstance()
      .execute(request.user.id, id);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: WorkspaceUpdateDto })
  @ApiOperation({ description: 'update workspace' })
  async updateWorkspace(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() workspaceUpdateDto: WorkspaceUpdateDto,
    @Request() request: RequesstExpress,
  ) {
    return this.updateWorkspaceUsecases
      .getInstance()
      .execute(id, workspaceUpdateDto, request.user.id);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'delete workspace' })
  async deleteWorkspace(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() request: RequesstExpress,
  ) {
    return this.deleteWorkspaceUsecases
      .getInstance()
      .execute(request.user.id, id);
  }
}
