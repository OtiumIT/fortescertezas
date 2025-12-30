import { Context, Next } from 'hono';
import { HTTP_STATUS } from '../config/constants.js';
import { logError } from '../lib/logger.js';
import type { ApiError } from '../types/api.types.js';

export async function errorHandlerMiddleware(
  c: Context,
  next: Next
): Promise<Response> {
  try {
    await next();
    return c.res;
  } catch (error) {
    const requestId = c.req.header('x-request-id') || 'unknown';
    const route = c.req.path;

    logError('Unhandled error', error, { requestId, route });

    const isDevelopment = process.env.NODE_ENV === 'development';

    if (error instanceof Error) {
      const apiError: ApiError = {
        error: error.message || 'Internal server error',
        code: 'INTERNAL_ERROR',
      };

      if (isDevelopment && error.stack) {
        apiError.details = { stack: error.stack };
      }

      return c.json(apiError, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    const apiError: ApiError = {
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
    };

    return c.json(apiError, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    public code: string = 'INTERNAL_ERROR'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown, c: Context): Response {
  const requestId = c.req.header('x-request-id') || 'unknown';
  const route = c.req.path;

  if (error instanceof AppError) {
    logError('Application error', error, { requestId, route, code: error.code });

    const apiError: ApiError = {
      error: error.message,
      code: error.code,
    };

    return c.json(apiError, error.statusCode as any);
  }

  logError('Unexpected error', error, { requestId, route });

  const apiError: ApiError = {
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
  };

  return c.json(apiError, HTTP_STATUS.INTERNAL_SERVER_ERROR);
}
