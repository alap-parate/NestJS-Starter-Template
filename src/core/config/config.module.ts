import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import dbConfig from './db.config';
import swaggerConfig from './swagger.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig, 
        dbConfig,
        swaggerConfig,
      ],
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
    }),
  ],
})
export class ConfigModule {}
