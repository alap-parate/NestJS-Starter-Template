import { registerAs } from '@nestjs/config';

interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
  siteTitle: string;
}

export default registerAs('swagger', (): SwaggerConfig => ({
  enabled: process.env.NODE_ENV === 'development',
  title: process.env.SWAGGER_TITLE || 'NestJS API',
  description: process.env.SWAGGER_DESCRIPTION || 'API Documentation',
  version: process.env.SWAGGER_VERSION || '1.0',
  path: process.env.SWAGGER_PATH || 'api/docs',
  siteTitle: process.env.SWAGGER_SITETITLE || 'NestJS API',
}));

