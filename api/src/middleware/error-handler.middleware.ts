import { Context, Next } from 'hono';
import { HTTP_STATUS } from '../config/constants.js';
import { logError } from '../lib/logger.js';
import type { ApiError } from '../types/api.types.js';

export async function errorHandlerMiddleware(
  c: Context,
  next: Next
): Promise<void | Response> {
  try {
    await next();
  } catch (error) {
    const requestId = c.req.header('x-request-id') || 'unknown';
    const route = c.req.path;

    logError('Unhandled error', error, { requestId, route });

    // Detecta ambiente de desenvolvimento (funciona em Workers e Node.js)
    const isDevelopment = typeof process !== 'undefined' && 
                         process.env && 
                         process.env.NODE_ENV === 'development';

    if (error instanceof Error) {
      const apiError: ApiError = {
        error: error.message || 'Internal server error',
        code: 'INTERNAL_ERROR',
      };

      // Em desenvolvimento, inclui stack trace para debug
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

  // Detecta ambiente de desenvolvimento
  const isDevelopment = typeof process !== 'undefined' && 
                       process.env && 
                       process.env.NODE_ENV === 'development';

  if (error instanceof AppError) {
    logError('Application error', error, { requestId, route, code: error.code });

    const apiError: ApiError = {
      error: error.message,
      code: error.code,
    };

    // Em desenvolvimento, inclui stack trace
    if (isDevelopment && error.stack) {
      apiError.details = { stack: error.stack };
    }

    return c.json(apiError, error.statusCode as any);
  }

  logError('Unexpected error', error, { requestId, route });

  // Em desenvolvimento, inclui mais detalhes do erro
  const apiError: ApiError = {
    error: error instanceof Error ? error.message : 'Internal server error',
    code: 'INTERNAL_ERROR',
  };

  // Em desenvolvimento, inclui stack trace e detalhes
  if (isDevelopment) {
    if (error instanceof Error && error.stack) {
      apiError.details = { 
        stack: error.stack,
        name: error.name,
      };
    } else {
      apiError.details = { 
        errorType: typeof error,
        errorString: String(error),
      };
    }
  }

  return c.json(apiError, HTTP_STATUS.INTERNAL_SERVER_ERROR);
}
