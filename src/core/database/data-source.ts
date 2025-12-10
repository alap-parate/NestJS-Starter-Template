import { config } from 'dotenv';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'development';
config({ path: `.env.${env}` });

export default new DataSource({
  type: (process.env.DB_TYPE as 'mysql' | 'postgres') ?? 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['src/migrations/*.ts'],
  entities: ['src/**/*.entity.ts'],
});
