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

    console.log('[content.controller] Atualizando seção:', section);
    const body = await c.req.json();
    console.log('[content.controller] Body recebido, tamanho:', JSON.stringify(body).length, 'bytes');
    console.log('[content.controller] Body keys:', Object.keys(body).join(', '));
    
    const updated = await updateContent(section, body);
    console.log('[content.controller] Conteúdo atualizado com sucesso');

    const response: ApiResponse<SiteContent> = {
      data: updated,
    };

    return c.json(response, HTTP_STATUS.OK);
  } catch (error) {
    console.error('[content.controller] Erro ao atualizar conteúdo:', error);
    if (error instanceof Error) {
      console.error('[content.controller] Mensagem:', error.message);
      console.error('[content.controller] Stack:', error.stack);
    }
    return handleError(error, c);
  }
}
