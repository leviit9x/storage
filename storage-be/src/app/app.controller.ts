import { Controller, Head, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Head('/health-check')
  @HttpCode(204)
  getHello(): string {
    return this.appService.getHello();
  }
}
