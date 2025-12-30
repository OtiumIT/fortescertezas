import { cors } from 'hono/cors';
import type { EnvConfig } from '../config/env.js';

// Cria middleware de CORS com envConfig
export function createCorsMiddleware(envConfig: EnvConfig) {
  // Processa as origens permitidas
  const allowedOrigins = envConfig.CORS_ORIGIN
    .split(',')
    .map(origin => origin.trim())
    .filter(origin => origin.length > 0);
  
  // Se não houver origens configuradas, permite todas (apenas em desenvolvimento)
  if (allowedOrigins.length === 0) {
    console.warn('CORS_ORIGIN não configurado, permitindo todas as origens');
    return cors({
      origin: '*',
      allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      credentials: false, // Não permite credentials com origin: '*'
    });
  }
  
  // Função para verificar se a origem é permitida (aceita com/sem protocolo, com/sem www)
  const originMatcher = (origin: string): string | undefined => {
    if (!origin) {
      return undefined;
    }
    
    // Remove protocolo e www para comparação
    const normalizeOrigin = (orig: string) => {
      return orig
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .toLowerCase()
        .trim();
    };
    
    const normalizedRequestOrigin = normalizeOrigin(origin);
    
    // Verifica se a origem está na lista permitida
    for (const allowed of allowedOrigins) {
      const normalizedAllowed = normalizeOrigin(allowed);
      
      // Comparação exata
      if (normalizedRequestOrigin === normalizedAllowed) {
        // Retorna a origem original da requisição (com protocolo)
        return origin;
      }
      
      // Também aceita subdomínios (ex: api.fcu.otiumit.com.br se fcu.otiumit.com.br estiver permitido)
      if (normalizedRequestOrigin.endsWith('.' + normalizedAllowed)) {
        return origin;
      }
    }
    
    // Log para debug (apenas em desenvolvimento)
    if (envConfig.NODE_ENV === 'development') {
      console.log('CORS: Origem rejeitada:', origin);
      console.log('CORS: Origens permitidas:', allowedOrigins);
    }
    
    // Se não encontrou, retorna undefined (rejeita)
    return undefined;
  };
  
  return cors({
    origin: originMatcher,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    exposeHeaders: ['Content-Length', 'Content-Type'],
  });
}

// Para compatibilidade com Node.js (desenvolvimento local)
// Usa valores padrão seguros que funcionam em Workers
// Em Node.js, será sobrescrito quando env estiver disponível
export const corsMiddleware = cors({
  origin: ['*'], // Permissivo por padrão, será restrito quando env estiver disponível
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});
