import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Configuration } from '../config/configuration';

export const typeOrmConfig = (
  configService: ConfigService<Configuration>,
): TypeOrmModuleOptions => {
  const db = configService.get('db');
  return {
    type: db.type,
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    database: db.name,
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/migrations/*.js'],
  };
};
