import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { WorkspaceController } from 'src/infrastructure/controllers/workspace/workspace.controller';
import { FolderController } from 'src/infrastructure/controllers/folder/folder.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, WorkspaceController, FolderController],
})
export class ControllersModule {}
