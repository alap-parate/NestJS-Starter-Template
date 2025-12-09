import { IsEnum, IsNumber, IsString, IsBoolean, IsOptional, IsUrl } from 'class-validator';
import { Transform } from 'class-transformer';
import { Environment } from '@/shared/enums/environment.enum';

export class EnvVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  APP_PORT: number;

  @IsString()
  DB_HOST: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  @IsOptional()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  REDIS_HOST: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  REDIS_PORT: number;

  @IsString()
  KEYCLOAK_AUTH_URL: string;

  @IsString()
  KEYCLOAK_REALM: string;

  @IsString()
  KEYCLOAK_CLIENT_ID: string;

  @IsString()
  KEYCLOAK_CLIENT_SECRET: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  SWAGGER_ENABLED: boolean;

  @IsString()
  SWAGGER_PATH: string;
}