import { createWriteStream, type WriteStream } from 'node:fs';
import path from 'node:path';
import pino from 'pino';

const DEV_FILE_LOG = process.env.ENVIRONMENT === 'development';
const LOG_FILE = path.join(process.cwd(), 'logger.json');

declare global {
  var __enigmaApiPinoStream: WriteStream | undefined;
  var __enigmaApiPinoLogger: pino.Logger | undefined;
}

function createSilentLogger(): pino.Logger {
  return pino({ level: 'silent' });
}

function createDevFileLogger(): pino.Logger {
  if (!globalThis.__enigmaApiPinoStream) {
    globalThis.__enigmaApiPinoStream = createWriteStream(LOG_FILE, {
      flags: 'a',
      encoding: 'utf8',
    });
  }

  if (!globalThis.__enigmaApiPinoLogger) {
    globalThis.__enigmaApiPinoLogger = pino(
      {
        level: 'debug',
        base: { scope: 'api', file: 'logger.json' },
      },
      globalThis.__enigmaApiPinoStream,
    );
  }

  return globalThis.__enigmaApiPinoLogger;
}

/**
 * Pino logger for API routes. When `ENVIRONMENT=development`, logs append as
 * newline-delimited JSON to `logger.json` at the project root. Otherwise silent.
 */
export const apiLogger: pino.Logger = DEV_FILE_LOG
  ? createDevFileLogger()
  : createSilentLogger();

export function isApiFileLoggingEnabled(): boolean {
  return DEV_FILE_LOG;
}

export function serializeError(err: unknown): Record<string, unknown> {
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
  }
  return { message: String(err) };
}
