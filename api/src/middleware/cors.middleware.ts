import { cors } from 'hono/cors';
import type { EnvConfig } from '../config/env.js';

// Cria middleware de CORS com envConfig
export function createCorsMiddleware(envConfig: EnvConfig) {
  return cors({
    origin: envConfig.CORS_ORIGIN.split(','),
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
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
