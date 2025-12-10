import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { ConfigType } from '@nestjs/config';
import { getLoggerOptions } from './logger.config';
import appConfig from '@/core/config/app.config';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: (app: ConfigType<typeof appConfig>) => {
        const { isProd, level, pretty } = getLoggerOptions(app);

        return {
          pinoHttp: {
            level,
            autoLogging: true,
            customLogLevel: (req, res, err) => {
              if (res.statusCode >= 500 || err) return 'error';
              if (res.statusCode >= 400) return 'warn';
              return 'info';
            },
            serializers: {
              req: (req) => ({
                method: req.method,
                url: req.url,
              }),
              res: (res) => ({
                statusCode: res.statusCode,
              }),
            },
            transport: pretty
              ? {
                  target: __dirname + '/pretty-transport.js',
                  options: {
                    colorize: true,
                    singleLine: true,
                    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                    ignore: 'pid,hostname,context,req,res',
                    customColors:
                      'error:red,warn:yellow,info:green,debug:blue,fatal:magenta,verbose:gray,trace:gray',
                  },
                }
              : undefined,
            customProps: (req) => ({
              method: req.method,
              url: req.url,
            }),
          },
        };
      },
    }),
  ],
})
export class LoggerModule {}
