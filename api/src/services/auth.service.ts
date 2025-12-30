import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import type { LoginInput, LoginResponse, User, AuthPayload } from '../types/auth.types.js';

function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload as object, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

export async function login(input: LoginInput): Promise<LoginResponse> {
  if (input.username !== env.ADMIN_USERNAME) {
    throw new AppError('Credenciais inválidas', HTTP_STATUS.UNAUTHORIZED, 'INVALID_CREDENTIALS');
  }

  if (input.password !== env.ADMIN_PASSWORD) {
    throw new AppError('Credenciais inválidas', HTTP_STATUS.UNAUTHORIZED, 'INVALID_CREDENTIALS');
  }

  const user: User = {
    id: 'admin-001',
    username: env.ADMIN_USERNAME,
    role: 'admin',
    createdAt: new Date().toISOString(),
  };

  const payload: AuthPayload = {
    userId: user.id,
    username: user.username,
    role: user.role,
  };

  const token = generateToken(payload);

  return {
    token,
    user,
  };
}

export function verifyToken(token: string): AuthPayload {
  try {
    return jwt.verify(token, env.JWT_SECRET) as AuthPayload;
  } catch (error) {
    throw new AppError('Token inválido', HTTP_STATUS.UNAUTHORIZED, 'INVALID_TOKEN');
  }
}
