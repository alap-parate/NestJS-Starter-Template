import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TypeOrmModule,
    TerminusModule
  ],
  controllers: [HealthController],
})
export class HealthModule {}
