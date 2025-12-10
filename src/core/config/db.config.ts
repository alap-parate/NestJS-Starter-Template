import { registerAs } from "@nestjs/config"

interface DatabaseConfig {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    dbname: string;
}

export default registerAs('db', (): DatabaseConfig => ({
    type: process.env.DB_TYPE || 'mariadb',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'undefined', // Explicitly undefined if not set
    dbname: process.env.DB_NAME || 'sample'
}))