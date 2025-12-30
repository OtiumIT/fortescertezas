import { Context } from 'hono';
import { getContent, updateContent } from '../services/content.service.js';
import { AppError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import { handleError } from '../middleware/error-handler.middleware.js';
import type { SiteContent } from '../types/content.types.js';
import type { ApiResponse } from '../types/api.types.js';

export async function handleGetContent(c: Context): Promise<Response> {
  try {
    const section = c.req.param('section') as keyof SiteContent | undefined;
    const content = await getContent(section);

    const response: ApiResponse<typeof content> = {
      data: content,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}

export async function handleUpdateContent(c: Context): Promise<Response> {
  try {
    const section = c.req.param('section') as keyof SiteContent;

    if (!section) {
      throw new AppError('Seção não especificada', HTTP_STATUS.BAD_REQUEST, 'INVALID_SECTION');
    }

    const body = await c.req.json();
    const updated = await updateContent(section, body);

    const response: ApiResponse<SiteContent> = {
      data: updated,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    return handleError(error, c);
  }
}
