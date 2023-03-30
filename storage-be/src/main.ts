import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from 'src/app.module';
import * as compression from 'compression';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from 'src/infrastructure/common/filter/exception.filter';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { LoggingInterceptor } from 'src/infrastructure/common/interceptors/logger.interceptor';
import {
  ResponseFormat,
  ResponseInterceptor,
} from 'src/infrastructure/common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(EnvironmentConfigService);

  const port = configService.getServerPort();
  const isProd = configService.getIsProd();

  app.use(cookieParser());

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix('v1');

  if (!isProd) {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Clean Architecture Nestjs/Storage')
      .setDescription('Storage API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('v1/api', app, document);
  }

  if (isProd) {
    app.enable('trust proxy');
    app.use(compression());
    app.use(helmet());

    app.use(
      RateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );
  }

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(port, () => {
    Logger.log(`Server is running at port ${port}`);
  });
}

bootstrap();
