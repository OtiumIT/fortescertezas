import { Context, Next } from 'hono';
import { HTTP_STATUS } from '../config/constants.js';
import { AppError } from './error-handler.middleware.js';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

const RATE_LIMITS = {
  public: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 100,
  },
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    maxRequests: 5,
  },
  admin: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 1000,
  },
} as const;

function getClientIdentifier(c: Context): string {
  const forwarded = c.req.header('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : c.req.header('cf-connecting-ip') || 'unknown';
  return ip.trim();
}

function createRateLimitMiddleware(
  type: keyof typeof RATE_LIMITS
) {
  return async function rateLimitMiddleware(
    c: Context,
    next: Next
  ): Promise<Response> {
    const limit = RATE_LIMITS[type];
    const identifier = getClientIdentifier(c);
    const now = Date.now();
    const key = `${type}:${identifier}`;

    const record = store[key];

    if (!record || now > record.resetTime) {
      store[key] = {
        count: 1,
        resetTime: now + limit.windowMs,
      };
      await next();
      return c.res;
    }

    if (record.count >= limit.maxRequests) {
      throw new AppError(
        'Muitas requisições. Tente novamente mais tarde.',
        HTTP_STATUS.TOO_MANY_REQUESTS,
        'RATE_LIMIT_EXCEEDED'
      );
    }

    record.count += 1;
    await next();
    return c.res;
  };
}

export const publicRateLimit = createRateLimitMiddleware('public');
export const authRateLimit = createRateLimitMiddleware('auth');
export const adminRateLimit = createRateLimitMiddleware('admin');
