import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(Logger);
  app.useLogger(logger);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const port = configService.get('app.port');
  await app.listen(port as number);

  // logger.log(`Server is running on port ${port}`);
  logger.log(`App Started in ${configService.get('env')} mode`);
  logger.log(`Server is running on ${port}`);
  logger.log(`Server Started Successfully`);
}
bootstrap();
