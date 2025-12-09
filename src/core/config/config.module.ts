import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';
import { EnvVariables } from './config.validation';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

function validateEnv(config: Record<string, unknown>) {
    const validated = plainToInstance(EnvVariables, config, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(validated, { 
        skipMissingProperties: true
    });

    if (errors.length > 0) {
        console.error(errors);
        throw new Error(`❌ Invalid environment variables`);
    }

    return validated;
}

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
    }),
  ],
})
export class ConfigModule {}
