import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import dbConfig from '@/core/config/db.config';
import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [dbConfig.KEY],
      useFactory: (db: ConfigType<typeof dbConfig>) => typeOrmConfig(db),
    }),
  ],
})
export class DatabaseModule {}