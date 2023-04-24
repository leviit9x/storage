import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { WorkspaceController } from 'src/infrastructure/controllers/workspace/workspace.controller';
import { FolderController } from 'src/infrastructure/controllers/folder/folder.controller';
import { FileController } from 'src/infrastructure/controllers/file/file.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [UsecasesProxyModule.register(), MulterModule.register()],
  controllers: [
    AuthController,
    WorkspaceController,
    FolderController,
    FileController,
  ],
})
export class ControllersModule {}
