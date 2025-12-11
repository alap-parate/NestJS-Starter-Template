import { INestApplication } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';
import swaggerConfig from '@/core/config/swagger.config';

export function setupSwagger(
  app: INestApplication,
  config: ConfigType<typeof swaggerConfig>,
): void {
  if (!config.enabled) {
    return;
  }

  const documentConfig = new DocumentBuilder()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearer',
    )
    .build();

  const document = NestSwaggerModule.createDocument(app, documentConfig);
  NestSwaggerModule.setup(config.path, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: config.siteTitle,
  });
}
