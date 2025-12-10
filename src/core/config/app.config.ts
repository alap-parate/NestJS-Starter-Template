import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
    const env = process.env.NODE_ENV || 'development';
    console.log('App is running in ', env, ' mode');
    return {
        env,
        port: parseInt(process.env.APP_PORT || '3000', 10),
        name: process.env.APP_NAME || 'NestJS Starter Template',
        host: process.env.APP_HOST || 'localhost',
    }
})