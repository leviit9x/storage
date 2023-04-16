import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { WorkspaceController } from 'src/infrastructure/controllers/workspace/workspace.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [AuthController, WorkspaceController],
})
export class ControllersModule {}
