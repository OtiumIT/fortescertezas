import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { HTTP_STATUS } from '../config/constants.js';
import { AppError } from './error-handler.middleware.js';
import type { AuthPayload } from '../types/auth.types.js';

export async function authMiddleware(
  c: Context,
  next: Next
): Promise<Response> {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Token não fornecido', HTTP_STATUS.UNAUTHORIZED, 'INVALID_TOKEN');
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;

    c.set('user', decoded);

    await next();
    return c.res;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError('Token inválido', HTTP_STATUS.UNAUTHORIZED, 'INVALID_TOKEN');
    }

    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError('Token expirado', HTTP_STATUS.UNAUTHORIZED, 'TOKEN_EXPIRED');
    }

    throw new AppError('Erro na autenticação', HTTP_STATUS.UNAUTHORIZED, 'AUTH_ERROR');
  }
}
