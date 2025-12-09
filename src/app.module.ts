import { Module } from '@nestjs/common';
import { ConfigModule } from './core/config/config.module';
import { LoggerModule } from './core/logger/logger.module';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
  ],
})
export class AppModule {}
