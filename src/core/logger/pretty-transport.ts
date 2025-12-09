import pinoPretty from 'pino-pretty';
import * as colorette from 'colorette';

export default (opts: any) => {
  let lastTime = 0;

  return pinoPretty({
    ...opts,
    messageFormat: (log: any, messageKey: string) => {
      const message = log[messageKey];
      const context = log.context;
      const currentTime = log.time || Date.now();
      
      let diff = 0;
      if (lastTime !== 0) {
        diff = currentTime - lastTime;
      }
      lastTime = currentTime;

      const diffStr = colorette.yellow(` +${diff}ms`);
      
      if (context && typeof context === 'string' && context.length > 0) {
        return `${colorette.gray('[' + context + ']')} ${message}${diffStr}`;
      }
      return `${colorette.green(message)}${diffStr}`;
    },
  });
};

