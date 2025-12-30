import { Context } from 'hono';
import { login as loginService } from '../services/auth.service.js';
import { loginSchema } from '../lib/validation.js';
import { HTTP_STATUS } from '../config/constants.js';
import { handleError } from '../middleware/error-handler.middleware.js';
import type { LoginInput, AuthPayload } from '../types/auth.types.js';
import type { ApiResponse } from '../types/api.types.js';

export async function handleLogin(c: Context): Promise<Response> {
  try {
    const body = await c.req.json();
    const validated = loginSchema.parse(body) as LoginInput;

    const result = await loginService(validated);

    const response: ApiResponse<typeof result> = {
      data: result,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleMe(c: Context): Promise<Response> {
  try {
    const user = c.get('user') as AuthPayload;

    const response: ApiResponse<{ id: string; username: string }> = {
      data: {
        id: user.userId,
        username: user.username,
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleLogout(c: Context): Promise<Response> {
  try {
    const response: ApiResponse<{ message: string }> = {
      data: {
        message: 'Logout realizado com sucesso',
      },
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}
