import { apiLogger, serializeError } from '@/lib/api-logger';

export function logApiInfo(route: string, msg: string, meta?: Record<string, unknown>) {
  apiLogger.info({ route, ...meta }, msg);
}

export function logApiWarn(route: string, msg: string, meta?: Record<string, unknown>) {
  apiLogger.warn({ route, ...meta }, msg);
}

export function logApiError(
  route: string,
  msg: string,
  err: unknown,
  meta?: Record<string, unknown>,
) {
  apiLogger.error({ route, err: serializeError(err), ...meta }, msg);
}
