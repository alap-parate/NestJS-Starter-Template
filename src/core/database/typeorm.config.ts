import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dbConfig from '@/core/config/db.config';

type DbConfig = ConfigType<typeof dbConfig>;

export const typeOrmConfig = (db: DbConfig): TypeOrmModuleOptions => ({
  type: db.type as 'mysql' | 'mariadb' | 'postgres',
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
  database: db.dbname,
    autoLoadEntities: true,
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/migrations/*.js'],
    retryAttempts: 5,
    retryDelay: 5000,
});
