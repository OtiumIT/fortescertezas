import { Context } from 'hono';
import { handleError } from '../middleware/error-handler.middleware.js';
import { HTTP_STATUS } from '../config/constants.js';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../config/constants.js';
import { env } from '../config/env.js';
import { sanitizeFilename } from '../lib/utils.js';
import { createClient } from '@supabase/supabase-js';
import type { ApiResponse } from '../types/api.types.js';

async function saveImage(file: File): Promise<string> {
  // Validar tipo de arquivo
  const allowedTypes = [...ALLOWED_FILE_TYPES.images] as readonly string[];
  if (!allowedTypes.includes(file.type as any)) {
    throw new Error('Tipo de arquivo não permitido. Apenas imagens são aceites.');
  }

  // Validar tamanho
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  // Verifica se Supabase está configurado
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase não está configurado. Configure SUPABASE_URL e SUPABASE_ANON_KEY como Secrets no Cloudflare Workers.');
  }
  
  // Usa SERVICE_KEY se disponível (melhor para uploads), senão usa ANON_KEY
  const supabaseKey = env.SUPABASE_SERVICE_KEY || env.SUPABASE_ANON_KEY;
  
  if (!env.SUPABASE_SERVICE_KEY) {
    console.warn('[upload] Usando SUPABASE_ANON_KEY. Para melhor performance, configure SUPABASE_SERVICE_KEY.');
  } else {
    console.log('[upload] Usando SUPABASE_SERVICE_KEY para uploads');
  }

  const sanitizedName = sanitizeFilename(file.name);
  const extension = sanitizedName.split('.').pop() || 'jpg';
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  const filename = `images/${timestamp}-${random}.${extension}`;
  
  console.log('[upload] Fazendo upload para Supabase Storage...');
  console.log('[upload] Bucket: uploads, Arquivo:', filename);
  
  // Cria cliente Supabase com SERVICE_KEY (ou ANON_KEY como fallback) para ter permissões de escrita
  const supabase = createClient(env.SUPABASE_URL, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });

  // Converte File para ArrayBuffer e depois para Uint8Array
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  // Faz upload para o Supabase Storage
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filename, uint8Array, {
      contentType: file.type,
      upsert: false, // Não sobrescreve arquivos existentes
    });

  if (error) {
    console.error('[upload] Erro ao fazer upload para Supabase:', error);
    
    // Se o bucket não existe, tenta criar
    if (error.message?.includes('Bucket not found') || error.message?.includes('not found')) {
      console.log('[upload] Bucket não encontrado, tentando criar...');
      
      // Cria o bucket se não existir
      const { data: bucketData, error: bucketError } = await supabase.storage.createBucket('uploads', {
        public: true, // Bucket público para permitir acesso às imagens
        fileSizeLimit: MAX_FILE_SIZE,
        allowedMimeTypes: allowedTypes as string[],
      });

      if (bucketError) {
        console.error('[upload] Erro ao criar bucket:', bucketError);
        throw new Error(`Não foi possível criar o bucket de uploads: ${bucketError.message}`);
      }

      console.log('[upload] Bucket criado com sucesso, tentando upload novamente...');
      
      // Tenta fazer upload novamente
      const { data: retryData, error: retryError } = await supabase.storage
        .from('uploads')
        .upload(filename, uint8Array, {
          contentType: file.type,
          upsert: false,
        });

      if (retryError) {
        throw new Error(`Erro ao fazer upload: ${retryError.message}`);
      }

      // Obtém URL pública da imagem
      const { data: urlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(filename);

      const publicUrl = urlData.publicUrl;
      console.log('[upload] Upload concluído com sucesso:', publicUrl);
      return publicUrl;
    }

    throw new Error(`Erro ao fazer upload: ${error.message}`);
  }

  // Obtém URL pública da imagem
  const { data: urlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(filename);

  const publicUrl = urlData.publicUrl;
  console.log('[upload] Upload concluído com sucesso:', publicUrl);
  return publicUrl;
}

export async function handleUploadImage(c: Context): Promise<Response> {
  try {
    console.log('[upload] Iniciando upload de imagem...');
    const formData = await c.req.formData();
    const fileInput = formData.get('file');
    
    if (!fileInput) {
      console.error('[upload] Arquivo não fornecido no formData');
      return c.json({ error: 'Arquivo não fornecido' }, 400);
    }
    
    // FormData.get retorna File | string | null, verificamos se é File
    if (typeof fileInput === 'string') {
      console.error('[upload] Arquivo é string, não File object');
      return c.json({ error: 'Arquivo inválido' }, 400);
    }
    
    const file = fileInput as File;

    if (!file) {
      console.error('[upload] Arquivo é null ou undefined');
      return c.json(
        { error: 'Arquivo é obrigatório', code: 'MISSING_FILE' },
        HTTP_STATUS.BAD_REQUEST
      );
    }

    console.log('[upload] Arquivo recebido:', {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    const imagePath = await saveImage(file);
    console.log('[upload] Imagem salva com sucesso:', imagePath);

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
    console.error('[upload] Erro no handleUploadImage:', error);
    if (error instanceof Error) {
      console.error('[upload] Mensagem de erro:', error.message);
      console.error('[upload] Stack:', error.stack);
    }
    return handleError(error, c);
  }
}
