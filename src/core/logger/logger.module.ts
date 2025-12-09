import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { getLoggerOptions } from './logger.config';
import { Configuration } from '@/core/config/configuration';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Configuration>) => {
        const { isProd, level, pretty } = getLoggerOptions(config);

        return {
          pinoHttp: {
            level,
            autoLogging: true, 
            customLogLevel: (req, res, err) => {
              if (res.statusCode >= 500 || err) return 'error';
              if (res.statusCode >= 400) return 'warn';
              return 'info';
            },
            transport: pretty
              ? {
                  target: __dirname + '/pretty-transport.js',
                  options: {
                    colorize: true,
                    singleLine: true,
                    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                    ignore: 'pid,hostname,context', // Clean up the log output
                    customColors: 'error:red,warn:yellow,info:green,debug:blue,fatal:magenta,verbose:gray,trace:gray',
                  },
                }
              : undefined,
          },
        };
      },
    }),
  ],
})
export class LoggerModule {}
