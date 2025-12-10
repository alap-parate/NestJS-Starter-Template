import { ConfigType } from '@nestjs/config';
import { Environment } from '@/shared/enums/environment.enum';
import appConfig from '@/core/config/app.config';

export interface LoggerOptions {
  isProd: boolean;
  level: string;
  pretty: boolean;
}

export const getLoggerOptions = (
  app: ConfigType<typeof appConfig>,
): LoggerOptions => {
  const isProd = app.env === Environment.Production;
  const level = isProd ? 'info' : 'trace';

  return {
    isProd,
    level,
    pretty: !isProd,
  };
};
