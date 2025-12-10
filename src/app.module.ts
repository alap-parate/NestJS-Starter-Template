import { Module } from '@nestjs/common';
import { ConfigModule } from './core/config/config.module';
import { LoggerModule } from './core/logger/logger.module';
import { DatabaseModule } from './core/database/database.module';
import { DemoModule } from './modules/demo/demo.module';
import { HealthModule } from '@/core/health/health.module';

@Module({
  imports: [
    ConfigModule, 
    LoggerModule, 
    DatabaseModule, 
    DemoModule, 
    HealthModule
  ],
})
export class AppModule {}
