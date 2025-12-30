import { Context } from 'hono';
import { handleError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../config/constants.js';
import { env } from '../config/env.js';
import { sanitizeFilename } from '../lib/utils.js';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import type { ApiResponse } from '../types/api.types.js';

async function saveImage(file: File): Promise<string> {
  const uploadsDir = join(env.UPLOADS_DIR, 'images');
  
  if (!existsSync(uploadsDir)) {
    await mkdir(uploadsDir, { recursive: true });
  }

  // Validar tipo de arquivo
  const allowedTypes = [...ALLOWED_FILE_TYPES.images];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Tipo de arquivo não permitido. Apenas imagens são aceites.');
  }

  // Validar tamanho
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  const sanitizedName = sanitizeFilename(file.name);
  const extension = file.name.split('.').pop() || 'jpg';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  const filename = `${timestamp}-${random}.${extension}`;
  const filePath = join(uploadsDir, filename);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(filePath, buffer);

  return `/uploads/images/${filename}`;
}

export async function handleUploadImage(c: Context): Promise<Response> {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return c.json(
        { error: 'Arquivo é obrigatório', code: 'MISSING_FILE' },
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const imagePath = await saveImage(file);

    const response: ApiResponse<{ url: string; filename: string; size: number; type: string }> = {
      data: {
        url: imagePath,
        filename: file.name,
        size: file.size,
        type: file.type,
      },
    };

    return c.json(response, HTTP_STATUS.CREATED);
  } catch (error) {
    return handleError(error, c);
  }
}
