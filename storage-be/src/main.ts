import * as cookieParser from 'cookie-parser';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as compression from 'compression';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@common/global-exceptions-filter/all-exceptions.filter';
import { useContainer } from 'class-validator';
import { setupSwagger } from '@common/configs';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({});
  app.use(cookieParser());
  app.use(express.json());

  const port = configService.get('app.serverPort');
  const isProd = configService.get('app.isProduction');

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

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  setupSwagger(app);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(port, () => {
    Logger.log(`Server is running at port ${port}`);
  });
}
bootstrap();
