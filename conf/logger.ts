import { utilities, WinstonModuleOptions } from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
  ),
);

const nestFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.ms(),
  utilities.format.nestLike(),
);

const transports = {
  file: new DailyRotateFile({
    filename: './storage/log/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '3d',
    format: fileFormat,
  }),
  console: new winston.transports.Console({
    format: nestFormat,
  }),
};

export const LOGGER_CONFIG: WinstonModuleOptions = {
  level: process.env.LOG_LEVEL ?? 'silly',
  transports: process.env.LOG_TRANSPORTS?.split(',')?.map((t) => transports[t]),
};
