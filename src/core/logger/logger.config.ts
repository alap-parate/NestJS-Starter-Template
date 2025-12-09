import { ConfigService } from "@nestjs/config";
import { Environment } from "@/shared/enums/environment.enum";
import { Configuration } from "@/core/config/configuration";

export interface LoggerOptions {
    isProd: boolean;
    level: string;
    pretty: boolean;
}

export const getLoggerOptions = (
    config: ConfigService<Configuration>,
) : LoggerOptions => {
    const env = config.get<Environment>('env');

    const isProd = env === Environment.Production;

    const level = isProd ? 'info' : 'trace';

    return {
        isProd,
        level,
        pretty: !isProd,
    }
}