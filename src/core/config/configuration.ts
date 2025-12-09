// src/config/configuration.ts
import { Environment } from '@/shared/enums/environment.enum';

export interface AppConfig {
  port: number;
}

export interface DatabaseConfig {
  type: string;
  host?: string;
  port: number;
  username?: string;
  password?: string;
  name?: string;
}

export interface RedisConfig {
  host?: string;
  port: number;
}

export interface KeycloakConfig {
  authUrl?: string;
  realm?: string;
  clientId?: string;
  clientSecret?: string;
}

export interface SwaggerConfig {
  enabled: boolean;
  path: string;
}

export interface Configuration {
  env: Environment;
  app: AppConfig;
  db: DatabaseConfig;
  redis: RedisConfig;
  keycloak: KeycloakConfig;
  swagger: SwaggerConfig;
}

export default (): Configuration => ({
  env: (process.env.NODE_ENV as Environment) || Environment.Development,
  app: {
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
  },
  db: {
    type: process.env.DB_TYPE ?? 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
  keycloak: {
    authUrl: process.env.KEYCLOAK_AUTH_URL,
    realm: process.env.KEYCLOAK_REALM,
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  },
  swagger: {
    enabled: process.env.SWAGGER_ENABLED === 'true',
    path: process.env.SWAGGER_PATH ?? '/docs',
  },
});
